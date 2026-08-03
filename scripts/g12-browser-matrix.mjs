import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "review-evidence/design-system/G12");
const port = 4332;
const base = `http://127.0.0.1:${port}`;
const profile = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g12-"));
const widths = [[390, 844], [768, 1024], [1024, 768], [1280, 800], [1440, 900]];
const checks = { fixture: "real public route plus compiled-CSS synthetic complete interaction path", scenarios: [], keyboard: null, reducedMotion: null, forcedColors: null, gaps: [] };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let server; let chrome;

class Cdp {
  constructor(url) { this.ws = new WebSocket(url); this.id = 0; this.pending = new Map(); }
  async open() { await new Promise((resolve, reject) => { this.ws.onopen = resolve; this.ws.onerror = reject; }); this.ws.onmessage = ({ data }) => { const message = JSON.parse(String(data)); const pending = this.pending.get(message.id); if (!pending) return; this.pending.delete(message.id); if (message.error) pending.reject(new Error(message.error.message)); else pending.resolve(message.result); }; }
  send(method, params = {}) { const id = ++this.id; this.ws.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject })); }
  close() { this.ws.close(); }
}
async function evaluate(cdp, expression) { const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
async function waitServer() { for (let i = 0; i < 120; i++) { try { if ((await fetch(base)).ok) return; } catch {} await wait(250); } throw new Error("server timeout"); }
async function waitFile(file) { for (let i = 0; i < 100; i++) { try { return await fs.readFile(file, "utf8"); } catch {} await wait(100); } throw new Error("chrome timeout"); }

const countries = ["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Germany", "France", "India", "United Arab Emirates"];
const countryButtons = countries.map((name, index) => `<button type="button" aria-pressed="${index === 0}">${name}<span>(${index})</span></button>`).join("");
const fixture = `<main class="run-page"><div class="shell"><section class="results-section"><header class="results-heading"><div><span class="eyebrow">Complete path</span><h2>Lead evidence workspace</h2><p>Deterministic long-content and zero-state regression fixture.</p></div><button class="ds-button ds-button--secondary">Export CSV</button></header><div class="results-panel"><div class="results-controls"><div class="status-tabs"><button class="is-selected">All leads <span>3</span></button><button>Qualified <span>1</span></button></div><div class="filter-tools"><label class="search-field"><span class="sr-only">Search leads</span><input type="search" placeholder="Search store, domain, email…"></label><label class="select-field"><span class="sr-only">Sort leads</span><select><option>Lead score · High to low</option></select></label></div></div><div class="table-wrap" tabindex="0" aria-label="Lead results table; scroll horizontally to view all columns"><table class="results-table"><tbody><tr><td><a href="https://long-storefront.example/" target="_blank" rel="noreferrer">A deliberately long independent storefront identity</a></td><td><span class="score">0</span></td><td><span class="status-pill status-qualified"><span></span>qualified</span></td><td><button class="row-toggle" aria-expanded="true">Details</button></td></tr><tr class="detail-row"><td colspan="4"><div class="lead-expansion-shell"><div class="lead-details"><section class="detail-section lead-overview"><h3><span>01</span>Lead overview</h3><details open><summary>Contact evidence (1)</summary><p class="detail-copy">Long source value https://contact-evidence.example/a/very/long/path/that/must/wrap</p></details></section><section class="detail-section traffic-details"><h3><span>02</span>Traffic and site experience</h3><div class="traffic-market-explorer"><section class="traffic-market-data"><header><h5>Worldwide</h5><button class="traffic-overall-button">View overall</button></header><dl class="fact-grid traffic-metric-grid"><div><dt>Estimated Google search traffic</dt><dd>0</dd></div><div><dt>Organic ranking footprint</dt><dd>Unavailable</dd></div></dl></section><section class="traffic-globe-panel"><div class="traffic-country-nav"><h5>Explore by country</h5><div class="traffic-country-links">${countryButtons}</div></div><svg class="traffic-globe" viewBox="0 0 320 320" aria-label="Interactive globe"><path class="traffic-globe-markets" role="button" tabindex="0" aria-label="Show traffic for United States" d="M80 130h45v35H80Z"/></svg><p class="traffic-globe-instruction">Drag to rotate · Select highlighted markets</p></section></div></section><section class="detail-section store-evidence-section"><h3><span>03</span>Store fit</h3><details open><summary>Store-fit evidence (1)</summary><dl class="fact-grid"><div><dt>State</dt><dd>Partial</dd></div></dl></details></section><section class="detail-section discovery-details-section"><h3><span>04</span>Discovery provenance</h3><details open><summary>Discovery occurrences (1)</summary><p class="detail-copy">Representative rank: 0</p></details></section></div></div></td></tr></tbody></table></div><div class="pagination"><span>Page 1 of 1</span><button disabled>Previous</button><button>Next</button></div></div></section></div></main>`;

async function capture(cdp, name, width, height, setup = "") {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  if (setup) await evaluate(cdp, setup);
  await wait(80);
  const result = await evaluate(cdp, `(()=>{const essential=[...document.querySelectorAll('h1,h2,h3,h4,h5,p,summary,button,a,input,select,dt,dd,.status-pill')].filter(x=>getComputedStyle(x).display!=='none');const fonts=essential.map(x=>parseFloat(getComputedStyle(x).fontSize));const targets=[...document.querySelectorAll('.traffic-country-links button')].map(x=>Math.round(x.getBoundingClientRect().height));return{name:${JSON.stringify(name)},viewport:{width:innerWidth,height:innerHeight},bodyOverflow:document.documentElement.scrollWidth>innerWidth,minimumEssentialFont:Math.min(...fonts),undersized:essential.filter(x=>parseFloat(getComputedStyle(x).fontSize)<10).map(x=>({tag:x.tagName,className:x.className,text:x.textContent.trim().slice(0,40),font:getComputedStyle(x).fontSize})).slice(0,10),countryTargets:targets,unsafeLinks:[...document.querySelectorAll('a[target=_blank]')].filter(x=>!x.rel.split(/\\s+/).includes('noreferrer')).length,openDisclosures:[...document.querySelectorAll('details')].filter(x=>x.open).length}})()`);
  if (result.bodyOverflow || result.minimumEssentialFont < 10 || result.countryTargets.some((height) => height < 44) || result.unsafeLinks) throw new Error(JSON.stringify(result));
  checks.scenarios.push(result);
  const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(out, `${name}-${width}x${height}.png`), Buffer.from(shot.data, "base64"));
}

try {
  await fs.mkdir(out, { recursive: true });
  server = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  let log = ""; server.stdout.on("data", (x) => { log += x; }); server.stderr.on("data", (x) => { log += x; }); await waitServer();
  chrome = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", `--user-data-dir=${profile}`, "--remote-debugging-port=0", "about:blank"], { stdio: "ignore" });
  const debugPort = (await waitFile(path.join(profile, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json(); const cdp = new Cdp(targets.find((x) => x.type === "page").webSocketDebuggerUrl); await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable"); await cdp.send("Page.navigate", { url: base }); await wait(2500);
  for (const [width, height] of widths) await capture(cdp, "landing", width, height);
  await evaluate(cdp, `document.querySelectorAll('script').forEach(x=>x.remove());document.body.innerHTML=${JSON.stringify(fixture)}`);
  for (const [width, height] of widths) await capture(cdp, "complete-path", width, height);
  await evaluate(cdp, "document.activeElement?.blur(); document.body.tabIndex = -1; document.body.focus()");
  const tabOrder = [];
  for (let index = 0; index < 23; index += 1) {
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    tabOrder.push(await evaluate(cdp, `(()=>{const x=document.activeElement;const style=getComputedStyle(x);return{tag:x.tagName,label:(x.getAttribute('aria-label')||x.textContent||x.getAttribute('placeholder')||'').trim().slice(0,60),outline:style.outlineWidth,boxShadow:style.boxShadow}})()`));
  }
  checks.keyboard = { count: tabOrder.length, order: tabOrder, globeIncluded: tabOrder.some((item) => item.label === "Show traffic for United States"), visibleFocusCount: tabOrder.filter((item) => item.outline !== "0px" || item.boxShadow !== "none").length };
  if (!checks.keyboard.globeIncluded || checks.keyboard.visibleFocusCount < 20) throw new Error(JSON.stringify(checks.keyboard));
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  checks.reducedMotion = await evaluate(cdp, `(()=>{const nodes=[...document.querySelectorAll('*')];return{matches:matchMedia('(prefers-reduced-motion: reduce)').matches,maxAnimation:Math.max(...nodes.map(x=>parseFloat(getComputedStyle(x).animationDuration)||0)),maxTransition:Math.max(...nodes.map(x=>parseFloat(getComputedStyle(x).transitionDuration)||0))}})()`);
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "forced-colors", value: "active" }] });
  checks.forcedColors = await evaluate(cdp, `(()=>{const state=document.querySelector('.status-pill');const market=document.querySelector('.traffic-country-links button');return{matches:matchMedia('(forced-colors: active)').matches,stateBorder:getComputedStyle(state).borderStyle,marketBorder:getComputedStyle(market).borderStyle}})()`);
  checks.gaps.push("Protected routes still require Neon authentication; the complete-path fixture uses deterministic .example DOM with compiled production CSS and production source/render tests, without an authentication bypass.");
  checks.gaps.push("Browser zoom was approximated through the 390px reflow target; browser UI zoom itself was not automated.");
  await fs.writeFile(path.join(out, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`); await fs.writeFile(path.join(out, "browser-server.log"), log.replaceAll(root, "<workspace>")); cdp.close();
} finally { if (chrome?.exitCode === null) chrome.kill("SIGTERM"); if (server?.exitCode === null) server.kill("SIGTERM"); await wait(400); await fs.rm(profile, { recursive: true, force: true }); }
