"use client";

import type { Product } from "@/content/products";
import { useAddToBag } from "@/features/cart/useAddToBag";

export function AddToBagButton({ product, design }: { product: Product; design?: string }) {
  const { onAdd, label, disabled } = useAddToBag(product, design);
  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className="w-full rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-bronze disabled:cursor-not-allowed disabled:bg-ink/40 sm:w-auto"
    >
      {label}
    </button>
  );
}
