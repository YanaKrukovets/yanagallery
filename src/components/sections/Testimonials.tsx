import type { CSSProperties } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { testimonials } from "@/content/testimonials";

const half = Math.ceil(testimonials.length / 2);
const rows = [testimonials.slice(0, half), testimonials.slice(half)];

export function Testimonials() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead title={["What", { accent: "collectors" }, "say"]} />
      </div>
      <div className="marquee-pause flex flex-col gap-6">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`${r === 0 ? "animate-marquee" : "animate-marquee-reverse"} flex w-max gap-6`}
            style={{ "--marquee-duration": "60s" } as CSSProperties}
          >
            {/* Repeated so the -50% marquee loop never shows a gap. Copies are hidden from screen readers. */}
            {[...row, ...row, ...row, ...row].map((t, i) => (
              <figure
                key={i}
                aria-hidden={i >= row.length}
                className="w-[340px] shrink-0 rounded-2xl border border-ink/10 bg-white/60 p-8 md:w-[420px]"
              >
                <p className="text-gold" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote className="mt-4 font-serif text-xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
                  {t.name} · {t.place}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
