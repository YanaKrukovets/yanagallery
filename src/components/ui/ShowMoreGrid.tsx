import type { Design, Product } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { ShowMore } from "./ShowMore";

/**
 * Product grid that shows `pageSize` pieces, then a "Show more" button. See ShowMore.
 * With `expandDesigns`, a product sold in several designs gets one card per design.
 */
export function ShowMoreGrid({
  products,
  pageSize = 12,
  headingLevel = "h3",
  expandDesigns = false,
}: {
  products: Product[];
  pageSize?: number;
  headingLevel?: "h2" | "h3";
  expandDesigns?: boolean;
}) {
  const cards = products.flatMap((product): { product: Product; design?: Design }[] =>
    expandDesigns && product.designs ? product.designs.map((design) => ({ product, design })) : [{ product }],
  );
  return (
    <ShowMore
      pageSize={pageSize}
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12"
      items={cards.map(({ product, design }, i) => ({
        key: design ? `${product.slug}/${design.id}` : product.slug,
        node: <ProductCard product={product} design={design} index={i} headingLevel={headingLevel} />,
      }))}
    />
  );
}
