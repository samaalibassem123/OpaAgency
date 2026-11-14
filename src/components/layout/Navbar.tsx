"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { OpaLogo } from "@/components/ui/opa-logo";
import {
  LiquidGlassNavBar,
  DEFAULT_NAV_ITEMS,
  LiquidNavItem,
} from "@/components/ui/liquid-glass-navbar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("accueil");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy calculation
      const scrollPos = window.scrollY + 160;
      if (window.scrollY < 200) {
        setActiveSection("accueil");
        return;
      }

      const sections = [
        { id: "contact", el: document.getElementById("contact") },
        { id: "pourquoi-opa", el: document.getElementById("pourquoi-opa") },
        { id: "portfolio", el: document.getElementById("portfolio") },
        { id: "services", el: document.getElementById("services") },
        { id: "about", el: document.getElementById("about") },
      ];

      for (const sec of sections) {
        if (sec.el && scrollPos >= sec.el.offsetTop) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const defaultWhatsAppLink = buildWhatsAppUrl();

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: LiquidNavItem) => {
    setActiveSection(item.id);
    setMobileMenuOpen(false);

    if (item.href.startsWith("#")) {
      e.preventDefault();
      if (item.href === "#" || item.href === "#top" || item.href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetElement = document.querySelector(item.href);
        if (targetElement) {
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300",
          isScrolled ? "scale-[0.99]" : "scale-100"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between px-3 sm:px-4 h-14 sm:h-16 rounded-full",
            "bg-white/90 backdrop-blur-xl backdrop-saturate-150",
            "border border-slate-200/90 shadow-[0_6px_32px_-6px_rgba(15,23,42,0.08)]",
            "before:absolute before:inset-0 before:rounded-full before:pointer-events-none",
            "before:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
          )}
        >
          {/* Official Agency Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-1.5 sm:pl-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB8D3] rounded-lg shrink-0"
          >
            <OpaLogo variant="light" width={135} height={40} priority />
          </Link>

          {/* Full-Height Liquid Glass Navigation Holder (Desktop & Tablet) */}
          <div className="hidden md:flex items-center justify-center h-full py-2">
            <LiquidGlassNavBar
              items={DEFAULT_NAV_ITEMS}
              activeId={activeSection}
              onItemSelect={(item) => setActiveSection(item.id)}
              className="h-full"
            />
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2 pr-1 shrink-0">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 border border-slate-200/90 hover:border-slate-300 bg-white/70 hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              Devis en Ligne
            </motion.a>
            <motion.a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter OPA via WhatsApp"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full",
                "bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] text-white font-semibold text-xs tracking-tight",
                "shadow-[0_4px_16px_-4px_rgba(212,26,120,0.4)] hover:shadow-[0_6px_20px_-2px_rgba(212,26,120,0.6)]",
                "transition-all duration-200"
              )}
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB8D3]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay with Liquid Glass Aesthetics */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Mobile Liquid Glass"
          >
            <div className="flex flex-col space-y-5">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                  Navigation
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D41A78]">
                  Atelier &amp; Devis
                </span>
              </div>
              <ul className="flex flex-col space-y-2">
                {DEFAULT_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => handleMobileNavClick(e, item)}
                        className={cn(
                          "flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border",
                          isActive
                            ? "bg-slate-50 border-slate-300/80 text-slate-950 font-bold shadow-sm"
                            : "bg-white/60 border-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-50/80"
                        )}
                      >
                        <span className="text-base font-display font-medium tracking-tight">
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isActive ? "text-[#D41A78]" : "text-slate-400"
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-slate-200">
              <div className="flex flex-col space-y-1 text-xs text-slate-600">
                <span className="text-slate-900 font-semibold">Société OPA • Our Print Agency</span>
                <span>{siteConfig.phoneDisplay}</span>
                <span>Ariana Médina &amp; Tunis Centre</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-center text-xs font-semibold text-slate-900 border border-slate-300 bg-slate-50 hover:bg-slate-100"
                >
                  Demander un Devis
                </a>
                <a
                  href={defaultWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-[#2DB8D3] to-[#D41A78] flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
