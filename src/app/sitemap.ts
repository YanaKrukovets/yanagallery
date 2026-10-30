import type { MetadataRoute } from "next";
import { collections } from "@/content/collections";
import { posts } from "@/content/journal";
import { photosOf, products } from "@/content/products";
import { images } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl(images.hero), absoluteUrl(images.heroSecondary)],
    },
    { url: absoluteUrl("/products"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/gifts"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/collections"), changeFrequency: "weekly", priority: 0.85 },
    ...collections.map((c) => ({
      url: absoluteUrl(`/collections/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [absoluteUrl(c.image)],
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: photosOf(p).map((src) => absoluteUrl(src)),
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
