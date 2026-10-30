import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CollectionCards } from "@/components/ui/CollectionCards";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { collections } from "@/content/collections";
import { shop } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop by Collection",
  description: `Browse handmade art by Ottawa artist ${shop.artist} by collection: ${collections.map((c) => c.title.toLowerCase()).join(", ")}. Shipped across Canada.`,
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
          ])}
        />
        <SectionHead
          as="h1"
          title={["Shop by", { accent: "collection" }]}
          intro="Folk florals, painted skies, and little gifts — find the pieces that speak to you. All hand-painted in Ottawa."
        />
        <CollectionCards headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
