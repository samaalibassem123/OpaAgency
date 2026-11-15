# OPA IMPRIMERIE — MASTER AI AGENTS & CONTRIBUTOR DIRECTIVE
## Single Source of Truth (`AGENTS.md`)

This document governs all architectural, design, engineering, animation, quality, and workflow decisions for **OPA Imprimerie** (*Our Print Agency*). Every AI agent and human engineer working in this workspace must strictly adhere to these instructions.

---

## 1. Project Identity & Business Context

- **Client Brand:** OPA Imprimerie / Our Print Agency (Société OPA)
- **Sector:** High-End Commercial Printing, Luxury Packaging Manufacturing, Corporate Stationery & Visual Advertising.
- **Headquarters & Facilities:**
  - *Atelier / Production:* Local L14, Résidence Marwa, Cité El Mostakbel, Rue Jbal Echaanbi, Ariana Médina, 2080 Tunis, Tunisia.
  - *Commercial Office:* 15 Rue de la Commission, 1002 Tunis, Tunisia.
- **Leadership:** M. Marouane Ben Younes (General Manager).
- **Verified Direct Contact & WhatsApp Business:** `+216 21 808 818`
- **Official Instagram Reference:** [`@imprimerie.opa`](https://www.instagram.com/imprimerie.opa?mdxt=Y284N3l3MHprY2g2)
- **Core Positioning:** Modern master printing atelier bridging artisan craft (hot foil stamping, blind embossing, micro-flute packaging) with industrial high-volume offset and rapid digital precision.

---

## 2. OPA Brand Guidelines & Art Direction

- **Brand Essence:** *L'Artisanat de Précision* (The Craft of Precision).
- **Aesthetic Stance:** Award-winning dark editorial aesthetic inspired by high-end design benchmarks (Awwwards, SiteInspire, Godly, KOTA). Reject all generic AI website templates.
- **Visual Palette:**
  - **Base Canvas (Obsidian):** `#090A0C`
  - **Elevated Surfaces (Carbon):** `#12151B`
  - **Text & High Contrast:** `#FFFFFF` (Headings) and `#8E95A5` (Muted Slate body)
  - **Craft Metallic Accent (Hot-Foil Gold):** `#C5A059` / `#D4AF37` (Restrained use for badges, craft highlights, and quotation CTAs)
  - **Hairline Dividers:** `rgba(255, 255, 255, 0.08)`
- **Tactility:** Subtle paper grain background overlay, macro photography of print finishes (foil, embossing, paper grain), and controlled glassmorphism.

---

## 3. Technology Stack & Version Contracts

| Technology | Role & Architecture Standard |
| :--- | :--- |
| **Next.js (App Router)** | Latest stable App Router (`src/app/`). Server Components by default. |
| **React & React-DOM** | React 19. Strict SSR hydration boundaries; zero hydration mismatches. |
| **TypeScript** | Strict mode (`strict: true`). Zero `any` usage. Explicit interfaces for all data. |
| **Tailwind CSS** | Utility-first styling with custom CSS variables and glassmorphism tokens. |
| **shadcn/ui** | Accessible UI primitives installed via the official shadcn MCP or CLI. |
| **Lucide React** | Unified icon library. Consistent stroke widths (`strokeWidth={1.5}`). |
| **GSAP & ScrollTrigger**| Scroll-driven animations, pinned editorial layouts, and text reveals via `useGSAP`. |
| **Framer Motion / Motion** | Component entry/exit, interactive modals, mobile navigation, and micro-interactions. |
| **Playwright** | End-to-end responsive verification and cross-browser testing via Playwright MCP. |

---

## 4. Project Directory Structure

```text
├── .agents/
│   ├── mcp_config.json                 # Workspace-scoped MCP configurations
│   ├── agents/                         # Specialized AI agent roles
│   │   ├── frontend-engineer.md
│   │   ├── ui-ux-designer.md
│   │   ├── animation-engineer.md
│   │   └── quality-engineer.md
│   └── skills/                         # Project-specific AI skills
│       ├── glassmorphism-design/
│       ├── premium-frontend-design/
│       ├── animation-engineering/
│       └── nextjs-engineering/
├── docs/                               # Project documentation & manifests
│   ├── BRAND_RESEARCH.md
│   ├── DESIGN_SYSTEM.md
│   ├── PROJECT_ARCHITECTURE.md
│   └── MCP_SETUP.md
├── public/
│   ├── images/                         # Optimized imagery and project photography
│   └── fonts/                          # Local custom typography (if needed)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with fonts, metadata, and JSON-LD
│   │   ├── page.tsx                    # Master one-page landing assembly
│   │   └── globals.css                 # Master tokens, glassmorphism, and grain
│   ├── components/
│   │   ├── layout/                     # Global layout (Navbar, Footer)
│   │   ├── sections/                   # Individual landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/                         # shadcn/ui and custom primitives
│   │   └── shared/                     # Reusable widgets (SectionHeading, Badge, Modal)
│   ├── config/                         # Static content, services data, site metadata
│   ├── hooks/                          # Custom React hooks (useScroll, useMediaQuery)
│   ├── lib/                            # Utility helpers (cn, formatters, animations)
│   └── types/                          # Strict TypeScript type definitions
├── AGENTS.md                           # Master project directive (this file)
└── package.json
```

---

## 5. Architecture Conventions: Single-Page Excellence

1. **Strictly One Primary Route (`/`):** OPA requires a high-impact, single-page presentation. No extraneous routes, dashboards, authentication, or backend databases.
2. **Server Component Root:** `src/app/page.tsx` must remain a Server Component. It imports static configuration from `src/config/` and renders semantic section components.
3. **Leaf-Node Interactivity:** Push `"use client"` exclusively down to interactive components (e.g., mobile drawer toggle, lightbox viewer, quotation dialog, and GSAP animation hooks).
4. **No Server/Database Infrastructure:** The contact form initiates direct client-side WhatsApp triggers (`https://wa.me/21621808818?text=...`) or `mailto:` protocol. No database is needed.

---

## 6. Component Naming & Authoring Rules: Mandatory shadcn/ui Standard

- **Strict shadcn/ui-First Policy (Non-Negotiable):**
  - **Always Use shadcn Primitives:** Every interactive element, container surface, and input control MUST be built on official `shadcn/ui` primitives located in `src/components/ui/` (`Button`, `Card`, `Badge`, `Tabs`, `Dialog`, `Input`, `Textarea`, `Separator`, etc.).
  - **Zero Raw Unstyled Containers:** Never write raw, unstyled HTML interactive elements (`<button className="...">`, raw `<input>`, or ad-hoc custom card/tab `div` wrappers) when an equivalent shadcn primitive exists.
  - **On-Demand Component Installation:** When a project requirement needs an additional primitive (e.g. `sheet`, `accordion`, `tooltip`, `dropdown-menu`), always add it cleanly using the shadcn CLI:
    ```bash
    npx shadcn@latest add <component-name> --yes
    ```
    or inspect registry blocks via the official `shadcn` MCP server.
  - **Non-Blocking Performance Rule:** Never wrap shadcn primitives in blocking `opacity: 0` GSAP ScrollTrigger timelines or `toggleActions: "play none none reverse"` that cause blank content while scrolling. All shadcn cards and tabs must be immediately visible upon viewport entry with hardware-accelerated, non-blocking transitions.
  - **Glassmorphic Styling Discipline:** Style shadcn primitives using OPA's tactile glassmorphism tokens (`bg-white/85 backdrop-blur-md border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]`) via Tailwind utilities with `className={cn(..., className)}`.
- **Component Files:** PascalCase (`Hero.tsx`, `PortfolioGrid.tsx`). One component per file.
- **Utility / Config Files:** kebab-case or camelCase (`site-config.ts`, `animations.ts`).
- **Props Typing:** Every component must declare an explicit TypeScript interface (e.g. `interface HeroProps { ... }`).
- **Clean Exports:** Use named exports (`export function Hero(...) { ... }`) for UI components; use default exports only for Next.js App Router route segments (`layout.tsx`, `page.tsx`).

---

## 7. Styling & Design Tokens

- **Strict Dark Foundation:** Never use saturated blue or purple gradient canvases. Stick to Obsidian (`#090A0C`) and Carbon (`#12151B`).
- **Hairline Borders:** Use `border border-white/[0.08]` with subtle hover intensification (`hover:border-white/20`).
- **Glassmorphism Guidelines:** Follow `.agents/skills/glassmorphism-design/SKILL.md`. Use subtle blur (`backdrop-blur-md`) exclusively on the floating navbar, modal overlays, and elevated cards. Never compromise text contrast.

---

## 8. Animation Conventions

- **Clear Engine Separation:** Follow `.agents/skills/animation-engineering/SKILL.md`.
  - GSAP + ScrollTrigger: Scroll-driven timelines, pinned sections, and complex editorial text reveals. Always encapsulate inside `useGSAP` with scope refs.
  - Framer Motion: Modals, drawers, and magnetic button micro-interactions.
- **Accessibility:** Always check and respect `prefers-reduced-motion`.
- **Zero Layout Thrashing:** Animate only `transform` (`x`, `y`, `scale`) and `opacity`.

---

## 9. Responsive Design Requirements

- **Fluid Breakpoints:** Design mobile-first across four standard viewports:
  - Mobile: `< 640px` (375px - 430px iPhone standard)
  - Tablet: `640px - 1024px`
  - Desktop: `1024px - 1440px`
  - Wide Display: `> 1440px`
- **Touch Targets:** All interactive links and buttons must maintain a minimum touch target of `44px x 44px`.
- **Zero Horizontal Overflow:** Ensure `overflow-x-hidden` on outer layout wrappers.

---

## 10. Accessibility (a11y) Standards

- Strict adherence to **WCAG 2.1 Level AA**.
- Contrast ratio >= 4.5:1 for body copy and >= 3:1 for large display titles.
- All interactive icons must provide `aria-label` or visually hidden labels.
- Keyboard navigation: All clickable elements must support full keyboard focus with visible focus rings (`focus-visible:ring-2 focus-visible:ring-amber-400`).

---

## 11. SEO & Metadata Rules

- Complete metadata in `src/app/layout.tsx` targeting primary keywords: *Imprimerie Tunis, Packaging de luxe Tunisie, Dorure à chaud, Boîte rigide, Our Print Agency*.
- OpenGraph and Twitter card metadata with high-resolution share preview image.
- Valid JSON-LD `LocalBusiness` schema detailing verified addresses, phone (`+216 21 808 818`), and geo-coordinates.

---

## 12. Performance Requirements

- **LCP (Largest Contentful Paint):** `< 1.8s` (Hero image marked with `priority` and responsive `sizes`).
- **CLS (Cumulative Layout Shift):** `< 0.05` (Fixed aspect ratios on all visuals; next/font system).
- **FID / INP:** `< 100ms` (Minimal main-thread blocking; lightweight event handlers).
- Clean bundle sizes: Zero heavy monolithic dependencies.

---

## 13. Security Rules

- **Zero API Key Leaks:** Never hardcode secrets or private tokens in client code or Git repository.
- **Secure Links:** All external links must include `target="_blank" rel="noopener noreferrer"`.
- **Input Sanitization:** Contact form inputs must be validated with Zod before triggering mailto/WhatsApp handlers.

---

## 14. Testing Conventions

- Validate layouts and user flows using the **Playwright MCP**:
  1. Desktop and mobile navigation toggling.
  2. Smooth anchor scrolling to each section (`#services`, `#portfolio`, `#about`, `#contact`).
  3. WhatsApp direct quotation CTA link generation.
  4. Responsive viewport screenshot inspections.
  5. Console error verification (zero runtime errors).

---

## 15. MCP Usage Protocol

- Use `shadcn` MCP to inspect registry blocks and install primitives cleanly.
- Use `context7` MCP to verify Next.js 15/16, React 19, and Motion API signatures.
- Use `playwright` MCP for responsive test execution and visual validation.
- Use `next-devtools` MCP to trace build errors and runtime diagnostics.
- Refer to `docs/MCP_SETUP.md` for specific connection parameters.

---

## 16. Available Project-Specific Skills

Before writing code in specialized domains, always invoke and follow the project skills in `.agents/skills/`:
- `glassmorphism-design` — Liquid glass, backdrop filters, and subtle lighting.
- `premium-frontend-design` — Editorial typography, asymmetric grids, and anti-template layouts.
- `animation-engineering` — GSAP ScrollTrigger and Framer Motion performance patterns.
- `nextjs-engineering` — App Router, Server Components, and Next.js optimization.
- `git-push-with-tests` — Automated type-safe build verification, WebKit/mobile Playwright smoke testing, semantic staging, and safe GitHub push.

---

## 17. Rules for Maintaining Documentation

All architectural decisions, design token modifications, and verified company credentials must be synchronously updated across:
- `docs/BRAND_RESEARCH.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/PROJECT_ARCHITECTURE.md`
- `docs/MCP_SETUP.md`
