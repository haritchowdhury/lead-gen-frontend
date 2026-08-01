"use client";

import { useEffect, useRef, useState } from "react";

import { DownloadIcon } from "@/components/icons";
import type { ResultPage } from "@/lib/api-types";
import { parseResultPage } from "@/lib/api-validation";
import { apiRequest, errorMessage } from "@/lib/client-api";
import { collectAllLeads, downloadLeadsCsv } from "@/lib/csv-export";

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
    try {
      const leads = await collectAllLeads(async (pageNumber) => {
        return apiRequest<ResultPage>(
          `/api/runs/${encodeURIComponent(runId)}/results?page=${pageNumber}&pageSize=200`,
          { signal: controller.signal },
          parseResultPage,
        );
      }, (pageNumber, totalPages) => {
        setProgress(
          totalPages === 1
            ? "Preparing CSV…"
            : `Fetching page ${pageNumber} of ${totalPages}…`,
        );
      });

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
