import { BackendStatus } from "@/components/backend-status";
import { CheckIcon, SearchIcon, StoreIcon } from "@/components/icons";

export function LandingHeroCopy() {
  return (
    <div className="hero-copy">
      <BackendStatus />
      <p className="hero-kicker">Research less. Reach the right stores.</p>
      <h1>
        Turn a market idea into a{" "}
        <span className="accent-underline">qualified lead list.</span>
      </h1>
      <p className="hero-intro">
        StoreSignal discovers Shopify stores, verifies contact details, and
        scores every lead—so your next outreach list starts with signal, not
        noise.
      </p>
      <div className="value-list">
        <span>
          <CheckIcon /> AI-guided store discovery
        </span>
        <span>
          <CheckIcon /> Verified contact evidence
        </span>
        <span>
          <CheckIcon /> Export-ready CSV
        </span>
      </div>
    </div>
  );
}

export function LandingProcess() {
  return (
    <section className="process-section">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">How it works</span>
          <h2>From category to contact list.</h2>
          <p>
            One focused workflow replaces manual search, storefront checking,
            and spreadsheet cleanup.
          </p>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <span className="process-number">01</span>
            <SearchIcon />
            <h3>Discover</h3>
            <p>
              Purpose-built search strategies uncover relevant independent
              Shopify storefronts.
            </p>
          </article>
          <article className="process-card featured">
            <span className="process-number">02</span>
            <StoreIcon />
            <h3>Qualify</h3>
            <p>
              Store relevance, platform confidence, and contact evidence are
              checked and scored.
            </p>
          </article>
          <article className="process-card">
            <span className="process-number">03</span>
            <CheckIcon />
            <h3>Activate</h3>
            <p>
              Review qualified leads in the workspace and export clean data
              whenever you are ready.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
