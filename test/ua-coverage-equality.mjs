import assert from "node:assert/strict";
import {
  coverageDigest,
  getExecuted,
  listRequiredCaseIds,
  recordExecuted,
} from "./uphunt-aesthetic-coverage.test.ts";

const required = listRequiredCaseIds();
const requiredAfterNpmTest = required.filter((id) => id !== "CASE-UA-W15-003");

const executedAfterNpmTest = getExecuted();
assert.equal(
  coverageDigest(executedAfterNpmTest),
  "434a1f5eb42ce7e8640ba1ab8d80e54c2d0225c9f155a4f781d9f2ef76418cbd",
  `executed-after-npm-test digest mismatch: got ${coverageDigest(getExecuted())}`,
);
assert.deepEqual(
  [...executedAfterNpmTest].sort(),
  [...requiredAfterNpmTest].sort(),
  "executed-after-npm-test set mismatches required minus CASE-UA-W15-003",
);

recordExecuted("CASE-UA-W15-003");

const finalExecuted = getExecuted();
assert.equal(
  coverageDigest(finalExecuted),
  "0d14982c83cfb36a4a0a907f528e0b3a7dc5c7d15b9a4dd9f7b361505ed34c05",
  `final executed-set digest mismatch: got ${coverageDigest(getExecuted())}`,
);
assert.deepEqual(
  [...finalExecuted].sort(),
  [...listRequiredCaseIds()].sort(),
  "final executed set mismatches REQUIRED_CASE_IDS",
);

console.log("UA-W15 coverage equality PASS: 43 required = registered = executed.");
