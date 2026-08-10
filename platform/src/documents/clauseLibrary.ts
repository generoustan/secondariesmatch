/**
 * W4 — counsel-approved clause library.
 *
 * Generation is assembly, not authorship (docs/technical-roadmap.md §4 W4,
 * architecture principle P3/P4): every clause that can appear in a T2
 * document is a versioned, counsel-approved artifact looked up by id.
 * There is no free-text clause generation in this module by construction —
 * `assembleDocument` (generator.ts) can only select from what's registered
 * here.
 */

export type TemplateType = "teaser" | "process-letter" | "nda";

export interface ApprovedClause {
  id: string;
  version: number;
  templateTypes: TemplateType[];
  text: string;
}

export type TemplateSlot =
  | { kind: "clause"; clauseId: string }
  | { kind: "variable"; name: string; required: boolean };

export interface DocumentTemplate {
  type: TemplateType;
  version: number;
  slots: TemplateSlot[];
}

const CLAUSES: ApprovedClause[] = [
  {
    id: "confidentiality-standard",
    version: 3,
    templateTypes: ["nda"],
    text:
      "Each party agrees to hold the other party's Confidential Information in strict confidence and to use it " +
      "solely for the purpose of evaluating the proposed transaction.",
  },
  {
    id: "no-solicitation-standard",
    version: 2,
    templateTypes: ["nda"],
    text:
      "During the term of this agreement and for twelve (12) months thereafter, neither party shall solicit for " +
      "employment any employee of the other party introduced in connection with the proposed transaction.",
  },
  {
    id: "process-timeline-standard",
    version: 1,
    templateTypes: ["process-letter"],
    text:
      "Indications of interest are due by the date specified below. The seller reserves the right to accept, " +
      "reject, or negotiate any bid, and to withdraw the opportunity from the process at any time.",
  },
  {
    id: "no-representation-standard",
    version: 2,
    templateTypes: ["teaser", "process-letter"],
    text:
      "This summary is provided for discussion purposes only and does not constitute an offer, a solicitation, " +
      "or a representation as to the accuracy or completeness of the information contained herein.",
  },
];

export function getClause(clauseId: string): ApprovedClause {
  const clause = CLAUSES.find((c) => c.id === clauseId);
  if (!clause) {
    throw new Error(
      `Clause "${clauseId}" is not in the approved library. New terms must route to counsel before ` +
        `they can be used — see requestClauseReview in generator.ts.`,
    );
  }
  return clause;
}

export function clausesForTemplate(type: TemplateType): ApprovedClause[] {
  return CLAUSES.filter((c) => c.templateTypes.includes(type));
}

export const TEMPLATES: Record<TemplateType, DocumentTemplate> = {
  teaser: {
    type: "teaser",
    version: 1,
    slots: [
      { kind: "variable", name: "fundOrCompanyName", required: true },
      { kind: "variable", name: "assetClass", required: true },
      { kind: "variable", name: "overview", required: true },
      { kind: "variable", name: "keyMetrics", required: true },
      { kind: "clause", clauseId: "no-representation-standard" },
    ],
  },
  "process-letter": {
    type: "process-letter",
    version: 1,
    slots: [
      { kind: "variable", name: "fundOrCompanyName", required: true },
      { kind: "variable", name: "bidDueDate", required: true },
      { kind: "clause", clauseId: "process-timeline-standard" },
      { kind: "clause", clauseId: "no-representation-standard" },
    ],
  },
  nda: {
    type: "nda",
    version: 1,
    slots: [
      { kind: "variable", name: "counterpartyLegalName", required: true },
      { kind: "variable", name: "effectiveDate", required: true },
      { kind: "clause", clauseId: "confidentiality-standard" },
      { kind: "clause", clauseId: "no-solicitation-standard" },
    ],
  },
};
