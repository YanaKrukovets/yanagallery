import type { CSSProperties } from "react";
import { PausableMarquee } from "@/components/ui/PausableMarquee";
import { tickerItems } from "@/content/site";

// The strip scrolls by -50%, so the items are repeated enough to fill wide screens seamlessly.
const items = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

export function Ticker() {
  return (
    <PausableMarquee
      label="banner"
      className="marquee-pause relative mt-20 overflow-hidden border-y border-ink/10 bg-ink py-5 text-cream md:mt-28"
      buttonClassName="absolute right-3 top-1/2 z-10 -translate-y-1/2 border-cream/30 bg-ink hover:border-cream"
    >
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
    </PausableMarquee>
  );
}
