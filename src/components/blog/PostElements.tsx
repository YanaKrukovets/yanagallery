import Link from "next/link";
import type { ReactNode } from "react";

// Shared building blocks for blog post bodies in src/content/posts/.

const linkClass = "text-ink underline decoration-gold underline-offset-4 hover:text-bronze";

/** A section heading inside a post. */
export function PostH2({ children }: { children: ReactNode }) {
  return <h2 className="!mt-14 font-serif text-2xl text-ink md:text-3xl">{children}</h2>;
}

/** A link to another page on this site. */
export function InLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/** A link to another website, opened in a new tab. */
export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** One event in a roundup post: a heading, a small "when and where" line, text and a link. */
export function Event({
  title,
  when,
  link,
  children,
}: {
  title: string;
  when: string;
  link?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-bronze">{when}</p>
      <p className="mt-4">{children}</p>
      {link && (
        <p className="mt-3">
          <ExtLink href={link.href}>
            {link.label}
            <span className="sr-only">: {title}</span> <span aria-hidden>→</span>
          </ExtLink>
        </p>
      )}
    </section>
  );
}
