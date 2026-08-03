import Link from "next/link";

import { BackendStatus } from "@/components/backend-status";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  MailIcon,
  SearchIcon,
  StoreIcon,
} from "@/components/icons";
import { TrafficGlobeShowcase } from "@/components/traffic-globe";

type LandingVariant = "start" | "review";

export function LandingHeroCopy({ variant = "start" }: { variant?: LandingVariant }) {
  const reviewing = variant === "review";

  return (
    <div className={`hero-copy${reviewing ? " is-review" : " is-start"}`}>
      <div className="hero-message">
        {reviewing ? (
          <span className="health-chip health-online"><span className="health-dot" /> Search plan ready</span>
        ) : (
          <BackendStatus />
        )}
        <p className="hero-kicker">{reviewing ? "One quick review" : "Smarter Shopify prospecting starts here"}</p>
        <h1>
          {reviewing ? (
            <>Make sure we are looking in the <span className="accent-underline">right places.</span></>
          ) : (
            <>Meet the Shopify stores your business was <span className="accent-underline">made for.</span></>
          )}
        </h1>
        <p className="hero-intro">
          {reviewing
            ? "We turned your categories into focused searches designed to uncover relevant Shopify stores. Shape the plan, then begin when the direction feels right."
            : "Tell us who you want to reach. StoreSignal finds the right stores, uncovers the best ways to contact them, and shows you which leads deserve your attention."}
        </p>
        <div className="value-list">
          {(reviewing
            ? ["Adjust any search", "Add another angle", "Start only when it feels right"]
            : ["Find better-fit stores", "See how to reach them", "Enter every conversation informed"]
          ).map((item) => <span key={item}><CheckIcon /> {item}</span>)}
        </div>
      </div>
      <TrafficGlobeShowcase label={reviewing ? "Your market is bigger than one location" : "Opportunity has no borders"} />
    </div>
  );
}

function SectionIntro({ eyebrow, title, copy, inverse = false }: {
  eyebrow: string;
  title: string;
  copy: string;
  inverse?: boolean;
}) {
  return (
    <div className={`marketing-heading${inverse ? " is-inverse" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export function LandingProcess({ variant = "start" }: { variant?: LandingVariant }) {
  const reviewing = variant === "review";
  const target = reviewing ? "#query-review" : "#start-discovery";

  return (
    <>
      <section className="landing-problem" id="what-you-get">
        <div className="shell problem-layout">
          <div className="problem-statement">
            <span className="eyebrow">Leave the list-building behind</span>
            <h2>Your next great customer should not be buried in a spreadsheet.</h2>
          </div>
          <div className="problem-copy">
            <p>Finding a store is easy. Knowing whether it is relevant, active, reachable, and worth your time is the hard part.</p>
            <p>StoreSignal brings that research together, giving you a clearer list of prospects and a better reason to contact each one.</p>
          </div>
        </div>
        <div className="shell outcome-strip">
          {[
            ["Less searching", "Start with the market you want—not hours of tabs, directories, and copied domains."],
            ["Less guessing", "See why a store fits before you invest time writing the perfect message."],
            ["More confidence", "Reach out with useful context and a clearer sense of opportunity."],
          ].map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="shell">
          <SectionIntro inverse eyebrow="From market idea to meaningful outreach" title="A better lead list in four simple steps." copy="StoreSignal handles the repetitive research while keeping the important decisions visible and under your control." />
          <div className="process-grid">
            <article className="process-card"><span className="process-number">01</span><SearchIcon /><h3>Describe your market</h3><p>Tell us what your ideal Shopify stores sell.</p></article>
            <article className="process-card featured"><span className="process-number">02</span><CheckIcon /><h3>Shape the search</h3><p>Review every search and adjust it until the direction feels right.</p></article>
            <article className="process-card"><span className="process-number">03</span><StoreIcon /><h3>Let us do the digging</h3><p>We find matching stores, qualify their fit, and uncover ways to reach them.</p></article>
            <article className="process-card"><span className="process-number">04</span><DownloadIcon /><h3>Focus on the best</h3><p>Compare prospects, explore the evidence, and export your shortlist.</p></article>
          </div>
          <Link className="marketing-text-link is-inverse" href={target}>{reviewing ? "Return to my search plan" : "Start finding stores"}<ArrowRightIcon /></Link>
        </div>
      </section>

      <section className="intelligence-section" id="intelligence">
        <div className="shell">
          <SectionIntro eyebrow="Know more before you say hello" title="Every lead comes with a reason to care." copy="A useful lead is more than a name and an email address. StoreSignal gives you the context to decide who belongs on your list—and how to approach them." />
          <div className="intelligence-grid">
            <article className="intelligence-card intelligence-card-lead">
              <div className="card-icon"><StoreIcon /></div><span className="card-kicker">The right business</span><h3>Know the store behind the domain.</h3><p>Understand what it sells, how closely it matches your market, and whether it is genuinely running on Shopify.</p>
              <div className="mock-signal-row"><span>Identity verified</span><span>Category matched</span></div>
            </article>
            <article className="intelligence-card"><div className="card-icon"><MailIcon /></div><span className="card-kicker">The right contact</span><h3>Find a real way in.</h3><p>Bring available emails, phones, contact pages, and social profiles into one place.</p></article>
            <article className="intelligence-card intelligence-card-dark"><span className="card-kicker">The right moment</span><strong className="market-number">09</strong><h3>markets, one clearer picture.</h3><p>See where a store appears in search and where demand may be waiting.</p></article>
            <article className="intelligence-card intelligence-card-wide">
              <div><span className="card-kicker">The right priority</span><h3>Turn a crowded market into a confident shortlist.</h3></div>
              <div className="priority-preview" aria-hidden="true"><span><i>01</i><b>Strong fit</b><em>Qualified</em></span><span><i>02</i><b>Contact ready</b><em>Qualified</em></span><span><i>03</i><b>Worth a look</b><em>Review</em></span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="evidence-section">
        <div className="shell evidence-layout">
          <div className="evidence-copy"><span className="eyebrow">Confidence you can inspect</span><h2>No mystery scores. No unexplained recommendations.</h2><p>When StoreSignal recommends a lead, you can see why. Review the storefront, category match, contact sources, search presence, and signals behind its position on your list.</p><p className="evidence-closing">Because better outreach begins with knowing what is true.</p></div>
          <div className="evidence-list-marketing">
            {["Store identity", "Product and category fit", "Contact sources", "Search visibility", "Market presence", "Lead strength"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><CheckIcon /></div>)}
          </div>
        </div>
      </section>

      <section className="market-section">
        <div className="shell market-layout">
          <div className="market-copy"><span className="eyebrow">See the bigger market</span><h2>Discover where attention is already growing.</h2><p>Explore the search presence behind one prospect or your entire lead list. Move between worldwide and country-level views to see where your next opportunity may be waiting.</p><small>Search visibility estimates are not private storefront analytics.</small></div>
          <div className="market-board"><span className="market-board-label">Global market visibility</span><strong>One store.</strong><strong>Nine markets.</strong><strong className="signal-text">A clearer picture.</strong><div className="market-pills">{["US", "GB", "CA", "AU", "NZ", "DE", "FR", "IN", "AE"].map((market) => <span key={market}>{market}</span>)}</div></div>
        </div>
      </section>

      <section className="use-cases-section" id="use-cases">
        <div className="shell">
          <SectionIntro eyebrow="Built for ambitious outreach" title="Whatever you sell, start with stores that need it." copy="Better targeting makes every offer stronger." />
          <div className="use-case-grid">
            {[
              ["Ecommerce agencies", "Find stores that fit your design, development, advertising, SEO, or retention expertise."],
              ["Shopify technology teams", "Reach merchants more likely to benefit from your app, integration, or platform."],
              ["Wholesale brands", "Discover retailers that belong in your distribution and stockist network."],
              ["Partnership teams", "Find relevant brands for collaborations, affiliates, suppliers, and strategic relationships."],
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="control-section">
        <div className="shell control-layout">
          <div><span className="eyebrow">You stay in control</span><h2>StoreSignal does the research. You make the call.</h2><p>Review the strategy before discovery. Inspect the reasoning behind every lead. Export the complete result whenever you are ready.</p></div>
          <div className="control-points">
            {[
              ["Nothing begins without your approval", "You see and shape the searches first."],
              ["Nothing important is hidden", "The evidence behind each lead remains available."],
              ["Nothing locks you in", "Your complete results are ready to export."],
            ].map(([title, copy]) => <article key={title}><CheckIcon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="shell faq-layout">
          <div className="faq-heading"><span className="eyebrow">Questions, answered</span><h2>Good to know before you begin.</h2><p>StoreSignal is built for focused, evidence-led Shopify prospecting.</p></div>
          <div className="faq-list">
            {[
              ["What is StoreSignal?", "StoreSignal helps you find relevant Shopify stores, understand their fit, uncover ways to contact them, and decide which prospects deserve your attention."],
              ["What should I search for?", "Start with the kind of store you want to reach, such as independent eyewear stores or sustainable clothing brands. Focused descriptions usually produce stronger results."],
              ["Can I change the searches StoreSignal creates?", "Yes. Review, edit, remove, reorder, and add searches before discovery begins."],
              ["What contact information can I find?", "Depending on what a store makes publicly available, results may include email addresses, phone numbers, contact pages, and social profiles."],
              ["How are leads ranked?", "StoreSignal uses recorded signals such as store identity, category fit, contact availability, and Shopify verification. The evidence remains available for inspection."],
              ["Does traffic mean actual website visitors?", "No. Traffic figures are search-visibility estimates, not private storefront analytics or confirmed website visits."],
              ["Can I export my leads?", "Yes. Export the complete lead list and its available research data to CSV."],
            ].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-inner"><span className="eyebrow">Your next opportunity is already out there</span><h2>{reviewing ? "Your search is ready when you are." : "Find the stores worth knowing."}</h2><p>{reviewing ? "Give the plan one final look, then let StoreSignal turn it into a focused list of prospects." : "Start with a category. Finish with a focused list of Shopify prospects you are ready to approach."}</p><Link className="button button-primary landing-cta-button" href={target}>{reviewing ? "Review my search plan" : "Find my next leads"}<ArrowRightIcon /></Link><small>You approve the search before discovery begins.</small></div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand"><Link className="brand" href="/" aria-label="StoreSignal home"><span>StoreSignal</span></Link><p>Find, understand, and reach the Shopify stores that fit your business.</p></div>
          <nav aria-label="Product"><strong>Product</strong><Link href="/#how-it-works">How it works</Link><Link href="/#what-you-get">What you get</Link><Link href="/#use-cases">Use cases</Link></nav>
          <nav aria-label="Account"><strong>Account</strong><Link href="/runs">My runs</Link><Link href="/sign-in">Sign in</Link><Link href="/sign-up">Create account</Link></nav>
        </div>
        <div className="shell footer-base"><span>© 2026 StoreSignal</span><span>Shopify lead intelligence</span></div>
      </footer>
    </>
  );
}
