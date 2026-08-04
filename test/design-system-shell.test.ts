import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = await Promise.all([
  "components/auth-form.tsx",
  "components/header-auth.tsx",
  "components/run-history.tsx",
  "components/run-continuation.tsx",
  "app/runs/page.tsx",
  "app/not-found.tsx",
  "app/globals.css",
].map((file) => readFile(new URL(`../${file}`, import.meta.url), "utf8")));

const [auth, headerAuth, history, continuation, runsPage, notFound, css] = files;

test("G3 preserves authentication validation, redirects, and account targets", () => {
  assert.match(auth, /name\.length < 2/);
  assert.match(auth, /password\.length < 8/);
  assert.match(auth, /authClient\.signUp\.email\(\{ name, email, password \}\)/);
  assert.match(auth, /authClient\.signIn\.email\(\{ email, password \}\)/);
  assert.match(auth, /router\.replace\("\/runs\/continue"\)/);
  assert.match(headerAuth, /authClient\.signOut\(\)/);
  assert.match(headerAuth, /router\.replace\("\/"\)/);
  assert.match(headerAuth, /href="\/runs"/);
  assert.match(headerAuth, /href="\/sign-in"/);
});

test("G3 preserves run fetching, paging, state labels, and encoded links", () => {
  assert.match(history, /const PAGE_SIZE = 20/);
  assert.match(history, /`\/api\/runs\?page=\$\{page\}&pageSize=\$\{PAGE_SIZE\}`/);
  assert.match(history, /encodeURIComponent\(run\.runId\)/);
  assert.match(history, /page <= 1/);
  assert.match(history, /page >= data\.pagination\.totalPages/);
  for (const label of ["Queued", "Review queries", "completed", "failed", "cancelled"]) {
    assert.match(history.toLowerCase(), new RegExp(label.toLowerCase()));
  }
  assert.match(runsPage, /href="\/"/);
});

test("My runs presents identifiable run dossiers without rendering run IDs", () => {
  assert.match(history, /categoryTitle\(run\)/);
  assert.match(history, /Stores found/);
  assert.match(history, /Qualified/);
  assert.match(history, /Rejected/);
  assert.match(history, /storeProcessingFailures/);
  assert.match(history, /run-history-progress/);
  assert.match(history, /Traffic \{trafficProgressState\(run\)\.label\.toLowerCase\(\)\}/);
  assert.match(history, /activityLabel\(run\)/);
  assert.doesNotMatch(history, /<code/u);
  assert.match(css, /\.run-history-outcomes\s*\{/u);
  assert.match(css, /\.run-history-row\.is-awaiting_query_confirmation/u);
  assert.match(css, /\.run-traffic-state\.is-complete/u);
});

test("G3 preserves continuation outcomes and not-found target", () => {
  assert.match(continuation, /method: "POST"/);
  assert.match(continuation, /RUN_INTENT_NOT_FOUND/);
  assert.match(continuation, /router\.replace\("\/"\)/);
  assert.match(continuation, /encodeURIComponent\(run\.runId\)/);
  assert.match(notFound, /href="\/"/);
});

test("G3 uses the shared primitive vocabulary and responsive shell", () => {
  assert.match(auth, /ds-card ds-card--floating/);
  assert.match(auth, /className="ds-field"/);
  assert.match(history, /run-state ds-badge/);
  assert.match(history, /ds-button ds-button--secondary/);
  assert.match(css, /\/\* G3 application shell, account, and run-history composition\. \*\//);
  assert.match(css, /\.site-header \{[\s\S]*position: sticky/);
  assert.match(css, /@media \(max-width: 780px\)[\s\S]*\.run-history-row/);
  assert.doesNotMatch(css, /\.app-canvas\s*\{[^}]*#[0-9a-f]{3,8}/i);
});
