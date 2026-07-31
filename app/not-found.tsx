import Link from "next/link";

export default function NotFound() {
  return (
    <main className="run-page">
      <div className="shell">
        <div className="fatal-card">
          <span className="eyebrow">404 · Not found</span>
          <h1>That lead run does not exist.</h1>
          <p>The address may be incomplete, or the run ID may be invalid.</p>
          <Link className="button button-primary" href="/">
            Return to StoreSignal
          </Link>
        </div>
      </div>
    </main>
  );
}

