import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { RollText } from "@/components/motion/RollText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { images, stats } from "@/content/site";

export function Artist() {
  return (
    <section className="bg-ink py-20 text-cream md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div className="relative">
          <ParallaxImage
            src={images.artist}
            alt="Northern Lights Reflection, a framed painting by Yana, on a sunlit wall"
            className="aspect-[4/5] rounded-b-[200px]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <Reveal className="absolute -right-4 -top-8 hidden w-40 md:block lg:w-48" delay={0.3}>
            <div className="border-[8px] border-cream shadow-2xl">
              <div className="relative aspect-square">
                <Image src={images.artistDetail} alt="Cherry Blossom Serenity, a framed painting, on a wall" fill sizes="200px" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          <SplitHeading
            segments={["The artist", { accent: "behind" }, "the work"]}
            className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl [&_.accent]:text-gold"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-sand/80">
              Hi, I&apos;m Yana Krukovets — an Ottawa artist making small paintings for cozy walls.
              Some follow the old folk tradition: roosters, curling vines and bright blossoms brushed
              onto a deep black ground. Others drift toward the night sky — a full moon, a lone tree at
              dusk, cherry blossoms over still water. The framed pieces are hand-painted in acrylic,
              sealed in glossy resin and set in a natural wood frame. I also paint in watercolour and
              oil — hand-painted postcards and little fridge magnets, perfect for gifting.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-lg leading-relaxed text-sand/80">
              Every order is packed by hand and comes with a signed note from me.
            </p>
          </Reveal>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-cream/15 pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-sand/70">{s.label}</dt>
                <dd className="font-serif text-4xl text-gold md:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.4}>
            <Link
              href="/products"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:bg-gold"
            >
              <RollText text="Find your piece" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
