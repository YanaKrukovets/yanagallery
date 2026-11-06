// Collections group the products by theme. Each product picks one with its `collection` field
// in products.ts, so piece counts and collection pages update on their own.

import { products, availableFirst, type Product } from "./products";

export type CollectionSlug = "christmas" | "folk-florals" | "nature-and-sky" | "cats" | "little-gifts";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  blurb: string;
  /** The page title in search results, worded the way people search. */
  seoTitle: string;
  /** Cover for the "Shop by collection" card. Made from the product photos by scripts/collection-covers.mjs. */
  image: string;
  /** Shown in the home page "Shop by collection" section (keep it to four). */
  onHome?: boolean;
  /** Show each design of a product as its own card on the collection page. */
  showDesigns?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "christmas",
    title: "Christmas",
    seoTitle: "Hand-Painted Christmas Cards, Ottawa",
    blurb: "Watercolour Christmas cards and postcards — snowy forests, gnomes, penguins and painted trees.",
    image: "/images/collections/christmas.jpg",
    onHome: true,
    showDesigns: true,
  },
  {
    slug: "folk-florals",
    title: "Folk Florals",
    seoTitle: "Folk Art Florals, Painted in Ottawa",
    blurb: "Traditional folk patterns — bright blooms and a proud rooster on deep black.",
    image: "/images/collections/folk-florals.jpg",
    onHome: true,
  },
  {
    slug: "nature-and-sky",
    title: "Nature & Sky",
    seoTitle: "Landscape & Night Sky Art, Ottawa",
    blurb: "Sunsets, northern lights, moonlight, and gardens in bloom.",
    image: "/images/collections/nature-and-sky.jpg",
    onHome: true,
  },
  {
    slug: "cats",
    title: "Cats",
    seoTitle: "Original Cat Paintings, Ottawa",
    blurb: "Quiet cats in oil on glass, with thick, textured brushstrokes in burgundy and midnight blue.",
    image: "/images/collections/cats.jpg",
  },
  {
    slug: "little-gifts",
    title: "Little Gifts",
    seoTitle: "Handmade Magnets & Postcards, Ottawa",
    blurb: "Hand-painted fridge magnets and postcards — small handmade gifts, easy to give.",
    image: "/images/collections/little-gifts.jpg",
    onHome: true,
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/** Products in a collection, unsold ones first. */
export const productsIn = (slug: CollectionSlug): Product[] =>
  availableFirst(products.filter((p) => p.collection === slug));
