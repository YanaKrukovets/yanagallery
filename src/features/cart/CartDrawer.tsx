"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { RollText } from "@/components/motion/RollText";
import { cad } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { useCart, type CartLine } from "./CartProvider";
import { startCheckout } from "./checkout";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape, lock page scroll, and move focus into the panel (restored on close).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-serif text-2xl">
                Your <span className="accent">bag</span>
                <span className="ml-2 text-sm text-muted">({count})</span>
              </h2>
              <button onClick={close} className="text-xs uppercase tracking-[0.2em] hover:text-bronze">
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <EmptyBag onBrowse={close} />
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <CartLineItem key={line.key} line={line} />
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-ink/10 px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">Subtotal</span>
                    <span className="font-serif text-2xl">{cad.format(subtotal)}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    Free pickup in Blackburn Hamlet. Delivery options are shown at checkout.
                  </p>
                  <CheckoutButton lines={lines} />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CheckoutButton({ lines }: { lines: CartLine[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onCheckout = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await startCheckout(
          lines.map((l) => ({ slug: l.product.slug, design: l.design?.id, qty: l.qty })),
        );
        if ("url" in result) window.location.assign(result.url);
        else setError(result.error);
      } catch {
        // Network trouble, or the site was updated since this page loaded.
        setError("Checkout couldn't start. Please refresh the page and try again.");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={onCheckout}
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-bronze disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Opening secure checkout…" : <RollText text="Checkout" />}
        <span aria-hidden>→</span>
      </button>
      <p role="status" className={`mt-3 text-center text-xs ${error ? "text-red-700" : "text-muted"}`}>
        {error ?? "Secure payment by Stripe. Cards, Apple Pay and Google Pay accepted."}
      </p>
    </>
  );
}

function EmptyBag({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-serif text-2xl">Your bag is empty.</p>
      <p className="text-ink-soft">Find something for the wall you come home to.</p>
      <Link
        href="/products"
        onClick={onBrowse}
        className="rounded-full bg-ink px-7 py-4 text-sm uppercase tracking-[0.15em] text-cream hover:bg-bronze"
      >
        <RollText text="Browse the work" />
      </Link>
    </div>
  );
}

function CartLineItem({ line }: { line: CartLine }) {
  const { product, design, qty } = line;
  const { setQty, remove, maxFor } = useCart();
  const max = maxFor(product);
  const name = design ? `${product.title} (${design.name})` : product.title;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex gap-4 py-5"
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand/60">
        <Image src={design?.image ?? product.image} alt="" fill sizes="80px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight">{product.title}</h3>
          <p className="whitespace-nowrap font-serif">{cad.format(product.price * qty)}</p>
        </div>
        {design && <p className="mt-1 text-sm text-ink-soft">Design: {design.name}</p>}
        <p className="mt-1 text-sm text-muted">{product.medium}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          {max > 1 ? (
            <div className="flex items-center rounded-full border border-ink/25">
              <button
                onClick={() => setQty(line, qty - 1)}
                aria-label={`Remove one ${name}`}
                className="grid h-8 w-8 place-items-center hover:text-bronze"
              >
                −
              </button>
              <span className="w-6 text-center text-sm" aria-label={`Quantity ${qty}`}>
                {qty}
              </span>
              <button
                onClick={() => setQty(line, qty + 1)}
                disabled={qty >= max}
                aria-label={`Add one more ${name}`}
                className="grid h-8 w-8 place-items-center hover:text-bronze disabled:opacity-30"
              >
                +
              </button>
            </div>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-bronze">One of a kind</span>
          )}
          <button
            onClick={() => remove(line)}
            className="text-xs uppercase tracking-[0.2em] text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}
