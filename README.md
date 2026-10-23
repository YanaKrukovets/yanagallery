# Yana Krukovets Gallery

A one-page online shop for Ottawa artist Yana Krukovets, selling original paintings and signed prints. Built with Next.js 16, Tailwind CSS 4, and Motion. The design uses cream, ink, and gold colours, a Fraunces serif with italic accent words, and slow, soft animations.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Project structure

```
src/
├── app/                  Routing only: root layout, the home page, global CSS
├── content/              All shop text and data — edit these to change the site
│   ├── site.ts           Name, contact details, nav, features, stats, hero/about images
│   ├── products.ts       Artwork for sale (prices, photos, descriptions)
│   ├── collections.ts    "Shop by collection" cards
│   ├── journal.ts        Journal posts
│   ├── testimonials.ts   Customer quotes
│   └── faqs.ts           FAQ questions and answers
├── components/
│   ├── layout/           Header and Footer
│   ├── sections/         One file per page section, in the order listed in app/page.tsx
│   ├── ui/               Shared building blocks (SectionHead, ProductCard, ProductGrid)
│   └── motion/           Reusable animations (Reveal, SplitHeading, RollText, CountUp, …)
├── features/
│   └── cart/             Cart store (localStorage), CartProvider + useCart, slide-out CartDrawer
└── lib/                  Small helpers: price formatting, mailto/tel links, animation easing
```

Colours and fonts live in `src/app/globals.css` (`@theme`) and `src/app/layout.tsx`.

Conventions:

- Components are PascalCase files with named exports; helpers and data are camelCase `.ts` files.
- Import with the `@/` alias (`@/content/site`), not long relative paths.
- Files only get `"use client"` when they need state, effects, or browser APIs. Section files stay server components where they can.
- New page sections go in `components/sections/` and are added to `app/page.tsx`. Their text goes in `content/`.

## Replace before launch

- **Testimonials** in `src/content/testimonials.ts` are samples. Replace them with real customer reviews (with permission). Don't publish made-up reviews.
- **Phone, email, bio, and the stats** (120+ works, 10+ years) are placeholders.
- **Artwork titles, mediums, and prices** are invented. Use your real work. Mark one-of-a-kind pieces with `original: true` so they can only be added to the bag once.
- **All images** are Unsplash stand-ins. Several show mountains or seascapes, which Ottawa doesn't have.

## Photo shot list

Shoot in soft daylight on a cream or warm-white wall to match the palette. Save the files to `public/images/` and update the matching file in `src/content/`.

| Section | Suggested photo | Ratio |
| --- | --- | --- |
| Hero (main) | A piece from your shop in a real Ottawa living room, ideally with a window and warm light | 4:5 |
| Hero (small frame) | Close-up of a frame corner: wood grain, mat bevel, and signature | 3:4 |
| Product cards | The finished, framed piece on a wall, in soft daylight | 3:4 |
| Rideau & River | Rideau Canal at golden hour, Dow's Lake, or the Ottawa River from Westboro Beach | 3:4 |
| Gatineau Hills | Pink Lake lookout, Champlain Lookout in fall, or a misty Wolf Trail | 3:4 |
| Capital Winters | Skaters on the canal, Parliament in snow, or Winterlude ice sculptures | 3:4 |
| About the artist | Yana at work in the studio (hands, brushes, easel) | 4:5 |
| About (detail) | Palette or paints, shot from above | 1:1 |
| Journal | Gallery wall in a Centretown apartment; frame samples on a counter; tulips at Commissioners Park | 4:3 |
| Contact | A styled flat-lay of a few pieces being wrapped for shipping | 4:3 |

## Animations

- **Hero**: heading words slide up one at a time; the photo wipes in from the bottom inside an arch; a small framed photo floats in at an angle; a "Made in Ottawa · Fait à Ottawa" badge spins slowly. Scrolling moves the layers at different speeds.
- **Header**: hides when you scroll down and comes back when you scroll up; nav letters roll on hover; the bag count flips when an item is added.
- **Ticker**: a slow, endless strip of the shop's promises.
- **Section headings**: word-by-word reveal with italic gold accent words.
- **Product cards**: the photo zooms slightly on hover; "Add to bag" slides up (always visible on touch screens).
- **Collections**: arched cards that zoom on hover, with a short description that fades in.
- **Philosophy quote**: each word lights up as you scroll past it.
- **About the artist**: parallax photo, and the numbers count up when they come into view.
- **Testimonials**: two rows scrolling in opposite directions; they pause on hover.
- **FAQ**: smooth open and close, with the + turning into ×.
- **Footer**: a large "Krukovets." wordmark rises into place.

All animations respect the system "reduce motion" setting where it matters (marquees stop, counters jump to the final number).

## Next steps

- The cart works fully (add, quantities, remove, subtotal, saved between visits), but **Checkout** currently opens an email with the order filled in. Connect Stripe Checkout, Square, or Shopify to take payment directly on the site.
- Add pages for the catalogue, collections, and journal posts (`src/app/catalogue/page.tsx` and so on).
- Add a French version (`/fr`), which matters to Ottawa–Gatineau customers.
