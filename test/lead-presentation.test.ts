import assert from "node:assert/strict";
import test from "node:test";

import type { Lead } from "../lib/api-types.ts";
import {
  contactChannels,
  contactabilityLabel,
  retainedExpandedLead,
  safeExternalUrl,
  scoreComponents,
  scorePresentation,
} from "../lib/lead-presentation.ts";

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead_fixture",
    shop_type: "eyewear",
    generated_query: null,
    query_score: null,
    query_generation_reason: null,
    search_query: null,
    google_rank: 1,
    google_result_url: null,
    myshopify_domain: "fixture.myshopify.com",
    final_url: "https://fixture.example/",
    canonical_url: null,
    resolved_domain: "fixture.example",
    store_name: "Fixture Optics",
    email: null,
    email_source_url: null,
    phone: null,
    phone_source_url: null,
    contact_url: null,
    social_profiles: [],
    additional_information: null,
    shopify_confidence: 100,
    relevance_score: 100,
    lead_score: 80,
    status: "qualified",
    rejection_reason: null,
    error: null,
    business_qualifier: "brand",
    pipeline_version: 2,
    scoring_version: 2,
    store_fit_state: "specialist",
    store_fit_evidence: null,
    contactability_tier: "direct",
    contact_evidence: null,
    identity_confidence: 70,
    identity_evidence: null,
    score_breakdown: null,
    discovery_occurrences: [],
    matched_categories: [],
    score_semantics: "evidence_rank_v2",
    ...overrides,
  };
}

test("compact contact channels retain email, phone, contact page, and safe socials", () => {
  const channels = contactChannels(lead({
    email: "hello@fixture.example",
    phone: "+12125550100",
    contact_url: "https://fixture.example/pages/contact",
    social_profiles: [
      "https://instagram.com/fixture",
      "javascript:alert(1)",
    ],
  }));
  assert.deepEqual(channels.map(({ kind }) => kind), [
    "email",
    "phone",
    "contact_page",
    "social_profile",
  ]);
  assert.equal(channels[0].href, "mailto:hello%40fixture.example");
  assert.equal(channels[1].href, "tel:+12125550100");
});

test("email-only, phone-only, indirect, social-only, and no-contact rows stay distinct", () => {
  const cases = [
    [lead({ email: "hello@fixture.example" }), ["email"]],
    [lead({ phone: "+12125550100" }), ["phone"]],
    [lead({ contactability_tier: "indirect", contact_url: "https://fixture.example/contact" }), ["contact_page"]],
    [lead({
      status: "rejected",
      lead_score: null,
      scoring_version: null,
      score_breakdown: null,
      contactability_tier: "research_only",
      social_profiles: ["https://instagram.com/fixture"],
    }), ["social_profile"]],
    [lead({
      status: "rejected",
      lead_score: null,
      scoring_version: null,
      score_breakdown: null,
      contactability_tier: "none",
    }), []],
  ] as const;
  for (const [fixture, expected] of cases) {
    assert.deepEqual(contactChannels(fixture).map(({ kind }) => kind), expected);
  }
});

test("unsafe, credential-bearing, invalid, and missing URLs are never external links", () => {
  assert.equal(safeExternalUrl("javascript:alert(1)"), null);
  assert.equal(safeExternalUrl("https://user:secret@fixture.example"), null);
  assert.equal(safeExternalUrl("not a URL"), null);
  assert.equal(safeExternalUrl(null), null);
  assert.equal(safeExternalUrl("https://fixture.example/a"), "https://fixture.example/a");
});

test("contactability labels distinguish indirect, research-only, and none", () => {
  assert.equal(contactabilityLabel("indirect"), "Contact page only");
  assert.equal(contactabilityLabel("research_only"), "Research only");
  assert.equal(contactabilityLabel("none"), "No outreach method");
});

test("scores distinguish qualified v2, structural outcomes, and legacy rows", () => {
  assert.equal(scorePresentation(lead()).tone, "high");
  assert.deepEqual(
    scorePresentation(lead({ status: "rejected", lead_score: 99 })),
    {
      value: "—",
      label: "Not scored",
      tone: "empty",
      explanation: "Rejected and failed v2 outcomes do not receive a score.",
    },
  );
  assert.equal(scorePresentation(lead({
    score_semantics: "legacy_v1",
    scoring_version: null,
    status: "rejected",
    lead_score: 99,
  })).tone, "neutral");
});

test("score components retain every numeric component and expansion clears on page change", () => {
  assert.deepEqual(scoreComponents({
    version: 2,
    components: { identity: 14, shopifyValidation: 25, categoryFit: 30 },
    total: 69,
  }), [
    { label: "Store identity", value: 14 },
    { label: "Shopify validation", value: 25 },
    { label: "Category fit", value: 30 },
  ]);
  assert.equal(retainedExpandedLead("lead_fixture", [lead()]), "lead_fixture");
  assert.equal(retainedExpandedLead("lead_fixture", [lead({ id: "other" })]), null);
});
