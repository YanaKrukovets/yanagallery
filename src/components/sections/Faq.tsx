import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { shop } from "@/content/site";
import { FaqAccordion } from "./FaqAccordion";

export function Faq() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
      <div className="md:col-span-5">
        <SplitHeading
          segments={["Questions,", { accent: "answered simply" }]}
          className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-ink-soft">
            Still wondering? Email{" "}
            <a href={`mailto:${shop.email}`} className="underline decoration-gold underline-offset-4 hover:text-ink">
              {shop.email}
            </a>{" "}
            — I usually reply within a day.
          </p>
        </Reveal>
      </div>
      <div className="md:col-span-7">
        <FaqAccordion />
      </div>
    </section>
  );
}
