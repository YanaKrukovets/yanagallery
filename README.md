# Yana Krukovets Gallery

An online shop for Ottawa artist Yana Krukovets, selling original paintings, postcards and magnets. Built with Next.js 16, Tailwind CSS 4, Motion, and Stripe Checkout. The design uses cream, ink, and gold colours, a Fraunces serif with italic accent words, and slow, soft animations.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Pages

| URL | What it is |
| --- | --- |
| `/` | Home page: hero, best sellers, collections, about the artist, new arrivals, FAQ, contact |
| `/products` | All work |
| `/products/<slug>` | One piece: photos, design picker, "Add to bag" |
| `/collections/<slug>` | One collection (`/collections` itself goes to the home page section) |
| `/blog` | Placeholder ("No posts yet") |
| `/terms`, `/privacy` | Terms of sale and privacy policy |
| `/checkout/success` | Thank-you page after a Stripe payment; empties the bag |
| 404 / 500 | Styled "page not found" and "something went wrong" pages (`app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`) |

## Project structure

```
src/
├── app/                  Routes, the root layout, error pages, global CSS
├── content/              All shop text and data — edit these to change the site
│   ├── site.ts           Name, email, payment pause switch, delivery prices, nav, features, stats, images
│   ├── products.ts       Artwork for sale (prices, photos, designs, descriptions)
│   ├── collections.ts    "Shop by collection" cards
│   ├── faqs.ts           FAQ questions and answers
│   ├── journal.ts        Journal posts (section hidden)
│   └── testimonials.ts   Sample customer quotes (section hidden)
├── components/
│   ├── layout/           Header, Footer, and the shared 404/500 layout
│   ├── sections/         One file per home page section, in the order listed in app/page.tsx
│   ├── product/          Product page pieces: gallery, design picker, "Add to bag"
│   ├── ui/               Shared building blocks (SectionHead, ProductCard, ProductGrid, …)
│   └── motion/           Reusable animations (Reveal, SplitHeading, RollText, CountUp, …)
├── features/
│   └── cart/             Bag (localStorage), slide-out CartDrawer, Stripe checkout, delivery, sold tracking
└── lib/                  Small helpers: price formatting, mailto links, Stripe client, animation easing
scripts/
└── collection-covers.mjs Builds the collection cover images from product photos
```

Colours and fonts live in `src/app/globals.css` (`@theme`) and `src/app/layout.tsx`.

Conventions:

- Components are PascalCase files with named exports; helpers and data are camelCase `.ts` files.
- Import with the `@/` alias (`@/content/site`), not long relative paths.
- Files only get `"use client"` when they need state, effects, or browser APIs. Section files stay server components where they can.
- New page sections go in `components/sections/` and are added to `app/page.tsx`. Their text goes in `content/`.

## Hidden for now

These are built but switched off. Each one says how to bring it back:

- **Testimonials**: the quotes in `src/content/testimonials.ts` are samples. Add real customer reviews (with permission), then put `<Testimonials />` back in `app/page.tsx`. Don't publish made-up reviews.
- **Journal** and **Commissions** sections: commented out in `app/page.tsx`.
- **Newsletter sign-up** in the footer: `SHOW_NEWSLETTER` in `components/layout/Footer.tsx`. It isn't connected to a newsletter provider yet.

## Online payments

- **Pausing payments.** `onlinePayments` in `src/content/site.ts`. While `paused` is `true`, the bag hides "Pay now" and offers "Email to pick up" instead, product pages show the notice with an email link, and the server refuses to start a checkout. Set it to `false` to turn payments back on.
- **Stripe setup.** The bag sends buyers to Stripe's secure payment page. Prices always come from `src/content/products.ts` on the server.
  1. Copy `.env.example` to `.env.local` and paste your **test** secret key (`sk_test_...`).
  2. Run `npm run dev`, add a piece to the bag and pay with the test card `4242 4242 4242 4242` (any future date, any CVC).
  3. Set real delivery prices in `shippingOptions` in `src/content/site.ts`.
  4. To go live: swap in the live key (`sk_live_...`) and set `SITE_URL` on your host (e.g. Vercel). Turn on "Successful payments" emails in Stripe so you hear about each order.
- **Delivery notes.** Each payment in Stripe shows a `delivery` note ("Local pickup…" or "Delivery to K1B 1A1", the postal code typed in the bag). If it doesn't match the shipping address on the order, contact the buyer. Orders where the buyer reached the thank-you page and the address is outside the local delivery area also get a `delivery_check` note.
- **Sold originals.** Originals paid for online show "Sold" on their own within a few minutes. When a piece sells in person, set `sold: true` on it in `products.ts`.

## Search engines and AI search

The live address is `https://ottawaartist.ca` (`siteUrl` in `src/lib/seo.ts`; `SITE_URL` overrides it). Everything below is built from the `content/` files, so new products show up on their own.

- `/sitemap.xml` and `/robots.txt` (`app/sitemap.ts`, `app/robots.ts`). Robots welcomes AI search crawlers (ChatGPT, Claude, Perplexity, Gemini and others) and keeps `/checkout/` out.
- `/llms.txt` (`app/llms.txt/route.ts`): a plain-text summary of the shop, artwork, prices, delivery and FAQ for AI assistants.
- Structured data (`src/lib/seo.ts`): shop, artist and website on every page; product, price and stock on product pages; FAQ on the home page; breadcrumbs and item lists on product and collection pages.
- Every page has a canonical link and share card (`pageMetadata` in `src/lib/seo.ts`). The blog is marked noindex until it has posts.
- Share pictures (1200×630, for Facebook, X, iMessage…) are drawn at build time by `src/lib/shareImage.tsx`: one per product, one per collection (`opengraph-image.tsx` next to each page) and a default (`app/opengraph-image.tsx`) for everything else.

After launch: add the site to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) (Bing also feeds ChatGPT and Copilot), submit `https://ottawaartist.ca/sitemap.xml`, and paste the verification codes into `verification` in `app/layout.tsx`.

## Placeholders to replace

- **Stats** in `src/content/site.ts` (50+ works, 5+ years) are placeholders. Use your real numbers.
- **Unsplash stock photos** are left only in the hidden Journal section (`src/content/journal.ts`).
- **About the artist** and **Contact** photos are room shots of framed pieces (Northern Lights Reflection, Cherry Blossom Serenity, Floral Harmony) (`images` in `src/content/site.ts`). Swap them for studio photos when you have some (see the list below).

Everything else (products, hero, collection covers) uses real photos.

## Photos

Save files to `public/images/` and update the matching file in `src/content/`:

- `public/images/site/`: hero and other page photos (`src/content/site.ts`)
- `public/images/products/<slug>/`: one folder per product, named after its slug. `main.jpg` is the first photo, `close.jpg` a close-up, `back.jpg` a postcard back; products with designs use one file per design (e.g. `love-you.jpg`)
- `public/images/collections/`: "Shop by collection" covers. Rebuild them with `node scripts/collection-covers.mjs` after changing product photos (needs `sharp`, which comes with Next.js).

Shoot in soft daylight on a cream or warm-white wall to match the palette. Photos still needed:

| Section | Suggested photo | Ratio |
| --- | --- | --- |
| About the artist | Yana at work in the studio (hands, brushes, easel) | 4:5 |
| About (detail) | Palette or paints, shot from above | 1:1 |
| Contact | A styled flat-lay of a few pieces being wrapped for shipping | 4:3 |
| Journal (when it returns) | A gallery wall at home; frame samples on a counter; tulips at Commissioners Park | 4:3 |

## Animations

- **Hero**: heading words slide up one at a time; the photo wipes in from the bottom inside an arch; a small framed photo floats in at an angle; a "Made in Ottawa · Fait à Ottawa" badge spins slowly. Scrolling moves the layers at different speeds.
- **Header**: hides when you scroll down and comes back when you scroll up; nav letters roll on hover; the bag count flips when an item is added.
- **Ticker**: a slow, endless strip of the shop's promises.
- **Section headings**: word-by-word reveal with italic gold accent words.
- **Product cards**: the photo zooms slightly on hover; "Add to bag" slides up (always visible on touch screens).
- **Collections**: arched cards that zoom on hover, with a short description that fades in.
- **Philosophy quote**: each word lights up as you scroll past it.
- **About the artist**: parallax photo, and the numbers count up when they come into view.
- **FAQ**: smooth open and close, with the + turning into ×.
- **Footer**: a large "Krukovets." wordmark rises into place.

All animations respect the system "reduce motion" setting where it matters (marquees stop, counters jump to the final number).

## Ideas for later

- Set `metadataBase` in `app/layout.tsx` to the live address so link previews on social media show the right image.
- Add `sitemap.ts` and `robots.ts` in `src/app/` for search engines.
- Add a French version (`/fr`), which matters to Ottawa–Gatineau customers.
