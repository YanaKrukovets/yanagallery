import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AddToBagButton } from "@/components/product/AddToBagButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { getProduct, photosOf, products } from "@/content/products";
import { shop } from "@/content/site";
import { cad } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.title} | ${shop.name}`;
  const description = product.description?.split(". ")[0] ?? product.medium;
  return {
    title,
    description,
    openGraph: { title, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  // Other pieces, unsold ones first.
  const more = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(!!a.sold) - Number(!!b.sold))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <Link href="/products" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
          ← All work
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <ProductGallery photos={photosOf(product)} title={`${product.title} by ${shop.artist}`} />
          </div>

          <div className="md:col-span-5 md:pt-4">
            {(product.sold || product.badge) && (
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-bronze">
                {product.sold ? "Sold" : product.badge}
              </p>
            )}
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{product.title}</h1>
            <p className="mt-3 text-ink-soft">{product.medium}</p>
            <p className={`mt-6 font-serif text-3xl ${product.sold ? "text-muted line-through" : ""}`}>
              {cad.format(product.price)}
            </p>
            {product.original && !product.sold && (
              <p className="mt-2 text-sm text-muted">One of a kind: once it&apos;s gone, it&apos;s gone.</p>
            )}

            <div className="mt-8">
              <AddToBagButton product={product} />
              {product.sold && (
                <p className="mt-4 text-sm text-ink-soft">
                  This piece has found its home.{" "}
                  <Link href="/#contact" className="underline decoration-gold underline-offset-4 hover:text-ink">
                    Commission something similar
                  </Link>
                  .
                </p>
              )}
            </div>

            {product.description && <p className="mt-10 leading-relaxed text-ink-soft">{product.description}</p>}

            {product.details && product.details.length > 0 && (
              <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10 text-sm">
                {product.details.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 py-3">
                    <dt className="text-muted">{d.label}</dt>
                    <dd className="text-right">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {more.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="mb-10 font-serif text-3xl tracking-tight md:text-4xl">
              More <span className="accent">pieces</span>
            </h2>
            <ProductGrid products={more} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
