"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Turns off movement in every motion animation when the visitor's system asks for reduced motion. */
export function MotionPrefs({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
