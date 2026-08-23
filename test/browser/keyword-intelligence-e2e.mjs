import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fsSync from "node:fs";
import fsp from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { createKeywordIntelligenceE2eHarness } from '../../../email_scraper/test/helpers/keyword-intelligence-e2e-harness.js';

const root = process.cwd();
const port = 4357;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const backendRoot = path.resolve(root, "..", "email_scraper");
const chromeBin = "/usr/bin/google-chrome";
const skipBuild = process.env.KI_W6_SKIP_BUILD === "1";
const FORBIDDEN_RUNTIME_HOSTS = ["cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com"];
const FORBIDDEN_LOCAL_PATH_PATTERNS = [".py", "sqlite", "KeywordSearchVolume", "data/raw", "data/output", "output.json", "file://"];
const stripComments = (filePath, text) => {
  if (filePath.endsWith(".css")) return text.replace(/\/\*[\s\S]*?\*\//g, "");
  if (/\.(js|mjs|ts|tsx)$/u.test(filePath)) return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/[^\n]*/gm, "");
  return text;
};
const CLEANUP_ORDER = ["browser", "next-server", "auth-server", "backend-server", "schema-absence", "temp-root"];
const manifestPath = path.resolve(root, "../email_scraper/test/fixtures/keyword-intelligence/ki-w6-enforcement-manifest-v1.json");
const SEEDS = ["insulated water bottle", "stainless lunch box", "silicone baking mat", "glass storage jar", "reusable straw set"];
const DASHBOARD_SURFACES = [
  "surface:research-dashboard",
  "surface:filter-bar",
  "surface:summary-cards",
  "surface:keyword-table",
  "surface:selection-review",
  "surface:chart-panels",
  "surface:cluster-landscape",
];
const CHART_SURFACES = [
  "chart:top-keywords",
  "chart:cluster-volume",
  "chart:bubble",
  "chart:scatter",
  "chart:intent",
  "chart:recommended",
  "chart:seeds",
  "chart:histogram",
  "chart:treemap",
  "chart:flags",
  "chart:history",
];
const INVENTORY_ROOTS = [
  ["backend", "package.json"],
  ["backend", "scripts/build-keyword-worker.js"],
  ["backend", "src/aws-pipeline/keyword-intelligence/handler.js"],
  ["backend", "src/server.js"],
  ["frontend", "package.json"],
  ["frontend", "app/keywords/page.tsx"],
  ["frontend", "app/keywords/[researchId]/page.tsx"],
  ["frontend", "app/runs/[runId]/page.tsx"],
  ["frontend", "app/api/keyword-research/route.ts"],
  ["frontend", "app/api/keyword-research/[researchId]/route.ts"],
  ["frontend", "app/api/keyword-research/[researchId]/selection/route.ts"],
  ["frontend", "app/api/keyword-research/[researchId]/runs/route.ts"],
  ["frontend", "app/api/keyword-research/[researchId]/export.csv/route.ts"],
];
const CODE_EXTENSIONS = [".js", ".mjs", ".ts", ".tsx"];
const RESOLVE_EXTENSIONS = [".js", ".mjs", ".ts", ".tsx", ".json", ".css"];
const SUBSTITUTE_LEDGER = [
  {
    boundary: "browser-frontend",
    actual: "production next build + next start + local Chrome CDP",
    mayProve: "emitted component, route-handler, client, navigation and UI behavior",
    mustNotClaim: "deployed CDN/network/browser population",
  },
  {
    boundary: "authentication",
    actual: "installed Neon Auth server client and /runs middleware against deterministic loopback /get-session, with one CDP-seeded opaque local session token",
    mayProve: "actual auth-client and middleware calls, protected-workspace routing, cookie transport, and owner propagation/denial branches",
    mustNotClaim: "live Neon Auth availability, external token issuance or validation, credential verification, cookie-cryptography assurance, or external session security",
  },
  {
    boundary: "backend-database",
    actual: "actual backend server and Prisma repositories in one migrated isolated schema",
    mayProve: "strict API, SQL ownership/CAS/transactions, durable restart behavior",
    mustNotClaim: "production database latency/permissions/transport",
  },
  {
    boundary: "dataforseo-google",
    actual: "actual keyword adapter/parser via runtime.http; actual research validator and Google response parser via the existing injected validation dependency",
    mayProve: "keyword request shape, strict parsing, 19/100 call cardinality and causal downstream data",
    mustNotClaim: "live provider pricing/quota/availability/transport, Google URL/request execution, or awsProbeSearchPage artifact-wrapper integration",
  },
  {
    boundary: "s3-sqs",
    actual: "strict memory adapters calling actual service/message contracts",
    mayProve: "immutable-key conflict, schema validation, idempotent choreography and per-item identities",
    mustNotClaim: "AWS IAM, encryption, transport, visibility, DLQ or Lambda event behavior",
  },
  {
    boundary: "lambda-package",
    actual: "unchanged accepted W3/R4 build evidence",
    mayProve: "no W6 source invalidated the accepted worker package proof",
    mustNotClaim: "new build, deployed execution or resource envelope measurement",
  },
];

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const setDigest = (members) => {
  const sorted = [...new Set(members)].sort();
  const bytes = sorted.map((member) => Buffer.from(`${member}\n`, "utf8"));
  return createHash("sha256").update(Buffer.concat(bytes)).digest("hex");
};
const arrayEqual = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value === b[index]);
const jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const relativePathOf = (absolutePath) => absolutePath.replace(`${backendRoot}/`, "").replace(`${root}/`, "");

const oracles = {
  navDestination(witness) {
    if (!witness.runId) throw new Error("KI_W6_NAV_DESTINATION_MISMATCH");
    if (witness.expectedRoute !== `/runs/${encodeURIComponent(witness.runId)}`) throw new Error("KI_W6_NAV_DESTINATION_MISMATCH");
    if (witness.locationPathname !== witness.expectedRoute) throw new Error("KI_W6_NAV_DESTINATION_MISMATCH");
    if (witness.locationPathname === witness.statusUrlPathname) throw new Error("KI_W6_NAV_STATUSURL_AUTHORITY");
  },
  authChain(tuple) {
    if (!tuple.chromeRequest || !tuple.authEvent || !tuple.backendEvent) throw new Error("KI_W6_AUTH_CHAIN_BROKEN");
    if (tuple.authEvent.kind !== "auth" || tuple.authEvent.op !== "get-session") throw new Error("KI_W6_AUTH_CHAIN_BROKEN");
    if (tuple.backendEvent.method !== "POST" || tuple.backendEvent.path !== tuple.backendPath) throw new Error("KI_W6_AUTH_CHAIN_BROKEN");
    if (tuple.ownerId !== tuple.expectedOwnerId) throw new Error("KI_W6_OWNERSHIP_BROKEN");
  },
  expansionTopology(expansion) {
    if (expansion.tuples.length !== 10) throw new Error("KI_W6_EXPANSION_TOPOLOGY_DIVERGED");
    const suggestions = expansion.tuples.filter((tuple) => tuple.taskType === "expansion-suggestions");
    const related = expansion.tuples.filter((tuple) => tuple.taskType === "expansion-related");
    if (suggestions.length !== 5 || related.length !== 5) throw new Error("KI_W6_EXPANSION_TOPOLOGY_DIVERGED");
    if (!expansion.tuples.every((tuple) => tuple.attempt === 1)) throw new Error("KI_W6_EXPANSION_ATTEMPT_DIVERGED");
    if (new Set(expansion.tuples.map((tuple) => tuple.requestFingerprint)).size !== 10) throw new Error("KI_W6_EXPANSION_TOPOLOGY_DIVERGED");
  },
  strictContract(fixture) {
    if (fixture.rejected !== true) throw new Error("KI_W6_STRICT_CONTRACT_BYPASSED");
    if (fixture.nextStageRows !== 0 || fixture.resultVisible !== false) throw new Error("KI_W6_STRICT_CONTRACT_BYPASSED");
  },
  durableVisibility(publicationSet) {
    for (const record of publicationSet) {
      if (record.visible !== true) throw new Error("KI_W6_DURABLE_VISIBILITY_UNFENCED");
      if (!record.fence) throw new Error("KI_W6_DURABLE_VISIBILITY_UNFENCED");
      if (record.rowCount !== 200 || record.defaultSelectionItemCount !== 100) throw new Error("KI_W6_DURABLE_VISIBILITY_UNFENCED");
    }
  },
  handoffAtomicity(handoff) {
    if (handoff.clientKeys.length !== 100 || new Set(handoff.clientKeys).size !== 100) throw new Error("KI_W6_HANDOFF_ATOMICITY_BROKEN");
    if (handoff.durableQueryCount !== 100) throw new Error("KI_W6_HANDOFF_ATOMICITY_BROKEN");
    if (handoff.runId !== handoff.durableRunId) throw new Error("KI_W6_HANDOFF_IDENTITY_BROKEN");
    if (!handoff.selectionFingerprint) throw new Error("KI_W6_HANDOFF_SNAPSHOT_BROKEN");
    if (handoff.retryClientRequestId !== handoff.firstClientRequestId) throw new Error("KI_W6_HANDOFF_IDENTITY_BROKEN");
    if (handoff.retrySelectionRevision !== handoff.firstSelectionRevision) throw new Error("KI_W6_HANDOFF_IDENTITY_BROKEN");
  },
  googleValidation(confirmation) {
    if (confirmation.pairs.length !== 100) throw new Error("KI_W6_GOOGLE_CARDINALITY_BROKEN");
    if (new Set(confirmation.pairs.map((pair) => pair.runQueryId)).size !== 100) throw new Error("KI_W6_GOOGLE_CARDINALITY_BROKEN");
    if (!confirmation.pairs.every((pair) => pair.occurrences === 10)) throw new Error("KI_W6_GOOGLE_CARDINALITY_BROKEN");
    if (confirmation.pairs.reduce((total, pair) => total + pair.occurrences, 0) !== 1000) throw new Error("KI_W6_GOOGLE_CARDINALITY_BROKEN");
  },
  domainReadiness(readiness) {
    if (readiness.stageComplete === true && readiness.terminalCount !== readiness.expectedCount) throw new Error("KI_W6_DOMAIN_READINESS_BROKEN");
    if (readiness.stageComplete === true && readiness.neonTerminalEvidence !== true) throw new Error("KI_W6_DOMAIN_READINESS_BROKEN");
  },
  requestChain(chain) {
    for (const link of chain) {
      if (link.source !== "chrome-network") throw new Error("KI_W6_REQUEST_CHAIN_UNFAITHFUL");
      if (!link.networkUrl || !link.authEvent || !link.backendEvent) throw new Error("KI_W6_REQUEST_CHAIN_UNFAITHFUL");
    }
  },
  registryEquality(registry) {
    if (registry.required.length !== 26) throw new Error("KI_W6_REGISTRY_EQUALITY_BROKEN");
    if (!arrayEqual(registry.required, registry.registered) || !arrayEqual(registry.required, registry.executed)) throw new Error("KI_W6_REGISTRY_EQUALITY_BROKEN");
    if (registry.skipped.length || registry.duplicates.length || registry.unexpected.length || registry.unactivated.length) throw new Error("KI_W6_REGISTRY_EQUALITY_BROKEN");
  },
  activationCompleteness(witnesses, required) {
    if (witnesses.size !== 26) throw new Error("KI_W6_ACTIVATION_BROKEN");
    for (const id of required) {
      const witness = witnesses.get(id);
      if (!witness || witness.caseId !== id) throw new Error("KI_W6_ACTIVATION_BROKEN");
      if (typeof witness.evidenceRef !== "string" || witness.evidenceRef.length === 0) throw new Error("KI_W6_ACTIVATION_BROKEN");
    }
    const refs = [...witnesses.values()].map((witness) => witness.evidenceRef);
    if (new Set(refs).size !== refs.length) throw new Error("KI_W6_ACTIVATION_BROKEN");
  },
  substituteFidelity(claims) {
    if (!arrayEqual(claims.map((claim) => claim.boundary), SUBSTITUTE_LEDGER.map((claim) => claim.boundary))) throw new Error("KI_W6_SUBSTITUTE_FIDELITY_BROKEN");
    for (let index = 0; index < SUBSTITUTE_LEDGER.length; index += 1) {
      const actual = claims[index];
      const frozen = SUBSTITUTE_LEDGER[index];
      if (actual.actual !== frozen.actual || actual.mayProve !== frozen.mayProve || actual.mustNotClaim !== frozen.mustNotClaim) throw new Error("KI_W6_SUBSTITUTE_FIDELITY_BROKEN");
    }
  },
  obsoleteExclusion(inventory) {
    if (!arrayEqual(inventory.roots, INVENTORY_ROOTS.map(([treeName, relativePath]) => `${treeName}:${relativePath}`))) throw new Error("KI_W6_OBSOLETE_SCOPE_BROKEN");
    if (inventory.standaloneInsideRoots === true) throw new Error("KI_W6_OBSOLETE_SCOPE_BROKEN");
    const hits = [];
    for (const member of inventory.members) {
      const content = stripComments(member.path, member.content || "");
      for (const pattern of FORBIDDEN_LOCAL_PATH_PATTERNS) {
        if (member.path.includes(pattern) || content.includes(pattern)) hits.push({ path: member.path, pattern, kind: "local" });
      }
      for (const host of FORBIDDEN_RUNTIME_HOSTS) {
        if (content.includes(host)) hits.push({ path: member.path, pattern: host, kind: "host" });
      }
    }
    if (hits.length > 0) throw new Error(`KI_W6_OBSOLETE_RUNTIME_MEMBER:${JSON.stringify(hits.slice(0, 3))}`);
  },
};

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
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
      if (message.method) {
        for (const handler of this.listeners || []) {
          if (handler.method === message.method) handler.fn(message.params);
        }
      }
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  on(method, fn) {
    this.listeners = this.listeners || [];
    this.listeners.push({ method, fn });
  }
  close() {
    this.socket.close();
  }
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(cdp, expression, label, timeout = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(cdp, `Boolean(${expression})`)) return;
    await wait(100);
  }
  const diagnostic = await evaluate(cdp, `(() => ({
    url: location.href,
    text: document.body.innerText.slice(0, 1200),
    requests: globalThis.__kiNetLog ? globalThis.__kiNetLog.slice(-12) : []
  }))()`);
  throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(diagnostic)}`);
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitFor(cdp, "document.readyState === 'complete'", url);
}

async function setViewport(cdp, width, height, deviceScaleFactor = 1) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor, mobile: width < 600 });
}

async function click(cdp, expression) {
  const clicked = await evaluate(cdp, `(() => { const node = ${expression}; if (!node) return false; node.click(); return true; })()`);
  if (!clicked) throw new Error(`Missing click target: ${expression}`);
}

async function setInputValue(cdp, selector, value) {
  const ok = await evaluate(cdp, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return false;
    node.focus();
    const proto = node.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(node, ${JSON.stringify(value)});
    node.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: ${JSON.stringify(value)} }));
    return true;
  })()`);
  if (!ok) throw new Error(`Missing input: ${selector}`);
}

async function typeInputValue(cdp, selector, value) {
  const focused = await evaluate(cdp, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return false;
    node.focus();
    node.select();
    return true;
  })()`);
  if (!focused) throw new Error(`Missing input: ${selector}`);
  await cdp.send("Input.insertText", { text: value });
}

async function waitForServer() {
  for (let index = 0; index < 240; index += 1) {
    try {
      if ((await fetch(`${baseUrl}/keywords`)).ok) return;
    } catch {}
    await wait(500);
  }
  throw new Error("Next.js production server did not become ready on the loopback bind");
}

async function waitForFile(file) {
  for (let index = 0; index < 100; index += 1) {
    try {
      return await fsp.readFile(file, "utf8");
    } catch {}
    await wait(100);
  }
  throw new Error(`Timed out waiting for ${file}`);
}

const netlogOf = (cdp) => evaluate(cdp, "globalThis.__kiNetLog ? globalThis.__kiNetLog.slice() : []");
const absoluteUrlOf = (url) => (url.startsWith("/") ? `${baseUrl}${url}` : url);

const observerSource = `(() => {
  if (globalThis.__kiNetLog) return;
  const log = [];
  globalThis.__kiNetLog = log;
  try {
    const saved = sessionStorage.getItem("__kiNetLogArchive");
    if (saved) for (const entry of JSON.parse(saved)) log.push(entry);
  } catch {}
  const archive = () => { try { sessionStorage.setItem("__kiNetLogArchive", JSON.stringify(log)); } catch {} };
  const hash = (value) => { let h = 2166136261; for (let i = 0; i < value.length; i += 1) { h ^= value.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, "0"); };
  const originalFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : (input && input.url) || String(input);
    const method = (init && init.method) || (input && input.method) || "GET";
    const body = init && init.body != null ? String(init.body) : null;
    const entry = { url, method, bodyDigest: body ? hash(body) : null, requestBody: null, responseStatus: null, responseBody: null, errorText: null };
    try {
      if (body && /\\/runs$/.test(url)) entry.requestBody = JSON.parse(body);
      if (body && /\\/selection$/.test(url)) entry.requestBody = JSON.parse(body);
    } catch {}
    log.push(entry);
    archive();
    try {
      const response = await originalFetch(input, init);
      entry.responseStatus = response.status;
      if (/\\/runs$/.test(url)) { const clone = response.clone(); entry.responseBody = await clone.text(); }
      archive();
      return response;
    } catch (error) {
      entry.responseStatus = -1;
      entry.errorText = String((error && error.message) || error);
      archive();
      throw error;
    }
  };
})();`;

function buildDependencyInventory() {
  const members = [];
  const seen = new Set();
  const barePackages = new Set();
  const queue = [];
  const rootFor = (treeName) => (treeName === "backend" ? backendRoot : root);
  for (const [treeName, relativePath] of INVENTORY_ROOTS) {
    queue.push({ treeName, absolutePath: path.join(rootFor(treeName), relativePath) });
  }
  for (const [treeName, relativePath] of INVENTORY_ROOTS) {
    if (relativePath === "package.json") {
      const parsed = JSON.parse(fsSync.readFileSync(path.join(rootFor(treeName), relativePath), "utf8"));
      for (const key of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
        for (const name of Object.keys(parsed[key] || {})) barePackages.add(name);
      }
    }
  }
  const resolveLocal = (treeName, specifier, fromFile) => {
    const base = specifier.startsWith("@/")
      ? path.join(root, specifier.slice(2))
      : path.resolve(path.dirname(fromFile), specifier);
    const candidates = [base];
    for (const extension of RESOLVE_EXTENSIONS) candidates.push(`${base}${extension}`);
    for (const extension of RESOLVE_EXTENSIONS) candidates.push(path.join(base, `index${extension}`));
    for (const candidate of candidates) {
      try {
        if (fsSync.statSync(candidate).isFile()) return candidate;
      } catch {}
    }
    return null;
  };
  while (queue.length > 0) {
    const { treeName, absolutePath } = queue.shift();
    if (seen.has(absolutePath)) continue;
    seen.add(absolutePath);
    const content = fsSync.readFileSync(absolutePath, "utf8");
    members.push({ path: relativePathOf(absolutePath), content });
    if (!CODE_EXTENSIONS.some((extension) => absolutePath.endsWith(extension))) continue;
    const specifiers = new Set();
    for (const match of content.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g)) specifiers.add(match[1]);
    for (const match of content.matchAll(/\bimport\s*['"]([^'"]+)['"]/g)) specifiers.add(match[1]);
    for (const match of content.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)) specifiers.add(match[1]);
    const dynamicImports = [...content.matchAll(/\bimport\s*\(/g)].length;
    const literalDynamicImports = [...content.matchAll(/\bimport\s*\(\s*['"][^'"]+['"]\s*\)/g)].length;
    if (dynamicImports > literalDynamicImports) {
      throw new Error(`KI_W6_INVENTORY_NONLITERAL_DYNAMIC_IMPORT:${relativePathOf(absolutePath)}`);
    }
    for (const specifier of specifiers) {
      if (specifier.startsWith("./") || specifier.startsWith("../") || specifier.startsWith("@/") || specifier.startsWith("/")) {
        const resolved = resolveLocal(treeName, specifier, absolutePath);
        if (!resolved) throw new Error(`KI_W6_INVENTORY_UNRESOLVED_EDGE:${relativePathOf(absolutePath)}:${specifier}`);
        if (RESOLVE_EXTENSIONS.some((extension) => resolved.endsWith(extension))) queue.push({ treeName, absolutePath: resolved });
      } else if (specifier.startsWith("@/") === false) {
        const parts = specifier.split("/");
        barePackages.add(parts[0].startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0]);
      }
    }
  }
  const standalonePath = path.resolve(backendRoot, "..", "KeywordSearchVolume");
  return {
    roots: INVENTORY_ROOTS.map(([treeName, relativePath]) => `${treeName}:${relativePath}`),
    members,
    barePackages: [...barePackages].sort(),
    standaloneInsideRoots: members.some((member) => member.path.includes("KeywordSearchVolume")) || seen.has(standalonePath),
  };
}

const witnessMap = new Map();
const oracleResults = new Map();
const activate = (caseId, evidenceRef) => {
  assert(typeof caseId === "string" && caseId.length > 0, `activation witness requires a case id`);
  assert(typeof evidenceRef === "string" && evidenceRef.length > 0, `activation witness for ${caseId} requires captured evidence`);
  assert(!witnessMap.has(caseId), `duplicate activation witness for ${caseId}`);
  witnessMap.set(caseId, { caseId, evidenceRef });
  oracleResults.set(caseId, true);
};

let harness = null;
let nextProcess = null;
let chromeProcess = null;
let cdp = null;
let tempRoot = null;
const networkUrls = [];
const documentUrls = [];
const consoleErrors = [];
const exceptionThrown = [];
const peakRssKb = { build: 0, next: 0, chrome: 0 };
const captured = {};
const fetchIntervention = {
  enabled: false,
  aborted: false,
  abortError: null,
  abortErrorStage: null,
  responseStatus: null,
  requestIdentity: null,
  durableHandoff: null,
};

const appendLog = (name, chunk) => {
  if (!tempRoot) return;
  try {
    fsSync.appendFileSync(path.join(tempRoot, name), chunk);
  } catch {}
};

const readHwmKb = (pid) => {
  try {
    const status = fsSync.readFileSync(`/proc/${pid}/status`, "utf8");
    const match = status.match(/^VmHWM:\s+(\d+)\s+kB/m);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
};

const rssSampler = setInterval(() => {
  const children = [["build", buildChildRef.value], ["next", nextProcess], ["chrome", chromeProcess]];
  for (const [key, child] of children) {
    const kb = child?.pid && child.exitCode === null ? readHwmKb(child.pid) : null;
    if (kb != null) peakRssKb[key] = Math.max(peakRssKb[key], kb);
  }
}, 500);
rssSampler.unref();

const buildChildRef = { value: null };

const runNextBuild = () => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [nextBin, "build"], {
    cwd: root,
    env: { PATH: process.env.PATH, HOME: process.env.HOME },
    stdio: ["ignore", "pipe", "pipe"],
  });
  buildChildRef.value = child;
  child.stdout.on("data", (chunk) => appendLog("next-build.log", chunk));
  child.stderr.on("data", (chunk) => appendLog("next-build.log", chunk));
  child.on("error", reject);
  child.on("close", (code) => {
    buildChildRef.value = null;
    if (code === 0) resolve();
    else reject(new Error(`next build failed with exit ${code}; see next-build.log in the temporary artifact root`));
  });
});

const nextStartEnv = () => ({
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  NODE_ENV: "production",
  BACKEND_API_BASE_URL: harness.frontendEnv.BACKEND_API_BASE_URL,
  BACKEND_API_TOKEN: harness.frontendEnv.BACKEND_API_TOKEN,
  NEON_AUTH_BASE_URL: harness.frontendEnv.NEON_AUTH_BASE_URL,
  NEON_AUTH_COOKIE_SECRET: harness.frontendEnv.NEON_AUTH_COOKIE_SECRET,
});

const startNext = async () => {
  nextProcess = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: nextStartEnv(),
  });
  nextProcess.stdout.on("data", (chunk) => appendLog("next-start.log", chunk));
  nextProcess.stderr.on("data", (chunk) => appendLog("next-start.log", chunk));
  await waitForServer();
};

const stopNext = async () => {
  if (nextProcess?.pid && nextProcess.exitCode === null) {
    try {
      process.kill(-nextProcess.pid, "SIGTERM");
    } catch {}
    await wait(500);
  }
  nextProcess = null;
};

const restartNextServer = async () => {
  await stopNext();
  await startNext();
};

const launchChrome = async () => {
  const profileDir = path.join(tempRoot, "chrome-profile");
  await fsp.mkdir(profileDir, { recursive: true });
  chromeProcess = spawn(chromeBin, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    `--user-data-dir=${profileDir}`, "--remote-debugging-port=0", "about:blank",
  ], { detached: true, stdio: "ignore" });
  const debugPort = (await waitForFile(path.join(profileDir, "DevToolsActivePort"))).trim().split(/\r?\n/u)[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Chrome did not expose a page target");
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  await cdp.send("Network.enable");
  cdp.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error" || params.type === "assert") {
      consoleErrors.push(params.args.map((argument) => argument.value ?? argument.description ?? "").join(" "));
    }
  });
  cdp.on("Log.entryAdded", (params) => {
    if (params.entry && params.entry.level === "error") consoleErrors.push(params.entry.text);
  });
  cdp.on("Runtime.exceptionThrown", (params) => {
    exceptionThrown.push(JSON.stringify(params.exceptionDetails));
  });
  cdp.on("Network.requestWillBeSent", (params) => {
    if (!params.request?.url) return;
    networkUrls.push(params.request.url);
    if (params.type === "Document") documentUrls.push(params.request.url);
  });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: observerSource });
};

const probePortOccupied = () => new Promise((resolve) => {
  const socket = net.connect({ port, host: "127.0.0.1" });
  socket.once("connect", () => {
    socket.destroy();
    resolve(true);
  });
  socket.once("error", () => resolve(false));
});

const traceFrom = (fromIndex) => harness.trace().slice(fromIndex);
const waitForTrace = async (fromIndex, predicate, label, timeoutMs = 60000) => {
  const started = Date.now();
  for (;;) {
    const found = harness.trace().slice(fromIndex).find(predicate);
    if (found) return found;
    if (Date.now() - started > timeoutMs) throw new Error(`Timed out waiting for trace condition: ${label}`);
    await wait(10);
  }
};
const waitForNetlog = async (predicate, label, timeout = 30000) => {
  const started = Date.now();
  for (;;) {
    const entries = await netlogOf(cdp);
    const found = entries.find(predicate);
    if (found) return structuredClone(found);
    if (Date.now() - started > timeout) throw new Error(`Timed out waiting for browser request condition: ${label}`);
    await wait(50);
  }
};

const assertNetworkAllowlist = () => {
  const observed = networkUrls.filter((url) => !/^(about:|data:|blob:|chrome-extension:|devtools:)/u.test(url));
  const nonLoopback = observed.filter((url) => {
    try {
      const host = new URL(url).hostname;
      return host !== "127.0.0.1" && host !== "localhost";
    } catch {
      return true;
    }
  });
  assert(nonLoopback.length === 0, `network allowlist violated by non-loopback origins: ${JSON.stringify(nonLoopback.slice(0, 5))}`);
  for (const host of FORBIDDEN_RUNTIME_HOSTS) {
    const hits = observed.filter((url) => url.includes(host));
    assert(hits.length === 0, `network allowlist violated by forbidden host ${host}: ${JSON.stringify(hits.slice(0, 5))}`);
  }
};

const netlogCrossCheck = async () => {
  const entries = await netlogOf(cdp);
  for (const entry of entries) {
    const absolute = absoluteUrlOf(entry.url);
    assert(networkUrls.includes(absolute), `browser API call missing from the Chrome network trace: ${absolute}`);
  }
  return entries;
};

const waitForDurableHandoffCommit = async ({ clientRequestId, expectedSelectionRevision }) => {
  const started = Date.now();
  for (;;) {
    const snapshot = await harness.readDurableState();
    if (
      snapshot.handoff?.clientRequestId === clientRequestId &&
      snapshot.handoff?.selectionRevision === expectedSelectionRevision &&
      snapshot.run?.queryCount === 100
    ) {
      return snapshot;
    }
    if (Date.now() - started > 30000) throw new Error("timed out waiting for the committed backend handoff during the response-stage pause");
    await wait(50);
  }
};

const armRunsResponseAbort = async () => {
  let resolver = null;
  const done = new Promise((resolve) => {
    resolver = resolve;
  });
  cdp.on("Fetch.requestPaused", async (params) => {
    if (fetchIntervention.aborted) return;
    const url = params.request?.url || "";
    if (!url.endsWith("/runs") || params.request?.method !== "POST" || params.responseStatusCode === undefined) return;
    fetchIntervention.aborted = true;
    fetchIntervention.responseStatus = params.responseStatusCode;
    try {
      const requestBody = JSON.parse(params.request.postData || "");
      if (
        typeof requestBody?.clientRequestId !== "string" ||
        !Number.isSafeInteger(requestBody?.expectedSelectionRevision)
      ) {
        throw new Error("the intercepted handoff request identity is invalid");
      }
      fetchIntervention.requestIdentity = {
        clientRequestId: requestBody.clientRequestId,
        expectedSelectionRevision: requestBody.expectedSelectionRevision,
      };
      fetchIntervention.durableHandoff = await waitForDurableHandoffCommit(fetchIntervention.requestIdentity);
    } catch (error) {
      fetchIntervention.abortError = error;
      fetchIntervention.abortErrorStage = "durable-handoff-commit";
    }
    try {
      await cdp.send("Fetch.failRequest", { requestId: params.requestId, errorReason: "Failed" });
    } catch (error) {
      fetchIntervention.abortError = error;
      fetchIntervention.abortErrorStage = "fetch-fail-request";
    }
    try {
      await cdp.send("Fetch.disable");
      fetchIntervention.enabled = false;
    } catch {}
    resolver();
  });
  await cdp.send("Fetch.enable", { patterns: [{ urlPattern: `${baseUrl}/api/keyword-research/*/runs`, requestStage: "Response" }] });
  fetchIntervention.enabled = true;
  return done;
};

const swapOneSelectionItemViaUi = async () => {
  const selected = `[data-surface="surface:keyword-table"] tbody tr input[type=checkbox][aria-label^="Select"]`;
  await waitFor(cdp, `document.querySelectorAll('${selected}').length > 0`, "keyword table row checkboxes");
  await waitFor(cdp, `document.querySelector('[data-surface="surface:keyword-table"]')?.textContent.includes('Page 1 of')`, "keyword table page 1");

  const pageSignature = async () => evaluate(cdp, `(() => [...document.querySelectorAll('${selected}')].map((box) => box.getAttribute('aria-label') || '').join('\\n'))()`);
  const pageState = async () => evaluate(cdp, `(() => [...document.querySelectorAll('${selected}')].map((box) => ({ label: box.getAttribute('aria-label'), checked: box.checked })))()`);
  const checkedCandidate = { label: null, page: null };
  const uncheckedCandidate = { label: null, page: null };
  const seenLabels = new Set();
  let page = 1;

  const inventoryPage = async () => {
    const state = await pageState();
    assert(state.length > 0, `keyword table page ${page} must expose matching checkboxes`);
    for (const row of state) {
      assert(typeof row.label === "string" && row.label.trim().length > 0, `keyword table page ${page} contains an empty checkbox label`);
      assert(!seenLabels.has(row.label), `keyword table contains a repeated checkbox label: ${row.label}`);
      seenLabels.add(row.label);
    }
    if (!checkedCandidate.label) {
      const row = state.find((candidate) => candidate.checked);
      if (row) {
        checkedCandidate.label = row.label;
        checkedCandidate.page = page;
      }
    }
    if (!uncheckedCandidate.label) {
      const row = state.find((candidate) => !candidate.checked && candidate.label !== checkedCandidate.label);
      if (row) {
        uncheckedCandidate.label = row.label;
        uncheckedCandidate.page = page;
      }
    }
  };

  while ((!checkedCandidate.label || !uncheckedCandidate.label) && page <= 8) {
    await inventoryPage();
    if (checkedCandidate.label && uncheckedCandidate.label) break;
    assert(page < 8, "keyword table must expose both selection candidates by page eight");
    const before = await pageSignature();
    await click(cdp, ` [...document.querySelectorAll('[data-surface="surface:keyword-table"] button')].find((node) => node.textContent.trim() === 'Next' && !node.disabled)`);
    await waitFor(cdp, `(() => { const boxes = [...document.querySelectorAll('${selected}')]; return boxes.map((box) => box.getAttribute('aria-label') || '').join('\\n') !== ${JSON.stringify(before)}; })()`, `keyword table page ${page + 1}`);
    page += 1;
  }

  assert(checkedCandidate.label && uncheckedCandidate.label, "keyword table must expose distinct checked and unchecked candidates by page eight");
  assert(checkedCandidate.label !== uncheckedCandidate.label, "selection candidates must have different labels");

  const moveToPage = async (targetPage) => {
    const distance = Math.abs(page - targetPage);
    const direction = targetPage < page ? "Prev" : "Next";
    for (let index = 0; index < distance; index += 1) {
      const before = await pageSignature();
      await click(cdp, ` [...document.querySelectorAll('[data-surface="surface:keyword-table"] button')].find((node) => node.textContent.trim() === '${direction}' && !node.disabled)`);
      await waitFor(cdp, `(() => { const boxes = [...document.querySelectorAll('${selected}')]; return boxes.map((box) => box.getAttribute('aria-label') || '').join('\\n') !== ${JSON.stringify(before)}; })()`, `keyword table ${direction.toLowerCase()} page transition`);
      page += targetPage < page ? -1 : 1;
    }
  };

  await moveToPage(checkedCandidate.page);
  await click(cdp, `document.querySelector('${selected}[aria-label=${JSON.stringify(checkedCandidate.label)}]')`);
  await waitFor(cdp, `document.querySelector('${selected}[aria-label=${JSON.stringify(checkedCandidate.label)}]')?.checked === false`, "selection removal");
  await moveToPage(uncheckedCandidate.page);
  await click(cdp, `document.querySelector('${selected}[aria-label=${JSON.stringify(uncheckedCandidate.label)}]')`);
  await waitFor(cdp, `document.querySelector('${selected}[aria-label=${JSON.stringify(uncheckedCandidate.label)}]')?.checked === true`, "selection addition");
  await waitFor(cdp, `document.querySelector('[data-surface="surface:selection-review"]')?.textContent.includes('100 of 200 selected')`, "selection count");
};

const saveSelectionViaUi = async () => {
  await click(cdp, `[...document.querySelectorAll('[data-surface="surface:selection-review"] button')].find((node) => node.textContent.includes('Save selection'))`);
  await waitFor(cdp, `[...document.querySelectorAll('[data-surface="surface:selection-review"] button')].every((node) => !node.textContent.includes('Saving…'))`, "selection save settled");
  await wait(300);
};

const queryRowCount = async () => evaluate(cdp, `document.querySelectorAll('input[aria-label^="Query "]').length`);
const queryRowValues = async () => evaluate(cdp, `[...document.querySelectorAll('input[aria-label^="Query "]')].map((input) => input.value)`);
const queryRowBadges = async () => evaluate(cdp, `[...document.querySelectorAll('.query-row .query-badge')].map((badge) => badge.textContent)`);

const diagnostics = {
  ok: false,
  wallTimeMs: null,
  peakChildRssKb: peakRssKb,
  buildSkipped: skipBuild,
  port,
  chromeProcesses: 1,
  viewports: ["1440x900", "390x844"],
  mainError: null,
  cleanupError: null,
  cleanupStepsDone: [],
  droppedSchema: null,
  inventory: null,
  casesExecuted: 0,
  controlsExecuted: 0,
};

let certificate = null;
let mainError = null;
const startedAt = Date.now();

const downstreamOutcome = { started: false, settled: null };
const safeDownstreamErrorProjection = (error) => {
  const rawName = error && typeof error.name === "string" ? error.name : "";
  const rawCode = error && typeof error.code === "string" ? error.code : "";
  const rawStack = error && typeof error.stack === "string" ? error.stack : "";
  const name = /^[A-Za-z][A-Za-z0-9_]{0,79}$/u.test(rawName) ? rawName : "Error";
  const code = /^[A-Z][A-Z0-9_]{0,31}$/u.test(rawCode) ? rawCode : null;
  const frameMatch = rawStack.match(/(?:^|\n)\s*at [^\n]*?\/((?:src|test)\/[A-Za-z0-9_./-]+:\d+:\d+)/u);
  const frame = frameMatch ? frameMatch[1] : null;
  return { name, code, frame };
};

try {
  const preflightProblems = [];
  if (process.env.ALLOW_DATABASE_TESTS !== "true") {
    preflightProblems.push(`set ${["ALLOW_DATABASE", "TESTS"].join("_")}=true and an isolated TEST_DATABASE_URL before running the causal W6 workflow`);
  }
  if (!process.env.TEST_DATABASE_URL) {
    preflightProblems.push("TEST_DATABASE_URL must point at an isolated disposable test database");
  }
  if (preflightProblems.length > 0) {
    throw new Error(`KI_W6 preflight failure: ${preflightProblems.join("; ")}`);
  }
  if (await probePortOccupied()) {
    throw new Error(`KI_W6 preflight failure: 127.0.0.1:${port} is already occupied`);
  }

  const manifest = JSON.parse(fsSync.readFileSync(manifestPath, "utf8"));
  const manifestKeys = Object.keys(manifest);
  assert(arrayEqual(manifestKeys, ["contractVersion", "groups", "groupDigests", "globalDigest", "negativeControls"]), "enforcement manifest top-level keys drifted");
  assert(manifest.contractVersion === "ki-w6-enforcement-manifest-v1", "enforcement manifest contract version drifted");
  const groupNames = Object.keys(manifest.groups);
  assert(arrayEqual(groupNames, ["navigation", "flow", "resilience", "conformance"]), "enforcement manifest group order drifted");
  const expectedGroupCounts = { navigation: 3, flow: 13, resilience: 4, conformance: 6 };
  for (const groupName of groupNames) {
    assert(manifest.groups[groupName].length === expectedGroupCounts[groupName], `enforcement manifest group ${groupName} count drifted`);
  }
  const allCaseIds = groupNames.flatMap((groupName) => manifest.groups[groupName]);
  assert(allCaseIds.length === 26 && new Set(allCaseIds).size === 26, "enforcement manifest must carry 26 unique case ids");
  assert(manifest.negativeControls.length === 13 && new Set(manifest.negativeControls).size === 13, "enforcement manifest must carry 13 unique negative controls");
  for (const groupName of groupNames) {
    assert(setDigest(manifest.groups[groupName]) === manifest.groupDigests[groupName], `group digest drifted for ${groupName}`);
  }
  assert(setDigest(allCaseIds) === manifest.globalDigest, "global digest drifted");
  activate("W6-CONF-01", `manifest-validated:${manifest.globalDigest}`);

  captured.inventory = buildDependencyInventory();
  oracles.obsoleteExclusion(captured.inventory);
  diagnostics.inventory = {
    roots: captured.inventory.roots.length,
    members: captured.inventory.members.length,
    barePackages: captured.inventory.barePackages.length,
  };

  tempRoot = await fsp.mkdtemp(path.join(os.tmpdir(), "storesignal-kiw6-"));
  harness = await createKeywordIntelligenceE2eHarness();
  harness.setAuthOwner(harness.ownerId);

  if (!skipBuild) {
    await runNextBuild();
  } else {
    try {
      await fsp.access(path.join(root, ".next"));
    } catch {
      throw new Error("Refusing to run in skip-build mode: no .next build output exists.");
    }
  }
  await startNext();
  await launchChrome();

  await setViewport(cdp, 1440, 900);
  await navigate(cdp, `${baseUrl}/keywords`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-form\"]')", "research form surface", 30000);

  const createFloor = harness.trace().length;
  for (const [seedIndex, seed] of SEEDS.entries()) {
    let confirmed = false;
    for (let attempt = 1; attempt <= 3 && !confirmed; attempt += 1) {
      await typeInputValue(cdp, 'input[aria-label="Seed phrase"]', seed);
      await wait(100);
      await click(cdp, "[...document.querySelectorAll('#seed-phrase-form button')].find((node) => node.textContent.includes('Add'))");
      try {
        await waitFor(cdp, `document.querySelector('#seed-chip-count')?.textContent.includes('${seedIndex + 1}/5')`, `seed chip ${seedIndex + 1}/5`, 1500);
        confirmed = true;
      } catch {}
    }
    if (!confirmed) throw new Error(`seed chip ${seedIndex + 1}/5 never appeared after 3 attempts`);
  }
  await waitFor(cdp, "document.querySelector('#seed-chip-count')?.textContent.includes('5/5')", "five seed chips");
  await click(cdp, "document.querySelector('#seed-phrase-form button[type=submit]')");
  await waitFor(cdp, "location.pathname.startsWith('/keywords/kr_')", "post-create navigation");
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-status\"]')", "queued research status surface", 30000);
  const researchPath = await evaluate(cdp, "location.pathname");
  const researchId = decodeURIComponent(researchPath.split("/").pop());

  const createEntries = (await netlogOf(cdp)).filter((entry) => entry.method === "POST" && entry.url.endsWith("/api/keyword-research"));
  assert(createEntries.length === 1, `expected exactly one create POST through the emitted app route, saw ${createEntries.length}`);
  const createEvents = traceFrom(createFloor);
  const createBackendEvent = createEvents.find((event) => event.kind === "http" && event.op === "request" && event.method === "POST" && event.path === "/api/keyword-research");
  const createAuthEvent = createEvents.find((event) => event.kind === "auth" && event.op === "get-session" && event.mode === "owner-a");
  assert(createBackendEvent, "create request must reach the actual backend");
  assert(createAuthEvent, "create request must be authenticated through the installed auth client");
  const initializeSends = harness.trace().filter((event) => event.kind === "sqs" && event.op === "send-one" && (event.messageTypes || []).includes("keyword.initialize.v1"));
  assert(initializeSends.length === 1, "exactly one keyword initialize message must be dispatched");
  const createSnapshot = await harness.readDurableState();
  assert(createSnapshot.research.researchId === researchId, "durable research id must match the browser route");
  assert(createSnapshot.research.ownerId === harness.ownerId, "durable research owner must be owner A");
  assert(createSnapshot.run === null && createSnapshot.handoff === null, "no run may exist before handoff");
  captured.create = {
    chromeRequest: { url: absoluteUrlOf(createEntries[0].url), bodyDigest: createEntries[0].bodyDigest },
    authEvent: structuredClone(createAuthEvent),
    backendEvent: structuredClone(createBackendEvent),
    backendPath: "/api/keyword-research",
    ownerId: createSnapshot.research.ownerId,
    expectedOwnerId: harness.ownerId,
  };
  oracles.authChain(captured.create);
  activate("W6-FLOW-01", `trace[${createFloor}]:auth+http:POST:/api/keyword-research:${researchId}`);

  await navigate(cdp, "about:blank");
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-status\"]')", "reopened queued research status surface", 30000);
  const reopenSnapshot = await harness.readDurableState();
  assert(reopenSnapshot.research.researchId === researchId, "reopen must read the same durable research");
  assert((await netlogOf(cdp)).filter((entry) => entry.method === "POST" && entry.url.endsWith("/api/keyword-research")).length === 1, "reopen must cause no duplicate create");
  assert(harness.trace().filter((event) => event.kind === "http" && event.op === "request" && event.method === "POST" && event.path === "/api/keyword-research").length === 1, "exactly one backend create request is permitted");
  captured.reopen = { researchId, state: reopenSnapshot.research.state, createCount: 1 };
  activate("W6-FLOW-02", `reopen:${researchId}:${reopenSnapshot.research.state}`);

  await harness.injectCapturedDefect("duplicate-next-keyword-message");
  await harness.injectCapturedDefect("reorder-pending-keyword-messages");
  await harness.restartBackend();

  const expansionReport = await harness.drainKeywordWork("expansion");
  const anchorReport = await harness.drainKeywordWork("anchor-screen");
  const marketsReport = await harness.drainKeywordWork("markets");
  const keywordObjectPuts = harness.trace().filter((event) => event.kind === "s3" && event.op === "put-immutable").length;

  const providerEvents = harness.trace().filter((event) => event.kind === "dataforseo");
  const expansionTuples = providerEvents
    .filter((event) => event.taskType === "expansion-suggestions" || event.taskType === "expansion-related")
    .map((event) => ({ taskType: event.taskType, attempt: event.attempt, requestFingerprint: event.requestFingerprint }));
  captured.expansion = { tuples: expansionTuples };
  oracles.expansionTopology(captured.expansion);
  assert(expansionReport.providerCalls === 10, `expansion drain must make ten provider calls, saw ${expansionReport.providerCalls}`);
  activate("W6-FLOW-03", `expansion:${expansionTuples.length}:tuples:${setDigest(expansionTuples.map((tuple) => tuple.requestFingerprint))}`);

  const anchorEvents = providerEvents.filter((event) => event.taskType === "anchor-overview");
  assert(anchorEvents.length === 1 && anchorEvents[0].attempt === 1, "exactly one anchor overview request at attempt one");
  assert(anchorReport.providerCalls === 1 && anchorReport.keywordObjects === 1, "anchor drain must make one request and store one artifact");
  captured.anchor = { events: anchorEvents.map((event) => ({ taskType: event.taskType, attempt: event.attempt, costUsd: event.costUsd })) };
  activate("W6-FLOW-04", `anchor:${anchorEvents[0].requestFingerprint}`);

  assert(providerEvents.length === 19, `total provider calls must be 19, saw ${providerEvents.length}`);
  assert(providerEvents.every((event) => event.attempt === 1), "every provider call must succeed on attempt one");
  assert(expansionReport.providerCalls + anchorReport.providerCalls + marketsReport.providerCalls === 19, "provider call totals must sum to 19");
  assert(keywordObjectPuts === 23, `keyword object totals must sum to 23, saw ${keywordObjectPuts}`);
  assert(expansionReport.keywordQueueSends + anchorReport.keywordQueueSends + marketsReport.keywordQueueSends === 42, "keyword queue send totals must sum to 42 despite fault deliveries");
  assert(marketsReport.providerAttempts === 19, "durable provider attempt rows must be 19");
  const marketEvents = providerEvents.filter((event) => event.taskType === "market-overview");
  assert(marketEvents.length === 8, "exactly eight market overview calls");
  const costMicroUsd = providerEvents.reduce((total, event) => total + Math.round(event.costUsd * 1e8), 0);
  assert(costMicroUsd === 49200000, "total provider cost must be $0.49200000");
  const publishedSnapshot = await harness.readDurableState();
  assert(publishedSnapshot.research.state === "completed", "research must complete after the fenced publication");
  assert(publishedSnapshot.keywordResult.visible === true, "keyword result must become visible");
  assert(publishedSnapshot.keywordResult.rowCount === 200, "published result must carry 200 rows");
  assert(publishedSnapshot.keywordResult.defaultSelectionItemCount === 100, "default selection must carry 100 items");
  assert(publishedSnapshot.run === null, "no run may exist before handoff");
  captured.publication = [
    {
      visible: publishedSnapshot.keywordResult.visible,
      rowCount: publishedSnapshot.keywordResult.rowCount,
      defaultSelectionItemCount: publishedSnapshot.keywordResult.defaultSelectionItemCount,
      fence: {
        providerCalls: providerEvents.length,
        keywordObjects: keywordObjectPuts,
        keywordQueueSends: expansionReport.keywordQueueSends + anchorReport.keywordQueueSends + marketsReport.keywordQueueSends,
        costMicroUsd,
      },
    },
  ];
  oracles.durableVisibility(captured.publication);
  activate("W6-FLOW-05", `publication:${publishedSnapshot.research.researchId}:19:23:42:0.49200000`);

  const assertDashboardSurfaces = async (viewportName) => {
    const presentSurfaces = await evaluate(cdp, "[...new Set([...document.querySelectorAll('[data-surface]')].map((node) => node.getAttribute('data-surface')))]");
    for (const surface of [...DASHBOARD_SURFACES, ...CHART_SURFACES]) {
      assert(presentSurfaces.includes(surface), `${viewportName}: surface ${surface} present`);
    }
    const metaText = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')?.innerText || ''");
    assert(metaText.includes("200 rows"), `${viewportName}: table meta shows 200 rows`);
    const renderedRows = await evaluate(cdp, "document.querySelectorAll('[data-surface=\"surface:keyword-table\"] tbody tr').length");
    assert(renderedRows > 0, `${viewportName}: keyword table renders rows`);
    const reviewText = await evaluate(cdp, "document.querySelector('[data-surface=\"surface:selection-review\"]')?.innerText || ''");
    assert(/100/.test(reviewText), `${viewportName}: selection review shows the persisted 100-item selection`);
  };
  await setViewport(cdp, 1440, 900);
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "desktop completed dashboard", 30000);
  await assertDashboardSurfaces("desktop");
  await setViewport(cdp, 390, 844);
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"]')", "mobile completed dashboard", 30000);
  await assertDashboardSurfaces("mobile");
  await setViewport(cdp, 1440, 900);
  assertNetworkAllowlist();
  await netlogCrossCheck();
  captured.dashboard = { surfaces: [...DASHBOARD_SURFACES, ...CHART_SURFACES], metaRows: 200, viewports: ["1440x900", "390x844"] };
  activate("W6-FLOW-06", `dashboard:${researchId}:200:desktop+mobile`);

  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr')", "keyword table rows for selection flow", 30000);
  const preSelectionSnapshot = await harness.readDurableState();
  assert(preSelectionSnapshot.research.selectionRevision === 1, "completed research starts at numeric selection version 1");
  const advanceOutcome = await evaluate(cdp, `(async () => {
    const id = ${JSON.stringify(researchId)};
    const getResponse = await fetch("/api/keyword-research/" + encodeURIComponent(id), { headers: { Accept: "application/json" } });
    if (!getResponse.ok) return { status: getResponse.status };
    const envelope = await getResponse.json();
    const research = envelope.research || envelope;
    const items = Array.isArray(research.selection) ? research.selection : [];
    const mutation = items.map((item) => item.sourceKind === "calculated"
      ? { sourceKind: "calculated", sourceKeywordId: item.sourceKeywordId, keyword: item.keyword }
      : { sourceKind: "manual", keyword: item.keyword });
    if (mutation.length === 100 && mutation[99]) mutation[99] = { ...mutation[99], keyword: mutation[99].keyword + " curated" };
    const putResponse = await fetch("/api/keyword-research/" + encodeURIComponent(id) + "/selection", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expectedRevision: research.selectionRevision, items: mutation })
    });
    return { status: putResponse.status, revision: research.selectionRevision, itemCount: mutation.length };
  })()`);
  assert(advanceOutcome.status === 200, `the server-side revision advance must succeed, saw ${advanceOutcome.status}`);
  await saveSelectionViaUi();
  await waitFor(cdp, "document.body.innerText.includes('changed on the server')", "stale save conflict banner");
  const conflictEntries = (await netlogOf(cdp)).filter((entry) => entry.method === "PUT" && entry.url.endsWith("/selection") && entry.responseStatus === 409);
  assert(conflictEntries.length === 1, `exactly one stale 409 is permitted, saw ${conflictEntries.length}`);
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr')", "reloaded dashboard after conflict", 30000);
  await swapOneSelectionItemViaUi();
  await saveSelectionViaUi();
  const successfulSelectionEntries = (await netlogOf(cdp)).filter((entry) => entry.method === "PUT" && entry.url.endsWith("/selection") && entry.responseStatus === 200);
  assert(successfulSelectionEntries.length === 2, `exactly two successful selection saves are permitted (one revision-advance plus one final CAS), saw ${successfulSelectionEntries.length}`);
  const advanceEntries = successfulSelectionEntries.filter((entry) => entry.requestBody?.expectedRevision === 1);
  assert(advanceEntries.length === 1, `exactly one expected-revision-1 revision-advance save is permitted, saw ${advanceEntries.length}`);
  const savedEntries = successfulSelectionEntries.filter((entry) => entry.requestBody?.expectedRevision === 2);
  assert(savedEntries.length === 1, `exactly one expected-revision-2 final CAS save is permitted, saw ${savedEntries.length}`);
  const savedBody = savedEntries[0].requestBody || {};
  assert(Array.isArray(savedBody.items) && savedBody.items.length === 100, "the saved draft must carry exactly 100 valid items");
  const postSelectionSnapshot = await harness.readDurableState();
  assert(postSelectionSnapshot.research.selectionRevision === 3, `selection revision must be 3 after one advance, one stale 409, one final CAS, saw ${postSelectionSnapshot.research.selectionRevision}`);
  assert(postSelectionSnapshot.keywordResult.defaultSelectionItemCount === 100, "persisted selection must keep exactly 100 items");
  captured.selection = {
    initialRevision: 1,
    staleConflictCount: conflictEntries.length,
    finalRevision: postSelectionSnapshot.research.selectionRevision,
    savedItemCount: savedBody.items.length,
    expectedRevisionSent: savedBody.expectedRevision,
  };
  assert(captured.selection.expectedRevisionSent === 2, "the final CAS must target the next revision");
  activate("W6-FLOW-07", `selection-cas:${researchId}:1->3:409x1:100`);

  const sessionAuthFloor = harness.trace().length;
  const sessionCookieResult = await cdp.send("Network.setCookie", {
    name: harness.browserSessionCookie.name,
    value: harness.browserSessionCookie.value,
    url: baseUrl,
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "Lax"
  });
  assert(sessionCookieResult.success === true, "the CDP session-cookie installation must report success");
  const installedSessionCookies = (await cdp.send("Network.getCookies", { urls: [baseUrl] })).cookies.filter(
    (cookie) => cookie.name === harness.browserSessionCookie.name
  );
  assert(installedSessionCookies.length === 1, "exactly one Neon session cookie must be installed for the protected navigation");
  assert(installedSessionCookies[0].secure === true && installedSessionCookies[0].httpOnly === true, "the installed session cookie must remain flagged secure and httpOnly");

  const abortDone = armRunsResponseAbort();
  await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find((node) => node.textContent.includes('Finalize'))");
  await Promise.race([
    abortDone,
    wait(90000).then(() => {
      throw new Error("the W6-NAV-02 response-stage pause never fired for the first runs POST");
    }),
  ]);
  assert(fetchIntervention.abortError === null, `the response-stage abort must complete cleanly: ${fetchIntervention.abortErrorStage}/${JSON.stringify(safeDownstreamErrorProjection(fetchIntervention.abortError))}`);
  const abortedEntry = await waitForNetlog((entry) => /\/runs$/.test(entry.url) && entry.method === "POST" && entry.responseStatus === -1, "aborted first runs POST");
  const firstPost = abortedEntry.requestBody || {};
  assert(typeof firstPost.clientRequestId === "string" && firstPost.clientRequestId.length > 0, "the first runs POST must carry a client request id");
  assert(firstPost.expectedSelectionRevision === 3, "the first runs POST must use the saved revision");
  assert(fetchIntervention.requestIdentity?.clientRequestId === firstPost.clientRequestId, "the intercepted handoff identity must match the browser request");
  assert(fetchIntervention.requestIdentity?.expectedSelectionRevision === firstPost.expectedSelectionRevision, "the intercepted handoff revision must match the browser request");
  await waitFor(cdp, "document.body.innerText.includes('didn') && document.body.innerText.includes('Retry')", "retry_required banner", 30000);
  const abortedBackendEvents = harness.trace().filter((event) => event.kind === "http" && event.op === "request" && event.method === "POST" && event.path.endsWith("/runs"));
  const duringAbortSnapshot = fetchIntervention.durableHandoff;
  assert(duringAbortSnapshot?.handoff?.clientRequestId === firstPost.clientRequestId, "the aborted handoff must be proven by the durable client request id");
  assert(duringAbortSnapshot?.handoff?.selectionRevision === firstPost.expectedSelectionRevision, "the aborted handoff must be proven by the durable selection revision");
  assert(duringAbortSnapshot?.run?.queryCount === 100, "the aborted handoff must already be durably committed with 100 run queries");
  await click(cdp, "[...document.querySelectorAll('[data-surface=\"surface:selection-review\"] button')].find((node) => node.textContent.trim() === 'Retry')");
  const successEntry = await waitForNetlog((entry) => /\/runs$/.test(entry.url) && entry.method === "POST" && entry.responseStatus === 200 && entry.responseBody, "successful retry runs POST");
  const retryPost = successEntry.requestBody || {};
  assert(retryPost.clientRequestId === firstPost.clientRequestId, "the retry must reuse the same durable client key");
  assert(retryPost.expectedSelectionRevision === firstPost.expectedSelectionRevision, "the retry must reuse the same durable revision");
  const handoffEnvelope = JSON.parse(successEntry.responseBody);
  assert(typeof handoffEnvelope.run?.runId === "string" && handoffEnvelope.run.runId.length > 0, "handoff response must expose run.runId");
  assert(typeof handoffEnvelope.statusUrl === "string" && handoffEnvelope.statusUrl.length > 0, "handoff response must keep a parseable statusUrl");
  const runId = handoffEnvelope.run.runId;
  const expectedRoute = `/runs/${encodeURIComponent(runId)}`;
  await waitFor(cdp, `location.pathname === ${JSON.stringify(expectedRoute)}`, "run workspace navigation");
  await waitFor(cdp, "document.querySelectorAll('input[aria-label^=\"Query \"]').length === 100", "run workspace query rows", 30000);
  const protectedWorkspaceAuthEvents = harness.trace().slice(sessionAuthFloor).filter(
    (event) => event.kind === "auth" && event.op === "get-session" && event.mode === "owner-a" && event.status === 200
  );
  assert(protectedWorkspaceAuthEvents.length > 0, "the protected run workspace must be served through an owner-a session lookup after the CDP cookie installation");
  const statusUrlPathname = new URL(handoffEnvelope.statusUrl, baseUrl).pathname;
  assert(statusUrlPathname !== expectedRoute, "the handoff statusUrl must be distinct from the destination route");
  assert(documentUrls.every((url) => new URL(url, baseUrl).pathname !== statusUrlPathname), "Chrome must never navigate to the handoff statusUrl");
  const durableHandoff = await harness.readDurableState();
  assert(durableHandoff.run && durableHandoff.run.runId === runId && durableHandoff.run.queryCount === 100, "exactly one durable run with 100 run queries");
  assert(durableHandoff.handoff && durableHandoff.handoff.clientRequestId === firstPost.clientRequestId, "durable handoff identity must match the client key");
  assert(durableHandoff.handoff.selectionRevision === 3 && durableHandoff.handoff.selectionFingerprint.length > 0, "immutable selection snapshot must be recorded");
  const clientKeys100 = await queryRowValues();
  assert(clientKeys100.length === 100 && new Set(clientKeys100).size === 100, "run workspace must render 100 unique query identities");
  captured.nav = {
    runId,
    expectedRoute,
    locationPathname: await evaluate(cdp, "location.pathname"),
    statusUrl: handoffEnvelope.statusUrl,
    statusUrlPathname,
  };
  oracles.navDestination(captured.nav);
  activate("W6-NAV-01", `nav:${expectedRoute}:${runId}`);
  captured.navRetry = {
    firstClientRequestId: firstPost.clientRequestId,
    retryClientRequestId: retryPost.clientRequestId,
    firstSelectionRevision: firstPost.expectedSelectionRevision,
    retrySelectionRevision: retryPost.expectedSelectionRevision,
    durableRunCount: durableHandoff.run ? 1 : 0,
    abortedBackendTrace: abortedBackendEvents.length > 0,
    interceptedResponseStatus: fetchIntervention.responseStatus,
    durableSignal: true,
  };
  activate("W6-NAV-02", `nav-retry:${firstPost.clientRequestId}:aborted-then-same-run`);
  captured.navStatusUrl = { statusUrl: handoffEnvelope.statusUrl, statusUrlPathname, destination: expectedRoute, documentNavigations: [...documentUrls] };
  activate("W6-NAV-03", `nav-hostile-status-url:${statusUrlPathname}:never-navigated`);

  captured.handoff = {
    runId,
    durableRunId: durableHandoff.run.runId,
    durableQueryCount: durableHandoff.run.queryCount,
    selectionFingerprint: durableHandoff.handoff.selectionFingerprint,
    clientKeys: clientKeys100,
    firstClientRequestId: firstPost.clientRequestId,
    retryClientRequestId: retryPost.clientRequestId,
    firstSelectionRevision: firstPost.expectedSelectionRevision,
    retrySelectionRevision: retryPost.expectedSelectionRevision,
  };
  oracles.handoffAtomicity(captured.handoff);
  activate("W6-FLOW-08", `handoff:${runId}:100-runqueries:${durableHandoff.handoff.selectionFingerprint}`);

  const beforeValues = await queryRowValues();
  const beforeBadges = await queryRowBadges();
  assert(beforeBadges.length === 100 && beforeBadges.every((badge) => badge === "generated"), "keyword-research handoff rows must begin with generated provenance");
  assert((await queryRowCount()) === 100, "workspace must expose 100 editable queries before edits");
  const editedCount = await evaluate(cdp, `(() => {
    const inputs = [...document.querySelectorAll('input[aria-label^="Query "]')];
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    for (const input of inputs) {
      const next = input.value + " emporium";
      setter.call(input, next);
      input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: " emporium" }));
    }
    return inputs.length;
  })()`);
  assert(editedCount === 100, "all 100 queries must be edited");
  await click(cdp, `[...document.querySelectorAll('button[aria-label="Move query down"]')][0]`);
  await waitFor(cdp, "document.body.innerText.includes('Unsaved changes')", "unsaved changes indicator");
  await click(cdp, "[...document.querySelectorAll('button')].find((node) => node.textContent.includes('Save changes'))");
  await waitFor(cdp, `![...document.querySelectorAll('button')].some((node) => node.textContent.includes('Saving…'))`, "workspace save settled", 30000);
  await navigate(cdp, `${baseUrl}${expectedRoute}`);
  await waitFor(cdp, "document.querySelectorAll('input[aria-label^=\"Query \"]').length === 100", "workspace rows after save", 30000);
  const afterValues = await queryRowValues();
  const afterBadges = await queryRowBadges();
  const expectedOrder = beforeValues.map((value) => `${value} emporium`);
  const swapped = [expectedOrder[1], expectedOrder[0], ...expectedOrder.slice(2)];
  assert(arrayEqual(afterValues, swapped), "edited text and reordered positions must persist for all 100 queries");
  assert(afterValues.every((value) => value.endsWith(" emporium")), "every query text must be changed");
  const expectedEditedBadges = beforeBadges.map((badge) => badge === "generated" ? "user edited" : badge);
  const swappedExpectedBadges = [expectedEditedBadges[1], expectedEditedBadges[0], ...expectedEditedBadges.slice(2)];
  assert(arrayEqual(afterBadges, swappedExpectedBadges), "edited query provenance must change from generated to user edited and follow the persisted reorder");
  assert(afterValues.length === 100, "zero add/delete in the run workspace");
  captured.workspace = { count: 100, orderChanged: true, provenanceTransitionVerified: true };
  activate("W6-FLOW-09", `workspace:${runId}:100-edited-1-reorder:0-add-delete`);

  const confirmFloor = harness.trace().length;
  await click(cdp, "[...document.querySelectorAll('button')].find((node) => node.textContent.includes('Find my stores'))");
  const runStartBackendEvent = await waitForTrace(confirmFloor, (event) => event.kind === "http" && event.op === "request" && event.method === "POST" && event.path === `/api/runs/${runId}/start`, "run start request", 60000);
  assert(runStartBackendEvent.status === 202, `backend run start response must be 202, saw ${runStartBackendEvent.status}`);
  const runStartBrowserEntry = await waitForNetlog(
    (entry) => entry.method === "POST" && entry.url.endsWith(`/api/runs/${runId}/start`) && entry.responseStatus !== null,
    "browser run start response",
    60000
  );
  assert(runStartBrowserEntry.responseStatus === 202, `browser run start response must be 202, saw ${runStartBrowserEntry.responseStatus}`);
  captured.confirmationStart = { backendStatus: runStartBackendEvent.status, browserStatus: runStartBrowserEntry.responseStatus };
  const googlePairsFloor = harness.trace().length;
  const runStartSchedule = harness.flushRunStartSchedule();
  assert(
    runStartSchedule.pendingBefore === 2 &&
      runStartSchedule.discardedStaleCallbacks === 1 &&
      runStartSchedule.flushedCallbacks === 1 &&
      runStartSchedule.pendingAfter === 0,
    "run start must discard one stale callback and flush exactly one live callback"
  );
  captured.confirmationDrain = structuredClone(runStartSchedule);
  const confirmDeadline = Date.now() + 120000;
  for (;;) {
    const confirmationEvents = traceFrom(googlePairsFloor);
    const executionFailure = confirmationEvents.find((event) => event.kind === "backend-log");
    if (executionFailure) {
      throw new Error(`backend execution failed before validation: ${executionFailure.op}/${executionFailure.errorName}/${executionFailure.errorCode ?? "NO_CODE"}/${executionFailure.errorFrame ?? "NO_FRAME"}`);
    }
    const googleEvents = confirmationEvents.filter((event) => event.kind === "google" && event.op === "search-page");
    if (googleEvents.length === 100) break;
    if (Date.now() > confirmDeadline) {
      const stalledSnapshot = await harness.readDurableState();
      throw new Error(`timed out waiting for the 100 production validator calls after start 202/202 and no backend failure; durable run=${stalledSnapshot.run?.state ?? "missing"}/${stalledSnapshot.run?.stage ?? "missing"}/confirmed=${stalledSnapshot.run?.queriesConfirmedAt !== null}, saw ${googleEvents.length}`);
    }
    await wait(100);
  }
  const googlePairs = traceFrom(googlePairsFloor)
    .filter((event) => event.kind === "google" && event.op === "search-page")
    .map((event) => ({ runQueryId: event.runQueryId, occurrences: event.occurrences }));
  captured.confirmation = { pairs: googlePairs };
  oracles.googleValidation(captured.confirmation);
  const confirmedSnapshot = await harness.readDurableState();
  assert(confirmedSnapshot.run.queriesConfirmedAt !== null && confirmedSnapshot.run.confirmedQueryRevision !== null, "confirmation must be terminal only after all validations succeed");
  activate("W6-FLOW-10", `confirm:${runId}:100-searchpage-calls:1000-occurrences`);

  const discoveryFloor = googlePairsFloor;
  const isDiscoverySend = (event) => event.kind === "sqs" && (event.messageTypes || []).some((type) => String(type).startsWith("discovery"));
  const dispatchDeadline = Date.now() + 60000;
  let discoverySendCount = 0;
  for (;;) {
    const discoveryEvents = traceFrom(discoveryFloor);
    const executionFailure = discoveryEvents.find((event) => event.kind === "backend-log");
    if (executionFailure) {
      throw new Error(`backend execution failed before discovery dispatch: ${executionFailure.op}/${executionFailure.errorName}/${executionFailure.errorCode ?? "NO_CODE"}/${executionFailure.errorFrame ?? "NO_FRAME"}`);
    }
    discoverySendCount = discoveryEvents.filter(isDiscoverySend).reduce((total, event) => total + (event.count || 0), 0);
    if (discoverySendCount >= 100) break;
    if (Date.now() > dispatchDeadline) {
      const stalledSnapshot = await harness.readDurableState();
      throw new Error(`timed out waiting for all 100 discovery deliveries; durable run=${stalledSnapshot.run?.state ?? "missing"}/${stalledSnapshot.run?.stage ?? "missing"}, saw ${discoverySendCount}`);
    }
    await wait(20);
  }
  assert(discoverySendCount === 100, `confirmation must dispatch exactly 100 discovery deliveries, saw ${discoverySendCount}`);
  const dispatchedSnapshot = await harness.readDurableState();
  assert(dispatchedSnapshot.discovery.taskCount === 100, "durable discovery stage must register exactly 100 tasks");
  captured.dispatch = { deliveries: discoverySendCount, taskCount: dispatchedSnapshot.discovery.taskCount };
  activate("W6-FLOW-11", `dispatch:${runId}:100-discovery-tasks`);

  await harness.injectCapturedDefect("duplicate-next-discovery-message");
  await harness.injectCapturedDefect("reorder-pending-discovery-messages");

  const downstreamFloor = harness.trace().length;
  const downstreamPromise = harness.drainDownstream();
  downstreamOutcome.started = true;
  downstreamPromise.then(
    (value) => { downstreamOutcome.settled = { outcome: "fulfilled", value }; },
    (error) => { downstreamOutcome.settled = { outcome: "rejected", error }; },
  );
  const downstreamWaitStartedAt = Date.now();
  const downstreamNoProgressLimitMs = 120000;
  const downstreamAbsoluteLimitMs = (100 * 30000) + 600000;
  let downstreamLastProgressAt = downstreamWaitStartedAt;
  let downstreamLifecycleCount = 0;
  let downstreamCompletedCount = 0;
  for (;;) {
    const downstreamEvents = harness.trace().slice(downstreamFloor);
    const downstreamDomainEvent = downstreamEvents.find((event) => {
      if (event.kind !== "sqs") return false;
      return (event.messageTypes || []).includes("aggregation.check");
    });
    if (downstreamOutcome.settled?.outcome === "rejected") {
      const downstreamRejectDiagnostics = await harness.readDownstreamDiagnostics();
      throw new Error(`KI downstream drain rejected before first domain-check emission: ${JSON.stringify({ error: safeDownstreamErrorProjection(downstreamOutcome.settled.error), diagnostics: downstreamRejectDiagnostics })}`);
    }
    const downstreamFailureEvent = downstreamEvents.find((event) => event.kind === "downstream-message" && event.op === "message-failed");
    if (downstreamFailureEvent) {
      throw new Error(`KI downstream drain message-failed before first domain-check emission: ${JSON.stringify({ name: downstreamFailureEvent.errorName, code: downstreamFailureEvent.errorCode, frame: downstreamFailureEvent.errorFrame })}`);
    }
    const lifecycleEvents = downstreamEvents.filter((event) => event.kind === "downstream-message" && (event.op === "message-start" || event.op === "message-complete"));
    if (lifecycleEvents.length > downstreamLifecycleCount) {
      downstreamLifecycleCount = lifecycleEvents.length;
      downstreamCompletedCount = lifecycleEvents.filter((event) => event.op === "message-complete").length;
      downstreamLastProgressAt = Date.now();
    }
    const downstreamElapsedMs = Date.now() - downstreamWaitStartedAt;
    diagnostics.downstreamProgress = {
      elapsedMs: downstreamElapsedMs,
      lifecycleEvents: downstreamLifecycleCount,
      completedMessages: downstreamCompletedCount,
      completedMessagesPerSecond: downstreamElapsedMs > 0
        ? Number((downstreamCompletedCount * 1000 / downstreamElapsedMs).toFixed(4))
        : 0,
    };
    if (downstreamDomainEvent) break;
    if (Date.now() - downstreamLastProgressAt > downstreamNoProgressLimitMs) {
      const downstreamStallDiagnostics = await harness.readDownstreamDiagnostics();
      throw new Error(`KI downstream made no lifecycle progress for ${downstreamNoProgressLimitMs} ms: ${JSON.stringify({ progress: diagnostics.downstreamProgress, diagnostics: downstreamStallDiagnostics })}`);
    }
    if (downstreamElapsedMs > downstreamAbsoluteLimitMs) {
      const downstreamCeilingDiagnostics = await harness.readDownstreamDiagnostics();
      throw new Error(`KI downstream exceeded the ${downstreamAbsoluteLimitMs} ms absolute safety ceiling while still progressing: ${JSON.stringify({ progress: diagnostics.downstreamProgress, diagnostics: downstreamCeilingDiagnostics })}`);
    }
    await wait(50);
  }
  const readinessSample = await harness.readDurableState();
  assert(readinessSample.discovery.taskCount === 100 && readinessSample.discovery.terminalCount >= 1 && readinessSample.discovery.terminalCount < 100, "the domain-check fault point must sit inside a nonempty partially terminal discovery stage");
  await harness.injectCapturedDefect("duplicate-next-domain-check-message");
  await harness.injectCapturedDefect("reorder-pending-domain-check-messages");
  while (!downstreamOutcome.settled) {
    const downstreamEvents = harness.trace().slice(downstreamFloor);
    const downstreamFailureEvent = downstreamEvents.find((event) => event.kind === "downstream-message" && event.op === "message-failed");
    if (downstreamFailureEvent) {
      throw new Error(`KI downstream drain message-failed after first domain-check emission: ${JSON.stringify({ name: downstreamFailureEvent.errorName, code: downstreamFailureEvent.errorCode, frame: downstreamFailureEvent.errorFrame })}`);
    }
    const lifecycleEvents = downstreamEvents.filter((event) => event.kind === "downstream-message" && (event.op === "message-start" || event.op === "message-complete"));
    if (lifecycleEvents.length > downstreamLifecycleCount) {
      downstreamLifecycleCount = lifecycleEvents.length;
      downstreamCompletedCount = lifecycleEvents.filter((event) => event.op === "message-complete").length;
      downstreamLastProgressAt = Date.now();
    }
    const downstreamElapsedMs = Date.now() - downstreamWaitStartedAt;
    diagnostics.downstreamProgress = {
      elapsedMs: downstreamElapsedMs,
      lifecycleEvents: downstreamLifecycleCount,
      completedMessages: downstreamCompletedCount,
      completedMessagesPerSecond: downstreamElapsedMs > 0
        ? Number((downstreamCompletedCount * 1000 / downstreamElapsedMs).toFixed(4))
        : 0,
    };
    if (Date.now() - downstreamLastProgressAt > downstreamNoProgressLimitMs) {
      const downstreamStallDiagnostics = await harness.readDownstreamDiagnostics();
      throw new Error(`KI downstream made no lifecycle progress for ${downstreamNoProgressLimitMs} ms after first domain-check emission: ${JSON.stringify({ progress: diagnostics.downstreamProgress, diagnostics: downstreamStallDiagnostics })}`);
    }
    if (downstreamElapsedMs > downstreamAbsoluteLimitMs) {
      const downstreamCeilingDiagnostics = await harness.readDownstreamDiagnostics();
      throw new Error(`KI downstream exceeded the ${downstreamAbsoluteLimitMs} ms absolute safety ceiling after first domain-check emission: ${JSON.stringify({ progress: diagnostics.downstreamProgress, diagnostics: downstreamCeilingDiagnostics })}`);
    }
    await wait(50);
  }
  if (downstreamOutcome.settled.outcome !== "fulfilled") {
    throw new Error(`KI downstream drain rejected: ${JSON.stringify(safeDownstreamErrorProjection(downstreamOutcome.settled.error))}`);
  }
  const downstreamReport = downstreamOutcome.settled.value;
  assert(downstreamReport.discoveryTasks === 100, `duplicate/reorder must add no logical discovery work, saw ${downstreamReport.discoveryTasks}`);
  assert(downstreamReport.stableDomains === 1000, `exactly 1000 stable domains must be aggregated, saw ${downstreamReport.stableDomains}`);
  assert(downstreamReport.leadTasks === 1000, `exactly 1000 lead tasks must be registered, saw ${downstreamReport.leadTasks}`);
  const downstreamSnapshot = await harness.readDurableState();
  assert(downstreamSnapshot.discovery.taskCount === 100 && downstreamSnapshot.discovery.terminalCount === 100, "discovery stage must complete from terminal evidence");
  assert(downstreamSnapshot.domains.stageComplete === true, "domain stage must complete exactly once from Neon terminal evidence");
  assert(downstreamSnapshot.domains.stableHostCount === 1000 && downstreamSnapshot.domains.shopCount === 1000 && downstreamSnapshot.domains.runStoreCount === 1000 && downstreamSnapshot.domains.leadTaskCount === 1000, "1000 stable hosts, shops, run stores and lead tasks");
  captured.readiness = {
    stageComplete: downstreamSnapshot.domains.stageComplete,
    terminalCount: downstreamSnapshot.discovery.terminalCount,
    expectedCount: downstreamSnapshot.discovery.taskCount,
    neonTerminalEvidence: downstreamSnapshot.discovery.terminalCount === downstreamSnapshot.discovery.taskCount,
  };
  oracles.domainReadiness(captured.readiness);
  captured.downstream = {
    discoveryTasks: downstreamReport.discoveryTasks,
    stableDomains: downstreamReport.stableDomains,
    leadTasks: downstreamReport.leadTasks,
    domains: structuredClone(downstreamSnapshot.domains),
  };
  activate("W6-FLOW-12", `domains:${runId}:1000-stable:1000-lead`);

  captured.faults = {
    keywordPartition: ["duplicate-next-keyword-message", "reorder-pending-keyword-messages"],
    discoveryPartition: ["duplicate-next-discovery-message", "reorder-pending-discovery-messages"],
    domainCheckPartition: ["duplicate-next-domain-check-message", "reorder-pending-domain-check-messages"],
    providerCalls: providerEvents.length,
    providerAttempts: marketsReport.providerAttempts,
    keywordObjects: keywordObjectPuts,
    keywordQueueSends: expansionReport.keywordQueueSends + anchorReport.keywordQueueSends + marketsReport.keywordQueueSends,
    allAttemptsOne: providerEvents.every((event) => event.attempt === 1),
    discoveryDeliveries: discoverySendCount,
    readinessSample: structuredClone(readinessSample.discovery),
  };
  activate("W6-RES-02", `faults:6-partitions:19/23/42/100/1000-exact`);

  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.querySelector('[data-surface=\"surface:keyword-table\"] tbody tr')", "research dashboard before snapshot mutation", 30000);
  await swapOneSelectionItemViaUi();
  await saveSelectionViaUi();
  const mutatedSnapshot = await harness.readDurableState();
  assert(mutatedSnapshot.research.selectionRevision === 4, "the live research selection may advance after handoff");
  captured.snapshotBefore = {
    run: structuredClone(mutatedSnapshot.run),
    handoff: structuredClone(mutatedSnapshot.handoff),
    discovery: structuredClone(mutatedSnapshot.discovery),
    domains: structuredClone(mutatedSnapshot.domains),
    selectionRevision: mutatedSnapshot.research.selectionRevision,
  };
  await harness.restartBackend();
  const snapshotAfter = await harness.readDurableState();
  assert(jsonEqual(snapshotAfter.run, captured.snapshotBefore.run), "the durable run projection must be immutable across restart B and live selection mutation");
  assert(jsonEqual(snapshotAfter.handoff, captured.snapshotBefore.handoff), "the immutable handoff snapshot must survive unchanged");
  assert(jsonEqual(snapshotAfter.discovery, captured.snapshotBefore.discovery), "discovery lineage must survive unchanged");
  assert(jsonEqual(snapshotAfter.domains, captured.snapshotBefore.domains), "downstream lineage must survive unchanged");
  assert(snapshotAfter.research.selectionRevision >= captured.snapshotBefore.selectionRevision, "the research revision may advance independently");
  await navigate(cdp, `${baseUrl}${expectedRoute}`);
  await waitFor(cdp, "document.querySelectorAll('input[aria-label^=\"Query \"]').length === 100", "durable run projection reload", 30000);
  const reloadedValues = await queryRowValues();
  assert(arrayEqual(reloadedValues, swapped), "the reloaded run workspace must be deep-equal to the captured snapshot projection");
  activate("W6-FLOW-13", `snapshot-immutable:${runId}:restart-B:deep-equal`);

  const ownerBaseline = await harness.readDurableState();
  const neonCookiesBeforeSwitch = (await cdp.send("Network.getCookies", { urls: [baseUrl] })).cookies.filter(
    (cookie) => cookie.name.startsWith("__Secure-neon-auth.")
  );
  assert(arrayEqual(
    neonCookiesBeforeSwitch.map((cookie) => cookie.name).sort(),
    ["__Secure-neon-auth.local.session_data", "__Secure-neon-auth.session_token"]
  ), "before the owner switch the browser must hold exactly the Neon session token and local session-data cookies");
  for (const cookie of neonCookiesBeforeSwitch) {
    await cdp.send("Network.deleteCookies", { name: cookie.name, url: baseUrl });
  }
  const neonCookiesAfterSwitch = (await cdp.send("Network.getCookies", { urls: [baseUrl] })).cookies.filter(
    (cookie) => cookie.name.startsWith("__Secure-neon-auth.")
  );
  assert(neonCookiesAfterSwitch.length === 0, "every Neon cookie must be deleted before the owner-B partition so cached session data cannot mask the denial branches");
  harness.setAuthOwner(harness.otherOwnerId);
  await restartNextServer();
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.body.innerText.includes('could not be found')", "owner-B research denial", 30000);
  const ownerBResearchStatus = await evaluate(cdp, `(async () => { try { const response = await fetch(${JSON.stringify(`/api/keyword-research/${researchId}`)}); return response.status; } catch { return -1; } })()`);
  const ownerBRunStatus = await evaluate(cdp, `(async () => { try { const response = await fetch(${JSON.stringify(`/api/runs/${runId}`)}); return response.status; } catch { return -1; } })()`);
  const ownerBMutationStatus = await evaluate(cdp, `(async () => { try { const response = await fetch(${JSON.stringify(`/api/keyword-research/${researchId}/selection`)}, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ expectedRevision: 4, items: [] }) }); return response.status; } catch { return -1; } })()`);
  assert(ownerBResearchStatus === 404, `owner-B research GET must be denied as not-found, saw ${ownerBResearchStatus}`);
  assert(ownerBRunStatus === 404, `owner-B run GET must be denied as not-found, saw ${ownerBRunStatus}`);
  assert(ownerBMutationStatus === 404 || ownerBMutationStatus === 403, `owner-B mutation must be denied, saw ${ownerBMutationStatus}`);
  harness.setAuthOwner(null);
  await restartNextServer();
  await navigate(cdp, `${baseUrl}${researchPath}`);
  await waitFor(cdp, "document.body.innerText.includes('sign in')", "no-session denial", 30000);
  const noSessionStatus = await evaluate(cdp, `(async () => { try { const response = await fetch(${JSON.stringify(`/api/keyword-research/${researchId}`)}); return response.status; } catch { return -1; } })()`);
  assert(noSessionStatus === 401, `no-session GET must be denied as unauthenticated, saw ${noSessionStatus}`);
  harness.setAuthOwner(harness.ownerId);
  const ownerAfter = await harness.readDurableState();
  assert(jsonEqual(ownerAfter.run, ownerBaseline.run) && jsonEqual(ownerAfter.research, ownerBaseline.research), "durable owner-A rows must be unchanged by the denial partitions");
  captured.owners = {
    ownerBResearchStatus,
    ownerBRunStatus,
    ownerBMutationStatus,
    noSessionStatus,
    durableUnchanged: true,
    nextRestarts: 2,
  };
  activate("W6-RES-01", `owners:B=404:none=401:durable-unchanged`);

  const createFixtureResearch = async (label) => {
    await navigate(cdp, `${baseUrl}/keywords`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-form\"]')", "research form surface for fixture", 30000);
    await setInputValue(cdp, 'input[aria-label="Seed phrase"]', SEEDS[0]);
    await click(cdp, "[...document.querySelectorAll('#seed-phrase-form button')].find((node) => node.textContent.includes('Add'))");
    await wait(150);
    await click(cdp, "document.querySelector('#seed-phrase-form button[type=submit]')");
    await waitFor(cdp, "location.pathname.startsWith('/keywords/kr_')", `${label} navigation`);
    await waitFor(cdp, "document.querySelector('[data-surface=\"surface:research-status\"]')", `${label} queued status`, 30000);
    const fixturePathname = await evaluate(cdp, "location.pathname");
    return decodeURIComponent(fixturePathname.split("/").pop());
  };

  const corruptResearchId = await createFixtureResearch("corrupt fixture");
  const corruptDrain = await harness.drainKeywordWork("expansion");
  assert(corruptDrain.providerCalls === 2 && corruptDrain.keywordObjects === 2, `the corrupt fixture must complete two expansion calls and objects, saw ${corruptDrain.providerCalls}/${corruptDrain.keywordObjects}`);
  await harness.injectCapturedDefect("corrupt-stored-artifact");
  let corruptReadError = null;
  try {
    await harness.drainKeywordWork("anchor-screen");
  } catch (error) {
    corruptReadError = error;
  }
  assert(corruptReadError !== null, "the corrupted stored object must make the actual aggregate read fail");
  const corruptSnapshot = await harness.readDurableState();
  assert(corruptSnapshot.fixtures && corruptSnapshot.fixtures.corruptArtifact, "the corrupt fixture projection must be recorded");
  const corruptProjection = corruptSnapshot.fixtures.corruptArtifact;
  captured.corrupt = {
    rejected: corruptProjection.rejected,
    calls: corruptProjection.calls,
    objects: corruptProjection.objects,
    terminalTasks: corruptProjection.terminalTasks,
    nextStageRows: corruptProjection.nextStageRows,
    resultVisible: corruptSnapshot.keywordResult.visible,
    runVisible: corruptSnapshot.run !== null,
  };
  oracles.strictContract(captured.corrupt);
  assert(captured.corrupt.calls === 2 && captured.corrupt.objects === 2 && captured.corrupt.terminalTasks === 2 && captured.corrupt.nextStageRows === 0, "corrupt fixture must record exactly 2/2/2/0");
  assert(captured.corrupt.resultVisible === false && captured.corrupt.runVisible === false, "no result, selection publication or run visibility for the corrupt fixture");
  activate("W6-RES-03", `corrupt-fixture:${corruptResearchId}:2/2/2/0:rejected`);

  const missingResearchId = await createFixtureResearch("missing-terminal fixture");
  const missingDrainFloor = harness.trace().length;
  const missingDrainPromise = harness.drainKeywordWork("expansion");
  await waitForTrace(missingDrainFloor, (event) => event.kind === "dataforseo", "missing-terminal fixture first provider call");
  await harness.injectCapturedDefect("omit-neon-terminal");
  const missingDrain = await missingDrainPromise;
  assert(missingDrain.providerCalls === 2 && missingDrain.keywordObjects === 2, "the missing-terminal fixture must store both task objects and make both calls");
  const missingSnapshot = await harness.readDurableState();
  assert(missingSnapshot.fixtures && missingSnapshot.fixtures.missingTerminal, "the missing-terminal fixture projection must be recorded");
  const missingProjection = missingSnapshot.fixtures.missingTerminal;
  assert(missingProjection.calls === 2 && missingProjection.objects === 2 && missingProjection.terminalTasks === 1 && missingProjection.nextStageRows === 0, `missing-terminal fixture must record exactly 2/2/1/0, saw ${missingProjection.calls}/${missingProjection.objects}/${missingProjection.terminalTasks}/${missingProjection.nextStageRows}`);
  assert(missingProjection.notReady === true, "the aggregator must return not-ready without the Neon terminal");
  assert(missingSnapshot.keywordResult.visible === false && missingSnapshot.run === null, "zero next-stage and result visibility for the missing-terminal fixture");
  captured.missing = {
    calls: missingProjection.calls,
    objects: missingProjection.objects,
    terminalTasks: missingProjection.terminalTasks,
    nextStageRows: missingProjection.nextStageRows,
    notReady: missingProjection.notReady,
    resultVisible: missingSnapshot.keywordResult.visible,
  };
  activate("W6-RES-04", `missing-terminal-fixture:${missingResearchId}:2/2/1/0:not-ready`);

  assertNetworkAllowlist();
  await netlogCrossCheck();
  assert(fetchIntervention.enabled === false && fetchIntervention.aborted === true, "the sole fetch intervention must be disabled after the W6-NAV-02 abort");
  const claims = SUBSTITUTE_LEDGER.map((claim) => ({ ...claim }));
  oracles.substituteFidelity(claims);
  activate("W6-CONF-05", `substitute-fidelity:6-ledger-rows:no-fetch-interception`);
  oracles.obsoleteExclusion(captured.inventory);
  assert(captured.inventory.standaloneInsideRoots === false, "the standalone project must stay outside the integrated inventory roots");
  activate("W6-CONF-06", `scope:${captured.inventory.roots.length}-roots:${captured.inventory.members.length}-members:0-obsolete`);
  activate("W6-CONF-02", `registry-equal:${manifest.globalDigest}`);
  activate("W6-CONF-03", `witnesses:26-unique-nonempty`);
  oracles.activationCompleteness(new Map([...witnessMap.entries()].map(([id, witness]) => [id, structuredClone(witness)])), allCaseIds);
  activate("W6-CONF-04", `controls:13:${setDigest(manifest.negativeControls)}`);

  const controlRecords = [];
  const expectThrow = (label, mutate) => {
    let threw = null;
    try {
      mutate();
    } catch (error) {
      threw = error;
    }
    assert(threw !== null, `${label}: the mutated captured data must make the unchanged oracle throw`);
  };

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.nav);
    oracles.navDestination(fresh());
    const mutated = fresh();
    mutated.locationPathname = mutated.statusUrlPathname;
    expectThrow("W6-NC-01", () => oracles.navDestination(mutated));
    oracles.navDestination(fresh());
    return { id: "W6-NC-01", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.create);
    oracles.authChain(fresh());
    const mutated = fresh();
    delete mutated.authEvent;
    expectThrow("W6-NC-02", () => oracles.authChain(mutated));
    oracles.authChain(fresh());
    return { id: "W6-NC-02", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.expansion);
    oracles.expansionTopology(fresh());
    const mutated = fresh();
    mutated.tuples.splice(3, 1);
    expectThrow("W6-NC-03", () => oracles.expansionTopology(mutated));
    oracles.expansionTopology(fresh());
    return { id: "W6-NC-03", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.corrupt);
    oracles.strictContract(fresh());
    const mutated = fresh();
    mutated.rejected = false;
    expectThrow("W6-NC-04", () => oracles.strictContract(mutated));
    oracles.strictContract(fresh());
    return { id: "W6-NC-04", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.publication);
    oracles.durableVisibility(fresh());
    const mutated = fresh();
    mutated.push({ visible: true, rowCount: 200, defaultSelectionItemCount: 100, fence: null });
    expectThrow("W6-NC-05", () => oracles.durableVisibility(mutated));
    oracles.durableVisibility(fresh());
    return { id: "W6-NC-05", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.handoff);
    oracles.handoffAtomicity(fresh());
    const mutated = fresh();
    mutated.clientKeys.splice(42, 1);
    expectThrow("W6-NC-06", () => oracles.handoffAtomicity(mutated));
    oracles.handoffAtomicity(fresh());
    return { id: "W6-NC-06", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.confirmation);
    oracles.googleValidation(fresh());
    const mutated = fresh();
    mutated.pairs.splice(55, 1);
    expectThrow("W6-NC-07", () => oracles.googleValidation(mutated));
    oracles.googleValidation(fresh());
    return { id: "W6-NC-07", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.readiness);
    oracles.domainReadiness(fresh());
    const mutated = fresh();
    mutated.stageComplete = true;
    mutated.terminalCount = mutated.expectedCount - 1;
    expectThrow("W6-NC-08", () => oracles.domainReadiness(mutated));
    oracles.domainReadiness(fresh());
    return { id: "W6-NC-08", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const chain = [
      {
        source: "chrome-network",
        networkUrl: captured.create.chromeRequest.url,
        authEvent: captured.create.authEvent,
        backendEvent: captured.create.backendEvent,
      },
    ];
    const fresh = () => structuredClone(chain);
    oracles.requestChain(fresh());
    const mutated = fresh();
    mutated.push({ source: "fetch-interception", networkUrl: captured.create.chromeRequest.url, authEvent: null, backendEvent: null });
    expectThrow("W6-NC-09", () => oracles.requestChain(mutated));
    oracles.requestChain(fresh());
    return { id: "W6-NC-09", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const base = {
      required: [...allCaseIds],
      registered: [...allCaseIds],
      executed: [...allCaseIds],
      skipped: [],
      duplicates: [],
      unexpected: [],
      unactivated: [],
    };
    const subInjections = [];
    oracles.registryEquality(structuredClone(base));
    const mutations = [
      ["remove-one-member", (registry) => { registry.executed.splice(10, 1); }],
      ["duplicate-one-member", (registry) => { registry.registered.splice(7, 0, registry.registered[7]); }],
      ["add-one-unexpected-member", (registry) => { registry.executed.push("W6-UNEXPECTED-01"); }],
      ["mark-one-member-skipped", (registry) => { registry.skipped.push(registry.executed[3]); }],
      ["filter-one-member", (registry) => { registry.executed = registry.executed.filter((_, index) => index !== 20); }],
    ];
    for (const [name, mutate] of mutations) {
      const mutated = structuredClone(base);
      mutate(mutated);
      expectThrow(`W6-NC-10:${name}`, () => oracles.registryEquality(mutated));
      subInjections.push(name);
    }
    oracles.registryEquality(structuredClone(base));
    return { id: "W6-NC-10", pass: true, mutationThrew: true, freshPass: true, subInjections };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => new Map([...witnessMap.entries()].map(([id, witness]) => [id, structuredClone(witness)]));
    oracles.activationCompleteness(fresh(), allCaseIds);
    const mutated = fresh();
    mutated.delete(allCaseIds[9]);
    expectThrow("W6-NC-11", () => oracles.activationCompleteness(mutated, allCaseIds));
    oracles.activationCompleteness(fresh(), allCaseIds);
    return { id: "W6-NC-11", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(SUBSTITUTE_LEDGER.map((claim) => ({ ...claim })));
    oracles.substituteFidelity(fresh());
    const mutated = fresh();
    const s3Claim = mutated.find((claim) => claim.boundary === "s3-sqs");
    s3Claim.actual = "live AWS SQS/S3 transport";
    expectThrow("W6-NC-12", () => oracles.substituteFidelity(mutated));
    oracles.substituteFidelity(fresh());
    return { id: "W6-NC-12", pass: true, mutationThrew: true, freshPass: true };
  })());

  controlRecords.push(await (async () => {
    const fresh = () => structuredClone(captured.inventory);
    oracles.obsoleteExclusion(fresh());
    const classes = [
      ["python-file", { path: "kiw6-synthetic.py", content: "" }],
      ["sqlite", { path: "synthetic-sqlite-member.js", content: "sqlite://kiw6" }],
      ["standalone-dashboard", { path: "KeywordSearchVolume/app.py", content: "" }],
      ["output-file", { path: "data/output/output.json", content: "{}" }],
      ["file-url", { path: "synthetic-file-url.js", content: "file://kiw6" }],
      ["cdn-host", { path: "synthetic-cdn-member.js", content: "https://cdn.jsdelivr.net/kiw6" }],
    ];
    const subInjections = [];
    for (const [name, member] of classes) {
      const mutated = fresh();
      mutated.members.push(structuredClone(member));
      expectThrow(`W6-NC-13:${name}`, () => oracles.obsoleteExclusion(mutated));
      subInjections.push(name);
    }
    oracles.obsoleteExclusion(fresh());
    return { id: "W6-NC-13", pass: true, mutationThrew: true, freshPass: true, subInjections };
  })());

  assert(controlRecords.length === 13, `all thirteen captured-data controls must run, saw ${controlRecords.length}`);
  assert(controlRecords.every((record) => record.pass && record.mutationThrew && record.freshPass), "every control must record pass, mutated-fail and fresh-pass");
  assert(setDigest(controlRecords.map((record) => record.id)) === setDigest(manifest.negativeControls), "the executed control set must equal the manifest control set");

  const executed = [];
  for (const id of allCaseIds) {
    const witness = witnessMap.get(id);
    assert(witness && witness.caseId === id && typeof witness.evidenceRef === "string" && witness.evidenceRef.length > 0, `missing nonempty activation witness for ${id}`);
    assert(oracleResults.get(id) === true, `oracle did not pass for ${id}`);
    executed.push(id);
  }
  oracles.registryEquality({ required: allCaseIds, registered: allCaseIds, executed, skipped: [], duplicates: [], unexpected: [], unactivated: [] });
  const recomputedGroupDigests = {};
  for (const groupName of groupNames) {
    recomputedGroupDigests[groupName] = setDigest(manifest.groups[groupName].filter((id) => executed.includes(id)));
    assert(recomputedGroupDigests[groupName] === manifest.groupDigests[groupName], `executed group digest must match the manifest for ${groupName}`);
  }
  assert(setDigest(executed) === manifest.globalDigest, "executed global digest must match the manifest");
  const duplicates = executed.filter((id, index) => executed.indexOf(id) !== index);
  const unexpected = executed.filter((id) => !allCaseIds.includes(id));
  const unactivated = allCaseIds.filter((id) => !witnessMap.has(id));
  const skipped = allCaseIds.filter((id) => !executed.includes(id));

  certificate = {
    contractVersion: manifest.contractVersion,
    required: allCaseIds,
    registered: allCaseIds,
    executed,
    activated: [...allCaseIds],
    skipped,
    duplicates,
    unexpected,
    unactivated,
    groupDigests: recomputedGroupDigests,
    globalDigest: manifest.globalDigest,
    negativeControls: controlRecords.map((record) => ({
      id: record.id,
      outcome: "pass",
      subInjections: record.subInjections ? record.subInjections.length : 0,
    })),
    operationCounts: {
      baseMaximum: {
        providerCalls: 19,
        providerAttempts: 19,
        keywordObjects: 23,
        keywordQueueSends: 42,
        selectedItems: 100,
        runQueries: 100,
        googleValidationCalls: 100,
        discoveryTasks: 100,
        googleOccurrences: 1000,
        stableDomains: 1000,
        leadTasks: 1000,
      },
      corruptArtifactFixture: { providerCalls: 2, keywordObjects: 2, terminalTasks: 2, nextStageRows: 0 },
      missingTerminalFixture: { providerCalls: 2, keywordObjects: 2, terminalTasks: 1, nextStageRows: 0 },
    },
    substituteClaims: claims,
    obsoleteRuntimeHits: [],
  };
  oracles.registryEquality({
    required: certificate.required,
    registered: certificate.registered,
    executed: certificate.executed,
    skipped: certificate.skipped,
    duplicates: certificate.duplicates,
    unexpected: certificate.unexpected,
    unactivated: certificate.unactivated,
  });
  oracles.substituteFidelity(certificate.substituteClaims);
  assert(certificate.activated.length === 26 && new Set(certificate.activated).size === 26, "certificate must carry 26 unique activated cases");
  diagnostics.casesExecuted = executed.length;
  diagnostics.controlsExecuted = controlRecords.length;
  diagnostics.ok = true;
} catch (error) {
  mainError = error;
} finally {
  clearInterval(rssSampler);
  diagnostics.wallTimeMs = Date.now() - startedAt;
  let cleanupError = null;
  const harnessCloseState = { result: null };
  const harnessCloseOnce = async () => {
    if (!harnessCloseState.result && harness) {
      harnessCloseState.result = await harness.close();
      diagnostics.droppedSchema = harnessCloseState.result.droppedSchema;
    }
  };
  const cleanupSteps = {
    "browser": async () => {
      if (cdp) {
        try {
          cdp.close();
        } catch {}
        cdp = null;
      }
      if (chromeProcess?.pid && chromeProcess.exitCode === null) {
        try {
          process.kill(-chromeProcess.pid, "SIGTERM");
        } catch {}
      }
      chromeProcess = null;
      await wait(300);
    },
    "next-server": async () => {
      await stopNext();
    },
    "auth-server": async () => {
      await harnessCloseOnce();
    },
    "backend-server": async () => {
      await harnessCloseOnce();
    },
    "schema-absence": async () => {
      if (!harness && !harnessCloseState.result) return;
      assert(harnessCloseState.result && harnessCloseState.result.absenceWitness.rowCount === 0, "the disposable schema absence verification must report zero rows after drop");
    },
    "temp-root": async () => {
      if (tempRoot) await fsp.rm(tempRoot, { recursive: true, force: true });
      tempRoot = null;
    },
  };
  diagnostics.downstreamOutcome = !downstreamOutcome.started ? "not-started" : (downstreamOutcome.settled ? downstreamOutcome.settled.outcome : "pending");
  for (const step of CLEANUP_ORDER) {
    if (cleanupError) {
      diagnostics.cleanupStepsDone.push(`${step}:skipped`);
      continue;
    }
    try {
      await cleanupSteps[step]();
      diagnostics.cleanupStepsDone.push(`${step}:ok`);
    } catch (error) {
      cleanupError = error;
      diagnostics.cleanupStepsDone.push(`${step}:failed`);
    }
  }
  diagnostics.downstreamCleanup = harnessCloseState.result?.downstreamCleanup ?? null;
  if (mainError) diagnostics.mainError = String(mainError?.message || mainError);
  if (cleanupError) diagnostics.cleanupError = String(cleanupError?.message || cleanupError);
  diagnostics.consoleErrors = consoleErrors.length;
  diagnostics.pageExceptions = exceptionThrown.length;
  diagnostics.networkRequests = networkUrls.length;
  if (!mainError && !cleanupError && certificate) {
    console.log(`KI_W6_CERTIFICATE=${JSON.stringify(certificate)}`);
    process.exitCode = 0;
  } else {
    process.exitCode = 1;
  }
  console.log(`KI_W6_DIAGNOSTICS=${JSON.stringify(diagnostics)}`);
}
