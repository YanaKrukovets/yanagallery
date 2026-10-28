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

Shoot in soft daylight on a cream or warm-white wall to match the palette. Save the files to `public/images/` and update the matching file in `src/content/`:

- `public/images/site/`: hero and other page photos (`src/content/site.ts`)
- `public/images/collections/`: "Shop by collection" covers, made by `node scripts/collection-covers.mjs`
- `public/images/products/<slug>/`: one folder per product, named after its slug. `main.jpg` is the first photo, `close.jpg` a close-up, `back.jpg` a postcard back; products with designs use one file per design (e.g. `love-you.jpg`)

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

- **Checkout uses Stripe.** The bag sends buyers to Stripe's secure payment page; prices always come from `src/content/products.ts` on the server.
  1. Create a Stripe account, copy `.env.example` to `.env.local`, and paste your **test** secret key (`sk_test_...`).
  2. Run `npm run dev`, add a piece to the bag and pay with the test card `4242 4242 4242 4242` (any future date, any CVC).
  3. Set real delivery prices in `shippingOptions` in `src/content/site.ts`.
  4. To go live: swap in the live key (`sk_live_...`) and set `SITE_URL` on your host (e.g. Vercel). Turn on "Successful payments" emails in Stripe so you hear about each order. Each payment in Stripe shows a `delivery` note ("Local pickup…" or "Delivery to K1B 1A1", the postal code typed in the bag). If it doesn't match the shipping address on the order, contact the buyer. Orders where the buyer reached the thank-you page and the address is outside the local delivery area also get a `delivery_check` note.
  5. Originals paid for online show "Sold" on their own within a few minutes. When a piece sells in person, set `sold: true` on it in `products.ts`.
- Add pages for the catalogue, collections, and journal posts (`src/app/catalogue/page.tsx` and so on).
- Add a French version (`/fr`), which matters to Ottawa–Gatineau customers.
