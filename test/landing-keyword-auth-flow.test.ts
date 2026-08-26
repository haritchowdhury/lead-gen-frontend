import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  ApiPayloadError,
  parseResearchEnvelope,
  parseSearchContinuationResponse,
  parseStartRunResponse,
} from "../lib/api-validation.ts";
import { parseKeywordSeedText, validateSeedsInput } from "../lib/keyword-intelligence-validation.ts";
import {
  PENDING_INTENT_ID_PATTERN,
  PENDING_KEYWORD_RESEARCH_INTENT_COOKIE,
  PENDING_RUN_INTENT_COOKIE,
  pendingIntentCookieOptions,
  pendingIntentMaxAge,
} from "../lib/pending-search-intent.ts";

const source = (relativePath: string): string =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const fixture = JSON.parse(readFileSync(
  new URL("../../email_scraper/test/fixtures/keyword-intelligence/landing-keyword-auth-intent-v1.json", import.meta.url),
  "utf8",
));

const FRONTEND_CASE_IDS = [
  "LKAI-FE-01", "LKAI-FE-02", "LKAI-FE-03", "LKAI-FE-04", "LKAI-FE-05",
  "LKAI-FE-06", "LKAI-FE-07", "LKAI-FE-08", "LKAI-FE-09", "LKAI-FE-10",
] as const;
const CONTROL_IDS = ["LKAI-NC-04", "LKAI-NC-05", "LKAI-NC-06", "LKAI-NC-07"] as const;
const executedCases = new Set<string>();
const executedControls = new Set<string>();
const activate = (caseId: typeof FRONTEND_CASE_IDS[number]): void => {
  assert(!executedCases.has(caseId), `duplicate activation ${caseId}`);
  executedCases.add(caseId);
};
const falsify = (controlId: typeof CONTROL_IDS[number]): void => {
  assert(!executedControls.has(controlId), `duplicate control ${controlId}`);
  executedControls.add(controlId);
};
const digest = (members: readonly string[]): string => createHash("sha256")
  .update(Buffer.concat([...members].sort().map((member) => Buffer.from(`${member}\n`, "utf8"))))
  .digest("hex");

const startRun = {
  runId: "run_aaaaaaaaaaaaaaaaaaaaaaaa",
  state: "queued",
  phase: "query_planning",
  stage: "queued_query_planning",
  statusUrl: "/api/runs/run_aaaaaaaaaaaaaaaaaaaaaaaa",
  queriesUrl: "/api/runs/run_aaaaaaaaaaaaaaaaaaaaaaaa/queries",
  resultsUrl: "/api/runs/run_aaaaaaaaaaaaaaaaaaaaaaaa/results",
  createdAt: "2026-08-26T12:00:00.000Z",
};
const research = fixture.valid.claimCreatedResponse.research;

function assertLandingKeywordLineage(form: string): void {
  assert.match(form, /parseKeywordSeedText\(input\)/u);
  assert.match(form, /validateSeedsInput\(\{ seeds \}\)/u);
  assert.match(form, /createKeywordResearch\(validation\.seeds\)/u);
  assert.match(form, /`\/keywords\/\$\{encodeURIComponent\(view\.id\)\}`/u);
  assert.doesNotMatch(form, /apiRequest<StartRunResponse>|JSON\.stringify\(\{ shopTypes:|"\/api\/runs"/u);
}

function assertOppositeCookieCleared(route: string, selected: "keyword" | "run"): void {
  const opposite = selected === "keyword"
    ? "PENDING_RUN_INTENT_COOKIE"
    : "PENDING_KEYWORD_RESEARCH_INTENT_COOKIE";
  assert.match(route, new RegExp(`cookieStore\\.delete\\(${opposite}\\)`, "u"));
}

function assertProtectedLandingShape(page: string, form: string, hero: string): void {
  assert.match(page, /className="hero landing-hero"/u);
  assert.match(hero, /const target = reviewing \? "#query-review" : "#start-discovery"/u);
  assert.match(hero, /href=\{target\}/u);
  assert.match(form, /<form id="start-discovery" className="run-form-card run-start-form ds-card"/u);
  assert.equal((form.match(/className="suggestion-chip"/gu) ?? []).length, 1);
  for (const suggestion of [
    "Clothing", "Eyewear", "Home decor", "Pet supplies", "Skincare",
    "Jewelry", "Fitness", "Baby products", "Kitchenware",
  ]) assert.match(form, new RegExp(`"${suggestion}"`, "u"));
}

test("LKAI-FE-01 signed-in landing uses keyword creation and fixed keyword navigation", () => {
  const form = source("components/run-form.tsx");
  const keywordRoute = source("app/api/keyword-research/route.ts");
  assertLandingKeywordLineage(form);
  assert.match(keywordRoute, /if \(userId\)[\s\S]*path: "\/api\/keyword-research"/u);
  assert.match(keywordRoute, /body: normalizedBody/u);
  activate("LKAI-FE-01");
});

test("LKAI-FE-02 parser and validator enforce the landing seed boundaries", () => {
  assert.deepEqual(
    parseKeywordSeedText("  Independent   Eyewear  \nindependent eyewear,Ｓｋｉｎｃａｒｅ"),
    ["Independent Eyewear", "Skincare"],
  );
  assert.equal(validateSeedsInput({ seeds: [] }).ok, false);
  assert.equal(validateSeedsInput({ seeds: ["one", "two", "three", "four", "five", "six"] }).ok, false);
  assert.equal(validateSeedsInput({ seeds: ["😀".repeat(100)] }).ok, true);
  assert.equal(validateSeedsInput({ seeds: ["😀".repeat(101)] }).ok, false);
  activate("LKAI-FE-02");
});

test("LKAI-FE-03 anonymous keyword BFF stores only a strict pending intent", () => {
  const route = source("app/api/keyword-research/route.ts");
  assert.match(route, /path: "\/api\/keyword-research-intents"/u);
  assert.match(route, /if \(userId\)[\s\S]*return proxyBackend/u);
  assert.match(route, /cookieStore\.set\([\s\S]*PENDING_KEYWORD_RESEARCH_INTENT_COOKIE/u);
  assert.match(route, /Create an account or sign in to continue this keyword research\./u);
  assert.doesNotMatch(route, /dispatch|worker|provider|keyword\.initialize/u);
  assert.equal(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE, "storesignal_pending_keyword_research_intent");
  assert(PENDING_INTENT_ID_PATTERN.test(fixture.valid.createResponse.intentId));
  activate("LKAI-FE-03");
});

test("LKAI-FE-04 authenticated continuation selects keyword claim and fixed navigation", () => {
  const route = source("app/api/run-intents/claim/route.ts");
  const component = source("components/run-continuation.tsx");
  assert.match(route, /const selected = validKeywordIntent[\s\S]*kind: "keyword_research"/u);
  assert.match(route, /`\/api\/keyword-research-intents\/\$\{encodeURIComponent\(validKeywordIntent\)\}\/claim`/u);
  assert.match(component, /continuation\.kind === "keyword_research"/u);
  assert.match(component, /`\/keywords\/\$\{encodeURIComponent\(continuation\.research\.id\)\}`/u);
  assert.doesNotMatch(component, /destination|continueUrl/u);
  assert.throws(
    () => parseResearchEnvelope({ research: { ...research, id: "arbitrary-research" } }),
    ApiPayloadError,
  );
  assert.throws(() => parseStartRunResponse({ ...startRun, runId: "arbitrary-run" }), ApiPayloadError);
  const researchParseIndex = route.indexOf("parseResearchEnvelope(payload)");
  const runParseIndex = route.indexOf("parseStartRunResponse(payload)");
  const successDeletionIndex = route.lastIndexOf("cookieStore.delete(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE)");
  assert(
    researchParseIndex >= 0 && runParseIndex >= 0 &&
      successDeletionIndex > Math.max(researchParseIndex, runParseIndex),
    "claim BFF deletes cookies before strict ID parsing",
  );
  activate("LKAI-FE-04");
});

test("LKAI-FE-05 non-404 claim failures retain the cookie for same-owner retry", () => {
  const route = source("app/api/run-intents/claim/route.ts");
  assert.match(route, /if \(!response\.ok\) \{[\s\S]*if \(response\.status === 404\) cookieStore\.delete\(selected\.cookie\);[\s\S]*return response;/u);
  const failureBlock = route.slice(
    route.indexOf("if (!response.ok)"),
    route.indexOf("if (response.status !== 200"),
  );
  assert.equal((failureBlock.match(/cookieStore\.delete\(selected\.cookie\)/gu) ?? []).length, 1);
  assert.match(failureBlock, /if \(response\.status === 404\) cookieStore\.delete\(selected\.cookie\)/u);
  activate("LKAI-FE-05");
});

test("LKAI-FE-06 legacy pending run remains a strict continuation branch", () => {
  const route = source("app/api/run-intents/claim/route.ts");
  const component = source("components/run-continuation.tsx");
  assert.match(route, /kind: "legacy_run" as const/u);
  assert.match(route, /`\/api\/run-intents\/\$\{encodeURIComponent\(validRunIntent\)\}\/claim`/u);
  assert.match(component, /`\/runs\/\$\{encodeURIComponent\(continuation\.run\.runId\)\}`/u);
  activate("LKAI-FE-06");
});

test("LKAI-FE-07 cookie helpers and both creation routes enforce exclusivity", () => {
  const keywordRoute = source("app/api/keyword-research/route.ts");
  const runsRoute = source("app/api/runs/route.ts");
  const cookieHelpers = source("lib/pending-search-intent.ts");
  assertOppositeCookieCleared(keywordRoute, "keyword");
  assertOppositeCookieCleared(runsRoute, "run");
  assert.equal(PENDING_RUN_INTENT_COOKIE, "storesignal_pending_run_intent");
  assert.match(cookieHelpers, /secure: process\.env\.NODE_ENV === "production"/u);
  const options = pendingIntentCookieOptions(60);
  assert.deepEqual(options, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60,
  });
  activate("LKAI-FE-07");
});

test("LKAI-FE-08 malformed, expired, missing, and backend-404 intents fail closed", () => {
  assert.equal(pendingIntentMaxAge("not-a-date", 1_000), null);
  assert.equal(pendingIntentMaxAge("1970-01-01T00:00:01.000Z", 1_000), null);
  assert.equal(pendingIntentMaxAge("1970-01-01T00:00:01.001Z", 1_000), 1);
  assert.equal(pendingIntentMaxAge("1970-01-01T01:00:02.000Z", 1_000), 3_600);
  const route = source("app/api/run-intents/claim/route.ts");
  const component = source("components/run-continuation.tsx");
  assert.match(route, /keywordIntentCookie\?\.value/u);
  assert.match(route, /runIntentCookie\?\.value/u);
  assert.match(route, /keywordIntentCookie !== undefined && !validKeywordIntent[\s\S]*delete\(PENDING_KEYWORD_RESEARCH_INTENT_COOKIE\)/u);
  assert.match(route, /runIntentCookie !== undefined && !validRunIntent[\s\S]*delete\(PENDING_RUN_INTENT_COOKIE\)/u);
  assert.match(route, /response\.status === 404\) cookieStore\.delete\(selected\.cookie\)/u);
  assert.match(component, /"KEYWORD_RESEARCH_INTENT_NOT_FOUND"/u);
  assert.match(component, /router\.replace\("\/"\)/u);
  activate("LKAI-FE-08");
});

test("LKAI-FE-09 landing structure, CTA, suggestions, and G4 maximum case stay fixed", () => {
  const page = source("app/page.tsx");
  const form = source("components/run-form.tsx");
  const hero = source("components/landing-sections.tsx");
  const regression = source("scripts/g4-browser-regression.mjs");
  assertProtectedLandingShape(page, form, hero);
  assert.match(form, /One seed phrase per line/u);
  assert.match(form, /maxLength=\{2004\}/u);
  assert.match(regression, /\['clothing', 'eyewear', 'home decor', 'pet supplies', 'skincare', 'jewelry'\]/u);
  assert.doesNotMatch(regression, /length: 101/u);
  activate("LKAI-FE-09");
});

test("LKAI-FE-10 continuation response is an exact local union", () => {
  assert.deepEqual(parseSearchContinuationResponse({ kind: "legacy_run", run: startRun }), {
    kind: "legacy_run", run: startRun,
  });
  assert.equal(
    parseSearchContinuationResponse({ kind: "keyword_research", research }).research.id,
    research.id,
  );
  for (const invalid of [
    {},
    { kind: "unknown", run: startRun },
    { kind: "legacy_run", run: startRun, destination: "/runs/a" },
    { kind: "legacy_run", run: { ...startRun, destination: "/runs/a" } },
    { kind: "legacy_run", run: { ...startRun, runId: "" } },
    { kind: "legacy_run", run: { ...startRun, runId: "arbitrary-run" } },
    { kind: "keyword_research", research, url: "/keywords/a" },
    { kind: "keyword_research", research: { ...research, destination: "/keywords/a" } },
    { kind: "keyword_research", research: { ...research, id: "" } },
    { kind: "keyword_research", research: { ...research, id: "arbitrary-research" } },
  ]) assert.throws(() => parseSearchContinuationResponse(invalid), ApiPayloadError);
  activate("LKAI-FE-10");
});

test("LKAI frontend negative controls are falsified", () => {
  const form = source("components/run-form.tsx");
  const keywordRoute = source("app/api/keyword-research/route.ts");
  const page = source("app/page.tsx");
  const hero = source("components/landing-sections.tsx");

  const restoredLegacyPost = form.replace(
    "createKeywordResearch(validation.seeds)",
    'apiRequest("/api/runs", { method: "POST" })',
  );
  assert.throws(() => assertLandingKeywordLineage(restoredLegacyPost));
  falsify("LKAI-NC-04");

  assert.throws(
    () => parseSearchContinuationResponse({ kind: "keyword_research", research, destination: "javascript:alert(1)" }),
    ApiPayloadError,
  );
  falsify("LKAI-NC-05");

  const missingOppositeClear = keywordRoute.replace(
    "cookieStore.delete(PENDING_RUN_INTENT_COOKIE);",
    "",
  );
  assert.throws(() => assertOppositeCookieCleared(missingOppositeClear, "keyword"));
  falsify("LKAI-NC-06");

  const renamedClass = form.replace("run-form-card run-start-form ds-card", "run-start-form ds-card");
  assert.throws(() => assertProtectedLandingShape(page, renamedClass, hero));
  falsify("LKAI-NC-07");
});

test("LKAI frontend registry is complete and deterministic", () => {
  assert.deepEqual([...executedCases].sort(), [...FRONTEND_CASE_IDS].sort());
  assert.deepEqual([...executedControls].sort(), [...CONTROL_IDS].sort());
  assert.equal(digest(FRONTEND_CASE_IDS), "fd9be2094fba71d3f0dbdf8a5e2921df55da50919fb244dfce402e9f1787295d");
  assert.equal(digest(CONTROL_IDS), "f922ad736b8a46907ac70d6c024337c4190b55d3cf8d695d7c19b635e2ae8ceb");
});
