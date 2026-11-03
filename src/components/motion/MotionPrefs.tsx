"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Turns off movement in every motion animation when the visitor's system asks for reduced motion.
 * LazyMotion loads only the animation features the site uses, which keeps the JavaScript bundle smaller.
 * Use `m.div` (not `motion.div`) in components so they pick up these features.
 */
export function MotionPrefs({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
