# The Architect Roadmap

**A company-building plan for SecondariesMatch — the institutional exchange built to replace the secondaries advisory desk at Evercore, Park Hill, Jefferies, Lazard, and Campbell Lutyens.**

Status: v1.0 — strategy draft
Companion document: `docs/design-brief.md` (product/UI spec for the same thesis)

---

## 1. The Thesis, in One Paragraph

Every year, tens of billions of dollars of institutional secondaries — LP fund stakes, GP-led continuation vehicles, direct company positions — get intermediated by a small cartel of bank advisory desks charging 1–4% to run what is, mechanically, a structured auction with a data room. The process is manual, relationship-gated, and slow (4–9 months), and the fee is priced for scarcity of trust, not for the actual cost of matching a motivated seller to a qualified buyer. SecondariesMatch's bet is that **trust can be engineered instead of rented**: build the compliance, security, and pricing infrastructure that makes institutions comfortable transacting without a bank's name on the cover page, price the service at a fraction of advisory economics, and win on speed, transparency, and technology the banks have no incentive to build because it cannibalizes their fee.

---

## 2. The Architect — Operating Persona

We are not building a fintech app and we are not building a bank. The company needs a leadership posture that borrows deliberately from four different playbooks, because no single one is sufficient for this market. These are used here as **archetypes and publicly documented operating philosophies to build our own culture against — not claims of affiliation or endorsement.**

| Archetype | What we take from it | What we explicitly reject |
|---|---|---|
| **The Musk Standard** (velocity, vertical integration, first-principles) | Compress the 6-month bank process into weeks by owning the full stack — pricing, matching, diligence workflow, e-signature, closing — instead of stitching together an email thread and a data room vendor. Hire for raw problem-solving speed over pedigree. Delete process before you optimize it. | The move-fast-and-break-things instinct does not survive contact with fiduciaries. Compliance and audit trail are not the thing you cut to ship faster. |
| **The Fink Standard** (institutional trust at scale, technology as the moat) | BlackRock didn't win asset management by being the cheapest — it won by building Aladdin, an operating system so embedded that it became infrastructure, and by writing to CIOs like a fiduciary, not a salesman. We build the pricing/data layer (benchmarks, NAV verification, comparables) that becomes the reference the market checks against, the way Aladdin became the risk system the market ran on. | Fink-scale patience without Fink-scale capital is just slow. We borrow the *posture*, not the 30-year runway — our trust flywheel has to compound inside 24–36 months. |
| **The Zell Standard** (contrarian value-hunting in illiquid, mispriced markets) | Zell built a fortune reading distress and inefficiency in real assets nobody else wanted to underwrite. Secondaries pricing is *structurally* inefficient — wide bid-ask spreads exist because information is scarce and process is slow, not because the underlying is hard to value. That inefficiency is our addressable market, not a risk to hedge against. | Opportunism without process discipline is how secondaries desks got a reputation for picking off underinformed sellers. Our edge is compressing the spread for both sides, not exploiting it. |
| **The Gray Standard** (institutional-grade scaling of a niche strategy) | Jon Gray took Blackstone's secondaries/fund-of-funds business (Strategic Partners) and scaled it into one of the largest secondaries platforms in the world by treating LP relationships, risk discipline, and operating rigor as the product. That is the proof case that "secondaries done at institutional scale, run by people the LPs already trust" is a fundable, scalable business — we are building the independent, tech-native version of that same insight. | Gray built inside a $1T balance sheet with decades of LP trust already banked. We have to earn that trust from zero — which is why Phase 1 of this roadmap is almost entirely about credibility, not features. |

**Synthesis:** move like a startup, look like an institution, price like an insurgent, and treat the pricing data itself as the long-term moat.

---

## 3. Why the Incumbents Are Structurally Vulnerable

| Incumbent weakness | Why it persists | Our exploit |
|---|---|---|
| Fee is 1–4% of transaction value, largely flat regardless of deal complexity | Banks price on relationship leverage and scarcity of trusted counsel, not on marginal cost | Charge 20–50 bps blended (transaction fee) + optional data/analytics subscription — closer to exchange economics than advisory economics |
| Process is manual: email, PDF teasers, Intralinks/Datasite data rooms, phone-based bid collection | No incentive to automate — automation compresses the fee they charge for "process management" | Own the workflow end-to-end: listing intake → NDA/KYC → data room → structured bidding → closing checklist, all logged and auditable |
| 4–9 month timelines are treated as normal | Slowness looks like diligence to a risk-averse buyer, so nobody has pushed to compress it | Median time-to-first-bid becomes a headline metric we publish and defend, the way Amazon defended delivery speed |
| Pricing opacity — no public benchmark for where a given fund/sector/vintage should clear | Opacity is the advisory fee's best friend; publishing pricing data would commoditize their judgment | Publish an aggregate pricing benchmark (à la Preqin's secondary pricing survey) as a free trust-building product from day one |
| Coverage is relationship-gated — smaller LPs and mid-market GPs get worse service than mega-funds | Bank MDs allocate time to the biggest tickets; the long tail is underserved | Win the underserved mid-market first (sub-$150M NAV LP stakes, single-asset continuation vehicles under $500M) where banks under-invest, then move up-market on reputation |

**The one prior failure we study closely:** Palico attempted a secondaries marketplace and shut down in 2020. The lesson is not "the market rejects tech" — it's that Palico tried to disintermediate trust with a self-serve consumer-marketplace UX before it had earned any. We invert that: hire the trust (Section 6) before we scale the self-serve product.

---

## 4. Competitive Landscape

| Player | Category | Vulnerability we target |
|---|---|---|
| Evercore Private Capital Advisory, Park Hill (PJT Partners), Jefferies Private Capital Advisory, Lazard Private Capital Advisory, Campbell Lutyens, Houlihan Lokey | Bank/advisory secondaries desks — the primary competitive set | Fee, speed, and pricing opacity (Section 3) |
| Setter Capital, Preqin Secondary Market data | Pricing data/surveys, not transaction platforms | We publish comparable benchmark data *and* let you transact against it in one venue |
| Nasdaq Private Market, Forge Global | Pre-IPO employee/company equity marketplaces | Different asset class (single-company direct equity, not fund interests or GP-leds); we track their trust-building playbook (regulated ATS, verified counterparties) closely |
| Palico (defunct) | Prior attempt at LP secondaries marketplace | Cautionary case — see Section 3 |
| In-house secondaries teams at Coller Capital, Ardian, HarbourVest, Blackstone Strategic Partners (Jon Gray's legacy platform) | Not competitors on distribution — they are **potential buy-side anchor members** of the marketplace | Court them as day-one liquidity, not adversaries |

---

## 5. Business Model & Economics

- **Transaction fee (primary revenue):** 25–75 bps on closed transaction value, tiered down as size increases — versus the bank standard of 100–400 bps. Charged to the side that requested origination support (typically seller-paid, buyer option for premium data-room/analytics access).
- **Data & analytics subscription (secondary, high-margin, the long-term moat):** institutional buy-side subscription for live pricing benchmarks, historical clearing data, and portfolio-level secondary-market exposure analytics — modeled on Preqin/PitchBook subscription economics, but built on our own proprietary transaction data rather than survey data.
- **White-glove origination retainer (bridge revenue, Phase 1–2 only):** for the largest, most complex GP-led continuation vehicles, offer a light-touch advisory retainer staffed by the ex-bank hires in Section 6 — priced below bank rates but enough to fund the sales team while the self-serve marketplace reaches liquidity. This is explicitly a bridge, not the end-state business — the goal is to migrate volume onto the platform fee, not to become a boutique bank ourselves.
- **Why this works long-term:** transaction fees fund distribution; the data subscription is the compounding asset, because unlike a bank's judgment (which leaves when the MD does), the pricing dataset gets more valuable and more defensible with every closed deal.

---

## 6. Team & Talent Roadmap

The single highest-leverage early decision is **who signs the first ten deals**, because in this market credibility is transferred person-to-person before it is ever transferred brand-to-brand.

1. **Founding origination team (0–6 months):** 2–4 senior hires directly out of Evercore Private Capital Advisory, Park Hill, Jefferies, Campbell Lutyens, or a secondaries-buyer seat (Coller, Ardian, HarbourVest, Blackstone Strategic Partners, Lexington Partners). Titles should signal seniority (Head of Origination, not "BD rep") — LPs need to see people they already know are handling their fund stakes.
2. **Compliance & legal (0–6 months):** General Counsel with broker-dealer/Reg ATS experience, hired before the first real transaction closes, not after. This is the single most common reason regulated fintech marketplaces stall.
3. **Platform engineering (0–9 months):** small, senior team (5–8 engineers) building the matching, data-room, and audit-trail infrastructure described in `docs/design-brief.md` §7–8. No junior-heavy build-fast-and-fix-later team — a security incident in month 3 is an extinction event for a trust business.
4. **Data science / pricing (6–12 months):** a small team dedicated solely to the pricing benchmark product (Section 5) — this becomes the long-term moat and deserves dedicated headcount before it's revenue-critical.
5. **Advisory board (ongoing):** 3–5 independent, unaffiliated advisors with institutional secondaries or LP-side credibility (retired CIOs, former secondaries fund GPs) to sit on calls with skeptical General Counsels — this is a credibility instrument, not a governance formality.

---

## 7. Trust, Security & Regulatory Roadmap

This has to be sequenced *before* growth, not after — see Section 3's Palico lesson.

| Milestone | Target window | Why it's a gate, not a nice-to-have |
|---|---|---|
| Legal structure decision: registered broker-dealer + Reg ATS (or exempt-market alternative / white-label BD partnership as a faster path to market) | Month 0–3 | You cannot legally intermediate securities transactions without this; get outside securities counsel involved before the first LOI is drafted |
| SOC 2 Type II readiness (audit engaged, controls live) | Month 1–6, report by month 9–12 | This is the single line item General Counsels ask for first — see `docs/design-brief.md` §6.8 |
| KYC/AML + accreditation verification on every counterparty | Live before first real bid is accepted | Non-negotiable for any real transaction, not just good practice |
| Encrypted, watermarked data rooms with immutable audit trail (every view, download, bid timestamped) | Live before first real data room opens | Leak-traceability is what lets a seller trust a broader buyer pool than a bank's Rolodex |
| ILPA continuation-fund guideline alignment (conflicts disclosure, fairness opinion process for GP-leds) | Month 3–9 | GP-led continuation vehicles are the fastest-growing part of the secondaries market and the most conflict-sensitive — ILPA's 2023 guidelines are becoming the de facto standard LPs expect |
| Published security & compliance disclosures (footer + hero, not buried) | Ongoing from launch | Per design brief — security is a first-class visual/trust element, not a badge |

---

## 8. Product & Technology Roadmap

Four phases, each unlocking the next — full UI/UX spec lives in `docs/design-brief.md`.

**Phase 1 — Prove the venue works manually (Months 0–6)**
Concierge-mode marketplace: origination team sources and structures the first 5–10 deals largely by hand, but every deal runs through the platform's data room, bidding, and audit-trail infrastructure so the tech is battle-tested on real transactions before it's asked to scale. Goal: close the first transactions and generate the first real (non-illustrative) pricing data points.

**Phase 2 — Self-serve marketplace for the mid-market (Months 6–18)**
Ship the live marketplace table, filters, and bid/offer flow from `docs/design-brief.md` §7–8 for real listings. Focus exclusively on the underserved mid-market wedge (Section 3) where banks under-invest — sub-$150M LP stakes and sub-$500M single-asset continuation vehicles. Replace "Illustrative" data tags with real listings as soon as volume allows, per the design brief's content-integrity rule.

**Phase 3 — Pricing benchmark & data product (Months 12–24)**
Launch the subscription analytics product (Section 5) built on proprietary closed-transaction data, not third-party survey data. This is the point at which the platform stops being "a cheaper bank" and starts being "the reference price" — the Fink-standard moat.

**Phase 4 — Platform expansion (Months 18–36+)**
Extend beyond buyout/PE LP stakes into venture secondaries, real estate and infrastructure secondaries (direct Zell/Gray territory), and private credit secondaries. Add direct company/cap-table secondaries as a fully separate table view (already scoped in the design brief §7.3). International expansion follows liquidity, not the reverse — open a market only once cross-border demand is already showing up in inbound interest.

---

## 9. Go-to-Market Roadmap

1. **Anchor liquidity first, not listings.** Before the first seller lists a stake, sign 10–15 committed institutional buyers (secondary funds, FoFs, family offices) who agree to review flow — a marketplace with buyers and no sellers is annoying; a marketplace with sellers and no buyers is dead. Buyers are the easier sell (more of them, lower trust bar, direct economic upside from more deal flow).
2. **Land the first sellers through the founding team's existing relationships (Section 6),** not through outbound marketing — the first 10 deals are relationship-sold, full stop.
3. **Publish the pricing benchmark for free before charging for it.** This is the single highest-leverage credibility and inbound-lead-gen move available — it's how Preqin, PitchBook, and Aladdin all built distribution before monetizing the data layer.
4. **Let the featured-opportunity and insights sections of the site (`docs/design-brief.md` §6.7, §6.9) function as the top of funnel** — market commentary and curated deal visibility bring buyers back even between transactions.
5. **Expand by asset class, not by geography, for the first 24 months.** Depth in PE/VC/real estate secondaries in one core market (US institutional) beats shallow presence in five markets.

---

## 10. Capital Roadmap

| Round | Target timing | Use of funds | What it needs to prove to raise the next round |
|---|---|---|---|
| Seed | Month 0 | Founding origination + compliance + core engineering team; broker-dealer/ATS setup; first concierge-mode deals | First 3–5 closed transactions, SOC 2 in progress, real (non-illustrative) pricing data emerging |
| Series A | Month ~12–18 | Scale engineering for self-serve marketplace (Phase 2); data science team for pricing product; expand origination coverage | Self-serve transaction volume growing without linear headcount growth; pricing benchmark product live |
| Series B | Month ~30–36 | Multi-asset-class expansion (Phase 4); subscription data product go-to-market; potential international expansion | Data subscription revenue growing faster than transaction fee revenue — proof the moat is compounding, not just the marketplace |

Target investor profile: fintech/infra-focused funds with prior regulated-marketplace experience, plus strategic angels who are themselves recognizable names from the secondaries buy-side or bank advisory world — their check size matters less than the credibility transfer their name provides to the first institutional counterparties.

---

## 11. Moat & Long-Term Defensibility

Ranked by how hard each is to copy, hardest first:

1. **Proprietary closed-transaction pricing data** — compounds with every deal, cannot be replicated by a new entrant without years of transaction volume.
2. **Regulatory/compliance infrastructure** (broker-dealer registration, SOC 2, audit-trail systems) — expensive and slow to build, which is exactly why it's defensible.
3. **The founding team's institutional relationships** — depreciates in relative importance over time as the platform's own brand trust takes over, by design (this is the Fink-to-Gray transition: from person-trust to system-trust).
4. **Network liquidity** (buyers already on-platform makes it the obvious place to list, and vice versa) — the standard marketplace moat, but slowest to build in a trust-gated market, which is why Sections 6–9 sequence trust before scale.
5. **Brand as "the reference price"** — the end-state moat: once allocators cite our benchmark in their own LP reporting the way they cite Preqin today, switching cost becomes reputational, not just transactional.

---

## 12. Milestones & KPIs by Horizon

**0–6 months:** Legal/compliance foundation live; founding origination + GC hired; first 3–5 concierge-mode transactions closed; SOC 2 audit engaged.

**6–18 months:** Self-serve marketplace live for mid-market LP stakes; median time-to-first-bid under 10 days (vs. bank-standard months); 10–15 anchor institutional buyers active; real transaction data replacing illustrative listings.

**18–36 months:** Pricing benchmark subscription product launched and generating revenue growing faster than transaction fees; expansion into a second asset class (venture or real estate/infrastructure secondaries); blended take rate demonstrably a fraction of bank advisory fees at comparable or better time-to-close.

**36+ months:** Recognized as a cited pricing reference by institutional allocators; multi-asset-class platform; data product functions as the category's Aladdin-equivalent — infrastructure the market runs on, not just a marketplace it occasionally uses.

---

## 13. Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Regulatory misstep (operating as unregistered broker-dealer, mishandling MNPI-adjacent fund data) | Securities counsel engaged before first LOI; GC hired in Phase 1, not after a problem arises |
| Chicken-and-egg liquidity failure (repeat of Palico) | Sequence trust and anchor buyers before self-serve scale (Sections 3, 9) |
| Security incident destroying trust in a business whose entire value proposition is trust | Security infrastructure (Section 7) is a Phase 1 gate, not a Phase 2 feature; over-invest here relative to a typical seed-stage startup |
| Incumbent banks respond by cutting fees or launching their own tech layer | Our moat is data compounding + regulatory infrastructure, not just price — a fee cut narrows but doesn't close the gap, and banks are structurally disincentivized from publishing pricing transparency (Section 3) |
| Founding-team relationship dependency doesn't transfer to platform-level trust | Deliberate design-brief choices (audited-feeling numbers, published benchmark data, visible security posture) accelerate the person-trust-to-system-trust transition described in Section 11 |

---

*This roadmap is the business-strategy counterpart to `docs/design-brief.md`. Product/UI decisions should trace back to a section here; strategy decisions here should be reflected in the product experience there.*
