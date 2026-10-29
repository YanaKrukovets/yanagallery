import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductBuy } from "@/components/product/ProductBuy";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { availableFirst, getProduct, products } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { cad } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
    const firstSentence = product.description?.split(". ")[0];
  const description = trimTo(
    `${firstSentence ? `${firstSentence}. ` : ""}${product.medium}, ${cad.format(product.price)} CAD, by Ottawa artist ${shop.artist}.`,
    160,
  );
  return pageMetadata({
    title: `${product.title} – ${product.original ? "Original " : ""}Hand-Painted Art`,
    description,
    path: `/products/${product.slug}`,
    ownImage: true,
  });
}

/** Cuts text at a word boundary so search results don't cut it mid-word. */
function trimTo(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const slug = (await params).slug;
  const all = await withSales(products);
  const product = all.find((p) => p.slug === slug);
  if (!product) notFound();

  // Other pieces, unsold ones first.
  const more = availableFirst(all.filter((p) => p.slug !== product.slug)).slice(0, 4);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <JsonLd data={productJsonLd(product)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.title, path: `/products/${product.slug}` },
          ])}
        />
        <Link href="/products" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
          ← All work
        </Link>

        <ProductBuy
          product={product}
          alt={`${product.title} by ${shop.artist}`}
          intro={
            <>
              {(product.sold || product.badge) && (
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-bronze">
                  {product.sold ? "Sold" : product.badge}
                </p>
              )}
              <h1 className="font-serif text-3xl leading-[1.05] tracking-tight md:text-5xl">{product.title}</h1>
              <p className="mt-3 text-ink-soft">{product.medium}</p>
              <p className={`mt-5 font-serif text-2xl ${product.sold ? "text-muted line-through" : ""}`}>
                {cad.format(product.price)}
              </p>
              {product.original && !product.sold && (
                <p className="mt-2 text-sm text-muted">One of a kind: once it&apos;s gone, it&apos;s gone.</p>
              )}
            </>
          }
          afterButton={
            product.sold && (
              <p className="mt-4 text-sm text-ink-soft">
                This piece has found its home.{" "}
                <Link href="/#contact" className="underline decoration-gold underline-offset-4 hover:text-ink">
                  Commission something similar
                </Link>
                .
              </p>
            )
          }
        >
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
        </ProductBuy>

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
