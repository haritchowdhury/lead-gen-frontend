import type { Lead, ResultPage } from "@/lib/api-types";
import { assertLeadScoreState } from "./api-validation.ts";

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
  "business_qualifier",
  "pipeline_version",
  "scoring_version",
  "store_fit_state",
  "store_fit_evidence",
  "contactability_tier",
  "contact_evidence",
  "identity_confidence",
  "identity_evidence",
  "score_breakdown",
  "discovery_occurrences",
  "matched_categories",
  "original_shop_type",
] as const;

type CsvHeader = (typeof CSV_HEADERS)[number];

function protectFormula(value: string): string {
  return /^[\t\r]/u.test(value) || /^\s*[=+\-@]/u.test(value) ? `'${value}` : value;
}

function csvValue(lead: Lead, header: CsvHeader): string {
  const jsonHeaders = new Set<CsvHeader>([
    "social_profiles",
    "store_fit_evidence",
    "contact_evidence",
    "identity_evidence",
    "score_breakdown",
    "discovery_occurrences",
    "matched_categories",
  ]);
  const source = lead[header];
  const raw = jsonHeaders.has(header) && source != null
    ? JSON.stringify(source)
    : source;
  if (raw == null) return "";
  return typeof raw === "number" ? String(raw) : protectFormula(String(raw));
}

function escapeCell(value: string): string {
  if (!/[",\r\n]/u.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

export function serializeLeadsToCsv(leads: Lead[]): string {
  leads.forEach((lead, index) => assertLeadScoreState(lead, `leads[${index}]`));
  const lines = [
    CSV_HEADERS.join(","),
    ...leads.map((lead) =>
      CSV_HEADERS.map((header) => escapeCell(csvValue(lead, header))).join(","),
    ),
  ];
  return `${lines.join("\r\n")}\r\n`;
}

export async function collectAllLeads(
  fetchPage: (page: number) => Promise<ResultPage>,
  onProgress?: (page: number, totalPages: number) => void,
): Promise<Lead[]> {
  const leads: Lead[] = [];
  let pageNumber = 1;
  let totalPages = 1;
  do {
    onProgress?.(pageNumber, totalPages);
    const page = await fetchPage(pageNumber);
    leads.push(...page.items);
    totalPages = page.pagination.totalPages;
    pageNumber += 1;
  } while (pageNumber <= totalPages);
  return leads;
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
