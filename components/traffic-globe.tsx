"use client";

import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";

import type { DataForSeoMarketTraffic, DataForSeoTrafficMetrics } from "../lib/api-types";

type CountryCode = DataForSeoMarketTraffic["country_code"];
type Rotation = [number, number, number];

const COUNTRY_META: Record<CountryCode, { name: string; numericId: string; center: [number, number] }> = {
  US: { name: "United States", numericId: "840", center: [-98, 39] },
  GB: { name: "United Kingdom", numericId: "826", center: [-3, 55] },
  CA: { name: "Canada", numericId: "124", center: [-107, 57] },
  AU: { name: "Australia", numericId: "036", center: [134, -25] },
  NZ: { name: "New Zealand", numericId: "554", center: [172, -41] },
  DE: { name: "Germany", numericId: "276", center: [10, 51] },
  FR: { name: "France", numericId: "250", center: [2, 46] },
  IN: { name: "India", numericId: "356", center: [79, 22] },
  AE: { name: "United Arab Emirates", numericId: "784", center: [54, 24] },
};

const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const VIEWBOX_SIZE = 320;
const INITIAL_ROTATION: Rotation = [-12, -18, 0];
const SHOWCASE_MARKETS = (Object.keys(COUNTRY_META) as CountryCode[]).map((country_code) => ({
  country_code,
  estimated_google_search_traffic: 0,
  organic_estimated_traffic: 0,
  organic_keyword_count: 0,
  paid_estimated_traffic: 0,
  paid_keyword_count: 0,
  featured_snippet_estimated_traffic: 0,
  featured_snippet_keyword_count: 0,
  local_pack_estimated_traffic: 0,
  local_pack_keyword_count: 0,
}));

type Atlas = Topology<{ countries: GeometryCollection<GeoJsonProperties> }>;

const countryFeatures = feature(
  worldAtlas as unknown as Atlas,
  (worldAtlas as unknown as Atlas).objects.countries,
) as FeatureCollection<Geometry, GeoJsonProperties>;

function normalizedNumericId(value: string | number | undefined): string {
  return String(value ?? "").padStart(3, "0");
}

function formattedNumber(value: number): string {
  return numberFormatter.format(value);
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div><dt>{label}</dt><dd>{formattedNumber(value)}</dd></div>;
}

function SearchMetrics({ metrics }: { metrics: DataForSeoTrafficMetrics }) {
  return (
    <dl className="fact-grid traffic-metric-grid">
      <Metric label="Estimated Google search traffic" value={metrics.estimated_google_search_traffic} />
      <Metric label="Organic estimated traffic" value={metrics.organic_estimated_traffic} />
      <Metric label="Organic ranking footprint" value={metrics.organic_keyword_count} />
      <Metric label="Paid estimated traffic" value={metrics.paid_estimated_traffic} />
      <Metric label="Paid ranking footprint" value={metrics.paid_keyword_count} />
      <Metric label="Featured-snippet estimated traffic" value={metrics.featured_snippet_estimated_traffic} />
      <Metric label="Featured-snippet keyword count" value={metrics.featured_snippet_keyword_count} />
      <Metric label="Local-pack estimated traffic" value={metrics.local_pack_estimated_traffic} />
      <Metric label="Local-pack keyword count" value={metrics.local_pack_keyword_count} />
    </dl>
  );
}

function shortestLongitudeDelta(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TrafficMarketExplorer({
  worldwide,
  markets,
  showcase = false,
  showcaseLabel,
}: {
  worldwide?: DataForSeoTrafficMetrics;
  markets: DataForSeoMarketTraffic[];
  showcase?: boolean;
  showcaseLabel?: string;
}) {
  const [selectedCode, setSelectedCode] = useState<CountryCode | null>(null);
  const id = useId().replaceAll(":", "");
  const oceanGradientId = `traffic-globe-ocean-${id}`;
  const shadowFilterId = `traffic-globe-shadow-${id}`;
  const [rotation, setRotation] = useState<Rotation>(INITIAL_ROTATION);
  const rotationRef = useRef<Rotation>(INITIAL_ROTATION);
  const animationRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; rotation: Rotation; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);

  const marketsByCode = useMemo(
    () => new Map(markets.map((market) => [market.country_code, market])),
    [markets],
  );
  const availableIds = useMemo(
    () => new Map(markets.map((market) => [COUNTRY_META[market.country_code].numericId, market.country_code])),
    [markets],
  );
  const activeMetrics = selectedCode ? marketsByCode.get(selectedCode) : worldwide;
  const activeLabel = selectedCode ? COUNTRY_META[selectedCode].name : "Worldwide";

  const projection = useMemo(
    () => geoOrthographic()
      .translate([VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2])
      .scale(145)
      .clipAngle(90)
      .precision(0.35)
      .rotate(rotation),
    [rotation],
  );
  const path = geoPath(projection);

  useEffect(() => () => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
  }, []);

  function commitRotation(next: Rotation) {
    rotationRef.current = next;
    setRotation(next);
  }

  function rotateToCountry(code: CountryCode) {
    setSelectedCode(code);
    const [longitude, latitude] = COUNTRY_META[code].center;
    const target: Rotation = [-longitude, -latitude, 0];
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    if (prefersReducedMotion()) {
      commitRotation(target);
      return;
    }
    const start = rotationRef.current;
    const longitudeDelta = shortestLongitudeDelta(start[0], target[0]);
    let startedAt: number | null = null;
    const duration = 650;
    const animate = (now: number) => {
      startedAt ??= now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      commitRotation([
        start[0] + longitudeDelta * eased,
        start[1] + (target[1] - start[1]) * eased,
        0,
      ]);
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
      else animationRef.current = null;
    };
    animationRef.current = requestAnimationFrame(animate);
  }

  function showOverall() {
    setSelectedCode(null);
  }

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotation: rotationRef.current,
      moved: false,
    };
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    commitRotation([
      drag.rotation[0] + dx * 0.42,
      Math.max(-80, Math.min(80, drag.rotation[1] - dy * 0.42)),
      0,
    ]);
  }

  function handlePointerUp(event: React.PointerEvent<SVGSVGElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      suppressClickRef.current = dragRef.current.moved;
      dragRef.current = null;
      requestAnimationFrame(() => { suppressClickRef.current = false; });
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleCountryClick(code: CountryCode) {
    if (suppressClickRef.current) return;
    rotateToCountry(code);
  }

  return (
    <div className={`traffic-market-explorer${showcase ? " traffic-showcase-explorer" : markets.length ? "" : " is-worldwide-only"}`}>
      {!showcase && <section className="traffic-market-data" aria-live="polite" aria-atomic="true">
        <header>
          <div>
            <span className="traffic-scope-kicker">Traffic scope</span>
            <h5>{activeLabel}</h5>
          </div>
          {selectedCode && <button type="button" className="traffic-overall-button" onClick={showOverall}>View overall</button>}
        </header>
        {activeMetrics ? (
          <SearchMetrics metrics={activeMetrics} />
        ) : (
          <p className="empty-evidence">Worldwide metrics were not returned. Select an available market to inspect its data.</p>
        )}
      </section>}

      {markets.length > 0 && <section
        className={`traffic-globe-panel${showcase ? " landing-traffic-globe-panel" : ""}`}
        {...(showcase
          ? { "aria-label": "High-value global traffic markets" }
          : { "aria-labelledby": "traffic-markets-title" })}
      >
        <div className={showcase ? "landing-globe-copy" : "traffic-country-nav"}>
          <div>
            {showcase ? (
              <span className="eyebrow">{showcaseLabel ?? "Explore our global coverage"}</span>
            ) : (
              <>
                <span className="traffic-scope-kicker">Available markets</span>
                <h5 id="traffic-markets-title">Explore by country</h5>
              </>
            )}
          </div>
          <div className="traffic-country-links" aria-label="Available traffic markets">
            {markets.map((market) => {
              const meta = COUNTRY_META[market.country_code];
              const selected = selectedCode === market.country_code;
              return (
                <button
                  key={market.country_code}
                  type="button"
                  className={selected ? "is-selected" : undefined}
                  aria-label={`${meta.name} (${market.country_code})`}
                  aria-pressed={selected}
                  onClick={() => rotateToCountry(market.country_code)}
                >
                  {meta.name}<span>({market.country_code})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="traffic-globe-stage">
          <svg
            className="traffic-globe"
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            role="group"
            aria-label="Interactive globe. Drag to rotate; highlighted countries have traffic data."
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <defs>
              <radialGradient id={oceanGradientId} cx="35%" cy="28%" r="74%">
                <stop offset="0" stopColor="#f8fbea" />
                <stop offset="0.72" stopColor="#e9f1d8" />
                <stop offset="1" stopColor="#dce8c4" />
              </radialGradient>
              <filter id={shadowFilterId} x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="9" stdDeviation="10" floodColor="#26340f" floodOpacity="0.16" />
              </filter>
            </defs>
            <circle className="traffic-globe-shadow" cx="160" cy="160" r="145" filter={`url(#${shadowFilterId})`} />
            <path className="traffic-globe-ocean" style={{ fill: `url(#${oceanGradientId})` }} d={path({ type: "Sphere" }) ?? undefined} />
            <path className="traffic-globe-grid" d={path(geoGraticule10()) ?? undefined} />
            <path className="traffic-globe-land" d={path(countryFeatures) ?? undefined} aria-hidden="true" />
            <g className="traffic-globe-markets">
              {countryFeatures.features.map((country) => {
                const code = availableIds.get(normalizedNumericId(country.id));
                if (!code) return null;
                const selected = selectedCode === code;
                return (
                  <path
                    key={code}
                    d={path(country as Feature<Geometry>) ?? undefined}
                    className={selected ? "is-selected" : undefined}
                    role="button"
                    aria-label={`Show traffic for ${COUNTRY_META[code].name}`}
                    tabIndex={0}
                    onClick={() => handleCountryClick(code)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        rotateToCountry(code);
                      }
                    }}
                  />
                );
              })}
            </g>
            <circle className="traffic-globe-rim" cx="160" cy="160" r="145" aria-hidden="true" />
          </svg>
          <p className="traffic-globe-instruction"><span aria-hidden="true">↔</span> Drag to rotate · Select highlighted markets</p>
        </div>
      </section>}
    </div>
  );
}

export function TrafficGlobeShowcase({ label }: { label?: string }) {
  return <TrafficMarketExplorer markets={SHOWCASE_MARKETS} showcase showcaseLabel={label} />;
}
