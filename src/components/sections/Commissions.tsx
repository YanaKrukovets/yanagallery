import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { commissionSteps } from "@/content/site";

export function Commissions() {
  return (
    <section id="commissions" className="scroll-mt-24 border-y border-ink/10 bg-sand/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          title={["A painting made", { accent: "just for you" }]}
          intro="Commissions of the places and moments that matter to you, painted by hand in Ottawa."
          link={{ href: "#contact", label: "Get a quote" }}
        />
        <ol className="grid gap-10 md:grid-cols-3">
          {commissionSteps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.12}>
                <span aria-hidden className="font-serif text-7xl text-gold/60 md:text-8xl">{i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
