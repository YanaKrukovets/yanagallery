import { Reveal } from "@/components/motion/Reveal";
import { features } from "@/content/site";

export function Features() {
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <h2 id="features-title" className="sr-only">
        Why shop here
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="border-t border-ink/15 pt-6">
              <span aria-hidden className="font-serif text-sm text-bronze">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
