import { ExternalLinkIcon } from "./icons";
import type {
  CategoryIntent,
  DiscoveryOccurrence,
  EvidenceItem,
  Lead,
  StoreFitEvidence,
  StoreFitPageEvidence,
} from "../lib/api-types";
import {
  contactChannels,
  contactabilityLabel,
  humanizeToken,
  safeExternalUrl,
  scoreComponents,
  scorePresentation,
} from "../lib/lead-presentation";

function ExternalDetailLink({
  href,
  children,
}: {
  href: string | null | undefined;
  children: React.ReactNode;
}) {
  const safeHref = safeExternalUrl(href);
  if (!safeHref) return null;
  return (
    <a href={safeHref} target="_blank" rel="noreferrer">
      {children}
      <ExternalLinkIcon />
    </a>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value == null || value === "") return null;
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function TokenList({ label, values }: { label: string; values: string[] | undefined }) {
  if (!values?.length) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd className="tag-list">{values.map((value) => <span key={value}>{humanizeToken(value)}</span>)}</dd>
    </div>
  );
}

function EvidenceSource({ href }: { href: string | undefined }) {
  if (!href) return <span>Source not recorded</span>;
  return safeExternalUrl(href)
    ? <ExternalDetailLink href={href}>Evidence source</ExternalDetailLink>
    : <span>Unsafe source URL omitted</span>;
}

function ContactEvidenceItem({ item }: { item: EvidenceItem }) {
  const decision = item.decision;
  return (
    <li>
      <strong>{humanizeToken(item.kind)}: {item.value}</strong>
      <span>
        {humanizeToken(item.method)} · confidence {item.confidence}/100 · {humanizeToken(item.validationReason)}
      </span>
      <EvidenceSource href={item.sourceUrl} />
      {decision && (
        <dl className="fact-grid">
          <Fact label="Decision" value={decision.accepted ? "Accepted" : "Rejected"} />
          <Fact label="Route accepted" value={decision.routeAccepted ? "Yes" : "No"} />
          <Fact label="Route reason" value={humanizeToken(decision.routeReason)} />
          <Fact label="Same store" value={decision.sameStore ? "Yes" : "No"} />
          <Fact label="HTTP usable" value={decision.httpUsable ? "Yes" : "No"} />
          <Fact label="Page usable" value={decision.pageUsable ? "Yes" : "No"} />
          <TokenList label="Positive signals" values={decision.positiveSignals} />
          <Fact label="Validation reason" value={humanizeToken(decision.validationReason)} />
        </dl>
      )}
    </li>
  );
}

function ContactDetails({ lead }: { lead: Lead }) {
  const channels = contactChannels(lead);
  const evidence = [
    ...(lead.contact_evidence?.emails ?? []),
    ...(lead.contact_evidence?.phones ?? []),
    ...(lead.contact_evidence?.contactPages ?? []),
    ...(lead.contact_evidence?.socialProfiles ?? []),
    ...(lead.contact_evidence?.organizationNames ?? []),
  ];
  return (
    <DetailSection title="Validated outreach evidence">
      <p className="detail-callout">
        <strong>{contactabilityLabel(lead.contactability_tier)}</strong>
        <span>{humanizeToken(lead.contactability_tier ?? "unrecorded")}</span>
      </p>
      {channels.length > 0 && (
        <dl className="evidence-list">
          {channels.map((channel) => {
            const source = channel.kind === "email"
              ? lead.email_source_url
              : channel.kind === "phone"
                ? lead.phone_source_url
                : channel.value;
            return (
              <div key={`${channel.kind}-${channel.value}`}>
                <dt>{channel.label}</dt>
                <dd>{channel.href ? <a href={channel.href}>{channel.value}</a> : channel.value}</dd>
                <dt>Source</dt>
                <dd><EvidenceSource href={source ?? undefined} /></dd>
              </div>
            );
          })}
        </dl>
      )}
      {!channels.length && <p className="empty-evidence">No validated outreach or social channel was recorded.</p>}
      {evidence.length > 0 && (
        <details className="nested-evidence" open>
          <summary>Contact evidence details ({evidence.length})</summary>
          <ul>{evidence.map((item, index) => (
            <ContactEvidenceItem key={`${item.kind}-${item.value}-${index}`} item={item} />
          ))}</ul>
        </details>
      )}
    </DetailSection>
  );
}

function StoreFitPage({ page }: { page: StoreFitPageEvidence }) {
  return (
    <li>
      <strong>{humanizeToken(page.pageType)} page · strength {page.strength}/100</strong>
      <span>Usable text length: {page.textLength.toLocaleString()}</span>
      <EvidenceSource href={page.sourceUrl} />
      <dl className="fact-grid">
        <TokenList label="Matched terms" values={page.matchedTerms} />
        <TokenList label="Claim terms" values={page.claimTerms} />
        <TokenList label="Signals" values={page.signals} />
        <TokenList label="Breadth terms" values={page.breadthTerms} />
        <TokenList label="Negative signals" values={page.negativeSignals} />
      </dl>
    </li>
  );
}

function StoreFitItem({ item, index }: { item: StoreFitEvidence; index: number }) {
  return (
    <li>
      <strong>
        {item.intent?.originalShopType || item.intent?.shopType || `Category evidence ${index + 1}`}
        {` · ${humanizeToken(item.state ?? "unknown")}`}
      </strong>
      <span>
        {item.accepted == null ? "Acceptance not recorded" : item.accepted ? "Accepted category match" : "Discovery attempt, not a match"}
        {item.score == null ? "" : ` · ${item.score}/100`}
      </span>
      <dl className="fact-grid">
        <Fact label="Exact category input" value={item.intent?.originalShopType} />
        <Fact label="Normalized category" value={item.intent?.shopType} />
        <Fact label="Business qualifier" value={item.intent?.businessQualifier && humanizeToken(item.intent.businessQualifier)} />
        <Fact label="Reason" value={item.reason && humanizeToken(item.reason)} />
        <TokenList label="Category vocabulary" values={item.intent?.categoryVocabulary} />
        <TokenList label="Matched terms" values={item.matchedTerms} />
        <TokenList label="Signal kinds" values={item.signalKinds} />
      </dl>
      {(item.sourceUrls ?? []).map((url) => <EvidenceSource key={url} href={url} />)}
      {(item.breadthEvidence?.length ?? 0) > 0 && (
        <details className="nested-evidence">
          <summary>Breadth evidence ({item.breadthEvidence?.length})</summary>
          <ul>{item.breadthEvidence?.map((breadth, breadthIndex) => (
            <li key={`${breadth.sourceUrl}-${breadth.signal}-${breadthIndex}`}>
              <strong>{humanizeToken(breadth.signal)}</strong>
              <span>{breadth.terms.join(", ")}</span>
              <EvidenceSource href={breadth.sourceUrl} />
            </li>
          ))}</ul>
        </details>
      )}
      {(item.evidence?.length ?? 0) > 0 && (
        <details className="nested-evidence" open>
          <summary>Page-level store-fit evidence ({item.evidence?.length})</summary>
          <ul>{item.evidence?.map((page, pageIndex) => (
            <StoreFitPage key={`${page.sourceUrl}-${pageIndex}`} page={page} />
          ))}</ul>
        </details>
      )}
    </li>
  );
}

function CategoryList({ categories }: { categories: CategoryIntent[] }) {
  if (!categories.length) return <p className="empty-evidence">No accepted matched category intent was recorded.</p>;
  return (
    <details className="nested-evidence">
      <summary>Accepted matched category intents ({categories.length})</summary>
      <ul>{categories.map((category, index) => (
        <li key={`${category.shopType}-${category.businessQualifier}-${index}`}>
          <strong>{category.originalShopType ?? category.shopType}</strong>
          <span>{category.shopType} · {humanizeToken(category.businessQualifier)}</span>
          {(category.categoryVocabulary?.length ?? 0) > 0 && <span>{category.categoryVocabulary?.join(", ")}</span>}
        </li>
      ))}</ul>
    </details>
  );
}

function StoreEvidence({ lead }: { lead: Lead }) {
  return (
    <DetailSection title="Category and store fit">
      <dl className="fact-grid">
        <Fact label="Exact category input" value={lead.original_shop_type} />
        <Fact label="Normalized category" value={lead.shop_type} />
        <Fact label="Business qualifier" value={lead.business_qualifier && humanizeToken(lead.business_qualifier)} />
        <Fact label="Store fit" value={lead.store_fit_state && humanizeToken(lead.store_fit_state)} />
        <Fact label="Shopify confidence" value={lead.shopify_confidence == null ? null : `${lead.shopify_confidence}/100`} />
        <Fact label="Category evidence score" value={lead.relevance_score == null ? null : `${lead.relevance_score}/100`} />
      </dl>
      {(lead.store_fit_evidence?.length ?? 0) > 0 ? (
        <ul className="provenance-list">{lead.store_fit_evidence?.map((item, index) => (
          <StoreFitItem key={`${item.intent?.shopType ?? "fit"}-${index}`} item={item} index={index} />
        ))}</ul>
      ) : <p className="empty-evidence">No structured store-fit evidence was recorded.</p>}
      <CategoryList categories={lead.matched_categories ?? []} />
    </DetailSection>
  );
}

function ScoreDetails({ lead }: { lead: Lead }) {
  const score = scorePresentation(lead);
  const components = scoreComponents(lead.score_breakdown);
  return (
    <DetailSection title="Score semantics">
      <p className={`detail-score score-${score.tone}`}><strong>{score.value}</strong><span>{score.label}</span></p>
      <p className="detail-copy">{score.explanation}</p>
      {components.length > 0 && (
        <dl className="fact-grid score-components">
          {components.map((component) => <Fact key={component.label} label={component.label} value={`+${component.value}`} />)}
          <Fact label="Total" value={lead.score_breakdown?.total} />
          <Fact label="Breakdown version" value={lead.score_breakdown?.version} />
          <Fact label="Breakdown semantics" value={lead.score_breakdown?.semantics} />
        </dl>
      )}
      <small className="version-note">Pipeline {lead.pipeline_version ?? "legacy/unversioned"} · Scoring {lead.scoring_version ?? "legacy/unversioned"} · {humanizeToken(lead.score_semantics)}</small>
    </DetailSection>
  );
}

function IdentityDetails({ lead }: { lead: Lead }) {
  const identity = lead.identity_evidence;
  const canonical = identity?.canonical;
  return (
    <DetailSection title="Store identity">
      <dl className="fact-grid">
        <Fact label="Display hostname" value={identity?.displayHostname} />
        <Fact label="Stable hostname" value={identity?.stableHostname} />
        <Fact label="Resolved domain" value={lead.resolved_domain} />
        <Fact label="MyShopify domain" value={lead.myshopify_domain} />
        <Fact label="Identity confidence" value={lead.identity_confidence == null ? null : `${lead.identity_confidence}/100`} />
        <Fact label="Evidence confidence" value={identity?.confidence == null ? null : `${identity.confidence}/100`} />
        <Fact label="Resolution method" value={identity?.method && humanizeToken(identity.method)} />
        <Fact label="Merged occurrences" value={identity?.mergedOccurrenceCount} />
        <TokenList label="Observed hostnames" values={identity?.observedHostnames} />
      </dl>
      {canonical && (
        <dl className="fact-grid">
          <Fact label="Canonical hostname" value={canonical.hostname} />
          <Fact label="Canonical trust" value={canonical.trusted ? "Verified equivalent" : "Unverified evidence"} />
          <Fact label="Canonical reason" value={canonical.reason && humanizeToken(canonical.reason)} />
        </dl>
      )}
      <div className="detail-links">
        <ExternalDetailLink href={lead.final_url}>Observed final storefront URL</ExternalDetailLink>
        <ExternalDetailLink href={lead.canonical_url}>Lead canonical URL</ExternalDetailLink>
        <ExternalDetailLink href={canonical?.url}>Canonical evidence URL</ExternalDetailLink>
      </div>
    </DetailSection>
  );
}

function OccurrenceList({ occurrences }: { occurrences: DiscoveryOccurrence[] }) {
  if (!occurrences.length) return null;
  return (
    <ol className="provenance-list occurrence-list">
      {occurrences.map((item, index) => (
        <li key={`${item.query ?? "query"}-${item.rank ?? "rank"}-${index}`}>
          <strong>{item.query || "Query not recorded"}</strong>
          <dl className="fact-grid">
            <Fact label="Exact category input" value={item.originalShopType ?? item.categoryIntent?.originalShopType} />
            <Fact label="Normalized category" value={item.shopType ?? item.categoryIntent?.shopType} />
            <Fact label="Business qualifier" value={(item.businessQualifier ?? item.categoryIntent?.businessQualifier) && humanizeToken(item.businessQualifier ?? item.categoryIntent?.businessQualifier ?? "")} />
            <Fact label="Query-generation reason" value={item.queryGenerationReason} />
            <Fact label="Rank" value={item.rank} />
            <Fact label="Query score" value={item.queryScore} />
            <Fact label="Resolved domain" value={item.resolvedDomain} />
            <Fact label="MyShopify domain" value={item.myshopifyDomain} />
            <TokenList label="Category vocabulary" values={item.categoryVocabulary ?? item.categoryIntent?.categoryVocabulary} />
          </dl>
          <div className="detail-links">
            {(item.querySourceUrls ?? []).map((url) => <ExternalDetailLink key={url} href={url}>Query source</ExternalDetailLink>)}
            <ExternalDetailLink href={item.resultUrl}>Requested search-result URL</ExternalDetailLink>
            <ExternalDetailLink href={item.finalUrl}>Observed final URL</ExternalDetailLink>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DiscoveryDetails({ lead }: { lead: Lead }) {
  const occurrences = lead.discovery_occurrences ?? [];
  return (
    <DetailSection title="Discovery provenance">
      <dl className="fact-grid">
        <Fact label="Generated query" value={lead.generated_query} />
        <Fact label="Search query" value={lead.search_query} />
        <Fact label="Query-generation reason" value={lead.query_generation_reason} />
        <Fact label="Query score" value={lead.query_score} />
        <Fact label="Representative rank" value={lead.google_rank} />
      </dl>
      {!occurrences.length && <p className="empty-evidence">Legacy row or no structured discovery provenance recorded.</p>}
      <OccurrenceList occurrences={occurrences} />
      <div className="detail-links">
        <ExternalDetailLink href={lead.google_result_url}>Representative requested result URL</ExternalDetailLink>
        <ExternalDetailLink href={lead.final_url}>Representative observed final URL</ExternalDetailLink>
      </div>
    </DetailSection>
  );
}

function OutcomeDetails({ lead }: { lead: Lead }) {
  return (
    <DetailSection title="Outcome evidence">
      <dl className="fact-grid">
        <Fact label="Status" value={humanizeToken(lead.status)} />
        <Fact label="Rejection reason" value={lead.rejection_reason && humanizeToken(lead.rejection_reason)} />
        <Fact label="Processing error" value={lead.error} />
      </dl>
      {lead.additional_information && <p className="detail-copy preserve-text">{lead.additional_information}</p>}
      {!lead.rejection_reason && !lead.error && !lead.additional_information && <p className="empty-evidence">No additional outcome note was recorded.</p>}
    </DetailSection>
  );
}

export function LeadDetails({ lead }: { lead: Lead }) {
  return (
    <div className="lead-details">
      <ContactDetails lead={lead} />
      <StoreEvidence lead={lead} />
      <ScoreDetails lead={lead} />
      <IdentityDetails lead={lead} />
      <DiscoveryDetails lead={lead} />
      <OutcomeDetails lead={lead} />
    </div>
  );
}
