import type {
  ClusterRow,
  KeywordFacets,
  KeywordLane,
  KeywordMetricSnapshot,
  KeywordRow,
  ResearchResult,
  ResearchState,
  ResearchSummary,
  ResearchView,
  SelectionItem,
  SelectionMutationItem,
} from "./keyword-intelligence-types.ts";

export type KeywordFilterState = {
  search: string;
  market: string;
  seed: string;
  clusterId: string;
  intent: string;
  lane: string;
  category: string;
  audience: string;
  channel: string;
  minVolume: number;
  minOpportunity: number;
  recommended: "" | "true" | "false";
  flags: string[];
  sortKey: string;
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
};

export type DashboardViewPhase = "loading" | "ready" | "error" | "empty";

export const KEYWORD_INTELLIGENCE_SURFACE_INVENTORY: readonly string[] = [
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

export const EXPORT_CSV_COLUMNS: readonly string[] = [
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
];

export const KEYWORD_THEME_STORAGE_KEY = "ki-dashboard-theme";

const SELECTION_ITEM_CAP = 200;
const SELECTION_SOFT_LIMIT = 100;
const EXPORT_FLAG_CAP = 20;

type ProjectedKeywordRow = KeywordRow & { _marketMissing: boolean };

type CandidateValue = {
  recommended: boolean;
  opportunityScore: number | null;
  searchVolume: number | null;
  keyword: string;
  itemId: string;
};

type ClusterVolumeAggregate = {
  volume: number;
  cpcSum: number;
  cpcN: number;
  ciSum: number;
  ciN: number;
  count: number;
};

function isNum(v: unknown): v is number {
  return typeof v === "number" && isFinite(v);
}

function uniqueSorted(arr: string[]): string[] {
  return arr.filter((v, i, a) => v && a.indexOf(v) === i).sort((a, b) => a.localeCompare(b));
}

export function nextPollDelay(previousMs: number): number {
  if (previousMs < 2000) return 2000;
  return Math.min(10000, Math.round(previousMs * 1.5));
}

export function isTerminalResearchState(state: ResearchState): boolean {
  return state === "completed" || state === "failed";
}

export function activeRows(result: ResearchResult): KeywordRow[] {
  return result.keywords.filter((r) => r.mergedInto === null);
}

export function distinctKeywordRows(rows: KeywordRow[]): KeywordRow[] {
  const byKeyword = new Map<string, KeywordRow>();
  for (const r of rows) {
    const key = String(r.keyword || "").trim().toLowerCase();
    if (!key) continue;
    const current = byKeyword.get(key);
    if (!current || (!r.mergedInto && current.mergedInto) || (r.searchVolume || 0) > (current.searchVolume || 0)) {
      byKeyword.set(key, r);
    }
  }
  return [...byKeyword.values()];
}

export function marketKeywordKey(row: KeywordRow, marketCode: string): string {
  void marketCode;
  return String(row.keyword || "").trim().toLowerCase();
}

export function cumulativeVolume(rows: KeywordRow[]): number {
  return distinctKeywordRows(rows).reduce((sum, r) => sum + (isNum(r.searchVolume) ? r.searchVolume : 0), 0);
}

export function projectMarketRow(row: KeywordRow, marketCode: string): KeywordRow {
  if (marketCode === "all") return row;
  const metric = row.marketMetrics[marketCode as keyof typeof row.marketMetrics] ?? null;
  return {
    ...row,
    _marketMissing: !metric,
    searchVolume: metric ? metric.searchVolume : null,
    cpc: metric ? metric.cpc : null,
    competition: metric ? metric.competition : null,
    competitionLevel: metric ? metric.competitionLevel : null,
    keywordDifficulty: metric ? metric.keywordDifficulty : null,
    mainIntent: metric ? metric.mainIntent : null,
    commercialIntent: metric ? metric.commercialIntent : null,
    monthlyHistory: metric ? metric.monthlyHistory : null,
    trendSlope: metric ? metric.trendSlope : null,
    flags: metric ? metric.flags : [],
    opportunityScore: metric ? metric.opportunityScore : null,
    recommended: metric ? metric.recommended : false,
  } as ProjectedKeywordRow;
}

export function currentSummary(result: ResearchResult, marketCode: string): ResearchSummary {
  void marketCode;
  return result.summary;
}

export function currentClusterMetric(cluster: ClusterRow, marketCode: string): ClusterRow {
  void marketCode;
  return cluster;
}

function haystack(r: KeywordRow): string {
  return [
    r.keyword,
    r.seed,
    r.cluster,
    (r.sourceSeeds || []).join(" "),
    r.lane,
    Object.keys(r.facets || {}).reduce((acc, k) => acc.concat((r.facets as Record<string, string[]>)[k] || []), [] as string[]).join(" "),
    (r.flags || []).join(" "),
  ].join(" ").toLowerCase();
}

export function getFiltered(rows: KeywordRow[], filter: KeywordFilterState): KeywordRow[] {
  const q = filter.search.trim().toLowerCase();
  return rows.map((r) => projectMarketRow(r, filter.market)).filter((r) => {
    const projected = r as ProjectedKeywordRow;
    if (filter.market !== "all" && projected._marketMissing) return false;
    if (filter.seed && r.seed !== filter.seed && (r.sourceSeeds || []).indexOf(filter.seed) === -1) return false;
    if (filter.clusterId && r.clusterId !== filter.clusterId) return false;
    if (filter.intent && (r.mainIntent || "").toLowerCase() !== filter.intent) return false;
    if (filter.lane && (r.lane || discoveryLane(r)) !== filter.lane) return false;
    if (filter.category && ((r.facets || {}).category || []).indexOf(filter.category) === -1) return false;
    if (filter.audience && ((r.facets || {}).audience || []).indexOf(filter.audience) === -1) return false;
    if (filter.channel && ((r.facets || {}).channel || []).indexOf(filter.channel) === -1) return false;
    if (filter.minVolume > 0 && (r.searchVolume == null || r.searchVolume < filter.minVolume)) return false;
    if (filter.minOpportunity > 0 && (r.opportunityScore == null || r.opportunityScore < filter.minOpportunity)) return false;
    if (filter.recommended === "true" && !r.recommended) return false;
    if (filter.recommended === "false" && r.recommended) return false;
    if (filter.flags.length && !filter.flags.every((fl) => (r.flags || []).indexOf(fl) !== -1)) return false;
    if (q && haystack(r).indexOf(q) === -1) return false;
    return true;
  });
}

export function sortKeywordRows(rows: KeywordRow[], sortKey: string, sortDir: "asc" | "desc"): KeywordRow[] {
  const k = sortKey;
  return rows.slice().sort((a, b) => {
    const av = (a as unknown as Record<string, unknown>)[k];
    const bv = (b as unknown as Record<string, unknown>)[k];
    let res: number;
    if (isNum(av) && isNum(bv)) res = av - bv;
    else if (av == null && bv == null) res = 0;
    else if (av == null) res = -1;
    else if (bv == null) res = 1;
    else if (typeof av === "boolean") res = av === bv ? 0 : av ? -1 : 1;
    else res = String(av).localeCompare(String(bv));
    return sortDir === "desc" ? -res : res;
  });
}

export function paginate(rows: KeywordRow[], page: number, pageSize: number): KeywordRow[] {
  const size = Math.max(1, Math.floor(pageSize));
  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / size));
  const clampedPage = Math.min(Math.max(1, page), pageCount);
  const start = (clampedPage - 1) * size;
  return rows.slice(start, start + size);
}

export function filterOptionSources(rows: KeywordRow[]) {
  const seeds = uniqueSorted(rows.reduce((acc, r) => acc.concat(r.sourceSeeds && r.sourceSeeds.length ? r.sourceSeeds : [r.seed]), [] as string[]));
  const clusters = uniqueSorted(rows.map((r) => r.clusterId).filter((c): c is string => Boolean(c)));
  const intents = ["commercial", "transactional", "navigational", "informational"];
  const lanes = uniqueSorted(rows.map((r) => r.lane || discoveryLane(r)));
  const facetValues = (name: keyof KeywordFacets) =>
    uniqueSorted(rows.reduce((acc, r) => acc.concat(((r.facets || {})[name]) || []), [] as string[]));
  const categories = facetValues("category");
  const audiences = facetValues("audience");
  const channels = facetValues("channel");
  const flags = uniqueSorted(rows.reduce((acc, r) => acc.concat(r.flags || []), [] as string[]));
  return { seeds, clusters, intents, lanes, categories, audiences, channels, flags };
}

export function aggregateByCluster(rows: KeywordRow[]): Record<string, ClusterVolumeAggregate> {
  const map: Record<string, ClusterVolumeAggregate> = {};
  for (const r of rows) {
    if (!r.cluster) continue;
    const k = r.cluster;
    const g = map[k] || (map[k] = { volume: 0, cpcSum: 0, cpcN: 0, ciSum: 0, ciN: 0, count: 0 });
    g.count += 1;
    g.volume += isNum(r.searchVolume) ? r.searchVolume : 0;
    if (isNum(r.cpc)) {
      g.cpcSum += r.cpc;
      g.cpcN += 1;
    }
    if (isNum(r.commercialIntent)) {
      g.ciSum += r.commercialIntent;
      g.ciN += 1;
    }
  }
  return map;
}

function rowMetricFingerprint(r: KeywordRow): string {
  const history = (r.monthlyHistory || []).map((m) => m.searchVolume || 0).join(",");
  return [r.searchVolume || 0, history, r.cpc, r.competition, r.keywordDifficulty].join("|");
}

export function adjustedVolume(rows: KeywordRow[]): number {
  const buckets = new Map<string, number>();
  for (const r of rows) {
    if (!isNum(r.searchVolume) || r.searchVolume <= 0) continue;
    const key = rowMetricFingerprint(r);
    buckets.set(key, Math.max(buckets.get(key) || 0, r.searchVolume));
  }
  let sum = 0;
  for (const v of buckets.values()) sum += v;
  return sum;
}

export function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function metricFingerprint(rows: KeywordRow[]): string {
  return rows.map((r) => r.itemId).join("|");
}

export function discoveryLane(row: KeywordRow): KeywordLane {
  const text = String(row.keyword || "").toLowerCase();
  if ((row.mainIntent || "").toLowerCase() === "navigational") return "brand_competitor";
  if (/\b(near me|close to me|closest|nearest|in [a-z]+)\b/.test(text)) return "local_discovery";
  if (/\b(store|stores|shop|shops|boutique|boutiques|outlet|online)\b/.test(text)) return "store_discovery";
  return "category_discovery";
}

export function laneLabel(lane: KeywordLane): string {
  return (
    {
      store_discovery: "Store / online",
      local_discovery: "Local store",
      category_discovery: "Product / category",
      brand_competitor: "Brand / competitor",
    }[lane] || lane || "Product / category"
  );
}

export function fmtNum(n: number): string {
  if (!isNum(n)) return "—";
  const abs = Math.abs(n);
  const helper = (x: number): string => {
    const r = Math.round(x * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1);
  };
  if (abs >= 1e9) return helper(n / 1e9) + "B";
  if (abs >= 1e6) return helper(n / 1e6) + "M";
  if (abs >= 1e3) return helper(n / 1e3) + "K";
  return String(Math.round(n));
}

export function fmtCpc(n: number | null): string {
  if (!isNum(n)) return "—";
  return "$" + n.toFixed(2);
}

export function fmtPct(n: number): string {
  if (!isNum(n)) return "—";
  return Math.round(n * 100) + "%";
}

export function fmtSlope(n: number): string {
  if (!isNum(n)) return "—";
  const s = (n > 0 ? "+" : "") + n.toFixed(3);
  return s;
}

function cloneSelectionItem(item: SelectionItem): SelectionItem {
  return {
    ...item,
    sourceSeeds: [...item.sourceSeeds],
    facets: {
      audience: [...item.facets.audience],
      category: [...item.facets.category],
      channel: [...item.facets.channel],
      fit: [...item.facets.fit],
      modifier: [...item.facets.modifier],
    },
    metricsSnapshot: item.metricsSnapshot
      ? {
          ...item.metricsSnapshot,
          monthlyHistory: [...item.metricsSnapshot.monthlyHistory],
          flags: [...item.metricsSnapshot.flags],
          availableMarkets: [...item.metricsSnapshot.availableMarkets],
          marketMetrics: { ...item.metricsSnapshot.marketMetrics },
        }
      : null,
  };
}

function keywordMetricSnapshot(row: KeywordRow): KeywordMetricSnapshot {
  return {
    searchVolume: row.searchVolume,
    cpc: row.cpc,
    competition: row.competition,
    competitionLevel: row.competitionLevel,
    keywordDifficulty: row.keywordDifficulty,
    mainIntent: row.mainIntent,
    commercialIntent: row.commercialIntent,
    monthlyHistory: row.monthlyHistory,
    trendSlope: row.trendSlope,
    cluster: row.cluster,
    clusterId: row.clusterId,
    variantGroupId: row.variantGroupId,
    variantCanonical: row.variantCanonical,
    flags: row.flags,
    opportunityScore: row.opportunityScore,
    recommended: row.recommended,
    mergedInto: row.mergedInto,
    availableMarkets: row.availableMarkets,
    marketMetrics: row.marketMetrics,
  };
}

function selectionItemFromRow(row: KeywordRow): SelectionItem {
  return {
    itemId: row.itemId,
    sourceKind: "calculated",
    sourceKeywordId: row.itemId,
    originalKeyword: row.keyword,
    keyword: row.keyword,
    sourceSeeds: row.sourceSeeds,
    lane: row.lane,
    facets: row.facets,
    metricsSnapshot: keywordMetricSnapshot(row),
  };
}

function rowCandidate(row: KeywordRow): CandidateValue {
  return {
    recommended: row.recommended,
    opportunityScore: row.opportunityScore ?? null,
    searchVolume: row.searchVolume,
    keyword: row.keyword,
    itemId: row.itemId,
  };
}

function itemCandidate(item: SelectionItem): CandidateValue {
  const m = item.metricsSnapshot;
  return {
    recommended: m ? m.recommended : false,
    opportunityScore: m ? m.opportunityScore : null,
    searchVolume: m ? m.searchVolume : null,
    keyword: item.keyword,
    itemId: item.itemId,
  };
}

function compareNullableDesc(a: number | null, b: number | null): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return b - a;
}

function compareCandidates(a: CandidateValue, b: CandidateValue): number {
  if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
  const opp = compareNullableDesc(a.opportunityScore, b.opportunityScore);
  if (opp !== 0) return opp;
  const vol = compareNullableDesc(a.searchVolume, b.searchVolume);
  if (vol !== 0) return vol;
  const ka = String(a.keyword || "").toLowerCase();
  const kb = String(b.keyword || "").toLowerCase();
  if (ka !== kb) return ka < kb ? -1 : 1;
  return a.itemId < b.itemId ? -1 : a.itemId > b.itemId ? 1 : 0;
}

const TOKEN_RE = /[a-z0-9]+/g;

const TOKEN_ALIASES: Record<string, string> = {
  woman: "women", womens: "women", female: "women", females: "women",
  lady: "women", ladies: "women",
  man: "men", mens: "men", male: "men", males: "men",
  clothes: "clothing", apparel: "clothing", attire: "clothing",
  shops: "store", shop: "store", stores: "store",
  retailer: "store", retailers: "store",
};

function singularPluralAlias(t: string): string {
  if (t.endsWith("s") && t.length > 4 && !t.endsWith("ss") && !t.endsWith("us") && !t.endsWith("is")) {
    return t.slice(0, -1);
  }
  return t;
}

function classifyTokens(keyword: string): Set<string> {
  const clean = keyword.replace(/([a-z]+)['’]s\b/gi, "$1");
  const raw = clean.toLowerCase().match(TOKEN_RE) || [];
  const norm = new Set<string>();
  for (const t of raw) {
    const aliased = TOKEN_ALIASES[t];
    if (aliased) norm.add(aliased);
    else norm.add(singularPluralAlias(t));
  }
  return norm;
}

const LOCAL_PHRASES = [
  "near me", "close to me", "closest to me", "closest", "nearest", "nearby",
] as const;
const STORE_TOKENS = new Set([
  "shop", "shops", "store", "stores", "boutique", "boutiques",
  "outlet", "outlets", "retailer", "retailers",
]);
const RETAILER_TOKENS = new Set([
  "amazon", "walmart", "target", "ebay", "etsy", "aliexpress", "alibaba",
  "shein", "temu", "costco", "ikea", "bestbuy", "macys", "kohls",
  "nordstrom", "wayfair", "wish", "overstock", "rakuten", "flipkart",
  "homedepot", "lowes",
]);
const RETAILER_ALIASES = ["wallmart", "amazom"] as const;
const RETAILER_MATCH = {
  maxEditDistance: 1,
  minEditDistanceLength: 6,
  minCompactSubstringLength: 7,
} as const;

function hasLocalPhrase(keyword: string): boolean {
  const low = keyword.toLowerCase();
  return LOCAL_PHRASES.some((phrase) => new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "u").test(low));
}

function retailerForms(): Set<string> {
  const forms = new Set<string>();
  for (const token of RETAILER_TOKENS) {
    forms.add(token);
    forms.add(TOKEN_ALIASES[token] || singularPluralAlias(token));
  }
  for (const alias of RETAILER_ALIASES) forms.add(alias);
  return forms;
}

function orderedNormalizedTokens(keyword: string): string[] {
  const clean = keyword.replace(/([a-z]+)['’]s\b/gi, "$1");
  const raw = clean.toLowerCase().match(TOKEN_RE) || [];
  return raw.map((t) => TOKEN_ALIASES[t] || singularPluralAlias(t));
}

function compactCandidates(tokens: string[]): string[] {
  const candidates: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    candidates.push(tokens[i]);
    if (i + 1 < tokens.length) candidates.push(`${tokens[i]}${tokens[i + 1]}`);
  }
  return candidates;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) row[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let previous = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const saved = row[j];
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + cost);
      previous = saved;
    }
  }
  return row[b.length];
}

function keywordMatchesRetailer(keyword: string): boolean {
  const forms = retailerForms();
  const candidates = compactCandidates(orderedNormalizedTokens(keyword));
  for (const candidate of candidates) {
    if (forms.has(candidate)) return true;
  }
  const compact = (keyword.toLowerCase().match(TOKEN_RE) || []).join("");
  const { minCompactSubstringLength, maxEditDistance, minEditDistanceLength } = RETAILER_MATCH;
  for (const form of forms) {
    if (form.length >= minCompactSubstringLength && compact.includes(form)) return true;
  }
  for (const candidate of candidates) {
    if (candidate.length < minEditDistanceLength) continue;
    for (const form of forms) {
      if (form.length < minEditDistanceLength) continue;
      if (Math.abs(candidate.length - form.length) > maxEditDistance) continue;
      if (levenshtein(candidate, form) <= maxEditDistance) return true;
    }
  }
  return false;
}

function facetsForSelection(tokens: Set<string>, keyword: string): KeywordFacets {
  const channels: string[] = [];
  if (tokens.has("online")) channels.push("online");
  if ([...tokens].some((t) => STORE_TOKENS.has(t) || t === "store")) channels.push("store");
  if (hasLocalPhrase(keyword)) channels.push("local");
  return {
    audience: [],
    category: [],
    channel: [...new Set(channels)].sort(),
    fit: [],
    modifier: [],
  };
}

function laneForSelection(keyword: string, mainIntent: string | null, tokens: Set<string>): KeywordLane {
  if (hasLocalPhrase(keyword)) return "local_discovery";
  if (keywordMatchesRetailer(keyword)) return "brand_competitor";
  const hasStore = [...tokens].some((t) => STORE_TOKENS.has(t) || t === "store");
  if ((mainIntent || "").toLowerCase() === "navigational" && !hasStore) return "brand_competitor";
  if (hasStore) return "store_discovery";
  return "category_discovery";
}

function classifyForSelection(keyword: string, mainIntent: string | null): { lane: KeywordLane; facets: KeywordFacets } {
  const toks = classifyTokens(keyword);
  return { lane: laneForSelection(keyword, mainIntent, toks), facets: facetsForSelection(toks, keyword) };
}

export function selectionDraftFromView(view: ResearchView): SelectionItem[] {
  const selection = view.selection.map(cloneSelectionItem);
  if (view.selectionRevision !== 1 || view.state !== "completed" || !view.result) {
    return selection;
  }

  const recommendedIds = new Set(
    view.result.keywords
      .filter((row) => row.mergedInto == null && row.recommended === true)
      .map((row) => row.itemId),
  );
  return selection.filter(
    (item) =>
      item.sourceKind === "manual" ||
      (item.sourceKeywordId !== null && recommendedIds.has(item.sourceKeywordId)),
  );
}

export function toggleSelectedItem(draft: SelectionItem[], row: KeywordRow): SelectionItem[] {
  const item = selectionItemFromRow(row);
  if (draft.some((d) => d.itemId === item.itemId)) {
    return draft.filter((d) => d.itemId !== item.itemId);
  }
  if (draft.length >= SELECTION_ITEM_CAP) return draft;
  const candidate = rowCandidate(row);
  const index = draft.findIndex((existing) => compareCandidates(candidate, itemCandidate(existing)) < 0);
  if (index === -1) return draft.concat(item);
  return draft.slice(0, index).concat(item, draft.slice(index));
}

export function removeSelectedItem(draft: SelectionItem[], itemId: string): SelectionItem[] {
  return draft.filter((d) => d.itemId !== itemId);
}

export function editSelectedItemText(
  draft: SelectionItem[],
  itemId: string,
  text: string,
): { draft: SelectionItem[]; reclassified: { lane: KeywordLane; facets: KeywordFacets } } {
  const index = draft.findIndex((d) => d.itemId === itemId);
  if (index === -1) return { draft, reclassified: classifyForSelection(text, null) };
  const current = draft[index];
  const mainIntent = current.metricsSnapshot ? current.metricsSnapshot.mainIntent : null;
  const reclassified = classifyForSelection(text, mainIntent);
  const updated: SelectionItem = {
    ...current,
    keyword: text,
    lane: reclassified.lane,
    facets: reclassified.facets,
  };
  return { draft: draft.slice(0, index).concat(updated, draft.slice(index + 1)), reclassified };
}

export function addManualSelectedItem(draft: SelectionItem[], text: string, itemId: string, firstSeed: string): SelectionItem[] {
  if (draft.length >= SELECTION_ITEM_CAP) return draft;
  const reclassified = classifyForSelection(text, null);
  const item: SelectionItem = {
    itemId,
    sourceKind: "manual",
    sourceKeywordId: null,
    originalKeyword: text,
    keyword: text,
    sourceSeeds: [firstSeed],
    lane: reclassified.lane,
    facets: reclassified.facets,
    metricsSnapshot: null,
  };
  return draft.concat(item);
}

export function selectionOverLimit(draft: SelectionItem[]): boolean {
  return draft.length > SELECTION_SOFT_LIMIT;
}

function selectionSaveProjection(items: SelectionItem[]): SelectionMutationItem[] {
  return items.map((item) => {
    if (item.sourceKind === "calculated") {
      if (typeof item.sourceKeywordId !== "string" || item.sourceKeywordId.length === 0)
        throw new Error("calculated selection item requires a source id");
      return { sourceKind: "calculated", sourceKeywordId: item.sourceKeywordId, keyword: item.keyword };
    }
    return { sourceKind: "manual", keyword: item.keyword };
  });
}

export function canFinalizeSelection(
  view: ResearchView,
  draft: SelectionItem[],
): { ok: boolean; reason: "" | "not_completed" | "empty" | "over_limit" | "unsaved" | "conflicts" } {
  if (view.state !== "completed") return { ok: false, reason: "not_completed" };
  if (draft.length === 0) return { ok: false, reason: "empty" };
  if (draft.length > SELECTION_SOFT_LIMIT) return { ok: false, reason: "over_limit" };
  const saved = selectionSaveProjection(view.selection);
  const proposed = selectionSaveProjection(draft);
  if (saved.length !== proposed.length) return { ok: false, reason: "unsaved" };
  for (let i = 0; i < saved.length; i += 1) {
    const a = saved[i];
    const b = proposed[i];
    if (a.sourceKind !== b.sourceKind) return { ok: false, reason: "unsaved" };
    if (a.sourceKind === "calculated" && b.sourceKind === "calculated" && a.sourceKeywordId !== b.sourceKeywordId)
      return { ok: false, reason: "unsaved" };
    if (a.keyword !== b.keyword) return { ok: false, reason: "unsaved" };
  }
  if (view.selectionConflicts.length > 0) return { ok: false, reason: "conflicts" };
  return { ok: true, reason: "" };
}

export function buildExportQuery(filter: KeywordFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.market !== "all") params.set("market", filter.market);
  if (filter.seed) params.set("seed", filter.seed);
  if (filter.clusterId) params.set("clusterId", filter.clusterId);
  if (filter.intent) params.set("intent", filter.intent);
  if (filter.lane) params.set("lane", filter.lane);
  if (filter.category) params.set("category", filter.category);
  if (filter.audience) params.set("audience", filter.audience);
  if (filter.channel) params.set("channel", filter.channel);
  if (filter.minVolume > 0) params.set("minVolume", String(filter.minVolume));
  if (filter.minOpportunity > 0) params.set("minOpportunity", String(filter.minOpportunity));
  if (filter.recommended === "true" || filter.recommended === "false") params.set("recommended", filter.recommended);
  for (const fl of filter.flags.slice(0, EXPORT_FLAG_CAP)) params.append("flag", fl);
  if (filter.search) params.set("search", filter.search);
  return params;
}

export function nextTheme(current: "light" | "dark"): "light" | "dark" {
  return current === "dark" ? "light" : "dark";
}

export function dashboardPhase(view: ResearchView | null, error: unknown): DashboardViewPhase {
  if (error) return "error";
  if (!view) return "loading";
  if (view.state === "failed") return "error";
  if (view.state !== "completed") return "loading";
  if (!view.result || activeRows(view.result).length === 0) return "empty";
  return "ready";
}

export function emptyKeywordFilterState(): KeywordFilterState {
  return {
    search: "",
    market: "all",
    seed: "",
    clusterId: "",
    intent: "",
    lane: "",
    category: "",
    audience: "",
    channel: "",
    minVolume: 0,
    minOpportunity: 0,
    recommended: "",
    flags: [],
    sortKey: "searchVolume",
    sortDir: "desc",
    page: 1,
    pageSize: 25,
  };
}
