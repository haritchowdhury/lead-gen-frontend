import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "review-evidence/design-system/G5");
const port = 4322;
const baseUrl = `http://127.0.0.1:${port}`;
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "storesignal-g5-"));
const checks = { fixture: "real public landing route with synthetic query-review target check", scenarios: [], interactions: [] };
let nextProcess;
let chromeProcess;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const waitForExit = (child) => new Promise((resolve) => child.once("exit", resolve));
async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
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
async function navigate(cdp) {
  await cdp.send("Page.navigate", { url: baseUrl });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(cdp, "document.readyState") === "complete") break;
    await wait(100);
  }
  await wait(600);
}
async function capture(cdp, width, height) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await evaluate(cdp, "scrollTo(0, 0)");
  await wait(150);
  const metrics = await evaluate(cdp, `(() => {
    const box = (selector) => { const node = document.querySelector(selector); if (!node) return null; const rect = node.getBoundingClientRect(); return { top: Math.round(rect.top + scrollY), width: Math.round(rect.width), height: Math.round(rect.height) }; };
    const sectionSelectors = ['.landing-problem', '.process-section', '.intelligence-section', '.evidence-section', '.market-section', '.use-cases-section', '.control-section', '.faq-section', '.final-cta', '.site-footer'];
    return {
      viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      bodyOverflow: document.documentElement.scrollWidth > innerWidth,
      sections: Object.fromEntries(sectionSelectors.map((selector) => [selector, box(selector)])),
      faqCount: document.querySelectorAll('.faq-list details').length,
      footerNavCount: document.querySelectorAll('.site-footer nav').length,
      ctaHref: document.querySelector('.final-cta a')?.getAttribute('href') ?? null,
      processHref: document.querySelector('.process-section .marketing-text-link')?.getAttribute('href') ?? null,
      marketingClaims: document.querySelector('.marketing-flow')?.innerText ?? ''
    };
  })()`);
  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(path.join(outputDir, `landing-full-${width}x${height}.png`), Buffer.from(screenshot.data, "base64"));
  checks.scenarios.push(metrics);
  if (metrics.bodyOverflow) throw new Error(`Landing body overflows at ${width}px`);
  if (Object.values(metrics.sections).some((section) => !section || section.width <= 0 || section.height <= 0)) throw new Error(`A lower section is missing at ${width}px`);
  if (metrics.faqCount !== 7 || metrics.footerNavCount !== 2) throw new Error("FAQ or footer structure changed");
  if (metrics.ctaHref !== "#start-discovery" || metrics.processHref !== "#start-discovery") throw new Error("Public CTA target changed");
  if (/mailto:|testimonial|pricing|trusted by|street address/iu.test(metrics.marketingClaims)) throw new Error("Unsupported marketing content found");
}

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

  await navigate(cdp);
  for (const [width, height] of [[390, 844], [768, 1024], [1280, 800], [1440, 900]]) await capture(cdp, width, height);

  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(cdp, `(() => { const summary = document.querySelector('.faq-list summary'); summary.scrollIntoView(); summary.focus({ focusVisible: true }); })()`);
  await cdp.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await cdp.send("Input.dispatchKeyEvent", { type: "char", key: "Enter", code: "Enter", text: "\r", unmodifiedText: "\r" });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await wait(100);
  const faq = await evaluate(cdp, `(() => { const details = document.querySelector('.faq-list details'); const summary = details.querySelector('summary'); return { open: details.open, focused: document.activeElement === summary, outlineStyle: getComputedStyle(summary).outlineStyle, outlineWidth: getComputedStyle(summary).outlineWidth }; })()`);
  checks.interactions.push({ name: "faq-keyboard", ...faq });
  if (!faq.open || !faq.focused || faq.outlineStyle === "none" || faq.outlineWidth === "0px") throw new Error(`FAQ keyboard/focus behavior failed: ${JSON.stringify(faq)}`);

  await navigate(cdp);
  await evaluate(cdp, "document.querySelector('.site-footer a[href=\"#how-it-works\"]').click()");
  await wait(500);
  const anchor = await evaluate(cdp, `(() => { const section = document.querySelector('#how-it-works'); return { hash: location.hash, top: Math.round(section.getBoundingClientRect().top), headerHeight: Math.round(document.querySelector('.site-header').getBoundingClientRect().height), viewportHeight: innerHeight }; })()`);
  checks.interactions.push({ name: "sticky-anchor", ...anchor });
  if (anchor.hash !== "#how-it-works" || anchor.top < anchor.headerHeight - 2 || anchor.top >= anchor.viewportHeight) throw new Error(`Sticky-header anchor visibility failed: ${JSON.stringify(anchor)}`);

  const queryTargets = await evaluate(cdp, `(() => { document.querySelectorAll('.process-section .marketing-text-link, .final-cta a').forEach((link) => link.setAttribute('href', '#query-review')); return [...document.querySelectorAll('a[href="#query-review"]')].map((link) => link.textContent.trim()); })()`);
  checks.interactions.push({ name: "query-review-target-fixture", href: "#query-review", labels: queryTargets });
  if (queryTargets.length !== 2) throw new Error("Query-review lower-page targets are missing");

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
