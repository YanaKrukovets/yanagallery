"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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

export type ShowMoreItem = { key: string; node: ReactNode };

/**
 * A list that shows `pageSize` items, then a "Show more" button.
 * Every item is still in the HTML (extras are hidden), so search engines see the full list.
 * The count is kept in the URL (?show=24) so a reload keeps the same items open;
 * going Back from an item keeps it too, because Next.js preserves page state.
 * Items can be server-rendered: pass them in already built.
 */
export function ShowMore({
  items,
  pageSize = 12,
  as: List = "div",
  className,
  itemClassName,
}: {
  items: ShowMoreItem[];
  pageSize?: number;
  as?: "div" | "ul";
  className?: string;
  itemClassName?: string;
}) {
  const Item = List === "ul" ? "li" : "div";
  const total = items.length;
  const [shown, setShown] = useState(pageSize);
  // Picks up ?show= after a reload or a shared link (the server always renders the first page).
  const fromUrl = useSyncExternalStore(subscribeToHistory, readShowParam, () => 0);
  const listRef = useRef<HTMLDivElement & HTMLUListElement>(null);
  const visible = Math.min(Math.max(shown, fromUrl), total);

  function showMore() {
    const next = Math.min(visible + pageSize, total);
    setShown(next);

    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next >= total ? "all" : String(next));
    window.history.replaceState(null, "", url);

    // Move keyboard focus to the first new item so keyboard and screen reader users land on it.
    requestAnimationFrame(() => {
      const first = listRef.current?.children[visible];
      (first?.querySelector<HTMLAnchorElement>("h2 a, h3 a") ?? first?.querySelector<HTMLAnchorElement>("a"))?.focus();
    });
  }

  return (
    <>
      <List ref={listRef} className={className}>
        {items.map((item, i) => (
          <Item key={item.key} hidden={i >= visible} className={itemClassName}>
            {item.node}
          </Item>
        ))}
      </List>

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
