# SecondariesMatch — Landing Page Design Brief

**Prepared for:** SecondariesMatch
**Subject:** Institutional-grade marketplace landing page for private equity, venture, real estate, and infrastructure secondaries
**Quality bar:** Fortune 10 board-room / Bloomberg-Preqin-Carta-grade credibility
**Status:** v1.0

---

## 1. Executive Summary

SecondariesMatch is a matching platform that connects institutional **sellers** (LPs, GPs, family offices, endowments looking to exit fund stakes or portfolio companies) with institutional **buyers** (secondary funds, funds-of-funds, sovereign wealth, pension allocators, and direct-secondaries desks).

The landing page is the trust instrument of the entire business. Before a single data room is opened, the page has to convince a CIO at a $40B pension plan that this is a serious, secure, well-capitalized venue — not a broker's PDF list. The design language is closer to **Bloomberg Terminal, Preqin, Carta, and Goldman Sachs Marquee** than to a typical marketplace or fintech consumer product: dense, precise, quiet, and confident. No stock photos of people shaking hands. No gradients-as-decoration. The data *is* the design.

The page must do two jobs simultaneously without feeling like two products bolted together:

1. **Sell the platform** (positioning, trust signals, how it works, security/compliance) to both buy-side and sell-side visitors.
2. **Function as a live institutional database** — a real, browsable, filterable table of funds, companies, and portfolios currently for sale, with pricing, and a direct path to **Submit a Bid** or **Submit an Offer**.

---

## 2. Positioning & Voice

**Positioning statement:**
"The institutional exchange for private market secondaries — where verified sellers and vetted buyers price, negotiate, and close LP interests and direct stakes, in one auditable venue."

**Tone of voice:**
- Precise, not promotional. Prefer "45 active mandates, $3.8B in aggregate NAV" over "Thousands of deals!"
- Understated confidence. Fortune 10 material never uses exclamation points, emoji, or hype adjectives ("revolutionary," "game-changing").
- Every number on the page should look audited. If a stat can't be substantiated, don't show it.
- Copy speaks buyer/seller economics fluently: NAV, bid-ask spread, unfunded commitment, GP-led continuation vehicles, strip sales, direct secondaries, diligence, LPA transfer provisions, ROFR.

**Who is in the room when this page is judged:**
- A General Counsel checking for compliance/security language before allowing their fund to even view the deal list.
- A Managing Director deciding whether this is worth a warm intro to their capital markets team.
- A secondary-fund analyst who wants to filter 200 opportunities by vintage and sector in under 10 seconds.

---

## 3. Users & Jobs-to-be-Done

| Persona | Side | Primary job on landing page |
|---|---|---|
| LP Portfolio Manager (pension, endowment, insurance) | Sell | Confirm the platform is credible/secure, then list a fund stake confidentially and see indicative pricing. |
| GP / Fund Sponsor (continuation vehicles, strip sales) | Sell | Understand process for GP-led deals, request a guided listing. |
| Secondary Fund / FoF Buyer | Buy | Scan live supply by NAV size, sector, vintage, geography, and discount-to-NAV; submit a bid fast. |
| Family Office / Sovereign Allocator | Buy | Filter for minimum check size and asset class; request access to full data room. |
| Direct-secondaries desk (company stakes) | Buy/Sell | Filter by company, round, and cap-table position rather than by fund. |

Design implication: **the marketplace table must serve two mental models** — "funds/LP interests" and "direct company stakes" — via a segmented toggle, not two separate pages.

---

## 4. Design Principles

1. **Data density with clarity.** Institutional buyers want more information per screen, not less — but it must be gridded, aligned, and typographically ranked so density never reads as clutter.
2. **Evidence over adjectives.** Every claim is backed by a number, a logo, a certification mark, or a filterable data point.
3. **Quiet color, loud hierarchy.** A restrained palette (near-monochrome + one accent) with hierarchy built from type weight, size, and whitespace — not color.
4. **Real numbers, real names — or clearly marked as illustrative.** Because this is a live financial marketplace, any placeholder data in the shipped product must be labeled "Illustrative" until real deal flow exists, to avoid misrepresenting a market.
5. **Symmetry and grid discipline.** 12-column grid, consistent 8px spacing scale, no ad-hoc alignment. This is what makes a page "feel" institutional versus startup-y.
6. **Security is a first-class visual element**, not a footer badge — SOC 2, encryption, NDA/watermarking, audit trail are surfaced in the hero fold, not buried.
7. **Every listing has a next action.** Nothing is inert. A row in the table always resolves to "View data room," "Submit a bid," or "Submit an offer."

---

## 5. Visual Identity

### 5.1 Color System

Institutional finance palette — deep navy/ink base, a single restrained accent, and a strict semantic system for buy/sell/pricing states.

| Token | Hex | Usage |
|---|---|---|
| `ink-950` | `#0A0E17` | Primary text, nav bar, footer background |
| `ink-800` | `#131A2A` | Secondary dark surface (hero background) |
| `ink-600` | `#2B3550` | Borders on dark, muted dark text |
| `paper-0` | `#FFFFFF` | Primary page background |
| `paper-50` | `#F7F8FA` | Section alternation, table zebra |
| `paper-100` | `#EEF0F4` | Card backgrounds, table header |
| `line-200` | `#DEE2E9` | Hairline borders, table dividers |
| `slate-500` | `#5B6478` | Secondary/muted text |
| `slate-700` | `#333B4F` | Body text on light |
| `accent-600` | `#0F5FDC` | Primary CTA, links, active states (institutional blue, not "startup" blue-purple) |
| `accent-700` | `#0B49AC` | CTA hover/pressed |
| `gold-600` | `#8A6D1D` | Reserved for "Featured mandate" / premium tag only — used sparingly |
| `positive-600` | `#0E7A4E` | Bid above ask / price improvement / open status |
| `negative-600` | `#B3261E` | Below-ask flag / closing soon / withdrawn |
| `focus-ring` | `#0F5FDC` @ 40% | Keyboard focus outline |

Rule: no more than one saturated accent color visible in a single viewport besides semantic green/red in the data table.

### 5.2 Typography

- **Display / headings:** A high-contrast serif or grotesk with editorial gravity — e.g., *Söhne* or *Publico* class faces. Fallback stack: `"Publico Headline", "Georgia", serif` for the wordmark/hero numerals, or a confident grotesk (`"Söhne", "Inter", sans-serif`) if an all-sans system is preferred for engineering simplicity. Pick one and apply system-wide; do not mix serif headlines with a second display sans.
- **UI / body / data:** `"Inter", "IBM Plex Sans", -apple-system, sans-serif` — chosen for excellent tabular figures and legibility at small sizes.
- **Tabular data (prices, NAV, dates):** always `font-variant-numeric: tabular-nums`, monospace-adjacent alignment so columns of numbers line up like a real terminal.
- **Type scale (px / line-height):** 12/16 (labels, table cells), 14/20 (body small, table primary), 16/24 (body), 20/28 (card titles), 28/34 (section subheads), 40/46 (section heads), 56/60 (hero headline, desktop only, tighten tracking -0.02em).
- **Case:** Section eyebrows in small caps / uppercase with `letter-spacing: 0.08em` (e.g., "LIVE MARKETPLACE"). Never uppercase full sentences.

### 5.3 Grid, Spacing, Elevation

- 12-column grid, 1280px max content width, 24px gutters, 96px section vertical rhythm on desktop (56px mobile).
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Elevation is nearly flat: 1px hairline borders (`line-200`) instead of heavy drop shadows. One subtle shadow token (`0 1px 2px rgba(10,14,23,0.06), 0 8px 24px rgba(10,14,23,0.04)`) for modals and the sticky filter bar only.
- Corner radius: 6px for inputs/buttons, 10px for cards, 0–2px for the data table (tables should feel engineered, not "soft").

### 5.4 Iconography & Imagery

- Icons: single-weight line icons (1.5px stroke), never filled/emoji-style. Used for asset-class tags (fund, direct company, real assets) and security badges.
- No stock photography of people. Where imagery is used at all: abstract data-plot line art, skyline silhouettes, or subtle grid/topography textures at low opacity — always secondary to type and numbers.
- Logos: sell-side and buy-side "trusted by" logo strips in single-color (grayscale/ink) treatment, not full color, to keep the page from feeling like an ad.

### 5.5 Motion

- Micro-interactions only: 120–180ms ease-out for hover/focus states, 200ms for modal/drawer entry (slide + fade, 8px translate).
- Live-market elements (ticker, "last updated" timestamp, new-listing badge) may use a subtle pulse (2s ease-in-out, opacity 1→0.6→1) to signal liveness without being distracting.
- No parallax, no scroll-jacking, no bouncy easing anywhere — reads as un-serious for this audience.

---

## 6. Landing Page Architecture

Section-by-section spec, in order. Each section states its job and its content.

### 6.1 Top Utility Bar (40px, `ink-950`)
Small print: "Institutional access only · SOC 2 Type II · Member FINRA-registered broker-dealer network" + region/currency selector + Sign in link. Sets the compliance tone before the nav even loads.

### 6.2 Primary Navigation (72px, sticky, `paper-0` with `line-200` bottom border)
Logo (wordmark, no icon-only mark — institutional brands spell out their name) · Marketplace · How It Works · Sell a Stake · Security · Insights · **[Sign In]** (text) **[Request Access]** (primary button, `accent-600`).

### 6.3 Hero (`ink-950` background, full-bleed, ~640px desktop height)
- Eyebrow: "THE INSTITUTIONAL SECONDARIES EXCHANGE"
- Headline (serif/display, white, 56px): "Where private market secondaries are priced, matched, and closed."
- Subhead (slate-300, 18–20px, max 640px): "Verified institutional buyers and sellers transact LP interests, GP-led continuation vehicles, and direct company stakes — with full audit trail, from indication of interest to close."
- Primary CTAs: **[Browse the Marketplace →]** (accent-600 filled), **[List a Stake]** (outline, white)
- Live stat strip beneath headline, 4 columns, tabular numerals, thin dividers:
  - `$18.4B` Aggregate NAV listed
  - `312` Active mandates
  - `1,140` Verified institutional members
  - `9.2 days` Median time to first bid
  - Footnote: "Illustrative figures — updates live once trading begins." *(mandatory honesty caveat, see §9)*
- Subtle background: faint line-chart / data-grid motif at 6–8% opacity, no photography.

### 6.4 Trust Bar
Single row beneath hero on white: grayscale logo lockups under label "Counterparties on the network include" — pension funds, insurers, sovereign allocators, GP sponsors (placeholder/illustrative logos, clearly marked, until real counterparties are signed and cleared for display).

### 6.5 Live Marketplace (core section — the "institutional database")
This is the section that must feel like a Bloomberg/Preqin screen. Full spec in **Section 7**.

### 6.6 How It Works — Two Tracks
Segmented control at top: **For Sellers** / **For Buyers**. Each shows a 4-step horizontal process with numbered ink circles and one-line descriptions:

*Sellers:* 1. Confidential intake & valuation benchmark → 2. Listing goes to vetted buyer pool (NDA-gated) → 3. Bids collected & compared side-by-side → 4. Negotiate, execute transfer, closing support.

*Buyers:* 1. Get verified (accreditation + KYC) → 2. Filter live supply by mandate criteria → 3. Request data room access → 4. Submit bid, negotiate, close with counsel support.

### 6.7 Featured Opportunities (curated cards, 3–4 up)
For the highest-quality or largest mandates, promote from table rows into full cards: fund/company name, one-line thesis, key metrics (NAV, vintage, sector, discount to NAV), and a **[View Opportunity]** + **[Submit a Bid]** button pair. Reinforces that this isn't only a flat table — there's editorial curation, like a real capital-markets desk.

### 6.8 Security, Compliance & Data Integrity
Three/four-column icon+text block: **Bank-grade encryption** (data room documents, at rest & in transit) · **Verified counterparties** (KYC/AML + accreditation on every member) · **Immutable audit trail** (every bid, view, and NDA timestamped) · **Watermarked data rooms** (leak-traceable diligence documents). This section exists specifically to satisfy the General Counsel reader named in §3.

### 6.9 Insights / Market Commentary strip
Three most recent research notes or pricing commentary (e.g., "Q2 Secondary Pricing Survey: Buyout funds averaging 91% of NAV") — reinforces the platform as a market-data authority, not just a listing board, à la Preqin/PitchBook editorial content.

### 6.10 Closing CTA band (`ink-950`, centered)
Headline: "Bring your next secondary to the venue built for institutions." Two buttons: **[Request Buyer Access]**, **[Talk to Our Origination Team]**.

### 6.11 Footer
Dense, institutional footer: Company / Marketplace / Resources / Legal columns, regulatory disclosures (broker-dealer registration, jurisdictions served, risk disclosure language), SOC 2 and ISO badges, LinkedIn only (no consumer social icons).

---

## 7. Component Spec — The Marketplace Table (core deliverable)

This is the single most important component on the page. It must read as a **real trading/database screen**, not a marketing table.

### 7.1 Structure
- **Segmented toggle** above the table: `Fund / LP Interests` | `Direct Company Stakes` | `Real Assets` — changes the column set contextually.
- **Sticky filter/search bar** (appears on scroll) with: text search, Asset Class, Sector/Industry, Geography, Vintage Year range, NAV size range, Price (% of NAV) range, Status (Open / Under Offer / Closing Soon), and a "Save Filter" affordance for logged-in institutional users.
- **Sort** on any numeric column header (click to sort asc/desc, arrow indicator).
- **Row density toggle**: Comfortable / Compact — analysts will want compact.

### 7.2 Columns — Fund / LP Interests view
| Column | Example | Notes |
|---|---|---|
| Fund / Mandate | "Meridian Capital Partners VII, L.P." | Primary text, medium weight; fund manager name as secondary line below in `slate-500` |
| Asset Class | Buyout / Venture / Credit / Real Estate / Infrastructure | Pill tag, single color per class (used consistently, not semantically red/green) |
| Vintage | 2017 | Tabular numeral |
| Sector Focus | Healthcare & Life Sciences | Truncate with tooltip |
| Geography | North America | Flag-free, text + optional small region icon |
| NAV (Reported) | $84.2M | Right-aligned, tabular-nums |
| Unfunded Commitment | $12.6M | Right-aligned |
| Ask (% of NAV) | 93% | Right-aligned, this is the headline pricing figure |
| Indicative Bid Range | 88–92% | Right-aligned, muted, updates as bids come in |
| Status | ● Open for bids | Dot + label; `positive-600` open, amber "Closing soon," `slate-500` "Under offer" |
| Action | **[Submit a Bid]** | Primary button, compact size, right-most column, sticky on horizontal scroll |

### 7.3 Columns — Direct Company Stakes view (swap-in when toggled)
Company Name · Round/Security Type (e.g., "Series D Preferred") · Sector · Last Primary Round Valuation · Offer Price (implied valuation or $/share) · Stake Size ($ or % of cap table) · Status · **[Submit an Offer]**.

### 7.4 Row interaction
- Row click (anywhere except the action button) opens a **right-side detail drawer** (480px, slides in) with: full mandate description, GP track record snapshot, key terms (transfer restrictions, ROFR status, expected close timeline), document checklist for the data room, and the same **Submit a Bid/Offer** button repeated at the bottom of the drawer.
- Action button always independently clickable without triggering the drawer (stop propagation) — buyers scanning fast should be able to bid without a detour.

### 7.5 Bid/Offer button states
- Default: `accent-600` filled, label "Submit a Bid" (funds) or "Submit an Offer" (direct).
- If user is not verified/signed in: button still visible (never hidden — visibility sells the marketplace's liquidity) but click opens a **"Verify to Bid"** gate modal explaining the accreditation/KYC step, rather than a silent redirect.
- If listing status = "Closed" or "Withdrawn": button becomes disabled ghost state, label "Bidding Closed", row de-emphasized (60% opacity text, no hover state).
- Hover: `accent-700`, 1px inset focus ring on keyboard focus for accessibility.

### 7.6 Empty / loading / illustrative states
- Skeleton loading rows (shimmer) — never a spinner over a blank table for a data product.
- Empty filter result: "No mandates match these filters" + **[Clear filters]**, not a dead end.
- Because there is no live deal flow yet, every seeded row in the shipped product must carry a small `Illustrative` tag in the row or table caption ("Sample data for demonstration — live listings coming soon") so the marketplace is never mistaken for real, tradeable inventory before the business is actually operating.

---

## 8. Bid / Offer Submission Flow

Triggered from table row, detail drawer, or featured card. A focused 3-step modal (not a full page redirect — keeps the buyer inside the marketplace context):

1. **Bid terms** — Bid price (% of NAV or $/share), size (full or partial stake), financing contingency (Yes/No), indicative close date.
2. **Diligence acknowledgement** — Confirms NDA already on file (or triggers e-sign if not), acknowledges data room watermarking/audit-trail terms.
3. **Review & submit** — Summary card mirroring the row's key data + entered bid, **[Submit Bid]** primary action, secondary "Save as draft."
4. **Confirmation state** — "Bid submitted to [Seller/Manager] · Reference #SM-04821 · You'll be notified when the seller responds" + timeline stub (Submitted → Under Review → Countered/Accepted).

This flow itself should feel like executing a real order ticket — reinforcing institutional seriousness at the exact moment of commitment.

---

## 9. Content Integrity Rule (important)

Because this is a financial marketplace, the landing page must never present fabricated pricing/company data as if it were real live inventory. Design requirement:
- Any non-real listings, logos, or stats ship labeled **"Illustrative"** / **"Sample data"** in a persistent, legible way (table caption + individual row tag), not a buried disclaimer.
- Only once real institutional counterparties and deal flow exist should those labels be removed.

---

## 10. Responsive Behavior

- **Desktop (≥1280px):** Full 12-column marketplace table, sticky filter bar, side drawer for row detail.
- **Tablet (768–1279px):** Table becomes horizontally scrollable within a bordered frame (frozen first column = Fund/Company name); filters collapse into a "Filters" button opening a bottom sheet.
- **Mobile (<768px):** Marketplace renders as a stacked card list (one listing per card, same data hierarchy: name → tags → NAV/price → status → button) instead of a table — tables never work on mobile for this much data. Hero stat strip becomes a horizontally swipeable row.

---

## 11. Accessibility

- WCAG 2.1 AA minimum: 4.5:1 text contrast on all body text, 3:1 for large type/UI components.
- All status indicators (Open/Closing/Closed) are conveyed by icon + text label, never color alone (colorblind-safe).
- Full keyboard operability of the marketplace table: tab into rows, enter/space to open drawer, dedicated tab stop on the bid/offer button.
- Visible focus rings (`focus-ring` token) on every interactive element, including custom filter controls.
- Numeric inputs in the bid modal use proper `inputmode="decimal"` and are screen-reader labeled with currency/unit context ("Bid price, percent of net asset value").

---

## 12. Success Metrics for the Design

- Time-to-first-filter-interaction on the marketplace table (target < 8s from page load for returning buyers).
- % of hero visitors who scroll to/interact with the marketplace section (target > 55%).
- Bid/offer modal completion rate once opened (target > 70%) — a drop-off here signals the flow reads as too "salesy" or too long relative to the trust established upstream.
- Qualitative: in user testing with actual CIOs/GCs, the unprompted comparison should be to Bloomberg/Preqin/Carta — not to a generic marketplace template.

---

## Appendix — Reference Deliverable

A static HTML/CSS prototype implementing this brief (hero, live marketplace table with the two asset-class views, featured opportunity cards, and a working bid/offer modal) is provided at `prototype/index.html` for visual reference. All data shown there is illustrative sample data per §9.
