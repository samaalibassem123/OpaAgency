---
name: glassmorphism-design
description: >-
  Expert guidance for implementing sophisticated, production-grade glassmorphism and liquid glass aesthetics.
  Use when designing or styling translucent UI elements, navigation bars, modal overlays, card surfaces,
  or floating action controls to ensure subtle depth, optical legibility, and high performance.
---

# Glassmorphism Design System: Apple Liquid Glass & Tactile Depth

This skill defines the technical standards, CSS variables, and design rules for implementing subtle, high-end translucent surfaces for **OPA Imprimerie**. Glassmorphism must be used intentionally—as a material that organizes depth and focus—never as a gimmick.

---

## 1. Core Visual Principles

### 1.1 The Liquid Glass Hierarchy
Apple's modern liquid glass philosophy relies on three optical dimensions:
1. **Translucency with High Chromatic Fidelity:** Surfaces are never flat milky white or gray; they inherit and softly blur the underlying background luminosity (`backdrop-filter: blur(12px) saturate(180%)`).
2. **Double-Border Specular Highlight:** Real glass has physical thickness. The top and left edges catch directional ambient light (a delicate 1px border with `rgba(255, 255, 255, 0.12)`), while the bottom edge softly dissolves (`rgba(255, 255, 255, 0.04)`).
3. **Controlled Shadow Diffusion:** Ambient occlusion shadow with high spread and low opacity (`0 20px 40px -15px rgba(0, 0, 0, 0.5)`).

### 1.2 Contrast & Text Readability
- **Never place body copy directly on raw, highly transparent glass.**
- Backing layers behind textual content must maintain a minimum opacity of 80% to 92% on dark backgrounds (`rgba(17, 19, 23, 0.85)`).
- Ensure strict **WCAG AA contrast (minimum 4.5:1)** for all text against any underlying imagery.

---

## 2. Design Tokens & CSS Variables

Add these semantic utility tokens to your global CSS (`src/app/globals.css` or Tailwind config):

```css
:root {
  /* Glass Surface Tokens */
  --glass-surface-subtle: rgba(255, 255, 255, 0.03);
  --glass-surface-panel: rgba(17, 19, 23, 0.72);
  --glass-surface-elevated: rgba(25, 28, 34, 0.85);

  /* Specular Highlight Borders */
  --glass-border-hairline: rgba(255, 255, 255, 0.08);
  --glass-border-highlight: rgba(255, 255, 255, 0.16);

  /* Inner Specular Insets */
  --glass-specular-inset: inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);

  /* Blur & Saturation */
  --glass-blur-nav: 16px;
  --glass-blur-card: 12px;
}
```

---

## 3. Tailwind CSS Implementation Patterns

### Pattern A: Floating Navigation Bar (Subtle Floating Glass)
```tsx
<header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
  <nav className="relative flex items-center justify-between px-6 py-3.5 rounded-full
    bg-neutral-950/70 backdrop-blur-md backdrop-saturate-150
    border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
    before:absolute before:inset-0 before:rounded-full before:pointer-events-none
    before:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
    {/* Navigation Items */}
  </nav>
</header>
```

### Pattern B: Interactive Portfolio / Feature Card
```tsx
<article className="group relative rounded-2xl p-8 overflow-hidden
  bg-neutral-900/60 backdrop-blur-sm
  border border-white/[0.08] hover:border-white/20
  shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]
  transition-all duration-500 ease-out hover:-translate-y-1">
  
  {/* Specular Ambient Sheen */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

  {/* Card Content */}
  <div className="relative z-10">
    <h3 className="text-xl font-medium text-white tracking-tight">Finitions d'Exception</h3>
    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
      Gaufrage en relief et dorure à chaud sur papiers de création 400g.
    </p>
  </div>
</article>
```

---

## 4. Strict Negative Constraints ("What to Avoid")

> [!CAUTION]
> - **NO Neon Glowing Outlines:** Never use high-saturation cyan, magenta, or purple glow shadows (`box-shadow: 0 0 20px #00ffff`).
> - **NO Universal Blurring:** Do not apply `backdrop-filter: blur(...)` to 50+ elements simultaneously; it exhausts mobile GPU fill-rates. Limit glass to sticky navigation, overlay drawers, and key elevated surfaces.
> - **NO Low-Contrast Floating Text:** Never render light gray text over an uncontrolled, transparent background image.
> - **NO Over-Rounded Bubble Geometry:** Avoid cartoonish `rounded-[40px]` on standard rectangular cards. Use disciplined geometric radiuses (`rounded-xl` / `rounded-2xl`).
> - **NO Excessive Specular Streaks:** Avoid dramatic diagonal lens flares or fake reflection strips across buttons. Keep light interactions authentic and subtle.
