import Link from "next/link";
import type { NavLink } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { RollText } from "@/components/motion/RollText";
import { SplitHeading, type Segment } from "@/components/motion/SplitHeading";

type SectionHeadProps = {
  title: Segment[];
  /** Use "h1" when this is the page's main title. */
  as?: "h1" | "h2";
  intro?: string;
  link?: NavLink;
};

/** Standard section heading: animated title, optional intro line, optional "view all" link. */
export function SectionHead({ title, as = "h2", intro, link }: SectionHeadProps) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <SplitHeading as={as} segments={title} className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl" />
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-ink-soft">{intro}</p>
          </Reveal>
        )}
      </div>
      {link && (
        <Reveal delay={0.3}>
          <Link href={link.href} className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
            <span className="border-b border-ink pb-1">
              <RollText text={link.label} />
            </span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}
