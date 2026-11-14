import React from "react";
import { GlassRevealOpa } from "@/components/ui/liquid-glass-logo-reveal";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900 select-none">
      <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] relative flex items-center justify-center">
        <GlassRevealOpa className="w-full h-full" loop={true} />
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2DB8D3] animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-[#D41A78] animate-pulse delay-75" />
          <span className="w-2 h-2 rounded-full bg-[#F3C215] animate-pulse delay-150" />
          <span className="text-xs uppercase tracking-widest font-bold text-slate-900">
            OPA Imprimerie
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
          L&apos;Artisanat de Précision • Chargement de l&apos;Atelier
        </p>
      </div>
    </div>
  );
}
