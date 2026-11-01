// Blog posts, newest first. Each post's text lives in its own file in content/posts/.

import type { ComponentType } from "react";
import ArtTherapyOttawa2026 from "@/content/posts/art-therapy-ottawa-2026";
import HalloweenWeekendOttawa2026 from "@/content/posts/halloween-weekend-ottawa-2026";
import HandmadeChristmasGiftsOttawa2026 from "@/content/posts/handmade-christmas-gifts-ottawa-2026";
import OttawaChristmasMarkets2026 from "@/content/posts/ottawa-christmas-markets-2026";

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
  /**
   * Product slugs the post's text writes about (its links and in-post product rows). Each of
   * those product pages links back to the post.
   */
  mentions?: string[];
  Body: ComponentType;
};

export const posts: Post[] = [
  {
    slug: "art-therapy-ottawa-2026",
    title: "Art therapy in Ottawa: groups, drop-ins and calm art-making this winter",
    description:
      "Free art groups for mental health, art therapy drop-ins and relaxed art-making sessions in Ottawa and Toronto for winter 2026, with dates, prices and how to find an art therapist.",
    date: "2026-11-01",
    minutes: 5,
    image: {
      src: "/images/blog/art-therapy-ottawa.jpg",
      share: "/images/blog/art-therapy-ottawa-share.jpg",
      alt: "A small painting of snowy pine trees at sunset on a wooden easel, beside a jar of brushes, a watercolour palette, a mug of tea and a glowing candle, in a cozy art studio with a window looking out on Parliament Hill in the snow",
    },
    featured: ["cherry-blossom-serenity", "twilight-tree", "wildflower-garden", "autumn-waterfall-magnet"],
    mentions: ["northern-lights-reflection", "moonlight-shadows", "peaceful-waterfall-magnet"],
    Body: ArtTherapyOttawa2026,
  },
  {
    slug: "ottawa-christmas-markets-2026",
    title: "Ottawa Christmas markets 2026: dates, locations and what to buy",
    description:
      "Every Ottawa Christmas market worth a visit in 2026, from Lansdowne and the Museum of History to Watson's Mill and the Originals sale, with dates, addresses, prices and gift ideas.",
    date: "2026-11-01",
    minutes: 5,
    image: {
      src: "/images/blog/ottawa-christmas-markets.jpg",
      share: "/images/blog/ottawa-christmas-markets-share.jpg",
      alt: "Handmade gifts on a snowy wooden table, including a robin card, a small painting of Parliament Hill on an easel, a maple leaf mug and a knit scarf, in front of lit Christmas market stalls with Parliament Hill behind at sunset",
    },
    featured: ["christmas-gnome-postcard", "happy-snowman-postcard", "autumn-waterfall-magnet", "twilight-tree"],
    mentions: [
      "christmas-gnome-postcard",
      "penguin-christmas-card",
      "christmas-cat-card",
      "peaceful-waterfall-magnet",
      "folk-flowers",
      "midnight-companion",
    ],
    Body: OttawaChristmasMarkets2026,
  },
  {
    slug: "handmade-christmas-gifts-ottawa-2026",
    title: "Handmade Christmas gifts from Ottawa, all under $40",
    description:
      "Hand-painted gift ideas from my Ottawa studio, from $2 postcards to $35 framed originals, plus where to find handmade gifts at Ottawa craft fairs this season.",
    date: "2026-10-30",
    minutes: 4,
    image: {
      src: "/images/blog/handmade-christmas-gifts-ottawa.jpg",
      share: "/images/blog/handmade-christmas-gifts-ottawa-share.jpg",
      alt: "Hand-painted Christmas gifts on a wooden table, including snowman and penguin cards and small painted tiles, beside a gift tag reading \"Handmade Christmas Gifts from Ottawa, all under $40\", with Parliament Hill behind",
    },
    featured: ["folk-flowers", "twilight-tree", "cherry-blossom-serenity", "midnight-blue-blossom"],
    mentions: [
      "christmas-gnome-postcard",
      "happy-snowman-postcard",
      "penguin-christmas-card",
      "winter-bird-christmas-card",
      "together-panda-postcard",
      "peaceful-waterfall-magnet",
      "autumn-waterfall-magnet",
      "northern-lights-reflection",
      "folk-rooster",
      "moonlight-shadows",
    ],
    Body: HandmadeChristmasGiftsOttawa2026,
  },
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
    mentions: ["midnight-blue-blossom", "moonlight-shadows", "twilight-tree"],
    Body: HalloweenWeekendOttawa2026,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Every product a post writes about or features at the end. */
const productsOf = (post: Post) => new Set([...(post.mentions ?? []), ...(post.featured ?? [])]);

/** Posts that write about or feature a product, newest first. */
export const postsAbout = (productSlug: string) => posts.filter((p) => productsOf(p).has(productSlug));

/**
 * Other posts to read next: the ones sharing the most products with this post first, then the
 * newest. Every post links to its neighbours this way without adding links by hand.
 */
export function relatedPosts(post: Post, count = 3) {
  const own = productsOf(post);
  const shared = (p: Post) => [...productsOf(p)].filter((slug) => own.has(slug)).length;
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, score: shared(p), i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map(({ p }) => p);
}

/** "2026-10-28" → "October 28, 2026". Read as UTC so the day doesn't shift with the time zone. */
export const postDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
