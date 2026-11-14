"use client";

import React from "react";
import { PerspectiveTunnelHero } from "@/components/ui/perspective-tunnel-hero";

export function Hero() {
  return (
    <section id="hero" className="relative w-full bg-white">
      {/* 3D Perspective Tunnel Hero with OPA Printing Visuals */}
      <PerspectiveTunnelHero />
    </section>
  );
}
