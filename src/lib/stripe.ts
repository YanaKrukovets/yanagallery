// Server-side Stripe client. The secret key comes from STRIPE_SECRET_KEY
// (see .env.example) and must never be imported into client code.

import Stripe from "stripe";

let client: Stripe | undefined;

export function stripe() {
  if (typeof window !== "undefined") throw new Error("The Stripe client is server-only.");
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local and add your key.");
  client ??= new Stripe(key);
  return client;
}
