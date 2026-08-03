import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G9");
const port = 4326;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g9-"));
const checks = { fixture: "real compiled CSS with deterministic synthetic .example G9 DOM", scenarios: [], interactions: [], gap: null };
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

const facts = [["MyShopify domain", "very-long-independent-store.myshopify.com"], ["Resolved domain", "resolved-storefront.example"], ["Identity confidence", "100/100"], ["Evidence confidence", "98/100"], ["Resolution method", "Observed myshopify host"], ["Merged occurrences", "4"], ["Canonical verification", "Verified equivalent"], ["Canonical reason", "Canonical matches observed host"]].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
const decision = [["Decision", "Accepted"], ["Route accepted", "Yes"], ["Route reason", "Contact route"], ["Same store", "Yes"], ["HTTP usable", "Yes"], ["Page usable", "Yes"], ["Validation reason", "Validated contact page"]].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
const items = Array.from({ length: 8 }, (_, index) => `<li class="contact-evidence-item"><header class="contact-evidence-item-header"><span>${index === 2 ? "Contact page" : "Email"}</span><strong>${index === 2 ? `https://resolved-storefront.example/pages/${"very-long-contact-path-".repeat(5)}` : `partnerships-${index + 1}@very-long-store-domain-${index + 1}.example`}</strong></header><p class="contact-evidence-meta">${index === 2 ? "Contact page decision v2" : "Mailto"} · confidence ${96 - index}/100 · Same store contact page</p>${index === 2 ? `<dl class="fact-grid contact-decision-grid">${decision}<div><dt>Positive signals</dt><dd class="tag-list"><span>Contact form</span></dd></div></dl>` : ""}<footer class="contact-evidence-source"><a href="https://source-${index + 1}.example/pages/contact" target="_blank" rel="noreferrer">Evidence source<svg></svg></a></footer></li>`).join("");
const fixture = `<main class="run-page"><div class="shell"><section class="results-section"><div class="results-panel"><div class="table-wrap"><table class="results-table"><tbody><tr class="is-expanded"><td colspan="7"><div class="lead-expansion-shell"><div class="lead-details"><section class="detail-section detail-section-emphasis lead-overview"><h3><span>01</span>Lead overview</h3><details class="outcome-badge"><summary><span>Outcome</span><strong>Qualified</strong></summary><div class="outcome-badge-popover"><dl class="fact-grid"><div><dt>Status</dt><dd>Qualified</dd></div></dl><p class="detail-copy preserve-text">Synthetic outcome note for the expanded lead.</p></div></details><div class="lead-overview-grid"><div class="lead-overview-primary"><section class="lead-overview-panel overview-identity"><h4>Store identity</h4><dl class="fact-grid">${facts}</dl><div class="detail-links"><a id="resolved-link" href="https://resolved-storefront.example/" target="_blank" rel="noreferrer">Resolved storefront<svg></svg></a></div></section><section class="lead-overview-panel overview-score"><h4>Score semantics</h4><p class="detail-score score-high"><strong>90</strong><span>Evidence rank v2</span></p><p class="detail-copy">Deterministic evidence rank, not a probability.</p><dl class="fact-grid score-components"><div><dt>Store identity</dt><dd>+20</dd></div><div><dt>Contact evidence</dt><dd>+15</dd></div><div><dt>Total</dt><dd>90</dd></div></dl><small class="version-note">Pipeline 2 · Scoring 2 · Evidence rank v2</small></section></div><section class="lead-overview-panel overview-outreach"><h4>Outreach evidence</h4><p class="detail-callout"><strong>Direct outreach</strong><span>Direct</span></p><ul class="outreach-channel-list"><li><span>Email</span><strong><a href="mailto:hello%40resolved-storefront.example">hello@resolved-storefront.example</a></strong><a href="https://source.example/contact" target="_blank" rel="noreferrer">Source<svg></svg></a></li><li><span>Contact page</span><strong><a href="https://resolved-storefront.example/pages/contact">https://resolved-storefront.example/pages/contact</a></strong><a href="https://source.example/contact" target="_blank" rel="noreferrer">Source<svg></svg></a></li></ul><details class="nested-evidence contact-evidence-disclosure"><summary><span>Contact evidence details</span><strong>8 records</strong></summary><ul class="contact-evidence-list">${items}</ul></details></section></div></section></div></div></td></tr></tbody></table></div></div></section></div></main>`;

async function install(cdp) {
  await evaluate(cdp, `document.querySelectorAll('script').forEach((node) => node.remove()); document.body.innerHTML = ${JSON.stringify(fixture)}`);
  await wait(80);
}
async function measure(cdp, label) {
  return evaluate(cdp, `(() => { const overview = document.querySelector('.lead-overview'); const contact = document.querySelector('.contact-evidence-disclosure'); const outcome = document.querySelector('.outcome-badge'); const link = document.querySelector('#resolved-link'); const fontNodes = [...document.querySelectorAll('.lead-overview h3, .lead-overview h4, .lead-overview dt, .lead-overview dd, .outreach-channel-list span, .outreach-channel-list strong, .contact-evidence-item-header span, .contact-evidence-item-header strong, .contact-evidence-meta, .contact-evidence-source a')]; const fonts = fontNodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)); return { label: ${JSON.stringify(label)}, viewport: { width: innerWidth, height: innerHeight }, documentWidth: document.documentElement.scrollWidth, bodyOverflow: document.documentElement.scrollWidth > innerWidth, overviewWidth: Math.round(overview.getBoundingClientRect().width), contactWidth: Math.round(contact.getBoundingClientRect().width), contactOpen: contact.open, outcomeOpen: outcome.open, focusClass: document.activeElement?.className ?? null, focusTag: document.activeElement?.tagName ?? null, resolvedHref: link.href, resolvedTarget: link.target, resolvedRel: link.rel, minimumEssentialFont: Math.min(...fonts), undersized: fontNodes.filter((node) => Number.parseFloat(getComputedStyle(node).fontSize) < 10).slice(0, 8).map((node) => ({ tag: node.tagName, className: node.className, text: node.textContent.slice(0, 40), font: getComputedStyle(node).fontSize })), evidenceCount: document.querySelectorAll('.contact-evidence-item').length }; })()`);
}
async function capture(cdp, width, height, open) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await install(cdp);
  if (open) await evaluate(cdp, "document.querySelector('.contact-evidence-disclosure').open = true");
  const result = await measure(cdp, `${open ? "contact-open" : "overview"}-${width}`);
  checks.scenarios.push(result);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${open ? "contact-open" : "overview"}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  if (result.bodyOverflow || result.minimumEssentialFont < 10 || result.evidenceCount !== 8 || result.resolvedHref !== "https://resolved-storefront.example/") throw new Error(`G9 layout failed: ${JSON.stringify(result)}`);
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
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Page.navigate", { url: baseUrl }); await wait(3_000);
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) {
    await capture(cdp, width, height, false);
    await capture(cdp, width, height, true);
  }
  await install(cdp);
  await evaluate(cdp, "document.querySelector('.outcome-badge > summary').focus(); document.querySelector('.outcome-badge').open = true");
  checks.interactions.push(await measure(cdp, "outcome-keyboard-focus-open"));
  await evaluate(cdp, "document.querySelector('.contact-evidence-disclosure > summary').focus(); document.querySelector('.contact-evidence-disclosure').open = true");
  checks.interactions.push(await measure(cdp, "contact-keyboard-focus-open"));
  checks.gap = "Protected run routes require Neon authentication, so browser composition uses deterministic .example DOM against the real compiled G9 stylesheet; focused server-render tests verify production markup and links without an auth bypass.";
  cdp.close();
  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.exitCode === null) chromeProcess.kill("SIGTERM");
  if (nextProcess?.exitCode === null) nextProcess.kill("SIGTERM");
  await wait(500);
  await fs.rm(tempDir, { recursive: true, force: true });
}
