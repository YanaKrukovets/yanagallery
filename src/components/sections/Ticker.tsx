import type { CSSProperties } from "react";
import { tickerItems } from "@/content/site";

// The strip scrolls by -50%, so the items are repeated enough to fill wide screens seamlessly.
const items = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

export function Ticker() {
  return (
    <div className="mt-20 overflow-hidden border-y border-ink/10 bg-ink py-5 text-cream md:mt-28">
      <div
        className="animate-marquee flex w-max gap-12 whitespace-nowrap"
        style={{ "--marquee-duration": "35s" } as CSSProperties}
      >
        {items.map((t, i) => (
          <span key={i} aria-hidden={i >= tickerItems.length} className="flex items-center gap-12 font-serif text-xl italic md:text-2xl">
            {t}
            <span aria-hidden className="not-italic text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
