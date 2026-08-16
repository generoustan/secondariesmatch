# SecondariesMatch — Technical Roadmap

**Prepared by:** Architect (standing strategy agent)
**Subject:** The engineering and AI/ML program that turns the business roadmap into a defensible
category position against Park Hill, Evercore, Greenhill, Campbell Lutyens, PJT, and the bank
secondaries desks.
**Companion to:** [`docs/roadmap.md`](roadmap.md) (business phases, wedge, fee model, trust
doctrine), [`docs/design-brief.md`](design-brief.md) (product surface, voice, content-integrity
rules), and [`docs/category-strategy.md`](category-strategy.md) (category-creation thesis,
sprint-level Phase 0/1 build plan, search vocabulary). Category strategy proposes amendments to the
workstream sequencing in its §5; those are not in force until applied here and in `docs/roadmap.md`
in a single change, per §11.
**Status:** v1.1 — living document. Phase structure is **inherited** from `docs/roadmap.md` §3
(Phases 0–4) and must not diverge. If a technical decision changes a business phase gate, edit
both documents in the same change.
**v1.1 changes:** amendments A1–A5 from `docs/category-strategy.md` §5 are **adopted** and applied
here and in `docs/roadmap.md` in the same change. Adds **W10 — Counterparty-of-Record Integrations**
(fund administrators, transfer agents, custodians, CRM), the Position entity as a first-class part
of the deal graph in W0, transfer-legality as a hard matching constraint in W1, and the regulatory
product constraints now specified in `docs/roadmap.md` §2A.

---

## 0. How to Read This Document

`docs/roadmap.md` answers *what business we are building and in what order*. This document answers
*what we build with software and models to make that order achievable at a cost structure the
incumbents cannot match*.

Three rules govern everything below:

1. **No new phases.** Every workstream is sequenced into Phases 0–4 as already defined. A feature
   that "doesn't fit a phase" is a feature that hasn't earned a phase.
2. **The corpus is the company.** Models are rented; the proprietary closed-deal, mandate, and
   process-outcome corpus is owned. Any architectural decision that weakens ownership or legal
   usability of that corpus is a strategic loss regardless of how much velocity it buys.
3. **Model risk is a first-class constraint, not a compliance appendix.** §3 is a gate on §4, not
   a caveat after it. A hallucinated LPA transfer term or a badly calibrated price band on a real
   nine-figure mandate ends the company faster than any incumbent fee cut. This is the same
   argument `docs/roadmap.md` §5 makes about security, applied to models.

---

## 1. Competitive Positioning — What Park Hill and Evercore Actually Do

Positioning against these firms requires describing their operating model accurately rather than
caricaturing it. They are extremely good at what they do. What they do is *labor*.

### 1.1 The incumbent process, step by step

A typical LP-interest or GP-led secondaries process at a bulge-bracket advisory runs roughly as
follows. Each step is a place where cost, time, and opacity enter the system:

| # | Step as practiced today | Who does it | Where the cost/latency sits |
|---|---|---|---|
| 1 | Seller mandate intake — portfolio review, which stakes to sell, target pricing | MD + VP, in meetings and spreadsheets | Weeks of calendar time before anything is marketed |
| 2 | Portfolio construction / lotting — deciding how to slice a portfolio into tranches buyers will want | Deal team judgment, informed by the MD's memory of who bought what | Judgment is real, but it is *undocumented* and leaves with the MD |
| 3 | Teaser and process letter drafting | Associates/analysts, PowerPoint and Word | Days to weeks per deal; near-identical work repeated deal after deal |
| 4 | Buyer list construction | The Rolodex — a private, mostly mental model of ~100–300 active buyers and their live mandates | The single most valuable asset in the firm, and it is not a database |
| 5 | NDA execution and distribution | Email, PDF, sometimes still fax-era workflows | Days of dead time per counterparty |
| 6 | Data room provisioning | Third-party VDR, manually indexed | Buyers pay analyst hours to read what a machine could index |
| 7 | Bid collection | Email and phone, into a spreadsheet | No structured bid data; no cross-deal price history survives the deal |
| 8 | Price discovery and negotiation | Banker as the human API between buyer and seller | Opacity is monetized here — informational asymmetry is part of the fee justification |
| 9 | Closing mechanics — transfer agreements, GP consent, ROFR waivers, LPA compliance | Counsel + deal team | Genuinely hard; genuinely requires humans |
| 10 | Post-close | Deal dies. Data dies with it. | **No persistent data product.** This is the strategic opening. |

Fee for that: roughly **1–2% of transaction value** (per `docs/roadmap.md` §1 and §4), on a
**6–12 month** process. Pricing intelligence circulates as periodic PDF market surveys — the
semi-annual secondary market reviews published by the large advisory houses are genuinely useful
and genuinely *stale, aggregated, and non-queryable* by the time an allocator reads them.

### 1.2 What the incumbents are actually selling

Three things, in order of real value:

1. **A buyer list with live mandate knowledge** — who is deploying, at what size, in what sectors,
   at what return threshold, *this quarter*.
2. **Price context** — what comparable stakes cleared at, which lives in the MD's head and in
   deal-team memory.
3. **Process credibility** — the seller's board and IC accept the outcome because a recognized
   advisor ran a recognized process.

Note what is *not* on that list: the drafting, the emailing, the bid spreadsheets, the data-room
indexing, the checklist chasing. That is the labor being billed for, and it is the labor a machine
can absorb. Assets 1 and 2 are exactly what a venue accumulates structurally and an advisory firm
accumulates only in individual human memory. Asset 3 is earned in Phase 1 by execution, not
by technology.

### 1.3 What "AI-native" means here — and what it does not

"AI-native" is a meaningless claim if it means a chat box bolted onto a listings site. Any
competitor, including Evercore's own innovation group, can ship that in a quarter. The claim is
only defensible if it is specific about *which human function the model replaces* and *why the
replacement gets better with every deal that closes on the platform*.

**AI-native, defined operationally for this business:** the system performs, in software, the
inference tasks that currently require a deal team's accumulated memory — mandate-to-listing
matching, comparable selection, price bracketing, document assembly, and diligence extraction —
and it performs them from a structured corpus of the platform's own closed transactions rather
than from an individual's recollection.

| Incumbent human function | AI/ML substitute | Why it compounds (defensibility) |
|---|---|---|
| MD's mental buyer list (step 4) | Structured mandate objects + semantic matching over natural-language mandates | Every mandate captured, every bid placed, every pass logged makes the ranker better. A competitor starting today has zero pass/bid labels. |
| MD's price memory (step 8) | Indicative pricing model trained on realized close prices, bid distributions, and NAV marks | Realized-price data is only generated by *closing deals*. It cannot be bought, scraped, or bolted on. This is the single non-copyable asset. |
| Associate drafting teasers/process letters (step 3) | Retrieval-grounded generation from a counsel-approved clause library | Weak moat alone (commoditizing fast) — but it collapses cost-to-serve, which is what makes the sub-1% fee sustainable and the middle-market wedge economic. |
| Analyst reading the data room (step 6) | Document intelligence: LPA transfer-provision extraction, ROFR detection, capital-account reconciliation, checklist verification | Moderate moat, high buyer-side value: it is the thing buyers hate most and pay analysts most for. Reduces buyer's cost of *evaluating* a deal, which increases bids per listing, which increases price data. |
| Banker as human API (step 8) | Structured bid capture + conversational buyer/seller interfaces | Deleting the intermediary is the point (`docs/roadmap.md` doctrine, lens 1). The audit trail this produces is also the compliance artifact. |

**The compounding loop, stated plainly:**

```
more verified counterparties → more mandates captured as structured objects
   → better semantic matching → more bids per listing
   → tighter, more competitive pricing → more sellers choose the venue
   → more closed deals → more realized-price and bid-distribution data
   → better pricing benchmark → the benchmark becomes what the market quotes off
   → firms who never trade here still subscribe (Phase 2 data product)
   → subsidizes a transaction fee no labor-based advisor can match
```

Each arrow is a measurable metric, not a slogan. §8 assigns each one an instrument.

**What is explicitly NOT a moat, and should be treated as table stakes:** a chatbot, generic
document summarization, an LLM-written listing description, "AI-powered" search over public fund
data. If a feature would still work identically for a competitor with zero closed deals, it is a
cost-reduction feature, not a defensive one. Build those for margin, never for positioning.

### 1.4 Where incumbents will respond, and where they can't

- **They can cut fees.** Assume they will on contested mandates. Per `docs/roadmap.md` §8, the
  answer is never to compete on price alone.
- **They can buy or build document AI.** Assume it within 18–24 months. That is why the doc-gen
  workstream (W5) is sequenced as a cost play, not a positioning play.
- **They cannot easily externalize their pricing memory into a queryable product**, because doing
  so destroys the informational asymmetry that justifies their fee. This is a classic incumbent
  bind: the data product cannibalizes the advisory margin. Publishing pricing is cheap for us and
  expensive for them — attack there.
- **They cannot make their process auditable end-to-end** without exposing how much of it is
  discretionary. Machine-readable process integrity is a wedge into the General Counsel persona
  named in `docs/design-brief.md` §3.

---

## 2. Architecture Principles (the non-negotiables)

**P1 — The confidentiality boundary is per-deal.** Documents, data-room contents, and identified
counterparty positions never cross deal boundaries, never enter a shared retrieval index, and are
never used to train or fine-tune a shared model. Only **structured, de-identified, contractually
licensed outcome fields** (asset class, vintage bucket, NAV bucket, sector, geography, price as %
of NAV, bid count, days-to-close) graduate into the shared corpus, and only after an aggregation
threshold. Violating this once ends the venue.

**P2 — Own the corpus, rent the models.** No foundation-model pretraining. Vendor LLMs are
procured under zero-retention, no-training-on-inputs terms with region pinning and a DPA. Every
model call is abstracted behind an internal gateway so vendors are swappable and every call is
logged. What we own and never outsource: the deal graph, the pricing corpus, the matching logic,
the evaluation harness, and the audit ledger.

**P3 — Deterministic where arithmetic is required.** Waterfalls, capital-account math, fee
calculations, allocation, proration, and consent thresholds are computed by tested deterministic
code with unit tests and reference cases. LLMs may *explain* a number; they may never *produce*
one that appears in a transaction document or a settlement.

**P4 — Every AI output carries provenance.** Model ID, model version, prompt/template version,
retrieval set hash, input snapshot hash, output hash, reviewer, disposition, timestamp. Written to
an append-only ledger. This is the same audit-trail commitment `docs/design-brief.md` §6.8 makes
for bids and NDAs, extended to inference.

**P5 — Constraints are hard, models are soft.** A model may rank, score, summarize, and suggest.
It may never override a stated hard constraint (mandate minimum check size, prohibited sector,
jurisdiction exclusion, entitlement, KYC status). Hard constraints are enforced in deterministic
filters upstream of any model.

**P6 — Ship the smallest loop that produces data.** Prefer a retrieval-and-evidence feature that
produces labeled outcomes over a predictive feature that produces confident guesses on n=8.

---

## 3. Model Risk, Explainability, and Human-in-the-Loop (gating constraint)

This section governs §4. No workstream ships without satisfying it.

### 3.1 Why this is a business risk, not a compliance chore

Three specific failure modes, each individually company-ending:

- **Bad price guidance.** An indicative band that reads "92–95% of NAV" on a stake that clears at
  78% doesn't just lose a deal — it becomes the story a seller's IC tells about why institutions
  shouldn't use the venue. Confidence intervals that are not empirically calibrated are worse than
  no intervals.
- **Hallucinated document terms.** A generated transfer agreement or process letter containing a
  term with no basis in the underlying LPA is, at best, a redline; at worst, an alleged
  misrepresentation in a securities transaction.
- **Unsupervised counterparty-facing communication.** If the platform operates as or through a
  registered broker-dealer (`docs/roadmap.md` Phase 0), AI-generated messages to counterparties
  are business communications subject to supervision and retention obligations. An unlogged,
  unsupervised agent chat is a regulatory finding waiting to happen, independent of whether the
  content was accurate.

Reference frameworks to align with (confirm applicability with securities counsel in Phase 0;
these are the disciplines to borrow, not a claim of current compliance): the US banking
regulators' model risk management guidance (SR 11-7 lineage) for model inventory, validation, and
independent review; the NIST AI Risk Management Framework for lifecycle governance; EU AI Act
transparency obligations where EU counterparties are served; and broker-dealer books-and-records
and supervisory-review requirements for any AI-generated external communication.

### 3.2 AI output risk tiers

Every AI-assisted capability is classified at design time. The tier determines the control set.

| Tier | Definition | Examples | Required controls |
|---|---|---|---|
| **T0 — Internal assist** | Never leaves the building; no counterparty sees the output | Listing normalization, internal tagging, search ranking for the origination desk, meeting summaries | Logged to ledger; aggregate quality monitoring; no per-output sign-off |
| **T1 — Advisory, counterparty-visible** | Informs a counterparty's decision but is not a price, an offer, or a legal term | Indicative pricing bands, match scores and reason codes, diligence summaries, comparable sets | Named human reviewer before first external publication; mandatory "Indicative" labeling; uncertainty displayed; source citations; suppression rules when data is thin; per-output ledger entry |
| **T2 — Transactional / legal artifact** | Becomes or feeds a document that binds, represents, or is relied upon | Teasers, process letters, NDAs, transfer-doc drafts, GP consent requests, bid summaries sent to a seller | Generation restricted to counsel-approved template + clause library; no free-text generation of legal terms; machine diff against approved template surfaced to reviewer; **named individual sign-off recorded** before transmission; counsel review for any new clause |
| **T3 — Prohibited to automate** | Model may not act, even with a human "confirm" button as theatre | Submitting or accepting a bid; setting a final transaction price; issuing legal or investment advice; passing/failing KYC or sanctions screening; releasing data-room access | Human decision is the system of record. Model output may appear only as clearly-labeled decision support alongside the underlying evidence. |

**Rule of escalation:** when in doubt, classify one tier higher. Downgrading a tier requires
sign-off from the compliance owner and evidence from the evaluation harness.

### 3.3 Human-in-the-loop, made specific

"Human in the loop" degrades into rubber-stamping unless it is instrumented. Requirements:

- **Named reviewer, not a role.** The ledger records a person, not "ops team."
- **Review must be falsifiable.** The reviewer sees the model's inputs, its citations, and a diff
  against the approved baseline — not just the output. A reviewer who cannot see what changed is
  not reviewing.
- **Track the override rate.** Reviewer edit/rejection rate per capability is a first-class
  metric. A rate near zero on a T2 capability signals rubber-stamping and triggers an audit of
  sampled outputs, not a celebration of model quality.
- **Sampling audit on T1.** A fixed percentage of T1 outputs is re-reviewed independently each
  month, with results written to the model's validation record.
- **Kill switch per capability.** Every AI capability is individually feature-flagged and can be
  disabled without redeploying the platform. Degraded mode for every capability is "the manual
  Phase 1 process," which must remain operable indefinitely.

### 3.4 Audit trail for inference

Append-only, tamper-evident (hash-chained), retained to the broker-dealer retention standard, and
queryable to answer the only question that matters in a dispute: *"On what basis was this number
or this sentence produced, who approved it, and could we reproduce it?"*

Minimum record per inference: `capability_id`, `risk_tier`, `model_provider`, `model_id`,
`model_version`, `prompt_template_version`, `retrieval_corpus_snapshot_id`, `retrieved_doc_ids`,
`input_hash`, `output_hash`, `output_text_or_pointer`, `confidence/interval`, `suppression_flags`,
`reviewer_id`, `review_action` (accept / edit / reject), `edit_diff`, `disclaimer_version`,
`timestamp`, `deal_id`, `entitlement_context`. **Reproducibility requirement:** any T1/T2 output
must be re-derivable from the recorded snapshot for the full retention period, which means model
versions and prompt templates are immutable artifacts, never mutated in place.

### 3.5 Disclosure language (customer-facing — follows `docs/design-brief.md` voice)

Plain, unhedged, no hype, no apology. Working drafts:

- On pricing: *"Indicative range derived from N comparable closed transactions on this platform.
  Not a quote, valuation, or offer. Methodology and sample composition available."*
- On matching: *"Ranked by mandate fit. Ranking is informational and does not constitute a
  recommendation."*
- On generated documents: *"Draft generated from an approved template and reviewed by
  [named individual]. Not legal advice. Subject to counsel review before execution."*
- On diligence summaries: *"Machine-extracted from source documents with citations. Verify against
  source before relying on it."*

Disclaimer text is versioned in the ledger like any other artifact, so we can always show which
disclosure a counterparty actually saw.

### 3.6 The four-lens check on the contested calls

Per the operating doctrine, the tensions are named rather than silently resolved:

| Decision | Tension | Resolution |
|---|---|---|
| Ship a predictive pricing model in Phase 1 | Lens 3 (be the fast liquidity provider) vs. Lens 4 (a miscalibrated band on an early real deal destroys the trust the whole thesis rests on) | **No model in Phase 1.** Ship *evidence sheets* — retrieved comparables with sources — not predictions. Model ships in Phase 2 behind the n-threshold and backtest gate in §8. |
| Counterparty-facing conversational agent early | Lens 1 (delete the banker as human API) vs. Lens 4 (supervised communications, retention, hallucination exposure) | Phase 2, retrieval-scoped to the user's entitlements, every turn logged as a supervised communication, T3 actions hard-blocked. Internal-facing copilot first in Phase 1. |
| Use data-room contents to improve shared models | Lens 2 (more data, stronger moat) vs. Lens 4 + P1 | **Prohibited.** Only licensed structured outcomes graduate to the shared corpus. The moat is built from outcomes, not from reading clients' confidential documents. |
| Buy vs. build foundation models | Lens 1/2 (control) vs. capital discipline | Buy. The weights are commoditizing; the corpus is not. Revisit only if vendor terms threaten P1. |
| Concierge execution in Phase 1 | Lens 3 (close deals now) vs. Lens 1 (manual steps are defects) | Reconciled by W0: the concierge process is *instrumented*, so every manual step emits the structured event that trains its own replacement. Manual work that produces no data is the actual defect. |

---

## 4. Technical Workstreams

Nine workstreams. Each states the incumbent function it attacks, what gets built, its risk tier,
its dependencies, and the phase it lands in. Phase mapping is consolidated in §5.

### W0 — Process Instrumentation & the Deal Graph *(the substrate; everything depends on it)*
**Attacks:** step 10 — the fact that incumbent deal data dies at close.

- Canonical entity model: Fund, GP/Manager, Vehicle, **Position**, LP Interest, Portfolio Company,
  Security, Counterparty, Mandate, Listing, Bid, Deal, Document, Event. Entity resolution across
  naming variants (fund families, series, feeder vehicles, SPVs) — this is unglamorous and it is
  the single highest-leverage piece of infrastructure in the document.
- **`Position` is the root entity, not `Listing` (A1).** A position is a holding under record; a
  listing is one action taken against a position. The distinction is the whole category thesis
  (`docs/category-strategy.md` §2.1) expressed in a schema: a listing-rooted graph can only
  represent institutions that are selling, which is the episodic advisory frame we are trying to
  delete. The position record carries its own citations, transferability state, and lifecycle
  independent of any deal. Data contract: `docs/category-strategy.md` §2.2.
- **The event spine is scoped to `position_id` and `counterparty_id`, not only `listing_id`.**
  Portfolio intake, extraction, human confirmation, transferability review, mandate lifecycle, and
  record access must all emit events for counterparties who never transact — otherwise the
  non-transacting client, who is the category, is invisible to the system that is supposed to be
  their record.
  > **Implementation note (state of the code, as of v1.1).** `platform/src/domain/entities.ts` has
  > no `Position` type, and `platform/src/domain/events.ts` requires a `listingId` on every event —
  > so the reference implementation currently encodes the listing-rooted frame this section
  > rejects. Fixing that schema is the first engineering task of the record build (sprint S1 in
  > `docs/category-strategy.md` §2.4) and it is cheap now and expensive after the first real
  > portfolio is ingested. Nothing else in this document compounds correctly until it is done.
- **Event spine:** every state transition in a deal (listing created, NDA executed, data room
  accessed, bid submitted, bid countered, deal closed, deal withdrawn — including *passes with
  reason codes*) emitted as an immutable, timestamped, typed event. Passes are as valuable as
  bids: they are the negative labels no competitor will have.
- Structured outcome record per closed deal: realized price as % of NAV, reference NAV date, bid
  count, bid dispersion, days from listing to first bid, days to close, and the pricing-relevant
  attribute vector.
- **Data rights (A5):** the counterparty agreement must grant the platform an explicit, perpetual
  license to use de-identified, aggregated transaction data for benchmarks and analytics. This
  clause is a **Phase 0 blocker** — retrofitting it across 50 executed agreements later is
  expensive and may be impossible. Cheapest, highest-leverage item in this document. **Extended in
  v1.1 to cover pre-transaction material:** documents and positions submitted by a client who is
  not transacting, dormant-record retention periods, processing scope, deletion and export rights,
  and the entitlement model for a record with no live deal. The record exists before any deal does,
  so the consent must cover a surface neither this document nor `docs/roadmap.md` previously
  addressed. No portfolio document is ingested before this agreement is executed.
- Risk tier: N/A (no inference). Dependency: none. **Phase 0, hardened through Phase 1.**

### W1 — Mandate Intelligence & Semantic Matching
**Attacks:** step 4 — the Rolodex.

- **Structured mandate object:** asset class, strategy, check size min/max, geography, vintage
  range, sector inclusions/exclusions, GP relationships and conflicts, return threshold,
  discount-to-NAV tolerance, unfunded appetite, deployment window, decision process/turnaround.
- **Natural-language mandate intake:** a buyer pastes their IC-approved mandate in prose; the
  system proposes a structured object with every field citing the source sentence; the buyer
  confirms field by field. Human confirmation makes it T1, not T2, and produces clean labels.
- **Natural-language search over supply** ("2018–2020 vintage European mid-market buyout, healthcare
  weighted, under $40M NAV, tolerant to 15%+ discount") compiled into deterministic filters plus a
  semantic residual — never a pure embedding search over financial constraints.
- **Hybrid matcher:** hard constraints as deterministic pre-filters (P5), then a learned ranker
  over the eligible set trained on historical bid/pass/close labels. Cold-start ranker is
  rules-plus-similarity; it graduates to learned only when label volume clears the §8 threshold.
- **Transfer-legality is a hard pre-filter, evaluated per (buyer × position) pair — not a mandate
  preference.** Per `docs/roadmap.md` §2A.4, whether a given buyer may take a given position turns
  on facts about *both* sides: ERISA benefit-plan-investor concentration in the fund, permitted-
  transferee definitions in the LPA, competitor/restricted-transferee exclusions, jurisdiction and
  sanctions status, the fund's remaining PTP transfer capacity for the tax year (§2A.3), and
  §1446(f) withholding posture where the seller is non-US. A match that is commercially perfect and
  legally impossible is worse than no match: it burns the GP relationship that took a year to
  build. Ineligibility must be surfaced with its reason and its citation, never silently filtered —
  a buyer who is told *why* they are excluded trusts the venue more, not less.
  **`platform/src/matching/matcher.ts` currently models mandate fit only**; the eligibility layer
  is unbuilt and should land before the first real match is shown to a counterparty.
- **Reason codes on every match** — "matches stated sector focus; NAV size within stated band;
  discount 3pts wider than your last four closed purchases." Explainability here is not just model
  governance; it is the product. Buyers act on reasons, not scores.
- **Reverse matching for sellers:** at listing intake, show the seller the count and profile of
  qualifying live mandates *before* they commit to list. This directly attacks the incumbent's
  core pitch ("we know who the buyers are") and it costs us nothing to show.
- Risk tier: T1. Dependencies: W0. **Phase 1 (capture + rules), Phase 2 (learned ranker).**

### W2 — Indicative Pricing & Benchmark Engine
**Attacks:** step 8 — the banker's price memory, and the market's lack of a queryable benchmark.

Sequenced deliberately slowly, because this is the workstream where being wrong is most damaging
and being right is most defensible.

- **Stage 1 (Phase 1) — Evidence sheets, not predictions.** Retrieve and display comparable
  transactions and public reference points with full provenance and sample size. No point
  estimate, no model. The seller sees the evidence a banker would cite, plus the citation the
  banker would not give them.
- **Stage 2 (Phase 2) — Indicative band with calibrated uncertainty.** Gradient-boosted regression
  on structured features (asset class, strategy, vintage, NAV size bucket, sector mix, geography,
  unfunded ratio, GP quality proxy, NAV reference lag, market-window indicator) with hierarchical
  shrinkage toward cohort means for sparse cells, and **conformal prediction intervals** so the
  stated band has empirically validated coverage rather than a modeler's opinion of confidence.
  Output is always a band with `n`, never a point.
- **Suppression rules (hard):** below a minimum comparable count, output is suppressed entirely
  and the UI says so. "We don't have enough data to price this yet" is a trust-building sentence.
  Incumbents cannot say it; we can, and should.
- **Cold-start data strategy** (be honest that the corpus starts empty): (a) publicly published
  semi-annual secondary market reviews and pricing surveys — verify licensing terms before
  ingestion; (b) reported NAV marks and fund performance data from licensed commercial providers;
  (c) public market comparables and listed private-market vehicle discounts as a directional
  anchor; (d) the founding transactors' historical deal knowledge captured as *structured expert
  priors with attribution*, explicitly flagged as priors and progressively down-weighted as
  platform-realized prices accumulate. Every source is tagged in the lineage so a benchmark
  consumer can see what share of an estimate rests on platform-realized transactions versus
  external priors — that share, published, becomes the credibility metric of the whole product.
- **Stage 3 (Phase 3) — Published benchmark series** by segment (vintage × strategy × size), with
  methodology documentation, sample-composition disclosure, and revision policy modeled on how
  index providers publish. Note for counsel: publishing a referenced benchmark may attract
  benchmark-administration obligations in some jurisdictions — resolve before publication, not
  after.
- Risk tier: T1 throughout (never T3 — the platform does not set prices). Dependencies: W0, W8.
  **Phase 1 → 2 → 3.**

### W3 — Data Room Intelligence & Diligence Automation
**Attacks:** step 6 — buy-side analyst hours, which are the hidden tax that keeps middle-market
deals from getting enough bids.

- **Ingestion pipeline:** OCR, layout-aware parsing, document classification (LPA, side letter,
  capital account statement, quarterly report, transfer agreement, subscription doc, K-1),
  per-deal isolated index (P1).
- **Structured extraction with span-level citations:** LPA transfer provisions, GP consent
  requirements, ROFR/ROFO mechanics and notice periods, transfer restrictions and permitted
  transferee definitions, key-person and fee terms, unfunded commitment schedules, capital account
  balances and reconciliation to reported NAV.
- **Automated diligence checklist:** the system verifies which required documents are present,
  flags missing items, and surfaces the specific unresolved terms — turning a two-week analyst
  read into a same-day triage. Every extracted field links to the exact source page and span; an
  extraction without a citation is not displayed.
- **Red-flag detection:** NAV date staleness, capital-account inconsistency, unusual transfer
  restrictions, undisclosed side-letter economics, concentration inconsistent with the teaser.
- **Why this is strategically underrated:** it lowers the buyer's cost of *evaluating* a deal,
  which raises bids per listing, which improves clearing prices, which attracts sellers, which
  generates the pricing data in W2. It is the highest-throughput input to the compounding loop
  even though it looks like a back-office feature.
- **The transferability slice ships counterparty-facing in Phase 1 (A2).** Split this workstream in
  two. The *transferability layer* — transfer restrictions, GP consent, ROFR/ROFO and notice
  periods, permitted-transferee definitions, transfer windows, transfer and admin fees — becomes a
  **Phase 1 counterparty-facing** deliverable, gated on span citations, a named reviewer, and the
  absolute rule that no field displays without a citation. Full diligence summaries and red-flag
  detection remain Phase 2. Rationale: transferability extraction is derived entirely from
  documents the client hands us, so it **requires no corpus and works at n=0**. It is therefore the
  only category-defining output available before a single deal closes, and it is the highest-value
  artifact for the General Counsel persona in `docs/design-brief.md` §3 — the reader who decides
  whether the fund may participate at all. It is also the same asset as the highest-value content
  cluster in `docs/category-strategy.md` §3.5: the product and the search surface are one thing.
- Risk tier: T1 (extraction and summaries), with any output feeding a transaction document
  escalating to T2. Dependencies: W0, W7 entitlements. **Phase 1 (internal analyst tool +
  counterparty-facing transferability layer), Phase 2 (full diligence summaries).**

### W4 — Document Generation with Clause Locks
**Attacks:** step 3 and step 5 — associate drafting and NDA cycle time.

- **Counsel-approved template library** with typed variable slots: teaser, process letter, NDA,
  bid instruction letter, GP consent request, transfer agreement shell, closing checklist.
- **Generation is assembly, not authorship.** The model selects and fills approved clauses and
  writes narrative sections (fund overview, portfolio description, process timeline) grounded in
  cited source documents. **It may not author legal terms.** Any requested term outside the
  approved clause library routes to counsel and, if approved, is added to the library as a
  versioned artifact — so the library appreciates while the risk stays bounded.
- **Reviewer sees a machine diff** against the approved template plus every variable's source
  citation. Sign-off is a named individual, recorded (§3.3).
- **Redline volume is the KPI**: human edit distance per generated document, tracked over time. A
  falling curve is the automation dividend made visible; a flat curve means the template library,
  not the model, is the problem.
- Risk tier: T2. Dependencies: W0, W3, counsel engagement from Phase 0. **Phase 1.**

### W5 — Conversational and Agentic Interfaces
**Attacks:** step 8 — the banker as the human API between the two sides.

- **Buyer copilot:** natural-language queries over the marketplace *scoped strictly to the user's
  entitlements* ("show me anything new this week fitting our infra mandate under $50M, with the
  transfer provisions already cleared"), portfolio-level exposure questions, comparison of live
  opportunities against the buyer's own closed history.
- **Seller copilot:** "what would this stake likely clear at, how many live mandates qualify, what
  documents do I still owe, what does the timeline look like" — answered from W1/W2/W3 with
  citations.
- **Origination desk copilot (internal, first to ship):** the founding transactors' force
  multiplier in Phase 1. Drafts outreach, assembles buyer shortlists with reasons, prepares bid
  comparison packs, flags stalled deals.
- **Bounded agentic execution (Phase 3):** multi-step agents that chase document checklists,
  schedule process milestones, prepare bid comparisons, and draft status updates — over an
  **explicitly enumerated action space**. Every action with an external effect (sending a
  communication, granting access, transmitting a document) requires human approval. T3 actions are
  not merely gated, they are absent from the action space.
- **Every counterparty-facing turn is a supervised communication:** logged, retained, and available
  for supervisory review (§3.1).
- Risk tier: T1, with per-action tiering in the agentic layer. Dependencies: W0–W3, W7. **Phase 1
  internal, Phase 2 counterparty-facing, Phase 3 agentic.**

### W6 — Counterparty Verification, Anomaly & Fraud Detection
**Attacks:** nothing the incumbents do badly — this is the trust floor from `docs/roadmap.md` §5
and `docs/design-brief.md` §6.8, and it must be excellent before automation earns any credit.

- **Phase 0, deterministic first:** identity and entity verification, accreditation/qualified-
  purchaser checks, UBO resolution, sanctions/PEP screening via established vendors, document
  authenticity checks. Rules and vendors, not models — a screening model with a false negative is
  a sanctions violation.
- **Behavioral anomaly detection (Phase 2–3, ML):** bidding patterns inconsistent with a stated
  mandate, coordinated bidding across ostensibly unrelated counterparties, data-room access
  patterns consistent with information harvesting rather than diligence, listing patterns
  consistent with price discovery without intent to transact, document tampering and metadata
  inconsistency.
- **Information-barrier enforcement as code:** entitlement checks on every retrieval and every
  model call, so a copilot cannot surface one counterparty's confidential material to another even
  through an indirect summarization path. This is the most likely catastrophic AI failure mode in
  this business and deserves dedicated adversarial testing (prompt-injection via uploaded
  documents, retrieval-scope escape, entitlement confusion in multi-turn context).
- Risk tier: T3 for adjudication (human decides), T1 for detection/scoring. Dependencies: W0.
  **Phase 0 deterministic, Phase 2–3 behavioral.**

### W7 — Platform Core: Entitlements, Audit Ledger, Data Rooms, Workflow
**Attacks:** steps 5, 6, 7, 9 — process mechanics.

- Entitlement and permissioning service (deal-scoped, role-scoped, time-scoped), NDA state machine
  with e-signature, watermarked and leak-traceable data rooms, structured bid capture replacing
  the email-and-spreadsheet pattern (this is where the pricing corpus is actually born), status
  lifecycle (`Open / Under Offer / Closing Soon / Closed / Withdrawn`) per `docs/design-brief.md`
  §7.2, closing workflow and document checklist.
- **The hash-chained audit ledger (§3.4) lives here** and covers both human actions and inference
  events in one timeline, because "who saw what, when, and on what basis" must be answerable as a
  single query.
- **GP workflow embedding (Phase 3):** continuation-vehicle election and allocation tooling,
  waterfall calculators, LP consent tracking — all deterministic per P3, with LLM assistance
  limited to narrative and explanation. This is the switching-cost layer identified in
  `docs/roadmap.md` Phase 3.
- Risk tier: N/A / T0. Dependencies: none (foundational). **Phase 0 → 3.**

### W8 — Data & ML Infrastructure
**Attacks:** our own future velocity. Under-building here is how a data moat quietly fails to
compound.

- **Pipeline:** event spine → warehouse → feature store with point-in-time correctness (critical:
  training a pricing model on features that leaked post-close information produces a backtest that
  looks brilliant and a live model that is wrong).
- **Model registry:** every model and prompt template is an immutable, versioned artifact with a
  model card (purpose, training data lineage, evaluation results, known limitations, risk tier,
  named owner, approval record). Registry is the system of record for the model inventory that
  §3.1 governance requires.
- **Evaluation harness:** golden datasets per capability; offline backtests with temporal splits
  (never random splits on transaction data); calibration testing for interval coverage; extraction
  accuracy scored against analyst-labeled gold documents; hallucination/grounding tests for every
  generative capability; regression suite run on every model or prompt change.
- **Shadow mode before live:** every new model version runs in parallel against production traffic
  with outputs recorded but not surfaced, for a defined period, before promotion. Promotion is a
  governance decision with an approval record, not a deploy.
- **LLM observability:** per-capability cost, latency, refusal/failure rates, retrieval hit rates,
  reviewer override rates, and drift monitoring on both inputs (market regime shift) and outputs.
- **Reproducibility:** snapshot-based, so any T1/T2 output can be re-derived years later (§3.4).
- Risk tier: N/A. Dependencies: W0. **Phase 1 minimal, Phase 2 full, Phase 3–4 scaled.**

### W9 — Data Products & Infrastructure API
**Attacks:** step 10 again, monetized — and it is the revenue line that makes the low fee
permanent rather than promotional.

- **Benchmark subscription (Phase 2):** aggregated, k-anonymized pricing series by segment with
  methodology disclosure. Aggregation thresholds enforced in code, not policy; re-identification
  testing before every release; contributor data rights verified per W0.
- **Institutional API (Phase 3):** mandate registration, listing feed, benchmark query, portfolio
  monitoring — so an allocator's internal systems consume the venue rather than visiting it.
  API consumption is a deeper lock-in than UI usage.
- **Infrastructure licensing (Phase 4):** pricing API, matching-as-a-service, and — the
  under-appreciated part — the **model governance package** (audit ledger, model cards, validation
  evidence) shipped alongside. A bank or fund administrator cannot deploy an ungoverned third-party
  model into a regulated process; governance is what makes the licensing deal closeable, which
  turns §3 from a cost center into a product feature.
- **Consortium contribution model (Phase 4):** competitors and administrators contribute structured
  outcome data in exchange for benchmark access. This is the endgame of `docs/roadmap.md` Phase 4 —
  the benchmark stops being ours and becomes the market's, while we run it.
- Risk tier: T1. Dependencies: W0, W2, W8. **Phase 2 → 4.**

### W10 — Counterparty-of-Record Integrations *(fund administrators, transfer agents, custodians, CRM)*
**Attacks:** step 9 — closing mechanics — and the fact that no prior version of this roadmap named
the party who actually completes a transfer.

This workstream was absent from v1.0 and it is, on reflection, the most defensible non-data moat
available. A secondaries transaction is not complete when a bid is accepted. It is complete when
**the fund administrator updates the register** and the buyer is admitted as a partner of record.
Every advisor in `§1.1` step 9 hands that last mile to counsel and the administrator over email.
Whoever automates it sits inside the transaction permanently.

- **Integration tiers, built in this order:**
  - **T-0 — Document intake (always supported, never deprecated).** Capital-account statements and
    portfolio schedules parsed via W3. This is the fallback that must work forever, because it is
    what keeps an administrator from ever being able to gate our access. Build the integrations to
    make T-0 faster, never to make it unnecessary.
  - **T-1 — Read.** Position, NAV, capital-account, and unfunded feeds from administrators and
    allocator portfolio systems. Turns the Position Ledger from a quarterly snapshot into a live
    record, which is what makes the subscription renew.
  - **T-2 — Write / instruct.** Transfer instruction packets, GP consent routing and status,
    §1446(f) certification collection, ROFR notice generation and clock tracking, and
    confirmation of the register update as a structured event on the spine.
  - **T-3 — Embedded.** The administrator or GP runs their transfer workflow *in* our system
    because it is better than their internal one. This is the switching cost the Phase 3
    GP-workflow embedding in W7 is aiming at, reached through operations rather than through UI.
- **The GP wedge is the transfer-capacity tracker** (`docs/roadmap.md` §2A.3): live remaining PTP
  transfer capacity per fund per tax year, aggregated across *all* transfers including those that
  never touched our platform, with the supporting evidence. It is a small piece of deterministic
  arithmetic (P3 — never a model) attached to a genuine institutional fear, it gives a GP a reason
  to onboard a fund to the record with no LP selling, and it is the natural first thing to ask an
  administrator to feed us. Start here rather than with a general-purpose integration.
- **Buy-side CRM integration** is the mirror image: mandates currently live in IC memos and the
  buyer's CRM. Writing structured mandate objects back into the buyer's own system, and accepting
  updates from it, makes our mandate registry the thing their process depends on. API consumption
  is deeper lock-in than UI usage (W9), and mandate-object sync is the cheapest version of it.
- **Which counterparties to integrate is an empirical Phase 2 question, not a market-share
  question:** pick by where the NAV in our first portfolios under record actually sits. Integrating
  with the largest administrator in the industry is worth nothing if none of our positions are
  administered there.
- **Why a well-funded clone cannot shortcut this:** integration agreements are executed
  bilaterally, data mappings are built per counterparty against inconsistent formats, and
  operational trust with an administrator's transfer team is earned over cycles. Capital
  accelerates a UI clone; it does not accelerate a signature from an administrator's legal team.
- **The dependency risk is real and named** (`docs/roadmap.md` §8): integrate with several rather
  than one, keep T-0 permanently viable, and make the GP — not the administrator — the party whose
  problem we are solving, so that our position is not held at an intermediary's discretion.
- Risk tier: T0/N-A (deterministic movement of records; any generated instruction document is T2
  under W4). Dependencies: W0 (position entity), W7 (entitlements, audit ledger).
  **Phase 1 T-0, Phase 2 T-1 and the capacity tracker, Phase 3 T-2, Phase 4 T-3.**

---

## 5. Sequencing Against the Business Phases

Phase names and gates below are the ones in `docs/roadmap.md` §3. The technical gates are
*additions* to those business gates, not replacements.

### Phase 0 — Foundation: License to Operate
*Business gate (unchanged): legal structure secured, security program in motion, 20–50 verified
counterparties, founding transactors hired.*

| Workstream | Deliverable |
|---|---|
| W0 | Deal graph schema v0 **rooted on `Position`, with the event spine scoped to position and counterparty rather than listing**; event spine live; **data-rights clause executed in every counterparty agreement, covering pre-transaction documents and dormant records (A5)** |
| W7 | Entitlements, KYC/AML onboarding, encrypted watermarked data rooms, hash-chained audit ledger v1 |
| W6 | Deterministic verification and screening stack live |
| W8 | LLM gateway with zero-retention vendor terms, region pinning, full call logging |
| §3 | **Model Risk Policy v1** signed by compliance: tiering, review requirements, ledger schema, kill switches, AI Use Register with a named owner per capability |
| W5 | Internal-only T0 tooling for the origination desk (intake structuring, listing normalization) |
| Prototype | `prototype/index.html` "Illustrative" labeling preserved per `docs/design-brief.md` §9 — no AI-generated pricing or listing content ships without that label until real deal flow exists |

**Added technical gate:** every AI call in production is ledger-recorded and reproducible; Model
Risk Policy approved; data-rights clause in force *including its pre-transaction extension*; the
listing lifecycle and quoting model reviewed by tax counsel against the PTP conditions in
`docs/roadmap.md` §2A.3 **before** any listing surface goes live to real counterparties.
*No counterparty-facing AI output in Phase 0.*

### Phase 1 — The Wedge: Win One Segment Cold
*Business gate (unchanged): first real closed transactions, repeatable process definition, first
realized-pricing data point.*

The strategic reframe for engineering: **Phase 1's deliverable is not a product, it is a dataset.**
The concierge deals run by the founding transactors are the labeled corpus that trains everything
in Phase 2. If those deals close without emitting structured events, Phase 1 succeeded
commercially and failed strategically.

| Workstream | Deliverable |
|---|---|
| W0 | Full instrumentation of the concierge process; **Position Ledger and portfolio intake for non-transacting sellers (A1)**; structured outcome record on every closed deal; **pass reason codes captured** |
| W1 | Structured mandate capture + NL mandate intake with human confirmation; rules-and-similarity matching; **transfer-legality eligibility pre-filter with reasons and citations**; reverse matching shown to sellers; standing portfolio-wide demand map with change log |
| W2 | Stage 1 evidence sheets only — comparables with provenance, **no predictive model** |
| W3 | Internal analyst diligence tool: extraction with span citations, checklist verification; **counterparty-facing transferability layer (A2)** — six provision types, span-cited, named reviewer, no display without citation |
| W10 | T-0 document intake path hardened; the closing-mechanics surface (GP consent, ROFR clocks, §1446(f) certifications) run manually but **instrumented**, so the integration built in Phase 2 replaces a measured process rather than an imagined one |
| W4 | Counsel-approved template library + clause-locked generation for teaser, process letter, NDA; named sign-off enforced |
| W5 | Origination desk copilot (internal) |
| W8 | Warehouse, golden eval sets, model registry v1 |

**Added technical gates:**
- Human-minutes-per-closed-deal **baseline** measured and recorded (this is the number every later
  phase is judged against).
- ≥90% of closed deals have a complete structured outcome record.
- Zero uncorrected T2 factual defects reaching a counterparty; reviewer override rate tracked and
  non-trivial (evidence that review is real).
- **At least one institutional portfolio under record that has not transacted (A1)**, with
  transferability coverage ≥90% of its NAV, human-reviewed and cited, and its coverage gaps shown
  to the client rather than hidden.
- Extraction F1 for the six transferability provision types measured against an analyst-labeled
  gold set and recorded in the model registry before the layer is shown to any counterparty.

### Phase 2 — The Liquidity Engine
*Business gate (unchanged): matching and pricing automation live on real deals; three asset classes
transacting; first paying data-subscription customers.*

| Workstream | Deliverable |
|---|---|
| W1 | Learned ranker live with reason codes; NL search over supply for buyers |
| W2 | Stage 2 pricing model: banded output, conformal intervals, suppression rules, published methodology |
| W3 | Counterparty-facing diligence summaries and automated data-room analysis |
| W5 | Buyer and seller copilots, entitlement-scoped, supervised-communication logging |
| W6 | Behavioral anomaly detection v1 on bidding and access patterns |
| W7 | Self-serve data rooms, e-signature, closing workflow, live status across the marketplace table |
| W8 | Feature store with point-in-time correctness, shadow-mode promotion, drift monitoring, full eval harness |
| W9 | Benchmark subscription v1 with k-anonymity enforcement and re-identification testing |
| W10 | T-1 read integrations with the administrators holding our first portfolios' NAV; **GP-facing PTP transfer-capacity tracker** (deterministic, evidence-backed) as the wedge product |

**Added technical gates:**
- Pricing model beats the naive cohort-mean baseline on a temporally-split backtest by a
  pre-registered margin, **and** interval coverage is within tolerance of nominal.
- Matching drives a measurable lift in bids-per-listing versus the Phase 1 concierge baseline.
- At least one production administrator or transfer-agent integration carrying real position data,
  with the T-0 document path still fully operable as a fallback.
- **Recurring revenue from a seller under record who has not transacted (A4)** — the first hard
  evidence the category exists as a budget line rather than as our vocabulary.
- Human-minutes-per-closed-deal down materially against the Phase 1 baseline — the automation
  dividend, proven with a number rather than asserted.
- Adversarial security review of retrieval scoping and prompt injection passed before any
  counterparty-facing copilot goes live.

### Phase 3 — Category Definition & Scale
*Business gate (unchanged): top-tier by deal count, credible RFP alternative, marquee reference
deal.*

| Workstream | Deliverable |
|---|---|
| W2 | Published benchmark series with methodology, sample disclosure, and revision policy — plus the **administration apparatus** that makes it citable: permanent methodology URL, named methodology committee, contributor code of conduct, fixed calculation cadence, restatement policy, independent review of the calculation |
| W10 | T-2 write/instruct integrations: transfer instruction packets, GP consent routing, §1446(f) certification collection, ROFR notice clocks, register-update confirmation as a structured event |
| W5 | Bounded agentic execution over an enumerated action space, human approval on all external effects |
| W6 | Mature fraud/collusion detection; continuous control monitoring |
| W7 | GP workflow embedding: CV election and allocation, waterfall calculators, LP consent tracking (deterministic per P3) |
| W9 | Institutional API with entitlements; multi-region data residency for European/Middle East/APAC expansion |
| §3 | **Publish model cards and methodology externally.** Incumbents disclose nothing about how their price views are formed. Explainability, published, is a competitive weapon in the RFP the General Counsel reads. |

**Added technical gates:** benchmark cited by at least one third party who does not transact on the
platform; API in production with institutional integrations; independent model validation review
completed and its findings closed.

### Phase 4 — The Full-Stack Exchange
*Business gate (unchanged): adjacent liquidity products or infrastructure licensing live;
independence-vs-strategic-exit decision made from leverage.*

| Workstream | Deliverable |
|---|---|
| W7 | Auction/continuous matching engine with order-book semantics if ATS structure is pursued |
| W9 | Infrastructure licensing (pricing API, matching-as-a-service) bundled with the model governance package |
| W9 | Consortium contribution model: data-for-access with competitors and administrators |
| W8 | Multi-tenant model serving with per-licensee isolation and per-licensee evaluation reporting |
| W10 | T-3 embedded: administrators and GPs run their own transfer workflow inside the platform. At this point the venue is operationally load-bearing for parties who are not our customers in the transactional sense — which is the definition of infrastructure |

**Added technical gate:** a third party sets or defends a price using our benchmark in a
transaction we are not party to. That is the moment the infrastructure thesis in
`docs/roadmap.md` §3 Phase 4 is proven.

---

## 6. Reference Architecture (layers, not vendors)

```
Counterparty surfaces   Marketplace UI (design-brief §7) · Buyer/Seller copilots · Institutional API
------------------------------------------------------------------------------------------------
Application services    Listing · Mandate · Bid · Deal workflow · Data room · Doc generation
                        Entitlements & information barriers (enforced on every call, incl. model calls)
------------------------------------------------------------------------------------------------
Intelligence layer      Matching ranker · Pricing engine · Extraction/diligence · Generation
                        LLM gateway (versioning, logging, redaction, vendor abstraction, kill switches)
------------------------------------------------------------------------------------------------
Governance layer        Model registry · Evaluation harness · Review queues & sign-off
                        Hash-chained audit ledger (human actions + inference events, one timeline)
------------------------------------------------------------------------------------------------
Data layer              Event spine · Deal graph · Per-deal isolated document indexes (P1)
                        Shared outcome corpus (de-identified, licensed, threshold-gated)
------------------------------------------------------------------------------------------------
Platform                Identity/KYC · Encryption & key management · WORM retention · Observability
```

**Build/buy rule:** buy anything commoditized and not corpus-touching (foundation models, KYC/AML
screening, e-signature, VDR primitives, OCR). Build anything that touches the proprietary corpus or
the governance record (deal graph, matching, pricing, evaluation, audit ledger). The governance
layer is deliberately drawn as a peer of the intelligence layer, not a subsystem of it.

---

## 7. Cold-Start Reality Check

The corpus starts empty. Stating that plainly is consistent with the content-integrity rule in
`docs/design-brief.md` §9 and with the "illustrative until real" discipline the prototype already
follows.

- **Do not** publish a pricing benchmark, an accuracy claim, or a "trained on X deals" statement
  before the underlying data exists.
- **Do** publish the methodology and the sample size from day one, including when the sample size
  is small. `n=11` disclosed honestly is a stronger institutional signal than an undisclosed model.
- **Do** use expert priors from the founding transactors, tagged and attributed as priors, and
  down-weight them as platform-realized data accrues. Publish the platform-data share of every
  estimate; watching that number climb toward 100% is the most credible progress metric the
  business has.
- **Do** treat every external data source as a licensing question before an engineering question.
  Ingesting a competitor's published pricing survey into a commercial product without checking
  terms is a legal exposure, not a shortcut.

---

## 8. Instrumentation: What Gets Measured

| Loop stage | Metric | Owner |
|---|---|---|
| Cost structure (north star) | **Human minutes per closed deal**; fully-loaded cost to close per $1M of NAV transacted | Head of Product |
| **Category coverage (A3)** | **Record coverage** (% of client NAV with a normalized, source-cited position); **transferability coverage** (% of client NAV with a reviewed, cited transfer/consent/ROFR state); **price coverage** (% of client NAV in a cohort meeting the minimum-n evidence threshold). Per `docs/category-strategy.md` §1.6 these are per-client, published to the client with gaps visible, and are the spec-sheet metrics we want the whole market measured on | Head of Product |
| Integration depth (W10) | Positions under record fed by integration vs. document intake; funds with live transfer-capacity tracking; days from bid acceptance to confirmed register update (the real "time to close") | W10 |
| Mandate capture | Structured mandates on file; field completeness; NL-intake field acceptance rate | W1 |
| Matching quality | Bids per listing; precision@k against bid/close labels; seller-side "qualifying mandates shown" accuracy | W1 |
| Pricing quality | MAE of indicative midpoint vs. realized close (% of NAV); interval coverage vs. nominal; cohort backtest by vintage/strategy; share of estimate attributable to platform-realized data | W2 |
| Diligence | Extraction F1 vs. analyst-labeled gold set; citation validity rate; analyst hours per deal reviewed | W3 |
| Generation | Redline/edit distance per document (target: declining); T2 factual defect count (target: zero uncorrected); clause-library coverage rate | W4 |
| Governance health | Reviewer override rate per capability (a near-zero rate triggers audit); sampling-audit findings; time-to-reproduce a historical output | Compliance |
| Trust floor | Verification false-positive/negative rates; entitlement-violation incidents (target: zero); adversarial test pass rate | W6 |
| Data business | Benchmark subscribers who never transact; API calls by institution; contribution-model participants | W9 |

---

## 9. Technical Risk Register

| Risk | Why it matters here | Mitigation |
|---|---|---|
| Cold-start pricing model shipped too early | A miscalibrated band on an early real deal destroys the trust the entire thesis depends on | Evidence sheets in Phase 1; n-threshold and backtest gate before Phase 2 launch; suppression rules; bands never points |
| Hallucinated legal term in a T2 document | Potential misrepresentation in a securities transaction | Clause locks, no free-text legal generation, machine diff, named human sign-off, counsel-owned library |
| Confidential information leaking across deals via retrieval or summarization | Single worst failure mode; ends the venue | P1 per-deal isolation; entitlement checks on every model call; adversarial testing incl. document-borne prompt injection; zero-tolerance incident policy |
| Data-rights clause missing from early agreements | Silently invalidates the Phase 2 data product and the Phase 4 licensing business | **Phase 0 blocker**; legal review of the executed clause before the 20-counterparty gate is called complete |
| Rubber-stamp human review | Governance becomes theatre; the audit trail documents negligence rather than diligence | Track override rates; sampling audits; reviewers see diffs and citations, not just outputs |
| Vendor model change silently alters behavior | Reproducibility and validation break without a deploy | Pin model versions; contractual change notice; regression suite on every version bump; shadow mode before promotion |
| Instrumentation deferred during Phase 1 concierge crunch | The most likely real-world failure: deals close, data doesn't get captured, Phase 2 has nothing to train on | Event emission is definition-of-done for every Phase 1 workflow; ≥90% outcome-record completeness is an explicit Phase 1 gate |
| Incumbent bolts on document AI | Erodes the cost-reduction advantage, not the data advantage | Sequenced accordingly: W4 is margin, W0/W1/W2 are moat. Never confuse the two in planning or in pitch |
| Benchmark publication triggers regulatory obligations | Benchmark administration rules in some jurisdictions | Counsel review before Phase 3 publication; methodology and governance documented in advance |
| **Product design breaches a PTP safe-harbour condition** | A firm-quote order book, a sub-waiting-period close, or an untracked volume cap on LP interests can jeopardise a fund's pass-through tax status — the one failure a GP never forgives, and it would end our access to the GP-led segment entirely | Treat the §1.7704-1(g) conditions in `docs/roadmap.md` §2A.3 as enforced product logic with GP-visible evidence, not as guidance: non-firm quoting, hard waiting-period clocks on the listing lifecycle, and per-fund per-tax-year capacity tracking. Tax counsel reviews the listing lifecycle **as specified in code**, not as described in a deck |
| **Schema encodes the listing-rooted frame** | A deal graph rooted on `Listing` cannot represent a non-transacting client, which is the entire category thesis; the cost of changing it rises with every ingested portfolio | Fix `entities.ts` / `events.ts` to root on `Position` before the first real portfolio is ingested (W0 implementation note) |
| **Administrator dependency becomes a chokepoint** | The integration moat is bilateral: an administrator could gate access or build competing tooling | Multiple administrators, never one; T-0 document intake permanently supported so no counterparty can cut off data entry; solve the GP's problem rather than the administrator's |
| **A well-funded clone copies the surface** | The UI, the fee schedule, and the marketing are all copyable within a quarter, and capital compresses that further | Compete on what capital cannot compress: executed pre-transaction data rights, accumulated pass/bid labels, gold-set-validated transferability extraction, administrator integrations, and GP relationships built through the capacity tracker. Audit every quarter's roadmap for the ratio of surface work to compounding work |

---

## 10. Technical Hiring — Addendum to `docs/roadmap.md` §6

| Role | Why | Phase |
|---|---|---|
| Founding engineer — data platform (event spine, deal graph, entity resolution) | The substrate everything compounds on; hire before any ML hire | 0 |
| Security/infrastructure lead | Already in `docs/roadmap.md` §6; owns entitlements, audit ledger, WORM retention | 0 |
| Applied ML engineer — retrieval and document intelligence | Ships W3/W4, the fastest cost-to-serve win | 1 |
| Head of Product (matching & pricing systems) | Already in `docs/roadmap.md` §6; owns the concierge→automation transition | 1–2 |
| Quantitative researcher — pricing (secondaries or credit/illiquid-asset background) | Owns W2; must be someone comfortable saying "the sample is too thin to price this" | 2 |
| ML platform engineer | Feature store, registry, eval harness, shadow deployment | 2 |
| **Model risk / AI governance owner** (may sit under Head of Compliance initially) | Owns the AI Use Register, tiering, validation, and sampling audits; independent of the team shipping the models | 1–2, independent by 3 |
| Data product manager | Owns W9 benchmark and API commercialization | 2–3 |
| Integrations engineer (fund admin / transfer agent formats and operations) | Owns W10; this is an operations-literate engineering role, not a generic API role — the hard part is inconsistent formats and an administrator's transfer team, not HTTP | 2 |
| **Retained tax counsel, separate from securities counsel** | `docs/roadmap.md` §6 names securities counsel only. The PTP/§7704 safe harbours, §1446(f) withholding, and ERISA plan-asset limits (`docs/roadmap.md` §2A) are **tax and ERISA questions that constrain the product surface**, and a securities lawyer will not answer them. Engaging only one of the two is the most likely way this company gets a structural constraint wrong late | 0 |

---

## 11. Change Control

This document and `docs/roadmap.md` are a matched pair. Any change to phase definitions, gates, or
sequencing must be applied to both in the same edit. A technical capability that cannot be assigned
to an existing phase and an existing business gate is not ready to be scheduled — it is a proposal,
and it belongs in a discussion, not in the plan.

The test for every item above remains the four-lens test from `docs/roadmap.md` §0: is it good
product engineering (does it *delete* a step rather than automate one), good infrastructure
strategy (does it deepen the corpus or the workflow lock-in), good timing (does it serve structural
sellers the incumbents are too slow or too expensive to serve), and good institutional risk
discipline (would it survive the scrutiny of a General Counsel reading the audit trail after
something went wrong)? A workstream that passes only three is not ready.
