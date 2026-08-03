import type {
  DataForSeoMarketTraffic,
  Lead,
  QuerySet,
  ResultPage,
  RunProgress,
  RunStatus,
  TrafficEnrichment,
} from "../lib/api-types.ts";

const marketCodes: DataForSeoMarketTraffic["country_code"][] = [
  "US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE",
];

function trafficMetrics(value: number) {
  return {
    estimated_google_search_traffic: value,
    organic_estimated_traffic: value,
    organic_keyword_count: value,
    paid_estimated_traffic: 0,
    paid_keyword_count: 0,
    featured_snippet_estimated_traffic: 0,
    featured_snippet_keyword_count: 0,
    local_pack_estimated_traffic: 0,
    local_pack_keyword_count: 0,
  };
}

export function allTrackedMarkets(): DataForSeoMarketTraffic[] {
  return marketCodes.map((country_code, index) => ({
    country_code,
    ...trafficMetrics(index),
  }));
}

export function trafficEnrichment(): TrafficEnrichment {
  return {
    version: "traffic-enrichment-public-v1",
    dataforseo: {
      state: "partial",
      label: "Estimated Google search traffic",
      target: "fixture.example",
      worldwide: {
        estimated_google_search_traffic: 12,
        organic_estimated_traffic: 10.5,
        organic_keyword_count: 7,
        paid_estimated_traffic: 1.5,
        paid_keyword_count: 2,
        featured_snippet_estimated_traffic: 3,
        featured_snippet_keyword_count: 1,
        local_pack_estimated_traffic: 4,
        local_pack_keyword_count: 1,
      },
      markets: [{
        country_code: "IN",
        estimated_google_search_traffic: 4,
        organic_estimated_traffic: 4,
        organic_keyword_count: 3,
        paid_estimated_traffic: 0,
        paid_keyword_count: 0,
        featured_snippet_estimated_traffic: 1,
        featured_snippet_keyword_count: 1,
        local_pack_estimated_traffic: 0,
        local_pack_keyword_count: 0,
      }],
      observed_at: "2026-08-01T00:00:00.000Z",
    },
    crux: {
      state: "available",
      origin_metrics: {
        state: "available",
        origin: "https://fixture.example",
        metrics: {
          largest_contentful_paint_p75_ms: 2400,
          interaction_to_next_paint_p75_ms: 180,
          cumulative_layout_shift_p75: "0.08",
          first_contentful_paint_p75_ms: 1600,
          time_to_first_byte_p75_ms: 700,
        },
        observed_form_factor_fractions: { desktop: 0.4, phone: 0.6, tablet: 0 },
        collection_period: { first_date: "2026-07-01", last_date: "2026-07-28" },
        observed_at: "2026-08-01T00:00:00.000Z",
      },
      popularity: {
        state: "available",
        origin: "https://fixture.example",
        label: "Coarse CrUX navigation popularity rank",
        dataset_month: "202606",
        popularity_rank: 100000,
        popularity_band: "top_100000",
        observed_device_fractions: { phone: 0.7, desktop: 0.3, tablet: 0 },
        observed_at: "2026-08-01T00:00:00.000Z",
      },
    },
    traffic_sources: ["dataforseo", "crux"],
    traffic_attributions: [{
      source: "dataforseo",
      name: "DataForSEO Labs",
      text: "Estimated Google search traffic data sourced from DataForSEO Labs.",
      source_url: "https://dataforseo.com/apis/dataforseo-labs-api",
    }, {
      source: "crux",
      name: "Chrome UX Report",
      text: "Performance and popularity data sourced from the Chrome UX Report by Google, licensed under CC BY 4.0.",
      source_url: "https://developer.chrome.com/docs/crux/",
      license: "CC BY 4.0",
      license_url: "https://creativecommons.org/licenses/by/4.0/",
      transformation: "Metrics are selected and renamed.",
    }],
  };
}

export function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead_fixture",
    original_shop_type: "Eyewear Brand",
    shop_type: "eyewear",
    generated_query: "site:myshopify.com/products acetate frames",
    query_score: 82.29,
    query_generation_reason: "Concrete product phrase for an independent brand.",
    search_query: "site:myshopify.com/products acetate frames",
    google_rank: 1,
    google_result_url: "https://fixture.myshopify.com/products/frames",
    myshopify_domain: "fixture.myshopify.com",
    final_url: "https://fixture.example/products/frames",
    canonical_url: "https://fixture.example/products/frames",
    resolved_domain: "fixture.example",
    store_name: "Fixture Optics",
    email: "hello@fixture.example",
    email_source_url: "https://fixture.example/pages/contact",
    phone: "+12125550100",
    phone_source_url: "https://fixture.example/pages/contact",
    contact_url: "https://fixture.example/pages/contact",
    social_profiles: ["https://instagram.com/fixture"],
    additional_information: "pages_examined=3",
    shopify_confidence: 100,
    relevance_score: 92,
    lead_score: 90,
    status: "qualified",
    rejection_reason: null,
    error: null,
    business_qualifier: "brand",
    pipeline_version: 2,
    scoring_version: 2,
    store_fit_state: "specialist",
    store_fit_evidence: [{
      intent: {
        originalShopType: "Eyewear Brand",
        shopType: "eyewear",
        businessQualifier: "brand",
        categoryVocabulary: ["eyewear", "acetate frames"],
      },
      accepted: true,
      state: "specialist",
      score: 92,
      matchedTerms: ["eyewear", "acetate frames"],
      sourceUrls: ["https://fixture.example/collections/eyewear"],
      signalKinds: ["category_collection_assortment"],
      breadthEvidence: [],
      evidence: [{
        sourceUrl: "https://fixture.example/collections/eyewear",
        pageType: "collection",
        matchedTerms: ["eyewear", "acetate frames"],
        claimTerms: [],
        signals: ["category_collection_assortment"],
        breadthTerms: [],
        negativeSignals: [],
        strength: 65,
        textLength: 1840,
      }],
      reason: "category_dominant_independent_assortment_signals",
    }],
    contactability_tier: "direct",
    contact_evidence: {
      emails: [{ kind: "email", value: "hello@fixture.example", sourceUrl: "https://fixture.example/pages/contact", method: "mailto", confidence: 96, validationReason: "same_store_contact_page" }],
      phones: [{ kind: "phone", value: "+12125550100", sourceUrl: "https://fixture.example/pages/contact", method: "tel", confidence: 96, validationReason: "same_store_contact_page" }],
      contactPages: [{
        kind: "contact_page",
        value: "https://fixture.example/pages/contact",
        sourceUrl: "https://fixture.example/pages/contact",
        method: "contact_page_decision_v2",
        confidence: 100,
        validationReason: "validated_contact_page",
        decision: {
          accepted: true,
          routeAccepted: true,
          routeReason: "contact_route",
          sameStore: true,
          httpUsable: true,
          pageUsable: true,
          positiveSignals: ["contact_form"],
          validationReason: "validated_contact_page",
          sourceUrl: "https://fixture.example/pages/contact",
        },
      }],
      socialProfiles: [{ kind: "social_profile", value: "https://instagram.com/fixture", sourceUrl: "https://fixture.example/", method: "associated_link_instagram", confidence: 86, validationReason: "store_owned_layout_link" }],
      organizationNames: [{ kind: "organization_name", value: "Fixture Optics", sourceUrl: "https://fixture.example/", method: "site_metadata", confidence: 86, validationReason: "site_name_metadata" }],
    },
    identity_confidence: 100,
    identity_evidence: {
      stableHostname: "fixture.myshopify.com",
      displayHostname: "fixture.example",
      observedHostnames: ["fixture.myshopify.com", "fixture.example"],
      mergedOccurrenceCount: 1,
      canonical: {
        url: "https://fixture.example/products/frames",
        hostname: "fixture.example",
        trusted: true,
        reason: "canonical_matches_observed_host",
      },
      method: "observed_myshopify_host",
      confidence: 100,
    },
    score_breakdown: {
      version: 2,
      components: { identity: 20, shopifyValidation: 25, categoryFit: 30, contactEvidence: 15 },
      total: 90,
      semantics: "deterministic_evidence_rank_not_probability",
    },
    discovery_occurrences: [{
      categoryIntent: { originalShopType: "Eyewear Brand", shopType: "eyewear", businessQualifier: "brand", categoryVocabulary: ["eyewear"] },
      originalShopType: "Eyewear Brand",
      shopType: "eyewear",
      businessQualifier: "brand",
      query: "site:myshopify.com/products acetate frames",
      queryScore: 82.29,
      queryGenerationReason: "Concrete product phrase for an independent brand.",
      querySourceUrls: ["https://research.example/eyewear"],
      categoryVocabulary: ["eyewear", "acetate frames"],
      rank: 1,
      resultUrl: "https://fixture.myshopify.com/products/frames",
      finalUrl: "https://fixture.example/products/frames",
      resolvedDomain: "fixture.example",
      myshopifyDomain: "fixture.myshopify.com",
    }],
    matched_categories: [{ originalShopType: "Eyewear Brand", shopType: "eyewear", businessQualifier: "brand", categoryVocabulary: ["eyewear"] }],
    score_semantics: "evidence_rank_v2",
    ...overrides,
  };
}

export function denseLead(overrides: Partial<Lead> = {}): Lead {
  const longSlug = "independent-hand-finished-acetate-eyewear-and-accessories-".repeat(4);
  const categories = Array.from({ length: 18 }, (_, index) => `category-token-${index + 1}-${longSlug}`);
  const contacts = Array.from({ length: 6 }, (_, index) => ({
    kind: "email",
    value: `partnerships-${index + 1}@very-long-store-domain-${index + 1}.example`,
    sourceUrl: `https://very-long-store-domain.example/pages/${longSlug}${index + 1}`,
    method: "mailto",
    confidence: 90 - index,
    validationReason: `synthetic_validation_reason_${index + 1}`,
  }));
  const base = lead();
  const storeFit = Array.from({ length: 3 }, (_, index) => ({
    ...base.store_fit_evidence![0],
    matchedTerms: categories.slice(index, index + 8),
    sourceUrls: [`https://very-long-store-domain.example/collections/${longSlug}${index}`],
    evidence: Array.from({ length: 3 }, (_, pageIndex) => ({
      ...base.store_fit_evidence![0].evidence![0],
      sourceUrl: `https://very-long-store-domain.example/collections/${longSlug}${index}-${pageIndex}`,
      matchedTerms: categories.slice(pageIndex, pageIndex + 6),
    })),
  }));
  const occurrences = Array.from({ length: 4 }, (_, index) => ({
    ...base.discovery_occurrences![0],
    query: `site:myshopify.com/products ${longSlug}${index}`,
    rank: index + 1,
    resultUrl: `https://dense-fixture.myshopify.com/products/${longSlug}${index}`,
    finalUrl: `https://very-long-store-domain.example/products/${longSlug}${index}`,
    categoryVocabulary: categories,
  }));
  return lead({
    id: "lead_dense_fixture",
    store_name: `The Extremely Long Independent Store Name ${longSlug}`,
    myshopify_domain: `very-long-${longSlug}.myshopify.com`,
    final_url: `https://very-long-store-domain.example/products/${longSlug}`,
    canonical_url: `https://very-long-store-domain.example/products/${longSlug}`,
    resolved_domain: "very-long-store-domain.example",
    additional_information: "Synthetic outcome evidence: long-content fixture with all disclosures.",
    store_fit_evidence: storeFit,
    contact_evidence: { ...base.contact_evidence, emails: contacts },
    discovery_occurrences: occurrences,
    matched_categories: [{
      originalShopType: "Independent Eyewear and Accessories Brand",
      shopType: "eyewear and accessories",
      businessQualifier: "brand",
      categoryVocabulary: categories,
    }],
    traffic_enrichment: {
      ...trafficEnrichment(),
      dataforseo: {
        ...trafficEnrichment().dataforseo!,
        state: "available",
        worldwide: trafficMetrics(0),
        markets: allTrackedMarkets(),
      },
    },
    ...overrides,
  });
}

export function querySet(): QuerySet {
  return {
    runId: "run_abcdefghijklmnop",
    revision: 3,
    editable: true,
    categories: [
      { categoryIndex: 0, originalShopType: "Independent Eyewear Brand", shopType: "eyewear", businessQualifier: "brand" },
      { categoryIndex: 1, originalShopType: "Outdoor Equipment Retailer", shopType: "outdoor equipment", businessQualifier: "retailer" },
    ],
    queries: Array.from({ length: 5 }, (_, index) => ({
      id: `query_fixture_${index}`,
      categoryIndex: index < 3 ? 0 : 1,
      sequence: index,
      query: `site:myshopify.com/products synthetic fixture product phrase ${index + 1}`,
      source: "generated" as const,
      validationState: "valid" as const,
      rejectionReason: null,
      queryScore: 80 - index,
      generationReason: "Synthetic deterministic query fixture.",
      probedAt: "2026-08-01T00:00:00.000Z",
    })),
  };
}

export const progress: RunProgress = {
  shopTypesTotal: 1, shopTypesProcessed: 1, blankShopTypesSkipped: 0,
  invalidShopTypes: 0, queryCandidatesGenerated: 1, queryCandidatesValidated: 1,
  queryCandidatesProbed: 1, queriesSelected: 1, planningWarnings: 0,
  queriesTotal: 1, queriesProcessed: 1, storesDiscovered: 1,
  storesQualified: 1, storesRejected: 0, failures: 0, queryFailures: 0,
  occurrenceFailures: 0, storeProcessingFailures: 0, outputRows: 1,
};

export function runStatus(overrides: Partial<RunStatus> = {}): RunStatus {
  return {
    runId: "run_abcdefghijklmnop",
    state: "completed",
    phase: "finished",
    stage: "completed",
    createdAt: "2026-08-01T00:00:00.000Z",
    startedAt: "2026-08-01T00:00:01.000Z",
    completedAt: "2026-08-01T00:00:02.000Z",
    progress,
    resultsAvailable: true,
    pipelineVersion: 2,
    scoringVersion: 2,
    queryReview: null,
    error: null,
    ...overrides,
  };
}

export function resultPage(items: Lead[] = [lead()]): ResultPage {
  return {
    runId: "run_abcdefghijklmnop",
    summary: {
      total: items.length,
      qualified: items.filter(({ status }) => status === "qualified").length,
      rejected: items.filter(({ status }) => status === "rejected").length,
      failed: items.filter(({ status }) => status === "failed").length,
    },
    pagination: { page: 1, pageSize: 25, totalItems: items.length, totalPages: items.length ? 1 : 0 },
    items,
  };
}
