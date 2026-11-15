"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Menu, X, ArrowUpRight, Phone, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { OpaLogo } from "@/components/ui/opa-logo";
import {
  LiquidNavbar,
  DEFAULT_NAV_ITEMS,
  LiquidNavItem,
} from "@/components/ui/liquid-glass-navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("accueil");

  const { scrollY } = useScroll();

  // 1. Framer Motion Scroll Listener (Ultra-responsive touch & wheel tracking)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // At top of page, always show header
    if (latest <= 60) {
      setIsVisible(true);
      return;
    }

    // Significant scroll threshold to prevent micro-jitter
    if (Math.abs(diff) > 8) {
      if (diff > 0 && latest > 120) {
        // Scrolling DOWN -> Disappear smoothly
        setIsVisible(false);
      } else if (diff < 0) {
        // Scrolling UP -> Pop in with spring
        setIsVisible(true);
      }
    }
  });

  // 2. GSAP ScrollTrigger (Lenis RAF synchronized direction & velocity tracking)
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (mobileMenuOpen) return;
        const currentScroll = self.scroll();

        if (currentScroll <= 60) {
          setIsVisible(true);
        } else if (self.direction === 1 && currentScroll > 120) {
          setIsVisible(false);
        } else if (self.direction === -1) {
          setIsVisible(true);
        }
      },
    });

    return () => trigger.kill();
  }, [mobileMenuOpen]);

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
        { id: "organigramme", el: document.getElementById("organigramme") },
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
    if (item.id) setActiveSection(item.id);
    setMobileMenuOpen(false);

    if (item.href?.startsWith("#")) {
      e.preventDefault();
      if (item.href === "#" || item.href === "#top" || item.href === "#hero") {
        if (typeof window !== "undefined" && window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 0.7 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        const targetElement = document.querySelector(item.href);
        if (targetElement) {
          if (typeof window !== "undefined" && window.__lenis) {
            window.__lenis.scrollTo(targetElement as HTMLElement, {
              offset: -75,
              duration: 0.8,
            });
          } else {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }
    }
  };

  return (
    <>
      <motion.header
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          visible: {
            y: 0,
            x: "-50%",
            opacity: 1,
            scale: isScrolled ? 0.99 : 1,
            transition: {
              type: "spring",
              stiffness: 420,
              damping: 30,
              mass: 0.8,
            },
          },
          hidden: {
            y: "-150%",
            x: "-50%",
            opacity: 0,
            scale: 0.96,
            transition: {
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        className="fixed top-3 sm:top-5 left-1/2 z-50 w-[95%] max-w-6xl pointer-events-auto"
      >
        <div
          className={cn(
            "relative flex items-center justify-between px-3 sm:px-4 h-14 sm:h-16 rounded-full",
            "bg-white/65 backdrop-blur-sm backdrop-saturate-150",
            "border border-white/80 shadow-[0_6px_32px_-6px_rgba(15,23,42,0.06)]",
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

          {/* Full-Height Nimbus Waterline Liquid Glass Navbar (Desktop) */}
          <div className="hidden lg:flex items-center justify-center h-full py-1">
            <LiquidNavbar
              items={DEFAULT_NAV_ITEMS}
              activeId={activeSection}
              sound={true}
              tone="light"
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
            className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB8D3]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay with Pure Liquid Glass Aesthetics */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/60 backdrop-blur-sm backdrop-saturate-150 lg:hidden flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Mobile Liquid Glass"
          >
            <div className="relative z-10 flex flex-col space-y-4">
              {/* Frosted Glass Sub-Header Capsule */}
              <div className="flex items-center justify-between px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)]">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                  Navigation Atelier
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white/70 px-2.5 py-0.5 rounded-full border border-slate-200/70">
                  Haute Fidélité
                </span>
              </div>

              {/* Staggered Navigation Items (No Icons, Pure Glass) */}
              <motion.ul
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                  },
                  exit: {
                    opacity: 0,
                    transition: { staggerChildren: 0.02, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col space-y-2.5"
              >
                {DEFAULT_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.24, ease: "easeOut" },
                        },
                        exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleMobileNavClick(e, item)}
                        className={cn(
                          "relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200",
                          isActive
                            ? "bg-white/85 backdrop-blur-sm border border-white shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),inset_0_1.5px_1px_white]"
                            : "bg-white/40 hover:bg-white/65 backdrop-blur-sm border border-white/60 hover:border-white shadow-[0_1px_4px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                        )}
                      >
                        <span
                          className={cn(
                            "text-[15px] font-sans tracking-tight transition-colors",
                            isActive ? "text-slate-950 font-bold" : "text-slate-700 font-semibold"
                          )}
                        >
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isActive ? "text-slate-950" : "text-slate-400"
                          )}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            {/* Elevated Glass Action Card & Verified Contacts */}
            <div className="relative z-10 mt-6 rounded-3xl p-4 sm:p-5 bg-white/60 backdrop-blur-sm border border-white/80 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.95)] space-y-4">
              <div className="flex flex-col space-y-1.5 text-xs text-slate-600">
                <span className="text-slate-900 font-bold text-sm tracking-tight flex items-center justify-between">
                  <span>Société OPA</span>
                  <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                    Atelier &amp; Bureau
                  </span>
                </span>
                <span className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <a
                    href="tel:+21621808818"
                    className="hover:text-slate-950 font-medium underline underline-offset-2"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </span>
                <span className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Ariana Médina &amp; 15 Rue de la Commission, Tunis
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3.5 rounded-2xl text-center text-xs font-semibold text-slate-800 bg-white/75 hover:bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_white] transition-all hover:scale-[1.01]"
                >
                  Demander un Devis
                </a>
                <a
                  href={defaultWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3.5 rounded-2xl text-center text-xs font-semibold text-white bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215] flex items-center justify-center gap-1.5 shadow-[0_6px_20px_-2px_rgba(212,26,120,0.4)] hover:shadow-[0_8px_24px_-2px_rgba(212,26,120,0.5)] transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
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
