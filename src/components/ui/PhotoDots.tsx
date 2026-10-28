"use client";

/** Small dots for switching between a product's photos. Renders nothing for a single photo. */
export function PhotoDots({
  count,
  shown,
  onSelect,
  className = "",
}: {
  count: number;
  shown: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  if (count < 2) return null;
  return (
    <div className={`flex rounded-full bg-cream/80 px-1 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show photo ${i + 1} of ${count}`}
          aria-pressed={i === shown}
          className="group/dot grid h-6 w-6 place-items-center rounded-full"
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${i === shown ? "bg-ink" : "bg-ink/25 group-hover/dot:bg-ink/50"}`}
          />
        </button>
      ))}
    </div>
  );
}
