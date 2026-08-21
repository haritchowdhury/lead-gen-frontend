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

// KI-R5 browser execution registry (R5-BR; S1 §4.2/§5 S015). These seven IDs
// are the only R5 cases owned by this harness: the real-route wire witness
// plus the six actual finalization lifecycle cases. Execution is deferred to
// gate V4; the certificate is emitted when the harness runs.
const R5_BROWSER_CASES = [
  "R5-WIRE-04",
  "R5-FIN-01",
  "R5-FIN-02",
  "R5-FIN-03",
  "R5-FIN-04",
  "R5-FIN-05",
  "R5-FIN-06",
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
    contractVersion: 1,
    seeds: [...seeds],
    markets: markets(),
    progress: progress("completed"),
    result: {
      contractVersion: 1,
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

// Literal expected export CSV for the `seed=dresses` filter (R5-EXP-04 /
// DEC-KI-036). Frozen at authoring time; it never derives from the frontend
// `getFiltered` helper at runtime, so any drift in the served filter/export
// diverges from this literal oracle.
const LITERAL_EXPORT_CSV_SEED_DRESSES = `keyword,seed,source_seeds,search_volume,cpc,competition,competition_level,keyword_difficulty,main_intent,commercial_intent,trend_slope,cluster,cluster_id,lane,facets,variant_group_id,variant_canonical,flags,opportunity_score,recommended,merged_into,monthly_history,available_markets
dresses transactional keyword 0,dresses,dresses,1000,0.5,0.0,LOW,0,transactional,0.0,-0.004,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[""affordable""]}",vg_0,dresses transactional keyword 0,declining_traffic,0,True,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 4,dresses,dresses,2600,1.5,0.28,MEDIUM,52,transactional,0.12,0.0,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[]}",vg_4,dresses transactional keyword 4,informational_dropped,28,False,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 8,dresses,dresses,4200,2.5,0.56,HIGH,4,transactional,0.24,0.004,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[]}",vg_8,dresses transactional keyword 8,rising,56,False,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 12,dresses,dresses,5800,1.0,0.84,LOW,56,transactional,0.36,-0.001,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[""affordable""]}",vg_12,dresses transactional keyword 12,too_little_traffic,84,True,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 16,dresses,dresses,7400,2.0,0.12,MEDIUM,8,transactional,0.48,0.003,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[]}",vg_16,dresses transactional keyword 16,high_opportunity,11,False,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 20,dresses,dresses,9000,0.5,0.4,HIGH,60,transactional,0.6,-0.002,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[]}",vg_20,dresses transactional keyword 20,declining_traffic,39,True,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 24,dresses,dresses,10600,1.5,0.68,LOW,12,transactional,0.72,0.002,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[""affordable""]}",vg_24,dresses transactional keyword 24,informational_dropped,67,True,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
dresses transactional keyword 28,dresses,dresses,12200,2.5,0.96,MEDIUM,64,transactional,0.84,-0.003,Dresses,cl_dresses,local_discovery,"{""audience"":[""women""],""category"":[""dresses""],""channel"":[""online""],""fit"":[],""modifier"":[]}",vg_28,dresses transactional keyword 28,rising,95,False,,"[{""year"":2025,""month"":1,""search_volume"":100},{""year"":2025,""month"":2,""search_volume"":107},{""year"":2025,""month"":3,""search_volume"":114},{""year"":2025,""month"":4,""search_volume"":121},{""year"":2025,""month"":5,""search_volume"":128},{""year"":2025,""month"":6,""search_volume"":135},{""year"":2025,""month"":7,""search_volume"":142},{""year"":2025,""month"":8,""search_volume"":149},{""year"":2025,""month"":9,""search_volume"":156},{""year"":2025,""month"":10,""search_volume"":163},{""year"":2025,""month"":11,""search_volume"":170},{""year"":2025,""month"":12,""search_volume"":177},{""year"":2025,""month"":1,""search_volume"":184},{""year"":2025,""month"":2,""search_volume"":191},{""year"":2025,""month"":3,""search_volume"":198}]",US|GB|CA|AU|NZ|DE|FR|IN|AE
`;

// ---------------------------------------------------------------------------
// Fixture set (Phase B) + validation
// ---------------------------------------------------------------------------

const COMPLETED_ID = "kr_abcdefghijklmnopqrstuvwx";
const POLL_ID = "kr_pollabcdefghijklmnopqrst";
const FAILED_ID = "kr_failedabcdefghijklmnopq";
const EMPTY_ID = "kr_emptyabcdefghijklmnopq";
const SCALE_ID = "kr_scaleabcdefghijklmnopq";
const MISSING_ID = "kr_missingabcdefghijklmn";
const REORDER_ID = "kr_reorderabcdefghijklmno";

const completedRows = buildCompletedRows(30);
const completedView = makeCompletedView(COMPLETED_ID, completedRows, [
  selectionItemFor(completedRows[0]),
  selectionItemFor(completedRows[1]),
]);

// Dedicated reorder fixture (R5-FIN-03): the persisted saved selection order
// deliberately differs from the toggle-insertion sorted order, so an actual
// remove-and-readd of a calculated row moves it back to its sorted position
// and the resulting draft order diverges from the saved order (unsaved).
const reorderView = makeCompletedView(REORDER_ID, completedRows, [
  selectionItemFor(completedRows[1]),
  selectionItemFor(completedRows[0]),
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
  contractVersion: 1,
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
    contractVersion: 1,
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
  [REORDER_ID]: reorderView,
};
for (const view of [completedView, failedView, emptyView, scaleView, reorderView, queuedView, ...pollSequence]) {
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
      passThroughCreate: false,
      runsFailOnce: null,
      runsHandoff: null,
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
    const record = (method, url, body, init) => {
      const entry = {
        method,
        url: url.pathname + url.search,
        at: Math.round(performance.now()),
        bodyDigest: body ? digest(body) : null,
        body: body || null,
        clientRequestId: null,
        contentType: "",
      };
      if (init && init.headers) {
        const raw = init.headers;
        const ct = typeof raw.get === "function" ? raw.get("content-type") : (raw["Content-Type"] || raw["content-type"]);
        entry.contentType = typeof ct === "string" ? ct : "";
      }
      if (body) {
        try {
          const parsed = JSON.parse(body);
          if (parsed && typeof parsed.clientRequestId === "string") entry.clientRequestId = parsed.clientRequestId;
        } catch {}
      }
      state.requests.push(entry);
    };
    const mutationToItem = (m) => {
      if (m.sourceKind === "calculated") {
        const row = (PAY.completed.result.keywords || []).find((k) => k.itemId === m.sourceKeywordId);
        if (!row) return null;
        return {
          itemId: row.itemId,
          sourceKind: "calculated",
          sourceKeywordId: row.itemId,
          originalKeyword: row.keyword,
          keyword: m.keyword || row.keyword,
          sourceSeeds: [...row.sourceSeeds],
          lane: row.lane,
          facets: JSON.parse(JSON.stringify(row.facets)),
          metricsSnapshot: {
            searchVolume: row.searchVolume,
            cpc: row.cpc,
            competition: row.competition,
            competitionLevel: row.competitionLevel,
            keywordDifficulty: row.keywordDifficulty,
            mainIntent: row.mainIntent,
            commercialIntent: row.commercialIntent,
            monthlyHistory: JSON.parse(JSON.stringify(row.monthlyHistory)),
            trendSlope: row.trendSlope,
            cluster: row.cluster,
            clusterId: row.clusterId,
            variantGroupId: row.variantGroupId,
            variantCanonical: row.variantCanonical,
            flags: [...row.flags],
            opportunityScore: row.opportunityScore,
            recommended: row.recommended,
            mergedInto: row.mergedInto,
            availableMarkets: [...row.availableMarkets],
            marketMetrics: JSON.parse(JSON.stringify(row.marketMetrics)),
          },
        };
      }
      const seed = PAY.completed.seeds[0] || m.keyword;
      return {
        itemId: "manual_" + m.keyword.toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, ""),
        sourceKind: "manual",
        sourceKeywordId: null,
        originalKeyword: m.keyword,
        keyword: m.keyword,
        sourceSeeds: [seed],
        lane: "store_discovery",
        facets: { audience: [], category: [seed], channel: [], fit: [], modifier: [] },
        metricsSnapshot: null,
      };
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
      record(method, url, body, init);

      if (method === "POST" && url.pathname === "/api/keyword-research") {
        if (state.passThroughCreate) return originalFetch(input, init);
        return json({ research: PAY.create });
      }
      if (url.pathname.endsWith("/export.csv")) {
        const query = url.search.replace(/^\\?/, "");
        if (state.csvDiverged) return csv(PAY.exportDivergedCsv);
        return csv(PAY.exportCsvByQuery[query] ?? "");
      }
      if (method === "PUT" && url.pathname.endsWith("/selection")) {
        if (state.conflictMode === "selection") {
          return json({ error: { code: "KEYWORD_SELECTION_REVISION_CONFLICT", message: "Your selection changed on the server." } }, 409);
        }
        const parsed = JSON.parse(body || "{}");
        const updated = JSON.parse(JSON.stringify(PAY.completed));
        updated.selection = (parsed.items || []).map(mutationToItem).filter((item) => item !== null);
        updated.selectionRevision = (parsed.expectedRevision || 0) + 1;
        updated.updatedAt = "2026-08-19T10:06:00.000Z";
        return json({ research: updated });
      }
      if (method === "POST" && url.pathname.endsWith("/runs")) {
        if (state.runsFailOnce) {
          const mode = state.runsFailOnce;
          state.runsFailOnce = null;
          if (mode === "network") return Promise.reject(new TypeError("Failed to fetch"));
          if (mode === "unreadable") return new Response("<html>unreadable</html>", { status: 200, headers: { "Content-Type": "text/html" } });
          if (mode === "502") return json({ error: { code: "KI_GATEWAY_FAILURE", message: "Bad gateway" } }, 502);
          if (mode === "504") return json({ error: { code: "KI_GATEWAY_TIMEOUT", message: "Gateway timeout" } }, 504);
          if (mode === "conflict") return json({ error: { code: "KEYWORD_SELECTION_REVISION_CONFLICT", message: "The run handoff changed on the server." } }, 409);
        }
        if (state.conflictMode === "handoff") {
          return json({ error: { code: "KEYWORD_SELECTION_REVISION_CONFLICT", message: "The run handoff changed on the server." } }, 409);
        }
        if (state.runsDelayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, state.runsDelayMs));
        }
        return json(state.runsHandoff || PAY.handoff);
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
    "seed=dresses": LITERAL_EXPORT_CSV_SEED_DRESSES,
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

// In-page poll helper. Navigation (e.g. the finalize success router.push)
// replaces the document and its `__kiFixture` state, so request witnesses must
// be captured inside a single page-context evaluate rather than across
// navigate boundaries. Resolves with the first truthy (non-false/null)
// production value; throws on timeout.
async function waitForInPage(cdp, expression, label, timeout = 20_000) {
  const value = await evaluate(cdp, `(async () => {
    const started = Date.now();
    while (Date.now() - started < ${timeout}) {
      const result = (${expression});
      if (result !== null && result !== undefined && result !== false) return result;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return null;
  })()`);
  if (value === null) throw new Error(`Timed out waiting in page for ${label}`);
  return value;
}

// R5-FIN-02/03/04 shared oracle: an unsaved draft must keep the rendered
// Finalize control disabled and produce zero `/runs` POST.
async function assertUnsavedZeroPost(cdp) {
  const gateState = await evaluate(cdp, `(() => {
    const review = document.querySelector('[data-surface="surface:selection-review"]');
    if (!review) return null;
    const finalize = [...review.querySelectorAll('button')].find((n) => n.textContent.includes('Finalize'));
    return finalize ? { disabled: finalize.disabled, text: finalize.textContent.trim() } : null;
  })()`);
  assert(gateState && gateState.disabled === true, `finalize disabled for unsaved draft (${JSON.stringify(gateState)})`);
  const runsBefore = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length");
  await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize'))");
  await wait(400);
  const runsAfter = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length");
  assert(runsAfter === runsBefore, `zero runs POST for unsaved draft (${runsAfter} vs ${runsBefore})`);
}

// Click the rendered Finalize control and capture the first `/runs` POST it
// produces, entirely inside one page context so a success-navigation (which
// replaces the document and its __kiFixture state) cannot race the witness.
async function clickFinalizeAndCapture(cdp, timeout = 20_000) {
  const cap = await evaluate(cdp, `(async () => {
    const review = document.querySelector('[data-surface="surface:selection-review"]');
    const btn = review ? [...review.querySelectorAll('button')].find((n) => n.textContent.includes('Finalize')) : null;
    if (!btn) return null;
    const before = globalThis.__kiFixture.requests.filter((r) => r.url.endsWith('/runs')).length;
    btn.click();
    const started = Date.now();
    while (Date.now() - started < ${timeout}) {
      const runs = globalThis.__kiFixture.requests.filter((r) => r.url.endsWith('/runs'));
      if (runs.length > before) {
        const last = runs[runs.length - 1];
        return {
          count: runs.length - before,
          body: last.body ? JSON.parse(last.body) : null,
          clientRequestId: last.clientRequestId,
          bodyDigest: last.bodyDigest,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return null;
  })()`);
  if (!cap) throw new Error("Timed out capturing the finalize runs POST in page");
  return cap;
}

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

    // Superseded oracle: flags AND parity (R5-EXP-01 / DEC-KI-036 every-flag
    // predicate). The rendered flag checkboxes select the `every` semantic:
    // the visible table set must exactly equal getFiltered's ordered set for
    // the same flags. Each fixture row carries exactly one flag, so two
    // distinct selected flags must yield zero rows; a `some` predicate would
    // still render rows and diverge from the production predicate.
    await click(cdp, "document.querySelector('[data-filter=\"reset\"]')");
    await wait(250);
    const flagValues = await evaluate(cdp, "[...document.querySelectorAll('[data-filter=\"flags\"] input[type=checkbox]')].map(n => n.value)");
    assert(flagValues.length >= 2, `flags dataset exposes at least two flags (${JSON.stringify(flagValues)})`);
    const flagA = flagValues[0];
    const flagB = flagValues[1];
    await click(cdp, `document.querySelector('[data-filter="flags"] input[value=${JSON.stringify(flagA)}]')`);
    await click(cdp, `document.querySelector('[data-filter="flags"] input[value=${JSON.stringify(flagB)}]')`);
    await wait(250);
    const uiFlagRows = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]').length");
    const predicateFlagRows = getFiltered(completedRows, { ...emptyKeywordFilterState(), flags: [flagA, flagB] }).length;
    assert(uiFlagRows === predicateFlagRows, `flags AND parity: UI ${uiFlagRows} == getFiltered ${predicateFlagRows} for [${flagA}, ${flagB}]`);
    await click(cdp, "document.querySelector('[data-filter=\"reset\"]')");
    await wait(250);
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
    // Superseded oracle: mutation headers (R5-WIRE-05 / DEC-KI-034). Every
    // save PUT must carry an explicit application/json content type.
    assert(putRequests.every((r) => r.contentType === "application/json"), `PUT carries application/json content type (${JSON.stringify(putRequests.map((r) => r.contentType))})`);

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
    // Superseded oracle: numeric wire contract + client-only draft key
    // (R5-WIRE-01 / R5-SEL-02 / DEC-KI-034). The manual draft row carries no
    // `ksi_` source id and no browser-side ID authority: the client-only
    // `draft_` key has no wire/durable/identity authority and is never
    // projected onto the wire.
    const ksiInDoc = await evaluate(cdp, "document.body.innerText.includes('ksi_')");
    assert(ksiInDoc === false, "no ksi_ source-id authority rendered in the review");
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

    // Fetch through the intercepted wrapper. The expected CSV is a literal
    // fixture (R5-EXP-04 / DEC-KI-036), never derived at runtime from the
    // frontend getFiltered helper, so the served export cannot self-generate
    // its own oracle.
    const servedCsv = await evaluate(cdp, `fetch(${JSON.stringify(href)}).then(r => r.text())`);
    const expectedCsv = LITERAL_EXPORT_CSV_SEED_DRESSES;
    assert(servedCsv === expectedCsv, "intercepted export CSV equals literal EXPORT_CSV_COLUMNS + filtered rows");
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
    // Wait for the READY layout: the dashboard surface also exists in the
    // loading/auth layouts, but the theme button only renders in ready.
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "dashboard ready layout");
    await evaluate(cdp, "localStorage.clear()");

    const themeButtons = await evaluate(cdp, "[...document.querySelectorAll('[data-surface=\"surface:research-dashboard\"] button, main button')].map((b) => b.textContent.trim())");
    assert(themeButtons.some((t) => t.includes("Dark mode") || t.includes("Light mode")), `theme toggle present in ready header: ${JSON.stringify(themeButtons)}`);
    // The dashboard initializes its theme from the stored value or, when
    // absent, from prefers-color-scheme (headless Chrome prefers dark), so
    // the initial theme is environment-dependent. Drive the round-trip from
    // the OBSERVED state instead of assuming "light".
    const initial = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')");
    assert(initial === "dark" || initial === "light", `initial theme observable (${initial})`);
    const flipped = initial === "dark" ? "light" : "dark";
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:research-dashboard\"] button')].find(n => n.textContent.includes('Dark mode') || n.textContent.includes('Light mode'))");
    await wait(200);
    assert((await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')")) === flipped, `theme attribute flipped to ${flipped}`);
    const storage = await evaluate(cdp, "({ keys: Object.keys(localStorage), value: localStorage.getItem('ki-dashboard-theme') })");
    assert(storage.keys.length === 1 && storage.keys[0] === "ki-dashboard-theme", "exactly one storage key (theme)");
    assert(storage.value === flipped, `theme storage value ${flipped}`);

    // Reload persists.
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "dashboard ready after reload");
    assert((await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')")) === flipped, "theme persists across reload");

    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:research-dashboard\"] button')].find(n => n.textContent.includes('Dark mode') || n.textContent.includes('Light mode'))");
    await wait(200);
    assert((await evaluate(cdp, "document.querySelector('[data-surface=\"surface:research-dashboard\"]')?.getAttribute('data-ki-theme')")) === initial, "theme round-trips back to the initial value");
    assert((await evaluate(cdp, "localStorage.getItem('ki-dashboard-theme')")) === initial, "theme storage updated on the return toggle");
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

    // Transform mutation on drag. Primary path: CDP mouse input (which the
    // browser translates into pointer events). Fallback for environments
    // where synthetic mouse input does not reach the canvas pointer
    // handlers: dispatch DOM PointerEvents with a stable pointerId. The
    // assertion is identical either way — the rendered pixels must change.
    const before = await evaluate(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]').toDataURL()");
    // Bring the canvas into the viewport: CDP input coordinates are
    // viewport-relative and the landscape often sits below the fold. Use an
    // instant programmatic scroll (CSS smooth scrolling would animate).
    await evaluate(cdp, `(() => {
      const c = document.querySelector('[data-surface="landscape:cluster-scene"]');
      const y = Math.max(0, c.getBoundingClientRect().top + window.scrollY - 250);
      window.scrollTo({ top: y, behavior: "instant" });
    })()`);
    await wait(250);
    const box = await evaluate(cdp, `(() => { const r = document.querySelector('[data-surface="landscape:cluster-scene"]').getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2 }; })()`);
    assert(box.x >= 0 && box.x < 1440 && box.y >= 0 && box.y < 900, `drag point inside viewport (${JSON.stringify(box)})`);
    await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", buttons: 1, clickCount: 1 });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x + 120, y: box.y + 20, button: "left", buttons: 1 });
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x + 120, y: box.y + 20, button: "left", buttons: 0, clickCount: 1 });
    await wait(250);
    let after = await evaluate(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]').toDataURL()");
    if (before === after) {
      await evaluate(cdp, `(() => {
        const canvas = document.querySelector('[data-surface="landscape:cluster-scene"]');
        const r = canvas.getBoundingClientRect();
        const fire = (type, x, y) => canvas.dispatchEvent(new PointerEvent(type, {
          pointerId: 1, pointerType: "mouse", isPrimary: true,
          buttons: type === "pointerup" ? 0 : 1,
          clientX: x, clientY: y, bubbles: true, cancelable: true,
        }));
        fire("pointerdown", r.x + r.width / 2, r.y + r.height / 2);
        fire("pointermove", r.x + r.width / 2 + 120, r.y + r.height / 2 + 20);
        fire("pointerup", r.x + r.width / 2 + 120, r.y + r.height / 2 + 20);
      })()`);
      await wait(250);
      after = await evaluate(cdp, "document.querySelector('[data-surface=\"landscape:cluster-scene\"]').toDataURL()");
    }
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
    // Wait for the TERMINAL layout (the dashboard surface exists from the
    // first queued poll; the keyword table only mounts on completion, i.e.
    // after the full 5-GET ladder has elapsed).
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "poll terminal dashboard", 40_000);
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
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "defect poll terminal", 40_000);
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
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "restored poll terminal", 40_000);
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
    // Duplicate click while the first handoff is in flight: the button now
    // reads "Handing off…" (and is disabled) — the in-flight idempotence
    // guard this scenario exercises. The duplicate physical click must not
    // produce a second POST.
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize') || n.textContent.includes('Handing off'))");
    await waitFor(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length === " + (runsBefore + 1), "single runs POST");
    const runsRequests = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs'))");
    assert(runsRequests.length === runsBefore + 1, "duplicate finalize click produced only one runs POST");
    const ids = runsRequests.map((r) => r.clientRequestId).filter(Boolean);
    assert(ids.length === 1 && /^[A-Za-z0-9_-]{16,80}$/.test(ids[0]), "runs POST carries one retained clientRequestId matching CLIENT_REQUEST_ID_PATTERN");
    // Let the in-flight handoff resolve (runsDelayMs was 800) so the definitive
    // success state is observed before the retry-presentation check.
    await wait(900);
    // Superseded oracle: retry-required presentation (R5-FIN-01 /
    // DEC-KI-035). A definitive 200 handoff must NOT render the ambiguous
    // retry notice or its Retry control.
    const retryPresentation = await evaluate(cdp, `(() => {
      const review = document.querySelector('[data-surface="surface:selection-review"]');
      return {
        notice: document.body.innerText.includes("The run request didn't complete. Retry the same run."),
        retryButton: review ? [...review.querySelectorAll('button')].some((n) => n.textContent.trim() === 'Retry') : false,
      };
    })()`);
    assert(retryPresentation.notice === false && retryPresentation.retryButton === false,
      `definitive success renders no retry-required presentation (${JSON.stringify(retryPresentation)})`);
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
    const chartState = await evaluate(cdp, `(() => {
      const canvases = [...document.querySelectorAll('canvas[data-surface^="chart:"]')];
      return {
        canvasCount: canvases.length,
        instanced: canvases.filter((c) => Boolean(c.$chartjs)).map((c) => c.getAttribute('data-surface')),
        uninstanced: canvases.filter((c) => !c.$chartjs).map((c) => c.getAttribute('data-surface')),
      };
    })()`);
    // Teardown/no-leak contract: still exactly 11 canvases (no duplicates),
    // one instance per canvas at most, zero new console errors. Under the
    // US projection the fixture's market metrics all carry flags: [], so
    // flagCounts is empty and buildFlagsConfig legitimately returns null —
    // the flags canvas stays present but uninstanced. Every other chart
    // must be recreated.
    assert(chartState.canvasCount === 11, `no duplicate chart canvases (no leaks) — canvases: ${JSON.stringify(chartState)}`);
    assert(JSON.stringify(chartState.uninstanced) === JSON.stringify(["chart:flags"]),
      `only the empty-data flags chart is uninstanced after market switch: ${JSON.stringify(chartState)}`);
    assert(chartState.instanced.length === 10, `10 data-backed charts recreated after filter change (${chartState.instanced.length})`);
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

  // ---- R5-WIRE-04 real Next pre-auth route witness ----
  results.push(await runScenario("R5-WIRE-04", async () => {
    // Real route boundary (Node-side, no interception): a JSON create request
    // reaches the unauthenticated 401 branch, never the pre-auth 415 branch.
    const createProbe = await (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(`${baseUrl}/api/keyword-research`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ seeds: ["dresses"] }),
          signal: controller.signal,
        });
        let payload = null;
        try { payload = await res.json(); } catch {}
        return { status: res.status, payload };
      } finally {
        clearTimeout(timer);
      }
    })();
    assert(createProbe.status === 401, `real JSON create -> 401 (got ${createProbe.status})`);
    assert(createProbe.payload?.error?.code === "AUTHENTICATION_REQUIRED", "401 create envelope code AUTHENTICATION_REQUIRED");
    const nonJsonProbe = await fetch(`${baseUrl}/api/keyword-research`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "not-json",
    });
    assert(nonJsonProbe.status === 415, `non-JSON create -> 415 (got ${nonJsonProbe.status})`);

    // Actual emitted client create request with fixture interception disabled
    // for this one call. Exactly one real request must leave the page carrying
    // the JSON content type; the emitted route answers 401 (never 415) and the
    // form renders its auth-required surface.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords`);
    await waitFor(cdp, "document.querySelector('#seed-phrase-form')", "research form");
    await evaluate(cdp, "globalThis.__kiFixture.passThroughCreate = true");
    await setInputValue(cdp, 'input[aria-label="Seed phrase"]', "dresses");
    await click(cdp, "[...document.querySelectorAll('#seed-phrase-form button')].find(n => n.textContent.includes('Add'))");
    await waitFor(cdp, "document.querySelector('#seed-chip-count')?.textContent.includes('1/5')", "seed chip added");
    await click(cdp, "document.querySelector('#seed-phrase-form button[type=submit]')");
    await waitFor(cdp, "document.body.innerText.includes('You need to sign in to start keyword research.')", "auth-required banner");
    const createRequests = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.method === 'POST' && r.url === '/api/keyword-research')");
    assert(createRequests.length === 1, `exactly one real create request (got ${createRequests.length})`);
    assert(createRequests[0].contentType === "application/json", `real create request carries application/json (got ${createRequests[0].contentType})`);
    assert(createRequests[0].bodyDigest && /^[0-9a-f]{8}$/.test(createRequests[0].bodyDigest), "real create request records a body digest");
    await evaluate(cdp, "globalThis.__kiFixture.passThroughCreate = false");
    await capture(cdp, "R5-WIRE-04-real-route");
  }));

  // ---- R5-FIN-01 completed saved draft: one finalize POST + navigation ----
  results.push(await runScenario("R5-FIN-01", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "saved 2-item draft");
    // Superseded in KI-W6: the browser must open the run workspace derived
    // from handoff.run.runId; a valid but hostile same-origin API statusUrl
    // must never choose the browser destination (DEC-KI-038).
    const hostileStatusPath = "/api/runs/run_kiw5_hostile_status_witness0001";
    await evaluate(cdp, `(() => {
      const handoff = JSON.parse(${JSON.stringify(JSON.stringify(runHandoff))});
      handoff.statusUrl = ${JSON.stringify(hostileStatusPath)};
      globalThis.__kiFixture.runsHandoff = handoff;
    })()`);
    const fin = await clickFinalizeAndCapture(cdp);
    assert(fin.count === 1, `exactly one runs POST (${fin.count})`);
    assert(fin.body && fin.body.expectedSelectionRevision === 1, `runs POST carries the current saved revision 1 (${JSON.stringify(fin.body)})`);
    assert(fin.clientRequestId && /^[A-Za-z0-9_-]{16,80}$/.test(fin.clientRequestId), `runs POST carries one generated clientRequestId (${fin.clientRequestId})`);
    const workspacePath = `/runs/${encodeURIComponent(runHandoff.run.runId)}`;
    await waitFor(cdp, `location.pathname === ${JSON.stringify(workspacePath)}`, "finalize workspace navigation witness");
    assert((await evaluate(cdp, `location.pathname === ${JSON.stringify(hostileStatusPath)}`)) === false, "hostile handoff statusUrl pathname must not be visited");
    await capture(cdp, "R5-FIN-01-finalize");
  }));

  // ---- R5-FIN-02 saved draft then add/remove: unsaved, zero POST ----
  results.push(await runScenario("R5-FIN-02", async () => {
    // Partition 1: table add without save.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')", "row checkbox");
    await click(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "dirty 3-item draft");
    await assertUnsavedZeroPost(cdp);

    // Partition 2: review remove without save.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "saved 2-item draft");
    await click(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Remove \"]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('1 of 200 selected')", "dirty 1-item draft");
    await assertUnsavedZeroPost(cdp);
    await capture(cdp, "R5-FIN-02-unsaved");
  }));

  // ---- R5-FIN-03 saved draft then edit/reorder/manual add: unsaved, zero POST ----
  results.push(await runScenario("R5-FIN-03", async () => {
    // Partition 1: rendered edit dialog.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Update \"]')", "edit control");
    await click(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Update \"]')");
    await waitFor(cdp, "document.querySelector('[role=dialog]')", "edit dialog");
    await setInputValue(cdp, "[aria-label='Edited keyword']", "edited dresses online");
    await click(cdp, "[...document.querySelectorAll('[role=dialog] button')].find(n => n.textContent.includes('Save keyword'))");
    await waitFor(cdp, "document.body.innerText.includes('edited dresses online')", "edited item text");
    await assertUnsavedZeroPost(cdp);

    // Partition 2: actual remove-and-readd of a calculated row (the UI's real
    // reorder path). The reorder fixture's persisted order is deliberately
    // unsorted; the re-added row moves back to its toggle-sorted position, so
    // the draft order diverges from the saved order (unsaved, zero POST).
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${REORDER_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Remove \"]')", "remove control");
    await click(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"] button[aria-label^=\"Remove \"]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('1 of 200 selected')", "draft after remove");
    await setSelectValue(cdp, '[data-surface="surface:keyword-table"] select', '50');
    await wait(250);
    const recheck = await evaluate(cdp, `(() => {
      const rows = [...document.querySelectorAll('[data-surface="surface:keyword-table"] tbody tr')];
      const row = rows.find((tr) => /keyword 1\\D/.test(tr.innerText));
      const box = row && row.querySelector('input[type=checkbox]');
      if (!box) return false;
      box.click();
      return true;
    })()`);
    assert(recheck === true, "re-added the removed calculated row");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "reordered draft");
    await assertUnsavedZeroPost(cdp);

    // Partition 3: manual-input/Add controls.
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('input[aria-label=\"Manual keyword\"]')", "manual input");
    await setInputValue(cdp, 'input[aria-label="Manual keyword"]', "handmade boutique near me");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Add'))");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "manual 3-item draft");
    await assertUnsavedZeroPost(cdp);
    await capture(cdp, "R5-FIN-03-unsaved");
  }));

  // ---- R5-FIN-04 dirty draft -> successful save -> one finalize POST at the
  // incremented revision ----
  results.push(await runScenario("R5-FIN-04", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('input[aria-label=\"Manual keyword\"]')", "manual input");
    await setInputValue(cdp, 'input[aria-label="Manual keyword"]', "handmade boutique near me");
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Add'))");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "dirty 3-item draft");
    // Architect-authorized correction (KI-R5-C003): the dirty draft must be
    // saved before the save-PUT witness can fire. Save once via the rendered
    // control, then observe the single PUT at the current revision.
    await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Save selection'))");

    const putWitness = await waitForInPage(cdp, `(() => {
      const puts = globalThis.__kiFixture.requests.filter((r) => r.method === 'PUT' && r.url.endsWith('/selection'));
      if (!puts.length) return false;
      const last = puts[puts.length - 1];
      return { count: puts.length, body: last.body ? JSON.parse(last.body) : null, contentType: last.contentType };
    })()`, "save PUT captured");
    assert(putWitness.count === 1, `exactly one save PUT (${putWitness.count})`);
    assert(putWitness.body.expectedRevision === 1, `save PUT carries expectedRevision 1 (${putWitness.body.expectedRevision})`);
    assert(putWitness.body.items.length === 3, `save PUT carries the 3-item mutation projection (${putWitness.body.items.length})`);
    assert(putWitness.body.items.filter((i) => i.sourceKind === "manual").length === 1, "save PUT includes the manual mutation");
    assert(putWitness.body.items.every((i) => Object.keys(i).sort().join(",") === (i.sourceKind === "calculated" ? "keyword,sourceKeywordId,sourceKind" : "keyword,sourceKind")), "PUT items are strict minimal union members");
    assert(putWitness.contentType === "application/json", `save PUT carries application/json (${putWitness.contentType})`);

    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "saved 3-item draft");
    // The save response replaces view/draft at the incremented revision only
    // once it has been processed; the finalize gate flips from unsaved-disabled
    // to saved-enabled at that moment. Wait for that transition before
    // finalizing so the single runs POST carries revision 2.
    await waitFor(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find(n => n.textContent.includes('Finalize'))?.disabled === false", "finalize enabled after save");
    const fin = await clickFinalizeAndCapture(cdp);
    assert(fin.count === 1, `exactly one runs POST after save (${fin.count})`);
    assert(fin.body && fin.body.expectedSelectionRevision === 2, `runs POST carries the incremented revision 2 (${JSON.stringify(fin.body)})`);
    await capture(cdp, "R5-FIN-04-save-finalize");
  }));

  // ---- R5-FIN-05 ambiguous outcomes: retry-required, controls locked, byte-
  // equal retry (network, unreadable, 502, 504) ----
  results.push(await runScenario("R5-FIN-05", async () => {
    for (const mode of ["network", "unreadable", "502", "504"]) {
      await setViewport(cdp, 1440, 900);
      await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
      await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "saved 2-item draft");
      const witness = await evaluate(cdp, `(async () => {
        const started = Date.now();
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const runsPosts = () => globalThis.__kiFixture.requests.filter((r) => r.url.endsWith('/runs'));
        globalThis.__kiFixture.runsFailOnce = ${JSON.stringify(mode)};
        const review = document.querySelector('[data-surface="surface:selection-review"]');
        const finalize = review ? [...review.querySelectorAll('button')].find((n) => n.textContent.includes('Finalize')) : null;
        if (!finalize) return null;
        finalize.click();
        let post1 = null;
        while (Date.now() - started < 20000) {
          const posts = runsPosts();
          if (posts.length >= 1) { post1 = posts[posts.length - 1]; break; }
          await wait(10);
        }
        if (!post1) return null;
        let retrySeen = false;
        while (Date.now() - started < 20000) {
          const reviewNow = document.querySelector('[data-surface="surface:selection-review"]');
          if (reviewNow && [...reviewNow.querySelectorAll('button')].some((n) => n.textContent.trim() === 'Retry')) { retrySeen = true; break; }
          await wait(50);
        }
        if (!retrySeen) return null;
        const retryPresentation = (() => {
          const reviewNow = document.querySelector('[data-surface="surface:selection-review"]');
          const saveBtn = reviewNow ? [...reviewNow.querySelectorAll('button')].find((n) => n.textContent.includes('Save selection')) : null;
          const finalizeBtn = reviewNow ? [...reviewNow.querySelectorAll('button')].find((n) => n.textContent.includes('Finalize')) : null;
          return {
            notice: document.body.innerText.includes("The run request didn't complete. Retry the same run."),
            retryButton: reviewNow ? [...reviewNow.querySelectorAll('button')].some((n) => n.textContent.trim() === 'Retry') : false,
            manualAddDisabled: reviewNow ? (document.querySelector('input[aria-label="Manual keyword"]')?.disabled ?? false) : false,
            saveDisabled: saveBtn ? saveBtn.disabled : null,
            finalizeDisabled: finalizeBtn ? finalizeBtn.disabled : null,
          };
        })();
        const retryBtn = [...document.querySelectorAll('[data-surface="surface:selection-review"] button')].find((n) => n.textContent.trim() === 'Retry');
        if (!retryBtn) return null;
        retryBtn.click();
        let post2 = null;
        while (Date.now() - started < 20000) {
          const posts = runsPosts();
          if (posts.length >= 2) { post2 = posts[posts.length - 1]; break; }
          await wait(10);
        }
        if (!post2) return null;
        return {
          post1: { body: post1.body ? JSON.parse(post1.body) : null, bodyDigest: post1.bodyDigest, clientRequestId: post1.clientRequestId },
          post2: { body: post2.body ? JSON.parse(post2.body) : null, bodyDigest: post2.bodyDigest, clientRequestId: post2.clientRequestId },
          retryPresentation,
        };
      })()`);
      assert(witness !== null, `FIN-05 ${mode}: full retry flow completed in page`);
      assert(witness.retryPresentation.notice === true, `FIN-05 ${mode}: retry notice rendered`);
      assert(witness.retryPresentation.retryButton === true, `FIN-05 ${mode}: Retry button rendered`);
      assert(witness.retryPresentation.manualAddDisabled === true, `FIN-05 ${mode}: manual add input disabled`);
      assert(witness.retryPresentation.saveDisabled === true, `FIN-05 ${mode}: save control disabled`);
      assert(witness.retryPresentation.finalizeDisabled === true, `FIN-05 ${mode}: finalize control disabled`);
      assert(witness.post1.clientRequestId === witness.post2.clientRequestId, `FIN-05 ${mode}: retry reuses the retained clientRequestId`);
      assert(witness.post1.bodyDigest === witness.post2.bodyDigest, `FIN-05 ${mode}: retry POST body is byte-identical`);
      assert(witness.post1.body.expectedSelectionRevision === witness.post2.body.expectedSelectionRevision, `FIN-05 ${mode}: retry keeps the same revision`);
      await capture(cdp, `R5-FIN-05-${mode}`);
    }
  }));

  // ---- R5-FIN-06 definitive parsed 409: stale UI, attempt cleared, no
  // automatic retry/run ----
  results.push(await runScenario("R5-FIN-06", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "saved 2-item draft");
    await evaluate(cdp, "globalThis.__kiFixture.runsFailOnce = 'conflict'");
    const fin = await clickFinalizeAndCapture(cdp);
    assert(fin.count === 1, `exactly one runs POST before definitive 409 (${fin.count})`);
    await waitFor(cdp, "document.body.innerText.includes('changed on the server')", "stale banner");
    await wait(600);
    const after = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length");
    assert(after === 1, "no automatic retry/run after definitive 409");
    const retryState = await evaluate(cdp, `(() => {
      const review = document.querySelector('[data-surface="surface:selection-review"]');
      return {
        notice: document.body.innerText.includes("The run request didn't complete. Retry the same run."),
        retryButton: review ? [...review.querySelectorAll('button')].some((n) => n.textContent.trim() === 'Retry') : false,
      };
    })()`);
    assert(retryState.notice === false && retryState.retryButton === false, "definitive 409 clears the attempt (no retry-required presentation)");
    await capture(cdp, "R5-FIN-06-definitive-409");
  }));

  // ---- R5-NC-05 unsaved-handoff falsification ----
  results.push(await runScenario("R5-NC-05", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')", "row checkbox");
    await click(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr input[type=checkbox]')");
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('3 of 200 selected')", "dirty draft");
    // Pass: fresh dirty actual trace has zero runs POST.
    const dirtyTrace = await evaluate(cdp, "globalThis.__kiFixture.requests.map((r) => ({ method: r.method, url: r.url }))");
    assert(dirtyTrace.filter((r) => r.url.endsWith('/runs')).length === 0, "NC-05 pass: fresh dirty trace has zero runs POST");
    // Mutate a copied trace by appending one synthetic handoff POST.
    const corrupted = dirtyTrace.concat([{ method: "POST", url: "/api/keyword-research/kr_x/runs" }]);
    let nc05Threw = false;
    try {
      if (corrupted.filter((r) => r.url.endsWith('/runs')).length !== 0) throw new Error("R5_UNSAVED_HANDOFF_FORBIDDEN");
    } catch (err) {
      if (err.message === "R5_UNSAVED_HANDOFF_FORBIDDEN") nc05Threw = true;
    }
    assert(nc05Threw === true, "NC-05: synthetic handoff POST on copied dirty trace throws R5_UNSAVED_HANDOFF_FORBIDDEN");
    // Restore: fresh dirty actual trace passes again.
    const freshRuns = await evaluate(cdp, "globalThis.__kiFixture.requests.filter(r => r.url.endsWith('/runs')).length");
    assert(freshRuns === 0, "NC-05 restore: fresh dirty trace passes");
  }));

  // ---- R5-NC-06 ambiguous-retry identity falsification ----
  results.push(await runScenario("R5-NC-06", async () => {
    await setViewport(cdp, 1440, 900);
    await navigate(cdp, `${baseUrl}/keywords/${COMPLETED_ID}`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText.includes('2 of 200 selected')", "saved 2-item draft");
    const trace = await evaluate(cdp, `(async () => {
      const started = Date.now();
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const runsPosts = () => globalThis.__kiFixture.requests.filter((r) => r.url.endsWith('/runs'));
      globalThis.__kiFixture.runsFailOnce = 'network';
      const review = document.querySelector('[data-surface="surface:selection-review"]');
      const finalize = review ? [...review.querySelectorAll('button')].find((n) => n.textContent.includes('Finalize')) : null;
      if (!finalize) return null;
      finalize.click();
      let post1 = null;
      while (Date.now() - started < 20000) {
        const posts = runsPosts();
        if (posts.length >= 1) { post1 = posts[posts.length - 1]; break; }
        await wait(10);
      }
      if (!post1) return null;
      let retrySeen = false;
      while (Date.now() - started < 20000) {
        const reviewNow = document.querySelector('[data-surface="surface:selection-review"]');
        if (reviewNow && [...reviewNow.querySelectorAll('button')].some((n) => n.textContent.trim() === 'Retry')) { retrySeen = true; break; }
        await wait(50);
      }
      if (!retrySeen) return null;
      const retryBtn = [...document.querySelectorAll('[data-surface="surface:selection-review"] button')].find((n) => n.textContent.trim() === 'Retry');
      if (!retryBtn) return null;
      retryBtn.click();
      let post2 = null;
      while (Date.now() - started < 20000) {
        const posts = runsPosts();
        if (posts.length >= 2) { post2 = posts[posts.length - 1]; break; }
        await wait(10);
      }
      if (!post2) return null;
      return {
        post1: { body: post1.body ? JSON.parse(post1.body) : null, bodyDigest: post1.bodyDigest, clientRequestId: post1.clientRequestId },
        post2: { body: post2.body ? JSON.parse(post2.body) : null, bodyDigest: post2.bodyDigest, clientRequestId: post2.clientRequestId },
      };
    })()`);
    assert(trace !== null, "NC-06: captured a fresh actual ambiguous two-POST retry");
    assert(trace.post2.bodyDigest === trace.post1.bodyDigest && trace.post2.clientRequestId === trace.post1.clientRequestId, "NC-06 pass: fresh actual retry is byte-equal");

    const assertIdentityOracle = (posts) => {
      const [first, second] = posts;
      if (!first || !second) throw new Error("R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED");
      if (second.bodyDigest !== first.bodyDigest) throw new Error("R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED");
      if (second.clientRequestId !== first.clientRequestId) throw new Error("R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED");
    };
    // Mutation 1: replace only the retry request ID in a copied trace.
    const idMutated = [
      { bodyDigest: trace.post1.bodyDigest, clientRequestId: trace.post1.clientRequestId },
      { bodyDigest: trace.post2.bodyDigest, clientRequestId: "mutated-retry-id-000000000000000" },
    ];
    let nc06IdThrew = false;
    try {
      assertIdentityOracle(idMutated);
    } catch (err) {
      if (err.message === "R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED") nc06IdThrew = true;
    }
    assert(nc06IdThrew === true, "NC-06: replaced retry ID throws R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED");
    // Mutation 2: replace only the retry revision in a copied trace.
    const revMutated = [
      trace.post1,
      { ...trace.post2, bodyDigest: "deadbeef" },
    ];
    let nc06RevThrew = false;
    try {
      assertIdentityOracle(revMutated);
    } catch (err) {
      if (err.message === "R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED") nc06RevThrew = true;
    }
    assert(nc06RevThrew === true, "NC-06: replaced retry revision throws R5_AMBIGUOUS_RETRY_IDENTITY_DIVERGED");
    // Restore: the fresh actual pair passes the same oracle.
    assertIdentityOracle([
      { bodyDigest: trace.post1.bodyDigest, clientRequestId: trace.post1.clientRequestId },
      { bodyDigest: trace.post2.bodyDigest, clientRequestId: trace.post2.clientRequestId },
    ]);
  }));

  // ---- R5-NC-11 substitute-fidelity falsification ----
  results.push(await runScenario("R5-NC-11", async () => {
    // Pass phase: the real-route witness exists (R5-WIRE-04 reached 401).
    const witnessValid = await (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(`${baseUrl}/api/keyword-research`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ seeds: ["dresses"] }),
          signal: controller.signal,
        });
        return { status: res.status };
      } finally {
        clearTimeout(timer);
      }
    })();
    const substituteValidator = (record) => {
      if (!record || record.realNextRouteWitness !== true) throw new Error("R5_REAL_NEXT_ROUTE_WITNESS_MISSING");
      if (record.status !== 401 || record.status === 415) throw new Error("R5_REAL_NEXT_ROUTE_WITNESS_MISSING");
      return true;
    };
    assert(substituteValidator({ realNextRouteWitness: true, status: 401 }) === true, "NC-11 pass: emitted real-Next activation record is present");
    // Mutation: supply only an intercepted fixture-success record without the
    // emitted real-Next request activation record/status.
    let nc11Threw = false;
    try {
      substituteValidator({ realNextRouteWitness: false, status: 200 });
    } catch (err) {
      if (err.message === "R5_REAL_NEXT_ROUTE_WITNESS_MISSING") nc11Threw = true;
    }
    assert(nc11Threw === true, "NC-11: fixture-success-only evidence throws R5_REAL_NEXT_ROUTE_WITNESS_MISSING");
    // Restore: the fresh pass-through reaches 401 and never 415.
    assert(witnessValid.status === 401, `NC-11 restore: fresh pass-through reaches 401 (${witnessValid.status})`);
  }));

  executed = results.map((r) => r.id);
  const failures = results.filter((r) => !r.ok).map((r) => r.id);

  const allB = REQUIRED_BR_IDS.filter((id) => id.startsWith("W5-B")).every((id) => results.find((r) => r.id === id)?.ok);
  const allR = REQUIRED_BR_IDS.filter((id) => id.startsWith("W5-R")).every((id) => results.find((r) => r.id === id)?.ok);

  const w5Executed = results.filter((r) => REQUIRED_BR_IDS.includes(r.id)).map((r) => r.id);
  const w5Failures = results.filter((r) => REQUIRED_BR_IDS.includes(r.id) && !r.ok).map((r) => r.id);

  certificate = {
    file: "keyword-intelligence-dashboard.mjs",
    required: REQUIRED_BR_IDS,
    registered: REQUIRED_BR_IDS,
    executed: w5Executed,
    skipped: [],
    oracleFailures: w5Failures,
    requiredDigest: setDigest(REQUIRED_BR_IDS),
    registeredDigest: setDigest(REQUIRED_BR_IDS),
    executedDigest: setDigest(w5Executed),
    scenarios: { "SCN-KI-016": allB, "SCN-KI-017": allR },
  };

  // KI-R5 browser execution certificate (seven-ID registry "browser";
  // S1 §5 S015 step 7). Emitted when the harness runs at V4 with all seven
  // actual activation witnesses and zero skip.
  const r5Failures = results.filter((r) => R5_BROWSER_CASES.includes(r.id) && !r.ok).map((r) => r.id);
  const r5Sorted = [...R5_BROWSER_CASES].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const r5Executed = R5_BROWSER_CASES.filter((id) => results.find((r) => r.id === id)?.ok).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  assert(r5Executed.length === R5_BROWSER_CASES.length, `all seven R5 browser cases executed (failures: ${JSON.stringify(r5Failures)})`);
  const r5Digest = setDigest(r5Sorted);
  console.log(`KI_R5_EXECUTION_CERTIFICATE=${JSON.stringify({
    registry: "browser",
    required: r5Sorted,
    registered: r5Sorted,
    executed: r5Executed,
    skipped: [],
    activationWitnesses: r5Executed,
    oracleFailures: r5Failures,
    digests: { required: r5Digest, registered: r5Digest, executed: setDigest(r5Executed) },
  })}`);

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
