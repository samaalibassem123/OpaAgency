"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Sparkles, Layers, ShieldCheck, UserCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 92%",
          once: true,
        },
      });

      gsap.from(quoteRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 92%",
          once: true,
        },
      });

      gsap.from(visualRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 90%",
          once: true,
        },
      });

      if (pillarsRef.current) {
        const pillarItems = pillarsRef.current.children;
        gsap.from(pillarItems, {
          y: 20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-end">
          <div ref={headingRef} className="lg:col-span-7">
            <SectionHeading
              kicker="À Propos d'OPA • Our Print Agency"
              title="Une Manufacture Dédiée à"
              highlight="l'Émotion du Papier."
              description="Basée à Ariana et Tunis, la Société OPA allie l'artisanat d'art des maîtres imprimeurs à la rigueur des technologies modernes d'impression et de packaging."
            />
          </div>

          <div ref={quoteRef} className="lg:col-span-5">
            <Card className="p-6 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)]">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-[#D41A78]/10 border border-[#D41A78]/20 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-[#D41A78]" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D41A78] font-bold block">
                    Direction d&apos;Atelier
                  </span>
                  <span className="text-sm text-slate-900 font-bold">
                    {siteConfig.leadership.name}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                « Notre engagement est d&apos;apporter à chaque marque une qualité d&apos;exécution irréprochable : calage précis, dorure éclatante et papiers nobles. »
              </p>
            </Card>
          </div>
        </div>

        {/* Editorial Two-Column Visual & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clean Visual Composition with Official OPA Logo */}
          <div ref={visualRef} className="lg:col-span-6">
            <Card className="relative rounded-2xl overflow-hidden p-2.5 sm:p-3 bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-slate-50/90 via-white to-slate-100/70 flex items-center justify-center p-6 sm:p-10 border border-slate-100">
                {/* Subtle Print Craft Accents & Registration Marks */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-400 select-none z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DB8D3]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D41A78]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3C215]" />
                  <span className="ml-1 uppercase text-slate-500 font-semibold text-[10px]">Étalonnage CMJN</span>
                </div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[10px] font-mono text-slate-300 select-none z-20">
                  ✚ 2080 TUNIS
                </div>

                {/* Soft CMYK ambient blur glows behind logo */}
                <div className="absolute w-44 h-44 rounded-full bg-[#2DB8D3]/10 blur-3xl -top-8 -left-8 pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-[#D41A78]/10 blur-3xl -bottom-8 -right-8 pointer-events-none" />
                <div className="absolute w-36 h-36 rounded-full bg-[#F3C215]/15 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                {/* Official High-Resolution Logo Presentation */}
                <div className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] flex items-center justify-center transition-transform duration-700 ease-out hover:scale-105">
                  <Image
                    src="/images/opa-logo-light.png"
                    alt="Logo Officiel OPA Imprimerie — Our Print Agency"
                    width={628}
                    height={339}
                    priority
                    className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
                  />
                </div>

                {/* Bottom Glassmorphic Atelier Badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-3.5 rounded-xl bg-white/90 backdrop-blur-md backdrop-saturate-150 border border-slate-200/90 text-xs shadow-md flex items-center justify-between z-20">
                  <span className="font-bold text-slate-900 text-[11px] sm:text-xs">Ateliers de Production à Tunis &amp; Ariana</span>
                  <span className="text-[#D41A78] font-semibold text-[10px] sm:text-[11px]">Fabrication 100% Intégrée</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: 3 Clear Pillars (shadcn Cards) */}
          <div ref={pillarsRef} className="lg:col-span-6 flex flex-col space-y-4">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Card className="p-5 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_6px_24px_-6px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-slate-300 hover:shadow-[0_14px_30px_-8px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#D41A78]/10 border border-[#D41A78]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#D41A78]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Dorure à Chaud & Gaufrage 3D
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-13">
                  Marquage à chaud or, argent ou teintes métallisées sur fers gravés, gaufrage en relief tactile et vernis sélectif pour magnifier vos supports.
                </p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Card className="p-5 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_6px_24px_-6px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-slate-300 hover:shadow-[0_14px_30px_-8px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#2DB8D3]/10 border border-[#2DB8D3]/20 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-[#2DB8D3]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Packaging & Boîtes Rigides Sur-Mesure
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-13">
                  Boîtes cloche, étuis cosmétiques, coffrets aimantés et calages personnalisés avec un choix étendu de cartons graphiques et papiers de création.
                </p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Card className="p-5 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_6px_24px_-6px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-slate-300 hover:shadow-[0_14px_30px_-8px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#F3C215]/20 border border-[#F3C215]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#C49500]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Impression Offset & Numérique Haute Définition
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-13">
                  Catalogues, chemises institutionnelles, carterie de luxe et affichage avec calibrage colorimétrique rigoureux et validation par Bon à Tirer (BAT).
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
