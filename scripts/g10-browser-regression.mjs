import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G10");
const port = 4327;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g10-"));
const checks = { fixture: "real compiled CSS with deterministic synthetic .example G10 DOM", scenarios: [], interactions: [], gap: null };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let nextProcess;
let chromeProcess;

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try { if ((await fetch(baseUrl)).ok) return; } catch {}
    await wait(250);
  }
  throw new Error("Next.js development server did not become ready");
}

async function waitForFile(file) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { return await fs.readFile(file, "utf8"); } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${file}`);
}

class Cdp {
  constructor(url) { this.socket = new WebSocket(url); this.id = 1; this.pending = new Map(); }
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
    const id = this.id++;
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

const longToken = (index) => `independent-hand-finished-category-token-${index}-${"long-vocabulary-".repeat(3)}`;
const tokens = Array.from({ length: 18 }, (_, index) => `<span>${longToken(index + 1)}</span>`).join("");
const tokenDisclosure = `<div class="token-fact"><dt>Category vocabulary</dt><dd><details class="token-disclosure" open><summary><span>18 recorded</span><strong>View vocabulary</strong></summary><span class="token-values">${tokens}</span></details></dd></div>`;
const facts = `<div><dt>Exact category input</dt><dd>Independent eyewear and accessories brand</dd></div><div><dt>Normalized category</dt><dd>eyewear and accessories</dd></div><div><dt>Business qualifier</dt><dd>Brand</dd></div><div><dt>Reason</dt><dd>Category dominant independent assortment signals</dd></div>${tokenDisclosure}<div><dt>Matched terms</dt><dd class="tag-list">${tokens}</dd></div><div><dt>Signal kinds</dt><dd class="tag-list"><span>Category collection assortment</span></dd></div>`;
const page = (record, pageIndex) => `<li class="store-fit-page"><header class="evidence-row-header"><strong>Collection page</strong><span>Strength ${65 + pageIndex}/100</span></header><dl class="fact-grid"><div><dt>Usable text length</dt><dd>18,400</dd></div><div><dt>Matched terms</dt><dd class="tag-list"><span>${longToken(pageIndex + 1)}</span></dd></div><div><dt>Claim terms</dt><dd class="tag-list"><span>Independent design claim</span></dd></div><div><dt>Signals</dt><dd class="tag-list"><span>Collection assortment</span></dd></div><div><dt>Breadth terms</dt><dd class="tag-list"><span>Frames and accessories</span></dd></div><div><dt>Negative signals</dt><dd class="tag-list"><span>No negative signals observed</span></dd></div></dl><footer class="evidence-row-source"><a href="https://store-fit-page-${record}-${pageIndex}.example/${"very-long-source-path-".repeat(4)}" target="_blank" rel="noreferrer">Evidence source<svg></svg></a></footer></li>`;
const storeFit = Array.from({ length: 3 }, (_, record) => `<li class="store-fit-record"><header class="evidence-row-header"><span class="evidence-row-title"><strong>Independent eyewear and accessories brand ${record + 1}</strong><span>Specialist</span></span><span class="evidence-row-status">Accepted category match · ${92 - record}/100</span></header><dl class="fact-grid">${facts}</dl><footer class="evidence-row-source"><a href="https://store-fit-source-${record + 1}.example/${"very-long-source-path-".repeat(4)}" target="_blank" rel="noreferrer">Evidence source<svg></svg></a></footer><details class="nested-evidence" open><summary>Breadth evidence (1)</summary><ul class="subordinate-ledger breadth-ledger"><li><header class="evidence-row-header"><strong>Catalog breadth</strong></header><dl class="fact-grid"><div><dt>Terms</dt><dd class="tag-list"><span>Frames</span><span>Accessories</span></dd></div></dl><footer class="evidence-row-source"><a href="https://breadth-${record + 1}.example/" target="_blank" rel="noreferrer">Evidence source<svg></svg></a></footer></li></ul></details><details class="nested-evidence" open><summary>Page-level store-fit evidence (3)</summary><ul class="subordinate-ledger store-fit-page-ledger">${Array.from({ length: 3 }, (_, index) => page(record + 1, index + 1)).join("")}</ul></details></li>`).join("");
const occurrence = (index) => `<li class="occurrence-record"><header class="evidence-row-header"><span class="evidence-row-title"><strong>site:myshopify.com/products ${"very-long-query-phrase-".repeat(4)}${index}</strong><span>Concrete product phrase for an independent brand.</span></span><span class="evidence-row-status">Rank ${index}</span></header><dl class="fact-grid"><div><dt>Exact category input</dt><dd>Independent eyewear brand</dd></div><div><dt>Normalized category</dt><dd>eyewear</dd></div><div><dt>Business qualifier</dt><dd>Brand</dd></div><div><dt>Query-generation reason</dt><dd>Concrete product phrase for an independent brand.</dd></div><div><dt>Rank</dt><dd>${index}</dd></div><div><dt>Query score</dt><dd>82.29</dd></div><div><dt>MyShopify domain</dt><dd>dense-fixture.myshopify.com</dd></div>${tokenDisclosure}</dl><footer class="detail-links evidence-row-source"><a href="https://research-${index}.example/" target="_blank" rel="noreferrer">Query source<svg></svg></a><a href="https://dense-fixture.myshopify.com/products/${"long-product-".repeat(5)}${index}" target="_blank" rel="noreferrer">Requested search-result URL<svg></svg></a><a href="https://resolved-store.example/products/${"long-product-".repeat(5)}${index}" target="_blank" rel="noreferrer">Resolved result URL<svg></svg></a></footer></li>`;
const fixture = `<main class="run-page"><div class="shell"><section class="results-section"><div class="results-panel"><div class="table-wrap"><table class="results-table"><tbody><tr class="is-expanded"><td colspan="7"><div class="lead-expansion-shell"><div class="lead-details"><section class="detail-section store-evidence-section"><h3><span>03</span>Category and store fit</h3><dl class="fact-grid"><div><dt>Exact category input</dt><dd>Independent eyewear and accessories brand</dd></div><div><dt>Normalized category</dt><dd>eyewear and accessories</dd></div><div><dt>Business qualifier</dt><dd>Brand</dd></div><div><dt>Store fit</dt><dd>Specialist</dd></div><div><dt>Shopify confidence</dt><dd>100/100</dd></div><div><dt>Category evidence score</dt><dd>92/100</dd></div></dl><details class="nested-evidence evidence-ledger store-fit-ledger" open><summary>Structured store-fit evidence (3)</summary><ul class="provenance-list evidence-ledger-list">${storeFit}</ul></details><details class="nested-evidence category-intent-ledger" open><summary>Accepted matched category intents (1)</summary><ul><li><header class="evidence-row-header"><strong>Independent eyewear and accessories brand</strong></header><dl class="fact-grid"><div><dt>Normalized category</dt><dd>eyewear and accessories</dd></div><div><dt>Business qualifier</dt><dd>Brand</dd></div>${tokenDisclosure}</dl></li></ul></details></section><section class="detail-section discovery-details-section"><h3><span>04</span>Discovery provenance</h3><dl class="fact-grid"><div><dt>Search query</dt><dd>site:myshopify.com/products independent frames</dd></div><div><dt>Query-generation reason</dt><dd>Concrete product phrase.</dd></div><div><dt>Query score</dt><dd>82.29</dd></div><div><dt>Representative rank</dt><dd>1</dd></div></dl><details class="nested-evidence evidence-ledger occurrence-ledger" open><summary>Discovery occurrences (4)</summary><ol class="provenance-list occurrence-list evidence-ledger-list">${Array.from({ length: 4 }, (_, index) => occurrence(index + 1)).join("")}</ol></details><div class="detail-links"><a href="https://representative.example/result" target="_blank" rel="noreferrer">Representative requested result URL<svg></svg></a></div></section></div></div></td></tr></tbody></table></div></div></section></div></main>`;

async function install(cdp) {
  await evaluate(cdp, `document.querySelectorAll('script').forEach((node) => node.remove()); document.body.innerHTML = ${JSON.stringify(fixture)}`);
  await wait(80);
}

async function measure(cdp, label) {
  return evaluate(cdp, `(() => { const scope = document.querySelector('.lead-details'); const required = [...scope.querySelectorAll('h3, summary, dt, dd, .evidence-row-header strong, .evidence-row-header span, .evidence-row-source a, .token-values span')]; const fonts = required.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)); const rect = scope.getBoundingClientRect(); return { label: ${JSON.stringify(label)}, viewport: { width: innerWidth, height: innerHeight }, documentWidth: document.documentElement.scrollWidth, bodyOverflow: document.documentElement.scrollWidth > innerWidth, detailsWidth: Math.round(rect.width), detailsOpen: [...scope.querySelectorAll('details')].every((item) => item.open), disclosureCount: scope.querySelectorAll('details').length, storeFitCount: scope.querySelectorAll('.store-fit-record').length, pageCount: scope.querySelectorAll('.store-fit-page').length, occurrenceCount: scope.querySelectorAll('.occurrence-record').length, tokenCount: scope.querySelectorAll('.token-values > span').length, minimumEssentialFont: Math.min(...fonts), undersized: required.filter((node) => Number.parseFloat(getComputedStyle(node).fontSize) < 10).slice(0, 10).map((node) => ({ tag: node.tagName, text: node.textContent.slice(0, 40), font: getComputedStyle(node).fontSize })), focusTag: document.activeElement?.tagName ?? null, focusText: document.activeElement?.textContent?.trim().slice(0, 80) ?? null }; })()`);
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
  const cdp = new Cdp(targets.find((item) => item.type === "page").webSocketDebuggerUrl);
  await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Page.navigate", { url: baseUrl }); await wait(3_000);
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await install(cdp);
    const result = await measure(cdp, `all-open-${width}`);
    checks.scenarios.push(result);
    const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await fs.writeFile(path.join(outputDir, `all-open-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
    if (result.bodyOverflow || !result.detailsOpen || result.minimumEssentialFont < 10 || result.storeFitCount !== 3 || result.pageCount !== 9 || result.occurrenceCount !== 4) throw new Error(`G10 layout failed: ${JSON.stringify(result)}`);
  }
  await install(cdp);
  await evaluate(cdp, `(() => { const summary = document.querySelector('.occurrence-ledger > summary'); summary.focus(); summary.click(); summary.click(); })()`);
  checks.interactions.push(await measure(cdp, "occurrence-keyboard-focus-reopen"));
  checks.gap = "Protected run routes require Neon authentication, so browser composition uses deterministic .example DOM against the real compiled G10 stylesheet; focused server-render tests verify production markup, field retention, order, and safe links without an auth bypass.";
  cdp.close();
  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.exitCode === null) chromeProcess.kill("SIGTERM");
  if (nextProcess?.exitCode === null) nextProcess.kill("SIGTERM");
  await wait(500);
  await fs.rm(tempDir, { recursive: true, force: true });
}
