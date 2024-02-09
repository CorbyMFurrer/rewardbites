import { Suspense } from "react";
import Header from "@/components/pages/Header";
import Hero from "@/components/pages/Hero";
import Problem from "@/components/pages/Problem";
import FeaturesAccordion from "@/components/pages/FeaturesAccordion";
import Pricing from "@/components/pages/Pricing";
import FAQ from "@/components/pages/FAQ";
import CTA from "@/components/pages/CTA";
import Footer from "@/components/pages/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
