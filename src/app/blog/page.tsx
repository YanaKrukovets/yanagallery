import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionHead } from "@/components/ui/SectionHead";
import { shop } from "@/content/site";

export const metadata: Metadata = {
  title: `Blog | ${shop.name}`,
  description: `Stories from ${shop.artist}'s Ottawa studio: hanging tips, framing guides, and notes from the easel.`,
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-5 pb-20 pt-28 outline-none md:px-8 md:pt-36">
        <SectionHead as="h1" title={["Stories from the", { accent: "studio" }]} />
        <div className="border-y border-ink/15 py-16 text-center">
          <p className="font-serif text-2xl">No posts yet.</p>
          <p className="mt-3 text-ink-soft">
            Hanging tips, framing guides, and notes from the easel are on their way.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-bronze"
          >
            Browse the work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
