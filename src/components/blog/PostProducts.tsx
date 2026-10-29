import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { cad } from "@/lib/format";

/**
 * A small row of pieces to place between sections of a blog post:
 * `<PostProducts slugs={["folk-rooster", "twilight-tree", "moonlight-shadows"]} />`.
 * Sold pieces are left out; the row disappears if all of them are sold.
 */
export async function PostProducts({ slugs }: { slugs: string[] }) {
  const all = await withSales(products);
  const pieces = slugs.flatMap((slug) => all.filter((p) => p.slug === slug && !p.sold));
  if (pieces.length === 0) return null;

  return (
    <aside aria-label="Art from my studio" className="!mt-12 border-y border-ink/15 py-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-bronze">From my studio</p>
      <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-5">
        {pieces.map((p) => (
          <li key={p.slug}>
            <Link href={`/products/${p.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-sand/60">
                <Image
                  src={p.image}
                  alt={`${p.title} by ${shop.artist}`}
                  fill
                  sizes="(min-width: 768px) 240px, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 font-serif text-sm leading-snug text-ink group-hover:text-bronze sm:text-base">
                {p.title}
              </p>
              <p className="text-xs text-ink-soft sm:text-sm">{cad.format(p.price)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
