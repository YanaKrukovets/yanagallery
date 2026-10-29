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
   * The post's picture (in public/), shown at the top of the post and in the blog list. `share`
   * is a 1200 × 630 crop of it for link previews on social media and in chats.
   */
  image?: { src: string; share: string; alt: string };
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
      "Day of the Dead altars, Nosferatu with a live choir, a museum night and craft fairs: art and handmade things to see in Ottawa over Halloween weekend 2026.",
    date: "2026-10-28",
    minutes: 4,
    image: {
      src: "/images/blog/halloween-cat-porch.jpg",
      share: "/images/blog/halloween-cat-porch-share.jpg",
      alt: "A black cat in a witch hat sitting on a porch beside glowing jack-o'-lanterns, a lantern and autumn leaves",
    },
    // Midnight Blue Blossom, Moonlight Shadows and Twilight Tree are shown together inside the post.
    featured: ["northern-lights-reflection", "wildflower-garden", "folk-rooster", "cherry-blossom-serenity"],
    Body: HalloweenWeekendOttawa2026,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** "2026-10-28" → "October 28, 2026". Read as UTC so the day doesn't shift with the time zone. */
export const postDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
