import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/ui/ProductGrid";
import type { Segment } from "@/components/motion/SplitHeading";
import { SectionHead } from "@/components/ui/SectionHead";
import { products, type Product } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

// A gift guide for people searching things like "handmade gifts Ottawa". Pieces are grouped by
// price on their own, so new products show up here without any changes to this file.

export const metadata: Metadata = pageMetadata({
  title: "Handmade Gifts from Ottawa",
  description: `Handmade gifts by Ottawa artist ${shop.artist}: hand-painted fridge magnets and postcards under $20, framed original art under $40. Free pickup in Blackburn Hamlet.`,
  path: "/gifts",
});

/** Price groups, cheapest first. A piece goes in the first group whose `under` is above its price. */
const priceGroups: { under: number; title: Segment[]; intro: string }[] = [
  {
    under: 20,
    title: ["Gifts under", { accent: "$20" }],
    intro:
      "Hand-painted fridge magnets and watercolour postcards. Small enough for a stocking or a card.",
  },
  {
    under: 40,
    title: ["Gifts under", { accent: "$40" }],
    intro:
      "One-of-a-kind paintings in acrylic, sealed in glossy resin and set in natural wood frames. They come with a rope hanger, so they're ready to hang.",
  },
  {
    under: Infinity,
    title: ["Something", { accent: "special" }],
    intro: "Larger originals for the people you want to spoil.",
  },
];

type OccasionLink = { href: string; label: string };

/**
 * Gift ideas. An idea that points at one product also names a `fallback` collection link, used
 * if that product sells out or is removed, so the page never links to a dead or sold piece.
 */
const occasions: { title: string; body: string; link: OccasionLink; product?: string; fallback?: OccasionLink }[] = [
  {
    title: "Stocking stuffers",
    body: "A hand-painted magnet is small, light and costs less than a takeout lunch, but it stays on the fridge for years.",
    link: { href: "/collections/little-gifts", label: "Magnets and postcards" },
  },
  {
    title: "Christmas cards that are gifts too",
    body: "Each Christmas Gnome postcard is painted by hand in watercolour. Write your message on the back, or frame it.",
    product: "christmas-gnome-postcard",
    link: { href: "/products/christmas-gnome-postcard", label: "Christmas Gnome postcard" },
    fallback: { href: "/collections/little-gifts", label: "Magnets and postcards" },
  },
  {
    title: "Housewarming and hostess gifts",
    body: "A small framed folk art painting brings colour to a new kitchen or entryway, and it's easy to wrap.",
    link: { href: "/collections/folk-florals", label: "Folk Florals" },
  },
  {
    title: "Teachers, coworkers and neighbours",
    body: "A night sky or a waterfall in a little wood frame is a thank-you that won't get re-gifted.",
    link: { href: "/collections/nature-and-sky", label: "Nature & Sky" },
  },
  {
    title: "For someone you love",
    body: "The panda postcards come in five designs, from “Love you” to no words at all, and are painted by hand.",
    product: "together-panda-postcard",
    link: { href: "/products/together-panda-postcard", label: "Together postcard" },
    fallback: { href: "/collections/little-gifts", label: "Magnets and postcards" },
  },
  {
    title: "Something made just for them",
    body: "Have a place or a memory in mind? I take commissions. Email me early, because hand-painted work takes time.",
    link: { href: "/#commissions", label: "About commissions" },
  },
];

const giftFaqs = [
  {
    q: "Can I pick up a gift in Ottawa?",
    a: "Yes. Pickup in Blackburn Hamlet is free, and so is local delivery there.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders arrive in 1 to 7 days anywhere in Canada. Postcards and magnets can go by Lettermail for $3 to $5. For Christmas, order early in December so there's time to spare.",
  },
  {
    q: "Are these originals or prints?",
    a: "Every piece is an original, painted by hand, so no two are exactly alike. Even the postcards and magnets are painted one at a time.",
  },
  {
    q: "What if they don't like it?",
    a: "Any piece can be returned within 14 days. The buyer pays return shipping.",
  },
];

export default async function GiftsPage() {
  const available = (await withSales(products)).filter((p) => !p.sold);

  const groups = priceGroups
    .map((group, i) => {
      const above = i === 0 ? 0 : priceGroups[i - 1].under;
      const items: Product[] = available
        .filter((p) => p.price >= above && p.price < group.under)
        .sort((a, b) => a.price - b.price);
      return { ...group, items };
    })
    .filter((g) => g.items.length > 0);

  const ideas = occasions.map((o) => {
    const inStock = !o.product || available.some((p) => p.slug === o.product);
    return { ...o, link: inStock ? o.link : (o.fallback ?? o.link) };
  });

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <JsonLd data={itemListJsonLd("Handmade gifts from Ottawa", "/gifts", available)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gifts", path: "/gifts" },
          ])}
        />
        <JsonLd data={faqJsonLd(giftFaqs)} />

        <SectionHead
          as="h1"
          wide
          title={["Handmade gifts", { accent: "from Ottawa" }]}
          intro={`Small original art, painted by hand in Ottawa by ${shop.artist}. Free pickup in Blackburn Hamlet, local delivery around Ottawa, and shipping across Canada.`}
        />

        {groups.map((g) => (
          <section key={g.under} className="mt-16 border-t border-ink/15 pt-16 first-of-type:mt-0 first-of-type:border-0 first-of-type:pt-0 md:pt-20">
            <SectionHead wide title={g.title} intro={g.intro} />
            <ProductGrid products={g.items} />
          </section>
        ))}

        <section className="mt-24 border-t border-ink/15 pt-16 md:mt-32 md:pt-20">
          <SectionHead wide title={["Gift ideas by", { accent: "occasion" }]} />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((o) => (
              <li key={o.title} className="border-t border-ink/15 pt-6">
                <h3 className="font-serif text-2xl leading-snug">{o.title}</h3>
                <p className="mt-3 text-ink-soft">{o.body}</p>
                <Link
                  href={o.link.href}
                  className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline decoration-gold underline-offset-4 hover:text-bronze"
                >
                  {o.link.label} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 border-t border-ink/15 pt-16 md:mt-32 md:pt-20">
          <SectionHead wide title={["Good to", { accent: "know" }]} />
          <dl className="grid max-w-4xl gap-8 md:grid-cols-2">
            {giftFaqs.map((f) => (
              <div key={f.q}>
                <dt className="font-serif text-xl">{f.q}</dt>
                <dd className="mt-2 text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-ink-soft">
            Looking for ideas? Read my{" "}
            <Link
              href="/blog/handmade-christmas-gifts-ottawa-2026"
              className="text-ink underline decoration-gold underline-offset-4 hover:text-bronze"
            >
              handmade Christmas gift guide
            </Link>{" "}
            for Ottawa, with local craft fairs to visit this season.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
