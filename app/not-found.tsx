import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-canvas run-page state-page">
      <div className="shell">
        <div className="fatal-card ds-card">
          <span className="eyebrow">404 · Not found</span>
          <h1>That lead run does not exist.</h1>
          <p>The address may be incomplete, or the run ID may be invalid.</p>
          <Link className="ds-button ds-button--primary" href="/">
            Return to StoreSignal
          </Link>
        </div>
      </div>
    </main>
  );
}
