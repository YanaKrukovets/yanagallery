import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { shop } from "@/content/site";
import { collections, productsIn } from "@/content/collections";

export function Collections() {
  return (
    <section id="collections" className="scroll-mt-24 bg-sand/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          title={["Shop by", { accent: "collection" }]}
          intro="Folk florals, painted skies, and little gifts — find the pieces that speak to you."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.12}>
              <Link href={`/collections/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-t-[200px]">
                <Image
                  src={c.image}
                  alt={`${c.title} collection: hand-painted pieces by ${shop.artist}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 pr-20 text-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-sand/80">{productsIn(c.slug).length} pieces</p>
                  <h3 className="mt-2 font-serif text-3xl">{c.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-sand/90 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 [@media(hover:none)]:max-h-20 [@media(hover:none)]:opacity-100">
                    {c.blurb}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-7 right-7 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:-rotate-45"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
