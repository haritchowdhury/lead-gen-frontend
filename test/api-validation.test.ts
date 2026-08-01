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
} from "../lib/api-validation.ts";
import { lead, resultPage, runStatus } from "./fixtures.ts";

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

test("validates every successful response family consumed by the frontend", () => {
  const run = runStatus();
  assert.equal(parseRunStatus(run).runId, run.runId);
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
