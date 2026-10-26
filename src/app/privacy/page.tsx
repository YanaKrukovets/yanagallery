import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionHead } from "@/components/ui/SectionHead";
import { shop } from "@/content/site";

// Plain-language privacy policy. Keep it in step with what the site really does:
// if you add analytics, a newsletter provider, or a new payment or shipping
// service, add it here and change the date.
const LAST_UPDATED = "October 23, 2026";

export const metadata: Metadata = {
  title: `Privacy | ${shop.name}`,
  description: `How ${shop.name} collects, uses, and protects your personal information.`,
};

export default function PrivacyPage() {
  const email = (
    <a href={`mailto:${shop.email}`} className="underline underline-offset-4 hover:text-bronze">
      {shop.email}
    </a>
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <SectionHead
          title={["Privacy", { accent: "policy" }]}
          intro={`Last updated ${LAST_UPDATED}. The short version: I collect only what I need to send you your art, I never sell it, and you can ask me to see or delete it at any time.`}
        />

        <div className="space-y-12 text-ink-soft leading-relaxed">
          <Section title="Who I am">
            <p>
              {shop.name} is a small online art shop run by {shop.artist} in Ottawa, Ontario. I am
              responsible for the personal information collected through this website, and I am the
              person to contact about anything in this policy: {email}.
            </p>
          </Section>

          <Section title="What I collect">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="text-ink">When you place an order:</strong> your name, email, phone
                number, shipping address, and what you bought. Checkout is handled by Stripe, our
                payment processor. Your card details go straight to Stripe and I never see or store
                your full card number.
              </li>
              <li>
                <strong className="text-ink">When you email or call me:</strong> whatever you choose to
                share, such as photos and details of your space for a commission.
              </li>
              <li>
                <strong className="text-ink">When you join the newsletter:</strong> your email address.
              </li>
              <li>
                <strong className="text-ink">When you browse:</strong> your shopping bag is saved in your
                own browser so it survives a page reload. It holds only which pieces you added and how
                many, and it never leaves your device until you check out. Like any website, the
                servers that host this site keep short-lived technical logs (such as IP address and
                browser type) to keep it running and secure.
              </li>
            </ul>
            <p>
              This site does not use advertising or analytics trackers, and I do not build profiles of
              visitors.
            </p>
          </Section>

          <Section title="How I use it">
            <ul className="list-disc space-y-2 pl-5">
              <li>To process your payment and deliver or arrange pickup of your order.</li>
              <li>To answer your questions, handle returns, and work on commissions with you.</li>
              <li>To send the newsletter, only if you signed up. Every email has an unsubscribe link.</li>
              <li>To keep the records that Canadian tax law requires.</li>
            </ul>
            <p>I will not use your information for anything else without asking you first.</p>
          </Section>

          <Section title="Who I share it with">
            <p>I never sell or rent your personal information. I share it only with the services that help me run the shop:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Stripe</strong>, to take payments. Stripe is based in the
                United States, so your order details may be stored and processed outside Canada and
                may be subject to the laws of those countries.{" "}
                <a
                  href="https://stripe.com/privacy"
                  className="underline underline-offset-4 hover:text-bronze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe&apos;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-ink">The delivery carrier</strong>, who gets your name, address,
                and phone number to deliver your order.
              </li>
              <li>
                <strong className="text-ink">The website host and email providers</strong> that keep
                this site and my inbox running.
              </li>
            </ul>
            <p>I may also disclose information if the law requires it.</p>
          </Section>

          <Section title="Cookies">
            <p>
              This site does not set advertising or tracking cookies. Your bag is kept in your
              browser&apos;s local storage, which you can clear at any time in your browser settings.
              Stripe&apos;s checkout page uses its own cookies to process payments safely and prevent
              fraud.
            </p>
          </Section>

          <Section title="How long I keep it">
            <p>
              Order records are kept for as long as Canadian tax law requires, which is currently six
              years. Emails about commissions and questions are kept while they are useful and then
              deleted. Newsletter addresses are removed as soon as you unsubscribe.
            </p>
          </Section>

          <Section title="Keeping it safe">
            <p>
              Payments run on Stripe&apos;s secure checkout, the site is served over an encrypted
              connection, and I limit access to your information to myself and the services listed
              above. No system is perfectly secure, but if something ever went wrong in a way that put
              you at risk, I would tell you and report it as the law requires.
            </p>
          </Section>

          <Section title="Your choices and rights">
            <p>You can ask me at any time to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>see the personal information I hold about you,</li>
              <li>correct anything that is wrong,</li>
              <li>delete your information, except what I must keep for tax records,</li>
              <li>stop sending you the newsletter.</li>
            </ul>
            <p>
              Write to {email} and I will reply within 30 days. If you are not happy with my answer,
              you can contact the{" "}
              <a
                href="https://www.priv.gc.ca"
                className="underline underline-offset-4 hover:text-bronze"
                target="_blank"
                rel="noopener noreferrer"
              >
                Office of the Privacy Commissioner of Canada
              </a>
              , or, if you live in Quebec, the{" "}
              <a
                href="https://www.cai.gouv.qc.ca"
                className="underline underline-offset-4 hover:text-bronze"
                target="_blank"
                rel="noopener noreferrer"
              >
                Commission d&apos;accès à l&apos;information
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If the way I handle your information changes, I will update this page and the date at
              the top. For a big change, I will let customers and subscribers know by email.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
