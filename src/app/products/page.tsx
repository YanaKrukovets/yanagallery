import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CollectionTabs } from "@/components/ui/CollectionTabs";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { availableFirst, products } from "@/content/products";
import { shop } from "@/content/site";
import { withSales } from "@/features/cart/sales";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop Original Art",
  description: `Shop every hand-painted original by Ottawa artist ${shop.artist}: folk art florals, night skies and landscapes, plus postcards and fridge magnets. Shipped across Canada.`,
  path: "/products",
});

export default async function ProductsPage() {
  const all = availableFirst(await withSales(products));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <JsonLd data={itemListJsonLd("All products", "/products", all)} />
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
