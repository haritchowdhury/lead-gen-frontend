import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G6");
const port = 4323;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g6-"));
const checks = { fixture: "real compiled CSS with deterministic synthetic .example runtime DOM", scenarios: [], sequences: [], gap: null };
let nextProcess;
let chromeProcess;
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const waitForExit = (child) => new Promise((resolve) => child.once("exit", resolve));
async function waitForServer() { for (let i = 0; i < 120; i += 1) { try { if ((await fetch(baseUrl)).ok) return; } catch {} await wait(250); } throw new Error("Next.js development server did not become ready"); }
async function waitForFile(file) { for (let i = 0; i < 100; i += 1) { try { return await fs.readFile(file, "utf8"); } catch {} await wait(100); } throw new Error(`Timed out waiting for ${file}`); }
class Cdp {
  constructor(url) { this.socket = new WebSocket(url); this.nextId = 1; this.pending = new Map(); }
  async open() { await new Promise((resolve, reject) => { this.socket.addEventListener("open", resolve, { once: true }); this.socket.addEventListener("error", reject, { once: true }); }); this.socket.addEventListener("message", ({ data }) => { const message = JSON.parse(String(data)); if (!message.id) return; const pending = this.pending.get(message.id); if (!pending) return; this.pending.delete(message.id); if (message.error) pending.reject(new Error(message.error.message)); else pending.resolve(message.result); }); }
  send(method, params = {}) { const id = this.nextId++; this.socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject })); }
  close() { this.socket.close(); }
}
async function evaluate(cdp, expression) { const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result.value; }
async function navigate(cdp) { await cdp.send("Page.navigate", { url: baseUrl }); for (let i = 0; i < 100; i += 1) { if (await evaluate(cdp, "document.readyState") === "complete") break; await wait(100); } await wait(500); }

const fixtures = {
  skeleton: `<main class="run-page"><div class="shell run-loading" role="status" aria-live="polite" aria-label="Loading discovery run"><div class="run-loading-title" aria-hidden="true"><span></span><span></span><span></span></div><div class="run-loading-progress ds-card" aria-hidden="true"><div><i></i><span><b></b><b></b></span><em></em></div><span class="run-loading-track"></span><div class="run-loading-metrics"><i></i><i></i><i></i><i></i></div></div></div></main>`,
  planning: `<main class="run-page"><div class="shell"><div class="run-title-row"><div><span class="back-link">← New discovery</span><h1>Lead discovery run</h1><div class="run-meta"><span>Created 3 Aug 2026</span></div></div></div><section class="progress-card ds-card state-running progress-card-query" aria-busy="true" aria-live="polite"><div class="progress-head"><div class="progress-stage"><span class="state-indicator is-active"></span><div><span class="eyebrow">Preparing your search plan</span><h2>Generating search ideas</h2></div></div><div class="progress-state"><span class="ds-badge ds-badge--neutral">Running</span><small>12s elapsed</small></div></div><div class="progress-track" role="progressbar" aria-label="Run progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="26"><span style="width:26%"></span></div><div class="progress-metrics progress-metrics-query"><div class="progress-count"><strong>3<small>/8</small></strong><span>Categories researched</span></div><div class="progress-count"><strong>19</strong><span>Search ideas created</span></div><div class="progress-count"><strong>7</strong><span>Ideas checked</span></div><div class="progress-count"><strong>4</strong><span>Searches ready</span></div></div></section></div></main>`,
  pipeline: `<main class="run-page"><div class="shell"><div class="run-title-row"><div><span class="back-link">← New discovery</span><h1>Lead discovery run</h1><div class="run-meta"><span>Created 3 Aug 2026</span></div></div></div><div class="warning-banner ds-notice ds-notice--warning" role="status">↻ Connection interrupted. Your run is still safe; reconnecting automatically.</div><section class="progress-card ds-card state-running progress-card-pipeline" aria-busy="true" aria-live="polite"><div class="progress-head"><div class="progress-stage"><span class="state-indicator is-active"></span><div><span class="eyebrow">Current stage</span><h2>Adding traffic insights</h2></div></div><div class="progress-state"><span class="ds-badge ds-badge--neutral">Running</span><small>2m 14s elapsed</small></div></div><div class="progress-track" role="progressbar" aria-label="Run progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="84"><span style="width:84%"></span></div><div class="progress-metrics progress-metrics-pipeline"><div class="progress-count"><strong>4<small>/11</small></strong><span>Searches processed</span></div><div class="progress-count"><strong>23</strong><span>Stores discovered</span></div><div class="progress-count"><strong>10<small>/23</small></strong><span>Contacts analyzed</span></div><div class="progress-metric-state traffic-active"><strong>Analyzing</strong><span>Traffic analysis</span></div></div></section></div></main>`,
};

async function install(cdp, fixture) { await evaluate(cdp, `document.querySelector('main').outerHTML = ${JSON.stringify(fixtures[fixture])}`); await wait(100); }
async function capture(cdp, fixture, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await install(cdp, fixture);
  const metrics = await evaluate(cdp, `(() => { const card = document.querySelector('.progress-card, .run-loading-progress'); const box = card.getBoundingClientRect(); return { fixture: ${JSON.stringify(fixture)}, viewport: { width: innerWidth, height: innerHeight }, documentWidth: document.documentElement.scrollWidth, bodyOverflow: document.documentElement.scrollWidth > innerWidth, card: { x: Math.round(box.x), width: Math.round(box.width), height: Math.round(box.height) }, metricCount: document.querySelectorAll('.progress-metrics > div, .run-loading-metrics > i').length, progressValue: document.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow') ?? null, traffic: document.querySelector('.progress-metric-state strong')?.textContent ?? null, reconnecting: document.querySelector('.warning-banner')?.textContent.includes('reconnecting automatically') ?? false }; })()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${fixture}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push(metrics);
  if (metrics.bodyOverflow || metrics.metricCount !== 4) throw new Error(`${fixture} failed layout at ${width}`);
}

try {
  await fs.mkdir(outputDir, { recursive: true });
  nextProcess = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let serverLog = ""; nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; }); nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();
  chromeProcess = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank"], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json(); const target = targets.find((item) => item.type === "page"); if (!target) throw new Error("Chrome did not expose a page target");
  const cdp = new Cdp(target.webSocketDebuggerUrl); await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable"); await navigate(cdp);
  for (const fixture of ["skeleton", "planning", "pipeline"]) for (const [width, height] of [[390, 844], [1280, 800]]) await capture(cdp, fixture, width, height);

  await install(cdp, "pipeline");
  const sequence = [
    ["queued", "Waiting to start", "Waiting", "3"], ["running", "Discovering Shopify stores", "Waiting", "63"],
    ["running", "Adding traffic insights", "Analyzing", "84"], ["running", "Saving your results", "Complete", "95"],
    ["completed", "Run completed", "Complete", "100"], ["failed", "Run failed", "Stopped", "100"], ["cancelled", "Run cancelled", "Stopped", "100"],
  ];
  for (const [state, stage, traffic, percent] of sequence) {
    const result = await evaluate(cdp, `(() => { const card = document.querySelector('.progress-card'); card.className = 'progress-card ds-card state-${state} progress-card-pipeline'; card.setAttribute('aria-busy', ${state === "queued" || state === "running"}); document.querySelector('.progress-stage h2').textContent = ${JSON.stringify(stage)}; document.querySelector('.progress-state .ds-badge').textContent = ${JSON.stringify(state === "queued" ? "Queued" : state[0].toUpperCase() + state.slice(1))}; document.querySelector('.progress-track').setAttribute('aria-valuenow', '${percent}'); document.querySelector('.progress-track span').style.width = '${percent}%'; const trafficNode = document.querySelector('.progress-metric-state'); trafficNode.className = 'progress-metric-state traffic-${traffic === "Waiting" ? "waiting" : traffic === "Analyzing" ? "active" : traffic === "Complete" ? "complete" : "stopped"}'; trafficNode.querySelector('strong').textContent = ${JSON.stringify(traffic)}; return { state: ${JSON.stringify(state)}, stage: document.querySelector('.progress-stage h2').textContent, traffic: trafficNode.querySelector('strong').textContent, percent: document.querySelector('.progress-track').getAttribute('aria-valuenow'), queries: document.querySelectorAll('.progress-count strong')[0].textContent, stores: document.querySelectorAll('.progress-count strong')[1].textContent, contacts: document.querySelectorAll('.progress-count strong')[2].textContent }; })()`);
    checks.sequences.push(result);
  }
  checks.gap = "Protected run routes require Neon authentication, so browser composition uses deterministic .example DOM against the real compiled G6 stylesheet; focused source and pure mapping tests verify production state fields and polling invariants.";
  cdp.close(); await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`); await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.pid && chromeProcess.exitCode === null) process.kill(-chromeProcess.pid, "SIGTERM"); if (nextProcess?.pid && nextProcess.exitCode === null) process.kill(-nextProcess.pid, "SIGTERM");
  if (chromeProcess) await Promise.race([waitForExit(chromeProcess), wait(2000)]); if (nextProcess) await Promise.race([waitForExit(nextProcess), wait(2000)]); await fs.rm(tempDir, { recursive: true, force: true });
}
