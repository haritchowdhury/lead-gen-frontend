import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

export const REQUIRED_CASE_IDS: readonly string[] = [
  "CASE-UA-W1-001",
  "CASE-UA-W1-002",
  "CASE-UA-W2-001",
  "CASE-UA-W2-002",
  "CASE-UA-W2-003",
  "CASE-UA-W2-004",
  "CASE-UA-W3-001",
  "CASE-UA-W3-002",
  "CASE-UA-W3-003",
  "CASE-UA-W3-004",
  "CASE-UA-W4-001",
  "CASE-UA-W4-002",
  "CASE-UA-W5-001",
  "CASE-UA-W5-002",
  "CASE-UA-W6-001",
  "CASE-UA-W6-002",
  "CASE-UA-W6-003",
  "CASE-UA-W7-001",
  "CASE-UA-W7-002",
  "CASE-UA-W8-001",
  "CASE-UA-W8-002",
  "CASE-UA-W8-003",
  "CASE-UA-W9-001",
  "CASE-UA-W9-002",
  "CASE-UA-W9-003",
  "CASE-UA-W9-004",
  "CASE-UA-W10-001",
  "CASE-UA-W10-002",
  "CASE-UA-W10-003",
  "CASE-UA-W11-001",
  "CASE-UA-W11-002",
  "CASE-UA-W12-001",
  "CASE-UA-W12-002",
  "CASE-UA-W13-001",
  "CASE-UA-W13-002",
  "CASE-UA-W13-003",
  "CASE-UA-W13-004",
  "CASE-UA-W14-001",
  "CASE-UA-W14-002",
  "CASE-UA-W14-003",
  "CASE-UA-W15-001",
  "CASE-UA-W15-002",
  "CASE-UA-W15-003",
];

export function listRequiredCaseIds(): string[] {
  return [...REQUIRED_CASE_IDS];
}

export function coverageDigest(ids: readonly string[]): string {
  const unique = new Set<string>();
  for (const id of ids) {
    if (unique.has(id)) {
      throw new Error(`duplicate coverage case id: ${id}`);
    }
    unique.add(id);
  }
  const sorted = [...unique].sort((a, b) =>
    Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")),
  );
  const hash = createHash("sha256");
  for (const id of sorted) {
    hash.update(Buffer.from(id, "utf8"));
    hash.update(Buffer.from("\n", "utf8"));
  }
  return hash.digest("hex");
}

const PINNED_REQUIRED_SET_DIGEST = "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05";

const executedSetPath = fileURLToPath(new URL(".ua-executed.json", import.meta.url));

export function getExecuted(): string[] {
  if (!existsSync(executedSetPath)) {
    return [];
  }
  const parsed: unknown = JSON.parse(readFileSync(executedSetPath, "utf8"));
  if (!Array.isArray(parsed) || !parsed.every((id): id is string => typeof id === "string")) {
    throw new Error(`malformed executed set file: ${executedSetPath}`);
  }
  return parsed;
}

export function recordExecuted(id: string): void {
  if (!REQUIRED_CASE_IDS.includes(id)) {
    throw new Error(`unknown coverage case id: ${id}`);
  }
  const merged = [...new Set([...getExecuted(), id])].sort((a, b) =>
    Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")),
  );
  writeFileSync(executedSetPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
}

const UA_W1_WRITE_SCOPE_ALLOWLIST: readonly string[] = [
  "frontend/test/uphunt-aesthetic-coverage.test.ts",
];

const FORBIDDEN_PATH_FRAGMENTS: readonly string[] = [
  "app/api",
  "lib/api-types.ts",
  "email_scraper",
  "ACTIVE_EXECUTION_STATE.md",
];

test("CASE-UA-W1-001 UA-W1 write-scope allowlist excludes every forbidden path", () => {
  assert.deepEqual(
    [...UA_W1_WRITE_SCOPE_ALLOWLIST],
    ["frontend/test/uphunt-aesthetic-coverage.test.ts"],
  );
  for (const allowed of UA_W1_WRITE_SCOPE_ALLOWLIST) {
    for (const fragment of FORBIDDEN_PATH_FRAGMENTS) {
      assert.ok(
        !allowed.includes(fragment),
        `forbidden fragment ${fragment} found in ${allowed}`,
      );
    }
  }
  recordExecuted("CASE-UA-W1-001");
});

test("CASE-UA-W1-002 required coverage set digest matches the frozen A4 pin", () => {
  const ids = listRequiredCaseIds();
  assert.equal(ids.length, 43);
  assert.equal(new Set(ids).size, 43);
  assert.throws(
    () => coverageDigest([...ids, "CASE-UA-W1-001"]),
    /duplicate coverage case id: CASE-UA-W1-001/,
  );
  assert.equal(coverageDigest(ids), PINNED_REQUIRED_SET_DIGEST);
  recordExecuted("CASE-UA-W1-002");
});
