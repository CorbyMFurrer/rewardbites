import { Suspense } from "react";
import Header from "@/components/HomePages/Header";
import Hero from "@/components/HomePages/Hero";
import Problem from "@/components/HomePages/Problem";
import FeaturesAccordion from "@/components/HomePages/FeaturesAccordion";
import Pricing from "@/components/HomePages/Pricing";
import FAQ from "@/components/HomePages/FAQ";
import CTA from "@/components/HomePages/CTA";
import Footer from "@/components/HomePages/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
