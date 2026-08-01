"use client";

import { useState } from "react";

import {
  ChevronIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import type {
  CategoryIntent,
  DiscoveryOccurrence,
  EvidenceItem,
  Lead,
  StoreFitEvidence,
} from "@/lib/api-types";
import {
  contactChannels,
  contactabilityLabel,
  humanizeToken,
  safeExternalUrl,
  scoreComponents,
  scorePresentation,
} from "@/lib/lead-presentation";

type ResultsTableProps = {
  leads: Lead[];
  loading: boolean;
};

function displayDomain(lead: Lead): string {
  return lead.resolved_domain ?? lead.myshopify_domain ?? "Domain unavailable";
}

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

export function ResultsTable({ leads, loading }: ResultsTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading && !leads.length) {
    return (
      <div className="table-skeleton" aria-label="Loading leads">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="empty-results">
        <SearchIconPlaceholder />
        <h3>No leads match these filters</h3>
        <p>Try a broader search or choose a different lead status.</p>
      </div>
    );
  }

  return (
    <div className={`table-wrap ${loading ? "is-refreshing" : ""}`}>
      <table className="results-table">
        <thead>
          <tr>
            <th>Store</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Rank</th>
            <th>Evidence rank</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isExpanded = expanded === lead.id;
            const storeUrl = safeExternalUrl(lead.final_url ?? lead.canonical_url);
            return (
              <ResultsRow
                key={lead.id}
                lead={lead}
                isExpanded={isExpanded}
                storeUrl={storeUrl}
                onToggle={() => setExpanded(isExpanded ? null : lead.id)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ResultsRow({
  lead,
  isExpanded,
  storeUrl,
  onToggle,
}: {
  lead: Lead;
  isExpanded: boolean;
  storeUrl: string | null;
  onToggle: () => void;
}) {
  const channels = contactChannels(lead);
  const score = scorePresentation(lead);
  const detailId = `lead-detail-${lead.id}`;
  const compactChannels = [
    lead.email ? "Email" : null,
    lead.phone ? "Phone" : null,
    safeExternalUrl(lead.contact_url) ? "Contact page" : null,
    channels.some(({ kind }) => kind === "social_profile") ? "Social" : null,
  ].filter((value): value is string => Boolean(value));

  return (
    <>
      <tr className={isExpanded ? "is-expanded" : ""}>
        <td>
          <div className="store-cell">
            <span className="store-avatar">
              {(lead.store_name ?? lead.resolved_domain ?? "?")
                .charAt(0)
                .toUpperCase()}
            </span>
            <span>
              {storeUrl ? (
                <a href={storeUrl} target="_blank" rel="noreferrer">
                  {lead.store_name ?? "Unnamed store"}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <strong>{lead.store_name ?? "Unnamed store"}</strong>
              )}
              <small>{displayDomain(lead)}</small>
            </span>
          </div>
        </td>
        <td>
          <span className="category-pill">{lead.shop_type ?? "Uncategorized"}</span>
          {lead.business_qualifier && (
            <small className="cell-note">{humanizeToken(lead.business_qualifier)}</small>
          )}
        </td>
        <td>
          <div className="contact-summary">
            <span className={`contact-tier tier-${lead.contactability_tier ?? "unknown"}`}>
              {contactabilityLabel(lead.contactability_tier)}
            </span>
            {compactChannels.length ? (
              <span className="channel-list" aria-label={`Available channels: ${compactChannels.join(", ")}`}>
                {compactChannels.map((channel) => <i key={channel}>{channel}</i>)}
              </span>
            ) : (
              <small>No validated channel</small>
            )}
          </div>
        </td>
        <td>
          <span className="rank-cell">
            {lead.google_rank == null ? "—" : `#${lead.google_rank}`}
          </span>
        </td>
        <td>
          <div className="score-cell">
            <span className={`score score-${score.tone}`}>{score.value}</span>
            <small>{score.label}</small>
          </div>
        </td>
        <td>
          <span className={`status-pill status-${lead.status}`}>
            <span />
            {lead.status}
          </span>
        </td>
        <td>
          <button
            className={`row-toggle ${isExpanded ? "is-expanded" : ""}`}
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={detailId}
            aria-label={`${isExpanded ? "Hide" : "Show"} details for ${
              lead.store_name ?? "this lead"
            }`}
          >
            <ChevronIcon />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="detail-row" id={detailId}>
          <td colSpan={7}>
            <div className="lead-details">
              <ContactDetails lead={lead} />
              <StoreEvidence lead={lead} />
              <ScoreDetails lead={lead} />
              <IdentityDetails lead={lead} />
              <DiscoveryDetails lead={lead} />
              <OutcomeDetails lead={lead} />
            </div>
          </td>
        </tr>
      )}
    </>
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

function ContactDetails({ lead }: { lead: Lead }) {
  const channels = contactChannels(lead);
  const direct = channels.filter(({ kind }) => ["email", "phone"].includes(kind));
  const contactPage = channels.find(({ kind }) => kind === "contact_page");
  const socials = channels.filter(({ kind }) => kind === "social_profile");
  return (
    <DetailSection title="Validated outreach evidence">
      <p className="detail-callout">
        <strong>{contactabilityLabel(lead.contactability_tier)}</strong>
        <span>{humanizeToken(lead.contactability_tier ?? "unrecorded")}</span>
      </p>
      {direct.length > 0 && (
        <dl className="evidence-list">
          {direct.map((channel) => (
            <div key={channel.kind}>
              <dt>{channel.label}</dt>
              <dd><a href={channel.href ?? undefined}>{channel.value}</a></dd>
              <dt>Source</dt>
              <dd>
                <ExternalDetailLink href={channel.kind === "email" ? lead.email_source_url : lead.phone_source_url}>
                  View {channel.label.toLowerCase()} source
                </ExternalDetailLink>
                {!safeExternalUrl(channel.kind === "email" ? lead.email_source_url : lead.phone_source_url) && "Not recorded"}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {contactPage && (
        <div className="detail-links">
          <ExternalDetailLink href={contactPage.href}>Open validated contact page</ExternalDetailLink>
        </div>
      )}
      {socials.length > 0 && (
        <div className="social-list" aria-label="Validated social profiles">
          {socials.map((profile) => (
            <ExternalDetailLink key={profile.value} href={profile.href}>{profile.label}</ExternalDetailLink>
          ))}
        </div>
      )}
      {!channels.length && <p className="empty-evidence">No validated outreach or social channel was recorded.</p>}
      <EvidenceItems title="Contact evidence details" items={[
        ...(lead.contact_evidence?.emails ?? []),
        ...(lead.contact_evidence?.phones ?? []),
        ...(lead.contact_evidence?.contactPages ?? []),
        ...(lead.contact_evidence?.socialProfiles ?? []),
        ...(lead.contact_evidence?.organizationNames ?? []),
      ]} />
    </DetailSection>
  );
}

function EvidenceItems({ title, items }: { title: string; items: EvidenceItem[] }) {
  if (!items.length) return null;
  return (
    <details className="nested-evidence">
      <summary>{title} ({items.length})</summary>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.kind}-${item.value}-${index}`}>
            <strong>{item.value}</strong>
            <span>{humanizeToken(item.method)} · {item.confidence}/100</span>
            <ExternalDetailLink href={item.sourceUrl}>Evidence source</ExternalDetailLink>
          </li>
        ))}
      </ul>
    </details>
  );
}

function StoreEvidence({ lead }: { lead: Lead }) {
  return (
    <DetailSection title="Category and store fit">
      <dl className="fact-grid">
        <Fact label="Category" value={lead.shop_type} />
        <Fact label="Business qualifier" value={lead.business_qualifier && humanizeToken(lead.business_qualifier)} />
        <Fact label="Store fit" value={lead.store_fit_state && humanizeToken(lead.store_fit_state)} />
        <Fact label="Shopify confidence" value={lead.shopify_confidence == null ? null : `${lead.shopify_confidence}/100`} />
        <Fact label="Category evidence score" value={lead.relevance_score == null ? null : `${lead.relevance_score}/100`} />
      </dl>
      <StoreFitList evidence={lead.store_fit_evidence ?? []} />
      <CategoryList categories={lead.matched_categories ?? []} />
    </DetailSection>
  );
}

function StoreFitList({ evidence }: { evidence: StoreFitEvidence[] }) {
  if (!evidence.length) return <p className="empty-evidence">No structured store-fit evidence was recorded.</p>;
  return (
    <ul className="provenance-list">
      {evidence.map((item, index) => (
        <li key={`${item.intent?.shopType ?? "fit"}-${index}`}>
          <strong>{item.intent?.shopType ?? "Category evidence"} · {humanizeToken(item.state ?? "unknown")}</strong>
          <span>{item.reason ? humanizeToken(item.reason) : "No reason recorded"}{item.score == null ? "" : ` · ${item.score}/100`}</span>
          {(item.sourceUrls ?? []).map((url) => (
            <ExternalDetailLink key={url} href={url}>Fetched evidence</ExternalDetailLink>
          ))}
        </li>
      ))}
    </ul>
  );
}

function CategoryList({ categories }: { categories: CategoryIntent[] }) {
  if (!categories.length) return null;
  return (
    <details className="nested-evidence">
      <summary>Matched category intents ({categories.length})</summary>
      <ul>{categories.map((category, index) => (
        <li key={`${category.shopType}-${category.businessQualifier}-${index}`}>
          <strong>{category.originalShopType ?? category.shopType}</strong>
          <span>{humanizeToken(category.businessQualifier)}</span>
        </li>
      ))}</ul>
    </details>
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
          <Fact label="Total" value={lead.score_breakdown ? String(lead.score_breakdown.total) : null} />
        </dl>
      )}
      <small className="version-note">Pipeline {lead.pipeline_version ?? "legacy/unversioned"} · Scoring {lead.scoring_version ?? "legacy/unversioned"}</small>
    </DetailSection>
  );
}

function IdentityDetails({ lead }: { lead: Lead }) {
  const identity = lead.identity_evidence;
  const canonical = identity?.canonical;
  return (
    <DetailSection title="Store identity">
      <dl className="fact-grid">
        <Fact label="Resolved domain" value={lead.resolved_domain} />
        <Fact label="MyShopify domain" value={lead.myshopify_domain} />
        <Fact label="Identity confidence" value={lead.identity_confidence == null ? null : `${lead.identity_confidence}/100`} />
        <Fact label="Resolution method" value={identity?.method && humanizeToken(identity.method)} />
        <Fact label="Stable hostname" value={identity?.stableHostname} />
        <Fact label="Merged occurrences" value={identity?.mergedOccurrenceCount == null ? null : String(identity.mergedOccurrenceCount)} />
      </dl>
      {(identity?.observedHostnames?.length ?? 0) > 0 && <p className="tag-list">{identity?.observedHostnames?.map((host) => <span key={host}>{host}</span>)}</p>}
      {canonical && (
        <p className="detail-copy">
          Canonical host: {canonical.hostname ?? "not recorded"} · {canonical.trusted ? "verified" : "unverified evidence"} · {humanizeToken(canonical.reason ?? "reason unrecorded")}
        </p>
      )}
      <div className="detail-links">
        <ExternalDetailLink href={lead.final_url}>Fetched storefront URL</ExternalDetailLink>
        <ExternalDetailLink href={lead.canonical_url}>Canonical evidence URL</ExternalDetailLink>
      </div>
    </DetailSection>
  );
}

function DiscoveryDetails({ lead }: { lead: Lead }) {
  const occurrences = lead.discovery_occurrences ?? [];
  return (
    <DetailSection title="Discovery provenance">
      {!occurrences.length && <p className="empty-evidence">Legacy row or no structured discovery provenance recorded.</p>}
      <OccurrenceList occurrences={occurrences} />
      <div className="detail-links">
        <ExternalDetailLink href={lead.google_result_url}>Representative Google result</ExternalDetailLink>
      </div>
    </DetailSection>
  );
}

function OccurrenceList({ occurrences }: { occurrences: DiscoveryOccurrence[] }) {
  if (!occurrences.length) return null;
  return (
    <ol className="provenance-list occurrence-list">
      {occurrences.map((occurrence, index) => (
        <li key={`${occurrence.query ?? "query"}-${occurrence.rank ?? "rank"}-${index}`}>
          <strong>{occurrence.query || "Query not recorded"}</strong>
          <span>
            {occurrence.shopType || "Category not recorded"}
            {occurrence.businessQualifier ? ` · ${humanizeToken(occurrence.businessQualifier)}` : ""}
            {` · Rank ${occurrence.rank ?? "—"}`}
            {occurrence.queryScore == null ? "" : ` · Query score ${occurrence.queryScore}`}
          </span>
          {(occurrence.resolvedDomain || occurrence.myshopifyDomain) && (
            <span>{occurrence.resolvedDomain || occurrence.myshopifyDomain}</span>
          )}
          <ExternalDetailLink href={occurrence.resultUrl}>Discovery result</ExternalDetailLink>
        </li>
      ))}
    </ol>
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

function Fact({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function SearchIconPlaceholder() {
  return (
    <span className="empty-icon" aria-hidden="true">
      <span />
    </span>
  );
}
