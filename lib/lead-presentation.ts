import type {
  ContactabilityTier,
  Lead,
  ScoreBreakdown,
} from "@/lib/api-types";

export type ContactChannel = {
  kind: "email" | "phone" | "contact_page" | "social_profile";
  label: string;
  value: string;
  href: string | null;
};

export function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function contactChannels(lead: Lead): ContactChannel[] {
  const channels: ContactChannel[] = [];
  if (lead.email) {
    channels.push({
      kind: "email",
      label: "Email",
      value: lead.email,
      href: `mailto:${encodeURIComponent(lead.email)}`,
    });
  }
  if (lead.phone) {
    channels.push({
      kind: "phone",
      label: "Phone",
      value: lead.phone,
      href: `tel:${lead.phone.replace(/[^+\d]/gu, "")}`,
    });
  }
  const contactUrl = safeExternalUrl(lead.contact_url);
  if (contactUrl) {
    channels.push({
      kind: "contact_page",
      label: "Contact page",
      value: contactUrl,
      href: contactUrl,
    });
  }
  for (const profile of lead.social_profiles) {
    const href = safeExternalUrl(profile);
    if (href) {
      channels.push({
        kind: "social_profile",
        label: socialLabel(href),
        value: href,
        href,
      });
    }
  }
  return channels;
}

function socialLabel(value: string): string {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./u, "");
    const platform = hostname.split(".")[0];
    return platform ? `${humanizeToken(platform)} profile` : "Social profile";
  } catch {
    return "Social profile";
  }
}

export function contactabilityLabel(
  tier: ContactabilityTier | string | null,
): string {
  switch (tier) {
    case "direct":
      return "Direct outreach";
    case "indirect":
      return "Contact page only";
    case "research_only":
      return "Research only";
    case "none":
      return "No outreach method";
    default:
      return "Contactability unrecorded";
  }
}

export type ScorePresentation = {
  value: string;
  label: string;
  tone: "high" | "mid" | "low" | "neutral" | "empty";
  explanation: string;
};

export function scorePresentation(lead: Lead): ScorePresentation {
  if (lead.score_semantics === "legacy_v1") {
    return {
      value: lead.lead_score == null ? "—" : String(lead.lead_score),
      label: "Legacy v1",
      tone: "neutral",
      explanation: "Legacy score; not comparable with evidence-rank v2.",
    };
  }
  if (lead.status !== "qualified" || lead.lead_score == null) {
    return {
      value: "—",
      label: "Not scored",
      tone: "empty",
      explanation: "Rejected and failed v2 outcomes do not receive a score.",
    };
  }
  return {
    value: String(lead.lead_score),
    label: "Evidence rank v2",
    tone:
      lead.lead_score >= 75 ? "high" : lead.lead_score >= 45 ? "mid" : "low",
    explanation: "Deterministic evidence rank, not a probability.",
  };
}

export function scoreComponents(
  breakdown: ScoreBreakdown | null,
): Array<{ label: string; value: number }> {
  if (!breakdown) return [];
  const labels: Record<string, string> = {
    identity: "Store identity",
    shopifyValidation: "Shopify validation",
    categoryFit: "Category fit",
    contactEvidence: "Contact evidence",
  };
  return Object.entries(breakdown.components)
    .filter((entry): entry is [string, number] => typeof entry[1] === "number")
    .map(([key, value]) => ({ label: labels[key] ?? humanizeToken(key), value }));
}

export function humanizeToken(value: string): string {
  const words = value
    .replace(/([a-z])([A-Z])/gu, "$1 $2")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "—";
}

export function retainedExpandedLead(
  expandedLeadId: string | null,
  leads: Pick<Lead, "id">[],
): string | null {
  return expandedLeadId && leads.some(({ id }) => id === expandedLeadId)
    ? expandedLeadId
    : null;
}
