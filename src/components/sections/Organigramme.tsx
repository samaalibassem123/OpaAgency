"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Palette,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Truck,
  ArrowRight,
  Printer,
  Shirt,
  Flag,
  Scissors,
  Camera,
  Share2,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WorkflowTimeline } from "./WorkflowTimeline";

// 5 Manufacturing Workshops from Official Document (Figure 6)
const PRODUCTION_WORKSHOPS = [
  {
    id: "packaging",
    number: "01",
    name: "Packaging & Prototypage",
    kicker: "Cartonnage & Boîtes",
    icon: Layers,
    color: "#D41A78",
    equipment: "Table de découpe à plat Vulcan (48 × 66 cm)",
    materials: "Carton gris Hermet 100% recyclé, Kraft naturel, Carton ondulé",
    description:
      "Conception de dielines, réalisation de prototypes unitaires pour validation et fabrication de boîtes rigides rembordées, étuis pliants et coffrets cosmétiques/alimentaires.",
    capabilities: [
      "Prototypes unitaires & pré-séries",
      "Carton gris Hermet haute densité",
      "Boîtes cloches, aimantées & tiroirs",
      "Calages thermoformés & sur-mesure",
    ],
  },
  {
    id: "petite-impression",
    number: "02",
    name: "Petite Impression & Édition",
    kicker: "Papeterie de Prestige",
    icon: Printer,
    color: "#2DB8D3",
    equipment: "Presses numériques HD & façonnage d'art",
    materials: "Papiers de création 130g à 700g (vergé, couché, Sirio Black)",
    description:
      "Cartes de visite haut de gamme contrecollées, flyers, brochures commerciales, dépliants d'entreprise, catalogues et chemises à rabats avec une précision colorimétrique irréprochable.",
    capabilities: [
      "Cartes contrecollées jusqu'à 700g",
      "Dorure à chaud or, argent & rose gold",
      "Pelliculage Soft-Touch velours",
      "Rainage anti-craquelure & reliure PUR",
    ],
  },
  {
    id: "grande-impression",
    number: "03",
    name: "Grande Impression & Façades",
    kicker: "Enseignes & Habillage",
    icon: Scissors,
    color: "#C49500",
    equipment: "Traceur numérique grand format & Découpeuse vinyle pilotée par ordinateur",
    materials: "Panneaux composites Alucobond, Vinyle adhésif polymère, Bâche PVC",
    description:
      "Habillage intégral de façades et showrooms commerciaux, découpe de vinyle assistée par ordinateur pour vitrophanie, lettrage adhésif et enseignes extérieures durables.",
    capabilities: [
      "Habillage façades en Alucobond",
      "Découpe vinyle vectorielle sur-mesure",
      "Vitrophanie de magasins & bureaux",
      "Bâches publicitaires résistantes aux UV",
    ],
  },
  {
    id: "textile-goodies",
    number: "04",
    name: "Textile DTF & Goodies",
    kicker: "Marquage & Objets",
    icon: Shirt,
    color: "#D41A78",
    equipment: "Machine DTF (Direct To Film), Presse à chaud industrielle, Presse mugs & casquettes",
    materials: "Textiles respirants, coton peigné, mugs céramique, casquettes, tote bags",
    description:
      "Personnalisation textile haute durabilité sans besoin d'échenillage grâce à la technologie DTF : t-shirts corporate, polos de travail, casquettes publicitaires et mugs personnalisés.",
    capabilities: [
      "Impression DTF extensible & lavable à 60°C",
      "Pressage à chaud haute pression",
      "Casquettes & textiles techniques",
      "Mugs publicitaires & cadeaux d'entreprise",
    ],
  },
  {
    id: "evenementiel",
    number: "05",
    name: "Signalétique & Événementiel",
    kicker: "Salons & Campagnes",
    icon: Flag,
    color: "#2DB8D3",
    equipment: "Sublimation textile & systèmes d'exposition nomades",
    materials: "Maille drapeau respirante 115g, structures aluminium légères",
    description:
      "Conception et impression de kits événementiels complets : drapeaux publicitaires (flags teardrop & feather), roll-ups déroulants, X-banners et stands pour foires et remises de diplômes.",
    capabilities: [
      "Drapeaux flags jusqu'à 3.50 m",
      "Roll-up & X-banners nomades",
      "Packs cérémonies & remises de diplômes",
      "Stands d'exposition pour salons",
    ],
  },
];

export function Organigramme() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(PRODUCTION_WORKSHOPS[0]);

  return (
    <section id="organigramme" className="relative py-24 sm:py-32 bg-white border-t border-slate-200/80 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <ScrollReveal direction="up" amount={0.15}>
          <SectionHeading
            kicker="Organisation & Gouvernance Atelier"
            title="Structure de l'Agence &"
            highlight="Organigramme de Production."
            description="Chez OPA (Our Print Agency), la réussite de chaque réalisation repose sur une collaboration fluide entre la direction, le studio graphique, le pôle marketing et nos 5 ateliers techniques intégrés."
            className="mb-14 lg:mb-20"
          />
        </ScrollReveal>

        {/* =========================================================================
            TOP LEVEL: ORGANIGRAMME HIERARCHY TREE
           ========================================================================= */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* 1. Direction Générale (Header Node) */}
            <div className="md:col-span-12">
              <ScrollReveal direction="up" delay={0.04} amount={0.15}>
                <Card className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_1px_white] relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                        <Briefcase className="w-6 h-6 text-[#2DB8D3]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border-slate-300">
                            Gouvernance
                          </Badge>
                          <span className="text-xs text-slate-500 font-semibold">Siège &amp; Ateliers</span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                          Direction Générale &amp; Stratégie
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                          <strong>M. Marwen Ben Younes</strong> (Directeur Général) &amp; <strong>Mme Mariem Ben Romdhane</strong> (Direction Administrative &amp; Financière)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Méthode Hebdomadaire « Stand Up »</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* 2. Pôle Commercial & Marketing (Left Branch) */}
            <div className="md:col-span-6">
              <ScrollReveal direction="left" delay={0.08} amount={0.15} className="h-full">
                <Card className="h-full p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.03),inset_0_1px_1px_white] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2DB8D3]/10 border border-[#2DB8D3]/20 flex items-center justify-center text-[#2DB8D3]">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider text-[#2DB8D3] bg-[#2DB8D3]/10 border border-[#2DB8D3]/20">
                        Pôle Commercial
                      </Badge>
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                      Service Commercial &amp; Marketing Digital
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Accueil et accompagnement sur-mesure de nos clients, chiffrage express, conseil sur les grammages et stratégie digitale.
                    </p>

                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                        <span><strong>Conseil Papetier :</strong> Présentation de nuanciers et formats à notre bureau commercial.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Share2 className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                        <span><strong>Marketing &amp; Sponsoring :</strong> Campagnes de visibilité sur Facebook et Instagram (@imprimerie.opa).</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Camera className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                        <span><strong>Studio Photo Intégré :</strong> Shooting packshots produits sous éclairages studio pour vos catalogues.</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* 3. Pôle Créatif & Infographie (Right Branch) */}
            <div className="md:col-span-6">
              <ScrollReveal direction="right" delay={0.08} amount={0.15} className="h-full">
                <Card className="h-full p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.03),inset_0_1px_1px_white] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D41A78]/10 border border-[#D41A78]/20 flex items-center justify-center text-[#D41A78]">
                        <Palette className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider text-[#D41A78] bg-[#D41A78]/10 border border-[#D41A78]/20">
                        Pôle Créatif
                      </Badge>
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                      Studio Graphique &amp; Ingénierie Packaging
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Mené par <strong>M. Aziz Derbeli</strong> et nos designers packaging de l&apos;ESSTED, le studio conçoit les identités de marque et tracés techniques.
                    </p>

                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#D41A78] shrink-0 mt-0.5" />
                        <span><strong>Identité Visuelle :</strong> Logotypes, chartes graphiques, harmonies colorimétriques et typographies.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Layers className="w-4 h-4 text-[#D41A78] shrink-0 mt-0.5" />
                        <span><strong>Dielines &amp; Tracés Techniques :</strong> Lignes de découpe, de rainage et de pliage au dixième de millimètre.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-[#D41A78] shrink-0 mt-0.5" />
                        <span><strong>Épreuvage &amp; BAT :</strong> Validation systématique du Bon À Tirer avant tout engagement machine.</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* 4. Coordinateur de Production (Central Bridge Node) */}
            <div className="md:col-span-12">
              <ScrollReveal direction="scale" delay={0.1} amount={0.15}>
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2DB8D3]/15 via-[#D41A78]/15 to-[#F3C215]/20 border border-slate-300/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-[#F3C215]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">Coordinateur de Production &amp; Chef d&apos;Atelier</span>
                      <span className="text-xs text-slate-600">Pilote le flux de production entre le studio créatif et les 5 ateliers de fabrication spécialisés.</span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
                    Planification agile fin de semaine
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FIVE MANUFACTURING WORKSHOPS (INTERACTIVE EXPLORER)
           ========================================================================= */}
        <div className="mt-8 mb-16">
          <ScrollReveal direction="up" amount={0.15}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D41A78] block mb-1">
                  Ateliers Techniques Dédiés
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Les 5 Pôles de Fabrication Intégrés
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                Chaque atelier dispose de ses propres machines numériques et artisans spécialisés, éliminant tout retard de sous-traitance.
              </p>
            </div>
          </ScrollReveal>

          {/* Workshop Selector Pills */}
          <ScrollReveal direction="up" delay={0.06} amount={0.15}>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
              {PRODUCTION_WORKSHOPS.map((workshop) => {
                const Icon = workshop.icon;
                const isSelected = selectedWorkshop.id === workshop.id;
                return (
                  <button
                    key={workshop.id}
                    onClick={() => setSelectedWorkshop(workshop)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border",
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isSelected ? "text-[#2DB8D3]" : "text-slate-500")} />
                    <span>{workshop.name}</span>
                    <span className={cn("text-[10px] px-1.5 py-0.2 rounded-md font-mono", isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>
                      {workshop.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Active Workshop Details Card */}
          <ScrollReveal direction="scale" amount={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWorkshop.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_1px_white]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 border-slate-300">
                          Pôle #{selectedWorkshop.number}
                        </Badge>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#D41A78]">
                          {selectedWorkshop.kicker}
                        </span>
                      </div>

                      <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {selectedWorkshop.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {selectedWorkshop.description}
                      </p>

                      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedWorkshop.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                        Arsenal Technique &amp; Matières
                      </span>

                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Équipement Principal :</span>
                        <span className="text-xs text-slate-700 block mt-0.5 font-medium">{selectedWorkshop.equipment}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60">
                        <span className="text-xs font-bold text-slate-900 block">Matières Premières Traitées :</span>
                        <span className="text-xs text-slate-700 block mt-0.5">{selectedWorkshop.materials}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <span>Contrôle qualité systématique</span>
                        <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-800 border-emerald-200">
                          Normes OPA
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>

        {/* =========================================================================
            BOTTOM TIMELINE: 8-STEP WORKFLOW METHODOLOGY (SCROLL-DRIVEN)
           ========================================================================= */}
        <WorkflowTimeline />
      </div>
    </section>
  );
}
