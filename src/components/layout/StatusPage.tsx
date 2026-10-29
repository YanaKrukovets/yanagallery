import Link from "next/link";
import type { ReactNode } from "react";
import { shop } from "@/content/site";

/** Shared look for the 404 and error pages: a big code, a short message, and a way back. */
export function StatusPage({
  code,
  title,
  message,
  actions,
}: {
  code: string;
  title: ReactNode;
  message: ReactNode;
  /** Extra buttons shown before the "Back home" link. */
  actions?: ReactNode;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center outline-none md:px-8 md:pt-36"
    >
      <p aria-hidden className="font-serif text-[7rem] leading-none tracking-tighter text-gold md:text-[10rem]">
        {code}
      </p>
      <h1 className="mt-6 font-serif text-3xl leading-tight tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-5 text-lg text-ink-soft">{message}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {actions}
        <Link
          href="/products"
          className="rounded-full bg-ink px-7 py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-bronze"
        >
          Browse the work
        </Link>
        <Link
          href="/"
          className="rounded-full border border-ink/25 px-7 py-4 text-sm uppercase tracking-[0.15em] transition-colors hover:border-ink hover:text-bronze"
        >
          Back home
        </Link>
      </div>
      <p className="mt-10 text-sm text-muted">
        Still stuck? Email{" "}
        <a href={`mailto:${shop.email}`} className="underline decoration-gold underline-offset-4 hover:text-ink">
          {shop.email}
        </a>
        .
      </p>
    </main>
  );
}
