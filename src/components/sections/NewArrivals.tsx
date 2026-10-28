import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { newArrivals } from "@/content/products";
import { withSales } from "@/features/cart/sales";

/** Shows at most this many pieces — the first ones listed in `newArrivals`. */
const MAX_NEW_ARRIVALS = 4;

/** Hidden until there's at least one piece in `newArrivals`. */
export async function NewArrivals() {
  if (newArrivals.length === 0) return null;
  return (
    <section id="new-arrivals" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <SectionHead
        title={["Fresh from the", { accent: "workbench" }]}
        intro="New paintings and prints, fresh off the easel this month."
      />
      <ProductGrid products={await withSales(newArrivals.slice(0, MAX_NEW_ARRIVALS))} />
    </section>
  );
}
