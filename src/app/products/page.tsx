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
  title: "Shop Handmade Art & Gifts",
  description: `Shop handmade art and gifts by Ottawa artist ${shop.artist}: folk art florals, night skies and landscapes, plus postcards and fridge magnets. Shipped across Canada.`,
  path: "/products",
});

export default async function ProductsPage() {
  const all = availableFirst(await withSales(products));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <JsonLd data={itemListJsonLd("Handmade art & gifts", "/products", all)} />
        <SectionHead
          as="h1"
          title={["Handmade art", { accent: "& gifts" }]}
          intro={`Everything in the shop, hand-painted in Ottawa. ${all.length} ${all.length === 1 ? "piece" : "pieces"}.`}
        />
        <CollectionTabs />
        <ProductGrid products={all} headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
