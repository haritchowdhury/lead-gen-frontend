export type RunState =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

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
export type ScoreSemantics = "legacy_v1" | "evidence_rank_v2";
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
  state?: StoreFitState | string;
  score?: number;
  matchedTerms?: string[];
  sourceUrls?: string[];
  reason?: string;
  evidence?: JsonValue[];
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
  shopType?: string;
  businessQualifier?: BusinessQualifier | string;
  query?: string;
  queryScore?: number | null;
  queryGenerationReason?: string;
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
  stage: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  progress: RunProgress;
  resultsAvailable: boolean;
  pipelineVersion: number | null;
  scoringVersion: number | null;
  error: { code: string; message: string } | null;
};

export type StartRunResponse = {
  runId: string;
  state: "queued";
  statusUrl: string;
  resultsUrl: string;
  createdAt: string;
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

export type Lead = {
  id: string;
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
