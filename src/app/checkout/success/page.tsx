import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { shop } from "@/content/site";
import { ClearCart } from "@/features/cart/ClearCart";
import { outsideArea } from "@/features/cart/delivery";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: `Thank you | ${shop.name}`,
  robots: { index: false },
};

export default function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:pt-36 outline-none">
        <Suspense fallback={<p className="text-ink-soft">Confirming your order…</p>}>
          <OrderStatus searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function OrderStatus({ searchParams }: Pick<PageProps<"/checkout/success">, "searchParams">) {
  const { session_id } = await searchParams;
  const session = await findSession(session_id);

  // A bank debit can leave a finished checkout "unpaid" for a few days while it goes through.
  const processing = session?.status === "complete" && session.payment_status === "unpaid";
  if (!session || (session.payment_status !== "paid" && !processing)) {
    return (
      <>
        <h1 className="font-serif text-4xl md:text-5xl">
          We couldn&apos;t find that <span className="accent">order</span>
        </h1>
        <p className="mt-6 text-ink-soft">
          If you were charged, don&apos;t worry: your receipt is in your email. Questions? Write to{" "}
          <a href={`mailto:${shop.email}`} className="underline underline-offset-4 hover:text-bronze">
            {shop.email}
          </a>
          .
        </p>
        <BackLink />
      </>
    );
  }

  const name = session.customer_details?.name?.split(" ")[0];
  const email = session.customer_details?.email;
  const rate = session.shipping_cost?.shipping_rate;
  const deliveryLabel = rate && typeof rate !== "string" ? (rate.display_name ?? undefined) : undefined;
  const postalCode = session.collected_information?.shipping_details?.address?.postal_code;
  const offArea = outsideArea(deliveryLabel, postalCode);
  if (offArea) await flagDelivery(session.payment_intent, deliveryLabel, postalCode);

  return (
    <>
      <ClearCart />
      <h1 className="font-serif text-4xl md:text-5xl">
        Thank you{name ? `, ${name}` : ""}! <span className="accent">Order received.</span>
      </h1>
      <p className="mt-6 text-ink-soft">
        {email ? <>A receipt is on its way to {email}. </> : null}
        {processing && <>Your payment is still going through; you&apos;ll get an email once it does. </>}
        Yana will be in touch soon about pickup or delivery.
      </p>
      {offArea && (
        <p className="mt-4 text-ink-soft">
          Your address ({postalCode}) is outside the area for “{deliveryLabel}”, so Yana will email
          you about the delivery cost or a refund.
        </p>
      )}
      <BackLink />
    </>
  );
}

async function findSession(id: string | string[] | undefined) {
  if (typeof id !== "string" || !id.startsWith("cs_")) return null;
  try {
    return await stripe().checkout.sessions.retrieve(id, { expand: ["shipping_cost.shipping_rate"] });
  } catch {
    return null;
  }
}

/** Notes on the payment in Stripe that the buyer picked local delivery for an address outside its area. */
async function flagDelivery(
  payment: string | { id: string } | null,
  label: string | undefined,
  postalCode: string | null | undefined,
) {
  const id = typeof payment === "string" ? payment : payment?.id;
  if (!id) return;
  try {
    await stripe().paymentIntents.update(id, {
      metadata: {
        delivery_check: `Outside the area for "${label}" (address postal code ${postalCode ?? "missing"}). Contact the buyer.`.slice(0, 500),
      },
    });
  } catch (err) {
    console.error("Couldn't flag the delivery address in Stripe:", err);
  }
}

function BackLink() {
  return (
    <Link
      href="/products"
      className="mt-10 rounded-full bg-ink px-7 py-4 text-sm uppercase tracking-[0.15em] text-cream hover:bg-bronze"
    >
      Keep browsing
    </Link>
  );
}
