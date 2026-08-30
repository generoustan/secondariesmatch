/**
 * S1 (docs/category-strategy.md §2.4) — Position lifecycle events.
 *
 * Every change to a client's book is an event on the shared HashChainedLog,
 * never a direct mutation. The S1 gate is explicit: "full state rebuilt from
 * events matches current state exactly" — see `applyPositionEvents` in
 * positionLedger.ts, which is the pure reducer this file's events feed.
 */

import type {
  ConsentState,
  Id,
  Position,
  RofrState,
  TransferabilityState,
} from "../domain/entities.js";

export interface Citation {
  sourceDocId: Id;
  sourcePage: number;
  sourceSpan: string;
  extractionConfidence?: number;
}

export type PositionCoreFields = Omit<
  Position,
  | "positionId"
  | "confirmedBy"
  | "confirmedAt"
  | "recordStatus"
  | "sourceDocId"
  | "sourcePage"
  | "sourceSpan"
  | "extractionConfidence"
>;

export interface PositionCreatedEvent {
  type: "position.created";
  positionId: Id;
  occurredAt: string;
  fields: PositionCoreFields;
  citation: Citation;
}

export interface PositionConfirmedEvent {
  type: "position.confirmed";
  positionId: Id;
  occurredAt: string;
  confirmedBy: string;
}

export interface PositionTransferabilityUpdatedEvent {
  type: "position.transferability-updated";
  positionId: Id;
  occurredAt: string;
  transferabilityState: TransferabilityState;
  consentState: ConsentState;
  rofrState: RofrState;
  restrictionExpiry?: string;
  noticePeriodDays?: number;
  citation: Citation;
  confirmedBy: string;
}

export interface PositionNavUpdatedEvent {
  type: "position.nav-updated";
  positionId: Id;
  occurredAt: string;
  reportedNav: number;
  navAsOf: string;
  citation: Citation;
}

export interface PositionArchivedEvent {
  type: "position.archived";
  positionId: Id;
  occurredAt: string;
  reason: string;
}

export type PositionEvent =
  | PositionCreatedEvent
  | PositionConfirmedEvent
  | PositionTransferabilityUpdatedEvent
  | PositionNavUpdatedEvent
  | PositionArchivedEvent;
