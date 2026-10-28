import Link from "next/link";
import { collections, productsIn } from "@/content/collections";
import { products } from "@/content/products";

const tabs = [
  { href: "/products", label: "All work", count: products.length, slug: undefined },
  ...collections.map((c) => ({
    href: `/collections/${c.slug}`,
    label: c.title,
    count: productsIn(c.slug).length,
    slug: c.slug,
  })),
];

/** Filter pills shared by /products and each collection page. `active` is a collection slug, or none for "All work". */
export function CollectionTabs({ active }: { active?: string }) {
  return (
    <nav aria-label="Collections" className="-mx-5 mb-10 overflow-x-auto px-5 md:mx-0 md:mb-12 md:px-0">
      <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
        {tabs.map((t) => {
          const current = t.slug === active;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                  current ? "border-ink bg-ink text-cream" : "border-ink/20 text-ink hover:border-ink"
                }`}
              >
                {t.label}
                <span className={current ? "text-sand/70" : "text-muted"}>
                  {t.count}
                  <span className="sr-only"> pieces</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
