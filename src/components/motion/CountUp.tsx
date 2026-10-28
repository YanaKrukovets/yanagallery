"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration: reduce ? 0 : 2,
      ease: "easeOut",
      // Write straight to the DOM so the count doesn't re-render React every frame.
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-CA") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, value, reduce]);

  return (
    <>
      <span ref={ref} aria-hidden>
        0{suffix}
      </span>
      <span className="sr-only">{to.toLocaleString("en-CA") + suffix}</span>
    </>
  );
}
