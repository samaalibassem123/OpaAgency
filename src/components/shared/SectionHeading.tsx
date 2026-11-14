import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  highlight,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start max-w-2xl",
        className
      )}
    >
      {/* Category Kicker Badge with Logo CMYK Tri-Dot */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center -space-x-1">
          <span className="w-2 h-2 rounded-full bg-[#2DB8D3]" />
          <span className="w-2 h-2 rounded-full bg-[#D41A78]" />
          <span className="w-2 h-2 rounded-full bg-[#F3C215]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
          {kicker}
        </span>
      </div>

      {/* Main Section Headline */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
        {title}{" "}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215]">
            {highlight}
          </span>
        )}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
