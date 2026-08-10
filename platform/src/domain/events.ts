/**
 * W0 — the event spine. Every state transition in a deal is an immutable,
 * timestamped, typed event. Passes (with reason codes) are captured as
 * negative labels alongside bids — see docs/technical-roadmap.md §4 (W0).
 *
 * This is an in-memory reference implementation: the append-only contract
 * (no mutation, no deletion) is what matters, not the storage backend.
 * A production deployment swaps `EventSpine`'s storage for a durable,
 * append-only store without changing any caller.
 */

import type { Id } from "./entities.js";

export type DealEventType =
  | "listing.created"
  | "listing.withdrawn"
  | "nda.executed"
  | "data-room.accessed"
  | "bid.submitted"
  | "bid.countered"
  | "bid.passed"
  | "deal.closed"
  | "deal.withdrawn";

export interface DealEventBase {
  id: Id;
  type: DealEventType;
  listingId: Id;
  occurredAt: string;
  actorCounterpartyId?: Id;
}

export interface PassEvent extends DealEventBase {
  type: "bid.passed";
  reasonCode:
    | "price-too-high"
    | "sector-mismatch"
    | "size-mismatch"
    | "geography-mismatch"
    | "timing"
    | "diligence-flag"
    | "other";
  reasonNote?: string;
}

export type DealEvent = DealEventBase | PassEvent;

/**
 * Append-only event log. `emit` is the only write path; there is
 * deliberately no update or delete method.
 */
export class EventSpine {
  #events: DealEvent[] = [];

  emit(event: DealEvent): DealEvent {
    Object.freeze(event);
    this.#events.push(event);
    return event;
  }

  all(): readonly DealEvent[] {
    return this.#events;
  }

  forListing(listingId: Id): readonly DealEvent[] {
    return this.#events.filter((e) => e.listingId === listingId);
  }

  ofType<T extends DealEventType>(type: T): readonly DealEvent[] {
    return this.#events.filter((e) => e.type === type);
  }

  /** Structured outcome record per closed deal — the seed of the pricing corpus (W0 → W2). */
  outcomeRecord(listingId: Id): {
    listingId: Id;
    bidCount: number;
    passCount: number;
    daysToFirstBid: number | null;
    daysToClose: number | null;
    closed: boolean;
  } {
    const events = this.forListing(listingId);
    const created = events.find((e) => e.type === "listing.created");
    const bids = events.filter((e) => e.type === "bid.submitted");
    const passes = events.filter((e) => e.type === "bid.passed");
    const closed = events.find((e) => e.type === "deal.closed");

    const daysBetween = (a?: string, b?: string): number | null => {
      if (!a || !b) return null;
      const ms = new Date(b).getTime() - new Date(a).getTime();
      return Math.round(ms / (1000 * 60 * 60 * 24));
    };

    const firstBid = bids
      .slice()
      .sort((a, b) => a.occurredAt.localeCompare(b.occurredAt))[0];

    return {
      listingId,
      bidCount: bids.length,
      passCount: passes.length,
      daysToFirstBid: created ? daysBetween(created.occurredAt, firstBid?.occurredAt) : null,
      daysToClose: created ? daysBetween(created.occurredAt, closed?.occurredAt) : null,
      closed: Boolean(closed),
    };
  }
}
