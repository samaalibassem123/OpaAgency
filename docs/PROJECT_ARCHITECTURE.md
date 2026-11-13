# OPA IMPRIMERIE — ONE-PAGE LANDING ARCHITECTURE
## Wireframe, Section Hierarchy, Component Tree & Technical Blueprint (`docs/PROJECT_ARCHITECTURE.md`)

---

## 1. Single-Page Scope & Strategy

**OPA Imprimerie** requires a singular, high-converting, world-class landing page. The goal is to establish instant commercial credibility, exhibit physical printing and packaging craftsmanship, and guide corporate decision-makers directly into a consultation or quotation request.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. NAVBAR (Floating Liquid Glass, Brand, Nav, WhatsApp CTA) │
├─────────────────────────────────────────────────────────────┤
│ 2. HERO SECTION (Editorial Headline, Tactile Visual, CTAs) │
├─────────────────────────────────────────────────────────────┤
│ 3. ABOUT ATELIER (Manifesto, In-House Precision, Ariana)    │
├─────────────────────────────────────────────────────────────┤
│ 4. PRINTING SERVICES (6 Core Pillars: Packaging, Offset...) │
├─────────────────────────────────────────────────────────────┤
│ 5. SELECTED WORKS (Editorial Portfolio & Finishing Details) │
├─────────────────────────────────────────────────────────────┤
│ 6. WHY CHOOSE OPA (Industrial Rigor, Speed, Sustainable)    │
├─────────────────────────────────────────────────────────────┤
│ 7. CONTACT & QUOTATION (WhatsApp Express + Devis Builder)   │
├─────────────────────────────────────────────────────────────┤
│ 8. FOOTER (Branding, Legal, Coordinates, Back-to-Top)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Section-by-Section Hierarchy

### 1. Navbar (`src/components/layout/Navbar.tsx`)
- **Structure:** Floating capsule pinned at `top-6` centered with `backdrop-blur-md` liquid glass.
- **Brand Element:** Clean minimalist OPA typographic wordmark + subtle *"Our Print Agency"* subtext.
- **Navigation Anchors:** `#services`, `#portfolio`, `#about`, `#contact`.
- **Conversion CTA:** Pill button linking directly to WhatsApp Business (`+216 21 808 818`) or opening the quick quotation drawer.
- **Mobile Experience:** Slide-out full-screen or drawer menu with tactile staggered links.

### 2. Hero Section (`src/components/sections/Hero.tsx`)
- **Visual Composition:** Asymmetric editorial split.
- **Left Column:**
  - Micro-badge: *"Atelier d'Impression & Packaging d'Exception — Tunis"*
  - Dominant Headline: *"L'Artisanat du Papier. La Rigueur Industrielle."*
  - Narrative: Transforming brand visions into tactile, high-impact packaging and physical media with micrometer precision.
  - Action Group: Primary CTA *"Demander un Devis"* + Secondary CTA *"Explorer les Réalisations"* + Direct WhatsApp badge.
- **Right Column:**
  - Interactive multi-layered physical print showcase: high-resolution photographic showcase of a luxury gold-foiled rigid box set against dark paper textures, with floating tactile detail chips (*"Dorure 24k"*, *"Carton 450g"*, *"Gaufrage 3D"*).
- **Motion:** GSAP headline split reveal + subtle floating parallax.

### 3. About OPA Atelier (`src/components/sections/About.tsx`)
- **Concept:** *"De l'Idée au Tirage"* (From Idea to Print).
- **Narrative:** Introduces OPA (*Our Print Agency*) under the leadership of M. Marouane Ben Younes. Highlights the physical production facilities in Ariana (Résidence Marwa) and the commercial presence in central Tunis (Rue de la Commission).
- **Tactile Metrics (Editorial Counter Cards):**
  - High-precision finishing (Magnesium dies, UV 3D, laser cutting).
  - Short-run agility & industrial volume capacity.
  - Bespoke advisory for papers, grammages, and structural folding.

### 4. Printing & Packaging Services (`src/components/sections/Services.tsx`)
- **Layout:** Architectural accordion / interactive stacked cards (avoiding generic 3-column cards).
- **The 6 Verified Pillars:**
  1. *Packaging & Boîtes Rigides:* Custom folding cartons, magnetic boxes, cosmetic & luxury retail packaging.
  2. *Édition & Imprimés Corporate:* Brochures, catalogues, chemises à rabat, rapports d'activité.
  3. *Papeterie de Prestige:* Cartes de visite texturées, papier à en-tête, carnets sur-mesure.
  4. *Signalétique & Grand Format:* Enseignes lumineuses, bâches, habillage vitrines & véhicules.
  5. *Textile & Objets Publicitaires:* Sérigraphie textile, tote bags, cadeaux d'entreprise.
  6. *Finitions Nobles & Ennoblissement:* Dorure à chaud, gaufrage en relief, vernis sélectif 3D.
- **Interactivity:** Hovering or clicking reveals technical paper weights, available die-cuts, and typical turnarounds.

### 5. Selected Works / Portfolio (`src/components/sections/Portfolio.tsx`)
- **Layout:** High-impact asymmetric gallery with alternating aspect ratios.
- **Category Filter Tabs:** *Tous*, *Packaging*, *Finitions d'Art*, *Corporate*, *Signalétique*.
- **Visual Presentation:** Large-scale imagery emphasizing light reflections on hot foil and tactile embossed shadows.
- **Interactive Lightbox:** Clicking an item opens a fullscreen detailed view with paper specifications and direct *"Demander un devis similaire"* WhatsApp trigger.

### 6. Why Choose OPA (`src/components/sections/WhyChooseUs.tsx`)
- **Editorial Proof Points:**
  - *Calibrage Colorimétrique Certifié:* High ink density and accurate Pantone matching.
  - *Atelier Intégré:* From prepress to finishing, zero subcontracting delays.
  - *Conseil Papetier Personnalisé:* Guidance on selecting the right paper textures (uncoated, soft-touch, metallic, recycled).
  - *Réactivité & Livraison:* Fast turnaround across Greater Tunis and national delivery.

### 7. Contact & Instant Quotation (`src/components/sections/Contact.tsx`)
- **Layout:** Two-column executive contact hub.
- **Left Column (Direct Connection):**
  - Direct WhatsApp button: Opens chat with `+216 21 808 818` with pre-filled message.
  - Telephone, direct email, and verified addresses in Ariana Médina and Tunis Centre.
  - Working hours and interactive location map links.
- **Right Column (Quotation Estimator / Form):**
  - Lightweight, client-side interactive form: Project Type (Packaging, Corporate, Stationery, Grand Format), Quantity, Paper / Finish preferences, and contact details.
  - Submitting formats the inquiry into a structured WhatsApp message or triggers standard `mailto:`. Zero database/backend required.

### 8. Editorial Footer (`src/components/layout/Footer.tsx`)
- **Content:** Large monochrome OPA brandmark, navigation anchor links, social links (Instagram `@imprimerie.opa`, Facebook), copyright, and discreet designer credit.

---

## 3. Component Architecture & Server/Client Boundaries

```
src/
├── app/
│   ├── layout.tsx                [SERVER COMPONENT] Root HTML, Fonts, SEO, Schema
│   ├── page.tsx                  [SERVER COMPONENT] Main page orchestrator
│   └── globals.css               Master styles & glass tokens
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            [CLIENT COMPONENT] Floating glass & mobile drawer
│   │   └── Footer.tsx            [SERVER COMPONENT] Semantic static footer
│   ├── sections/
│   │   ├── Hero.tsx              [SERVER/CLIENT] Server container + Client motion leaf
│   │   ├── About.tsx             [SERVER COMPONENT] Static editorial layout
│   │   ├── Services.tsx          [CLIENT COMPONENT] Interactive service accordion
│   │   ├── Portfolio.tsx         [CLIENT COMPONENT] Filterable gallery & lightbox
│   │   ├── WhyChooseUs.tsx       [SERVER COMPONENT] Static proof grid
│   │   └── Contact.tsx           [CLIENT COMPONENT] WhatsApp & quote form
│   ├── ui/
│   │   ├── button.tsx            [shadcn primitive]
│   │   ├── dialog.tsx            [shadcn primitive for quotation / lightbox]
│   │   └── badge.tsx             [shadcn primitive]
│   └── shared/
│       ├── SectionHeading.tsx    [SERVER COMPONENT] Reusable editorial kicker + title
│       ├── TactileNoise.tsx      [SERVER COMPONENT] SVG noise overlay
│       └── GrainCard.tsx         [CLIENT COMPONENT] Subtle glass & grain container
├── config/
│   ├── site.ts                   Company info, verified contacts, metadata
│   ├── navigation.ts             Menu anchors
│   ├── services.ts               6 verified pillars data & specs
│   └── portfolio.ts              Curated project items & photo manifests
├── lib/
│   ├── utils.ts                  Tailwind merge / clsx
│   └── whatsapp.ts               WhatsApp link generator with pre-filled message
└── types/
    └── index.ts                  Strict TypeScript interfaces
```

---

## 4. State & Interactive Flow

1. **Section Navigation:** Smooth native scroll (`scroll-smooth`) with offset compensation for the fixed floating navbar.
2. **Instant WhatsApp Engagement:**
   - Pre-formatted query string generator:
   ```ts
   export function generateWhatsAppUrl(project: string, quantity?: string) {
     const message = `Bonjour OPA Imprimerie,\nJe souhaite obtenir un devis pour : ${project}${quantity ? ` (Quantité : ${quantity})` : ''}.\nMerci de me recontacter.`;
     return `https://wa.me/21621808818?text=${encodeURIComponent(message)}`;
   }
   ```
3. **Portfolio Filtering:** Pure client-side active category state with smooth Framer Motion layout animations (`layoutId="portfolio-filter"`).

---

## 5. Execution Roadmap (Awaiting Approval)

- **Step 1:** Complete project audit & brand benchmark review with client (Current phase).
- **Step 2:** User review and formal approval of visual direction, wireframe, and architecture.
- **Step 3:** Initialize Next.js project dependencies (Next.js App Router, Tailwind CSS, shadcn/ui, GSAP, Framer Motion, Lucide).
- **Step 4:** Construct component library, layouts, and interactive sections.
- **Step 5:** Playwright end-to-end testing, responsive audits, and performance tuning.
- **Step 6:** Delivery of production-ready website.
