import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionHead } from "@/components/ui/SectionHead";
import { ShowMore } from "@/components/ui/ShowMore";
import { postDate, posts } from "@/content/journal";
import { shop } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: `Notes from ${shop.artist}'s Ottawa studio: local art events, hanging tips, framing guides, and notes from the easel.`,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-5 pb-20 pt-28 outline-none md:px-8 md:pt-36">
        <SectionHead as="h1" title={["Stories from the", { accent: "studio" }]} />
        <ShowMore
          as="ul"
          pageSize={5}
          className="divide-y divide-ink/15 border-y border-ink/15"
          items={posts.map((p) => ({
            key: p.slug,
            node: (
              <Link
                href={`/blog/${p.slug}`}
                className="group flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:gap-8"
              >
                {p.image && (
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-sand/60 sm:w-2/5">
                    <Image
                      src={p.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    <time dateTime={p.date}>{postDate(p.date)}</time> · {p.minutes} min read
                  </p>
                  <h2 className="mt-3 font-serif text-2xl leading-snug group-hover:text-bronze md:text-3xl">{p.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em]">
                    Read more <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            ),
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
