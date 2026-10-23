/** Formats a whole-dollar price, e.g. 35 → "$35". */
export const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

/** Turns a display phone number into a `tel:` link, e.g. "+1 (613) 555-0142" → "tel:+16135550142". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

/** Builds a `mailto:` link with an optional subject and body. */
export function mailtoHref(email: string, { subject, body }: { subject?: string; body?: string } = {}) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${email}${query ? `?${query}` : ""}`;
}
