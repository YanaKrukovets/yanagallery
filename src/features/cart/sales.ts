// Which originals have been paid for online. Checkout tags each Stripe payment for an original
// with `original_<slug>: yes`, so Stripe is the record of what has sold. Server-only.

import { cacheLife } from "next/cache";
import { products, type Product } from "@/content/products";
import { stripe } from "@/lib/stripe";

// Stripe metadata keys are at most 40 characters, so an original's slug can be at most 31.
export const soldKey = (slug: string) => `original_${slug}`;

/**
 * True when an online order (not fully refunded) already includes this original. Payments
 * still going through (like a bank debit) count too.
 */
export async function alreadyPaidFor(slug: string) {
  const result = await stripe().paymentIntents.search({
    query: `metadata['${soldKey(slug)}']:'yes'`,
    expand: ["data.latest_charge"],
    limit: 100,
  });
  return result.data.some((payment) => {
    if (payment.status !== "succeeded" && payment.status !== "processing") return false;
    const charge = payment.latest_charge;
    return !(charge && typeof charge !== "string" && charge.refunded);
  });
}

/**
 * Slugs of originals paid for online. Checked with Stripe about once a minute, so the site
 * shows "Sold" without a redeploy. If Stripe can't be reached, nothing extra is marked sold
 * (checkout still checks Stripe live before taking a payment).
 */
async function soldOnline(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  if (!process.env.STRIPE_SECRET_KEY) return [];
  const originals = products.filter((p) => p.original && !p.sold);
  try {
    const paid = await Promise.all(originals.map((p) => alreadyPaidFor(p.slug)));
    return originals.filter((_, i) => paid[i]).map((p) => p.slug);
  } catch (err) {
    console.error("Couldn't check Stripe for sold originals:", err);
    return [];
  }
}

/** The same products, with originals already paid for online marked `sold`. */
export async function withSales(list: Product[]): Promise<Product[]> {
  const sold = new Set(await soldOnline());
  return list.map((p) => (sold.has(p.slug) ? { ...p, sold: true } : p));
}
