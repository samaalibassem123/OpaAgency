# OPA IMPRIMERIE — DESIGN SYSTEM SPECIFICATION
## Master Design Tokens, Typography, Materials & Components (`docs/DESIGN_SYSTEM.md`)

---

## 1. Design Philosophy: The Physical Metaphor

The OPA design system bridges the tangible, tactile world of bespoke physical printing with modern, high-performance digital engineering. Every element reflects physical materials:
- **Cardstock Depth:** Layered surfaces mimicking thick uncoated cardboard (350–600 gsm).
- **Ink & Foil Specular Highlights:** Delicate light reflections on edges reminiscent of gold hot foil stamping (*dorure à chaud*).
- **Typographic Precision:** Typographic kerning and line weights honoring letterpress and Swiss editorial publishing.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Core Palette

```
Obsidian Canvas      Carbon Surface       Panel / Elevator     Pure Stark White
#090A0C             #12151B              #191C22              #FFFFFF
(Base background)    (Cards / Drawers)    (Hover states)       (Headlines / CTAs)
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
[■■■■■■■■■■■■]       [■■■■■■■■■■■■]       [■■■■■■■■■■■■]       [■■■■■■■■■■■■]

Muted Slate          Hairline Border      Hot-Foil Gold        Gold Glow Accent
#8E95A5             rgba(255,255,255,0.08) #C5A059             rgba(197,160,89,0.2)
(Body descriptions)  (Subtle dividers)    (Craft highlight)    (Interactive focal)
```

### 2.2 Semantic Token Mapping

| CSS Variable | Value | Tailwind Class Equivalent | Semantic Usage |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#090A0C` | `bg-[#090A0C]` | Page body background |
| `--bg-surface` | `#12151B` | `bg-[#12151B]` | Section cards, drawers, dialogs |
| `--bg-surface-elevated`| `#191C22` | `bg-[#191C22]` | Card hover states, active tabs |
| `--text-primary` | `#FFFFFF` | `text-white` | Primary headlines, active links |
| `--text-secondary` | `#8E95A5` | `text-slate-400` | Explanatory copy, metadata |
| `--text-muted` | `#5C6270` | `text-neutral-500` | Footer copyright, subtle tags |
| `--border-hairline` | `rgba(255, 255, 255, 0.08)` | `border-white/[0.08]` | Section dividers, card frames |
| `--border-hover` | `rgba(255, 255, 255, 0.20)` | `border-white/20` | Interactive hover borders |
| `--accent-gold` | `#C5A059` | `text-[#C5A059]` | Badges, foil icons, quotation CTAs |
| `--accent-gold-bg` | `rgba(197, 160, 89, 0.12)` | `bg-[#C5A059]/10` | Category pills, active indicators |

---

## 3. Typography System

The typography creates a dialog between **classical European craftsmanship** and **rigorous Swiss modernist structure**.

### 3.1 Font Families
- **Display Serif / Architectural Headings:** Cormorant Garamond / Syne (`var(--font-serif)` / `var(--font-display)`)
- **Body & UI Sans:** Plus Jakarta Sans (`var(--font-sans)`)

### 3.2 Typographic Hierarchy & Scale

| Role | Font Family | Weight | Size (Desktop / Mobile) | Tracking | Leading |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Display Serif | 500 / SemiBold | `76px - 96px` / `42px - 52px` | `-0.03em` | `0.95` |
| **Section Title**| Display Serif | 600 / Bold | `48px - 64px` / `32px - 40px` | `-0.02em` | `1.05` |
| **Subsection** | Display Serif | 500 / Medium | `28px - 36px` / `22px - 26px` | `-0.01em` | `1.2` |
| **Category Pill**| Geometric Sans| 600 / SemiBold | `11px - 12px` / `11px` | `+0.15em` | `1.0` (Uppercase) |
| **Body Large** | Geometric Sans| 300 / Light | `18px - 20px` / `16px` | `0` | `1.6` |
| **Body Default**| Geometric Sans| 400 / Regular | `15px - 16px` / `14px - 15px` | `0` | `1.55` |
| **Caption / Meta**| Geometric Sans| 500 / Medium | `12px - 13px` / `12px` | `+0.05em` | `1.4` |

---

## 4. Materials, Elevation & Glassmorphism

### 4.1 Liquid Glass Tokens
- **Floating Navbar:** `bg-[#090A0C]/75 backdrop-blur-md backdrop-saturate-150 border border-white/10`
- **Interactive Cards:** `bg-[#12151B]/80 backdrop-blur-sm border border-white/[0.08] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]`
- **Modal Backdrops:** `bg-black/80 backdrop-blur-md`

### 4.2 Tactile Paper Noise
A subtle CSS grain pattern applied at root:
```css
.paper-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
}
```

---

## 5. UI Component Primitives

### 5.1 Primary Button (Inverted White)
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
  bg-white text-neutral-950 font-medium text-sm tracking-tight
  hover:bg-[#C5A059] hover:text-white transition-all duration-300
  focus-visible:ring-2 focus-visible:ring-[#C5A059]">
  <span>Demander un Devis</span>
  <ArrowUpRight className="w-4 h-4" />
</button>
```

### 5.2 Quotation / WhatsApp CTA Button (Hot-Foil Gold)
```tsx
<a href="https://wa.me/21621808818?text=Bonjour%20OPA,%20je%20souhaite%20un%20devis..."
  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full
  bg-gradient-to-r from-[#C5A059] to-[#DFBA6F] text-neutral-950 font-semibold text-sm
  shadow-[0_8px_24px_-6px_rgba(197,160,89,0.4)] hover:shadow-[0_12px_28px_-4px_rgba(197,160,89,0.6)]
  hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
  <MessageCircle className="w-4 h-4 text-neutral-950" />
  <span>Devis Express WhatsApp</span>
</a>
```

### 5.3 Category Kicker / Badge
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
  bg-white/[0.04] border border-white/10 text-[#C5A059] text-[11px] font-semibold
  uppercase tracking-[0.15em]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
  <span>Atelier de Fabrication & Packaging</span>
</div>
```

---

## 6. Motion & Interaction Curves

- **Editorial Entry Ease:** `cubic-bezier(0.22, 1, 0.36, 1)` (Power3/Power4 equivalent; silky, gradual deceleration).
- **Spring Feedback:** `stiffness: 400, damping: 28` (Tactile, non-oscillating spring for buttons and toggles).
- **Hover Transitions:** `duration-300 ease-out` for border highlights and subtle card elevations (`-translate-y-1`).
