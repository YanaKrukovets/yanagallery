"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, type Product } from "@/content/products";
import * as store from "./store";

export type CartLine = { product: Product; qty: number };

type Cart = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  maxFor: (product: Product) => number;
};

const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<Cart>(() => {
    const lines = stored.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ product, qty: l.qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (product) => store.addOne(product.slug),
      setQty: store.setQty,
      remove: (slug) => store.setQty(slug, 0),
      clear: store.clearCart,
      has: (slug) => stored.some((l) => l.slug === slug),
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
