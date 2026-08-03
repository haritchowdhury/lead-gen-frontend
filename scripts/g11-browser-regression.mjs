import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "review-evidence/design-system/G11");
const port = 4331;
const base = `http://127.0.0.1:${port}`;
const profile = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g11-"));
const checks = { fixture: "real compiled CSS with deterministic synthetic .example traffic DOM", scenarios: [], interaction: null, gap: null };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let server;
let chrome;

class Cdp {
  constructor(url) { this.ws = new WebSocket(url); this.id = 0; this.pending = new Map(); }
  async open() { await new Promise((resolve, reject) => { this.ws.onopen = resolve; this.ws.onerror = reject; }); this.ws.onmessage = ({ data }) => { const message = JSON.parse(String(data)); const pending = this.pending.get(message.id); if (!pending) return; this.pending.delete(message.id); if (message.error) pending.reject(new Error(message.error.message)); else pending.resolve(message.result); }; }
  send(method, params = {}) { const id = ++this.id; this.ws.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject })); }
  close() { this.ws.close(); }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

const metric = (label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
const metrics = ["Estimated Google search traffic", "Organic estimated traffic", "Organic ranking footprint", "Paid estimated traffic", "Paid ranking footprint", "Featured-snippet estimated traffic", "Featured-snippet keyword count", "Local-pack estimated traffic", "Local-pack keyword count"].map((label, index) => metric(label, index === 0 ? "0" : String(index))).join("");
const links = `<div class="traffic-country-links" aria-label="Available traffic markets">${["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Germany", "France", "India", "United Arab Emirates"].map((country, index) => `<button type="button" aria-pressed="${index === 0}">${country}<span>(${index})</span></button>`).join("")}</div>`;
const globe = `<section class="traffic-globe-panel" aria-label="Available traffic markets"><div class="traffic-country-nav"><div><span class="traffic-scope-kicker">Available markets</span><h5>Explore by country</h5></div>${links}</div><div class="traffic-globe-stage"><svg class="traffic-globe" viewBox="0 0 320 320" role="group" aria-label="Interactive globe"><circle class="traffic-globe-shadow" cx="160" cy="160" r="145"/><circle class="traffic-globe-ocean" cx="160" cy="160" r="145"/><path class="traffic-globe-land" d="M70 150 Q120 60 175 105 T250 180 Q180 260 100 220Z"/><path class="traffic-globe-markets is-selected" role="button" tabindex="0" aria-label="Show traffic for United States" d="M80 130h45v35H80Z"/><circle class="traffic-globe-rim" cx="160" cy="160" r="145"/></svg><p class="traffic-globe-instruction">↔ Drag to rotate · Select highlighted markets</p></div></section>`;
const explorer = `<div class="traffic-market-explorer"><section class="traffic-market-data"><header><div><span class="traffic-scope-kicker">Traffic scope</span><h5>Worldwide</h5></div><button class="traffic-overall-button" type="button">View overall</button></header><dl class="fact-grid traffic-metric-grid">${metrics}</dl></section>${globe}</div>`;
const attribution = `<aside class="traffic-attribution"><h4>Sources and attribution</h4><p>Source links are provided for attribution and do not imply provider endorsement.</p><ul><li><strong>DataForSEO Labs</strong><span>Estimated search traffic.</span><span class="traffic-attribution-links"><a href="https://dataforseo.example" target="_blank" rel="noreferrer">Source</a></span></li><li><strong>Chrome UX Report</strong><span>Performance and popularity data.</span><span class="traffic-attribution-links"><a href="https://crux.example" target="_blank" rel="noreferrer">Source</a><a href="https://license.example" target="_blank" rel="noreferrer">CC BY 4.0</a></span><small>Metrics are selected and renamed.</small></li></ul></aside>`;
const individual = `<main class="run-page"><div class="shell"><div class="results-panel"><div class="table-wrap"><table class="results-table"><tbody><tr><td><div class="lead-expansion-shell"><div class="lead-details"><section class="detail-section traffic-details"><header class="traffic-details-header"><div><h3><span>02</span>Traffic and site experience</h3><p>Lead-level search visibility and observed site experience, reported by source.</p></div><span class="traffic-source-count">2 providers</span></header><div class="traffic-source-grid"><section class="traffic-source-block traffic-source-dataforseo"><header class="traffic-source-header"><div><span class="traffic-provider-label">DataForSEO Labs</span><h4>Estimated Google search traffic</h4><p>Search-demand estimates; these are not total website visits.</p></div><span class="traffic-state traffic-state-partial">Partially available</span></header>${explorer}<footer class="traffic-observation"><span>Target: very-long-traffic-target.example</span><span>Observed Aug 1, 2026</span></footer></section><section class="traffic-source-block traffic-source-crux"><header class="traffic-source-header"><div><span class="traffic-provider-label">Google CrUX</span><h4>Chrome UX Report</h4><p>Observed user-experience and coarse popularity data. CrUX does not provide visit totals.</p></div><span class="traffic-state traffic-state-available">Available</span></header><section class="traffic-scope"><header class="traffic-scope-header"><h5>Origin performance</h5><span class="traffic-state traffic-state-available">Available</span></header><p class="traffic-assessment assessment-good"><strong>Core Web Vitals: Pass</strong><span>Assessment uses available p75 LCP, INP, and CLS values.</span></p><dl class="fact-grid traffic-metric-grid">${["LCP", "INP", "CLS", "FCP", "TTFB"].map((x, i) => metric(x, i === 2 ? "0" : String(i * 100))).join("")}</dl><footer class="traffic-observation"><span>Origin: https://very-long-crux-origin.example</span><span>Collection Jul 1–Jul 28, 2026</span></footer></section><section class="traffic-scope"><header class="traffic-scope-header"><h5>Navigation popularity</h5><span class="traffic-state traffic-state-no_coverage">No coverage</span></header><p class="empty-evidence">No monthly CrUX popularity coverage was available.</p></section></section></div>${attribution}</section></div></div></td></tr></tbody></table></div></div></div></main>`;
const aggregate = `<main class="run-page"><div class="shell"><section class="cumulative-traffic"><header><div><span class="eyebrow">All-lead traffic</span><h3>Cumulative traffic landscape</h3><p>Summed Google search estimates across the complete run.</p></div><span class="cumulative-traffic-coverage">3 of 4 leads covered</span></header>${explorer}</section></div></main>`;
const showcase = `<main><section class="landing-hero"><div class="traffic-market-explorer traffic-showcase-explorer"><section class="traffic-globe-panel landing-traffic-globe-panel"><div class="landing-globe-copy"><span class="eyebrow">Explore our global coverage</span>${links}</div><div class="traffic-globe-stage">${globe}</div></section></div></section></main>`;

async function waitServer() { for (let i = 0; i < 120; i++) { try { if ((await fetch(base)).ok) return; } catch {} await wait(250); } throw new Error("server timeout"); }
async function waitFile(file) { for (let i = 0; i < 100; i++) { try { return await fs.readFile(file, "utf8"); } catch {} await wait(100); } throw new Error("chrome timeout"); }

try {
  await fs.mkdir(out, { recursive: true });
  server = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  let log = ""; server.stdout.on("data", (x) => { log += x; }); server.stderr.on("data", (x) => { log += x; });
  await waitServer();
  chrome = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", `--user-data-dir=${profile}`, "--remote-debugging-port=0", "about:blank"], { stdio: "ignore" });
  const debugPort = (await waitFile(path.join(profile, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const cdp = new Cdp(targets.find((x) => x.type === "page").webSocketDebuggerUrl); await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable"); await cdp.send("Page.navigate", { url: base }); await wait(2500);
  for (const [mode, fixture] of [["showcase", showcase], ["aggregate", aggregate], ["individual", individual]]) for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await evaluate(cdp, `document.querySelectorAll('script').forEach(x=>x.remove());document.body.innerHTML=${JSON.stringify(fixture)}`); await wait(80);
    const result = await evaluate(cdp, `(()=>{const required=[...document.querySelectorAll('h3,h4,h5,p,dt,dd,button,a,.traffic-state')];const fonts=required.map(x=>parseFloat(getComputedStyle(x).fontSize));return{mode:${JSON.stringify(mode)},viewport:${width},bodyOverflow:document.documentElement.scrollWidth>innerWidth,marketButtons:document.querySelectorAll('.traffic-country-links button').length,metricCount:document.querySelectorAll('.traffic-metric-grid>div').length,minimumFont:Math.min(...fonts),unsafeLinks:[...document.querySelectorAll('a[target=_blank]')].filter(x=>x.rel!=='noreferrer').length}})()`);
    checks.scenarios.push(result); if (result.bodyOverflow || result.marketButtons < 9 || result.minimumFont < (mode === "individual" ? 10 : 6) || result.unsafeLinks) throw new Error(JSON.stringify(result));
    const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }); await fs.writeFile(path.join(out, `${mode}-${width}x${height}.png`), Buffer.from(shot.data, "base64"));
  }
  await evaluate(cdp, `(()=>{const buttons=[...document.querySelectorAll('.traffic-country-links button')];buttons.forEach(x=>x.setAttribute('aria-pressed','false'));buttons[8].setAttribute('aria-pressed','true');buttons[8].focus();return true})()`);
  checks.interaction = await evaluate(cdp, `(()=>({selected:document.activeElement.textContent,pressed:document.activeElement.getAttribute('aria-pressed'),unsupportedControls:document.querySelectorAll('[data-unsupported-country]').length}))()`);
  checks.gap = "Protected routes require Neon authentication; deterministic .example DOM uses the real compiled stylesheet, while production markup and interaction contracts are covered by focused tests without an auth bypass.";
  await fs.writeFile(path.join(out, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`); await fs.writeFile(path.join(out, "browser-server.log"), log.replaceAll(root, "<workspace>")); cdp.close();
} finally {
  if (chrome?.exitCode === null) chrome.kill("SIGTERM"); if (server?.exitCode === null) server.kill("SIGTERM"); await wait(400); await fs.rm(profile, { recursive: true, force: true });
}
