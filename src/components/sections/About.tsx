"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AboutVisual } from "@/components/sections/AboutVisual";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Sparkles, Layers, ShieldCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="about" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" amount={0.15}>
              <SectionHeading
                kicker="À Propos d'OPA • Our Print Agency"
                title="Une Manufacture Dédiée à"
                highlight="l'Émotion du Papier."
                description="Basée à Ariana et Tunis, la Société OPA allie l'artisanat d'art des maîtres imprimeurs à la rigueur des technologies modernes d'impression et de packaging."
              />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={0.1} amount={0.15}>
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
            </ScrollReveal>
          </div>
        </div>

        {/* Editorial Two-Column Visual & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Unboxed Editorial Composition with Animated SVG Paths */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <ScrollReveal direction="scale" delay={0.08} amount={0.15} className="w-full flex justify-center">
              <AboutVisual />
            </ScrollReveal>
          </div>

          {/* Right Column: 3 Clear Pillars (shadcn Cards) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <ScrollReveal direction="up" delay={0.08} amount={0.15}>
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
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.16} amount={0.15}>
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
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.24} amount={0.15}>
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
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
