import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runStateLabel, runStateTone, trafficProgressState } from "../lib/run-presentation.ts";
import { stageLabel, stagePercent } from "../lib/stages.ts";
import { progress, runStatus } from "./fixtures.ts";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const stages = [
  "queued_query_planning", "reading_categories", "researching_category", "generating_candidates",
  "validating_candidates", "probing_queries", "selecting_queries", "awaiting_query_confirmation",
  "queued_query_validation", "validating_confirmed_queries", "probing_confirmed_queries",
  "discovering_stores", "stores_persisted", "discovering_leads", "leads_persisted",
  "enriching_traffic", "extracting_leads", "writing_results", "completed",
];

test("every stage and terminal state keeps a truthful label and bounded progress", () => {
  for (const [index, stage] of stages.entries()) {
    assert.notEqual(stageLabel(stage), "Processing your run");
    const percent = stagePercent(stage, stage === "completed" ? "completed" : "running");
    assert.ok(percent >= 0 && percent <= 100);
    if (index > 0) assert.ok(percent >= stagePercent(stages[index - 1], "running"));
  }
  assert.equal(stagePercent("failed", "failed"), 100);
  assert.equal(stagePercent("cancelled", "cancelled"), 100);
  assert.equal(stageLabel("unknown-stage"), "Processing your run");
});

test("AWS execution stages render as their existing visible pipeline stages", () => {
  const aliases = [
    ["aws_discovery", "discovering_stores"],
    ["aws_lead", "discovering_leads"],
    ["aws_traffic_crux", "enriching_traffic"],
  ] as const;
  for (const [awsStage, visibleStage] of aliases) {
    assert.equal(stageLabel(awsStage), stageLabel(visibleStage));
    assert.equal(stagePercent(awsStage, "running"), stagePercent(visibleStage, "running"));
  }
  assert.equal(stageLabel("unknown-aws-stage"), "Processing your run");
  assert.equal(stagePercent("unknown-aws-stage", "running"), 8);
});

test("query planning renders distinct zero and nonzero metric states", () => {
  const component = source("components/run-progress.tsx");
  assert.match(component, /progress-card-query/u);
  assert.match(component, /value=\{run\.progress\.shopTypesProcessed\}/u);
  assert.match(component, /total=\{run\.progress\.shopTypesTotal\}/u);
  assert.match(component, /value=\{run\.progress\.queryCandidatesGenerated\}/u);
  assert.match(component, /value=\{run\.progress\.queryCandidatesValidated\}/u);
  assert.match(component, /value=\{run\.progress\.queriesSelected\}/u);
  assert.match(component, /aria-busy=\{active\}/u);
  const css = source("app/globals.css");
  assert.match(css, /\.run-page \.progress-card-pipeline\.state-completed/u);
  assert.match(css, /A completed run becomes a quiet two-row status strip/u);
});

test("pipeline counters remain independent and traffic maps to each real state", () => {
  const cases = [
    ["discovering_stores", "running", "Waiting", "traffic-waiting"],
    ["enriching_traffic", "running", "Analyzing", "traffic-active"],
    ["aws_traffic_crux", "running", "Analyzing", "traffic-active"],
    ["writing_results", "running", "Complete", "traffic-complete"],
    ["completed", "completed", "Complete", "traffic-complete"],
    ["failed", "failed", "Stopped", "traffic-stopped"],
    ["cancelled", "cancelled", "Stopped", "traffic-stopped"],
  ] as const;

  for (const [stage, state, trafficLabel, trafficClass] of cases) {
    const run = runStatus({ state, phase: state === "completed" ? "finished" : "scraping", stage, progress: { ...progress, queriesTotal: 11, queriesProcessed: 4, storesDiscovered: 23, storesQualified: 5, storesRejected: 3, storeProcessingFailures: 2 }, resultsAvailable: state === "completed" });
    const traffic = trafficProgressState(run);
    assert.equal(run.progress.queriesProcessed, 4);
    assert.equal(run.progress.storesDiscovered, 23);
    assert.equal(run.progress.storesQualified + run.progress.storesRejected + run.progress.storeProcessingFailures, 10);
    assert.equal(traffic.tone, trafficClass.replace("traffic-", ""));
    assert.equal(traffic.label, trafficLabel);
  }
});

test("route and client fallbacks share an eventual-content skeleton", () => {
  const component = source("components/run-progress.tsx");
  const route = source("app/runs/[runId]/page.tsx");
  const workspace = source("components/run-workspace.tsx");

  assert.match(component, /role="status"/u);
  assert.match(component, /aria-label="Loading discovery run"/u);
  assert.match(component, /run-loading-title/u);
  assert.match(component, /run-loading-progress/u);
  assert.match(component, /run-loading-metrics/u);
  assert.match(route, /<RunLoadingSkeleton \/>/u);
  assert.match(workspace, /<RunLoadingSkeleton \/>/u);
});

test("completed runs opt into the compact pre-traffic workspace treatment", () => {
  const workspace = source("components/run-workspace.tsx");
  const css = source("app/globals.css");

  assert.match(workspace, /className=\{`run-page run-page-\$\{run\.state\}`\}/u);
  assert.match(css, /Completed-run masthead and lead overview share one compact pre-traffic toolbar/u);
  assert.match(css, /\.run-page\.run-page-completed \.results-section/u);
  assert.match(css, /\.run-page\.run-page-completed \.summary-grid/u);
});

test("runtime state labels and semantic tones cover every state", () => {
  assert.deepEqual([
    runStateLabel("queued"), runStateLabel("running"), runStateLabel("awaiting_query_confirmation"),
    runStateLabel("completed"), runStateLabel("failed"), runStateLabel("cancelled"),
  ], ["Queued", "Running", "Review ready", "Completed", "Failed", "Cancelled"]);
  assert.equal(runStateTone("queued"), "ds-badge--neutral");
  assert.equal(runStateTone("completed"), "ds-badge--positive");
  assert.equal(runStateTone("awaiting_query_confirmation"), "ds-badge--warning");
  assert.equal(runStateTone("failed"), "ds-badge--danger");
});

test("polling, refresh, and counter source logic remain unchanged", () => {
  const workspace = source("components/run-workspace.tsx");
  const progressSource = source("components/run-progress.tsx");

  assert.match(workspace, /const RETRY_DELAYS = \[3_000, 5_000, 10_000, 15_000\]/u);
  assert.match(workspace, /timer = setTimeout\(poll, 3_000\)/u);
  assert.match(workspace, /setResultsPollVersion\(\(value\) => value \+ 1\)/u);
  assert.match(workspace, /setConnectionWarning\([\s\S]*reconnecting automatically/u);
  assert.match(workspace, /failureCount \+= 1/u);
  assert.match(progressSource, /run\.progress\.storesQualified \+\s*run\.progress\.storesRejected \+\s*run\.progress\.storeProcessingFailures/u);
  assert.match(progressSource, /value=\{run\.progress\.queriesProcessed\}/u);
  assert.match(progressSource, /value=\{run\.progress\.storesDiscovered\}/u);
});
