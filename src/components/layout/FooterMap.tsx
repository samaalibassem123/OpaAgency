"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Factory,
  Compass,
  Clock,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationData {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  logistics: string;
  hours: string;
  phone: string;
  phoneDisplay: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  wazeUrl: string;
  coordinates: string;
}

const LOCATIONS: Record<string, LocationData> = {
  production: {
    id: "production",
    name: "Atelier de Production & Studio Graphique",
    subtitle: "Pôle technique, packaging rigide, découpe, dorure à chaud & ennoblissement",
    badge: "Site Principal de Fabrication",
    badgeColor: "border-[#2DB8D3]/30 bg-[#2DB8D3]/10 text-[#2DB8D3]",
    addressLine1: "Local L14, Résidence Marwa",
    addressLine2: "Cité El Mostakbel, Rue Jbal Echaanbi",
    city: "Ariana Médina, 2080 Tunis",
    country: "Tunisie",
    logistics: "Accès poids lourds & camionnettes, déchargement de palettes, parking visiteurs.",
    hours: "Lun - Ven : 08h30 – 18h00 | Sam : 08h30 – 13h00",
    phone: "21621808818",
    phoneDisplay: "+216 21 808 818",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=10.1780%2C36.8520%2C10.2130%2C36.8720&layer=mapnik&marker=36.8624%2C10.1955",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Local+L14+Residence+Marwa+Rue+Jbal+Echaanbi+Ariana+Medina+Tunis",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Local+L14+Residence+Marwa+Rue+Jbal+Echaanbi+Ariana+Medina+Tunis",
    wazeUrl:
      "https://waze.com/ul?q=Local+L14+Residence+Marwa+Ariana+Tunis",
    coordinates: "36.8624° N, 10.1955° E",
  },
  commercial: {
    id: "commercial",
    name: "Bureau Commercial & Relation Client",
    subtitle: "Conseil papetier, présentation de nuanciers, boîtes échantillons & passation de commandes",
    badge: "Accueil Client & Showroom",
    badgeColor: "border-[#D41A78]/30 bg-[#D41A78]/10 text-[#D41A78]",
    addressLine1: "15 Rue de la Commission",
    addressLine2: "À 100m de l'Avenue Habib Bourguiba & Bab Bhar",
    city: "1002 Tunis",
    country: "Tunisie",
    logistics: "Au cœur du quartier d'affaires de Tunis. Idéal pour rendez-vous et choix de papiers.",
    hours: "Lun - Ven : 08h30 – 17h30 | Sur rendez-vous",
    phone: "21621808818",
    phoneDisplay: "+216 21 808 818",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=10.1650%2C36.7900%2C10.1850%2C36.8050&layer=mapnik&marker=36.7978%2C10.1753",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=15+Rue+de+la+Commission+1002+Tunis+Tunisie",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=15+Rue+de+la+Commission+1002+Tunis+Tunisie",
    wazeUrl:
      "https://waze.com/ul?q=15+Rue+de+la+Commission+Tunis",
    coordinates: "36.7978° N, 10.1753° E",
  },
};

export function FooterMap() {
  const [copiedLocation, setCopiedLocation] = useState<string | null>(null);

  const handleCopyAddress = (loc: LocationData) => {
    const fullText = `${loc.name} — OPA Imprimerie\n${loc.addressLine1}, ${loc.addressLine2}\n${loc.city}, ${loc.country}\nTél : ${loc.phoneDisplay}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedLocation(loc.id);
      setTimeout(() => setCopiedLocation(null), 2500);
    });
  };

  return (
    <div className="w-full pt-12 pb-14 border-b border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 border border-slate-300/80 text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#D41A78]" />
            <span>Localisation Précise &amp; Accès</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Où Trouver l&apos;Atelier OPA Imprimerie ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Retrouvez nos deux implantations dans le Grand Tunis. Visualisez la carte exacte et lancez votre itinéraire GPS en un clic.
          </p>
        </div>
      </div>

      <Tabs defaultValue="production" className="w-full">
        {/* Tab switcher */}
        <div className="flex justify-start sm:justify-start mb-6 overflow-x-auto pb-1 max-w-full">
          <TabsList className="bg-slate-200/80 p-1 rounded-2xl border border-slate-300/70 h-auto gap-1">
            <TabsTrigger
              value="production"
              className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
            >
              <Factory className="w-4 h-4 text-[#2DB8D3]" />
              <span>Atelier de Production (Ariana)</span>
              <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 ml-1 bg-[#2DB8D3]/10 text-[#2DB8D3] border border-[#2DB8D3]/20">
                Principal
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="commercial"
              className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
            >
              <Building2 className="w-4 h-4 text-[#D41A78]" />
              <span>Bureau Commercial (Tunis Centre)</span>
              <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 ml-1 bg-[#D41A78]/10 text-[#D41A78] border border-[#D41A78]/20">
                Showroom
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Location 1: Production Workshop (Ariana) */}
        <TabsContent value="production" className="mt-0">
          <LocationCard
            location={LOCATIONS.production}
            isCopied={copiedLocation === "production"}
            onCopy={() => handleCopyAddress(LOCATIONS.production)}
          />
        </TabsContent>

        {/* Location 2: Commercial Office (Tunis Centre) */}
        <TabsContent value="commercial" className="mt-0">
          <LocationCard
            location={LOCATIONS.commercial}
            isCopied={copiedLocation === "commercial"}
            onCopy={() => handleCopyAddress(LOCATIONS.commercial)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface LocationCardProps {
  location: LocationData;
  isCopied: boolean;
  onCopy: () => void;
}

function LocationCard({ location, isCopied, onCopy }: LocationCardProps) {
  return (
    <Card className="p-0 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_1px_white] overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white/95 to-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200/80">
            <div className="space-y-5">
              {/* Badge + GPS Coordinates */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border", location.badgeColor)}>
                  {location.badge}
                </Badge>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {location.coordinates}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {location.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {location.subtitle}
                </p>
              </div>

              {/* Physical Address Block */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-[#D41A78] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-900 block">
                      {location.addressLine1}
                    </span>
                    <span className="text-slate-700 block">
                      {location.addressLine2}
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {location.city}, {location.country}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Copier l&apos;adresse pour GPS ou VTC
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCopy}
                    className="h-7 px-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 gap-1.5"
                    aria-label="Copier l'adresse de l'atelier"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copiée !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Logistical & Access Note */}
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <Compass className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                <span>
                  <strong>Accès &amp; Logistique :</strong> {location.logistics}
                </span>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Horaires :</strong> {location.hours}
                </span>
              </div>
            </div>

            {/* Action Buttons: Itinéraire & Navigation */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row gap-2.5">
              <a
                href={location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Itinéraire Google Maps vers ${location.name}`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full sm:flex-1 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                )}
              >
                <Navigation className="w-3.5 h-3.5 text-[#2DB8D3]" />
                <span>Itinéraire GPS</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>

              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvrir ${location.name} sur Google Maps`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:flex-1 h-10 px-4 rounded-xl bg-white hover:bg-slate-100 border-slate-200 text-slate-800 font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                )}
              >
                <MapPin className="w-3.5 h-3.5 text-[#D41A78]" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </a>

              <a
                href={location.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvrir dans Waze vers ${location.name}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto h-10 px-3 rounded-xl bg-white hover:bg-slate-100 border-slate-200 text-slate-700 font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                )}
              >
                <span>Waze</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed Panel */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-slate-100 overflow-hidden">
            <iframe
              src={location.mapEmbedUrl}
              title={`Carte exacte OPA Imprimerie - ${location.name}`}
              className="w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top Badge Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-xs font-bold text-slate-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Repère Exact OPA</span>
              </div>
            </div>

            {/* Bottom-right Full Screen / External Map Link */}
            <div className="absolute bottom-4 right-4">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-xs font-semibold text-slate-800 hover:text-[#D41A78] hover:bg-white transition-all"
                aria-label="Agrandir la carte dans Google Maps"
              >
                <span>Agrandir</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
