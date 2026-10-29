import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

// AI search and assistant crawlers, named so it's clear they're welcome. These are the bots that
// let ChatGPT, Claude, Perplexity, Gemini, Copilot and Apple Intelligence find and cite the shop.
const aiCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
  "MistralAI-User",
];

// Pages that are private to one buyer and shouldn't show up anywhere.
const privatePaths = ["/checkout/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
