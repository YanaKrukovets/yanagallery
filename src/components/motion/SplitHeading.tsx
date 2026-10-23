"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/** A plain run of words, or `{ accent: "..." }` for the italic accent style. */
export type Segment = string | { accent: string };

type SplitHeadingProps = {
  segments: Segment[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (use above the fold). */
  immediate?: boolean;
};

const wordVariants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
};

/** Heading that reveals word by word, sliding up from behind a mask. */
export function SplitHeading({ segments, as: Tag = "h2", className, delay = 0, immediate = false }: SplitHeadingProps) {
  const words = segments.flatMap((s) => {
    const accent = typeof s !== "string";
    const text = accent ? s.accent : s;
    return text.split(" ").filter(Boolean).map((word) => ({ word, accent }));
  });
  const MotionTag = motion[Tag];
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={words.map((w) => w.word).join(" ")}
    >
      {words.map(({ word, accent }, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className={`inline-block ${accent ? "accent" : ""}`} variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}
