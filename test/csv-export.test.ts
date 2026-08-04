import assert from "node:assert/strict";
import test from "node:test";

import type { Lead } from "../lib/api-types.ts";
import {
  collectAllLeads,
  csvHeaders,
  CSV_HEADERS,
  serializeLeadsToCsv,
} from "../lib/csv-export.ts";
import { trafficEnrichment } from "./fixtures.ts";

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead_fixture",
    original_shop_type: null,
    shop_type: "clothing",
    generated_query: null,
    query_score: null,
    query_generation_reason: null,
    search_query: null,
    google_rank: 1,
    google_result_url: null,
    myshopify_domain: "fixture.myshopify.com",
    final_url: null,
    canonical_url: null,
    resolved_domain: "fixture.example",
    store_name: "Fixture Store",
    email: "hello@fixture.example",
    email_source_url: null,
    phone: null,
    phone_source_url: null,
    contact_url: null,
    social_profiles: ["https://instagram.com/fixture"],
    additional_information: null,
    shopify_confidence: 100,
    relevance_score: 92,
    lead_score: 96,
    status: "qualified",
    rejection_reason: null,
    error: null,
    business_qualifier: null,
    pipeline_version: null,
    scoring_version: null,
    store_fit_state: null,
    store_fit_evidence: null,
    contactability_tier: null,
    contact_evidence: null,
    identity_confidence: null,
    identity_evidence: null,
    score_breakdown: null,
    discovery_occurrences: null,
    matched_categories: null,
    score_semantics: "legacy_v1",
    ...overrides,
  };
}

test("preserves the exact 25-column legacy prefix and appends durable evidence fields", () => {
  const [header] = serializeLeadsToCsv([lead()]).split("\r\n");
  assert.equal(header, CSV_HEADERS.join(","));
  assert.equal(CSV_HEADERS.length, 39);
  assert.deepEqual(CSV_HEADERS.slice(0, 25), [
    "shop_type", "generated_query", "query_score", "query_generation_reason",
    "search_query", "google_rank", "google_result_url", "myshopify_domain",
    "final_url", "canonical_url", "resolved_domain", "store_name", "email",
    "email_source_url", "phone", "phone_source_url", "contact_url",
    "social_profiles", "additional_information", "shopify_confidence",
    "relevance_score", "lead_score", "status", "rejection_reason", "error",
  ]);
  assert.equal(CSV_HEADERS[25], "business_qualifier");
  assert.equal(CSV_HEADERS.at(-2), "matched_categories");
  assert.equal(CSV_HEADERS.at(-1), "original_shop_type");
  assert.equal(header.split(",").includes("id"), false);
});

test("serializes social profiles, nulls, commas, and quotes safely", () => {
  const csv = serializeLeadsToCsv([
    lead({
      store_name: 'Fixture, "North"\n眼鏡 café',
      phone: null,
      social_profiles: ["https://instagram.com/fixture"],
    }),
  ]);
  assert.match(csv, /"Fixture, ""North""\n眼鏡 café"/u);
  assert.match(csv, /"\[""https:\/\/instagram\.com\/fixture""\]"/u);
});

test("protects formula-like text while leaving numeric scores numeric", () => {
  const csv = serializeLeadsToCsv([
    lead({ store_name: "=HYPERLINK(\"https://bad.example\")", lead_score: 96 }),
  ]);
  assert.match(csv, /"'=HYPERLINK\(""https:\/\/bad\.example""\)"/u);
  assert.match(csv, /,96,qualified,/u);
});

test("neutralizes every spreadsheet formula prefix including tab and carriage return", () => {
  const values = ["=1+1", "+cmd", "-2+3", "@SUM(A1)", "\tformula", "\rformula", "  =trimmed"];
  const csv = serializeLeadsToCsv(values.map((value, index) => lead({
    id: `lead_${index}`,
    store_name: value,
    lead_score: index,
  })));
  for (const value of values) {
    assert.equal(csv.includes(`'${value}`), true, `missing protection for ${JSON.stringify(value)}`);
  }
  assert.match(csv, /,0,qualified,/u);
});

test("serializes every structured G3 field into one append-only cell", () => {
  const csv = serializeLeadsToCsv([lead({
    business_qualifier: "brand",
    pipeline_version: 2,
    scoring_version: 2,
    store_fit_state: "specialist",
    store_fit_evidence: [{ state: "specialist", score: 100 }],
    contactability_tier: "direct",
    contact_evidence: { emails: [{
      kind: "email",
      value: "hello@fixture.example",
      sourceUrl: "https://fixture.example/pages/contact",
      method: "mailto",
      confidence: 100,
      validationReason: "valid",
    }] },
    identity_confidence: 70,
    identity_evidence: { stableHostname: "fixture.myshopify.com" },
    lead_score: 96,
    score_breakdown: {
      version: 2,
      components: { identity: 20, shopifyValidation: 25, categoryFit: 30, contactEvidence: 21 },
      total: 96,
      semantics: "deterministic_evidence_rank_not_probability",
    },
    score_semantics: "evidence_rank_v2",
    discovery_occurrences: [{ query: "eyewear brand", rank: 1 }],
    matched_categories: [{ shopType: "eyewear", businessQualifier: "brand" }],
    original_shop_type: "Eyewear Brand",
  })]);
  assert.match(csv, /"\[\{""state"":""specialist"",""score"":100\}\]"/u);
  assert.match(csv, /"\{""stableHostname"":""fixture\.myshopify\.com""\}"/u);
  assert.match(csv, /"\[\{""query"":""eyewear brand"",""rank"":1\}\]"/u);
  assert.match(csv, /,Eyewear Brand\r\n/u);
});

test("complete export retrieves every page once and preserves backend order", async () => {
  const requested: number[] = [];
  const progress: Array<[number, number]> = [];
  const leads = await collectAllLeads(async (page) => {
    requested.push(page);
    return {
      runId: "run_abcdefghijklmnop",
      summary: { total: 3, qualified: 3, rejected: 0, failed: 0 },
      pagination: { page, pageSize: 1, totalItems: 3, totalPages: 3 },
      items: [lead({ id: `lead_${page}`, google_rank: page })],
    };
  }, (page, totalPages) => progress.push([page, totalPages]));
  assert.deepEqual(requested, [1, 2, 3]);
  assert.deepEqual(leads.map(({ id }) => id), ["lead_1", "lead_2", "lead_3"]);
  assert.deepEqual(progress, [[1, 1], [2, 3], [3, 3]]);
});

test("frontend CSV export rejects contradictory v2 score states", () => {
  assert.throws(() => serializeLeadsToCsv([lead({
    status: "rejected",
    pipeline_version: 2,
    scoring_version: 2,
    lead_score: 72,
    score_breakdown: {
      version: 2,
      components: { identity: 14, shopifyValidation: 20, categoryFit: 24, contactEvidence: 14 },
      total: 72,
      semantics: "deterministic_evidence_rank_not_probability",
    },
    score_semantics: "evidence_rank_v2",
  })]), /score_state/u);
});

function parseCsvRow(row: string): string[] {
  const fields: string[] = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    if (character === '"') {
      if (quoted && row[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(field);
      field = "";
    } else {
      field += character;
    }
  }
  fields.push(field);
  return fields;
}

test("traffic CSV headers follow enabled source members and material attribution", () => {
  assert.deepEqual(csvHeaders([lead()]), [...CSV_HEADERS]);

  const dataNoCoverage = lead({
    traffic_enrichment: {
      version: "traffic-enrichment-public-v1",
      dataforseo: { state: "no_coverage" },
    },
  });
  const dataHeaders = csvHeaders([dataNoCoverage]);
  assert.equal(dataHeaders.slice(0, CSV_HEADERS.length).join(","), CSV_HEADERS.join(","));
  assert.equal(dataHeaders.includes("dataforseo_state"), true);
  assert.equal(dataHeaders.includes("dataforseo_in_estimated_google_search_traffic"), true);
  assert.equal(dataHeaders.some((header) => header.startsWith("crux_")), false);
  assert.equal(dataHeaders.includes("traffic_attribution_text"), false);

  const cruxOnly = trafficEnrichment();
  delete cruxOnly.dataforseo;
  cruxOnly.traffic_sources = ["crux"];
  cruxOnly.traffic_attributions = cruxOnly.traffic_attributions?.slice(1);
  const cruxHeaders = csvHeaders([lead(), lead({ traffic_enrichment: cruxOnly })]);
  assert.equal(cruxHeaders.includes("crux_state"), true);
  assert.equal(cruxHeaders.some((header) => header.startsWith("dataforseo_")), false);
  assert.equal(cruxHeaders.includes("traffic_attribution_text"), true);

  const bothHeaders = csvHeaders([lead({ traffic_enrichment: trafficEnrichment() })]);
  assert.equal(bothHeaders.includes("dataforseo_state"), true);
  assert.equal(bothHeaders.includes("crux_state"), true);
  assert.equal(bothHeaders.includes("traffic_license_urls"), true);
  assert.equal(bothHeaders.indexOf("dataforseo_state") < bothHeaders.indexOf("crux_state"), true);
  assert.equal(bothHeaders.indexOf("crux_state") < bothHeaders.indexOf("traffic_sources"), true);
});

test("traffic CSV flattens every source, retains zero, and protects attribution formulas", () => {
  const traffic = trafficEnrichment();
  if (traffic.traffic_attributions?.[0]) {
    traffic.traffic_attributions[0].text = "=DataForSEO attribution";
  }
  const csv = serializeLeadsToCsv([lead({ traffic_enrichment: traffic })]);
  const [headerRow, valueRow] = csv.trimEnd().split("\r\n");
  const headers = parseCsvRow(headerRow);
  const values = parseCsvRow(valueRow);
  const row = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  assert.equal(row.dataforseo_label, "Estimated Google search traffic");
  assert.equal(row.dataforseo_worldwide_estimated_google_search_traffic, "12");
  assert.equal(row.dataforseo_in_estimated_google_search_traffic, "4");
  assert.equal(row.dataforseo_in_paid_estimated_traffic, "0");
  assert.equal(row.dataforseo_us_estimated_google_search_traffic, "");
  assert.equal(row.crux_largest_contentful_paint_p75_ms, "2400");
  assert.equal(row.crux_cumulative_layout_shift_p75, "0.08");
  assert.equal(row.crux_popularity_band, "top_100000");
  assert.equal(row.traffic_sources, "dataforseo | crux");
  assert.match(row.traffic_attribution_text, /^'=DataForSEO attribution/u);
  assert.match(row.traffic_license_urls, /creativecommons/u);
  assert.equal(values.includes("[object Object]"), false);
  assert.equal(values.some((value) => value.includes("traffic-enrichment-public-v1")), false);
});

test("traffic CSV rejects malformed nested material before producing output", () => {
  const traffic = trafficEnrichment();
  Object.assign(traffic.crux?.origin_metrics.metrics ?? {}, {
    cumulative_layout_shift_p75: 0.08,
  });
  assert.throws(
    () => serializeLeadsToCsv([lead({ traffic_enrichment: traffic })]),
    /cumulative_layout_shift_p75/u,
  );

  const invalidFractions = trafficEnrichment();
  if (invalidFractions.crux?.popularity.observed_device_fractions) {
    invalidFractions.crux.popularity.observed_device_fractions = {
      phone: 1,
      desktop: 1,
      tablet: 1,
    };
  }
  assert.throws(
    () => serializeLeadsToCsv([lead({ traffic_enrichment: invalidFractions })]),
    /observed_device_fractions/u,
  );
});
