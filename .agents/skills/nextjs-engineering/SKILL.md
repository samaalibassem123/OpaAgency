---
name: nextjs-engineering
description: >-
  Senior Next.js App Router engineering guidelines for high-performance, production-grade web applications.
  Use when architecting component hierarchies, configuring Server vs Client component boundaries,
  optimizing images and fonts, configuring metadata/SEO, and maintaining strict TypeScript discipline.
---

# Next.js Architecture & Engineering: App Router & Performance Standards

This skill establishes the engineering standards, React Server Component (RSC) patterns, and optimization rules for **OPA Imprimerie**.

---

## 1. App Router & RSC Boundary Discipline

### 1.1 Server Components by Default
By default, all components in the `src/app/` tree are React Server Components. RSCs execute at build/request time, producing zero client JavaScript bundle overhead.

- **Keep Section Containers as Server Components:**
  Sections (e.g. `Hero.tsx`, `About.tsx`, `Services.tsx`) should fetch static configuration, assemble markup, and render static text and layout grids on the server.
- **Push `"use client"` to the Leaf Nodes:**
  Only attach `"use client"` to interactive islands:
  - Mobile navigation drawer toggle.
  - Interactive portfolio filter tabs.
  - Lightbox modal.
  - GSAP / Framer Motion animated wrappers.
  - Contact / quotation interactive forms.

### 1.2 Anti-Pattern: Marking Whole Pages as Client Components
```tsx
// ❌ WRONG: Leaks entire page tree into the client bundle
"use client";
export default function Page() {
  return <main><Hero /><About /><Services /></main>;
}

// ✅ CORRECT: Clean Server Component root with interactive islands inside
export default function Page() {
  return (
    <main className="min-h-screen bg-[#090A0C] text-white">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Contact />
    </main>
  );
}
```

---

## 2. Next.js Image & Font Optimization

### 2.1 Next/Image Rules
- Always use `next/image` (`<Image />`) for all content and portfolio visuals.
- Always provide explicit `width` and `height`, or use `fill` with a defined parent container (`relative overflow-hidden`).
- **Hero / LCP Optimization:** Set `priority` and `sizes="100vw"` (or corresponding responsive breakpoints) on the above-the-fold hero image to ensure zero Largest Contentful Paint (LCP) delay.
- **Below-the-Fold Images:** Rely on native lazy-loading and blur placeholders (`placeholder="blur"`).
- Provide descriptive, accessibility-compliant `alt` attributes (e.g., `"Coffret rigide de luxe avec dorure à chaud dorée pour cosmétiques par OPA Imprimerie"`).

### 2.2 Next/Font Rules
- Load typography through `next/font/google` or `next/font/local` to guarantee zero layout shift (CLS) and self-hosted privacy.
- Assign CSS variable names:
  ```ts
  import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";

  export const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
  });

  export const serif = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-serif",
    display: "swap",
  });
  ```

---

## 3. SEO, Metadata & Structured Data

### 3.1 Metadata Specification
In `src/app/layout.tsx` or `src/app/page.tsx`:
```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OPA Imprimerie | Atelier d'Impression & Packaging de Luxe à Tunis",
  description:
    "Imprimerie OPA (Our Print Agency) : Spécialiste de l'impression haut de gamme, packaging de luxe, dorure à chaud, gaufrage et supports corporate à Tunis et Ariana.",
  keywords: [
    "imprimerie tunis",
    "packaging de luxe tunisie",
    "impression offset et numérique",
    "dorure à chaud",
    "boîte rigide personnalisée",
    "cartes de visite haut de gamme",
    "our print agency",
  ],
  openGraph: {
    title: "OPA Imprimerie | L'Artisanat de l'Impression",
    description: "Solutions d'impression d'exception, packaging sur-mesure et identité visuelle.",
    url: "https://imprimerie-opa.com",
    siteName: "OPA Imprimerie",
    locale: "fr_TN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 3.2 LocalBusiness JSON-LD Schema
Inject verified company data as structured data to optimize local search rankings:
```tsx
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "OPA Imprimerie - Our Print Agency",
    "image": "https://imprimerie-opa.com/images/og-cover.jpg",
    "telephone": "+216 21 808 818",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Local L14, Résidence Marwa, Cité El Mostakbel, Rue Jbal Echaanbi",
      "addressLocality": "Ariana",
      "postalCode": "2080",
      "addressCountry": "TN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8665,
      "longitude": 10.1956
    },
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 4. Strict Quality & TypeScript Rules

- **Zero `any` Policy:** Define strict TypeScript interfaces for all section props, services, and portfolio items in `src/types/index.ts`.
- **Zero Unused Dependencies:** Never install extraneous state management libraries (Redux, Zustand) or backend ORMs for a static one-page showcase.
- **Clean Semantic Markup:** Ensure proper HTML5 document outlines (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, and strictly descending `<h1>` through `<h4>`).
