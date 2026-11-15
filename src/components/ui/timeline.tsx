"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  kicker?: string;
  className?: string;
}

export const Timeline = ({
  data,
  title,
  description,
  kicker,
  className,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();

    if (ref.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(updateHeight);
      ro.observe(ref.current);
      return () => ro.disconnect();
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-neutral-950 font-sans md:px-10",
        className
      )}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-8 lg:px-10">
        {kicker && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DB8D3]/10 border border-[#2DB8D3]/30 text-[#0E859E] text-[11px] font-bold uppercase tracking-widest mb-3">
            <span>{kicker}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl">
          {title ?? "Changelog from my journey"}
        </h2>
        <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
          {description ??
            "I've been working on Aceternity for the past 2 years. Here's a timeline of my journey."}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative min-h-[85vh] md:min-h-[100vh] pt-6 pb-20 md:pt-10 md:pb-32"
          >
            {/* Sticky Step Container: Latch & Stick comfortably for each step while scrolling */}
            <div className="sticky top-20 md:top-28 z-30 flex flex-col md:flex-row justify-start md:gap-10 items-start w-full">
              {/* Left Column: Glowing Node Indicator & Step Title */}
              <div className="flex items-center gap-3 md:gap-4 z-40 max-w-xs lg:max-w-sm md:w-full shrink-0 mb-3 md:mb-0">
                <div className="h-10 w-10 absolute left-3 md:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center border border-slate-200/90 shadow-sm shrink-0">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-[#2DB8D3] via-[#D41A78] to-[#F3C215] border border-white dark:border-neutral-700 shadow-sm" />
                </div>
                <h3 className="pl-16 md:pl-20 text-lg md:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-neutral-100 tracking-tight transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Right Column: Step Content Card */}
              <div className="relative pl-16 pr-4 md:pl-4 w-full">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-slate-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#2DB8D3] via-[#D41A78] to-[#F3C215] from-[0%] via-[60%] to-[100%] rounded-full shadow-[0_0_8px_rgba(45,184,211,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
