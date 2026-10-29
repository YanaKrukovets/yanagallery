"use client";

// Last-resort error page, used only when the root layout itself breaks. It replaces the whole
// page, so it brings its own <html>, styles and fonts and skips the header, footer and bag.

import { Fraunces, Hedvig_Letters_Sans } from "next/font/google";
import { StatusPage } from "@/components/layout/StatusPage";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const hedvig = Hedvig_Letters_Sans({
  variable: "--font-hedvig",
  subsets: ["latin"],
  weight: "400",
});

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${hedvig.variable} antialiased`}>
      <body>
        <title>Something went wrong</title>
        <StatusPage
          code="500"
          title={
            <>
              Something went <span className="accent">wrong</span>
            </>
          }
          message="Sorry, the site didn't load properly. Please try again in a moment."
          actions={
            <button
              type="button"
              onClick={() => retry()}
              className="rounded-full bg-bronze px-7 py-4 text-sm uppercase tracking-[0.15em] text-cream transition-colors hover:bg-ink"
            >
              Try again
            </button>
          }
        />
      </body>
    </html>
  );
}
