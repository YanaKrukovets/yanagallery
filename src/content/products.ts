// The artwork for sale. Product photos live in /public/images/products/<slug>/ (main.jpg, close.jpg, designs, back.jpg).
// Mark one-of-a-kind pieces with `original: true` so they can only be added to the bag once.
// Every product belongs to one collection (see collections.ts).
// When a piece sells, set `sold: true`: it stays on the site but can't be bought.
// A product sold in several designs lists them in `designs`; buyers pick one on its page.

import type { CollectionSlug } from "./collections";

export type Design = {
  /** Short id saved in the bag, e.g. "love-you". Keep it the same once the product is live. */
  id: string;
  name: string;
  image: string;
};

export type Product = {
  slug: string;
  title: string;
  /** Which "Shop by collection" group it belongs to. */
  collection: CollectionSlug;
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
  /** Designs to choose from. The first one is the default; its photo should match `image`. */
  designs?: Design[];
};

const uniqueNote = "Each piece is individually hand-painted, making it truly unique.";

export const bestSellers: Product[] = [
  {
    slug: "folk-rooster",
    collection: "folk-florals",
    title: "Folk Rooster",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/folk-rooster/main.jpg",
    gallery: ["/images/products/folk-rooster/close.jpg"],
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
    collection: "nature-and-sky",
    title: "Twilight Tree",
    medium: "Acrylic & resin · square wood frame",
    price: 35,
    image: "/images/products/twilight-tree/main.jpg",
    gallery: ["/images/products/twilight-tree/close.jpg"],
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
    collection: "folk-florals",
    title: "Folk Flowers",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/folk-flowers/main.jpg",
    gallery: ["/images/products/folk-flowers/close.jpg"],
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
    slug: "peaceful-waterfall-magnet",
    collection: "little-gifts",
    title: "Peaceful Waterfall",
    medium: "Hand-painted oil fridge magnet",
    price: 15,
    image: "/images/products/peaceful-waterfall-magnet/main.jpg",
    gallery: ["/images/products/peaceful-waterfall-magnet/close.jpg"],
    badge: "New",
    original: true,
    description:
      "A beautiful miniature landscape featuring a bright blue waterfall surrounded by lush green trees, distant mountains, and birds flying across the sky. This one-of-a-kind fridge magnet is individually hand-painted with oil paints and finished with a water-based glossy protective coating. A charming little piece of original art, perfect for decorating your fridge or giving as a thoughtful handmade gift.",
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Oil paint" },
      { label: "Finish", value: "Water-based glossy protective coating" },
      { label: "Size", value: "3 × 3 in (7.5 × 7.5 cm)" },
      { label: "Type", value: "Decorative fridge magnet" },
    ],
  },
  {
    slug: "autumn-waterfall-magnet",
    collection: "little-gifts",
    title: "Autumn Waterfall",
    medium: "Hand-painted oil fridge magnet",
    price: 15,
    image: "/images/products/autumn-waterfall-magnet/main.jpg",
    gallery: ["/images/products/autumn-waterfall-magnet/close.jpg"],
    badge: "New",
    original: true,
    description:
      "Bring a touch of nature into your home with this beautiful, one-of-a-kind fridge magnet featuring a peaceful waterfall surrounded by colourful autumn trees. Each magnet is individually hand-painted with oil paints and finished with a water-based glossy coating for a beautiful shine and protection. A lovely little piece of art, perfect for decorating your fridge or giving as a unique handmade gift.",
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Oil paint" },
      { label: "Finish", value: "Water-based glossy protective coating" },
      { label: "Size", value: "3 × 3 in (7.5 × 7.5 cm)" },
      { label: "Type", value: "Decorative fridge magnet" },
    ],
  },
  {
    slug: "christmas-gnome-postcard",
    collection: "little-gifts",
    title: "Christmas Gnome",
    medium: "Hand-painted watercolour postcard",
    price: 3,
    image: "/images/products/christmas-gnome-postcard/love-letter.jpg",
    // The back of the card, shown after the chosen design.
    gallery: ["/images/products/christmas-gnome-postcard/back.jpg"],
    badge: "New",
    designs: [
      { id: "love-letter", name: "Love Letter", image: "/images/products/christmas-gnome-postcard/love-letter.jpg" },
      { id: "joy", name: "Joy", image: "/images/products/christmas-gnome-postcard/joy.jpg" },
    ],
    description:
      "A charming, one-of-a-kind Christmas postcard featuring a whimsical holiday gnome holding a little love letter. Hand-painted with watercolours and decorated with festive details, this original artwork is perfect for sending holiday wishes or giving as a special keepsake. Each postcard is a unique piece of handmade art, created with care.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
      { label: "Style", value: "Whimsical Christmas illustration" },
      { label: "Perfect for", value: "Christmas, holiday greetings, or festive gifting" },
    ],
  },
  {
    slug: "together-panda-postcard",
    collection: "little-gifts",
    title: "Together",
    medium: "Hand-painted watercolour postcard",
    price: 2,
    image: "/images/products/together-panda-postcard/together.jpg",
    // The blank back of the card, shown after the chosen design.
    gallery: ["/images/products/together-panda-postcard/back.jpg"],
    badge: "New",
    designs: [
      { id: "together", name: "Together", image: "/images/products/together-panda-postcard/together.jpg" },
      { id: "love-you", name: "Love You", image: "/images/products/together-panda-postcard/love-you.jpg" },
      { id: "love", name: "Love", image: "/images/products/together-panda-postcard/love.jpg" },
      { id: "love-heart", name: "Love ♡", image: "/images/products/together-panda-postcard/love-heart.jpg" },
      { id: "no-words", name: "No words", image: "/images/products/together-panda-postcard/no-words.jpg" },
    ],
    description:
      "A sweet and charming original watercolour painting featuring two adorable pandas sitting together beneath a pink heart-shaped balloon. With delicate watercolour details and playful red splashes, this little artwork celebrates love, friendship, and togetherness. Each postcard is lovingly hand-painted on textured watercolour paper, making it a unique, one-of-a-kind piece of art. The back is left blank for your own message. A tiny piece of art with a big message: love is better together!",
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Watercolour and ink on textured paper" },
      { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
      { label: "Back", value: "Blank, for your own message" },
      { label: "Style", value: "Cute, romantic, whimsical" },
      { label: "Perfect for", value: "Valentine's Day, anniversaries, friendship gifts, or just because" },
    ],
  },
  {
    slug: "wildflower-garden",
    collection: "nature-and-sky",
    title: "Wildflower Garden",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/wildflower-garden/main.jpg",
    badge: "New",
    original: true,
    description:
      "A colourful garden of wildflowers comes to life with delicate brushstrokes of pink, red, blue, and yellow against a lush green background. This miniature painting captures the beauty of a blooming summer garden. Hand-painted with acrylics and finished with a glossy epoxy resin coating that enhances the colours and protects the artwork. Presented in a natural wooden hexagonal frame, ready to hang. A one-of-a-kind handmade artwork, perfect for adding a touch of nature and colour to your home or giving as a thoughtful gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Impressionist, floral, nature-inspired" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
  {
    slug: "northern-lights-reflection",
    collection: "nature-and-sky",
    title: "Northern Lights Reflection",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/northern-lights-reflection/main.jpg",
    badge: "New",
    original: true,
    description:
      "Experience the magic of the night sky with this miniature painting inspired by the Northern Lights. Soft waves of green, purple, and golden light dance above a peaceful lake, reflecting beautifully across the water. Silhouetted trees and distant hills create a dreamy, mysterious atmosphere. Hand-painted with acrylics and finished with a glossy epoxy resin coating that enhances the colours and adds depth. Presented in a rustic natural wooden hexagonal frame, ready to hang. A one-of-a-kind handmade artwork, perfect for nature lovers, cozy home decor, or a thoughtful gift. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Acrylic paint with glossy epoxy resin coating" },
      { label: "Frame", value: "Natural wood, hexagonal" },
      { label: "Size", value: "4.9 × 4.9 in (12.4 × 12.4 cm)" },
      { label: "Style", value: "Landscape, Northern Lights, nature-inspired" },
      { label: "Ready to hang", value: "Includes a natural rope hanger" },
    ],
  },
  {
    slug: "moonlight-shadows",
    collection: "nature-and-sky",
    title: "Moonlight Shadows",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/moonlight-shadows/main.jpg",
    gallery: ["/images/products/moonlight-shadows/close.jpg"],
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
    collection: "folk-florals",
    title: "Floral Harmony",
    medium: "Acrylic & resin · square wood frame",
    price: 35,
    image: "/images/products/floral-harmony/main.jpg",
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
    collection: "folk-florals",
    title: "Midnight Blue Blossom",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/midnight-blue-blossom/main.jpg",
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
    collection: "nature-and-sky",
    title: "Cherry Blossom Serenity",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/cherry-blossom-serenity/main.jpg",
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

/** Unsold pieces first; sold ones keep their order at the end. */
export const availableFirst = (list: Product[]) =>
  [...list].sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** The "Size" line from a product's details, if it has one. */
export const sizeOf = (product: Product) => product.details?.find((d) => d.label === "Size")?.value;

/** Every photo of a product: the main one first, then the gallery. */
export const photosOf = (product: Product) => [product.image, ...(product.gallery ?? [])];

/** Finds a product's design by id. Returns undefined for products without designs. */
export const designOf = (product: Product, id: string | undefined) => product.designs?.find((d) => d.id === id);
