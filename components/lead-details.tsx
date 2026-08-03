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
import { TrafficEnrichmentDetails } from "./traffic-enrichment";

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

function DetailSection({
  title,
  order,
  emphasis = false,
  className,
  children,
}: {
  title: string;
  order: string;
  emphasis?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`detail-section${emphasis ? " detail-section-emphasis" : ""}${className ? ` ${className}` : ""}`}>
      <h3><span>{order}</span>{title}</h3>
      {children}
    </section>
  );
}

function OverviewPanel({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`lead-overview-panel ${className}`}>
      <h4>{title}</h4>
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
      <dd className="tag-list">{values.map((value, index) => <span key={`${value}-${index}`}>{humanizeToken(value)}</span>)}</dd>
    </div>
  );
}

function TokenDisclosure({ label, values }: { label: string; values: string[] | undefined }) {
  if (!values?.length) return null;
  return (
    <div className="token-fact">
      <dt>{label}</dt>
      <dd>
        <details className="token-disclosure">
          <summary><span>{values.length} recorded</span><strong>View vocabulary</strong></summary>
          <span className="token-values">
            {values.map((value, index) => <span key={`${value}-${index}`}>{humanizeToken(value)}</span>)}
          </span>
        </details>
      </dd>
    </div>
  );
}

function EvidenceSource({ href, label = "Evidence source" }: { href: string | undefined; label?: string }) {
  if (!href) return <span>Source not recorded</span>;
  return safeExternalUrl(href)
    ? <ExternalDetailLink href={href}>{label}</ExternalDetailLink>
    : <span>Unsafe source URL omitted</span>;
}

function EvidenceSources({ urls }: { urls: string[] | undefined }) {
  const uniqueUrls = [...new Set(urls ?? [])];
  if (!uniqueUrls.length) return null;
  if (uniqueUrls.length === 1) {
    return (
      <div className="detail-links evidence-source-links">
        <ExternalDetailLink href={uniqueUrls[0]}>Evidence source</ExternalDetailLink>
      </div>
    );
  }
  return (
    <details className="source-disclosure">
      <summary>{uniqueUrls.length} evidence sources</summary>
      <div className="detail-links evidence-source-links">
        {uniqueUrls.map((url, index) => (
          <ExternalDetailLink key={url} href={url}>Source {index + 1}</ExternalDetailLink>
        ))}
      </div>
    </details>
  );
}

function ContactEvidenceItem({ item }: { item: EvidenceItem }) {
  const decision = item.decision;
  return (
    <li className="contact-evidence-item">
      <header className="contact-evidence-item-header">
        <span>{humanizeToken(item.kind)}</span>
        <strong>{item.value}</strong>
      </header>
      <p className="contact-evidence-meta">
        {humanizeToken(item.method)} · confidence {item.confidence}/100 · {humanizeToken(item.validationReason)}
      </p>
      {decision && (
        <dl className="fact-grid contact-decision-grid">
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
      <footer className="contact-evidence-source"><EvidenceSource href={item.sourceUrl} /></footer>
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
    <OverviewPanel title="Outreach evidence" className="overview-outreach">
      <p className="detail-callout">
        <strong>{contactabilityLabel(lead.contactability_tier)}</strong>
        <span>{humanizeToken(lead.contactability_tier ?? "unrecorded")}</span>
      </p>
      {channels.length > 0 && (
        <ul className="outreach-channel-list">
          {channels.map((channel) => {
            const source = channel.kind === "email"
              ? lead.email_source_url
              : channel.kind === "phone"
                ? lead.phone_source_url
                : channel.value;
            return (
              <li key={`${channel.kind}-${channel.value}`}>
                <span>{channel.label}</span>
                <strong>{channel.href ? <a href={channel.href}>{channel.value}</a> : channel.value}</strong>
                <EvidenceSource href={source ?? undefined} label="Source" />
              </li>
            );
          })}
        </ul>
      )}
      {!channels.length && <p className="empty-evidence">No validated outreach or social channel was recorded.</p>}
      {evidence.length > 0 && (
        <details className="nested-evidence contact-evidence-disclosure">
          <summary>
            <span>Contact evidence details</span>
            <strong>{evidence.length} records</strong>
          </summary>
          <ul className="contact-evidence-list">{evidence.map((item, index) => (
            <ContactEvidenceItem key={`${item.kind}-${item.value}-${index}`} item={item} />
          ))}</ul>
        </details>
      )}
    </OverviewPanel>
  );
}

function StoreFitPage({ page }: { page: StoreFitPageEvidence }) {
  return (
    <li className="store-fit-page">
      <header className="evidence-row-header">
        <strong>{humanizeToken(page.pageType)} page</strong>
        <span>Strength {page.strength}/100</span>
      </header>
      <dl className="fact-grid">
        <Fact label="Usable text length" value={page.textLength.toLocaleString()} />
        <TokenList label="Matched terms" values={page.matchedTerms} />
        <TokenList label="Claim terms" values={page.claimTerms} />
        <TokenList label="Signals" values={page.signals} />
        <TokenList label="Breadth terms" values={page.breadthTerms} />
        <TokenList label="Negative signals" values={page.negativeSignals} />
      </dl>
      <footer className="evidence-row-source"><EvidenceSource href={page.sourceUrl} /></footer>
    </li>
  );
}

function StoreFitItem({ item, index }: { item: StoreFitEvidence; index: number }) {
  return (
    <li className="store-fit-record">
      <header className="evidence-row-header">
        <span className="evidence-row-title">
          <strong>{item.intent?.originalShopType || item.intent?.shopType || `Category evidence ${index + 1}`}</strong>
          <span>{humanizeToken(item.state ?? "unknown")}</span>
        </span>
        <span className="evidence-row-status">
          {item.accepted == null ? "Acceptance not recorded" : item.accepted ? "Accepted category match" : "Discovery attempt, not a match"}
          {item.score == null ? "" : ` · ${item.score}/100`}
        </span>
      </header>
      <dl className="fact-grid">
        <Fact label="Exact category input" value={item.intent?.originalShopType} />
        <Fact label="Normalized category" value={item.intent?.shopType} />
        <Fact label="Business qualifier" value={item.intent?.businessQualifier && humanizeToken(item.intent.businessQualifier)} />
        <Fact label="Reason" value={item.reason && humanizeToken(item.reason)} />
        <TokenDisclosure label="Category vocabulary" values={item.intent?.categoryVocabulary} />
        <TokenList label="Matched terms" values={item.matchedTerms} />
        <TokenList label="Signal kinds" values={item.signalKinds} />
      </dl>
      <footer className="evidence-row-source"><EvidenceSources urls={item.sourceUrls} /></footer>
      {(item.breadthEvidence?.length ?? 0) > 0 && (
        <details className="nested-evidence">
          <summary>Breadth evidence ({item.breadthEvidence?.length})</summary>
          <ul className="subordinate-ledger breadth-ledger">{item.breadthEvidence?.map((breadth, breadthIndex) => (
            <li key={`${breadth.sourceUrl}-${breadth.signal}-${breadthIndex}`}>
              <header className="evidence-row-header"><strong>{humanizeToken(breadth.signal)}</strong></header>
              <dl className="fact-grid"><TokenList label="Terms" values={breadth.terms} /></dl>
              <footer className="evidence-row-source"><EvidenceSource href={breadth.sourceUrl} /></footer>
            </li>
          ))}</ul>
        </details>
      )}
      {(item.evidence?.length ?? 0) > 0 && (
        <details className="nested-evidence">
          <summary>Page-level store-fit evidence ({item.evidence?.length})</summary>
          <ul className="subordinate-ledger store-fit-page-ledger">{item.evidence?.map((page, pageIndex) => (
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
    <details className="nested-evidence category-intent-ledger">
      <summary>Accepted matched category intents ({categories.length})</summary>
      <ul>{categories.map((category, index) => (
        <li key={`${category.shopType}-${category.businessQualifier}-${index}`}>
          <header className="evidence-row-header"><strong>{category.originalShopType ?? category.shopType}</strong></header>
          <dl className="fact-grid">
            <Fact label="Normalized category" value={category.shopType} />
            <Fact label="Business qualifier" value={humanizeToken(category.businessQualifier)} />
            <TokenDisclosure label="Category vocabulary" values={category.categoryVocabulary} />
          </dl>
        </li>
      ))}</ul>
    </details>
  );
}

function StoreEvidence({ lead }: { lead: Lead }) {
  return (
    <DetailSection title="Category and store fit" order="03" className="store-evidence-section">
      <dl className="fact-grid">
        <Fact label="Exact category input" value={lead.original_shop_type} />
        <Fact label="Normalized category" value={lead.shop_type} />
        <Fact label="Business qualifier" value={lead.business_qualifier && humanizeToken(lead.business_qualifier)} />
        <Fact label="Store fit" value={lead.store_fit_state && humanizeToken(lead.store_fit_state)} />
        <Fact label="Shopify confidence" value={lead.shopify_confidence == null ? null : `${lead.shopify_confidence}/100`} />
        <Fact label="Category evidence score" value={lead.relevance_score == null ? null : `${lead.relevance_score}/100`} />
      </dl>
      {(lead.store_fit_evidence?.length ?? 0) > 0 ? (
        <details className="nested-evidence evidence-ledger store-fit-ledger">
          <summary>Structured store-fit evidence ({lead.store_fit_evidence?.length})</summary>
          <ul className="provenance-list evidence-ledger-list">{lead.store_fit_evidence?.map((item, index) => (
            <StoreFitItem key={`${item.intent?.shopType ?? "fit"}-${index}`} item={item} index={index} />
          ))}</ul>
        </details>
      ) : <p className="empty-evidence">No structured store-fit evidence was recorded.</p>}
      <CategoryList categories={lead.matched_categories ?? []} />
    </DetailSection>
  );
}

function ScoreDetails({ lead }: { lead: Lead }) {
  const score = scorePresentation(lead);
  const components = scoreComponents(lead.score_breakdown);
  return (
    <OverviewPanel title="Score semantics" className="overview-score">
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
    </OverviewPanel>
  );
}

function IdentityDetails({ lead }: { lead: Lead }) {
  const identity = lead.identity_evidence;
  const canonical = identity?.canonical;
  const resolvedStorefront = lead.resolved_domain ? `https://${lead.resolved_domain}` : null;
  return (
    <OverviewPanel title="Store identity" className="overview-identity">
      <dl className="fact-grid">
        <Fact label="MyShopify domain" value={lead.myshopify_domain} />
        <Fact label="Resolved domain" value={lead.resolved_domain} />
        <Fact label="Identity confidence" value={lead.identity_confidence == null ? null : `${lead.identity_confidence}/100`} />
        <Fact label="Evidence confidence" value={identity?.confidence == null ? null : `${identity.confidence}/100`} />
        <Fact label="Resolution method" value={identity?.method && humanizeToken(identity.method)} />
        <Fact label="Merged occurrences" value={identity?.mergedOccurrenceCount} />
        <Fact label="Canonical verification" value={canonical && (canonical.trusted ? "Verified equivalent" : "Unverified evidence")} />
        {canonical && (
          <Fact label="Canonical reason" value={canonical.reason && humanizeToken(canonical.reason)} />
        )}
      </dl>
      <div className="detail-links">
        <ExternalDetailLink href={resolvedStorefront}>Resolved storefront</ExternalDetailLink>
      </div>
    </OverviewPanel>
  );
}

function LeadOverview({ lead }: { lead: Lead }) {
  return (
    <DetailSection title="Lead overview" order="01" emphasis className="lead-overview">
      <OutcomeBadge lead={lead} />
      <div className="lead-overview-grid">
        <div className="lead-overview-primary">
          <IdentityDetails lead={lead} />
          <ScoreDetails lead={lead} />
        </div>
        <ContactDetails lead={lead} />
      </div>
    </DetailSection>
  );
}

function OutcomeBadge({ lead }: { lead: Lead }) {
  const hasNote = Boolean(lead.rejection_reason || lead.error || lead.additional_information);
  return (
    <details className="outcome-badge">
      <summary>
        <span>Outcome</span>
        <strong>{humanizeToken(lead.status)}</strong>
      </summary>
      <div className="outcome-badge-popover">
        <dl className="fact-grid">
          <Fact label="Status" value={humanizeToken(lead.status)} />
          <Fact label="Rejection reason" value={lead.rejection_reason && humanizeToken(lead.rejection_reason)} />
          <Fact label="Processing error" value={lead.error} />
        </dl>
        {lead.additional_information && <p className="detail-copy preserve-text">{lead.additional_information}</p>}
        {!hasNote && <p className="empty-evidence">No additional outcome note was recorded.</p>}
      </div>
    </details>
  );
}

function OccurrenceList({ occurrences }: { occurrences: DiscoveryOccurrence[] }) {
  if (!occurrences.length) return null;
  return (
    <details className="nested-evidence evidence-ledger occurrence-ledger">
      <summary>Discovery occurrences ({occurrences.length})</summary>
      <ol className="provenance-list occurrence-list evidence-ledger-list">
        {occurrences.map((item, index) => (
          <li className="occurrence-record" key={`${item.query ?? "query"}-${item.rank ?? "rank"}-${index}`}>
            <header className="evidence-row-header">
              <span className="evidence-row-title"><strong>{item.query || "Query not recorded"}</strong><span>{item.queryGenerationReason || "Query-generation reason not recorded"}</span></span>
              <span className="evidence-row-status">{item.rank == null ? "Rank not recorded" : `Rank ${item.rank}`}</span>
            </header>
            <dl className="fact-grid">
              <Fact label="Exact category input" value={item.originalShopType ?? item.categoryIntent?.originalShopType} />
              <Fact label="Normalized category" value={item.shopType ?? item.categoryIntent?.shopType} />
              <Fact label="Business qualifier" value={(item.businessQualifier ?? item.categoryIntent?.businessQualifier) && humanizeToken(item.businessQualifier ?? item.categoryIntent?.businessQualifier ?? "")} />
              <Fact label="Query-generation reason" value={item.queryGenerationReason} />
              <Fact label="Rank" value={item.rank} />
              <Fact label="Query score" value={item.queryScore} />
              <Fact label="MyShopify domain" value={item.myshopifyDomain} />
              <TokenDisclosure label="Category vocabulary" values={item.categoryVocabulary ?? item.categoryIntent?.categoryVocabulary} />
            </dl>
            <footer className="detail-links evidence-row-source">
              {(item.querySourceUrls ?? []).map((url) => <ExternalDetailLink key={url} href={url}>Query source</ExternalDetailLink>)}
              <ExternalDetailLink href={item.resultUrl}>Requested search-result URL</ExternalDetailLink>
              <ExternalDetailLink href={item.finalUrl}>Resolved result URL</ExternalDetailLink>
            </footer>
          </li>
        ))}
      </ol>
    </details>
  );
}

function DiscoveryDetails({ lead }: { lead: Lead }) {
  const occurrences = lead.discovery_occurrences ?? [];
  const primaryQuery = lead.search_query ?? lead.generated_query;
  const hasDistinctGeneratedQuery =
    lead.generated_query && lead.generated_query !== primaryQuery;
  return (
    <DetailSection title="Discovery provenance" order="04" className="discovery-details-section">
      <dl className="fact-grid">
        <Fact label="Search query" value={primaryQuery} />
        <Fact label="Generated query" value={hasDistinctGeneratedQuery ? lead.generated_query : null} />
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

export function LeadDetails({ lead }: { lead: Lead }) {
  return (
    <div className="lead-details">
      <LeadOverview lead={lead} />
      <TrafficEnrichmentDetails enrichment={lead.traffic_enrichment} />
      <StoreEvidence lead={lead} />
      <DiscoveryDetails lead={lead} />
    </div>
  );
}
