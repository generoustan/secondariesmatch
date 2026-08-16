# SecondariesMatch — Category Strategy

**Prepared by:** Architect (standing strategy agent)
**Subject:** The category SecondariesMatch is creating, the smallest build that proves it, and the
search vocabulary that makes the category findable and ownable.
**Companion to:** [`docs/roadmap.md`](roadmap.md) (business phases, wedge, fee model, trust
doctrine), [`docs/technical-roadmap.md`](technical-roadmap.md) (workstreams W0–W9, model risk,
instrumentation), [`docs/design-brief.md`](design-brief.md) (product surface, voice,
content-integrity rules).
**Status:** v1.1 — living document. Inherits Phases 0–4 from `docs/roadmap.md` §3. Adds **no new
phases**. Where it proposes changes to an existing phase or gate, those changes are listed in §5
as amendments requiring founder sign-off and matched-pair edits per `docs/technical-roadmap.md` §11.
**v1.1:** amendments A1–A5 in §5 are **adopted and in force** in `docs/roadmap.md` v1.1 and
`docs/technical-roadmap.md` v1.1. See the status note in §5 for where each now lives.

This document does not restate the phase structure, the workstream list, the incumbent process
teardown, or the model-risk policy. Read those there. This document answers one question the other
two deliberately left open: **what is the name of the thing we are building, such that the market
eventually has no other word for it.**

---

## 0. Why "category creator" is a different instruction from "category leader"

`docs/roadmap.md` §3 Phase 3 is titled "Category Definition & Scale," and its gate is *"credibly
named alongside or in place of bulge-bracket advisors in institutional RFPs."* That gate is a
**category leader** gate. It measures us against a frame the incumbents authored: *secondaries
advisory*. Winning it means being the cheapest, fastest, most auditable secondaries advisor.

That is a good business. It is not the maximal business, and it is strategically fragile in one
specific way: **inside the advisory frame, our advantages are all deltas.** Cheaper fee, faster
close, better audit trail — every one of those is a comparative on an axis Evercore and Park Hill
already own and can move on. A fee cut is copyable in a quarter (`docs/roadmap.md` §8 already
concedes this). A frame is not.

Category creation is a different move: **change the noun, not the adjective.** Don't be the best
secondaries advisor. Make "secondaries advisor" the wrong thing to be buying.

Two reference cases, both cited in `docs/roadmap.md` §1 but not pushed to their real conclusion:

- **Carta** did not win by being better than a law firm at maintaining a cap table. It reframed the
  cap table from a *document a law firm produces at events* into a *system a company runs
  continuously*. The reframe created a buyer (the finance/ops lead), a budget line (annual
  software, not per-event billables), a spec sheet (409A turnaround, scenario modeling, audit
  readiness), and eventually a job function. Law firms could not follow: their revenue model
  requires the event, not the system.
- **CRM** did not win by being better contact-management software. It named a *function* the
  company was already performing badly and unnamed, then sold the system of record for it. Once
  "CRM" existed as a word, "we keep customers in a spreadsheet" became an admission rather than a
  default.

The test for whether a name is a category or a tagline is mechanical: **does it create a new buying
committee, a new budget line, a new spec sheet, and a new thing people search for?** A tagline
changes how we describe the same purchase. A category changes what is being purchased, who signs
for it, and out of which budget.

---

## 1. The Category

### 1.1 The name

> **SecondariesMatch is building the private-market liquidity system of record.**
>
> Category shorthand: **liquidity system of record (LSR)**.
> Function it serves: **private-market liquidity management** — the continuous, owned function of
> knowing what an institution's private-market book is worth to a buyer, what of it can legally
> move, and who is bidding for it, at all times, whether or not a transaction is in progress.
> The exchange is the *execution surface* of that system. It is not the category.

One name. No alternates. The rejected candidates and why are in §1.5, because rejecting well is
part of defending the choice.

### 1.2 What the category asserts

The advisory frame treats liquidity as an **event**: a decision is made to sell, a bank is hired, a
process runs for 6–12 months, the deal closes, and per `docs/technical-roadmap.md` §1.1 step 10,
*the deal dies and the data dies with it*. Between events, the institution knows nothing new about
its own book. Its private-market NAV — often the largest, least liquid, least monitored block on
the balance sheet — is dark until someone pays a bank 1–2% to shine a light on one corner of it.

The LSR frame treats liquidity as a **state**: every position in the book carries, continuously and
verifiably, three facts —

| The three facts | Question it answers | Where it comes from |
|---|---|---|
| **Record** | What do I hold, at what NAV, as of when, sourced from which document? | Portfolio intake → Position Ledger (§2.2) |
| **Transferability** | Can this legally move, on whose consent, subject to whose ROFR, on what notice? | LPA/side-letter extraction with span citations (W3, elevated to Phase 1 per §5 A2) |
| **Demand** | Who would bid for this right now, at roughly what, on what evidence? | Mandate registry + evidence sheets (W1, W2 Stage 1) |

An institution that holds those three facts continuously is running a liquidity function. An
institution that does not is calling a bank. **The category is the system that holds the three
facts.** Everything else in the product — listings, data rooms, bid capture, closing workflow,
benchmark subscriptions — is either an input to that record or an action taken against it.

### 1.3 What this makes true that wasn't true before

This is the section that separates a category from a tagline. Each row is a *change in the buyer's
world*, not a change in our copy.

| | Old frame: secondaries advisory | New frame: liquidity system of record |
|---|---|---|
| **What is bought** | A process, once, when selling | A standing record of the book's liquidity state |
| **Buying committee** | Head of PE / CIO, plus IC approval for the specific transaction. Roughly 1.5 seats. | Head of Portfolio Management (owner), Investment Operations (administers the record), General Counsel (permissioning, audit, transfer compliance), Data/IT (API and residency), CIO/IC (only at the point of transacting). 4–5 seats. |
| **Budget line** | Transaction fee, netted out of proceeds, invisible, episodic, procyclical | Annual platform/data line in the operations or market-data budget, renewed without a transaction, countercyclical by construction |
| **Trigger to engage** | "We have decided to sell" | "We need to know what we could sell" — which is a permanent condition, not a decision |
| **Spec sheet** (what vendors get compared on) | Rolodex quality, brand, league table position — all unfalsifiable | Record coverage %, transferability coverage %, price coverage (n per cohort), share of estimate from platform-realized data, days to first bid, artifact reproducibility, API. **All falsifiable and all published.** |
| **Failure mode it names** | None. Not selling is not a failure. | "We don't know what our book is worth to a buyer or what of it can legally move" becomes an articulable operational gap — the way "we keep the cap table in a spreadsheet" became one after Carta. |
| **Eventual job title** | None | Private-markets liquidity / portfolio management owner — already emerging at large allocators as a portfolio-management function distinct from manager selection |

The single most important row is **budget line**. Advisory revenue exists only when transactions
exist, which means it collapses exactly when the denominator effect and wind-down pressure named in
`docs/roadmap.md` §1 make the record *most* valuable and transactions *hardest* to price. A record
subscription that renews in a frozen market is a lens-3 asset: it monetizes the moment incumbents
cannot serve, rather than waiting out the cycle alongside them.

### 1.4 Why the old frame cannot absorb this

The honest test of a category claim is whether the incumbent can simply add it to their pitch deck
next quarter. Five structural reasons Evercore, Park Hill, Greenhill, Campbell Lutyens, PJT, and the
bank desks cannot:

1. **The cannibalization bind** (already identified in `docs/technical-roadmap.md` §1.4, and it is
   the load-bearing argument). Being the record means publishing what things clear at. Their fee is
   justified by holding that knowledge privately. Externalizing price memory into a queryable
   product destroys the informational asymmetry that prices the mandate. We pay nothing to publish;
   they pay their margin.
2. **Free-at-rest is structurally impossible for a labor business.** An LSR must maintain a live,
   valuable relationship with a client who is not transacting and generates no fee this year. A
   deal team compensated on closed fees cannot fund that. Software can, because marginal cost of
   holding a record is near zero. This is the same asymmetry that let cap-table software maintain
   ten thousand dormant records while a law firm could not maintain one for free.
3. **Neutrality.** A bank sits on one side of a transaction and runs information barriers between
   its own desks. It cannot credibly be the *shared* record that both sides and eventually
   competitors price off. A venue can — that is the entire Phase 4 consortium logic in
   `docs/technical-roadmap.md` W9.
4. **The record cannot be bought retroactively.** A system of record is an accumulation. A firm
   that starts one today has, today, zero positions under record, zero transferability extractions,
   zero pass labels, zero realized prices. Time is the moat and it does not compress. This is why
   `docs/technical-roadmap.md` §5 insists Phase 1's deliverable is a dataset, not a product — that
   line is now the category thesis, not just an engineering preference.
5. **No organizational owner.** There is no MD at a bulge-bracket advisory whose comp is tied to a
   persistent data asset that pays out in three years. Advisory org charts have no seat for it.

What *would* be absorbable — and is therefore explicitly **not** our category claim: a cheaper
placement fee, an online listings board, an AI teaser generator, a "secondaries marketplace." Each
of those is fully describable inside the advisory frame ("Evercore with a website"), which is why
each is a positioning tagline, not a category. We will build several of them; none of them is what
we are called.

### 1.5 Names considered and rejected

| Candidate | Why rejected |
|---|---|
| **"The secondaries operating system"** | Fails the lens-2 test. "OS" is a metaphor with no verifiable referent — Evercore can print it on a pitch page tomorrow and no one can falsify it. A category name should be a claim that can be *checked*: either we hold the record or we don't. Also a saturated construction in B2B. |
| **"Private-market liquidity infrastructure"** | Accurate but not boughtable. Nobody issues a purchase order for "infrastructure." It names the ambition (`docs/roadmap.md` §0 lens 2) without naming the unit of purchase, so it creates no budget line and no committee. Keep it as internal doctrine, not as the category. |
| **"The secondaries clearing layer"** | "Clearing" carries specific regulatory meaning. Using it before an ATS/clearing structure exists is exactly the trust-for-speed trade `docs/roadmap.md` §5 says to refuse. Lens-4 failure. |
| **"The institutional secondaries exchange"** | Already the positioning line in `docs/design-brief.md` §2/§6.3 and correct for the marketplace surface — but "exchange" describes the *venue where events happen*, which keeps us inside the episodic frame. It is the execution surface, not the category. Keep it in the hero; do not make it the category. |
| **"Liquidity system of record" (selected)** | Forces the moat: you cannot claim it without holding the corpus, the citations, and the audit ledger. Institutional buyers already know what "system of record" means and what it costs to be one. Incumbents cannot claim it for the five reasons in §1.4. |

### 1.6 The metric is half the category

Categories that stick ship with a **measure**, because a measure is what turns a word into a
procurement criterion: ARR, NPS, SOC 2 Type II, uptime SLA. The measure we should author and then
own is **liquidity coverage** — the share of a portfolio's NAV that is under record, with
transferability resolved and with a price evidence base meeting a minimum sample:

```
Record coverage          = % of client NAV with a normalized position sourced to a document
Transferability coverage = % of client NAV with a reviewed transfer/consent/ROFR state + citation
Price coverage           = % of client NAV in a cohort meeting the minimum-n evidence threshold
Platform-data share      = % of the price estimate derived from platform-realized closes vs. priors
```

Naming collision to avoid: "Liquidity Coverage Ratio" is a Basel III bank term. Never abbreviate
ours to "LCR" in customer-facing material; write "liquidity coverage" in full.

The fourth line already exists in `docs/technical-roadmap.md` §7 and §8 as an internal honesty
metric. Promoting it to a **published, per-client, category-defining number** is the single
cheapest category-creation act available to us: it is a metric only a system of record can compute,
it makes our weakness (a cold corpus) legible as progress rather than hidden as a gap, and once a
CIO has seen their own coverage number, every competitor gets asked for theirs.

### 1.7 Four-lens check on the category itself

| Lens | Verdict |
|---|---|
| **1 — First-principles product** | Passes, and sharpens the roadmap. The advisory *engagement itself* is the step being deleted, not just the teaser and the bid spreadsheet. A record that is always current makes "hire a bank to find out what your book is worth" an unnecessary step, not a faster one. |
| **2 — Infrastructure as moat** | Passes strongly. The name is unclaimable without the corpus, so marketing and engineering point at the same asset. Contrast with "operating system," where the pitch could run years ahead of the data and nobody would notice until a competitor shipped the same words. |
| **3 — Contrarian timing** | Passes. Record revenue is countercyclical to transaction revenue: the frozen market that starves an advisory book is the market where knowing your options is worth most. Also opens the middle-market seller who will *never* pay a bank a retainer but will onboard a portfolio for free and transact later. |
| **4 — Institutional trust** | **Tension, named.** Claiming "system of record" while holding roughly nothing is precisely the fabricated-authority failure `docs/design-brief.md` §9 forbids. **Resolution:** the category frame is internal doctrine now and becomes external language only under the gate in §4.4 — we do not say "system of record" in public until we can show a named client their own coverage numbers, gaps included. |

---

## 2. Turning the category into a build plan

Audience for this section: a technical co-founder or Head of Product who has read
`docs/technical-roadmap.md` §4 and needs the next level of concreteness. Nothing here adds a
workstream. It **reorders and specifies** what already exists, because the category claim changes
which slice of W0/W1/W3 must exist first.

### 2.1 The one build-order decision that follows from the category

The advisory frame says build the marketplace first: listings, filters, bid button — the surface
specified in `docs/design-brief.md` §7. The LSR frame says build the **client's own book** first,
and the marketplace second, because the marketplace is what a seller uses *after* they have decided
to sell, and the record is what makes them decide.

Concretely, and this is the crux: **the first thing we build is not a listings table, it is a
portfolio importer.** Carta's actual wedge was ingesting a messy spreadsheet cap table and quietly
becoming the record; the securities issuance workflow came after. Our equivalent artifact is the
LP's quarterly capital account statements and portfolio schedule. It is unglamorous, it is
document-processing drudgery, and it is the only entry point that gives us a durable relationship
with an institution that is not currently selling anything.

Note the pleasant side effect for the cold-start problem in `docs/technical-roadmap.md` §7: **the
record and the transferability layer require no corpus at all.** They are extraction from documents
the client hands us. We can deliver category-defining value on day one, with n=0 closed deals,
without making a single price prediction. That is the resolution to the tension between "the
corpus starts empty" and "we need to demonstrate something a bank cannot."

### 2.2 The first working demo, feature by feature

Five screens. Built in this order. Everything else is out of scope for the demo, and §2.5 lists
what we deliberately do not build.

**Screen 1 — Position Ledger.** The client's own book as a dense institutional table, using the
exact grammar of `docs/design-brief.md` §7 (tabular numerals, hairline rules, compact density
toggle, sortable numeric columns). Same component as the marketplace table, turned inward: the
marketplace shows the market's supply; the ledger shows *your* supply. Columns: Fund / Manager ·
Vintage · Strategy · Geography · Commitment · Paid-in · Distributions · Reported NAV · NAV as-of ·
Unfunded · Transferability badge · Demand badge · Price-evidence badge. Every numeric cell links to
the source document page it was extracted from. No cell is displayed without a citation.

Minimum position record (the data contract the Head of Product should freeze first):

```
position_id, counterparty_id, fund_id, manager_id, vehicle_id,
commitment, paid_in, distributions, reported_nav, nav_as_of, unfunded,
currency, vintage, strategy, geography, sector_mix,
source_doc_id, source_page, source_span, extraction_confidence, confirmed_by, confirmed_at,
transferability_state, consent_state, rofr_state, restriction_expiry, notice_period_days,
entitlement_scope, record_status
```

**Screen 2 — Position detail drawer.** Four stacked panels, right-side drawer per
`docs/design-brief.md` §7.4:
- *Transferability* — permitted / consent required / ROFR with N-day notice / restricted until
  date, each with a click-through to the exact LPA or side-letter span. This is the panel no
  incumbent can produce on demand and no listings site has any reason to build.
- *Demand* — count and anonymized profile of live qualifying mandates, with reason codes per W1
  ("matches stated strategy and vintage band; NAV size within stated check range; buyer has closed
  three comparable positions on-platform"). Never counterparty identities pre-NDA.
- *Price evidence* — W2 Stage 1 only: comparables with provenance, sample size, and the
  platform-data share. Hard suppression below minimum n, displaying the sentence
  `docs/technical-roadmap.md` W2 already drafted: *we don't have enough data to price this yet.*
  **No point estimate. No band. No model.**
- *Documents & gaps* — what we hold, what is missing, what is stale.

**Screen 3 — Liquidity Map (the summary artifact).** One page the Head of Portfolio Management can
put in front of an IC without editing: total NAV under record; the three coverage numbers from
§1.6; and the book split by NAV into *movable now* / *movable with GP consent* / *ROFR-encumbered* /
*restricted*. This single page is the category made visible. It is also the artifact that should be
generated as a PDF with a stable ledger reference, because it will be forwarded internally and must
carry its provenance with it.

**Screen 4 — Demand Map, standing and dated.** The whole book against the whole live mandate
registry, refreshed on a fixed cadence, **with a change log**: "2 mandates newly qualify for
Position 14 since last week; 1 lapsed." The change log is what converts a report into a system —
it is the reason to log in on a week when nothing is being sold, and it is the surface that makes
the subscription renew. `docs/technical-roadmap.md` W1 specifies reverse matching *at listing
intake*; making it standing and portfolio-wide is the category version of the same machinery.

**Screen 5 — Audit & Replay (the General Counsel screen).** Every access, every extraction, every
AI output with capability ID, risk tier, model and prompt-template version, reviewer, and
disposition, on one timeline per `docs/technical-roadmap.md` §3.4 — plus a working **"reproduce this
artifact"** action that re-derives a past output from its recorded snapshot. Almost no institutional
software demos this screen. Demoing it is the fastest way to make the audit-trail claim in
`docs/design-brief.md` §6.8 falsifiable rather than decorative, and it speaks directly to the GC
persona in §3 of that brief who decides whether the fund may even view the deal list.

### 2.3 The smallest end-to-end slice that convinces a skeptic

A skeptical institutional buyer is not convinced by a close. Banks close deals. **They are convinced
by a replay.**

The proof artifact is the **golden thread**: one real position, followed end to end, then
reconstructed from the ledger in front of the skeptic.

1. The position enters as a line in a PDF capital account statement.
2. It is normalized into the ledger, every field citing its source span.
3. Its LPA is parsed; transferability, consent, and ROFR states are extracted, reviewed by a named
   human, and cited.
4. It appears in the Demand Map against real mandates with reason codes.
5. It is listed; NDA executed; entitlement-scoped data room opened; structured bids captured.
6. It closes. Realized price, bid count, bid dispersion, and days-to-close are written as a
   structured outcome record.
7. The de-identified outcome graduates into the shared corpus behind the aggregation threshold —
   and **a different client's evidence sheet visibly changes as a result.**
8. We replay all of it from the ledger: every artifact, every model version, every approval,
   reproducible.

Step 7 is the one that proves the category, because it is the compounding loop in
`docs/technical-roadmap.md` §1.3 rendered as a thing you can point at on a screen rather than a
diagram in a document. Step 8 is the one that proves the trust bar. A bank can do steps 1–6 with
analysts. No bank can do 7 or 8, for the reasons in §1.4.

### 2.4 Sprint sequence (proof-gated, no calendar dates)

Consistent with `docs/roadmap.md` §7: gates are proof, not dates. Each sprint is one to three
engineers plus the founding transactors' time. Sprints S0–S4 sit inside Phase 0; S5–S8 sit inside
Phase 1.

| Sprint | Build | Done-when (the gate) |
|---|---|---|
| **S0 — Rights before code** | Counsel-approved intake agreement covering documents submitted by a **non-transacting** client: processing scope, dormant-record retention, deletion rights, and the de-identified-outcome license already required as a Phase 0 blocker by W0. Entitlement and retention policy for records with no live deal. | One real counterparty has signed it. No portfolio document is ingested before this exists. This is the cheapest failure to avoid and the most expensive to retrofit. |
| **S1 — Ledger + spine** | Position Ledger core; deal-graph entities (Counterparty, Manager, Fund, Vehicle, Position, Mandate, Event); hash-chained append-only event log with a single writer library; entity resolution v0 as a **human-confirmed alias table with fuzzy candidate generation — explicitly not an ML resolver yet**. | One real portfolio of ≥20 positions normalized from source documents; full state rebuilt from events matches current state exactly; every displayed field carries a source span. |
| **S2 — Transferability layer** | Extraction of six provision types — transfer restriction, GP consent, ROFR/ROFO + notice period, permitted transferee definition, transfer windows, transfer/admin fees — with span citations and a human confirm queue (T1 per `docs/technical-roadmap.md` §3.2, named reviewer, no display without citation). | ≥90% of the pilot portfolio's NAV has a reviewed transferability state; extraction F1 measured against an analyst-labeled gold set of ≥25 LPAs and recorded in the model registry; zero uncited fields shipped. |
| **S3 — Mandate registry + demand map** | Structured mandate objects and NL mandate intake with field-by-field confirmation (W1, unchanged); rules-plus-similarity matching; standing portfolio-wide demand map with reason codes and a weekly change log. **No learned ranker** — there are no bid/pass labels yet. | ≥25 real verified buyer mandates captured as structured objects; a founding transactor independently agrees with ≥80% of the qualifying-mandate calls on the pilot book. Human agreement is the correct cold-start eval when outcome labels do not yet exist. |
| **S4 — Liquidity Map + client surface** | Read-only, entitlement-scoped client surface assembling Screens 1–3; W2 Stage 1 evidence sheets with hard suppression; the three coverage numbers computed and displayed including gaps; PDF export with ledger reference. | A real CIO or Head of Portfolio Management has been walked through **their own** book and the coverage gaps were shown, not hidden. Suppression observed firing on thin cohorts rather than being asserted in a doc. |
| **S5 — Execution slice** | Listing creation from a ledger position (not from a blank form — the record is the source); NDA state machine with e-signature; watermarked entitlement-scoped data room; structured bid capture; closing checklist; clause-locked generation (W4) restricted to teaser, process letter, NDA. | One real closed transaction. Human-minutes-per-closed-deal baseline recorded per `docs/technical-roadmap.md` §5 — this number is the denominator for every automation claim we will ever make. |
| **S6 — Corpus graduation** | The de-identification and aggregation job that promotes a closed deal's outcome fields into the shared corpus behind the threshold, with lineage tags separating platform-realized data from expert priors. | **Another client's evidence sheet changes because a real deal closed.** This is the loop proven, and it is the screenshot that goes in the Series A deck. |
| **S7 — Product, not consultancy** | Whatever S1–S6 revealed to be manual. Nothing new. | A second seller's portfolio is onboarded with **zero engineering tickets**. Until this passes, we have a services business with good software, and we should say so internally rather than to ourselves. |
| **S8 — The category proof** | Packaging, pricing, and renewal mechanics for the record itself. | **Revenue from a client who has not transacted.** A dollar of record subscription is worth more strategically than ten dollars of transaction fee, because it is the first evidence the category exists as a budget line and not just as our vocabulary. |

**Sequencing rationale in one line each:** S0 protects the corpus legally before it exists; S1–S2
deliver category value at n=0; S3 makes it two-sided; S4 puts it in front of a real institution;
S5 proves execution; S6 proves compounding; S7 proves it is a product; S8 proves it is a category.

### 2.5 Explicitly not in the first build

Naming the anti-scope is as load-bearing as naming the scope, because every item below is something
a well-meaning team will try to build first:

- **No pricing model, no band, no point estimate.** Evidence sheets only, per
  `docs/technical-roadmap.md` §3.6. Unchanged and non-negotiable.
- **No learned ranker.** Zero bid/pass labels exist. A ranker trained on nothing is a random number
  generator with a confidence display.
- **No counterparty-facing chat.** The origination-desk copilot is internal-first per W5. A chat box
  is the most copyable feature in the document and the most likely to leak across an entitlement
  boundary.
- **No order book, no continuous trading, no ATS semantics.** Phase 4, and only if volume and
  regulatory readiness justify it.
- **No public marketplace de-labeling.** `prototype/index.html` keeps its "Illustrative" tags until
  real inventory exists (`docs/design-brief.md` §9).
- **No ML entity resolution.** A human-confirmed alias table will carry us far past the first
  hundred positions and produces the labels an ML resolver would eventually need.

---

## 3. Search and SEO strategy

### 3.1 Honest framing before the keyword lists

Three things must be said before any list, or the list will be misread:

1. **No volume figures appear below because we have no keyword data.** Do not let anyone insert
   estimated monthly search volumes into this document without pulling them from a tool and citing
   the date. Fabricated volumes are the SEO equivalent of the fabricated marketplace stats
   `docs/design-brief.md` §9 forbids.
2. **This is a low-volume, extreme-value search market.** The total addressable search population is
   plausibly a few thousand humans globally. A single converted query on a $50M LP portfolio at a
   materially-sub-1% fee is worth more than most SaaS companies' entire organic channel for a month.
   Optimize for *which* individuals arrive, never for traffic.
3. **The incumbents have effectively vacated this surface.** Bulge-bracket advisory does not run
   performance content; their best market intelligence ships as **gated semi-annual PDFs**, which is
   exactly the format search engines and answer engines index worst. `docs/technical-roadmap.md`
   §1.1 already observes those surveys are stale and non-queryable. The SEO corollary is direct:
   **publish the same class of content as indexed, anchored, dated HTML with a stable methodology
   URL, and we take a search surface the incumbents have structurally abandoned** — not because
   they can't write it, but because their distribution model requires the email gate.

A fourth, increasingly load-bearing point: a growing share of the GC's and CIO's first research pass
now happens through AI assistants rather than a results page. The unit of victory is shifting from
*ranking* to *being the cited source*. Everything below should be built to be quotable: stable URLs,
explicit definitions, dated methodology, structured data, and numbers with sample sizes attached.
Our published methodology (`docs/technical-roadmap.md` W2 Stage 3) is the single most citable
artifact this company will ever produce.

### 3.2 Group A — Category-defining terms (own and define)

**Funnel role:** none, initially, by construction. These terms have close to zero volume today
because the category does not exist yet. That is the point. The job is to be the **only** credible
result at the moment someone hears the term from a peer, a panel, or an assistant and types it in.
This group is measured by *third-party adoption of the vocabulary*, not by sessions.

| Term | Notes |
|---|---|
| `private market liquidity system of record` | The canonical term. One definitional page, permanent URL, never renamed. |
| `liquidity system of record` | Broader capture; likely contested by adjacent fintech. Ours must be the private-markets answer. |
| `private market liquidity management` | The *function* name. Higher long-run value than the product name, because functions outlive vendors — this is the "customer success" or "revenue operations" slot. |
| `secondaries system of record` | Bridge term for readers still inside the advisory frame. Good landing target for search intent that starts at "secondaries." |
| `portfolio liquidity map` / `LP portfolio liquidity map` | The artifact name (§2.2 Screen 3). Artifact terms convert better than category terms because they describe something you can be handed. |
| `LP interest transferability report` | The S2 output as a named deliverable. Highest conversion potential in this group: it maps to an unmet, concrete, non-price need. |
| `liquidity coverage private markets` | The metric from §1.6. Owning the measure is more durable than owning the adjective. Always spelled out — never abbreviated (Basel collision). |
| `secondaries operating system` | **Defensive registration only.** We rejected the frame (§1.5) but should not leave the obvious near-variant for a competitor to plant a flag on. Redirect to the canonical page. |

**Asset to build:** one definitional page per term in the top half of this table, each with a
one-sentence definition in the first 40 words, a "what it is not" section, and the coverage metric
defined with a worked example. This is the standard category-creation play (the way a marketing
software company made "inbound marketing" a search-ownable noun) and it costs nothing but writing
discipline.

### 3.3 Group B — High-intent transactional terms

**Funnel role:** bottom of funnel. These are the terms a real seller or buyer types in the week they
have a decision to make. Volume is small; conversion value is enormous. This group funds everything
else and should be built **first**, before the category pages, because it produces deals while the
category vocabulary is still being seeded.

*Seller intent (highest priority — supply is the constrained side per `docs/roadmap.md` §8):*
- `sell LP fund interest` · `sell private equity fund interest` · `sell limited partnership interest secondary market`
- `sell my private equity stake` · `how to sell a fund commitment`
- `how much can I sell my LP interest for` — question-form, high intent, and the natural landing
  page is the transferability + evidence-sheet explainer, not a sales page
- `secondary sale of fund interest process` · `LP interest transfer process`
- `strip sale private equity` · `tender offer LP interest`

*GP-led intent:*
- `GP-led continuation vehicle process` · `continuation fund secondary` · `single asset continuation vehicle`
- `continuation vehicle LP election` · `status quo option continuation fund`

*Buy-side intent:*
- `buy LP fund interests` · `secondary market LP interests for sale` · `direct secondaries buyers`
- `secondaries deal flow platform`

*Pricing intent (bridges to the benchmark product):*
- `secondary market pricing private equity` · `discount to NAV secondary market`
- `LP interest pricing % of NAV` · `secondary market pricing survey`

**Two guardrails.** (a) Terms near `sell pre-IPO shares` and `sell startup equity` attract retail and
employee-shareholder traffic that we cannot serve and that costs compliance attention to filter —
either exclude them or build an explicit "institutional only" qualifier into any page targeting
them. (b) Nothing on a pricing-intent page may state a price level until real data exists; the page
sells the *methodology and the suppression rule*, which is a stronger institutional signal anyway.

**Adjacent-need capture (underrated):** `NAV loan alternative`, `NAV financing vs secondary sale`,
`LP liquidity options`, `denominator effect solutions`. Anyone researching NAV financing is a
structural seller who has not yet decided on a route. That is precisely the lens-3 buyer, and the
honest comparison page — when a NAV loan is genuinely the better answer, say so — is worth more
trust than any claim we could make about ourselves.

### 3.4 Group C — Comparison and incumbent-adjacent terms

**Funnel role:** mid-to-bottom funnel vendor diligence. Someone has decided to transact and is
building a shortlist. This is also the natural home for the published fee schedule that
`docs/roadmap.md` §3 Phase 1 already identifies as marketing rather than merely pricing.

**Recommended (organic content only):**
- `secondaries advisor fees` · `how much do secondaries advisors charge` · `secondary market advisory fee percentage` — **the strongest and safest cluster in this entire section.** Fee opacity is the incumbent business model (`docs/roadmap.md` §2); a sourced, neutral explainer of the ~1–2% placement fee norm, with our published schedule beside it, converts on the exact axis where we are structurally advantaged.
- `top secondaries advisors` · `best secondary market advisors` — list intent. Publish the genuinely useful, accurate market-structure comparison including firms better than us at large mandates. Being the definitive map of a market is a category-creator behavior; being defensive about it is a challenger behavior.
- `Evercore secondaries alternative` · `Park Hill secondaries alternative` · `Campbell Lutyens alternative` · `secondaries advisor alternatives for middle market` — legitimate comparison intent, and the middle-market qualifier is the honest one: our claim is not that we beat them at $500M mandates, it is that they are not structured to want $5–150M mandates (`docs/roadmap.md` §2).

**Rules, and these matter reputationally:**
- **No paid search on competitor trademarks.** Low incremental yield in a market this small, real trademark exposure, and it reads as scrappy to exactly the CIO we need to look institutional to. This is a lens-4 call and it should not be relitigated for a short-term pipeline target.
- **Never state what a specific named firm charges.** Cite the industry range as a range, sourced. `docs/roadmap.md` already frames 1–2% as an industry norm, not as any firm's disclosed schedule; keep that discipline in public copy.
- **Never imply affiliation, partnership, or that we are a substitute for their strongest use case.** Where they are better, say so. An honest comparison page that concedes something is the only kind a General Counsel finds credible.
- Describe their operating model as accurately as `docs/technical-roadmap.md` §1 does — *"they are extremely good at what they do; what they do is labor."* That sentence is the right register for all public comparison content: respectful, specific, and structurally devastating.

### 3.5 Group D — Informational and topical-authority terms

**Funnel role:** top of funnel and, more importantly, **trust building**. Per
`docs/design-brief.md` §3, a General Counsel is in the room before anyone is allowed to view the
deal list. The GC's research happens on these queries, months before a mandate exists. This is also
the corpus that makes us the source an AI assistant cites.

*Mechanics of transfer — the GC cluster (highest strategic value, lowest competition):*
- `LPA transfer provisions` · `GP consent to transfer LP interest` · `ROFR private equity fund transfer`
- `permitted transferee definition LPA` · `transfer restrictions limited partnership interest`
- `publicly traded partnership safe harbor secondary transfer` · `qualified matching service private fund`
- `ERISA plan asset rules secondary transfer` · `withholding on transfer of partnership interest`

  These are the questions that actually block deals, essentially nobody ranks for them well, and
  they map one-to-one onto the transferability layer we are building in S2 — the content and the
  product are the same asset. **Requirement:** counsel-reviewed, dated, and carrying the
  not-legal-advice disclosure discipline of `docs/technical-roadmap.md` §3.5. Getting one of these
  wrong is worse than not publishing.

*Process education:*
- `how does a secondary sale of a fund interest work` · `secondaries transaction process steps`
- `secondaries due diligence checklist` · `LP interest transfer agreement`

*Market structure and macro:*
- `denominator effect private equity` · `LP portfolio rebalancing private markets`
- `secondary market volume` · `continuation vehicle trends`
- `how are secondaries priced` · `secondary market pricing methodology`

*Trust and eligibility:*
- `qualified purchaser vs accredited investor` · `KYC for institutional investors`
- `SOC 2 virtual data room` · `audit trail secondary transaction`

*Glossary layer:* one page per term for the vocabulary already listed in `docs/design-brief.md` §2
(NAV, unfunded commitment, bid-ask spread, strip sale, direct secondary, GP-led, ROFR, stapled
secondary, deferred consideration, preferred equity solution). Glossaries are unglamorous,
compounding, and disproportionately cited by answer engines.

### 3.6 Build order and measurement

**Publish in this order.** Group B seller-intent pages first (they produce deals now) → Group D
GC/transfer-mechanics cluster (trust, and it doubles as S2 product documentation) → Group C fee
transparency and comparison → Group A category pages last, launched together as a coherent set once
§4.4's evidence gate is met. Launching the category vocabulary before the evidence exists inverts
the sequence and turns a defensible frame into a claim we cannot support.

**Measure:** branded and category-term query volume over time (is the vocabulary spreading?);
third-party use of the term in press, panels, RFPs, and competitor copy (**a competitor adopting
our category name is a win condition, not a threat — it means the spec sheet in §1.3 is now the
one everyone is measured on**); citation rate in AI assistant answers to the Group B and D
questions; and, at the bottom, verified-counterparty signups and portfolio-intake starts by
landing page. Not sessions.

**Content-integrity constraint, restated because SEO is where it will be violated first:** no
fabricated statistics, no unsourced volume claims, no pricing levels before real closed data, no
"trained on X deals," no logos we do not have permission to display. `docs/design-brief.md` §9 and
`docs/technical-roadmap.md` §7 apply to marketing pages exactly as they apply to the product
surface. The one competitive advantage we hold over a hundred-year-old bank brand is that
everything we publish can be checked.

---

## 4. Risks specific to the category-creation move

| Risk | Why it bites here | Mitigation |
|---|---|---|
| **We invent a word nobody adopts** | Category creation is the most expensive marketing posture that exists, and a market of a few thousand institutions can simply decline to learn a new noun | Dual-track by design: Group B transactional terms carry the pipeline while Group A seeds the vocabulary. The category never becomes the only door in. If third-party usage has not appeared by the end of Phase 2, the frame is retired without drama and we compete as the best venue. |
| **We claim the record before we hold one** | Directly violates `docs/design-brief.md` §9 and would forfeit the one asset we have over incumbents — checkability | The §4.4 gate below. Internal doctrine now; external language only on evidence. |
| **The category frame demotes the exchange and confuses buyers** | Buy-side users want live supply, not a philosophy of record-keeping | Segment the message by side: buyers see the marketplace and the demand surface (`docs/design-brief.md` §6.3 hero language stands unchanged); sellers and their GCs see the record. Same system, two doors. |
| **A competitor adopts the vocabulary** | Feels like theft | It is the win condition, provided the spec sheet (§1.3) is built on coverage and provenance metrics we lead on. Own the measure and adoption of the word works for us. Own only the word and it does not. |
| **Record-keeping becomes a services business** | The most likely real failure: every new portfolio needs bespoke engineering, margins collapse, and we have built a boutique with a database | The S7 gate — second portfolio onboarded with zero engineering tickets — exists specifically to catch this, and should not be waived. |
| **Free-at-rest records attract information tourists** | Institutions onboard books to harvest pricing intelligence and never transact | Acceptable and arguably good: every dormant record deepens coverage and the eventual demand map. But entitlement scoping and the W6 harvesting-pattern detection must cover *record* access, not only data-room access. |

### 4.4 The external-language gate

The phrase "system of record," the published coverage metrics, and the Group A category pages go
public only when **all** of the following are true:

1. At least three real institutional portfolios are under record, with signed intake agreements.
2. Transferability coverage exceeds 90% of NAV on those portfolios, human-reviewed and cited.
3. At least one real transaction has closed and its outcome has graduated into the shared corpus.
4. The coverage numbers are shown to clients **with their gaps visible**, not only their strengths.
5. Counsel has reviewed the category language for any implication of clearing, exchange, or
   fiduciary status we do not hold.

Until all five hold, the public voice remains exactly the one in `docs/design-brief.md` §2 and §6.3.
This is the same discipline that keeps the "Illustrative" labels on the prototype, applied to
vocabulary instead of data.

---

## 5. Proposed amendments to the owner documents

Per `docs/technical-roadmap.md` §11, phases and gates live in the two owner documents and any change
must be applied to both in a single edit. This document does not make those edits unilaterally. The
following were proposals requiring founder sign-off; on acceptance, each is applied to both
documents in one change.

> **Status: A1–A5 ADOPTED** and applied to `docs/roadmap.md` v1.1 and
> `docs/technical-roadmap.md` v1.1 in a single matched-pair change. The table below is retained as
> the rationale record — it is why the gates read the way they now do, and it should not be
> re-litigated without new evidence. Where to find each amendment in force:
> **A1** → `docs/roadmap.md` §3 Phase 1 (portfolio intake deliverable + non-transacting record
> gate) and `docs/technical-roadmap.md` §5 Phase 1 (W0 row).
> **A2** → `docs/technical-roadmap.md` W3 (transferability slice, Phase 1 counterparty-facing).
> **A3** → `docs/technical-roadmap.md` §8 (category coverage metrics).
> **A4** → `docs/roadmap.md` §3 Phase 2 gate and `docs/technical-roadmap.md` §5 Phase 2 gates.
> **A5** → `docs/roadmap.md` §3 Phase 0 and `docs/technical-roadmap.md` W0 data rights.
>
> **Added in the same change, beyond what this document proposed:** `docs/roadmap.md` §2A (the
> regulatory perimeter, including the PTP/qualified-matching-service conditions that constrain the
> listing surface and the transfer-capacity tracker they create as a GP-side wedge) and
> `docs/technical-roadmap.md` W10 (fund-administrator, transfer-agent, custodian, and CRM
> integrations). Both bear directly on this document's thesis: §2A.3 supplies an additional
> structural reason the incumbents cannot follow us, and W10 is how the record reaches the register.

| # | Amendment | Rationale |
|---|---|---|
| **A1** | `docs/roadmap.md` §3 Phase 1: add "portfolio intake and Position Ledger onboarding for non-transacting sellers" as an explicit deliverable, and add to the Phase 1 gate: *"at least one institutional portfolio under record that has not transacted."* | The record is the category, and the current Phase 1 gate measures only closed deals. As written, we could pass Phase 1 and have built a cheaper advisory firm. |
| **A2** | `docs/technical-roadmap.md` §5: move the **transferability slice** of W3 from Phase 2 counterparty-facing to **Phase 1 counterparty-facing**, gated on span citations, named reviewer, and no display without citation. Full diligence summaries remain Phase 2. | Transferability extraction requires no corpus, so it is the only category-defining output deliverable at n=0. It also sidesteps the cold-start problem entirely and is the highest-value artifact for the GC persona. |
| **A3** | `docs/technical-roadmap.md` §8: add **record coverage**, **transferability coverage**, and **price coverage** as first-class instrumented metrics owned by Head of Product, alongside the existing platform-data-share metric. | §1.6 — the measure is half the category, and an unmeasured coverage claim is exactly the kind of unfalsifiable assertion we criticize incumbents for. |
| **A4** | `docs/roadmap.md` §3 Phase 2 and `docs/technical-roadmap.md` §5 Phase 2: extend the data-revenue gate to include *"recurring revenue from a seller under record who has not transacted."* | A dollar of record revenue is the first hard evidence the category exists as a budget line rather than as our vocabulary. |
| **A5** | `docs/technical-roadmap.md` W0 data-rights clause (already a Phase 0 blocker): extend explicitly to documents and positions submitted **pre-transaction**, plus dormant-record retention, deletion rights, and processing scope. | The record exists before any deal does, which is a legal surface neither owner document currently covers. Retrofitting consent across executed agreements is the same expensive mistake W0 already warns about. |

---

## 6. Closing

The two owner documents describe a company that can beat Evercore, Park Hill, Greenhill, Campbell
Lutyens, and PJT on fee, speed, and auditability in a segment they are not built to want. That is a
category-leader plan and it is a sound one.

The category-creator version changes one thing: **the product is not the transaction, it is the
record — and the transaction is an action taken against it.** That single reframe is what turns an
episodic, procyclical, copyable advantage into a continuous, countercyclical, accumulating one. It
is also, conveniently, the only version of this business that has something valuable to sell on the
day a client has decided not to sell anything.

The discipline that makes it credible is the same discipline the rest of this repo already enforces:
we do not get to call ourselves the system of record until we hold records, and we say so plainly in
the meantime. Everyone eventually finds out whether the coverage number was real.
