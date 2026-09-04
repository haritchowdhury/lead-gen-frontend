// UA-W15 G4 browser-evidence helper (local route `/` landing page only).
// Lives only under this review-evidence directory. Not a planned product file.
// Not a CASE oracle (local_e2e evidence). Does NOT screenshot /design-fixture and
// does NOT screenshot a live /keywords/{id}. Does NOT edit
// test/browser/keyword-intelligence-dashboard.mjs.
//
// Phase A: spawn `next dev` (fresh compile of the edited source) + headless Chrome.
// Phase B: full-page PNGs of local route `/` at 390/768/1280/1440 (viewport height
//   900), captureBeyondViewport true. PNG IHDR height is NOT required to exceed 900
//   (the landing page may fit in 900).
// Phase C: assert `.site-header` is present in the DOM at 1280 (writes
//   g4-checks.json + g4-browser-server.log).

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "review-evidence/uphunt-aesthetic/UA-W15");
const port = 4400 + Math.floor(Math.random() * 300);
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-w15-"));

class Cdp {
  constructor(url) { this.socket = new WebSocket(url); this.nextId = 1; this.pending = new Map(); this.listeners = []; }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      if (message.id !== undefined) { const p = this.pending.get(message.id); if (!p) return; this.pending.delete(message.id); if (message.error) p.reject(new Error(message.error.message)); else p.resolve(message.result); return; }
      if (message.method) { for (const h of this.listeners) if (h.method === message.method) h.fn(message.params); }
    });
  }
  send(method, params = {}) { const id = this.nextId++; this.socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject })); }
  close() { this.socket.close(); }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(cdp, expression, label, timeout = 45_000) {
  const started = Date.now();
  while (Date.now() - started < timeout) { if (await evaluate(cdp, `Boolean(${expression})`)) return; await wait(150); }
  const diagnostic = await evaluate(cdp, `(() => ({ url: location.href, text: document.body.innerText.slice(0, 600) }))()`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(diagnostic)}`);
}
async function navigate(cdp, url) { await cdp.send("Page.navigate", { url }); await waitFor(cdp, "document.readyState === 'complete'", url); }
async function setViewport(cdp, width, height, deviceScaleFactor = 1) { await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor, mobile: width < 600 }); }
async function capture(cdp, name, width) {
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(path.join(outDir, `${name}-${width}.png`), Buffer.from(screenshot.data, "base64"));
}
async function readPngDims(filePath) {
  const b = await fs.readFile(filePath);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}
async function waitForServer() { for (let i = 0; i < 240; i += 1) { try { if ((await fetch(`${baseUrl}/`)).ok) return; } catch {} await wait(500); } throw new Error("Next.js dev server did not become ready"); }
async function waitForFile(file) { for (let i = 0; i < 100; i += 1) { try { return await fs.readFile(file, "utf8"); } catch {} await wait(100); } throw new Error(`Timed out waiting for ${file}`); }

let nextProcess, chromeProcess, cdp;
const serverLog = [];

// `.site-header` presence + readability at the given width.
async function siteHeaderState(cdp) {
  return await evaluate(cdp, `(() => {
    const el = document.querySelector('.site-header');
    if (!el) return { present: false };
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { present: true, display: cs.display, visible: cs.visibility !== 'hidden' && r.width > 0 && r.height > 0, width: Math.round(r.width), height: Math.round(r.height), text: (el.innerText || '').trim().slice(0, 120) };
  })()`);
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  // Phase A: next dev (fresh compile) + headless chrome.
  nextProcess = spawn(process.execPath, [nextBin, "dev", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  nextProcess.stdout.on("data", (c) => serverLog.push(c));
  nextProcess.stderr.on("data", (c) => serverLog.push(c));
  await waitForServer();

  chromeProcess = spawn("/usr/bin/google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", `--user-data-dir=${tempDir}`, "--remote-debugging-port=0", "about:blank"], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(tempDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  const widths = [390, 768, 1280, 1440];
  const shots = [];
  let siteHeaderAt1280 = null;

  // Phase B: full-page PNGs of local route `/` only (captureBeyondViewport true).
  for (const width of widths) {
    await setViewport(cdp, width, 900, 1);
    await navigate(cdp, `${baseUrl}/`);
    await waitFor(cdp, `document.querySelector('.site-header')`, `.site-header`, 30_000);
    await wait(800); // let fonts/layout settle
    await capture(cdp, "home", width);
    const pngPath = path.join(outDir, `home-${width}.png`);
    const png = await readPngDims(pngPath);
    const headerSt = await siteHeaderState(cdp);
    shots.push({ width, pngWidth: png.width, pngHeight: png.height, viewportHeight: 900, requiresHeightGreaterThan900: false, siteHeader: headerSt });
    if (width === 1280) { siteHeaderAt1280 = headerSt; }
  }

  // Phase C: assert `.site-header` present in the DOM at 1280.
  const headerPresentAt1280 = siteHeaderAt1280 && siteHeaderAt1280.present === true;
  const summary = {
    fixture: "local route `/` landing page (no fetch interception; no synthetic research data)",
    route: `/`,
    widths,
    fullPageCapture: true,
    captureBeyondViewport: true,
    pngHeightThreshold: "PNG IHDR height NOT required to exceed 900 (landing may fit in 900)",
    siteHeaderPresentAt1280: headerPresentAt1280,
    siteHeaderAt1280,
    assertion: "full-page PNG (captureBeyondViewport true) at 390/768/1280/1440 of local route `/`; `.site-header` present in the DOM at 1280. No screenshot of /design-fixture or a live /keywords/{id}.",
  };
  await fs.writeFile(path.join(outDir, "g4-checks.json"), JSON.stringify({ summary, shots }, null, 2));
  await fs.writeFile(path.join(outDir, "g4-browser-server.log"), serverLog.join(""));

  if (!headerPresentAt1280) throw new Error(`G4 assertion FAILED: .site-header not present at 1280: ${JSON.stringify(siteHeaderAt1280)}`);

  return { status: "PASS", siteHeaderPresentAt1280: headerPresentAt1280, siteHeaderAt1280, shots };
}

let outcome;
try {
  outcome = await run();
} catch (err) {
  outcome = { status: "FAIL", error: err instanceof Error ? err.message : String(err) };
} finally {
  try { if (cdp) cdp.close(); } catch {}
  const killGroup = (proc) => { try { if (proc && proc.pid) process.kill(-proc.pid, "SIGKILL"); } catch {} try { if (proc) proc.kill("SIGKILL"); } catch {} };
  killGroup(chromeProcess);
  killGroup(nextProcess);
  try { await fs.rm(tempDir, { recursive: true, force: true }); } catch {}
}
console.log("UA-W15_G4_RESULT=" + JSON.stringify(outcome));
process.exit(outcome && outcome.status === "PASS" ? 0 : 1);
