import type { Lead } from "@/lib/api-types";

export const CSV_HEADERS = [
  "shop_type",
  "generated_query",
  "query_score",
  "query_generation_reason",
  "search_query",
  "google_rank",
  "google_result_url",
  "myshopify_domain",
  "final_url",
  "canonical_url",
  "resolved_domain",
  "store_name",
  "email",
  "email_source_url",
  "phone",
  "phone_source_url",
  "contact_url",
  "social_profiles",
  "additional_information",
  "shopify_confidence",
  "relevance_score",
  "lead_score",
  "status",
  "rejection_reason",
  "error",
] as const;

type CsvHeader = (typeof CSV_HEADERS)[number];

function protectFormula(value: string): string {
  return /^[=+\-@]/u.test(value.trimStart()) ? `'${value}` : value;
}

function csvValue(lead: Lead, header: CsvHeader): string {
  const raw =
    header === "social_profiles"
      ? JSON.stringify(lead.social_profiles)
      : lead[header];
  if (raw == null) return "";
  return typeof raw === "number" ? String(raw) : protectFormula(String(raw));
}

function escapeCell(value: string): string {
  if (!/[",\r\n]/u.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

export function serializeLeadsToCsv(leads: Lead[]): string {
  const lines = [
    CSV_HEADERS.join(","),
    ...leads.map((lead) =>
      CSV_HEADERS.map((header) => escapeCell(csvValue(lead, header))).join(","),
    ),
  ];
  return `${lines.join("\r\n")}\r\n`;
}

export function downloadLeadsCsv(leads: Lead[], runId: string): void {
  const blob = new Blob([`\uFEFF${serializeLeadsToCsv(leads)}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `storesignal-${runId}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

