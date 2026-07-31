"use client";

import { useEffect, useState } from "react";

import { SearchIcon } from "@/components/icons";
import type { LeadStatus, ResultFilters } from "@/lib/api-types";

type FilterPatch = Partial<ResultFilters>;

type ResultsFiltersProps = {
  filters: ResultFilters;
  onChange: (patch: FilterPatch) => void;
  counts: {
    total: number;
    qualified: number;
    rejected: number;
    failed: number;
  };
};

const STATUS_OPTIONS: Array<{
  value: LeadStatus | "";
  label: string;
  countKey: keyof ResultsFiltersProps["counts"];
}> = [
  { value: "", label: "All leads", countKey: "total" },
  { value: "qualified", label: "Qualified", countKey: "qualified" },
  { value: "rejected", label: "Rejected", countKey: "rejected" },
  { value: "failed", label: "Failed", countKey: "failed" },
];

export function ResultsFilters({
  filters,
  onChange,
  counts,
}: ResultsFiltersProps) {
  const [search, setSearch] = useState(filters.search);
  const [lastFilterSearch, setLastFilterSearch] = useState(filters.search);

  if (filters.search !== lastFilterSearch) {
    setLastFilterSearch(filters.search);
    setSearch(filters.search);
  }

  useEffect(() => {
    if (search === filters.search) return;
    const timer = window.setTimeout(
      () => onChange({ search: search.trim(), page: 1 }),
      350,
    );
    return () => window.clearTimeout(timer);
  }, [filters.search, onChange, search]);

  return (
    <div className="results-controls">
      <div className="status-tabs" role="group" aria-label="Filter by lead status">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            className={filters.status === option.value ? "is-selected" : ""}
            onClick={() => onChange({ status: option.value, page: 1 })}
          >
            {option.label}
            <span>{counts[option.countKey]}</span>
          </button>
        ))}
      </div>

      <div className="filter-tools">
        <label className="search-field">
          <SearchIcon />
          <span className="sr-only">Search leads</span>
          <input
            type="search"
            value={search}
            maxLength={200}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search store, domain, email…"
          />
        </label>
        <label className="select-field">
          <span className="sr-only">Sort leads</span>
          <select
            value={`${filters.sortBy}:${filters.sortDirection}`}
            onChange={(event) => {
              const [sortBy, sortDirection] = event.target.value.split(":") as [
                ResultFilters["sortBy"],
                ResultFilters["sortDirection"],
              ];
              onChange({ sortBy, sortDirection, page: 1 });
            }}
          >
            <option value="lead_score:desc">Lead score · High to low</option>
            <option value="lead_score:asc">Lead score · Low to high</option>
            <option value="store_name:asc">Store name · A to Z</option>
            <option value="store_name:desc">Store name · Z to A</option>
            <option value="shop_type:asc">Category · A to Z</option>
            <option value="google_rank:asc">Google rank · Best first</option>
          </select>
        </label>
      </div>
    </div>
  );
}
