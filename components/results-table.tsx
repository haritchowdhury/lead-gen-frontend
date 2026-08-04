"use client";

import { useState } from "react";

import {
  ChevronIcon,
  ExternalLinkIcon,
} from "./icons";
import { LeadDetails } from "./lead-details";
import { CompactTrafficSignal } from "./traffic-enrichment";
import type { Lead } from "../lib/api-types";
import type { MasterLead } from "../lib/api-types";
import {
  contactChannels,
  contactabilityLabel,
  humanizeToken,
  retainedExpandedLead,
  safeExternalUrl,
  scorePresentation,
} from "../lib/lead-presentation";

type ResultsTableProps = {
  leads: Lead[];
  loading: boolean;
};

function displayDomain(lead: Lead): string {
  return lead.resolved_domain ?? lead.myshopify_domain ?? "Domain unavailable";
}

export function ResultsTable({ leads, loading }: ResultsTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const visibleExpanded = retainedExpandedLead(expanded, leads);

  return (
    <ResultsTableView
      leads={leads}
      loading={loading}
      expandedLeadId={visibleExpanded}
      onExpandedLeadId={setExpanded}
    />
  );
}

export function ResultsTableView({
  leads,
  loading,
  expandedLeadId,
  onExpandedLeadId,
}: ResultsTableProps & {
  expandedLeadId: string | null;
  onExpandedLeadId: (leadId: string | null) => void;
}) {

  if (loading && !leads.length) {
    return (
      <div className="table-skeleton" role="status" aria-label="Loading leads">
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
    <div
      className={`table-wrap ${loading ? "is-refreshing" : ""}`}
      aria-busy={loading}
      tabIndex={0}
      aria-label="Lead results table; scroll horizontally to view all columns"
    >
      <table className="results-table">
        <colgroup>
          <col className="store-column" />
          <col className="category-column" />
          <col className="reachability-column" />
          <col className="rank-column" />
          <col className="score-column" />
          <col className="status-column" />
          <col className="toggle-column" />
        </colgroup>
        <thead>
          <tr>
            <th>Store</th>
            <th>Category</th>
            <th>Reachability</th>
            <th className="numeric-heading">Rank</th>
            <th className="numeric-heading">Score</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isExpanded = expandedLeadId === lead.id;
            const storeUrl = safeExternalUrl(lead.final_url ?? lead.canonical_url);
            return (
              <ResultsRow
                key={lead.id}
                lead={lead}
                isExpanded={isExpanded}
                storeUrl={storeUrl}
                onToggle={() => onExpandedLeadId(isExpanded ? null : lead.id)}
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
  const visibleChannels = compactChannels.slice(0, 2);
  const remainingChannelCount = compactChannels.length - visibleChannels.length;

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
              <small title={displayDomain(lead)}>{displayDomain(lead)}</small>
              <CompactTrafficSignal enrichment={lead.traffic_enrichment} />
            </span>
          </div>
        </td>
        <td>
          <span className="category-pill" title={lead.shop_type ?? "Uncategorized"}>
            {lead.shop_type ?? "Uncategorized"}
          </span>
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
                {visibleChannels.map((channel) => <i key={channel}>{channel}</i>)}
                {remainingChannelCount > 0 && (
                  <i title={compactChannels.slice(2).join(", ")}>
                    +{remainingChannelCount}
                  </i>
                )}
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
            <div className="lead-expansion-shell">
              <LeadDetails lead={lead} />
              {"master" in lead && <MasterDiscoveryHistory lead={lead as MasterLead} />}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function MasterDiscoveryHistory({ lead }: { lead: MasterLead }) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <section className="detail-section master-discovery-history">
      <h3><span>05</span>Discovery history</h3>
      <p className="detail-copy">
        First discovered {formatter.format(new Date(lead.master.first_discovered_at))} · seen in {lead.master.discovery_count.toLocaleString()} {lead.master.discovery_count === 1 ? "run" : "runs"}.
      </p>
      <ul className="detail-links master-run-links">
        {lead.master.runs.map((run) => (
          <li key={run.href}>
            <a href={run.href}>Run from {formatter.format(new Date(run.discovered_at))}</a>
          </li>
        ))}
      </ul>
      {lead.master.profile_updated_at && (
        <small className="version-note">Live profile updated {formatter.format(new Date(lead.master.profile_updated_at))}</small>
      )}
    </section>
  );
}

function SearchIconPlaceholder() {
  return (
    <span className="empty-icon" aria-hidden="true">
      <span />
    </span>
  );
}
