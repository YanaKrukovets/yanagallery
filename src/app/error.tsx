"use client";

// Shown when a page breaks while loading (a "500" error). The header and footer stay.
// Errors in the root layout itself are caught by global-error.tsx instead.

import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StatusPage } from "@/components/layout/StatusPage";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <title>Something went wrong</title>
      <Header />
      <StatusPage
        code="500"
        title={
          <>
            Something went <span className="accent">wrong</span>
          </>
        }
        message="Sorry, this page didn't load properly. Please try again in a moment."
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
      <Footer />
    </>
  );
}
