"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

// Remembers the last listing page (all work or a collection) so a product page can link back to it.
// Product pages keep the remembered page, so browsing from one piece to another still returns to
// the collection. Any other page (blog, home, …) clears it, and the link falls back to all work.

const KEY = "back-to-work";
const EVENT = "back-to-work-change";

function isListing(path: string) {
  return path === "/products" || /^\/collections\/[^/]+$/.test(path);
}

function read(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function write(path: string | null) {
  try {
    if (path) sessionStorage.setItem(KEY, path);
    else sessionStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** Goes in the root layout: records each page visit. */
export function BackToWorkTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/products/")) return;
    write(isListing(pathname) ? pathname : null);
  }, [pathname]);
  return null;
}

/** "← All work", or "← Christmas" when the visitor came from that collection. `titles` maps collection slugs to names. */
export function BackToWork({ titles, className }: { titles: Record<string, string>; className?: string }) {
  // On the server and first paint there is no history yet, so it shows "All work".
  const path = useSyncExternalStore(subscribe, read, () => null);
  const slug = path?.match(/^\/collections\/([^/]+)$/)?.[1];
  const title = slug ? titles[slug] : undefined;

  return (
    <Link href={title ? path! : "/products"} className={className}>
      ← {title ?? "All work"}
    </Link>
  );
}
