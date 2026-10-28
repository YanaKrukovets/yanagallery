import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { bestSellers } from "@/content/products";
import { withSales } from "@/features/cart/sales";

export async function BestSellers() {
  return (
    <section id="best-sellers" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <SectionHead
        title={["Our most", { accent: "collected" }, "pieces"]}
        intro="The paintings and prints Ottawa keeps coming back for."
        link={{ href: "/products", label: "View all products" }}
      />
      <ProductGrid products={await withSales(bestSellers)} />
    </section>
  );
}
