/**
 * S1 (docs/category-strategy.md §2.4) — the Position Ledger.
 *
 * "The first thing we build is not a listings table, it is a portfolio
 * importer" (§2.1). This is that importer's backing store: an event-sourced
 * ledger where the current book is always a pure replay of its event log,
 * never an independently-mutated record. The S1 gate this file exists to
 * satisfy: "full state rebuilt from events matches current state exactly."
 *
 * Citation is enforced structurally, not by convention: every event that
 * introduces or changes a client-document-derived field carries a `Citation`
 * (docs/category-strategy.md §2.2, "No cell is displayed without a
 * citation"), and the reducer only accepts well-formed citations.
 */

import { HashChainedLog, type ChainedEntry } from "../domain/hashChainedLog.js";
import type { Id, Position } from "../domain/entities.js";
import type { Citation, PositionCoreFields, PositionEvent } from "./positionEvents.js";

export class PositionLedgerError extends Error {}

function requireCitation(citation: Citation): void {
  if (!citation.sourceDocId || citation.sourcePage < 1 || !citation.sourceSpan.trim()) {
    throw new PositionLedgerError(
      "A citation (sourceDocId, sourcePage >= 1, non-empty sourceSpan) is required — " +
        "no field derived from a client document may be recorded without one.",
    );
  }
}

/** `exactOptionalPropertyTypes` means an omitted key and `key: undefined` are distinct — only set the key when present. */
function citationFields(citation: Citation): Pick<Position, "sourceDocId" | "sourcePage" | "sourceSpan"> &
  Partial<Pick<Position, "extractionConfidence">> {
  const fields: Pick<Position, "sourceDocId" | "sourcePage" | "sourceSpan"> &
    Partial<Pick<Position, "extractionConfidence">> = {
    sourceDocId: citation.sourceDocId,
    sourcePage: citation.sourcePage,
    sourceSpan: citation.sourceSpan,
  };
  if (citation.extractionConfidence !== undefined) {
    fields.extractionConfidence = citation.extractionConfidence;
  }
  return fields;
}

/**
 * Pure reducer: replays a sequence of events into the resulting position
 * map. This is deliberately the *only* place current state is computed —
 * `PositionLedger` below calls this exact function for both live updates
 * and full-history rebuilds, so there is no way for the two to drift apart.
 */
export function applyPositionEvents(events: readonly PositionEvent[]): Map<Id, Position> {
  const positions = new Map<Id, Position>();

  for (const event of events) {
    switch (event.type) {
      case "position.created": {
        if (positions.has(event.positionId)) {
          throw new PositionLedgerError(`Position "${event.positionId}" already exists.`);
        }
        requireCitation(event.citation);
        const position: Position = {
          positionId: event.positionId,
          ...event.fields,
          ...citationFields(event.citation),
          recordStatus: "draft",
        };
        positions.set(event.positionId, position);
        break;
      }

      case "position.confirmed": {
        const existing = positions.get(event.positionId);
        if (!existing) throw new PositionLedgerError(`Unknown position "${event.positionId}".`);
        if (!existing.sourceSpan) {
          throw new PositionLedgerError(
            `Position "${event.positionId}" cannot be confirmed without an existing citation.`,
          );
        }
        positions.set(event.positionId, {
          ...existing,
          confirmedBy: event.confirmedBy,
          confirmedAt: event.occurredAt,
          recordStatus: "confirmed",
        });
        break;
      }

      case "position.transferability-updated": {
        const existing = positions.get(event.positionId);
        if (!existing) throw new PositionLedgerError(`Unknown position "${event.positionId}".`);
        requireCitation(event.citation);
        const transferabilityUpdate: Partial<Position> = {
          transferabilityState: event.transferabilityState,
          consentState: event.consentState,
          rofrState: event.rofrState,
        };
        if (event.restrictionExpiry !== undefined) transferabilityUpdate.restrictionExpiry = event.restrictionExpiry;
        if (event.noticePeriodDays !== undefined) transferabilityUpdate.noticePeriodDays = event.noticePeriodDays;
        positions.set(event.positionId, {
          ...existing,
          ...transferabilityUpdate,
          ...citationFields(event.citation),
        });
        break;
      }

      case "position.nav-updated": {
        const existing = positions.get(event.positionId);
        if (!existing) throw new PositionLedgerError(`Unknown position "${event.positionId}".`);
        requireCitation(event.citation);
        positions.set(event.positionId, {
          ...existing,
          reportedNav: event.reportedNav,
          navAsOf: event.navAsOf,
          ...citationFields(event.citation),
        });
        break;
      }

      case "position.archived": {
        const existing = positions.get(event.positionId);
        if (!existing) throw new PositionLedgerError(`Unknown position "${event.positionId}".`);
        positions.set(event.positionId, { ...existing, recordStatus: "archived" });
        break;
      }
    }
  }

  return positions;
}

export class PositionLedger {
  #log = new HashChainedLog<PositionEvent>();
  #state = new Map<Id, Position>();

  private emit(event: PositionEvent): void {
    // Validate against a fresh replay of (history + this event) before committing —
    // this guarantees the live `#state` can never diverge from what a full
    // rebuild would produce, since it *is* a rebuild, incrementally applied.
    const projected = applyPositionEvents([...this.#log.all().map((e) => e.payload), event]);
    this.#log.append(event);
    this.#state = projected;
  }

  createPosition(positionId: Id, fields: PositionCoreFields, citation: Citation, occurredAt = new Date().toISOString()): Position {
    this.emit({ type: "position.created", positionId, occurredAt, fields, citation });
    return this.#state.get(positionId)!;
  }

  confirmPosition(positionId: Id, confirmedBy: string, occurredAt = new Date().toISOString()): Position {
    this.emit({ type: "position.confirmed", positionId, occurredAt, confirmedBy });
    return this.#state.get(positionId)!;
  }

  updateTransferability(
    positionId: Id,
    update: Pick<Position, "transferabilityState" | "consentState" | "rofrState" | "restrictionExpiry" | "noticePeriodDays">,
    citation: Citation,
    confirmedBy: string,
    occurredAt = new Date().toISOString(),
  ): Position {
    this.emit({ type: "position.transferability-updated", positionId, occurredAt, ...update, citation, confirmedBy });
    return this.#state.get(positionId)!;
  }

  updateNav(positionId: Id, reportedNav: number, navAsOf: string, citation: Citation, occurredAt = new Date().toISOString()): Position {
    this.emit({ type: "position.nav-updated", positionId, occurredAt, reportedNav, navAsOf, citation });
    return this.#state.get(positionId)!;
  }

  archive(positionId: Id, reason: string, occurredAt = new Date().toISOString()): Position {
    this.emit({ type: "position.archived", positionId, occurredAt, reason });
    return this.#state.get(positionId)!;
  }

  getPosition(positionId: Id): Position | undefined {
    return this.#state.get(positionId);
  }

  currentPositions(): Position[] {
    return [...this.#state.values()];
  }

  events(): readonly ChainedEntry<PositionEvent>[] {
    return this.#log.all();
  }

  verifyChain() {
    return this.#log.verifyChain();
  }

  /** The S1 gate, made callable: replays this ledger's full history and compares to live state. */
  rebuildMatchesLiveState(): boolean {
    const rebuilt = applyPositionEvents(this.#log.all().map((e) => e.payload));
    if (rebuilt.size !== this.#state.size) return false;
    for (const [id, position] of rebuilt) {
      if (JSON.stringify(position) !== JSON.stringify(this.#state.get(id))) return false;
    }
    return true;
  }
}
