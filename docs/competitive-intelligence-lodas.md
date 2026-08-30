# Competitive Intelligence — LODAS Markets

**Prepared by:** Architect (standing strategy agent)
**Subject:** What LODAS Markets is, what it proves, what it threatens, and the specific moves it should
change in our plan.
**Status:** v1.0 — living document. Companion to [`docs/roadmap.md`](roadmap.md) §2A (regulatory
perimeter), [`docs/technical-roadmap.md`](technical-roadmap.md) W10 (counterparty-of-record
integrations), and [`docs/category-strategy.md`](category-strategy.md) §3 (search) and §5
(amendments). Amendments arising from this analysis are proposed in `docs/category-strategy.md` §5
as **A6–A9**, per this repo's change-control convention; this document does not edit gates.

---

## 0. Provenance and evidentiary standard

Everything in §1 comes from web research conducted by the founder against public sources — press
releases, LinkedIn, MarketsWiki, and industry press. **This is not a site audit**; the LODAS domain
was not reachable from the environment this analysis was written in, so nothing here rests on
first-hand inspection of their product, pricing, listing mechanics, or onboarding flow.

Two consequences, and they are load-bearing given `docs/design-brief.md` §9:

1. **§1 facts are sourced; §2 onward is inference.** Where this document reasons about *why* a
   structure was available to LODAS — particularly the tax-form argument in §2.2 — that is our
   structural reading, not a disclosed fact, and it carries the same "confirm with counsel" flag
   `docs/roadmap.md` §2A.5 applies to every legal assertion in this repo.
2. **Nothing in this document is customer-facing copy.** Statements about a named competitor's
   structure, fees, or intentions do not go on the website in this form. §7 states what may.

---

## 1. What LODAS Markets actually is

| Attribute | Fact |
|---|---|
| Founded / history | Launched 2021 as Realto, Inc.; rebranded LODAS Markets. "LODAS" = *Liquidity On Demand As a Service.* Based in Overland Park, Kansas. |
| Regulatory stack | Operates through SEC-registered subsidiaries: **LODAS Securities** (broker-dealer and registered **Alternative Trading System**) and **LODAS Transfer** (registered **transfer agent**). |
| Self-description of the model | Described by their own people as operating "a lot like a stock exchange. It's just a stock exchange for real estate." |
| Asset scope | Non-traded REITs, BDCs, and private real estate investments, traded "similar to corporate stocks" on a continuous marketplace. |
| Sponsor relationships | **Exclusive marketplace for trading shares of Blackstone's BREIT and Starwood's SREIT** — the two largest non-traded REIT sponsors. |
| Channel | Wealth management / RIA / financial advisor channel — retail and semi-retail holders, reached through their advisors. |
| Recent expansion | Announced **strategic partnership with CAIS** (the major RIA-facing alternatives platform) to launch a **secondary marketplace for private funds**. |
| Cold-start GTM | Solved the chicken-and-egg problem by lining up institutional buyers with capital **reserved/earmarked for specific products or asset classes before opening the marketplace broadly**. Concentrated buying power attracted sellers. |
| Public voice | "Discover liquidity on your terms. Buy when you want to buy. Sell when you want to sell." Consumer-legible, low-friction register. Sign-up "takes just a few minutes." |
| Pricing | **No public fee information surfaced in research.** Treat as unknown, not as absent. |

---

## 2. Threat assessment — precise, not defensive

The instinct after reading a competitor launch is to compress everything into "are they coming for
us." The useful question is narrower: *which specific asset of theirs would we have to build to
neutralise, and which of their assets is irrelevant to our buyer.* Four categories.

### 2.1 Not a competitor today, and the reason matters more than the conclusion

LODAS and SecondariesMatch are, as of today, in **different markets on four independent axes** — and
it takes all four to be different for the "adjacent" label to be honest:

| Axis | LODAS | SecondariesMatch wedge (`docs/roadmap.md` §3 Phase 1) |
|---|---|---|
| **Instrument** | Shares of non-traded REITs, BDCs, private real estate vehicles — corporate/trust form | LP interests in closed-end partnerships and GP-led continuation vehicles — partnership form |
| **Counterparty** | Retail/HNW holders reached via their RIA or advisor; institutional capital sits on the *buy* side only | Institutions on both sides: pensions, endowments, insurers, sovereigns, secondary funds, FoFs |
| **Ticket** | Individual advisory-client positions | $5–150M positions (`docs/roadmap.md` §2) |
| **Transaction mechanics** | Continuous, order-matched, executable — an ATS | Consent-gated, negotiated, ROFR-encumbered, non-firm-quoted, waiting-period-constrained (`docs/roadmap.md` §2A.3) |

A seller on LODAS is an advisor whose client wants cash out of a REIT allocation. A seller on our
platform is a Head of Private Equity managing a denominator problem across a 40-line portfolio. The
buying committees do not overlap, the diligence does not overlap, and the workflow does not overlap.

**Do not treat this as "so they're irrelevant."** The four-axis difference is exactly why they are
useful: they are a live, funded, regulated experiment running the *structural counterfactual* to our
core regulatory argument. What they proved is more valuable to us than what they threaten.

### 2.2 What LODAS confirms about §2A.1 — from the other side of the line

`docs/roadmap.md` §2A.1 argues that LP interests are the correct wedge partly because a continuous
order-book ATS is legally unavailable there: partnership interests traded on "the substantial
equivalent of a secondary market" risk PTP status under IRC §7704, which is why §1.7704-1(g)'s
qualified-matching-service conditions (non-firm quotes, 15-day and 45-day clocks, 10% annual volume
cap) constrain the product surface rather than merely inconvenience it.

LODAS is that argument's mirror image. They built the **full** stack — BD, ATS, and transfer agent —
and they built it in non-traded REITs and BDCs. Those are **not partnerships**: REITs are
corporations or trusts electing REIT tax treatment; BDCs are typically corporations electing RIC
treatment. §7704 has nothing to bind against. *(This is our structural reading of why the ATS route
was available to them, not a statement LODAS has made; confirm the tax-form characterisation with
tax counsel alongside the §2A.3 work.)*

The inference that follows is the most useful thing in this document:

> **The choice of asset class is what made their regulatory architecture possible, and the same
> choice is what makes it unavailable to us.** LODAS did not out-execute anyone into an ATS for LP
> interests. Nobody has one, because nobody can have one under the current structure. Our §2A.1
> conclusion is not merely still valid — it now has an external, well-capitalised, regulated data
> point standing on the corporate-form side of the line and visibly *not* crossing it.

Practical consequence: the reflex "LODAS has an ATS, we should get an ATS" is the single most
expensive wrong move available in response to this research. §6.1 refuses it explicitly.

### 2.3 What is genuinely threatening — and it is not the ATS

Three real threats, ranked. None of them is the order book.

**(a) Licence asymmetry — the uncomfortable one.** LODAS holds, today, three registrations we do not
hold: broker-dealer, ATS, transfer agent. `docs/roadmap.md` §2A.2 has us at "file the application,
execute a bridge with an existing BD" — the right plan, but the right plan is not a credential. A
General Counsel doing five minutes of diligence can verify LODAS's registrations and cannot verify
ours, because ours do not yet exist. **It is easier to move upmarket from a licensed base than to
move downmarket from an unlicensed one.** This asymmetry is the actual competitive fact, and it is
also a live integrity problem on our own site (§7, recommendation 1).

**(b) The CAIS partnership — the fact to watch, not to dismiss.** CAIS owns the RIA distribution
channel for alternatives, and the wealth channel is where the fastest-growing pool of private-markets
AUM sits. A LODAS/CAIS "secondary marketplace for private funds" plausibly standardises secondary
liquidity for the entire advisor channel. That is real strategic mass.

But be precise about the likely scope. The evergreen vehicles the wealth channel actually holds —
perpetual/non-traded BDCs, interval funds, tender-offer funds, non-traded REITs — are
overwhelmingly **corporate or RIC form**, chosen deliberately so retail holders get a 1099 rather
than a K-1. If the CAIS marketplace extends across that universe, it is a large expansion *within
the corporate-form regime*, not a crossing into the LP-interest regime. That is the base case.

**The falsifiable test, and it is the one thing worth monitoring quarterly:** does LODAS/CAIS ever
list a **Delaware LP interest in a closed-end drawdown fund with a continuous or firm quote**? If
yes, one of three things is true — they hold tax comfort we do not understand (go find out how),
they are operating inside QMS constraints and the "continuous marketplace" framing is marketing
rather than mechanics (most likely — and it means the constraint set we have already designed for is
the constraint set they will discover), or they are taking a §7704 risk no GP would knowingly accept
(in which case the first GP tax event ends that product). Assign this watch to a named owner with a
quarterly check; see amendment A9.

**(c) Frame contamination.** "Liquidity on demand" sets an expectation of instant executability. If
that framing spreads into the institutional conversation, our correct, legally-required answer —
non-firm indications, a 15-day clock, a 45-day close floor — reads as *slower* rather than as
*compliant*. The counter is not to speed up; it is to make the constraint legible as protection of
the GP's tax status. See §7 recommendation 2.

### 2.4 What is not a threat

- **Their tone and onboarding speed.** Correct for their buyer, wrong for ours. §5.
- **BREIT/SREIT exclusivity as such.** It is an asset in an asset class we are not entering. What is
  transferable is the *shape* of the asset — sponsor-side designation — not the specific deals. §4.3.
- **Deal-count or volume comparisons.** Different denominators. Any internal deck that puts our deal
  count next to theirs is comparing a pension's LP stake to an advisory client's REIT position.

---

## 3. What LODAS proves about W10 — the transfer-agent moat

This is the section that should change engineering priorities, and it does so by *sharpening* W10
rather than reprioritising it.

### 3.1 Three things their stack demonstrates

1. **A startup can obtain and operate a registered transfer agent.** W10 currently treats the
   register as something held by *someone else* — administrators and TAs we integrate with,
   bilaterally, with a named dependency risk that they could gate access or build competing tooling
   (`docs/roadmap.md` §8; `docs/technical-roadmap.md` §9). LODAS demonstrates the third option W10
   does not name: **own the register.** Transfer-agent registration is, per our understanding, a
   materially lighter regulatory lift than FINRA broker-dealer membership — a filing plus an ongoing
   recordkeeping, turnaround, and reporting regime rather than a multi-month membership process.
   *(Confirm scope, cost, and the applicable Rule 17Ad- series obligations with counsel before this
   becomes a plan.)*

2. **Sponsor exclusivity is downstream of infrastructure, not of relationships.** LODAS is not the
   exclusive BREIT/SREIT venue because someone knew someone. They are the venue because they can
   *complete the transfer* — the register update is theirs. The lesson is directional and it maps
   cleanly onto `docs/technical-roadmap.md` W10's own thesis: "a secondaries transaction is not
   complete when a bid is accepted; it is complete when the fund administrator updates the register."
   LODAS is the existence proof that whoever holds that last mile can convert it into exclusivity.

3. **Register ownership is the only structure in which our own §2A.3 transfer-capacity tracker is
   authoritative.** This is the sharpest point in the document. The tracker's whole value is that it
   counts *all* transfers against a fund's per-tax-year PTP volume cap, **including transfers that
   never touched our platform**. As an integrator, we reconstruct that number from feeds and
   documents and it is only as good as the counterparty's cooperation. As the registrar, we *are*
   the count. The GP wedge W10 already identifies as its starting point gets structurally stronger
   the closer we sit to the register.

### 3.2 The sharpening: W10 needs a T-4, and a realistic entry point

W10's tiers run T-0 (document intake, permanently supported) → T-1 (read) → T-2 (write/instruct) →
T-3 (embedded — the administrator runs their workflow inside our system). Add:

> **T-4 — Register ownership.** SecondariesMatch, or an affiliate, acts as registered transfer
> agent / registrar of record for vehicles where we can be named at formation.

The entry point matters more than the ambition. Displacing an incumbent administrator on a
fifteen-year-old buyout fund is not happening. **GP-led continuation vehicles are the exception**:
the vehicle is *new*, service providers are chosen at formation, there is no incumbent relationship
to displace, and the sponsor is already in a conversation with us about the transaction that creates
it. That is the same structural opening LODAS walked through — get named in the formation documents
— available to us in the asset class where their architecture cannot follow.

**Named tension, per doctrine.** Lens 2 says do this: it is the deepest workflow lock-in available
and it converts a dependency into an asset. Lens 4 says do it *slowly and only with the compliance
capacity to do it properly*: a registered transfer agent carries recordkeeping, turnaround, annual
reporting, and lost-securityholder obligations, and operating one badly is a regulatory finding
attached to our name at exactly the moment we are asking institutions to trust a new venue. Lens 1
is neutral (it deletes the closing hand-off, but adds a regulated operating function). Lens 3 is
favourable: continuation vehicles are being formed in volume right now.

**Resolution:** evaluate in Phase 2 (counsel memo + one sponsor willing in principle), decide in
Phase 3, and never as a substitute for the T-0 document path or for multi-administrator integration.
Proposed as amendment **A6**.

### 3.3 Does this accelerate W10's schedule?

No — and resisting that is the correct call. W10's T-1 read integrations sit in Phase 2 because they
depend on having portfolios under record whose NAV actually sits somewhere worth integrating with
(`docs/technical-roadmap.md` W10: "pick by where the NAV in our first portfolios under record
actually sits"). LODAS operating in a different asset class does not change that dependency, and
pulling integration work forward ahead of the record would be reacting to a competitor's calendar
instead of our own gate structure.

What *has* changed is the narrative window. "Nobody has automated the register hand-off" is a claim
with a shelf life, and the CAIS move shortens it in the adjacent market. That argues for adding the
T-4 evaluation to Phase 2 — a memo and a conversation, not an engineering program — rather than for
resequencing anything already scheduled.

---

## 4. What to learn from their GTM

### 4.1 The reserved-capital tactic, and why our version must be different

LODAS's cold-start solution — lining up institutional buyers with capital earmarked *for specific
products* before opening broadly — is a stronger version of a tactic our plan already contains in
weaker form. `docs/technical-roadmap.md` W1 captures **stated** mandates and shows sellers a count of
qualifying live mandates at listing intake. A stated mandate is soft. Reserved capital against a
named target is hard, and the difference is exactly the difference between "we think there are
buyers" and "there is $25M waiting."

But their version does not port directly, for a reason worth stating plainly: **BREIT shares are
fungible; LP interests are not.** "Reserve $50M for BREIT" is a meaningful commitment because every
share is the same share. "Reserve $50M for LP interests" is meaningless. The unit of reservation has
to be the **cohort**, not the product:

> *"$25M committed, deployable through 31 March, for 2016–2019 vintage North American mid-market
> buyout positions, $5–30M NAV per position, at or below 90% of NAV."*

That is a capacity declaration about the *buyer*, dated and scoped, and it is precisely the object
the standing demand map in `docs/category-strategy.md` §2.2 Screen 4 already needs. The tactic and
the product converge, which is the test for whether a competitive reaction is strategy or mimicry.

**Hard constraint, and this one can genuinely hurt us.** A "reserved capital" construct is one bad
UI decision away from being a firm quote against a listed LP interest — which `docs/roadmap.md`
§2A.3 identifies as a PTP safe-harbour breach, i.e. the one error a GP never forgives. Three rules,
non-negotiable, and they belong in the spec before the feature:
- Reservation attaches to a **cohort**, never to a specific listed position.
- Reservation is **never displayed on a listing as an executable price** and can never trigger an
  automatic match, allocation, or execution.
- Wording reviewed by **tax counsel and securities counsel** before it is exposed to any
  counterparty — capacity language sits close to both the §7704 line and the §3(a)(4) line.

Proposed as amendment **A7**, including the instrumented number: *committed, dated buy-side capacity
by cohort, measured before seller outreach begins in that cohort.* Phase 1 already runs concierge
origination; this makes the sequencing explicit and measurable rather than implicit in a founding
transactor's judgement.

### 4.2 Does this modify the Phase 1 concierge approach?

It sharpens the ordering, it does not replace the approach. The concierge model in
`docs/roadmap.md` §3 Phase 1 stays — the founding transactors personally running ~20–30 deals is how
process credibility (`docs/technical-roadmap.md` §1.2, asset 3) gets earned, and no amount of
pre-committed capital substitutes for it.

The modification is one sentence: **build committed buy-side capacity in a named cohort before
soliciting sellers in that cohort, and instrument it.** LODAS's insight is not "get buyers first" —
every marketplace knows that — it is that *concentrated, declared, dated* buying power in a narrow
target is what makes sellers move, and diffuse interest across a broad universe does not. For us
that means resisting the temptation to onboard buyers across every strategy at once in order to make
the mandate count look large. A deep cohort beats a wide registry at this stage.

### 4.3 The exclusivity asset, translated

BREIT/SREIT exclusivity is a **sponsor-side** lock, not a buyer-side one. It is worth more than any
number of buy-side relationships because it makes the venue the default path for an entire pool of
supply, permanently, without re-winning it deal by deal.

Our translation is not an ATS and not an exclusive marketplace. It is the **designated transfer
venue** arrangement: a mid-market GP names SecondariesMatch in its LP transfer policy as the venue
through which LP transfer requests are processed, in exchange for the §2A.3 transfer-capacity tracker
and the consent/ROFR clock tooling in W10 T-2. The GP gets a live view of a compliance exposure they
currently track in a spreadsheet; we get standing access to that fund's transfer flow.

This is the highest-value competitive counter in this document, because it builds the *same shape of
asset* LODAS built, in the market where their architecture cannot operate. Proposed as amendment
**A8**: one such arrangement as a Phase 2 deliverable and gate item.

---

## 5. Tone, onboarding, and what not to imitate

### 5.1 Their voice is right for their buyer and wrong for ours

"Buy when you want to buy. Sell when you want to sell." is good copy for an advisor's client. It is
the wrong register for the three readers named in `docs/design-brief.md` §3 — a General Counsel
checking compliance language before the fund is allowed to view the deal list, an MD deciding whether
this merits a warm intro, an analyst who wants to filter 200 opportunities in ten seconds. None of
them is reassured by reassurance. **Do not imitate this, and specifically do not "simplify" our copy
after reading theirs** — for our audience, simplification of a genuinely complex process reads as not
understanding the process.

The real steal is not the tone; it is the **specificity about what the user gets and when**.
Concreteness is not retail. `docs/design-brief.md` §4.2's "evidence over adjectives" and LODAS's
plain-spokenness point at the same discipline from opposite directions; we should be as concrete as
they are and as precise as we already claim to be.

### 5.2 The low-friction onboarding claim — react to the disclosure, not the speed

"Sign-up takes just a few minutes" is worth reacting to, but not by matching it. Our onboarding
cannot and should not take a few minutes: entity verification, UBO resolution,
accreditation/qualified-purchaser evidence, and sanctions screening are the trust floor
(`docs/roadmap.md` §5, W6), and compressing them is the trade the doctrine says to refuse.

What is genuinely good about their claim is that it **tells the user the cost of onboarding before
they start.** Our equivalent — and it is strictly better for our persona — is to publish the
*checklist*, not a duration:

> What verification requires: entity formation documents · beneficial-ownership disclosure ·
> accreditation or qualified-purchaser evidence · authorised-signer list · sanctions screening.

`docs/roadmap.md` §5.1 already adopts the late-KYC gate with an honest gate modal; this is that
decision made concrete. **Do not publish an elapsed-time figure until we have measured a real one**
(`docs/design-brief.md` §9). For a GC, the selling point is not "fast" — it is "no surprises." Frame
predictability, never speed.

---

## 6. How we beat them — specific, falsifiable, four-lens checked

Six moves. Two of them are refusals, which is the point: a competitive review that produces only
additions has not done its job.

### 6.1 REFUSE: do not build an ATS or an order book for LP interests

The reflexive response to "they have an ATS" is to want one. It is illegal for LP interests under
the structure we operate in (`docs/roadmap.md` §2A.3), it is already listed as out of scope in
`docs/category-strategy.md` §2.5, and it would put a GP's pass-through tax status at risk.

**Four-lens:** Lens 1 fails — it does not delete a step, it adds a legal defect. Lens 2 fails — no
moat; the ATS is the copyable part and the register is the durable part. Lens 3 fails — it is
reacting to a competitor's calendar. Lens 4 fails catastrophically. Four failures. This is a
reflexive feature-match, and naming it as one is the most valuable output of this review.

*Falsifiable check:* if this appears in a quarterly roadmap, someone read §2 of this document as
"they have something we don't" rather than as "they chose a different asset class."

### 6.2 Fix the credential claims on our own surface before anything else

Our site currently asserts "SOC 2 Type II · Member FINRA-registered broker-dealer network" in the
utility bar. Per `docs/roadmap.md` §2A.2 and Phase 0, neither is held today: the BD application and
bridge arrangement are the plan, and SOC 2 is a program "underway." LODAS's registrations are real
and verifiable in seconds; ours are asserted and not verifiable at all.

A GC who checks and finds nothing does more damage than any fee comparison could. This is also the
one axis where we can be *structurally* better than an incumbent brand — checkability — and we are
currently spending it. **Highest-priority, lowest-cost move in this document.** See §7 rec 1.

**Four-lens:** Lens 4 decisive. Lens 2 supportive (the checkability advantage is the brand). No
tension.

### 6.3 Evaluate register ownership at formation (W10 T-4)

Per §3.2. *Falsifiable milestone:* by the Phase 2 gate, (a) a written counsel memo on transfer-agent
registration cost and ongoing obligations, and (b) one continuation-vehicle sponsor who has agreed
in principle to name us as registrar at formation. Proposed as **A6**.

**Four-lens:** Lens 2 strongly for; Lens 3 for (CVs forming now); Lens 4 tension named in §3.2 and
resolved by sequencing the decision behind compliance capacity; Lens 1 neutral.

### 6.4 Ship cohort-scoped capital reservation, with the firm-quote firewall

Per §4.1. *Falsifiable milestone:* at least one cohort carrying dated, committed buy-side capacity
before seller outreach begins in that cohort, recorded as an instrumented number in
`docs/technical-roadmap.md` §8. Proposed as **A7**.

**Four-lens:** Lens 3 strongly for; Lens 1 for (it deletes the "do buyers exist" question the
incumbent's Rolodex answers); Lens 2 for (reservations are structured objects that deepen the mandate
registry); **Lens 4 tension, named and hard** — this construct sits adjacent to a firm quote and must
be counsel-reviewed before exposure, per the three rules in §4.1.

### 6.5 Win one designated-transfer-venue arrangement with a GP

Per §4.3. *Falsifiable milestone:* one signed arrangement by the Phase 2 gate, with the
transfer-capacity tracker live for that fund. Proposed as **A8**.

**Four-lens:** all four. Lens 1 (deletes the GP's spreadsheet), Lens 2 (standing supply access,
non-copyable by a venue without the tracker), Lens 3 (GPs are managing transfer volume under real
pressure now), Lens 4 (it is a compliance service; it strengthens rather than trades against trust).
This is the single move to prioritise if only one is taken.

### 6.6 Publish the fee schedule, and publish where we are the wrong answer

Research surfaced no public LODAS pricing. Incumbent advisory pricing is likewise undisclosed
(`docs/roadmap.md` §2 — fee opacity is the business model, not an oversight). **Fee transparency is
simultaneously available against both**, it costs nothing, and `docs/roadmap.md` §3 Phase 1 already
treats the published schedule as marketing rather than merely monetisation.

Pair it with the concession page `docs/category-strategy.md` §3.4 already argues for: where a
bulge-bracket process, a NAV loan, or a GP tender is genuinely the better route, say so. An honest
comparison that concedes something is the only kind a General Counsel finds credible, and it is
unavailable to a competitor whose fee is undisclosed.

**Four-lens:** Lens 3 (timing — do it before incumbents are forced to); Lens 2 (fee transparency is
a wedge into the pricing-transparency position the benchmark product later occupies); Lens 4
(concession builds the GC relationship); Lens 1 neutral.

### 6.7 REFUSE: do not chase LODAS-adjacent search traffic

The obvious SEO reaction is to target `LODAS Markets alternative`, `non-traded REIT liquidity`, and
similar. Refuse. That traffic is advisor and retail, which `docs/category-strategy.md` §3.3 guardrail
(a) already identifies as traffic we cannot serve and that costs compliance attention to filter. One
honest market-structure explainer distinguishing wealth-channel vehicle liquidity from institutional
LP-interest secondaries belongs in Group D (informational authority, high citation value); a
comparison landing page does not. Proposed as **A9**.

---

## 7. Website recommendations (scoped — for the founder to implement, not this workstream)

Four narrow additions to `index.html`. Each targets the institutional GC/CIO persona in
`docs/design-brief.md` §3, holds the register in §2/§4 of that brief, and is deliberately small
enough not to collide with the broader site work owned by `docs/platform-design-brief.md` v2.0.

**1. Correct the utility-bar credential claim (line 219) — do this first.**
Current text asserts SOC 2 Type II and FINRA-network membership we do not hold (§6.2). Replace with a
factual posture statement, e.g.:
> `Institutional access only · SOC 2 Type II program in progress · Broker-dealer registration in process — transactions effected through a registered broker-dealer`
Adjust to whatever counsel confirms is accurate as of the day it ships. The footer disclosure at line
438 needs the same pass. This is the checkability advantage, spent or kept.

**2. A short "What this venue is, and is not" strip beneath the marketplace table.**
Three one-line columns, no icons, hairline dividers, in the marketplace section's existing type
scale. Draft copy:
> *Not a continuous order book.* LP interests are quoted on an indicative, non-firm basis, with
> statutory notice and closing periods observed — protecting the fund's partnership tax status.
> *Not a retail liquidity product.* Institutional counterparties only, verified before any deal
> material is released.
> *Not an advisor.* The venue does not take a side; pricing evidence and process are the same for
> both counterparties.
This converts our biggest apparent weakness against a "liquidity on demand" frame into the reason a
GP's counsel can approve the venue, and it names no competitor.

**3. A fifth tile in the Security section: transfer compliance.**
The existing four tiles (encryption, verified counterparties, audit trail, watermarking) are table
stakes any venue can claim. The differentiated one is the mechanic no one else surfaces:
> **Transfer compliance by design** — GP consent status, ROFR notice periods, and per-fund transfer
> capacity are tracked as part of the process, with source citations to the governing documents.
Word it as how the process works, not as a shipped product claim, until W10's tracker is live
(`docs/design-brief.md` §9).

**4. A verification checklist in the "Request Access" gate modal.**
Replace any implicit "quick signup" framing with the explicit list from §5.2: entity formation
documents, beneficial-ownership disclosure, accreditation or qualified-purchaser evidence,
authorised-signer list, sanctions screening. **No elapsed-time figure** until a real one has been
measured. Predictability is the pitch, not speed.

---

## 8. Standing watch conditions

Reviewed quarterly by a named owner (proposed: whoever owns the regulatory perimeter in Phase 0).
Any single trigger forces a strategy review, not a feature response.

| # | Trigger | Why it matters |
|---|---|---|
| 1 | LODAS/CAIS lists a **Delaware LP interest in a closed-end drawdown fund** with a continuous or firm quote | Directly contradicts our §2A.3 reading, or reveals a structure we should understand. Either outcome is high-value. §2.3(b). |
| 2 | LODAS launches an **institutional (non-advisor-channel) seller onboarding flow** | The upmarket move. Their licence base makes it cheaper for them than the downmarket move is for us. |
| 3 | LODAS Transfer is appointed **transfer agent for a partnership-form vehicle** | They have crossed the regime line and are managing PTP surveillance. Study how. |
| 4 | Any competitor announces a **GP-facing transfer-capacity or PTP tracker** | Our sharpest GP-side wedge (`docs/roadmap.md` §2A.3) is contested. Accelerate A8. |
| 5 | LODAS publishes a **fee schedule** | Removes our transparency advantage against them specifically; check that ours is still materially better and still published. |

---

## 9. Closing

The finding that should survive this document if nothing else does: **LODAS did not solve the problem
we are solving; they chose the asset class where the problem was solvable with an exchange, and their
existence is the strongest external confirmation yet that our §2A.1 wedge choice was right.** What
they should change in our plan is not our architecture but our ambition about the register — they
demonstrated that a startup can own it, and that owning it is what converts a venue into a sponsor's
default. The three amendments that follow from that (A6 register ownership, A7 cohort capital
reservation, A8 designated transfer venue) are all attempts to acquire the *shape* of their assets in
the regime where their architecture cannot follow.

And one item is more urgent than any of them: our own site currently claims credentials LODAS
verifiably holds and we verifiably do not. Fix that before adding anything.
