import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const port = 4362;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const chromeBin = "/usr/bin/google-chrome";
const keywordCookie = "storesignal_pending_keyword_research_intent";
const legacyCookie = "storesignal_pending_run_intent";
const requiredCases = [
  "LKAI-FE-01", "LKAI-FE-02", "LKAI-FE-03", "LKAI-FE-04", "LKAI-FE-05",
  "LKAI-FE-06", "LKAI-FE-07", "LKAI-FE-08", "LKAI-FE-09",
];

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const setDigest = (members) => createHash("sha256")
  .update(Buffer.concat([...new Set(members)].sort().map((member) => Buffer.from(`${member}\n`, "utf8"))))
  .digest("hex");

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = [];
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(String(data));
      if (message.id !== undefined) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      for (const listener of this.listeners) {
        if (listener.method === message.method) Promise.resolve(listener.callback(message.params)).catch(() => {});
      }
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  on(method, callback) {
    this.listeners.push({ method, callback });
  }
  close() {
    this.socket.close();
  }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(cdp, expression, label, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(cdp, `Boolean(${expression})`)) return;
    await wait(100);
  }
  const diagnostic = await evaluate(cdp, `({
    pathname: location.pathname,
    alert: document.querySelector('[role="alert"]')?.textContent?.trim() ?? null,
    seedCount: document.querySelector('.category-count')?.textContent?.trim() ?? null,
    button: document.querySelector('#start-discovery button[type="submit"]')?.textContent?.trim() ?? null,
    body: document.body.innerText.slice(0, 500)
  })`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify({
    ...diagnostic,
    responses: networkResponses.slice(-8),
  })}`);
}

async function navigate(cdp, pathname) {
  await cdp.send("Page.navigate", { url: `${baseUrl}${pathname}` });
  await waitFor(cdp, "document.readyState === 'complete'", pathname);
}

async function setInput(cdp, selector, value, expectedSeedCount) {
  await waitFor(
    cdp,
    `(() => { const node = document.querySelector(${JSON.stringify(selector)}); ` +
      `return node instanceof HTMLTextAreaElement && !node.disabled && ` +
      `Object.keys(node).some((key) => key.startsWith('__reactProps$')); })()`,
    "hydrated landing seed textarea",
  );
  const focused = await evaluate(cdp, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return false;
    node.focus();
    node.select();
    return true;
  })()`);
  assert(focused, `could not focus textarea ${selector}`);
  await cdp.send("Input.insertText", { text: value });
  const expectedCountLabel = `${expectedSeedCount} seed ${expectedSeedCount === 1 ? "phrase" : "phrases"}`;
  await waitFor(
    cdp,
    `document.querySelector(${JSON.stringify(selector)})?.value === ${JSON.stringify(value)} && ` +
      `document.querySelector('.category-count')?.textContent?.trim() === ${JSON.stringify(expectedCountLabel)}`,
    `${expectedSeedCount}-seed React input commit`,
  );
}

async function submitLanding(cdp) {
  const submitted = await evaluate(cdp, `(() => {
    const form = document.querySelector("#start-discovery");
    if (!form) return false;
    form.requestSubmit();
    return true;
  })()`);
  assert(submitted, "landing form is missing");
}

async function cookiesFor(cdp) {
  return (await cdp.send("Network.getCookies", { urls: [baseUrl] })).cookies;
}

async function pendingCookieWitness(cdp, phase) {
  const pending = (await cookiesFor(cdp))
    .filter((cookie) => cookie.name === keywordCookie || cookie.name === legacyCookie)
    .map((cookie) => ({
      name: cookie.name,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      session: cookie.session,
      expires: cookie.expires,
      expiresInSeconds: Math.round(cookie.expires - Date.now() / 1_000),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
  const keyword = pending.find((cookie) => cookie.name === keywordCookie);
  assert(keyword, `${phase}: keyword pending cookie is absent`);
  assert(
    keyword.httpOnly === true && keyword.secure === true && keyword.sameSite === "Lax" && keyword.path === "/",
    `${phase}: keyword cookie flags changed`,
  );
  assert(
    keyword.session === false && keyword.expiresInSeconds > 0 && keyword.expiresInSeconds <= 3_600,
    `${phase}: keyword cookie expiry is outside its one-hour max-age`,
  );
  return { phase, pending };
}

async function deleteCookie(cdp, name) {
  await cdp.send("Network.deleteCookies", { name, url: baseUrl });
}

async function installCookie(cdp, name, value, { httpOnly = true, secure = false } = {}) {
  const result = await cdp.send("Network.setCookie", {
    name,
    value,
    url: baseUrl,
    path: "/",
    httpOnly,
    secure,
    sameSite: "Lax",
  });
  assert(result.success === true, `failed to install ${name}`);
}

async function clearAuthCookies(cdp) {
  for (const cookie of await cookiesFor(cdp)) {
    if (cookie.name.startsWith("__Secure-neon-auth.")) await deleteCookie(cdp, cookie.name);
  }
}

async function assertNoAuthCookies(cdp, phase) {
  const names = (await cookiesFor(cdp))
    .map((cookie) => cookie.name)
    .filter((name) => name.startsWith("__Secure-neon-auth."))
    .sort();
  assert(names.length === 0, `${phase}: auth cookie names remain ${JSON.stringify(names)}`);
}

async function waitForHarnessTrace(fromIndex, predicate, label, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const event = harness.trace().slice(fromIndex).find(predicate);
    if (event) return event;
    await wait(10);
  }
  throw new Error(`Timed out waiting for harness trace: ${label}`);
}

const keywordSends = (trace) => trace.filter((event) =>
  event.kind === "sqs" && event.messageTypes?.includes("keyword.initialize.v1"));
const providerCalls = (trace) => trace.filter((event) =>
  event.kind === "dataforseo" || event.kind === "google");

const isBrowserCreationPost = (entry) => {
  if (entry.method !== "POST") return false;
  const pathname = new URL(entry.url).pathname;
  return pathname === "/api/keyword-research" || pathname === "/api/runs";
};

const isBackendCreationPost = (event) => event.kind === "http" &&
  event.method === "POST" &&
  ["/api/keyword-research", "/api/keyword-research-intents", "/api/run-intents"].includes(event.path);

async function waitForNetworkResponse(fromIndex, predicate, label, timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const response = networkResponses.slice(fromIndex).find(predicate);
    if (response) return response;
    await wait(25);
  }
  throw new Error(`Timed out waiting for network response: ${label}`);
}

async function assertInvalidLandingSubmission(input, seedCount, label) {
  await navigate(cdp, "/");
  const traceFloor = harness.trace().length;
  const requestFloor = networkRequests.length;
  await setInput(cdp, "#shop-types", input, seedCount);
  await submitLanding(cdp);
  const expectedError = "One to five research seed phrases are required.";
  await waitFor(
    cdp,
    `document.querySelector('[role=alert]')?.textContent?.trim() === ${JSON.stringify(expectedError)}`,
    `${label} exact error`,
  );
  const pathname = await evaluate(cdp, "location.pathname");
  const browserRequests = networkRequests.slice(requestFloor);
  const browserCreationPosts = browserRequests.filter(isBrowserCreationPost);
  const backendCreationPosts = harness.trace().slice(traceFloor).filter(isBackendCreationPost);
  const searchNavigations = browserRequests.filter((entry) => {
    const requestPath = new URL(entry.url).pathname;
    return requestPath.startsWith("/keywords/") || requestPath === "/sign-up";
  });
  assert(pathname === "/", `${label} landing input navigated away`);
  assert(browserCreationPosts.length === 0, `${label} landing input reached a browser creation BFF`);
  assert(backendCreationPosts.length === 0, `${label} landing input reached a backend creation route`);
  assert(searchNavigations.length === 0, `${label} landing input triggered search navigation`);
  return {
    seedCount,
    error: expectedError,
    pathname,
    browserCreationPosts: 0,
    backendCreationPosts: 0,
    searchNavigations: 0,
  };
}

async function submitSignedInLanding(input, seedCount) {
  await navigate(cdp, "/");
  const requestFloor = networkRequests.length;
  await setInput(cdp, "#shop-types", input, seedCount);
  await submitLanding(cdp);
  await waitFor(cdp, "location.pathname.startsWith('/keywords/kr_')", `${seedCount}-seed signed-in navigation`);
  const requests = networkRequests.slice(requestFloor);
  const keywordPosts = requests.filter((entry) =>
    entry.method === "POST" && new URL(entry.url).pathname === "/api/keyword-research");
  const legacyPosts = requests.filter((entry) =>
    entry.method === "POST" && new URL(entry.url).pathname === "/api/runs");
  assert(keywordPosts.length === 1, `${seedCount}-seed signed-in landing missed its one keyword BFF POST`);
  assert(legacyPosts.length === 0, `${seedCount}-seed signed-in landing called the legacy runs BFF`);
  return { seedCount, destination: await evaluate(cdp, "location.pathname"), keywordPosts: 1, legacyPosts: 0 };
}

async function assertEmptyPendingCookieDeleted(cookieName) {
  await deleteCookie(cdp, keywordCookie);
  await deleteCookie(cdp, legacyCookie);
  await installCookie(cdp, cookieName, "");
  const installed = (await cookiesFor(cdp)).find((cookie) => cookie.name === cookieName);
  assert(installed?.value === "", `${cookieName} empty-cookie precondition failed`);
  const traceFloor = harness.trace().length;
  const requestFloor = networkRequests.length;
  const result = await evaluate(cdp, `(async () => {
    const response = await fetch("/api/run-intents/claim", { method: "POST" });
    const payload = await response.json();
    return { status: response.status, code: payload?.error?.code ?? null };
  })()`);
  assert(
    result.status === 404 && result.code === "RUN_INTENT_NOT_FOUND",
    `${cookieName} empty-cookie claim did not fail closed`,
  );
  assert(!(await cookiesFor(cdp)).some((cookie) => cookie.name === cookieName), `${cookieName} empty cookie survived claim`);
  const trace = harness.trace().slice(traceFloor);
  assert(!trace.some(isBackendCreationPost), `${cookieName} empty cookie reached a backend creation route`);
  assert(
    !trace.some((event) => event.kind === "http" && /\/api\/(?:keyword-research-intents|run-intents)\/[^/]+\/claim$/u.test(event.path)),
    `${cookieName} empty cookie reached a backend claim route`,
  );
  assert(keywordSends(trace).length === 0, `${cookieName} empty cookie dispatched keyword work`);
  assert(networkRequests.slice(requestFloor).filter(isBrowserCreationPost).length === 0, `${cookieName} empty cookie reached a browser creation BFF`);
  return { cookieName, status: 404, errorCode: "RUN_INTENT_NOT_FOUND", deleted: true };
}

async function assertRejectedKeywordIntent(cookieValue, label, expectedBackendClaims) {
  await deleteCookie(cdp, keywordCookie);
  await deleteCookie(cdp, legacyCookie);
  await installCookie(cdp, keywordCookie, cookieValue);
  assert((await cookiesFor(cdp)).some((cookie) => cookie.name === keywordCookie), `${label} cookie precondition failed`);
  const traceFloor = harness.trace().length;
  const requestFloor = networkRequests.length;
  const responseFloor = networkResponses.length;
  await navigate(cdp, "/runs/continue");
  await waitForNetworkResponse(
    responseFloor,
    (response) => response.pathname === "/api/run-intents/claim" && response.status === 404,
    `${label} continuation 404`,
  );
  await waitFor(cdp, "location.pathname === '/'", `${label} home redirect`);
  assert(!(await cookiesFor(cdp)).some((cookie) => cookie.name === keywordCookie), `${label} cookie survived rejection`);
  const trace = harness.trace().slice(traceFloor);
  const backendClaims = trace.filter((event) => event.kind === "http" &&
    event.method === "POST" &&
    /^\/api\/keyword-research-intents\/[^/]+\/claim$/u.test(event.path));
  assert(backendClaims.length === expectedBackendClaims, `${label} backend claim count changed`);
  assert(!trace.some(isBackendCreationPost), `${label} reached a backend creation route`);
  assert(networkRequests.slice(requestFloor).filter(isBrowserCreationPost).length === 0, `${label} reached a browser creation BFF`);
  assert(keywordSends(trace).length === 0, `${label} dispatched keyword work`);
  return {
    case: label,
    destination: "/",
    status: 404,
    cookieDeleted: true,
    backendKeywordClaims: expectedBackendClaims,
    creationPosts: 0,
    initializeSends: 0,
  };
}

async function createExpirableKeywordIntent() {
  const response = await fetch(`${harness.frontendEnv.BACKEND_API_BASE_URL}/api/keyword-research-intents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${harness.frontendEnv.BACKEND_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seeds: ["independent eyewear"] }),
  });
  let payload = await response.json();
  assert(response.status === 201, `expired-intent fixture creation status changed: ${response.status}`);
  exactObjectKeys(payload, ["intentId", "expiresAt"], "expired-intent fixture creation");
  assert(
    typeof payload.intentId === "string" && /^intent_[A-Za-z0-9_-]{32}$/u.test(payload.intentId),
    "expired-intent fixture ID is malformed",
  );
  const intentId = payload.intentId;
  payload = null;
  return intentId;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    try {
      if ((await fetch(baseUrl)).ok) return;
    } catch {}
    await wait(250);
  }
  throw new Error("Next production server did not become ready");
}

async function waitForFile(filename) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      return await fsp.readFile(filename, "utf8");
    } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${filename}`);
}

const probePortOccupied = (targetPort) => new Promise((resolve) => {
  const socket = net.connect({ port: targetPort, host: "127.0.0.1" });
  socket.once("connect", () => { socket.destroy(); resolve(true); });
  socket.once("error", () => resolve(false));
});

let harness;
let nextProcess;
let chromeProcess;
let cdp;
let tempRoot;
let nextClockShim;
const networkRequests = [];
const networkResponses = [];
const executed = new Set();
const evidence = {};

const activate = (caseId, witness) => {
  assert(requiredCases.includes(caseId), `unexpected browser case ${caseId}`);
  assert(!executed.has(caseId), `duplicate browser case ${caseId}`);
  executed.add(caseId);
  evidence[caseId] = witness;
};

async function stopNext() {
  if (nextProcess?.pid && nextProcess.exitCode === null) {
    try { process.kill(-nextProcess.pid, "SIGTERM"); } catch {}
    await wait(500);
  }
  nextProcess = null;
}

async function startNext() {
  nextProcess = spawn(process.execPath, [
    "--require", nextClockShim,
    nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port),
  ], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      PATH: process.env.PATH,
      NODE_ENV: "production",
      ...harness.frontendEnv,
    },
  });
  nextProcess.stdout.on("data", (chunk) => fs.appendFileSync(path.join(tempRoot, "next.log"), chunk));
  nextProcess.stderr.on("data", (chunk) => fs.appendFileSync(path.join(tempRoot, "next.log"), chunk));
  await waitForServer();
}

async function restartNext() {
  await stopNext();
  await startNext();
}

async function buildNext() {
  if (process.env.LKAI_W2_SKIP_BUILD === "1") return;
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "build"], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { PATH: process.env.PATH },
    });
    child.stdout.on("data", (chunk) => fs.appendFileSync(path.join(tempRoot, "build.log"), chunk));
    child.stderr.on("data", (chunk) => fs.appendFileSync(path.join(tempRoot, "build.log"), chunk));
    child.once("error", reject);
    child.once("close", (code) => code === 0 ? resolve() : reject(new Error(`next build exited ${code}`)));
  });
}

async function launchChrome() {
  const profile = path.join(tempRoot, "chrome-profile");
  await fsp.mkdir(profile, { recursive: true });
  chromeProcess = spawn(chromeBin, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    `--user-data-dir=${profile}`, "--remote-debugging-port=0", "about:blank",
  ], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(profile, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((entry) => entry.type === "page");
  assert(target, "Chrome did not expose a page target");
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Network.enable");
  cdp.on("Network.requestWillBeSent", ({ request }) => {
    if (request?.url) networkRequests.push({ url: request.url, method: request.method, postData: request.postData ?? null });
  });
  cdp.on("Network.responseReceived", ({ response }) => {
    if (!response?.url?.startsWith(baseUrl)) return;
    const pathname = new URL(response.url).pathname;
    if (!["/api/keyword-research", "/api/run-intents/claim", "/api/runs"].includes(pathname)) return;
    networkResponses.push({ pathname, status: response.status });
  });
}

function exactObjectKeys(value, expected, label) {
  assert(value && typeof value === "object" && !Array.isArray(value), `${label} is not an object`);
  assert(
    Object.keys(value).sort().join("\0") === [...expected].sort().join("\0"),
    `${label} has an unexpected shape`,
  );
}

async function assertDirectLegacyExpiryExactHour() {
  const response = await fetch(`${harness.frontendEnv.BACKEND_API_BASE_URL}/api/run-intents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${harness.frontendEnv.BACKEND_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shopTypes: ["Independent eyewear"] }),
  });
  let payload = await response.json();
  assert(response.status === 201, `legacy intent preflight status changed: ${response.status}`);
  exactObjectKeys(payload, ["intentId", "expiresAt"], "legacy intent preflight");
  assert(
    typeof payload.intentId === "string" && /^intent_[A-Za-z0-9_-]{32}$/u.test(payload.intentId),
    "legacy intent preflight ID is malformed",
  );
  const expiresAtMs = typeof payload.expiresAt === "string" ? Date.parse(payload.expiresAt) : Number.NaN;
  const harnessNowMs = Date.parse("2026-01-01T00:00:00.000Z");
  assert(
    Number.isFinite(expiresAtMs) && expiresAtMs - harnessNowMs === 3_600_000,
    "legacy intent preflight expiry class is not exact_hour",
  );
  payload = null;
  return { status: response.status, responseShape: "strict", expiryClass: "exact_hour" };
}

function parseStrictKeywordContinuation(bytes) {
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error("server-side claim replay returned unreadable JSON");
  }
  exactObjectKeys(payload, ["kind", "research"], "claim continuation");
  assert(payload.kind === "keyword_research", "claim continuation kind changed");
  exactObjectKeys(payload.research, [
    "id", "statusUrl", "state", "generation", "contractVersion", "seeds", "markets",
    "progress", "result", "selection", "selectionRevision", "selectionConflicts", "safeError",
    "createdAt", "startedAt", "completedAt", "updatedAt",
  ], "claim research");
  assert(/^kr_[A-Za-z0-9_-]{24}$/u.test(payload.research.id), "claim research id is malformed");
  assert(payload.research.state === "queued", "first claim research is not queued");
  assert(payload.research.generation === 1 && payload.research.contractVersion === 1, "claim research version changed");
  assert(
    Array.isArray(payload.research.seeds) &&
      payload.research.seeds.length >= 1 &&
      payload.research.seeds.length <= 5 &&
      payload.research.seeds.every((seed) => typeof seed === "string"),
    "claim research seeds are malformed",
  );
  assert(Array.isArray(payload.research.markets) && payload.research.markets.length > 0, "claim research markets are missing");
  assert(Array.isArray(payload.research.selection), "claim research selection is malformed");
  payload = null;
}

function armRequestStageClaimReplay(cdp, cookieHeader) {
  let requestSeenResolve;
  let releaseResolve;
  let completedResolve;
  let completedReject;
  const requestSeen = new Promise((resolve) => { requestSeenResolve = resolve; });
  const releaseGate = new Promise((resolve) => { releaseResolve = resolve; });
  const completed = new Promise((resolve, reject) => {
    completedResolve = resolve;
    completedReject = reject;
  });
  let handled = false;
  cdp.on("Fetch.requestPaused", async (event) => {
    if (handled) {
      await cdp.send("Fetch.continueRequest", { requestId: event.requestId });
      return;
    }
    handled = true;
    requestSeenResolve();
    await releaseGate;
    let witness;
    let failure;
    try {
      const requestHeaders = event.request.headers ?? {};
      const header = (name) => Object.entries(requestHeaders)
        .find(([key]) => key.toLowerCase() === name)?.[1];
      const headers = { Cookie: cookieHeader };
      const contentType = header("content-type");
      const accept = header("accept");
      if (contentType) headers["Content-Type"] = contentType;
      if (accept) headers.Accept = accept;
      const replayResponse = await fetch(event.request.url, {
        method: event.request.method,
        headers,
        body: event.request.postData || undefined,
      });
      const responseBytes = new Uint8Array(await replayResponse.arrayBuffer());
      assert([200, 201].includes(replayResponse.status), `server-side claim replay status was ${replayResponse.status}`);
      parseStrictKeywordContinuation(responseBytes);
      const byteCount = responseBytes.byteLength;
      responseBytes.fill(0);
      witness = {
        serverReplayStatus: replayResponse.status,
        responseBytes: byteCount,
        browserRequestSent: false,
        browserResponseDelivered: false,
      };
    } catch (error) {
      failure = error;
    }
    await cdp.send("Fetch.failRequest", { requestId: event.requestId, errorReason: "Aborted" }).catch(() => {});
    cookieHeader = "";
    if (failure) completedReject(failure);
    else completedResolve(witness);
  });
  return {
    requestSeen,
    completed,
    release() { releaseResolve(); },
  };
}

async function assertResponsiveLanding() {
  const viewports = [[390, 844], [768, 1024], [1280, 800]];
  const witnesses = [];
  for (const [width, height] of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await navigate(cdp, "/");
    const snapshot = await evaluate(cdp, `(() => {
      const form = document.querySelector("#start-discovery");
      const box = form?.getBoundingClientRect();
      const cta = document.querySelector('a[href="#start-discovery"]');
      return {
        formClasses: form?.className ?? "",
        heroClasses: document.querySelector(".landing-hero")?.className ?? "",
        suggestionCount: document.querySelectorAll(".suggestion-chip").length,
        cta: cta?.getAttribute("href") ?? null,
        formWidth: box?.width ?? 0,
        overflow: document.documentElement.scrollWidth > innerWidth,
        button: form?.querySelector('button[type="submit"]')?.textContent?.trim() ?? "",
      };
    })()`);
    assert(snapshot.formClasses === "run-form-card run-start-form ds-card", `${width}px form classes changed`);
    assert(snapshot.heroClasses.includes("hero") && snapshot.heroClasses.includes("landing-hero"), `${width}px hero classes changed`);
    assert(snapshot.suggestionCount === 9, `${width}px suggestions changed`);
    assert(snapshot.cta === "#start-discovery", `${width}px CTA changed`);
    assert(snapshot.formWidth > 0 && snapshot.overflow === false, `${width}px layout is unusable`);
    witnesses.push({ width, height, ...snapshot });
  }
  activate("LKAI-FE-09", { viewports: witnesses });
}

try {
  assert(!(await probePortOccupied(port)), `loopback port ${port} is already occupied`);
  assert(fs.existsSync(chromeBin), `local Chrome is missing at ${chromeBin}`);
  assert(process.env.ALLOW_DATABASE_TESTS === "true", "ALLOW_DATABASE_TESTS=true is required");
  assert(
    typeof process.env.TEST_DATABASE_URL === "string" && process.env.TEST_DATABASE_URL.length > 0,
    "TEST_DATABASE_URL must identify an isolated non-production PostgreSQL database",
  );
  const { createKeywordIntelligenceE2eHarness } = await import(
    "../../../email_scraper/test/helpers/keyword-intelligence-e2e-harness.js"
  );
  tempRoot = await fsp.mkdtemp(path.join(os.tmpdir(), "storesignal-lkai-w2-"));
  nextClockShim = path.join(tempRoot, "harness-clock.cjs");
  await fsp.writeFile(
    nextClockShim,
    '"use strict"; Date.now = () => Date.parse("2026-01-01T00:00:00.000Z");\n',
    "utf8",
  );
  harness = await createKeywordIntelligenceE2eHarness();
  harness.setAuthOwner(null);
  await buildNext();
  await startNext();
  await launchChrome();

  await assertResponsiveLanding();

  const emptySeedRejection = await assertInvalidLandingSubmission("", 0, "empty-seed");
  const sixSeedRejection = await assertInvalidLandingSubmission(
    "one\ntwo\nthree\nfour\nfive\nsix",
    6,
    "six-seed",
  );
  activate("LKAI-FE-02", { submissions: [emptySeedRejection, sixSeedRejection] });

  const anonymousTraceFloor = harness.trace().length;
  const anonymousRequestFloor = networkRequests.length;
  await installCookie(cdp, legacyCookie, "intent_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  assert(
    (await cookiesFor(cdp)).some((cookie) => cookie.name === legacyCookie),
    "opposing legacy cookie precondition is absent",
  );
  await setInput(cdp, "#shop-types", "  Independent   Eyewear  \nsustainable clothing", 2);
  await submitLanding(cdp);
  await waitFor(cdp, "location.pathname === '/sign-up'", "anonymous sign-up navigation");
  const anonymousCookies = await cookiesFor(cdp);
  const pendingKeyword = anonymousCookies.find((cookie) => cookie.name === keywordCookie);
  assert(
    pendingKeyword?.httpOnly === true && pendingKeyword.secure === true &&
      pendingKeyword.sameSite === "Lax" && pendingKeyword.path === "/",
    "keyword intent cookie flags are wrong",
  );
  assert(!anonymousCookies.some((cookie) => cookie.name === legacyCookie), "legacy cookie survived keyword intent creation");
  const preAuthCookieWitness = await pendingCookieWitness(cdp, "before-auth-install");
  const preAuthState = await harness.readDurableState();
  const preAuthTrace = harness.trace().slice(anonymousTraceFloor);
  assert(preAuthState.research.researchId === "", "anonymous submit created research");
  assert(keywordSends(preAuthTrace).length === 0, "anonymous submit dispatched keyword work");
  assert(providerCalls(preAuthTrace).length === 0, "anonymous submit called a provider");
  const anonymousRequests = networkRequests.slice(anonymousRequestFloor);
  assert(anonymousRequests.some((entry) => entry.method === "POST" && entry.url.endsWith("/api/keyword-research")), "landing did not call keyword BFF");
  assert(!anonymousRequests.some((entry) => entry.method === "POST" && entry.url.endsWith("/api/runs")), "landing restored the legacy run POST");
  activate("LKAI-FE-03", { cookie: keywordCookie, researchCount: 0, initializeSends: 0, providerCalls: 0 });

  const keywordCreationClearedLegacy = !anonymousCookies.some((cookie) => cookie.name === legacyCookie);
  await installCookie(cdp, legacyCookie, "intent_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  const preClaimPendingNames = (await cookiesFor(cdp))
    .filter((cookie) => cookie.name === keywordCookie || cookie.name === legacyCookie)
    .map((cookie) => cookie.name)
    .sort();
  assert(
    preClaimPendingNames.join("\0") === [keywordCookie, legacyCookie].sort().join("\0"),
    "both pending cookies were not installed before successful keyword claim",
  );

  harness.setAuthOwner(harness.ownerId);
  await installCookie(cdp, harness.browserSessionCookie.name, harness.browserSessionCookie.value, { secure: true });
  const postAuthCookieWitness = await pendingCookieWitness(cdp, "after-auth-install");
  const claimCookieHeader = (await cookiesFor(cdp))
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const claimRequestReplay = armRequestStageClaimReplay(cdp, claimCookieHeader);
  await cdp.send("Fetch.enable", {
    patterns: [{ urlPattern: `${baseUrl}/api/run-intents/claim`, requestStage: "Request" }],
  });
  const claimTraceFloor = harness.trace().length;
  await navigate(cdp, "/runs/continue");
  await Promise.race([
    claimRequestReplay.requestSeen,
    wait(30_000).then(() => { throw new Error("browser claim request was not paused before delivery"); }),
  ]);
  const preCommitCookieWitness = await pendingCookieWitness(cdp, "after-navigation-before-claim-commit");
  claimRequestReplay.release();
  const lossWitness = await Promise.race([
    claimRequestReplay.completed,
    wait(30_000).then(() => { throw new Error("server-side claim replay did not complete"); }),
  ]);
  assert([200, 201].includes(lossWitness.serverReplayStatus), "server-side claim replay did not succeed");
  assert(lossWitness.responseBytes > 0, "server-side claim replay returned an empty response");
  assert(lossWitness.browserRequestSent === false, "paused browser claim reached the server");
  assert(lossWitness.browserResponseDelivered === false, "paused browser claim received response material");
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if ((await harness.readDurableState()).research.researchId) break;
    await wait(50);
  }
  const afterLostResponse = await harness.readDurableState();
  assert(afterLostResponse.research.ownerId === harness.ownerId, "post-auth claim did not create owner research");
  assert(keywordSends(harness.trace().slice(claimTraceFloor)).length === 1, "first authenticated claim did not send exactly one initialize");
  const postDropCookieWitness = await pendingCookieWitness(cdp, "after-request-stage-browser-failure");
  await cdp.send("Fetch.disable");
  await navigate(cdp, "/runs/continue");
  await waitFor(cdp, "location.pathname.startsWith('/keywords/kr_')", "same-owner claim retry navigation");
  const retryPath = await evaluate(cdp, "location.pathname");
  assert(retryPath === `/keywords/${encodeURIComponent(afterLostResponse.research.researchId)}`, "claim retry changed research identity");
  assert(keywordSends(harness.trace().slice(claimTraceFloor)).length === 1, "claim retry amplified immediate dispatch");
  const claimedCookies = await cookiesFor(cdp);
  const successfulClaimClearedBoth = !claimedCookies.some(
    (cookie) => cookie.name === keywordCookie || cookie.name === legacyCookie,
  );
  assert(successfulClaimClearedBoth, "successful claim did not clear both pending cookies");
  activate("LKAI-FE-04", { ownerId: harness.ownerId, researchId: afterLostResponse.research.researchId, initializeSends: 1 });
  activate("LKAI-FE-05", {
    researchId: afterLostResponse.research.researchId,
    retryPath,
    initializeSends: 1,
    lossBoundary: lossWitness,
    cookieCustody: [
      preAuthCookieWitness,
      postAuthCookieWitness,
      preCommitCookieWitness,
      postDropCookieWitness,
    ],
  });

  const signedInOneSeed = await submitSignedInLanding("independent eyewear", 1);
  const signedInFiveSeeds = await submitSignedInLanding(
    "clothing\neyewear\nhome decor\npet supplies\nskincare",
    5,
  );
  activate("LKAI-FE-01", { submissions: [signedInOneSeed, signedInFiveSeeds] });

  harness.setAuthOwner(null);
  await clearAuthCookies(cdp);
  await assertNoAuthCookies(cdp, "after-owner-session-clear");
  const noneAuthTraceFloor = harness.trace().length;
  await restartNext();
  await navigate(cdp, "/");
  await waitForHarnessTrace(
    noneAuthTraceFloor,
    (event) => event.kind === "auth" && event.op === "get-session" && event.mode === "none",
    "owner-none auth endpoint response",
  );
  await assertNoAuthCookies(cdp, "before-legacy-intent-create");
  const legacyExpiryPreflight = await assertDirectLegacyExpiryExactHour();
  await installCookie(cdp, keywordCookie, "intent_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const legacyBackendTraceFloor = harness.trace().length;
  const legacyCreate = await evaluate(cdp, `(async () => {
    const response = await fetch("/api/runs", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopTypes: ["Independent eyewear"] })
    });
    return { status: response.status, body: await response.json() };
  })()`);
  const legacyErrorCode = typeof legacyCreate.body?.error?.code === "string"
    ? legacyCreate.body.error.code
    : "MISSING_ERROR_CODE";
  let legacySafeDiagnostic = null;
  if (legacyCreate.status !== 401 || legacyErrorCode !== "AUTHENTICATION_REQUIRED") {
    const backendTrace = harness.trace().slice(legacyBackendTraceFloor).find((event) =>
      event.kind === "http" && event.method === "POST" && event.path === "/api/run-intents");
    const directResponse = await fetch(`${harness.frontendEnv.BACKEND_API_BASE_URL}/api/run-intents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${harness.frontendEnv.BACKEND_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shopTypes: ["Independent eyewear"] }),
    });
    let directPayload = await directResponse.json();
    const keys = directPayload && typeof directPayload === "object" && !Array.isArray(directPayload)
      ? Object.keys(directPayload).sort()
      : [];
    const intentPattern = typeof directPayload?.intentId === "string" &&
      /^intent_[A-Za-z0-9_-]{32}$/u.test(directPayload.intentId);
    const expiresAtMs = typeof directPayload?.expiresAt === "string"
      ? Date.parse(directPayload.expiresAt)
      : Number.NaN;
    const harnessNowMs = Date.parse("2026-01-01T00:00:00.000Z");
    const deltaSeconds = Number.isFinite(expiresAtMs)
      ? Math.floor((expiresAtMs - harnessNowMs) / 1_000)
      : null;
    legacySafeDiagnostic = {
      bffFailureClass: typeof legacyCreate.body?.error?.message === "string" &&
        legacyCreate.body.error.message.includes("invalid pending search")
        ? "invalid_pending_search"
        : "unreadable_backend_response",
      backendTraceStatus: backendTrace?.status ?? null,
      directStatus: directResponse.status,
      keys,
      intentPattern,
      expiresFinite: Number.isFinite(expiresAtMs),
      expiresFutureAtHarnessClock: Number.isFinite(expiresAtMs) && expiresAtMs > harnessNowMs,
      maxAgeClassified: deltaSeconds !== null && deltaSeconds >= 1 && deltaSeconds <= 3_600,
    };
    directPayload = null;
  }
  assert(
    legacyCreate.status === 401 && legacyErrorCode === "AUTHENTICATION_REQUIRED",
    `legacy pending intent creation failed: status=${legacyCreate.status} code=${legacyErrorCode} diagnostic=${JSON.stringify(legacySafeDiagnostic)}`,
  );
  const legacyPendingCookies = await cookiesFor(cdp);
  const pendingLegacy = legacyPendingCookies.find((cookie) => cookie.name === legacyCookie);
  assert(pendingLegacy, "legacy cookie was not created");
  assert(
    pendingLegacy.httpOnly === true && pendingLegacy.secure === true &&
      pendingLegacy.sameSite === "Lax" && pendingLegacy.path === "/",
    "legacy intent cookie flags are wrong",
  );
  assert(!legacyPendingCookies.some((cookie) => cookie.name === keywordCookie), "legacy intent did not clear keyword cookie");
  activate("LKAI-FE-07", {
    keywordCreationClearedLegacy,
    successfulClaimClearedBoth,
    legacyCreationClearedKeyword: !legacyPendingCookies.some((cookie) => cookie.name === keywordCookie),
    productionCookieFlags: {
      keyword: { httpOnly: true, secure: true, sameSite: "Lax", path: "/" },
      legacy: { httpOnly: true, secure: true, sameSite: "Lax", path: "/" },
    },
    legacyExpiryPreflight,
  });

  const legacyKeywordSendFloor = keywordSends(harness.trace()).length;
  harness.setAuthOwner(harness.ownerId);
  await installCookie(cdp, harness.browserSessionCookie.name, harness.browserSessionCookie.value, { secure: true });
  await navigate(cdp, "/runs/continue");
  await waitFor(cdp, "location.pathname.startsWith('/runs/run_')", "legacy continuation navigation");
  assert(keywordSends(harness.trace()).length === legacyKeywordSendFloor, "legacy continuation sent keyword initialize");
  activate("LKAI-FE-06", { destination: await evaluate(cdp, "location.pathname"), keywordInitializeDelta: 0 });

  const emptyCookieCases = [
    await assertEmptyPendingCookieDeleted(keywordCookie),
    await assertEmptyPendingCookieDeleted(legacyCookie),
  ];
  const malformedIntent = await assertRejectedKeywordIntent("malformed", "malformed", 0);
  const missingIntent = await assertRejectedKeywordIntent(
    "intent_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    "valid-missing",
    1,
  );
  const expiredIntentId = await createExpirableKeywordIntent();
  const expiryFault = await harness.injectCapturedDefect("expire-latest-unclaimed-keyword-intent");
  assert(
    expiryFault?.faultId === "expire-latest-unclaimed-keyword-intent" && expiryFault.updatedCount === 1,
    "expired intent fixture did not update exactly one fully unclaimed intent",
  );
  const expiredIntent = await assertRejectedKeywordIntent(expiredIntentId, "actual-expired", 1);
  activate("LKAI-FE-08", {
    emptyCookieCases,
    rejections: [malformedIntent, missingIntent, expiredIntent],
    expiryFixture: { faultId: expiryFault.faultId, updatedCount: 1 },
  });

  assert([...executed].sort().join("\n") === [...requiredCases].sort().join("\n"), "browser case registry is incomplete");
  const nonLoopback = networkRequests.filter(({ url }) => {
    try {
      const host = new URL(url).hostname;
      return host !== "127.0.0.1" && host !== "localhost";
    } catch {
      return true;
    }
  });
  assert(nonLoopback.length === 0, `non-loopback browser operations observed: ${JSON.stringify(nonLoopback.slice(0, 3))}`);
  assert(providerCalls(harness.trace()).length === 0, "provider activity occurred without a worker drain");
  process.stdout.write(`${JSON.stringify({
    registry: { required: [...requiredCases].sort(), executed: [...executed].sort(), digest: setDigest(requiredCases) },
    evidence,
    externalActionCount: 0,
  }, null, 2)}\n`);
} finally {
  if (cdp) cdp.close();
  if (chromeProcess?.pid && chromeProcess.exitCode === null) {
    try { process.kill(-chromeProcess.pid, "SIGTERM"); } catch {}
  }
  await stopNext();
  if (harness) await harness.close();
  if (tempRoot) await fsp.rm(tempRoot, { recursive: true, force: true });
}
