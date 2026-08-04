"use client";

import { useState } from "react";
import { DownloadIcon } from "@/components/icons";
import type { MasterLeadPage } from "@/lib/api-types";
import { parseMasterLeadPage } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { downloadLeadsCsv } from "@/lib/csv-export";

export function MasterExportButton({ search }: { search: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function exportAll() {
    setPending(true); setError(null);
    try {
      const leads = [];
      let page = 1; let totalPages = 1;
      do {
        const query = new URLSearchParams({ page: String(page), pageSize: "200" });
        if (search) query.set("search", search);
        const result = await apiRequest<MasterLeadPage>(`/api/leads?${query}`, {}, parseMasterLeadPage);
        leads.push(...result.items); totalPages = result.pagination.totalPages; page += 1;
      } while (page <= totalPages);
      downloadLeadsCsv(leads, "my-live-leads");
    } catch (reason) { setError(errorMessage(reason)); } finally { setPending(false); }
  }
  return <div className="export-action">
    <button className="button button-dark" type="button" onClick={exportAll} disabled={pending}>
      <DownloadIcon />{pending ? "Preparing CSV…" : "Export live leads"}
    </button>
    {error && <span className="export-error" role="alert">{error}</span>}
  </div>;
}
