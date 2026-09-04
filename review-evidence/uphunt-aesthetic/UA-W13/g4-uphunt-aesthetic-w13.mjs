// UA-W13 G4 browser-evidence helper (synthetic /keywords/kr_abcdefghijklmnopqrstuvwx).
// Copy of the KI-W5 same-class /api/keyword-research* fetch interception; the KI-W5
// harness itself is NOT mutated. Helper scripts live only under this review-evidence
// directory. Not a planned product file. Not a CASE oracle (local_e2e evidence).
//
// Phase A: spawn `next dev` (fresh compile of the edited source) + headless Chrome.
// Phase B: inject a fetch interceptor serving a completed ResearchView for
//   kr_abcdefghijklmnopqrstuvwx (30 rows) so the completed dashboard renders.
// Phase C: full-page PNGs at 390/768/1280/1440 (height 900) + assert the treemap
//   SectionIntro title "See which clusters hold the search demand." is present and
//   readable at 1280. Writes g4-checks.json + g4-browser-server.log.

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "review-evidence/uphunt-aesthetic/UA-W13");
const port = 4400 + Math.floor(Math.random() * 300);
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const RESEARCH_ID = "kr_abcdefghijklmnopqrstuvwx";
const TITLE = "See which clusters hold the search demand.";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-w13-"));

// ---------------------------------------------------------------------------
// Fixture builders (copied from test/browser/keyword-intelligence-dashboard.mjs)
// ---------------------------------------------------------------------------

const NINE_MARKETS = ["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"];
const LANES = ["local_discovery", "brand_competitor", "store_discovery", "category_discovery"];
const INTENTS = ["transactional", "commercial", "informational", "navigational"];
const FLAGS = ["declining_traffic", "too_broad", "too_little_traffic", "brand_competitor"];
const CLUSTER_NAMES = ["Dresses", "Brands", "Outerwear", "Boutiques"];

function history15() {
  const points = [];
  for (let i = 0; i < 15; i += 1) {
    points.push({ year: 2025, month: (i % 12) + 1, searchVolume: 100 + i * 7 });
  }
  return points;
}
function markets() {
  return NINE_MARKETS.map((code) => ({
    code, name: `Market ${code}`, locationCode: 9000 + NINE_MARKETS.indexOf(code), languageCode: "en", languageName: "English",
  }));
}
function metric(code) {
  const idx = NINE_MARKETS.indexOf(code);
  return {
    countryCode: code, locationCode: 9000 + idx, locationName: `Market ${code}`, languageName: "English",
    searchVolume: 4000 + idx * 300, cpc: 1.0 + idx * 0.25, competition: 0.35 + idx * 0.04,
    competitionLevel: idx % 2 === 0 ? "MEDIUM" : "LOW", keywordDifficulty: 40 + idx * 3,
    mainIntent: "commercial", commercialIntent: 0.5 + idx * 0.03, monthlyHistory: history15(),
    trendSlope: 0.01 + idx * 0.002, flags: [], opportunityScore: 60 + idx * 2, recommended: true,
  };
}
function nullMarketMetrics() {
  return { US: null, GB: null, CA: null, AU: null, NZ: null, DE: null, FR: null, IN: null, AE: null };
}
function marketMetricsFor(code) {
  const mm = nullMarketMetrics(); mm[code] = metric(code); return mm;
}
function row(index, seed, lane, intent, clusterName, clusterId) {
  return {
    itemId: `kw_${String(index).padStart(4, "0")}`,
    keyword: `${seed} ${intent} keyword ${index}`, seed, sourceSeeds: [seed],
    searchVolume: 1000 + index * 400, cpc: 0.5 + (index % 10) / 4,
    competition: ((index * 7) % 100) / 100, competitionLevel: ["LOW", "MEDIUM", "HIGH"][index % 3],
    keywordDifficulty: (index * 13) % 100, mainIntent: intent, commercialIntent: ((index * 3) % 100) / 100,
    monthlyHistory: history15(), trendSlope: ((index % 9) - 4) / 1000,
    cluster: clusterName, clusterId, lane,
    facets: { audience: index % 2 === 0 ? ["women"] : [], category: [seed], channel: ["online"], fit: [], modifier: index % 3 === 0 ? ["affordable"] : [] },
    variantGroupId: `vg_${index}`, variantCanonical: `${seed} ${intent} keyword ${index}`,
    flags: [FLAGS[index % FLAGS.length]], opportunityScore: (index * 7) % 101,
    recommended: index % 3 === 0 || index % 5 === 0, mergedInto: null,
    availableMarkets: [...NINE_MARKETS],
    marketMetrics: index % 3 === 0 ? marketMetricsFor(index % 2 === 0 ? "US" : "GB") : nullMarketMetrics(),
  };
}
function buildCompletedRows(count) {
  const rows = [];
  const seeds = ["dresses", "brands", "jackets", "boutique"];
  for (let i = 0; i < count; i += 1) {
    const seed = seeds[i % seeds.length];
    rows.push(row(i, seed, LANES[i % LANES.length], INTENTS[i % INTENTS.length], CLUSTER_NAMES[i % CLUSTER_NAMES.length], `cl_${CLUSTER_NAMES[i % CLUSTER_NAMES.length].toLowerCase()}`));
  }
  return rows;
}
function stageCounts() { return { expected: 9, terminal: 9, succeeded: 9, skipped: 0, failed: 0 }; }
function progress(stage) { return { stage, expansion: stageCounts(), anchorScreen: stageCounts(), marketOverview: stageCounts() }; }
function summary(rows, seeds, clusters) {
  return {
    schemaVersion: 3, markets: markets(), seeds: [...seeds], rawItemsCollected: rows.length,
    itemsWithMetrics: rows.length, informationalDropped: rows.filter((r) => r.mainIntent === "informational").length,
    uniquePhrases: rows.length, dedupMerged: 0, activeKeywords: rows.filter((r) => r.mergedInto === null).length,
    variantGroups: rows.length, clusters: clusters.length,
    recommendedKeywords: rows.filter((r) => r.recommended).length, recommendedClusters: clusters.filter((c) => c.recommendedForStoreDiscovery).length,
  };
}
function clusterRow(name, clusterId, keywordRows) {
  const members = keywordRows.filter((r) => r.clusterId === clusterId);
  const laneCounts = {}; for (const r of members) laneCounts[r.lane] = (laneCounts[r.lane] || 0) + 1;
  return {
    cluster: name, clusterId, keywords: members.map((r) => r.keyword),
    combinedVolume: members.reduce((s, r) => s + r.searchVolume, 0), headlineVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    adjustedClusterVolume: members.reduce((s, r) => s + r.searchVolume, 0), rawVariantVolume: members.reduce((s, r) => s + r.searchVolume, 0),
    variantGroups: members.map((r) => ({ variantGroupId: r.variantGroupId, canonical: r.variantCanonical, variants: [r.variantCanonical], volume: r.searchVolume, sourceSeeds: [...r.sourceSeeds] })),
    sourceSeeds: [...new Set(members.flatMap((r) => r.sourceSeeds))], laneCounts,
    facets: { audience: [...new Set(members.flatMap((r) => r.facets.audience))], category: [...new Set(members.flatMap((r) => r.facets.category))], channel: [...new Set(members.flatMap((r) => r.facets.channel))], fit: [], modifier: [...new Set(members.flatMap((r) => r.facets.modifier))] },
    avgCpc: members.reduce((s, r) => s + r.cpc, 0) / Math.max(1, members.length),
    commercialIntent: members.reduce((s, r) => s + r.commercialIntent, 0) / Math.max(1, members.length),
    trendScore: members.reduce((s, r) => s + Math.abs(r.trendSlope), 0) / Math.max(1, members.length),
    opportunityScore: Math.round(members.reduce((s, r) => s + r.opportunityScore, 0) / Math.max(1, members.length)),
    recommendedForStoreDiscovery: members.some((r) => r.recommended),
  };
}
function makeCompletedView(researchId, rows, selectionItems, selectionRevision = 1) {
  const clusters = CLUSTER_NAMES.map((name) => clusterRow(name, `cl_${name.toLowerCase()}`, rows));
  const seeds = [...new Set(rows.map((r) => r.seed))];
  return {
    id: researchId, statusUrl: `/api/keyword-research/${researchId}`, state: "completed", generation: 1, contractVersion: 1,
    seeds: [...seeds], markets: markets(), progress: progress("completed"),
    result: { contractVersion: 1, researchId, generation: 1, configFingerprint: "cfg_w13_001", seeds: [...seeds], markets: markets(), summary: summary(rows, seeds, clusters), keywords: rows, clusters },
    selection: selectionItems, selectionRevision, selectionConflicts: [], safeError: null,
    createdAt: "2026-08-19T10:00:00.000Z", startedAt: "2026-08-19T10:00:01.000Z", completedAt: "2026-08-19T10:05:00.000Z", updatedAt: "2026-08-19T10:05:00.000Z",
  };
}

const completedView = makeCompletedView(RESEARCH_ID, buildCompletedRows(30), [], 1);

// ---------------------------------------------------------------------------
// Fetch interception (Phase B; same-class /api/keyword-research*)
// ---------------------------------------------------------------------------

function fixtureInjection(payload) {
  return `(() => {
    const PAY = ${JSON.stringify(payload)};
    const originalFetch = globalThis.fetch.bind(globalThis);
    const state = { requests: [] };
    globalThis.__kiFixture = state;
    const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
    globalThis.fetch = async (input, init = {}) => {
      const url = new URL(typeof input === "string" ? input : input.url, location.href);
      const method = String(init.method || "GET").toUpperCase();
      const isResearch = url.origin === location.origin && url.pathname.startsWith("/api/keyword-research");
      if (!isResearch) { state.requests.push({ method, url: url.href, passThrough: true }); return originalFetch(input, init); }
      state.requests.push({ method, url: url.pathname + url.search });
      if (method === "GET") {
        const key = url.pathname.replace(/^\\/api\\/keyword-research\\//, "");
        if (key === "${RESEARCH_ID}") return json({ research: PAY.completed });
        return json({ error: { code: "RESEARCH_NOT_FOUND", message: "The research could not be found." } }, 404);
      }
      return json({ error: { code: "UNSUPPORTED_FIXTURE_REQUEST", message: url.pathname } }, 500);
    };
  })();`;
}

// ---------------------------------------------------------------------------
// Cdp + helpers (copied from test/browser/keyword-intelligence-dashboard.mjs)
// ---------------------------------------------------------------------------

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
  const diagnostic = await evaluate(cdp, `(() => ({ url: location.href, text: document.body.innerText.slice(0, 1200) }))()`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(diagnostic)}`);
}
async function navigate(cdp, url) { await cdp.send("Page.navigate", { url }); await waitFor(cdp, "document.readyState === 'complete'", url); }
async function setViewport(cdp, width, height, deviceScaleFactor = 1) { await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor, mobile: width < 600 }); }
async function capture(cdp, name, width) {
  // W11 class: full-page capture; viewport height 900, PNG IHDR height must exceed 900.
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(path.join(outDir, `${name}-${width}.png`), Buffer.from(screenshot.data, "base64"));
}
async function readPngDims(filePath) {
  const b = await fs.readFile(filePath);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}
async function waitForServer() { for (let i = 0; i < 240; i += 1) { try { if ((await fetch(`${baseUrl}/keywords`)).ok) return; } catch {} await wait(500); } throw new Error("Next.js dev server did not become ready"); }
async function waitForFile(file) { for (let i = 0; i < 100; i += 1) { try { return await fs.readFile(file, "utf8"); } catch {} await wait(100); } throw new Error(`Timed out waiting for ${file}`); }

let nextProcess, chromeProcess, cdp;
const serverLog = [];

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
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: fixtureInjection({ completed: completedView }) });

  const widths = [390, 768, 1280, 1440];
  const shots = [];
  let titleState = null;

  // Phase C: screenshot each width, then assert title readability at 1280.
  for (const width of widths) {
    await setViewport(cdp, width, 900, 1);
    await navigate(cdp, `${baseUrl}/keywords/${RESEARCH_ID}`);
    await waitFor(cdp, `document.querySelector('[data-surface="surface:keyword-table"]')`, "keyword table", 60_000);
    await waitFor(cdp, `document.body.innerText.includes(${JSON.stringify(TITLE)})`, "treemap SectionIntro title", 20_000);
    await wait(1200); // allow chart canvases to finalize
    await capture(cdp, "dashboard", width);
    const pngPath = path.join(outDir, `dashboard-${width}.png`);
    const png = await readPngDims(pngPath);
    const st = await evaluate(cdp, `(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node; while ((node = walker.nextNode())) {
        if (node.textContent.trim() === ${JSON.stringify(TITLE)}) {
          const el = node.parentElement; const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
          const absTop = Math.round(r.top + (window.scrollY || 0));
          const docHeight = document.documentElement.scrollHeight;
          return { present: true, fontSize: cs.fontSize, display: cs.display, visible: cs.visibility !== "hidden" && r.width > 0 && r.height > 0, width: Math.round(r.width), intHeight: Math.round(r.height), absTop, docHeight, inPngBounds: r.width > 0 && r.height > 0 && (absTop + r.height) <= docHeight && absTop >= 0, h1: document.querySelectorAll('h1').length, surfaces: [...new Set([...document.querySelectorAll('[data-surface]')].map(n => n.getAttribute('data-surface')))].filter(Boolean) };
        }
      }
      return { present: false };
    })()`);
    shots.push({ width, pngWidth: png.width, pngHeight: png.height, pngExceedsViewport: png.height > 900, viewportHeight: 900, title: st });
    if (width === 1280) titleState = st;
  }

  const allExceed = shots.every((s) => s.pngExceedsViewport);
  const readable1280 = titleState && titleState.present === true && titleState.visible === true && parseFloat(titleState.fontSize) >= 12 && titleState.width > 0 && titleState.inPngBounds === true && allExceed;
  const summary = {
    fixture: "synthetic /keywords/kr_abcdefghijklmnopqrstuvwx with same-class /api/keyword-research* fetch interception (completed ResearchView, 30 rows)",
    route: `/keywords/${RESEARCH_ID}`,
    widths,
    title: TITLE,
    fullPageCapture: true,
    allPngHeightsExceedViewport: allExceed,
    titleReadableAt1280: readable1280,
    titleAt1280: titleState,
    surfacesPresentAt1280: titleState ? titleState.surfaces : [],
    assertion: "full-page (captureBeyondViewport true) PNG IHDR height > 900 at all widths; treemap SectionIntro title present and readable (fontSize>=12px, visible, width>0, within captured page) at 1280",
  };
  await fs.writeFile(path.join(outDir, "g4-checks.json"), JSON.stringify({ summary, shots }, null, 2));
  await fs.writeFile(path.join(outDir, "g4-browser-server.log"), serverLog.join(""));

  if (!readable1280) throw new Error(`G4 assertion FAILED: title readable/in-PNG at 1280 or full-page height -> ${JSON.stringify({ titleState, allExceed })}`);

  return { status: "PASS", titleReadableAt1280: readable1280, titleAt1280: titleState, shots };
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
console.log("UA-W13_G4_RESULT=" + JSON.stringify(outcome));
process.exit(outcome && outcome.status === "PASS" ? 0 : 1);
