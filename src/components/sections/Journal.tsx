import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { posts } from "@/content/journal";

export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <SectionHead
        title={["Stories from the", { accent: "studio" }]}
        intro="Hanging tips, framing guides, and notes from the easel."
      />
      <div className="grid gap-10 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.12}>
            <a href={`#${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted">
                {p.date} · {p.minutes} min read
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-snug">
                <span className="bg-gradient-to-r from-ink to-ink bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                  {p.title}
                </span>
              </h3>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
