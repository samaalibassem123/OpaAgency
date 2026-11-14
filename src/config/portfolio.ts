import { PortfolioItem } from "@/types";

export const portfolioCategories = [
  { id: "all", label: "Toutes les Pièces" },
  { id: "packaging", label: "Packaging & Boîtes" },
  { id: "finitions", label: "Dorure & Gaufrage" },
  { id: "corporate", label: "Édition & Identité" },
  { id: "signaletique", label: "Signalétique" },
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "coffret-luxe-nocturne",
    title: "Coffret Parfumerie Prestige — Édition Noir d'Or",
    category: "packaging",
    categoryLabel: "Packaging de Luxe",
    description:
      "Coffret rigide habillé d'un papier teinté dans la masse noir profond, marqué à chaud d'une dorure or 24 carats et calage velours haute densité découpé au millimètre.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1200",
    aspect: "portrait",
    clientSector: "Haute Parfumerie & Cosmétique",
    materials: ["Carton compact 2.5 mm", "Papier Fedrigoni Sirio Black 130g", "Mousse EVA veloutée"],
    finishes: ["Dorure à chaud or kurzt", "Gaufrage multiniveau", "Fermeture double aimant"],
    specs: "Format : 180 × 120 × 55 mm • Tirage : 2 500 exemplaires",
  },
  {
    id: "cartes-visite-duplex-art",
    title: "Identité Exécutive — Cartes Contrecollées 700g",
    category: "finitions",
    categoryLabel: "Finitions d'Art",
    description:
      "Cartes de visite ultra-épaisses créées par contrecollage de deux papiers de création complémentaires avec foulage typographique aveugle et tranche dorée à chaud.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=85&w=1200",
    aspect: "landscape",
    clientSector: "Cabinet d'Avocats & Conseil Stratégique",
    materials: ["Conqueror Texture 350g", "Curious Skin Noir 350g (Total 700g)"],
    finishes: ["Foulage aveugle (Letterpress)", "Dorure sur tranche artisanale", "Repérage optique"],
    specs: "Format : 85 × 55 mm • Biseautage et liseré doré",
  },
  {
    id: "rapport-annuel-architectural",
    title: "Livre Annuel & Bilan RSE — Édition Architecturale",
    category: "corporate",
    categoryLabel: "Édition & Corporate",
    description:
      "Ouvrage institutionnel grand format au dos carré collé PUR avec jaquette texturée ajourée au laser, dévoilant une sous-couche dorée aux teintes chaudes.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=85&w=1200",
    aspect: "square",
    clientSector: "Groupe Financier & Promotion Immobilière",
    materials: ["Couverture Arjowiggins 320g", "Pages intérieures Condat Silk 150g"],
    finishes: ["Découpe laser micro-ajourée", "Vernis machine de protection", "Reliure PUR extra-plate"],
    specs: "148 pages intérieures quadri HD • Dos carré 14 mm",
  },
  {
    id: "etuis-cosmetiques-relief",
    title: "Ligne Sérum Végétal — Étuis Pliants à Gaufrage Micro",
    category: "packaging",
    categoryLabel: "Packaging & Boîtes",
    description:
      "Série d'étuis pliants en carton graphique blanc pur avec impression trichromie offset de très haute fidélité et gaufrage tactile simulant la texture végétale.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=85&w=1200",
    aspect: "portrait",
    clientSector: "Dermocosmétique Naturelle",
    materials: ["Carton graphique Invercote G 350g"],
    finishes: ["Gaufrage micro-texture", "Vernis mat soyeux anti-traces", "Pattes de fermeture sécurisées"],
    specs: "Série de 4 références • Traçabilité par lot & code-barres net",
  },
  {
    id: "chemises-rabats-banque",
    title: "Chemises de Présentation — Porte-Documents Prestige",
    category: "corporate",
    categoryLabel: "Édition & Corporate",
    description:
      "Chemises à rabats sur-mesure avec double rainage d'épaisseur pour dossiers volumineux, encoches cartes de visite biseautées et marquage logo en dorure or chaude.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=85&w=1200",
    aspect: "landscape",
    clientSector: "Banque Privée & Fonds d'Investissement",
    materials: ["Carton couché demi-mat 350g", "Papier teinté dans la masse"],
    finishes: ["Pelliculage soft-touch velours", "Dorure à chaud or satiné", "Double rainage 5mm"],
    specs: "Format A4+ ouvert : 440 × 305 mm • Rainage anti-craquelure",
  },
  {
    id: "enseigne-dibond-showroom",
    title: "Signalétique Architectural Showroom — Lettres Découpées",
    category: "signaletique",
    categoryLabel: "Signalétique",
    description:
      "Enseigne de façade et totem d'accueil en aluminium composite Dibond brossé, rétro-éclairage indirect LED chaud 3000K et lettrage en relief acrylique découpé au laser.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=85&w=1200",
    aspect: "landscape",
    clientSector: "Showroom Design & Siège Social",
    materials: ["Aluminium composite Dibond 3 mm", "Plexiglas diffusant 8 mm"],
    finishes: ["Fraisage CNC numérique", "Éclairage LED étanche IP67", "Finition brossée vernie"],
    specs: "Largeur totale : 3.80 m • Fixation invisible sur entretoises inox",
  },
];
