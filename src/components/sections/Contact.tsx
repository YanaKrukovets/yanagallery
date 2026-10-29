import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { RollText } from "@/components/motion/RollText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { images, shop } from "@/content/site";
import { mailtoHref } from "@/lib/format";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-ink text-cream md:grid-cols-2">
        <ParallaxImage
          src={images.shop}
          alt="Floral Harmony, a framed folk floral painting, on a warm wall"
          className="min-h-[320px]"
          sizes="(min-width: 768px) 50vw, 100vw"
          strength={40}
        />
        <div className="p-8 md:p-14">
          <SplitHeading
            segments={["Come say", { accent: "bonjour" }]}
            className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl [&_.accent]:text-gold"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-sand/80">
              Ask about a piece, a commission, or a custom size.
            </p>
            <ul className="mt-8 space-y-2">
              <li>
                <a href={`mailto:${shop.email}`} className="font-serif text-2xl underline decoration-gold underline-offset-4">
                  {shop.email}
                </a>
              </li>
            </ul>
            <a
              href={mailtoHref(shop.email, { subject: "Hello" })}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:bg-cream"
            >
              <RollText text="Send me a note" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
