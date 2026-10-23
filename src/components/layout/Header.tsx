"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { RollText } from "@/components/motion/RollText";
import { navLinks, shop, type NavLink } from "@/content/site";
import { useCart } from "@/features/cart/CartProvider";
import { EASE } from "@/lib/motion";

/** Scroll distance (px) before the header starts hiding on scroll down. */
const HIDE_AFTER = 200;

const half = Math.ceil(navLinks.length / 2);
const leftLinks = navLinks.slice(0, half);
const rightLinks = navLinks.slice(half);

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open: openCart } = useCart();

  // Hide on scroll down, show on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > HIDE_AFTER && !menuOpen);
    setScrolled(y > 20);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-ink/10 bg-cream/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <DesktopNav links={leftLinks} />

        <Link href="/#top" className="font-serif text-xl tracking-tight md:absolute md:left-1/2 md:-translate-x-1/2 md:text-2xl">
          {shop.artist}
          <span className="accent">.</span>
        </Link>

        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
          <DesktopNav links={rightLinks} />
          <button onClick={openCart} className="flex items-center gap-2" aria-label={`Open bag, ${count} items`}>
            Bag
            <BagCount count={count} />
          </button>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileNav onNavigate={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}

function DesktopNav({ links }: { links: NavLink[] }) {
  return (
    <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-ink-soft hover:text-ink">
          <RollText text={l.label} />
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.nav
      id="mobile-nav"
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      className="overflow-hidden bg-cream md:hidden"
    >
      <ul className="flex flex-col gap-4 px-5 pb-8 pt-2">
        {navLinks.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.1 }}
          >
            <Link href={l.href} onClick={onNavigate} className="font-serif text-3xl">
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

/** Bag count badge; the number flips when it changes. */
function BagCount({ count }: { count: number }) {
  return (
    <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-ink text-[10px] text-cream">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
