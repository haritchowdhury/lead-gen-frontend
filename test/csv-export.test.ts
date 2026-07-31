import assert from "node:assert/strict";
import test from "node:test";

import type { Lead } from "../lib/api-types.ts";
import {
  CSV_HEADERS,
  serializeLeadsToCsv,
} from "../lib/csv-export.ts";

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead_fixture",
    shop_type: "clothing",
    generated_query: null,
    query_score: null,
    query_generation_reason: null,
    search_query: null,
    google_rank: 1,
    google_result_url: null,
    myshopify_domain: "fixture.myshopify.com",
    final_url: null,
    canonical_url: null,
    resolved_domain: "fixture.example",
    store_name: "Fixture Store",
    email: "hello@fixture.example",
    email_source_url: null,
    phone: null,
    phone_source_url: null,
    contact_url: null,
    social_profiles: ["https://instagram.com/fixture"],
    additional_information: null,
    shopify_confidence: 100,
    relevance_score: 92,
    lead_score: 96,
    status: "qualified",
    rejection_reason: null,
    error: null,
    ...overrides,
  };
}

test("uses the exact 25-column legacy header order and excludes id", () => {
  const [header] = serializeLeadsToCsv([lead()]).split("\r\n");
  assert.equal(header, CSV_HEADERS.join(","));
  assert.equal(CSV_HEADERS.length, 25);
  assert.equal(header.split(",").includes("id"), false);
});

test("serializes social profiles, nulls, commas, and quotes safely", () => {
  const csv = serializeLeadsToCsv([
    lead({
      store_name: 'Fixture, "North"',
      phone: null,
      social_profiles: ["https://instagram.com/fixture"],
    }),
  ]);
  assert.match(csv, /"Fixture, ""North"""/u);
  assert.match(csv, /"\[""https:\/\/instagram\.com\/fixture""\]"/u);
});

test("protects formula-like text while leaving numeric scores numeric", () => {
  const csv = serializeLeadsToCsv([
    lead({ store_name: "=HYPERLINK(\"https://bad.example\")", lead_score: 96 }),
  ]);
  assert.match(csv, /"'=HYPERLINK\(""https:\/\/bad\.example""\)"/u);
  assert.match(csv, /,96,qualified,/u);
});
