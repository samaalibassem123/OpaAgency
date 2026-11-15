"use client";

import React from "react";
import Image from "next/image";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  FileText,
  Compass,
  Layers,
  Scissors,
  ShieldCheck,
  Printer,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepConfig {
  number: string;
  tabTitle: string;
  kicker: string;
  title: string;
  desc: string;
  deliverable: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgLight: string;
  borderAccent: string;
  textAccent: string;
}

const STEPS: StepConfig[] = [
  {
    number: "01",
    tabTitle: "01 • Écoute",
    kicker: "Prise de Contact & Cadrage",
    title: "Votre Idée, Notre Écoute",
    desc: "Partagez votre vision. On cadre vos formats, grammages et délais avec réactivité et bienveillance.",
    deliverable: "Cadrage express & écoute sur-mesure",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    icon: MessageCircle,
    accentColor: "#2DB8D3",
    bgLight: "bg-[#2DB8D3]/10",
    borderAccent: "border-[#2DB8D3]/30",
    textAccent: "text-[#0E859E]",
  },
  {
    number: "02",
    tabTitle: "02 • Chiffrage",
    kicker: "Conseil & Devis Express",
    title: "Sélection Papetière & Devis 24h",
    desc: "Le papier idéal au juste prix. Sélection d'échantillons Fedrigoni ou Sirio et chiffrage clair en 24h chrono.",
    deliverable: "Devis transparent & planning d'atelier",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800",
    icon: FileText,
    accentColor: "#2DB8D3",
    bgLight: "bg-[#2DB8D3]/10",
    borderAccent: "border-[#2DB8D3]/30",
    textAccent: "text-[#0E859E]",
  },
  {
    number: "03",
    tabTitle: "03 • Style",
    kicker: "Direction Artistique Studio",
    title: "Moodboard & Harmonies Visuelles",
    desc: "Couleurs éclatantes, textures et harmonies. Notre studio packaging forge l'univers créatif de votre marque.",
    deliverable: "Planche créative & palette de style",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800",
    icon: Compass,
    accentColor: "#D41A78",
    bgLight: "bg-[#D41A78]/10",
    borderAccent: "border-[#D41A78]/30",
    textAccent: "text-[#D41A78]",
  },
  {
    number: "04",
    tabTitle: "04 • Dieline",
    kicker: "Ingénierie & Tracés Vectoriels",
    title: "Dieline Technique au 1/10 mm",
    desc: "Lignes de découpe, rainages et pattes de collage au dixième de millimètre pour un pliage net sans craquelure.",
    deliverable: "Gabarit vectoriel prêt pour machine",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    icon: Layers,
    accentColor: "#D41A78",
    bgLight: "bg-[#D41A78]/10",
    borderAccent: "border-[#D41A78]/30",
    textAccent: "text-[#D41A78]",
  },
  {
    number: "05",
    tabTitle: "05 • Prototype",
    kicker: "Prototypage Table Vulcan",
    title: "Prototype Réel Découpé à l'Échelle 1:1",
    desc: "Touchez avant d'imprimer ! Maquette réelle à plat sur notre table Vulcan (48 × 66 cm) pour tester en main propre.",
    deliverable: "Prototype volumique unitaire manipulable",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    icon: Scissors,
    accentColor: "#F3C215",
    bgLight: "bg-[#F3C215]/20",
    borderAccent: "border-[#F3C215]/40",
    textAccent: "text-[#855B00]",
  },
  {
    number: "06",
    tabTitle: "06 • Accord",
    kicker: "Sécurité & Validation",
    title: "Le Bon À Tirer (BAT) Certifié",
    desc: "Zéro mauvaise surprise : épreuve couleur conforme et accord mutuel signé avant de lancer les presses.",
    deliverable: "BAT certifié et validé ensemble",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800",
    icon: ShieldCheck,
    accentColor: "#F3C215",
    bgLight: "bg-[#F3C215]/20",
    borderAccent: "border-[#F3C215]/40",
    textAccent: "text-[#855B00]",
  },
  {
    number: "07",
    tabTitle: "07 • Atelier",
    kicker: "Manufacture & Ennoblissement",
    title: "Impression & Finitions d'Art",
    desc: "Dorure à chaud or éclatante, gaufrage 3D relief, pelliculage Soft-Touch velours et cartonnage haute densité.",
    deliverable: "Série complète imprimée & ennoblie",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    icon: Printer,
    accentColor: "#2DB8D3",
    bgLight: "bg-[#2DB8D3]/10",
    borderAccent: "border-[#2DB8D3]/30",
    textAccent: "text-[#0E859E]",
  },
  {
    number: "08",
    tabTitle: "08 • Livraison",
    kicker: "Contrôle & Expédition Rapide",
    title: "Contrôle Qualité & Livraison Soignée",
    desc: "Inspection unitaire rigoureuse, colisage protecteur renforcé et livraison expresse à votre porte ou pose d'enseigne.",
    deliverable: "Colisage renforcé & pose clé en main",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
    icon: Truck,
    accentColor: "#10B981",
    bgLight: "bg-emerald-100",
    borderAccent: "border-emerald-300",
    textAccent: "text-emerald-800",
  },
];

export function WorkflowTimeline() {
  const timelineData: TimelineEntry[] = STEPS.map((step) => {
    const Icon = step.icon;

    return {
      title: step.tabTitle,
      content: (
        <div className="space-y-4 max-w-2xl">
          {/* Compact Sympathique Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_white] hover:shadow-[0_16px_36px_-6px_rgba(45,184,211,0.12),inset_0_1px_1px_white] hover:border-slate-300 transition-all duration-300 group text-left">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                  step.bgLight,
                  step.borderAccent,
                  step.textAccent
                )}
              >
                {step.kicker}
              </Badge>

              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110",
                  step.bgLight,
                  step.borderAccent,
                  step.textAccent
                )}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            <h4 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-slate-950 transition-colors">
              {step.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-1.5">
              {step.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center mt-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong className="text-slate-900">Livrable :</strong>{" "}
                  {step.deliverable}
                </span>
              </div>
            </div>
          </div>

          {/* Real Photography Asset */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm relative h-40 sm:h-52 w-full group">
            <Image
              src={step.image}
              alt={step.title}
              width={700}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="pt-10 border-t border-slate-200">
      <Timeline
        data={timelineData}
        kicker="Méthodologie Certifiée OPA"
        title="Notre Processus en 8 Étapes."
        description="Simple, transparent et rythmé : suivez la naissance de votre projet du premier échange jusqu'à la livraison avec notre timeline interactive."
        className="px-0 md:px-0"
      />
    </div>
  );
}

export default WorkflowTimeline;
