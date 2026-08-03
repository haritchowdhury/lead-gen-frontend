import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G3");
const port = 4319;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g3-"));
const checks = { fixture: "real public/auth routes plus synthetic .example G3 shell states", scenarios: [], links: [], gaps: [] };
let nextProcess;
let chromeProcess;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const waitForExit = (child) => new Promise((resolve) => child.once("exit", resolve));
async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(baseUrl)).ok) return; } catch {}
    await wait(250);
  }
  throw new Error("Next.js development server did not become ready");
}
async function waitForFile(filename) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
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
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate(cdp, "document.readyState") === "complete") break;
    await wait(100);
  }
  await wait(600);
}
async function capture(cdp, name, width, height, setup = "") {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  if (setup) await evaluate(cdp, setup);
  await wait(250);
  const metrics = await evaluate(cdp, `(() => ({
    url: location.pathname,
    viewport: { width: innerWidth, height: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    bodyOverflow: document.documentElement.scrollWidth > innerWidth,
    authState: document.querySelector('.site-header')?.dataset.authState || null,
    focused: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 100) || document.activeElement?.tagName,
    focusOutline: getComputedStyle(document.activeElement).outline,
    alert: document.querySelector('[role="alert"]')?.textContent?.trim() || null,
    visibleLabels: [...document.querySelectorAll('h1,h2,strong,.run-state,[role="status"]')].filter((item) => item.getBoundingClientRect().height > 0).map((item) => item.textContent.trim().slice(0, 120)),
    links: [...document.querySelectorAll('a')].map((item) => ({ text: item.textContent.trim().slice(0, 80), href: item.getAttribute('href') })).filter((item) => item.href),
    rows: [...document.querySelectorAll('.run-history-row')].map((item) => ({ href: item.getAttribute('href'), width: Math.round(item.getBoundingClientRect().width), status: item.querySelector('.run-state')?.textContent }))
  }))()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push({ name, ...metrics });
  checks.links.push(...metrics.links.map((link) => ({ scenario: name, ...link })));
  if (metrics.bodyOverflow) throw new Error(`${name} overflows at ${width}px`);
}

const historyFixture = `(() => {
  document.querySelector('.site-header').dataset.authState = 'signed-in';
  document.querySelector('.header-actions').innerHTML = '<nav class="header-auth" aria-label="Account"><a class="header-link header-link-primary" href="/runs">My runs</a><button class="header-link" type="button">Sign out</button></nav>';
  const states = [['completed','Completed'],['running','Discovering stores'],['awaiting_query_confirmation','Review queries'],['queued','Queued'],['failed','Failed'],['cancelled','Cancelled']];
  document.querySelector('body > main').outerHTML = '<main class="app-canvas history-page"><div class="shell"><div class="run-title-row app-page-header"><div><span class="eyebrow">Account workspace</span><h1>My runs</h1><p>Open any active or completed store discovery run.</p></div><a class="ds-button ds-button--primary" href="/">New discovery</a></div><div class="run-history-list ds-card" aria-label="Discovery runs">' + states.map(([state,label], index) => '<a class="run-history-row" href="/runs/run_g3_' + state + '_with_an_intentionally_long_identifier_' + index + '"><div class="run-history-primary"><strong>Lead discovery run</strong><span>3 Aug 2026, 10:30 am</span></div><code title="run_g3_' + state + '_with_an_intentionally_long_identifier_' + index + '">run_g3_' + state + '_with_an_intentionally_long_identifier_' + index + '</code><span class="run-state ds-badge ' + (state === 'completed' ? 'ds-badge--positive' : state === 'running' ? 'ds-badge--signal' : state === 'awaiting_query_confirmation' ? 'ds-badge--warning' : state === 'failed' || state === 'cancelled' ? 'ds-badge--danger' : '') + '">' + label + '</span></a>').join('') + '</div><div class="history-pagination"><span>41 total runs</span><div><button class="ds-button ds-button--secondary">Previous</button><span>Page 2 of 3</span><button class="ds-button ds-button--secondary">Next</button></div></div></div></main>';
  document.querySelector('.run-history-row').focus();
})()`;

const emptyFixture = `(() => {
  document.querySelector('body > main').outerHTML = '<main class="app-canvas history-page"><div class="shell"><div class="run-title-row app-page-header"><div><span class="eyebrow">Account workspace</span><h1>My runs</h1><p>Open any active or completed store discovery run.</p></div><a class="ds-button ds-button--primary" href="/">New discovery</a></div><div class="empty-runs ds-card ds-empty"><h2>No runs yet</h2><p>Your completed and active discovery runs will appear here.</p><a class="ds-button ds-button--primary" href="/">Start a search</a></div></div></main>';
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

  for (const [pathname, name] of [["/sign-in", "sign-in"], ["/sign-up", "sign-up"], ["/g3-not-found", "not-found"]]) {
    await navigate(cdp, pathname);
    for (const [width, height] of [[390, 844], [768, 1024], [1280, 800]]) await capture(cdp, name, width, height);
  }
  await navigate(cdp, "/sign-up");
  await evaluate(cdp, `(() => { const values = { name: 'A', email: 'long.account.name.for.g3.validation@example.com', password: 'short' }; for (const [name,value] of Object.entries(values)) { const input = document.querySelector('[name="' + name + '"]'); input.value = value; input.dispatchEvent(new Event('input', { bubbles: true })); } document.querySelector('form').requestSubmit(); })()`);
  await wait(200);
  await capture(cdp, "sign-up-validation", 390, 844);
  await evaluate(cdp, `(() => { document.querySelector('[name="name"]').value = 'Synthetic Account'; document.querySelector('form').requestSubmit(); })()`);
  await wait(200);
  await capture(cdp, "sign-up-password-validation", 390, 844);

  await navigate(cdp, "/sign-in");
  await capture(cdp, "sign-in-pending-long-email", 390, 844, `(() => { const email = document.querySelector('[name="email"]'); email.value = 'a.deliberately.long.account.address.for.g3@example.com'; const button = document.querySelector('.auth-submit'); button.disabled = true; button.setAttribute('aria-busy', 'true'); button.textContent = 'Signing in…'; email.focus(); })()`);

  await navigate(cdp, "/");
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800]]) await capture(cdp, "history-all-states", width, height, historyFixture);
  await navigate(cdp, "/");
  await capture(cdp, "history-empty", 390, 844, emptyFixture);

  await navigate(cdp, "/runs");
  const observedPath = await evaluate(cdp, "location.pathname");
  checks.gaps.push({ state: "/runs", observedPath, reason: "The existing Neon proxy redirects an unauthenticated deterministic session before the real RunHistory component mounts; compiled-CSS synthetic shell evidence covers its G3 presentation without bypassing auth." });
  if (observedPath !== "/sign-in") throw new Error(`Expected /runs to redirect to /sign-in, received ${observedPath}`);
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
