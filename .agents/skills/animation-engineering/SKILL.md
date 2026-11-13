---
name: animation-engineering
description: >-
  Advanced motion engineering guidelines combining GSAP ScrollTrigger and Framer Motion / Motion.
  Use when choreographing scroll-driven narrative animations, text reveals, pinning sequences,
  interactive hover states, and smooth page transitions while ensuring 60fps performance and accessibility.
---

# GSAP & Motion Engineering: Cinematic Interactions & Performance

This skill outlines the strict division of responsibilities, lifecycle management, and performance standards for animating **OPA Imprimerie**.

---

## 1. Division of Responsibilities

To avoid layout thrashing and conflicting property ownership, adhere to the strict boundary:

```
┌─────────────────────────────────────────────────────────────┐
│                      MOTION ARCHITECTURE                    │
├──────────────────────────────┬──────────────────────────────┤
│       GSAP + ScrollTrigger   │   Framer Motion / Motion     │
├──────────────────────────────┼──────────────────────────────┤
│ • Scroll-driven timelines    │ • Component entry/exit       │
│ • Pinned editorial sections  │ • Micro-interactions & hover │
│ • Multi-stage text reveals   │ • Mobile drawer & modal state│
│ • Parallax & image scales    │ • AnimatePresence flows      │
│ • Scrubbed progress meters   │ • Layout spring transitions  │
└──────────────────────────────┴──────────────────────────────┘
```

> [!IMPORTANT]
> **Zero Property Collision:** Never animate the same DOM node's `transform`, `opacity`, or `x/y` simultaneously with both GSAP and Framer Motion. Choose one engine per element.

---

## 2. GSAP in React 19 / Next.js Lifecycle

### 2.1 Always Use `useGSAP` or Clean Contexts
In modern React and Next.js, never instantiate raw `gsap.to()` or `ScrollTrigger.create()` without registering them inside a scoped context. Memory leaks and orphaned triggers occur when components unmount or re-render.

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function EditorialShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Automatic cleanup handled by useGSAP
      gsap.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32">
      <h2 ref={headlineRef} className="text-6xl font-serif text-white">
        L'Artisanat du Papier
      </h2>
    </section>
  );
}
```

---

## 3. Framer Motion Implementation Patterns

### 3.1 Magnetic Button / Micro-Interaction
```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function MagneticCTA({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full
        bg-white text-neutral-950 font-medium text-sm
        hover:bg-amber-400/90 transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}
```

---

## 4. Performance & Hardware Acceleration Guidelines

1. **Transform & Opacity Only:**
   - Only animate `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.
   - Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`, which trigger synchronous reflow (layout thrashing).
2. **Layer Promotion:**
   - Use `will-change: transform` sparingly—only on elements currently undergoing active scroll-linked transitions. Remove upon completion.
3. **ScrollTrigger Refresh Management:**
   - On asynchronous image loading or dynamic font loading, call `ScrollTrigger.refresh()` after fonts/images settle to prevent incorrect trigger offsets.
4. **Mobile Throttling:**
   - Disable heavy scrubbed pinning or extensive parallax on touch viewports (`window.innerWidth < 768px`) where mobile browsers suffer from address bar resizing jitters.

---

## 5. Accessibility: `prefers-reduced-motion`

Always honor the user's OS-level accessibility preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In GSAP:
```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Graceful instantaneous reveal without motion
  gsap.set(elements, { opacity: 1, y: 0 });
}
```
