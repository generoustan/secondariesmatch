# SecondariesMatch — The Architect's Roadmap

**Prepared by:** Architect (standing strategy agent)
**Subject:** How SecondariesMatch becomes the default institutional venue for private-market
secondaries — replacing bulge-bracket advisory (Evercore, Park Hill, Greenhill, Campbell
Lutyens, PJT, UBS secondaries desks) with a low-cost, high-trust, technology-native exchange.
**Status:** v1.0 — living document, owned by the `architect` agent, updated as strategy changes.

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

## 3. The Master Plan — Roadmap Phases

Each phase states its objective, what it builds toward the long-term moat, its milestone gate
(the proof required before advancing), and the team it requires. Phases can overlap — the gate
is proof, not a calendar date — but they should not be skipped, because each one buys the trust
or data required for the next.

> **Companion document.** The engineering, AI/ML, and model-governance program that delivers these
> phases is specified in [`docs/technical-roadmap.md`](technical-roadmap.md), which inherits this
> phase structure rather than defining its own. It adds *technical* gates on top of the business
> gates below (instrumentation completeness, pricing-model backtest thresholds, model risk policy,
> human-minutes-per-deal reduction). The two documents are a matched pair: any change to phase
> definitions or gates must be applied to both in the same edit.

### Phase 0 — Foundation: License to Operate
**Objective:** Make the venue legally, operationally, and technically capable of holding
institutional trust before a single real dollar transacts on it.

- Regulatory structure locked with securities counsel — broker-dealer registration or the
  appropriate exempt-market/venue structure for the jurisdictions launched in first; FINRA
  relationships established if operating as or through a registered broker-dealer.
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
- **Milestone gate:** registration/legal structure secured; security program in motion with a
  credible SOC 2 timeline; 20–50 real institutional counterparties (LPs, GPs, allocators) signed
  up and verified, pre-transaction; founding transactor hires in place.

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
- **Pricing:** publish a transparent flat/tiered fee schedule materially below the 1–2%
  bulge-bracket norm — the fee schedule itself, being public and low, is marketing as much as
  monetization.
- **Milestone gate:** first real (non-illustrative) closed transactions; a repeatable definition
  of the deal process from listing to close; the first published data point on realized pricing
  in the chosen segment — the seed of the pricing-benchmark moat in Phase 2.

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
- **Milestone gate:** matching and pricing automation live and used on real deals; three asset
  classes transacting; first paying data-subscription customers who are not also active buyers or
  sellers on the marketplace.

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
- **Milestone gate:** recognized as a top-tier venue by deal count in the chosen segments;
  credibly named alongside or in place of bulge-bracket advisors in institutional RFPs; at least
  one marquee GP-led deal closed publicly enough to be a reference case.

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
| 0 — Foundation | Legal/security structure in motion; 20–50 verified counterparties signed, pre-transaction | Near-term |
| 1 — Wedge | First real closed deals in one segment; published fee schedule; first realized-pricing data point | Following Phase 0 |
| 2 — Liquidity engine | Matching/pricing automation live on real deals; 3 asset classes transacting; first data-subscription customers | Following Phase 1 |
| 3 — Category definition | Recognized top-tier venue by deal count; credible RFP alternative to bulge-bracket; first marquee reference deal | Following Phase 2 |
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

---

## 9. Closing

The bet underneath every phase above is the same: hold the institutional trust bar exactly where
Evercore, Park Hill, and Greenhill hold it, delete the labor-intensive process that justifies
their fee, and let the venue itself — not a deal team's Rolodex — become the thing the market
depends on. Win the segment incumbents can't be bothered to defend, turn the data from those
wins into infrastructure the whole market eventually prices off of, and never let ambition to
scale outrun the security and verification discipline that earned the first institutional dollar
in the door.
