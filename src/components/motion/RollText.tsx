"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const NBSP = " ";
const rollVariants = { rest: { y: "0%" }, hover: { y: "-100%" } };

/** Text whose letters roll up one by one on hover (used in nav links and buttons). */
export function RollText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`relative inline-flex overflow-hidden ${className ?? ""}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      aria-label={text}
    >
      {text.split("").map((ch, i) => {
        const glyph = ch === " " ? NBSP : ch;
        const transition = { duration: 0.35, delay: i * 0.02, ease: EASE };
        return (
          <span key={i} aria-hidden className="relative inline-block">
            <motion.span className="inline-block" variants={rollVariants} transition={transition}>
              {glyph}
            </motion.span>
            <motion.span className="absolute left-0 top-full inline-block" variants={rollVariants} transition={transition}>
              {glyph}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
