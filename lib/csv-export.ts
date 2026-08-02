import type { Lead, ResultPage } from "@/lib/api-types";
import { parseLead } from "./api-validation.ts";

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

const TRAFFIC_METRIC_COLUMNS = [
  "estimated_google_search_traffic",
  "organic_estimated_traffic",
  "organic_keyword_count",
  "paid_estimated_traffic",
  "paid_keyword_count",
  "featured_snippet_estimated_traffic",
  "featured_snippet_keyword_count",
  "local_pack_estimated_traffic",
  "local_pack_keyword_count",
] as const;
const DATAFORSEO_MARKETS = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;
const DATAFORSEO_HEADERS = [
  "dataforseo_state",
  "dataforseo_label",
  ...TRAFFIC_METRIC_COLUMNS.map((field) => `dataforseo_worldwide_${field}`),
  ...DATAFORSEO_MARKETS.flatMap((country) =>
    TRAFFIC_METRIC_COLUMNS.map((field) => `dataforseo_${country.toLowerCase()}_${field}`)),
  "dataforseo_observed_at",
] as const;
const CRUX_HEADERS = [
  "crux_state",
  "crux_origin_metrics_state",
  "crux_origin",
  "crux_largest_contentful_paint_p75_ms",
  "crux_interaction_to_next_paint_p75_ms",
  "crux_cumulative_layout_shift_p75",
  "crux_first_contentful_paint_p75_ms",
  "crux_time_to_first_byte_p75_ms",
  "crux_observed_desktop_fraction",
  "crux_observed_phone_fraction",
  "crux_observed_tablet_fraction",
  "crux_collection_first_date",
  "crux_collection_last_date",
  "crux_origin_metrics_observed_at",
  "crux_popularity_state",
  "crux_popularity_label",
  "crux_popularity_dataset_month",
  "crux_popularity_rank",
  "crux_popularity_band",
  "crux_popularity_phone_fraction",
  "crux_popularity_desktop_fraction",
  "crux_popularity_tablet_fraction",
  "crux_popularity_observed_at",
] as const;
const TRAFFIC_PROVENANCE_HEADERS = [
  "traffic_sources",
  "traffic_attribution_text",
  "traffic_source_urls",
  "traffic_license_urls",
  "traffic_transformations",
] as const;

type LegacyCsvHeader = (typeof CSV_HEADERS)[number];

function protectFormula(value: string): string {
  return /^[\t\r]/u.test(value) || /^\s*[=+\-@]/u.test(value) ? `'${value}` : value;
}

function trafficCsvFields(lead: Lead): Record<string, string | number | undefined> {
  const enrichment = lead.traffic_enrichment;
  if (!enrichment) return {};
  const output: Record<string, string | number | undefined> = {};
  if (enrichment.dataforseo) {
    const source = enrichment.dataforseo;
    output.dataforseo_state = source.state;
    output.dataforseo_label = source.label;
    for (const field of TRAFFIC_METRIC_COLUMNS) {
      output[`dataforseo_worldwide_${field}`] = source.worldwide?.[field];
    }
    const markets = new Map(source.markets?.map((market) => [market.country_code, market]) ?? []);
    for (const country of DATAFORSEO_MARKETS) {
      for (const field of TRAFFIC_METRIC_COLUMNS) {
        output[`dataforseo_${country.toLowerCase()}_${field}`] = markets.get(country)?.[field];
      }
    }
    output.dataforseo_observed_at = source.observed_at;
  }
  if (enrichment.crux) {
    const source = enrichment.crux;
    const origin = source.origin_metrics;
    const popularity = source.popularity;
    output.crux_state = source.state;
    output.crux_origin_metrics_state = origin.state;
    output.crux_origin = origin.origin ?? popularity.origin;
    output.crux_largest_contentful_paint_p75_ms = origin.metrics?.largest_contentful_paint_p75_ms;
    output.crux_interaction_to_next_paint_p75_ms = origin.metrics?.interaction_to_next_paint_p75_ms;
    output.crux_cumulative_layout_shift_p75 = origin.metrics?.cumulative_layout_shift_p75;
    output.crux_first_contentful_paint_p75_ms = origin.metrics?.first_contentful_paint_p75_ms;
    output.crux_time_to_first_byte_p75_ms = origin.metrics?.time_to_first_byte_p75_ms;
    output.crux_observed_desktop_fraction = origin.observed_form_factor_fractions?.desktop;
    output.crux_observed_phone_fraction = origin.observed_form_factor_fractions?.phone;
    output.crux_observed_tablet_fraction = origin.observed_form_factor_fractions?.tablet;
    output.crux_collection_first_date = origin.collection_period?.first_date;
    output.crux_collection_last_date = origin.collection_period?.last_date;
    output.crux_origin_metrics_observed_at = origin.observed_at;
    output.crux_popularity_state = popularity.state;
    output.crux_popularity_label = popularity.label;
    output.crux_popularity_dataset_month = popularity.dataset_month;
    output.crux_popularity_rank = popularity.popularity_rank;
    output.crux_popularity_band = popularity.popularity_band;
    output.crux_popularity_phone_fraction = popularity.observed_device_fractions?.phone;
    output.crux_popularity_desktop_fraction = popularity.observed_device_fractions?.desktop;
    output.crux_popularity_tablet_fraction = popularity.observed_device_fractions?.tablet;
    output.crux_popularity_observed_at = popularity.observed_at;
  }
  if (enrichment.traffic_sources?.length) {
    const attributions = enrichment.traffic_attributions ?? [];
    output.traffic_sources = enrichment.traffic_sources.join(" | ");
    output.traffic_attribution_text = attributions.map(({ text: value }) => value).join(" | ");
    output.traffic_source_urls = attributions.map(({ source_url }) => source_url).join(" | ");
    output.traffic_license_urls = attributions.flatMap(({ license_url }) => license_url ? [license_url] : []).join(" | ");
    output.traffic_transformations = attributions.flatMap(({ transformation }) => transformation ? [transformation] : []).join(" | ");
  }
  return output;
}

export function csvHeaders(leads: Lead[]): string[] {
  const hasDataForSeo = leads.some(({ traffic_enrichment }) => traffic_enrichment?.dataforseo !== undefined);
  const hasCrux = leads.some(({ traffic_enrichment }) => traffic_enrichment?.crux !== undefined);
  const hasMaterial = leads.some(({ traffic_enrichment }) =>
    Boolean(traffic_enrichment?.traffic_sources?.length));
  return [
    ...CSV_HEADERS,
    ...(hasDataForSeo ? DATAFORSEO_HEADERS : []),
    ...(hasCrux ? CRUX_HEADERS : []),
    ...(hasMaterial ? TRAFFIC_PROVENANCE_HEADERS : []),
  ];
}

function csvValue(
  lead: Lead,
  trafficFields: Record<string, string | number | undefined>,
  header: string,
): string {
  const jsonHeaders = new Set<LegacyCsvHeader>([
    "social_profiles",
    "store_fit_evidence",
    "contact_evidence",
    "identity_evidence",
    "score_breakdown",
    "discovery_occurrences",
    "matched_categories",
  ]);
  const legacyHeader = CSV_HEADERS.includes(header as LegacyCsvHeader)
    ? header as LegacyCsvHeader
    : null;
  const source = legacyHeader ? lead[legacyHeader] : trafficFields[header];
  const raw = legacyHeader && jsonHeaders.has(legacyHeader) && source != null
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
  const validated = leads.map((lead, index) => parseLead(lead, `leads[${index}]`));
  const headers = csvHeaders(validated);
  const lines = [
    headers.join(","),
    ...validated.map((lead) => {
      const trafficFields = trafficCsvFields(lead);
      return headers.map((header) =>
        escapeCell(csvValue(lead, trafficFields, header))).join(",");
    }),
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
