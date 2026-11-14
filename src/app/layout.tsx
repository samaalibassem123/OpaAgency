import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// Single unified modern sans-serif font across the entire website
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "OPA Imprimerie | Atelier d'Impression & Packaging de Luxe à Tunis",
  description:
    "Imprimerie OPA (Our Print Agency) : Manufacture de packaging de luxe, boîtes rigides, dorure à chaud, gaufrage 3D et imprimés corporate d'exception à Tunis et Ariana.",
  keywords: [
    "imprimerie tunis",
    "packaging de luxe tunisie",
    "boîte rigide sur mesure",
    "dorure à chaud tunis",
    "gaufrage relief",
    "impression offset tunisie",
    "our print agency",
    "imprimerie ariana",
    "marouane ben younes",
    "cartes de visite prestige",
    "signalétique tunis",
  ],
  authors: [{ name: "Société OPA — Our Print Agency" }],
  creator: "OPA Imprimerie",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_TN",
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: "OPA Imprimerie | L'Artisanat de Précision & la Rigueur Industrielle",
    description:
      "Manufacture de packaging de prestige, boîtes rigides, dorure à chaud et impressions corporate haute fidélité à Tunis.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1200",
        width: 1200,
        height: 630,
        alt: "OPA Imprimerie — Packaging de Luxe et Impression d'Exception",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPA Imprimerie | Packaging & Impression de Luxe",
    description:
      "Manufacture de packaging de prestige, boîtes rigides et dorure à chaud à Tunis.",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PrintShop",
  name: siteConfig.legalName,
  alternateName: "OPA Imprimerie",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/opa-logo.png`,
  image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1200",
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  founder: {
    "@type": "Person",
    name: siteConfig.leadership.name,
    jobTitle: siteConfig.leadership.title,
  },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations.production.address,
      addressLocality: "Ariana Médina",
      postalCode: "2080",
      addressRegion: "Tunis",
      addressCountry: "TN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations.commercial.address,
      addressLocality: "Tunis Centre",
      postalCode: "1002",
      addressRegion: "Tunis",
      addressCountry: "TN",
    },
  ],
  openingHours: "Mo-Fr 08:30-18:00, Sa 08:30-13:00",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services d'Impression & Packaging OPA",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Packaging de Luxe & Boîtes Rigides",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dorure à Chaud & Finitions d'Art",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Édition Corporate & Catalogues",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Papeterie de Prestige",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Signalétique & Grand Format",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 selection:bg-[#D41A78] selection:text-white overflow-x-clip font-sans">
        {/* Physical Paper Grain Texture Overlay */}
        <div className="paper-grain" aria-hidden="true" />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
