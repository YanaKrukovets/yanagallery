"use server";

// Starts a Stripe Checkout session for the bag. The browser only sends slugs, design
// ids and quantities; titles and prices are always read from content/products.ts here
// on the server, so nobody can change what they pay.

import { headers } from "next/headers";
import { designOf, getProduct } from "@/content/products";
import { lettermail } from "@/content/site";
import { stripe } from "@/lib/stripe";
import { cleanPostalCode, deliveryOptionFor, pickupOption, type Delivery } from "./delivery";
import { alreadyPaidFor, soldKey } from "./sales";
import { designFits, lineKey, maxFor, type StoredLine } from "./store";

export type CheckoutResult = { url: string; id: string } | { error: string };

const MAX_LINES = 50;

// How long a buyer has to finish paying. Short, so an original can't sit in an
// unpaid checkout for a day while someone else buys it.
const CHECKOUT_MINUTES = 30;

/** Lettermail price for the bag, or undefined when something in it needs a box or it's too heavy. */
function lettermailPrice(items: { product: { letterGrams?: number }; qty: number }[]) {
  if (!items.every(({ product }) => product.letterGrams)) return undefined;
  const grams = items.reduce<number>(
    (sum, { product, qty }) => sum + (product.letterGrams ?? 0) * qty,
    lettermail.envelopeGrams,
  );
  return lettermail.tiers.find((tier) => grams <= tier.upToGrams)?.price;
}

type ShippingChoice = { label: string; price: number; days: readonly [number, number] };

/**
 * Holds originals while someone is paying for them. Returns the slug of the first original
 * that's in another buyer's checkout (still open, or just paid and not yet in Stripe search).
 * `previous` is this buyer's own earlier checkout: it's closed first so they don't block themselves.
 */
async function heldByOthers(slugs: string[], previous: string | undefined) {
  if (slugs.length === 0) return undefined;
  if (previous?.startsWith("cs_")) {
    try {
      const old = await stripe().checkout.sessions.retrieve(previous);
      if (old.status === "open") await stripe().checkout.sessions.expire(previous);
    } catch {
      // Unknown or already closed: nothing to release.
    }
  }
  // A minute of slack for Stripe search to catch up with payments made near the end.
  const since = Math.floor(Date.now() / 1000) - (CHECKOUT_MINUTES + 2) * 60;
  for await (const session of stripe().checkout.sessions.list({ created: { gte: since }, limit: 100 })) {
    if (session.status === "expired") continue;
    const held = slugs.find((slug) => session.metadata?.[soldKey(slug)] === "yes");
    if (held) return held;
  }
  return undefined;
}

async function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function startCheckout(
  input: StoredLine[],
  delivery: Delivery,
  previousSession?: string,
): Promise<CheckoutResult> {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_LINES) {
    return { error: "Your bag is empty." };
  }
  const pickup = delivery?.method === "pickup";
  const postalCode = pickup ? undefined : cleanPostalCode(delivery?.postalCode);
  if (!pickup && !postalCode) {
    return { error: "Please enter a Canadian postal code, like K1B 1A1." };
  }

  const seen = new Set<string>();
  const items = [];
  for (const line of input) {
    const product = typeof line?.slug === "string" ? getProduct(line.slug) : undefined;
    const key = product && lineKey(product.slug, line.design);
    if (
      !product ||
      !key ||
      seen.has(key) ||
      !designFits(product, line.design) ||
      !Number.isInteger(line.qty) ||
      line.qty < 1
    ) {
      return {
        error: "Something in your bag has changed. Please refresh the page and try again.",
      };
    }
    if (maxFor(product) === 0) {
      return {
        error: `Sorry, “${product.title}” has just sold. Please remove it from your bag.`,
      };
    }
    seen.add(key);
    const design = designOf(product, line.design);
    items.push({
      product,
      design,
      name: design ? `${product.title} (${design.name})` : product.title,
      image: design?.image ?? product.image,
      qty: Math.min(line.qty, maxFor(product)),
    });
  }

  const origin = await siteOrigin();
  const originals = items.filter(({ product }) => product.original);
  // Delivery: only the option for the buyer's area, plus Lettermail for postcards and magnets
  // when delivery there isn't free. Pickup: no address and no delivery options at all (Stripe
  // only takes delivery options alongside an address), just a note above the Pay button.
  const shipping: ShippingChoice[] = [];
  if (postalCode) {
    const option = deliveryOptionFor(postalCode);
    const letterPrice = lettermailPrice(items);
    if (letterPrice !== undefined && option.price > 0) {
      shipping.push({ label: lettermail.label, price: letterPrice, days: lettermail.days });
    }
    shipping.push(option);
  }
  const delivered = postalCode ? `Delivery to ${postalCode}` : pickupOption.label;

  try {
    // Only two buyers clicking "Pay now" within the same second could both get through.
    // The Terms cover that with a refund.
    const paid = await Promise.all(originals.map(({ product }) => alreadyPaidFor(product.slug)));
    const sold = originals.find((_, i) => paid[i]);
    if (sold) {
      return {
        error: `Sorry, “${sold.product.title}” has just sold. Please remove it from your bag.`,
      };
    }
    const held = await heldByOthers(
      originals.map(({ product }) => product.slug),
      typeof previousSession === "string" ? previousSession : undefined,
    );
    if (held) {
      return {
        error: `Someone is paying for “${getProduct(held)?.title}” right now. If they don't finish, it will be available again within ${CHECKOUT_MINUTES} minutes.`,
      };
    }

    const tags = Object.fromEntries(originals.map(({ product }) => [soldKey(product.slug), "yes"]));
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      currency: "cad",
      line_items: items.map(({ product, design, name, image, qty }) => ({
        quantity: qty,
        price_data: {
          currency: "cad",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name,
            description: product.medium,
            // Stripe can only show images from a public URL, so they won't appear on localhost.
            images: origin.startsWith("https://") ? [`${origin}${image}`] : undefined,
            metadata: { slug: product.slug, ...(design && { design: design.id }) },
          },
        },
      })),
      ...(postalCode
        ? { shipping_address_collection: { allowed_countries: ["CA"] } }
        : {
            custom_text: {
              submit: { message: `${pickupOption.label}, free. Yana will email you to set a pickup time.` },
            },
          }),
      shipping_options: shipping.map((option) => ({
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: option.label,
          fixed_amount: { amount: Math.round(option.price * 100), currency: "cad" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: option.days[0] },
            maximum: { unit: "business_day", value: option.days[1] },
          },
        },
      })),
      phone_number_collection: { enabled: true },
      expires_at: Math.floor(Date.now() / 1000) + CHECKOUT_MINUTES * 60,
      // The checkout is tagged too, so it holds its originals while the buyer pays.
      // The postal code typed in the bag is kept on the payment, to compare with the address.
      payment_intent_data: { metadata: { ...tags, delivery: delivered } },
      metadata: {
        ...tags,
        delivery: delivered,
        items: items
          .map(({ product, design, qty }) => `${lineKey(product.slug, design?.id)}×${qty}`)
          .join(", ")
          .slice(0, 500),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL.");
    return { url: session.url, id: session.id };
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return {
      error: "Checkout isn't available right now. Please try again in a moment.",
    };
  }
}
