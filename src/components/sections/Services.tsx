"use client";

import React, { useState } from "react";
import Image from "next/image";
import { servicesData } from "@/config/services";
import { SectionHeading } from "@/components/shared/SectionHeading";
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
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

// CMYK accent map per domain index
const DOMAIN_ACCENTS = [
  { badge: "bg-[#D41A78]/10 text-[#D41A78] border-[#D41A78]/25", dot: "bg-[#D41A78]" },
  { badge: "bg-[#F3C215]/20 text-[#A87900] border-[#F3C215]/35", dot: "bg-[#F3C215]" },
  { badge: "bg-[#2DB8D3]/10 text-[#0E859E] border-[#2DB8D3]/25", dot: "bg-[#2DB8D3]" },
  { badge: "bg-[#D41A78]/10 text-[#D41A78] border-[#D41A78]/25", dot: "bg-[#D41A78]" },
  { badge: "bg-[#2DB8D3]/10 text-[#0E859E] border-[#2DB8D3]/25", dot: "bg-[#2DB8D3]" },
  { badge: "bg-[#F3C215]/20 text-[#A87900] border-[#F3C215]/35", dot: "bg-[#F3C215]" },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const selectedService = servicesData.find((s) => s.id === activeTab);

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
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

        {/* shadcn Tabs Navigation Filter */}
        <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-1.5 rounded-full bg-slate-100/90 border border-slate-200/90 flex flex-wrap sm:inline-flex items-center gap-1.5 shadow-sm">
              <TabsTrigger
                value="all"
                className="rounded-full px-4 py-2 text-xs font-bold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-1.5"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Tous les Domaines (06)</span>
              </TabsTrigger>
              {servicesData.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="rounded-full px-3.5 py-2 text-xs font-bold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {s.number}. {s.title.split("&")[0].trim()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* =========================================================================
            VIEW 1: TOUS LES DOMAINES (Instant High-Performance Overview Grid)
           ========================================================================= */}
        {activeTab === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesData.map((service, index) => {
              const accent = DOMAIN_ACCENTS[index % DOMAIN_ACCENTS.length];
              return (
                <Card
                  key={service.id}
                  className="group relative rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-md backdrop-saturate-150 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Image Showcase */}
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-85" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm">
                        <span className={cn("w-2 h-2 rounded-full", accent.dot)} />
                        <span className="text-[11px] font-bold text-slate-900 tracking-wide">
                          {service.number} • {service.title.split("&")[0].trim()}
                        </span>
                      </div>

                      {/* Bottom Highlight Badge */}
                      {service.accentText && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="bg-slate-900/85 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white drop-shadow-sm rounded-full px-2.5 py-0.5"
                          >
                            {service.accentText}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Kicker Category & Domain Title */}
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 font-bold block mb-1">
                      {service.kicker}
                    </span>

                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight mb-2.5 group-hover:text-[#D41A78] transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Deliverables / Spécialités */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        Spécialités de l&apos;Atelier
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {service.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium"
                          >
                            <Check className="w-3.5 h-3.5 text-[#2DB8D3] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row with shadcn Buttons */}
                  <CardFooter className="p-0 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveModalService(service)}
                      className="rounded-xl font-bold text-xs bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900 h-9"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-slate-700" />
                      <span>Fiche &amp; Délais</span>
                    </Button>

                    <a
                      href={buildItemWhatsAppUrl(service.title, service.kicker)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-[#2DB8D3] font-bold text-xs shadow-sm transition-all h-9"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#2DB8D3]" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="#contact"
                      className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#D41A78] text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
                      aria-label={`Devis pour ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          /* =========================================================================
              VIEW 2: FOCUSED DOMAIN DEEP-DIVE (Interactive Immersive Spotlight)
             ========================================================================= */
          selectedService && (
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Frame */}
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-slate-100">
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
                </div>

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
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
                  </div>

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
            </div>
          )
        )}
      </div>

      {/* shadcn Dialog: Fiche Technique & Devis Spec Modal */}
      <Dialog
        open={Boolean(activeModalService)}
        onOpenChange={(open) => !open && setActiveModalService(null)}
      >
        {activeModalService && (
          <DialogContent className="max-w-2xl bg-white/98 backdrop-blur-2xl border-slate-200 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D41A78]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#D41A78]">
                  Fiche Technique Atelier • {activeModalService.number}
                </span>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                {activeModalService.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeModalService.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              {/* Deliverables List */}
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-900 font-bold block mb-3">
                  Applications &amp; Formats Fabriqués
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <Check className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-900 font-bold block mb-3">
                  Spécifications Techniques &amp; Délais
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1 font-bold">
                      <Layers className="w-3.5 h-3.5 text-[#2DB8D3]" />
                      <span>Supports &amp; Grammages</span>
                    </div>
                    <span className="text-xs text-slate-900 font-semibold block">
                      {activeModalService.specs.paperWeights}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#D41A78]" />
                      <span>Finitions &amp; Ennoblissement</span>
                    </div>
                    <span className="text-xs text-slate-900 font-semibold block">
                      {activeModalService.specs.finishes}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1 font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#F3C215]" />
                      <span>Délais de Fabrication</span>
                    </div>
                    <span className="text-xs text-slate-900 font-semibold block">
                      {activeModalService.specs.turnaround}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1 font-bold">
                      <Check className="w-3.5 h-3.5 text-[#2DB8D3]" />
                      <span>Quantité Minimale</span>
                    </div>
                    <span className="text-xs text-slate-900 font-semibold block">
                      {activeModalService.specs.minimums || "Sur-mesure dès 50 ex"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="#contact"
                  onClick={() => setActiveModalService(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#D41A78] text-white font-bold text-xs transition-colors shadow-md"
                >
                  <span>Demander un Devis pour ce Domaine</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={buildItemWhatsAppUrl(activeModalService.title, activeModalService.kicker)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 hover:text-[#2DB8D3] font-bold text-xs shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#2DB8D3]" />
                  <span>WhatsApp (+216 21 808 818)</span>
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
