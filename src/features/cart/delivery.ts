// How the buyer gets their order, chosen in the bag before paying. Used by both the bag
// (browser) and checkout (server); the server always re-checks.

import { shippingOptions } from "@/content/site";

export type Delivery = { method: "pickup" } | { method: "delivery"; postalCode: string };

type ShippingOption = (typeof shippingOptions)[number];

// Canadian postal codes never use D, F, I, O, Q or U, and never start with W or Z.
const POSTAL_CODE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;

/** "k1b1a1" → "K1B 1A1", or undefined when it isn't a Canadian postal code. */
export function cleanPostalCode(input: unknown) {
  if (typeof input !== "string") return undefined;
  const code = input.toUpperCase().replace(/[\s-]/g, "");
  return POSTAL_CODE.test(code) ? `${code.slice(0, 3)} ${code.slice(3)}` : undefined;
}

const hasAreas = (option: ShippingOption): option is Extract<ShippingOption, { postalPrefixes: unknown }> =>
  "postalPrefixes" in option;

/** The delivery option for a postal code: a local one when it's in the area, else shipping across Canada. */
export function deliveryOptionFor(postalCode: string): ShippingOption {
  const prefix = postalCode.slice(0, 3);
  const local = shippingOptions.find(
    (o) => hasAreas(o) && (o.postalPrefixes as readonly string[]).includes(prefix),
  );
  return local ?? shippingOptions.find((o) => o.id === "canada")!;
}

export const pickupOption = shippingOptions.find((o) => o.id === "pickup")!;

/**
 * True when the delivery option chosen at checkout (by its label) doesn't cover the address
 * the buyer typed there, e.g. free local delivery to a Vancouver address.
 */
export function outsideArea(optionLabel: string | undefined, postalCode: string | null | undefined) {
  const option = shippingOptions.find((o) => o.label === optionLabel);
  if (!option || !hasAreas(option)) return false;
  const code = cleanPostalCode(postalCode);
  return !code || !(option.postalPrefixes as readonly string[]).includes(code.slice(0, 3));
}
