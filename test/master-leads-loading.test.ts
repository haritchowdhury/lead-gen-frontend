import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("My Leads waits for the initial traffic request before revealing result actions", () => {
  const workspace = source("components/leads/live-leads-workspace.tsx");
  const traffic = source("components/cumulative-traffic.tsx");

  assert.match(workspace, /const \[trafficSettled, setTrafficSettled\] = useState\(false\)/u);
  assert.match(workspace, /onLoadSettled=\{handleTrafficSettled\}/u);
  assert.match(workspace, /discoveryQueries=\{discoveryQueries\}/u);
  assert.match(workspace, /\{trafficSettled && <section className="results-section">/u);
  assert.match(traffic, /setOverview\(nextOverview\);[\s\S]*onLoadSettled\?\.\(\);/u);
  assert.match(traffic, /setError\(errorMessage\(requestError\)\);[\s\S]*onLoadSettled\?\.\(\);/u);
  assert.match(traffic, /aria-label="Loading query traffic heatmap"/u);
});

test("individual runs reserve the histogram traffic layout while My Leads keeps its loader", () => {
  const runWorkspace = source("components/run-workspace.tsx");
  const liveWorkspace = source("components/leads/live-leads-workspace.tsx");
  const traffic = source("components/cumulative-traffic.tsx");
  const css = source("app/globals.css");

  assert.match(runWorkspace, /<CumulativeTrafficSection[\s\S]*?histogramLoadingSkeleton[\s\S]*?\/>/u);
  assert.match(runWorkspace, /discoveryQueries=\{discoveryQueries\}/u);
  assert.doesNotMatch(liveWorkspace, /histogramLoadingSkeleton/u);
  assert.match(traffic, /traffic-loading-query/u);
  assert.match(traffic, /traffic-loading-globe/u);
  assert.match(traffic, /traffic-loading-metrics/u);
  assert.match(css, /\.cumulative-traffic-loading\.has-query-histogram[\s\S]*?"query globe"[\s\S]*?"metrics metrics"/u);
  assert.match(css, /\.traffic-loading-query\s*\{[\s\S]*?min-height:\s*25rem/u);
  assert.match(css, /\.traffic-loading-metrics\s*\{[\s\S]*?min-height:\s*6rem/u);
});
