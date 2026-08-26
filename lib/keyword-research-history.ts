export type KeywordResearchHistoryState = "queued" | "running" | "completed" | "failed";
export type KeywordResearchHistoryStage =
  | "queued"
  | "expansion"
  | "anchor_screen"
  | "market_overview"
  | "finalizing"
  | "completed"
  | "failed";

export type KeywordResearchHistoryItem = {
  researchId: string;
  seeds: string[];
  state: KeywordResearchHistoryState;
  stage: KeywordResearchHistoryStage;
  selectionRevision: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type KeywordResearchHistoryResponse = {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  items: KeywordResearchHistoryItem[];
};

const RESEARCH_ID = /^kr_[A-Za-z0-9_-]{24}$/u;
const STATES = new Set<KeywordResearchHistoryState>(["queued", "running", "completed", "failed"]);
const STAGES = new Set<KeywordResearchHistoryStage>([
  "queued", "expansion", "anchor_screen", "market_overview", "finalizing", "completed", "failed",
]);

export class KeywordResearchHistoryPayloadError extends Error {
  constructor(path: string) {
    super(`Invalid keyword-research history payload at ${path}`);
    this.name = "KeywordResearchHistoryPayloadError";
  }
}

type RecordValue = Record<string, unknown>;

function record(value: unknown, path: string): RecordValue {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new KeywordResearchHistoryPayloadError(path);
  }
  return value as RecordValue;
}

function exactKeys(value: RecordValue, keys: readonly string[], path: string) {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new KeywordResearchHistoryPayloadError(path);
  }
}

function safeInteger(value: unknown, path: string, minimum = 0): number {
  if (!Number.isSafeInteger(value) || (value as number) < minimum) {
    throw new KeywordResearchHistoryPayloadError(path);
  }
  return value as number;
}

function isoTimestamp(value: unknown, path: string): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value)) {
    throw new KeywordResearchHistoryPayloadError(path);
  }
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) throw new KeywordResearchHistoryPayloadError(path);
  return value;
}

function parseItem(value: unknown, path: string): KeywordResearchHistoryItem {
  const source = record(value, path);
  exactKeys(source, [
    "researchId", "seeds", "state", "stage", "selectionRevision",
    "createdAt", "updatedAt", "completedAt",
  ], path);
  if (typeof source.researchId !== "string" || !RESEARCH_ID.test(source.researchId)) {
    throw new KeywordResearchHistoryPayloadError(`${path}.researchId`);
  }
  if (!Array.isArray(source.seeds) || source.seeds.length < 1 || source.seeds.length > 5) {
    throw new KeywordResearchHistoryPayloadError(`${path}.seeds`);
  }
  const seeds = source.seeds.map((seed, index) => {
    if (typeof seed !== "string") throw new KeywordResearchHistoryPayloadError(`${path}.seeds[${index}]`);
    const normalized = seed.normalize("NFKC").replace(/\s+/gu, " ").trim();
    if (normalized !== seed || [...seed].length < 1 || [...seed].length > 100) {
      throw new KeywordResearchHistoryPayloadError(`${path}.seeds[${index}]`);
    }
    return seed;
  });
  if (typeof source.state !== "string" || !STATES.has(source.state as KeywordResearchHistoryState)) {
    throw new KeywordResearchHistoryPayloadError(`${path}.state`);
  }
  if (typeof source.stage !== "string" || !STAGES.has(source.stage as KeywordResearchHistoryStage)) {
    throw new KeywordResearchHistoryPayloadError(`${path}.stage`);
  }
  const completedAt = source.completedAt === null
    ? null
    : isoTimestamp(source.completedAt, `${path}.completedAt`);
  return {
    researchId: source.researchId,
    seeds,
    state: source.state as KeywordResearchHistoryState,
    stage: source.stage as KeywordResearchHistoryStage,
    selectionRevision: safeInteger(source.selectionRevision, `${path}.selectionRevision`),
    createdAt: isoTimestamp(source.createdAt, `${path}.createdAt`),
    updatedAt: isoTimestamp(source.updatedAt, `${path}.updatedAt`),
    completedAt,
  };
}

export function parseKeywordResearchHistoryResponse(value: unknown): KeywordResearchHistoryResponse {
  const source = record(value, "history");
  exactKeys(source, ["pagination", "items"], "history");
  const pagination = record(source.pagination, "history.pagination");
  exactKeys(pagination, ["page", "pageSize", "totalItems", "totalPages"], "history.pagination");
  const page = safeInteger(pagination.page, "history.pagination.page", 1);
  const pageSize = safeInteger(pagination.pageSize, "history.pagination.pageSize", 1);
  if (pageSize > 100) throw new KeywordResearchHistoryPayloadError("history.pagination.pageSize");
  const totalItems = safeInteger(pagination.totalItems, "history.pagination.totalItems");
  const totalPages = safeInteger(pagination.totalPages, "history.pagination.totalPages");
  if (totalPages !== Math.ceil(totalItems / pageSize)) {
    throw new KeywordResearchHistoryPayloadError("history.pagination.totalPages");
  }
  if (!Array.isArray(source.items) || source.items.length > pageSize) {
    throw new KeywordResearchHistoryPayloadError("history.items");
  }
  return {
    pagination: { page, pageSize, totalItems, totalPages },
    items: source.items.map((item, index) => parseItem(item, `history.items[${index}]`)),
  };
}
