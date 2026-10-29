import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { cad } from "@/lib/format";

/**
 * A small card for one piece, to place between sections of a blog post:
 * `<PostProduct slug="moonlight-shadows" note="..." />`. Shows nothing once the piece is sold.
 */
export async function PostProduct({ slug, note }: { slug: string; note?: string }) {
  const product = (await withSales(products)).find((p) => p.slug === slug);
  if (!product || product.sold) return null;

  return (
    <aside aria-label="Art for sale" className="!mt-12">
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-5 border border-ink/15 bg-sand/30 p-3 transition-colors hover:border-ink/40 sm:gap-6 sm:p-4"
      >
        <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-sand/60 sm:w-24">
          <Image
            src={product.image}
            alt={`${product.title} by ${shop.artist}`}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 text-base">
          <p className="text-[11px] uppercase tracking-[0.2em] text-bronze">From my studio</p>
          {note && <p className="mt-1.5 text-ink-soft">{note}</p>}
          <p className="mt-1.5 font-serif text-xl leading-snug text-ink">
            {product.title} <span className="text-ink-soft">· {cad.format(product.price)}</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink">
            <span className="border-b border-ink/40 pb-0.5 group-hover:border-ink">See the piece</span>{" "}
            <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    </aside>
  );
}
