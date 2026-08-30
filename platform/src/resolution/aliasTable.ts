/**
 * S1 (docs/category-strategy.md §2.4) — entity resolution v0.
 *
 * "A human-confirmed alias table with fuzzy candidate generation —
 * explicitly not an ML resolver yet" (S1 build description), and
 * "no ML entity resolution" is named explicitly in §2.5's anti-scope: "a
 * human-confirmed alias table will carry us far past the first hundred
 * positions and produces the labels an ML resolver would eventually need."
 *
 * Two distinct mechanisms, deliberately not conflated:
 * 1. Normalization (deterministic, rule-based: case, punctuation, legal
 *    suffixes) — an exact match after normalization resolves automatically.
 *    This is a fixed rule, not a guess.
 * 2. Fuzzy similarity — anything short of a normalized exact match is only
 *    ever a *candidate*. It never resolves on its own; a human must call
 *    `confirmAlias` before `resolve` will recognize it. This is the load-
 *    bearing distinction: the table never silently merges two entities.
 */

const LEGAL_SUFFIXES = new Set([
  "lp", "llp", "llc", "ltd", "inc", "corp", "corporation", "limited", "co", "plc",
]);

export function normalizeEntityName(name: string): string {
  const stripped = name
    .toLowerCase()
    .trim()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ");
  const tokens = stripped.split(" ").filter((token) => token.length > 0 && !LEGAL_SUFFIXES.has(token));
  return tokens.join(" ");
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i]![0] = i;
  for (let j = 0; j <= b.length; j++) dp[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
    }
  }
  return dp[a.length]![b.length]!;
}

/** 1.0 = identical after normalization, 0.0 = maximally different. */
export function nameSimilarity(a: string, b: string): number {
  const na = normalizeEntityName(a);
  const nb = normalizeEntityName(b);
  if (na === nb) return 1;
  const maxLen = Math.max(na.length, nb.length) || 1;
  return Math.max(0, 1 - levenshtein(na, nb) / maxLen);
}

export interface AliasCandidate {
  canonicalId: string;
  canonicalName: string;
  score: number;
}

export interface AliasConfirmation {
  alias: string;
  canonicalId: string;
  confirmedBy: string;
  confirmedAt: string;
}

const DEFAULT_CANDIDATE_THRESHOLD = 0.6;

export class AliasTable {
  #canonicalNames = new Map<string, string>(); // canonicalId -> display name
  #resolvedAliases = new Map<string, string>(); // normalized alias -> canonicalId
  #confirmations: AliasConfirmation[] = [];

  /** Registers a canonical entity. Its own name resolves immediately — this is not a "guess," it's the source of truth. */
  registerCanonical(canonicalId: string, name: string): void {
    this.#canonicalNames.set(canonicalId, name);
    this.#resolvedAliases.set(normalizeEntityName(name), canonicalId);
  }

  /** Deterministic exact-after-normalization lookup only. Never a fuzzy guess. */
  resolve(name: string): string | undefined {
    return this.#resolvedAliases.get(normalizeEntityName(name));
  }

  /** Ranked fuzzy candidates for a human to review — never applied automatically. */
  generateCandidates(name: string, threshold = DEFAULT_CANDIDATE_THRESHOLD, limit = 5): AliasCandidate[] {
    const candidates: AliasCandidate[] = [];
    for (const [canonicalId, canonicalName] of this.#canonicalNames) {
      const score = nameSimilarity(name, canonicalName);
      if (score >= threshold) candidates.push({ canonicalId, canonicalName, score });
    }
    return candidates.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /** The only way a fuzzy candidate becomes resolvable: a named human confirms it. */
  confirmAlias(alias: string, canonicalId: string, confirmedBy: string): AliasConfirmation {
    if (!this.#canonicalNames.has(canonicalId)) {
      throw new Error(`Cannot confirm an alias to unknown canonical entity "${canonicalId}".`);
    }
    this.#resolvedAliases.set(normalizeEntityName(alias), canonicalId);
    const confirmation: AliasConfirmation = { alias, canonicalId, confirmedBy, confirmedAt: new Date().toISOString() };
    this.#confirmations.push(confirmation);
    return confirmation;
  }

  confirmations(): readonly AliasConfirmation[] {
    return this.#confirmations;
  }
}
