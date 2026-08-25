import type {
  ClusterLaneCounts,
  ClusterRow,
  KeywordFacets,
  KeywordMarket,
  KeywordMetricSnapshot,
  KeywordResearchRunResponse,
  KeywordRow,
  MarketMetric,
  MonthlyHistoryPoint,
  ResearchProgress,
  ResearchResult,
  ResearchSafeError,
  ResearchSummary,
  ResearchView,
  SelectionConflict,
  SelectionConflictPair,
  SelectionItem,
  StageCounts,
  VariantGroup,
} from "./keyword-intelligence-types";
import { ApiPayloadError, parseRunStatus } from "./api-validation.ts";

export const KEYWORD_RESEARCH_ID_PATTERN = /^kr_[A-Za-z0-9_-]{24}$/u;

export function validKeywordResearchId(id: string): boolean {
  return KEYWORD_RESEARCH_ID_PATTERN.test(id);
}

export const CLIENT_REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{16,80}$/u;

export function newClientRequestId(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

const MARKET_CODES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;
const LANES = [
  "local_discovery",
  "brand_competitor",
  "store_discovery",
  "category_discovery",
] as const;
const RESEARCH_STATES = ["queued", "running", "completed", "failed"] as const;
const STAGES = [
  "queued",
  "expansion",
  "anchor_screen",
  "market_overview",
  "finalizing",
  "completed",
  "failed",
] as const;
const SOURCE_KINDS = ["calculated", "manual"] as const;
const CONFLICT_REASONS = ["compact", "similarity"] as const;

type UnknownRecord = Record<string, unknown>;

function record(value: unknown, path: string): UnknownRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ApiPayloadError(path);
  }
  return value as UnknownRecord;
}

function text(value: unknown, path: string): string {
  if (typeof value !== "string") throw new ApiPayloadError(path);
  return value;
}

function nullableText(value: unknown, path: string): string | null {
  if (value === null) return null;
  return text(value, path);
}

function nonEmptyText(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!parsed.trim()) throw new ApiPayloadError(path);
  return parsed;
}

function number(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ApiPayloadError(path);
  }
  return value;
}

function integer(value: unknown, path: string): number {
  const parsed = number(value, path);
  if (!Number.isSafeInteger(parsed)) throw new ApiPayloadError(path);
  return parsed;
}

function nullableNumber(value: unknown, path: string): number | null {
  if (value === null) return null;
  return number(value, path);
}

function nonNegativeInteger(value: unknown, path: string): number {
  const parsed = integer(value, path);
  if (parsed < 0) throw new ApiPayloadError(path);
  return parsed;
}

function positiveInteger(value: unknown, path: string): number {
  const parsed = integer(value, path);
  if (parsed <= 0) throw new ApiPayloadError(path);
  return parsed;
}

function score(value: unknown, path: string): number {
  const parsed = integer(value, path);
  if (parsed < 0 || parsed > 100) throw new ApiPayloadError(path);
  return parsed;
}

function nullableScore(value: unknown, path: string): number | null {
  if (value === null) return null;
  return score(value, path);
}

function boolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") throw new ApiPayloadError(path);
  return value;
}

function oneOf<T extends string>(
  value: unknown,
  values: readonly T[],
  path: string,
): T {
  if (typeof value !== "string" || !values.includes(value as T)) {
    throw new ApiPayloadError(path);
  }
  return value as T;
}

function array<T>(
  value: unknown,
  path: string,
  parse: (item: unknown, path: string) => T,
): T[] {
  if (!Array.isArray(value)) throw new ApiPayloadError(path);
  return value.map((item, index) => parse(item, `${path}[${index}]`));
}

function stringArray(value: unknown, path: string): string[] {
  return array(value, path, text);
}

function exactKeys(source: UnknownRecord, expected: readonly string[], path: string): void {
  const actual = Object.keys(source).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new ApiPayloadError(path);
  }
}

function fraction(value: unknown, path: string): number {
  const parsed = number(value, path);
  if (parsed < 0 || parsed > 1) throw new ApiPayloadError(path);
  return parsed;
}

function isoDate(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(parsed)) throw new ApiPayloadError(path);
  const date = new Date(`${parsed}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== parsed) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function isoTimestamp(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!/^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:\d{2})$/u.test(parsed) ||
      !Number.isFinite(Date.parse(parsed))) {
    throw new ApiPayloadError(path);
  }
  isoDate(parsed.slice(0, 10), path);
  return parsed;
}

function nullableIsoTimestamp(value: unknown, path: string): string | null {
  if (value === null) return null;
  return isoTimestamp(value, path);
}

const MARKET_KEYS = ["code", "name", "locationCode", "languageCode", "languageName"] as const;

function market(value: unknown, path: string): KeywordMarket {
  const source = record(value, path);
  exactKeys(source, MARKET_KEYS, path);
  return {
    code: oneOf(source.code, MARKET_CODES, `${path}.code`),
    name: text(source.name, `${path}.name`),
    locationCode: integer(source.locationCode, `${path}.locationCode`),
    languageCode: text(source.languageCode, `${path}.languageCode`),
    languageName: text(source.languageName, `${path}.languageName`),
  };
}

function markets(value: unknown, path: string): KeywordMarket[] {
  const parsed = array(value, path, market);
  if (parsed.length === 0) throw new ApiPayloadError(path);
  const codes = parsed.map((item) => item.code);
  if (new Set(codes).size !== codes.length) throw new ApiPayloadError(`${path}.code`);
  return parsed;
}

const MONTHLY_HISTORY_POINT_KEYS = ["year", "month", "searchVolume"] as const;

function monthlyHistoryPoint(value: unknown, path: string): MonthlyHistoryPoint {
  const source = record(value, path);
  exactKeys(source, MONTHLY_HISTORY_POINT_KEYS, path);
  const month = integer(source.month, `${path}.month`);
  if (month < 1 || month > 12) throw new ApiPayloadError(`${path}.month`);
  return {
    year: integer(source.year, `${path}.year`),
    month,
    searchVolume: nonNegativeInteger(source.searchVolume, `${path}.searchVolume`),
  };
}

function monthlyHistory(value: unknown, path: string): MonthlyHistoryPoint[] {
  return array(value, path, monthlyHistoryPoint);
}

const MARKET_METRIC_KEYS = [
  "countryCode",
  "locationCode",
  "locationName",
  "languageName",
  "searchVolume",
  "cpc",
  "competition",
  "competitionLevel",
  "keywordDifficulty",
  "mainIntent",
  "commercialIntent",
  "monthlyHistory",
  "trendSlope",
  "flags",
  "opportunityScore",
  "recommended",
] as const;

function marketMetric(value: unknown, path: string): MarketMetric {
  const source = record(value, path);
  exactKeys(source, MARKET_METRIC_KEYS, path);
  return {
    countryCode: text(source.countryCode, `${path}.countryCode`),
    locationCode: integer(source.locationCode, `${path}.locationCode`),
    locationName: text(source.locationName, `${path}.locationName`),
    languageName: text(source.languageName, `${path}.languageName`),
    searchVolume: nonNegativeInteger(source.searchVolume, `${path}.searchVolume`),
    cpc: nullableNumber(source.cpc, `${path}.cpc`),
    competition: nullableNumber(source.competition, `${path}.competition`),
    competitionLevel: nullableText(source.competitionLevel, `${path}.competitionLevel`),
    keywordDifficulty: nullableScore(source.keywordDifficulty, `${path}.keywordDifficulty`),
    mainIntent: nullableText(source.mainIntent, `${path}.mainIntent`),
    commercialIntent: number(source.commercialIntent, `${path}.commercialIntent`),
    monthlyHistory: monthlyHistory(source.monthlyHistory, `${path}.monthlyHistory`),
    trendSlope: number(source.trendSlope, `${path}.trendSlope`),
    flags: stringArray(source.flags, `${path}.flags`),
    opportunityScore: score(source.opportunityScore, `${path}.opportunityScore`),
    recommended: boolean(source.recommended, `${path}.recommended`),
  };
}

function nullableMarketMetric(value: unknown, path: string): MarketMetric | null {
  if (value === null) return null;
  return marketMetric(value, path);
}

const FACETS_KEYS = ["audience", "category", "channel", "fit", "modifier"] as const;

function facets(value: unknown, path: string): KeywordFacets {
  const source = record(value, path);
  exactKeys(source, FACETS_KEYS, path);
  return {
    audience: stringArray(source.audience, `${path}.audience`),
    category: stringArray(source.category, `${path}.category`),
    channel: stringArray(source.channel, `${path}.channel`),
    fit: stringArray(source.fit, `${path}.fit`),
    modifier: stringArray(source.modifier, `${path}.modifier`),
  };
}

function marketMetrics(value: unknown, path: string): KeywordRow["marketMetrics"] {
  const source = record(value, path);
  exactKeys(source, MARKET_CODES, path);
  return {
    US: nullableMarketMetric(source.US, `${path}.US`),
    GB: nullableMarketMetric(source.GB, `${path}.GB`),
    CA: nullableMarketMetric(source.CA, `${path}.CA`),
    AU: nullableMarketMetric(source.AU, `${path}.AU`),
    NZ: nullableMarketMetric(source.NZ, `${path}.NZ`),
    DE: nullableMarketMetric(source.DE, `${path}.DE`),
    FR: nullableMarketMetric(source.FR, `${path}.FR`),
    IN: nullableMarketMetric(source.IN, `${path}.IN`),
    AE: nullableMarketMetric(source.AE, `${path}.AE`),
  };
}

const KEYWORD_ROW_KEYS = [
  "itemId",
  "keyword",
  "seed",
  "sourceSeeds",
  "searchVolume",
  "cpc",
  "competition",
  "competitionLevel",
  "keywordDifficulty",
  "mainIntent",
  "commercialIntent",
  "monthlyHistory",
  "trendSlope",
  "cluster",
  "clusterId",
  "lane",
  "facets",
  "variantGroupId",
  "variantCanonical",
  "flags",
  "opportunityScore",
  "recommended",
  "mergedInto",
  "availableMarkets",
  "marketMetrics",
] as const;

function keywordRow(value: unknown, path: string): KeywordRow {
  const source = record(value, path);
  exactKeys(source, KEYWORD_ROW_KEYS, path);
  return {
    itemId: text(source.itemId, `${path}.itemId`),
    keyword: text(source.keyword, `${path}.keyword`),
    seed: text(source.seed, `${path}.seed`),
    sourceSeeds: stringArray(source.sourceSeeds, `${path}.sourceSeeds`),
    searchVolume: nonNegativeInteger(source.searchVolume, `${path}.searchVolume`),
    cpc: nullableNumber(source.cpc, `${path}.cpc`),
    competition: nullableNumber(source.competition, `${path}.competition`),
    competitionLevel: nullableText(source.competitionLevel, `${path}.competitionLevel`),
    keywordDifficulty: nullableScore(source.keywordDifficulty, `${path}.keywordDifficulty`),
    mainIntent: nullableText(source.mainIntent, `${path}.mainIntent`),
    commercialIntent: number(source.commercialIntent, `${path}.commercialIntent`),
    monthlyHistory: monthlyHistory(source.monthlyHistory, `${path}.monthlyHistory`),
    trendSlope: number(source.trendSlope, `${path}.trendSlope`),
    cluster: nullableText(source.cluster, `${path}.cluster`),
    clusterId: nullableText(source.clusterId, `${path}.clusterId`),
    lane: oneOf(source.lane, LANES, `${path}.lane`),
    facets: facets(source.facets, `${path}.facets`),
    variantGroupId: nullableText(source.variantGroupId, `${path}.variantGroupId`),
    variantCanonical: nullableText(source.variantCanonical, `${path}.variantCanonical`),
    flags: stringArray(source.flags, `${path}.flags`),
    opportunityScore: nullableScore(source.opportunityScore, `${path}.opportunityScore`),
    recommended: boolean(source.recommended, `${path}.recommended`),
    mergedInto: nullableText(source.mergedInto, `${path}.mergedInto`),
    availableMarkets: stringArray(source.availableMarkets, `${path}.availableMarkets`),
    marketMetrics: marketMetrics(source.marketMetrics, `${path}.marketMetrics`),
  };
}

const VARIANT_GROUP_KEYS = [
  "variantGroupId",
  "canonical",
  "variants",
  "volume",
  "sourceSeeds",
] as const;

function variantGroup(value: unknown, path: string): VariantGroup {
  const source = record(value, path);
  exactKeys(source, VARIANT_GROUP_KEYS, path);
  return {
    variantGroupId: text(source.variantGroupId, `${path}.variantGroupId`),
    canonical: text(source.canonical, `${path}.canonical`),
    variants: stringArray(source.variants, `${path}.variants`),
    volume: nonNegativeInteger(source.volume, `${path}.volume`),
    sourceSeeds: stringArray(source.sourceSeeds, `${path}.sourceSeeds`),
  };
}

function laneCounts(value: unknown, path: string): ClusterLaneCounts {
  const source = record(value, path);
  const result: ClusterLaneCounts = {};
  for (const key of Object.keys(source)) {
    if (!LANES.includes(key as (typeof LANES)[number])) {
      throw new ApiPayloadError(`${path}.${key}`);
    }
    result[key as keyof ClusterLaneCounts] = positiveInteger(source[key], `${path}.${key}`);
  }
  return result;
}

const CLUSTER_ROW_KEYS = [
  "cluster",
  "clusterId",
  "keywords",
  "combinedVolume",
  "headlineVolume",
  "adjustedClusterVolume",
  "rawVariantVolume",
  "variantGroups",
  "sourceSeeds",
  "laneCounts",
  "facets",
  "avgCpc",
  "commercialIntent",
  "trendScore",
  "opportunityScore",
  "recommendedForStoreDiscovery",
] as const;

function clusterRow(value: unknown, path: string): ClusterRow {
  const source = record(value, path);
  exactKeys(source, CLUSTER_ROW_KEYS, path);
  return {
    cluster: text(source.cluster, `${path}.cluster`),
    clusterId: text(source.clusterId, `${path}.clusterId`),
    keywords: stringArray(source.keywords, `${path}.keywords`),
    combinedVolume: nonNegativeInteger(source.combinedVolume, `${path}.combinedVolume`),
    headlineVolume: nonNegativeInteger(source.headlineVolume, `${path}.headlineVolume`),
    adjustedClusterVolume: nonNegativeInteger(
      source.adjustedClusterVolume,
      `${path}.adjustedClusterVolume`,
    ),
    rawVariantVolume: nonNegativeInteger(source.rawVariantVolume, `${path}.rawVariantVolume`),
    variantGroups: array(source.variantGroups, `${path}.variantGroups`, variantGroup),
    sourceSeeds: stringArray(source.sourceSeeds, `${path}.sourceSeeds`),
    laneCounts: laneCounts(source.laneCounts, `${path}.laneCounts`),
    facets: facets(source.facets, `${path}.facets`),
    avgCpc: number(source.avgCpc, `${path}.avgCpc`),
    commercialIntent: number(source.commercialIntent, `${path}.commercialIntent`),
    trendScore: number(source.trendScore, `${path}.trendScore`),
    opportunityScore: score(source.opportunityScore, `${path}.opportunityScore`),
    recommendedForStoreDiscovery: boolean(
      source.recommendedForStoreDiscovery,
      `${path}.recommendedForStoreDiscovery`,
    ),
  };
}

const SUMMARY_KEYS = [
  "schemaVersion",
  "markets",
  "seeds",
  "rawItemsCollected",
  "itemsWithMetrics",
  "informationalDropped",
  "uniquePhrases",
  "dedupMerged",
  "activeKeywords",
  "variantGroups",
  "clusters",
  "recommendedKeywords",
  "recommendedClusters",
] as const;

function summary(value: unknown, path: string): ResearchSummary {
  const source = record(value, path);
  exactKeys(source, SUMMARY_KEYS, path);
  if (source.schemaVersion !== 3) throw new ApiPayloadError(`${path}.schemaVersion`);
  return {
    schemaVersion: 3,
    markets: array(source.markets, `${path}.markets`, market),
    seeds: stringArray(source.seeds, `${path}.seeds`),
    rawItemsCollected: nonNegativeInteger(source.rawItemsCollected, `${path}.rawItemsCollected`),
    itemsWithMetrics: nonNegativeInteger(source.itemsWithMetrics, `${path}.itemsWithMetrics`),
    informationalDropped: nonNegativeInteger(
      source.informationalDropped,
      `${path}.informationalDropped`,
    ),
    uniquePhrases: nonNegativeInteger(source.uniquePhrases, `${path}.uniquePhrases`),
    dedupMerged: nonNegativeInteger(source.dedupMerged, `${path}.dedupMerged`),
    activeKeywords: nonNegativeInteger(source.activeKeywords, `${path}.activeKeywords`),
    variantGroups: nonNegativeInteger(source.variantGroups, `${path}.variantGroups`),
    clusters: nonNegativeInteger(source.clusters, `${path}.clusters`),
    recommendedKeywords: nonNegativeInteger(
      source.recommendedKeywords,
      `${path}.recommendedKeywords`,
    ),
    recommendedClusters: nonNegativeInteger(
      source.recommendedClusters,
      `${path}.recommendedClusters`,
    ),
  };
}

const RESULT_KEYS = [
  "contractVersion",
  "researchId",
  "generation",
  "configFingerprint",
  "seeds",
  "markets",
  "summary",
  "keywords",
  "clusters",
] as const;

function result(value: unknown, path: string): ResearchResult {
  const source = record(value, path);
  exactKeys(source, RESULT_KEYS, path);
  const generation = positiveInteger(source.generation, `${path}.generation`);
  const seeds = stringArray(source.seeds, `${path}.seeds`);
  if (seeds.length < 1 || seeds.length > 5) throw new ApiPayloadError(`${path}.seeds`);
  return {
    contractVersion: source.contractVersion === 1 ? 1 : (() => { throw new ApiPayloadError(`${path}.contractVersion`); })(),
    researchId: text(source.researchId, `${path}.researchId`),
    generation,
    configFingerprint: text(source.configFingerprint, `${path}.configFingerprint`),
    seeds,
    markets: markets(source.markets, `${path}.markets`),
    summary: summary(source.summary, `${path}.summary`),
    keywords: array(source.keywords, `${path}.keywords`, keywordRow),
    clusters: array(source.clusters, `${path}.clusters`, clusterRow),
  };
}

const STAGE_COUNTS_KEYS = ["expected", "terminal", "succeeded", "skipped", "failed"] as const;

function stageCounts(value: unknown, path: string): StageCounts {
  const source = record(value, path);
  exactKeys(source, STAGE_COUNTS_KEYS, path);
  return {
    expected: nonNegativeInteger(source.expected, `${path}.expected`),
    terminal: nonNegativeInteger(source.terminal, `${path}.terminal`),
    succeeded: nonNegativeInteger(source.succeeded, `${path}.succeeded`),
    skipped: nonNegativeInteger(source.skipped, `${path}.skipped`),
    failed: nonNegativeInteger(source.failed, `${path}.failed`),
  };
}

const PROGRESS_KEYS = ["stage", "expansion", "anchorScreen", "marketOverview"] as const;

function progress(value: unknown, path: string): ResearchProgress {
  const source = record(value, path);
  exactKeys(source, PROGRESS_KEYS, path);
  return {
    stage: oneOf(source.stage, STAGES, `${path}.stage`),
    expansion: stageCounts(source.expansion, `${path}.expansion`),
    anchorScreen: stageCounts(source.anchorScreen, `${path}.anchorScreen`),
    marketOverview: stageCounts(source.marketOverview, `${path}.marketOverview`),
  };
}

const SNAPSHOT_KEYS = [
  "searchVolume",
  "cpc",
  "competition",
  "competitionLevel",
  "keywordDifficulty",
  "mainIntent",
  "commercialIntent",
  "monthlyHistory",
  "trendSlope",
  "cluster",
  "clusterId",
  "variantGroupId",
  "variantCanonical",
  "flags",
  "opportunityScore",
  "recommended",
  "mergedInto",
  "availableMarkets",
  "marketMetrics",
] as const;

function keywordMetricSnapshot(value: unknown, path: string): KeywordMetricSnapshot {
  const source = record(value, path);
  exactKeys(source, SNAPSHOT_KEYS, path);
  return {
    searchVolume: nonNegativeInteger(source.searchVolume, `${path}.searchVolume`),
    cpc: nullableNumber(source.cpc, `${path}.cpc`),
    competition: nullableNumber(source.competition, `${path}.competition`),
    competitionLevel: nullableText(source.competitionLevel, `${path}.competitionLevel`),
    keywordDifficulty: nullableScore(source.keywordDifficulty, `${path}.keywordDifficulty`),
    mainIntent: nullableText(source.mainIntent, `${path}.mainIntent`),
    commercialIntent: number(source.commercialIntent, `${path}.commercialIntent`),
    monthlyHistory: monthlyHistory(source.monthlyHistory, `${path}.monthlyHistory`),
    trendSlope: number(source.trendSlope, `${path}.trendSlope`),
    cluster: nullableText(source.cluster, `${path}.cluster`),
    clusterId: nullableText(source.clusterId, `${path}.clusterId`),
    variantGroupId: nullableText(source.variantGroupId, `${path}.variantGroupId`),
    variantCanonical: nullableText(source.variantCanonical, `${path}.variantCanonical`),
    flags: stringArray(source.flags, `${path}.flags`),
    opportunityScore: nullableScore(source.opportunityScore, `${path}.opportunityScore`),
    recommended: boolean(source.recommended, `${path}.recommended`),
    mergedInto: nullableText(source.mergedInto, `${path}.mergedInto`),
    availableMarkets: stringArray(source.availableMarkets, `${path}.availableMarkets`),
    marketMetrics: marketMetrics(source.marketMetrics, `${path}.marketMetrics`),
  };
}

function nullableMetricSnapshot(
  value: unknown,
  path: string,
): KeywordMetricSnapshot | null {
  if (value === null) return null;
  return keywordMetricSnapshot(value, path);
}

const SELECTION_ITEM_KEYS = [
  "itemId",
  "sourceKind",
  "sourceKeywordId",
  "originalKeyword",
  "keyword",
  "sourceSeeds",
  "lane",
  "facets",
  "metricsSnapshot",
] as const;

function selectionItem(value: unknown, path: string): SelectionItem {
  const source = record(value, path);
  exactKeys(source, SELECTION_ITEM_KEYS, path);
  return {
    itemId: text(source.itemId, `${path}.itemId`),
    sourceKind: oneOf(source.sourceKind, SOURCE_KINDS, `${path}.sourceKind`),
    sourceKeywordId: nullableText(source.sourceKeywordId, `${path}.sourceKeywordId`),
    originalKeyword: text(source.originalKeyword, `${path}.originalKeyword`),
    keyword: text(source.keyword, `${path}.keyword`),
    sourceSeeds: stringArray(source.sourceSeeds, `${path}.sourceSeeds`),
    lane: oneOf(source.lane, LANES, `${path}.lane`),
    facets: facets(source.facets, `${path}.facets`),
    metricsSnapshot: nullableMetricSnapshot(source.metricsSnapshot, `${path}.metricsSnapshot`),
  };
}

const CONFLICT_PAIR_KEYS = [
  "leftItemId",
  "rightItemId",
  "reason",
  "similarity",
] as const;

function conflictPair(value: unknown, path: string): SelectionConflictPair {
  const source = record(value, path);
  exactKeys(source, CONFLICT_PAIR_KEYS, path);
  return {
    leftItemId: text(source.leftItemId, `${path}.leftItemId`),
    rightItemId: text(source.rightItemId, `${path}.rightItemId`),
    reason: oneOf(source.reason, CONFLICT_REASONS, `${path}.reason`),
    similarity: fraction(source.similarity, `${path}.similarity`),
  };
}

const CONFLICT_KEYS = ["conflictId", "itemIds", "pairs", "canonicalItemId"] as const;

function conflict(value: unknown, path: string): SelectionConflict {
  const source = record(value, path);
  exactKeys(source, CONFLICT_KEYS, path);
  const itemIds = stringArray(source.itemIds, `${path}.itemIds`);
  for (let i = 1; i < itemIds.length; i++) {
    if (itemIds[i - 1] >= itemIds[i]) throw new ApiPayloadError(`${path}.itemIds`);
  }
  const pairs = array(source.pairs, `${path}.pairs`, conflictPair);
  for (let i = 1; i < pairs.length; i++) {
    const previous = pairs[i - 1];
    const current = pairs[i];
    if (previous.leftItemId > current.leftItemId ||
        (previous.leftItemId === current.leftItemId &&
          previous.rightItemId >= current.rightItemId)) {
      throw new ApiPayloadError(`${path}.pairs`);
    }
  }
  return {
    conflictId: text(source.conflictId, `${path}.conflictId`),
    itemIds,
    pairs,
    canonicalItemId: text(source.canonicalItemId, `${path}.canonicalItemId`),
  };
}

const SAFE_ERROR_KEYS = ["code", "message"] as const;

function safeError(value: unknown, path: string): ResearchSafeError {
  const source = record(value, path);
  exactKeys(source, SAFE_ERROR_KEYS, path);
  return {
    code: text(source.code, `${path}.code`),
    message: text(source.message, `${path}.message`),
  };
}

function nullableSafeError(value: unknown, path: string): ResearchSafeError | null {
  if (value === null) return null;
  return safeError(value, path);
}

const RESEARCH_VIEW_KEYS = [
  "id",
  "statusUrl",
  "state",
  "generation",
  "contractVersion",
  "seeds",
  "markets",
  "progress",
  "result",
  "selection",
  "selectionRevision",
  "selectionConflicts",
  "safeError",
  "createdAt",
  "startedAt",
  "completedAt",
  "updatedAt",
] as const;

export function parseResearchView(value: unknown): ResearchView {
  const source = record(value, "research");
  exactKeys(source, RESEARCH_VIEW_KEYS, "research");
  const state = oneOf(source.state, RESEARCH_STATES, "research.state");
  const generation = positiveInteger(source.generation, "research.generation");
  const contractVersion = source.contractVersion === 1 ? 1 : (() => { throw new ApiPayloadError("research.contractVersion"); })();
  const seeds = stringArray(source.seeds, "research.seeds");
  if (seeds.length < 1 || seeds.length > 5) throw new ApiPayloadError("research.seeds");
  const selection = array(source.selection, "research.selection", selectionItem);
  if (selection.length > 200) throw new ApiPayloadError("research.selection");
  const selectionRevision = nonNegativeInteger(
    source.selectionRevision,
    "research.selectionRevision",
  );
  let parsedResult: ResearchResult | null = null;
  if (state === "completed") {
    parsedResult = result(source.result, "research.result");
  } else if (source.result !== null) {
    throw new ApiPayloadError("research.result");
  }
  return {
    id: text(source.id, "research.id"),
    statusUrl: text(source.statusUrl, "research.statusUrl"),
    state,
    generation,
    contractVersion,
    seeds,
    markets: markets(source.markets, "research.markets"),
    progress: progress(source.progress, "research.progress"),
    result: parsedResult,
    selection,
    selectionRevision,
    selectionConflicts: array(source.selectionConflicts, "research.selectionConflicts", conflict),
    safeError: nullableSafeError(source.safeError, "research.safeError"),
    createdAt: isoTimestamp(source.createdAt, "research.createdAt"),
    startedAt: nullableIsoTimestamp(source.startedAt, "research.startedAt"),
    completedAt: nullableIsoTimestamp(source.completedAt, "research.completedAt"),
    updatedAt: isoTimestamp(source.updatedAt, "research.updatedAt"),
  };
}

export function parseResearchEnvelope(payload: unknown): ResearchView {
  const source = record(payload, "envelope");
  exactKeys(source, ["research"], "envelope");
  return parseResearchView(source.research);
}

export function parseRunHandoffEnvelope(payload: unknown): KeywordResearchRunResponse {
  const source = record(payload, "handoff");
  exactKeys(source, ["run", "statusUrl"], "handoff");
  return {
    run: parseRunStatus(source.run, "handoff.run"),
    statusUrl: nonEmptyText(source.statusUrl, "handoff.statusUrl"),
  };
}

export function validateSeedsInput(
  input: unknown,
): { ok: true; seeds: string[] } | { ok: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "The request body must be an object with exactly one key: seeds." };
  }
  const keys = Object.keys(input);
  if (keys.length !== 1 || keys[0] !== "seeds") {
    return { ok: false, error: "The request body must contain exactly the key 'seeds'." };
  }
  const raw = (input as UnknownRecord).seeds;
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > 5) {
    return { ok: false, error: "One to five research seed phrases are required." };
  }
  const seen = new Set<string>();
  const seeds: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    const value = raw[i];
    if (typeof value !== "string") {
      return { ok: false, error: `seeds[${i}] must be a string.` };
    }
    const collapsed = value.normalize("NFKC").replace(/\s+/gu, " ").trim();
    const length = [...collapsed].length;
    if (length < 1 || length > 100) {
      return { ok: false, error: `seeds[${i}] must be 1-100 characters after normalization.` };
    }
    const key = collapsed.toLocaleLowerCase("en-US");
    if (seen.has(key)) {
      return { ok: false, error: `seeds[${i}] duplicates another seed.` };
    }
    seen.add(key);
    seeds.push(collapsed);
  }
  return { ok: true, seeds };
}
