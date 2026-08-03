import type {
  CruxOriginMetrics,
  TrafficEnrichment,
  TrafficSourceState,
} from "../lib/api-types";
import { safeExternalUrl } from "../lib/lead-presentation";
import { TrafficMarketExplorer } from "./traffic-globe";

type MetricRating = "good" | "needs_improvement" | "poor";
type CoreWebVitalsAssessment = MetricRating | "incomplete";

const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const percentageFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
  style: "percent",
});

function formattedNumber(value: number): string {
  return numberFormatter.format(value);
}

function formattedDate(value: string | undefined): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formattedCalendarDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function stateLabel(state: TrafficSourceState): string {
  switch (state) {
    case "available": return "Available";
    case "partial": return "Partially available";
    case "no_coverage": return "No coverage";
    case "unavailable": return "Temporarily unavailable";
  }
}

export function coreWebVitalRating(
  metric: "lcp" | "inp" | "cls",
  value: number,
): MetricRating {
  const thresholds = {
    lcp: [2500, 4000],
    inp: [200, 500],
    cls: [0.1, 0.25],
  } as const;
  const [good, poor] = thresholds[metric];
  return value <= good ? "good" : value <= poor ? "needs_improvement" : "poor";
}

export function coreWebVitalsAssessment(
  metrics: CruxOriginMetrics["metrics"],
): CoreWebVitalsAssessment {
  const lcp = metrics?.largest_contentful_paint_p75_ms;
  const inp = metrics?.interaction_to_next_paint_p75_ms;
  const rawCls = metrics?.cumulative_layout_shift_p75;
  if (lcp === undefined || inp === undefined || rawCls === undefined) return "incomplete";
  const ratings = [
    coreWebVitalRating("lcp", lcp),
    coreWebVitalRating("inp", inp),
    coreWebVitalRating("cls", Number(rawCls)),
  ];
  if (ratings.includes("poor")) return "poor";
  return ratings.includes("needs_improvement") ? "needs_improvement" : "good";
}

function assessmentLabel(assessment: CoreWebVitalsAssessment): string {
  switch (assessment) {
    case "good": return "Pass";
    case "needs_improvement": return "Needs improvement";
    case "poor": return "Poor";
    case "incomplete": return "Incomplete assessment";
  }
}

function SourceState({ state }: { state: TrafficSourceState }) {
  return <span className={`traffic-state traffic-state-${state}`}>{stateLabel(state)}</span>;
}

function Metric({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function DataForSeoDetails({ enrichment }: { enrichment: TrafficEnrichment }) {
  const source = enrichment.dataforseo;
  if (!source) return null;
  const material = source.worldwide || source.markets?.length;
  return (
    <section className="traffic-source-block" aria-labelledby="dataforseo-traffic-title">
      <header>
        <div>
          <h4 id="dataforseo-traffic-title">Estimated Google search traffic</h4>
          <p>Search-demand estimates; these are not total website visits.</p>
        </div>
        <SourceState state={source.state} />
      </header>
      {(source.worldwide || (source.markets?.length ?? 0) > 0) && (
        <TrafficMarketExplorer worldwide={source.worldwide} markets={source.markets ?? []} />
      )}
      {!material && (
        <p className="empty-evidence">
          {source.state === "no_coverage"
            ? "No DataForSEO coverage was returned for this store."
            : "DataForSEO metrics are unavailable for this store."}
        </p>
      )}
      {(source.target || source.observed_at) && (
        <p className="traffic-observation">
          {source.target ? `Target: ${source.target}` : ""}
          {source.target && source.observed_at ? " · " : ""}
          {source.observed_at ? `Observed ${formattedDate(source.observed_at)}` : ""}
        </p>
      )}
    </section>
  );
}

function VitalMetric({
  abbreviation,
  title,
  value,
  unit,
  rating,
}: {
  abbreviation: string;
  title: string;
  value: number | string;
  unit?: string;
  rating?: MetricRating;
}) {
  return (
    <Metric
      label={<abbr title={title}>{abbreviation}</abbr>}
      value={<>{formattedNumber(Number(value))}{unit ?? ""}{rating && <small className={`vital-rating vital-${rating}`}> {assessmentLabel(rating)}</small>}</>}
    />
  );
}

function Fractions({
  fractions,
}: {
  fractions: { desktop: number; phone: number; tablet: number };
}) {
  return (
    <dl className="fact-grid traffic-fractions">
      <Metric label="Desktop" value={percentageFormatter.format(fractions.desktop)} />
      <Metric label="Phone" value={percentageFormatter.format(fractions.phone)} />
      <Metric label="Tablet" value={percentageFormatter.format(fractions.tablet)} />
    </dl>
  );
}

function CruxDetails({ enrichment }: { enrichment: TrafficEnrichment }) {
  const source = enrichment.crux;
  if (!source) return null;
  const origin = source.origin_metrics;
  const popularity = source.popularity;
  const metrics = origin.metrics;
  const assessment = coreWebVitalsAssessment(metrics);
  return (
    <section className="traffic-source-block" aria-labelledby="crux-traffic-title">
      <header>
        <div>
          <h4 id="crux-traffic-title">Chrome UX Report</h4>
          <p>Observed user-experience and coarse popularity data. CrUX does not provide visit totals.</p>
        </div>
        <SourceState state={source.state} />
      </header>

      <div className="traffic-scope">
        <h5>Origin performance</h5>
        {origin.state === "available" ? (
          <>
            <p className={`traffic-assessment assessment-${assessment}`}>
              <strong>Core Web Vitals: {assessmentLabel(assessment)}</strong>
              <span>Assessment uses available p75 LCP, INP, and CLS values.</span>
            </p>
            <dl className="fact-grid traffic-metric-grid">
              {metrics?.largest_contentful_paint_p75_ms !== undefined && <VitalMetric abbreviation="LCP" title="Largest Contentful Paint, 75th percentile" value={metrics.largest_contentful_paint_p75_ms} unit=" ms" rating={coreWebVitalRating("lcp", metrics.largest_contentful_paint_p75_ms)} />}
              {metrics?.interaction_to_next_paint_p75_ms !== undefined && <VitalMetric abbreviation="INP" title="Interaction to Next Paint, 75th percentile" value={metrics.interaction_to_next_paint_p75_ms} unit=" ms" rating={coreWebVitalRating("inp", metrics.interaction_to_next_paint_p75_ms)} />}
              {metrics?.cumulative_layout_shift_p75 !== undefined && <VitalMetric abbreviation="CLS" title="Cumulative Layout Shift, 75th percentile" value={metrics.cumulative_layout_shift_p75} rating={coreWebVitalRating("cls", Number(metrics.cumulative_layout_shift_p75))} />}
              {metrics?.first_contentful_paint_p75_ms !== undefined && <VitalMetric abbreviation="FCP" title="First Contentful Paint, 75th percentile" value={metrics.first_contentful_paint_p75_ms} unit=" ms" />}
              {metrics?.time_to_first_byte_p75_ms !== undefined && <VitalMetric abbreviation="TTFB" title="Time to First Byte, 75th percentile" value={metrics.time_to_first_byte_p75_ms} unit=" ms" />}
            </dl>
            {origin.observed_form_factor_fractions && (
              <>
                <h6>Observed CrUX form factors</h6>
                <Fractions fractions={origin.observed_form_factor_fractions} />
              </>
            )}
            <p className="traffic-observation">
              {origin.collection_period && `Collection ${formattedCalendarDate(origin.collection_period.first_date)}–${formattedCalendarDate(origin.collection_period.last_date)}`}
              {origin.observed_at && ` · Observed ${formattedDate(origin.observed_at)}`}
            </p>
          </>
        ) : (
          <p className="empty-evidence">
            {origin.state === "no_coverage"
              ? "No current CrUX origin coverage was available."
              : "Current CrUX origin metrics are unavailable."}
          </p>
        )}
      </div>

      <div className="traffic-scope">
        <h5>Navigation popularity</h5>
        {popularity.state === "available" && popularity.popularity_rank !== undefined ? (
          <>
            <dl className="fact-grid traffic-metric-grid">
              <Metric label="Coarse popularity rank" value={`Top ${formattedNumber(popularity.popularity_rank)}`} />
              <Metric label="Popularity band" value={popularity.popularity_band?.replace("top_", "Top ")} />
              <Metric label="Dataset month" value={popularity.dataset_month} />
            </dl>
            {popularity.observed_device_fractions && (
              <>
                <h6>Observed monthly device fractions</h6>
                <Fractions fractions={popularity.observed_device_fractions} />
              </>
            )}
            <p className="traffic-observation">Observed {formattedDate(popularity.observed_at)}</p>
          </>
        ) : (
          <p className="empty-evidence">
            {popularity.state === "no_coverage"
              ? "No monthly CrUX popularity coverage was available."
              : "CrUX popularity metrics are unavailable."}
          </p>
        )}
      </div>
    </section>
  );
}

function Attribution({ enrichment }: { enrichment: TrafficEnrichment }) {
  if (!enrichment.traffic_attributions?.length) return null;
  return (
    <aside className="traffic-attribution" aria-label="Traffic data attribution">
      <h4>Sources and attribution</h4>
      <p>Source links are provided for attribution and do not imply provider endorsement.</p>
      <ul>
        {enrichment.traffic_attributions.map((item) => {
          const sourceUrl = safeExternalUrl(item.source_url);
          const licenseUrl = safeExternalUrl(item.license_url);
          return (
            <li key={item.source}>
              <strong>{item.name}</strong>
              <span>{item.text}</span>
              <span className="traffic-attribution-links">
                {sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer">Source</a>}
                {licenseUrl && <a href={licenseUrl} target="_blank" rel="noreferrer">{item.license ?? "License"}</a>}
              </span>
              {item.transformation && <small>{item.transformation}</small>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export function CompactTrafficSignal({ enrichment }: { enrichment: TrafficEnrichment | undefined }) {
  if (!enrichment?.traffic_sources?.length) return null;
  const worldwide = enrichment.dataforseo?.worldwide;
  if (worldwide) {
    return <small className="traffic-compact">Est. Google search {formattedNumber(worldwide.estimated_google_search_traffic)}</small>;
  }
  const cruxMetrics = enrichment.crux?.origin_metrics.metrics;
  if (cruxMetrics && Object.keys(cruxMetrics).length) {
    return <small className="traffic-compact">Core Web Vitals: {assessmentLabel(coreWebVitalsAssessment(cruxMetrics))}</small>;
  }
  const popularity = enrichment.crux?.popularity;
  if (popularity?.state === "available" && popularity.popularity_rank !== undefined) {
    return <small className="traffic-compact">CrUX top {formattedNumber(popularity.popularity_rank)}</small>;
  }
  const market = enrichment.dataforseo?.markets?.[0];
  return market
    ? <small className="traffic-compact">Est. Google search {market.country_code} {formattedNumber(market.estimated_google_search_traffic)}</small>
    : null;
}

export function TrafficEnrichmentDetails({ enrichment }: { enrichment: TrafficEnrichment | undefined }) {
  if (!enrichment) return null;
  return (
    <section className="detail-section detail-section-emphasis traffic-details" aria-labelledby="traffic-enrichment-title">
      <h3 id="traffic-enrichment-title"><span>02</span>Traffic and site experience</h3>
      <div className="traffic-source-grid">
        <DataForSeoDetails enrichment={enrichment} />
        <CruxDetails enrichment={enrichment} />
      </div>
      <Attribution enrichment={enrichment} />
    </section>
  );
}
