"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/content/faqs";
import { EASE } from "@/lib/motion";

/** One question open at a time; the first starts open. */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ink/15 border-y border-ink/15">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <h3 className="font-serif text-xl md:text-2xl">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span>{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/25 text-lg"
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
