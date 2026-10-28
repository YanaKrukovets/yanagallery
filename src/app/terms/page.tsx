import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionHead } from "@/components/ui/SectionHead";
import { canadaPostEstimates, lettermail, shippingOptions, shop } from "@/content/site";

// Plain-language terms of sale. Keep them in step with the FAQ, the shipping
// options in content/site.ts, and how checkout really works. Change the date
// whenever you edit this page.
//
// TODO before launch — confirm the placeholder marked "TODO" below: the commission
// deposit. If sales pass $30,000 over four quarters, register for GST/HST, turn on
// Stripe Tax in checkout.ts, and update the sales tax line.
const LAST_UPDATED = "October 27, 2026";

export const metadata: Metadata = {
  title: `Terms | ${shop.name}`,
  description: `Terms of sale for ${shop.name}: payment, shipping, returns, commissions, and copyright.`,
};

export default function TermsPage() {
  const email = (
    <a href={`mailto:${shop.email}`} className="underline underline-offset-4 hover:text-bronze">
      {shop.email}
    </a>
  );

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-8 md:pt-36 outline-none">
        <SectionHead
          as="h1"
          title={["Terms of", { accent: "sale" }]}
          intro={`Last updated ${LAST_UPDATED}. The short version: prices are in Canadian dollars, any piece from the shop can be returned within 14 days, and the copyright in every piece stays with the artist.`}
        />

        <div className="space-y-12 text-ink-soft leading-relaxed">
          <Section id="about" title="Who you're buying from">
            <p>
              This is a small online art shop run by {shop.artist} in Ottawa, Ontario. When you
              place an order, you are buying directly from me. Questions about anything on this page
              can go to {email}.
            </p>
          </Section>

          <Section id="orders" title="Orders and payment">
            <ul className="list-disc space-y-3 pl-5">
              <li>All prices are in Canadian dollars (CAD).</li>
              <li>
                Prices don&apos;t include sales tax. I&apos;m not currently registered for GST/HST, so no
                sales tax is charged.
              </li>
              <li>
                You can pay online through Stripe&apos;s secure checkout. Your order is confirmed once
                payment goes through and you receive a confirmation email.
              </li>
              <li>
                You can also see a piece in person first. Email {email} to set a time to meet, and
                pay by cash or online when we meet. Once we agree on a time, I&apos;ll hold the piece
                for you for up to 5 days. After that, it goes back on sale.
              </li>
              <li>
                Originals are one of a kind. If two people buy the same original at almost the same
                moment, the first completed order gets it and the other buyer receives a full refund.
              </li>
              <li>
                I may cancel an order and refund it in full if a price or listing was clearly wrong,
                or if a piece is no longer available.
              </li>
            </ul>
          </Section>

          <Section id="the-art" title="About the art">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-ink">Originals</strong> are painted by hand and exist only
                once. Small marks, texture, and brushwork are part of the piece, not flaws.
              </li>
              <li>
                <strong className="text-ink">Prints</strong> are giclée reproductions on archival
                paper, made in small editions and signed by the artist.
              </li>
              <li>
                Photos are taken with care, but colours can look a little different on every screen.
                If you want to be sure, ask for extra photos or a short video before you buy.
              </li>
            </ul>
          </Section>

          <Section id="shipping" title="Shipping and pickup">
            <ul className="list-disc space-y-2 pl-5">
              {shippingOptions
                .filter((o) => !("hideOnTerms" in o && o.hideOnTerms))
                .map((o) => (
                <li key={o.label}>
                  <strong className="text-ink">{o.label}</strong>:{" "}
                  {o.price === 0 ? "free" : `$${o.price}`}, usually ready or delivered in{" "}
                  {o.days[0]}–{o.days[1]} business days.
                </li>
              ))}
              <li>
                <strong className="text-ink">{lettermail.label}</strong>:{" "}
                {lettermail.tiers
                  .map((t) => `$${t.price} up to ${t.upToGrams} g`)
                  .join(", ")}
                , usually delivered in {lettermail.days[0]}–{lettermail.days[1]} business days. It
                only appears at checkout when your order is just postcards and magnets.
              </li>
            </ul>
            <p>
              Shipping prices are based on what Canada Post charges. For reference, here is what a
              Regular Parcel costs at the post office before tax ({canadaPostEstimates.updated}):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[22rem] text-left text-sm">
                <thead className="text-ink">
                  <tr className="border-b border-ink/15">
                    <th className="py-2 pr-3 font-medium">Packed weight</th>
                    <th className="py-2 pr-3 font-medium">Ottawa and Gatineau</th>
                    <th className="py-2 pr-3 font-medium">Most of Canada</th>
                    <th className="py-2 font-medium">Remote and North</th>
                  </tr>
                </thead>
                <tbody>
                  {canadaPostEstimates.rows.map((r) => (
                    <tr key={r.weight} className="border-b border-ink/10">
                      <td className="py-2 pr-3">{r.weight}</td>
                      <td className="py-2 pr-3">${r.local.toFixed(2)}</td>
                      <td className="py-2 pr-3">${r.typical.toFixed(2)}</td>
                      <td className="py-2">${r.remote.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              To see the exact price for your address, try Canada Post&apos;s{" "}
              <a
                href={canadaPostEstimates.calculatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-bronze"
              >
                Find a Rate calculator
                  <span className="sr-only"> (opens in a new tab)</span>
              </a>
              . Most pieces from the shop weigh under 0.5 kg packed.
            </p>
            <p>
              Delivery times are estimates, not guarantees. Every piece is packed in reinforced
              packaging. If your art arrives damaged, email {email} within 3 days of delivery with
              photos of the piece and the packaging, and I will repair, replace, or refund it.
            </p>
          </Section>

          <Section id="returns" title="Returns">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                Any original or print bought from the shop can be returned within 14 days of
                delivery or pickup for a refund of the price you paid. It must come back in the
                condition you received it and in its original packaging.
              </li>
              <li>
                Return shipping is paid by the buyer, and the original delivery fee is not refunded.
                If the piece arrived damaged or was not what you ordered, I cover the cost instead.
              </li>
              <li>
                Commissions are made just for you, so they are final sale. See{" "}
                <a href="#commissions" className="underline underline-offset-4 hover:text-bronze">
                  Commissions
                </a>{" "}
                below.
              </li>
              <li>
                To start a return, email {email}. Refunds go back to your original payment method
                within 10 business days of the piece arriving back with me. Cash payments are
                refunded in cash or by e-transfer.
              </li>
            </ul>
          </Section>

          <Section id="commissions" title="Commissions">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                Every commission starts with a conversation, then a sketch and a written quote with
                the size, price, and an estimated timeline. Nothing is painted until you agree.
              </li>
              <li>
                {/* TODO: confirm the deposit amount and whether it can be refunded. */}
                A 50% deposit is due to start the work. The deposit is non-refundable once painting
                begins. The balance is due when the piece is finished, before it ships.
              </li>
              <li>
                One round of changes at the sketch stage is included. Larger changes after painting
                starts may cost extra, and I will tell you before doing them.
              </li>
              <li>Finished commissions are final sale.</li>
            </ul>
          </Section>

          <Section id="copyright" title="Copyright">
            <p>
              Buying a piece gives you the physical artwork, not the copyright. {shop.artist} keeps
              all rights to the image. That means you can hang it, sell it, or give it away, but you
              may not copy, print, or use the image commercially without written permission. I may
              share photos of the work, including commissions, on this site and on social media.
            </p>
          </Section>

          <Section id="liability" title="The legal part">
            <p>
              If something goes wrong with your order, the most I am responsible for is the amount
              you paid for it. Nothing on this page takes away the rights you have under Ontario
              and Canadian consumer protection law. These terms are governed by the laws of
              Ontario and Canada.
            </p>
          </Section>

          <Section id="changes" title="Changes to these terms">
            <p>
              I may update these terms from time to time and will change the date at the top when I
              do. The terms that apply to your order are the ones on this page when you placed it.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
