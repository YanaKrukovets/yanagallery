"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** How far (px) the content rises as it fades in. */
  y?: number;
  className?: string;
};

/** Fades and lifts its children into place when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
