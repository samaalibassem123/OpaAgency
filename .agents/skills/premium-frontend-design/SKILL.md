---
name: premium-frontend-design
description: >-
  Architectural and aesthetic principles for building world-class, award-winning editorial frontends.
  Use when designing page layouts, selecting typography pairings, composing asymmetric grids,
  structuring visual hierarchy, and creating distinctive creative studio experiences.
---

# Premium Frontend Design: Creative Direction & Editorial Layouts

This skill guides the design and visual development of **OPA Imprimerie** to ensure an authentic, agency-grade digital experience worthy of recognition on Awwwards, SiteInspire, and Godly.

---

## 1. The Anti-Template Manifesto

Modern AI-generated websites frequently fall into identical, predictable traps. Every interface created under this skill must actively reject these generic tropes:

| Generic AI Pattern (STRICTLY FORBIDDEN) | Premium Editorial Solution for OPA |
| :--- | :--- |
| Centered hero with purple/blue mesh background | Asymmetric split layout, monolithic display typography, deep obsidian canvas, and high-impact physical print photography |
| Repetitive 3-column card grid for features | Variable-width masonry, editorial alternating rows, and full-width tactile showcase panels |
| Uniform rounded cards with floating icons | High-contrast typography, hairline architectural dividers (`border-white/10`), and physical paper grain textures |
| Default `Inter` or `Roboto` everywhere | High-character Display Serif / Geometric Sans pairing (e.g. Syne, Cormorant, or Instrument Serif paired with Plus Jakarta Sans or Manrope) |
| Cheesy 3D stock illustrations or SaaS mockups | Macro photography of real print craft: hot foil reflections, embossing depth, textured cardstocks, and packaging die-cuts |
| Centered floating buttons with bouncing glows | Minimalist pill or architectural rectangle CTAs with subtle magnetic hover and crisp border treatments |

---

## 2. Layout & Grid Architecture

### 2.1 Asymmetric Editorial Balance
Instead of identical grid cells, structure sections with tension and intentional rhythm:
- **Hero:** Left-aligned or staggered oversized typography with an offset, vertically oriented showcase frame or interactive preview.
- **About / Atelier:** Left column anchor (editorial manifesto + key figures) paired with a high-definition image reel or vertical timeline of craftsmanship.
- **Services:** Horizontal or multi-column accordion-style architectural drawers where hovering over a service expands high-resolution imagery and technical paper specs.
- **Selected Works (Portfolio):** Dynamic asymmetric layout with alternating portrait and landscape aspect ratios (e.g., 4:5 luxury box shots alongside 16:9 packaging spreads).

### 2.2 Intentional Negative Space
- Employ generous vertical breathing room (`py-28 lg:py-40`) between major conceptual themes.
- Let typography and photography command attention without filling every pixel with cards or decorative shapes.

---

## 3. Typography & Hierarchy System

Typography in a high-end printing website must reflect the heritage of print itself—type design, ink spread, and kerning:

1. **Display / Headlines:**
   - Font: Characterful Display Serif or Architectural Sans (e.g., **Syne**, **Cinzel**, or **Playfair Display**).
   - Metrics: Tight line-height (`leading-[0.95]`), negative letter-spacing (`tracking-[-0.03em]`), and bold scale (`text-5xl sm:text-7xl lg:text-8xl`).
2. **Subheadings & Category Badges:**
   - Font: Clean Swiss Geometric Sans (e.g., **Plus Jakarta Sans** or **Manrope**).
   - Metrics: Monospaced-inspired tracking (`tracking-[0.15em]`), uppercase, muted contrast (`text-neutral-400 text-xs font-semibold`).
3. **Body Copy:**
   - Font: Highly legible neutral Sans (e.g., **Plus Jakarta Sans**).
   - Metrics: Comfortable reading measure (`max-w-xl text-neutral-300 leading-relaxed font-light text-base lg:text-lg`).

---

## 4. Color Palette & Tactile Textures

### 4.1 Master Color Palette
- **Deep Obsidian Canvas:** `#090A0C` (Base dark tone, richer and deeper than flat gray).
- **Carbon Panel / Surface:** `#12151B` (Used for subtle depth elevation and card surfaces).
- **Pure Stark White:** `#FFFFFF` (Headings, primary CTA fills, high-contrast focal points).
- **Muted Platinum / Slate:** `#8E95A5` & `#5C6270` (Secondary descriptors, metadata, hairline dividers).
- **Craft Accent — Metallic Foil Gold:** `#C5A059` / `#D4AF37` (Inspired by real hot foil stamping on luxury packaging; used with extreme restraint for highlights, badges, and quotation buttons).

### 4.2 Tactile Paper Simulation
To bridge the digital and physical print realms:
- Incorporate subtle SVG noise or CSS grain overlay (`opacity-[0.025] pointer-events-none`) across the page background.
- Use macro photography showcasing paper fiber textures, embossed shadows, and debossed letterpress details.
