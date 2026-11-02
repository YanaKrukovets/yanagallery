import type { Product } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { ShowMore } from "./ShowMore";

/** Product grid that shows `pageSize` pieces, then a "Show more" button. See ShowMore. */
export function ShowMoreGrid({
  products,
  pageSize = 12,
  headingLevel = "h3",
}: {
  products: Product[];
  pageSize?: number;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ShowMore
      pageSize={pageSize}
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12"
      items={products.map((p, i) => ({
        key: p.slug,
        node: <ProductCard product={p} index={i} headingLevel={headingLevel} />,
      }))}
    />
  );
}
