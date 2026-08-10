import { describe, it, expect } from "vitest";
import { EventSpine, type DealEvent } from "../src/domain/events.js";

describe("EventSpine", () => {
  it("is append-only: emitted events are frozen and retained in order", () => {
    const spine = new EventSpine();
    const e1 = spine.emit({
      id: "e1",
      type: "listing.created",
      listingId: "l1",
      occurredAt: "2026-01-01T00:00:00.000Z",
    });

    expect(Object.isFrozen(e1)).toBe(true);
    expect(() => {
      e1.type = "deal.closed";
    }).toThrow();

    spine.emit({
      id: "e2",
      type: "bid.submitted",
      listingId: "l1",
      occurredAt: "2026-01-05T00:00:00.000Z",
      actorCounterpartyId: "buyer-1",
    });

    expect(spine.all()).toHaveLength(2);
    expect(spine.all()[0]!.id).toBe("e1");
  });

  it("filters events by listing and by type", () => {
    const spine = new EventSpine();
    spine.emit({ id: "e1", type: "listing.created", listingId: "l1", occurredAt: "2026-01-01T00:00:00.000Z" });
    spine.emit({ id: "e2", type: "listing.created", listingId: "l2", occurredAt: "2026-01-01T00:00:00.000Z" });
    spine.emit({ id: "e3", type: "bid.submitted", listingId: "l1", occurredAt: "2026-01-03T00:00:00.000Z" });

    expect(spine.forListing("l1")).toHaveLength(2);
    expect(spine.ofType("bid.submitted")).toHaveLength(1);
  });

  it("captures pass events with reason codes as first-class labels", () => {
    const spine = new EventSpine();
    const pass = spine.emit({
      id: "e1",
      type: "bid.passed",
      listingId: "l1",
      occurredAt: "2026-01-02T00:00:00.000Z",
      reasonCode: "sector-mismatch",
      reasonNote: "Buyer mandate excludes this sector.",
    }) as DealEvent & { reasonCode: string };

    expect(spine.ofType("bid.passed")).toHaveLength(1);
    expect(pass.reasonCode).toBe("sector-mismatch");
  });

  it("builds a structured outcome record from raw events", () => {
    const spine = new EventSpine();
    spine.emit({ id: "e1", type: "listing.created", listingId: "l1", occurredAt: "2026-01-01T00:00:00.000Z" });
    spine.emit({ id: "e2", type: "bid.submitted", listingId: "l1", occurredAt: "2026-01-06T00:00:00.000Z" });
    spine.emit({ id: "e3", type: "bid.submitted", listingId: "l1", occurredAt: "2026-01-08T00:00:00.000Z" });
    spine.emit({
      id: "e4",
      type: "bid.passed",
      listingId: "l1",
      occurredAt: "2026-01-07T00:00:00.000Z",
      reasonCode: "price-too-high",
    });
    spine.emit({ id: "e5", type: "deal.closed", listingId: "l1", occurredAt: "2026-01-20T00:00:00.000Z" });

    const record = spine.outcomeRecord("l1");
    expect(record.bidCount).toBe(2);
    expect(record.passCount).toBe(1);
    expect(record.daysToFirstBid).toBe(5);
    expect(record.daysToClose).toBe(19);
    expect(record.closed).toBe(true);
  });

  it("returns nulls/false for an outcome record with no closing activity", () => {
    const spine = new EventSpine();
    spine.emit({ id: "e1", type: "listing.created", listingId: "l1", occurredAt: "2026-01-01T00:00:00.000Z" });

    const record = spine.outcomeRecord("l1");
    expect(record.bidCount).toBe(0);
    expect(record.daysToFirstBid).toBeNull();
    expect(record.daysToClose).toBeNull();
    expect(record.closed).toBe(false);
  });
});
