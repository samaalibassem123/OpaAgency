export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  deliverables: string[];
  specs: {
    paperWeights: string;
    finishes: string;
    minimums?: string;
    turnaround: string;
  };
  image: string;
  accentText?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "all" | "packaging" | "finitions" | "corporate" | "signaletique";
  categoryLabel: string;
  description: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
  clientSector: string;
  materials: string[];
  finishes: string[];
  specs: string;
}

export interface QuoteFormData {
  fullName: string;
  company?: string;
  phone: string;
  email: string;
  serviceType: string;
  quantity: string;
  paperFinishPreference?: string;
  projectDetails: string;
}

export interface WhyChoosePoint {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}
