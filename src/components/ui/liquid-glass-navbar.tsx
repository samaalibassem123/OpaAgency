"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidNavItem {
  id: string;
  label: string;
  href: string;
}

export interface LiquidGlassNavBarProps {
  items?: LiquidNavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onItemSelect?: (item: LiquidNavItem) => void;
  className?: string;
}

export const DEFAULT_NAV_ITEMS: LiquidNavItem[] = [
  { id: "accueil", label: "Accueil", href: "#hero" },
  { id: "about", label: "Atelier", href: "#about" },
  { id: "services", label: "Expertises", href: "#services" },
  { id: "portfolio", label: "Réalisations", href: "#portfolio" },
  { id: "pourquoi-opa", label: "Exigences", href: "#pourquoi-opa" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function LiquidGlassNavBar({
  items = DEFAULT_NAV_ITEMS,
  activeId: controlledActiveId,
  defaultActiveId = items[0]?.id || "accueil",
  onItemSelect,
  className,
}: LiquidGlassNavBarProps) {
  const [internalActiveId, setInternalActiveId] = React.useState<string>(defaultActiveId);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [rippleKey, setRippleKey] = React.useState<number>(0);
  const [clickedId, setClickedId] = React.useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: LiquidNavItem) => {
    setInternalActiveId(item.id);
    setClickedId(item.id);
    setRippleKey((prev) => prev + 1);

    if (onItemSelect) {
      onItemSelect(item);
    }

    if (item.href.startsWith("#")) {
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
    <nav
      className={cn(
        "relative inline-flex items-center h-full p-1 rounded-full",
        "bg-slate-100/70 backdrop-blur-xl",
        "border border-slate-200/70",
        "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
        className
      )}
      onMouseLeave={() => setHoveredId(null)}
      role="menubar"
      aria-label="Menu Principal Liquide Glass"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            onMouseEnter={() => setHoveredId(item.id)}
            role="menuitem"
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative z-10 flex items-center justify-center h-full px-3.5 sm:px-4 lg:px-5 rounded-full",
              "text-xs sm:text-[13px] lg:text-sm font-medium transition-colors duration-200 select-none tracking-tight",
              isActive
                ? "text-slate-950 font-bold"
                : isHovered
                  ? "text-slate-900 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
            )}
          >
            {/* Sliding Liquid Glass Capsule (Inspired by Guglielmo Giannattasio & Apple Liquid Glass) */}
            {isActive && (
              <motion.div
                layoutId="active-liquid-glass-pill"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                  mass: 0.65,
                }}
                className={cn(
                  "absolute inset-0 rounded-full z-[-1]",
                  "bg-gradient-to-b from-white/98 via-white/92 to-white/85",
                  "backdrop-blur-md",
                  // Deep multi-tier shadow + physical inner bevel
                  "shadow-[0_4px_20px_-2px_rgba(15,23,42,0.12),0_2px_6px_-1px_rgba(15,23,42,0.06),inset_0_1.5px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_2px_0_rgba(15,23,42,0.04)]"
                )}
              >
                {/* Chromatic Aberration & Iridescent Glass Rim (Cyan -> Magenta -> Gold dispersion) */}
                <div
                  className="absolute -inset-[1px] rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(45,184,211,0.65) 0%, rgba(255,255,255,0.95) 30%, rgba(212,26,120,0.5) 70%, rgba(243,194,21,0.45) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1.2px",
                  }}
                />

                {/* Top Specular Razor Highlight */}
                <div className="absolute inset-x-4 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                {/* Soft Liquid Droplet Meniscus Highlight */}
                <div className="absolute inset-0 rounded-full bg-radial from-white/50 via-transparent to-transparent pointer-events-none" />

                {/* Water Droplet Wave Pulse on Click */}
                <AnimatePresence>
                  {clickedId === item.id && (
                    <motion.span
                      key={`ripple-${rippleKey}`}
                      initial={{ scale: 0.75, opacity: 0.95 }}
                      animate={{ scale: 1.45, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full pointer-events-none border border-[#2DB8D3]/60 shadow-[0_0_16px_rgba(212,26,120,0.4)]"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Hover Indicator for Inactive Items */}
            {!isActive && isHovered && (
              <motion.div
                layoutId="hover-pill"
                transition={{ duration: 0.15 }}
                className="absolute inset-0 rounded-full bg-white/70 shadow-sm z-[-1]"
              />
            )}

            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default LiquidGlassNavBar;
