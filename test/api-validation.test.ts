import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import type { Lead } from "../lib/api-types.ts";
import {
  ApiPayloadError,
  parseDiagnosticPage,
  parseQueryAuditPage,
  parseResultPage,
  parseRunIntentResponse,
  parseRunListResponse,
  parseRunStatus,
  parseStartRunResponse,
  parseTrafficOverview,
} from "../lib/api-validation.ts";
import { lead, resultPage, runStatus, trafficEnrichment } from "./fixtures.ts";

test("validates and reconstructs full result evidence while ignoring additive fields", () => {
  const payload = structuredClone(resultPage());
  Object.assign(payload, { future_page_field: "ignored" });
  Object.assign(payload.items[0], { future_lead_field: "ignored" });
  const parsed = parseResultPage(payload);
  assert.equal(parsed.items[0].original_shop_type, "Eyewear Brand");
  assert.equal(parsed.items[0].query_score, 82.29);
  assert.equal(parsed.items[0].contact_evidence?.contactPages?.[0].decision?.sameStore, true);
  assert.equal(parsed.items[0].store_fit_evidence?.[0].evidence?.[0].textLength, 1840);
  assert.equal("future_page_field" in parsed, false);
  assert.equal("future_lead_field" in parsed.items[0], false);
});

test("malformed required or nested evidence fails the whole result page closed", () => {
  const missing = structuredClone(resultPage());
  delete (missing.items[0] as Partial<typeof missing.items[0]>).status;
  assert.throws(() => parseResultPage(missing), ApiPayloadError);

  const malformedNested = structuredClone(resultPage());
  if (malformedNested.items[0].store_fit_evidence?.[0].evidence?.[0]) {
    Object.assign(malformedNested.items[0].store_fit_evidence[0].evidence[0], { textLength: "1840" });
  }
  assert.throws(() => parseResultPage(malformedNested), /textLength/u);
});

test("traffic enrichment validates all source combinations and ignores additive fields", () => {
  const both = structuredClone(trafficEnrichment());
  Object.assign(both, { future_traffic_field: true });
  Object.assign(both.dataforseo?.worldwide ?? {}, { future_metric: 42 });
  const parsedBoth = parseResultPage(resultPage([lead({ traffic_enrichment: both })]));
  assert.equal(parsedBoth.items[0].traffic_enrichment?.dataforseo?.worldwide?.estimated_google_search_traffic, 12);
  assert.equal(parsedBoth.items[0].traffic_enrichment?.crux?.origin_metrics.metrics?.cumulative_layout_shift_p75, "0.08");
  assert.equal("future_traffic_field" in (parsedBoth.items[0].traffic_enrichment ?? {}), false);

  const dataOnly = structuredClone(trafficEnrichment());
  delete dataOnly.crux;
  dataOnly.traffic_sources = ["dataforseo"];
  dataOnly.traffic_attributions = dataOnly.traffic_attributions?.slice(0, 1);
  assert.doesNotThrow(() => parseResultPage(resultPage([lead({ traffic_enrichment: dataOnly })])));

  const cruxOnly = structuredClone(trafficEnrichment());
  delete cruxOnly.dataforseo;
  cruxOnly.traffic_sources = ["crux"];
  cruxOnly.traffic_attributions = cruxOnly.traffic_attributions?.slice(1);
  assert.doesNotThrow(() => parseResultPage(resultPage([lead({ traffic_enrichment: cruxOnly })])));
  assert.doesNotThrow(() => parseResultPage(resultPage([lead({ traffic_enrichment: undefined })])));
});

test("traffic enrichment preserves partial and no-coverage states without inventing zero", () => {
  const partial = structuredClone(trafficEnrichment());
  if (partial.crux) {
    partial.crux.state = "partial";
    partial.crux.popularity = { state: "no_coverage" };
  }
  assert.doesNotThrow(() => parseResultPage(resultPage([lead({ traffic_enrichment: partial })])));

  const noCoverage: Lead["traffic_enrichment"] = {
    version: "traffic-enrichment-public-v1",
    dataforseo: { state: "no_coverage" },
  };
  const parsed = parseResultPage(resultPage([lead({ traffic_enrichment: noCoverage })]));
  assert.deepEqual(parsed.items[0].traffic_enrichment?.dataforseo, { state: "no_coverage" });
});

test("traffic overview validates aggregate scope, metric invariants, and market ordering", () => {
  const traffic = trafficEnrichment().dataforseo!;
  const payload = {
    version: "traffic-overview-v1",
    runId: "run_abcdefghijklmnop",
    scope: { search: "fixture", matchedLeads: 3, leadsWithTraffic: 2 },
    worldwide: traffic.worldwide,
    markets: traffic.markets,
  };
  const parsed = parseTrafficOverview(payload);
  assert.equal(parsed.scope.search, "fixture");
  assert.equal(parsed.worldwide?.estimated_google_search_traffic, 12);
  assert.equal(parsed.markets[0].country_code, "IN");

  assert.throws(
    () => parseTrafficOverview({
      ...payload,
      scope: { ...payload.scope, leadsWithTraffic: 4 },
    }),
    ApiPayloadError,
  );
  assert.throws(
    () => parseTrafficOverview({
      ...payload,
      scope: { search: " fixture ", matchedLeads: 3, leadsWithTraffic: 2 },
    }),
    ApiPayloadError,
  );
  assert.throws(
    () => parseTrafficOverview({
      ...payload,
      worldwide: undefined,
      markets: [],
    }),
    ApiPayloadError,
  );
});

test("malformed consumed traffic members fail the entire result page closed", () => {
  const cases = [
    ["wrong CLS type", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.crux?.origin_metrics.metrics ?? {}, { cumulative_layout_shift_p75: 0.08 });
    }],
    ["negative traffic", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.dataforseo?.worldwide ?? {}, { organic_estimated_traffic: -1 });
    }],
    ["derived total mismatch", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.dataforseo?.worldwide ?? {}, { estimated_google_search_traffic: 99 });
    }],
    ["fraction out of range", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.crux?.popularity.observed_device_fractions ?? {}, { phone: 2 });
    }],
    ["fraction sum mismatch", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.crux?.popularity.observed_device_fractions ?? {}, {
        phone: 0.2, desktop: 0.2, tablet: 0.2,
      });
    }],
    ["noncanonical DataForSEO target", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.dataforseo) traffic.dataforseo.target = "www.fixture.example";
    }],
    ["duplicate DataForSEO market", (traffic: ReturnType<typeof trafficEnrichment>) => {
      traffic.dataforseo?.markets?.push(structuredClone(traffic.dataforseo.markets[0]));
    }],
    ["DataForSEO state scope mismatch", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.dataforseo) traffic.dataforseo.state = "available";
    }],
    ["CrUX origin path", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.crux?.origin_metrics.origin) {
        traffic.crux.origin_metrics.origin = "https://fixture.example/path";
      }
    }],
    ["different CrUX component origins", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.crux?.popularity.origin) traffic.crux.popularity.origin = "https://other.example";
    }],
    ["empty available CrUX material", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.crux?.origin_metrics) {
        traffic.crux.origin_metrics.metrics = {};
        delete traffic.crux.origin_metrics.observed_form_factor_fractions;
      }
    }],
    ["invalid CrUX month", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.crux?.popularity) traffic.crux.popularity.dataset_month = "202613";
    }],
    ["reversed collection dates", (traffic: ReturnType<typeof trafficEnrichment>) => {
      if (traffic.crux?.origin_metrics.collection_period) {
        traffic.crux.origin_metrics.collection_period.first_date = "2026-07-29";
        traffic.crux.origin_metrics.collection_period.last_date = "2026-07-01";
      }
    }],
    ["attribution mismatch", (traffic: ReturnType<typeof trafficEnrichment>) => {
      traffic.traffic_sources = ["crux", "dataforseo"];
    }],
    ["invalid nested date", (traffic: ReturnType<typeof trafficEnrichment>) => {
      Object.assign(traffic.crux?.origin_metrics.collection_period ?? {}, { first_date: "2026-02-30" });
    }],
  ] as const;
  for (const [name, mutate] of cases) {
    const traffic = structuredClone(trafficEnrichment());
    mutate(traffic);
    assert.throws(
      () => parseResultPage(resultPage([lead({ traffic_enrichment: traffic })])),
      ApiPayloadError,
      name,
    );
  }
});

test("score semantics must agree with durable v2 versions and score presence", () => {
  assert.doesNotThrow(() => parseResultPage(resultPage([
    lead({ status: "rejected", lead_score: null, score_breakdown: null, score_semantics: "not_scored_v2" }),
  ])));
  assert.throws(() => parseResultPage(resultPage([
    lead({ status: "rejected", lead_score: null, score_breakdown: null, score_semantics: "legacy_v1" }),
  ])), ApiPayloadError);
  assert.doesNotThrow(() => parseResultPage(resultPage([
    lead({ pipeline_version: null, scoring_version: null, lead_score: 71, score_breakdown: null, score_semantics: "legacy_v1" }),
  ])));
});

test("shared lead score-state matrix fails whole result pages closed", () => {
  const fixtures = JSON.parse(fs.readFileSync(
    new URL("../../contracts/lead-score-state-v2.fixtures.json", import.meta.url),
    "utf8",
  )) as {
    valid: Array<{ name: string; lead: Partial<Lead> }>;
    invalid: Array<{ name: string; lead: Partial<Lead> }>;
  };
  for (const fixture of fixtures.valid) {
    assert.doesNotThrow(
      () => parseResultPage(resultPage([lead(fixture.lead)])),
      fixture.name,
    );
  }
  for (const fixture of fixtures.invalid) {
    assert.throws(
      () => parseResultPage(resultPage([lead(fixture.lead)])),
      ApiPayloadError,
      fixture.name,
    );
  }
  assert.throws(() => parseResultPage(resultPage([lead({
    ...fixtures.valid[0].lead,
    lead_score: Number.POSITIVE_INFINITY,
  })])), ApiPayloadError);
});

test("shared v3 lead score-state matrix fails whole result pages closed", () => {
  const fixtures = JSON.parse(fs.readFileSync(
    new URL("../../contracts/lead-score-state-v3.fixtures.json", import.meta.url),
    "utf8",
  )) as {
    valid: Array<{ name: string; lead: Partial<Lead> }>;
    invalid: Array<{ name: string; lead: Partial<Lead> }>;
  };
  for (const fixture of fixtures.valid) {
    assert.doesNotThrow(
      () => parseResultPage(resultPage([lead(fixture.lead)])),
      fixture.name,
    );
  }
  for (const fixture of fixtures.invalid) {
    assert.throws(
      () => parseResultPage(resultPage([lead(fixture.lead)])),
      ApiPayloadError,
      fixture.name,
    );
  }
});

test("validates every successful response family consumed by the frontend", () => {
  const run = runStatus();
  const parsedRun = parseRunStatus(run);
  assert.equal(parsedRun.runId, run.runId);
  assert.equal(parsedRun.categories[0].originalShopType, "Independent Eyewear Brand");
  const legacyRun: Record<string, unknown> = { ...run };
  delete legacyRun.categories;
  assert.deepEqual(parseRunStatus(legacyRun).categories, []);
  assert.equal(parseRunListResponse({
    pagination: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1 },
    items: [run],
  }).items.length, 1);
  assert.equal(parseStartRunResponse({
    runId: run.runId,
    state: "queued",
    phase: "query_planning",
    stage: "queued_query_planning",
    statusUrl: `/api/runs/${run.runId}`,
    queriesUrl: `/api/runs/${run.runId}/queries`,
    resultsUrl: `/api/runs/${run.runId}/results`,
    createdAt: run.createdAt,
  }).state, "queued");
  assert.equal(parseRunIntentResponse({ intentId: "intent_fixture", expiresAt: run.createdAt }).intentId, "intent_fixture");

  const page = { runId: run.runId, pagination: { page: 1, pageSize: 10, totalItems: 1, totalPages: 1 } };
  assert.equal(parseQueryAuditPage({ ...page, items: [{
    sequence: 0, shop_type: "eyewear", business_qualifier: "brand",
    query: "frames", status: "selected", rejection_reason: null,
    details: { original_shop_type: "Eyewear Brand" },
  }] }).items[0].details && typeof parseQueryAuditPage({ ...page, items: [{
    sequence: 0, shop_type: "eyewear", business_qualifier: "brand",
    query: "frames", status: "selected", rejection_reason: null, details: {},
  }] }).items[0].details, "object");
  assert.equal(parseDiagnosticPage({ ...page, items: [{
    sequence: 0, scope: "query", code: "fixture", shop_type: null,
    business_qualifier: null, query: null, result_url: null, details: {},
  }] }).items[0].code, "fixture");
});
