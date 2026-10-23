// The artwork for sale. Product photos live in /public/images.
// Mark one-of-a-kind pieces with `original: true` so they can only be added to the bag once.
// When a piece sells, set `sold: true`: it stays on the site but can't be bought.

export type Product = {
  slug: string;
  title: string;
  medium: string;
  /** Price in whole Canadian dollars. */
  price: number;
  image: string;
  /** Extra photos (e.g. close-ups) shown after the main image. */
  gallery?: string[];
  /** Short label on the photo, e.g. "New" or "Last one". */
  badge?: string;
  /** One-of-a-kind piece: it can only be added to the bag once. */
  original?: boolean;
  /** Sold pieces stay on the site with a "Sold" label but can't be added to the bag. */
  sold?: boolean;
  description?: string;
  details?: { label: string; value: string }[];
};

const uniqueNote = "Each piece is individually hand-painted, making it truly unique.";

export const bestSellers: Product[] = [
  {
    slug: "folk-rooster",
    title: "Folk Rooster",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/folk-rooster.jpg",
    gallery: ["/images/rooster_close.jpg"],
    original: true,
    description:
      "Bring a touch of traditional folk art into your home with this charming, one-of-a-kind rooster painting. Hand-painted with acrylic paints, it features a colourful rooster surrounded by delicate flowers and decorative greenery on a rich black background. A glossy epoxy resin coating enhances the colours and gives it a beautiful, polished finish. Presented in a natural wooden hexagonal frame, it's a lovely accent for a cozy home or a thoughtful handmade gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Traditional folk art, floral, rustic" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
  {
    slug: "twilight-tree",
    title: "Twilight Tree",
    medium: "Acrylic & resin · square wood frame",
    price: 35,
    image: "/images/twilight-tree.jpg",
    gallery: ["/images/tree_close.jpg"],
    original: true,
    description:
      "Bring a little magic of the night sky into your home with this beautiful, one-of-a-kind tree painting. Hand-painted with acrylic paints, it features a peaceful tree silhouette against a dreamy sunset sky, blending warm orange, soft purple, and deep blue tones with delicate stars. A glossy epoxy resin coating enhances the colours and adds a beautiful polished finish. Presented in a natural wooden square frame, this miniature artwork is perfect for a cozy home, gallery wall, or thoughtful handmade gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, square" },
      // TODO: add the real size, e.g. { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Landscape, nature, sunset, night sky" },
      // TODO: if it comes with a hanger, add { label: "Ready to hang", value: "..." },
    ],
  },
  {
    slug: "folk-flowers",
    title: "Folk Flowers",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/folk-flowers.jpg",
    gallery: ["/images/flowers_close.jpg"],
    original: true,
    description:
      "Add a touch of colour and traditional folk art charm to your home with this beautiful, one-of-a-kind floral painting. Hand-painted with acrylic paints, it features delicate red and orange flowers, soft green leaves, and tiny white blossoms against a rich black background. A glossy epoxy resin coating protects the painting and enhances its natural beauty. Presented in a light wooden hexagonal frame with a rustic rope hanger, this charming piece is perfect for a cozy home, gallery wall, or thoughtful handmade gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Traditional folk art, floral, rustic" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
];

// Add pieces here to show the "New arrivals" section (hidden while empty).
// Only the first 3 are shown on the home page, so put the newest at the top.
export const newArrivals: Product[] = [
  {
    slug: "moonlight-shadows",
    title: "Moonlight Shadows",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/moonlight-shadows.jpg",
    gallery: ["/images/moon_close.jpg"],
    badge: "New",
    original: true,
    description:
      "Bring a touch of mystery and celestial beauty into your home with this one-of-a-kind artwork inspired by the moon's textured surface. Hand-painted with acrylic paints in soft blue-grey tones with deep navy details, it features a glossy epoxy resin finish that adds depth and shine. Set in a natural wooden hexagonal frame, it's a charming addition to any room or a thoughtful gift for moon lovers. A little piece of the moon for your home. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with glossy epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      // TODO: add the real size, e.g. { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Moon-inspired, celestial, minimalist" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
  {
    slug: "floral-harmony",
    title: "Floral Harmony",
    medium: "Acrylic & resin · square wood frame",
    price: 35,
    image: "/images/floral-harmony.jpg",
    badge: "New",
    original: true,
    description:
      "Bring warmth and traditional folk art charm into your home with this beautiful, one-of-a-kind floral painting. This original artwork features delicate red, pink, and golden flowers surrounded by flowing green leaves and decorative details on a rich black background. Hand-painted with acrylic paints and finished with a glossy epoxy resin coating for a beautiful, polished look. Presented in a natural wooden square frame, this miniature artwork makes a lovely addition to a gallery wall, cozy living space, or a thoughtful handmade gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, square" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Traditional folk art, floral, rustic" },
    ],
  },
  {
    slug: "midnight-blue-blossom",
    title: "Midnight Blue Blossom",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/midnight-blue-blossom.jpg",
    badge: "New",
    original: true,
    description:
      "A delicate blue flower blooms against a deep black background, surrounded by vibrant green leaves and intricate decorative details. This charming miniature artwork combines traditional floral beauty with a rustic wooden frame. Hand-painted with acrylic paints and finished with a glossy epoxy resin coating. A unique, handmade piece of art, perfect for a cozy home, gallery wall, or thoughtful gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with glossy epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Floral, folk art, rustic" },
    ],
  },
  {
    slug: "cherry-blossom-serenity",
    title: "Cherry Blossom Serenity",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/cherry-blossom-serenity.jpg",
    badge: "New",
    original: true,
    description:
      "A beautiful pink cherry blossom tree stands beside peaceful blue waters, surrounded by lush green hills. This miniature landscape captures the beauty and tranquility of spring, bringing a touch of nature and calm to any space. Hand-painted with acrylics and finished with a glossy epoxy resin coating that enhances the colours and protects the artwork. Presented in a charming natural wooden hexagonal frame, ready to hang. A one-of-a-kind handmade artwork, perfect for home decor, a gallery wall, or a thoughtful gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Landscape, floral, nature-inspired" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
];

export const products: Product[] = [...bestSellers, ...newArrivals];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** The "Size" line from a product's details, if it has one. */
export const sizeOf = (product: Product) => product.details?.find((d) => d.label === "Size")?.value;

/** Every photo of a product: the main one first, then the gallery. */
export const photosOf = (product: Product) => [product.image, ...(product.gallery ?? [])];
