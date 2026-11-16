"use client";

import React, { useState } from "react";
import Image from "next/image";
import { servicesData } from "@/config/services";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buildItemWhatsAppUrl } from "@/lib/whatsapp";
import { ServiceItem } from "@/types";
import {
  ArrowUpRight,
  Check,
  Clock,
  Layers,
  Sparkles,
  MessageCircle,
  SlidersHorizontal,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// CMYK accent bar per domain index
const DOMAIN_ACCENTS = [
  { bar: "bg-[#D41A78]", text: "text-[#D41A78]", dot: "bg-[#D41A78]" },
  { bar: "bg-[#F3C215]", text: "text-[#A87900]", dot: "bg-[#F3C215]" },
  { bar: "bg-[#2DB8D3]", text: "text-[#0E859E]", dot: "bg-[#2DB8D3]" },
  { bar: "bg-[#D41A78]", text: "text-[#D41A78]", dot: "bg-[#D41A78]" },
  { bar: "bg-[#2DB8D3]", text: "text-[#0E859E]", dot: "bg-[#2DB8D3]" },
  { bar: "bg-[#F3C215]", text: "text-[#A87900]", dot: "bg-[#F3C215]" },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const selectedService = servicesData.find((s) => s.id === activeTab);

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-white border-t border-slate-200/80 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" amount={0.15}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <SectionHeading
              kicker="Savoir-Faire & Ateliers • 01 — 06"
              title="Six Domaines de Fabrication"
              highlight="Haute Fidélité."
              description="De la boîte rigide montée à la main aux tirages offset de grand volume, nous maîtrisons l'intégralité de la chaîne graphique dans nos ateliers à Tunis et Ariana."
            />

            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-700 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#2DB8D3]" />
              <span className="w-2 h-2 rounded-full bg-[#D41A78]" />
              <span className="w-2 h-2 rounded-full bg-[#F3C215]" />
              <span className="ml-1 text-slate-900 font-bold">Manufacture Intégrée</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Editorial Domain Navigation Filter */}
        <ScrollReveal direction="up" delay={0.08} amount={0.15}>
          <div className="relative mb-10 -mx-6 sm:mx-0 px-6 sm:px-0">
            <div className="overflow-x-auto no-scrollbar scroll-smooth">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="h-auto p-1.5 rounded-full bg-slate-100/90 border border-slate-200/90 inline-flex items-center gap-1.5 shadow-sm min-w-max">
                  <TabsTrigger
                    value="all"
                    className="rounded-full px-4 py-2 text-xs font-bold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Tous les Domaines (06)</span>
                  </TabsTrigger>
                  {servicesData.map((s) => (
                    <TabsTrigger
                      key={s.id}
                      value={s.id}
                      className="rounded-full px-3.5 py-2 text-xs font-bold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm shrink-0 whitespace-nowrap"
                    >
                      <span className="opacity-60 mr-1">{s.number}</span>
                      <span>{s.title.split("&")[0].trim()}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden flex items-center justify-between mt-3 px-1 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3 h-3 text-[#D41A78]" />
                <span>{activeTab === "all" ? "Affichage : Grille Complète (06)" : `Filtre actif : ${selectedService?.title.split("&")[0].trim()}`}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Faire défiler &rarr;
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            ANIMATED DOMAIN VIEWS
           ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeTab === "all" ? (
            <motion.div
              key="grid-all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            >
              {servicesData.map((service, index) => {
                const accent = DOMAIN_ACCENTS[index % DOMAIN_ACCENTS.length];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.12 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: (index % 3) * 0.08,
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                    className="will-change-transform"
                  >
                    {/* ── PREMIUM EDITORIAL CARD ── */}
                    <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_48px_-8px_rgba(15,23,42,0.14)] transition-all duration-400 flex flex-col h-full cursor-pointer"
                      onClick={() => setActiveModalService(service)}>

                      {/* Full-bleed Photography */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        {/* Deep gradient scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                        {/* Index Number — Large Editorial Stamp */}
                        <div className="absolute top-4 left-4">
                          <span className="font-display text-5xl font-black text-white/90 leading-none tracking-tighter drop-shadow-lg">
                            {service.number}
                          </span>
                        </div>

                        {/* Accent Bar bottom-left */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className={cn("h-full w-full", accent.bar)} />
                        </div>
                      </div>

                      {/* Text Content — Clean & Bold */}
                      <div className="flex flex-col flex-1 p-5 sm:p-6">
                        {/* Category kicker */}
                        <span className={cn(
                          "text-[10px] uppercase tracking-[0.18em] font-bold block mb-2",
                          accent.text
                        )}>
                          {service.kicker}
                        </span>

                        {/* Title — Large, tight */}
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3 group-hover:text-slate-700 transition-colors duration-200">
                          {service.title}
                        </h3>

                        {/* One-sentence description */}
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                          {service.description}
                        </p>

                        {/* Bottom Action Row */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveModalService(service); }}
                            className="text-xs font-bold text-slate-900 hover:text-[#D41A78] transition-colors duration-200 flex items-center gap-1 group/btn"
                          >
                            Voir la fiche
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                          </button>

                          <a
                            href={buildItemWhatsAppUrl(service.title, service.kicker)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-[#2DB8D3] text-white text-[11px] font-bold transition-colors duration-200 shadow-sm"
                          >
                            <MessageCircle className="w-3 h-3" />
                            Devis rapide
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* =========================================================================
                VIEW 2: FOCUSED DOMAIN DEEP-DIVE (Interactive Immersive Spotlight)
               ========================================================================= */
            selectedService && (
              <motion.div
                key={`spotlight-${selectedService.id}`}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_12px_40px_rgb(0,0,0,0.06)] will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Visual Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-slate-100"
                  >
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 text-slate-900 font-bold px-3 py-1 text-xs border-slate-200 shadow-sm">
                        Discipline {selectedService.number}
                      </Badge>
                    </div>

                    {selectedService.accentText && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white font-semibold text-xs border border-white/20 backdrop-blur-md block text-center">
                          {selectedService.accentText}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Technical Narrative & Specs */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#D41A78] font-bold block mb-1">
                        {selectedService.kicker}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug mb-3">
                        {selectedService.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {selectedService.description}
                      </p>
                    </div>

                    {/* Technical Matrix */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100"
                    >
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-bold">
                          <Layers className="w-3.5 h-3.5 text-[#2DB8D3]" />
                          <span>Supports &amp; Grammages</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900 block">
                          {selectedService.specs.paperWeights}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-[#D41A78]" />
                          <span>Finitions d&apos;Art</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900 block">
                          {selectedService.specs.finishes}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-bold">
                          <Clock className="w-3.5 h-3.5 text-[#F3C215]" />
                          <span>Délais Atelier</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900 block">
                          {selectedService.specs.turnaround}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-bold">
                          <Check className="w-3.5 h-3.5 text-[#2DB8D3]" />
                          <span>Quantité Minimale</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900 block">
                          {selectedService.specs.minimums || "Sur-mesure dès 50 ex"}
                        </span>
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <a
                        href="#contact"
                        className="px-6 py-3 rounded-full bg-slate-900 hover:bg-[#D41A78] text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2"
                      >
                        <span>Demander un Devis pour ce Domaine</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={buildItemWhatsAppUrl(selectedService.title, selectedService.kicker)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 hover:text-[#2DB8D3] font-bold text-xs shadow-sm transition-all inline-flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-[#2DB8D3]" />
                        <span>WhatsApp Atelier</span>
                      </a>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setActiveTab("all")}
                        className="text-xs font-bold text-slate-600 hover:text-slate-950"
                      >
                        &larr; Voir tous les domaines
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* shadcn Dialog: Fiche Technique & Devis Spec Modal — Premium Redesign */}
      <Dialog
        open={Boolean(activeModalService)}
        onOpenChange={(open) => !open && setActiveModalService(null)}
      >
        {activeModalService && (
          <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] sm:w-full bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-0 max-h-[92vh] overflow-y-auto">

            {/* ── HERO BAND: Image + Identity ── */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 rounded-t-2xl">
              <Image
                src={activeModalService.image}
                alt={activeModalService.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
              />
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10" />

              {/* Number + kicker overlay */}
              <div className="absolute bottom-5 left-6 right-16">
                <div className="flex items-end gap-4">
                  <span className="font-display text-6xl font-black text-white/20 leading-none tracking-tighter select-none">
                    {activeModalService.number}
                  </span>
                  <div className="pb-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 block mb-0.5">
                      {activeModalService.kicker}
                    </span>
                    <DialogTitle className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight">
                      {activeModalService.title}
                    </DialogTitle>
                  </div>
                </div>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="px-6 sm:px-8 py-6 space-y-6">

              {/* Hidden for a11y — title shown visually in hero */}
              <DialogHeader className="sr-only">
                <DialogDescription>{activeModalService.description}</DialogDescription>
              </DialogHeader>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-[#D41A78] pl-4">
                {activeModalService.description}
              </p>

              {/* ── SPECS MATRIX ── */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400 mb-3">
                  Spécifications Techniques
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Layers className="w-3 h-3 text-[#2DB8D3] shrink-0" />
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Supports</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900 leading-snug block">
                      {activeModalService.specs.paperWeights}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Sparkles className="w-3 h-3 text-[#D41A78] shrink-0" />
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Finitions</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900 leading-snug block">
                      {activeModalService.specs.finishes}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Clock className="w-3 h-3 text-[#F3C215] shrink-0" />
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Délais</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900 leading-snug block">
                      {activeModalService.specs.turnaround}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Check className="w-3 h-3 text-[#2DB8D3] shrink-0" />
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Minimum</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900 leading-snug block">
                      {activeModalService.specs.minimums || "Sur-mesure dès 50 ex"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── DELIVERABLES ── */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-400 mb-3">
                  Applications &amp; Formats Fabriqués
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {activeModalService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#2DB8D3] shrink-0" />
                      <span className="text-xs font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── FOOTER CTAs (inside scroll, sticky via position) ── */}
              <div className="sticky bottom-0 -mx-6 sm:-mx-8 -mb-6 sm:-mb-6 px-6 sm:px-8 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href="#contact"
                  onClick={() => setActiveModalService(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-[#D41A78] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Demander un Devis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={buildItemWhatsAppUrl(activeModalService.title, activeModalService.kicker)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-[#2DB8D3] font-bold text-xs shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#2DB8D3]" />
                  <span>WhatsApp Atelier</span>
                </a>
              </div>

            </div>

          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

export default Services;
