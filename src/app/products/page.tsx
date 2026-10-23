import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { products } from "@/content/products";
import { shop } from "@/content/site";

export const metadata: Metadata = {
  title: `Products | ${shop.name}`,
  description: `Shop every original painting and signed print by ${shop.artist}, painted in Ottawa.`,
};

export default function ProductsPage() {
  // Unsold pieces first; sold ones stay at the end.
  const all = [...products].sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <SectionHead
          title={["All", { accent: "products" }]}
          intro={`Every original and print in the shop. ${all.length} ${all.length === 1 ? "piece" : "pieces"}, all painted in Ottawa.`}
        />
        <ProductGrid products={all} />
      </main>
      <Footer />
    </>
  );
}
