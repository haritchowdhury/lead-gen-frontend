"use client";

import { useState } from "react";

import {
  ChevronIcon,
  ExternalLinkIcon,
  MailIcon,
} from "@/components/icons";
import type { Lead } from "@/lib/api-types";

type ResultsTableProps = {
  leads: Lead[];
  loading: boolean;
};

function externalUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

function displayDomain(lead: Lead): string {
  return lead.resolved_domain ?? lead.myshopify_domain ?? "Domain unavailable";
}

function scoreTone(score: number | null): string {
  if (score == null) return "score-empty";
  if (score >= 75) return "score-high";
  if (score >= 45) return "score-mid";
  return "score-low";
}

function DetailLink({
  href,
  children,
}: {
  href: string | null;
  children: React.ReactNode;
}) {
  const safeHref = externalUrl(href);
  if (!safeHref) return <span>{children || "—"}</span>;
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
            <th>Lead score</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isExpanded = expanded === lead.id;
            const storeUrl = externalUrl(lead.final_url ?? lead.canonical_url);
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
        </td>
        <td>
          {lead.email ? (
            <a className="email-link" href={`mailto:${lead.email}`}>
              <MailIcon />
              {lead.email}
            </a>
          ) : (
            <span className="muted-cell">{lead.phone ?? "No contact found"}</span>
          )}
        </td>
        <td>
          <span className="rank-cell">
            {lead.google_rank == null ? "—" : `#${lead.google_rank}`}
          </span>
        </td>
        <td>
          <span className={`score ${scoreTone(lead.lead_score)}`}>
            {lead.lead_score ?? "—"}
          </span>
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
            aria-label={`${isExpanded ? "Hide" : "Show"} details for ${
              lead.store_name ?? "this lead"
            }`}
          >
            <ChevronIcon />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="detail-row">
          <td colSpan={7}>
            <div className="lead-detail-grid">
              <div>
                <span>Discovery query</span>
                <strong>{lead.search_query ?? lead.generated_query ?? "—"}</strong>
                <p>{lead.query_generation_reason ?? "No query rationale recorded."}</p>
              </div>
              <div>
                <span>Store evidence</span>
                <dl>
                  <dt>Shopify confidence</dt>
                  <dd>
                    {lead.shopify_confidence == null
                      ? "—"
                      : `${lead.shopify_confidence}/100`}
                  </dd>
                  <dt>Relevance</dt>
                  <dd>
                    {lead.relevance_score == null
                      ? "—"
                      : `${lead.relevance_score}/100`}
                  </dd>
                </dl>
              </div>
              <div>
                <span>Source links</span>
                <div className="detail-links">
                  <DetailLink href={lead.google_result_url}>Google result</DetailLink>
                  <DetailLink href={lead.contact_url}>Contact page</DetailLink>
                  <DetailLink href={lead.email_source_url}>Email source</DetailLink>
                </div>
              </div>
              <div>
                <span>Outcome note</span>
                <strong>
                  {lead.error ??
                    lead.rejection_reason ??
                    lead.additional_information ??
                    "Qualified with no additional notes."}
                </strong>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function SearchIconPlaceholder() {
  return (
    <span className="empty-icon" aria-hidden="true">
      <span />
    </span>
  );
}

