/**
 * W7 — entitlements & information barriers.
 *
 * Deal-scoped, role-scoped, time-scoped access grants, enforced on every
 * retrieval (docs/technical-roadmap.md §4 W7, W6: "entitlement checks on
 * every retrieval and every model call, so a copilot cannot surface one
 * counterparty's confidential material to another"). This is the module
 * every future retrieval/copilot feature (W3, W5) must call before
 * returning anything deal-scoped.
 */

import type { Id } from "../domain/entities.js";

export type EntitlementRole = "seller" | "buyer" | "internal-analyst" | "internal-origination";
export type EntitlementAction = "view-listing" | "view-data-room" | "submit-bid" | "view-bids";

export interface EntitlementGrant {
  id: Id;
  counterpartyId: Id;
  dealId: Id;
  role: EntitlementRole;
  actions: EntitlementAction[];
  grantedAt: string;
  expiresAt?: string;
}

const ROLE_ACTION_CEILING: Record<EntitlementRole, EntitlementAction[]> = {
  seller: ["view-listing", "view-bids"],
  buyer: ["view-listing", "view-data-room", "submit-bid"],
  "internal-analyst": ["view-listing", "view-data-room"],
  "internal-origination": ["view-listing", "view-data-room", "view-bids"],
};

export class EntitlementError extends Error {}

/** A grant can never exceed what its role is permitted, even if constructed incorrectly upstream. */
export function issueGrant(input: Omit<EntitlementGrant, "grantedAt">): EntitlementGrant {
  const ceiling = new Set(ROLE_ACTION_CEILING[input.role]);
  const overreach = input.actions.filter((a) => !ceiling.has(a));
  if (overreach.length > 0) {
    throw new EntitlementError(
      `Role "${input.role}" cannot be granted actions [${overreach.join(", ")}] — exceeds role ceiling.`,
    );
  }
  return { ...input, grantedAt: new Date().toISOString() };
}

export function isExpired(grant: EntitlementGrant, asOf: Date = new Date()): boolean {
  return grant.expiresAt !== undefined && new Date(grant.expiresAt).getTime() < asOf.getTime();
}

export interface AccessCheck {
  allowed: boolean;
  reason: string;
}

/**
 * The single choke point every deal-scoped read/write must pass through.
 * No caller may bypass this by constructing its own boolean check —
 * that duplication is exactly how an entitlement bug ships.
 */
export function checkAccess(
  grants: EntitlementGrant[],
  counterpartyId: Id,
  dealId: Id,
  action: EntitlementAction,
  asOf: Date = new Date(),
): AccessCheck {
  const relevant = grants.filter((g) => g.counterpartyId === counterpartyId && g.dealId === dealId);

  if (relevant.length === 0) {
    return { allowed: false, reason: "No entitlement grant exists for this counterparty on this deal." };
  }

  const nonExpired = relevant.filter((g) => !isExpired(g, asOf));
  if (nonExpired.length === 0) {
    return { allowed: false, reason: "All entitlement grants for this counterparty/deal have expired." };
  }

  const hasAction = nonExpired.some((g) => g.actions.includes(action));
  if (!hasAction) {
    return {
      allowed: false,
      reason: `No active grant authorizes action "${action}" for this counterparty on this deal.`,
    };
  }

  return { allowed: true, reason: "Active grant authorizes this action." };
}
