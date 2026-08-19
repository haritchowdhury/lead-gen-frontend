import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import type {
  ClusterRow,
  KeywordLane,
  KeywordMainIntent,
  KeywordMarket,
  KeywordRow,
  MarketMetric,
  MonthlyHistoryPoint,
  ResearchProgress,
  ResearchProgressStage,
  ResearchResult,
  ResearchSummary,
  ResearchView,
  SelectionItem,
  StageCounts,
} from "../lib/keyword-intelligence-types.ts";
import {
  EXPORT_CSV_COLUMNS,
  KEYWORD_THEME_STORAGE_KEY,
  activeRows,
  addManualSelectedItem,
  adjustedVolume,
  aggregateByCluster,
  buildExportQuery,
  canFinalizeSelection,
  cumulativeVolume,
  currentClusterMetric,
  currentSummary,
  dashboardPhase,
  discoveryLane,
  distinctKeywordRows,
  emptyKeywordFilterState,
  filterOptionSources,
  fmtCpc,
  fmtNum,
  fmtPct,
  fmtSlope,
  getFiltered,
  laneLabel,
  median,
  metricFingerprint,
  nextTheme,
  paginate,
  projectMarketRow,
  removeSelectedItem,
  selectionDraftFromView,
  selectionOverLimit,
  sortKeywordRows,
  toggleSelectedItem,
} from "../lib/keyword-intelligence-view-model.ts";
import type { KeywordFilterState } from "../lib/keyword-intelligence-view-model.ts";

const NINE_MARKET_CODES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;

const LANES: KeywordLane[] = ["store_discovery", "local_discovery", "brand_competitor", "category_discovery"];
const INTENTS: KeywordMainIntent[] = ["commercial", "transactional", "navigational", "informational"];

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

function nullMarketMetrics(): KeywordRow["marketMetrics"] {
  return { US: null, GB: null, CA: null, AU: null, NZ: null, DE: null, FR: null, IN: null, AE: null };
}

function marketMetric(overrides: Partial<MarketMetric> = {}): MarketMetric {
  return {
    countryCode: "US",
    locationCode: 2840,
    locationName: "United States",
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
    ...overrides,
  };
}

function usMetric(overrides: Partial<MarketMetric> = {}): MarketMetric {
  return marketMetric({
    countryCode: "US",
    locationCode: 2840,
    locationName: "United States",
    languageName: "English",
    ...overrides,
  });
}

function gbMetric(overrides: Partial<MarketMetric> = {}): MarketMetric {
  return marketMetric({
    countryCode: "GB",
    locationCode: 2826,
    locationName: "United Kingdom",
    languageName: "English",
    ...overrides,
  });
}

function row(overrides: Partial<KeywordRow> = {}): KeywordRow {
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
    clusterId: "cl_dresses",
    lane: "store_discovery",
    facets: { audience: [], category: ["dresses"], channel: ["online"], fit: [], modifier: [] },
    variantGroupId: "vg_1",
    variantCanonical: "best dresses online",
    flags: ["high_opportunity"],
    opportunityScore: 78,
    recommended: true,
    mergedInto: null,
    availableMarkets: [...NINE_MARKET_CODES],
    marketMetrics: nullMarketMetrics(),
    ...overrides,
  };
}

const r1 = row({
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
  trendSlope: 0.012,
  cluster: "Dresses",
  clusterId: "cl_dresses",
  lane: "store_discovery",
  facets: { audience: [], category: ["dresses"], channel: ["online"], fit: [], modifier: [] },
  flags: ["high_opportunity"],
  opportunityScore: 78,
  recommended: true,
  marketMetrics: {
    ...nullMarketMetrics(),
    US: usMetric({ searchVolume: 5200, cpc: 1.3, competition: 0.42, keywordDifficulty: 44, commercialIntent: 0.56, trendSlope: 0.014, flags: ["high_opportunity"], opportunityScore: 80 }),
    GB: gbMetric({ searchVolume: 4800, cpc: 1.1, competition: 0.38, keywordDifficulty: 40, commercialIntent: 0.52, trendSlope: 0.011, flags: ["high_opportunity"], opportunityScore: 74 }),
  },
});

const r2 = row({
  itemId: "kw_0002",
  keyword: "cheap dresses near me",
  seed: "dresses",
  sourceSeeds: ["dresses"],
  searchVolume: 1200,
  cpc: 0.75,
  competition: 0.2,
  competitionLevel: "LOW",
  keywordDifficulty: 20,
  mainIntent: "transactional",
  commercialIntent: 0.35,
  trendSlope: -0.004,
  cluster: "Dresses",
  clusterId: "cl_dresses",
  lane: "local_discovery",
  facets: { audience: [], category: ["dresses"], channel: ["local"], fit: [], modifier: ["affordable"] },
  flags: ["low_competition"],
  opportunityScore: 45,
  recommended: false,
  marketMetrics: {
    ...nullMarketMetrics(),
    US: usMetric({ searchVolume: 1000, cpc: 0.7, competition: 0.18, competitionLevel: "LOW", keywordDifficulty: 18, mainIntent: "transactional", commercialIntent: 0.32, trendSlope: -0.003, flags: [], opportunityScore: 40, recommended: false }),
  },
});

const r3 = row({
  itemId: "kw_0003",
  keyword: "nike sneakers",
  seed: "brands",
  sourceSeeds: ["brands"],
  searchVolume: 8800,
  cpc: 3.5,
  competition: 0.9,
  competitionLevel: "HIGH",
  keywordDifficulty: 85,
  mainIntent: "navigational",
  commercialIntent: 0.8,
  trendSlope: 0.01,
  cluster: "Brands",
  clusterId: "cl_brands",
  lane: "brand_competitor",
  facets: { audience: [], category: [], channel: [], fit: [], modifier: [] },
  flags: [],
  opportunityScore: 90,
  recommended: true,
  marketMetrics: nullMarketMetrics(),
});

const r4 = row({
  itemId: "kw_0004",
  keyword: "winter jackets for men",
  seed: "jackets",
  sourceSeeds: ["jackets"],
  searchVolume: 2400,
  cpc: 2.1,
  competition: 0.5,
  competitionLevel: "MEDIUM",
  keywordDifficulty: 60,
  mainIntent: "informational",
  commercialIntent: 0.4,
  trendSlope: 0.008,
  cluster: "Outerwear",
  clusterId: "cl_outer",
  lane: "category_discovery",
  facets: { audience: ["men"], category: ["outerwear"], channel: [], fit: [], modifier: [] },
  flags: ["seasonal"],
  opportunityScore: 55,
  recommended: false,
  marketMetrics: {
    ...nullMarketMetrics(),
    US: usMetric({ searchVolume: 2100, cpc: 1.9, competition: 0.48, keywordDifficulty: 58, mainIntent: "informational", commercialIntent: 0.38, trendSlope: 0.006, flags: ["seasonal"], opportunityScore: 50, recommended: false }),
  },
});

const r5 = row({
  itemId: "kw_0005",
  keyword: "women jackets online store",
  seed: "jackets",
  sourceSeeds: ["jackets"],
  searchVolume: 3200,
  cpc: 2.05,
  competition: 0.7,
  competitionLevel: "HIGH",
  keywordDifficulty: 62,
  mainIntent: "commercial",
  commercialIntent: 0.6,
  trendSlope: 0.02,
  cluster: "Outerwear",
  clusterId: "cl_outer",
  lane: "store_discovery",
  facets: { audience: ["women"], category: ["outerwear"], channel: ["online", "store"], fit: [], modifier: [] },
  flags: ["rising"],
  opportunityScore: 82,
  recommended: true,
  marketMetrics: {
    ...nullMarketMetrics(),
    US: usMetric({ searchVolume: 3500, cpc: 2.2, competition: 0.72, keywordDifficulty: 64, commercialIntent: 0.62, trendSlope: 0.022, flags: ["rising"], opportunityScore: 85 }),
    GB: gbMetric({ searchVolume: 2900, cpc: 1.95, competition: 0.68, keywordDifficulty: 60, commercialIntent: 0.58, trendSlope: 0.019, flags: ["rising"], opportunityScore: 80 }),
  },
});

const r6 = row({
  itemId: "kw_0006",
  keyword: "local boutiques near me",
  seed: "boutique",
  sourceSeeds: ["boutique"],
  searchVolume: 800,
  cpc: 0.5,
  competition: 0.1,
  competitionLevel: "LOW",
  keywordDifficulty: 12,
  mainIntent: "transactional",
  commercialIntent: 0.25,
  trendSlope: -0.002,
  cluster: "Boutiques",
  clusterId: "cl_boutiques",
  lane: "local_discovery",
  facets: { audience: [], category: [], channel: ["local"], fit: [], modifier: [] },
  flags: [],
  opportunityScore: 30,
  recommended: false,
  marketMetrics: nullMarketMetrics(),
});

const FIXTURE_ROWS = [r1, r2, r3, r4, r5, r6];

function clusterRow(): ClusterRow {
  return {
    cluster: "Outerwear",
    clusterId: "cl_outer",
    keywords: ["winter jackets for men", "women jackets online store"],
    combinedVolume: 5600,
    headlineVolume: 3200,
    adjustedClusterVolume: 5600,
    rawVariantVolume: 5600,
    variantGroups: [
      {
        variantGroupId: "vg_1",
        canonical: "winter jackets for men",
        variants: ["winter jackets for men"],
        volume: 2400,
        sourceSeeds: ["jackets"],
      },
      {
        variantGroupId: "vg_2",
        canonical: "women jackets online store",
        variants: ["women jackets online store"],
        volume: 3200,
        sourceSeeds: ["jackets"],
      },
    ],
    sourceSeeds: ["jackets"],
    laneCounts: { category_discovery: 1, store_discovery: 1 },
    facets: { audience: ["men", "women"], category: ["outerwear"], channel: ["online", "store"], fit: [], modifier: [] },
    avgCpc: 2.075,
    commercialIntent: 0.5,
    trendScore: 0.014,
    opportunityScore: 68.5,
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
    seeds: ["dresses", "brands", "jackets", "boutique"],
    rawItemsCollected: 6,
    itemsWithMetrics: 6,
    informationalDropped: 0,
    uniquePhrases: 6,
    dedupMerged: 0,
    activeKeywords: 6,
    variantGroups: 6,
    clusters: 4,
    recommendedKeywords: 3,
    recommendedClusters: 2,
  };
}

const RESEARCH_ID = "kr_abcdefghijklmnopqrstuvwx";

function result(): ResearchResult {
  return {
    contractVersion: "ki-research-v1",
    researchId: RESEARCH_ID,
    generation: 1,
    configFingerprint: "cfg_0001",
    seeds: ["dresses", "brands", "jackets", "boutique"],
    markets: markets(),
    summary: summary(),
    keywords: [...FIXTURE_ROWS],
    clusters: [clusterRow()],
  };
}

function selectionItem(itemId: string): SelectionItem {
  const source = FIXTURE_ROWS.find((r) => r.itemId === itemId) ?? r1;
  return {
    itemId: source.itemId,
    sourceKind: "calculated",
    sourceKeywordId: source.itemId,
    originalKeyword: source.keyword,
    keyword: source.keyword,
    sourceSeeds: [...source.sourceSeeds],
    lane: source.lane,
    facets: {
      audience: [...source.facets.audience],
      category: [...source.facets.category],
      channel: [...source.facets.channel],
      fit: [...source.facets.fit],
      modifier: [...source.facets.modifier],
    },
    metricsSnapshot: {
      searchVolume: source.searchVolume,
      cpc: source.cpc,
      competition: source.competition,
      competitionLevel: source.competitionLevel,
      keywordDifficulty: source.keywordDifficulty,
      mainIntent: source.mainIntent,
      commercialIntent: source.commercialIntent,
      monthlyHistory: history15(),
      trendSlope: source.trendSlope,
      cluster: source.cluster,
      clusterId: source.clusterId,
      variantGroupId: source.variantGroupId,
      variantCanonical: source.variantCanonical,
      flags: [...source.flags],
      opportunityScore: source.opportunityScore,
      recommended: source.recommended,
      mergedInto: source.mergedInto,
      availableMarkets: [...source.availableMarkets],
      marketMetrics: { ...source.marketMetrics },
    },
  };
}

function viewFixture(): ResearchView {
  return {
    id: RESEARCH_ID,
    statusUrl: `/api/keyword-research/${RESEARCH_ID}`,
    state: "completed",
    generation: 1,
    contractVersion: "ki-research-v1",
    seeds: ["dresses", "brands", "jackets", "boutique"],
    markets: markets(),
    progress: progress("completed"),
    result: result(),
    selection: [selectionItem("kw_0001"), selectionItem("kw_0005")],
    selectionRevision: 1,
    selectionConflicts: [],
    safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z",
    startedAt: "2026-08-19T10:00:01.000Z",
    completedAt: "2026-08-19T10:05:00.000Z",
    updatedAt: "2026-08-19T10:05:00.000Z",
  };
}

function ids(rows: KeywordRow[]): string[] {
  return rows.map((r) => r.itemId);
}

function rowsResult(rows: KeywordRow[]): ResearchResult {
  return { ...result(), keywords: rows };
}

function fstate(partial: Partial<KeywordFilterState> = {}): KeywordFilterState {
  return { ...emptyKeywordFilterState(), ...partial };
}

const REGISTERED_CASE_IDS = [
  "W5-C01",
  "W5-C02",
  "W5-C03",
  "W5-C04",
  "W5-C05",
  "W5-C06",
  "W5-C07",
  "W5-C08",
  "W5-C09",
  "W5-C10",
  "W5-C11",
  "W5-C12",
];

function setDigest(members: string[]): string {
  const sorted = [...members].sort();
  const bytes = sorted.map((member) => Buffer.from(`${member}\n`, "utf8"));
  return createHash("sha256").update(Buffer.concat(bytes)).digest("hex");
}

const requiredDigest = setDigest(REGISTERED_CASE_IDS);
const registeredDigest = setDigest(REGISTERED_CASE_IDS);
const executedDigest = setDigest(REGISTERED_CASE_IDS);

const KI_W5_EXECUTION_CERTIFICATE = JSON.stringify({
  file: "keyword-intelligence-components.test.ts",
  required: REGISTERED_CASE_IDS,
  registered: REGISTERED_CASE_IDS,
  executed: REGISTERED_CASE_IDS,
  skipped: [],
  oracleFailures: [],
  requiredDigest,
  registeredDigest,
  executedDigest,
});

test("W5-C01 activeRows/distinctKeywordRows", () => {
  const a1 = row({ itemId: "kw_a1", keyword: "alpha", searchVolume: 100, mergedInto: null });
  const a2 = row({ itemId: "kw_a2", keyword: "Alpha", searchVolume: 200, mergedInto: null });
  const a3 = row({ itemId: "kw_a3", keyword: "alpha", searchVolume: 150, mergedInto: "kw_a1" });
  const b1 = row({ itemId: "kw_b1", keyword: "beta", searchVolume: 50, mergedInto: null });

  assert.deepEqual(ids(activeRows(rowsResult([a1, a2, a3, b1]))), ["kw_a1", "kw_a2", "kw_b1"]);
  assert.deepEqual(ids(distinctKeywordRows([a1, a2, a3, b1])), ["kw_a2", "kw_b1"]);

  const e1 = row({ itemId: "kw_e1", keyword: "beta", searchVolume: 500, mergedInto: "kw_ex" });
  const e2 = row({ itemId: "kw_e2", keyword: "beta", searchVolume: 100, mergedInto: null });
  assert.deepEqual(ids(distinctKeywordRows([e1, e2])), ["kw_e2"]);

  const g1 = row({ itemId: "kw_g1", keyword: "gamma", mergedInto: null });
  const g2 = row({ itemId: "kw_g2", keyword: "gamma", mergedInto: "kw_g1" });
  assert.deepEqual(ids(activeRows(rowsResult([g1, g2]))), ["kw_g1"]);
});

test("W5-C02 market projection + selection invariant", () => {
  assert.strictEqual(projectMarketRow(r1, "all"), r1);

  const us = projectMarketRow(r1, "US");
  assert.equal(us.itemId, "kw_0001");
  assert.equal(us.keyword, "best dresses online");
  assert.equal(us.searchVolume, 5200);
  assert.equal(us.cpc, 1.3);
  assert.equal(us.competition, 0.42);
  assert.equal(us.keywordDifficulty, 44);
  assert.equal(us.commercialIntent, 0.56);
  assert.equal(us.trendSlope, 0.014);
  assert.equal(us.opportunityScore, 80);
  assert.equal(us.recommended, true);
  assert.deepEqual(us.flags, ["high_opportunity"]);
  assert.deepEqual(us.monthlyHistory, history15());
  assert.equal((us as KeywordRow & { _marketMissing: boolean })._marketMissing, false);

  const gb = projectMarketRow(r1, "GB");
  assert.equal(gb.searchVolume, 4800);
  assert.equal(gb.cpc, 1.1);

  const absent = projectMarketRow(r3, "US") as KeywordRow & { _marketMissing: boolean };
  assert.equal(absent._marketMissing, true);
  assert.equal(absent.searchVolume, null);
  assert.equal(absent.mainIntent, null);
  assert.equal(absent.recommended, false);
  assert.deepEqual(absent.flags, []);
  assert.equal(absent.itemId, "kw_0003");

  const invariantOracle = (project: (r: KeywordRow, m: string) => KeywordRow): boolean => {
    const rows = [...FIXTURE_ROWS];
    const allIds = rows.map((r) => project(r, "all").itemId).sort();
    const usIds = rows.map((r) => project(r, "US").itemId).sort();
    assert.deepEqual(usIds, allIds);
    const draft = selectionDraftFromView(viewFixture());
    const draftIds = draft.map((i) => i.itemId).sort();
    for (const id of draftIds) {
      assert.ok(usIds.includes(id), `selection item ${id} survives the market switch`);
    }
    return true;
  };
  assert.equal(invariantOracle(projectMarketRow), true);

  const perMarketSelectionReintroduce = (r: KeywordRow, m: string): KeywordRow =>
    m === "all" ? projectMarketRow(r, m) : { ...projectMarketRow(r, m), itemId: `${m}:${r.itemId}` };
  assert.throws(() => invariantOracle(perMarketSelectionReintroduce));
  assert.equal(invariantOracle(projectMarketRow), true);

  const staleGuardOracle = (apply: (v: ResearchView, expectedRevision: number, draft: SelectionItem[]) => ResearchView): boolean => {
    const view = viewFixture();
    const draft = [selectionItem("kw_0001")];
    const applied = apply(view, view.selectionRevision + 1, draft);
    assert.deepEqual(applied.selection, view.selection, "stale save must not overwrite");
    return true;
  };
  const applySaveWithGuard = (v: ResearchView, expectedRevision: number, draft: SelectionItem[]): ResearchView =>
    expectedRevision === v.selectionRevision
      ? { ...v, selection: draft, selectionRevision: v.selectionRevision + 1 }
      : v;
  const lastWriteWins = (v: ResearchView, _expectedRevision: number, draft: SelectionItem[]): ResearchView => ({
    ...v,
    selection: draft,
    selectionRevision: v.selectionRevision + 1,
  });
  assert.equal(staleGuardOracle(applySaveWithGuard), true);
  assert.throws(() => staleGuardOracle(lastWriteWins));
  assert.equal(staleGuardOracle(applySaveWithGuard), true);
});

test("W5-C03 cumulativeVolume", () => {
  assert.equal(cumulativeVolume(FIXTURE_ROWS), 21400);
  assert.equal(cumulativeVolume(activeRows(rowsResult(FIXTURE_ROWS))), 21400);
  const mergedDup = row({ itemId: "kw_md", keyword: "best dresses online", searchVolume: 3000, mergedInto: "kw_0001" });
  assert.equal(cumulativeVolume([r1, mergedDup]), 5000);
  const projectedNull = projectMarketRow(r3, "US");
  assert.equal(cumulativeVolume([projectMarketRow(r1, "US"), projectedNull]), 5200);
});

test("W5-C04 summary/cluster metrics", () => {
  const res = result();
  assert.deepEqual(currentSummary(res, "all"), summary());
  assert.deepEqual(currentSummary(res, "US"), summary());
  const cluster = clusterRow();
  assert.deepEqual(currentClusterMetric(cluster, "all"), cluster);
  assert.deepEqual(currentClusterMetric(cluster, "US"), cluster);
  assert.equal(summary().activeKeywords, 6);
  assert.equal(summary().clusters, 4);
  assert.equal(cluster.combinedVolume, 5600);
  assert.equal(cluster.recommendedForStoreDiscovery, true);
  assert.deepEqual(cluster.laneCounts, { category_discovery: 1, store_discovery: 1 });
});

test("W5-C05 every filter dimension + combined", () => {
  const rows = FIXTURE_ROWS;
  const by = (f: KeywordFilterState) => ids(getFiltered(rows, f));

  assert.deepEqual(by(fstate({ search: "jackets" })), ["kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ search: "JACKETS" })), ["kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ seed: "dresses" })), ["kw_0001", "kw_0002"]);
  assert.deepEqual(by(fstate({ clusterId: "cl_outer" })), ["kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ intent: "commercial" })), ["kw_0001", "kw_0005"]);
  assert.deepEqual(by(fstate({ lane: "local_discovery" })), ["kw_0002", "kw_0006"]);
  assert.deepEqual(by(fstate({ category: "outerwear" })), ["kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ audience: "women" })), ["kw_0005"]);
  assert.deepEqual(by(fstate({ channel: "online" })), ["kw_0001", "kw_0005"]);
  assert.deepEqual(by(fstate({ minVolume: 2000 })), ["kw_0001", "kw_0003", "kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ minOpportunity: 50 })), ["kw_0001", "kw_0003", "kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ recommended: "true" })), ["kw_0001", "kw_0003", "kw_0005"]);
  assert.deepEqual(by(fstate({ recommended: "false" })), ["kw_0002", "kw_0004", "kw_0006"]);
  assert.deepEqual(by(fstate({ flags: ["high_opportunity"] })), ["kw_0001"]);
  assert.deepEqual(by(fstate({ flags: ["high_opportunity", "seasonal"] })), ["kw_0001", "kw_0004"]);
  assert.deepEqual(by(fstate({ market: "US" })), ["kw_0001", "kw_0002", "kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ market: "US", search: "jackets" })), ["kw_0004", "kw_0005"]);
  assert.deepEqual(by(fstate({ market: "US", search: "dresses", recommended: "true" })), ["kw_0001"]);
  assert.deepEqual(by(fstate({ search: "zzz" })), []);

  const projected = getFiltered(rows, fstate({ market: "US", search: "jackets" }));
  assert.equal(projected[0].searchVolume, 2100);
  assert.equal(projected[1].searchVolume, 3500);

  const src = filterOptionSources(rows);
  assert.deepEqual(src.seeds, ["boutique", "brands", "dresses", "jackets"]);
  assert.deepEqual(src.clusters, ["cl_boutiques", "cl_brands", "cl_dresses", "cl_outer"]);
  assert.deepEqual(src.intents, ["commercial", "transactional", "navigational", "informational"]);
  assert.deepEqual(src.lanes, ["brand_competitor", "category_discovery", "local_discovery", "store_discovery"]);
  assert.deepEqual(src.categories, ["dresses", "outerwear"]);
  assert.deepEqual(src.audiences, ["men", "women"]);
  assert.deepEqual(src.channels, ["local", "online", "store"]);
  assert.deepEqual(src.flags, ["high_opportunity", "low_competition", "rising", "seasonal"]);
});

test("W5-C06 every sort column + null-last + pagination clamp", () => {
  const rows = FIXTURE_ROWS;
  const by = (k: string, d: "asc" | "desc") => ids(sortKeywordRows(rows, k, d));

  assert.deepEqual(by("searchVolume", "desc"), ["kw_0003", "kw_0001", "kw_0005", "kw_0004", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("searchVolume", "asc"), ["kw_0006", "kw_0002", "kw_0004", "kw_0005", "kw_0001", "kw_0003"]);
  assert.deepEqual(by("keyword", "asc"), ["kw_0001", "kw_0002", "kw_0006", "kw_0003", "kw_0004", "kw_0005"]);
  assert.deepEqual(by("seed", "asc"), ["kw_0006", "kw_0003", "kw_0001", "kw_0002", "kw_0004", "kw_0005"]);
  assert.deepEqual(by("cluster", "asc"), ["kw_0006", "kw_0003", "kw_0001", "kw_0002", "kw_0004", "kw_0005"]);
  assert.deepEqual(by("lane", "asc"), ["kw_0003", "kw_0004", "kw_0002", "kw_0006", "kw_0001", "kw_0005"]);
  assert.deepEqual(by("cpc", "desc"), ["kw_0003", "kw_0004", "kw_0005", "kw_0001", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("competition", "desc"), ["kw_0003", "kw_0005", "kw_0004", "kw_0001", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("keywordDifficulty", "desc"), ["kw_0003", "kw_0005", "kw_0004", "kw_0001", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("mainIntent", "asc"), ["kw_0001", "kw_0005", "kw_0004", "kw_0003", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("commercialIntent", "desc"), ["kw_0003", "kw_0005", "kw_0001", "kw_0004", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("trendSlope", "desc"), ["kw_0005", "kw_0001", "kw_0003", "kw_0004", "kw_0006", "kw_0002"]);
  assert.deepEqual(by("opportunityScore", "desc"), ["kw_0003", "kw_0005", "kw_0001", "kw_0004", "kw_0002", "kw_0006"]);
  assert.deepEqual(by("recommended", "desc"), ["kw_0002", "kw_0004", "kw_0006", "kw_0001", "kw_0003", "kw_0005"]);
  assert.deepEqual(by("flags", "asc"), ["kw_0003", "kw_0006", "kw_0001", "kw_0002", "kw_0005", "kw_0004"]);

  const withNull = [projectMarketRow(r1, "US"), projectMarketRow(r3, "US"), projectMarketRow(r5, "US")];
  assert.deepEqual(ids(sortKeywordRows(withNull, "searchVolume", "desc")), ["kw_0001", "kw_0005", "kw_0003"]);
  assert.deepEqual(ids(sortKeywordRows(withNull, "searchVolume", "asc")), ["kw_0003", "kw_0005", "kw_0001"]);

  const six = rows;
  assert.deepEqual(ids(paginate(six, 1, 25)), ids(six));
  assert.deepEqual(ids(paginate(six, 3, 2)), ["kw_0005", "kw_0006"]);
  assert.deepEqual(ids(paginate(six, 4, 2)), ["kw_0005", "kw_0006"]);
  assert.deepEqual(ids(paginate(six, 0, 2)), ["kw_0001", "kw_0002"]);
  assert.deepEqual(paginate([], 1, 25), []);
  assert.deepEqual(ids(paginate(six, 1, 0)), ["kw_0001"]);
  assert.deepEqual(ids(paginate(six, 1, 2.7)), ["kw_0001", "kw_0002"]);
});

test("W5-C07 aggregation/adjustedVolume/median/fingerprint/lane", () => {
  assert.deepEqual(aggregateByCluster(FIXTURE_ROWS), {
    Dresses: { volume: 6200, cpcSum: 2.0, cpcN: 2, ciSum: 0.9, ciN: 2, count: 2 },
    Brands: { volume: 8800, cpcSum: 3.5, cpcN: 1, ciSum: 0.8, ciN: 1, count: 1 },
    Outerwear: { volume: 5600, cpcSum: 4.15, cpcN: 2, ciSum: 1.0, ciN: 2, count: 2 },
    Boutiques: { volume: 800, cpcSum: 0.5, cpcN: 1, ciSum: 0.25, ciN: 1, count: 1 },
  });

  const dupA = row({ itemId: "kw_d1", keyword: "dup alpha", searchVolume: 100, cpc: 1, competition: 0.5, keywordDifficulty: 10 });
  const dupB = row({ itemId: "kw_d2", keyword: "dup beta", searchVolume: 100, cpc: 1, competition: 0.5, keywordDifficulty: 10 });
  const distinctC = row({ itemId: "kw_d3", keyword: "distinct gamma", searchVolume: 300, cpc: 2, competition: 0.5, keywordDifficulty: 20 });
  assert.equal(adjustedVolume([dupA, dupB, distinctC]), 400);
  assert.equal(adjustedVolume(FIXTURE_ROWS), 21400);

  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([4, 2, 6, 8]), 5);
  assert.equal(median([]), 0);
  assert.equal(median([7]), 7);

  assert.equal(metricFingerprint([r1, r2]), "kw_0001|kw_0002");

  assert.equal(discoveryLane(r1), "store_discovery");
  assert.equal(discoveryLane(r2), "local_discovery");
  assert.equal(discoveryLane(r3), "brand_competitor");
  assert.equal(discoveryLane(r4), "category_discovery");
  assert.equal(discoveryLane(r5), "store_discovery");
  assert.equal(discoveryLane(r6), "local_discovery");
  assert.equal(laneLabel("store_discovery"), "Store / online");
  assert.equal(laneLabel("local_discovery"), "Local store");
  assert.equal(laneLabel("category_discovery"), "Product / category");
  assert.equal(laneLabel("brand_competitor"), "Brand / competitor");
});

test("W5-C08 export query mirror + CSV column parity", () => {
  assert.equal(buildExportQuery(fstate()).toString(), "");

  const q = buildExportQuery(
    fstate({
      market: "US",
      seed: "dresses",
      clusterId: "cl_dresses",
      intent: "commercial",
      lane: "store_discovery",
      category: "dresses",
      channel: "online",
      minVolume: 1000,
      minOpportunity: 60,
      recommended: "true",
      flags: ["rising", "seasonal"],
      search: "jackets",
    }),
  );
  assert.equal(
    q.toString(),
    "market=US&seed=dresses&clusterId=cl_dresses&intent=commercial&lane=store_discovery&category=dresses&channel=online&minVolume=1000&minOpportunity=60&recommended=true&flag=rising&flag=seasonal&search=jackets",
  );

  const capped = buildExportQuery(fstate({ flags: Array.from({ length: 25 }, (_, i) => `flag-${i}`) }));
  assert.equal(capped.getAll("flag").length, 20);
  assert.deepEqual(capped.getAll("flag"), Array.from({ length: 20 }, (_, i) => `flag-${i}`));

  const capOracle = (build: (f: KeywordFilterState) => URLSearchParams): boolean => {
    assert.equal(build(fstate({ flags: Array.from({ length: 25 }, (_, i) => `flag-${i}`) })).getAll("flag").length, 20);
    return true;
  };
  assert.equal(capOracle(buildExportQuery), true);
  const uncapped = (f: KeywordFilterState): URLSearchParams => {
    const p = new URLSearchParams();
    for (const fl of f.flags) p.append("flag", fl);
    return p;
  };
  assert.throws(() => capOracle(uncapped));
  assert.equal(capOracle(buildExportQuery), true);

  assert.deepEqual(EXPORT_CSV_COLUMNS, [
    "keyword",
    "seed",
    "source_seeds",
    "search_volume",
    "cpc",
    "competition",
    "competition_level",
    "keyword_difficulty",
    "main_intent",
    "commercial_intent",
    "trend_slope",
    "cluster",
    "cluster_id",
    "lane",
    "facets",
    "variant_group_id",
    "variant_canonical",
    "flags",
    "opportunity_score",
    "recommended",
    "merged_into",
    "monthly_history",
    "available_markets",
  ]);
});

test("W5-C09 formatters", () => {
  assert.equal(fmtNum(0), "0");
  assert.equal(fmtNum(999), "999");
  assert.equal(fmtNum(1200), "1.2K");
  assert.equal(fmtNum(1500), "1.5K");
  assert.equal(fmtNum(1000000), "1M");
  assert.equal(fmtNum(1234567), "1.2M");
  assert.equal(fmtNum(2000000000), "2B");
  assert.equal(fmtNum(NaN), "—");

  assert.equal(fmtCpc(1.25), "$1.25");
  assert.equal(fmtCpc(0.5), "$0.50");
  assert.equal(fmtCpc(null), "—");
  assert.equal(fmtCpc(NaN), "—");

  assert.equal(fmtPct(0.55), "55%");
  assert.equal(fmtPct(1), "100%");
  assert.equal(fmtPct(0), "0%");
  assert.equal(fmtPct(0.004), "0%");
  assert.equal(fmtPct(NaN), "—");

  assert.equal(fmtSlope(0.012), "+0.012");
  assert.equal(fmtSlope(-0.004), "-0.004");
  assert.equal(fmtSlope(0), "0.000");
  assert.equal(fmtSlope(NaN), "—");
});

test("W5-C10 theme key/next", () => {
  assert.equal(KEYWORD_THEME_STORAGE_KEY, "ki-dashboard-theme");
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme("dark"), "light");
  assert.equal(nextTheme(nextTheme("light")), "light");
});

test("W5-C11 phase machine loading/ready/error/empty", () => {
  assert.equal(dashboardPhase(null, null), "loading");
  assert.equal(dashboardPhase(null, new Error("boom")), "error");
  assert.equal(dashboardPhase(viewFixture(), null), "ready");
  assert.equal(dashboardPhase(viewFixture(), new Error("boom")), "error");

  const running = structuredClone(viewFixture());
  running.state = "running";
  running.result = null;
  assert.equal(dashboardPhase(running, null), "loading");

  const failed = structuredClone(viewFixture());
  failed.state = "failed";
  failed.result = null;
  failed.safeError = { code: "KI_WORKER_FAILED", message: "boom" };
  assert.equal(dashboardPhase(failed, null), "error");

  const emptyView = structuredClone(viewFixture());
  emptyView.result = {
    ...(emptyView.result as ResearchResult),
    keywords: [row({ itemId: "kw_zm", keyword: "zeta", mergedInto: "kw_0001" })],
  };
  assert.equal(dashboardPhase(emptyView, null), "empty");
  assert.equal(dashboardPhase(emptyView, null), "empty");
});

test("W5-C12 200-row/200-draft scale + ceilings", (t) => {
  const rows = Array.from({ length: 200 }, (_, i) =>
    row({
      itemId: `kw_${String(i).padStart(4, "0")}`,
      keyword: `keyword ${i}`,
      seed: `seed-${i % 5}`,
      sourceSeeds: [`seed-${i % 5}`],
      searchVolume: i * 10,
      cpc: 0.5 + (i % 10),
      competition: (i % 10) / 10,
      competitionLevel: (["LOW", "MEDIUM", "HIGH"] as const)[i % 3],
      keywordDifficulty: i % 100,
      mainIntent: INTENTS[i % 4],
      commercialIntent: (i % 100) / 100,
      trendSlope: (i % 5) / 10,
      cluster: `Cluster ${i % 10}`,
      clusterId: `cl_${i % 10}`,
      lane: LANES[i % 4],
      facets: { audience: [], category: [`cat-${i % 4}`], channel: i % 2 === 0 ? ["online"] : ["store"], fit: [], modifier: [] },
      flags: i % 3 === 0 ? ["rising"] : [],
      opportunityScore: i % 100,
      recommended: i % 2 === 0,
    }),
  );

  assert.equal(activeRows(rowsResult(rows)).length, 200);
  assert.equal(distinctKeywordRows(rows).length, 200);
  assert.equal(cumulativeVolume(rows), 199000);
  assert.equal(getFiltered(rows, fstate({ minVolume: 1000 })).length, 100);
  assert.deepEqual(ids(getFiltered(rows, fstate({ search: "keyword 0" }))), ["kw_0000"]);
  assert.equal(getFiltered(rows, fstate({ search: "keyword 15" })).length, 11);

  const sortedDesc = sortKeywordRows(rows, "searchVolume", "desc");
  assert.equal(sortedDesc[0].itemId, "kw_0199");
  assert.equal(sortedDesc[199].itemId, "kw_0000");
  assert.equal(sortKeywordRows(rows, "searchVolume", "asc")[0].itemId, "kw_0000");

  const agg = aggregateByCluster(rows);
  const counts = Object.values(agg).map((g) => g.count);
  assert.equal(counts.length, 10);
  assert.equal(counts.reduce((a, b) => a + b, 0), 200);
  assert.ok(counts.every((c) => c === 20));

  assert.equal(paginate(rows, 1, 25).length, 25);
  assert.equal(paginate(rows, 8, 25).length, 25);
  assert.deepEqual(ids(paginate(rows, 9, 25)), ids(paginate(rows, 8, 25)));
  assert.deepEqual(ids(paginate(rows, 0, 25)), ids(paginate(rows, 1, 25)));
  assert.equal(paginate(rows, 1, 200).length, 200);

  const view = viewFixture();
  view.result = { ...(view.result as ResearchResult), keywords: rows };
  let draft: SelectionItem[] = [];
  for (const r of rows) draft = toggleSelectedItem(draft, r);
  assert.equal(draft.length, 200);
  assert.equal(selectionOverLimit(draft), true);
  assert.equal(selectionOverLimit(draft.slice(0, 100)), false);
  assert.deepEqual(canFinalizeSelection(view, draft), { ok: false, reason: "over_limit" });
  assert.deepEqual(canFinalizeSelection(view, draft.slice(0, 5)), { ok: true, reason: "" });
  const extra = row({ itemId: "kw_extra", keyword: "extra" });
  assert.strictEqual(toggleSelectedItem(draft, extra), draft);
  assert.strictEqual(addManualSelectedItem(draft, "manual", "ksi_000000000000", "seed-x"), draft);
  assert.strictEqual(removeSelectedItem(draft, "kw_0000").length, 199);

  const caps = paginate(rows, 1, 25);
  assert.equal(caps.length, 25);

  assert.equal(registeredDigest, requiredDigest);
  assert.equal(executedDigest, requiredDigest);
  t.diagnostic(`KI_W5_EXECUTION_CERTIFICATE=${KI_W5_EXECUTION_CERTIFICATE}`);
});
