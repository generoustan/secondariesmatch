# SecondariesMatch — Platform (Phase 0/1 technical substrate)

This package is a reference implementation of the **deterministic, non-ML-dependent**
workstreams from [`../docs/technical-roadmap.md`](../docs/technical-roadmap.md) — the parts
of the architecture the roadmap says must exist *before* any predictive model ships
(§3.6: "no predictive pricing model in Phase 1"; §4 W1: "cold-start ranker is
rules-plus-similarity"). It is a working, fully-tested foundation, not a finished product —
see "What's not here" below before assuming more than what's built.

## What's implemented

| Module | Workstream | What it does |
|---|---|---|
| `src/domain/entities.ts` | W0 | Canonical entity model: Fund, LP Interest, Mandate, Listing, Bid, Deal, Document |
| `src/domain/events.ts` | W0 | Append-only event spine; derives structured outcome records (bid count, days-to-close) from raw events |
| `src/domain/auditLedger.ts` | W7 / §3.4 | Hash-chained, tamper-evident audit ledger for human actions and AI inference events |
| `src/domain/hashChainedLog.ts` | S1 (category-strategy §2.4) | The shared hash-chaining primitive — the "single writer library" both the audit ledger and the Position event spine build on |
| `src/ledger/positionEvents.ts`, `positionLedger.ts` | S1 | Event-sourced Position Ledger: a client's own book, independent of any listing. Every field derived from a client document carries a citation; `applyPositionEvents` is a pure reducer so live state and a full replay from the event log can never drift apart — the literal S1 gate ("full state rebuilt from events matches current state exactly") |
| `src/resolution/aliasTable.ts` | S1 | Entity resolution v0: deterministic normalization resolves exact-after-normalization name variants automatically; anything fuzzy is only ever a ranked candidate until a named human confirms it — explicitly not an ML resolver |
| `src/matching/matcher.ts` | W1 | Deterministic hard-constraint filtering + rule-based scoring with reason codes; reverse matching for sellers |
| `src/pricing/evidenceEngine.ts` | W2 Stage 1 | Comparable-transaction evidence sheets with provenance; hard suppression below a minimum sample size — **no point estimate, no predictive model** |
| `src/pricing/benchmark.ts` | W9 / W2 Stage 3 | k-anonymized benchmark aggregation with a hard-coded suppression threshold per segment |
| `src/diligence/checklist.ts` | W3 (lite) | Required-document checklist per deal kind; NAV-staleness and capital-account-reconciliation red flags |
| `src/documents/clauseLibrary.ts`, `generator.ts` | W4 | Clause-locked document assembly from a counsel-approved library; sign-off gating; redline-distance KPI |
| `src/verification/kyc.ts` | W6 | Deterministic accreditation, sanctions-list screening, and KYC-completeness checks |
| `src/entitlements/entitlements.ts` | W7 | Deal-scoped, role-scoped, time-scoped access control — the choke point every deal-scoped read must pass through |

Every module traces back to a specific section of `docs/technical-roadmap.md`, cited in its
file header, so a reviewer can check the code against the plan directly.

## What's *not* here (by design, not oversight)

- **No real KYC/sanctions vendor, no broker-dealer registration, no real LLM calls.** Those
  require actual vendor contracts and regulatory work (Phase 0 of `docs/roadmap.md`), not code.
- **No learned ranking or pricing model.** Per the roadmap's own doctrine, those don't ship
  until Phase 2, behind a labeled-data threshold and a backtest gate. Building one now on zero
  real deals would be exactly the "cold-start pricing model shipped too early" risk the
  technical roadmap's risk register (§9) warns against.
- **No document-intelligence/OCR pipeline** for W3 — `checklist.ts` verifies document
  *presence* and a few numeric red flags; it does not parse document contents.
- **No persistence layer.** `EventSpine`, `AuditLedger`, and `PositionLedger` are all in-memory;
  the append-only *contract* is what's real and tested, and a durable store can replace the
  storage without changing any caller.
- **No portfolio document ingestion (OCR/extraction) feeding the Position Ledger.** `PositionLedger`
  accepts already-structured fields plus a citation — it does not parse a PDF capital account
  statement itself. Per `docs/category-strategy.md` §2.4 (S0), no real portfolio document should be
  ingested at all until a counsel-approved intake agreement is signed — see
  `docs/legal/intake-agreement.md`.

## Running it

```
npm install
npm test        # runs the full suite (vitest)
npm run typecheck
```

91 tests currently cover every module, including the properties that matter most for a
regulated marketplace: suppression rules actually suppress, entitlement checks actually
isolate one deal's data from another, the audit ledger actually detects tampering, and a full
replay of the Position Ledger's event log actually reproduces its live state exactly.
