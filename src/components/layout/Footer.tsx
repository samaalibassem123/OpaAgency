import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navigationItems } from "@/config/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowUp, Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { OpaLogo } from "@/components/ui/opa-logo";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-20 pb-12 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-200">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <OpaLogo variant="light" width={160} height={48} />
            </Link>

            <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-sm">
              <strong>Imprimerie OPA (Our Print Agency)</strong> — Atelier d’impression haut de gamme et manufacture de packaging de luxe à Tunis et Ariana. Boîtes rigides rembordées, dorure à chaud, gaufrage 3D, carterie d&apos;art et offset de précision en Tunisie.
            </p>

            {/* Social & Contact Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook: Imprimerie OPA: Our Print Agency"
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-slate-700 hover:text-[#2DB8D3] hover:border-[#2DB8D3] hover:bg-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @imprimerie.opa"
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-slate-700 hover:text-[#D41A78] hover:border-[#D41A78] hover:bg-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Business Direct"
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-slate-700 hover:text-[#2DB8D3] hover:border-[#2DB8D3] hover:bg-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                aria-label="Appeler OPA Imprimerie"
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email OPA Imprimerie"
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center text-slate-700 hover:text-[#D41A78] hover:border-[#D41A78] hover:bg-white transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Anchors */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D41A78]">
              Navigation
            </span>
            <ul className="flex flex-col space-y-2.5">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Coordinates & Ateliers */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2DB8D3]">
              Ateliers & Coordonnées
            </span>
            <div className="flex flex-col space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D41A78] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block">
                    {siteConfig.locations.production.label}
                  </span>
                  <span>{siteConfig.locations.production.address}</span>
                  <span className="text-slate-500 block">{siteConfig.locations.production.city}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block">
                    {siteConfig.locations.commercial.label}
                  </span>
                  <span>{siteConfig.locations.commercial.address}</span>
                  <span className="text-slate-500 block">{siteConfig.locations.commercial.city}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Facebook className="w-4 h-4 text-[#2DB8D3] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block">Page Facebook</span>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D41A78] transition-colors font-medium underline underline-offset-2"
                  >
                    {siteConfig.social.facebookName}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F3C215] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block">Direction & Devis Direct</span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="hover:text-slate-900 font-semibold transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Société OPA — Our Print Agency. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-500 font-medium">
              Impression CMYK & Packaging de Luxe • Tunisie
            </span>
            <a
              href="#hero"
              aria-label="Retourner en haut de page"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
