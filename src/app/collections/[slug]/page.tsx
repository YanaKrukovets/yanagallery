import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CollectionTabs } from "@/components/ui/CollectionTabs";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { collections, getCollection, productsIn } from "@/content/collections";
import { availableFirst } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  const title = `${collection.title} | ${shop.name}`;
  return {
    title,
    description: collection.blurb,
    openGraph: { title, description: collection.blurb, images: [collection.image] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const items = availableFirst(await withSales(productsIn(collection.slug)));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <Link href="/#collections" className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
          ← All collections
        </Link>
        <div className="mt-6">
          <SectionHead
          as="h1"
            title={[{ accent: collection.title }]}
            intro={`${collection.blurb} ${items.length} ${items.length === 1 ? "piece" : "pieces"}.`}
          />
        </div>
        <CollectionTabs active={collection.slug} />
        <ProductGrid products={items} />
      </main>
      <Footer />
    </>
  );
}
