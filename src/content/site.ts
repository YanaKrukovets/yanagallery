// Shop-wide details and the short bits of copy used across the page.

export const shop = {
  name: "Yana Krukovets Gallery",
  artist: "Yana Krukovets",
  shortName: "Krukovets",
  tagline: "Ottawa artist · Handmade art & gifts",
  email: "krukovets.yana@gmail.com",
  instagram: "https://www.instagram.com/sunny_art87/",
};

/**
 * Turn online payment off while there's a problem with it. When `paused` is true, the bag
 * hides "Pay now", shows `notice` instead, and the server refuses to start a checkout.
 * Set it back to false to bring online payment back.
 */
export const onlinePayments = {
  paused: true,
  notice:
    "Sorry! We're having temporary technical problems with online payment. Right now you can pay in person or by Interac e-Transfer. Pickup and local delivery are available in Blackburn Hamlet. Send me an email and we'll set it up.",
};

/**
 * Delivery choices, in whole Canadian dollars. Buyers pick pickup or delivery in the bag
 * before paying. Pickup skips the address at checkout. For delivery they type a postal code,
 * and checkout offers the local option whose `postalPrefixes` match its first three
 * characters, or shipping across Canada when none do.
 * `hideOnTerms` keeps an option at checkout but leaves it off the Terms page.
 * Placeholder prices — set your real rates before launch.
 */
export const shippingOptions = [
  { id: "pickup", label: "Local pickup (Blackburn Hamlet)", price: 0, days: [1, 7] },
  {
    id: "local",
    label: "Local delivery (Blackburn Hamlet)",
    price: 0,
    days: [1, 7],
    postalPrefixes: ["K1B"],
  },
  {
    id: "nearby",
    label: "Local delivery (Gatineau, Kanata, Orléans, Barrhaven)",
    hideOnTerms: true,
    price: 10,
    days: [1, 7],
    postalPrefixes: [
      // Orléans
      "K1C", "K1E", "K1W", "K4A",
      // Kanata
      "K2K", "K2L", "K2M", "K2T", "K2V", "K2W",
      // Barrhaven
      "K2G", "K2J",
      // Gatineau
      "J8L", "J8M", "J8P", "J8R", "J8T", "J8V", "J8X", "J8Y", "J8Z", "J9A", "J9H", "J9J",
    ],
  },
  { id: "canada", label: "Shipping across Canada", hideOnTerms: true, price: 20, days: [1, 7] },
] as const;

/**
 * Lettermail envelope, offered at checkout only when everything in the bag has a `letterGrams`
 * weight (postcards, magnets). Prices cover Canada Post's "Other Lettermail" stamp price plus
 * tax ($2.61 up to 100 g, $4.29 up to 200 g in 2026). Heavier bags go as a parcel.
 */
export const lettermail = {
  label: "Lettermail envelope, no tracking (postcards and magnets only)",
  /** The envelope and card backing. */
  envelopeGrams: 10,
  tiers: [
    { upToGrams: 100, price: 3 },
    { upToGrams: 200, price: 5 },
  ],
  days: [1, 7],
} as const;

/**
 * Canada Post Regular Parcel counter prices before tax, from the consumer price guide
 * updated September 7, 2026. Shown on the Terms page so buyers can see where the
 * shipping prices come from.
 */
export const canadaPostEstimates = {
  updated: "September 2026",
  rows: [
    { weight: "Up to 0.5 kg", local: 11.24, typical: 16.28, remote: 21.84 },
    { weight: "Up to 1 kg", local: 12.39, typical: 18.53, remote: 25.67 },
    { weight: "Up to 2 kg", local: 12.5, typical: 20.55, remote: 30.32 },
  ],
  calculatorUrl: "https://www.canadapost-postescanada.ca/cpc/en/tools/find-a-rate.page",
};

export type NavLink = { href: string; label: string };

/** Header links. The first half sits left of the logo on desktop, the rest on the right. */
export const navLinks: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/gifts", label: "Gifts" },
  { href: "/collections", label: "Collections" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export const images = {
  // Composited from the product photos in public/images
  hero: "/images/site/hero-gallery-wall.jpg",
  heroSecondary: "/images/site/hero-gallery-detail.jpg",
  // Photos of the work. Swap for studio photos of Yana when there are some (see README.md).
  artist: "/images/products/northern-lights-reflection/main.jpg",
  artistDetail: "/images/products/cherry-blossom-serenity/main.jpg",
  shop: "/images/products/floral-harmony/main.jpg",
};

export const features = [
  {
    title: "Made in Ottawa",
    body: "Every piece is painted in Yana's Ottawa studio, inspired by the city and the hills around it.",
  },
  {
    title: "Made by hand",
    body: "Every piece is a one-of-a-kind original, painted by hand. No prints, no copies.",
  },
  {
    title: "Affordable art",
    body: "No storefront, no gallery markup, so prices stay fair for collectors and first-time art lovers alike.",
  },
  {
    title: "Free local delivery",
    body: "Free pickup and delivery in Blackburn Hamlet, shipping across Canada, and 14-day returns.",
  },
];

export const tickerItems = [
  "Original art by Yana Krukovets",
  "Painted in Ottawa",
  "Free pickup & delivery in Blackburn Hamlet",
  "Bonjour · Hello",
  "One-of-a-kind originals",
  "Affordable art for collectors & art lovers",
  "Shop online, delivered to your door",
];

export const philosophy =
  "I think the best art isn't the loudest thing in the room. It's the piece that catches the light on a February afternoon and reminds you why you stayed.";

// Placeholder numbers — replace with your real figures.
export const stats = [
  { value: 50, suffix: "+", label: "Original works" },
  { value: 5, suffix: "+", label: "Years painting" },
  { value: 100, suffix: "%", label: "Painted in Ottawa" },
];

export const commissionSteps = [
  { title: "Tell me about it", body: "Your space, the size, a place or a memory — send photos and a few words." },
  { title: "See a sketch", body: "You'll get a sketch, colour notes, and a quote. No rush, no pressure." },
  { title: "Hang it", body: "The finished piece is delivered ready to hang. Hardware is always included." },
];
