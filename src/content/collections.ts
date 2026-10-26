// Collections group the products by theme. Each product picks one with its `collection` field
// in products.ts, so piece counts and collection pages update on their own.

import { products, availableFirst, type Product } from "./products";

export type CollectionSlug = "folk-florals" | "nature-and-sky" | "little-gifts";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  blurb: string;
  /** Cover for the "Shop by collection" card. Made from the product photos by scripts/collection-covers.mjs. */
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "folk-florals",
    title: "Folk Florals",
    blurb: "Traditional folk patterns — bright blooms and a proud rooster on deep black.",
    image: "/images/collections/folk-florals.jpg",
  },
  {
    slug: "nature-and-sky",
    title: "Nature & Sky",
    blurb: "Sunsets, northern lights, moonlight, and gardens in bloom.",
    image: "/images/collections/nature-and-sky.jpg",
  },
  {
    slug: "little-gifts",
    title: "Little Gifts",
    blurb: "Hand-painted fridge magnets and postcards — small art, easy to give.",
    image: "/images/collections/little-gifts.jpg",
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/** Products in a collection, unsold ones first. */
export const productsIn = (slug: CollectionSlug): Product[] =>
  availableFirst(products.filter((p) => p.collection === slug));
