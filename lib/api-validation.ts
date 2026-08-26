import type {
  ApiErrorPayload,
  CategoryIntent,
  CollectionPage,
  ContactEvidence,
  ContactPageDecision,
  CruxOriginMetrics,
  CruxPopularity,
  CruxTraffic,
  DataForSeoMarketTraffic,
  DataForSeoTraffic,
  DataForSeoTrafficMetrics,
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
  MasterLeadPage,
  MasterLead,
  RunDiagnostic,
  RunIntentResponse,
  RunListResponse,
  RunProgress,
  RunStatus,
  ScoreBreakdown,
  SearchContinuationResponse,
  StartRunResponse,
  StartScrapeResponse,
  StoreFitEvidence,
  StoreFitPageEvidence,
  TrafficAttribution,
  TrafficEnrichment,
  TrafficOverview,
  TrafficSourceState,
} from "@/lib/api-types";
import {
  parseResearchView,
  validKeywordResearchId,
} from "./keyword-intelligence-validation.ts";

const CONTINUATION_RUN_ID_PATTERN = /^run_[A-Za-z0-9_-]{16,80}$/u;

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

function exactKeys(source: UnknownRecord, expected: readonly string[], path: string): void {
  const actual = Object.keys(source).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new ApiPayloadError(path);
  }
}

function trafficPointsV3(value: number, path: string): number {
  if (!Number.isFinite(value) || value < 0) throw new ApiPayloadError(path);
  return value >= 100_000 ? 40 : Math.min(40, Math.round(8 * Math.log10(value + 1)));
}

function cruxRatingV3(metric: "lcp" | "inp" | "cls", value: number, path: string) {
  if (!Number.isFinite(value) || value < 0) throw new ApiPayloadError(path);
  const [good, poor] = {
    lcp: [2500, 4000],
    inp: [200, 500],
    cls: [0.1, 0.25],
  }[metric];
  return value <= good ? "good" : value <= poor ? "needs_improvement" : "poor";
}

function v3Evidence(value: unknown, path: string): NonNullable<ScoreBreakdown["evidence"]> {
  const source = record(value, path);
  exactKeys(source, ["traffic", "crux"], path);
  const traffic = record(source.traffic, `${path}.traffic`);
  exactKeys(traffic, [
    "state", "metric", "value", "transform", "sourceContractVersion", "observedAt",
  ], `${path}.traffic`);
  const trafficValue = nonNegativeNumber(traffic.value, `${path}.traffic.value`);
  if (
    traffic.state !== "measured" ||
    traffic.metric !== "estimated_google_search_traffic" ||
    traffic.transform !== "log10_v1" ||
    traffic.sourceContractVersion !== "dataforseo-traffic-v1"
  ) throw new ApiPayloadError(`${path}.traffic`);
  const trafficObservedAt = isoTimestamp(traffic.observedAt, `${path}.traffic.observedAt`);
  if (new Date(trafficObservedAt).toISOString() !== trafficObservedAt) {
    throw new ApiPayloadError(`${path}.traffic.observedAt`);
  }
  const parsedTraffic = {
    state: "measured" as const,
    metric: "estimated_google_search_traffic" as const,
    value: trafficValue,
    transform: "log10_v1" as const,
    sourceContractVersion: "dataforseo-traffic-v1" as const,
    observedAt: trafficObservedAt,
  };

  const crux = record(source.crux, `${path}.crux`);
  const cruxState = oneOf(
    crux.state,
    ["available", "partial", "no_coverage", "unavailable", "disabled"] as const,
    `${path}.crux.state`,
  );
  if (["disabled", "no_coverage", "unavailable"].includes(cruxState)) {
    exactKeys(crux, ["state"], `${path}.crux`);
    return { traffic: parsedTraffic, crux: { state: cruxState as "disabled" | "no_coverage" | "unavailable" } };
  }
  const metricDefinitions = [
    ["lcp", "largestContentfulPaintP75Ms"],
    ["inp", "interactionToNextPaintP75Ms"],
    ["cls", "cumulativeLayoutShiftP75"],
  ] as const;
  const present = metricDefinitions.filter(([, key]) => crux[key] !== undefined);
  exactKeys(crux, [
    "state", "ratings", "sourceContractVersion", "observedAt", ...present.map(([, key]) => key),
  ], `${path}.crux`);
  if (present.length === 0 || (cruxState === "available") !== (present.length === 3) ||
      crux.sourceContractVersion !== "crux-origin-metrics-v1") {
    throw new ApiPayloadError(`${path}.crux`);
  }
  const ratingsSource = record(crux.ratings, `${path}.crux.ratings`);
  exactKeys(ratingsSource, present.map(([metric]) => metric), `${path}.crux.ratings`);
  const ratings: Partial<Record<"lcp" | "inp" | "cls", "good" | "needs_improvement" | "poor">> = {};
  const parsedMetrics: {
    largestContentfulPaintP75Ms?: number;
    interactionToNextPaintP75Ms?: number;
    cumulativeLayoutShiftP75?: string;
  } = {};
  for (const [metric, key] of present) {
    const numeric = metric === "cls"
      ? Number(decimalString(crux[key], `${path}.crux.${key}`))
      : nonNegativeNumber(crux[key], `${path}.crux.${key}`);
    const rating = cruxRatingV3(metric, numeric, `${path}.crux.${key}`);
    if (ratingsSource[metric] !== rating) throw new ApiPayloadError(`${path}.crux.ratings.${metric}`);
    ratings[metric] = rating;
    if (metric === "cls") parsedMetrics.cumulativeLayoutShiftP75 = crux[key] as string;
    if (metric === "lcp") parsedMetrics.largestContentfulPaintP75Ms = numeric;
    if (metric === "inp") parsedMetrics.interactionToNextPaintP75Ms = numeric;
  }
  const cruxObservedAt = isoTimestamp(crux.observedAt, `${path}.crux.observedAt`);
  if (new Date(cruxObservedAt).toISOString() !== cruxObservedAt) {
    throw new ApiPayloadError(`${path}.crux.observedAt`);
  }
  return {
    traffic: parsedTraffic,
    crux: {
      state: cruxState,
      ...parsedMetrics,
      ratings,
      sourceContractVersion: "crux-origin-metrics-v1",
      observedAt: cruxObservedAt,
    },
  };
}

function scoreBreakdown(value: unknown, path: string): ScoreBreakdown {
  const source = record(value, path);
  const version = integer(source.version, `${path}.version`);
  exactKeys(
    source,
    version === 3
      ? ["version", "components", "total", "semantics", "evidence"]
      : ["version", "components", "total", "semantics"],
    path,
  );
  const rawComponents = record(source.components, `${path}.components`);
  const components = Object.fromEntries(
    Object.entries(rawComponents).map(([key, item]) => [key, number(item, `${path}.components.${key}`)]),
  );
  const evidence = source.evidence === undefined ? undefined : v3Evidence(source.evidence, `${path}.evidence`);
  return {
    version,
    components,
    total: integer(source.total, `${path}.total`),
    ...(optional(source, "semantics", path, text) === undefined ? {} : { semantics: optional(source, "semantics", path, text) }),
    ...(evidence === undefined ? {} : { evidence }),
  };
}

const V2_SCORE_COMPONENTS = [
  "identity",
  "shopifyValidation",
  "categoryFit",
  "contactEvidence",
] as const;
const V3_SCORE_COMPONENT_MAXIMA = {
  identity: 11,
  shopifyValidation: 14,
  categoryFit: 16,
  contactEvidence: 14,
  traffic: 40,
  crux: 5,
} as const;

export function assertLeadScoreState(
  lead: Pick<Lead,
    "status" | "pipeline_version" | "scoring_version" | "lead_score" |
    "score_breakdown" | "score_semantics">,
  path = "lead",
): void {
  const unversioned = lead.pipeline_version === null && lead.scoring_version === null;
  const v2 = lead.pipeline_version === 2 && lead.scoring_version === 2;
  const v3 = lead.pipeline_version === 2 && lead.scoring_version === 3;
  if (!unversioned && !v2 && !v3) throw new ApiPayloadError(`${path}.versions`);

  if (unversioned) {
    if (lead.score_semantics !== "legacy_v1") {
      throw new ApiPayloadError(`${path}.score_semantics`);
    }
    return;
  }

  if (v2 && lead.status !== "qualified") {
    if (
      lead.lead_score !== null ||
      lead.score_breakdown !== null ||
      lead.score_semantics !== "not_scored_v2"
    ) {
      throw new ApiPayloadError(`${path}.score_state`);
    }
    return;
  }

  if (v2 && (
    lead.score_semantics !== "evidence_rank_v2" ||
    lead.lead_score === null ||
    !Number.isSafeInteger(lead.lead_score) ||
    lead.lead_score < 0 ||
    lead.lead_score > 100 ||
    lead.score_breakdown === null
  )) {
    throw new ApiPayloadError(`${path}.score_state`);
  }
  if (v3) {
    if (lead.status !== "qualified") {
      if (lead.lead_score !== null || lead.score_breakdown !== null ||
          lead.score_semantics !== "not_scored_v3") {
        throw new ApiPayloadError(`${path}.score_state`);
      }
      return;
    }
    if (lead.lead_score === null || lead.score_breakdown === null) {
      if (lead.lead_score !== null || lead.score_breakdown !== null ||
          lead.score_semantics !== "insufficient_traffic_v3") {
        throw new ApiPayloadError(`${path}.score_state`);
      }
      return;
    }
    if (lead.score_semantics !== "traffic_evidence_rank_v3" ||
        !Number.isSafeInteger(lead.lead_score) || lead.lead_score < 0 || lead.lead_score > 100) {
      throw new ApiPayloadError(`${path}.score_state`);
    }
    const breakdown = lead.score_breakdown;
    if (breakdown.version !== 3 || breakdown.total !== lead.lead_score ||
        breakdown.semantics !== "deterministic_traffic_evidence_rank_not_probability" ||
        !breakdown.evidence) throw new ApiPayloadError(`${path}.score_breakdown`);
    const keys = Object.keys(breakdown.components).sort();
    const expectedKeys = Object.keys(V3_SCORE_COMPONENT_MAXIMA).sort();
    if (keys.length !== expectedKeys.length || keys.some((key, index) => key !== expectedKeys[index])) {
      throw new ApiPayloadError(`${path}.score_breakdown.components`);
    }
    const componentTotal = Object.entries(V3_SCORE_COMPONENT_MAXIMA).reduce((sum, [key, maximum]) => {
      const component = breakdown.components[key];
      if (!Number.isSafeInteger(component) || (component as number) < 0 || (component as number) > maximum) {
        throw new ApiPayloadError(`${path}.score_breakdown.components.${key}`);
      }
      return sum + (component as number);
    }, 0);
    if (componentTotal !== breakdown.total ||
        breakdown.components.traffic !== trafficPointsV3(
          breakdown.evidence.traffic.value,
          `${path}.score_breakdown.evidence.traffic.value`,
        )) throw new ApiPayloadError(`${path}.score_breakdown`);
    const crux = breakdown.evidence.crux;
    let rawCruxPoints = 0;
    if (crux.state === "available" || crux.state === "partial") {
      for (const [metric, key, maximum] of [
        ["lcp", "largestContentfulPaintP75Ms", 2],
        ["inp", "interactionToNextPaintP75Ms", 2],
        ["cls", "cumulativeLayoutShiftP75", 1],
      ] as const) {
        if (crux[key] === undefined) continue;
        const rating = crux.ratings[metric];
        rawCruxPoints += rating === "good" ? maximum : rating === "needs_improvement" ? maximum / 2 : 0;
      }
    }
    if (breakdown.components.crux !== Math.round(rawCruxPoints)) {
      throw new ApiPayloadError(`${path}.score_breakdown.components.crux`);
    }
    return;
  }

  if (!v2 || lead.score_breakdown === null || lead.lead_score === null) {
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

const TRAFFIC_STATES = ["available", "partial", "no_coverage", "unavailable"] as const;
const CRUX_COMPONENT_STATES = ["available", "no_coverage", "unavailable"] as const;
const TRAFFIC_SOURCES = ["dataforseo", "crux"] as const;
const DATAFORSEO_COUNTRIES = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"] as const;

function nonNegativeNumber(value: unknown, path: string): number {
  const parsed = number(value, path);
  if (parsed < 0) throw new ApiPayloadError(path);
  return parsed;
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

function fraction(value: unknown, path: string): number {
  const parsed = number(value, path);
  if (parsed < 0 || parsed > 1) throw new ApiPayloadError(path);
  return parsed;
}

function decimalString(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(parsed)) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function nonEmptyText(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!parsed.trim()) throw new ApiPayloadError(path);
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

function isoDate(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(parsed)) throw new ApiPayloadError(path);
  const date = new Date(`${parsed}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== parsed) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function httpsUrl(value: unknown, path: string): string {
  const parsed = text(value, path);
  let url: URL;
  try {
    url = new URL(parsed);
  } catch {
    throw new ApiPayloadError(path);
  }
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function canonicalDataForSeoHostname(value: unknown, path: string): string {
  const parsed = text(value, path);
  if (parsed !== parsed.trim() || !/^[\x00-\x7F]+$/u.test(parsed) ||
      /(?:^|\.)xn--/iu.test(parsed) || /^www\./iu.test(parsed) ||
      /[:\/@?#\\]/u.test(parsed)) {
    throw new ApiPayloadError(path);
  }
  const hostname = parsed.toLowerCase().replace(/\.$/u, "");
  const labels = hostname.split(".");
  if (hostname !== parsed || hostname.length > 253 || !hostname.includes(".") ||
      /^\d+(?:\.\d+){3}$/u.test(hostname) ||
      labels.some((label) => !label || label.length > 63 ||
        !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/u.test(label))) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function canonicalCruxOrigin(value: unknown, path: string): string {
  const parsed = httpsUrl(value, path);
  if (!/^[\x00-\x7F]+$/u.test(parsed)) throw new ApiPayloadError(path);
  const url = new URL(parsed);
  if (url.pathname !== "/" || url.search || url.hash || url.origin !== parsed ||
      /(?:^|\.)xn--/iu.test(url.hostname)) {
    throw new ApiPayloadError(path);
  }
  return parsed;
}

function dataForSeoMetrics(value: unknown, path: string): DataForSeoTrafficMetrics {
  const source = record(value, path);
  const result = {
    estimated_google_search_traffic: nonNegativeNumber(source.estimated_google_search_traffic, `${path}.estimated_google_search_traffic`),
    organic_estimated_traffic: nonNegativeNumber(source.organic_estimated_traffic, `${path}.organic_estimated_traffic`),
    organic_keyword_count: nonNegativeInteger(source.organic_keyword_count, `${path}.organic_keyword_count`),
    paid_estimated_traffic: nonNegativeNumber(source.paid_estimated_traffic, `${path}.paid_estimated_traffic`),
    paid_keyword_count: nonNegativeInteger(source.paid_keyword_count, `${path}.paid_keyword_count`),
    featured_snippet_estimated_traffic: nonNegativeNumber(source.featured_snippet_estimated_traffic, `${path}.featured_snippet_estimated_traffic`),
    featured_snippet_keyword_count: nonNegativeInteger(source.featured_snippet_keyword_count, `${path}.featured_snippet_keyword_count`),
    local_pack_estimated_traffic: nonNegativeNumber(source.local_pack_estimated_traffic, `${path}.local_pack_estimated_traffic`),
    local_pack_keyword_count: nonNegativeInteger(source.local_pack_keyword_count, `${path}.local_pack_keyword_count`),
  };
  if (result.estimated_google_search_traffic !==
      result.organic_estimated_traffic + result.paid_estimated_traffic) {
    throw new ApiPayloadError(`${path}.estimated_google_search_traffic`);
  }
  return result;
}

function dataForSeoTraffic(value: unknown, path: string): DataForSeoTraffic {
  const source = record(value, path);
  const state = oneOf(source.state, TRAFFIC_STATES, `${path}.state`);
  if (state === "no_coverage" || state === "unavailable") return { state };
  const label = oneOf(
    source.label,
    ["Estimated Google search traffic"] as const,
    `${path}.label`,
  );
  const worldwide = optional(source, "worldwide", path, dataForSeoMetrics);
  const markets = array(source.markets, `${path}.markets`, (market, marketPath) => {
    const marketSource = record(market, marketPath);
    return {
      country_code: oneOf(marketSource.country_code, DATAFORSEO_COUNTRIES, `${marketPath}.country_code`),
      ...dataForSeoMetrics(marketSource, marketPath),
    } as DataForSeoMarketTraffic;
  });
  const positions = markets.map(({ country_code }) => DATAFORSEO_COUNTRIES.indexOf(country_code));
  if (new Set(positions).size !== positions.length ||
      positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    throw new ApiPayloadError(`${path}.markets`);
  }
  if (!worldwide && !markets.length) throw new ApiPayloadError(path);
  if ((state === "available") !== (worldwide !== undefined && markets.length === 9)) {
    throw new ApiPayloadError(`${path}.state`);
  }
  return {
    state,
    label,
    ...(optional(source, "target", path, canonicalDataForSeoHostname) === undefined
      ? {}
      : { target: optional(source, "target", path, canonicalDataForSeoHostname) }),
    ...(worldwide ? { worldwide } : {}),
    markets,
    ...(optional(source, "observed_at", path, isoTimestamp) === undefined
      ? {}
      : { observed_at: optional(source, "observed_at", path, isoTimestamp) }),
  };
}

function deviceFractions(
  value: unknown,
  path: string,
): { desktop: number; phone: number; tablet: number } {
  const source = record(value, path);
  const result = {
    desktop: fraction(source.desktop, `${path}.desktop`),
    phone: fraction(source.phone, `${path}.phone`),
    tablet: fraction(source.tablet, `${path}.tablet`),
  };
  if (Math.abs(result.desktop + result.phone + result.tablet - 1) > 0.010000001) {
    throw new ApiPayloadError(path);
  }
  return result;
}

function cruxOriginMetrics(value: unknown, path: string): CruxOriginMetrics {
  const source = record(value, path);
  const state = oneOf(source.state, CRUX_COMPONENT_STATES, `${path}.state`);
  if (state !== "available") return { state };
  const rawMetrics = record(source.metrics, `${path}.metrics`);
  const metrics = {
    ...(optional(rawMetrics, "largest_contentful_paint_p75_ms", `${path}.metrics`, nonNegativeNumber) === undefined ? {} : {
      largest_contentful_paint_p75_ms: optional(rawMetrics, "largest_contentful_paint_p75_ms", `${path}.metrics`, nonNegativeNumber),
    }),
    ...(optional(rawMetrics, "interaction_to_next_paint_p75_ms", `${path}.metrics`, nonNegativeNumber) === undefined ? {} : {
      interaction_to_next_paint_p75_ms: optional(rawMetrics, "interaction_to_next_paint_p75_ms", `${path}.metrics`, nonNegativeNumber),
    }),
    ...(optional(rawMetrics, "cumulative_layout_shift_p75", `${path}.metrics`, decimalString) === undefined ? {} : {
      cumulative_layout_shift_p75: optional(rawMetrics, "cumulative_layout_shift_p75", `${path}.metrics`, decimalString),
    }),
    ...(optional(rawMetrics, "first_contentful_paint_p75_ms", `${path}.metrics`, nonNegativeNumber) === undefined ? {} : {
      first_contentful_paint_p75_ms: optional(rawMetrics, "first_contentful_paint_p75_ms", `${path}.metrics`, nonNegativeNumber),
    }),
    ...(optional(rawMetrics, "time_to_first_byte_p75_ms", `${path}.metrics`, nonNegativeNumber) === undefined ? {} : {
      time_to_first_byte_p75_ms: optional(rawMetrics, "time_to_first_byte_p75_ms", `${path}.metrics`, nonNegativeNumber),
    }),
  };
  const period = record(source.collection_period, `${path}.collection_period`);
  const formFactors = optional(
    source,
    "observed_form_factor_fractions",
    path,
    deviceFractions,
  );
  const firstDate = isoDate(period.first_date, `${path}.collection_period.first_date`);
  const lastDate = isoDate(period.last_date, `${path}.collection_period.last_date`);
  if (firstDate > lastDate) throw new ApiPayloadError(`${path}.collection_period`);
  if (Object.keys(metrics).length === 0 && formFactors === undefined) {
    throw new ApiPayloadError(path);
  }
  return {
    state,
    origin: canonicalCruxOrigin(source.origin, `${path}.origin`),
    metrics,
    ...(formFactors ? { observed_form_factor_fractions: formFactors } : {}),
    collection_period: {
      first_date: firstDate,
      last_date: lastDate,
    },
    observed_at: isoTimestamp(source.observed_at, `${path}.observed_at`),
  };
}

function cruxPopularity(value: unknown, path: string): CruxPopularity {
  const source = record(value, path);
  const state = oneOf(source.state, CRUX_COMPONENT_STATES, `${path}.state`);
  if (state !== "available") return { state };
  const datasetMonth = text(source.dataset_month, `${path}.dataset_month`);
  if (!/^20\d{2}(?:0[1-9]|1[0-2])$/u.test(datasetMonth)) {
    throw new ApiPayloadError(`${path}.dataset_month`);
  }
  const popularityRank = positiveInteger(source.popularity_rank, `${path}.popularity_rank`);
  const popularityBand = text(source.popularity_band, `${path}.popularity_band`);
  if (popularityBand !== `top_${popularityRank}`) {
    throw new ApiPayloadError(`${path}.popularity_band`);
  }
  return {
    state,
    origin: canonicalCruxOrigin(source.origin, `${path}.origin`),
    label: oneOf(
      source.label,
      ["Coarse CrUX navigation popularity rank"] as const,
      `${path}.label`,
    ),
    dataset_month: datasetMonth,
    popularity_rank: popularityRank,
    popularity_band: popularityBand,
    observed_device_fractions: deviceFractions(
      source.observed_device_fractions,
      `${path}.observed_device_fractions`,
    ),
    observed_at: isoTimestamp(source.observed_at, `${path}.observed_at`),
  };
}

function cruxTraffic(value: unknown, path: string): CruxTraffic {
  const source = record(value, path);
  const state = oneOf(source.state, TRAFFIC_STATES, `${path}.state`);
  const originMetrics = cruxOriginMetrics(source.origin_metrics, `${path}.origin_metrics`);
  const popularity = cruxPopularity(source.popularity, `${path}.popularity`);
  const originMaterial = originMetrics.state === "available" &&
    (Boolean(Object.keys(originMetrics.metrics ?? {}).length) ||
      originMetrics.observed_form_factor_fractions !== undefined);
  const popularityMaterial = popularity.state === "available";
  const expectedState: TrafficSourceState = originMaterial && popularityMaterial
    ? "available"
    : originMaterial || popularityMaterial
      ? "partial"
      : originMetrics.state === "no_coverage" && popularity.state === "no_coverage"
        ? "no_coverage"
        : "unavailable";
  if (state !== expectedState) throw new ApiPayloadError(`${path}.state`);
  if (originMaterial && popularityMaterial && originMetrics.origin !== popularity.origin) {
    throw new ApiPayloadError(`${path}.origin`);
  }
  return { state, origin_metrics: originMetrics, popularity };
}

function trafficAttribution(value: unknown, path: string): TrafficAttribution {
  const source = record(value, path);
  return {
    source: oneOf(source.source, TRAFFIC_SOURCES, `${path}.source`),
    name: nonEmptyText(source.name, `${path}.name`),
    text: nonEmptyText(source.text, `${path}.text`),
    source_url: httpsUrl(source.source_url, `${path}.source_url`),
    ...(optional(source, "license", path, text) === undefined
      ? {}
      : { license: optional(source, "license", path, text) }),
    ...(optional(source, "license_url", path, httpsUrl) === undefined
      ? {}
      : { license_url: optional(source, "license_url", path, httpsUrl) }),
    ...(optional(source, "transformation", path, text) === undefined
      ? {}
      : { transformation: optional(source, "transformation", path, text) }),
  };
}

function trafficEnrichment(value: unknown, path: string): TrafficEnrichment {
  const source = record(value, path);
  const version = oneOf(
    source.version,
    ["traffic-enrichment-public-v1"] as const,
    `${path}.version`,
  );
  const dataforseo = optional(source, "dataforseo", path, dataForSeoTraffic);
  const crux = optional(source, "crux", path, cruxTraffic);
  if (!dataforseo && !crux) throw new ApiPayloadError(path);

  const expectedSources: Array<"dataforseo" | "crux"> = [];
  if (dataforseo && ["available", "partial"].includes(dataforseo.state) &&
      (dataforseo.worldwide || dataforseo.markets?.length)) {
    expectedSources.push("dataforseo");
  }
  if (crux && (crux.origin_metrics.state === "available" &&
      (Object.keys(crux.origin_metrics.metrics ?? {}).length > 0 ||
        crux.origin_metrics.observed_form_factor_fractions !== undefined) ||
      crux.popularity.state === "available")) {
    expectedSources.push("crux");
  }

  const rawSources = optional(source, "traffic_sources", path, (item, itemPath) =>
    array(item, itemPath, (entry, entryPath) => oneOf(entry, TRAFFIC_SOURCES, entryPath)));
  const attributions = optional(
    source,
    "traffic_attributions",
    path,
    (item, itemPath) => array(item, itemPath, trafficAttribution),
  );
  if (expectedSources.length) {
    if (!rawSources || !attributions || rawSources.length !== expectedSources.length ||
        attributions.length !== expectedSources.length ||
        rawSources.some((item, index) => item !== expectedSources[index]) ||
        attributions.some((item, index) => item.source !== expectedSources[index])) {
      throw new ApiPayloadError(`${path}.traffic_sources`);
    }
    const cruxAttribution = attributions.find(({ source: attributionSource }) =>
      attributionSource === "crux");
    if (cruxAttribution &&
        (!cruxAttribution.license || !cruxAttribution.license_url ||
          !cruxAttribution.transformation)) {
      throw new ApiPayloadError(`${path}.traffic_attributions`);
    }
  } else if (rawSources !== undefined || attributions !== undefined) {
    throw new ApiPayloadError(`${path}.traffic_sources`);
  }
  return {
    version,
    ...(dataforseo ? { dataforseo } : {}),
    ...(crux ? { crux } : {}),
    ...(rawSources ? { traffic_sources: rawSources } : {}),
    ...(attributions ? { traffic_attributions: attributions } : {}),
  };
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
    score_semantics: oneOf(source.score_semantics, [
      "legacy_v1", "not_scored_v2", "evidence_rank_v2",
      "insufficient_traffic_v3", "not_scored_v3", "traffic_evidence_rank_v3",
    ], `${path}.score_semantics`),
  } as Omit<Lead, (typeof nullableTexts)[number] | (typeof nullableNumbers)[number]> & Partial<Lead>;
  for (const key of nullableTexts) result[key] = nullableText(source[key], `${path}.${key}`);
  for (const key of nullableNumbers) result[key] = nullableNumber(source[key], `${path}.${key}`);
  const parsedTraffic = optional(source, "traffic_enrichment", path, trafficEnrichment);
  if (parsedTraffic) result.traffic_enrichment = parsedTraffic;
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
  const categories = optional(
    source,
    "categories",
    path,
    (items, categoriesPath) => array(items, categoriesPath, categoryIntent),
  ) ?? [];
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
    categories,
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
  const runId = text(source.runId, "startRun.runId");
  if (!CONTINUATION_RUN_ID_PATTERN.test(runId)) {
    throw new ApiPayloadError("startRun.runId");
  }
  return {
    runId,
    state: oneOf(source.state, ["queued"], "startRun.state"),
    phase: oneOf(source.phase, ["query_planning"], "startRun.phase"),
    stage: oneOf(source.stage, ["queued_query_planning"], "startRun.stage"),
    statusUrl: text(source.statusUrl, "startRun.statusUrl"),
    queriesUrl: text(source.queriesUrl, "startRun.queriesUrl"),
    resultsUrl: text(source.resultsUrl, "startRun.resultsUrl"),
    createdAt: text(source.createdAt, "startRun.createdAt"),
  };
}

export function parseSearchContinuationResponse(
  value: unknown,
): SearchContinuationResponse {
  const source = record(value, "searchContinuation");
  const kind = oneOf(
    source.kind,
    ["legacy_run", "keyword_research"] as const,
    "searchContinuation.kind",
  );

  if (kind === "legacy_run") {
    exactKeys(source, ["kind", "run"], "searchContinuation");
    const run = record(source.run, "searchContinuation.run");
    exactKeys(
      run,
      [
        "runId",
        "state",
        "phase",
        "stage",
        "statusUrl",
        "queriesUrl",
        "resultsUrl",
        "createdAt",
      ],
      "searchContinuation.run",
    );
    const parsedRun = parseStartRunResponse(source.run);
    if (!CONTINUATION_RUN_ID_PATTERN.test(parsedRun.runId)) {
      throw new ApiPayloadError("searchContinuation.run.runId");
    }
    return { kind, run: parsedRun };
  }

  exactKeys(source, ["kind", "research"], "searchContinuation");
  const research = parseResearchView(source.research);
  if (!validKeywordResearchId(research.id)) {
    throw new ApiPayloadError("searchContinuation.research.id");
  }
  return { kind, research };
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

export function parseMasterLeadPage(value: unknown): MasterLeadPage {
  const source = record(value, "masterLeads");
  return {
    pagination: pagination(source.pagination, "masterLeads.pagination"),
    items: array(source.items, "masterLeads.items", (value, path) => {
      const raw = record(value, path);
      const lead = parseLead(raw, path);
      const master = record(raw.master, `${path}.master`);
      return {
        ...lead,
        master: {
          shop_id: text(master.shop_id, `${path}.master.shop_id`),
          first_discovered_at: isoTimestamp(master.first_discovered_at, `${path}.master.first_discovered_at`),
          last_discovered_at: isoTimestamp(master.last_discovered_at, `${path}.master.last_discovered_at`),
          discovery_count: nonNegativeInteger(master.discovery_count, `${path}.master.discovery_count`),
          lifecycle_status: nullableText(master.lifecycle_status, `${path}.master.lifecycle_status`),
          notes: nullableText(master.notes, `${path}.master.notes`),
          tags: stringArray(master.tags, `${path}.master.tags`),
          archived: boolean(master.archived, `${path}.master.archived`),
          profile_updated_at: master.profile_updated_at === null
            ? null
            : isoTimestamp(master.profile_updated_at, `${path}.master.profile_updated_at`),
          runs: array(master.runs, `${path}.master.runs`, (entry, runPath) => {
            const run = record(entry, runPath);
            const href = text(run.href, `${runPath}.href`);
            if (!/^\/runs\/run_[A-Za-z0-9_-]{16,80}$/u.test(href)) throw new ApiPayloadError(`${runPath}.href`);
            return { href, discovered_at: isoTimestamp(run.discovered_at, `${runPath}.discovered_at`) };
          }),
          discovery_queries: stringArray(master.discovery_queries, `${path}.master.discovery_queries`),
        },
      } satisfies MasterLead;
    }),
  };
}

export function parseTrafficOverview(value: unknown): TrafficOverview {
  const source = record(value, "trafficOverview");
  const scope = record(source.scope, "trafficOverview.scope");
  const search = nullableText(scope.search, "trafficOverview.scope.search");
  if (search !== null && (!search.length || search.length > 200 || search !== search.trim())) {
    throw new ApiPayloadError("trafficOverview.scope.search");
  }
  const matchedLeads = nonNegativeInteger(
    scope.matchedLeads,
    "trafficOverview.scope.matchedLeads",
  );
  const leadsWithTraffic = nonNegativeInteger(
    scope.leadsWithTraffic,
    "trafficOverview.scope.leadsWithTraffic",
  );
  if (leadsWithTraffic > matchedLeads) {
    throw new ApiPayloadError("trafficOverview.scope.leadsWithTraffic");
  }
  const worldwide = optional(source, "worldwide", "trafficOverview", dataForSeoMetrics);
  const parseMarkets = (value: unknown, path: string): DataForSeoMarketTraffic[] => array(value, path, (market, marketPath) => {
    const marketSource = record(market, marketPath);
    return {
      country_code: oneOf(
        marketSource.country_code,
        DATAFORSEO_COUNTRIES,
        `${marketPath}.country_code`,
      ),
      ...dataForSeoMetrics(marketSource, marketPath),
    } as DataForSeoMarketTraffic;
  });
  const markets = parseMarkets(source.markets, "trafficOverview.markets");
  const positions = markets.map(({ country_code }) => DATAFORSEO_COUNTRIES.indexOf(country_code));
  if (new Set(positions).size !== positions.length ||
      positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    throw new ApiPayloadError("trafficOverview.markets");
  }
  const hasMaterial = worldwide !== undefined || markets.length > 0;
  if (hasMaterial !== (leadsWithTraffic > 0)) {
    throw new ApiPayloadError("trafficOverview.scope.leadsWithTraffic");
  }
  return {
    version: oneOf(source.version, ["traffic-overview-v1"] as const, "trafficOverview.version"),
    runId: text(source.runId, "trafficOverview.runId"),
    scope: { search, matchedLeads, leadsWithTraffic },
    ...(worldwide ? { worldwide } : {}),
    markets,
    queries: source.queries === undefined ? [] : array(source.queries, "trafficOverview.queries", (query, queryPath) => {
      const querySource = record(query, queryPath);
      const queryText = nullableText(querySource.query, `${queryPath}.query`);
      if (queryText !== null && (!queryText.trim() || queryText !== queryText.trim())) {
        throw new ApiPayloadError(`${queryPath}.query`);
      }
      const shopsFound = nonNegativeInteger(querySource.shopsFound, `${queryPath}.shopsFound`);
      const queryLeadsWithTraffic = nonNegativeInteger(querySource.leadsWithTraffic, `${queryPath}.leadsWithTraffic`);
      if (queryLeadsWithTraffic > shopsFound) throw new ApiPayloadError(`${queryPath}.leadsWithTraffic`);
      const queryWorldwide = optional(querySource, "worldwide", queryPath, dataForSeoMetrics);
      const queryMarkets = parseMarkets(querySource.markets, `${queryPath}.markets`);
      const queryPositions = queryMarkets.map(({ country_code }) => DATAFORSEO_COUNTRIES.indexOf(country_code));
      if (new Set(queryPositions).size !== queryPositions.length ||
          queryPositions.some((position, index) => index > 0 && position <= queryPositions[index - 1])) {
        throw new ApiPayloadError(`${queryPath}.markets`);
      }
      const queryHasMaterial = queryWorldwide !== undefined || queryMarkets.length > 0;
      if (queryHasMaterial !== (queryLeadsWithTraffic > 0)) throw new ApiPayloadError(`${queryPath}.leadsWithTraffic`);
      return {
        query: queryText,
        shopsFound,
        leadsWithTraffic: queryLeadsWithTraffic,
        ...(queryWorldwide ? { worldwide: queryWorldwide } : {}),
        markets: queryMarkets,
      };
    }),
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

// Keyword intelligence parsers (KI-W5; additive only).
export {
  CLIENT_REQUEST_ID_PATTERN,
  KEYWORD_RESEARCH_ID_PATTERN,
  newClientRequestId,
  parseResearchEnvelope,
  parseResearchView,
  parseRunHandoffEnvelope,
  validKeywordResearchId,
  validateSeedsInput,
} from "./keyword-intelligence-validation.ts";
