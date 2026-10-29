import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StatusPage } from "@/components/layout/StatusPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <StatusPage
        code="404"
        title={
          <>
            This page has <span className="accent">wandered off</span>
          </>
        }
        message="It may have sold, moved, or never existed. The rest of the work is still here."
      />
      <Footer />
    </>
  );
}
