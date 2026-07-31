export type RunState =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type LeadStatus = "qualified" | "rejected" | "failed";

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
  error: { code: string; message: string } | null;
};

export type StartRunResponse = {
  runId: string;
  state: "queued";
  statusUrl: string;
  resultsUrl: string;
  createdAt: string;
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

