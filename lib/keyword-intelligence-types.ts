import type { RunStatus } from "@/lib/api-types";

export type ClusterLaneCounts = {
  local_discovery?: number;
  brand_competitor?: number;
  store_discovery?: number;
  category_discovery?: number;
};

export type ClusterRow = {
  cluster: string;
  clusterId: string;
  keywords: string[];
  combinedVolume: number;
  headlineVolume: number;
  adjustedClusterVolume: number;
  rawVariantVolume: number;
  variantGroups: VariantGroup[];
  sourceSeeds: string[];
  laneCounts: ClusterLaneCounts;
  facets: KeywordFacets;
  avgCpc: number;
  commercialIntent: number;
  trendScore: number;
  opportunityScore: number;
  recommendedForStoreDiscovery: boolean;
};

export type KeywordCompetitionLevel = "LOW" | "MEDIUM" | "HIGH";

export type KeywordFacets = {
  audience: string[];
  category: string[];
  channel: string[];
  fit: string[];
  modifier: string[];
};

export type KeywordLane =
  | "local_discovery"
  | "brand_competitor"
  | "store_discovery"
  | "category_discovery";

export type KeywordMainIntent =
  | "transactional"
  | "commercial"
  | "informational"
  | "navigational";

export type KeywordMarket = {
  code: "US" | "GB" | "CA" | "AU" | "NZ" | "DE" | "FR" | "IN" | "AE";
  name: string;
  locationCode: number;
  languageCode: string;
  languageName: string;
};

export type KeywordMetricSnapshot = {
  searchVolume: number;
  cpc: number | null;
  competition: number;
  competitionLevel: KeywordCompetitionLevel | null;
  keywordDifficulty: number | null;
  mainIntent: KeywordMainIntent;
  commercialIntent: number;
  monthlyHistory: MonthlyHistoryPoint[];
  trendSlope: number;
  cluster: string | null;
  clusterId: string | null;
  variantGroupId: string | null;
  variantCanonical: string | null;
  flags: string[];
  opportunityScore: number | null;
  recommended: boolean;
  mergedInto: string | null;
  availableMarkets: string[];
  marketMetrics: {
    US: MarketMetric | null;
    GB: MarketMetric | null;
    CA: MarketMetric | null;
    AU: MarketMetric | null;
    NZ: MarketMetric | null;
    DE: MarketMetric | null;
    FR: MarketMetric | null;
    IN: MarketMetric | null;
    AE: MarketMetric | null;
  };
};

export type KeywordResearchRunResponse = {
  run: RunStatus;
  statusUrl: string;
};

export type KeywordRow = {
  itemId: string;
  keyword: string;
  seed: string;
  sourceSeeds: string[];
  searchVolume: number;
  cpc: number | null;
  competition: number;
  competitionLevel: KeywordCompetitionLevel | null;
  keywordDifficulty: number | null;
  mainIntent: KeywordMainIntent;
  commercialIntent: number;
  monthlyHistory: MonthlyHistoryPoint[];
  trendSlope: number;
  cluster: string | null;
  clusterId: string | null;
  lane: KeywordLane;
  facets: KeywordFacets;
  variantGroupId: string | null;
  variantCanonical: string | null;
  flags: string[];
  opportunityScore: number | null;
  recommended: boolean;
  mergedInto: string | null;
  availableMarkets: string[];
  marketMetrics: {
    US: MarketMetric | null;
    GB: MarketMetric | null;
    CA: MarketMetric | null;
    AU: MarketMetric | null;
    NZ: MarketMetric | null;
    DE: MarketMetric | null;
    FR: MarketMetric | null;
    IN: MarketMetric | null;
    AE: MarketMetric | null;
  };
};

export type MarketMetric = {
  countryCode: string;
  locationCode: number;
  locationName: string;
  languageName: string;
  searchVolume: number;
  cpc: number | null;
  competition: number;
  competitionLevel: KeywordCompetitionLevel;
  keywordDifficulty: number | null;
  mainIntent: KeywordMainIntent;
  commercialIntent: number;
  monthlyHistory: MonthlyHistoryPoint[];
  trendSlope: number;
  flags: string[];
  opportunityScore: number;
  recommended: boolean;
};

export type MonthlyHistoryPoint = {
  year: number;
  month: number;
  searchVolume: number;
};

export type ResearchProgress = {
  stage: ResearchProgressStage;
  expansion: StageCounts;
  anchorScreen: StageCounts;
  marketOverview: StageCounts;
};

export type ResearchProgressStage =
  | "queued"
  | "expansion"
  | "anchor_screen"
  | "market_overview"
  | "finalizing"
  | "completed"
  | "failed";

export type ResearchResult = {
  contractVersion: 1;
  researchId: string;
  generation: number;
  configFingerprint: string;
  seeds: string[];
  markets: KeywordMarket[];
  summary: ResearchSummary;
  keywords: KeywordRow[];
  clusters: ClusterRow[];
};

export type ResearchSafeError = {
  code: string;
  message: string;
};

export type ResearchState = "queued" | "running" | "completed" | "failed";

export type ResearchSummary = {
  schemaVersion: 3;
  markets: KeywordMarket[];
  seeds: string[];
  rawItemsCollected: number;
  itemsWithMetrics: number;
  informationalDropped: number;
  uniquePhrases: number;
  dedupMerged: number;
  activeKeywords: number;
  variantGroups: number;
  clusters: number;
  recommendedKeywords: number;
  recommendedClusters: number;
};

export type ResearchView = {
  id: string;
  statusUrl: string;
  state: ResearchState;
  generation: number;
  contractVersion: 1;
  seeds: string[];
  markets: KeywordMarket[];
  progress: ResearchProgress;
  result: ResearchResult | null;
  selection: SelectionItem[];
  selectionRevision: number;
  selectionConflicts: SelectionConflict[];
  safeError: ResearchSafeError | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  updatedAt: string;
};

export type SelectionConflict = {
  conflictId: string;
  itemIds: string[];
  pairs: SelectionConflictPair[];
  canonicalItemId: string;
};

export type SelectionConflictPair = {
  leftItemId: string;
  rightItemId: string;
  reason: "compact" | "similarity";
  similarity: number;
};

export type SelectionItem = {
  itemId: string;
  sourceKind: "calculated" | "manual";
  sourceKeywordId: string | null;
  originalKeyword: string;
  keyword: string;
  sourceSeeds: string[];
  lane: KeywordLane;
  facets: KeywordFacets;
  metricsSnapshot: KeywordMetricSnapshot | null;
};

export type StageCounts = {
  expected: number;
  terminal: number;
  succeeded: number;
  skipped: number;
  failed: number;
};

export type VariantGroup = {
  variantGroupId: string;
  canonical: string;
  variants: string[];
  volume: number;
  sourceSeeds: string[];
};

export type CalculatedSelectionMutation = { sourceKind: "calculated"; sourceKeywordId: string; keyword: string };
export type ManualSelectionMutation = { sourceKind: "manual"; keyword: string };
export type SelectionMutationItem = CalculatedSelectionMutation | ManualSelectionMutation;
