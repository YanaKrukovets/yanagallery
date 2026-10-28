import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CollectionTabs } from "@/components/ui/CollectionTabs";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { availableFirst, products } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";

export const metadata: Metadata = {
  title: `Products | ${shop.name}`,
  description: `Shop every original painting and signed print by ${shop.artist}, painted in Ottawa.`,
};

export default async function ProductsPage() {
  const all = availableFirst(await withSales(products));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <SectionHead
          as="h1"
          title={["All", { accent: "products" }]}
          intro={`Every original and print in the shop. ${all.length} ${all.length === 1 ? "piece" : "pieces"}, all painted in Ottawa.`}
        />
        <CollectionTabs />
        <ProductGrid products={all} />
      </main>
      <Footer />
    </>
  );
}
