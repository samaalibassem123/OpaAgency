"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
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
  Check,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  { id: "Packaging & Boîtes Rigides", label: "Packaging & Boîtes", tag: "Luxe" },
  { id: "Édition Corporate & Catalogues", label: "Édition & Catalogues", tag: "Prestige" },
  { id: "Papeterie de Prestige & Cartes 700g", label: "Papeterie (Cartes 700g)", tag: "Artisan" },
  { id: "Dorure à Chaud & Finitions d'Art", label: "Dorure & Relief", tag: "Finitions" },
  { id: "Signalétique & Panneaux Dibond", label: "Signalétique & Dibond", tag: "Grand Format" },
  { id: "Textile & Goodies de Marque", label: "Objets & Goodies", tag: "Cadeaux" },
];

const QUANTITY_OPTIONS = [
  "100 - 300 ex (Prototype)",
  "500 - 1 000 ex",
  "2 000 - 5 000 ex",
  "10 000+ ex (Industriel)",
];

export function Contact() {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    serviceType: "Packaging & Boîtes Rigides",
    quantity: "500 - 1 000 ex",
    paperFinishPreference: "Dorure à chaud & Pelliculage mat",
    projectDetails: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceId }));
  };

  const handleSelectQuantity = (qty: string) => {
    setFormData((prev) => ({ ...prev, quantity: qty }));
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
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-36 bg-slate-50/70 border-t border-slate-200/80 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <ScrollReveal direction="up" amount={0.15}>
          <SectionHeading
            kicker="Atelier & Devis Direct"
            title="Initiez Votre Projet"
            highlight="avec l'Atelier."
            description="Que vous ayez un cahier des charges précis ou besoin d'un conseil d'ingénierie papetière, notre équipe technique vous répond sous 24h ouvrées."
            className="mb-12 lg:mb-16"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN: Direct Atelier Coordinates & Fast Pathways
             ========================================================================= */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" amount={0.15} className="flex flex-col space-y-6">
              {/* Priority Direct WhatsApp Card */}
              <Card className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_1px_white] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  Canal Prioritaire
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D41A78] bg-[#D41A78]/10 px-2.5 py-0.5 rounded-full border border-[#D41A78]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D41A78] animate-pulse" />
                  Réponse &lt; 2h
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                WhatsApp Business Direct
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Échangez directement avec notre responsable d&apos;atelier pour vos questions techniques, l&apos;envoi de maquettes ou un chiffrage express.
              </p>

              <motion.a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <span className="truncate">Ouvrir WhatsApp ({siteConfig.phoneDisplay})</span>
              </motion.a>
            </Card>

            {/* Atelier Coordinates & Physical Locations Card */}
            <Card className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03),inset_0_1px_1px_white] flex flex-col space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                Coordonnées &amp; Adresses Officielles
              </span>

              {/* Direct Phone */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Téléphone Atelier
                  </span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-sm sm:text-base text-slate-900 hover:text-[#D41A78] font-bold transition-colors block"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Fichiers Prépresse &amp; Devis
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-xs sm:text-sm text-slate-900 hover:text-[#D41A78] font-semibold transition-colors block truncate"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Production Facility */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    {siteConfig.locations.production.label}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-800 font-medium block">
                    {siteConfig.locations.production.address}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {siteConfig.locations.production.city}
                  </span>
                </div>
              </div>

              {/* Commercial Office */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    {siteConfig.locations.commercial.label}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-800 font-medium block">
                    {siteConfig.locations.commercial.address}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {siteConfig.locations.commercial.city}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Horaires d&apos;Atelier
                  </span>
                  <span className="text-xs text-slate-700 block font-medium">
                    {siteConfig.hours}
                  </span>
                </div>
              </div>
            </Card>
            </ScrollReveal>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Editorial Interactive Quotation Configurator
             ========================================================================= */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" amount={0.15}>
            <Card className="p-6 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06),inset_0_1px_1px_white] relative">
              {/* Form Header */}
              <div className="border-b border-slate-100 pb-5 mb-6">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Configurateur d&apos;Estimation
                  </span>
                  <Badge variant="outline" className="text-[10px] text-slate-600 bg-slate-50 border-slate-200">
                    Sans engagement
                  </Badge>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Précisez Vos Exigences de Tirage
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sélectionnez vos critères en un clic ou remplissez les champs ci-dessous.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                {/* Step 1: Discipline Selector Chips */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-2.5">
                    1. Domaine de Fabrication Souhaité *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = formData.serviceType === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleSelectService(srv.id)}
                          className={cn(
                            "p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between border min-h-[64px]",
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                          )}
                        >
                          <span className="text-[11px] sm:text-xs font-bold leading-tight block">
                            {srv.label}
                          </span>
                          <span
                            className={cn(
                              "text-[9px] uppercase tracking-wider font-semibold mt-1 inline-block",
                              isSelected ? "text-slate-300" : "text-slate-400"
                            )}
                          >
                            {srv.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Quantity Selector Chips */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-2">
                    2. Volume ou Tirage Estimé *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {QUANTITY_OPTIONS.map((qty) => {
                      const isSelected = formData.quantity === qty;
                      return (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => handleSelectQuantity(qty)}
                          className={cn(
                            "py-2.5 px-3 rounded-xl text-center text-xs font-bold transition-all duration-200 border",
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                          )}
                        >
                          {qty}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Contact Coordinates */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-2">
                    3. Vos Coordonnées Directes *
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          placeholder="Nom & Prénom *"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11"
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Société / Marque (optionnel)"
                          value={formData.company}
                          onChange={handleChange}
                          className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="Téléphone / WhatsApp *"
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="Adresse Email *"
                          value={formData.email}
                          onChange={handleChange}
                          className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Finishes Preference & Project Details */}
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="paperFinishPreference"
                      className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5"
                    >
                      Finitions d&apos;Art ou Papiers Spécifiques (optionnel)
                    </label>
                    <Input
                      type="text"
                      id="paperFinishPreference"
                      name="paperFinishPreference"
                      placeholder="Ex : Dorure or chaud, gaufrage relief, papier de création 400g..."
                      value={formData.paperFinishPreference}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 h-11"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectDetails"
                      className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5"
                    >
                      Détails, Dimensions ou Délais Impératifs
                    </label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      rows={3}
                      placeholder="Dimensions en mm, nombre de pages, contraintes de livraison..."
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-50/70 border-slate-200 focus:bg-white focus:border-slate-900 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 resize-none min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Submission Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Button
                    type="submit"
                    className="flex-1 rounded-2xl bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg h-12 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Transmettre via WhatsApp Direct</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailSubmit}
                    className="rounded-2xl bg-white hover:bg-slate-50 border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold h-12"
                  >
                    <Mail className="w-4 h-4 mr-2 text-slate-600" />
                    <span>Envoyer par Email</span>
                  </Button>
                </div>

                {/* Confirmation message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>
                        Votre demande a été préparée avec succès. Merci de finaliser l&apos;envoi dans l&apos;application ouverte (WhatsApp ou Email).
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Confidentialité garantie • Devis atelier officiel sous 24h ouvrées.</span>
                </div>
              </form>
            </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
