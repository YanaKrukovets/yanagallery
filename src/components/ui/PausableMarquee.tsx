"use client";

import { useState, type ReactNode } from "react";

/** Wraps scrolling marquee strips with a Pause / Play button, so moving text can be stopped. */
export function PausableMarquee({
  children,
  className = "",
  buttonClassName = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  /** What is moving, for the button's screen reader name, e.g. "testimonials". */
  label: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={className} data-paused={paused || undefined}>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${buttonClassName}`}
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> scrolling {label}</span>
      </button>
      {children}
    </div>
  );
}
