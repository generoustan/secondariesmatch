/**
 * W4 — clause-locked document generation.
 *
 * `assembleDocument` fills narrative variable slots and inserts approved
 * clauses verbatim; it cannot invent a clause. Any generated document is
 * T2 (docs/technical-roadmap.md §3.2): it requires a named reviewer's
 * sign-off, recorded via `signOff`, before it may be transmitted to a
 * counterparty. `requestClauseReview` models the "unapproved term routes
 * to counsel" escalation path from §4 (W4) rather than silently allowing
 * free-text legal drafting.
 */

import { TEMPLATES, getClause, type TemplateType } from "./clauseLibrary.js";

export interface GeneratedSection {
  kind: "clause" | "variable";
  ref: string;
  text: string;
  clauseVersion?: number;
}

export interface GeneratedDocument {
  templateType: TemplateType;
  templateVersion: number;
  sections: GeneratedSection[];
  fullText: string;
  generatedAt: string;
  signedOffBy?: string;
}

export function assembleDocument(
  templateType: TemplateType,
  variables: Record<string, string>,
): GeneratedDocument {
  const template = TEMPLATES[templateType];
  const sections: GeneratedSection[] = [];

  for (const slot of template.slots) {
    if (slot.kind === "clause") {
      const clause = getClause(slot.clauseId);
      sections.push({ kind: "clause", ref: clause.id, text: clause.text, clauseVersion: clause.version });
    } else {
      const value = variables[slot.name];
      if (slot.required && (value === undefined || value.trim() === "")) {
        throw new Error(`Missing required variable "${slot.name}" for template "${templateType}".`);
      }
      sections.push({ kind: "variable", ref: slot.name, text: value ?? "" });
    }
  }

  return {
    templateType,
    templateVersion: template.version,
    sections,
    fullText: sections.map((s) => s.text).join("\n\n"),
    generatedAt: new Date().toISOString(),
  };
}

/** Named-individual sign-off, required before any T2 document may be transmitted (§3.3). */
export function signOff(document: GeneratedDocument, reviewerId: string): GeneratedDocument {
  return { ...document, signedOffBy: reviewerId };
}

export function isReadyToTransmit(document: GeneratedDocument): boolean {
  return Boolean(document.signedOffBy);
}

/**
 * A requested term outside the approved clause library routes to counsel —
 * it is never silently generated. Returns a routing record rather than text.
 */
export function requestClauseReview(proposedText: string, requestedBy: string): {
  status: "pending-counsel-review";
  proposedText: string;
  requestedBy: string;
  requestedAt: string;
} {
  return {
    status: "pending-counsel-review",
    proposedText,
    requestedBy,
    requestedAt: new Date().toISOString(),
  };
}

/**
 * Redline volume (§4 W4 KPI): word-level edit distance between the
 * generated draft and what the reviewer actually sent. A falling curve
 * over time is the automation dividend made visible.
 */
export function redlineDistance(generated: GeneratedDocument, finalText: string): number {
  const a = generated.fullText.split(/\s+/).filter(Boolean);
  const b = finalText.split(/\s+/).filter(Boolean);
  return wordLevenshtein(a, b);
}

function wordLevenshtein(a: string[], b: string[]): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i]![0] = i;
  for (let j = 0; j <= b.length; j++) dp[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]!;
      } else {
        dp[i]![j] = 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
      }
    }
  }
  return dp[a.length]![b.length]!;
}
