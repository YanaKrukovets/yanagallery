"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { RollText } from "@/components/motion/RollText";
import { shop } from "@/content/site";
import { cad, mailtoHref } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { useCart, type CartLine } from "./CartProvider";
import { startCheckout } from "./checkout";
import { cleanPostalCode, deliveryOptionFor, pickupOption, type Delivery } from "./delivery";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape, keep Tab inside the panel, lock page scroll, and move focus into the
  // panel (restored on close).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!first || !last) return e.preventDefault();
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
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

  // Removing an item takes its focused button with it; put focus back in the panel.
  useEffect(() => {
    if (isOpen && document.activeElement === document.body) panelRef.current?.focus();
  }, [isOpen, lines.length]);

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
            aria-labelledby="cart-title"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 id="cart-title" className="font-serif text-2xl">
                Your <span className="accent">bag</span>
                <span className="ml-2 text-sm text-muted">
                  ({count}<span className="sr-only"> {count === 1 ? "item" : "items"}</span>)
                </span>
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
  const [method, setMethod] = useState<Delivery["method"]>("pickup");
  const [postal, setPostal] = useState("");
  const postalCode = cleanPostalCode(postal);
  const delivery: Delivery =
    method === "pickup" ? { method } : { method, postalCode: postalCode ?? postal };

  const onCheckout = () => {
    setError(null);
    if (method === "delivery" && !postalCode) {
      setError("Please enter a Canadian postal code, like K1B 1A1.");
      return;
    }
    startTransition(async () => {
      try {
        const result = await startCheckout(
          lines.map((l) => ({ slug: l.product.slug, design: l.design?.id, qty: l.qty })),
          delivery,
          readLastCheckout(),
        );
        if ("url" in result) {
          saveLastCheckout(result.id);
          window.location.assign(result.url);
        } else setError(result.error);
      } catch {
        // Network trouble, or the site was updated since this page loaded.
        setError("Checkout couldn't start. Please refresh the page and try again.");
      }
    });
  };

  return (
    <div className="mt-6 space-y-5">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Option 1 · Pay online now</p>
        <DeliveryChoice
          method={method}
          onMethod={setMethod}
          postal={postal}
          onPostal={setPostal}
          postalCode={postalCode}
        />
        <button
          type="button"
          onClick={onCheckout}
          disabled={pending}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-bronze disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Opening secure checkout…" : <RollText text="Pay now" />}
          <span aria-hidden>→</span>
        </button>
        <p role="status" className={`mt-2 text-center text-xs ${error ? "text-red-700" : "text-muted"}`}>
          {error ?? "Secure payment by Stripe. Cards, Apple Pay and Google Pay accepted."}
        </p>
      </div>

      <div className="border-t border-ink/10 pt-5">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Option 2 · See it in person first</p>
        <a
          href={viewingEmailHref(lines)}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/25 py-4 text-sm uppercase tracking-[0.15em] transition-colors hover:border-ink hover:text-bronze"
        >
          <RollText text="Write an email" />
          <span aria-hidden>✉</span>
        </a>
        <p className="mt-2 text-center text-xs text-muted">
          Tell me what you&apos;d like to see. We&apos;ll set a time to meet, and you can pay cash or
          online on the spot.
        </p>
      </div>
    </div>
  );
}

const price = (dollars: number) => (dollars === 0 ? "free" : cad.format(dollars));

/** Pickup or delivery, chosen before paying so checkout only offers what fits the buyer's area. */
function DeliveryChoice({
  method,
  onMethod,
  postal,
  onPostal,
  postalCode,
}: {
  method: Delivery["method"];
  onMethod: (method: Delivery["method"]) => void;
  postal: string;
  onPostal: (postal: string) => void;
  postalCode: string | undefined;
}) {
  const option = postalCode && deliveryOptionFor(postalCode);
  const choice = (value: Delivery["method"], label: string) => (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input
        type="radio"
        name="delivery"
        value={value}
        checked={method === value}
        onChange={() => onMethod(value)}
        className="accent-ink"
      />
      {label}
    </label>
  );

  return (
    <fieldset className="mb-4">
      <legend className="sr-only">How would you like to get your order?</legend>
      {choice("pickup", `Pick up in Blackburn Hamlet (${price(pickupOption.price)})`)}
      {choice("delivery", "Deliver or ship to me")}
      {method === "delivery" && (
        <div className="mt-2 pl-7">
          <label htmlFor="postal-code" className="text-xs text-muted">
            Your postal code
          </label>
          <input
            id="postal-code"
            value={postal}
            onChange={(e) => onPostal(e.target.value)}
            autoComplete="postal-code"
            placeholder="K1B 1A1"
            maxLength={7}
            className="mt-1 w-full rounded-full border border-ink/25 bg-transparent px-4 py-2.5 text-sm uppercase focus:border-ink focus:outline-none"
          />
          {option && (
            <p className="mt-2 text-xs text-ink-soft">
              {option.label}: {price(option.price)}. Use the same postal code at checkout.
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}

// This browser's last Stripe checkout. Sent with the next one so a buyer who comes back and
// clicks "Pay now" again isn't blocked by their own unfinished checkout.
const LAST_CHECKOUT_KEY = "yk-last-checkout";

function readLastCheckout() {
  try {
    return localStorage.getItem(LAST_CHECKOUT_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function saveLastCheckout(id: string) {
  try {
    localStorage.setItem(LAST_CHECKOUT_KEY, id);
  } catch {
    // Storage blocked: the buyer may just wait out their own hold.
  }
}

/** A pre-filled email asking to see the pieces in the bag in person. */
function viewingEmailHref(lines: CartLine[]) {
  const items = lines
    .map(({ product, design, qty }) => {
      const name = design ? `${product.title} (${design.name})` : product.title;
      return `- ${name}${qty > 1 ? ` × ${qty}` : ""}, ${cad.format(product.price * qty)}`;
    })
    .join("\n");
  return mailtoHref(shop.email, {
    subject: "I'd like to see some pieces in person",
    body: `Hi Yana,\n\nI'd like to see these pieces in person before I buy:\n\n${items}\n\nWhen would be a good time to meet? I'd pay by cash / online (choose one).\n\nThanks,\n`,
  });
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
              <span className="w-6 text-center text-sm">
                <span className="sr-only">Quantity </span>
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
            Remove<span className="sr-only"> {name}</span>
          </button>
        </div>
      </div>
    </motion.li>
  );
}
