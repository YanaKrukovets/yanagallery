import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { collections } from "@/content/collections";
import { newArrivals } from "@/content/products";
import { shop } from "@/content/site";

const linkClass = "hover:text-bronze";

/** Newsletter sign-up is hidden until it's connected to a newsletter provider. Set to true to show it. */
const SHOW_NEWSLETTER = false;

export function Footer() {
  return (
    <footer className="border-t border-ink/10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
        {SHOW_NEWSLETTER && (
        <div className="md:col-span-5">
          <h2 className="font-serif text-3xl">
            First look at <span className="accent">new work</span>
          </h2>
          <p className="mt-3 text-ink-soft">One email a month. New paintings, studio notes, and early access to originals.</p>
          {/* TODO: connect to a newsletter provider. Right now submitting just reloads the page. */}
          <form className="mt-6 flex max-w-md overflow-hidden rounded-full border border-ink/25 focus-within:border-ink">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 bg-transparent px-6 py-4 outline-none"
            />
            <button className="bg-ink px-6 text-xs uppercase tracking-[0.2em] text-cream hover:bg-bronze">Subscribe</button>
          </form>
        </div>
        )}

        <nav aria-label="Footer" className={`grid grid-cols-2 gap-8 text-sm md:grid-cols-3 ${SHOW_NEWSLETTER ? "md:col-span-7" : "md:col-span-12"}`}>
          <FooterColumn title="Shop">
            <li><Link href="/products" className={linkClass}>All work</Link></li>
            {newArrivals.length > 0 && (
              <li><Link href="/#new-arrivals" className={linkClass}>New arrivals</Link></li>
            )}
          </FooterColumn>
          <FooterColumn title="Collections">
            {collections.map((c) => (
              <li key={c.slug}><Link href={`/collections/${c.slug}`} className={linkClass}>{c.title}</Link></li>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            <li><a href={`mailto:${shop.email}`} className={linkClass}>{shop.email}</a></li>
            <li><a href="https://www.instagram.com/sunny_art87/" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
          </FooterColumn>
        </nav>
      </div>

      <Reveal y={80}>
        <p
          aria-hidden
          className="select-none overflow-hidden whitespace-nowrap px-5 pt-10 text-center font-serif text-[10vw] leading-[0.8] tracking-tighter text-ink md:px-8"
        >
          {shop.shortName}<span className="accent">.</span>
        </p>
      </Reveal>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted md:flex-row md:justify-between md:px-8">
        <p>© 2026 {shop.name}. Made in Ottawa.</p>
        <p className="flex gap-6">
          <Link href="/terms" className={linkClass}>Terms</Link>
          <Link href="/privacy" className={linkClass}>Privacy policy</Link>
          <Link href="/terms#returns" className={linkClass}>Returns</Link>
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}
