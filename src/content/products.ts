// The artwork for sale. Product photos live in /public/images/products/<slug>/ (main.jpg, close.jpg, designs, back.jpg).
// Mark one-of-a-kind pieces with `original: true` so they can only be added to the bag once.
// Keep an original's slug to 31 characters or fewer (checkout tags Stripe payments with it).
// Every product belongs to one collection (see collections.ts).
// Originals paid for online are marked "Sold" on their own (see features/cart/sales.ts).
// When a piece sells in person, set `sold: true`: it stays on the site but can't be bought.
// A product sold in several designs lists them in `designs`; buyers pick one on its page.

import type { CollectionSlug } from "./collections";

export type Design = {
  /** Short id saved in the bag, e.g. "love-you". Keep it the same once the product is live. */
  id: string;
  name: string;
  image: string;
  /** Shown after the design's photo instead of the product's gallery, e.g. its own back side. */
  gallery?: string[];
  /** Shown instead of the product's description while this design is picked. */
  description?: string;
  /** Shown instead of the product's details while this design is picked. */
  details?: { label: string; value: string }[];
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
  /**
   * Weight in grams, for small flat pieces that fit in a Lettermail envelope (postcards,
   * magnets). Bags with only these pieces can be sent by Lettermail. Leave it out for anything
   * that needs a box.
   */
  letterGrams?: number;
  description?: string;
  details?: { label: string; value: string }[];
  /** Designs to choose from. The first one is the default; its photo should match `image`. */
  designs?: Design[];
  /**
   * Alt text for photos, keyed by photo path. Describe what the photo shows, for screen readers
   * and image search. Photos left out get a plain default naming the piece.
   */
  alts?: Record<string, string>;
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
    alts: {
      "/images/products/folk-rooster/main.jpg":
        "Round folk art painting of a red rooster among red flowers, white blossoms and green swirling leaves on a glossy black background, in a natural wood hexagonal frame hanging from a rope",
      "/images/products/folk-rooster/close.jpg":
        "Close-up of the folk rooster painting: a red and coral rooster with white dot details among flowers and green leaves under a glossy resin finish",
    },
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
    alts: {
      "/images/products/twilight-tree/main.jpg":
        "Round painting of a lone tree silhouette under a purple and blue starry sky with an orange sunset glow, in a square natural wood frame on a wall",
      "/images/products/twilight-tree/close.jpg":
        "Close-up of the twilight tree painting: a dark tree silhouette against a starry purple sky fading into an orange sunset, with a glossy resin finish",
    },
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
    alts: {
      "/images/products/folk-flowers/main.jpg":
        "Round folk art painting of red and coral flowers with green leaves, red berries and white blossoms on a glossy black background, in a natural wood hexagonal frame hanging from a rope",
      "/images/products/folk-flowers/close.jpg":
        "Close-up of the folk flowers painting: red paisley-shaped petals with white dots, green leaves and small white flowers under a glossy resin finish",
    },
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
  {
    slug: "floral-harmony",
    collection: "folk-florals",
    title: "Floral Harmony",
    medium: "Acrylic & resin · square wood frame",
    price: 35,
    image: "/images/products/floral-harmony/main.jpg",
    original: true,
    alts: {
      "/images/products/floral-harmony/main.jpg":
        "Square folk art painting of red, pink and golden flowers with flowing green leaves on a glossy black background, in a natural wood square frame on a wall",
    },
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
];

// Add pieces here to show the "New arrivals" section (hidden while empty).
// Only the first 4 are shown on the home page, so put the newest at the top.
export const newArrivals: Product[] = [
  {
    slug: "christmas-cardinal-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Christmas Cardinal",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/christmas-cardinal-card/ornaments-below.jpg",
    // The blank back of the card, shown after the chosen design.
    gallery: ["/images/products/christmas-cardinal-card/back.jpg"],
    badge: "New",
    designs: [
      {
        id: "ornaments-below",
        name: "Cardinal with Ornament Cluster",
        image: "/images/products/christmas-cardinal-card/ornaments-below.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Red cardinal on an evergreen branch, with three red ornaments clustered at the end of the branch" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "ornaments-hanging",
        name: "Cardinal with Hanging Ornaments",
        image: "/images/products/christmas-cardinal-card/ornaments-hanging.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Wide-eyed red cardinal on an evergreen branch, with three red ornaments hanging along the branch" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
    ],
    alts: {
      "/images/products/christmas-cardinal-card/ornaments-below.jpg":
        "Hand-painted watercolour Christmas card of a red cardinal perched on an evergreen branch with three red ornaments hanging at its tip, on a wooden table with a pine branch, a snowy pine cone, twine, a knitted blanket and red berries",
      "/images/products/christmas-cardinal-card/ornaments-hanging.jpg":
        "Hand-painted watercolour Christmas card of a wide-eyed red cardinal perched on an evergreen branch with three red ornaments hanging along it, on a wooden table with snowy pine branches and a pine cone",
      "/images/products/christmas-cardinal-card/back.jpg":
        "Blank white back of the cardinal card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
    },
    description:
      "A charming handmade Christmas card featuring a cheerful red cardinal perched on an evergreen branch decorated with red Christmas ornaments. Each card is individually hand-painted with watercolours, making it a unique and thoughtful holiday greeting for family and friends.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Designs", value: "Ornament Cluster, Hanging Ornaments" },
    ],
  },
  {
    slug: "snowy-winter-cottage-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Snowy Winter Cottage",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/snowy-winter-cottage-card/bare-tree.jpg",
    // The blank back of the card, shown after the chosen design.
    gallery: ["/images/products/snowy-winter-cottage-card/back.jpg"],
    badge: "New",
    designs: [
      {
        id: "bare-tree",
        name: "Cottage with Bare Tree",
        image: "/images/products/snowy-winter-cottage-card/bare-tree.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Snow-covered cottage and evergreens under a deep blue and purple sky, with a winding path and a bare winter tree" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "fence",
        name: "Cottage with Snowy Fence",
        image: "/images/products/snowy-winter-cottage-card/fence.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Snow-covered cottage among evergreens under a soft blue and purple sky, with a wooden fence across the snow" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
    ],
    alts: {
      "/images/products/snowy-winter-cottage-card/bare-tree.jpg":
        "Hand-painted watercolour Christmas card of a snow-covered cottage and evergreen trees under a speckled blue and purple night sky, with a fence, a winding snowy path and a bare tree, on a wooden table with a snowy pine branch, a pine cone and a lit candle",
      "/images/products/snowy-winter-cottage-card/fence.jpg":
        "Hand-painted watercolour Christmas card of a snow-covered cottage among evergreen trees under a soft blue and purple sky with falling snow and a wooden fence across the snow, on a wooden table with snowy pine branches and a pine cone",
      "/images/products/snowy-winter-cottage-card/back.jpg":
        "Blank white back of the snowy cottage card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
    },
    description:
      "A beautiful hand-painted watercolour Christmas card featuring a cozy snow-covered cottage surrounded by evergreen trees, a peaceful snowy landscape, and a dreamy blue and purple winter sky. Each card is an original, one-of-a-kind artwork, perfect for sending warm holiday wishes or gifting to someone special. Handmade with care, bringing a little winter magic to the holiday season.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Style", value: "Winter landscape, Christmas, handmade art" },
      { label: "Designs", value: "Cottage with Bare Tree, Cottage with Snowy Fence" },
    ],
  },
  {
    slug: "pink-christmas-ornament-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Pink Christmas Ornament",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/pink-christmas-ornament-card/script-joy.jpg",
    // The blank back of the card, shown after the chosen design.
    gallery: ["/images/products/pink-christmas-ornament-card/back.jpg"],
    badge: "New",
    designs: [
      {
        id: "script-joy",
        name: "Pink Ornament · Script Joy",
        image: "/images/products/pink-christmas-ornament-card/script-joy.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper with gold accents" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Pink ornament with gold ribbons, black sparkles and handwritten “Joy” script" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "happy-holidays",
        name: "Red Ornament · Happy Holidays",
        image: "/images/products/pink-christmas-ornament-card/happy-holidays.jpg",
        gallery: [
          "/images/products/pink-christmas-ornament-card/happy-holidays-close.jpg",
          "/images/products/pink-christmas-ornament-card/rounded-back.jpg",
        ],
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper with gold accents" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Red ornament with gold streamers, blue splatter and “Happy Holidays”, with rounded corners" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
      {
        id: "joy",
        name: "Red Ornament · Joy",
        image: "/images/products/pink-christmas-ornament-card/joy.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper with gold accents" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Red ornament with gold streamers and stars, blue splatter and “JOY” with a little tree" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
    ],
    alts: {
      "/images/products/pink-christmas-ornament-card/script-joy.jpg":
        "Hand-painted watercolour Christmas card of a pink ornament with gold accents, gold ribbons and black sparkles, with “Joy” in handwritten script, on a wooden table with a pine branch, a gold pine cone, red berries and a star lantern",
      "/images/products/pink-christmas-ornament-card/happy-holidays.jpg":
        "Hand-painted watercolour Christmas card with rounded corners: a red ornament with a gold outline, gold streamers and stars, blue splatter and “Happy Holidays” lettering, on a wooden table with pine branches, a snowy pine cone, red berries and a candle",
      "/images/products/pink-christmas-ornament-card/happy-holidays-close.jpg":
        "Another view of the rounded “Happy Holidays” red ornament card on a wooden table with pine branches, a pine cone, red berries and a snowflake candle holder",
      "/images/products/pink-christmas-ornament-card/joy.jpg":
        "Hand-painted watercolour Christmas card of a red ornament with gold streamers and stars, blue and gold splatter and “JOY” with a small Christmas tree, on a wooden table with pine branches, pine cones, red berries and a candle",
      "/images/products/pink-christmas-ornament-card/back.jpg":
        "Blank white back of the ornament card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
      "/images/products/pink-christmas-ornament-card/rounded-back.jpg":
        "Back of the rounded-corner ornament card: a message area above a line, “To:” address lines and a dashed stamp box, on a wooden table with dried flowers, a candle and eucalyptus",
    },
    description:
      "Celebrate the joy of Christmas with this charming hand-painted watercolour card featuring a beautiful pink ornament with delicate gold accents, festive sparkles, and elegant handwritten “Joy” lettering. Each card is individually painted, making it a unique and thoughtful holiday greeting for family, friends, or someone special.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper with gold accents" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Designs", value: "Script Joy, Happy Holidays, Joy" },
    ],
  },
  {
    slug: "gingerbread-man-christmas-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Gingerbread Man Christmas Card",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/gingerbread-man-christmas-card/red-scarf.jpg",
    // The blank back of the card, shown after the chosen design.
    gallery: ["/images/products/gingerbread-man-christmas-card/back.jpg"],
    badge: "New",
    designs: [
      {
        id: "red-scarf",
        name: "Merry Christmas Gingerbread",
        image: "/images/products/gingerbread-man-christmas-card/red-scarf.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Gingerbread man in a red scarf with a handwritten Christmas greeting" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "pine-branches",
        name: "Gingerbread with Pine Branches",
        image: "/images/products/gingerbread-man-christmas-card/pine-branches.jpg",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Gingerbread man in a red scarf between pine branches with red ornaments" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
    ],
    alts: {
      "/images/products/gingerbread-man-christmas-card/red-scarf.jpg":
        "Hand-painted watercolour Christmas card of a smiling gingerbread man with rosy cheeks and a red scarf, with a handwritten Christmas greeting below, on a wooden table with a pine branch, red berries, a pine cone, a lit candle and a wooden star",
      "/images/products/gingerbread-man-christmas-card/pine-branches.jpg":
        "Hand-painted watercolour Christmas card of a smiling gingerbread man in a red scarf between two green pine branches hung with red ornaments, on a wooden table with a pine cone, a red bauble and pine branches",
      "/images/products/gingerbread-man-christmas-card/back.jpg":
        "Blank white back of the gingerbread man card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
    },
    description:
      "Adorable hand-painted Christmas card featuring a cheerful gingerbread man wearing a red scarf. Created with watercolour on textured paper, this original artwork brings a warm, playful touch to holiday greetings. Each card is individually painted by hand, making it a unique little piece of art. Perfect for Christmas gifts, holiday wishes, or festive decorations.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Designs", value: "Merry Christmas Gingerbread, Gingerbread with Pine Branches" },
    ],
  },
  {
    slug: "joyful-christmas-tree-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Ho Ho Ho! Joyful Christmas Tree",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/joyful-christmas-tree-card/main.jpg",
    // The blank inside of the folded card, shown after the front.
    gallery: ["/images/products/joyful-christmas-tree-card/inside.jpg"],
    badge: "New",
    alts: {
      "/images/products/joyful-christmas-tree-card/main.jpg":
        "Hand-painted watercolour Christmas card of a turquoise Christmas tree with red and gold ornaments, a golden star and little presents underneath, on a pink and purple background with gold splatter and the words “Ho-Ho-Ho”, “Joy” and “Happy” in ink, on a wooden table",
      "/images/products/joyful-christmas-tree-card/inside.jpg":
        "The blank white inside of the folded card, opened flat on a wooden table",
    },
    description:
      "Celebrate the magic of Christmas with this original hand-painted watercolour card featuring a festive turquoise Christmas tree decorated with colourful ornaments, a golden star, and tiny presents. The soft pink and purple background, shimmering gold accents, and cheerful holiday lettering create a playful, joyful design. Each card is individually hand-painted, making it a unique Christmas greeting or thoughtful handmade gift.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper with gold accents" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Design", value: "Turquoise Christmas tree with “Ho-Ho-Ho”, “Joy” and “Happy” lettering" },
      { label: "Inside", value: "Folded card, blank inside for your own message" },
    ],
  },
  {
    slug: "winter-forest-christmas-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Winter Forest Christmas Card",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/winter-forest-christmas-card/snowy-forest.jpg",
    badge: "New",
    designs: [
      {
        id: "snowy-forest",
        name: "Snowy Christmas Forest",
        image: "/images/products/winter-forest-christmas-card/snowy-forest.jpg",
        gallery: ["/images/products/winter-forest-christmas-card/snowy-forest-back.jpg"],
        description:
          "Celebrate the magic of winter with this original, hand-painted Christmas card featuring a peaceful snowy hill, beautiful evergreen trees, and a soft blue winter sky with delicate golden splashes. Each card is individually painted with watercolours, making it a unique and thoughtful holiday greeting for someone special. A lovely handmade Christmas card to share warm holiday wishes or give as a small piece of original art.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Snowy winter forest with “Merry Christmas” lettering" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "pastel-wonderland",
        name: "Pastel Winter Wonderland",
        image: "/images/products/winter-forest-christmas-card/pastel-wonderland.jpg",
        gallery: ["/images/products/winter-forest-christmas-card/pastel-wonderland-back.jpg"],
        description:
          "Bring a touch of winter magic to the holidays with this original, hand-painted watercolour Christmas card. Featuring beautiful purple evergreen trees, a peaceful snowy landscape, and a dreamy sky in soft shades of lavender, pink, yellow, and blue. Delicate colourful splashes give this artwork a whimsical, magical feel. Each card is individually hand-painted, making it a unique holiday greeting or a lovely little piece of art. Perfect for Christmas greetings, holiday gifts, or adding a little handmade beauty to someone's winter season.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Colourful winter landscape with purple Christmas trees" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
      {
        id: "winter-night",
        name: "Magical Winter Night",
        image: "/images/products/winter-forest-christmas-card/winter-night.jpg",
        description:
          "Capture the magic of winter with this original hand-painted watercolour Christmas card. Featuring a dreamy night sky in beautiful shades of blue and purple, delicate falling snow, and a peaceful forest of evergreen trees. Each card is individually hand-painted on paper, making it a unique piece of art and a lovely holiday greeting or keepsake. Perfect for Christmas greetings, winter wishes, or a thoughtful handmade gift.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Snowy evergreen forest under a blue and purple night sky" },
        ],
      },
      {
        id: "happy-holidays",
        name: "Happy Holidays Sunset",
        image: "/images/products/winter-forest-christmas-card/happy-holidays.jpg",
        description:
          "Celebrate the magic of the holiday season with this original, hand-painted watercolour Christmas card. Featuring a peaceful snowy landscape, purple evergreen trees, and a beautiful pink, lavender, and golden sunset, this unique artwork captures the warmth and beauty of winter. Each card is individually painted on watercolour paper, making it a special keepsake for family, friends, or loved ones.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Winter forest with “Happy Holidays” greeting" },
        ],
      },
    ],
    alts: {
      "/images/products/winter-forest-christmas-card/happy-holidays.jpg":
        "Hand-painted watercolour Christmas card of purple evergreen trees on a snowy hill under a pink, lavender and golden sunset sky with small stars, and “Happy Holidays” handwritten on the snow, on a wooden table with a pine branch, a pine cone, a star candle holder and red berries",
      "/images/products/winter-forest-christmas-card/winter-night.jpg":
        "Hand-painted watercolour Christmas card of dark blue evergreen trees under a glowing blue and purple night sky with white falling snow, on a wooden table with a lit candle, a pine branch and a pine cone",
      "/images/products/winter-forest-christmas-card/snowy-forest.jpg":
        "Hand-painted watercolour Christmas card of a snowy hill with evergreen trees under a soft blue sky with yellow splatter, and “Merry Christmas” handwritten below, on a wooden table with pine branches, a pine cone and a wooden star",
      "/images/products/winter-forest-christmas-card/pastel-wonderland.jpg":
        "Hand-painted watercolour Christmas card with rounded corners: purple Christmas trees on a snowy hill under a dreamy lavender, pink, yellow and blue sky with colourful splatter, on a wooden table with a pine branch and dried flowers",
      "/images/products/winter-forest-christmas-card/snowy-forest-back.jpg":
        "Blank white back of the Snowy Christmas Forest card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
      "/images/products/winter-forest-christmas-card/pastel-wonderland-back.jpg":
        "Back of the Pastel Winter Wonderland card: a message area above a line, “To:” address lines and a dashed stamp box, on a wooden table with dried flowers, a candle and eucalyptus",
    },
    description:
      "Original hand-painted watercolour Christmas cards with peaceful snowy landscapes and evergreen trees. Choose a snowy blue forest with “Merry Christmas” lettering, a dreamy pastel winter wonderland with purple trees, a magical blue and purple winter night, or a pink and golden sunset with “Happy Holidays” lettering. Each card is individually painted, so every one is a unique holiday greeting or a small piece of original art.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Designs", value: "Snowy Christmas Forest, Pastel Winter Wonderland, Magical Winter Night, Happy Holidays Sunset" },
    ],
  },
  {
    slug: "ink-christmas-tree-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Ink & Watercolour Christmas Trees",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/ink-christmas-tree-card/minimalist.jpg",
    badge: "New",
    designs: [
      {
        id: "minimalist",
        name: "Minimalist Christmas Tree",
        image: "/images/products/ink-christmas-tree-card/minimalist.jpg",
        gallery: ["/images/products/ink-christmas-tree-card/minimalist-back.jpg"],
        description:
          "Celebrate the holiday season with this charming, handmade Christmas card featuring a delicate Christmas tree illustration over a beautiful turquoise-green watercolour background. Each card is individually hand-painted on textured watercolour paper, making it a unique little piece of art. Its simple, modern design is perfect for sending warm Christmas wishes or adding a special touch to a holiday gift. A little piece of handmade holiday magic!",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour and black ink on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Style", value: "Minimalist, modern Christmas" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
      {
        id: "nine-trees",
        name: "Nine Christmas Trees",
        image: "/images/products/ink-christmas-tree-card/nine-trees.jpg",
        gallery: ["/images/products/ink-christmas-tree-card/nine-trees-back.jpg"],
        description:
          "Celebrate the holiday season with this unique, hand-painted Christmas card featuring nine minimalist Christmas trees in beautiful shades of green, mint, and turquoise. Each tree has its own playful design, creating a charming and modern festive look, with a handwritten “Merry Christmas” along the bottom. Perfect for sending warm Christmas wishes or adding a handmade touch to a holiday gift. Every card is individually painted, making it a little piece of original Christmas art.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour and black ink on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Nine Christmas trees with handwritten “Merry Christmas”" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
      {
        id: "nine-trees-bow",
        name: "Nine Trees with a Bow",
        image: "/images/products/ink-christmas-tree-card/nine-trees-bow.jpg",
        gallery: ["/images/products/ink-christmas-tree-card/nine-trees-back.jpg"],
        description:
          "A cheerful, hand-painted Christmas card with nine minimalist Christmas trees in fresh shades of green, mint, and turquoise, each one drawn in its own playful style. A handwritten “Merry Christmas” with a tiny tree and a little painted bow finish the corner. Perfect for sending warm Christmas wishes or adding a handmade touch to a holiday gift. Every card is individually painted, making it a little piece of original Christmas art.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour and black ink on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Nine Christmas trees, “Merry Christmas” and a little bow" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
      {
        id: "nine-trees-joy",
        name: "Merry Christmas & Joy",
        image: "/images/products/ink-christmas-tree-card/nine-trees-joy.jpg",
        gallery: ["/images/products/ink-christmas-tree-card/nine-trees-back.jpg"],
        description:
          "A joyful, hand-painted Christmas card with nine minimalist Christmas trees in shades of green, mint, and turquoise, with a handwritten “Merry Christmas” and “Joy” tucked between the rows of trees. Each tree has its own playful design, creating a charming and modern festive look. Perfect for sending warm Christmas wishes or adding a handmade touch to a holiday gift. Every card is individually painted, making it a little piece of original Christmas art.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour and black ink on paper" },
          { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
          { label: "Design", value: "Nine Christmas trees with handwritten “Merry Christmas” and “Joy”" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
    ],
    alts: {
      "/images/products/ink-christmas-tree-card/minimalist.jpg":
        "Hand-painted Christmas card with a simple Christmas tree drawn in black ink, with a star and looped garlands, over a turquoise-green watercolour patch, on a wooden table with a pine cone and pine branches",
      "/images/products/ink-christmas-tree-card/nine-trees.jpg":
        "Hand-painted Christmas card with rounded corners: nine little Christmas trees drawn in black ink over green, mint and turquoise watercolour patches, and “Merry Christmas” handwritten below, on a wooden table with a pine cone and a star candle holder",
      "/images/products/ink-christmas-tree-card/nine-trees-bow.jpg":
        "Hand-painted Christmas card with rounded corners: nine ink Christmas trees over green and turquoise watercolour patches, “Merry Christmas” with a tiny tree, and a small painted bow in the corner, on a wooden table with fairy lights",
      "/images/products/ink-christmas-tree-card/nine-trees-joy.jpg":
        "Hand-painted Christmas card with rounded corners: three rows of ink Christmas trees over green and turquoise watercolour patches, with “Merry Christmas” and “Joy” handwritten between the rows, on a wooden table",
      "/images/products/ink-christmas-tree-card/minimalist-back.jpg":
        "Blank white back of the minimalist Christmas tree card on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
      "/images/products/ink-christmas-tree-card/nine-trees-back.jpg":
        "Back of the nine Christmas trees card: a message area above a line, “To:” address lines and a dashed stamp box, on a wooden table with dried flowers, a candle and eucalyptus",
    },
    description:
      "Original hand-painted Christmas cards with Christmas trees drawn in black ink over watercolour in shades of green, mint, and turquoise. Choose a single minimalist tree, or one of three cards with nine playful little trees. Each card is individually painted on textured watercolour paper, so every one is a little piece of original Christmas art.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour and black ink on paper" },
      { label: "Size", value: "3.94 × 5.91 in (10 × 15 cm)" },
      { label: "Designs", value: "Minimalist Christmas Tree, Nine Christmas Trees, Nine Trees with a Bow, Merry Christmas & Joy" },
    ],
  },
  {
    slug: "watercolour-christmas-tree-card",
    letterGrams: 10, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Watercolour Christmas Trees",
    medium: "Hand-painted watercolour Christmas card",
    price: 2,
    image: "/images/products/watercolour-christmas-tree-card/minimalist.jpg",
    badge: "New",
    designs: [
      {
        id: "minimalist",
        name: "Minimalist Green Tree",
        image: "/images/products/watercolour-christmas-tree-card/minimalist.jpg",
        description:
          "Original hand-painted Christmas card featuring a charming Christmas tree drawn in black ink over a beautiful turquoise-green watercolour background. The handwritten “Merry Christmas” greeting adds a personal, artistic touch. Painted on textured watercolour paper with a simple, minimalist design. Each card is unique and perfect for holiday greetings, Christmas gifts, or festive decorations.",
        details: [
          { label: "Artwork", value: "Original, hand-painted (one of a kind)" },
          { label: "Medium", value: "Watercolour and ink on paper" },
          { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
          { label: "Style", value: "Minimalist, with a handwritten “Merry Christmas”" },
        ],
      },
      {
        id: "snowy",
        name: "Snowy Christmas Tree",
        image: "/images/products/watercolour-christmas-tree-card/snowy.jpg",
        description:
          "A charming, original hand-painted Christmas card featuring a delicate Christmas tree in soft turquoise and green shades, decorated with red ornaments and surrounded by blue snowflakes. Each card is individually painted with watercolours on textured paper, making it a unique piece of holiday art. Perfect for Christmas greetings, thoughtful gifts, or festive decoration.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
          { label: "Design", value: "Christmas tree with snowflakes" },
        ],
      },
      {
        id: "two-trees",
        name: "Two Snowy Trees",
        image: "/images/products/watercolour-christmas-tree-card/two-trees.jpg",
        description:
          "A charming, original hand-painted Christmas card featuring two beautiful Christmas trees in soft turquoise, blue, and green shades, decorated with red ornaments and a bright red star. Delicate blue snowflakes and colourful splashes create a magical winter atmosphere. Each card is individually painted with watercolours on textured paper, making it a unique piece of holiday art. Perfect for Christmas greetings, thoughtful gifts, or festive decoration.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour on paper" },
          { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
          { label: "Design", value: "Two decorated Christmas trees with snowflakes" },
        ],
      },
      {
        id: "three-trees",
        name: "Three Christmas Trees",
        image: "/images/products/watercolour-christmas-tree-card/three-trees.jpg",
        description:
          "Celebrate the holiday season with this charming, handmade Christmas card featuring three unique Christmas trees in beautiful shades of turquoise and green. Each tree is delicately drawn by hand over soft watercolour backgrounds, creating a simple, modern, and festive design. A lovely little card for sharing warm Christmas wishes with someone special. Every card is unique and made with care.",
        details: [
          { label: "Artwork", value: "Original, hand-painted" },
          { label: "Medium", value: "Watercolour and ink on paper" },
          { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
          { label: "Style", value: "Minimalist Christmas art" },
        ],
      },
    ],
    alts: {
      "/images/products/watercolour-christmas-tree-card/minimalist.jpg":
        "Square hand-painted Christmas card with a spiral Christmas tree drawn in black ink over a turquoise-green watercolour patch, and “Merry Christmas” handwritten below, on a wooden table with pine branches",
      "/images/products/watercolour-christmas-tree-card/snowy.jpg":
        "Square hand-painted watercolour Christmas card of a turquoise Christmas tree with red ornaments, blue snowflakes and yellow splatter, on a wooden table with a pine cone and a star candle holder",
      "/images/products/watercolour-christmas-tree-card/two-trees.jpg":
        "Square hand-painted watercolour Christmas card of two turquoise and blue Christmas trees with red ornaments and a red star on top, blue snowflakes and yellow splatter, on a wooden table",
      "/images/products/watercolour-christmas-tree-card/three-trees.jpg":
        "Square hand-painted Christmas card with three simple Christmas trees drawn in black ink over turquoise and green watercolour patches, and “Merry Christmas” handwritten below, on a wooden table",
    },
    description:
      "Small, original hand-painted Christmas cards with watercolour Christmas trees in soft turquoise and green. Choose from four designs, from a minimalist ink tree to snowy trees with red ornaments. Each card is painted by hand on textured watercolour paper, so every one is unique. Perfect for holiday greetings, Christmas gifts, or festive decoration.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour (and ink) on paper" },
      { label: "Size", value: "3.94 × 3.94 in (10 × 10 cm)" },
      { label: "Designs", value: "Minimalist Green Tree, Snowy Christmas Tree, Two Snowy Trees, Three Christmas Trees" },
    ],
  },
  {
    slug: "midnight-companion",
    collection: "cats",
    title: "Midnight Companion",
    medium: "Oil on glass · wooden frame",
    price: 70,
    image: "/images/products/midnight-companion/main.jpg",
    badge: "New",
    original: true,
    alts: {
      "/images/products/midnight-companion/main.jpg":
        "Original oil painting on glass of a golden-brown and black cat sitting in profile against a deep blue background with textured blue, purple and gold brushstrokes, in a wooden frame with gold trim hanging on a cream wall",
    },
    description:
      "A beautiful, original hand-painted artwork featuring a peaceful cat sitting against a rich, deep blue background. Expressive, textured brushstrokes in shades of blue, purple, gold, and brown create a mysterious and calming atmosphere. Painted with oil on glass and finished with one coat of gloss varnish for added shine and protection. Presented in a classic wooden frame with elegant gold trim. A unique, one-of-a-kind artwork, perfect for cat lovers, home decoration, or a thoughtful gift.",
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Oil paint on glass" },
      { label: "Finish", value: "One coat of gloss varnish" },
      { label: "Frame", value: "Wooden frame with gold trim" },
      { label: "Size", value: "4.5 × 5.5 in (11.43 × 13.97 cm)" },
    ],
  },
  {
    slug: "quiet-companion",
    collection: "cats",
    title: "Quiet Companion",
    medium: "Oil on glass · wooden frame",
    price: 70,
    image: "/images/products/quiet-companion/main.jpg",
    badge: "New",
    original: true,
    alts: {
      "/images/products/quiet-companion/main.jpg":
        "Original oil painting on glass of a calico cat sitting in profile against a burgundy background with expressive brushstrokes, in a dark wooden frame hanging on a cream wall",
    },
    description:
      "A charming, original hand-painted oil artwork featuring a beautiful cat sitting quietly against a rich burgundy background. Expressive brushstrokes and textured details bring warmth, character, and personality to this unique piece. The painting is created on glass and finished with one coat of gloss varnish for a subtle shine and protection. Presented in a classic wooden frame, it's a lovely addition to any home or a thoughtful gift for cat lovers. " +
      uniqueNote,
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Oil paint on glass" },
      { label: "Finish", value: "One coat of gloss varnish" },
      { label: "Frame", value: "Wooden frame" },
      { label: "Size", value: "4.5 × 5.5 in (11.43 × 13.97 cm)" },
    ],
  },
  {
    slug: "peaceful-waterfall-magnet",
    letterGrams: 40, // TODO: estimate — weigh a real magnet
    collection: "little-gifts",
    title: "Peaceful Waterfall",
    medium: "Hand-painted oil fridge magnet",
    price: 15,
    image: "/images/products/peaceful-waterfall-magnet/main.jpg",
    gallery: ["/images/products/peaceful-waterfall-magnet/close.jpg"],
    badge: "New",
    original: true,
    alts: {
      "/images/products/peaceful-waterfall-magnet/main.jpg":
        "Small square painted magnet of a blue waterfall between green trees, with brown hills and birds in a turquoise sky, on a stainless steel fridge",
      "/images/products/peaceful-waterfall-magnet/close.jpg":
        "Close-up of the waterfall magnet: textured blue waterfall, green trees, brown hills and three birds in the sky",
    },
    description:
      "A beautiful miniature landscape featuring a bright blue waterfall surrounded by lush green trees, distant mountains, and birds flying across the sky. This one-of-a-kind fridge magnet is individually hand-painted with oil paints — without a brush, using only fingers — and finished with a water-based glossy protective coating. A charming little piece of original art, perfect for decorating your fridge or giving as a thoughtful handmade gift.",
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
    letterGrams: 40, // TODO: estimate — weigh a real magnet
    collection: "little-gifts",
    title: "Autumn Waterfall",
    medium: "Hand-painted oil fridge magnet",
    price: 15,
    image: "/images/products/autumn-waterfall-magnet/main.jpg",
    gallery: ["/images/products/autumn-waterfall-magnet/close.jpg"],
    badge: "New",
    original: true,
    alts: {
      "/images/products/autumn-waterfall-magnet/main.jpg":
        "Small square painted magnet of a blue waterfall framed by red, orange and gold autumn trees under a bright blue sky with birds, on a stainless steel fridge",
      "/images/products/autumn-waterfall-magnet/close.jpg":
        "Close-up of the autumn waterfall magnet: thick, textured brushstrokes of a blue waterfall among red and orange autumn trees",
    },
    description:
      "Bring a touch of nature into your home with this beautiful, one-of-a-kind fridge magnet featuring a peaceful waterfall surrounded by colourful autumn trees. Each magnet is individually hand-painted with oil paints — without a brush, using only fingers — and finished with a water-based glossy coating for a beautiful shine and protection. A lovely little piece of art, perfect for decorating your fridge or giving as a unique handmade gift.",
    details: [
      { label: "Artwork", value: "Original, hand-painted" },
      { label: "Medium", value: "Oil paint" },
      { label: "Finish", value: "Water-based glossy protective coating" },
      { label: "Size", value: "3 × 3 in (7.5 × 7.5 cm)" },
      { label: "Type", value: "Decorative fridge magnet" },
    ],
  },
  {
    slug: "blue-winter-dreams-magnet",
    letterGrams: 40, // TODO: estimate — weigh a real magnet
    collection: "little-gifts",
    title: "Blue Winter Dreams",
    medium: "Hand-painted oil fridge magnet",
    price: 15,
    image: "/images/products/blue-winter-dreams-magnet/main.jpg",
    badge: "New",
    original: true,
    alts: {
      "/images/products/blue-winter-dreams-magnet/main.jpg":
        "Small square painted magnet of two snow-covered trees in shades of blue and white under a bright blue sky with birds, on a stainless steel fridge",
    },
    description:
      "A charming miniature winter landscape featuring two snow-covered trees beneath a bright blue sky, with birds flying overhead. Beautiful shades of blue and white create a peaceful, magical winter atmosphere. Each magnet is individually hand-painted with oil paints and finished with a water-based glossy protective coating. A unique little piece of art, perfect for decorating your fridge, adding winter charm to your home, or giving as a thoughtful handmade gift.",
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
    letterGrams: 15, // TODO: estimate — weigh a real postcard
    collection: "christmas",
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
    alts: {
      "/images/products/christmas-gnome-postcard/love-letter.jpg":
        "Hand-painted watercolour postcard of a gnome in a tall pink hat with a white beard and blue boots, holding a little love letter, with streamers and gold stars on light blue paper",
      "/images/products/christmas-gnome-postcard/joy.jpg":
        "Hand-painted watercolour postcard of a gnome in a tall pink hat with a white beard and blue boots, with colourful garlands, dots and the word “Joy” in blue ink on light blue paper",
      "/images/products/christmas-gnome-postcard/back.jpg":
        "Back of the card: a white postcard layout with a stamp box, address lines and space for a message",
    },
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
    slug: "happy-snowman-postcard",
    letterGrams: 15, // TODO: estimate — weigh a real postcard
    collection: "christmas",
    original: true,
    title: "Happy Snowman",
    medium: "Hand-painted watercolour postcard",
    price: 3,
    image: "/images/products/happy-snowman-postcard/front.jpg",
    // The back of the postcard, shown after the chosen design.
    gallery: ["/images/products/happy-snowman-postcard/back.jpg"],
    designs: [
      {
        id: "snowflakes",
        name: "Snowflakes",
        image: "/images/products/happy-snowman-postcard/front.jpg",
        description:
          "Bring a little winter magic to someone special with this cheerful, hand-painted snowman postcard! Featuring a smiling blue snowman, a cozy red scarf, and playful snowflakes with delicate golden accents on a soft blue background. Each postcard is an original, one-of-a-kind piece of art, perfect for Christmas greetings, holiday gifts, or seasonal decoration.",
        details: [
          { label: "Artwork", value: "Original, hand-painted (not a print)" },
          { label: "Medium", value: "Watercolour and ink on paper" },
          { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
          { label: "Design", value: "Snowman with blue snowflakes and gold splatter" },
          { label: "Back", value: "Traditional postcard layout with space for a message, address, and stamp" },
        ],
      },
      {
        id: "rounded",
        name: "Rounded Postcard",
        image: "/images/products/happy-snowman-postcard/rounded.jpg",
        gallery: ["/images/products/happy-snowman-postcard/rounded-back.jpg"],
        description:
          "A sweet and simple hand-painted postcard with a happy blue snowman in a deep red scarf, arms raised in a cheerful hello. Painted in watercolour and outlined in ink on white textured paper with soft rounded corners, with a pale blue shadow at his feet. Each postcard is an original, one-of-a-kind piece of art, perfect for Christmas greetings, holiday gifts, or seasonal decoration.",
        details: [
          { label: "Artwork", value: "Original, hand-painted (not a print)" },
          { label: "Medium", value: "Watercolour and ink on paper" },
          { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
          { label: "Design", value: "Minimalist snowman on white, with rounded corners" },
          { label: "Back", value: "Postcard layout with a message area, “To:” address lines and a stamp box" },
        ],
      },
      {
        id: "classic",
        name: "Classic White",
        image: "/images/products/happy-snowman-postcard/classic.jpg",
        gallery: ["/images/products/happy-snowman-postcard/classic-back.jpg"],
        description:
          "A charming, minimalist hand-painted postcard featuring a smiling blue snowman with a carrot nose, a cozy red scarf and twig arms, standing over a soft grey shadow. Painted in watercolour and outlined in ink on white textured paper. Each postcard is an original, one-of-a-kind piece of art, perfect for Christmas greetings, holiday gifts, or seasonal decoration.",
        details: [
          { label: "Artwork", value: "Original, hand-painted (not a print)" },
          { label: "Medium", value: "Watercolour and ink on paper" },
          { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
          { label: "Design", value: "Minimalist snowman on white" },
          { label: "Back", value: "Blank, with plenty of room for your own message" },
        ],
      },
    ],
    alts: {
      "/images/products/happy-snowman-postcard/front.jpg":
        "Hand-painted watercolour postcard of a smiling blue snowman with a carrot nose and a red scarf, surrounded by blue snowflakes and gold splatter",
      "/images/products/happy-snowman-postcard/rounded.jpg":
        "Hand-painted watercolour postcard with rounded corners: a smiling blue snowman with a carrot nose, a deep red scarf and twig arms raised, with a pale blue shadow, on a wooden table",
      "/images/products/happy-snowman-postcard/classic.jpg":
        "Hand-painted watercolour postcard of a smiling blue snowman with a carrot nose, a red scarf and twig arms, standing over a soft grey shadow on white paper, on a wooden table",
      "/images/products/happy-snowman-postcard/back.jpg":
        "Back of the snowman postcard: a stamp box, address lines and space for a message, with a few gold paint dots",
      "/images/products/happy-snowman-postcard/rounded-back.jpg":
        "Back of the rounded-corner snowman postcard: a message area above a line, “To:” address lines and a dashed stamp box, on a wooden table with dried flowers, a candle and eucalyptus",
      "/images/products/happy-snowman-postcard/classic-back.jpg":
        "Blank white back of the classic snowman postcard on a wooden table, with green leaves, a candle, a knitted blanket and a black pen",
      "/images/products/happy-snowman-postcard/both-sides.jpg":
        "Front and back of the Happy Snowman postcard side by side on a wooden table with pine branches and a pine cone",
    },
    badge: "New",
    description:
      "Bring a little winter magic to someone special with this cheerful, hand-painted snowman postcard! A smiling blue snowman in a cozy red scarf, in three designs: on a snowflake-filled blue background, or as a simple minimalist snowman on white. Each postcard is an original, one-of-a-kind piece of art, perfect for Christmas greetings, holiday gifts, or seasonal decoration.",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
      { label: "Back", value: "Traditional postcard layout with space for a message, address, and stamp" },
      { label: "Style", value: "Cheerful winter and Christmas illustration" },
      { label: "Perfect for", value: "Christmas cards, holiday greetings, stocking stuffers, or winter decor" },
    ],
  },
  {
    slug: "penguin-christmas-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Cute Penguin",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/penguin-christmas-card/bright.jpg",
    // The back of the card, shown after the chosen design.
    gallery: ["/images/products/penguin-christmas-card/back.jpg"],
    badge: "New",
    designs: [
      { id: "bright", name: "Bright", image: "/images/products/penguin-christmas-card/bright.jpg" },
      { id: "joy", name: "Joy", image: "/images/products/penguin-christmas-card/joy.jpg" },
      { id: "happy", name: "Happy", image: "/images/products/penguin-christmas-card/happy.jpg" },
    ],
    alts: {
      "/images/products/penguin-christmas-card/bright.jpg":
        "Hand-painted watercolour Christmas card of a round brown penguin in a red knitted hat, with stars, gold splatter and the word “bright” in ink",
      "/images/products/penguin-christmas-card/joy.jpg":
        "Hand-painted watercolour Christmas card of a smiling brown penguin in a red knitted hat, with stars, gold splatter and the word “joy” in ink",
      "/images/products/penguin-christmas-card/happy.jpg":
        "Hand-painted watercolour Christmas card of a brown penguin in a red star-patterned hat, with stars, gold splatter and the word “happy” in ink",
      "/images/products/penguin-christmas-card/back.jpg":
        "Back of the card: a white postcard layout with a stamp box, address lines and space for a message",
    },
    description:
      "Add a little warmth and joy to the holiday season with this adorable, original hand-painted Christmas card featuring a cheerful penguin in a festive red hat. Each card is individually painted with watercolours on paper, making every piece unique. Decorated with delicate snowflakes and golden accents. Perfect for Christmas greetings, holiday gifts, or festive decorations!",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
      { label: "Designs", value: "Bright, Joy, Happy" },
      { label: "Back", value: "Postcard layout with space for a message, address, and stamp" },
      { label: "Style", value: "Cute, whimsical Christmas illustration" },
      { label: "Perfect for", value: "Christmas greetings, holiday gifts, stocking stuffers, or festive decor" },
    ],
  },
  {
    slug: "winter-bird-christmas-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Winter Bird",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/winter-bird-christmas-card/bright-joy.jpg",
    // The back of the card, shown after the chosen design.
    gallery: ["/images/products/winter-bird-christmas-card/back.jpg"],
    badge: "New",
    designs: [
      { id: "bright-joy", name: "Happy Bright Joy", image: "/images/products/winter-bird-christmas-card/bright-joy.jpg" },
      { id: "joy-bright", name: "Happy Joy Bright", image: "/images/products/winter-bird-christmas-card/joy-bright.jpg" },
    ],
    alts: {
      "/images/products/winter-bird-christmas-card/bright-joy.jpg":
        "Hand-painted watercolour Christmas card of a little brown and golden bird on a pine branch with red berries, with stars, gold splatter and the words “Happy Bright Joy”",
      "/images/products/winter-bird-christmas-card/joy-bright.jpg":
        "Hand-painted watercolour Christmas card of a little brown and golden bird on a pine branch with red berries, with stars, gold splatter and the words “Happy Joy Bright”",
      "/images/products/winter-bird-christmas-card/back.jpg":
        "Back of the card: a white postcard layout with a stamp box, address lines and space for a message",
    },
    description:
      "Send a little winter cheer with this sweet, original hand-painted Christmas card featuring a cozy little bird perched on a pine branch with red berries. Each card is individually painted with watercolours on paper, making every piece unique. Decorated with delicate snowflakes and golden accents, with “Happy, Bright, Joy” hand-lettered below. Perfect for Christmas greetings, holiday gifts, or festive decorations!",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
      { label: "Designs", value: "Happy Bright Joy, Happy Joy Bright" },
      { label: "Back", value: "Postcard layout with space for a message, address, and stamp" },
      { label: "Style", value: "Cozy, nature-inspired Christmas illustration" },
      { label: "Perfect for", value: "Christmas greetings, holiday gifts, stocking stuffers, or festive decor" },
    ],
  },
  {
    slug: "christmas-cat-card",
    letterGrams: 15, // TODO: estimate — weigh a real card
    collection: "christmas",
    title: "Meowy Christmas",
    medium: "Hand-painted watercolour Christmas card",
    price: 3,
    image: "/images/products/christmas-cat-card/main.jpg",
    // The back of the card, shown after the front.
    gallery: ["/images/products/christmas-cat-card/back.jpg"],
    badge: "New",
    alts: {
      "/images/products/christmas-cat-card/main.jpg":
        "Hand-painted watercolour Christmas card of a smiling brown cat in a red knitted hat, with red ornaments, a little red gift, gold splatter and the words “Merry Christmas!!!” and “Meow-meow”",
      "/images/products/christmas-cat-card/back.jpg":
        "Back of the card: a white postcard layout with a stamp box, address lines and space for a message",
    },
    description:
      "A cute and playful Christmas card featuring an adorable cat wearing a festive red hat, surrounded by Christmas ornaments, golden sparkles, and a little gift. Each card is an original, hand-painted watercolour artwork on paper, making it a unique and charming way to share holiday wishes. Perfect for Christmas greetings, holiday gifts, or as a little piece of festive art!",
    details: [
      { label: "Artwork", value: "Original, hand-painted (not a print)" },
      { label: "Medium", value: "Watercolour on paper" },
      { label: "Size", value: "3.9 × 5.9 in (10 × 15 cm)" },
      { label: "Back", value: "Postcard layout with space for a message, address, and stamp" },
      { label: "Theme", value: "Christmas, cats, holiday greetings" },
      { label: "Style", value: "Whimsical, cute, festive" },
      { label: "Perfect for", value: "Christmas greetings, holiday gifts, or a little piece of festive art" },
    ],
  },
  {
    slug: "together-panda-postcard",
    letterGrams: 15, // TODO: estimate — weigh a real postcard
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
    alts: {
      "/images/products/together-panda-postcard/together.jpg":
        "Hand-painted watercolour postcard of two pandas sitting side by side under a red heart balloon, with red splatter and the word “Together”",
      "/images/products/together-panda-postcard/back.jpg":
        "The blank back of the panda postcard: plain white textured watercolour paper with rounded corners",
      "/images/products/together-panda-postcard/love-you.jpg":
        "Hand-painted watercolour postcard of two pandas sitting side by side under a red heart balloon, with red splatter and the words “Love you”",
      "/images/products/together-panda-postcard/love.jpg":
        "Hand-painted watercolour postcard of two pandas sitting side by side under a red heart balloon, with red splatter and the word “Love”",
      "/images/products/together-panda-postcard/love-heart.jpg":
        "Hand-painted watercolour postcard of two pandas sitting side by side under a red heart balloon, with the word “Love” and a small heart",
      "/images/products/together-panda-postcard/no-words.jpg":
        "Hand-painted watercolour postcard of two pandas sitting side by side under a red heart balloon, with red splatter and no words",
    },
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
    alts: {
      "/images/products/wildflower-garden/main.jpg":
        "Round painting of a dense wildflower garden in pink, red, blue and yellow against lush green, in a natural wood hexagonal frame hanging from a rope",
    },
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
    alts: {
      "/images/products/northern-lights-reflection/main.jpg":
        "Round painting of green and purple northern lights over a calm lake with tree silhouettes and a golden reflection, in a natural wood hexagonal frame hanging from a rope",
    },
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
    alts: {
      "/images/products/moonlight-shadows/main.jpg":
        "Round painting of the moon's surface in soft blue-grey with dark navy craters, in a natural wood hexagonal frame hanging from a rope",
      "/images/products/moonlight-shadows/close.jpg":
        "Close-up of the moon painting: blue-grey surface with dark navy crater shapes and small white highlights under a glossy resin finish",
    },
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
    slug: "midnight-blue-blossom",
    collection: "folk-florals",
    title: "Midnight Blue Blossom",
    medium: "Acrylic & resin · hexagonal wood frame",
    price: 35,
    image: "/images/products/midnight-blue-blossom/main.jpg",
    badge: "New",
    original: true,
    alts: {
      "/images/products/midnight-blue-blossom/main.jpg":
        "Round folk art painting of a single blue flower with green leaves and gold dot details on a glossy black background, in a natural wood hexagonal frame hanging from a rope",
    },
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
    alts: {
      "/images/products/cherry-blossom-serenity/main.jpg":
        "Round painting of a pink cherry blossom tree reflected in calm blue water with green hills behind, in a natural wood hexagonal frame hanging from a rope",
    },
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

/** Every photo plus each design's photo, without repeats. For the sitemap and search data. */
export const allPhotosOf = (product: Product) => [
  ...new Set([...photosOf(product), ...(product.designs?.flatMap((d) => [d.image, ...(d.gallery ?? [])]) ?? [])]),
];

/** Alt text for one of a product's photos: its own from `alts`, or the given fallback. */
export const altOf = (product: Product, src: string, fallback: string) => product.alts?.[src] ?? fallback;

/** Finds a product's design by id. Returns undefined for products without designs. */
export const designOf = (product: Product, id: string | undefined) => product.designs?.find((d) => d.id === id);
