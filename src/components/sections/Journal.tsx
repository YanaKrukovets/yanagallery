import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { postDate, posts } from "@/content/journal";

/** The latest three blog posts, for the home page. */
export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <SectionHead
        title={["Stories from the", { accent: "studio" }]}
        intro="Local art events, hanging tips, and notes from the easel."
        link={{ href: "/blog", label: "All posts" }}
      />
      <div className="grid gap-10 md:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.12}>
            <Link href={`/blog/${p.slug}`} className="group block border-t border-ink/15 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {postDate(p.date)} · {p.minutes} min read
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-snug">
                <span className="bg-gradient-to-r from-ink to-ink bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                  {p.title}
                </span>
              </h3>
              <p className="mt-3 text-ink-soft">{p.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
