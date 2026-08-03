import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G4");
const port = 4321;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g4-"));
const checks = { fixture: "real landing plus compiled-CSS synthetic .example query review", scenarios: [], interactions: [], gaps: [] };
let nextProcess;
let chromeProcess;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const waitForExit = (child) => new Promise((resolve) => child.once("exit", resolve));
async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { if ((await fetch(baseUrl)).ok) return; } catch {}
    await wait(250);
  }
  throw new Error("Next.js development server did not become ready");
}
async function waitForFile(filename) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { return await fs.readFile(filename, "utf8"); } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${filename}`);
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
      if (!message.id) return;
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
async function navigate(cdp, pathname) {
  await cdp.send("Page.navigate", { url: `${baseUrl}${pathname}` });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(cdp, "document.readyState") === "complete") break;
    await wait(100);
  }
  await wait(700);
}
async function capture(cdp, name, width, height, setup = "") {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  if (setup) await evaluate(cdp, setup);
  await wait(250);
  const metrics = await evaluate(cdp, `(() => {
    const rect = (selector) => { const node = document.querySelector(selector); if (!node) return null; const box = node.getBoundingClientRect(); return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) }; };
    return {
      url: location.pathname,
      viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      bodyOverflow: document.documentElement.scrollWidth > innerWidth,
      hero: rect('.landing-hero'), globe: rect('.traffic-globe'), form: rect('.run-form-card'),
      categoryValue: document.querySelector('#shop-types')?.value ?? null,
      categoryCount: document.querySelector('.category-count')?.textContent.trim() ?? null,
      suggestionCount: document.querySelectorAll('.suggestion-chip').length,
      button: { text: document.querySelector('.form-footer .button-primary')?.textContent.trim() ?? null, disabled: document.querySelector('.form-footer .button-primary')?.disabled ?? null },
      alert: document.querySelector('[role="alert"]')?.textContent.trim() ?? null,
      selectedCountry: document.querySelector('.traffic-country-links button[aria-pressed="true"]')?.getAttribute('aria-label') ?? null,
      queryValues: [...document.querySelectorAll('.query-row input')].map((item) => item.value),
      visibleMetrics: [...document.querySelectorAll('.traffic-market-data, .traffic-metric-grid')].some((item) => item.getBoundingClientRect().height > 0)
    };
  })()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push({ name, ...metrics });
  if (metrics.bodyOverflow) throw new Error(`${name} overflows at ${width}px`);
  if (metrics.globe && metrics.globe.width < Math.min(300, width - 30)) throw new Error(`${name} globe lost prominence at ${width}px`);
  if (name.startsWith("landing") && metrics.suggestionCount !== 9) throw new Error("Landing suggestions changed");
  if (metrics.visibleMetrics) throw new Error(`${name} exposed fabricated showcase metrics`);
}

const queryFixture = `(() => {
  document.querySelector('.landing-hero').classList.add('query-review-hero');
  document.querySelector('.hero-copy').classList.remove('is-start');
  document.querySelector('.hero-copy').classList.add('is-review');
  document.querySelector('.health-chip').innerHTML = '<span class="health-dot"></span> Search plan ready';
  document.querySelector('.hero-kicker').textContent = 'One quick review';
  document.querySelector('.hero-message h1').innerHTML = 'Make sure we are looking in the <span class="accent-underline">right places.</span>';
  document.querySelector('.hero-intro').textContent = 'We turned your categories into focused searches designed to uncover relevant Shopify stores. Shape the plan, then begin when the direction feels right.';
  document.querySelector('.value-list').innerHTML = '<span>✓ Adjust any search</span><span>✓ Add another angle</span><span>✓ Start only when it feels right</span>';
  document.querySelector('.landing-globe-copy .eyebrow').textContent = 'Your market is bigger than one location';
  const form = document.querySelector('.run-form-card');
  form.outerHTML = '<section id="query-review" class="run-form-card query-editor-card ds-card"><div class="form-heading-row query-editor-heading"><div><span class="eyebrow">Query review · revision 4</span><h2>Review your searches</h2></div><span class="step-badge">02</span></div><div class="inline-error ds-notice ds-notice--danger" role="alert">Every category needs at least one correctly formatted query.</div><div class="query-category"><div class="field-label query-category-heading"><h3>Intentionally long sustainable independent home and lifestyle stores</h3><span>3/20 queries</span></div><div class="query-list-wrap"><div class="query-row"><div class="query-row-main"><input class="ds-field-control" aria-label="Query 1" value="site:myshopify.com/products intentionally long sustainable home collection"><div class="query-meta"><span class="query-badge source-generated">generated</span><span>Score 88</span></div></div><div class="query-actions"><button>↑</button><button>↓</button><button>Delete</button></div></div><div class="query-row"><div class="query-row-main"><input class="ds-field-control" aria-label="Query 2" value="site:myshopify.com/products artisan homewares with a deliberately long phrase"><div class="query-meta"><span class="query-badge source-user_edited">user edited</span><span>Unsaved</span></div></div><div class="query-actions"><button>↑</button><button>↓</button><button>Delete</button></div></div><div class="query-row"><div class="query-row-main"><input class="ds-field-control" aria-label="Query 3" value="invalid query"><p class="query-error">Use site:myshopify.com/products followed by a product phrase.</p></div><div class="query-actions"><button>↑</button><button>↓</button><button>Delete</button></div></div><button class="suggestion-chip query-add-button"><svg></svg>Add query</button></div><p class="field-help">Edit the product phrase while keeping the Shopify search prefix.</p></div><div class="form-footer query-editor-footer"><div><button>Restore deleted generated query</button><span>Unsaved changes</span></div><div><button class="button button-secondary ds-button ds-button--secondary">Saving…</button><button class="button button-primary ds-button ds-button--primary" disabled>Find my stores</button></div></div></section>';
})()`;

try {
  await fs.mkdir(outputDir, { recursive: true });
  nextProcess = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let serverLog = "";
  nextProcess.stdout.on("data", (chunk) => { serverLog += chunk; });
  nextProcess.stderr.on("data", (chunk) => { serverLog += chunk; });
  await waitForServer();
  chromeProcess = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank"], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open(); await cdp.send("Page.enable"); await cdp.send("Runtime.enable");

  await navigate(cdp, "/");
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) await capture(cdp, "landing", width, height);
  await evaluate(cdp, "document.querySelector('#start-discovery').requestSubmit()");
  await wait(100);
  await capture(cdp, "landing-empty-error", 390, 844);
  await navigate(cdp, "/");
  await evaluate(cdp, `(() => { const area = document.querySelector('#shop-types'); const value = Array.from({ length: 101 }, (_, index) => 'Category ' + index).join('\\n'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(area, value); area.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await wait(100);
  await evaluate(cdp, "document.querySelector('#start-discovery').requestSubmit()");
  await wait(100);
  await capture(cdp, "landing-maximum-error", 390, 844);
  await navigate(cdp, "/");
  await capture(cdp, "landing-pending", 390, 844, `(() => { const area = document.querySelector('#shop-types'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(area, 'Independent sustainable home and lifestyle stores'); area.dispatchEvent(new Event('input', { bubbles: true })); const form = document.querySelector('#start-discovery'); const button = form.querySelector('.button-primary'); form.setAttribute('aria-busy', 'true'); button.disabled = true; button.textContent = 'Building your search…'; })()`);
  await navigate(cdp, "/");
  const countryBefore = await evaluate(cdp, "document.querySelector('.traffic-country-links button')?.getAttribute('aria-pressed')");
  await evaluate(cdp, "document.querySelector('.traffic-country-links button')?.click()");
  await wait(750);
  const countryAfter = await evaluate(cdp, "document.querySelector('.traffic-country-links button')?.getAttribute('aria-pressed')");
  const rotationBefore = await evaluate(cdp, "document.querySelector('.traffic-globe-markets path')?.getAttribute('d')");
  const globeCenter = await evaluate(cdp, `(() => { const box = document.querySelector('.traffic-globe').getBoundingClientRect(); return { x: box.x + box.width / 2, y: box.y + box.height / 2 }; })()`);
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: globeCenter.x, y: globeCenter.y, button: "left", buttons: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: globeCenter.x + 60, y: globeCenter.y, button: "left", buttons: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: globeCenter.x + 60, y: globeCenter.y, button: "left", buttons: 0 });
  await wait(100);
  const rotationAfter = await evaluate(cdp, "document.querySelector('.traffic-globe-markets path')?.getAttribute('d')");
  checks.interactions.push({ countryBefore, countryAfter, supportedCountrySelected: countryAfter === "true", globeDragChangedPath: rotationBefore !== rotationAfter });
  if (countryAfter !== "true") throw new Error("Supported country click did not select the market");

  await navigate(cdp, "/");
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) await capture(cdp, "query-review", width, height, queryFixture);
  checks.gaps.push({ state: "real query review", reason: "The existing auth proxy prevents a deterministic unauthenticated run fixture from mounting. Browser evidence uses the real compiled G4 CSS with synthetic .example DOM; focused source tests preserve production load/edit/add/remove/reorder/save/start contracts." });
  cdp.close();
  await fs.writeFile(path.join(outputDir, "browser-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "browser-server.log"), serverLog.replaceAll(root, "<workspace>"));
} finally {
  if (chromeProcess?.pid && chromeProcess.exitCode === null) process.kill(-chromeProcess.pid, "SIGTERM");
  if (nextProcess?.pid && nextProcess.exitCode === null) process.kill(-nextProcess.pid, "SIGTERM");
  if (chromeProcess) await Promise.race([waitForExit(chromeProcess), wait(2000)]);
  if (nextProcess) await Promise.race([waitForExit(nextProcess), wait(2000)]);
  await fs.rm(tempDir, { recursive: true, force: true });
}
