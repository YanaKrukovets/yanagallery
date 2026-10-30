import type { Product } from "@/content/products";
import { ProductCard } from "./ProductCard";

/** `headingLevel` is "h2" when the grid sits right under the page title, so headings don't skip a level. */
export function ProductGrid({ products, headingLevel = "h3" }: { products: Product[]; headingLevel?: "h2" | "h3" }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
