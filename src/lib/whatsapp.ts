import { QuoteFormData } from "@/types";

export const OPA_PHONE_DISPLAY = "+216 21 808 818";
export const OPA_PHONE_RAW = "21621808818";
export const OPA_EMAIL = "contact@imprimerie-opa.com";

/**
 * Builds a direct WhatsApp click-to-chat URL with a prefilled, structured quotation message.
 */
export function buildWhatsAppUrl(data?: Partial<QuoteFormData>): string {
  if (!data || !data.serviceType) {
    const defaultMsg =
      "Bonjour OPA Imprimerie,\nJe souhaite obtenir un devis pour un projet d'impression / packaging.\nMerci de me recontacter.";
    return `https://wa.me/${OPA_PHONE_RAW}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const lines: string[] = [
    "Bonjour OPA Imprimerie (*Our Print Agency*),",
    "Je souhaite obtenir un devis personnalisé :",
    "",
    `• Nom : ${data.fullName || "Non renseigné"}`,
    data.company ? `• Société : ${data.company}` : "",
    `• Téléphone : ${data.phone || "Non renseigné"}`,
    data.email ? `• Email : ${data.email}` : "",
    `• Prestation souhaitée : ${data.serviceType}`,
    data.quantity ? `• Quantité estimée : ${data.quantity}` : "",
    data.paperFinishPreference ? `• Finitions / Papiers : ${data.paperFinishPreference}` : "",
    data.projectDetails ? `• Précisions : ${data.projectDetails}` : "",
    "",
    "Merci pour votre accompagnement.",
  ].filter(Boolean);

  const fullText = lines.join("\n");
  return `https://wa.me/${OPA_PHONE_RAW}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generates an instant WhatsApp inquiry link for a specific portfolio piece or service.
 */
export function buildItemWhatsAppUrl(itemTitle: string, category: string): string {
  const text = `Bonjour OPA Imprimerie,\nJe suis très intéressé(e) par la réalisation "${itemTitle}" (${category}).\nPouvez-vous m'indiquer les spécifications techniques et options de devis pour un projet similaire ?\nMerci.`;
  return `https://wa.me/${OPA_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}
