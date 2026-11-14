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
  tone?: "light" | "dark";
  sound?: boolean;
}

export const DEFAULT_NAV_ITEMS: LiquidNavItem[] = [
  { id: "accueil", label: "Accueil", href: "#hero" },
  { id: "about", label: "Atelier", href: "#about" },
  { id: "services", label: "Expertises", href: "#services" },
  { id: "portfolio", label: "Réalisations", href: "#portfolio" },
  { id: "pourquoi-opa", label: "Exigences", href: "#pourquoi-opa" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/**
 * Synthesizes a subtle, pleasant water droplet click pop using Web Audio API
 */
function playDropletAudio() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.045);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  } catch {
    // AudioContext blocked or unsupported
  }
}

export function LiquidGlassNavBar({
  items = DEFAULT_NAV_ITEMS,
  activeId: controlledActiveId,
  defaultActiveId = items[0]?.id || "accueil",
  onItemSelect,
  className,
  tone = "light",
  sound = true,
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

    if (sound) {
      playDropletAudio();
    }

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

  const isDark = tone === "dark";

  return (
    <nav
      className={cn(
        "relative inline-flex items-center h-full p-1 rounded-full",
        isDark
          ? "bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]"
          : "bg-slate-100/40 backdrop-blur-md border border-slate-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]",
        className
      )}
      onMouseLeave={() => setHoveredId(null)}
      role="menubar"
      aria-label="Menu Principal Liquid Glass"
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
              "relative z-10 flex items-center justify-center h-full px-4 sm:px-5 lg:px-6 rounded-full",
              "text-xs sm:text-[13px] lg:text-sm font-medium transition-colors duration-200 select-none tracking-tight",
              isActive
                ? isDark
                  ? "text-white font-bold"
                  : "text-slate-950 font-bold"
                : isHovered
                  ? isDark
                    ? "text-slate-100 font-semibold"
                    : "text-slate-900 font-semibold"
                  : isDark
                    ? "text-slate-400 hover:text-slate-100"
                    : "text-slate-600 hover:text-slate-900"
            )}
          >
            {/* Sliding Pure Liquid Glass Capsule (Neutral, Elegant, Non-Neon) */}
            {isActive && (
              <motion.div
                layoutId="active-liquid-glass-pill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                  mass: 0.65,
                }}
                className={cn(
                  "absolute inset-0 rounded-full z-[-1]",
                  isDark
                    ? "bg-gradient-to-b from-slate-800/95 via-slate-850/90 to-slate-900/85 border border-white/15"
                    : "bg-gradient-to-b from-white/98 via-white/92 to-white/86 border border-white/90",
                  "backdrop-blur-xl",
                  // Tactile physical depth & double-bevel without saturated neon glows
                  isDark
                    ? "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5),inset_0_1.5px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_2px_0_rgba(0,0,0,0.4)]"
                    : "shadow-[0_4px_16px_-2px_rgba(15,23,42,0.08),0_1px_4px_rgba(15,23,42,0.04),inset_0_1.5px_1px_0_rgba(255,255,255,1),inset_0_-1px_1.5px_0_rgba(15,23,42,0.03)]"
                )}
              >
                {/* Crisp Top Specular Highlight */}
                <div className="absolute inset-x-4 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                {/* Soft Radial Meniscus Ambient Highlight */}
                <div className="absolute inset-0 rounded-full bg-radial from-white/35 via-transparent to-transparent pointer-events-none" />

                {/* Neutral Water Droplet Wave Pulse on Click */}
                <AnimatePresence>
                  {clickedId === item.id && (
                    <motion.span
                      key={`ripple-${rippleKey}`}
                      initial={{ scale: 0.75, opacity: 0.8 }}
                      animate={{ scale: 1.45, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full pointer-events-none border border-white/90 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Hover Meniscus Indicator for Inactive Items */}
            {!isActive && isHovered && (
              <motion.div
                layoutId="liquid-nav-hover"
                transition={{ duration: 0.16, ease: "easeOut" }}
                className={cn(
                  "absolute inset-0 rounded-full z-[-1]",
                  isDark
                    ? "bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
                    : "bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                )}
              />
            )}

            <span className="whitespace-nowrap">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export const LiquidNavbar = LiquidGlassNavBar;
export default LiquidGlassNavBar;
