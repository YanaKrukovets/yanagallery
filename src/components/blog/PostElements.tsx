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
