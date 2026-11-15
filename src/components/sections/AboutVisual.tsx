"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AboutVisual() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-6 sm:py-10">
      {/* Ambient Print Glow (Soft unboxed atmospheric light, zero hard borders) */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#2DB8D3]/12 via-[#D41A78]/10 to-[#F3C215]/15 blur-3xl pointer-events-none -z-10" />

      {/* Main Interactive Vector Artboard */}
      <motion.div
        whileHover={reduceMotion ? {} : { scale: 1.025 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square flex flex-col items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients & filters */}
          <defs>
            <filter id="cmykGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="apexGrad" x1="150" y1="80" x2="250" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>

          {/* Precision Print Calibration Circles (Die-cut & registration guide lines) */}
          <motion.circle
            cx="200"
            cy="210"
            r="165"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
            style={{ transformOrigin: "200px 210px" }}
          />
          <circle cx="200" cy="210" r="135" stroke="rgba(15, 23, 42, 0.04)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="210" r="105" stroke="rgba(15, 23, 42, 0.03)" strokeWidth="1" strokeDasharray="2 4" fill="none" />



          {/* -------------------------------------------------------------
              ANIMATED VECTOR PATHS OF THE OPA EMBLEM
              Stroke width 26px with high-precision stroke-linecap="round"
             ------------------------------------------------------------- */}

          {/* Path 1: Top Apex / Roof (Noir Profond #0F172A) */}
          <motion.path
            d="M150 140 L200 80 L250 140"
            stroke="url(#apexGrad)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* Path 2: Middle Yellow Loop (Jaune Process #F3C215) */}
          <motion.path
            d="M140 185 C140 160, 260 160, 260 185 C260 210, 140 210, 140 235"
            stroke="#F3C215"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          />

          {/* Path 3: Magenta Ribbon Loop (Magenta Primaire #D41A78) */}
          <motion.path
            d="M140 235 C140 260, 260 260, 260 285 C260 305, 140 305, 140 325"
            stroke="#D41A78"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />

          {/* Path 4: Bottom Cyan Cradle Loop (Cyan Pur #2DB8D3) */}
          <motion.path
            d="M140 325 C140 365, 260 365, 260 325"
            stroke="#2DB8D3"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          />
        </svg>
      </motion.div>

      {/* Official Brand Wordmark (Exact OPA Font & Geometric Lettering) */}
      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}
        className="mt-3 flex flex-col items-center text-center"
      >
        <div className="relative w-44 sm:w-52 aspect-[355/163]">
          <Image
            src="/images/opa-wordmark-light.png"
            alt="OPA — Our Print Agency"
            fill
            sizes="(max-width: 768px) 180px, 220px"
            className="object-contain filter drop-shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
            priority
          />
        </div>


      </motion.div>
    </div>
  );
}

export default AboutVisual;
