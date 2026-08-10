# SecondariesMatch — Platform Design Brief v2.0
## Full-Site Architecture & Category-Leadership Blueprint

**Prepared for:** SecondariesMatch
**Prepared by:** Design Council (institutional markets UX, capital-markets product design, and consumer-scale design systems practice)
**Audience:** Claude Design (build agent) and internal stakeholders
**Supersedes scope of:** `docs/design-brief.md` v1.0 (landing page only) — that document's visual identity system (§5), component spec (§7), accessibility rules (§11), and content-integrity rule (§9) are **inherited unchanged** and referenced, not repeated, below.
**Status:** v2.0 — Full Platform

---

## 0. How to Use This Document

This brief exists to take SecondariesMatch from *one well-designed landing page* to *the full application a category-leading institutional marketplace requires*. It is written to be handed to a build agent ("Claude Design") page by page.

- **§1–3** are the "why": current-state audit, competitive stakes, and the architectural thesis.
- **§4** is the design-system contract — what's inherited from v1.0, and the new primitives the app layer requires.
- **§5** is the sitemap — the authoritative page inventory and URL structure.
- **§6** is user flows — how the personas from v1.0 §3 actually move through the product.
- **§7** is the page-by-page brief — one card per page: job, primary persona, must-have components, states, exit criteria.
- **§8** is build phasing and handoff instructions.
- **§9** is the category-leadership scorecard — how to know the design succeeded.

**Reuse rule:** every new page inherits the v1.0 color tokens, type scale, 12-column grid, 8px spacing, hairline elevation, motion rules, and the "Illustrative" content-integrity labeling. Nothing in this document introduces a second visual language. Where a new component is required (deal-room timeline, KYC uploader, messaging thread), it is specified in §4.2 using the existing tokens.

---

## 1. Audit of the Current State

**What exists today**, as of this brief:

| Asset | What it is | Assessment |
|---|---|---|
| `index.html` | A single, self-contained static HTML/CSS/JS landing page — hero, one live-filterable marketplace table (client-rendered, hard-coded sample arrays), featured cards, a bid/offer modal, a read-only detail drawer. No routing, no backend, no persisted state. | High-quality visual execution of *one* page. This is a marketing surface, not a product. |
| `prototype/index.html` | An earlier iteration of the same page. | Superseded by `index.html`; safe to treat as historical reference only. |
| `docs/design-brief.md` | v1.0 brief scoped explicitly to the landing page. | Excellent visual/voice foundation. Scope was deliberately narrow — it does not address anything past "browse and click Submit a Bid." |
| Everything else | Does not exist: no authentication, no onboarding/KYC, no listing detail page (only a drawer), no data room, no post-bid negotiation, no dashboards, no seller listing flow, no account/settings, no notifications, no insights article pages, no legal pages, no admin console. | This is the gap this brief closes. |

**The core finding:** SecondariesMatch has designed an excellent *storefront window* and nothing behind the glass. Every "next action" on the current page — Submit a Bid, List a Stake, Sign In, Request Access — terminates in either a client-side modal that resets on refresh or a dead `href="#"`. A CIO who clicks through today hits a wall at the exact moment they were persuaded. For a financial marketplace, that gap is not a missing feature — it is the single biggest credibility risk in the product, worse than any visual imperfection could be.

**Implication for this brief:** the highest-leverage work is not another landing page — it's the twelve to fifteen pages that turn "browse" into "close." That is where §5–§7 concentrate.

---

## 2. What "Category Leader" Requires Here

The reference set the original brief invoked — Bloomberg, Preqin, Carta, Goldman Marquee — is correct for *tone*. For *architecture*, the closer comparables are the businesses actually competing for this exact transaction: **Nasdaq Private Market, Forge Global, EquityZen** (direct/secondary liquidity venues), **Carta** (cap-table-of-record plus marketplace), and **Preqin/PitchBook** (data-authority layer draped over deal flow). Studying where each of those wins and stalls out gives a concrete architectural thesis, not just a mood board:

1. **A listing board is a commodity; a deal-lifecycle system is a moat.** Every competitor can build a filterable table in a sprint. None of them are good at what happens *after* a bid — counter-offers, document exchange, closing checklists, e-signature status. SecondariesMatch's structural bet should be **owning the deal room through to close**, not just origination. This is why §5/§7 give the Deal Room (C7) more design weight than the marketplace table itself.
2. **Multi-seat institutional accounts, not single-user logins.** A pension LP's process involves a portfolio manager, in-house counsel, and often a consultant, each with different visibility. A consumer-style single-login model reads as under-built to this audience within one sign-up flow. Team & Access Management (C13) is not a "settings nice-to-have" — it's a trust signal on par with SOC 2.
3. **Own the pricing narrative, not just the listings.** Preqin and PitchBook's real moat is being *cited* — their pricing surveys become the market's reference point. The Insights hub (A8/A9) needs to be a real content system with permanent, linkable URLs (for the GC and analyst persona to cite in an IC memo), not a three-card teaser bolted to the bottom of the homepage.
4. **Vertical depth beats horizontal breadth for credibility.** GP-led continuation vehicles and direct company secondaries are structurally different transactions with different diligence, different counterparties, and different buyers. Treating them as a dropdown filter on one generic table (as today) undersells both. Dedicated vertical landing pages (A5, A6) let SecondariesMatch speak fluently to each specialist buyer instead of averaging its voice down for a general audience.
5. **The public/authenticated boundary is itself a design decision.** A marketplace that shows nothing until login looks thin (nothing to index, nothing to share, nothing for a skeptical GC to evaluate before creating an account). A marketplace that shows everything looks like it has no real access control, undermining the "verified institutional buyers only" claim. The correct pattern — used by every credible private-markets venue — is a **public teaser layer** (blurred pricing, real counts, real sector tags, gated CTA) over a **fully authenticated core**. §5.1 vs §5.3 encodes this split explicitly; it does not exist in the current single-page build.

---

## 3. Positioning Statement, Restated for the Full Product

*(Extends v1.0 §2; same voice, same restraint.)*

Where v1.0 wrote the landing page as "the trust instrument of the entire business," this brief extends that mandate: **every authenticated screen has to hold that same bar, because a General Counsel's actual diligence doesn't stop at the marketing site — it continues into the data room, the bid ticket, and the audit log.** A gorgeous landing page attached to a rough, half-built app is a worse trust signal than a plain page attached to a rigorous one. Design effort in this brief is weighted accordingly: security/audit surfaces and the deal room get as much craft attention as the hero.

---

## 4. Design System — Inheritance & New Primitives

### 4.1 Inherited unchanged from v1.0

Color tokens (§5.1), typography (§5.2), grid/spacing/elevation (§5.3), iconography/imagery rules (§5.4), motion rules (§5.5), accessibility floor (§11), and the content-integrity/"Illustrative" labeling rule (§9). Do not introduce new colors, typefaces, radii, or shadow tokens anywhere in the app layer without amending v1.0 directly — a second token set is how design systems quietly fork and rot.

### 4.2 New primitives required for the app layer

These did not exist in a landing-page-only scope. Each is built from existing tokens only.

| Component | Used on | Spec |
|---|---|---|
| **App shell / authenticated nav** | All Zone C pages | Replaces the public nav's "Request Access" CTA with: role switcher (if multi-seat), notification bell (badge count in `accent-600`), avatar menu. Utility bar collapses to a slim `ink-950` strip carrying entity name + verification badge instead of the marketing disclaimer line. Left rail (240px, collapsible to 64px icon rail) for Dashboard / Marketplace / My Bids or My Listings / Deal Rooms / Insights / Settings — app-depth navigation does not belong in a top nav past 5 items. |
| **Status stepper** (deal lifecycle) | Deal Room (C7), My Bids (C6) | Horizontal on desktop, vertical on mobile: `Submitted → Under Review → Countered → Accepted → Closing → Closed`. Filled `ink-950` dot for completed steps, `accent-600` ring for current, `line-200` for future — reuses the exact progress-dot pattern already built into the bid modal's confirmation state (v1.0 §8, step 4), just extended to more states and made persistent instead of a one-time confirmation screen. |
| **Message thread** | Deal Room (C7) | Left-aligned bubbles for counterparty, right-aligned for self, both using `paper-50`/`paper-100` backgrounds (never colored chat bubbles — this is a deal record, not a consumer chat app). Every message auto-timestamped and immutable once sent, visually reinforcing the audit-trail principle from v1.0 §5.6/§6.8. System events (e.g., "Bid revised to 91% of NAV") render as centered slate-500 dividers, not as messages, so the negotiation history stays legible. |
| **Document/e-sign row** | Data Room (C4), Deal Room (C7) | Row pattern already exists in the drawer's "Data Room Checklist" (v1.0 §7.4) — extend with a per-document state pill: `Requested` / `Available` / `Viewed` / `Signed` (each with icon, never color alone, per accessibility rule). Download and "View" actions right-aligned, watermark notice shown once per session, not per row. |
| **KYC / accreditation uploader** | Onboarding (B6) | Dropzone bordered `line-200`, `paper-50` fill, uses the same 6px input radius. File rows show name, size, and a status pill (`Uploaded` / `In Review` / `Verified` / `Needs Attention`) — never a spinner-only state; institutional users need to leave and come back without wondering if it saved. |
| **Notification center** | App shell, all Zone C | Slide-down panel from the bell icon (200ms, matches modal entry motion). Grouped by day, each row: icon by type (bid, message, KYC, listing status), one-line text, relative timestamp. Unread = left `accent-600` bar, 2px, not a background tint (keeps it readable in dense lists). |
| **Empty/pending account states** | Dashboard (C1) pre-verification, My Listings before first listing | Never a blank page. Always: one-line explanation, one primary action, and — where relevant — a preview of what the populated state will look like (a ghosted/skeleton version), consistent with the "skeleton over spinner" rule from v1.0 §7.6. |
| **Sparkline / pricing chart** | Insights articles (A9), Listing Detail (C3) | Single-color line (`accent-600`), no fill gradient, no axis chrome beyond a baseline — matches the hero's existing line-chart motif (v1.0 §6.3) so market-data visuals feel like one family across marketing and product surfaces. |

---

## 5. Full Site Architecture (Sitemap)

Three zones, split by authentication boundary — the boundary itself is the architectural decision called out in §2.5.

### 5.1 Zone A — Public Marketing Site (unauthenticated, indexable)

```
/                          A1  Home (existing landing page — retained, refined)
/marketplace               A2  Marketplace Preview  [NEW — gated teaser]
/how-it-works/buyers       A3  How It Works — Buyers
/how-it-works/sellers      A4  Sell a Stake (How It Works — Sellers + lead-gen form)
/gp-led                    A5  GP-Led Continuation Vehicles  [vertical landing]
/direct-secondaries        A6  Direct Company Secondaries  [vertical landing]
/security                  A7  Security & Compliance (deep page, not just a section)
/insights                  A8  Insights & Research Hub
/insights/:slug            A9  Insights Article  (template)
/about                     A11 About / Team
/contact                   A13 Contact / Request Access
/legal/terms               A15 Terms of Use
/legal/privacy             A15 Privacy Policy
/legal/risk-disclosures    A15 Risk Disclosures
/legal/regulatory          A15 Regulatory / Broker-Dealer Disclosures
/help                      A16 Help Center / FAQ
```

### 5.2 Zone B — Auth & Onboarding

```
/sign-in                   B1  Sign In
/sign-up                   B2  Create Account (role selection: Buyer / Seller / Advisor)
/reset-password             B3  Forgot / Reset Password
/verify-email               B4  Email Verification
/onboarding/entity          B5  Entity & Role Details
/onboarding/verification    B6  KYC/AML & Accreditation Upload
/onboarding/mandate         B7  Investment Mandate (buyers) or Listing Intent (sellers)
/onboarding/pending         B8  Pending Review (waiting room)
/settings/security/mfa      B9  MFA Setup  (also reachable from C12)
```

### 5.3 Zone C — Authenticated Core App

```
/app/dashboard              C1  Dashboard (role-aware)
/app/marketplace            C2  Marketplace (full, authenticated)
/app/listings/:id           C3  Listing Detail Page
/app/listings/:id/data-room C4  Data Room
/app/bids                   C6  My Bids / My Offers
/app/deals/:id               C7  Deal Room (negotiation → close)
/app/sell/new                C8  Sell a Stake Wizard
/app/my-listings             C9  My Listings (seller management)
/app/watchlist               C10 Watchlist, Saved Searches & Alerts
/app/messages                C11 Notification Center (full inbox view)
/app/settings/profile        C12 Account Settings
/app/settings/team           C13 Team & Access Management
/app/settings/billing        C14 Billing / Subscription  (only if platform is fee-based — confirm with stakeholders before building)
```

*(Submit a Bid/Offer, C5, remains the existing three-step modal from v1.0 §8 — triggered from C2, C3, or C7. It does not need its own route; it is correctly scoped as a modal.)*

### 5.4 Zone D — Internal / Operations (flagged, not in initial build batch)

```
/ops/listings/review        D1  Listing Moderation & Approval Queue
/ops/kyc/review              D2  KYC/AML Review Queue
/ops/audit                   D3  Dispute & Audit Log Viewer
/ops/origination              D4  Origination / Deal Desk CRM
```

A platform whose entire business is "verified counterparties, immutable audit trail" (v1.0 §6.8) is not real until someone internally is doing the verifying and auditing through an actual interface. Zone D is out of scope for the first Claude Design build pass (§8) but must be scoped now so Zone C isn't accidentally designed around workflows (e.g., instant listing approval) that Zone D will contradict later.

---

## 6. User Flows

### 6.1 Buyer — first bid

`A1 Home` → `A2 Marketplace Preview` (sees real counts, blurred pricing) → `B2 Sign Up (Buyer)` → `B5 Entity Details` → `B6 KYC/Accreditation Upload` → `B7 Mandate Criteria` → `B8 Pending Review` → *(approval notification)* → `C1 Dashboard` → `C2 Marketplace` (full data) → `C3 Listing Detail` → request access → `C4 Data Room` → Submit a Bid modal → `C6 My Bids` (status: Submitted) → notification: countered → `C7 Deal Room` → accept terms → closing checklist → Closed.

### 6.2 Seller — LP portfolio manager listing a fund stake

`A1 Home` → `A4 Sell a Stake` (lead form, low-friction) → sales-assisted or self-serve → `B2 Sign Up (Seller)` → `B5`/`B6`/`B7 (listing intent)` → `C8 Sell a Stake Wizard` (intake → indicative valuation benchmark shown inline → listing preview) → publish → `C9 My Listings` (status: Live) → bids arrive → compare side-by-side (view within C9, reusing C7's summary-card component) → open winning bid's `C7 Deal Room` → close.

### 6.3 GP-led continuation vehicle sponsor

`A5 GP-Led landing` (distinct proof points: sponsor logos, CV-specific case studies) → `A13 Contact` (this segment is high-touch/high-value; route to origination team, not self-serve signup) → sales-assisted onboarding into the same `B5–B8` flow → `C8` variant with CV-specific fields (rollover terms, status of existing LP base) → same Deal Room mechanics as 6.2.

### 6.4 Advisor / broker representing multiple clients

`B2 Sign Up (Advisor)` → `C13 Team & Access Management` used immediately to add client sub-accounts/seats with scoped visibility → operates `C2`/`C6`/`C9` on behalf of multiple underlying principals, each deal room (`C7`) scoped to the correct client for audit purposes.

---

## 7. Page-by-Page Brief

Format: **Job** (what this page is for) · **Persona** (from v1.0 §3) · **Key components** · **Primary states** · **Done when**.

### Zone A — Marketing

**A2 — Marketplace Preview** (`/marketplace`)
Job: Prove liquidity depth to a not-yet-verified visitor without leaking real pricing to non-members.
Persona: All, pre-verification.
Key components: Same table component as C2, but Ask/Bid columns render as blurred/masked values (`███%`) with a "Sign in to view pricing" tooltip on hover; real, unmasked counts and filters (sector, geography, vintage) so SEO and credibility both work.
States: Populated (illustrative, per content-integrity rule), empty-filter.
Done when: A signed-out visitor can filter and see the market is real and large, and hits exactly one wall — pricing — with a single clear CTA to remove it.

**A3/A4 — How It Works (Buyers / Sellers)**
Job: Deepen the 4-step summary already on the homepage (v1.0 §6.6) into a full page per side, with FAQs specific to that side's objections (buyer: "how is a bid legally binding?"; seller: "will my LPs/GP know I'm listing?").
Key components: Extended process timeline, embedded FAQ accordion, side-specific CTA (Request Access vs. List a Stake).
Done when: Each persona's page answers the single biggest objection that keeps a CIO or GC from clicking "Request Access" today.

**A5 — GP-Led Continuation Vehicles / A6 — Direct Company Secondaries**
Job: Vertical-specific credibility page for a specialist buyer/sponsor who would otherwise bounce off a generalist homepage.
Key components: Vertical-specific stat strip, vertical-specific case study cards (illustrative until real), vertical-specific glossary strip (rollover equity, stapled commitment for GP-led; ROFR/cap-table transfer mechanics for direct).
Done when: A GP-led specialist reading only this page — never the homepage — has everything needed to request a conversation.

**A7 — Security & Compliance**
Job: Expand the homepage's 4-item icon grid (v1.0 §6.8) into the actual page a GC forwards internally before granting access.
Key components: Full control list (encryption, KYC/AML process detail, audit-trail mechanics, watermarking, data residency, incident response contact, sub-processor list, SOC 2 report request flow), not just icon+one-liner.
Done when: This page, alone, is sufficient for a GC to say yes without a follow-up call.

**A8/A9 — Insights Hub / Article**
Job: Convert the homepage's 3-card teaser (v1.0 §6.9) into a permanent, citable content system — the Preqin/PitchBook authority play from §2.3.
Key components (A8): Filterable index by topic (Pricing Commentary / Market Structure / Regulatory), featured long-form piece, email digest signup. (A9): Article template with pull-quote style, embedded sparkline chart component (§4.2), author/date byline, related-articles rail.
Done when: An article on this domain is something an analyst would cite in an internal memo — permanent URL, real byline, real date, no "Illustrative" tag needed once real research exists (unlike marketplace listings, editorial content is real from day one and should say so).

**A11/A13/A15/A16 — About, Contact, Legal, Help**
Job: Standard institutional trust infrastructure; low design risk, high credibility cost if skipped or left as `href="#"`.
Done when: every footer link in the current `index.html` resolves to a real page instead of `#`.

### Zone B — Auth & Onboarding

**B2 — Sign Up**
Job: Role selection (Buyer / Seller / Advisor) up front — this determines the entire onboarding branch, so it cannot be an afterthought field buried in a form.
Key components: Three large selectable cards (not a dropdown) — role selection is a big enough decision to deserve real estate equal to the choice's weight.
Done when: The path diverges correctly into B5→B7's role-specific variant with no dead-end or generic fallback.

**B5/B6/B7 — Onboarding Wizard**
Job: Institutional KYC/AML and accreditation without feeling like a retail account signup.
Key components: Persistent step indicator (reuse status-stepper primitive, §4.2), save-and-resume on every step (this audience will not complete a 6-step form in one sitting), KYC uploader (§4.2), mandate/criteria step reuses the exact filter vocabulary from the marketplace table (sector, vintage, NAV size) so what a buyer sets here pre-populates C2's filters later — continuity between onboarding input and product output is what makes onboarding feel purposeful rather than bureaucratic.
Done when: A user can leave after step 2 and return days later without re-entering anything, and their B7 answers visibly shape their C1 dashboard on first login.

**B8 — Pending Review**
Job: Do not leave a verified-but-waiting institutional user staring at a spinner.
Key components: Clear expected-timeline copy, a preview/read-only peek at what they'll get access to (reinforces the value they're waiting for), contact path if urgent.
Done when: Zero "is this broken?" support tickets from this state in usability testing.

### Zone C — Core App

**C1 — Dashboard**
Job: Role-aware home base — different for a buyer (saved searches, bids in flight, new matches) vs. a seller (listing performance, bids received, valuation benchmark trend) vs. an advisor (client roster summary).
Key components: Summary-first layout per the UI design heuristic (surface state before detail): a top stat row, then role-specific modules below — reuse card and stat patterns from the homepage's stat-strip and feature-card components rather than inventing new ones.
Done when: Every module on the page answers "what needs my attention today," not just "what exists."

**C2 — Marketplace (authenticated)**
Job: The same table component from `index.html` today, now real: unmasked pricing, saved filters persist, "Save this search → alert me" affordance actually wired to C10, export-to-CSV for analysts who work in spreadsheets alongside the platform (small detail, large credibility with this persona).
Done when: The 8-column table, segmented toggle, and filter bar from v1.0 §7 are unchanged in spec but now live inside the app shell (§4.2) instead of a marketing page.

**C3 — Listing Detail Page**
Job: A dedicated, shareable, deep-linkable page for one mandate/stake — the current drawer (v1.0 §7.4) is right for a quick scan from the table but wrong as the *only* way to view a listing; a GC or committee needs a URL to forward internally.
Key components: Everything currently in the drawer, expanded with room for GP track record detail, similar-listings rail, and a persistent "Submit a Bid" action in a sticky sub-header on scroll.
Done when: The drawer and this page share the same data and visual language — the drawer is the "peek," this page is the "read."

**C4 — Data Room**
Job: Make the "watermarked, audit-logged data room" promise from v1.0 §6.8 into something a buyer actually operates, not just a marketing claim.
Key components: Document/e-sign row list (§4.2), access-request state per restricted document, a visible (not buried) "your activity here is logged" notice consistent with the audit-trail promise — this is a page where being *transparent about being watched* is itself the trust signal.
Done when: A buyer can tell, at a glance, which documents they can see now vs. must request, and a seller can see exactly who viewed what and when.

**C6 — My Bids / C9 — My Listings**
Job: The management views that make C2/C3's actions durable instead of one-shot.
Key components: Status-stepper (§4.2) per row, sort/filter parity with the marketplace table for consistency, empty state (§4.2) for first-time users.
Done when: A returning user's first question — "where do things stand?" — is answered without opening a single deal room.

**C7 — Deal Room**
Job: The single highest-leverage page in this brief per §2.1 — where SecondariesMatch either becomes a system of record for the transaction or reverts to "just a listing board with extra steps."
Key components: Status-stepper header, message thread (§4.2), bid/counter-offer history as structured data (not just chat text — every counter is its own summary card, reusing the modal's step-3 summary-card pattern from v1.0 §8), closing checklist (document/e-sign rows, §4.2), all participants' names and roles visible (multi-seat accounts, §2.2).
Done when: Everything needed to go from "Countered" to "Closed" happens on this one page, with a complete, exportable record after the fact — this is the artifact counsel will actually review post-close.

**C8 — Sell a Stake Wizard**
Job: Turn the seller's B7 intent into a live listing with a valuation benchmark checkpoint that matches v1.0 §6.6's "Confidential intake & valuation benchmark" promise.
Key components: Multi-step form mirroring the onboarding wizard's save-and-resume pattern, an inline indicative-pricing result screen before publish (labeled clearly as a benchmark/estimate, not a firm valuation), listing preview rendered using the exact C3 template so what the seller previews is exactly what buyers will see.
Done when: A seller can preview their listing exactly as C3 renders it before it goes live — no surprises between "preview" and "published."

**C10 — Watchlist, Saved Searches & Alerts**
Job: Close the loop on B7's mandate criteria and C2's "Save filter" affordance.
Key components: List of saved searches with live match counts, watchlisted individual listings, notification preference toggle per saved search (email digest vs. real-time).
Done when: A buyer never has to re-run the same filter twice.

**C11 — Notification Center (full view)**
Job: The persistent-bell dropdown from §4.2, expanded to a full page for users managing high message volume (advisors, active buyers).
Done when: Filterable by type (bids, messages, KYC, listings) and fully keyboard-navigable per the accessibility floor.

**C12 — Account Settings / C13 — Team & Access Management**
Job: §2.2's institutional-account trust signal, made real. C13 in particular: add/remove seats, assign roles (Analyst / MD / Compliance / View-only), see who on the team accessed which deal room.
Done when: A compliance officer can audit their own team's platform activity without contacting SecondariesMatch support.

---

## 8. Build Phasing & Handoff Instructions

Do not build all ~28 pages in one pass — sequence by what unblocks a real transaction fastest, and what most directly closes the "storefront with nothing behind it" risk identified in §1.

**Phase 1 — Close the credibility gap (do first).**
A2 Marketplace Preview, A7 Security (full page), the four Legal pages, A13 Contact. Every dead `href="#"` in the current `index.html` footer and nav must resolve. This phase is small and fast and removes the single biggest risk in the existing build.

**Phase 2 — Get a user from anonymous to verified.**
B1–B9 (full auth + onboarding flow), C1 Dashboard (basic version), C12 Account Settings (basic version).

**Phase 3 — Make the marketplace real.**
C2 Marketplace (authenticated), C3 Listing Detail, C4 Data Room, C10 Watchlist/Alerts. At this point the table on `index.html` graduates from a demo into the entry point of the real product.

**Phase 4 — Own the deal lifecycle (the moat, per §2.1).**
C6 My Bids, C7 Deal Room, C9 My Listings, C8 Sell a Stake Wizard. This phase is where the product stops being a listing board and becomes what §2 argues a category leader must be.

**Phase 5 — Depth and authority.**
A3/A4/A5/A6 (deepened How It Works + verticals), A8/A9 Insights Hub, C13 Team & Access Management, C11 Notification Center (full view).

**Phase 6 — Internal completeness (flagged, sequence with engineering/ops, not a Claude Design deliverable in this pass).**
Zone D (D1–D4).

**Handoff instructions for Claude Design, specifically:**
1. Treat `docs/design-brief.md` (v1.0) as the binding visual-system source and `index.html` as the reference implementation of tone/density/motion. Do not restyle either — extend from them.
2. Build each page against its §7 card. Where a page reuses an existing component (table, drawer, modal, card, stepper), reuse the actual markup/CSS pattern from `index.html`, not a reinterpretation.
3. Every new page carries the same "Illustrative"/"Sample data" labeling discipline as v1.0 §9 until real data exists — this now applies to dashboards, bid histories, and deal rooms, not just the marketplace table.
4. Build in the phase order above; do not start Phase 3 components before Phase 2's auth boundary exists, since the authenticated/public split (§2.5) is structural, not cosmetic.
5. Flag, rather than silently resolve, any open product question this brief surfaces (e.g., whether C14 Billing is in scope at all depends on the business's fee model — confirm before building).

---

## 9. Category-Leadership Scorecard

Beyond v1.0 §12's design-quality metrics (which still apply to every new page), the platform-level bar is:

- **Zero dead ends.** No CTA, footer link, or nav item resolves to `#` or a blank page anywhere in the product (today: several do).
- **Deal completability.** A pilot buyer and seller can go from first contact to a closed deal record entirely inside the product, with nothing handled over email that the platform should own (per §2.1's thesis).
- **Multi-seat legibility.** A compliance officer can, unprompted, find and explain their team's access log without help (per §2.2).
- **Citable content.** At least one Insights article has been referenced externally (LinkedIn, an IC memo, a press mention) within two quarters of the Insights hub shipping — the PitchBook/Preqin authority test from §2.3.
- **Vertical fluency.** In qualitative testing, a GP-led continuation-vehicle sponsor and a direct-secondaries buyer each describe the platform using their own domain's vocabulary unprompted, not generic "marketplace" language — evidence the A5/A6 vertical pages did their job.
