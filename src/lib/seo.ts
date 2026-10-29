// Search engine and AI search helpers: the site address, absolute URLs, and the
// schema.org structured data (JSON-LD) that describes the shop, the artist, and each piece.

import type { Metadata } from "next";
import { collections } from "@/content/collections";
import type { Post } from "@/content/journal";
import { photosOf, type Product } from "@/content/products";
import { images, shop } from "@/content/site";

/** The live address. `SITE_URL` on the host overrides it (e.g. for a preview deploy). */
export const siteUrl = (process.env.SITE_URL || "https://ottawaartist.ca").replace(/\/$/, "");

/** Turns a path like "/products" into "https://ottawaartist.ca/products". */
export const absoluteUrl = (path = "/") => new URL(path, `${siteUrl}/`).toString();

/** The default share picture (app/opengraph-image.tsx), for pages that don't make their own. */
const defaultShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `Hand-painted art by Ottawa artist ${shop.artist}`,
};

export const siteDescription = `Original hand-painted art by Ottawa artist ${shop.artist}: folk art florals, night skies and landscapes in acrylic and resin, plus hand-painted postcards and fridge magnets. Shop online, with free pickup in Blackburn Hamlet and shipping across Canada.`;

/**
 * Title, description, canonical link and share card for one page. Next.js replaces a parent's
 * `openGraph` instead of merging it, so every page passes the whole thing. The share pictures
 * come from the opengraph-image files in app/ (see lib/shareImage.tsx).
 */
export function pageMetadata({
  title,
  description,
  path,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  /** True when the page has its own opengraph-image file next to it. */
  ownImage?: boolean;
}): Metadata {
  // Leave `images` out entirely when the page has its own file; even `images: undefined` hides it.
  const images = ownImage ? {} : { images: [defaultShareImage] };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: shop.name,
      locale: "en_CA",
      url: path,
      title: `${title} | ${shop.name}`,
      description,
      ...images,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${shop.name}`, description, ...images },
  };
}

// Stable ids so the pieces of structured data can point at each other.
const ids = {
  website: `${siteUrl}/#website`,
  store: `${siteUrl}/#store`,
  artist: `${siteUrl}/#artist`,
};

const returnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "CA",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 14,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
  merchantReturnLink: absoluteUrl("/terms"),
};

/** The website, the shop, and the artist. Rendered once, in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absoluteUrl("/"),
        name: shop.name,
        alternateName: [`${shop.artist} Art`, "Ottawa Artist"],
        description: siteDescription,
        inLanguage: "en-CA",
        publisher: { "@id": ids.store },
      },
      {
        "@type": "OnlineStore",
        "@id": ids.store,
        name: shop.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.png"),
        image: absoluteUrl(images.hero),
        description: siteDescription,
        email: shop.email,
        founder: { "@id": ids.artist },
        sameAs: [shop.instagram],
        currenciesAccepted: "CAD",
        areaServed: [
          { "@type": "City", name: "Ottawa" },
          { "@type": "Country", name: "Canada" },
        ],
        hasMerchantReturnPolicy: returnPolicy,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: shop.email,
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "Person",
        "@id": ids.artist,
        name: shop.artist,
        jobTitle: "Artist",
        description: `${shop.artist} is an artist based in Ottawa, Ontario, who paints small original works: traditional folk art florals and roosters on black, night skies, sunsets and landscapes in acrylic sealed with resin, and hand-painted oil and watercolour postcards and fridge magnets.`,
        url: absoluteUrl("/"),
        image: absoluteUrl(images.artist),
        email: shop.email,
        sameAs: [shop.instagram],
        homeLocation: {
          "@type": "Place",
          name: "Ottawa, Ontario, Canada",
          address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressRegion: "ON", addressCountry: "CA" },
        },
        knowsAbout: ["Folk art", "Acrylic painting", "Resin art", "Oil painting", "Watercolour", "Landscape painting"],
        worksFor: { "@id": ids.store },
      },
    ],
  };
}

/** A breadcrumb trail, e.g. Home › Products › Folk Rooster. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

/** One piece for sale, with its price, stock, delivery, and returns. */
export function productJsonLd(product: Product) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const collection = collections.find((c) => c.slug === product.collection);
  const detail = (label: string) => product.details?.find((d) => d.label === label)?.value;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    url,
    sku: product.slug,
    image: photosOf(product).map((src) => absoluteUrl(src)),
    description: product.description ?? product.medium,
    category: collection?.title,
    material: detail("Medium"),
    size: detail("Size"),
    brand: { "@type": "Brand", name: shop.name },
    creator: { "@id": ids.artist },
    additionalProperty: product.details?.map((d) => ({
      "@type": "PropertyValue",
      name: d.label,
      value: d.value,
    })),
    offers: {
      "@type": "Offer",
      url,
      price: product.price.toFixed(2),
      priceCurrency: "CAD",
      availability: product.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ids.store },
      hasMerchantReturnPolicy: returnPolicy,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          // Matches the 1–7 days quoted at checkout (content/site.ts).
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 7, unitCode: "DAY" },
        },
      },
    },
  };
}

/** A list of pieces, for the products and collection pages. */
export function itemListJsonLd(name: string, path: string, list: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    isPartOf: { "@id": ids.website },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: list.length,
      itemListElement: list.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/products/${p.slug}`),
        name: p.title,
      })),
    },
  };
}

/** One blog post. */
export function blogPostingJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    inLanguage: "en-CA",
    author: { "@id": ids.artist },
    publisher: { "@id": ids.store },
    isPartOf: { "@id": ids.website },
  };
}

/** The FAQ on the home page. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
