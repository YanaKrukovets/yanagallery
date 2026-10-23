// The cart is saved in the browser (localStorage), so it survives reloads and
// stays in sync across tabs. Only slugs and quantities are stored; prices and
// details always come from content/products.ts.
//
// This is a tiny external store read through React's useSyncExternalStore
// (see CartProvider.tsx).

import { getProduct, type Product } from "@/content/products";

export type StoredLine = { slug: string; qty: number };

const STORAGE_KEY = "yk-cart";
const MAX_QTY = 10;
export const EMPTY_CART: StoredLine[] = [];

let lines: StoredLine[] = EMPTY_CART;
let loaded = false;
const listeners = new Set<() => void>();

/** Most copies of one product allowed in the bag. Originals are one of a kind; sold pieces can't be bought. */
export const maxFor = (product: Product) => (product.sold ? 0 : product.original ? 1 : MAX_QTY);

/** Reads saved lines, dropping anything malformed or for products that no longer exist. */
function parse(raw: string | null): StoredLine[] {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(data)) return EMPTY_CART;
    const seen = new Set<string>();
    return data.flatMap((l) => {
      if (typeof l?.slug !== "string" || !Number.isInteger(l?.qty) || l.qty < 1 || seen.has(l.slug)) return [];
      const product = getProduct(l.slug);
      // Drop pieces that no longer exist or have sold since they were added.
      if (!product || maxFor(product) === 0) return [];
      seen.add(l.slug);
      return [{ slug: l.slug, qty: Math.min(l.qty, maxFor(product)) }];
    });
  } catch {
    return EMPTY_CART;
  }
}

export function getSnapshot() {
  if (!loaded) {
    loaded = true;
    try {
      lines = parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      lines = EMPTY_CART;
    }
  }
  return lines;
}

export const getServerSnapshot = () => EMPTY_CART;

function write(next: StoredLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private mode etc.) — the cart still works for this visit.
  }
  listeners.forEach((notify) => notify());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changed the cart.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    lines = parse(e.newValue);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Sets a product's quantity, clamped to 0..maxFor. 0 removes the line. */
export function setQty(slug: string, qty: number) {
  const product = getProduct(slug);
  if (!product) return;
  const current = getSnapshot();
  const clamped = Math.min(Math.max(Math.round(qty), 0), maxFor(product));

  if (clamped === 0) return write(current.filter((l) => l.slug !== slug));
  if (current.some((l) => l.slug === slug)) {
    return write(current.map((l) => (l.slug === slug ? { ...l, qty: clamped } : l)));
  }
  write([...current, { slug, qty: clamped }]);
}

export function addOne(slug: string) {
  const existing = getSnapshot().find((l) => l.slug === slug);
  setQty(slug, (existing?.qty ?? 0) + 1);
}

export const clearCart = () => write(EMPTY_CART);
