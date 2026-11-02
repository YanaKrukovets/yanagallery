"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { Product } from "@/content/products";
import { ProductCard } from "./ProductCard";

const PARAM = "show";

function readShowParam() {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  const n = value === "all" ? Infinity : Number(value);
  return Number.isFinite(n) || n === Infinity ? n : 0;
}

function subscribeToHistory(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * Product grid that shows `pageSize` pieces, then a "Show more" button.
 * Every card is still in the HTML (extras are hidden), so search engines see the full list.
 * The count is kept in the URL (?show=24) so a reload keeps the same pieces open;
 * going Back from a product keeps it too, because Next.js preserves page state.
 */
export function ShowMoreGrid({
  products,
  pageSize = 12,
  headingLevel = "h3",
}: {
  products: Product[];
  pageSize?: number;
  headingLevel?: "h2" | "h3";
}) {
  const total = products.length;
  const [shown, setShown] = useState(pageSize);
  // Picks up ?show= after a reload or a shared link (the server always renders the first page).
  const fromUrl = useSyncExternalStore(subscribeToHistory, readShowParam, () => 0);
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = Math.min(Math.max(shown, fromUrl), total);

  function showMore() {
    const next = Math.min(visible + pageSize, total);
    setShown(next);

    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next >= total ? "all" : String(next));
    window.history.replaceState(null, "", url);

    // Move keyboard focus to the first new piece so keyboard and screen reader users land on it.
    requestAnimationFrame(() => {
      gridRef.current?.children[visible]?.querySelector<HTMLAnchorElement>("h2 a, h3 a")?.focus();
    });
  }

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
        {products.map((p, i) => (
          <div key={p.slug} hidden={i >= visible}>
            <ProductCard product={p} index={i} headingLevel={headingLevel} />
          </div>
        ))}
      </div>

      {total > pageSize && (
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted" aria-live="polite">
            Showing {visible} of {total}
          </p>
          {visible < total && (
            <button
              type="button"
              onClick={showMore}
              className="rounded-full border border-ink px-8 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Show more
            </button>
          )}
        </div>
      )}
    </>
  );
}
