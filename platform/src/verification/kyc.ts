/**
 * W6 — deterministic counterparty verification (Phase 0 slice).
 *
 * "Rules and vendors, not models — a screening model with a false negative
 * is a sanctions violation" (docs/technical-roadmap.md §4 W6). This module
 * is intentionally simple rule evaluation, not ML: it is the trust floor
 * that must be excellent before any automation in W1/W2/W5 earns credit.
 * A real deployment swaps the mock sanctions list for a licensed
 * screening vendor without changing the calling contract.
 */

export interface AccreditationInput {
  isQualifiedPurchaser: boolean;
  isAccreditedInvestor: boolean;
  entityType: "institutional" | "individual";
}

export function meetsAccreditation(input: AccreditationInput): boolean {
  if (input.entityType === "institutional") {
    return input.isQualifiedPurchaser || input.isAccreditedInvestor;
  }
  return input.isAccreditedInvestor;
}

export interface SanctionsListEntry {
  normalizedName: string;
  listName: string;
}

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

export interface ScreeningResult {
  matched: boolean;
  matchedEntries: SanctionsListEntry[];
}

/** Exact-normalized-name screening against a mock/licensed sanctions & PEP list. */
export function screenAgainstSanctionsList(
  legalName: string,
  list: SanctionsListEntry[],
): ScreeningResult {
  const target = normalize(legalName);
  const matchedEntries = list.filter((entry) => entry.normalizedName === target);
  return { matched: matchedEntries.length > 0, matchedEntries };
}

export interface CompletenessInput {
  hasLegalEntityDocuments: boolean;
  hasBeneficialOwnershipDisclosure: boolean;
  hasAccreditationEvidence: boolean;
  hasSanctionsScreeningOnFile: boolean;
}

export interface CompletenessResult {
  score: number; // 0..1
  missing: (keyof CompletenessInput)[];
  complete: boolean;
}

export function kycCompleteness(input: CompletenessInput): CompletenessResult {
  const fields = Object.entries(input) as [keyof CompletenessInput, boolean][];
  const missing = fields.filter(([, present]) => !present).map(([key]) => key);
  return {
    score: Number(((fields.length - missing.length) / fields.length).toFixed(2)),
    missing,
    complete: missing.length === 0,
  };
}

export type VerificationDecision = "approved" | "blocked" | "incomplete";

/**
 * The adjudication itself is T3 (docs/technical-roadmap.md §3.2): this
 * function only ever returns evidence-backed decision support. The
 * calling application must still route "blocked"/"incomplete" outcomes to
 * a named human decision-maker rather than auto-rejecting or auto-approving.
 */
export function evaluateCounterparty(
  accreditation: AccreditationInput,
  screening: ScreeningResult,
  completeness: CompletenessResult,
): { decision: VerificationDecision; reasons: string[] } {
  const reasons: string[] = [];

  if (screening.matched) {
    reasons.push(
      `Name matched ${screening.matchedEntries.length} sanctions/PEP list entr${screening.matchedEntries.length === 1 ? "y" : "ies"} — requires manual adjudication before any further action.`,
    );
    return { decision: "blocked", reasons };
  }

  if (!completeness.complete) {
    reasons.push(`KYC file incomplete: missing ${completeness.missing.join(", ")}.`);
    return { decision: "incomplete", reasons };
  }

  if (!meetsAccreditation(accreditation)) {
    reasons.push("Does not meet accreditation/qualified-purchaser threshold.");
    return { decision: "blocked", reasons };
  }

  reasons.push("Passed sanctions/PEP screening, accreditation check, and KYC completeness check.");
  return { decision: "approved", reasons };
}
