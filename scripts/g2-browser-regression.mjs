import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G2");
const port = 4318;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g2-"));
const checks = { fixture: "synthetic G2 primitive matrix and public routes", scenarios: [], gaps: [] };
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
  await wait(200);
  const metrics = await evaluate(cdp, `(() => ({
    url: location.pathname,
    viewport: { width: innerWidth, height: innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    bodyOverflow: document.documentElement.scrollWidth > innerWidth,
    focused: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 80) || document.activeElement?.tagName,
    focusOutline: getComputedStyle(document.activeElement).outline,
    focusBoxShadow: getComputedStyle(document.activeElement).boxShadow,
    tokens: ['--color-canvas','--color-surface','--color-ink','--color-signal','--elevation-inset','--elevation-card','--elevation-floating'].map((name) => [name, getComputedStyle(document.documentElement).getPropertyValue(name).trim()]),
    primitiveRects: [...document.querySelectorAll('[class^="ds-"], [class*=" ds-"]')].slice(0, 30).map((item) => ({ className: item.className, width: Math.round(item.getBoundingClientRect().width), height: Math.round(item.getBoundingClientRect().height) }))
  }))()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(path.join(outputDir, `${name}-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push({ name, ...metrics });
}

const primitiveMatrix = `(() => {
  document.body.innerHTML = '<main style="max-width:760px;margin:0 auto;padding:24px;display:grid;gap:16px"><header class="ds-section-header"><div class="ds-section-header__copy"><p class="ds-eyebrow">Synthetic G2 fixture</p><h2>Shared primitive states</h2><p>No application page is migrated by this fixture.</p></div><span class="ds-badge ds-badge--signal">Signal</span></header><section class="ds-card"><div class="ds-card__body" style="display:grid;gap:12px"><div style="display:flex;flex-wrap:wrap;gap:8px"><button class="ds-button ds-button--primary">Primary action with a deliberately long label</button><button class="ds-button ds-button--secondary">Secondary</button><button class="ds-button ds-button--inverse">Inverse</button><button class="ds-button ds-button--primary" disabled>Disabled</button><button class="ds-button ds-button--primary" aria-busy="true">Loading</button></div><div style="display:flex;flex-wrap:wrap;gap:8px"><span class="ds-badge ds-badge--positive">Positive</span><span class="ds-badge ds-badge--warning">Warning</span><span class="ds-badge ds-badge--danger">Danger</span></div><input class="ds-field" aria-label="Synthetic focus field" value="Long synthetic value.example" readonly><div class="ds-notice ds-notice--positive">Positive notice</div><div class="ds-notice ds-notice--warning">Warning notice</div><div class="ds-notice ds-notice--danger">Danger notice</div><div class="ds-inset"><div class="ds-metric"><span class="ds-metric__label">Measured visits</span><strong class="ds-metric__value">0</strong><span class="ds-metric__detail">Measured zero remains visible</span></div></div><details class="ds-disclosure" open><summary>Evidence disclosure</summary><div class="ds-disclosure__body">Synthetic evidence.example/source</div></details><div class="ds-skeleton" style="height:16px"></div><div class="ds-empty"><h3>Empty state</h3><p>No synthetic records match this filter.</p></div></div></section></main>';
  document.querySelector('.ds-field').focus();
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
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  await navigate(cdp, "/");
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800]]) await capture(cdp, "landing-regression", width, height);
  await navigate(cdp, "/sign-in");
  await evaluate(cdp, "document.body.focus()");
  await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab" });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab" });
  await capture(cdp, "auth-focus", 390, 844);

  await navigate(cdp, "/");
  await capture(cdp, "primitive-matrix", 390, 844, primitiveMatrix);
  await navigate(cdp, "/");
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await capture(cdp, "primitive-matrix-reduced-motion", 1280, 800, primitiveMatrix);
  const reducedMotion = await evaluate(cdp, `(() => { const item = document.querySelector('.ds-button'); const skeleton = document.querySelector('.ds-skeleton::after'); return { matches: matchMedia('(prefers-reduced-motion: reduce)').matches, transitionDuration: getComputedStyle(item).transitionDuration, animationDuration: getComputedStyle(document.querySelector('.ds-skeleton'), '::after').animationDuration }; })()`);
  checks.reducedMotion = reducedMotion;
  if (!reducedMotion.matches || !["0.00001s", "1e-05s"].includes(reducedMotion.transitionDuration) || !["0.00001s", "1e-05s"].includes(reducedMotion.animationDuration)) throw new Error(`Reduced-motion contract failed: ${JSON.stringify(reducedMotion)}`);

  for (const protectedPath of ["/runs", "/runs/run_g1queryreviewfixture", "/runs/run_g1completedfixture"]) {
    await navigate(cdp, protectedPath);
    const observedPath = await evaluate(cdp, "location.pathname");
    checks.gaps.push({ state: protectedPath, observedPath, reason: "Existing unauthenticated Neon proxy redirect prevents current results and expanded-lead browser regression capture; no auth behavior was changed in G2." });
  }
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
