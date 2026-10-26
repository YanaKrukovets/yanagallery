"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { designOf, getProduct, type Design, type Product } from "@/content/products";
import * as store from "./store";

/** `key` is unique per line; `design` is set for products that come in several designs. */
export type CartLine = {
  key: string;
  product: Product;
  design?: Design;
  qty: number;
};

type Cart = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, design?: string) => void;
  setQty: (line: CartLine, qty: number) => void;
  remove: (line: CartLine) => void;
  clear: () => void;
  has: (slug: string, design?: string) => boolean;
  maxFor: (product: Product) => number;
};

const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<Cart>(() => {
    const lines = stored.flatMap((l) => {
      const product = getProduct(l.slug);
      if (!product) return [];
      return [
        {
          key: store.lineKey(l.slug, l.design),
          product,
          design: designOf(product, l.design),
          qty: l.qty,
        },
      ];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (product, design) => store.addOne(product.slug, design),
      setQty: (line, qty) => store.setQty(line.product.slug, line.design?.id, qty),
      remove: (line) => store.setQty(line.product.slug, line.design?.id, 0),
      clear: store.clearCart,
      has: (slug, design) => stored.some((l) => store.lineKey(l.slug, l.design) === store.lineKey(slug, design)),
      maxFor: store.maxFor,
    };
  }, [stored, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside <CartProvider>");
  return cart;
}
