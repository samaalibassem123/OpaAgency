"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { portfolioCategories, portfolioItems } from "@/config/portfolio";
import { PortfolioItem } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildItemWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowUpRight, MessageCircle, X, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(headerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 92%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="portfolio" className="relative py-24 sm:py-32 lg:py-40 bg-slate-50/70 border-t border-slate-200/80 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading & Category Filters */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeading
            kicker="Galerie de Réalisations • Portfolio"
            title="Des Pièces d'Exception,"
            highlight="Façonnées à la Main."
            description="Explorez notre sélection de coffrets, finitions en dorure et supports corporate réalisés pour les marques les plus exigeantes."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {portfolioCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 shadow-sm",
                    isActive
                      ? "text-white"
                      : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-portfolio-filter"
                      className="absolute inset-0 rounded-full bg-slate-900 shadow-md"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fluid Layout Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedItem(item)}
              >
                <Card
                  className={cn(
                    "group relative rounded-2xl overflow-hidden cursor-pointer h-full",
                    "bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 hover:border-slate-300",
                    "shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/95 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12),inset_0_1px_2px_rgba(255,255,255,1)]",
                    "transition-all duration-300 flex flex-col justify-between"
                  )}
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover object-center filter contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-[10px] font-bold uppercase tracking-wider text-[#D41A78] shadow-sm">
                      {item.categoryLabel}
                    </div>
                  </div>

                  {/* Card Meta & Description */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-xs text-[#D41A78] block mb-1 font-bold">
                        {item.clientSector}
                      </span>
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#D41A78] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-normal mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                      <span className="text-xs font-bold text-[#2DB8D3]">
                        Découvrir la réalisation
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#D41A78] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur-2xl backdrop-saturate-180 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.2),inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Top Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Fermer la vue détaillée"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Scrollable Container */}
              <div className="overflow-y-auto p-6 sm:p-8 flex flex-col space-y-6">
                {/* Large Image Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Title & Category */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#D41A78] font-bold">
                      {selectedItem.categoryLabel}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {selectedItem.clientSector}
                    </span>
                  </div>
                  <h3
                    id="modal-title"
                    className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900"
                  >
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Materials & Finishes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700 text-xs mb-2">
                      <Layers className="w-4 h-4 text-[#2DB8D3]" />
                      <span className="font-bold uppercase tracking-wider">
                        Matières & Papiers
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedItem.materials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2DB8D3]" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700 text-xs mb-2">
                      <Sparkles className="w-4 h-4 text-[#D41A78]" />
                      <span className="font-bold uppercase tracking-wider">
                        Finitions d&apos;Art
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedItem.finishes.map((fin, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D41A78]" />
                          <span>{fin}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Exact Specs */}
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                  {selectedItem.specs}
                </div>

                {/* Call to Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <motion.a
                    href={buildItemWhatsAppUrl(selectedItem.title, selectedItem.categoryLabel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-bold text-xs tracking-tight shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Demander un devis similaire sur WhatsApp</span>
                  </motion.a>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
