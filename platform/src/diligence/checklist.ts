/**
 * W3 — automated diligence checklist (lite).
 *
 * The full workstream (OCR, layout-aware parsing, span-level clause
 * extraction) requires a document-intelligence pipeline this reference
 * implementation does not stand up. What's implemented here is the
 * deterministic, immediately useful slice: verifying which required
 * documents are present for a given deal kind, and a small set of
 * rule-based red flags that don't require reading document contents.
 * Every finding is a plain rule, not an inference — appropriately T0/T1
 * per docs/technical-roadmap.md §3.2, since there is no model in this module.
 */

import type { DealKind, DocumentRecord } from "../domain/entities.js";

const REQUIRED_DOCUMENTS: Record<DealKind, DocumentRecord["kind"][]> = {
  "lp-interest": ["lpa", "capital-account-statement", "quarterly-report", "nda"],
  "gp-led-continuation": ["lpa", "capital-account-statement", "transfer-agreement", "nda"],
  "direct-stake": ["subscription-doc", "capital-account-statement", "nda"],
};

export interface ChecklistResult {
  dealKind: DealKind;
  required: DocumentRecord["kind"][];
  present: DocumentRecord["kind"][];
  missing: DocumentRecord["kind"][];
  complete: boolean;
}

export function verifyChecklist(dealKind: DealKind, documents: DocumentRecord[]): ChecklistResult {
  const required = REQUIRED_DOCUMENTS[dealKind];
  const presentKinds = new Set(documents.map((d) => d.kind));
  const present = required.filter((k) => presentKinds.has(k));
  const missing = required.filter((k) => !presentKinds.has(k));

  return {
    dealKind,
    required,
    present,
    missing,
    complete: missing.length === 0,
  };
}

export interface RedFlag {
  code: "nav-stale" | "capital-account-mismatch";
  detail: string;
}

/** NAV staleness: a reported NAV reference date older than the threshold is a documented red flag. */
export function checkNavStaleness(
  navReferenceDate: string,
  asOf: Date = new Date(),
  maxAgeDays = 120,
): RedFlag | null {
  const ageDays = Math.round((asOf.getTime() - new Date(navReferenceDate).getTime()) / (1000 * 60 * 60 * 24));
  if (ageDays > maxAgeDays) {
    return {
      code: "nav-stale",
      detail: `Reported NAV is ${ageDays} days old as of review, exceeding the ${maxAgeDays}-day freshness threshold.`,
    };
  }
  return null;
}

/** Capital account reconciliation: reported NAV vs. capital account statement should reconcile within tolerance. */
export function checkCapitalAccountReconciliation(
  reportedNav: number,
  capitalAccountBalance: number,
  toleranceBp = 200,
): RedFlag | null {
  const diffBp = Math.abs((reportedNav - capitalAccountBalance) / reportedNav) * 10_000;
  if (diffBp > toleranceBp) {
    return {
      code: "capital-account-mismatch",
      detail: `Reported NAV differs from capital account balance by ${(diffBp / 100).toFixed(2)}%, exceeding the ${(toleranceBp / 100).toFixed(2)}% reconciliation tolerance.`,
    };
  }
  return null;
}
