"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassRevealOpa, MARK_OPA_SVG } from "@/components/ui/liquid-glass-logo-reveal";
import { OpaLogo } from "@/components/ui/opa-logo";

interface InitialLoaderProps {
  /** Minimum time to show the loader in milliseconds (defaults to 2200ms) */
  minDuration?: number;
}

export function InitialLoader({ minDuration = 2200 }: InitialLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [animDone, setAnimDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);

    // Failsafe timeout so the loader always gracefully dismisses (snappier on mobile)
    const effectiveDuration = mobile ? Math.min(minDuration, 1400) : minDuration;
    const timer = setTimeout(() => {
      setAnimDone(true);
    }, effectiveDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  // When animation finishes and minimum duration passed, dissolve overlay
  const handleComplete = () => {
    setAnimDone(true);
  };

  useEffect(() => {
    if (animDone) {
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(dismissTimer);
    }
  }, [animDone]);

  // Lock scrolling while loader is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="initial-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none"
        >
          {/* Logo Presentation: High-Performance Vector Emblem on SSR & Mobile, WebGL on Desktop */}
          <div className="w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] relative flex items-center justify-center">
            {!mounted || isMobile ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-36 h-36 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
                dangerouslySetInnerHTML={{ __html: MARK_OPA_SVG }}
              />
            ) : (
              <GlassRevealOpa
                loop={false}
                onComplete={handleComplete}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Subtitle & CMYK Branding Accents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-2 flex flex-col items-center text-center px-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2DB8D3] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#D41A78] animate-pulse delay-75" />
              <span className="w-2 h-2 rounded-full bg-[#F3C215] animate-pulse delay-150" />
              <span className="text-xs uppercase tracking-widest font-bold text-slate-900">
                OPA Imprimerie
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              L&apos;Artisanat de Précision • Grand Format &amp; Packaging
            </p>
          </motion.div>

          {/* Quick Skip pill */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute bottom-6 text-[10px] uppercase tracking-wider text-slate-300 hover:text-slate-600 transition-colors py-1 px-3 rounded-full hover:bg-slate-100/60"
          >
            Passer l&apos;introduction &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialLoader;
