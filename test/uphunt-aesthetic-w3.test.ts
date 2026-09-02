
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { recordExecuted } from "./uphunt-aesthetic-coverage.test.ts";

const authForm = await readFile(new URL("../components/auth-form.tsx", import.meta.url), "utf8");
const appHeader = await readFile(new URL("../components/app-header.tsx", import.meta.url), "utf8");
const notFound = await readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8");
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("CASE-UA-W3-001 auth-form sign-in headline uses the DEC-UA-003 recipe", () => {
  assert.match(authForm, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(authForm, /<h1/u);
  assert.doesNotMatch(authForm, /aria-labelledby="auth-title"/u);
  assert.match(authForm, /eyebrow="StoreSignal account"/u);
  assert.match(authForm, /title=\{isSignUp \? "Save your search\." : "Welcome back\."\}/u);
  assert.match(authForm, /"Sign in to continue a pending search or return to earlier runs\."/u);
  recordExecuted("CASE-UA-W3-001");
});

test("CASE-UA-W3-002 auth-form sign-up headline uses the DEC-UA-003 recipe", () => {
  assert.match(authForm, /"Save your search\."/u);
  assert.match(authForm, /"Create an account to start the search you just prepared and keep every run in one place\."/u);
  assert.doesNotMatch(authForm, /id="auth-title"/u);
  recordExecuted("CASE-UA-W3-002");
});

test("CASE-UA-W3-003 app header keeps the site-header class and signal tokens", () => {
  assert.match(appHeader, /className="site-header"/u);
  assert.match(globals, /--color-signal:\s*#c8f04b/u);
  recordExecuted("CASE-UA-W3-003");
});

test("CASE-UA-W3-004 not-found uses the DEC-UA-003 recipe", () => {
  assert.match(notFound, /import \{ SectionIntro \} from "@\/components\/section-intro";/u);
  assert.doesNotMatch(notFound, /<h1/u);
  assert.match(notFound, /eyebrow="404 · Not found"/u);
  assert.match(notFound, /title="That lead run does not exist\."/u);
  assert.match(notFound, /copy="The address may be incomplete, or the run ID may be invalid\."/u);
  assert.match(notFound, /href="\/"/u);
  recordExecuted("CASE-UA-W3-004");
});
