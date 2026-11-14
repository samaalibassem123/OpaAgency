"use client";

import React, { useState, useRef } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { QuoteFormData } from "@/types";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  HelpCircle,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    serviceType: "Packaging & Boîtes Rigides",
    quantity: "500 - 1 000 exemplaires",
    paperFinishPreference: "Dorure à chaud & Pelliculage mat",
    projectDetails: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(headerRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(leftColRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(rightColRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(formData);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Demande de Devis — ${formData.serviceType} — ${formData.fullName}`
    );
    const body = encodeURIComponent(
      `Nom : ${formData.fullName}\nSociété : ${formData.company || "Particulier/Indépendant"}\nTéléphone : ${formData.phone}\nEmail : ${formData.email}\nPrestation : ${formData.serviceType}\nQuantité : ${formData.quantity}\nFinitions : ${formData.paperFinishPreference}\n\nDétails :\n${formData.projectDetails}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const directWhatsAppLink = buildWhatsAppUrl();

  return (
    <section ref={containerRef} id="contact" className="relative py-24 sm:py-32 lg:py-40 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={headerRef}>
          <SectionHeading
            kicker="Consultation & Estimation Directe"
            title="Initiez Votre Projet"
            highlight="avec l'Atelier."
            description="Que vous ayez un cahier des charges abouti ou besoin d'un conseil d'ingénierie papetière, notre équipe technique vous répond sous 24h ouvrées."
            className="mb-16 lg:mb-20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Coordinates & Fast Pathways */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-6">
            {/* Instant WhatsApp Priority Card (shadcn Card with Glassmorphism) */}
            <Card className="p-7 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-2 border-[#2DB8D3]/50 shadow-[0_16px_40px_-10px_rgba(45,184,211,0.15),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D41A78] animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-[#D41A78] font-bold">
                  Canal Prioritaire • Réponse Rapide
                </span>
              </div>

              <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                WhatsApp Business Direct
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Échangez immédiatement avec notre responsable d&apos;atelier pour poser vos questions techniques, envoyer vos maquettes ou obtenir un chiffrage express.
              </p>

              <motion.a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Ouvrir WhatsApp ({siteConfig.phoneDisplay})</span>
              </motion.a>
            </Card>

            {/* Architectural Coordinates Card (shadcn Card with Glassmorphism) */}
            <Card className="p-7 sm:p-8 rounded-2xl bg-white/75 backdrop-blur-md backdrop-saturate-150 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] flex flex-col space-y-5">
              <span className="text-xs uppercase tracking-wider text-slate-700 font-bold block">
                Ateliers & Coordonnées Officielles
              </span>

              {/* Phone */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-10 h-10 rounded-xl bg-[#2DB8D3]/10 border border-[#2DB8D3]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#2DB8D3]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Téléphone Direct & Urgences Tirage
                  </span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-base text-slate-900 hover:text-[#D41A78] font-bold transition-colors block mt-0.5"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#D41A78]/10 border border-[#D41A78]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#D41A78]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Envoi Fichiers Prépresse & Devis PDF
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-slate-900 hover:text-[#D41A78] font-semibold transition-colors block mt-0.5"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Atelier Production */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#2DB8D3]/10 border border-[#2DB8D3]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#2DB8D3]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    {siteConfig.locations.production.label}
                  </span>
                  <span className="text-sm text-slate-900 font-semibold block mt-0.5">
                    {siteConfig.locations.production.address}
                  </span>
                  <span className="text-xs text-slate-500">
                    {siteConfig.locations.production.city}
                  </span>
                </div>
              </div>

              {/* Commercial Office */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#F3C215]/20 border border-[#F3C215]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-[#C49500]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    {siteConfig.locations.commercial.label}
                  </span>
                  <span className="text-sm text-slate-900 font-semibold block mt-0.5">
                    {siteConfig.locations.commercial.address}
                  </span>
                  <span className="text-xs text-slate-500">
                    {siteConfig.locations.commercial.city}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Horaires d&apos;Ouverture des Ateliers
                  </span>
                  <span className="text-xs text-slate-700 block mt-0.5 font-medium">
                    {siteConfig.hours}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Quotation Form (shadcn Card with Glassmorphism) */}
          <div ref={rightColRef} className="lg:col-span-7">
            <Card className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-2xl backdrop-saturate-180 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,1)] relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D41A78] font-bold">
                    Simulateur de Devis
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    Configurez votre Demande
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <HelpCircle className="w-3.5 h-3.5 text-[#2DB8D3]" />
                  <span>Sans engagement</span>
                </div>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                {/* Row 1: Name and Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="M. ou Mme..."
                      value={formData.fullName}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 h-11"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Société / Marque (optionnel)
                    </label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Nom de votre entreprise"
                      value={formData.company}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 h-11"
                    />
                  </div>
                </div>

                {/* Row 2: Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Numéro de téléphone *
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+216 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 h-11"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Adresse email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="contact@societe.tn"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 h-11"
                    />
                  </div>
                </div>

                {/* Row 3: Service Type and Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Discipline requise
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#D41A78] focus:outline-none text-sm text-slate-900 transition-colors shadow-sm h-11"
                    >
                      <option value="Packaging & Boîtes Rigides">Packaging & Boîtes Rigides</option>
                      <option value="Édition Corporate & Catalogues">Édition Corporate & Catalogues</option>
                      <option value="Papeterie de Prestige & Cartes 700g">Papeterie de Prestige (Cartes 700g)</option>
                      <option value="Dorure à Chaud & Finitions d'Art">Dorure à Chaud & Finitions d&apos;Art</option>
                      <option value="Signalétique & Panneaux Dibond">Signalétique & Panneaux Dibond</option>
                      <option value="Textile & Goodies de Marque">Textile & Goodies de Marque</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                    >
                      Quantité envisagée
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#D41A78] focus:outline-none text-sm text-slate-900 transition-colors shadow-sm h-11"
                    >
                      <option value="100 - 300 exemplaires (Prototype / Tirage court)">100 - 300 exemplaires (Prototype)</option>
                      <option value="500 - 1 000 exemplaires">500 - 1 000 exemplaires</option>
                      <option value="2 000 - 5 000 exemplaires">2 000 - 5 000 exemplaires</option>
                      <option value="10 000+ exemplaires (Volume industriel)">10 000+ exemplaires (Volume industriel)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Paper / Finishes Preference */}
                <div>
                  <label
                    htmlFor="paperFinishPreference"
                    className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                  >
                    Finitions ou Papiers spécifiques (optionnel)
                  </label>
                  <Input
                    type="text"
                    id="paperFinishPreference"
                    name="paperFinishPreference"
                    placeholder="Ex: Dorure or chaud, gaufrage relief, pelliculage soft touch..."
                    value={formData.paperFinishPreference}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 h-11"
                  />
                </div>

                {/* Row 5: Notes & Details */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2"
                  >
                    Détails du projet ou dimensions
                  </label>
                  <Textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={3}
                    placeholder="Indiquez vos dimensions souhaitées, délais impératifs ou particularités techniques..."
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-50 border-slate-300 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 resize-none shadow-sm min-h-[90px]"
                  />
                </div>

                {/* Submission Pathways with shadcn Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-bold text-sm shadow-md h-12 hover:opacity-95 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Transmettre via WhatsApp</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailSubmit}
                    className="rounded-xl bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800 text-sm font-semibold h-12"
                  >
                    <Mail className="w-4 h-4 mr-2 text-[#D41A78]" />
                    <span>Envoyer par Email</span>
                  </Button>
                </div>

                {/* Notification message with AnimatePresence */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="p-3.5 rounded-lg bg-[#2DB8D3]/10 border border-[#2DB8D3]/30 text-xs text-slate-900 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2DB8D3]" />
                      <span>
                        Votre demande a été préparée. Merci de finaliser l&apos;envoi dans l&apos;application ouverte (WhatsApp ou Client Mail).
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <span>* Informations traitées confidentiellement par notre atelier d&apos;Ariana.</span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
