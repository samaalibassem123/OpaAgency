"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { OpaLogo } from "@/components/ui/opa-logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  return (
    <>
      <header
        className={cn(
          "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300",
          isScrolled ? "scale-[0.99]" : "scale-100"
        )}
      >
        <nav
          className={cn(
            "relative flex items-center justify-between px-5 md:px-7 py-3 rounded-full",
            "bg-white/85 backdrop-blur-md backdrop-saturate-150",
            "border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]",
            "before:absolute before:inset-0 before:rounded-full before:pointer-events-none",
            "before:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
          )}
          aria-label="Navigation Principale"
        >
          {/* Official Agency Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB8D3] rounded-lg"
          >
            <OpaLogo variant="light" width={135} height={40} priority />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-full text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/60 transition-all duration-200"
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
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
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
            className="md:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB8D3]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Mobile"
          >
            <div className="flex flex-col space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                  Navigation
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D41A78]">
                  Atelier & Devis
                </span>
              </div>
              <ul className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 text-lg font-display font-medium text-slate-800 hover:text-[#D41A78] border-b border-slate-100 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#2DB8D3]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-slate-200">
              <div className="flex flex-col space-y-1 text-xs text-slate-600">
                <span className="text-slate-900 font-semibold">Société OPA • Our Print Agency</span>
                <span>{siteConfig.phoneDisplay}</span>
                <span>Ariana Médina & Tunis Centre</span>
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
