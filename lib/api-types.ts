export type RunState =
  | "queued"
  | "running"
  | "awaiting_query_confirmation"
  | "completed"
  | "failed"
  | "cancelled";
export type RunPhase =
  | "query_planning"
  | "query_review"
  | "scraping"
  | "finished";
export type QuerySource = "generated" | "user_added" | "user_edited";
export type QueryValidationState = "pending" | "valid" | "invalid";

export type LeadStatus = "qualified" | "rejected" | "failed";
export type BusinessQualifier = "brand" | "retailer" | "unspecified";
export type StoreFitState =
  | "specialist"
  | "category_seller"
  | "mismatch"
  | "unknown";
export type ContactabilityTier =
  | "direct"
  | "indirect"
  | "research_only"
  | "none";
export type ScoreSemantics =
  | "legacy_v1"
  | "not_scored_v2"
  | "evidence_rank_v2";
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type EvidenceItem = {
  kind: string;
  value: string;
  sourceUrl: string;
  method: string;
  confidence: number;
  validationReason: string;
  decision?: ContactPageDecision;
};

export type ContactPageDecision = {
  accepted: boolean;
  routeAccepted: boolean;
  routeReason: string;
  sameStore: boolean;
  httpUsable: boolean;
  pageUsable: boolean;
  positiveSignals: string[];
  validationReason: string;
  sourceUrl: string;
};

export type ContactEvidence = {
  emails?: EvidenceItem[];
  phones?: EvidenceItem[];
  contactPages?: EvidenceItem[];
  socialProfiles?: EvidenceItem[];
  organizationNames?: EvidenceItem[];
};

export type CategoryIntent = {
  originalShopType?: string;
  shopType: string;
  businessQualifier: BusinessQualifier | string;
  categoryVocabulary?: string[];
};

export type StoreFitEvidence = {
  intent?: CategoryIntent;
  accepted?: boolean;
  state?: StoreFitState | string;
  score?: number;
  matchedTerms?: string[];
  sourceUrls?: string[];
  reason?: string;
  signalKinds?: string[];
  breadthEvidence?: Array<{
    sourceUrl: string;
    signal: string;
    terms: string[];
  }>;
  evidence?: StoreFitPageEvidence[];
};

export type StoreFitPageEvidence = {
  sourceUrl: string;
  pageType: string;
  matchedTerms: string[];
  claimTerms: string[];
  signals: string[];
  breadthTerms: string[];
  negativeSignals: string[];
  strength: number;
  textLength: number;
};

export type IdentityEvidence = {
  stableHostname?: string;
  displayHostname?: string;
  observedHostnames?: string[];
  mergedOccurrenceCount?: number;
  canonical?: {
    url?: string;
    hostname?: string;
    trusted?: boolean;
    reason?: string;
  };
  method?: string;
  confidence?: number;
};

export type ScoreBreakdown = {
  version: number;
  components: {
    identity?: number;
    shopifyValidation?: number;
    categoryFit?: number;
    contactEvidence?: number;
    [key: string]: number | undefined;
  };
  total: number;
  semantics?: string;
};

export type DiscoveryOccurrence = {
  categoryIntent?: CategoryIntent;
  originalShopType?: string;
  shopType?: string;
  businessQualifier?: BusinessQualifier | string;
  query?: string;
  queryScore?: number | null;
  queryGenerationReason?: string;
  querySourceUrls?: string[];
  categoryVocabulary?: string[];
  rank?: number | null;
  resultUrl?: string;
  finalUrl?: string;
  resolvedDomain?: string;
  myshopifyDomain?: string;
};

export type RunProgress = {
  shopTypesTotal: number;
  shopTypesProcessed: number;
  blankShopTypesSkipped: number;
  invalidShopTypes: number;
  queryCandidatesGenerated: number;
  queryCandidatesValidated: number;
  queryCandidatesProbed: number;
  queriesSelected: number;
  planningWarnings: number;
  queriesTotal: number;
  queriesProcessed: number;
  storesDiscovered: number;
  storesQualified: number;
  storesRejected: number;
  failures: number;
  queryFailures: number;
  occurrenceFailures: number;
  storeProcessingFailures: number;
  outputRows: number;
};

export type RunStatus = {
  runId: string;
  state: RunState;
  phase: RunPhase | null;
  stage: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  progress: RunProgress;
  resultsAvailable: boolean;
  pipelineVersion: number | null;
  scoringVersion: number | null;
  queryReview: {
    revision: number;
    confirmedRevision: number | null;
    editable: boolean;
    queriesUrl: string;
    valid: boolean | null;
    invalidQueryCount: number | null;
  } | null;
  error: { code: string; message: string } | null;
};

export type StartRunResponse = {
  runId: string;
  state: "queued";
  phase: "query_planning";
  stage: "queued_query_planning";
  statusUrl: string;
  queriesUrl: string;
  resultsUrl: string;
  createdAt: string;
};

export type QueryCategory = {
  categoryIndex: number;
  originalShopType: string;
  shopType: string;
  businessQualifier: BusinessQualifier | string;
};

export type RunQuery = {
  id: string;
  categoryIndex: number;
  sequence: number;
  query: string;
  source: QuerySource;
  validationState: QueryValidationState;
  rejectionReason: string | null;
  queryScore: number | null;
  generationReason: string | null;
  probedAt: string | null;
};

export type QuerySet = {
  runId: string;
  revision: number;
  editable: boolean;
  categories: QueryCategory[];
  queries: RunQuery[];
};

export type StartScrapeResponse = {
  runId: string;
  state: "queued";
  phase: "scraping";
  stage: "queued_query_validation";
  revision: number;
};

export type RunIntentResponse = {
  intentId: string;
  expiresAt: string;
};

export type RunListResponse = {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  items: RunStatus[];
};

export type TrafficSourceState =
  | "available"
  | "partial"
  | "no_coverage"
  | "unavailable";

export type DataForSeoTrafficMetrics = {
  estimated_google_search_traffic: number;
  organic_estimated_traffic: number;
  organic_keyword_count: number;
  paid_estimated_traffic: number;
  paid_keyword_count: number;
  featured_snippet_estimated_traffic: number;
  featured_snippet_keyword_count: number;
  local_pack_estimated_traffic: number;
  local_pack_keyword_count: number;
};

export type DataForSeoMarketTraffic = DataForSeoTrafficMetrics & {
  country_code: "US" | "GB" | "CA" | "AU" | "NZ" | "DE" | "FR" | "IN" | "AE";
};

export type DataForSeoTraffic = {
  state: TrafficSourceState;
  label?: "Estimated Google search traffic";
  target?: string;
  worldwide?: DataForSeoTrafficMetrics;
  markets?: DataForSeoMarketTraffic[];
  observed_at?: string;
};

export type CruxOriginMetrics = {
  state: Exclude<TrafficSourceState, "partial">;
  origin?: string;
  metrics?: {
    largest_contentful_paint_p75_ms?: number;
    interaction_to_next_paint_p75_ms?: number;
    cumulative_layout_shift_p75?: string;
    first_contentful_paint_p75_ms?: number;
    time_to_first_byte_p75_ms?: number;
  };
  observed_form_factor_fractions?: {
    desktop: number;
    phone: number;
    tablet: number;
  };
  collection_period?: {
    first_date: string;
    last_date: string;
  };
  observed_at?: string;
};

export type CruxPopularity = {
  state: Exclude<TrafficSourceState, "partial">;
  origin?: string;
  label?: "Coarse CrUX navigation popularity rank";
  dataset_month?: string;
  popularity_rank?: number;
  popularity_band?: string;
  observed_device_fractions?: {
    phone: number;
    desktop: number;
    tablet: number;
  };
  observed_at?: string;
};

export type CruxTraffic = {
  state: TrafficSourceState;
  origin_metrics: CruxOriginMetrics;
  popularity: CruxPopularity;
};

export type TrafficAttribution = {
  source: "dataforseo" | "crux";
  name: string;
  text: string;
  source_url: string;
  license?: string;
  license_url?: string;
  transformation?: string;
};

export type TrafficEnrichment = {
  version: "traffic-enrichment-public-v1";
  dataforseo?: DataForSeoTraffic;
  crux?: CruxTraffic;
  traffic_sources?: Array<"dataforseo" | "crux">;
  traffic_attributions?: TrafficAttribution[];
};

export type Lead = {
  id: string;
  original_shop_type: string | null;
  shop_type: string | null;
  generated_query: string | null;
  query_score: number | null;
  query_generation_reason: string | null;
  search_query: string | null;
  google_rank: number | null;
  google_result_url: string | null;
  myshopify_domain: string | null;
  final_url: string | null;
  canonical_url: string | null;
  resolved_domain: string | null;
  store_name: string | null;
  email: string | null;
  email_source_url: string | null;
  phone: string | null;
  phone_source_url: string | null;
  contact_url: string | null;
  social_profiles: string[];
  additional_information: string | null;
  shopify_confidence: number | null;
  relevance_score: number | null;
  lead_score: number | null;
  status: LeadStatus;
  rejection_reason: string | null;
  error: string | null;
  business_qualifier: BusinessQualifier | string | null;
  pipeline_version: number | null;
  scoring_version: number | null;
  store_fit_state: StoreFitState | string | null;
  store_fit_evidence: StoreFitEvidence[] | null;
  contactability_tier: ContactabilityTier | string | null;
  contact_evidence: ContactEvidence | null;
  identity_confidence: number | null;
  identity_evidence: IdentityEvidence | null;
  score_breakdown: ScoreBreakdown | null;
  discovery_occurrences: DiscoveryOccurrence[] | null;
  matched_categories: CategoryIntent[] | null;
  score_semantics: ScoreSemantics;
  traffic_enrichment?: TrafficEnrichment;
};

export type ResultSummary = {
  total: number;
  qualified: number;
  rejected: number;
  failed: number;
};

export type ResultPage = {
  runId: string;
  summary: ResultSummary;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  items: Lead[];
};

export type QueryAudit = {
  sequence: number;
  shop_type: string | null;
  business_qualifier: BusinessQualifier | string | null;
  query: string | null;
  status: string;
  rejection_reason: string | null;
  details: JsonValue;
};

export type RunDiagnostic = {
  sequence: number;
  scope: string;
  code: string;
  shop_type: string | null;
  business_qualifier: BusinessQualifier | string | null;
  query: string | null;
  result_url: string | null;
  details: JsonValue;
};

export type CollectionPage<T> = {
  runId: string;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  items: T[];
};

export type QueryAuditPage = CollectionPage<QueryAudit>;
export type DiagnosticPage = CollectionPage<RunDiagnostic>;

export type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ResultFilters = {
  page: number;
  pageSize: number;
  status: LeadStatus | "";
  search: string;
  sortBy: "lead_score" | "store_name" | "shop_type" | "google_rank";
  sortDirection: "asc" | "desc";
};
