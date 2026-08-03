import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { designFixtureEnabled } from "../lib/design-fixture-gate.ts";

const source = (path: string) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the design fixture is fail-closed outside an explicit local development run", () => {
  assert.equal(designFixtureEnabled({ NODE_ENV: "production", STORESIGNAL_DESIGN_FIXTURES: "1" }), false);
  assert.equal(designFixtureEnabled({ NODE_ENV: "development", STORESIGNAL_DESIGN_FIXTURES: undefined }), false);
  assert.equal(designFixtureEnabled({ NODE_ENV: "test", STORESIGNAL_DESIGN_FIXTURES: "0" }), false);
  assert.equal(designFixtureEnabled({ NODE_ENV: undefined, STORESIGNAL_DESIGN_FIXTURES: "1" }), false);
  assert.equal(designFixtureEnabled({ NODE_ENV: "development", STORESIGNAL_DESIGN_FIXTURES: "1" }), true);
});

test("the fixture route mounts the production workspace without changing protected routes", () => {
  const fixtureRoute = source("app/design-fixture/page.tsx");
  const proxy = source("proxy.ts");

  assert.match(fixtureRoute, /import \{ RunWorkspace \} from "@\/components\/run-workspace"/u);
  assert.match(fixtureRoute, /<RunWorkspace runId=/u);
  assert.match(fixtureRoute, /if \(!designFixtureEnabled\(\)\) notFound\(\)/u);
  assert.match(proxy, /matcher: \["\/runs\/:path\*"\]/u);
  assert.doesNotMatch(proxy, /design-fixture|STORESIGNAL_DESIGN_FIXTURES/u);
});

test("the primary browser harness cannot substitute copied application markup", () => {
  const harness = source("scripts/g-r1-real-component-browser.mjs");

  assert.match(harness, /design-fixture/u);
  assert.match(harness, /Page\.addScriptToEvaluateOnNewDocument/u);
  assert.match(harness, /aggregateSelectedMarket/u);
  assert.match(harness, /selectedByPointer/u);
  assert.match(harness, /trafficVariants/u);
  assert.match(harness, /everyIntervalWithinBound/u);
  assert.match(harness, /rapidFilterStart/u);
  assert.match(harness, /failedAssertions/u);
  assert.doesNotMatch(harness, /document\.body\.innerHTML|\.outerHTML\s*=|insertAdjacentHTML/u);
  assert.doesNotMatch(harness, /addEventListener\(['"]click/u);
});
