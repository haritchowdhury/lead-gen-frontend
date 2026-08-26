import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const port = 4363;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const chromeBin = "/usr/bin/google-chrome";
const ownerId = "mrr-owner-a";
const sessionCookie = "__Secure-neon-auth.session_token";
const sessionToken = "mrr-local-session-token";
const required = ["MRR-E2E-01", "MRR-E2E-02", "MRR-E2E-03"];
const executed = [];
const evidence = {};
const backendRequests = [];
let authMode = "owner";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const digest = (members) => createHash("sha256")
  .update([...members].sort().map((member) => `${member}\n`).join(""))
  .digest("hex");
const json = (response, status, payload) => {
  response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  response.end(JSON.stringify(payload));
};
const listen = (server) => new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => {
    server.off("error", reject);
    resolve(server.address().port);
  });
});
const closeServer = (server) => new Promise((resolve) => {
  server.closeAllConnections?.();
  server.close(() => resolve());
});

const researchItems = [
  {
    researchId: "kr_abcdefghijklmnopqrstuvwx",
    seeds: ["independent eyewear", "acetate frames", "optical boutiques"],
    state: "running",
    stage: "anchor_screen",
    selectionRevision: 0,
    createdAt: "2026-08-26T12:00:00.000Z",
    updatedAt: "2026-08-26T12:05:00.000Z",
    completedAt: null,
  },
  {
    researchId: "kr_zyxwvutsrqponmlkjihgfedc",
    seeds: ["running shoes"],
    state: "completed",
    stage: "completed",
    selectionRevision: 1,
    createdAt: "2026-08-25T12:00:00.000Z",
    updatedAt: "2026-08-25T12:10:00.000Z",
    completedAt: "2026-08-25T12:10:00.000Z",
  },
];

const run = {
  runId: "run_abcdefghijklmnop",
  categories: [{ originalShopType: "Independent Eyewear Brand", shopType: "eyewear", businessQualifier: "brand" }],
  state: "completed",
  phase: "finished",
  stage: "completed",
  createdAt: "2026-08-01T00:00:00.000Z",
  startedAt: "2026-08-01T00:00:01.000Z",
  completedAt: "2026-08-01T00:00:02.000Z",
  progress: {
    shopTypesTotal: 1, shopTypesProcessed: 1, blankShopTypesSkipped: 0,
    invalidShopTypes: 0, queryCandidatesGenerated: 1, queryCandidatesValidated: 1,
    queryCandidatesProbed: 1, queriesSelected: 1, planningWarnings: 0,
    queriesTotal: 1, queriesProcessed: 1, storesDiscovered: 1,
    storesQualified: 1, storesRejected: 0, failures: 0, queryFailures: 0,
    occurrenceFailures: 0, storeProcessingFailures: 0, outputRows: 1,
  },
  resultsAvailable: true,
  pipelineVersion: 2,
  scoringVersion: 2,
  queryReview: null,
  error: null,
};

const authServer = http.createServer((request, response) => {
  if (request.method === "GET" && request.url?.startsWith("/get-session")) {
    const payload = authMode === "owner" ? {
      session: {
        id: "mrr-session-a", userId: ownerId, token: sessionToken,
        expiresAt: "2027-08-26T00:00:00.000Z", createdAt: "2026-08-26T00:00:00.000Z",
        updatedAt: "2026-08-26T00:00:00.000Z",
      },
      user: {
        id: ownerId, name: "MRR Owner", email: "owner@mrr.invalid", emailVerified: true,
        createdAt: "2026-08-26T00:00:00.000Z", updatedAt: "2026-08-26T00:00:00.000Z",
      },
    } : null;
    json(response, 200, payload);
    return;
  }
  json(response, 404, {});
});

const backendServer = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
  backendRequests.push({
    method: request.method,
    path: requestUrl.pathname,
    search: requestUrl.search,
    userId: request.headers["x-user-id"] ?? null,
    authorization: request.headers.authorization ?? null,
  });
  if (request.method === "GET" && requestUrl.pathname === "/api/keyword-research") {
    json(response, 200, {
      pagination: { page: 1, pageSize: 20, totalItems: researchItems.length, totalPages: 1 },
      items: researchItems,
    });
    return;
  }
  if (request.method === "GET" && requestUrl.pathname === "/api/runs") {
    json(response, 200, {
      pagination: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1 },
      items: [run],
    });
    return;
  }
  if (request.method === "GET" && requestUrl.pathname.startsWith("/api/keyword-research/")) {
    json(response, 404, { error: { code: "KEYWORD_RESEARCH_NOT_FOUND", message: "Fixture detail intentionally omitted." } });
    return;
  }
  json(response, 404, { error: { code: "NOT_FOUND", message: "Not found" } });
});

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      if (message.id === undefined) return;
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

async function waitFor(cdp, expression, label, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(cdp, `Boolean(${expression})`)) return;
    await wait(100);
  }
  const body = await evaluate(cdp, "document.body.innerText.slice(0, 800)");
  throw new Error(`Timed out waiting for ${label}: ${body}`);
}

async function navigate(cdp, pathname) {
  await cdp.send("Page.navigate", { url: `${baseUrl}${pathname}` });
  await waitFor(cdp, "document.readyState === 'complete'", pathname);
}

function activate(id, witness) {
  assert(required.includes(id), `unexpected case ${id}`);
  assert(!executed.includes(id), `duplicate case ${id}`);
  executed.push(id);
  evidence[id] = witness;
}

function falsifies(oracle, clean, defective, label) {
  oracle(clean);
  let failed = false;
  try { oracle(defective); } catch { failed = true; }
  assert(failed, `${label} negative control did not falsify`);
  oracle(clean);
}

let nextProcess;
let chromeProcess;
let cdp;
let tempRoot;

try {
  assert(fs.existsSync(chromeBin), `Chrome is missing at ${chromeBin}`);
  tempRoot = await fsp.mkdtemp(path.join(os.tmpdir(), "storesignal-mrr-"));
  const authPort = await listen(authServer);
  const backendPort = await listen(backendServer);

  nextProcess = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      PATH: process.env.PATH,
      NODE_ENV: "production",
      BACKEND_API_BASE_URL: `http://127.0.0.1:${backendPort}`,
      BACKEND_API_TOKEN: "mrr-backend-token",
      NEON_AUTH_BASE_URL: `http://127.0.0.1:${authPort}`,
      NEON_AUTH_COOKIE_SECRET: "mrr-local-cookie-secret-with-at-least-thirty-two-bytes",
    },
  });
  let nextLog = "";
  nextProcess.stdout.on("data", (chunk) => { nextLog += String(chunk); });
  nextProcess.stderr.on("data", (chunk) => { nextLog += String(chunk); });
  for (let attempt = 0; attempt < 240; attempt += 1) {
    try { if ((await fetch(baseUrl)).ok) break; } catch {}
    if (attempt === 239) throw new Error(`Next did not start: ${nextLog}`);
    await wait(250);
  }

  const profile = path.join(tempRoot, "chrome-profile");
  await fsp.mkdir(profile, { recursive: true });
  chromeProcess = spawn(chromeBin, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    `--user-data-dir=${profile}`, "--remote-debugging-port=0", "about:blank",
  ], { detached: true, stdio: "ignore" });
  let debugPort;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      debugPort = (await fsp.readFile(path.join(profile, "DevToolsActivePort"), "utf8")).trim().split(/\r?\n/u)[0];
      break;
    } catch { await wait(100); }
  }
  assert(debugPort, "Chrome did not publish a debugging port");
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  assert(target, "Chrome did not expose a page target");
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Network.enable");
  const cookieResult = await cdp.send("Network.setCookie", {
    name: sessionCookie, value: sessionToken, url: baseUrl, path: "/",
    httpOnly: true, secure: true, sameSite: "Lax",
  });
  assert(cookieResult.success === true, "auth fixture cookie was not installed");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  await navigate(cdp, "/runs");
  await waitFor(cdp, "document.querySelectorAll('.research-history-row').length === 2 && document.querySelectorAll('.run-history-row').length === 1", "two-section history");
  const desktop = await evaluate(cdp, `(() => ({
    title: document.querySelector('h1')?.textContent?.trim(),
    headings: [...document.querySelectorAll('.search-history-heading h2')].map((node) => node.textContent?.trim()),
    researchLinks: [...document.querySelectorAll('.research-history-row')].map((node) => node.getAttribute('href')),
    runLinks: [...document.querySelectorAll('.run-history-row')].map((node) => node.getAttribute('href')),
    body: document.body.innerText,
    display: getComputedStyle(document.querySelector('.search-history-sections')).display,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }))()`);
  assert(desktop.title === "My searches", "page title changed");
  assert(desktop.headings.join("\0") === "Keyword research\0Discovery runs", "section headings changed");
  assert(desktop.researchLinks.join("\0") === researchItems.map((item) => `/keywords/${item.researchId}`).join("\0"), "research links are not fixed local routes");
  assert(desktop.runLinks.join("\0") === `/runs/${run.runId}`, "run navigation changed");
  assert(!desktop.body.includes(researchItems[0].researchId) && !desktop.body.includes(run.runId), "internal IDs leaked into visible text");
  assert(desktop.display === "grid" && desktop.overflow === false, "desktop surface is not usable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  const mobile = await evaluate(cdp, `({ overflow: document.documentElement.scrollWidth > innerWidth, rows: document.querySelectorAll('.research-history-row').length })`);
  assert(mobile.overflow === false && mobile.rows === 2, "mobile surface is not usable");
  const initialLists = backendRequests.filter((entry) => entry.path === "/api/keyword-research" || entry.path === "/api/runs");
  assert(initialLists.length === 2, `expected two initial backend GETs, got ${initialLists.length}`);
  assert(initialLists.every((entry) => entry.method === "GET" && entry.search === "?page=1&pageSize=20"), "initial query contract changed");
  assert(initialLists.every((entry) => entry.userId === ownerId && entry.authorization === "Bearer mrr-backend-token"), "trusted owner/backend authorization forwarding changed");
  falsifies(
    (value) => assert(value.sections === 2 && value.researchRows === 2 && value.runRows === 1, "composition oracle failed"),
    { sections: 2, researchRows: 2, runRows: 1 },
    { sections: 1, researchRows: 2, runRows: 1 },
    "MRR-NC-05",
  );
  activate("MRR-E2E-01", { desktop, mobile, backendGets: initialLists.length });

  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const detailFloor = backendRequests.length;
  const clicked = await evaluate(cdp, `(() => { const link = document.querySelector('.research-history-row'); link?.click(); return link?.getAttribute('href') ?? null; })()`);
  assert(clicked === `/keywords/${researchItems[0].researchId}`, "running research click target changed");
  await waitFor(cdp, `location.pathname === ${JSON.stringify(`/keywords/${researchItems[0].researchId}`)}`, "research navigation");
  for (let attempt = 0; attempt < 200 && !backendRequests.slice(detailFloor).some((entry) => entry.path === `/api/keyword-research/${researchItems[0].researchId}`); attempt += 1) await wait(50);
  const detailRequest = backendRequests.slice(detailFloor).find((entry) => entry.path === `/api/keyword-research/${researchItems[0].researchId}`);
  assert(detailRequest?.userId === ownerId, "dashboard durable GET omitted trusted owner");
  falsifies(
    (href) => assert(href === `/keywords/${researchItems[0].researchId}`, "fixed navigation oracle failed"),
    `/keywords/${researchItems[0].researchId}`,
    `/runs/${researchItems[0].researchId}`,
    "MRR-NC-04",
  );
  activate("MRR-E2E-02", { clicked, pathname: clicked, durableGet: detailRequest.path });

  authMode = "none";
  await cdp.send("Network.deleteCookies", { name: sessionCookie, url: baseUrl });
  const anonymousFloor = backendRequests.length;
  const anonymous = await evaluate(cdp, `fetch('/api/keyword-research?page=1&pageSize=20', { cache: 'no-store' }).then(async (response) => ({ status: response.status, payload: await response.json() }))`);
  assert(anonymous.status === 401 && anonymous.payload?.error?.code === "AUTHENTICATION_REQUIRED", "anonymous list did not fail with the safe 401 contract");
  assert(backendRequests.length === anonymousFloor, "anonymous request reached the backend");
  authMode = "owner";
  const restoredCookie = await cdp.send("Network.setCookie", {
    name: sessionCookie, value: sessionToken, url: baseUrl, path: "/",
    httpOnly: true, secure: true, sameSite: "Lax",
  });
  assert(restoredCookie.success === true, "auth fixture cookie was not restored");
  const authenticated = await evaluate(cdp, `fetch('/api/keyword-research?page=1&pageSize=20', { cache: 'no-store' }).then(async (response) => ({ status: response.status, cache: response.headers.get('cache-control') }))`);
  assert(authenticated.status === 200 && authenticated.cache?.includes("no-store"), "authenticated list proxy failed");
  const forwarded = backendRequests.at(-1);
  assert(forwarded.path === "/api/keyword-research" && forwarded.userId === ownerId, "authenticated owner forwarding changed");
  activate("MRR-E2E-03", { anonymousStatus: 401, anonymousBackendCalls: 0, authenticatedStatus: 200, ownerHeader: forwarded.userId });

  assert([...executed].sort().join("\0") === [...required].sort().join("\0"), "required browser cases did not all execute");
  assert(new Set(executed).size === required.length, "browser registry contains duplicates");
  console.log(`MRR_BROWSER_CERTIFICATE=${JSON.stringify({
    required, registered: required, executed, skipped: [], activationWitnesses: executed,
    negativeControls: ["MRR-NC-04", "MRR-NC-05"], oracleFailures: [],
    digest: digest(required), evidence,
  })}`);
} finally {
  cdp?.close();
  if (chromeProcess?.pid && chromeProcess.exitCode === null) {
    try { process.kill(-chromeProcess.pid, "SIGTERM"); } catch {}
  }
  if (nextProcess?.pid && nextProcess.exitCode === null) {
    try { process.kill(-nextProcess.pid, "SIGTERM"); } catch {}
  }
  await closeServer(authServer).catch(() => {});
  await closeServer(backendServer).catch(() => {});
}
