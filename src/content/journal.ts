// Blog posts, newest first. Each post's text lives in its own file in content/posts/.

import type { ComponentType } from "react";
import HalloweenWeekendOttawa2026 from "@/content/posts/halloween-weekend-ottawa-2026";

export type Post = {
  slug: string;
  title: string;
  /** One or two sentences for the blog list, search results and share cards. */
  description: string;
  /** Publish date, as YYYY-MM-DD. */
  date: string;
  minutes: number;
  /**
   * Product slugs to show in the "From the studio" section at the end of the post. Sold ones
   * are skipped, and other available pieces fill the rest of the row.
   */
  featured?: string[];
  Body: ComponentType;
};

export const posts: Post[] = [
  {
    slug: "halloween-weekend-ottawa-2026",
    title: "An artsy Halloween weekend in Ottawa",
    description:
      "Day of the Dead altars, Nosferatu with a live choir, a night at the Museum of Nature and a few craft markets: where to find art and handmade things in Ottawa over Halloween weekend, October 30 to November 1, 2026.",
    date: "2026-10-28",
    minutes: 4,
    // Night pieces, for Halloween. Moonlight Shadows is shown inside the post instead.
    featured: ["twilight-tree", "northern-lights-reflection", "midnight-blue-blossom", "wildflower-garden"],
    Body: HalloweenWeekendOttawa2026,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** "2026-10-28" → "October 28, 2026". Read as UTC so the day doesn't shift with the time zone. */
export const postDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
