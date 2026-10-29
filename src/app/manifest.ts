import type { MetadataRoute } from "next";
import { shop } from "@/content/site";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: shop.name,
    short_name: shop.shortName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fdf9f3",
    theme_color: "#181a2c",
    lang: "en-CA",
    categories: ["shopping", "lifestyle"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
