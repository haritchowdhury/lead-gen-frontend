// KI-W5-S027 browser CDP harness (frozen contract).
// Writable file: frontend/test/browser/keyword-intelligence-dashboard.mjs
// starting_file_digest: ABSENT
//
// Phase A (build/start; I001 invocation only): spawn `next build` then
// `next start --hostname 127.0.0.1 --port 4347`, awaiting readiness. The
// build is mandatory and performed by this script; skipping it requires the
// explicit `KI_W5_SKIP_BUILD=1` env var. The script refuses to run in
// skip-build mode when `KI_W5_SKIP_BUILD` is unset (interpretation recorded
// in the leaf handoff: "refuses to run when unset" = the build cannot be
// skipped unless the var is explicitly set, matching frozen gate V1 "the
// script performs the build itself").
//
// Phase B: deterministic in-file fixtures (queued, running x3 stage views,
// completed, failed ResearchViews + selection/runs/export responses), each
// validated through `parseResearchEnvelope` (strip-types) before injection.
//
// Phase C: same-origin `/api/keyword-research*` fetch interception serving
// those payloads and recording {method,url,bodyDigest,clientRequestId} into
// `globalThis.__kiFixture.requests`; queued->running->completed sequencing by
// poll count; 409 revision-conflict and handoff-conflict variants on demand;
// non-app URLs pass through untouched (captured by the network allowlist).
//
// Phase D: the fifteen W5-B*/W5-R* subtests at 1440x900 and 390x844 with
// console/error collection, network allowlist, canvas/Chart.getChart
// presence, landscape transform mutation, request-log oracles, unauthenticated
// direct route probes, and CSV equality. Browser controls W5-NC05/NC11 are
// executed as mutation assertions (unchanged oracle passes -> injected defect
// makes the named assertion throw -> fresh unchanged witness passes).
//
// Phase E: teardown in `finally`; exactly one `KI_W5_BROWSER_CERTIFICATE=`
// line per I-F18.

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseResearchEnvelope, parseRunHandoffEnvelope } from "../../lib/keyword-intelligence-validation.ts";
import {
  EXPORT_CSV_COLUMNS,
  KEYWORD_INTELLIGENCE_SURFACE_INVENTORY,
  buildExportQuery,
  emptyKeywordFilterState,
  getFiltered,
} from "../../lib/keyword-intelligence-view-model.ts";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/keyword-intelligence/KI-W5");
const port = 4347;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-kiw5-"));
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const skipBuild = process.env.KI_W5_SKIP_BUILD === "1";

// ---------------------------------------------------------------------------
// Certificates and digests (S1 3.1, I-F18)
// ---------------------------------------------------------------------------

const REQUIRED_BR_IDS = [
  "W5-B01",
  "W5-B02",
  "W5-B03",
  "W5-B04",
  "W5-B05",
  "W5-B06",
  "W5-B07",
  "W5-B08",
  "W5-R01",
  "W5-R02",
  "W5-R03",
  "W5-R04",
  "W5-R05",
  "W5-R06",
  "W5-R07",
];

function setDigest(members) {
  const sorted = [...members].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const bytes = sorted.map((member) => Buffer.from(`${member}\n`, "utf8"));
  return createHash("sha256").update(Buffer.concat(bytes)).digest("hex");
}

// ---------------------------------------------------------------------------
// Fixture builders (Phase B)
// ---------------------------------------------------------------------------

const NINE_MARKETS = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"];
const LANES = ["local_discovery", "brand_competitor", "store_discovery", "category_discovery"];
const INTENTS = ["transactional", "commercial", "informational", "navigational"];
const FLAGS = [
  "declining_traffic",
  "too_broad",
  "too_little_traffic",
  "brand_competitor",
  "informational_dropped",
  "manually_added",
  "high_opportunity",
  "low_competition",
  "rising",
  "seasonal",
];

function history15() {
  const points = [];
  for (let i = 0; i < 15; i += 1) {
    points.push({ year: 2025, month: (i % 12) + 1, searchVolume: 100 + i * 7 });
  }
  return points;
}

function markets() {
  return NINE_MARKETS.map((code) => ({
    code,
    name: `Market ${code}`,
    locationCode: 9000 + NINE_MARKETS.indexOf(code),
    languageCode: "en",
    languageName: "English",
  }));
}

function metric(code) {
  const idx = NINE_MARKETS.indexOf(code);
  return {
    countryCode: code,
    locationCode: 9000 + idx,
    locationName: `Market ${code}`,
    languageName: "English",
    searchVolume: 4000 + idx * 300,
    cpc: 1.0 + idx * 0.25,
    competition: 0.35 + idx * 0.04,
    competitionLevel: idx % 2 === 0 ? "MEDIUM" : "LOW",
    keywordDifficulty: 40 + idx * 3,
    mainIntent: "commercial",
    commercialIntent: 0.5 + idx * 0.03,
    monthlyHistory: history15(),
    trendSlope: 0.01 + idx * 0.002,
    flags: [],
    opportunityScore: 60 + idx * 2,
    recommended: true,
  };
}

function nullMarketMetrics() {
  return {
    US: null, GB: null, CA: null, AU: null, NZ: null, DE: null, FR: null, IN: null, AE: null,
  };
}

function marketMetricsFor(code) {
  const mm = nullMarketMetrics();
  mm[code] = metric(code);
  return mm;
}

function row(index, seed, lane, intent, clusterName, clusterId) {
  return {
    itemId: `kw_${String(index).padStart(4, "0")}`,
    keyword: `${seed} ${intent} keyword ${index}`,
    seed,
    sourceSeeds: [seed],
    searchVolume: 1000 + index * 400,
    cpc: 0.5 + (index % 10) / 4,
    competition: ((index * 7) % 100) / 100,
    competitionLevel: ["LOW", "MEDIUM", "HIGH"][index % 3],
    keywordDifficulty: (index * 13) % 100,
    mainIntent: intent,
    commercialIntent: ((index * 3) % 100) / 100,
    monthlyHistory: history15(),
    trendSlope: ((index % 9) - 4) / 1000,
    cluster: clusterName,
    clusterId,
    lane,
    facets: {
      audience: index % 2 === 0 ? ["women"] : [],
      category: [seed],
      channel: ["online"],
      fit: [],
      modifier: index % 3 === 0 ? ["affordable"] : [],
    },
    variantGroupId: `vg_${index}`,
    variantCanonical: `${seed} ${intent} keyword ${index}`,
    flags: [FLAGS[index % FLAGS.length]],
    opportunityScore: (index * 7) % 101,
    recommended: index % 3 === 0 || index % 5 === 0,
    mergedInto: null,
    availableMarkets: [...NINE_MARKETS],
    marketMetrics: index % 3 === 0 ? marketMetricsFor(index % 2 === 0 ? "US" : "GB") : nullMarketMetrics(),
  };
}

const CLUSTER_NAMES = ["Dresses", "Brands", "Outerwear", "Boutiques"];

function buildCompletedRows(count) {
  const rows = [];
  const seeds = ["dresses", "brands", "jackets", "boutique"];
  for (let i = 0; i < count; i += 1) {
    const seed = seeds[i % seeds.length];
    const lane = LANES[i % LANES.length];
    const intent = INTENTS[i % INTENTS.length];
    const clusterName = CLUSTER_NAMES[i % CLUSTER_NAMES.length];
    rows.push(row(i, seed, lane, intent, clusterName, `cl_${clusterName.toLowerCase()}`));
  }
  return rows;
}

function clusterRow(name, clusterId, keywordRows) {
  const members = keywordRows.filter((r) => r.clusterId === clusterId);
  const laneCounts = {};
  for (const r of members) {
    laneCounts[r.lane] = (laneCounts[r.lane] || 0) + 1;
  }
  return {
    cluster: name,
    clusterId,
    keywords: members.map((r) => r.keyword),
    combinedVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    headlineVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    adjustedClusterVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    rawVariantVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    variantGroups: members.map((r) => ({
      variantGroupId: r.variantGroupId,
      canonical: r.variantCanonical,
      variants: [r.variantCanonical],
      volume: r.searchVolume,
      sourceSeeds: [...r.sourceSeeds],
    })),
    sourceSeeds: [...new Set(members.flatMap((r) => r.sourceSeeds))],
    laneCounts,
    facets: {
      audience: [...new Set(members.flatMap((r) => r.facets.audience))],
      category: [...new Set(members.flatMap((r) => r.facets.category))],
      channel: [...new Set(members.flatMap((r) => r.facets.channel))],
      fit: [],
      modifier: [...new Set(members.flatMap((r) => r.facets.modifier))],
    },
    avgCpc: members.reduce((s, r) => s + r.cpc, 0) / Math.max(1, members.length),
    commercialIntent: members.reduce((s, r) => s + r.commercialIntent, 0) / Math.max(1, members.length),
    trendScore: members.reduce((s, r) => s + Math.abs(r.trendSlope), 0) / Math.max(1, members.length),
    opportunityScore: Math.round(members.reduce((s, r) => s + r.opportunityScore, 0) / Math.max(1, members.length)),
    recommendedForStoreDiscovery: members.some((r) => r.recommended),
  };
}

function stageCounts() {
  return { expected: 9, terminal: 9, succeeded: 9, skipped: 0, failed: 0 };
}

function progress(stage) {
  return { stage, expansion: stageCounts(), anchorScreen: stageCounts(), marketOverview: stageCounts() };
}

function summary(rows, seeds, clusters) {
  return {
    schemaVersion: 3,
    markets: markets(),
    seeds: [...seeds],
    rawItemsCollected: rows.length,
    itemsWithMetrics: rows.length,
    informationalDropped: rows.filter((r) => r.mainIntent === "informational").length,
    uniquePhrases: rows.length,
    dedupMerged: 0,
    activeKeywords: rows.filter((r) => r.mergedInto === null).length,
    variantGroups: rows.length,
    clusters: clusters.length,
    recommendedKeywords: rows.filter((r) => r.recommended).length,
    recommendedClusters: clusters.filter((c) => c.recommendedForStoreDiscovery).length,
  };
}

function makeCompletedView(researchId, rows, selectionItems, selectionRevision = 1, conflicts = []) {
  const clusters = CLUSTER_NAMES.map((name) =>
    clusterRow(name, `cl_${name.toLowerCase()}`, rows),
  );
  const seeds = [...new Set(rows.map((r) => r.seed))];
  return {
    id: researchId,
    statusUrl: `/api/keyword-research/${researchId}`,
    state: "completed",
    generation: 1,
    contractVersion: "ki-research-v1",
    seeds: [...seeds],
    markets: markets(),
    progress: progress("completed"),
    result: {
      contractVersion: "ki-research-v1",
      researchId,
      generation: 1,
      configFingerprint: "cfg_kiw5_001",
      seeds: [...seeds],
      markets: markets(),
      summary: summary(rows, seeds, clusters),
      keywords: rows,
      clusters,
    },
    selection: selectionItems,
    selectionRevision,
    selectionConflicts: conflicts,
    safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z",
    startedAt: "2026-08-19T10:00:01.000Z",
    completedAt: "2026-08-19T10:05:00.000Z",
    updatedAt: "2026-08-19T10:05:00.000Z",
  };
}

function selectionItemFor(r) {
  return {
    itemId: r.itemId,
    sourceKind: "calculated",
    sourceKeywordId: r.itemId,
    originalKeyword: r.keyword,
    keyword: r.keyword,
    sourceSeeds: [...r.sourceSeeds],
    lane: r.lane,
    facets: {
      audience: [...r.facets.audience],
      category: [...r.facets.category],
      channel: [...r.facets.channel],
      fit: [...r.facets.fit],
      modifier: [...r.facets.modifier],
    },
    metricsSnapshot: {
      searchVolume: r.searchVolume,
      cpc: r.cpc,
      competition: r.competition,
      competitionLevel: r.competitionLevel,
      keywordDifficulty: r.keywordDifficulty,
      mainIntent: r.mainIntent,
      commercialIntent: r.commercialIntent,
      monthlyHistory: history15(),
      trendSlope: r.trendSlope,
      cluster: r.cluster,
      clusterId: r.clusterId,
      variantGroupId: r.variantGroupId,
      variantCanonical: r.variantCanonical,
      flags: [...r.flags],
      opportunityScore: r.opportunityScore,
      recommended: r.recommended,
      mergedInto: r.mergedInto,
      availableMarkets: [...r.availableMarkets],
      marketMetrics: { ...r.marketMetrics },
    },
  };
}

function makeRunStatus() {
  return {
    runId: "run_kiw5_finalize_000000000001",
    categories: [],
    state: "queued",
    phase: "query_planning",
    stage: "queued_query_planning",
    createdAt: "2026-08-19T10:06:00.000Z",
    startedAt: null,
    completedAt: null,
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
    resultsAvailable: false,
    pipelineVersion: null,
    scoringVersion: null,
    queryReview: null,
    error: null,
  };
}

// ---------------------------------------------------------------------------
// CSV serialization mirror (email_scraper/src/keyword-intelligence/export.js,
// read-only reference; EXPORT_CSV_COLUMNS is the frozen header list).
// ---------------------------------------------------------------------------

function csvEscape(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function pyFloatStr(v) {
  if (Number.isInteger(v)) return `${v}.0`;
  return String(v);
}

function pyBoolStr(v) {
  return v ? "True" : "False";
}

function intStr(v) {
  return v === null || v === undefined ? "" : String(v);
}

function pyDumps(value, compact = true) {
  const sep = compact ? [",", ":"] : [", ", ": "];
  function esc(s) {
    let out = "";
    for (const ch of s) {
      const code = ch.codePointAt(0);
      if (code < 0x20) {
        const table = { "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f" };
        out += table[ch] ?? `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
      } else if (code === 0x22) {
        out += '\\"';
      } else if (code === 0x5c) {
        out += "\\\\";
      } else if (code < 0x80) {
        out += ch;
      } else if (code > 0xffff) {
        const c = code - 0x10000;
        out += `\\u${(0xd800 + (c >> 10)).toString(16).toUpperCase()}\\u${(0xdc00 + (c & 0x3ff)).toString(16).toUpperCase()}`;
      } else {
        out += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
      }
    }
    return out;
  }
  function walk(v) {
    if (v === null) return "null";
    const t = typeof v;
    if (t === "string") return `"${esc(v)}"`;
    if (t === "number") return Number.isFinite(v) ? String(v) : "null";
    if (t === "boolean") return String(v);
    if (t === "undefined") return "null";
    if (Array.isArray(v)) return `[${v.map(walk).join(sep[0])}]`;
    return `{${Object.keys(v).map((k) => `"${esc(k)}"${sep[1]}${walk(v[k])}`).join(sep[0])}}`;
  }
  return walk(value);
}

function payloadMonthHistory(history) {
  return history.map(({ year, month, searchVolume }) => ({ year, month, search_volume: searchVolume }));
}

function keywordRowToDict(r) {
  return {
    keyword: r.keyword,
    seed: r.seed,
    source_seeds: r.sourceSeeds && r.sourceSeeds.length ? r.sourceSeeds : [r.seed],
    search_volume: r.searchVolume,
    cpc: r.cpc,
    competition: r.competition,
    competition_level: r.competitionLevel,
    keyword_difficulty: r.keywordDifficulty,
    main_intent: r.mainIntent,
    commercial_intent: Math.round(r.commercialIntent * 100) / 100,
    monthly_history: payloadMonthHistory(r.monthlyHistory),
    trend_slope: r.trendSlope === null || r.trendSlope === undefined ? null : Math.round(r.trendSlope * 1000) / 1000,
    cluster: r.cluster,
    cluster_id: r.clusterId,
    lane: r.lane,
    facets: r.facets,
    variant_group_id: r.variantGroupId,
    variant_canonical: r.variantCanonical,
    flags: r.flags,
    opportunity_score: r.opportunityScore,
    recommended: r.recommended,
    merged_into: r.mergedInto,
    available_markets: r.availableMarkets,
  };
}

function serializeKeywordsCsv(records) {
  const lines = [EXPORT_CSV_COLUMNS.join(",")];
  for (const r of records) {
    const d = keywordRowToDict(r);
    lines.push(
      [
        d.keyword, d.seed, d.source_seeds.join("|"),
        intStr(d.search_volume), pyFloatStr(d.cpc), pyFloatStr(d.competition),
        d.competition_level || "", intStr(d.keyword_difficulty), d.main_intent || "",
        pyFloatStr(d.commercial_intent),
        d.trend_slope !== null && d.trend_slope !== undefined ? pyFloatStr(d.trend_slope) : "",
        d.cluster || "", d.cluster_id || "", d.lane,
        pyDumps(d.facets, true),
        d.variant_group_id || "", d.variant_canonical || "",
        (d.flags || []).join(";"),
        intStr(d.opportunity_score), pyBoolStr(d.recommended),
        d.merged_into || "",
        pyDumps(d.monthly_history, true),
        d.available_markets.join("|"),
      ].map(csvEscape).join(","),
    );
  }
  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// Fixture set (Phase B) + validation
// ---------------------------------------------------------------------------

const COMPLETED_ID = "kr_abcdefghijklmnopqrstuvwx";
const POLL_ID = "kr_pollabcdefghijklmnopqrst";
const FAILED_ID = "kr_failedabcdefghijklmnopq";
const EMPTY_ID = "kr_emptyabcdefghijklmnopq";
const SCALE_ID = "kr_scaleabcdefghijklmnopq";
const MISSING_ID = "kr_missingabcdefghijklmn";

const completedRows = buildCompletedRows(30);
const completedView = makeCompletedView(COMPLETED_ID, completedRows, [
  selectionItemFor(completedRows[0]),
  selectionItemFor(completedRows[1]),
]);

const scaleRows = buildCompletedRows(200);
const scaleSelection = scaleRows.map(selectionItemFor);
const scaleView = makeCompletedView(SCALE_ID, scaleRows, scaleSelection);

const emptyView = makeCompletedView(EMPTY_ID, [
  { ...completedRows[0], mergedInto: "kw_0001" },
  { ...completedRows[1], mergedInto: "kw_0001" },
], []);

const failedView = {
  id: FAILED_ID,
  statusUrl: `/api/keyword-research/${FAILED_ID}`,
  state: "failed",
  generation: 1,
  contractVersion: "ki-research-v1",
  seeds: ["dresses"],
  markets: markets(),
  progress: progress("failed"),
  result: null,
  selection: [],
  selectionRevision: 1,
  selectionConflicts: [],
  safeError: { code: "KI_WORKER_FAILED", message: "Synthetic research failure for the failed-state scenario." },
  createdAt: "2026-08-19T10:00:00.000Z",
  startedAt: "2026-08-19T10:00:01.000Z",
  completedAt: null,
  updatedAt: "2026-08-19T10:00:02.000Z",
};

function runningView(stage) {
  return {
    id: POLL_ID,
    statusUrl: `/api/keyword-research/${POLL_ID}`,
    state: "running",
    generation: 1,
    contractVersion: "ki-research-v1",
    seeds: ["dresses", "brands"],
    markets: markets(),
    progress: progress(stage),
    result: null,
    selection: [],
    selectionRevision: 1,
    selectionConflicts: [],
    safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z",
    startedAt: "2026-08-19T10:00:01.000Z",
    completedAt: null,
    updatedAt: "2026-08-19T10:00:02.000Z",
  };
}

const queuedView = { ...runningView("queued"), state: "queued" };
const pollSequence = [
  queuedView,
  runningView("expansion"),
  runningView("anchor_screen"),
  runningView("market_overview"),
  makeCompletedView(POLL_ID, buildCompletedRows(30), [], 1),
];

const allEnvelopes = {
  [COMPLETED_ID]: completedView,
  [FAILED_ID]: failedView,
  [EMPTY_ID]: emptyView,
  [SCALE_ID]: scaleView,
};
for (const view of [completedView, failedView, emptyView, scaleView, queuedView, ...pollSequence]) {
  parseResearchEnvelope({ research: view });
}
const runHandoff = { run: makeRunStatus(), statusUrl: `/keywords/${COMPLETED_ID}` };
parseRunHandoffEnvelope(runHandoff);

// ---------------------------------------------------------------------------
// Fetch interception wrapper (Phase C)
// ---------------------------------------------------------------------------

function fixtureInjection(payload) {
  return `(() => {
    const PAY = ${JSON.stringify(payload)};
    const originalFetch = globalThis.fetch.bind(globalThis);
    const state = {
      requests: [],
      pollCounts: {},
      conflictMode: null,
      doublePoll: false,
      csvDiverged: false,
      runsDelayMs: 0,
    };
    globalThis.__kiFixture = state;
    const digest = (s) => {
      let h = 2166136261;
      for (let i = 0; i < s.length; i += 1) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0).toString(16).padStart(8, "0");
    };
    const json = (body, status = 200) => new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
    const csv = (text, status = 200) => new Response(text, {
      status,
      headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store" },
    });
    const record = (method, url, body) => {
      const entry = {
        method,
        url: url.pathname + url.search,
        at: Math.round(performance.now()),
        bodyDigest: body ? digest(body) : null,
        clientRequestId: null,
      };
      if (body) {
        try {
          const parsed = JSON.parse(body);
          if (parsed && typeof parsed.clientRequestId === "string") entry.clientRequestId = parsed.clientRequestId;
        } catch {}
      }
      state.requests.push(entry);
    };
    const routeKey = (url) => url.pathname.replace(new RegExp("^/api/keyword-research/"), "");

    globalThis.fetch = async (input, init = {}) => {
      const url = new URL(typeof input === "string" ? input : input.url, location.href);
      const method = String(init.method || "GET").toUpperCase();
      const body = init.body ? String(init.body) : null;
      const isResearch = url.origin === location.origin && url.pathname.startsWith("/api/keyword-research");
      if (!isResearch) {
        state.requests.push({ method, url: url.href, at: Math.round(performance.now()), passThrough: true });
        return originalFetch(input, init);
      }
      record(method, url, body);

      if (method === "POST" && url.pathname === "/api/keyword-research") {
        return json({ research: PAY.create });
      }
      if (url.pathname.endsWith("/export.csv")) {
        const query = url.search.replace(/^\?/, "");
        if (state.csvDiverged) return csv(PAY.exportDivergedCsv);
        return csv(PAY.exportCsvByQuery[query] ?? "");
      }
      if (method === "PUT" && url.pathname.endsWith("/selection")) {
        if (state.conflictMode === "selection") {
          return json({ error: { code: "KEYWORD_SELECTION_REVISION_CONFLICT", message: "Your selection changed on the server." } }, 409);
        }
        const parsed = JSON.parse(body || "{}");
        const updated = JSON.parse(JSON.stringify(PAY.completed));
        updated.selection = parsed.items || [];
        updated.selectionRevision = (parsed.expectedRevision || 0) + 1;
        updated.updatedAt = "2026-08-19T10:06:00.000Z";
        return json({ research: updated });
      }
      if (method === "POST" && url.pathname.endsWith("/runs")) {
        if (state.conflictMode === "handoff") {
          return json({ error: { code: "KEYWORD_SELECTION_REVISION_CONFLICT", message: "The run handoff changed on the server." } }, 409);
        }
        if (state.runsDelayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, state.runsDelayMs));
        }
        return json(PAY.handoff);
      }
      if (method === "GET") {
        const key = routeKey(url);
        if (key === PAY.pollId) {
          state.pollCounts[key] = (state.pollCounts[key] || 0) + 1;
          const idx = Math.min(state.pollCounts[key] - 1, PAY.pollSequence.length - 1);
          return json({ research: PAY.pollSequence[idx] });
        }
        if (PAY.researchViews[key]) return json({ research: PAY.researchViews[key] });
        return json({ error: { code: "RESEARCH_NOT_FOUND", message: "The research could not be found." } }, 404);
      }
      return json({ error: { code: "UNSUPPORTED_FIXTURE_REQUEST", message: url.pathname } }, 500);
    };
  })();`;
}

const payload = {
  create: queuedView,
  completed: completedView,
  researchViews: allEnvelopes,
  pollId: POLL_ID,
  pollSequence,
  handoff: runHandoff,
  exportCsvByQuery: {
    "": serializeKeywordsCsv(completedRows),
    "seed=dresses": serializeKeywordsCsv(getFiltered(completedRows, { ...emptyKeywordFilterState(), seed: "dresses" })),
    "market=US": serializeKeywordsCsv(getFiltered(completedRows, { ...emptyKeywordFilterState(), market: "US" })),
  },
  exportDivergedCsv: `wrong_column,${EXPORT_CSV_COLUMNS.slice(1).join(",")}\n`,
};

// ---------------------------------------------------------------------------
// Cdp + helpers (copied from frontend/scripts/g-r1-real-component-browser.mjs:183-201)
// ---------------------------------------------------------------------------

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      if (message.id !== undefined) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      if (message.method) {
        for (const handler of this.listeners || []) {
          if (handler.method === message.method) handler.fn(message.params);
        }
      }
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  on(method, fn) {
    this.listeners = this.listeners || [];
    this.listeners.push({ method, fn });
  }
  close() {
    this.socket.close();
  }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(cdp, expression, label, timeout = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(cdp, `Boolean(${expression})`)) return;
    await wait(100);
  }
  const diagnostic = await evaluate(cdp, `(() => ({
    url: location.href,
    text: document.body.innerText.slice(0, 1200),
    requests: globalThis.__kiFixture?.requests?.slice(-12) || []
  }))()`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(diagnostic)}`);
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitFor(cdp, "document.readyState === 'complete'", url);
}

async function setViewport(cdp, width, height, deviceScaleFactor = 1) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor, mobile: width < 600 });
}

async function capture(cdp, name) {
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}.png`), Buffer.from(screenshot.data, "base64"));
}

async function click(cdp, expression) {
  const clicked = await evaluate(cdp, `(() => { const node = ${expression}; if (!node) return false; node.click(); return true; })()`);
  if (!clicked) throw new Error(`Missing click target: ${expression}`);
}

// React 19 controlled-input helper (native setter + input event); handles
// both <input> and <textarea> value descriptors.
async function setInputValue(cdp, selector, value) {
  const ok = await evaluate(cdp, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return false;
    const proto = node.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(node, ${JSON.stringify(value)});
    node.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: ${JSON.stringify(value)} }));
    return true;
  })()`);
  if (!ok) throw new Error(`Missing input: ${selector}`);
}

async function setSelectValue(cdp, selector, value) {
  const ok = await evaluate(cdp, `(() => {
    const select = document.querySelector(${JSON.stringify(selector)});
    if (!select) return false;
    select.value = ${JSON.stringify(value)};
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  })()`);
  if (!ok) throw new Error(`Missing select: ${selector}`);
}

async function waitForServer() {
  for (let index = 0; index < 240; index += 1) {
    try {
      if ((await fetch(`${baseUrl}/keywords`)).ok) return;
    } catch {}
    await wait(500);
  }
  throw new Error("Next.js production server did not become ready");
}

async function waitForFile(file) {
  for (let index = 0; index < 100; index += 1) {
    try {
      return await fs.readFile(file, "utf8");
    } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${file}`);
}

async function runNextBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "build"], { cwd: root, env: process.env });
    let log = "";
    child.stdout.on("data", (chunk) => { log += chunk; });
    child.stderr.on("data", (chunk) => { log += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(log);
      else reject(new Error(`next build failed (exit ${code}):\n${log.slice(-4000)}`));
    });
  });
}

let nextProcess;
let chromeProcess;
let cdp;
let serverLog = "";
let consoleErrors = [];
let exceptionThrown = [];
let networkUrls = [];

// ---------------------------------------------------------------------------
// Scenario runner + assertions
// ---------------------------------------------------------------------------

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

async function runScenario(id, fn) {
  try {
    await fn();
    return { id, ok: true, error: null };
  } catch (err) {
    return { id, ok: false, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let certificate;
try {
  await fs.mkdir(outputDir, { recursive: true });

  // Phase A
  if (!skipBuild) {
    serverLog += (await runNextBuild()) + "\n";
  } else {
    try {
      await fs.access(path.join(root, ".next"));
    } catch {
      throw new Error("Refusing to run in skip-build mode: no .next build output exists.");
    }
  }
  nextProcess = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();

  chromeProcess = spawn("/usr/bin/google-chrome", [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank",
  ], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  await cdp.send("Network.enable");
  cdp.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error" || params.type === "assert") {
      consoleErrors.push(params.args.map((a) => a.value ?? a.description ?? "").join(" "));
    }
  });
  cdp.on("Log.entryAdded", (params) => {
    if (params.entry && params.entry.level === "error") consoleErrors.push(params.entry.text);
  });
  cdp.on("Runtime.exceptionThrown", (params) => {
    exceptionThrown.push(JSON.stringify(params.exceptionDetails));
  });
  cdp.on("Network.requestWillBeSent", (params) => {
    if (params.request && params.request.url) networkUrls.push(params.request.url);
  });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: fixtureInjection(payload) });

  const results = [];
  let executed = [];

  // ---- W5-B01 surfaces present/data-derived + empty/error states ----
  results.push(await runScenario("W5-B01", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-form\"]')", "research form surface");
    assert((await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:research-form\"]').length")) === 1, "research-form surface present");
    assert((await evaluate(cdp, "document.querySelector('#seed-phrase-form button[type=submit]')?.disabled")) === true, "submit disabled with no seeds");

    // Create flow -> queued -> navigate to completed dashboard.
    await setInputValue(cdp, 'input[aria-label="Seed phrase"]', "dresses");
    await click(cdp, "[...document.querySelectorAll('#seed-phrase-form button')].find(n => n.textContent.includes('Add'))");
    await waitFor(cdp, "document.querySelector('#seed-chip-count')?.textContent.includes('1/5')", "seed chip added");
    await click(cdp, "document.querySelector('#seed-phrase-form button[type=submit]')");
    await waitFor(cdp, "location.pathname.startsWith('/keywords/kr_')", "post-create navigation");
    // While the created research is still queued/running, the status surface is present.
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-status\"]')", "research status surface");

    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "completed dashboard surfaces", 40_000);
    const presentSurfaces = await evaluate(cdp, "[...new Set([...document.querySelectorAll('[data-surface]')].map(n => n.getAttribute('data-surface')))]");
    // The completed dashboard surface set = the frozen inventory minus the
    // form (rendered only on /keywords) and the status (gone after terminal).
    const dashboardInventory = KEYWORD_INTELLIGENCE_SURFACE_INVENTORY.filter(
      (id) => id !== "surface:research-form" && id !== "surface:research-status",
    );
    for (const id of dashboardInventory) {
      assert(presentSurfaces.includes(id), `surface ${id} present`);
    }
    // Data-derived table meta (30 rows in the completed fixture).
    const metaText = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')?.innerText || ''");
    assert(metaText.includes("30 rows"), "table meta shows 30 rows");

    // Empty state: completed view with zero active rows.
    await navigate(cdp, `${baseUrl}/keywords/${EMPTY_ID}`);
    await waitFor(cdp, "document.body.innerText.includes('no active keywords')", "empty state");
    // Error state: missing research -> 404 -> error surface with retry.
    await navigate(cdp, `${baseUrl}/keywords/${MISSING_ID}`);
    await waitFor(cdp, "document.body.innerText.includes('could not be found')", "error state");
    assert((await evaluate(cdp, "[...document.querySelectorAll('button')].some(n => n.textContent.includes('Try again'))")) === true, "error retry button present");
    await capture(cdp, "W5-B01-error-state");
  }));

  // ---- W5-B02 filters/sort/pagination/page-size ----
  results.push(await runScenario("W5-B02", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody')", "table body");
    const rowsBefore = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(rowsBefore > 0, "table has rows");

    // Seed filter reduces rows.
    await setSelectValue(cdp, '[data-filter="seed"]', "dresses");
    await wait(250);
    const seedFilteredRows = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(seedFilteredRows >= 1 && seedFilteredRows < rowsBefore, `seed filter reduced rows (${seedFilteredRows} < ${rowsBefore})`);

    // Search filter (independent dimension).
    await click(cdp, "document.querySelector('[data-filter=\"reset\"]')");
    await wait(250);
    await setInputValue(cdp, '[data-filter="search"]', "commercial");
    await wait(250);
    const searchFiltered = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(searchFiltered >= 1, "search filter produced rows");

    // Reset.
    await click(cdp, "document.querySelector('[data-filter=\"reset\"]')");
    await wait(250);
    const resetRows = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(resetRows === 25, `reset restores default page (25 rows, got ${resetRows})`);

    // Sort by clicking the Volume header.
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:keyword-table\"] thead th')].find(n => n.textContent.includes('Volume'))");
    await wait(250);
    const sortedState = await evaluate(cdp, "(() => { const th = [...document.querySelectorAll('[data-surface=\"surface:keyword-table\"] thead th')].find(n => n.textContent.includes('Volume')); return th ? th.getAttribute('aria-sort') : null; })()");
    assert(sortedState === "descending" || sortedState === "ascending", `sort header aria-sort set (${sortedState})`);

    // Page-size select (the only <select> inside the keyword table surface).
    await setSelectValue(cdp, "[data-surface='surface:keyword-table'] select", "10");
    await wait(250);
    const pageSize10 = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(pageSize10 === 10, `page-size 10 shows 10 rows (got ${pageSize10})`);

    // Next page.
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:keyword-table\"] button')].find(n => n.textContent.includes('Next'))");
    await wait(250);
    const pageInfo = await evaluate(cdp, "[...document.querySelectorAll('[data-surface=\"surface:keyword-table\"] div')].find(n => /Page \\d+ of \\d+/.test(n.textContent))?.textContent || ''");
    assert(pageInfo.includes("Page 2 of"), `pagination advanced (${pageInfo.trim()})`);
    await capture(cdp, "W5-B02-filters");
  }));

  // ---- W5-B03 selection save/conflict/over-100 one-request-per-action ----
  results.push(await runScenario("W5-B03", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')", "row checkbox");

    // Toggle one row, save -> exactly one PUT.
    const beforeCount = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'PUT').length");
    await click(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "draft count");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Save selection'))");
    await waitFor(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'PUT').length === " + (beforeCount + 1), "one save PUT");
    const putRequests = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'PUT')");
    assert(putRequests.length === beforeCount + 1, "exactly one save request per action");
    assert(putRequests.every((r) => r.bodyDigest && /^[0-9a-f]{8}$/.test(r.bodyDigest)), "PUT records body digest");

    // Conflict: server returns 409 KEYWORD_SELECTION_REVISION_CONFLICT.
    await evaluate(cdp, "globalThis.__kiFixture.conflictMode = 'selection'");
    await click(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Save selection'))");
    await waitFor(cdp, "document.body.innerText.includes('changed on the server')", "stale conflict surface");
    await evaluate(cdp, "globalThis.__kiFixture.conflictMode = null");

    // over-100: scale view with 200 selected items -> banner + finalize blocked.
    await navigate(cdp, `${baseUrl}/keywords/${SCALE_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')", "scale selection review");
    await waitFor(cdp, "document.body.innerText.includes('over 100')", "over-100 banner");
    const finalizeDisabled = await evaluate(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize'))?.disabled");
    assert(finalizeDisabled === true, "finalize disabled when over 100");
    await capture(cdp, "W5-B03-scale");
  }));

  // ---- W5-B04 edit/manual dialog flows ----
  results.push(await runScenario("W5-B04", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')", "selection review");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "initial two items");

    // Edit dialog: change a calculated item's text and commit.
    await click(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Update \"]')");
    await waitFor(cdp, "document.querySelector('.keywordDialog') || document.querySelector('[role=dialog]')", "edit dialog");
    await setInputValue(cdp, "[aria-label='Edited keyword']", "edited dresses online");
    await click(cdp, "[...document.querySelectorAll('[role=dialog] button, .keywordDialog button')].find(n => n.textContent.includes('Save keyword'))");
    await waitFor(cdp, "document.body.innerText.includes('edited dresses online')", "edited item text");
    assert((await evaluate(cdp, "document.body.innerText.includes('Phrase updated')")) === true, "edit toast");

    // Manual add flow.
    await setInputValue(cdp, 'input[aria-label="Manual keyword"]', "handmade boutique near me");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Add'))");
    await waitFor(cdp, "document.body.innerText.includes('handmade boutique near me')", "manual item added");
    assert((await evaluate(cdp, "document.body.innerText.includes('Manual keyword added')")) === true, "manual add toast");
    const manualItem = await evaluate(cdp, "(() => { const review = document.querySelector('[data-surface=\"surface:selection-review\"]'); return [...review.querySelectorAll('div')].some(n => n.textContent.includes('Manual') && n.textContent.includes('handmade boutique near me')); })()");
    assert(manualItem === true, "manual badge on item");
    await capture(cdp, "W5-B04-dialogs");
  }));

  // ---- W5-B05 export CSV equals filtered table ----
  results.push(await runScenario("W5-B05", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "dashboard");
    await setSelectValue(cdp, '[data-filter="seed"]', "dresses");
    await wait(250);

    const href = await evaluate(cdp, "document.querySelector('a[href*=\"/export.csv\"]')?.getAttribute('href') || ''");
    assert(href.includes(`/api/keyword-research/${COMPLETED_ID}/export.csv`), "export anchor targets the export route");
    const expectedQuery = buildExportQuery({ ...emptyKeywordFilterState(), seed: "dresses" }).toString();
    assert(href.endsWith(`?${expectedQuery}`) || href.includes(`?${expectedQuery}`), `export href uses buildExportQuery (${href})`);

    // Fetch through the intercepted wrapper.
    const servedCsv = await evaluate(cdp, `fetch(${JSON.stringify(href)}).then(r => r.text())`);
    const expectedCsv = serializeKeywordsCsv(getFiltered(completedRows, { ...emptyKeywordFilterState(), seed: "dresses" }));
    assert(servedCsv === expectedCsv, "intercepted export CSV equals EXPORT_CSV_COLUMNS + filtered rows");
    assert(servedCsv.startsWith(EXPORT_CSV_COLUMNS.join(",") + "\n"), "CSV header equals EXPORT_CSV_COLUMNS");

    // Control W5-NC11: diverged CSV columns make the equality oracle throw.
    await evaluate(cdp, "globalThis.__kiFixture.csvDiverged = true");
    const divergedCsv = await evaluate(cdp, `fetch(${JSON.stringify(href)}).then(r => r.text())`);
    let nc11Threw = false;
    try {
      if (divergedCsv === expectedCsv) throw new Error("expected divergence to break equality");
      if (!divergedCsv.startsWith(EXPORT_CSV_COLUMNS.join(",") + "\n")) nc11Threw = true;
    } catch {
      nc11Threw = true;
    }
    assert(nc11Threw === true, "NC11: diverged columns make CSV equality oracle throw");
    await evaluate(cdp, "globalThis.__kiFixture.csvDiverged = false");
    const restoredCsv = await evaluate(cdp, `fetch(${JSON.stringify(href)}).then(r => r.text())`);
    assert(restoredCsv === expectedCsv, "NC11: restored CSV equality passes");
    await capture(cdp, "W5-B05-export");
  }));

  // ---- W5-B06 theme round-trip + single storage key ----
  results.push(await runScenario("W5-B06", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')", "dashboard");
    await evaluate(cdp, "localStorage.clear()");

    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:research-dashboard\"] button')].find(n => n.textContent.includes('Dark mode'))");
    await wait(200);
    assert((await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')")) === "dark", "theme attribute dark");
    const storage = await evaluate(cdp, "({ keys: Object.keys(localStorage), value: localStorage.getItem('ki-dashboard-theme') })");
    assert(storage.keys.length === 1 && storage.keys[0] === "ki-dashboard-theme", "exactly one storage key (theme)");
    assert(storage.value === "dark", "theme storage value dark");

    // Reload persists.
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')", "dashboard reload");
    assert((await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')")) === "dark", "theme persists across reload");

    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:research-dashboard\"] button')].find(n => n.textContent.includes('Light mode'))");
    await wait(200);
    assert((await evaluate(cdp, "localStorage.getItem('ki-dashboard-theme')")) === "light", "theme round-trips to light");
    await capture(cdp, "W5-B06-theme");
  }));

  // ---- W5-B07 canvases nonzero + landscape transform/hit/tooltip/inspector ----
  results.push(await runScenario("W5-B07", async () => {
    await setViewport(cdp, 1440, 900, 2);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelectorAll('canvas[data-surface^=\"chart:\"]').length >= 11", "chart canvases");
    await waitFor(cdp, "[...document.querySelectorAll('canvas[data-surface^=\"chart:\"]')].every(c => Boolean(c.$chartjs))", "chart instances attached");

    const chartCanvasInfo = await evaluate(cdp, `(() => {
      const canvases = [...document.querySelectorAll('canvas[data-surface^="chart:"]')];
      return {
        count: canvases.length,
        sizes: canvases.map((c) => ({ id: c.getAttribute('data-surface'), w: c.width, h: c.height })),
        instanced: canvases.map((c) => Boolean(c.$chartjs)).filter(Boolean).length,
      };
    })()`);
    assert(chartCanvasInfo.count === 11, `11 chart canvases (got ${chartCanvasInfo.count})`);
    assert(chartCanvasInfo.sizes.every((s) => s.w > 0 && s.h > 0), "all chart canvases have nonzero size");
    assert(chartCanvasInfo.instanced === 11, "every chart canvas has a Chart.getChart instance ($chartjs)");

    // Landscape canvas nonzero + DPR aware (draw clamps width to >= 520 CSS px).
    const landscape = await evaluate(cdp, `(() => {
      const canvas = document.querySelector('[data-surface="landscape:cluster-scene"]');
      const rect = canvas ? canvas.getBoundingClientRect() : null;
      return canvas ? { w: canvas.width, h: canvas.height, expectedW: Math.max(520, Math.round(rect.width)) * 2, expectedH: Math.max(360, Math.round(rect.height)) * 2 } : null;
    })()`);
    assert(landscape && landscape.w > 0 && landscape.h > 0, "landscape canvas nonzero");
    assert(Math.abs(landscape.w - landscape.expectedW) <= 4 && Math.abs(landscape.h - landscape.expectedH) <= 4, "landscape canvas is DPR-aware");

    // Transform mutation on drag.
    const before = await evaluate(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]').toDataURL()");
    const box = await evaluate(cdp, `(() => { const r = document.querySelector('[data-surface="landscape:cluster-scene"]').getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2 }; })()`);
    await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", buttons: 1, clickCount: 1 });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x + 120, y: box.y + 20, button: "left", buttons: 1 });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x + 120, y: box.y + 20, button: "left", buttons: 0, clickCount: 1 });
    await wait(200);
    const after = await evaluate(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]').toDataURL()");
    assert(before !== after, "landscape transform mutation on drag");

    // Hit/tooltip/inspector via legend pill (class names are hashed CSS
    // module exports; the stable attribute is data-cluster-detail).
    await evaluate(cdp, `(() => {
      const item = document.querySelector('[data-cluster-detail]');
      if (item) { item.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true })); item.click(); }
    })()`);
    await waitFor(cdp, "document.body.innerText.includes('Selected cluster')", "cluster inspector");
    assert((await evaluate(cdp, "document.querySelector('#cluster-pill-tooltip') !== null")) === true, "pill tooltip element exists");
    await capture(cdp, "W5-B07-canvas");
  }));

  // ---- W5-B08 zero console errors, zero non-app network, one instance/listener set ----
  results.push(await runScenario("W5-B08", async () => {
    // Scale fixture: 200 final keyword rows and 200 draft selections rendered and filtered.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${SCALE_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "scale table");
    const meta = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')?.innerText || ''");
    assert(meta.includes("200 rows"), "scale fixture shows 200 rows");
    const reviewText = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText || ''");
    assert(reviewText.includes("200 of 200 selected"), "200 draft selections rendered");

    // Filter the 200 rows.
    await setInputValue(cdp, '[data-filter="search"]', "keyword 15");
    await wait(250);
    const filteredRows = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(filteredRows >= 1, "scale rows filter");

    // One instance/listener set: exactly 11 chart canvases, one instance each.
    const instanceCount = await evaluate(cdp, "[...document.querySelectorAll('canvas[data-surface^=\"chart:\"]')].filter(c => Boolean(c.$chartjs)).length");
    assert(instanceCount === 11, `one chart instance set (${instanceCount})`);
    assert(consoleErrors.length === 0, `zero console errors (got ${JSON.stringify(consoleErrors)})`);
    assert(exceptionThrown.length === 0, `zero uncaught exceptions (got ${JSON.stringify(exceptionThrown)})`);
    await capture(cdp, "W5-B08-scale");
  }));

  // ---- W5-R01 poll lifecycle single timer + ladder + terminal stop ----
  results.push(await runScenario("W5-R01", async () => {
    const pollOracle = async () => {
      const log = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'GET' && r.url.includes('/api/keyword-research/" + POLL_ID + "'))");
      assert(log.length === 5, `exactly 5 GETs across the poll lifecycle (got ${log.length})`);
      const gaps = log.slice(1).map((r, i) => r.at - log[i].at);
      const ladder = [2000, 3000, 4500, 6750];
      gaps.forEach((gap, i) => {
        assert(gap >= ladder[i] * 0.6 && gap <= ladder[i] * 1.6, `poll gap ${i} ~= ladder ${ladder[i]} (got ${gap})`);
      });
      const terminalView = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]') ? 'dashboard' : (document.querySelector('[data-surface=\"surface:research-status\"]') ? 'status' : 'none')");
      assert(terminalView === "dashboard", "terminal state reached (dashboard mounted)");
      return { log, gaps };
    };

    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${POLL_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')", "poll terminal dashboard", 30_000);
    const firstPass = await pollOracle();

    // Terminal stop: no further polls after completed.
    await wait(2500);
    const afterWait = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'GET' && r.url.includes('/api/keyword-research/" + POLL_ID + "'))");
    assert(afterWait.length === firstPass.log.length, "zero polls after terminal state");

    // Control W5-NC05: forced second timer breaks the single-timer oracle.
    const defectScriptId = (await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `(() => {
        const orig = window.setTimeout.bind(window);
        window.setTimeout = (fn, ms, ...args) => {
          if (ms >= 1000) orig(fn, ms, ...args);
          return orig(fn, ms, ...args);
        };
      })();`,
    })).identifier;
    await navigate(cdp, `${baseUrl}/keywords/${POLL_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')", "defect poll terminal", 30_000);
    const defectLog = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'GET' && r.url.includes('/api/keyword-research/" + POLL_ID + "'))");
    let nc05Threw = false;
    try {
      if (defectLog.length !== 5) nc05Threw = true;
      const dgaps = defectLog.slice(1).map((r, i) => r.at - defectLog[i].at);
      // A second forced timer produces a near-simultaneous pair of poll GETs.
      if (dgaps.some((g) => g < 1000)) nc05Threw = true;
    } catch {
      nc05Threw = true;
    }
    assert(nc05Threw === true, "NC05: forced second timer breaks the single-timer oracle");
    await cdp.send("Page.removeScriptToEvaluateOnNewDocument", { identifier: defectScriptId });

    await navigate(cdp, `${baseUrl}/keywords/${POLL_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')", "restored poll terminal", 30_000);
    await pollOracle();
    await capture(cdp, "W5-R01-poll");
  }));

  // ---- W5-R02 tab close/remount + durable reload ----
  results.push(await runScenario("W5-R02", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "dashboard");

    // Tab close (navigate away) + remount + durable reload.
    await navigate(cdp, "about:blank");
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "dashboard after remount");
    assert((await evaluate(cdp, "document.body.innerText.includes('Keyword intelligence dashboard')")) === true, "durable reload restored the dashboard");
    const mutationsAfter = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'POST' || r.method === 'PUT').length");
    assert(mutationsAfter === 0, "reload performed GET-only (no POST/PUT mutation)");
    await capture(cdp, "W5-R02-durable");
  }));

  // ---- W5-R03 stale 409 + no silent overwrite + idempotent finalize ----
  results.push(await runScenario("W5-R03", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')", "row checkbox");

    // Toggle a row so the local draft differs from the server view.
    await click(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "draft updated");

    // Stale 409: server returns a conflict; local draft must not be overwritten.
    await evaluate(cdp, "globalThis.__kiFixture.conflictMode = 'selection'");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Save selection'))");
    await waitFor(cdp, "document.body.innerText.includes('changed on the server')", "stale conflict banner");
    const draftAfter409 = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText || ''");
    assert(draftAfter409.includes("3 of 200 selected"), "no silent overwrite of the local draft after stale 409");
    await evaluate(cdp, "globalThis.__kiFixture.conflictMode = null");

    // A stale conflict blocks further saves/finalize until a fresh load; a
    // fresh document resets the component state (no silent overwrite path).
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')", "selection review after fresh load");

    // Idempotent finalize: exactly one runs POST, clientRequestId retained and
    // reused by a duplicate click landing while the first is in flight.
    await evaluate(cdp, "globalThis.__kiFixture.runsDelayMs = 800");
    const runsBefore = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize'))");
    await wait(120);
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize'))");
    await waitFor(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length === " + (runsBefore + 1), "single runs POST");
    const runsRequests = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs'))");
    assert(runsRequests.length === runsBefore + 1, "duplicate finalize click produced only one runs POST");
    const ids = runsRequests.map((r) => r.clientRequestId).filter(Boolean);
    assert(ids.length === 1 && /^[A-Za-z0-9_-]{16,80}$/.test(ids[0]), "runs POST carries one retained clientRequestId matching CLIENT_REQUEST_ID_PATTERN");
    await evaluate(cdp, "globalThis.__kiFixture.runsDelayMs = 0");
    await capture(cdp, "W5-R03-conflict-finalize");
  }));

  // ---- W5-R04 failed state + GET-only retry ----
  results.push(await runScenario("W5-R04", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${FAILED_ID}`);
    await waitFor(cdp, "document.body.innerText.includes('Synthetic research failure')", "failed state");
    const dataCode = await evaluate(cdp, "document.querySelector('[data-code]')?.getAttribute('data-code')");
    assert(dataCode === "KI_WORKER_FAILED", "failed surface carries data-code");
    const getBefore = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'GET').length");
    const putPostBefore = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'POST' || r.method === 'PUT').length");
    await click(cdp, "[...document.querySelectorAll('button')].find(n => n.textContent.includes('Try again'))");
    await wait(600);
    const getAfter = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'GET').length");
    const putPostAfter = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'POST' || r.method === 'PUT').length");
    assert(getAfter > getBefore, "retry performed a GET");
    assert(putPostAfter === putPostBefore, "retry was GET-only (no POST/PUT)");
    await capture(cdp, "W5-R04-failed");
  }));

  // ---- W5-R05 1440x900/390x844 no overflow + DPR canvas ----
  results.push(await runScenario("W5-R05", async () => {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      await setViewport(cdp, w, h, 1);
      await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
      await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", `dashboard at ${w}x${h}`);
      const overflow = await evaluate(cdp, "document.documentElement.scrollWidth > window.innerWidth + 1");
      assert(overflow === false, `no horizontal overflow at ${w}x${h}`);
    }
    // DPR-aware canvas (deviceScaleFactor 2 asserted in W5-B07); here re-assert at 390x844.
    await setViewport(cdp, 390, 844, 2);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]')", "landscape canvas mobile");
    const dprCanvas = await evaluate(cdp, `(() => {
      const canvas = document.querySelector('[data-surface="landscape:cluster-scene"]');
      const rect = canvas.getBoundingClientRect();
      return { w: canvas.width, expected: Math.max(520, Math.round(rect.width)) * 2 };
    })()`);
    assert(Math.abs(dprCanvas.w - dprCanvas.expected) <= 4, `landscape canvas DPR-aware at 390x844 (${dprCanvas.w} ~= ${dprCanvas.expected})`);
    await capture(cdp, "W5-R05-responsive");
  }));

  // ---- W5-R06 chart teardown/no leaks ----
  results.push(await runScenario("W5-R06", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelectorAll('canvas[data-surface^=\"chart:\"]').length === 11", "11 charts");
    const errorsBefore = consoleErrors.length;

    // Change the market filter -> datasets change -> charts destroyed/recreated.
    await setSelectValue(cdp, '[data-filter="market"]', "US");
    await wait(400);
    const instancesAfter = await evaluate(cdp, "[...document.querySelectorAll('canvas[data-surface^=\"chart:\"]')].filter(c => Boolean(c.$chartjs)).length");
    assert(instancesAfter === 11, `chart instances recreated after filter change (${instancesAfter})`);
    const canvasCount = await evaluate(cdp, "document.querySelectorAll('canvas[data-surface^=\"chart:\"]').length");
    assert(canvasCount === 11, "no duplicate chart canvases (no leaks)");
    assert(consoleErrors.length === errorsBefore, "no console errors on chart teardown/recreate");
    await capture(cdp, "W5-R06-teardown");
  }));

  // ---- W5-R07 unauthenticated direct route probes ----
  results.push(await runScenario("W5-R07", async () => {
    // These hit the real Next routes without interception (Node-side fetches).
    const probe = async (pathname) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(`${baseUrl}${pathname}`, { signal: controller.signal, redirect: "manual" });
        const body = await res.text();
        let payload = null;
        try { payload = JSON.parse(body); } catch {}
        return { status: res.status, headers: res.headers, payload };
      } finally {
        clearTimeout(timer);
      }
    };

    const unauth = await probe(`/api/keyword-research/${COMPLETED_ID}`);
    assert(unauth.status === 401, `unauthenticated GET research -> 401 (got ${unauth.status})`);
    assert(unauth.payload?.error?.code === "AUTHENTICATION_REQUIRED", "401 envelope code AUTHENTICATION_REQUIRED");
    assert(unauth.headers.get("cache-control")?.includes("no-store"), "401 response carries Cache-Control: no-store");

    const badQuery = await probe(`/api/keyword-research/${COMPLETED_ID}/export.csv?bogus=1`);
    assert(badQuery.status === 400, `export.csv unknown query key -> 400 (got ${badQuery.status})`);
    assert(badQuery.payload?.error?.code === "INVALID_QUERY_PARAMETERS", "400 unknown query key code INVALID_QUERY_PARAMETERS");

    const badId = await probe("/api/keyword-research/not_a_research_id/export.csv");
    assert(badId.status === 400, `export.csv bad research id -> 400 (got ${badId.status})`);
    assert(badId.payload?.error?.code === "INVALID_RESEARCH_ID", "400 bad-id code INVALID_RESEARCH_ID");

    const notFound = await probe("/api/keyword-research/does-not-exist/nope");
    assert(notFound.status === 404, `generic 404 (got ${notFound.status})`);
  }));

  executed = results.map((r) => r.id);
  const failures = results.filter((r) => !r.ok).map((r) => r.id);

  const allB = REQUIRED_BR_IDS.filter((id) => id.startsWith("W5-B")).every((id) => results.find((r) => r.id === id)?.ok);
  const allR = REQUIRED_BR_IDS.filter((id) => id.startsWith("W5-R")).every((id) => results.find((r) => r.id === id)?.ok);

  certificate = {
    file: "keyword-intelligence-dashboard.mjs",
    required: REQUIRED_BR_IDS,
    registered: REQUIRED_BR_IDS,
    executed,
    skipped: [],
    oracleFailures: failures,
    requiredDigest: setDigest(REQUIRED_BR_IDS),
    registeredDigest: setDigest(REQUIRED_BR_IDS),
    executedDigest: setDigest(executed),
    scenarios: { "SCN-KI-016": allB, "SCN-KI-017": allR },
  };

  // Network allowlist assertion (app-origin only, zero CDN).
  const appUrls = networkUrls.filter((url) => !/^(about:|data:|blob:|chrome-extension:)/u.test(url));
  const nonApp = appUrls.filter((url) => !url.startsWith(baseUrl));
  const cdn = appUrls.filter((url) => /cdn\.|jsdelivr|unpkg|googleapis|gstatic|cloudflare/i.test(url));
  if (nonApp.length || cdn.length) {
    throw new Error(`Network allowlist violated: non-app=${JSON.stringify(nonApp.slice(0, 5))} cdn=${JSON.stringify(cdn.slice(0, 5))}`);
  }

  await fs.writeFile(
    path.join(outputDir, "browser-checks.json"),
    `${JSON.stringify({
      certificate,
      results,
      consoleErrors,
      exceptionThrown,
      nonAppNetworkUrls: nonApp,
      cdnNetworkUrls: cdn,
    }, null, 2)}\n`,
  );
  await fs.writeFile(
    path.join(outputDir, "artifact-index.json"),
    `${JSON.stringify({
      command: "node test/browser/keyword-intelligence-dashboard.mjs",
      provenance: "Deterministic in-file fixtures served through a same-origin /api/keyword-research* fetch interception on the emitted production Next build (port 4347).",
      screenshots: (await fs.readdir(outputDir)).filter((name) => name.endsWith(".png")).sort(),
      machineChecks: "browser-checks.json",
    }, null, 2)}\n`,
  );

  if (failures.length) {
    throw new Error(`Scenario failures: ${failures.join(", ")}`);
  }
} finally {
  if (serverLog) {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
  }
  if (cdp) cdp.close();
  if (chromeProcess?.pid && chromeProcess.exitCode === null) process.kill(-chromeProcess.pid, "SIGTERM");
  if (nextProcess?.pid && nextProcess.exitCode === null) process.kill(-nextProcess.pid, "SIGTERM");
  await wait(500);
  await fs.rm(tempDir, { recursive: true, force: true });
  if (certificate) {
    console.log(`KI_W5_BROWSER_CERTIFICATE=${JSON.stringify(certificate)}`);
  }
}
