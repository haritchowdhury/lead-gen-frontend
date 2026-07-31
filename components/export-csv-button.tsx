"use client";

import { useEffect, useRef, useState } from "react";

import { DownloadIcon } from "@/components/icons";
import type { Lead, ResultPage } from "@/lib/api-types";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { downloadLeadsCsv } from "@/lib/csv-export";

type ExportCsvButtonProps = {
  runId: string;
  disabled?: boolean;
};

export function ExportCsvButton({
  runId,
  disabled = false,
}: ExportCsvButtonProps) {
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function exportAll() {
    setError(null);
    const controller = new AbortController();
    controllerRef.current = controller;
    const leads: Lead[] = [];

    try {
      let pageNumber = 1;
      let totalPages = 1;
      do {
        setProgress(
          totalPages === 1
            ? "Preparing CSV…"
            : `Fetching page ${pageNumber} of ${totalPages}…`,
        );
        const page = await apiRequest<ResultPage>(
          `/api/runs/${encodeURIComponent(runId)}/results?page=${pageNumber}&pageSize=200`,
          { signal: controller.signal },
        );
        leads.push(...page.items);
        totalPages = page.pagination.totalPages;
        pageNumber += 1;
      } while (pageNumber <= totalPages);

      downloadLeadsCsv(leads, runId);
      setProgress(null);
    } catch (exportError) {
      if ((exportError as { name?: string }).name !== "AbortError") {
        setError(errorMessage(exportError));
      }
      setProgress(null);
    } finally {
      controllerRef.current = null;
    }
  }

  return (
    <div className="export-action">
      <button
        type="button"
        className="button button-dark"
        disabled={disabled || Boolean(progress)}
        onClick={exportAll}
      >
        <DownloadIcon />
        {progress ?? "Export all CSV"}
      </button>
      {error && (
        <span className="export-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

