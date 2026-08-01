import assert from "node:assert/strict";
import { mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { lead } from "./fixtures.ts";

type Components = {
  LeadDetails: React.ComponentType<{ lead: ReturnType<typeof lead> }>;
  ResultsTableView: React.ComponentType<{
    leads: ReturnType<typeof lead>[];
    loading: boolean;
    expandedLeadId: string | null;
    onExpandedLeadId: (leadId: string | null) => void;
  }>;
};

let compiled: Promise<Components> | null = null;

function compiledComponents(): Promise<Components> {
  if (compiled) return compiled;
  compiled = (async () => {
    const frontendRoot = fileURLToPath(new URL("..", import.meta.url));
    const output = await mkdtemp(join(tmpdir(), "gr5-components-"));
    await writeFile(join(output, "package.json"), '{"type":"commonjs"}\n', "utf8");
    await symlink(join(frontendRoot, "node_modules"), join(output, "node_modules"), "dir");
    const tsc = join(frontendRoot, "node_modules", "typescript", "bin", "tsc");
    const result = spawnSync(process.execPath, [
      tsc,
      "--outDir", output,
      "--rootDir", frontendRoot,
      "--module", "CommonJS",
      "--moduleResolution", "Node",
      "--target", "ES2022",
      "--jsx", "react-jsx",
      "--strict",
      "--skipLibCheck",
      "--esModuleInterop",
      "components/lead-details.tsx",
      "components/results-table.tsx",
    ], { cwd: frontendRoot, encoding: "utf8" });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const require = createRequire(import.meta.url);
    const details = require(join(output, "components", "lead-details.js"));
    const table = require(join(output, "components", "results-table.js"));
    return { LeadDetails: details.LeadDetails, ResultsTableView: table.ResultsTableView } as Components;
  })();
  return compiled;
}

test("actual expanded details render every full-evidence family and every contact channel", async () => {
  const { LeadDetails } = await compiledComponents();
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: lead() }));
  for (const expected of [
    "Eyewear Brand",
    "Normalized category",
    "Matched terms",
    "Page-level store-fit evidence",
    "Usable text length:",
    "Email: hello@fixture.example",
    "Phone: +12125550100",
    "Contact page:",
    "Social profile:",
    "Validation reason",
    "Query-generation reason",
    "Requested search-result URL",
    "Observed final URL",
    "Display hostname",
    "fixture.example",
    "Canonical trust",
    "Evidence rank v2",
  ]) {
    assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"));
  }
});

test("missing and unsafe optional URLs never create blank or unsafe links", async () => {
  const { LeadDetails } = await compiledComponents();
  const fixture = lead({
    email: null,
    email_source_url: null,
    phone: null,
    phone_source_url: null,
    contact_url: "javascript:alert(1)",
    social_profiles: ["javascript:alert(2)"],
    final_url: null,
    canonical_url: null,
    contact_evidence: null,
    identity_evidence: null,
  });
  const html = renderToStaticMarkup(createElement(LeadDetails, { lead: fixture }));
  assert.doesNotMatch(html, /javascript:/u);
  assert.doesNotMatch(html, /href=""/u);
  assert.match(html, /No validated outreach or social channel was recorded/u);
});

test("actual table view cannot retain expanded evidence for a replaced result set", async () => {
  const { ResultsTableView } = await compiledComponents();
  const first = lead({ id: "lead_first", store_name: "First Evidence" });
  const second = lead({ id: "lead_second", store_name: "Second Evidence" });
  const expanded = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [first], loading: false, expandedLeadId: first.id, onExpandedLeadId: () => {},
  }));
  assert.match(expanded, /lead-detail-lead_first/u);
  assert.match(expanded, /First Evidence/u);

  const replaced = renderToStaticMarkup(createElement(ResultsTableView, {
    leads: [second], loading: false, expandedLeadId: first.id, onExpandedLeadId: () => {},
  }));
  assert.doesNotMatch(replaced, /lead-detail-lead_first/u);
  assert.doesNotMatch(replaced, /First Evidence/u);
  assert.match(replaced, /Second Evidence/u);
});
