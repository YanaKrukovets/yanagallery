"use client";

import { m } from "motion/react";
import { EASE } from "@/lib/motion";

const NBSP = " ";
const rollVariants = { rest: { y: "0%" }, hover: { y: "-100%" } };

/** Text whose letters roll up one by one on hover (used in nav links and buttons). */
export function RollText({ text, className }: { text: string; className?: string }) {
  return (
    <m.span
      className={`relative inline-flex overflow-hidden ${className ?? ""}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="sr-only">{text}</span>
      {text.split("").map((ch, i) => {
        const glyph = ch === " " ? NBSP : ch;
        const transition = { duration: 0.35, delay: i * 0.02, ease: EASE };
        return (
          <span key={i} aria-hidden className="relative inline-block">
            <m.span className="inline-block" variants={rollVariants} transition={transition}>
              {glyph}
            </m.span>
            <m.span className="absolute left-0 top-full inline-block" variants={rollVariants} transition={transition}>
              {glyph}
            </m.span>
          </span>
        );
      })}
    </m.span>
  );
}
