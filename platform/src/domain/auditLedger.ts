/**
 * W7 / §3.4 — hash-chained, append-only audit ledger.
 *
 * Records both human actions and inference events on one timeline, so
 * "who saw what, when, and on what basis" is answerable as a single query
 * (docs/technical-roadmap.md §3.4, §7 W7). Every record is chained to the
 * previous record's hash so any retroactive edit is detectable — this is
 * the concrete "tamper-evident" mechanism the spec calls for.
 */

import { createHash } from "node:crypto";
import type { Id } from "./entities.js";

export type RiskTier = "T0" | "T1" | "T2" | "T3";

export interface LedgerRecordInput {
  capabilityId: string;
  riskTier: RiskTier;
  dealId?: Id;
  actorId: Id;
  action: string;
  /** For AI-assisted entries: model/prompt provenance per §3.4. Omitted for pure human actions. */
  inference?: {
    modelProvider: string;
    modelId: string;
    modelVersion: string;
    promptTemplateVersion: string;
    inputHash: string;
    outputHash: string;
  };
  reviewerId?: string;
  reviewAction?: "accept" | "edit" | "reject";
}

export interface LedgerRecord extends LedgerRecordInput {
  seq: number;
  timestamp: string;
  prevHash: string;
  hash: string;
}

const GENESIS_HASH = "0".repeat(64);

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export class AuditLedger {
  #records: LedgerRecord[] = [];

  append(input: LedgerRecordInput): LedgerRecord {
    const prevHash = this.#records.at(-1)?.hash ?? GENESIS_HASH;
    const seq = this.#records.length;
    const timestamp = new Date().toISOString();

    const payload = JSON.stringify({ ...input, seq, timestamp, prevHash });
    const hash = sha256(payload);

    const record: LedgerRecord = { ...input, seq, timestamp, prevHash, hash };
    Object.freeze(record);
    this.#records.push(record);
    return record;
  }

  all(): readonly LedgerRecord[] {
    return this.#records;
  }

  /** Recomputes every hash from its stored fields and checks the chain — the tamper-evidence check. */
  verifyChain(): { valid: boolean; brokenAtSeq?: number } {
    let expectedPrev = GENESIS_HASH;
    for (const record of this.#records) {
      if (record.prevHash !== expectedPrev) {
        return { valid: false, brokenAtSeq: record.seq };
      }
      const { seq, timestamp, prevHash, hash, ...rest } = record;
      const recomputed = sha256(JSON.stringify({ ...rest, seq, timestamp, prevHash }));
      if (recomputed !== hash) {
        return { valid: false, brokenAtSeq: record.seq };
      }
      expectedPrev = hash;
    }
    return { valid: true };
  }

  /** Reviewer override rate per capability — §3.3's governance-health metric. */
  overrideRate(capabilityId: string): number {
    const reviewed = this.#records.filter(
      (r) => r.capabilityId === capabilityId && r.reviewAction !== undefined,
    );
    if (reviewed.length === 0) return 0;
    const overridden = reviewed.filter((r) => r.reviewAction !== "accept").length;
    return overridden / reviewed.length;
  }
}
