import type {
  ApiErrorPayload,
  CategoryIntent,
  CollectionPage,
  ContactEvidence,
  ContactPageDecision,
  DiagnosticPage,
  DiscoveryOccurrence,
  EvidenceItem,
  IdentityEvidence,
  JsonValue,
  Lead,
  QueryAudit,
  QueryAuditPage,
  QuerySet,
  ResultPage,
  RunDiagnostic,
  RunIntentResponse,
  RunListResponse,
  RunProgress,
  RunStatus,
  ScoreBreakdown,
  StartRunResponse,
  StartScrapeResponse,
  StoreFitEvidence,
  StoreFitPageEvidence,
} from "@/lib/api-types";

export class ApiPayloadError extends Error {
  constructor(path: string) {
    super(`The server returned invalid data at ${path}.`);
    this.name = "ApiPayloadError";
  }
}

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

function boolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") throw new ApiPayloadError(path);
  return value;
}

function nullableBoolean(value: unknown, path: string): boolean | null {
  if (value === null) return null;
  return boolean(value, path);
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

function optional<T>(
  source: UnknownRecord,
  key: string,
  path: string,
  parse: (value: unknown, path: string) => T,
): T | undefined {
  return source[key] === undefined ? undefined : parse(source[key], `${path}.${key}`);
}

function json(value: unknown, path: string): JsonValue {
  if (value === null || ["string", "boolean"].includes(typeof value)) {
    return value as string | boolean | null;
  }
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (Array.isArray(value)) {
    return value.map((item, index) => json(item, `${path}[${index}]`));
  }
  const source = record(value, path);
  return Object.fromEntries(
    Object.entries(source).map(([key, item]) => [key, json(item, `${path}.${key}`)]),
  );
}

function stringArray(value: unknown, path: string): string[] {
  return array(value, path, text);
}

function pagination(value: unknown, path: string) {
  const source = record(value, path);
  return {
    page: integer(source.page, `${path}.page`),
    pageSize: integer(source.pageSize, `${path}.pageSize`),
    totalItems: integer(source.totalItems, `${path}.totalItems`),
    totalPages: integer(source.totalPages, `${path}.totalPages`),
  };
}

function categoryIntent(value: unknown, path: string): CategoryIntent {
  const source = record(value, path);
  return {
    ...(optional(source, "originalShopType", path, text) === undefined
      ? {}
      : { originalShopType: optional(source, "originalShopType", path, text) }),
    shopType: text(source.shopType, `${path}.shopType`),
    businessQualifier: text(source.businessQualifier, `${path}.businessQualifier`),
    ...(optional(source, "categoryVocabulary", path, stringArray) === undefined
      ? {}
      : { categoryVocabulary: optional(source, "categoryVocabulary", path, stringArray) }),
  };
}

function contactDecision(value: unknown, path: string): ContactPageDecision {
  const source = record(value, path);
  return {
    accepted: boolean(source.accepted, `${path}.accepted`),
    routeAccepted: boolean(source.routeAccepted, `${path}.routeAccepted`),
    routeReason: text(source.routeReason, `${path}.routeReason`),
    sameStore: boolean(source.sameStore, `${path}.sameStore`),
    httpUsable: boolean(source.httpUsable, `${path}.httpUsable`),
    pageUsable: boolean(source.pageUsable, `${path}.pageUsable`),
    positiveSignals: stringArray(source.positiveSignals, `${path}.positiveSignals`),
    validationReason: text(source.validationReason, `${path}.validationReason`),
    sourceUrl: text(source.sourceUrl, `${path}.sourceUrl`),
  };
}

function evidenceItem(value: unknown, path: string): EvidenceItem {
  const source = record(value, path);
  const decision = optional(source, "decision", path, contactDecision);
  return {
    kind: text(source.kind, `${path}.kind`),
    value: text(source.value, `${path}.value`),
    sourceUrl: text(source.sourceUrl, `${path}.sourceUrl`),
    method: text(source.method, `${path}.method`),
    confidence: number(source.confidence, `${path}.confidence`),
    validationReason: text(source.validationReason, `${path}.validationReason`),
    ...(decision === undefined ? {} : { decision }),
  };
}

function contactEvidence(value: unknown, path: string): ContactEvidence {
  const source = record(value, path);
  const parsed: ContactEvidence = {};
  for (const key of [
    "emails",
    "phones",
    "contactPages",
    "socialProfiles",
    "organizationNames",
  ] as const) {
    const items = optional(source, key, path, (entry, itemPath) =>
      array(entry, itemPath, evidenceItem));
    if (items !== undefined) parsed[key] = items;
  }
  return parsed;
}

function storeFitPage(value: unknown, path: string): StoreFitPageEvidence {
  const source = record(value, path);
  return {
    sourceUrl: text(source.sourceUrl, `${path}.sourceUrl`),
    pageType: text(source.pageType, `${path}.pageType`),
    matchedTerms: stringArray(source.matchedTerms, `${path}.matchedTerms`),
    claimTerms: stringArray(source.claimTerms, `${path}.claimTerms`),
    signals: stringArray(source.signals, `${path}.signals`),
    breadthTerms: stringArray(source.breadthTerms, `${path}.breadthTerms`),
    negativeSignals: stringArray(source.negativeSignals, `${path}.negativeSignals`),
    strength: number(source.strength, `${path}.strength`),
    textLength: integer(source.textLength, `${path}.textLength`),
  };
}

function storeFitEvidence(value: unknown, path: string): StoreFitEvidence {
  const source = record(value, path);
  const intent = optional(source, "intent", path, categoryIntent);
  const accepted = optional(source, "accepted", path, boolean);
  const state = optional(source, "state", path, text);
  const score = optional(source, "score", path, number);
  const matchedTerms = optional(source, "matchedTerms", path, stringArray);
  const sourceUrls = optional(source, "sourceUrls", path, stringArray);
  const reason = optional(source, "reason", path, text);
  const signalKinds = optional(source, "signalKinds", path, stringArray);
  const breadthEvidence = optional(source, "breadthEvidence", path, (entry, itemPath) =>
    array(entry, itemPath, (item, breadthPath) => {
      const breadth = record(item, breadthPath);
      return {
        sourceUrl: text(breadth.sourceUrl, `${breadthPath}.sourceUrl`),
        signal: text(breadth.signal, `${breadthPath}.signal`),
        terms: stringArray(breadth.terms, `${breadthPath}.terms`),
      };
    }));
  const evidence = optional(source, "evidence", path, (entry, itemPath) =>
    array(entry, itemPath, storeFitPage));
  return {
    ...(intent === undefined ? {} : { intent }),
    ...(accepted === undefined ? {} : { accepted }),
    ...(state === undefined ? {} : { state }),
    ...(score === undefined ? {} : { score }),
    ...(matchedTerms === undefined ? {} : { matchedTerms }),
    ...(sourceUrls === undefined ? {} : { sourceUrls }),
    ...(reason === undefined ? {} : { reason }),
    ...(signalKinds === undefined ? {} : { signalKinds }),
    ...(breadthEvidence === undefined ? {} : { breadthEvidence }),
    ...(evidence === undefined ? {} : { evidence }),
  };
}

function identityEvidence(value: unknown, path: string): IdentityEvidence {
  const source = record(value, path);
  const canonicalValue = optional(source, "canonical", path, (entry, itemPath) => {
    const canonical = record(entry, itemPath);
    return {
      ...(optional(canonical, "url", itemPath, text) === undefined ? {} : { url: optional(canonical, "url", itemPath, text) }),
      ...(optional(canonical, "hostname", itemPath, text) === undefined ? {} : { hostname: optional(canonical, "hostname", itemPath, text) }),
      ...(optional(canonical, "trusted", itemPath, boolean) === undefined ? {} : { trusted: optional(canonical, "trusted", itemPath, boolean) }),
      ...(optional(canonical, "reason", itemPath, text) === undefined ? {} : { reason: optional(canonical, "reason", itemPath, text) }),
    };
  });
  return {
    ...(optional(source, "stableHostname", path, text) === undefined ? {} : { stableHostname: optional(source, "stableHostname", path, text) }),
    ...(optional(source, "displayHostname", path, text) === undefined ? {} : { displayHostname: optional(source, "displayHostname", path, text) }),
    ...(optional(source, "observedHostnames", path, stringArray) === undefined ? {} : { observedHostnames: optional(source, "observedHostnames", path, stringArray) }),
    ...(optional(source, "mergedOccurrenceCount", path, integer) === undefined ? {} : { mergedOccurrenceCount: optional(source, "mergedOccurrenceCount", path, integer) }),
    ...(canonicalValue === undefined ? {} : { canonical: canonicalValue }),
    ...(optional(source, "method", path, text) === undefined ? {} : { method: optional(source, "method", path, text) }),
    ...(optional(source, "confidence", path, number) === undefined ? {} : { confidence: optional(source, "confidence", path, number) }),
  };
}

function scoreBreakdown(value: unknown, path: string): ScoreBreakdown {
  const source = record(value, path);
  const rawComponents = record(source.components, `${path}.components`);
  const components = Object.fromEntries(
    Object.entries(rawComponents).map(([key, item]) => [key, number(item, `${path}.components.${key}`)]),
  );
  return {
    version: number(source.version, `${path}.version`),
    components,
    total: number(source.total, `${path}.total`),
    ...(optional(source, "semantics", path, text) === undefined ? {} : { semantics: optional(source, "semantics", path, text) }),
  };
}

const V2_SCORE_COMPONENTS = [
  "identity",
  "shopifyValidation",
  "categoryFit",
  "contactEvidence",
] as const;

export function assertLeadScoreState(
  lead: Pick<Lead,
    "status" | "pipeline_version" | "scoring_version" | "lead_score" |
    "score_breakdown" | "score_semantics">,
  path = "lead",
): void {
  const unversioned = lead.pipeline_version === null && lead.scoring_version === null;
  const v2 = lead.pipeline_version === 2 && lead.scoring_version === 2;
  if (!unversioned && !v2) throw new ApiPayloadError(`${path}.versions`);

  if (unversioned) {
    if (lead.score_semantics !== "legacy_v1") {
      throw new ApiPayloadError(`${path}.score_semantics`);
    }
    return;
  }

  if (lead.status !== "qualified") {
    if (
      lead.lead_score !== null ||
      lead.score_breakdown !== null ||
      lead.score_semantics !== "not_scored_v2"
    ) {
      throw new ApiPayloadError(`${path}.score_state`);
    }
    return;
  }

  if (
    lead.score_semantics !== "evidence_rank_v2" ||
    lead.lead_score === null ||
    !Number.isSafeInteger(lead.lead_score) ||
    lead.lead_score < 0 ||
    lead.lead_score > 100 ||
    lead.score_breakdown === null
  ) {
    throw new ApiPayloadError(`${path}.score_state`);
  }
  const breakdown = lead.score_breakdown;
  if (
    breakdown.version !== 2 ||
    breakdown.total !== lead.lead_score ||
    !Number.isSafeInteger(breakdown.total) ||
    breakdown.semantics !== "deterministic_evidence_rank_not_probability"
  ) {
    throw new ApiPayloadError(`${path}.score_breakdown`);
  }
  const keys = Object.keys(breakdown.components).sort();
  const expectedKeys = [...V2_SCORE_COMPONENTS].sort();
  if (
    keys.length !== expectedKeys.length ||
    keys.some((key, index) => key !== expectedKeys[index])
  ) {
    throw new ApiPayloadError(`${path}.score_breakdown.components`);
  }
  const components = V2_SCORE_COMPONENTS.map((key) => breakdown.components[key]);
  if (components.some((value) =>
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > 100
  )) {
    throw new ApiPayloadError(`${path}.score_breakdown.components`);
  }
  if ((components as number[]).reduce((sum, value) => sum + value, 0) !== breakdown.total) {
    throw new ApiPayloadError(`${path}.score_breakdown.components`);
  }
}

function occurrence(value: unknown, path: string): DiscoveryOccurrence {
  const source = record(value, path);
  const result: DiscoveryOccurrence = {};
  const parsers = {
    categoryIntent,
    originalShopType: text,
    shopType: text,
    businessQualifier: text,
    query: text,
    queryScore: nullableNumber,
    queryGenerationReason: text,
    querySourceUrls: stringArray,
    categoryVocabulary: stringArray,
    rank: nullableNumber,
    resultUrl: text,
    finalUrl: text,
    resolvedDomain: text,
    myshopifyDomain: text,
  } as const;
  for (const key of Object.keys(parsers) as Array<keyof typeof parsers>) {
    const parsed = optional(source, key, path, parsers[key] as (value: unknown, path: string) => never);
    if (parsed !== undefined) Object.assign(result, { [key]: parsed });
  }
  return result;
}

export function parseLead(value: unknown, path = "lead"): Lead {
  const source = record(value, path);
  const nullableTexts = [
    "original_shop_type", "shop_type", "generated_query", "query_generation_reason",
    "search_query", "google_result_url", "myshopify_domain", "final_url",
    "canonical_url", "resolved_domain", "store_name", "email", "email_source_url",
    "phone", "phone_source_url", "contact_url", "additional_information",
    "rejection_reason", "error", "business_qualifier", "store_fit_state",
    "contactability_tier",
  ] as const;
  const nullableNumbers = [
    "query_score", "google_rank", "shopify_confidence", "relevance_score",
    "lead_score", "pipeline_version", "scoring_version", "identity_confidence",
  ] as const;
  const result = {
    id: text(source.id, `${path}.id`),
    social_profiles: stringArray(source.social_profiles, `${path}.social_profiles`),
    status: oneOf(source.status, ["qualified", "rejected", "failed"], `${path}.status`),
    store_fit_evidence: source.store_fit_evidence === null ? null : array(source.store_fit_evidence, `${path}.store_fit_evidence`, storeFitEvidence),
    contact_evidence: source.contact_evidence === null ? null : contactEvidence(source.contact_evidence, `${path}.contact_evidence`),
    identity_evidence: source.identity_evidence === null ? null : identityEvidence(source.identity_evidence, `${path}.identity_evidence`),
    score_breakdown: source.score_breakdown === null ? null : scoreBreakdown(source.score_breakdown, `${path}.score_breakdown`),
    discovery_occurrences: source.discovery_occurrences === null ? null : array(source.discovery_occurrences, `${path}.discovery_occurrences`, occurrence),
    matched_categories: source.matched_categories === null ? null : array(source.matched_categories, `${path}.matched_categories`, categoryIntent),
    score_semantics: oneOf(source.score_semantics, ["legacy_v1", "not_scored_v2", "evidence_rank_v2"], `${path}.score_semantics`),
  } as Omit<Lead, (typeof nullableTexts)[number] | (typeof nullableNumbers)[number]> & Partial<Lead>;
  for (const key of nullableTexts) result[key] = nullableText(source[key], `${path}.${key}`);
  for (const key of nullableNumbers) result[key] = nullableNumber(source[key], `${path}.${key}`);
  const lead = result as Lead;
  assertLeadScoreState(lead, path);
  return lead;
}

const PROGRESS_KEYS: Array<keyof RunProgress> = [
  "shopTypesTotal", "shopTypesProcessed", "blankShopTypesSkipped", "invalidShopTypes",
  "queryCandidatesGenerated", "queryCandidatesValidated", "queryCandidatesProbed",
  "queriesSelected", "planningWarnings", "queriesTotal", "queriesProcessed",
  "storesDiscovered", "storesQualified", "storesRejected", "failures", "queryFailures",
  "occurrenceFailures", "storeProcessingFailures", "outputRows",
];

function runProgress(value: unknown, path: string): RunProgress {
  const source = record(value, path);
  return Object.fromEntries(PROGRESS_KEYS.map((key) => [key, integer(source[key], `${path}.${key}`)])) as RunProgress;
}

export function parseRunStatus(value: unknown, path = "run"): RunStatus {
  const source = record(value, path);
  const rawError = source.error;
  let error: RunStatus["error"] = null;
  if (rawError !== null) {
    const parsed = record(rawError, `${path}.error`);
    error = {
      code: text(parsed.code, `${path}.error.code`),
      message: text(parsed.message, `${path}.error.message`),
    };
  }
  let queryReview: RunStatus["queryReview"] = null;
  if (source.queryReview !== null) {
    const review = record(source.queryReview, `${path}.queryReview`);
    queryReview = {
      revision: integer(review.revision, `${path}.queryReview.revision`),
      confirmedRevision: nullableNumber(
        review.confirmedRevision,
        `${path}.queryReview.confirmedRevision`,
      ),
      editable: boolean(review.editable, `${path}.queryReview.editable`),
      queriesUrl: text(review.queriesUrl, `${path}.queryReview.queriesUrl`),
      valid: nullableBoolean(review.valid, `${path}.queryReview.valid`),
      invalidQueryCount: nullableNumber(
        review.invalidQueryCount,
        `${path}.queryReview.invalidQueryCount`,
      ),
    };
  }
  return {
    runId: text(source.runId, `${path}.runId`),
    state: oneOf(source.state, ["queued", "running", "awaiting_query_confirmation", "completed", "failed", "cancelled"], `${path}.state`),
    phase: source.phase === null
      ? null
      : oneOf(
          source.phase,
          ["query_planning", "query_review", "scraping", "finished"] as const,
          `${path}.phase`,
        ),
    stage: text(source.stage, `${path}.stage`),
    createdAt: text(source.createdAt, `${path}.createdAt`),
    startedAt: nullableText(source.startedAt, `${path}.startedAt`),
    completedAt: nullableText(source.completedAt, `${path}.completedAt`),
    progress: runProgress(source.progress, `${path}.progress`),
    resultsAvailable: boolean(source.resultsAvailable, `${path}.resultsAvailable`),
    pipelineVersion: nullableNumber(source.pipelineVersion, `${path}.pipelineVersion`),
    scoringVersion: nullableNumber(source.scoringVersion, `${path}.scoringVersion`),
    queryReview,
    error,
  };
}

export function parseStartRunResponse(value: unknown): StartRunResponse {
  const source = record(value, "startRun");
  return {
    runId: text(source.runId, "startRun.runId"),
    state: oneOf(source.state, ["queued"], "startRun.state"),
    phase: oneOf(source.phase, ["query_planning"], "startRun.phase"),
    stage: oneOf(source.stage, ["queued_query_planning"], "startRun.stage"),
    statusUrl: text(source.statusUrl, "startRun.statusUrl"),
    queriesUrl: text(source.queriesUrl, "startRun.queriesUrl"),
    resultsUrl: text(source.resultsUrl, "startRun.resultsUrl"),
    createdAt: text(source.createdAt, "startRun.createdAt"),
  };
}

export function parseQuerySet(value: unknown): QuerySet {
  const source = record(value, "querySet");
  return {
    runId: text(source.runId, "querySet.runId"),
    revision: integer(source.revision, "querySet.revision"),
    editable: boolean(source.editable, "querySet.editable"),
    categories: array(source.categories, "querySet.categories", (item, path) => {
      const category = record(item, path);
      return {
        categoryIndex: integer(category.categoryIndex, `${path}.categoryIndex`),
        originalShopType: text(category.originalShopType, `${path}.originalShopType`),
        shopType: text(category.shopType, `${path}.shopType`),
        businessQualifier: text(category.businessQualifier, `${path}.businessQualifier`),
      };
    }),
    queries: array(source.queries, "querySet.queries", (item, path) => {
      const query = record(item, path);
      return {
        id: text(query.id, `${path}.id`),
        categoryIndex: integer(query.categoryIndex, `${path}.categoryIndex`),
        sequence: integer(query.sequence, `${path}.sequence`),
        query: text(query.query, `${path}.query`),
        source: oneOf(query.source, ["generated", "user_added", "user_edited"], `${path}.source`),
        validationState: oneOf(query.validationState, ["pending", "valid", "invalid"], `${path}.validationState`),
        rejectionReason: nullableText(query.rejectionReason, `${path}.rejectionReason`),
        queryScore: nullableNumber(query.queryScore, `${path}.queryScore`),
        generationReason: nullableText(query.generationReason, `${path}.generationReason`),
        probedAt: nullableText(query.probedAt, `${path}.probedAt`),
      };
    }),
  };
}

export function parseStartScrapeResponse(value: unknown): StartScrapeResponse {
  const source = record(value, "startScrape");
  return {
    runId: text(source.runId, "startScrape.runId"),
    state: oneOf(source.state, ["queued"], "startScrape.state"),
    phase: oneOf(source.phase, ["scraping"], "startScrape.phase"),
    stage: oneOf(source.stage, ["queued_query_validation"], "startScrape.stage"),
    revision: integer(source.revision, "startScrape.revision"),
  };
}

export function parseRunIntentResponse(value: unknown): RunIntentResponse {
  const source = record(value, "runIntent");
  return {
    intentId: text(source.intentId, "runIntent.intentId"),
    expiresAt: text(source.expiresAt, "runIntent.expiresAt"),
  };
}

export function parseRunListResponse(value: unknown): RunListResponse {
  const source = record(value, "runs");
  return {
    pagination: pagination(source.pagination, "runs.pagination"),
    items: array(source.items, "runs.items", parseRunStatus),
  };
}

export function parseResultPage(value: unknown): ResultPage {
  const source = record(value, "results");
  const summary = record(source.summary, "results.summary");
  return {
    runId: text(source.runId, "results.runId"),
    summary: {
      total: integer(summary.total, "results.summary.total"),
      qualified: integer(summary.qualified, "results.summary.qualified"),
      rejected: integer(summary.rejected, "results.summary.rejected"),
      failed: integer(summary.failed, "results.summary.failed"),
    },
    pagination: pagination(source.pagination, "results.pagination"),
    items: array(source.items, "results.items", parseLead),
  };
}

function queryAudit(value: unknown, path: string): QueryAudit {
  const source = record(value, path);
  return {
    sequence: integer(source.sequence, `${path}.sequence`),
    shop_type: nullableText(source.shop_type, `${path}.shop_type`),
    business_qualifier: nullableText(source.business_qualifier, `${path}.business_qualifier`),
    query: nullableText(source.query, `${path}.query`),
    status: text(source.status, `${path}.status`),
    rejection_reason: nullableText(source.rejection_reason, `${path}.rejection_reason`),
    details: json(source.details, `${path}.details`),
  };
}

function diagnostic(value: unknown, path: string): RunDiagnostic {
  const source = record(value, path);
  return {
    sequence: integer(source.sequence, `${path}.sequence`),
    scope: text(source.scope, `${path}.scope`),
    code: text(source.code, `${path}.code`),
    shop_type: nullableText(source.shop_type, `${path}.shop_type`),
    business_qualifier: nullableText(source.business_qualifier, `${path}.business_qualifier`),
    query: nullableText(source.query, `${path}.query`),
    result_url: nullableText(source.result_url, `${path}.result_url`),
    details: json(source.details, `${path}.details`),
  };
}

function collectionPage<T>(
  value: unknown,
  name: string,
  parseItem: (value: unknown, path: string) => T,
): CollectionPage<T> {
  const source = record(value, name);
  return {
    runId: text(source.runId, `${name}.runId`),
    pagination: pagination(source.pagination, `${name}.pagination`),
    items: array(source.items, `${name}.items`, parseItem),
  };
}

export function parseQueryAuditPage(value: unknown): QueryAuditPage {
  return collectionPage(value, "queryAudits", queryAudit);
}

export function parseDiagnosticPage(value: unknown): DiagnosticPage {
  return collectionPage(value, "diagnostics", diagnostic);
}

export function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  try {
    const source = record(value, "errorPayload");
    const error = record(source.error, "errorPayload.error");
    text(error.code, "errorPayload.error.code");
    text(error.message, "errorPayload.error.message");
    return true;
  } catch {
    return false;
  }
}
