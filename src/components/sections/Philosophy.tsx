import { Reveal } from "@/components/motion/Reveal";
import { ScrollHighlight } from "@/components/motion/ScrollHighlight";
import { philosophy, shop } from "@/content/site";

export function Philosophy() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-28 text-center md:px-8 md:py-40">
      <Reveal>
        <span aria-hidden className="font-serif text-4xl text-gold">“</span>
      </Reveal>
      <ScrollHighlight text={philosophy} className="font-serif text-3xl leading-snug tracking-tight md:text-5xl" />
      <Reveal delay={0.2}>
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-bronze">— {shop.artist}</p>
      </Reveal>
    </section>
  );
}
