# SecondariesMatch — The Architect's Roadmap

**Prepared by:** Architect (standing strategy agent)
**Subject:** How SecondariesMatch becomes the default institutional venue for private-market
secondaries — replacing bulge-bracket advisory (Evercore, Park Hill, Greenhill, Campbell
Lutyens, PJT, UBS secondaries desks) with a low-cost, high-trust, technology-native exchange.
**Status:** v1.1 — living document, owned by the `architect` agent, updated as strategy changes.
**v1.1 changes:** amendments A1–A5 proposed in [`docs/category-strategy.md`](category-strategy.md) §5
are **adopted** and applied here and in [`docs/technical-roadmap.md`](technical-roadmap.md) in the
same change, per the matched-pair rule. Adds §2A (the regulatory perimeter — the legal decision
tree that gates what the product is allowed to be), fund-administrator/transfer-agent integration
as a first-class moat (W10), and benchmark administration governance in Phase 3.

---

## 0. The Doctrine

This roadmap is built on four operating disciplines, borrowed from four different corners of
capital and industry because the problem SecondariesMatch is solving has four different failure
modes, and no single playbook covers all of them:

| Discipline | What it protects against | Applied here as |
|---|---|---|
| **First-principles product engineering** | Rebuilding the bank's process in software instead of deleting it | Every manual step in a secondaries deal (teaser decks, blind email bidding, PDF data rooms) is a defect to engineer out, not a tradition to digitize |
| **Infrastructure-as-moat platform thinking** | Winning deals but never becoming structural | The goal isn't to close transactions — it's to become the pricing/risk rail the market prices off of, including for institutions that never place a bid |
| **Contrarian capital-cycle timing** | Fighting incumbents on their home turf | Enter where bulge-bracket is structurally too slow or too small to care (the middle market), not where they're strongest |
| **Institutional underwriting discipline** | Scaling ambition faster than trust | Security, compliance, and audit trail are underwritten as rigorously as a nine-figure deal, because one breach ends the company faster than a fee war does |

None of this is about impersonating anyone. It's a checklist: does this decision hold up as
good product engineering, good infrastructure strategy, good timing, and good institutional risk
discipline — all four, simultaneously? If a decision only survives one lens, it's not ready.

---

## 1. Executive Thesis — Why This Wins

**The problem with the incumbents.** Evercore, Park Hill, Greenhill, Campbell Lutyens, and the
bank secondaries desks run a relationship-and-labor business dressed up as a capital-markets
business: a Managing Director and a deal team manually build a teaser, blast it to a Rolodex of
LPs by email, collect PDF bids, and negotiate by phone — for a placement fee that typically runs
**1–2% of transaction value**, on a process that takes **6–12 months**. None of that cost
structure reflects the actual difficulty of matching a known set of institutional buyers to a
known set of institutional sellers. It reflects the absence of a venue.

**The macro tailwind.** Secondary market transaction volume has scaled from roughly $20B a year
a decade ago to well over $100B annually today, and it is still a small fraction of the multi-
trillion-dollar stock of unrealized private-market NAV outstanding globally. Structural sellers
keep growing: the denominator effect pushes pension and insurance allocators to sell fund stakes
to rebalance; GPs increasingly use continuation vehicles to hold winners longer instead of
force-selling into a bad exit window; family offices and sovereigns want exposure without
decade-long lockups. Every one of these flows currently routes through the same slow, expensive,
relationship-gated process. (These are industry-level directional figures, not SecondariesMatch
transaction data — treat them as market context, not as claims about this platform's own
volume, which starts at zero and is earned phase by phase below.)

**The wedge.** This is a "Carta vs. law-firm-administered cap tables" or "index fund vs.
active-manager-fee" story: the trust bar for institutional capital is real and cannot be
shortcut, but the cost structure of matching, pricing, and closing a transaction should look like
software, not like a nine-figure-deal advisory retainer. SecondariesMatch's entire bet is that
it can hold the *same* institutional trust bar as Evercore or Park Hill — verified counterparties,
audited process, real closing support — while charging a fraction of the fee and closing in a
fraction of the time, because the venue itself, not a deal team's Rolodex, is doing the matching.

---

## 2. Where Incumbents Are Structurally Weak

This is the map of where to attack first, and it's the basis for every phase below.

- **Deal size.** Bulge-bracket teams are compensated and staffed to prioritize $250M+ mandates.
  The $5–150M middle market — smaller LP stakes, smaller GP-led continuation vehicles, direct
  stakes in venture and growth companies — is underserved not because it's unprofitable, but
  because it's unprofitable *for a human-labor-intensive process*. It is exactly the size where a
  software-native venue has the best unit economics advantage over a bank.
- **Speed.** A bank's process is gated by how fast a deal team can build materials and work a
  phone list. A venue with standing verified buyer mandates and live pricing data can compress
  months into weeks for comparable deal quality.
- **Price discovery.** There is no real-time, cross-deal pricing benchmark for most of the
  secondaries market — pricing lives in bankers' heads and quarterly surveys. Whoever
  accumulates the largest base of closed-deal pricing data becomes the source of truth the market
  quotes off of, the same way a dominant index or benchmark becomes unavoidable infrastructure
  once enough of the market prices against it.
- **Transparency.** Fee opacity and process opacity are a feature of the incumbent business
  model, not a bug — informational asymmetry is part of how a 150bps fee gets justified.
  Publishing a transparent, low fee schedule and a visible process is a trust signal precisely
  because it's a competitive risk incumbents won't take.

---

## 2A. The Regulatory Perimeter — What Must Be True Before a Bid Is Taken

This section exists because the previous version of this roadmap compressed the entire legal
foundation into one Phase 0 bullet ("broker-dealer registration or the appropriate exempt-market
structure"). That is not a plan; it is a placeholder for a plan. The regulatory perimeter is not
a compliance chore downstream of product — **it determines what the product is legally permitted
to be**, and getting it wrong late is the single most expensive rebuild available to this company.

Nothing below is legal advice. Every item is a question to put to securities and tax counsel in
Phase 0, framed precisely enough that counsel can answer it in one engagement rather than five.

### 2A.1 The three regimes hiding inside one marketplace table

`docs/design-brief.md` §7.1 specifies a segmented toggle — `Fund / LP Interests` |
`Direct Company Stakes` | `Real Assets`. Visually it is one table with a swapped column set. Legally
it is **three different regulatory regimes**, and treating them as one product is the most likely
source of a serious error.

| Tab | Instrument | Dominant constraint | Competitive reality |
|---|---|---|---|
| **Direct company stakes** | Equity securities of private companies | Broker-dealer registration; Reg ATS if orders are matched by non-discretionary methods; resale exemptions (Rule 144, §4(a)(7), the "§4(1½)" practice); company transfer restrictions and ROFRs | **Already solved by well-funded incumbents.** Nasdaq Private Market, Forge, and Zanbato all operate as registered broker-dealers with SEC-registered ATSs. This is the tab that looks easiest to build and is the worst wedge available to us. |
| **Fund / LP interests** | Limited partnership interests | Publicly-traded-partnership (PTP) status under IRC §7704 and the safe harbours in Treas. Reg. §1.7704-1; LPA transfer consent and ROFR; §1446(f) transfer withholding; ERISA plan-asset limits | **Structurally unsolved.** No BD+ATS incumbent has won here, because the constraints below make a continuous order book legally impossible. The friction is the moat. |
| **Real assets** | Usually LP/JV interests in fund or co-investment vehicles | As above, plus vehicle-specific and jurisdictional property-transfer rules | Follows the LP-interest regime; sequence after it. |

**Strategic consequence, and it is a real change of emphasis:** the roadmap already chose LP
interests and GP-led continuation vehicles as the Phase 1 wedge (§3, Phase 1) on the grounds of
deal size. That choice is now over-determined. The stronger reason is regulatory: the direct-stakes
tab is where a well-funded fintech clone *already exists at scale with the licences we do not
have*, and the LP-interest tab is where the legal complexity is high enough to deter clones and
deep enough to be productised. **Do not lead with direct company stakes.** Keep the tab; do not
make it the wedge.

### 2A.2 The four structural options for taking a bid

The operative question is Exchange Act §3(a)(4): a person "engaged in the business of effecting
transactions in securities for the account of others" is a broker and must register under §15(a).
The facts that matter are participation in negotiation, solicitation of counterparties, handling
of funds or securities, and — most decisively — **transaction-based compensation**. A percentage
of transaction value is the classic hallmark of broker activity. The SEC's proposed finders
exemption (October 2020) was **never adopted**, so there is no general federal finders relief to
rely on.

| # | Structure | What it permits | Cost / time | Verdict |
|---|---|---|---|---|
| **1** | **Register as a broker-dealer; obtain FINRA membership** | Full solicitation, negotiation, transaction-based fees, and the foundation required to later operate an ATS | New Member Application is a materially multi-month process with capital, principal-licensing, supervisory-procedure, and AML-program requirements | **The destination.** Start the application in Phase 0; do not let it be the thing that blocks Phase 1. |
| **2** | **Operate through an existing registered BD** (affiliate, or a chaperoning/"BD-as-a-service" arrangement) | Transaction-based compensation flows through the registered entity while our own application is pending | Weeks to a few months; ongoing revenue share and supervisory dependency | **The bridge.** This is how Phase 1 closes real deals without waiting on our own membership. Accept the revenue share as the price of not stalling. |
| **3** | **Acquire a registered BD** | Same as (1), faster, but subject to FINRA continuing-membership approval for the change of control | Acquisition cost + CMA review | Live option if capital allows and a clean shell is available. Diligence the shell's disciplinary history obsessively. |
| **4** | **No transaction-based compensation** — subscription/licence fees only, no solicitation, no negotiation, no possession of funds | Publishing a record, transferability analysis, benchmarks, and a matching *listing service* | Low | **Not a substitute for 1–3, but it is not nothing.** It is precisely the perimeter within which the Phase 1 record product (§3, Phase 1) legally operates. See 2A.4. |

**The sequencing call:** pursue (1) from Phase 0 while executing on (2) for the first closes, and
run the record product under (4) in parallel. Anyone who tells you the platform can take a
percentage of a securities transaction while "just being software" is describing an enforcement
action, not a structure.

### 2A.3 The PTP constraint — why a continuous order book for LP interests is illegal, not just hard

This is the most under-appreciated fact in the entire business, and it was absent from every prior
version of these documents (it appeared only as an SEO keyword in `docs/category-strategy.md` §3.5).

A partnership whose interests are traded on an established securities market **or the substantial
equivalent of a secondary market** is taxed as a corporation under IRC §7704. For a private fund
that is a catastrophic outcome — it destroys the pass-through treatment the entire LP base
underwrote. Every GP and every fund counsel therefore polices transfer volume and transfer
mechanics with total seriousness, and the LPA transfer-consent provisions our transferability
layer extracts exist substantially *for this reason*.

Treas. Reg. §1.7704-1 provides safe harbours. Two matter to us:

- **The qualified matching service (QMS) safe harbour, §1.7704-1(g).** Transfers through a QMS are
  disregarded in the "readily tradable" test if the service meets specific conditions. Per published
  practitioner summaries of the regulation: the system lists **non-firm** bid and/or ask quotes; the
  selling partner may **not enter a binding agreement until at least 15 calendar days** after the
  interest is listed; the **closing may not occur until at least 45 calendar days** after listing;
  and total interests transferred through the QMS may **not exceed 10% of total outstanding interests
  in the partnership per tax year**. *(Confirm the current text and every threshold with tax counsel
  in Phase 0 — these are practitioner summaries, not a reading of the regulation by us.)*
- **A separate de minimis safe harbour** disregarding transfers below a small annual percentage of
  total interests in partnership capital or profits, in addition to private transfers. *(Threshold
  and interaction with the QMS cap to be confirmed by counsel; do not quote a number publicly until
  it is.)*

Read those conditions against a product spec and three things follow immediately:

1. **Firm, instantly-executable quotes are out** for LP interests. The design-brief marketplace
   table showing an "Ask (% of NAV)" and an "Indicative Bid Range" is compatible with a non-firm
   quote regime; a one-click "hit the bid" order book is not. **This is a hard product constraint,
   not a preference.**
2. **Mandatory waiting periods are a feature to be built, not a bug to be worked around.** The
   listing lifecycle in `docs/design-brief.md` §7.2 (`Open / Under Offer / Closing Soon`) should
   carry an explicit, GP-visible compliance clock. The platform that *enforces* the waiting period
   and produces the evidence that it was observed is the platform a fund's counsel will approve.
3. **Volume caps are per-fund, per-tax-year, and cumulative across all transfers — including ones
   that never touch our platform.** Which means somebody has to track them.

**And that last point is a moat nobody currently owns.** Today, transfer-capacity tracking against
these thresholds lives in spreadsheets maintained by fund administrators and fund counsel, deal by
deal, with no live view. A GP-facing dashboard showing *remaining transfer capacity for this fund,
this tax year, across all transfers, with the supporting evidence* is: (a) genuinely valuable and
currently unserved, (b) a reason for a GP to onboard a fund to our record even when no LP is
selling, (c) unbuildable by an advisor whose relationship with the fund is episodic, and (d) the
most natural possible entry point to the fund-administrator integration in W10. It converts our
biggest regulatory constraint into the sharpest GP-side wedge we have. This is the highest-value
single idea added in v1.1 and it should be prosecuted in Phase 1–2.

### 2A.4 The rest of the closing-mechanics surface — automatable, and nobody has automated it

Each of these is a real step that today consumes counsel and fund-admin hours per deal. Each is a
deterministic workflow (P3 in the technical roadmap — arithmetic and rules, never a language model
producing a number), and each is a place where the platform earns the right to sit in the closing.

- **IRC §1446(f) withholding.** A transferee must generally withhold **10% of the amount realized**
  on a transfer of a partnership interest, with a secondary withholding obligation falling on the
  **partnership** if the transferee fails; certifications and Form 8288 filing run on tight
  post-transfer deadlines. In practice this means every cross-border LP-interest transfer needs a
  certification workflow, and the *partnership itself* is exposed if the buyer gets it wrong. A
  platform that produces the certifications, tracks the deadlines, and hands the GP evidence is
  solving a problem the GP is genuinely afraid of. *(Confirm current thresholds, exceptions, and
  forms with tax counsel; the rules have been amended repeatedly.)*
- **ERISA plan-asset limits.** If benefit-plan investors hold 25% or more of a class of equity
  interests, the fund's assets can become plan assets. A transfer to the wrong buyer can breach it.
  **Buyer eligibility is therefore per-position, not just per-mandate** — which makes this a hard
  constraint in the matching engine (W1/P5), not a closing checklist item.
- **Sanctions, AML, and beneficial-ownership** screening on both sides, per W6, already Phase 0.
- **Blue sky / non-US regimes.** Marketing interests into other jurisdictions engages national
  private-placement regimes; sequence international expansion (Phase 3) by where counsel has
  cleared the marketing, not by where demand looks strongest.

### 2A.5 The false-precision warning

Every figure in this section is a practitioner-level summary, sourced from public commentary and
flagged as such. **None of it should appear in customer-facing copy until counsel has confirmed
it**, and the transferability content strategy in `docs/category-strategy.md` §3.5 is subject to
the same rule it already states there: getting one of these wrong in public is worse than not
publishing. The content-integrity discipline in `docs/design-brief.md` §9 applies to legal
assertions exactly as it applies to marketplace data.

---

## 3. The Master Plan — Roadmap Phases

Each phase states its objective, what it builds toward the long-term moat, its milestone gate
(the proof required before advancing), and the team it requires. Phases can overlap — the gate
is proof, not a calendar date — but they should not be skipped, because each one buys the trust
or data required for the next.

> **Companion documents.** The engineering, AI/ML, and model-governance program that delivers these
> phases is specified in [`docs/technical-roadmap.md`](technical-roadmap.md), which inherits this
> phase structure rather than defining its own. The category-creation thesis — what the market
> should call what we are building, the sprint-level build plan that proves it, and the search
> vocabulary that makes it ownable — is in [`docs/category-strategy.md`](category-strategy.md),
> which also inherits these phases and proposes amendments to them in its §5 rather than editing
> gates unilaterally. It adds *technical* gates on top of the business
> gates below (instrumentation completeness, pricing-model backtest thresholds, model risk policy,
> human-minutes-per-deal reduction). The two documents are a matched pair: any change to phase
> definitions or gates must be applied to both in the same edit.

### Phase 0 — Foundation: License to Operate
**Objective:** Make the venue legally, operationally, and technically capable of holding
institutional trust before a single real dollar transacts on it.

- **Regulatory perimeter resolved per §2A**, not deferred. Specifically: (a) own broker-dealer
  application filed *and* a bridge arrangement with an existing registered BD executed so Phase 1
  is not gated on membership; (b) tax counsel's written view on the PTP safe harbours and the
  waiting-period/volume-cap conditions the product must enforce; (c) the perimeter within which
  the pre-transaction record product operates without transaction-based compensation, documented;
  (d) jurisdictions for launch confirmed by counsel, not by demand.
- Security and compliance infrastructure live: SOC 2 Type II program underway, KYC/AML
  onboarding flow, encrypted data rooms with watermarking and immutable audit trail (this is not
  new scope — it's already specified in `docs/design-brief.md` §6.8 and §7 and should ship with
  the first real transaction, not bolted on after).
  Note: the current landing page and marketplace prototype (`prototype/index.html`) explicitly
  labels all listings "Illustrative" per the design brief's content-integrity rule (§9). That
  label is a Phase 0 feature, not a placeholder to be embarrassed about — it is the honesty that
  keeps the venue legally and reputationally safe until real deal flow exists.
- **Founding transactor hires:** 2–3 secondaries professionals with real, personal deal
  experience at firms like Evercore, Park Hill, Greenhill, Campbell Lutyens, or a bank secondaries
  desk. Their job in Phase 0–1 is not to write code — it's to bring the relationships and
  underwriting judgment that make the first cohort of institutional counterparties trust the
  venue enough to try it, and to personally guarantee white-glove execution on early deals.
- **Data rights before data (A5).** The counterparty agreement granting a perpetual licence over
  de-identified, aggregated outcome data — already a Phase 0 blocker in
  `docs/technical-roadmap.md` W0 — is extended to cover documents and positions submitted
  **pre-transaction**, together with dormant-record retention, processing scope, and deletion
  rights. The record exists before any deal does; the consent must too. No portfolio document is
  ingested before this agreement is executed.
- **Milestone gate:** regulatory perimeter resolved per §2A (BD path *and* bridge in place, tax
  counsel's PTP view in writing); security program in motion with a credible SOC 2 timeline;
  20–50 real institutional counterparties (LPs, GPs, allocators) signed up and verified,
  pre-transaction; pre-transaction data-rights clause executed with at least one real
  counterparty; founding transactor hires in place.

### Phase 1 — The Wedge: Win One Segment Cold
**Objective:** Prove the model on the segment incumbents are worst positioned to defend, with
white-glove execution standing in for automation that doesn't exist yet.

- **Segment choice:** start in the middle-market GP-led continuation vehicle and LP-interest
  secondaries where deal sizes are too small for bulge-bracket teams to prioritize but plenty
  large in aggregate. Direct venture/growth-company secondaries are a strong second wedge for the
  same structural reason. Pick one to start, not both — first-principles discipline says prove
  one loop end-to-end before doubling the surface area.
- **GTM motion:** the founding transactors personally run the first ~20–30 deals concierge-style
  — manually ensuring perfect matching, diligence, and closing even where the platform isn't
  fully automated yet. The point of Phase 1 is not scale, it's proof: a buyer and a seller who
  transacted through SecondariesMatch and would do it again.
- **Portfolio intake and the Position Ledger (A1) — the deliverable that is not a transaction.**
  Onboard institutional portfolios for sellers who are **not currently selling**: normalize
  capital-account statements and portfolio schedules into a position record where every displayed
  field carries a source citation, and resolve transferability (consent, ROFR, notice periods,
  restrictions) against the LPA with span-level citations and a named human reviewer. Build
  specification is `docs/category-strategy.md` §2.2; the workstream mapping is
  `docs/technical-roadmap.md` W0/W3 with the transferability slice pulled forward to Phase 1 (A2).
  **Why this is in Phase 1 and not later:** the record requires no closed-deal corpus, so it is the
  only category-defining output we can deliver at n=0; and it is the only thing we can sell to an
  institution that has decided *not* to transact — which is most institutions, most of the time.
- **Pricing:** publish a transparent flat/tiered fee schedule materially below the 1–2%
  bulge-bracket norm — the fee schedule itself, being public and low, is marketing as much as
  monetization.
- **Milestone gate:** first real (non-illustrative) closed transactions; a repeatable definition
  of the deal process from listing to close; the first published data point on realized pricing
  in the chosen segment — the seed of the pricing-benchmark moat in Phase 2; **and at least one
  institutional portfolio under record that has not transacted** (A1). The last clause is
  load-bearing: without it, this phase can be passed by a business that is only a cheaper
  Evercore, which is a category-leader outcome and forfeits the category-creator one.

### Phase 2 — The Liquidity Engine
**Objective:** Replace concierge matching with software matching, and start turning closed-deal
data into a defensible pricing asset.

- **Product:** algorithmic matching of standing buyer mandates against new listings; automated
  indicative pricing benchmarks generated from the platform's own closed-deal history; self-serve
  data rooms; e-signature and closing workflow; live status ("Open / Under Offer / Closing Soon")
  across the marketplace table already specified in `docs/design-brief.md` §7.
- **Asset-class expansion:** extend from the Phase 1 wedge into real estate and infrastructure
  secondaries and private credit secondaries — segments where deep, credible underwriting
  judgment (not just software) is a real differentiator, and exactly where the founding team's
  institutional real-asset experience should be deployed.
- **Second revenue line:** package anonymized, aggregated pricing data as a standalone
  subscription product for GPs, LPs, and even institutions who have never transacted on the
  platform. This is the platform-as-infrastructure move: once enough of the market pays for the
  data regardless of whether they trade through the venue, low transaction fees stop being a
  margin risk and become a distribution strategy the data business subsidizes.
- **The integration layer (W10) — the moat that is not data and not UI.** Begin the
  fund-administrator, transfer-agent, and custodian integration surface: automated capital-account
  and NAV ingestion, transfer instruction and register-update handoff, GP consent routing, and the
  §2A.3 transfer-capacity tracker exposed to GPs. This is the least glamorous workstream in the
  roadmap and probably the most defensible: a competitor can clone the interface in a quarter and
  can raise capital to buy counterparties, but cannot clone a set of executed integration
  agreements with the administrators who hold the register. See `docs/technical-roadmap.md` W10.
- **Milestone gate:** matching and pricing automation live and used on real deals; three asset
  classes transacting; first paying data-subscription customers who are not also active buyers or
  sellers on the marketplace; **recurring revenue from a seller under record who has not
  transacted** (A4); at least one production integration with a fund administrator or transfer
  agent carrying real position data.

### Phase 3 — Category Definition & Scale
**Objective:** Become the default alternative — not a scrappy challenger, but the venue an
institutional GC or CIO expects to see in the RFP.

- Build workflow tools that embed directly into GP operations — continuation-vehicle election
  and allocation tooling, waterfall calculators, LP consent tracking — so the platform becomes
  part of how a GP runs a deal, not just where they list one. Deep workflow embedding is what
  creates real switching cost, the same logic that makes dominant risk-management infrastructure
  hard to rip out once an institution's operations depend on it.
- International expansion into Europe, the Middle East (sovereign allocators), and Asia-Pacific,
  sequenced by where the counterparty base already has demand, not opportunistically.
  Explicitly evaluate raising a strategic capital round from LPs/insurers/pensions who are also
  platform customers — aligning the cap table with the people the low-cost model benefits keeps
  the incentives honest as the business scales.
- **Stand up benchmark administration, not just a benchmark.** Becoming the reference price is a
  governance act, not a modelling act. What converts a published series into infrastructure the
  market quotes off is the apparatus around it: a documented methodology at a permanent URL, a
  named methodology committee with published membership, a contributor code of conduct, a fixed
  revision-and-restatement policy, defined calculation cadence, and an independent review of the
  calculation. This is how index and benchmark providers earn citation, and it is the part
  competitors consistently skip. Counsel note carried forward from `docs/technical-roadmap.md` W2:
  publishing a referenced benchmark can attract benchmark-administration obligations in some
  jurisdictions — resolve before publication, not after.
- **Milestone gate:** recognized as a top-tier venue by deal count in the chosen segments;
  credibly named alongside or in place of bulge-bracket advisors in institutional RFPs; at least
  one marquee GP-led deal closed publicly enough to be a reference case; benchmark methodology
  published with a named committee and a revision policy, and cited at least once by a third party
  who does not transact on the platform.

### Phase 4 — The Full-Stack Exchange
**Objective:** Convert category leadership into durable, optionality-rich infrastructure.

- Evaluate adjacent liquidity products: primary fund commitment marketplace, LP co-investment
  marketplace, NAV-lending/structured-liquidity partnerships, and — if volume and regulatory
  readiness justify it — an alternative trading system (ATS) for more continuous secondary
  trading of interests.
- Consider licensing the matching and pricing infrastructure itself to banks, fund administrators,
  and even competing advisors — the purest infrastructure-as-moat move: turning would-be
  competitors into customers of the rails, the way dominant risk-management or benchmark
  infrastructure gets licensed even to firms that compete with its owner elsewhere.
- Treat "stay independent and keep compounding" vs. "become an acquisition target for a large
  asset manager or data/index provider" as a live optionality decision to make later, from a
  position of leverage — not a choice to pre-commit to now.

---

## 4. Business Model

| | Incumbent advisory (Evercore / Park Hill / Greenhill / bank desks) | SecondariesMatch |
|---|---|---|
| Fee | ~1–2% of transaction value | A published, materially lower flat or tiered fee |
| Time to close | Months (6–12 typical) | Weeks, converging toward days as matching automates |
| Pricing transparency | Opaque — lives with the banker | Published benchmark data from closed deals |
| Cost structure | Large deal-team labor per transaction | Software marginal cost + high-leverage transactor team for judgment-intensive closes |
| Revenue lines | Transaction fees only | Transaction fees + data/analytics subscriptions (Phase 2+) + potential infrastructure licensing (Phase 4) |

The low fee is sustainable specifically because software absorbs the parts of the process that
don't need a human (matching, data rooms, pricing benchmarks) while the founding transactors'
judgment is reserved for the parts that genuinely need it (structuring, negotiation, closing
support on complex deals). A second, data-driven revenue line is what lets the transaction fee
stay low without the business depending on take-rate alone — the same reason infrastructure
businesses that monetize data and workflow can out-compete pure transaction-fee businesses on
price indefinitely.

---

## 5. Trust & Security as Growth Strategy

Every item in `docs/design-brief.md` §6.8 (bank-grade encryption, verified counterparties,
immutable audit trail, watermarked data rooms) is not compliance overhead — it is the reason an
institution will even consider a lower-cost, less-established venue over a 100-year-old bank
brand. For an entrant with no track record, security and audit trail *are* the brand, in the same
way that for a dominant risk-management platform, the willingness of competitors to plug into it
depends entirely on trusting its risk controls more than they trust their own alternative. Any
roadmap decision that trades security or verification rigor for speed should be treated as a
last resort, not a shortcut — flag it explicitly rather than accepting it quietly.

### 5.1 Adjudicating the activation playbook against institutional rigor

The lead-activation work introduces a consumer-grade velocity bias — later gates, personalized
first views, return triggers, in-product threads, referral loops. Most of that bias is correct and
some of it is not, and the difference is not a matter of taste. **The test is whether the
acceleration moves a decision earlier than the evidence supporting it.** Reducing friction on a
step is almost always right; reducing the evidence behind a step is almost always fatal.

| Activation move | Call | Reasoning |
|---|---|---|
| **Move the KYC/verification gate from post-signup to just-before-bid** | **Adopt — this is a false choice, and the playbook is right.** | Verification protects the *transaction*, not the browsing. Nothing is at risk while a verified-to-be-nobody user reads a marketplace page, and gating at signup destroys the top of funnel for zero risk reduction. Two conditions: the pre-verification experience must never expose confidential deal material or counterparty identities (entitlements, not page-level gating, enforce this), and the gate modal must be honest about what verification involves rather than minimizing it. |
| **Personalize the first marketplace view to a captured mandate** | **Adopt.** | A mandate captured as a structured object is the single most valuable artifact a first-time buyer can give us (W1), and personalization is the honest reason to ask for it. Pure upside. |
| **Save-mandate / return-trigger loop** | **Adopt, and make it the record loop.** | This is the activation feature that most directly serves the category thesis: a reason to return when nothing is being sold. Point it at the standing demand map and its change log, not at generic listing alerts. |
| **In-product activity thread instead of email** | **Adopt — and it is a compliance *upgrade*, not a compliance cost.** | If we operate as or through a registered BD, counterparty communications are supervised and retained. Email is the worst possible surface for that; a threaded, logged, entitlement-scoped in-product channel is easier to supervise, retain, and produce on request. The playbook's speed instinct and the §2A rigor requirement point the same way. |
| **Invite-a-counterparty referral loop** | **Adopt with a hard constraint.** | Referral is a legitimate growth channel, but **compensating anyone for introducing counterparties to a securities transaction is broker activity** (§2A.2), and paid referral into a deal is exactly the structure regulators look at hardest. Non-cash, non-transaction-linked incentives only, cleared by counsel before launch. This is the one activation item that can create a real legal problem if shipped on product instincts alone. |
| **Removing "Illustrative" labels to make the marketplace look liquid** | **Refuse.** | Not proposed by the playbook, but it is the natural next step of its logic and it must be pre-emptively refused. `docs/design-brief.md` §9 governs. Checkability is our only structural advantage over a hundred-year-old brand. |
| **Firm quotes / one-click bidding to compress time-to-first-bid** | **Refuse for LP interests.** | Per §2A.3 this is not a trust preference, it is a tax-status constraint on the fund. Compress the time to a *non-firm indication* instead — the metric the design brief already tracks. |

**The general rule this table implies:** speed is free wherever the constraint is *attention*, and
speed is forbidden wherever the constraint is *evidence, entitlement, or law*. Most activation
friction is attention-constrained, which is why most of the playbook survives contact with this
section. The exceptions are few, specific, and worth being rigid about.

---

## 6. Team & Hiring Roadmap

| Role | Why it matters | Phase |
|---|---|---|
| Founding transactors (2–3, ex-Evercore/Park Hill/Greenhill/Campbell Lutyens/bank secondaries desks) | Bring real institutional relationships and underwriting judgment; personally close the first deals | 0–1 |
| Head of Compliance / Securities Counsel | Owns broker-dealer/venue registration and KYC/AML program | 0 |
| Head of Product (matching & pricing systems) | Owns the transition from concierge matching to algorithmic matching | 1–2 |
| Security/Infrastructure lead | Owns SOC 2 program, encryption, audit trail, watermarking | 0–1 |
| Data science / pricing research | Builds the closed-deal pricing benchmark product | 2 |
| Additional asset-class specialists (real estate, infrastructure, credit) | Underwrite expansion into new secondaries segments with real domain judgment, not just generalist matching | 2–3 |
| Origination / BD leads by geography | International expansion | 3 |

---

## 7. Milestone Dashboard

| Phase | Proof gate | Illustrative target framing |
|---|---|---|
| 0 — Foundation | §2A perimeter resolved (BD path + bridge + written PTP view); security program in motion; 20–50 verified counterparties signed, pre-transaction; pre-transaction data-rights clause executed | Near-term |
| 1 — Wedge | First real closed deals in one segment; published fee schedule; first realized-pricing data point; **one portfolio under record that has not transacted** | Following Phase 0 |
| 2 — Liquidity engine | Matching/pricing automation live on real deals; 3 asset classes transacting; first data-subscription customers; **revenue from a non-transacting seller under record**; first fund-admin/transfer-agent integration in production | Following Phase 1 |
| 3 — Category definition | Recognized top-tier venue by deal count; credible RFP alternative to bulge-bracket; first marquee reference deal; benchmark methodology published with named committee and cited by a non-transacting third party | Following Phase 2 |
| 4 — Full-stack exchange | Adjacent liquidity products or infrastructure licensing live; independence-vs-strategic-exit decision made from leverage | Following Phase 3 |

No calendar dates are attached here on purpose: each phase gates on proof (a real closed deal, a
real signed data customer, a real RFP win), not on a fixed date, because pretending precision on
a market-entry timeline this early would violate the same content-integrity discipline this
project already applies to illustrative marketplace data (`docs/design-brief.md` §9).

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Regulatory/registration delays block launch | Engage securities counsel in Phase 0, before product work outpaces legal readiness |
| Chicken-and-egg liquidity (no buyers without sellers, no sellers without buyers) | Phase 1 concierge model — founding transactors manually guarantee both sides of the first deals rather than waiting for organic two-sided liquidity |
| Incumbents respond by cutting their own fees | Compete on the moat (data, automation, embedded workflow), not only on price — a fee cut is easy for a bank to copy; a pricing-data network effect and embedded GP workflow are not |
| Security or confidentiality incident | Treat SOC 2, KYC/AML, and audit trail as Phase 0 scope, not a later hardening pass; no real transaction proceeds ahead of this infrastructure |
| Scaling ambition faster than institutional trust | Every phase gate above is a trust/proof gate, not a growth-rate gate — advancing on unproven trust is explicitly out of scope for this roadmap |
| **A well-funded fintech clones the UI and buys counterparties** | The interface is the least defensible thing we own and should be assumed copyable in a quarter. What is not copyable in a quarter: executed pre-transaction data-rights agreements, accumulated pass/bid labels, transferability extractions reviewed against a gold set, fund-administrator integrations, and GP relationships built through the transfer-capacity tracker (§2A.3). Sequence accordingly — never let a quarter's roadmap be dominated by surface work |
| **PTP/QMS conditions designed around instead of designed for** | A firm-quote order book or a sub-waiting-period close on LP interests risks a fund's pass-through tax status — the one error a GP will never forgive and never transact through us again after. Treat waiting periods, non-firm quoting, and volume caps as enforced product logic with GP-visible evidence (§2A.3), and have tax counsel review the listing lifecycle *as specified*, not as described |
| **Fund-administrator dependency becomes a chokepoint they exploit** | The integration moat cuts both ways: administrators could gate access or build competing tooling. Mitigate by integrating with several rather than one, keeping document-based intake as a permanently supported fallback path (never let the integration become the only way data enters), and making the GP — not the administrator — the party whose problem we solve |

---

## 9. Closing

The bet underneath every phase above is the same: hold the institutional trust bar exactly where
Evercore, Park Hill, and Greenhill hold it, delete the labor-intensive process that justifies
their fee, and let the venue itself — not a deal team's Rolodex — become the thing the market
depends on. Win the segment incumbents can't be bothered to defend, turn the data from those
wins into infrastructure the whole market eventually prices off of, and never let ambition to
scale outrun the security and verification discipline that earned the first institutional dollar
in the door.
