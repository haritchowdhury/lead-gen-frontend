import Link from "next/link";

import { SectionIntro } from "@/components/section-intro";

export default function NotFound() {
  return (
    <main className="app-canvas run-page state-page">
      <div className="shell">
        <div className="fatal-card ds-card">
          <SectionIntro
            eyebrow="404 · Not found"
            title="That lead run does not exist."
            copy="The address may be incomplete, or the run ID may be invalid."
          />
          <Link className="ds-button ds-button--primary" href="/">
            Return to StoreSignal
          </Link>
        </div>
      </div>
    </main>
  );
}
