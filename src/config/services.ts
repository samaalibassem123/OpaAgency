import { ServiceItem } from "@/types";

export const servicesData: ServiceItem[] = [
  {
    id: "packaging-luxe",
    number: "01",
    title: "Packaging & Boîtes Rigides",
    kicker: "Cartonnage & Emballages de Luxe",
    description:
      "Conception et fabrication de coffrets rigides rembordés, étuis pliants cosmétiques, boîtes à fermeture magnétique et calages techniques sur-mesure. Une présence physique imposante pour vos produits.",
    deliverables: [
      "Coffrets rigides montés main avec fermeture aimantée",
      "Étuis pliants cosmétiques & parfumerie avec fenêtre",
      "Packs gastronomie & chocolaterie aux normes contact alimentaire",
      "Calages intérieurs en mousse haute densité ou carton rainé",
    ],
    specs: {
      paperWeights: "Cartons couchés 250–450g / Cartons compacts 1.5 à 3.0 mm",
      finishes: "Pelliculage Soft-Touch, Dorure 24k, Vernis UV Sélectif 3D",
      minimums: "À partir de 100 unités (prototypage disponible)",
      turnaround: "5 à 12 jours ouvrés selon façonnage",
    },
    image: "/images/service-packaging.jpg",
    accentText: "Fermoirs Aimantés • Carton 2.5mm",
  },
  {
    id: "ennoblissement-art",
    number: "02",
    title: "Dorure à Chaud & Finitions d'Art",
    kicker: "Ennoblissement & Reliefs Métalliques",
    description:
      "Marquage à chaud or, argent et cuivre sur clichés magnésium CNC, gaufrage 3D tactile multiniveau et vernis sélectif UV pour conférer à chaque support une signature prestigieuse.",
    deliverables: [
      "Dorure à chaud (Or brillant, Or mat, Cuivre, Holographique)",
      "Gaufrage 3D multiniveau & foulage aveugle de haute précision",
      "Vernis sélectif sérigraphique haute brillance ou effet goutte",
      "Formes de découpe personnalisées et micro-perforations",
    ],
    specs: {
      paperWeights: "Papiers de création 200g à 700g et cartons rigides",
      finishes: "Clichés laiton/magnésium CNC, repérage optique 0.1mm",
      minimums: "Tirage test & BAT machine disponibles",
      turnaround: "3 à 5 jours ouvrés selon clichés",
    },
    image: "/images/service-finishing.jpg",
    accentText: "Or 24k • Repérage Optique 0.1mm",
  },
  {
    id: "edition-corporate",
    number: "03",
    title: "Édition Corporate & Catalogues",
    kicker: "Impression Offset & Livres de Marque",
    description:
      "Rapports annuels d'entreprise, catalogues de collection, chemises à rabat avec encoches cartes et livres de marque avec reliures pérennes et aplats d'encre intenses.",
    deliverables: [
      "Catalogues commerciaux & brochures d'entreprise haut de gamme",
      "Chemises porte-documents à rabats simples ou doubles",
      "Rapports financiers, bilans RSE et plaquettes institutionnelles",
      "Reliure dos carré collé PUR indéchirable et piqûre métal",
    ],
    specs: {
      paperWeights: "Papiers intérieurs 90–170g / Couvertures 300–400g",
      finishes: "Pelliculage mat soyeux, Vernis acrylique de protection",
      minimums: "Dès 50 unités en numérique / Grands tirages en offset",
      turnaround: "3 à 7 jours ouvrés selon tirage",
    },
    image: "/images/service-edition.jpg",
    accentText: "Dos Carré PUR • Trame HD",
  },
  {
    id: "papeterie-prestige",
    number: "04",
    title: "Papeterie de Prestige & Identité",
    kicker: "Papiers de Création & Letterpress",
    description:
      "Cartes de visite multicouches duplex/triplex jusqu'à 700g, têtes de lettre filigranées, enveloppes personnalisées coordonnées et carnets d'art cousus pour dirigeants et marques exigeantes.",
    deliverables: [
      "Cartes de visite d'art en contrecollé épais (600–700g)",
      "Papiers à en-tête corporate compatibles impression laser & jet d'encre",
      "Enveloppes à patte gommée ou autocollante avec doublure imprimée",
      "Carnets de notes personnalisés avec tranches colorées ou dorées",
    ],
    specs: {
      paperWeights: "Sélection Fedrigoni, Conqueror, Curious Touch 120–700g",
      finishes: "Marquage à chaud, Tranches colorées, Foulage aveugle",
      minimums: "À partir de 100 exemplaires",
      turnaround: "48h à 5 jours selon finitions",
    },
    image: "/images/service-stationery.jpg",
    accentText: "Contrecollé 700g • Tranches Teintées",
  },
  {
    id: "signaletique-grand-format",
    number: "05",
    title: "Signalétique & Grand Format",
    kicker: "Impact Visuel & Impression UV Directe",
    description:
      "Enseignes lumineuses de façade, panneaux directionnels en aluminium composite Dibond, vitrophanies de boutiques, roll-ups haut de gamme et bâches grand format résistantes aux intempéries.",
    deliverables: [
      "Enseignes lumineuses LED découpées en relief & caissons rétro-éclairés",
      "Panneaux Dibond 3mm imprimés à plat UV pour devantures & galeries",
      "Habillage de vitrines : vinyle micro-perforé, sablé dépoli ou teinté masse",
      "Roll-up cassettes aluminium anodisé & bâches anti-curling dos gris",
    ],
    specs: {
      paperWeights: "Supports rigides Dibond / Plexiglas 3-10mm / Vinyle 80µ",
      finishes: "Lamination anti-UV, anti-rayures et résistance climatique",
      minimums: "Production unitaire sur-mesure ou série",
      turnaround: "4 à 8 jours ouvrés avec pose possible",
    },
    image: "/images/service-signage.jpg",
    accentText: "Alu Dibond 3mm • Encres UV",
  },
  {
    id: "textile-goodies",
    number: "06",
    title: "Textile & Objets Promotionnels",
    kicker: "Sérigraphie d'Art & Cadeaux VIP",
    description:
      "Habillage textile corporate, tote bags en coton biologique épais, coffrets cadeaux de fin d'année et objets de communication marqués avec une fidélité chromatique absolue.",
    deliverables: [
      "Sérigraphie et broderie sur polos, chemises corporate et vestes",
      "Tote bags écologiques en toile de coton lourd (280–320g/m²)",
      "Carnets de direction, stylos métalliques gravés et coffrets VIP",
      "Packaging cadeau coordonné pour événements de prestige",
    ],
    specs: {
      paperWeights: "Textiles certifiés Oeko-Tex / Objets nobles (bois, métal, cuir)",
      finishes: "Sérigraphie textile jusqu'à 6 couleurs, Gravure laser, DTF HD",
      minimums: "À partir de 50 pièces",
      turnaround: "5 à 10 jours ouvrés",
    },
    image: "/images/service-textile.jpg",
    accentText: "Coton Bio 320g • Broderie HD",
  },
];
