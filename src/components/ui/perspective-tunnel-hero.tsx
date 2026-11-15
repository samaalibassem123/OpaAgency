"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export interface TunnelCardItem {
  src: string;
  title: string;
  tag?: string;
}

const DEFAULT_IMAGES: TunnelCardItem[] = [
  { src: "/images/portfolio-perfume-box.jpg", title: "Coffret Parfumerie", tag: "Packaging de Luxe" },
  { src: "/images/portfolio-cards-duplex.jpg", title: "Dorure à Chaud", tag: "Carterie d'Art" },
  { src: "/images/portfolio-annual-book.jpg", title: "Livre d'Art & RSE", tag: "Édition Corporate" },
  { src: "/images/portfolio-cosmetic-folding.jpg", title: "Étuis Cosmétiques", tag: "Gaufrage 3D" },
  { src: "/images/portfolio-folder-diecut.jpg", title: "Chemises & Découpe", tag: "Façonnage Précision" },
  { src: "/images/portfolio-signage-dibond.jpg", title: "Signalétique Prestige", tag: "Grand Format" },
  { src: "/images/service-packaging.jpg", title: "Boîtes Rigides", tag: "Cartonnage Rembordé" },
  { src: "/images/service-finishing.jpg", title: "Vernis Sélectif & Relief", tag: "Ennoblissement" },
  { src: "/images/about-printing-press.jpg", title: "Impression Offset HD", tag: "Atelier Haute Fidélité" },
];

interface TunnelCardData {
  item: TunnelCardItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const SPRING_CONFIG = { stiffness: 10, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  // Stagger calculation: strictly monotonically ascending ranges (never duplicate 0 values for card 0)
  const entryStart = Math.max(0.015, (card.index / total) * 0.25 + 0.015);
  const entryEnd = entryStart + 0.18;
  const exitStart = 0.84;
  const exitEnd = 1.0;

  const farZ = stage.isMobile ? -850 : -1200;
  // Showcase sticky depth: cards settle here in a prominent 3D orbit around the headline
  const stickyZ = stage.isMobile ? 70 + (card.index % 3) * 20 : 100 + (card.index % 3) * 35;
  const exitZ = stage.isMobile ? 320 : 520;

  // Z-transform: glides smoothly into view, STICKS in showcase orbit, then exits at the end
  const z = useTransform(
    progress,
    [0, entryStart, entryEnd, exitStart, exitEnd],
    [
      farZ,
      farZ * 0.75,
      stickyZ,
      stickyZ + 40, // subtle, elegant slow drift while sticking
      exitZ,
    ]
  );

  // Opacity: starts visible, ramps to 100% solid, STICKS at 1 through the main scroll sequence!
  const opacity = useTransform(
    progress,
    [0, entryStart, entryEnd, exitStart, exitEnd],
    [
      0.72, // Elegant rest visibility at page top
      0.88, // Gliding in
      1.0,  // Full solid tactile presence
      1.0,  // STICKS fully visible throughout the sequence!
      0,    // Smooth exit only when reaching the next section
    ]
  );

  // Scale: cards subtly expand to full scale when in their showcase sticky position
  const scale = useTransform(
    progress,
    [0, entryStart, entryEnd, exitStart, exitEnd],
    [0.85, 0.90, 1.02, 1.04, 1.08]
  );

  const cardWidth = stage.isMobile
    ? Math.max(95, Math.min(120, stage.width * 0.28))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 8 : 40;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    (values: number[]) => {
      const currZ = typeof values[0] === "number" && !isNaN(values[0]) ? values[0] : 0;
      const px = typeof values[1] === "number" && !isNaN(values[1]) ? values[1] : 0;
      const py = typeof values[2] === "number" && !isNaN(values[2]) ? values[2] : 0;
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      const safeOffsetX = isNaN(offsetX) ? 0 : offsetX;
      const safeOffsetY = isNaN(offsetY) ? 0 : offsetY;
      return `translate3d(calc(-50% + ${safeOffsetX.toFixed(1)}px), calc(-50% + ${safeOffsetY.toFixed(1)}px), ${currZ.toFixed(1)}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        scale,
        zIndex: card.index + 1,
      }}
      className="pointer-events-none sm:pointer-events-auto touch-pan-y absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/85 backdrop-blur-md backdrop-saturate-150 border border-slate-200/90 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-500 hover:border-[#2DB8D3] hover:shadow-[0_20px_45px_-10px_rgba(45,184,211,0.25)]">
        <Image
          src={card.item.src}
          alt={card.item.title}
          fill
          sizes="(max-width: 768px) 160px, 280px"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-3.5 sm:p-5">
          {card.item.tag && (
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#2DB8D3] mb-0.5 sm:mb-1">
              {card.item.tag}
            </span>
          )}
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-md">
            {card.item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export interface PerspectiveTunnelHeroProps {
  images?: TunnelCardItem[];
  className?: string;
}

export function PerspectiveTunnelHero({
  images = DEFAULT_IMAGES,
  className,
}: PerspectiveTunnelHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const tunnelCards: TunnelCardData[] = images.map((item, i) => {
    const goldenAngle = i * 137.5 * (Math.PI / 180);
    // On mobile, keep orbit strictly contained within the mobile viewport
    const radiusFactorX = stage.isMobile
      ? 0.18 + (i % 3) * 0.04
      : 0.44 + (i % 3) * 0.09;
    const radiusFactorY = stage.isMobile
      ? 0.22 + (i % 2) * 0.05
      : 0.40 + (i % 2) * 0.11;

    return {
      item,
      angleCos: Math.cos(goldenAngle),
      angleSin: Math.sin(goldenAngle),
      radiusFactorX,
      radiusFactorY,
      rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      index: i,
    };
  });

  // Track the MAIN SCROLL BAR position over the pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring smoothing for buttery scrollbar feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.0005,
  });

  // Camera parallax strictly on desktop with real mouse
  const pointer = useCameraParallax(!reduce && !stage.isMobile);

  // Central headline stays solid through most of the scroll, fading gently on exit
  const titleScale = useTransform(smoothProgress, [0, 0.75, 0.92, 1], [1, 1.02, 1.05, 1.1]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.80, 0.95, 1], [1, 1, 0.7, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div
      ref={trackRef}
      className={`relative w-full max-w-full overflow-visible h-[195vh] sm:h-[240vh] ${className || ""}`}
    >
      {/* Pinned Sticky Viewport: Remains in view while user scrolls the main scroll bar */}
      <div
        className="sticky top-0 h-screen w-full max-w-full overflow-hidden bg-white text-slate-900 select-none flex items-center justify-center pt-20 pb-16 touch-pan-y"
        style={{
          perspective: stage.isMobile ? "850px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Central Anchor Typography & Action CTAs */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="pointer-events-none z-30 relative flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl [transform:translateZ(180px)] w-full max-w-full"
        >
          {/* Frosted ambient glass aura behind text for optimal contrast */}
          <div className="absolute inset-0 sm:-inset-6 -z-10 rounded-3xl bg-white/80 backdrop-blur-md opacity-95 pointer-events-none shadow-[0_10px_40px_rgba(255,255,255,0.95)]" />

          {/* Top Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm mb-4 sm:mb-5 pointer-events-auto">
            <div className="flex items-center -space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DB8D3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D41A78]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F3C215]" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-900">
              Imprimerie OPA: Our Print Agency
            </span>
          </div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            L&apos;Artisanat du Papier,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DB8D3] via-[#D41A78] to-[#F3C215]">
              la Précision d&apos;Impression.
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 max-w-[46ch] text-xs sm:text-lg text-slate-600 font-normal leading-relaxed">
            Atelier de référence à Tunis : packaging de prestige, boîtes rigides sur-mesure, dorure à chaud et façonnage haute précision.
          </p>

          {/* Action CTAs */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 pt-5 sm:pt-6 w-full sm:w-auto">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm tracking-tight hover:bg-[#D41A78] transition-colors duration-300 shadow-md"
            >
              <span>Demander un Devis Gratuit</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/90 border border-slate-300 hover:border-[#2DB8D3] text-slate-800 hover:text-[#2DB8D3] font-bold text-xs sm:text-sm shadow-sm backdrop-blur-md transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-[#2DB8D3]" />
              <span>WhatsApp Express (+216 21 808 818)</span>
            </motion.a>
          </div>
        </motion.div>


        {/* 3D Z-Space Plane */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {tunnelCards.map((card, i) => (
            <TunnelCard
              key={i}
              card={card}
              progress={smoothProgress}
              pointer={pointer}
              total={tunnelCards.length}
              stage={stage}
            />
          ))}
        </div>

        {/* Subtle Scroll Hint */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20 text-slate-400 select-none"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Défiler
          </span>
          <div className="w-4 h-7 rounded-full border border-slate-300 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-slate-400"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PerspectiveTunnelHero;
