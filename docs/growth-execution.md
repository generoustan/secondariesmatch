# Growth Playbook — Execution Log

Companion to the boardroom growth memo. This tracks the deliverables that don't live in code: content, outreach, and the pricing-survey instrument that feeds the on-site lead magnet.

## 1. Weekly content engine — first six weeks

| Week | Piece | Format | Status |
|---|---|---|---|
| 1 | Q2 2026 Secondary Pricing Survey | Insights article + lead magnet | Shipped — `insights/q2-2026-secondary-pricing-survey.html` |
| 2 | GP-Led Continuation Vehicles: 2026 Outlook | Insights article | Shipped — `insights/gp-led-continuation-vehicles-2026-outlook.html` |
| 3 | Direct Secondaries in Late-Stage Tech | Insights article | Shipped — `insights/direct-secondaries-late-stage-tech.html` |
| 4 | "How GPs price a continuation vehicle in 3 weeks" | LinkedIn carousel + article | Drafted below |
| 5 | Q3 pricing survey methodology teaser | LinkedIn post | Drafted below |
| 6 | "What a GC checks before approving a secondaries platform" | Insights article | Backlog |

Cadence going forward: one Insights article every two weeks, one LinkedIn post every week (executive-authored, not brand-voice), each article cross-linked from the lead magnet and the closing CTA.

## 2. Founder LinkedIn — draft posts (weeks 1–3)

**Post 1 — the pricing survey (ties to the lead magnet)**
> Buyout secondaries priced at 91% of NAV last quarter — up 3 points in three months. That's not noise, it's spreads narrowing because the bid side finally has somewhere to put dry powder.
> We wrote up where the discount narrowed fastest, and where it didn't. Link in comments.
> (No CTA to "our platform" in the body — the value stands alone; the platform mention lives in the linked article's closing CTA.)

**Post 2 — the process, not the pitch**
> Every GP-led deal I've worked has died or lived on documentation quality, not price. The sponsors who run a competitive process — same data room, same deadline, side-by-side bids — get a fairness opinion that survives an LP objection. The ones who negotiate one-on-one don't.
> That's the whole thesis behind what we're building.

**Post 3 — the compliance angle, aimed at GCs**
> The first question every General Counsel asks before they'll let their fund even look at a marketplace: "who's watching the data room?"
> Answer: everyone's view, bid, and NDA is timestamped, and every document is watermarked to the viewer. That's table stakes for us, not a feature.

Posting cadence: 1x/week, founder account, no boosting/paid spend in phase 1 — organic only until there's proof the content resonates.

## 3. Warm-intro systematization

- Every founder/team LinkedIn post and every outbound email carries a personal referral link: `https://secondariesmatch.vercel.app/?ref=<first-name>`.
- The site captures `?ref=` on landing, persists it in `localStorage`, prefills the "Referred by" field on the access form, and shows a "Referred by {name}" badge so the visitor sees their referral was recognized.
- `?utm_source` / `?utm_medium` / `?utm_campaign` are captured the same way, so LinkedIn vs. warm-intro vs. press traffic is attributable in the mailto submission today, and swaps cleanly to a real CRM webhook later without changing the funnel.
- Target for phase 1: 15 warm intros/week from the founding team's own network, tracked via the referral badge showing up in submitted requests.

## 4. Pricing survey instrument (source for the lead magnet)

Once real deal flow exists, the "Q3 2026 Secondary Pricing Survey" should be built from a short buyer/seller questionnaire, distributed to the initial network before enough live transactions exist to derive real pricing:

1. Asset class (buyout / venture / credit / real estate / infrastructure)
2. Vintage year
3. Most recent bid or ask received, as % of NAV
4. Was the process competitive (2+ bidders) or bilateral?
5. Time from first bid to signed transfer agreement
6. Primary reason for buy/sell decision this quarter

Distribution: founder's LinkedIn network + warm intros, 10-minute survey, results aggregated and anonymized into the next Insights article — this is also how the lead magnet stays honest (real, sourced numbers) instead of drifting into the fabricated-data problem the design brief explicitly warns against (§9, `docs/design-brief.md`).

## 5. Compliance checkpoint (unresolved — flagged in the original memo)

Before any of the above LinkedIn posts or the pricing survey go out publicly, run them past counsel: general-solicitation and broker-dealer marketing rules apply the moment content references specific deal terms, pricing, or solicits buyers/sellers. This log is not a substitute for that sign-off.
