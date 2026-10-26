"use server";

// Starts a Stripe Checkout session for the bag. The browser only sends slugs, design
// ids and quantities; titles and prices are always read from content/products.ts here
// on the server, so nobody can change what they pay.

import { headers } from "next/headers";
import { designOf, getProduct } from "@/content/products";
import { shippingOptions } from "@/content/site";
import { stripe } from "@/lib/stripe";
import { designFits, lineKey, maxFor, type StoredLine } from "./store";

export type CheckoutResult = { url: string } | { error: string };

const MAX_LINES = 50;

async function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function startCheckout(input: StoredLine[]): Promise<CheckoutResult> {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_LINES) {
    return { error: "Your bag is empty." };
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

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      currency: "cad",
      line_items: items.map(({ product, design, name, image, qty }) => ({
        quantity: qty,
        price_data: {
          currency: "cad",
          unit_amount: product.price * 100,
          product_data: {
            name,
            description: product.medium,
            // Stripe can only show images from a public URL, so they won't appear on localhost.
            images: origin.startsWith("https://") ? [`${origin}${image}`] : undefined,
            metadata: { slug: product.slug, ...(design && { design: design.id }) },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["CA"] },
      shipping_options: shippingOptions.map((option) => ({
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: option.label,
          fixed_amount: { amount: option.price * 100, currency: "cad" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: option.days[0] },
            maximum: { unit: "business_day", value: option.days[1] },
          },
        },
      })),
      phone_number_collection: { enabled: true },
      metadata: {
        items: items
          .map(({ product, design, qty }) => `${lineKey(product.slug, design?.id)}×${qty}`)
          .join(", ")
          .slice(0, 500),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL.");
    return { url: session.url };
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return {
      error: "Checkout isn't available right now. Please try again in a moment.",
    };
  }
}
