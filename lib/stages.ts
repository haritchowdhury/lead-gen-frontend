const STAGE_LABELS: Record<string, string> = {
  queued: "Waiting to start",
  queued_query_planning: "Waiting to plan queries",
  reading_categories: "Preparing categories",
  researching_category: "Researching categories",
  generating_candidates: "Generating search ideas",
  validating_candidates: "Validating search ideas",
  probing_queries: "Testing search coverage",
  selecting_queries: "Selecting the strongest queries",
  awaiting_query_confirmation: "Review your search queries",
  queued_query_validation: "Waiting to validate your queries",
  validating_confirmed_queries: "Checking your saved queries",
  probing_confirmed_queries: "Testing updated query coverage",
  discovering_stores: "Discovering Shopify stores",
  extracting_leads: "Finding contact details",
  writing_results: "Saving your results",
  completed: "Run completed",
  failed: "Run failed",
  cancelled: "Run cancelled",
};

const STAGE_ORDER = [
  "queued_query_planning",
  "reading_categories",
  "researching_category",
  "generating_candidates",
  "validating_candidates",
  "probing_queries",
  "selecting_queries",
  "awaiting_query_confirmation",
  "queued_query_validation",
  "validating_confirmed_queries",
  "probing_confirmed_queries",
  "discovering_stores",
  "extracting_leads",
  "writing_results",
  "completed",
];

export function stageLabel(stage: string): string {
  return STAGE_LABELS[stage] ?? "Processing your run";
}

export function stagePercent(stage: string, state: string): number {
  if (state === "completed") return 100;
  if (state === "failed" || state === "cancelled") return 100;
  if (stage === "queued") return 3;
  const index = STAGE_ORDER.indexOf(stage);
  if (index < 0) return 8;
  return Math.min(96, Math.round(((index + 1) / STAGE_ORDER.length) * 100));
}
