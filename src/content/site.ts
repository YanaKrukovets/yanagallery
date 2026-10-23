// Shop-wide details and the short bits of copy used across the page.
// Placeholder images are Unsplash stand-ins (see README.md for a shot list).

import { unsplash } from "@/lib/images";

export const shop = {
  name: "Yana Krukovets Gallery",
  artist: "Yana Krukovets",
  shortName: "Krukovets",
  tagline: "Ottawa artist · Original art, shop online",
  // Placeholder contact details — replace before launch.
  email: "hello@yanakrukovets.ca",
  phone: "+1 (613) 555-0142",
};

export type NavLink = { href: string; label: string };

/** Header links. The first half sits left of the logo on desktop, the rest on the right. */
export const navLinks: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/#collections", label: "Collections" },
  { href: "/#contact", label: "Contact" },
];

export const images = {
  // Composited from the product photos in public/images
  hero: "/images/hero-gallery-wall.jpg",
  heroSecondary: "/images/hero-gallery-detail.jpg",
  artist: unsplash("1452802447250-470a88ac82bc", 1200),
  artistDetail: unsplash("1499892477393-f675706cbe6e", 800),
  shop: unsplash("1518998053901-5348d3961a04", 1600),
};

export const features = [
  {
    title: "Made in Ottawa",
    body: "Every piece is painted in Yana's Ottawa studio, inspired by the city and the hills around it.",
  },
  {
    title: "Made by hand",
    body: "One-of-a-kind originals, plus small-edition prints signed by the artist.",
  },
  {
    title: "Online only",
    body: "No storefront, no gallery markup. Browse from your couch and the art comes to your door.",
  },
  {
    title: "Free local pickup",
    body: "Free pickup in Blackburn Hamlet, shipping across Canada, and 30-day returns on prints.",
  },
];

export const tickerItems = [
  "Original art by Yana Krukovets",
  "Painted in Ottawa",
  "Free pickup in Blackburn Hamlet",
  "Bonjour · Hello",
  "Originals & signed prints",
  "Shop online, delivered to your door",
];

export const philosophy =
  "I think the best art isn't the loudest thing in the room. It's the piece that catches the light on a February afternoon and reminds you why you stayed.";

// Placeholder numbers — replace with your real figures.
export const stats = [
  { value: 120, suffix: "+", label: "Original works" },
  { value: 10, suffix: "+", label: "Years painting" },
  { value: 100, suffix: "%", label: "Painted in Ottawa" },
];

export const commissionSteps = [
  { title: "Tell me about it", body: "Your space, the size, a place or a memory — send photos and a few words." },
  { title: "See a sketch", body: "You'll get a sketch, colour notes, and a quote. No rush, no pressure." },
  { title: "Hang it", body: "The finished piece is delivered ready to hang. Hardware is always included." },
];
