import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { denseLead, lead, querySet, resultPage, runStatus, trafficEnrichment } from "../test/fixtures.ts";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G-R1");
const port = 4341;
const baseUrl = `http://127.0.0.1:${port}`;
const fixturePath = "/design-fixture";
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-gr1-"));
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const widths = [[390, 844], [768, 1024], [1024, 768], [1280, 800], [1440, 900]];
const checks = {
  fixture: "actual production React components with pre-hydration synthetic .example API interception",
  routeGate: null,
  publicLanding: [],
  queryReview: null,
  runtime: null,
  completed: [],
  interactions: {},
  requestLog: {},
  residuals: [],
};
let nextProcess;
let chromeProcess;
let serverLog = "";

const dense = denseLead();
const partial = lead({
  id: "lead_partial_fixture",
  store_name: "Partial Traffic Fixture",
  resolved_domain: null,
  final_url: "https://partial-traffic.example/products/a-deliberately-long-product-path",
  canonical_url: "https://partial-traffic.example/products/a-deliberately-long-product-path",
  myshopify_domain: "partial-traffic.myshopify.com",
  status: "rejected",
  lead_score: null,
  score_breakdown: null,
  score_semantics: "not_scored_v2",
  rejection_reason: "Synthetic non-qualifying fixture.",
  traffic_enrichment: trafficEnrichment(),
});
const missing = lead({
  id: "lead_missing_fixture",
  store_name: "Missing Traffic Fixture",
  resolved_domain: null,
  final_url: "https://missing-traffic.example/products/observed-product",
  canonical_url: "https://missing-traffic.example/products/observed-product",
  myshopify_domain: "missing-traffic.myshopify.com",
  status: "failed",
  lead_score: null,
  score_breakdown: null,
  score_semantics: "not_scored_v2",
  error: "Synthetic processing failure.",
  traffic_enrichment: undefined,
});
const unavailableTraffic = trafficEnrichment();
unavailableTraffic.dataforseo = {
  state: "unavailable",
  label: "Estimated Google search traffic",
  target: "unavailable-traffic.example",
  observed_at: "2026-08-01T00:00:00.000Z",
};
unavailableTraffic.crux = {
  state: "unavailable",
  origin_metrics: { state: "no_coverage" },
  popularity: { state: "unavailable" },
};
unavailableTraffic.traffic_sources = undefined;
unavailableTraffic.traffic_attributions = undefined;
const unavailable = lead({
  id: "lead_unavailable_fixture",
  store_name: "Unavailable Coverage Fixture",
  resolved_domain: "unavailable-traffic.example",
  traffic_enrichment: unavailableTraffic,
});
const allLeads = [dense, partial, missing, unavailable];
const completedPage = resultPage(allLeads.slice(0, 3));
completedPage.summary = { total: 4, qualified: 2, rejected: 1, failed: 1 };
completedPage.pagination = { page: 1, pageSize: 25, totalItems: 4, totalPages: 2 };

const runtimeProgress = {
  ...runStatus().progress,
  queriesTotal: 11,
  queriesProcessed: 4,
  storesDiscovered: 23,
  storesQualified: 5,
  storesRejected: 3,
  storeProcessingFailures: 2,
  outputRows: 10,
};
const payloads = {
  queries: { ...querySet(), runId: "run_fixture_query_review" },
  queryReview: runStatus({
    runId: "run_fixture_query_review",
    state: "awaiting_query_confirmation",
    phase: "query_review",
    stage: "awaiting_query_confirmation",
    resultsAvailable: false,
    startedAt: null,
    completedAt: null,
    queryReview: {
      revision: 3,
      confirmedRevision: null,
      editable: true,
      queriesUrl: "/api/runs/run_fixture_query_review/queries",
      valid: true,
      invalidQueryCount: 0,
    },
  }),
  queryPlanning: runStatus({
    runId: "run_fixture_query_planning",
    state: "running",
    phase: "query_planning",
    stage: "validating_candidates",
    resultsAvailable: false,
    completedAt: null,
    progress: { ...runtimeProgress, shopTypesTotal: 8, shopTypesProcessed: 3, queryCandidatesGenerated: 19, queryCandidatesValidated: 7, queriesSelected: 4 },
  }),
  runtime: [
    runStatus({ runId: "run_fixture_runtime", state: "running", phase: "scraping", stage: "discovering_stores", completedAt: null, resultsAvailable: false, progress: runtimeProgress }),
    runStatus({ runId: "run_fixture_runtime", state: "running", phase: "scraping", stage: "enriching_traffic", completedAt: null, resultsAvailable: false, progress: { ...runtimeProgress, queriesProcessed: 8, storesDiscovered: 31, storesQualified: 9 } }),
    runStatus({ runId: "run_fixture_runtime", state: "completed", phase: "finished", stage: "completed", resultsAvailable: true, progress: { ...runtimeProgress, queriesProcessed: 11, storesDiscovered: 34, storesQualified: 12, outputRows: 18 } }),
  ],
  completed: runStatus({ runId: "run_fixture_completed", resultsAvailable: true }),
  failed: runStatus({ runId: "run_fixture_failed", state: "failed", phase: "finished", stage: "failed", resultsAvailable: false, error: { code: "SYNTHETIC_FAILURE", message: "Synthetic fixture failure." } }),
  completedPage,
  allPage: { ...resultPage(allLeads), summary: { total: 4, qualified: 2, rejected: 1, failed: 1 } },
  pageTwo: { ...resultPage([unavailable]), summary: { total: 4, qualified: 2, rejected: 1, failed: 1 }, pagination: { page: 2, pageSize: 25, totalItems: 4, totalPages: 2 } },
};

function fixtureInjection(payload) {
  return `(() => {
    const payloads = ${JSON.stringify(payload)};
    const originalFetch = globalThis.fetch.bind(globalThis);
    const state = { requests: [], runtimeCalls: 0, exportFailure: false, savedRevision: payloads.queries.revision };
    globalThis.__storesignalFixture = state;
    globalThis.fetch = async (input, init = {}) => {
      const url = new URL(typeof input === "string" ? input : input.url, location.href);
      const method = String(init.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
      const record = { path: url.pathname, search: url.search, method, at: Math.round(performance.now()), body: init.body ? String(init.body) : null };
      state.requests.push(record);
      const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
      if (!url.pathname.startsWith("/api/runs/")) return originalFetch(input, init);
      if (url.pathname.endsWith("/queries")) {
        if (method === "GET") return response(payloads.queries);
        const submitted = JSON.parse(String(init.body));
        state.savedRevision += 1;
        payloads.queries = { ...payloads.queries, revision: state.savedRevision, queries: submitted.queries.map((item, index) => ({
          id: item.id || "query_fixture_added_" + index, categoryIndex: item.categoryIndex, sequence: index, query: item.query,
          source: item.id ? "user_edited" : "user_added", validationState: "valid", rejectionReason: null,
          queryScore: null, generationReason: "Synthetic saved query.", probedAt: "2026-08-01T00:00:00.000Z"
        })) };
        return response(payloads.queries);
      }
      if (url.pathname.endsWith("/start")) return response({ runId: "run_fixture_query_review", state: "queued", phase: "scraping", stage: "queued_query_validation", revision: state.savedRevision });
      if (url.pathname.endsWith("/results")) {
        if (state.exportFailure && url.searchParams.get("pageSize") === "200") return response({ error: { code: "SYNTHETIC_EXPORT_FAILURE", message: "Synthetic CSV failure." } }, 503);
        if (url.searchParams.get("pageSize") === "200") return response(payloads.allPage);
        if (url.searchParams.get("page") === "2") return response(payloads.pageTwo);
        const status = url.searchParams.get("status");
        if (status) return response({ ...payloads.completedPage, items: payloads.allPage.items.filter((item) => item.status === status), pagination: { page: 1, pageSize: 25, totalItems: payloads.allPage.items.filter((item) => item.status === status).length, totalPages: 1 } });
        return response(payloads.completedPage);
      }
      if (url.pathname.includes("run_fixture_query_review")) return response(payloads.queryReview);
      if (url.pathname.includes("run_fixture_query_planning")) return response(payloads.queryPlanning);
      if (url.pathname.includes("run_fixture_failed")) return response(payloads.failed);
      if (url.pathname.includes("run_fixture_completed")) return response(payloads.completed);
      if (url.pathname.includes("run_fixture_runtime")) {
        state.runtimeCalls += 1;
        if (state.runtimeCalls === 2) throw new TypeError("Synthetic reconnect interruption");
        const index = state.runtimeCalls >= 4 ? 2 : state.runtimeCalls >= 3 ? 1 : 0;
        return response(payloads.runtime[index]);
      }
      return response({ error: { code: "UNEXPECTED_FIXTURE_REQUEST", message: url.pathname } }, 500);
    };
  })();`;
}

class Cdp {
  constructor(url) { this.socket = new WebSocket(url); this.nextId = 1; this.pending = new Map(); }
  async open() {
    await new Promise((resolve, reject) => { this.socket.addEventListener("open", resolve, { once: true }); this.socket.addEventListener("error", reject, { once: true }); });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  close() { this.socket.close(); }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(cdp, expression, label, timeout = 12_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(cdp, `Boolean(${expression})`)) return;
    await wait(100);
  }
  const diagnostic = await evaluate(cdp, `(() => ({
    url: location.href,
    text: document.body.innerText.slice(0, 1200),
    requests: globalThis.__storesignalFixture?.requests?.slice(-12) || []
  }))()`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(diagnostic)}`);
}

async function waitForServer() {
  for (let index = 0; index < 120; index += 1) {
    try { if ((await fetch(baseUrl)).ok) return; } catch {}
    await wait(250);
  }
  throw new Error("Next.js development server did not become ready");
}

async function waitForFile(file) {
  for (let index = 0; index < 100; index += 1) {
    try { return await fs.readFile(file, "utf8"); } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${file}`);
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitFor(cdp, "document.readyState === 'complete'", url);
}

async function setViewport(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
}

async function capture(cdp, name, width, height, setup = "") {
  await setViewport(cdp, width, height);
  await wait(180);
  if (setup) await evaluate(cdp, setup);
  await wait(120);
  const metrics = await evaluate(cdp, `(() => ({
    name: ${JSON.stringify(name)}, viewport: { width: innerWidth, height: innerHeight },
    fixtureSurface: document.querySelector('[data-design-fixture-surface]')?.getAttribute('data-design-fixture-surface') || null,
    bodyOverflow: document.documentElement.scrollWidth > innerWidth,
    visibleHeadings: [...document.querySelectorAll('h1,h2,h3')].filter((node) => node.getBoundingClientRect().height > 0).map((node) => node.textContent.trim()).slice(0, 20),
    reactControlledInputs: [...document.querySelectorAll('input')].filter((node) => Object.keys(node).some((key) => key.startsWith('__reactProps'))).length,
    widths: [...document.querySelectorAll('.results-panel,.table-wrap,.lead-expansion-shell,.lead-details,.contact-details,.store-fit-list,.occurrence-list')].map((node) => ({ className: node.className, clientWidth: node.clientWidth, scrollWidth: node.scrollWidth, top: Math.round(node.getBoundingClientRect().top), left: Math.round(node.getBoundingClientRect().left), right: Math.round(node.getBoundingClientRect().right) })).slice(0, 30),
    openDisclosures: document.querySelectorAll('details[open]').length,
    evidenceCounts: {
      contacts: document.querySelectorAll('.contact-evidence-item').length,
      storeFit: document.querySelectorAll('.store-fit-record').length,
      storeFitPages: document.querySelectorAll('.store-fit-page').length,
      occurrences: document.querySelectorAll('.occurrence-record').length,
      vocabularyTokens: document.querySelectorAll('.token-values > span').length
    },
    selectedMarket: document.querySelector('.traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label') || null
  }))()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  return metrics;
}

async function click(cdp, expression) {
  const clicked = await evaluate(cdp, `(() => { const node = ${expression}; if (!node) return false; node.click(); return true; })()`);
  if (!clicked) throw new Error(`Missing click target: ${expression}`);
}

try {
  await fs.mkdir(outputDir, { recursive: true });
  nextProcess = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    env: { ...process.env, STORESIGNAL_DESIGN_FIXTURES: "1" },
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();

  const protectedResponse = await fetch(`${baseUrl}/runs/run_fixture_completed`, { redirect: "manual" });
  checks.routeGate = { protectedStatus: protectedResponse.status, protectedLocation: protectedResponse.headers.get("location"), fixtureFlagClientVisible: false };
  if (![302, 307, 308].includes(protectedResponse.status) || !checks.routeGate.protectedLocation?.includes("/sign-in")) throw new Error("Protected route no longer redirects through auth");

  chromeProcess = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank"], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: fixtureInjection(payloads) });

  await navigate(cdp, baseUrl);
  await waitFor(cdp, "document.querySelector('.landing-hero .traffic-globe')", "public landing globe");
  for (const [width, height] of widths) checks.publicLanding.push(await capture(cdp, "landing-real", width, height));

  await setViewport(cdp, 1280, 800);
  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=query-review`);
  await waitFor(cdp, "document.querySelector('.query-editor-card input')", "query editor");
  const queryInitial = await evaluate(cdp, `(() => ({ rows: document.querySelectorAll('.query-row').length, first: document.querySelector('.query-row input').value, requests: globalThis.__storesignalFixture.requests }))()`);
  await evaluate(cdp, `(() => { const input = document.querySelector('.query-row input'); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, input.value + ' revised'); input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: ' revised' })); })()`);
  await waitFor(cdp, "!document.querySelector('button.button-secondary').disabled", "dirty query save");
  await click(cdp, "document.querySelector('button.button-secondary')");
  await waitFor(cdp, "document.querySelector('.query-editor-card .eyebrow')?.textContent.includes('revision 4')", "saved revision");
  await click(cdp, "[...document.querySelectorAll('.query-editor-card button')].find((node) => node.textContent.includes('Find my stores'))");
  await waitFor(cdp, "globalThis.__storesignalFixture.requests.some((item) => item.path.endsWith('/start'))", "query start request");
  checks.queryReview = await evaluate(cdp, `(() => ({ initial: ${JSON.stringify(queryInitial)}, revision: document.querySelector('.query-editor-card .eyebrow')?.textContent.trim(), queryValue: document.querySelector('.query-row input')?.value, saveRequests: globalThis.__storesignalFixture.requests.filter((item) => item.method === 'PUT'), startRequests: globalThis.__storesignalFixture.requests.filter((item) => item.path.endsWith('/start')), actualReactInputs: [...document.querySelectorAll('input')].filter((node) => Object.keys(node).some((key) => key.startsWith('__reactProps'))).length }))()`);
  checks.requestLog.queryReview = await evaluate(cdp, "globalThis.__storesignalFixture.requests");
  await capture(cdp, "query-review-real", 390, 844);
  await capture(cdp, "query-review-real", 1280, 800);

  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=query-planning`);
  await waitFor(cdp, "document.querySelector('.progress-card-query')", "query planning progress");
  checks.interactions.queryPlanning = await evaluate(cdp, `(() => ({ stage: document.querySelector('.progress-stage h2')?.textContent, metricLabels: [...document.querySelectorAll('.progress-metrics span')].map((node) => node.textContent), count: document.querySelectorAll('.progress-metrics > div').length }))()`);
  await capture(cdp, "query-planning-real", 390, 844);
  await capture(cdp, "query-planning-real", 1280, 800);

  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=runtime`);
  await waitFor(cdp, "document.querySelector('.progress-card-pipeline')", "discovery progress");
  const runtimeFirst = await evaluate(cdp, `(() => ({ stage: document.querySelector('.progress-stage h2').textContent, counts: [...document.querySelectorAll('.progress-metrics strong')].map((node) => node.textContent.trim()), traffic: document.querySelector('.progress-metric-state strong').textContent }))()`);
  await waitFor(cdp, "document.querySelector('.warning-banner')", "reconnect warning", 5_000);
  const runtimeWarning = await evaluate(cdp, `(() => ({ warning: document.querySelector('.warning-banner').textContent.trim(), requests: globalThis.__storesignalFixture.requests.filter((item) => item.path.includes('run_fixture_runtime')) }))()`);
  await waitFor(cdp, "!document.querySelector('.warning-banner') && document.querySelector('.progress-metric-state strong')?.textContent === 'Analyzing'", "reconnect recovery", 7_000);
  const runtimeRecovered = await evaluate(cdp, `(() => ({ stage: document.querySelector('.progress-stage h2').textContent, counts: [...document.querySelectorAll('.progress-metrics strong')].map((node) => node.textContent.trim()), traffic: document.querySelector('.progress-metric-state strong').textContent, requests: globalThis.__storesignalFixture.requests.filter((item) => item.path.includes('run_fixture_runtime')) }))()`);
  checks.runtime = { first: runtimeFirst, interrupted: runtimeWarning, recovered: runtimeRecovered };
  checks.requestLog.runtime = await evaluate(cdp, "globalThis.__storesignalFixture.requests");
  await capture(cdp, "runtime-recovered-real", 390, 844);
  await capture(cdp, "runtime-recovered-real", 1280, 800);

  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=failed`);
  await waitFor(cdp, "document.querySelector('.error-banner')", "terminal failure");
  checks.interactions.terminal = await evaluate(cdp, `(() => ({ alert: document.querySelector('.error-banner').textContent.trim(), state: document.querySelector('.progress-state .ds-badge').textContent }))()`);

  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=completed`);
  await waitFor(cdp, "document.querySelectorAll('.row-toggle').length >= 3 && document.querySelector('.cumulative-traffic .traffic-globe')", "completed results");
  for (const [width, height] of widths) await capture(cdp, "completed-overview-real", width, height);
  await click(cdp, "document.querySelector('.cumulative-traffic .traffic-country-links button')");
  const aggregateSelectedMarket = await evaluate(cdp, `document.querySelector('.cumulative-traffic .traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label')`);
  await click(cdp, "document.querySelector('.cumulative-traffic .traffic-overall-button')");
  const aggregateResetLabel = await evaluate(cdp, `document.querySelector('.cumulative-traffic .traffic-market-data h5')?.textContent.trim()`);
  await click(cdp, "document.querySelector('.row-toggle')");
  await waitFor(cdp, "document.querySelector('.lead-details')", "expanded lead");
  await evaluate(cdp, `(() => { for (const details of document.querySelectorAll('.lead-details details:not([open])')) details.querySelector('summary')?.click(); })()`);
  await wait(150);
  for (const [width, height] of widths) checks.completed.push(await capture(
    cdp,
    "completed-all-open-real",
    width,
    height,
    "document.querySelector('.lead-details')?.scrollIntoView({ block: 'start', inline: 'nearest' })",
  ));

  const denseEvidence = await evaluate(cdp, `(() => ({
    expandedId: document.querySelector('.row-toggle[aria-expanded="true"]')?.getAttribute('aria-controls') || null,
    outcome: document.querySelector('.outcome-badge')?.textContent.trim() || null,
    disclosureLabels: [...document.querySelectorAll('.lead-details details > summary')].map((node) => node.textContent.trim()),
    dataLabels: [...document.querySelectorAll('.lead-details dt')].map((node) => node.textContent.trim()),
    trafficText: document.querySelector('.lead-details .traffic-details')?.textContent.trim() || null,
    zeroMetrics: [...document.querySelectorAll('.lead-details .traffic-details dd')].filter((node) => node.textContent.trim() === '0').length,
  }))()`);
  const resolvedLink = await evaluate(cdp, `(() => { const link = [...document.querySelectorAll('.lead-details a')].find((node) => node.textContent.includes('Resolved storefront')); return link ? { href: link.href, rel: link.rel, target: link.target } : null; })()`);
  await click(cdp, "document.querySelectorAll('.row-toggle')[1]");
  const replacement = await evaluate(cdp, `(() => ({ expandedLabels: [...document.querySelectorAll('.row-toggle[aria-expanded="true"]')].map((node) => node.getAttribute('aria-label')), expandedId: document.querySelector('.row-toggle[aria-expanded="true"]')?.getAttribute('aria-controls') || null, visibleLead: document.querySelector('.lead-details h3')?.textContent || null }))()`);
  const partialTraffic = await evaluate(cdp, `(() => ({ present: Boolean(document.querySelector('.lead-details .traffic-details')), text: document.querySelector('.lead-details .traffic-details')?.textContent.trim() || null }))()`);
  await click(cdp, "document.querySelectorAll('.row-toggle')[2]");
  const missingTraffic = await evaluate(cdp, `(() => ({ present: Boolean(document.querySelector('.lead-details .traffic-details')), expandedId: document.querySelector('.row-toggle[aria-expanded="true"]')?.getAttribute('aria-controls') || null }))()`);
  const rapidFilterStart = await evaluate(cdp, "globalThis.__storesignalFixture.requests.length");
  await evaluate(cdp, `(() => {
    const buttons = [...document.querySelectorAll('.status-tabs button')];
    buttons.find((node) => node.textContent.includes('Rejected'))?.click();
    buttons.find((node) => node.textContent.includes('Qualified'))?.click();
  })()`);
  await waitFor(cdp, "location.search.includes('status=qualified')", "status URL update");
  await waitFor(cdp, "document.querySelectorAll('.row-toggle').length === 2", "filtered results");
  const filterState = await evaluate(cdp, `(() => ({ url: location.pathname + location.search, expanded: document.querySelectorAll('.row-toggle[aria-expanded="true"]').length, selected: document.querySelector('.status-tabs .is-selected').textContent.trim(), names: [...document.querySelectorAll('.store-cell a,.store-cell strong')].map((node) => node.textContent.trim()), rapidResultRequests: globalThis.__storesignalFixture.requests.slice(${rapidFilterStart}).filter((item) => item.path.endsWith('/results')) }))()`);
  await click(cdp, "[...document.querySelectorAll('.status-tabs button')].find((node) => node.textContent.includes('All leads'))");
  await waitFor(cdp, "!location.search.includes('status=') && document.querySelectorAll('.row-toggle').length >= 3", "all results restored");
  await evaluate(cdp, `(() => { const select = document.querySelector('.select-field select'); select.value = 'store_name:asc'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await waitFor(cdp, "location.search.includes('sortBy=store_name')", "sort URL update");
  await evaluate(cdp, `(() => { const input = document.querySelector('.search-field input'); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, 'Fixture'); input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'Fixture' })); })()`);
  await waitFor(cdp, "location.search.includes('search=Fixture')", "debounced search URL", 2_000);
  const searchSortState = await evaluate(cdp, `(() => ({ url: location.pathname + location.search, resultRequests: globalThis.__storesignalFixture.requests.filter((item) => item.path.endsWith('/results')) }))()`);
  await evaluate(cdp, "history.pushState({}, '', location.pathname); window.dispatchEvent(new PopStateEvent('popstate'))");
  await wait(500);
  if (await evaluate(cdp, "Boolean([...document.querySelectorAll('.pagination button')].find((node) => node.textContent === 'Next'))")) {
    await click(cdp, "[...document.querySelectorAll('.pagination button')].find((node) => node.textContent === 'Next')");
    await waitFor(cdp, "location.search.includes('page=2')", "pagination URL update");
  }
  const paginationState = await evaluate(cdp, `(() => ({ url: location.pathname + location.search, names: [...document.querySelectorAll('.store-cell a,.store-cell strong')].map((node) => node.textContent.trim()) }))()`);
  await click(cdp, "document.querySelector('.row-toggle')");
  const unavailableTraffic = await evaluate(cdp, `(() => ({
    expandedId: document.querySelector('.row-toggle[aria-expanded="true"]')?.getAttribute('aria-controls') || null,
    text: document.querySelector('.lead-details .traffic-details')?.textContent.trim() || null,
  }))()`);

  await navigate(cdp, `${baseUrl}${fixturePath}?scenario=completed`);
  await waitFor(cdp, "document.querySelector('.export-action button') && !document.querySelector('.export-action button').disabled", "CSV action");
  await click(cdp, "document.querySelector('.export-action button')");
  await waitFor(cdp, "!document.querySelector('.export-action button').disabled", "successful CSV completion");
  await evaluate(cdp, "globalThis.__storesignalFixture.exportFailure = true");
  await click(cdp, "document.querySelector('.export-action button')");
  await waitFor(cdp, "document.querySelector('.export-error')", "CSV error presentation");
  const csv = await evaluate(cdp, `(() => ({ error: document.querySelector('.export-error').textContent, exportRequests: globalThis.__storesignalFixture.requests.filter((item) => item.path.endsWith('/results') && item.search.includes('pageSize=200')) }))()`);

  await click(cdp, "document.querySelector('.row-toggle')");
  await waitFor(cdp, "document.querySelector('.lead-details .traffic-country-links button')", "individual traffic markets");
  await click(cdp, "document.querySelector('.lead-details .traffic-country-links button')");
  await waitFor(cdp, "document.querySelector('.lead-details .traffic-country-links [aria-pressed=" + JSON.stringify("true") + "]')", "country selected");
  const selectedByText = await evaluate(cdp, `document.querySelector('.lead-details .traffic-country-links [aria-pressed="true"]').getAttribute('aria-label')`);
  const pointerTarget = await evaluate(cdp, `(() => {
    const country = [...document.querySelectorAll('.lead-details .traffic-globe-markets path[role="button"]')].find((node) => node.getAttribute('aria-label')?.includes('India'));
    if (!country) return null;
    const label = country.getAttribute('aria-label');
    country.dispatchEvent(new PointerEvent('click', { bubbles: true, pointerType: 'mouse' }));
    return label;
  })()`);
  await waitFor(cdp, "document.querySelector('.lead-details .traffic-country-links [aria-pressed=\"true\"]')?.getAttribute('aria-label')?.includes('India')", "SVG pointer country selection");
  const selectedByPointer = await evaluate(cdp, `document.querySelector('.lead-details .traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label')`);
  await evaluate(cdp, `(() => { const country = [...document.querySelectorAll('.lead-details .traffic-globe-markets path[role="button"]')].find((node) => node.getAttribute('aria-label')?.includes('Canada')); country.focus(); country.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); })()`);
  await wait(800);
  const selectedByKeyboard = await evaluate(cdp, `(() => ({ button: document.querySelector('.lead-details .traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label'), focus: document.activeElement?.getAttribute('aria-label') }))()`);
  const svgBox = await evaluate(cdp, `(() => { const box = document.querySelector('.lead-details .traffic-globe').getBoundingClientRect(); return { x: box.x, y: box.y, width: box.width, height: box.height }; })()`);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: svgBox.x + svgBox.width / 2, y: svgBox.y + svgBox.height / 2, button: "left", buttons: 1, clickCount: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: svgBox.x + svgBox.width / 2 + 55, y: svgBox.y + svgBox.height / 2 + 12, button: "left", buttons: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: svgBox.x + svgBox.width / 2 + 55, y: svgBox.y + svgBox.height / 2 + 12, button: "left", buttons: 0, clickCount: 1 });
  const selectedAfterDrag = await evaluate(cdp, `document.querySelector('.lead-details .traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label')`);
  await click(cdp, "document.querySelector('.lead-details .traffic-overall-button')");
  const globe = await evaluate(cdp, `(() => ({ selectedByText: ${JSON.stringify(selectedByText)}, pointerTarget: ${JSON.stringify(pointerTarget)}, selectedByPointer: ${JSON.stringify(selectedByPointer)}, selectedByKeyboard: ${JSON.stringify(selectedByKeyboard)}, selectedAfterDrag: ${JSON.stringify(selectedAfterDrag)}, resetLabel: document.querySelector('.lead-details .traffic-market-data h5').textContent, aggregateSelectedMarket: ${JSON.stringify(aggregateSelectedMarket)}, aggregateResetLabel: ${JSON.stringify(aggregateResetLabel)}, unsupportedControls: document.querySelectorAll('[aria-label*="Brazil"],[aria-label*="Japan"]').length, aggregateMarkets: document.querySelectorAll('.cumulative-traffic .traffic-country-links button').length, individualMarkets: document.querySelectorAll('.lead-details .traffic-country-links button').length, showcaseCoveredOnPublicRoute: true }))()`);

  await evaluate(cdp, "document.activeElement?.blur(); document.body.tabIndex = -1; document.body.focus()");
  const focusOrder = [];
  for (let index = 0; index < 18; index += 1) {
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    focusOrder.push(await evaluate(cdp, `(() => { const node = document.activeElement; return { tag: node?.tagName, label: (node?.getAttribute('aria-label') || node?.textContent || node?.getAttribute('placeholder') || '').trim().slice(0, 80), visible: Boolean(node && node.getBoundingClientRect().width && node.getBoundingClientRect().height) }; })()`));
  }

  const runtimeTimes = checks.runtime.recovered.requests.map((item) => item.at);
  checks.interactions.polling = {
    requestCount: runtimeTimes.length,
    boundedIntervalsMs: runtimeTimes.slice(1).map((time, index) => time - runtimeTimes[index]),
    everyIntervalWithinBound: runtimeTimes.slice(1).every((time, index) => {
      const interval = time - runtimeTimes[index];
      return interval >= 2_500 && interval <= 3_500;
    }),
  };
  checks.interactions.results = {
    resolvedLink,
    denseEvidence,
    replacement,
    trafficVariants: { partial: partialTraffic, missing: missingTraffic, unavailableAndNoCoverage: unavailableTraffic },
    filterState,
    searchSortState,
    paginationState,
    csv,
    globe,
    focusOrder,
  };
  checks.requestLog.completed = await evaluate(cdp, "globalThis.__storesignalFixture.requests");
  checks.routeGate.fixtureFlagClientVisible = await evaluate(cdp, `Object.keys(globalThis).some((key) => key.includes('STORESIGNAL_DESIGN_FIXTURES'))`);
  if (checks.routeGate.fixtureFlagClientVisible) throw new Error("Fixture environment flag leaked to the client");

  checks.assertions = {
    realComponentSurfaceAtEveryCompletedViewport: checks.completed.every((item) => item.fixtureSurface === "production-components"),
    querySaveThenStart: checks.queryReview.saveRequests.length === 1 && checks.queryReview.startRequests.length === 1 && JSON.parse(checks.queryReview.startRequests[0].body).revision === 4,
    pollingCadenceBounded: checks.interactions.polling.everyIntervalWithinBound,
    expandedIdsRecorded: Boolean(denseEvidence.expandedId && replacement.expandedId && missingTraffic.expandedId && unavailableTraffic.expandedId),
    visibleDataLabelsRecorded: denseEvidence.dataLabels.includes("Resolved domain") && denseEvidence.dataLabels.includes("Status"),
    nestedDisclosuresRecorded: denseEvidence.disclosureLabels.length === checks.completed[0].openDisclosures,
    trafficBoundaryStatesVisible: denseEvidence.zeroMetrics > 0 && partialTraffic.text?.includes("Partially available") && !missingTraffic.present && unavailableTraffic.text?.includes("Temporarily unavailable") && unavailableTraffic.text?.includes("No coverage"),
    rapidFilterSettled: filterState.url.includes("status=qualified") && filterState.expanded === 0 && filterState.names.length === 2,
    aggregateSelectionAndReset: Boolean(aggregateSelectedMarket) && aggregateResetLabel === "Worldwide",
    individualGlobePaths: Boolean(selectedByText && pointerTarget?.includes("India") && selectedByPointer?.includes("India")) && selectedByKeyboard.button?.includes("Canada") && selectedAfterDrag === selectedByKeyboard.button && globe.resetLabel === "Worldwide",
    unsupportedCountriesAbsent: globe.unsupportedControls === 0,
    resolvedStorefrontSafe: resolvedLink?.href === "https://very-long-store-domain.example/" && resolvedLink.rel === "noreferrer" && resolvedLink.target === "_blank",
  };
  const failedAssertions = Object.entries(checks.assertions).filter(([, passed]) => !passed).map(([name]) => name);
  if (failedAssertions.length) throw new Error(`G-R1 machine assertions failed: ${failedAssertions.join(", ")}`);

  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "artifact-index.json"), `${JSON.stringify({
    command: "npm run test:browser:real-components",
    provenance: "Synthetic .example data from test/fixtures.ts; production React components mounted by app/design-fixture/page.tsx.",
    screenshots: (await fs.readdir(outputDir)).filter((name) => name.endsWith(".png")).sort(),
    machineChecks: "browser-checks.json",
    serverLog: "browser-server.log",
  }, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
  cdp.close();
} finally {
  if (serverLog) {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
  }
  if (chromeProcess?.pid && chromeProcess.exitCode === null) process.kill(-chromeProcess.pid, "SIGTERM");
  if (nextProcess?.pid && nextProcess.exitCode === null) process.kill(-nextProcess.pid, "SIGTERM");
  await wait(500);
  await fs.rm(tempDir, { recursive: true, force: true });
}
