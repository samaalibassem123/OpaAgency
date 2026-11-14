import React from "react";
import { InitialLoader } from "@/components/shared/InitialLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* Brand Liquid Glass Introduction / Preloader */}
      <InitialLoader />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Single-Page Landing Core */}
      <main className="relative flex flex-col min-h-screen bg-white text-slate-900 w-full max-w-full overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </>
  );
}
