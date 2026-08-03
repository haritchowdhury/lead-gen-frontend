import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G8");
const port = 4325;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g8-"));
const checks = {
  fixture: "real compiled CSS with deterministic synthetic .example result-table DOM",
  scenarios: [], interactions: [], states: [], gap: null,
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

const rows = [
  ["The Extremely Long Independent Eyewear and Accessories Store Name", "very-long-store-domain.example", "independent eyewear and accessories", "Direct outreach", "Email", "+3", "#1", "90", "qualified"],
  ["Zero Score Studio", "zero-score.example", "homewares", "Contact page only", "Contact page", "", "#999", "0", "rejected"],
  ["Unnamed store", "Domain unavailable", "Uncategorized", "No outreach method", "No validated channel", "", "—", "—", "failed"],
];
const rowHtml = rows.map((row, index) => `<tr data-row="${index}"><td><div class="store-cell"><span class="store-avatar">${row[0][0]}</span><span><a href="https://${index ? `store-${index}.example` : row[1]}/" target="_blank" rel="noreferrer">${row[0]}<svg></svg></a><small title="${row[1]}">${row[1]}</small>${index === 0 ? '<small class="traffic-compact">Est. Google search 1,248</small>' : ""}</span></div></td><td><span class="category-pill" title="${row[2]}">${row[2]}</span><small class="cell-note">${index === 2 ? "—" : "Independent brand"}</small></td><td><div class="contact-summary"><span class="contact-tier tier-${index ? "none" : "direct"}">${row[3]}</span><span class="channel-list" aria-label="Available channels"><i>${row[4]}</i>${row[5] ? `<i title="Phone, Contact page, Social">${row[5]}</i>` : ""}</span></div></td><td><span class="rank-cell">${row[6]}</span></td><td><div class="score-cell"><span class="score score-${index === 0 ? "high" : index === 1 ? "low" : "empty"}">${row[7]}</span><small>${index === 2 ? "Not scored" : "Evidence rank v2"}</small></div></td><td><span class="status-pill status-${row[8]}"><span></span>${row[8]}</span></td><td><button class="row-toggle" aria-expanded="false" aria-controls="detail-${index}" aria-label="Show details for ${row[0]}"><span>›</span></button></td></tr><tr class="detail-row" id="detail-${index}" hidden><td colspan="7"><div class="lead-expansion-shell"><div class="lead-details"><section class="detail-section"><h3><span>01</span> Lead overview</h3><div class="lead-detail-grid"><div><strong>${row[0]}</strong><p>${row[1]}</p></div><div><strong>Score semantics</strong><p>Deterministic evidence rank.</p></div><div><strong>Outreach evidence</strong><p>Full contact information remains available.</p></div><div><strong>Outcome</strong><p>${row[8]}</p></div></div></section></div></div></td></tr>`).join("");
const fixture = `<main class="run-page"><div class="shell"><section class="results-section"><div class="results-heading"><div><span class="eyebrow">Lead workspace</span><h2>Your store leads</h2><p>Review evidence and focus on qualified prospects.</p></div></div><div class="results-panel"><div class="results-controls" aria-label="Lead results controls"><div class="status-tabs" role="group" aria-label="Filter by lead status"><button class="is-selected">All leads <span>128</span></button><button>Qualified <span>82</span></button><button>Rejected <span>41</span></button><button>Failed <span>5</span></button></div><div class="filter-tools"><label class="search-field"><span class="sr-only">Search leads</span><input type="search" placeholder="Search store, domain, email…"></label><label class="select-field"><span class="sr-only">Sort leads</span><select><option>Lead score · High to low</option><option>Google rank · Best first</option></select></label></div></div><div class="table-wrap" tabindex="0" aria-label="Lead results table; scroll horizontally to view all columns"><table class="results-table"><colgroup><col class="store-column"><col class="category-column"><col class="reachability-column"><col class="rank-column"><col class="score-column"><col class="status-column"><col class="toggle-column"></colgroup><thead><tr><th>Store</th><th>Category</th><th>Reachability</th><th class="numeric-heading">Rank</th><th class="numeric-heading">Score</th><th>Status</th><th><span class="sr-only">Details</span></th></tr></thead><tbody>${rowHtml}</tbody></table></div><div class="pagination"><span>Page 1 of 7</span><div><button disabled>Previous</button><button>Next</button></div></div></div></section></div></main>`;

async function install(cdp) {
  await evaluate(cdp, `document.querySelectorAll('script').forEach((node) => node.remove()); document.body.innerHTML = ${JSON.stringify(fixture)}; (() => { const close = (button) => { button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/^Hide/, 'Show')); button.classList.remove('is-expanded'); button.closest('tr').classList.remove('is-expanded'); button.closest('tr').nextElementSibling.hidden = true; }; for (const button of document.querySelectorAll('.row-toggle')) button.addEventListener('click', () => { const row = button.closest('tr'); const detail = row.nextElementSibling; const open = button.getAttribute('aria-expanded') === 'true'; for (const other of document.querySelectorAll('.row-toggle')) close(other); if (!open) { button.setAttribute('aria-expanded', 'true'); button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/^Show/, 'Hide')); button.classList.add('is-expanded'); row.classList.add('is-expanded'); detail.hidden = false; } }); for (const tab of document.querySelectorAll('.status-tabs button')) tab.addEventListener('click', () => { for (const item of document.querySelectorAll('.status-tabs button')) item.classList.remove('is-selected'); tab.classList.add('is-selected'); for (const button of document.querySelectorAll('.row-toggle')) close(button); }); })()`);
  await wait(100);
}
async function measure(cdp, label) {
  return evaluate(cdp, `(() => { const wrap = document.querySelector('.table-wrap'); const expanded = document.querySelector('.row-toggle[aria-expanded="true"]'); const shell = document.querySelector('.detail-row:not([hidden]) .lead-expansion-shell'); return { label: ${JSON.stringify(label)}, viewport: { width: innerWidth, height: innerHeight }, documentWidth: document.documentElement.scrollWidth, bodyOverflow: document.documentElement.scrollWidth > innerWidth, overflowingElements: [...document.querySelectorAll('body *')].filter((item) => { const box = item.getBoundingClientRect(); return box.right > innerWidth + 1 || box.left < -1; }).slice(0, 8).map((item) => ({ tag: item.tagName, className: item.className?.baseVal ?? item.className, left: Math.round(item.getBoundingClientRect().left), right: Math.round(item.getBoundingClientRect().right) })), tableScrollable: wrap.scrollWidth > wrap.clientWidth, tableViewportWidth: Math.round(wrap.clientWidth), tableContentWidth: Math.round(wrap.scrollWidth), expanded: expanded?.getAttribute('aria-expanded') ?? 'false', expandedLabel: expanded?.getAttribute('aria-label') ?? null, shellWidth: shell ? Math.round(shell.getBoundingClientRect().width) : null, selectedTab: document.querySelector('.status-tabs .is-selected')?.textContent.trim() ?? null, focusedLabel: document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent?.trim() ?? null, visibleHeadings: [...document.querySelectorAll('.results-table th')].map((item) => item.textContent.trim()).filter(Boolean), minimumEssentialFont: Math.min(...[...document.querySelectorAll('.results-table th, .store-cell a, .store-cell small, .category-pill, .cell-note, .contact-tier, .channel-list i, .rank-cell, .score, .score-cell small, .status-pill')].map((item) => Number.parseFloat(getComputedStyle(item).fontSize))) }; })()`);
}
async function capture(cdp, width, height, expanded) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await install(cdp);
  if (!(await evaluate(cdp, "Boolean(document.querySelector('.table-wrap'))"))) await install(cdp);
  if (expanded) await evaluate(cdp, "document.querySelector('.row-toggle').click()");
  const result = await measure(cdp, `${expanded ? "expanded" : "collapsed"}-${width}`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${expanded ? "expanded" : "collapsed"}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push(result);
  if (result.bodyOverflow || result.minimumEssentialFont < 10 || result.visibleHeadings.length !== 7) throw new Error(`G8 layout failed: ${JSON.stringify(result)}`);
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
  await cdp.send("Page.navigate", { url: baseUrl }); await wait(3_000);
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) {
    await capture(cdp, width, height, false);
    await capture(cdp, width, height, true);
  }
  await install(cdp);
  await evaluate(cdp, "document.querySelector('.row-toggle').focus(); document.querySelector('.row-toggle').click()");
  checks.interactions.push(await measure(cdp, "open-first-with-keyboard-target"));
  await evaluate(cdp, "document.querySelector('.row-toggle').click()");
  checks.interactions.push(await measure(cdp, "close-first"));
  await evaluate(cdp, "document.querySelectorAll('.row-toggle')[1].click()");
  checks.interactions.push(await measure(cdp, "open-another"));
  await evaluate(cdp, "document.querySelectorAll('.status-tabs button')[1].click()");
  checks.interactions.push(await measure(cdp, "filter-clears-expanded"));
  await install(cdp);
  await evaluate(cdp, "const wrap = document.querySelector('.table-wrap'); wrap.scrollLeft = wrap.scrollWidth; wrap.focus()");
  checks.interactions.push(await measure(cdp, "narrow-horizontal-scroll"));
  for (const state of ["loading", "empty"]) {
    await install(cdp);
    await evaluate(cdp, state === "loading" ? "document.querySelector('.table-wrap').outerHTML = '<div class=\"table-skeleton\" role=\"status\" aria-label=\"Loading leads\"><span></span><span></span><span></span></div>'" : "document.querySelector('.table-wrap').outerHTML = '<div class=\"empty-results\"><span class=\"empty-icon\"><span></span></span><h3>No leads match these filters</h3><p>Try a broader search.</p></div>'");
    checks.states.push({ state, bodyOverflow: await evaluate(cdp, "document.documentElement.scrollWidth > innerWidth") });
  }
  checks.gap = "Protected run routes require Neon authentication, so browser composition uses deterministic .example DOM against the real compiled G8 stylesheet; focused source and render tests verify unchanged production behavior without an auth bypass.";
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
