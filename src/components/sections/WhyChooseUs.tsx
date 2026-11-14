"use client";

import React, { useRef } from "react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  Target,
  ShieldCheck,
  Compass,
  Truck,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function WhyChooseUs() {
  const whatsappUrl = buildWhatsAppUrl();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);

  const standards = [
    {
      number: "01",
      icon: Target,
      tag: "Fidélité des Couleurs",
      title: "Calibrage Colorimétrique & Épreuvage Fogra",
      color: "#2DB8D3",
      bgLight: "bg-[#2DB8D3]/10",
      description:
        "Respect absolu de vos chartes graphiques. Maîtrise des encres denses, séparation quadri haute définition et correspondances précises du nuancier Pantone pour un résultat fidèle du premier au dernier exemplaire.",
    },
    {
      number: "02",
      icon: ShieldCheck,
      tag: "Manufacture Intégrée",
      title: "Zéro Sous-Traitance sur les Finitions",
      color: "#D41A78",
      bgLight: "bg-[#D41A78]/10",
      description:
        "De l'insolation des plaques au façonnage manuel, découpe, rembordage de boîtes et marquage à chaud, l'intégralité du cycle est maîtrisée dans nos ateliers à Tunis et Ariana.",
    },
    {
      number: "03",
      icon: Compass,
      tag: "Conseil & Sourcing",
      title: "Sélection Papetière & Prototypage de Boîtes",
      color: "#C49500",
      bgLight: "bg-[#F3C215]/20",
      description:
        "Nous vous orientons vers les meilleurs papiers de création (Fedrigoni, Curious Skin, Invercote) et concevons les formes de découpe sur-mesure pour vos packagings avant le tirage final.",
    },
    {
      number: "04",
      icon: Truck,
      tag: "Logistique & Réactivité",
      title: "Conditionnement Soigné & Livraison Rapide",
      color: "#2DB8D3",
      bgLight: "bg-[#2DB8D3]/10",
      description:
        "Interlocuteur direct avec notre direction d'atelier. Conditionnement protecteur pour préserver les finitions sensibles et expéditions rapides sur le Grand Tunis et toute la Tunisie.",
    },
  ];

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(leftColRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 92%",
          once: true,
        },
      });

      if (rightGridRef.current) {
        gsap.from(rightGridRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightGridRef.current,
            start: "top 92%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="pourquoi-opa" className="relative py-24 sm:py-32 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left: Section narrative & manifesto */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 self-start shadow-sm">
              <div className="flex items-center -space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#2DB8D3]" />
                <span className="w-2 h-2 rounded-full bg-[#D41A78]" />
                <span className="w-2 h-2 rounded-full bg-[#F3C215]" />
              </div>
              <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                Exigences & Rigueur
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Pourquoi les Marques Exigeantes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215]">
                Choisissent OPA.
              </span>
            </h2>

            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Nous considérons l&apos;imprimerie comme un art appliqué où le toucher d&apos;un papier teinté dans la masse et le relief d&apos;un gaufrage franc définissent la valeur de votre marque.
            </p>

            {/* Atelier credentials box (shadcn Card with Glassmorphism) */}
            <Card className="p-6 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-slate-800 font-bold block">
                Engagements de l&apos;Atelier OPA
              </span>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Interlocuteur direct :</strong> échangez directement avec les responsables d&apos;atelier pour vos projets.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#D41A78] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Validation BAT physique :</strong> épreuve papier réelle et contrôle chromatique avant impression.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#F3C215] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Ateliers à Tunis & Ariana :</strong> pôle de fabrication et bureau commercial à votre écoute.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D41A78] hover:text-slate-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#2DB8D3]" />
                  <span>Poser une question à l&apos;Atelier sur WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          </div>

          {/* Right: 4 Direct Standards (shadcn Cards with Glassmorphism) */}
          <div ref={rightGridRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <Card className="p-6 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 hover:border-slate-300 hover:bg-white/95 transition-all duration-300 flex flex-col justify-between h-full shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.1),inset_0_1px_2px_rgba(255,255,255,1)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl ${item.bgLight} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
