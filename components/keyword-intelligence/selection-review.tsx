"use client";

import { useEffect, useRef, useState } from "react";

import type {
  KeywordFacets,
  KeywordLane,
  ResearchView,
  SelectionConflict,
  SelectionItem,
} from "@/lib/keyword-intelligence-types";
import {
  addManualSelectedItem,
  canFinalizeSelection,
  editSelectedItemText,
  laneLabel,
  removeSelectedItem,
  selectionOverLimit,
} from "@/lib/keyword-intelligence-view-model";

import styles from "./keyword-dashboard.module.css";

const SELECTION_ITEM_CAP = 200;
const MAX_ITEM_LENGTH = 160;

type SelectionReviewProps = {
  view: ResearchView;
  draft: SelectionItem[];
  conflicts: SelectionConflict[];
  saving: boolean;
  staleConflict: boolean;
  onSave: () => void;
  onFinalize: () => void;
  finalizeState: "idle" | "handing-off" | "succeeded" | "definitive_failure" | "retry_required";
  onRetryHandoff: () => void;
  onDraftChange: (draft: SelectionItem[]) => void;
};

type Reclassified = {
  lane: KeywordLane;
  facets: KeywordFacets;
};

function parseKeywordLines(value: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of String(value ?? "").split(/[\n,]+/u)) {
    const collapsed = raw.normalize("NFKC").replace(/\s+/gu, " ").trim();
    if (!collapsed) continue;
    const key = collapsed.toLocaleLowerCase("en-US");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(collapsed);
  }
  return result;
}

function facetChips(facets: KeywordFacets): string[] {
  const values: string[] = [];
  for (const key of ["audience", "category", "channel", "fit", "modifier"] as const) {
    for (const value of facets[key]) {
      if (value && values.indexOf(value) === -1) values.push(value);
    }
  }
  return values;
}

function similarityLabel(similarity: number): string {
  return `${Math.round(similarity * 100)}% similar`;
}

function reasonLabel(reason: SelectionConflict["pairs"][number]["reason"]): string {
  return reason === "compact" ? "Exact duplicate" : "Similar";
}

export function SelectionReview({
  view,
  draft,
  conflicts,
  saving,
  staleConflict,
  onSave,
  onFinalize,
  finalizeState,
  onRetryHandoff,
  onDraftChange,
}: SelectionReviewProps) {
  const [manualInput, setManualInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualKeyCounter = useRef(0);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const gate = canFinalizeSelection(view, draft);
  const overLimit = selectionOverLimit(draft);
  const controlsInert =
    finalizeState === "handing-off" ||
    finalizeState === "retry_required" ||
    finalizeState === "succeeded";

  const editingItem =
    editingId !== null ? draft.find((item) => item.itemId === editingId) ?? null : null;
  const reclassified: Reclassified | null = editingItem
    ? editSelectedItemText(draft, editingItem.itemId, editText).reclassified
    : null;

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }

  function closeDialog() {
    setEditingId(null);
    setEditText("");
  }

  function beginPhraseEdit(item: SelectionItem) {
    setEditingId(item.itemId);
    setEditText(item.keyword);
  }

  function commitEdit() {
    if (!editingItem) return;
    const trimmed = editText.normalize("NFKC").replace(/\s+/gu, " ").trim();
    if (!trimmed) return;
    if ([...trimmed].length > MAX_ITEM_LENGTH) {
      showToast("Each keyword must be 1-160 characters after normalization.");
      return;
    }
    const duplicate = draft.some(
      (item) =>
        item.itemId !== editingItem.itemId &&
        item.keyword.toLocaleLowerCase("en-US") === trimmed.toLocaleLowerCase("en-US"),
    );
    if (duplicate) {
      showToast("That phrase is already selected");
      return;
    }
    const result = editSelectedItemText(draft, editingItem.itemId, trimmed);
    onDraftChange(result.draft);
    closeDialog();
    showToast("Phrase updated");
  }

  function addManualKeywords() {
    const lines = parseKeywordLines(manualInput);
    if (!lines.length) return;
    const firstSeed = view.seeds[0] ?? lines[0];
    let next = draft;
    let added = 0;
    let duplicate = false;
    for (const line of lines) {
      if ([...line].length > MAX_ITEM_LENGTH) {
        showToast("Each keyword must be 1-160 characters after normalization.");
        return;
      }
      if (next.length >= SELECTION_ITEM_CAP) {
        showToast("You can select up to 200 keywords.");
        return;
      }
      const exists = next.some(
        (item) => item.keyword.toLocaleLowerCase("en-US") === line.toLocaleLowerCase("en-US"),
      );
      if (exists) {
        duplicate = true;
        continue;
      }
      let itemId = "";
      do {
        manualKeyCounter.current += 1;
        itemId = `draft_${manualKeyCounter.current}`;
      } while (next.some((item) => item.itemId === itemId));
      next = addManualSelectedItem(next, line, itemId, firstSeed);
      added += 1;
    }
    if (added === 0 && duplicate) {
      showToast("That phrase is already selected");
      return;
    }
    if (added === 0) return;
    onDraftChange(next);
    setManualInput("");
    showToast(added === 1 ? "Manual keyword added" : `${added} keywords added`);
  }

  function removeItem(itemId: string) {
    onDraftChange(removeSelectedItem(draft, itemId));
  }

  function keywordById(itemId: string): string {
    const item = draft.find((entry) => entry.itemId === itemId);
    return item ? item.keyword : itemId;
  }

  const gateHint =
    gate.reason === "conflicts"
      ? "Resolve the duplicate pairs below to enable finalize."
      : gate.reason === "over_limit"
        ? "Reduce the set to 100 keywords or fewer to enable finalize."
        : gate.reason === "empty"
          ? "Add at least one keyword to enable finalize."
          : "";

  return (
    <section
      className={`${styles.kiDashboard} ${styles.decisionPanel} ${styles.wide}`}
      aria-label="Selection review"
    >
      <div className={styles.sectionHead}>
        <div>
          <h2>Your selection</h2>
          <div className={styles.tableMeta}>
            {draft.length} of {SELECTION_ITEM_CAP} selected · edited here, saved to the
            research, and locked by finalize
          </div>
        </div>
      </div>

      {staleConflict && (
        <div className={styles.banner} role="alert">
          <span>
            Your selection changed on the server. Reload the dashboard to review the latest
            version before saving again.
          </span>
        </div>
      )}

      {overLimit && (
        <div className={styles.banner} role="alert">
          <span>
            You&apos;ve selected {draft.length} keywords (over 100). Finalize is blocked
            until you trim the set to 100 or fewer.
          </span>
        </div>
      )}

      <div className={styles.seedFieldLabel}>
        <span>Selected keywords</span>
        <small>Rank · source · lane · facets</small>
      </div>

      <div
        className={styles.seedChipField}
        style={{ flexDirection: "column", alignItems: "stretch" }}
        aria-live="polite"
      >
        {draft.length === 0 ? (
          <div className={styles.seedEmpty}>
            No keywords selected yet. Select rows from the keyword table or add a manual keyword
            below.
          </div>
        ) : (
          draft.map((item, index) => (
            <div
              key={item.itemId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                padding: "7px 9px",
                border: "1px solid var(--border)",
                borderRadius: "9px",
                background: "var(--card)",
              }}
            >
              <span style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                {index + 1}.
              </span>
              <strong>{item.keyword}</strong>
              <span className={`${styles.badge} ${item.sourceKind === "manual" ? styles.no : styles.rec}`}>
                {item.sourceKind === "manual" ? "Manual" : "Calculated"}
              </span>
              <span className={styles.badge}>{laneLabel(item.lane)}</span>
              {facetChips(item.facets).map((chip) => (
                <span className={styles.badge} key={chip}>
                  {chip}
                </span>
              ))}
              <span style={{ marginLeft: "auto", display: "inline-flex", gap: "4px" }}>
                {item.sourceKind === "calculated" && (
                  <button
                    type="button"
                    className={styles.chipEdit}
                    title={`Update ${item.keyword}`}
                    aria-label={`Update ${item.keyword}`}
                    onClick={() => beginPhraseEdit(item)}
                    disabled={controlsInert}
                  >
                    ✎
                  </button>
                )}
                <button
                  type="button"
                  className={styles.chipDelete}
                  title={`Remove ${item.keyword}`}
                  aria-label={`Remove ${item.keyword}`}
                  onClick={() => removeItem(item.itemId)}
                  disabled={controlsInert}
                >
                  ×
                </button>
              </span>
            </div>
          ))
        )}
      </div>

      <div className={styles.manualKeywordRow}>
        <input
          className={styles.manualKeywordInput}
          type="text"
          autoComplete="off"
          value={manualInput}
          onChange={(event) => {
            setManualInput(event.target.value);
            setToast(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addManualKeywords();
            }
          }}
          placeholder="Add a manual keyword…"
          aria-label="Manual keyword"
          disabled={controlsInert}
        />
        <button className={styles.btn} type="button" onClick={addManualKeywords} disabled={controlsInert}>
          ＋ Add
        </button>
      </div>

      {conflicts.length > 0 && (
        <div className={styles.warningList} role="alert">
          <div className={styles.warningHeading}>
            <strong>Possible duplicate pairs in your selection</strong>
            <span className={styles.warningRisk}>Blocks finalize</span>
          </div>
          {conflicts.map((conflict) => (
            <div className={styles.warningItem} key={conflict.conflictId}>
              {conflict.pairs.map((pair) => (
                <div
                  key={`${pair.leftItemId}:${pair.rightItemId}`}
                  style={{ margin: "3px 0", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
                >
                  <span>&ldquo;{keywordById(pair.leftItemId)}&rdquo; vs &ldquo;{keywordById(pair.rightItemId)}&rdquo;</span>
                  <span className={styles.badge}>{reasonLabel(pair.reason)}</span>
                  <span className={styles.badge}>{similarityLabel(pair.similarity)}</span>
                </div>
              ))}
              <div className={styles.warningCopy}>
                {conflict.canonicalItemId ? (
                  <span className={styles.warningSeed}>
                    Suggested keep: &ldquo;{keywordById(conflict.canonicalItemId)}&rdquo;
                  </span>
                ) : (
                  <span className={styles.warningSeed}>Remove one keyword from each pair to resolve.</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.seedFormFooter}>
        <p>Save persists this selection. Finalize locks it in and hands off to a run.</p>
        <div className={styles.keywordTools}>
          <button
            className={styles.btn}
            type="button"
            disabled={saving || staleConflict || controlsInert}
            aria-busy={saving}
            onClick={onSave}
          >
            {saving ? "Saving…" : "Save selection"}
          </button>
          <button
            className={`${styles.btn} ${styles.primary}`}
            type="button"
            disabled={!gate.ok || saving || staleConflict || controlsInert}
            aria-busy={finalizeState === "handing-off"}
            title={!gate.ok ? gateHint : undefined}
            onClick={onFinalize}
          >
            {finalizeState === "handing-off" ? "Handing off…" : "Finalize & start run →"}
          </button>
        </div>
        {finalizeState === "retry_required" && (
          <div className={styles.banner} role="alert">
            <span>The run request didn&apos;t complete. Retry the same run.</span>
            <button className={styles.btn} type="button" onClick={onRetryHandoff}>
              Retry
            </button>
          </div>
        )}
        {!gate.ok && gateHint && (
          <div className={styles.tableMeta}>{gateHint}</div>
        )}
      </div>

      {editingItem && (
        <div
          className={styles.keywordDialog}
          role="dialog"
          aria-modal="true"
          aria-label="Edit keyword"
        >
          <div className={styles.keywordDialogCard}>
            <button
              type="button"
              className={styles.dialogClose}
              aria-label="Close"
              onClick={closeDialog}
            >
              ×
            </button>
            <div className={styles.dialogTopline}>
              <span className={styles.dialogEyebrow}>Refine this keyword</span>
            </div>
            <h2>Make this search phrase work harder.</h2>
            <div className={styles.composerLabel}>
              <span>Edit the selected keyword</span>
              <small>Original: {editingItem.originalKeyword}</small>
            </div>
            <textarea
              className={styles.keywordInput}
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              aria-label="Edited keyword"
            />
            <div className={styles.composerMeta}>
              <span>Reclassified before commit</span>
              <small>{reclassified ? `${[...editText].length}/160 characters` : ""}</small>
            </div>
            {reclassified && (
              <div className={styles.inspiration}>
                <span className={styles.inspirationLabel}>Lane:</span>
                <span className={styles.suggestionChip}>{laneLabel(reclassified.lane)}</span>
                {facetChips(reclassified.facets).map((chip) => (
                  <span className={styles.suggestionChip} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            )}
            <div className={styles.dialogFooter}>
              <p>Your edit reclassifies lane and facets. The original keyword is preserved.</p>
              <span className={styles.keywordTools}>
                <button className={styles.btn} type="button" onClick={closeDialog}>
                  Cancel
                </button>
                <button
                  className={`${styles.btn} ${styles.primary}`}
                  type="button"
                  onClick={commitEdit}
                >
                  Save keyword →
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}
    </section>
  );
}
