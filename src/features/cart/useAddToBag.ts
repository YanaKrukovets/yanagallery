"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/content/products";
import { useCart } from "./CartProvider";

/** How long "Added ✓" shows before the bag slides open. */
const ADDED_FEEDBACK_MS = 600;

/**
 * "Add to bag" button state and click handler, shared by product cards and product pages.
 * For a product with several designs, pass the chosen design's id. Without one (e.g. on a
 * product card) the button sends the buyer to the product page to choose.
 */
export function useAddToBag(product: Product, design?: string) {
  const { add, has, open } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mustChoose = !!product.designs && !design;
  // An original that's already in the bag can't be added twice.
  const alreadyInBag = product.original && !mustChoose && has(product.slug, design);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onAdd = () => {
    if (product.sold) return;
    if (mustChoose) return router.push(`/products/${product.slug}`);
    if (alreadyInBag) return open();
    add(product, design);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setAdded(false);
      open();
    }, ADDED_FEEDBACK_MS);
  };

  const label = product.sold
    ? "Sold"
    : mustChoose
      ? "Choose a design"
      : added
        ? "Added ✓"
        : alreadyInBag
          ? "In your bag"
          : "Add to bag";

  return { onAdd, label, disabled: !!product.sold };
}
