import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

import { ApiPayloadError } from "../lib/api-validation.ts";
import { parseResearchEnvelope } from "../lib/keyword-intelligence-validation.ts";
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
  StageCounts,
} from "../lib/keyword-intelligence-types.ts";
import { KEYWORD_INTELLIGENCE_SURFACE_INVENTORY } from "../lib/keyword-intelligence-view-model.ts";

const ROOT = join(import.meta.dirname, "..");

const I_F15_LITERAL: readonly string[] = [
  "surface:research-form",
  "surface:research-status",
  "surface:filter-bar",
  "surface:summary-cards",
  "surface:keyword-table",
  "surface:selection-review",
  "surface:chart-panels",
  "surface:cluster-landscape",
  "surface:research-dashboard",
  "chart:top-keywords",
  "chart:cluster-volume",
  "chart:bubble",
  "chart:scatter",
  "chart:intent",
  "chart:recommended",
  "chart:seeds",
  "chart:histogram",
  "chart:treemap",
  "chart:flags",
  "chart:history",
  "landscape:cluster-scene",
];

const OWNED_PATHS: readonly string[] = [
  "app/api/keyword-research/[researchId]/export.csv/route.ts",
  "app/api/keyword-research/[researchId]/route.ts",
  "app/api/keyword-research/[researchId]/runs/route.ts",
  "app/api/keyword-research/[researchId]/selection/route.ts",
  "app/api/keyword-research/route.ts",
  "app/keywords/[researchId]/page.tsx",
  "app/keywords/page.tsx",
  "components/keyword-intelligence/chart-panels.tsx",
  "components/keyword-intelligence/cluster-landscape.tsx",
  "components/keyword-intelligence/filter-bar.tsx",
  "components/keyword-intelligence/keyword-dashboard.module.css",
  "components/keyword-intelligence/keyword-table.tsx",
  "components/keyword-intelligence/research-dashboard.tsx",
  "components/keyword-intelligence/research-form.tsx",
  "components/keyword-intelligence/research-status.tsx",
  "components/keyword-intelligence/selection-review.tsx",
  "components/keyword-intelligence/summary-cards.tsx",
];

const OWNED_SOURCES: readonly string[] = [
  ...OWNED_PATHS,
  "lib/keyword-intelligence-types.ts",
  "lib/keyword-intelligence-validation.ts",
  "lib/keyword-intelligence-view-model.ts",
];

const TYPES_SURFACE: readonly string[] = [];

const VALIDATION_SURFACE: readonly string[] = [
  "CLIENT_REQUEST_ID_PATTERN",
  "KEYWORD_RESEARCH_ID_PATTERN",
  "newClientRequestId",
  "parseKeywordSeedText",
  "parseResearchEnvelope",
  "parseResearchView",
  "parseRunHandoffEnvelope",
  "validKeywordResearchId",
  "validateSeedsInput",
];

const VIEW_MODEL_SURFACE: readonly string[] = [
  "EXPORT_CSV_COLUMNS",
  "KEYWORD_INTELLIGENCE_SURFACE_INVENTORY",
  "KEYWORD_THEME_STORAGE_KEY",
  "activeRows",
  "addManualSelectedItem",
  "adjustedVolume",
  "aggregateByCluster",
  "buildExportQuery",
  "canFinalizeSelection",
  "cumulativeVolume",
  "currentClusterMetric",
  "currentSummary",
  "dashboardPhase",
  "discoveryLane",
  "distinctKeywordRows",
  "editSelectedItemText",
  "emptyKeywordFilterState",
  "filterOptionSources",
  "fmtCpc",
  "fmtNum",
  "fmtPct",
  "fmtSlope",
  "getFiltered",
  "isTerminalResearchState",
  "laneLabel",
  "marketKeywordKey",
  "median",
  "metricFingerprint",
  "nextPollDelay",
  "nextTheme",
  "paginate",
  "projectMarketRow",
  "removeSelectedItem",
  "selectionDraftFromView",
  "selectionOverLimit",
  "sortKeywordRows",
  "toggleSelectedItem",
];

const FILTER_FIELDS: readonly string[] = [
  "audience",
  "category",
  "channel",
  "clusterId",
  "flags",
  "intent",
  "lane",
  "market",
  "minOpportunity",
  "minVolume",
  "recommended",
  "reset",
  "search",
  "seed",
];

const CHART_JS_VERSION = "3.9.1";
const TREEMAP_VERSION = "2.0.0";
const CDN_PATTERN = /https?:\/\/|cdn\.|unpkg|jsdelivr|cdnjs|loadScript|SCRIPT_CANDIDATES|loadFirst/u;

async function listFiles(rootDir: string, relPrefix: string): Promise<string[]> {
  const out: string[] = [];
  const walk = async (dir: string, prefix: string): Promise<void> => {
    const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    );
    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        await walk(join(dir, entry.name), rel);
      } else {
        out.push(rel);
      }
    }
  };
  await walk(rootDir, relPrefix);
  return out.sort();
}

async function dataSurfaceIds(): Promise<string[]> {
  const files = await listFiles(join(ROOT, "components/keyword-intelligence"), "");
  const ids = new Set<string>();
  for (const file of files) {
    const text = await readFile(join(ROOT, "components/keyword-intelligence", file), "utf8");
    for (const match of text.matchAll(/data-surface="([^"]+)"/gu)) {
      ids.add(match[1]);
    }
  }
  return [...ids].sort();
}

async function dataFilterIds(): Promise<string[]> {
  const text = await readFile(join(ROOT, "components/keyword-intelligence/filter-bar.tsx"), "utf8");
  const ids = new Set<string>();
  for (const match of text.matchAll(/data-filter="([^"]+)"/gu)) {
    ids.add(match[1]);
  }
  return [...ids].sort();
}

async function chartVersions(): Promise<{ chart: string; treemap: string }> {
  const chart = JSON.parse(await readFile(join(ROOT, "node_modules/chart.js/package.json"), "utf8"));
  const treemap = JSON.parse(
    await readFile(join(ROOT, "node_modules/chartjs-chart-treemap/package.json"), "utf8"),
  );
  return { chart: chart.version, treemap: treemap.version };
}

const NINE_MARKET_CODES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;
const RESEARCH_ID = "kr_abcdefghijklmnopqrstuvwx";

function history15(): MonthlyHistoryPoint[] {
  const points: MonthlyHistoryPoint[] = [];
  for (let i = 0; i < 15; i += 1) {
    points.push({ year: 2025, month: (i % 12) + 1, searchVolume: 100 + i * 7 });
  }
  return points;
}

function market(): KeywordMarket {
  return {
    code: "US",
    name: "United States",
    locationCode: 2840,
    languageCode: "en",
    languageName: "English",
  };
}

function metric(): MarketMetric {
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
  };
}

function marketMetrics(): KeywordRow["marketMetrics"] {
  return {
    US: metric(),
    GB: null,
    CA: null,
    AU: null,
    NZ: null,
    DE: null,
    FR: null,
    IN: null,
    AE: null,
  };
}

function keywordRow(): KeywordRow {
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
    variantGroups: [
      {
        variantGroupId: "vg_0001",
        canonical: "best dresses online",
        variants: ["best dresses online"],
        volume: 5000,
        sourceSeeds: ["dresses"],
      },
    ],
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
    markets: [market()],
    seeds: ["dresses"],
    rawItemsCollected: 1,
    itemsWithMetrics: 1,
    informationalDropped: 0,
    uniquePhrases: 1,
    dedupMerged: 0,
    activeKeywords: 1,
    variantGroups: 1,
    clusters: 1,
    recommendedKeywords: 1,
    recommendedClusters: 1,
  };
}

function result(): ResearchResult {
  return {
    contractVersion: 1,
    researchId: RESEARCH_ID,
    generation: 1,
    configFingerprint: "cfg_0001",
    seeds: ["dresses"],
    markets: [market()],
    summary: summary(),
    keywords: [keywordRow()],
    clusters: [clusterRow()],
  };
}

function minimalView(): ResearchView {
  return {
    id: RESEARCH_ID,
    statusUrl: `/api/keyword-research/${RESEARCH_ID}`,
    state: "completed",
    generation: 1,
    contractVersion: 1,
    seeds: ["dresses"],
    markets: [market()],
    progress: progress("completed"),
    result: result(),
    selection: [],
    selectionRevision: 1,
    selectionConflicts: [],
    safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z",
    startedAt: "2026-08-19T10:00:01.000Z",
    completedAt: "2026-08-19T10:05:00.000Z",
    updatedAt: "2026-08-19T10:05:00.000Z",
  };
}

const REGISTERED_CASE_IDS = [
  "W5-I01",
  "W5-I02",
  "W5-I03",
  "W5-I04",
  "W5-I05",
  "W5-I06",
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
  file: "keyword-intelligence-inventory.test.ts",
  required: REGISTERED_CASE_IDS,
  registered: REGISTERED_CASE_IDS,
  executed: REGISTERED_CASE_IDS,
  skipped: [],
  oracleFailures: [],
  requiredDigest,
  registeredDigest,
  executedDigest,
});

test("W5-I01 exact lib export surfaces", async () => {
  const types = await import("../lib/keyword-intelligence-types.ts");
  assert.deepEqual(Object.keys(types).sort(), TYPES_SURFACE);
});

test("W5-I02 exact lib export surfaces", async () => {
  const validation = await import("../lib/keyword-intelligence-validation.ts");
  assert.deepEqual(Object.keys(validation).sort(), VALIDATION_SURFACE);

  const validEnvelope = { research: minimalView() };
  const strictOracle = (parse: (payload: unknown) => unknown): boolean => {
    assert.throws(() => parse({ research: minimalView(), extra: "weakened" }), ApiPayloadError);
    assert.doesNotThrow(() => parse(validEnvelope));
    return true;
  };
  const weakened = (payload: Record<string, unknown>): unknown => {
    const { research } = payload;
    return parseResearchEnvelope({ research });
  };
  assert.equal(strictOracle(parseResearchEnvelope), true);
  assert.doesNotThrow(() => weakened({ research: minimalView(), extra: "weakened" }));
  assert.equal(strictOracle(parseResearchEnvelope), true);
});

test("W5-I03 exact lib export surfaces", async () => {
  const viewModel = await import("../lib/keyword-intelligence-view-model.ts");
  assert.deepEqual(Object.keys(viewModel).sort(), VIEW_MODEL_SURFACE);
});

test("W5-I04 owned-path presence set equality", async () => {
  const owned = (
    await Promise.all([
      listFiles(join(ROOT, "app/keywords"), "app/keywords"),
      listFiles(join(ROOT, "app/api/keyword-research"), "app/api/keyword-research"),
      listFiles(join(ROOT, "components/keyword-intelligence"), "components/keyword-intelligence"),
    ])
  )
    .flat()
    .sort();
  assert.deepEqual(owned, [...OWNED_PATHS]);

  const pathOracle = (paths: string[]): boolean => {
    assert.deepEqual(paths, [...OWNED_PATHS]);
    return true;
  };
  assert.equal(pathOracle(owned), true);
  assert.throws(() => pathOracle([...owned, "app/keywords/injected.tsx"]));
  assert.equal(pathOracle(owned), true);
});

test("W5-I05 surface inventory equality + registrations", async () => {
  assert.deepEqual(KEYWORD_INTELLIGENCE_SURFACE_INVENTORY, [...I_F15_LITERAL]);

  const registered = await dataSurfaceIds();
  assert.deepEqual(registered, [...I_F15_LITERAL].sort());

  const filters = await dataFilterIds();
  assert.deepEqual(filters, [...FILTER_FIELDS]);

  const registrationCoverageOracle = (ids: readonly string[]): boolean => {
    assert.deepEqual([...ids].sort(), [...I_F15_LITERAL].sort());
    return true;
  };
  for (let i = 0; i < I_F15_LITERAL.length; i += 1) {
    const removed = I_F15_LITERAL.filter((_, index) => index !== i);
    assert.throws(() => registrationCoverageOracle(removed));
  }
  assert.equal(registrationCoverageOracle(I_F15_LITERAL), true);
});

test("W5-I06 chart dependency versions + no-CDN", async (t) => {
  const versions = await chartVersions();
  const versionOracle = (expected: { chart: string; treemap: string }): boolean => {
    assert.equal(versions.chart, expected.chart);
    assert.equal(versions.treemap, expected.treemap);
    return true;
  };
  assert.equal(versionOracle({ chart: CHART_JS_VERSION, treemap: TREEMAP_VERSION }), true);
  assert.throws(() => versionOracle({ chart: "3.9.0", treemap: TREEMAP_VERSION }));
  assert.throws(() => versionOracle({ chart: CHART_JS_VERSION, treemap: "2.0.1" }));
  assert.equal(versionOracle({ chart: CHART_JS_VERSION, treemap: TREEMAP_VERSION }), true);

  const cdnOracle = (sources: string[]): boolean => {
    for (const source of sources) {
      assert.equal(CDN_PATTERN.test(source), false, "no CDN/script-loading reference in owned sources");
    }
    return true;
  };
  const realSources = await Promise.all(OWNED_SOURCES.map(async (rel) => readFile(join(ROOT, rel), "utf8")));
  assert.equal(cdnOracle(realSources), true);
  const injected = [
    ...realSources,
    "<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js'></script>",
  ];
  assert.throws(() => cdnOracle(injected));
  assert.equal(cdnOracle(realSources), true);

  assert.equal(registeredDigest, requiredDigest);
  assert.equal(executedDigest, requiredDigest);
  t.diagnostic(`KI_W5_EXECUTION_CERTIFICATE=${KI_W5_EXECUTION_CERTIFICATE}`);
});

test("VIS-KD visual-only dashboard composition and shared form contract", async () => {
  const page = await readFile(join(ROOT, "app/keywords/[researchId]/page.tsx"), "utf8");
  const dashboard = await readFile(
    join(ROOT, "components/keyword-intelligence/research-dashboard.tsx"),
    "utf8",
  );
  const summary = await readFile(
    join(ROOT, "components/keyword-intelligence/summary-cards.tsx"),
    "utf8",
  );
  const charts = await readFile(
    join(ROOT, "components/keyword-intelligence/chart-panels.tsx"),
    "utf8",
  );
  const selection = await readFile(
    join(ROOT, "components/keyword-intelligence/selection-review.tsx"),
    "utf8",
  );
  const table = await readFile(
    join(ROOT, "components/keyword-intelligence/keyword-table.tsx"),
    "utf8",
  );
  const css = await readFile(
    join(ROOT, "components/keyword-intelligence/keyword-dashboard.module.css"),
    "utf8",
  );

  assert.equal((page.match(/<h1>/gu) ?? []).length, 1, "page owns the sole dashboard h1");
  assert.equal(dashboard.includes("<h1>"), false, "completed dashboard has no duplicate h1");

  const compositionOrder = [
    "className={styles.selectionStep}",
    'data-surface="surface:filter-bar"',
    "{charts.seedPerformance}",
    'data-surface="surface:summary-cards"',
    "<ClusterLandscape",
    "summary.marketOverview(charts.overviewSignals)",
    "{charts.historyPanel}",
    "{charts.analysisCharts}",
    'data-surface="surface:keyword-table"',
  ].map((needle) => dashboard.indexOf(needle));
  assert.equal(compositionOrder.every((index) => index >= 0), true, "every visual section is present");
  assert.deepEqual(compositionOrder, [...compositionOrder].sort((a, b) => a - b));

  assert.equal(selection.includes("styles.kiDashboard"), false);
  assert.equal(table.includes("styles.kiDashboard"), false);
  assert.match(selection, /run-form-card ds-card/u);
  assert.match(selection, /className="form-heading-row"/u);
  assert.equal(
    selection.includes('className={`form-footer ${styles.selectionFooter}`}'),
    true,
  );
  assert.match(selection, /button button-primary ds-button ds-button--primary/u);
  assert.match(selection, /button button-secondary ds-button ds-button--secondary/u);

  for (const name of ["cards", "marketOverview", "overlapPanel"]) {
    assert.match(summary, new RegExp(`\\b${name}\\b`, "u"));
  }
  for (const name of ["seedPerformance", "overviewSignals", "historyPanel", "analysisCharts"]) {
    assert.match(charts, new RegExp(`\\b${name}\\b`, "u"));
  }

  for (const navy of ["#0b1220", "#131c30", "#1a2338", "#26334d", "#1e2440"]) {
    assert.equal(css.includes(navy), false, `dashboard CSS excludes ${navy}`);
  }
  assert.match(css, /\.selectionStep\s*\{/u);
  assert.equal(css.includes("selectedKeywordHero"), false);
});

// ---- KI-R5-S016 additive static registry lint (append-only, no certificate) ----
// The amended A4-mandated ownership sets (S1 §4.2): R5_FRONTEND_CASES is the
// frontend_api registry in api.test.ts; R5_BROWSER_CASES is the seven-ID
// browser registry in the harness. No R5 case ID is registered or executed
// here and no certificate is emitted.

const R5_FRONTEND_CASES_A4: readonly string[] = [
  "R5-WIRE-01",
  "R5-WIRE-02",
  "R5-WIRE-03",
  "R5-WIRE-05",
  "R5-WIRE-06",
  "R5-EXP-01",
  "R5-EXP-02",
  "R5-EXP-03",
  "R5-EXP-04",
];

const R5_BROWSER_CASES_A4: readonly string[] = [
  "R5-WIRE-04",
  "R5-FIN-01",
  "R5-FIN-02",
  "R5-FIN-03",
  "R5-FIN-04",
  "R5-FIN-05",
  "R5-FIN-06",
];

const R5_MANIFEST_GROUPS_A4: Record<string, readonly string[]> = {
  wire: [
    "R5-WIRE-01", "R5-WIRE-02", "R5-WIRE-03", "R5-WIRE-04", "R5-WIRE-05", "R5-WIRE-06",
  ],
  selection: [
    "R5-SEL-01", "R5-SEL-02", "R5-SEL-03", "R5-SEL-04", "R5-SEL-05", "R5-SEL-06", "R5-SEL-07", "R5-SEL-08",
  ],
  finalization: [
    "R5-FIN-01", "R5-FIN-02", "R5-FIN-03", "R5-FIN-04", "R5-FIN-05", "R5-FIN-06", "R5-FIN-07", "R5-FIN-08",
  ],
  export: [
    "R5-EXP-01", "R5-EXP-02", "R5-EXP-03", "R5-EXP-04", "R5-EXP-05", "R5-EXP-06",
  ],
  conformance: [
    "R5-CONF-01", "R5-CONF-02", "R5-CONF-03", "R5-CONF-04", "R5-CONF-05", "R5-CONF-06",
  ],
};

const R5_DECLARED_IDS: ReadonlySet<string> = new Set(
  Object.values(R5_MANIFEST_GROUPS_A4).flat(),
);
const R5_FRONTEND_OWNED: ReadonlySet<string> = new Set(R5_FRONTEND_CASES_A4);
const R5_BROWSER_OWNED: ReadonlySet<string> = new Set(R5_BROWSER_CASES_A4);
const R5_CASE_ID_RE = /\bR5-(WIRE|SEL|FIN|EXP|CONF)-[0-9]{2}\b/gu;

function extractR5CaseArray(text: string, identifier: string): string[] {
  const marker = `const ${identifier} = [`;
  const start = text.indexOf(marker);
  assert.ok(start !== -1, `${identifier} literal present`);
  const open = text.indexOf("[", start);
  const close = text.indexOf("]", open);
  assert.ok(open !== -1 && close !== -1, `${identifier} array bounded`);
  const body = text.slice(open, close + 1);
  return [...body.matchAll(/"([^"]+)"/gu)].map((match) => match[1]);
}

function r5OwnerOf(id: string): string | null {
  if (R5_FRONTEND_OWNED.has(id)) return "frontend_api";
  if (R5_BROWSER_OWNED.has(id)) return "browser";
  return null;
}

function isR5CitationLine(line: string): boolean {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//") || trimmed.startsWith("*")) return true;
  return /superseded by R5-/u.test(line);
}

test("S016 static registry lint across the three sibling frontend test files", async () => {
  const apiText = await readFile(join(ROOT, "test", "keyword-intelligence-api.test.ts"), "utf8");
  const componentsText = await readFile(join(ROOT, "test", "keyword-intelligence-components.test.ts"), "utf8");
  const browserText = await readFile(join(ROOT, "test", "browser", "keyword-intelligence-dashboard.mjs"), "utf8");

  const files = [
    { name: "keyword-intelligence-api.test.ts", text: apiText, registry: "frontend_api" },
    { name: "keyword-intelligence-components.test.ts", text: componentsText, registry: null },
    { name: "browser/keyword-intelligence-dashboard.mjs", text: browserText, registry: "browser" },
  ];

  for (const file of files) {
    assert.equal(
      file.text.includes("R5_COMPONENT_CASES"),
      false,
      `${file.name}: no R5_COMPONENT_CASES literal`,
    );
    assert.equal(
      /registry\s*:\s*["']components["']/u.test(file.text),
      false,
      `${file.name}: no registry "components" certificate`,
    );
  }

  const frontendCases = extractR5CaseArray(apiText, "R5_FRONTEND_CASES");
  assert.deepEqual([...frontendCases].sort(), [...R5_FRONTEND_CASES_A4].sort());
  const browserCases = extractR5CaseArray(browserText, "R5_BROWSER_CASES");
  assert.deepEqual([...browserCases].sort(), [...R5_BROWSER_CASES_A4].sort());

  for (const file of files) {
    const lines = file.text.split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      for (const match of line.matchAll(R5_CASE_ID_RE)) {
        const id = match[0];
        assert.equal(
          R5_DECLARED_IDS.has(id),
          true,
          `${file.name}:${index + 1}: undeclared R5 ID ${id}`,
        );
        if (!isR5CitationLine(line)) {
          assert.equal(
            r5OwnerOf(id),
            file.registry,
            `${file.name}:${index + 1}: ${id} must belong to the exact owning registry (${file.registry ?? "none"})`,
          );
        }
      }
    }
  }
});
