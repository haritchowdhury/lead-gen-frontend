import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { denseLead, querySet, resultPage, runStatus } from "../test/fixtures.ts";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G1");
const port = 4317;
const baseUrl = `http://127.0.0.1:${port}`;
const completeRunId = "run_g1completedfixture";
const reviewRunId = "run_g1queryreviewfixture";
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g1-"));
const checks = { fixture: "synthetic .example/.invalid G1 fixture", scenarios: [], gaps: [] };
let nextProcess;
let chromeProcess;

const completed = runStatus({ runId: completeRunId });
const review = runStatus({
  runId: reviewRunId,
  state: "awaiting_query_confirmation",
  phase: "query_review",
  stage: "awaiting_query_confirmation",
  resultsAvailable: false,
  completedAt: null,
  queryReview: { revision: 3, confirmedRevision: null, editable: true, queriesUrl: `/api/runs/${reviewRunId}/queries`, valid: true, invalidQueryCount: 0 },
});
const results = resultPage([denseLead()]);
results.runId = completeRunId;
const history = {
  pagination: { page: 1, pageSize: 20, totalItems: 2, totalPages: 1 },
  items: [completed, review],
};

function waitForExit(child) {
  return new Promise((resolve) => child.once("exit", resolve));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js development server did not become ready");
}

async function waitForFile(filename) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { return await fs.readFile(filename, "utf8"); } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${filename}`);
}

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      } else if (message.method) {
        for (const listener of this.events.get(message.method) ?? []) listener(message.params);
      }
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  once(method) {
    return new Promise((resolve) => {
      const listener = (params) => {
        this.events.set(method, (this.events.get(method) ?? []).filter((item) => item !== listener));
        resolve(params);
      };
      this.events.set(method, [...(this.events.get(method) ?? []), listener]);
    });
  }
  close() { this.socket.close(); }
}

const fixtureScript = `(() => {
  const payloads = ${JSON.stringify({ completed, review, results, history, queries: querySet() })};
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    let body;
    if (url.pathname === '/api/runs') body = payloads.history;
    else if (url.pathname === '/api/runs/${reviewRunId}') body = payloads.review;
    else if (url.pathname === '/api/runs/${reviewRunId}/queries') body = payloads.queries;
    else if (url.pathname === '/api/runs/${completeRunId}') body = payloads.completed;
    else if (url.pathname === '/api/runs/${completeRunId}/results') body = payloads.results;
    else return originalFetch(input, init);
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
})();`;

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(cdp, "document.readyState");
    if (ready === "complete") break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function viewport(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
}

async function capture(cdp, name, width, height, setup = "") {
  process.stdout.write(`capture ${name} ${width}x${height}\n`);
  await viewport(cdp, width, height);
  if (setup) await evaluate(cdp, setup);
  await new Promise((resolve) => setTimeout(resolve, 250));
  const metrics = await evaluate(cdp, `(() => ({
    url: location.pathname + location.search,
    viewport: { width: innerWidth, height: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    bodyOverflow: document.documentElement.scrollWidth > innerWidth,
    expanded: [...document.querySelectorAll('details')].filter((item) => item.open).length,
    focused: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 80) || document.activeElement?.tagName,
    selectedCountry: document.querySelector('.traffic-country-links [aria-pressed="true"]')?.getAttribute('aria-label') || null,
    resolvedStorefront: [...document.querySelectorAll('a')].find((item) => item.textContent.includes('Resolved storefront'))?.href || null,
    table: (() => { const item = document.querySelector('.table-scroll'); return item ? { clientWidth: item.clientWidth, scrollWidth: item.scrollWidth } : null; })(),
    visibleLabels: [...document.querySelectorAll('h1,h2,h3,summary,[role="alert"]')].filter((item) => item.getBoundingClientRect().height > 0).map((item) => item.textContent.trim().slice(0, 120)).slice(0, 40)
  }))()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push({ name, ...metrics });
}

try {
  await fs.mkdir(outputDir, { recursive: true });
  nextProcess = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let serverLog = "";
  nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();

  chromeProcess = spawn("/usr/bin/google-chrome", [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank",
  ], { detached: true, stdio: "ignore" });
  const portFile = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u);
  const targets = await (await fetch(`http://127.0.0.1:${portFile[0]}/json/list`)).json();
  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget) throw new Error("Chrome did not expose a page target");
  const cdp = new Cdp(pageTarget.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: fixtureScript });

  for (const [pathName, name, sizes] of [
    ["/", "landing", [[390, 844], [768, 1024], [1280, 800]]],
    ["/sign-in", "sign-in", [[390, 844], [1280, 800]]],
    ["/sign-up", "sign-up", [[390, 844]]],
    ["/g1-synthetic-not-found", "not-found", [[390, 844], [1280, 800]]],
  ]) {
    await navigate(cdp, `${baseUrl}${pathName}`);
    for (const [width, height] of sizes) await capture(cdp, name, width, height);
  }

  for (const protectedPath of ["/runs", `/runs/${reviewRunId}`, `/runs/${completeRunId}`]) {
    await navigate(cdp, `${baseUrl}${protectedPath}`);
    const actualPath = await evaluate(cdp, "location.pathname");
    if (actualPath !== "/sign-in") throw new Error(`Expected auth proxy redirect for ${protectedPath}, received ${actualPath}`);
    checks.gaps.push({
      state: protectedPath,
      reason: "The real Next.js authentication proxy redirects unauthenticated deterministic sessions before page/client fixtures execute. G1 does not alter or bypass authentication.",
      observedPath: actualPath,
    });
  }

  cdp.close();
  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.pid && chromeProcess.exitCode === null) process.kill(-chromeProcess.pid, "SIGTERM");
  if (nextProcess?.pid && nextProcess.exitCode === null) process.kill(-nextProcess.pid, "SIGTERM");
  if (chromeProcess) await Promise.race([waitForExit(chromeProcess), new Promise((resolve) => setTimeout(resolve, 2000))]);
  if (nextProcess) await Promise.race([waitForExit(nextProcess), new Promise((resolve) => setTimeout(resolve, 2000))]);
  await fs.rm(tempDir, { recursive: true, force: true });
}
