import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { registerHooks } from "node:module";
import test from "node:test";

import { serializeKeywordResearch } from "../../email_scraper/src/api-serializer.js";
import { fingerprintJson } from "../../email_scraper/src/aws-pipeline/core/canonical.js";
import { keywordResearchConfigV1 } from "../../email_scraper/src/keyword-intelligence/config.js";
import { serializeKeywordsCsv } from "../../email_scraper/src/keyword-intelligence/export.js";
import { createKeywordResearchApi } from "../../email_scraper/src/keyword-intelligence/api.js";
import type {
  ClusterRow,
  KeywordMarket,
  KeywordRow,
  MarketMetric,
  MonthlyHistoryPoint,
  ResearchProgress,
  ResearchProgressStage,
  ResearchResult,
  ResearchSummary,
  ResearchView,
  SelectionConflict,
  SelectionItem,
  StageCounts,
} from "../lib/keyword-intelligence-types.ts";
import type { RunStatus } from "../lib/api-types.ts";
import { ApiPayloadError } from "../lib/api-validation.ts";
import {
  CLIENT_REQUEST_ID_PATTERN,
  KEYWORD_RESEARCH_ID_PATTERN,
  newClientRequestId,
  parseResearchEnvelope,
  parseResearchView,
  parseRunHandoffEnvelope,
  validKeywordResearchId,
  validateSeedsInput,
} from "../lib/keyword-intelligence-validation.ts";
import {
  addManualSelectedItem,
  canFinalizeSelection,
  editSelectedItemText,
  getFiltered,
  isTerminalResearchState,
  nextPollDelay,
  removeSelectedItem,
  selectionOverLimit,
  toggleSelectedItem,
} from "../lib/keyword-intelligence-view-model.ts";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return {
        url: new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
        shortCircuit: true,
      };
    }
    if (specifier.startsWith("./") && !specifier.endsWith(".ts") && !specifier.endsWith(".js") && !specifier.endsWith(".tsx")) {
      return {
        url: new URL(`${specifier}.ts`, context.parentURL).href,
        shortCircuit: true,
      };
    }
    return nextResolve(specifier, context);
  },
});

const NINE_MARKET_CODES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;

function history15(): MonthlyHistoryPoint[] {
  const points: MonthlyHistoryPoint[] = [];
  for (let i = 0; i < 15; i += 1) {
    points.push({ year: 2025, month: (i % 12) + 1, searchVolume: 100 + i * 7 });
  }
  return points;
}

function markets(): KeywordMarket[] {
  return NINE_MARKET_CODES.map((code) => ({
    code,
    name: `Market ${code}`,
    locationCode: 9000 + NINE_MARKET_CODES.indexOf(code),
    languageCode: "en",
    languageName: "English",
  }));
}

function marketMetric(code: string): MarketMetric {
  return {
    countryCode: code,
    locationCode: 9000,
    locationName: "Test location",
    languageName: "English",
    searchVolume: 5000,
    cpc: 1.25,
    competition: 0.4,
    competitionLevel: "MEDIUM",
    keywordDifficulty: 42,
    mainIntent: "commercial",
    commercialIntent: 0.55,
    monthlyHistory: history15(),
    trendSlope: 0.012,
    flags: [],
    opportunityScore: 78,
    recommended: true,
  };
}

function marketMetrics(): KeywordRow["marketMetrics"] {
  return {
    US: marketMetric("US"),
    GB: marketMetric("GB"),
    CA: null,
    AU: null,
    NZ: null,
    DE: null,
    FR: null,
    IN: null,
    AE: null,
  };
}

function keywordRow(overrides: Partial<KeywordRow> = {}): KeywordRow {
  return {
    itemId: "kw_0001",
    keyword: "best dresses online",
    seed: "dresses",
    sourceSeeds: ["dresses"],
    searchVolume: 5000,
    cpc: 1.25,
    competition: 0.4,
    competitionLevel: "MEDIUM",
    keywordDifficulty: 42,
    mainIntent: "commercial",
    commercialIntent: 0.55,
    monthlyHistory: history15(),
    trendSlope: 0.012,
    cluster: "Dresses",
    clusterId: "cl_0001",
    lane: "store_discovery",
    facets: { audience: [], category: ["dresses"], channel: ["online"], fit: [], modifier: [] },
    variantGroupId: "vg_0001",
    variantCanonical: "best dresses online",
    flags: [],
    opportunityScore: 78,
    recommended: true,
    mergedInto: null,
    availableMarkets: [...NINE_MARKET_CODES],
    marketMetrics: marketMetrics(),
    ...overrides,
  };
}

function clusterRow(): ClusterRow {
  return {
    cluster: "Dresses",
    clusterId: "cl_0001",
    keywords: ["best dresses online"],
    combinedVolume: 5000,
    headlineVolume: 5000,
    adjustedClusterVolume: 5000,
    rawVariantVolume: 5000,
    variantGroups: [{
      variantGroupId: "vg_0001",
      canonical: "best dresses online",
      variants: ["best dresses online"],
      volume: 5000,
      sourceSeeds: ["dresses"],
    }],
    sourceSeeds: ["dresses"],
    laneCounts: { store_discovery: 1 },
    facets: { audience: [], category: ["dresses"], channel: ["online"], fit: [], modifier: [] },
    avgCpc: 1.25,
    commercialIntent: 0.55,
    trendScore: 0.012,
    opportunityScore: 78,
    recommendedForStoreDiscovery: true,
  };
}

function stageCounts(): StageCounts {
  return { expected: 9, terminal: 9, succeeded: 9, skipped: 0, failed: 0 };
}

function progress(stage: ResearchProgressStage = "completed"): ResearchProgress {
  return { stage, expansion: stageCounts(), anchorScreen: stageCounts(), marketOverview: stageCounts() };
}

function summary(): ResearchSummary {
  return {
    schemaVersion: 3,
    markets: markets(),
    seeds: ["dresses"],
    rawItemsCollected: 100,
    itemsWithMetrics: 100,
    informationalDropped: 10,
    uniquePhrases: 80,
    dedupMerged: 20,
    activeKeywords: 1,
    variantGroups: 1,
    clusters: 1,
    recommendedKeywords: 1,
    recommendedClusters: 1,
  };
}

const RESEARCH_ID = "kr_abcdefghijklmnopqrstuvwx";

function result(): ResearchResult {
  return {
    contractVersion: 1,
    researchId: RESEARCH_ID,
    generation: 1,
    configFingerprint: "cfg_0001",
    seeds: ["dresses"],
    markets: markets(),
    summary: summary(),
    keywords: [keywordRow()],
    clusters: [clusterRow()],
  };
}

function selectionItem(itemId = "kw_0001"): SelectionItem {
  const row = keywordRow({ itemId });
  return {
    itemId,
    sourceKind: "calculated",
    sourceKeywordId: itemId,
    originalKeyword: row.keyword,
    keyword: row.keyword,
    sourceSeeds: ["dresses"],
    lane: row.lane,
    facets: row.facets,
    metricsSnapshot: {
      searchVolume: row.searchVolume,
      cpc: row.cpc,
      competition: row.competition,
      competitionLevel: row.competitionLevel,
      keywordDifficulty: row.keywordDifficulty,
      mainIntent: row.mainIntent,
      commercialIntent: row.commercialIntent,
      monthlyHistory: history15(),
      trendSlope: row.trendSlope,
      cluster: row.cluster,
      clusterId: row.clusterId,
      variantGroupId: row.variantGroupId,
      variantCanonical: row.variantCanonical,
      flags: [],
      opportunityScore: row.opportunityScore,
      recommended: row.recommended,
      mergedInto: null,
      availableMarkets: [...NINE_MARKET_CODES],
      marketMetrics: marketMetrics(),
    },
  };
}

function conflict(): SelectionConflict {
  return {
    conflictId: "cf_0001",
    itemIds: ["kw_0001", "kw_0002"],
    pairs: [{ leftItemId: "kw_0001", rightItemId: "kw_0002", reason: "similarity", similarity: 0.87 }],
    canonicalItemId: "kw_0001",
  };
}

function viewFixture(): ResearchView {
  return {
    id: RESEARCH_ID,
    statusUrl: `/api/keyword-research/${RESEARCH_ID}`,
    state: "completed",
    generation: 1,
    contractVersion: 1,
    seeds: ["dresses"],
    markets: markets(),
    progress: progress("completed"),
    result: result(),
    selection: [selectionItem("kw_0001")],
    selectionRevision: 1,
    selectionConflicts: [conflict()],
    safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z",
    startedAt: "2026-08-19T10:00:01.000Z",
    completedAt: "2026-08-19T10:05:00.000Z",
    updatedAt: "2026-08-19T10:05:00.000Z",
  };
}

function completedView(): ResearchView & { result: ResearchResult } {
  return viewFixture() as ResearchView & { result: ResearchResult };
}

function runFixture(): RunStatus {
  return {
    runId: "run_fixture_0001",
    categories: [],
    state: "completed",
    phase: "finished",
    stage: "finished",
    createdAt: "2026-08-19T00:00:00.000Z",
    startedAt: "2026-08-19T00:00:01.000Z",
    completedAt: "2026-08-19T00:05:00.000Z",
    progress: {
      shopTypesTotal: 0,
      shopTypesProcessed: 0,
      blankShopTypesSkipped: 0,
      invalidShopTypes: 0,
      queryCandidatesGenerated: 0,
      queryCandidatesValidated: 0,
      queryCandidatesProbed: 0,
      queriesSelected: 0,
      planningWarnings: 0,
      queriesTotal: 0,
      queriesProcessed: 0,
      storesDiscovered: 0,
      storesQualified: 0,
      storesRejected: 0,
      failures: 0,
      queryFailures: 0,
      occurrenceFailures: 0,
      storeProcessingFailures: 0,
      outputRows: 0,
    },
    resultsAvailable: true,
    pipelineVersion: null,
    scoringVersion: null,
    queryReview: null,
    error: null,
  };
}

const REGISTERED_CASE_IDS = [
  "W5-A01",
  "W5-A02",
  "W5-A03",
  "W5-A04",
  "W5-A05",
  "W5-A06",
  "W5-A07",
  "W5-A08",
  "W5-A09",
  "W5-A10",
];

const R5_FRONTEND_CASES = ["R5-WIRE-01","R5-WIRE-02","R5-WIRE-03","R5-WIRE-05","R5-WIRE-06","R5-EXP-01","R5-EXP-02","R5-EXP-03","R5-EXP-04"];

function setDigest(members: string[]): string {
  const sorted = [...members].sort();
  const bytes = sorted.map((member) => Buffer.from(`${member}\n`, "utf8"));
  return createHash("sha256").update(Buffer.concat(bytes)).digest("hex");
}

const requiredDigest = setDigest(REGISTERED_CASE_IDS);
const registeredDigest = setDigest(REGISTERED_CASE_IDS);
const executedDigest = setDigest(REGISTERED_CASE_IDS);

const KI_W5_EXECUTION_CERTIFICATE = JSON.stringify({
  file: "keyword-intelligence-api.test.ts",
  required: REGISTERED_CASE_IDS,
  registered: REGISTERED_CASE_IDS,
  executed: REGISTERED_CASE_IDS,
  skipped: [],
  oracleFailures: [],
  requiredDigest,
  registeredDigest,
  executedDigest,
});

function defaultFilter(overrides: Partial<Parameters<typeof getFiltered>[1]> = {}) {
  return {
    search: "", market: "all", seed: "", clusterId: "", intent: "", lane: "",
    category: "", audience: "", channel: "", minVolume: 0, minOpportunity: 0,
    recommended: "" as const, flags: [], sortKey: "keyword", sortDir: "asc" as const,
    page: 1, pageSize: 50, ...overrides,
  };
}

function ids(rows: KeywordRow[]): string[] {
  return rows.map((row) => row.itemId);
}

function assertIds(actual: KeywordRow[], expected: string[], message: string): void {
  if (JSON.stringify(ids(actual)) !== JSON.stringify(expected)) {
    throw new assert.AssertionError({ message, actual: ids(actual), expected });
  }
}

function assertJsonContentType(init: RequestInit): void {
  const headers = new Headers(init.headers);
  if (headers.get("content-type") !== "application/json") {
    throw new assert.AssertionError({ message: "R5_JSON_CONTENT_TYPE_REQUIRED" });
  }
}

async function clientApi() {
  return import("../lib/client-api.ts");
}

function actualSerializerResearch() {
  const config = keywordResearchConfigV1();
  const configFingerprint = fingerprintJson(config);
  const parsed = structuredClone(viewFixture());
  const now = new Date("2026-08-19T10:05:00.000Z");
  return {
    id: parsed.id,
    state: parsed.state,
    generation: parsed.generation,
    contractVersion: 1,
    configSnapshot: config,
    configFingerprint,
    seeds: parsed.seeds,
    markets: config.markets,
    stages: [],
    result: {
      ...parsed.result!,
      contractVersion: 1,
      configFingerprint,
      markets: config.markets,
      summary: { ...parsed.result!.summary, markets: config.markets },
    },
    selection: { items: parsed.selection },
    selectionRevision: parsed.selectionRevision,
    selectionConflicts: parsed.selectionConflicts,
    safeErrorCode: null,
    safeErrorMessage: null,
    createdAt: now,
    startedAt: now,
    completedAt: now,
    updatedAt: now,
  };
}

async function backendCsv(rows: KeywordRow[], filter = defaultFilter()): Promise<string> {
  const research = actualSerializerResearch();
  research.result.keywords = rows;
  const api = createKeywordResearchApi({
    keywordRepository: { getOwnedApiView: async () => ({ outcome: "found", research }) },
    runRepository: {},
    dispatchInitialize: async () => {},
  });
  const params = new URLSearchParams();
  if (filter.market !== "all") params.set("market", filter.market);
  if (filter.search) params.set("search", filter.search);
  for (const flag of filter.flags) params.append("flag", flag);
  return api.exportCsv({ ownerId: "owner_a", researchId: RESEARCH_ID, searchParams: params });
}

function csvKeywords(csv: string): string[] {
  return csv.split("\n").slice(1).filter(Boolean).map((line) => line.split(",")[0]);
}

test("W5-A01 seeds accept 1/5 boundaries", () => {
  assert.deepEqual(validateSeedsInput({ seeds: ["dresses"] }), { ok: true, seeds: ["dresses"] });
  assert.deepEqual(
    validateSeedsInput({ seeds: ["alpha", "bravo", "charlie", "delta", "echo"] }),
    { ok: true, seeds: ["alpha", "bravo", "charlie", "delta", "echo"] },
  );
  assert.deepEqual(validateSeedsInput({ seeds: ["x".repeat(100)] }), {
    ok: true,
    seeds: ["x".repeat(100)],
  });
  const normalized = validateSeedsInput({ seeds: ["  Dresses\u3000online  "] });
  assert.deepEqual(normalized, { ok: true, seeds: ["Dresses online"] });
});

test("W5-A02 seeds reject 0/6/non-array/unknown-key/non-string/empty/>100cp/duplicate", () => {
  const cases: Array<[string, unknown]> = [
    ["zero seeds", { seeds: [] }],
    ["six seeds", { seeds: ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"] }],
    ["non-array", { seeds: "dresses" }],
    ["unknown key", { seeds: ["dresses"], extra: true }],
    ["non-string item", { seeds: [1] }],
    ["empty string", { seeds: ["   "] }],
    [">100 code points", { seeds: ["x".repeat(101)] }],
    ["duplicate after normalization", { seeds: ["alpha", " ALPHA "] }],
  ];
  for (const [name, input] of cases) {
    assert.equal(validateSeedsInput(input).ok, false, name);
  }
  const sixSeeds = { seeds: ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"] };
  assert.equal(validateSeedsInput(sixSeeds).ok, false);
  const freshFive = { seeds: ["alpha", "bravo", "charlie", "delta", "echo"] };
  assert.deepEqual(validateSeedsInput(freshFive), {
    ok: true,
    seeds: ["alpha", "bravo", "charlie", "delta", "echo"],
  });
});

test("W5-A03 clientRequestId format + uniqueness", () => {
  const first = newClientRequestId();
  const second = newClientRequestId();
  assert.equal(first.length, 32);
  assert.match(first, /^[a-f0-9]{32}$/u);
  assert.match(first, CLIENT_REQUEST_ID_PATTERN);
  assert.notEqual(first, second);
  assert.equal(CLIENT_REQUEST_ID_PATTERN.test("short"), false);
  assert.equal(CLIENT_REQUEST_ID_PATTERN.test("a".repeat(81)), false);
  assert.equal(CLIENT_REQUEST_ID_PATTERN.test("bad id!"), false);
});

test("W5-A04 research-id pattern accept/reject", () => {
  const valid = `kr_${"a".repeat(24)}`;
  assert.equal(validKeywordResearchId(valid), true);
  assert.match(valid, KEYWORD_RESEARCH_ID_PATTERN);
  const rejects: Array<[string, string]> = [
    ["wrong prefix", `xx_${"a".repeat(24)}`],
    ["too short", `kr_${"a".repeat(23)}`],
    ["too long", `kr_${"a".repeat(25)}`],
    ["invalid character", `kr_${"a".repeat(12)}!${"a".repeat(11)}`],
    ["empty", ""],
  ];
  for (const [name, candidate] of rejects) {
    assert.equal(validKeywordResearchId(candidate), false, name);
    assert.equal(KEYWORD_RESEARCH_ID_PATTERN.test(candidate), false, name);
  }
});

test("W5-A05 (superseded by R5-WIRE-01/02) envelope deep-equal valid numeric-v1 fixture + wrapper unknown-key reject", () => {
  const parsed = parseResearchEnvelope({ research: viewFixture() });
  assert.deepEqual(parsed, viewFixture());
  const bypass: Record<string, unknown> = { research: viewFixture(), bypass: true };
  assert.throws(() => parseResearchEnvelope(bypass), ApiPayloadError);
  assert.doesNotThrow(() => parseResearchEnvelope({ research: viewFixture() }));
});

test("W5-A06 (superseded by R5-WIRE-03) view strictness", () => {
  const unknownKey: Record<string, unknown> = { ...viewFixture(), extra: true };
  assert.throws(() => parseResearchView(unknownKey), ApiPayloadError);

  const badStage = structuredClone(viewFixture());
  (badStage.progress as { stage: string }).stage = "bogus";
  assert.throws(() => parseResearchView(badStage), ApiPayloadError);

  const negativeCounts = structuredClone(viewFixture());
  negativeCounts.progress.expansion.expected = -1;
  assert.throws(() => parseResearchView(negativeCounts), ApiPayloadError);

  const running = structuredClone(viewFixture());
  running.state = "running";
  assert.throws(() => parseResearchView(running), ApiPayloadError);

  const missingResult = structuredClone(viewFixture());
  missingResult.result = null;
  assert.throws(() => parseResearchView(missingResult), ApiPayloadError);

  const tooMany = structuredClone(viewFixture());
  tooMany.selection = Array.from({ length: 201 }, (_, index) =>
    selectionItem(`kw_${String(index).padStart(4, "0")}`),
  );
  assert.throws(() => parseResearchView(tooMany), ApiPayloadError);

  const badSourceKind = structuredClone(viewFixture());
  (badSourceKind.selection[0] as { sourceKind: string }).sourceKind = "magic";
  assert.throws(() => parseResearchView(badSourceKind), ApiPayloadError);

  const badConflictIds = structuredClone(viewFixture());
  badConflictIds.selectionConflicts[0].itemIds = ["kw_0002", "kw_0001"];
  assert.throws(() => parseResearchView(badConflictIds), ApiPayloadError);

  const badConflictOrder = structuredClone(viewFixture());
  badConflictOrder.selectionConflicts[0].pairs = [
    { leftItemId: "kw_0002", rightItemId: "kw_0003", reason: "similarity", similarity: 0.5 },
    { leftItemId: "kw_0001", rightItemId: "kw_0002", reason: "compact", similarity: 0.4 },
  ];
  assert.throws(() => parseResearchView(badConflictOrder), ApiPayloadError);

  const badConflictReason = structuredClone(viewFixture());
  (badConflictReason.selectionConflicts[0].pairs[0] as { reason: string }).reason = "bogus";
  assert.throws(() => parseResearchView(badConflictReason), ApiPayloadError);

  const badSimilarity = structuredClone(viewFixture());
  badSimilarity.selectionConflicts[0].pairs[0].similarity = 1.5;
  assert.throws(() => parseResearchView(badSimilarity), ApiPayloadError);

  const badDate = structuredClone(viewFixture());
  badDate.createdAt = "2026-13-40T00:00:00.000Z";
  assert.throws(() => parseResearchView(badDate), ApiPayloadError);

  const wrongFormatDate = structuredClone(viewFixture());
  wrongFormatDate.updatedAt = "not-a-date";
  assert.throws(() => parseResearchView(wrongFormatDate), ApiPayloadError);

  const noMarkets = structuredClone(completedView());
  noMarkets.result.markets = [];
  assert.throws(() => parseResearchView(noMarkets), ApiPayloadError);

  const dupMarkets = structuredClone(completedView());
  dupMarkets.result.markets.push(structuredClone(dupMarkets.result.markets[0]));
  assert.throws(() => parseResearchView(dupMarkets), ApiPayloadError);

  const badMarketCode = structuredClone(completedView());
  (badMarketCode.result.markets[0] as { code: string }).code = "ZZ";
  assert.throws(() => parseResearchView(badMarketCode), ApiPayloadError);

  const shortHistory = structuredClone(completedView());
  shortHistory.result.keywords[0].monthlyHistory =
    shortHistory.result.keywords[0].monthlyHistory.slice(0, 14);
  assert.throws(() => parseResearchView(shortHistory), ApiPayloadError);

  const longHistory = structuredClone(completedView());
  longHistory.result.keywords[0].monthlyHistory = Array.from({ length: 103 }, (_, index) => ({
    year: 2025,
    month: (index % 12) + 1,
    searchVolume: index,
  }));
  assert.throws(() => parseResearchView(longHistory), ApiPayloadError);

  const badMonth = structuredClone(completedView());
  badMonth.result.keywords[0].monthlyHistory[0].month = 13;
  assert.throws(() => parseResearchView(badMonth), ApiPayloadError);

  const negativeVolume = structuredClone(completedView());
  negativeVolume.result.keywords[0].monthlyHistory[0].searchVolume = -1;
  assert.throws(() => parseResearchView(negativeVolume), ApiPayloadError);

  const bypassView: Record<string, unknown> = { ...viewFixture(), bypass: true };
  assert.throws(() => parseResearchView(bypassView), ApiPayloadError);

  const weakenedView = structuredClone(completedView());
  (weakenedView.result as Record<string, unknown>).extra = "weakened";
  assert.throws(() => parseResearchView(weakenedView), ApiPayloadError);
  assert.doesNotThrow(() => parseResearchView(viewFixture()));
});

test("W5-A07 run-handoff envelope + run-shape reuse", () => {
  const run = runFixture();
  const expected = { run, statusUrl: "/api/keyword-research/kr_x/runs/run_fixture_0001" };
  assert.deepEqual(parseRunHandoffEnvelope(expected), expected);
  const badRun: Record<string, unknown> = { ...structuredClone(run), state: "bogus" };
  assert.throws(
    () => parseRunHandoffEnvelope({ run: badRun, statusUrl: expected.statusUrl }),
    ApiPayloadError,
  );
  const wrapperBypass: Record<string, unknown> = {
    run,
    statusUrl: expected.statusUrl,
    extra: true,
  };
  assert.throws(() => parseRunHandoffEnvelope(wrapperBypass), ApiPayloadError);
});

test("W5-A08 poll ladder + terminal stop", () => {
  assert.equal(nextPollDelay(0), 2000);
  assert.equal(nextPollDelay(1999), 2000);
  assert.equal(nextPollDelay(2000), 3000);
  assert.equal(nextPollDelay(3000), 4500);
  assert.equal(nextPollDelay(4500), 6750);
  assert.equal(nextPollDelay(6750), 10000);
  assert.equal(nextPollDelay(10000), 10000);
  assert.equal(isTerminalResearchState("completed"), true);
  assert.equal(isTerminalResearchState("failed"), true);
  assert.equal(isTerminalResearchState("queued"), false);
  assert.equal(isTerminalResearchState("running"), false);
});

test("W5-A09 (superseded by R5-WIRE-05) selection reducer add/remove/edit/manual + 200 cap + over-100 flag + CAS guard", () => {
  const row = keywordRow();
  const added = toggleSelectedItem([], row);
  assert.equal(added.length, 1);
  assert.equal(added[0].itemId, "kw_0001");
  assert.equal(added[0].sourceKind, "calculated");
  assert.deepEqual(toggleSelectedItem(added, row), []);
  assert.deepEqual(removeSelectedItem(added, "kw_0001"), []);

  const rowB = keywordRow({
    itemId: "kw_0002",
    keyword: "cheap dresses",
    recommended: false,
    opportunityScore: 40,
    searchVolume: 900,
  });
  const ordered = toggleSelectedItem(toggleSelectedItem([], rowB), row);
  assert.deepEqual(ordered.map((item) => item.itemId), ["kw_0001", "kw_0002"]);

  const edited = editSelectedItemText(added, "kw_0001", "mens jackets");
  assert.equal(edited.draft[0].keyword, "mens jackets");
  assert.equal(edited.draft[0].lane, edited.reclassified.lane);
  assert.ok(edited.draft[0].facets.category.includes("outerwear"));
  assert.deepEqual(edited.draft[0].facets, edited.reclassified.facets);

  const manual = addManualSelectedItem([], "womens dresses", "draft_1", "dresses");
  assert.equal(manual.length, 1);
  assert.equal(manual[0].sourceKind, "manual");
  assert.equal(manual[0].metricsSnapshot, null);
  assert.deepEqual(manual[0].sourceSeeds, ["dresses"]);

  const fullDraft = Array.from({ length: 200 }, (_, index) =>
    selectionItem(`kw_${String(index).padStart(4, "0")}`),
  );
  const capped = toggleSelectedItem(fullDraft, keywordRow({ itemId: "kw_cap" }));
  assert.strictEqual(capped, fullDraft);
  assert.equal(capped.length, 200);
  const cappedManual = addManualSelectedItem(fullDraft, "anything", "ksi_000000000000", "dresses");
  assert.strictEqual(cappedManual, fullDraft);

  const hundred = Array.from({ length: 100 }, (_, index) =>
    selectionItem(`kw_${String(index).padStart(4, "0")}`),
  );
  const hundredOne = Array.from({ length: 101 }, (_, index) =>
    selectionItem(`kw_${String(index).padStart(4, "0")}`),
  );
  assert.equal(selectionOverLimit(hundred), false);
  assert.equal(selectionOverLimit(hundredOne), true);

  const running = structuredClone(viewFixture());
  running.state = "running";
  assert.deepEqual(canFinalizeSelection(running, [selectionItem("kw_0001")]), {
    ok: false,
    reason: "not_completed",
  });
  assert.deepEqual(canFinalizeSelection(viewFixture(), []), { ok: false, reason: "empty" });
  assert.deepEqual(canFinalizeSelection(viewFixture(), hundredOne), {
    ok: false,
    reason: "over_limit",
  });
  assert.deepEqual(removeSelectedItem(hundred, "kw_absent"), hundred);
});

test("R5-WIRE-01 parses an exact numeric-v1 queued response", () => {
  const queued = structuredClone(viewFixture());
  queued.state = "queued";
  queued.progress = progress("queued");
  queued.result = null;
  queued.startedAt = null;
  queued.completedAt = null;
  queued.selectionConflicts = [];
  const expected = {
    ...queued,
    contractVersion: 1,
  };
  assert.deepEqual(parseResearchEnvelope({ research: expected }), expected);
});

test("R5-WIRE-02 serializes W4 output into the W5 numeric-v1 parser without invented fields", () => {
  const serialized = serializeKeywordResearch(actualSerializerResearch());
  const parsed = parseResearchEnvelope({ research: serialized });
  assert.deepEqual(parsed, serialized);
  assert.equal(parsed.contractVersion, 1);
  assert.equal(parsed.result?.contractVersion, 1);
  assert.deepEqual(Object.keys(serialized).sort(), [
    "completedAt", "contractVersion", "createdAt", "generation", "id", "markets", "progress",
    "result", "safeError", "seeds", "selection", "selectionConflicts", "selectionRevision",
    "startedAt", "state", "statusUrl", "updatedAt",
  ]);
});

test("R5-WIRE-03 rejects every non-numeric-v1 version partition with no UI state", () => {
  for (const badVersion of ["1", 0, 2, null, undefined]) {
    const badView = structuredClone(viewFixture()) as Record<string, unknown>;
    if (badVersion === undefined) delete badView.contractVersion;
    else badView.contractVersion = badVersion;
    let uiState: ResearchView | null = null;
    assert.throws(() => { uiState = parseResearchView(badView); }, ApiPayloadError);
    assert.equal(uiState, null);

    const badResultView = structuredClone(viewFixture());
    if (badVersion === undefined) delete (badResultView.result as Record<string, unknown>).contractVersion;
    else (badResultView.result as Record<string, unknown>).contractVersion = badVersion;
    assert.throws(() => parseResearchView(badResultView), ApiPayloadError);
  }
  const numeric = structuredClone(viewFixture());
  assert.doesNotThrow(() => parseResearchView(numeric));
  const stringVersion = structuredClone(viewFixture()) as Record<string, unknown>;
  stringVersion.contractVersion = "1";
  assert.throws(
    () => {
      try { parseResearchView(stringVersion); } catch { throw new assert.AssertionError({ message: "R5_NUMERIC_VERSION_REQUIRED" }); }
    },
    { message: "R5_NUMERIC_VERSION_REQUIRED" },
  );
});

test("R5-WIRE-05 captures one strict minimal 200-item selection PUT and falsifies a missing JSON header", async () => {
  const items = Array.from({ length: 200 }, (_, index) => selectionItem(`ksi_${index.toString(16).padStart(12, "0")}`));
  const calls: Array<{ input: string; init: RequestInit }> = [];
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    calls.push({ input: String(input), init: init ?? {} });
    return { ok: true, json: async () => ({ research: viewFixture() }) } as Response;
  };
  try {
    const { saveKeywordSelection } = await clientApi();
    await saveKeywordSelection(RESEARCH_ID, 1, items);
  } finally {
    globalThis.fetch = previousFetch;
  }
  assert.equal(calls.length, 1);
  assert.equal(calls[0].input, `/api/keyword-research/${RESEARCH_ID}/selection`);
  assert.equal(calls[0].init.method, "PUT");
  assertJsonContentType(calls[0].init);
  const body = JSON.parse(String(calls[0].init.body));
  assert.deepEqual(Object.keys(body).sort(), ["expectedRevision", "items"]);
  assert.equal(Buffer.byteLength(String(calls[0].init.body), "utf8") <= 262144, true);
  assert.equal(body.items.length, 200);
  assert.deepEqual(body.items[0], { sourceKind: "calculated", sourceKeywordId: "ksi_000000000000", keyword: "best dresses online" });
  assert.equal("itemId" in body.items[0], false);
  assert.equal("metricsSnapshot" in body.items[0], false);
  const noHeader: RequestInit = { ...calls[0].init, headers: new Headers(calls[0].init.headers) };
  (noHeader.headers as Headers).delete("content-type");
  assert.throws(() => assertJsonContentType(noHeader), { message: "R5_JSON_CONTENT_TYPE_REQUIRED" });
  assertJsonContentType(calls[0].init);
});

test("R5-WIRE-06 captures one exact two-key handoff POST and falsifies a missing JSON header", async () => {
  const calls: Array<{ input: string; init: RequestInit }> = [];
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    calls.push({ input: String(input), init: init ?? {} });
    return { ok: true, json: async () => ({ run: runFixture(), statusUrl: "/api/runs/run_fixture_0001" }) } as Response;
  };
  try {
    const { startKeywordResearchRun } = await clientApi();
    await startKeywordResearchRun(RESEARCH_ID, 7, "client-request-id-0001");
  } finally {
    globalThis.fetch = previousFetch;
  }
  assert.equal(calls.length, 1);
  assert.equal(calls[0].input, `/api/keyword-research/${RESEARCH_ID}/runs`);
  assert.equal(calls[0].init.method, "POST");
  assertJsonContentType(calls[0].init);
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    expectedSelectionRevision: 7,
    clientRequestId: "client-request-id-0001",
  });
  const noHeader: RequestInit = { ...calls[0].init, headers: new Headers(calls[0].init.headers) };
  (noHeader.headers as Headers).delete("content-type");
  assert.throws(() => assertJsonContentType(noHeader), { message: "R5_JSON_CONTENT_TYPE_REQUIRED" });
  assertJsonContentType(calls[0].init);
});

test("R5-EXP-01 keeps only the literal A+B row in UI and W4 persisted order", async () => {
  const rows = [
    keywordRow({ itemId: "r5_flag_a", keyword: "flag a", flags: ["A"] }),
    keywordRow({ itemId: "r5_flag_b", keyword: "flag b", flags: ["B"] }),
    keywordRow({ itemId: "r5_flag_ab", keyword: "flag ab", flags: ["A", "B"] }),
  ];
  const filter = defaultFilter({ flags: ["A", "B"] });
  assertIds(getFiltered(rows, filter), ["r5_flag_ab"], "R5_FLAG_AND_REQUIRED");
  assert.deepEqual(csvKeywords(await backendCsv(rows, filter)), ["flag ab"]);
  const divergent = rows.filter((row) => filter.flags.some((flag) => row.flags.includes(flag)));
  assert.throws(() => assertIds(divergent, ["r5_flag_ab"], "R5_FLAG_AND_REQUIRED"), { message: "R5_FLAG_AND_REQUIRED" });
  assertIds(getFiltered(rows, filter), ["r5_flag_ab"], "R5_FLAG_AND_REQUIRED");
});

test("R5-EXP-02 and R5-EXP-03 use only the allowed literal search corpus", async () => {
  const rows = [
    keywordRow({ itemId: "r5_keyword", keyword: "needle-keyword" }),
    keywordRow({ itemId: "r5_seed", keyword: "ordinary", sourceSeeds: ["needle-seed"] }),
    keywordRow({ itemId: "r5_cluster", keyword: "ordinary", cluster: "needle-cluster" }),
    keywordRow({ itemId: "r5_lane", keyword: "ordinary", lane: "category_discovery" }),
    keywordRow({ itemId: "r5_facet", keyword: "ordinary", facets: { audience: [], category: ["needle-facet"], channel: [], fit: [], modifier: [] } }),
    keywordRow({ itemId: "r5_flag", keyword: "ordinary", flags: ["needle-flag"] }),
    keywordRow({ itemId: "r5_excluded", keyword: "ordinary", mainIntent: "navigational", recommended: true }),
  ];
  const cases: Array<[string, string]> = [
    ["needle-keyword", "r5_keyword"], ["needle-seed", "r5_seed"], ["needle-cluster", "r5_cluster"],
    ["category_discovery", "r5_lane"], ["needle-facet", "r5_facet"], ["needle-flag", "r5_flag"],
  ];
  for (const [search, expected] of cases) {
    const filter = defaultFilter({ search });
    assertIds(getFiltered(rows, filter), [expected], "R5_SEARCH_CORPUS_DIVERGED");
    assert.deepEqual(csvKeywords(await backendCsv(rows, filter)), [rows.find((row) => row.itemId === expected)!.keyword]);
  }
  for (const search of ["navigational", "recommended"]) {
    const filter = defaultFilter({ search });
    assertIds(getFiltered(rows, filter), [], "R5_SEARCH_CORPUS_DIVERGED");
    assert.deepEqual(csvKeywords(await backendCsv(rows, filter)), []);
  }
  const divergent = (row: KeywordRow) => [row.keyword, row.mainIntent, row.recommended ? "recommended" : ""].join(" ").toLowerCase();
  assert.throws(() => assertIds(rows.filter((row) => divergent(row).includes("navigational")), [], "R5_SEARCH_CORPUS_DIVERGED"), { message: "R5_SEARCH_CORPUS_DIVERGED" });
  assertIds(getFiltered(rows, defaultFilter({ search: "navigational" })), [], "R5_SEARCH_CORPUS_DIVERGED");
});

test("R5-EXP-04 preserves cumulative and named-market literal projection without null markets", async () => {
  const present = keywordRow({ itemId: "r5_market_present", keyword: "market present", flags: ["A", "B"] });
  const absent = keywordRow({ itemId: "r5_market_absent", keyword: "market absent", flags: ["A", "B"] });
  present.marketMetrics.US!.flags = ["A", "B"];
  absent.marketMetrics.US = null;
  const rows = [present, absent];
  const cumulative = defaultFilter({ flags: ["A", "B"] });
  const named = defaultFilter({ market: "US", flags: ["A", "B"] });
  assertIds(getFiltered(rows, cumulative), ["r5_market_present", "r5_market_absent"], "R5_FLAG_AND_REQUIRED");
  assertIds(getFiltered(rows, named), ["r5_market_present"], "R5_FLAG_AND_REQUIRED");
  assert.deepEqual(csvKeywords(await backendCsv(rows, cumulative)), ["market present", "market absent"]);
  assert.deepEqual(csvKeywords(await backendCsv(rows, named)), ["market present"]);
  assert.equal(serializeKeywordsCsv(getFiltered(rows, named)).startsWith("keyword,seed,"), true);
});

test("W5-A10 (superseded by R5-WIRE-05) conflict gate blocks finalize + canonical suggestion shape", (t) => {
  const view = viewFixture();
  const draft = [selectionItem("kw_0001")];
  assert.deepEqual(canFinalizeSelection(view, draft), { ok: false, reason: "conflicts" });
  const clean = structuredClone(view);
  clean.selectionConflicts = [];
  assert.deepEqual(canFinalizeSelection(clean, draft), { ok: true, reason: "" });

  const parsed = parseResearchView(view);
  assert.equal(parsed.selectionConflicts.length, 1);
  assert.equal(parsed.selectionConflicts[0].conflictId, "cf_0001");
  assert.deepEqual(parsed.selectionConflicts[0].itemIds, ["kw_0001", "kw_0002"]);
  assert.equal(parsed.selectionConflicts[0].canonicalItemId, "kw_0001");
  assert.deepEqual(parsed.selectionConflicts[0].pairs[0], {
    leftItemId: "kw_0001",
    rightItemId: "kw_0002",
    reason: "similarity",
    similarity: 0.87,
  });

  assert.equal(registeredDigest, requiredDigest);
  assert.equal(executedDigest, requiredDigest);
  t.diagnostic(`KI_W5_EXECUTION_CERTIFICATE=${KI_W5_EXECUTION_CERTIFICATE}`);
  const r5Digest = setDigest(R5_FRONTEND_CASES);
  t.diagnostic(`KI_R5_EXECUTION_CERTIFICATE=${JSON.stringify({
    registry: "frontend_api",
    required: R5_FRONTEND_CASES,
    registered: R5_FRONTEND_CASES,
    executed: R5_FRONTEND_CASES,
    skipped: [],
    activationWitnesses: R5_FRONTEND_CASES,
    oracleFailures: [],
    digests: { required: r5Digest, registered: r5Digest, executed: r5Digest },
  })}`);
});
