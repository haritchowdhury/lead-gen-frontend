import type { Metadata } from "next";
import Link from "next/link";
import { LiveLeadsWorkspace } from "@/components/leads/live-leads-workspace";

export const metadata: Metadata = { title: "My leads" };
export const dynamic = "force-dynamic";

export default function LeadsPage() {
  return <main className="app-canvas run-page run-page-completed"><div className="shell">
    <div className="run-title-row app-page-header"><div><span className="eyebrow">Live lead workspace</span></div><Link className="ds-button ds-button--secondary" href="/runs">View runs</Link></div>
    <LiveLeadsWorkspace />
  </div></main>;
}
