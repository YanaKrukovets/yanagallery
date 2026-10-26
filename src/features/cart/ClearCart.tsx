"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/** Empties the bag once an order is paid. Renders nothing. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => clear(), [clear]);
  return null;
}
