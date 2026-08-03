import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G7");
const port = 4324;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g7-"));
const checks = {
  fixture: "real compiled CSS with deterministic synthetic .example completed-results DOM",
  scenarios: [],
  states: [],
  interactions: [],
  gap: null,
};
let nextProcess;
let chromeProcess;
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const waitForExit = (child) => new Promise((resolve) => child.once("exit", resolve));
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
class Cdp {
  constructor(url) { this.socket = new WebSocket(url); this.nextId = 1; this.pending = new Map(); }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
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

const metricLabels = ["Estimated Google search traffic", "Organic estimated traffic", "Organic ranking footprint", "Paid estimated traffic", "Paid ranking footprint", "Featured-snippet estimated traffic", "Featured-snippet keyword count", "Local-pack estimated traffic", "Local-pack keyword count"];
const metricHtml = metricLabels.map((label, index) => `<div><dt>${label}</dt><dd>${index ? index * 13 : 1_248}</dd></div>`).join("");
const globe = `<svg class="traffic-globe" viewBox="0 0 320 320" role="group" aria-label="Interactive globe"><circle cx="160" cy="160" r="145" fill="#e9f1d8"/><path d="M70 130 Q130 55 205 85 Q270 120 235 205 Q165 270 90 215 Z" fill="#c5cfb7"/><path class="is-selected" d="M90 145 L122 130 L130 165 L102 178 Z" fill="#8cae48"/></svg><p class="traffic-globe-instruction">↔ Drag to rotate · Select highlighted markets</p>`;
const fixture = `<main class="run-page"><div class="shell"><section class="results-section"><div class="results-heading"><div><span class="eyebrow">Lead workspace</span><h2>Your store leads</h2><p>Review the evidence, focus on qualified prospects, or export the complete dataset.</p></div><div class="results-heading-utilities"><span class="ds-badge ds-badge--positive">Completed</span><div class="export-action"><button class="button button-dark">Export all CSV</button><span class="export-error" role="alert" hidden>Export service unavailable.</span></div></div></div><div class="summary-grid" aria-label="Run result totals"><article class="summary-card summary-neutral"><span>All leads</span><strong>128</strong><i></i></article><article class="summary-card summary-positive"><span>Qualified</span><strong>82</strong><i></i></article><article class="summary-card summary-muted"><span>Rejected</span><strong>41</strong><i></i></article><article class="summary-card summary-danger"><span>Failed</span><strong>5</strong><i></i></article></div><section class="cumulative-traffic"><header><div><span class="eyebrow">All-lead traffic</span><h3>Cumulative traffic landscape</h3><p>Summed Google search estimates across the complete run, independent of table filters.</p></div><span class="cumulative-traffic-coverage">96 of 128 leads covered</span></header><div class="traffic-market-explorer"><section class="traffic-market-data" aria-live="polite"><header><div><span class="traffic-scope-kicker">Traffic scope</span><h5>Worldwide</h5></div><button class="traffic-overall-button" hidden>View overall</button></header><dl class="fact-grid traffic-metric-grid">${metricHtml}</dl></section><section class="traffic-globe-panel"><div class="traffic-country-nav"><div><span class="traffic-scope-kicker">Available markets</span><h5>Explore by country</h5></div><div class="traffic-country-links"><button aria-pressed="false">United States<span>(US)</span></button><button aria-pressed="false">India<span>(IN)</span></button><button aria-pressed="false">Germany<span>(DE)</span></button></div></div><div class="traffic-globe-stage">${globe}</div></section></div></section><div class="results-panel" style="height:180px"><div style="padding:16px;font-weight:800">Initial lead table content</div></div></section></div></main>`;

async function install(cdp) {
  await evaluate(cdp, `document.querySelectorAll('script').forEach((node) => node.remove()); document.body.innerHTML = ${JSON.stringify(fixture)}; (() => { const title = document.querySelector('.traffic-market-data h5'); const overall = document.querySelector('.traffic-overall-button'); for (const button of document.querySelectorAll('.traffic-country-links button')) button.addEventListener('click', () => { for (const item of document.querySelectorAll('.traffic-country-links button')) { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); } button.classList.add('is-selected'); button.setAttribute('aria-pressed', 'true'); title.textContent = button.firstChild.textContent; overall.hidden = false; }); overall.addEventListener('click', () => { title.textContent = 'Worldwide'; overall.hidden = true; for (const item of document.querySelectorAll('.traffic-country-links button')) { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); } }); })()`);
  await wait(100);
}
async function measurements(cdp, label) {
  return evaluate(cdp, `(() => { const hero = document.querySelector('.results-section'); const traffic = document.querySelector('.cumulative-traffic'); const table = document.querySelector('.results-panel'); const nav = document.querySelector('.traffic-country-nav'); const explorer = document.querySelector('.traffic-market-explorer'); return { label: ${JSON.stringify(label)}, viewport: { width: innerWidth, height: innerHeight }, bodyOverflow: document.documentElement.scrollWidth > innerWidth, summaryCells: document.querySelectorAll('.summary-card').length, trafficMetrics: document.querySelectorAll('.traffic-metric-grid > div').length, countryNavBottomLeft: nav && explorer ? (() => { const navBox = nav.getBoundingClientRect(); const explorerBox = explorer.getBoundingClientRect(); return navBox.left < explorerBox.left + explorerBox.width * .55 && navBox.bottom > explorerBox.top + explorerBox.height * .72; })() : null, heroHeight: Math.round(hero.getBoundingClientRect().height), trafficHeight: Math.round(traffic.getBoundingClientRect().height), tableVisible: table.getBoundingClientRect().top < innerHeight, scope: document.querySelector('.traffic-market-data h5')?.textContent ?? null, selected: document.querySelector('.traffic-country-links .is-selected')?.textContent ?? null, exportErrorVisible: !document.querySelector('.export-error').hidden }; })()`);
}
async function capture(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await wait(300);
  await install(cdp);
  const result = await measurements(cdp, `full-${width}`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `completed-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push(result);
  if (result.bodyOverflow || result.summaryCells !== 4 || result.trafficMetrics !== 9 || !result.countryNavBottomLeft) throw new Error(`G7 layout failed at ${width}px: ${JSON.stringify(result)}`);
}

try {
  await fs.mkdir(outputDir, { recursive: true });
  nextProcess = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  let serverLog = "";
  nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();
  chromeProcess = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank"], { stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Page.navigate", { url: baseUrl }); await wait(1_000);
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) await capture(cdp, width, height);
  await evaluate(cdp, "document.querySelector('.traffic-country-links button').click()");
  checks.interactions.push(await measurements(cdp, "selected-country"));
  await evaluate(cdp, "document.querySelector('.traffic-overall-button').click()");
  checks.interactions.push(await measurements(cdp, "worldwide-reset"));
  const before = await evaluate(cdp, "document.querySelector('.results-heading').getBoundingClientRect().height");
  await evaluate(cdp, "document.querySelector('.export-error').hidden = false");
  const after = await evaluate(cdp, "document.querySelector('.results-heading').getBoundingClientRect().height");
  checks.states.push({ state: "export-error", headingHeightBefore: before, headingHeightAfter: after, layoutShift: before !== after });
  for (const [state, html] of [["loading", '<div class="cumulative-traffic-loading" role="status"><span></span><span></span></div>'], ["error", '<p class="cumulative-traffic-error" role="alert">Traffic unavailable.</p>'], ["no-data", '<p class="empty-evidence">No lead-level search traffic estimates are available yet.</p>']]) {
    await install(cdp); await evaluate(cdp, `document.querySelector('.traffic-market-explorer').outerHTML = ${JSON.stringify(html)}`); checks.states.push(await measurements(cdp, state));
  }
  checks.gap = "Protected run routes require Neon authentication, so browser composition uses deterministic .example DOM against the real compiled G7 stylesheet; pure aggregation, exact source, CSV, and interaction contracts verify production behavior without an auth bypass.";
  cdp.close();
  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.pid && chromeProcess.exitCode === null) chromeProcess.kill("SIGTERM");
  if (nextProcess?.pid && nextProcess.exitCode === null) nextProcess.kill("SIGTERM");
  if (chromeProcess) await Promise.race([waitForExit(chromeProcess), wait(2_000)]);
  if (nextProcess) await Promise.race([waitForExit(nextProcess), wait(2_000)]);
  await fs.rm(tempDir, { recursive: true, force: true });
}
