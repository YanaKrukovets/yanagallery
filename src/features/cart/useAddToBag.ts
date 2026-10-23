"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/content/products";
import { useCart } from "./CartProvider";

/** How long "Added ✓" shows before the bag slides open. */
const ADDED_FEEDBACK_MS = 600;

/** "Add to bag" button state and click handler, shared by product cards and product pages. */
export function useAddToBag(product: Product) {
  const { add, has, open } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // An original that's already in the bag can't be added twice.
  const alreadyInBag = product.original && has(product.slug);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onAdd = () => {
    if (product.sold) return;
    if (alreadyInBag) return open();
    add(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setAdded(false);
      open();
    }, ADDED_FEEDBACK_MS);
  };

  const label = product.sold ? "Sold" : added ? "Added ✓" : alreadyInBag ? "In your bag" : "Add to bag";

  return { onAdd, label, disabled: !!product.sold };
}
