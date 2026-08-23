/**
 * The single writer library behind every append-only log in this codebase
 * (docs/category-strategy.md §2.4, S1: "hash-chained append-only event log
 * with a single writer library"). `AuditLedger` and the Position event spine
 * both wrap this rather than each hand-rolling their own hash chain — one
 * implementation to test, one implementation to trust.
 */

import { createHash } from "node:crypto";

export const GENESIS_HASH = "0".repeat(64);

/**
 * The one hashing primitive every chained log in this codebase uses. Callers
 * pass the exact plain object whose fields make up one chain link (payload
 * plus its seq/timestamp/prevHash); `AuditLedger` and `HashChainedLog` both
 * call this rather than each rolling its own `JSON.stringify` + digest.
 */
export function chainHash(fields: Record<string, unknown>): string {
  return createHash("sha256").update(JSON.stringify(fields)).digest("hex");
}

export interface ChainedEntry<T> {
  seq: number;
  timestamp: string;
  prevHash: string;
  hash: string;
  payload: T;
}

export interface ChainVerification {
  valid: boolean;
  brokenAtSeq?: number;
}

export class HashChainedLog<T> {
  #entries: ChainedEntry<T>[] = [];

  append(payload: T): ChainedEntry<T> {
    const prevHash = this.#entries.at(-1)?.hash ?? GENESIS_HASH;
    const seq = this.#entries.length;
    const timestamp = new Date().toISOString();
    const hash = chainHash({ payload, seq, timestamp, prevHash });

    const entry: ChainedEntry<T> = { seq, timestamp, prevHash, hash, payload };
    Object.freeze(entry);
    this.#entries.push(entry);
    return entry;
  }

  all(): readonly ChainedEntry<T>[] {
    return this.#entries;
  }

  /** Recomputes every hash from its stored fields and checks the chain. */
  verifyChain(): ChainVerification {
    let expectedPrev = GENESIS_HASH;
    for (const entry of this.#entries) {
      if (entry.prevHash !== expectedPrev) {
        return { valid: false, brokenAtSeq: entry.seq };
      }
      const recomputed = chainHash({
        payload: entry.payload,
        seq: entry.seq,
        timestamp: entry.timestamp,
        prevHash: entry.prevHash,
      });
      if (recomputed !== entry.hash) {
        return { valid: false, brokenAtSeq: entry.seq };
      }
      expectedPrev = entry.hash;
    }
    return { valid: true };
  }
}
