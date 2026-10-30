import { CollectionCards } from "@/components/ui/CollectionCards";
import { SectionHead } from "@/components/ui/SectionHead";

export function Collections() {
  return (
    <section id="collections" className="scroll-mt-24 bg-sand/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          title={["Shop by", { accent: "collection" }]}
          intro="Folk florals, painted skies, and little gifts — find the pieces that speak to you."
        />
        <CollectionCards />
      </div>
    </section>
  );
}
