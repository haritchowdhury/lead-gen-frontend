import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  KeywordResearchHistoryPayloadError,
  parseKeywordResearchHistoryResponse,
} from "../lib/keyword-research-history.ts";

const root = new URL("../", import.meta.url);
const historySource = readFileSync(new URL("components/run-history.tsx", root), "utf8");
const routeSource = readFileSync(new URL("app/api/keyword-research/route.ts", root), "utf8");
const pageSource = readFileSync(new URL("app/runs/page.tsx", root), "utf8");
const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");
const REQUIRED = ["MRR-FE-01", "MRR-FE-02", "MRR-FE-03", "MRR-FE-04", "MRR-FE-05", "MRR-FE-06"];
const executed: string[] = [];

function fixture() {
  return {
    pagination: { page: 1, pageSize: 20, totalItems: 2, totalPages: 1 },
    items: [
      {
        researchId: "kr_abcdefghijklmnopqrstuvwx",
        seeds: ["independent eyewear", "acetate frames", "optical boutiques"],
        state: "running",
        stage: "anchor_screen",
        selectionRevision: 0,
        createdAt: "2026-08-26T12:00:00.000Z",
        updatedAt: "2026-08-26T12:05:00.000Z",
        completedAt: null,
      },
      {
        researchId: "kr_zyxwvutsrqponmlkjihgfedc",
        seeds: ["running shoes"],
        state: "completed",
        stage: "completed",
        selectionRevision: 1,
        createdAt: "2026-08-25T12:00:00.000Z",
        updatedAt: "2026-08-25T12:10:00.000Z",
        completedAt: "2026-08-25T12:10:00.000Z",
      },
    ],
  } as const;
}

function register(id: string) {
  assert.ok(REQUIRED.includes(id));
  assert.ok(!executed.includes(id));
  executed.push(id);
}

test("MRR-FE-01 exact research payload and two-section surface", () => {
  assert.deepEqual(parseKeywordResearchHistoryResponse(fixture()), fixture());
  assert.match(pageSource, /<h1>My searches<\/h1>/u);
  assert.match(historySource, />Keyword research<\/h2>/u);
  assert.match(historySource, />Discovery runs<\/h2>/u);
  assert.match(cssSource, /\.research-history-row\s*\{/u);
  register("MRR-FE-01");
});

test("MRR-FE-02 research navigation is a fixed local dashboard route", () => {
  assert.match(historySource, /href=\{`\/keywords\/\$\{encodeURIComponent\(research\.researchId\)\}`\}/u);
  assert.doesNotMatch(historySource, /research\.(?:url|href|destination)/u);
  register("MRR-FE-02");
});

test("MRR-FE-03 discovery-run route and row rendering remain present", () => {
  assert.match(historySource, /href=\{`\/runs\/\$\{encodeURIComponent\(run\.runId\)\}`\}/u);
  for (const witness of ["categoryTitle(run)", "Stores found", "trafficProgressState(run)"]) {
    assert.ok(historySource.includes(witness), witness);
  }
  register("MRR-FE-03");
});

test("MRR-FE-04 fetch failures and effects are independent", () => {
  assert.equal((historySource.match(/useEffect\(\(\) =>/gu) ?? []).length, 2);
  for (const witness of [
    "researchData", "researchError", "setResearchData", "setResearchError",
    "runData", "runError", "setRunData", "setRunError",
  ]) assert.ok(historySource.includes(witness), witness);
  assert.doesNotMatch(historySource, /Promise\.all/u);
  register("MRR-FE-04");
});

test("MRR-FE-05 pagination and empty policy are independent", () => {
  for (const witness of [
    "researchPage", "runPage", "changeResearchPage", "changeRunPage",
    "researchData.pagination.totalItems === 0", "runData.pagination.totalItems === 0",
  ]) assert.ok(historySource.includes(witness), witness);
  assert.match(historySource, /No searches yet/u);
  register("MRR-FE-05");
});

test("MRR-FE-06 parser and BFF reject unknown, malformed and inconsistent data", () => {
  const mutations: Array<(value: ReturnType<typeof fixture>) => void> = [
    (value) => { (value as unknown as Record<string, unknown>).extra = true; },
    (value) => { (value.pagination as { totalPages: number }).totalPages = 2; },
    (value) => { (value.items[0] as { researchId: string }).researchId = "bad"; },
    (value) => { (value.items[0] as { seeds: string[] }).seeds = []; },
    (value) => { (value.items[0] as { state: string }).state = "cancelled"; },
    (value) => { (value.items[0] as { createdAt: string }).createdAt = "not-a-date"; },
  ];
  for (const mutate of mutations) {
    const value = structuredClone(fixture());
    mutate(value);
    assert.throws(() => parseKeywordResearchHistoryResponse(value), KeywordResearchHistoryPayloadError);
  }
  assert.match(routeSource, /export async function GET/u);
  assert.match(routeSource, /export async function POST/u);
  assert.match(routeSource, /unknown\.length \|\| duplicates\.length/u);
  assert.match(routeSource, /timeoutMs: 10_000/u);
  register("MRR-FE-06");
});

test("MRR-W2 frontend unit certificate", () => {
  assert.deepEqual([...executed].sort(), [...REQUIRED].sort());
  assert.equal(new Set(executed).size, REQUIRED.length);
  const digest = createHash("sha256")
    .update([...executed].sort().map((id) => `${id}\n`).join(""))
    .digest("hex");
  assert.equal(digest, "00d8ddc04ba5d46c5f0949eb3005b0a6f424bbe383f590f4b2f1de624672a4ff");
});
