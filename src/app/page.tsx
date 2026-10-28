import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Artist } from "@/components/sections/Artist";
import { BestSellers } from "@/components/sections/BestSellers";
import { Collections } from "@/components/sections/Collections";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { Philosophy } from "@/components/sections/Philosophy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Ticker />
        <Features />
        <BestSellers />
        <Collections />
        <Philosophy />
        <Artist />
        <NewArrivals />
        {/* Commissions section hidden for now. To bring it back, import it from "@/components/sections/Commissions" and add <Commissions /> here. */}
        {/* Journal section hidden until there are real posts. To bring it back, import it from "@/components/sections/Journal" and add <Journal /> here. */}
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
