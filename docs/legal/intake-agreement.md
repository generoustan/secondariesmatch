> ## ⚠ CONFIDENTIAL DRAFT — FOR OUTSIDE COUNSEL REVIEW ONLY. NOT FOR EXECUTION.
>
> This document is an AI-generated first draft, prepared to give qualified outside counsel a
> running start — it is **not** a substitute for legal advice and has **not** been reviewed or
> approved by a licensed attorney. It has not been evaluated against the securities, broker-dealer,
> data-privacy, or other laws of any jurisdiction. **Do not send this to, discuss this with, or
> execute this with any counterparty** until securities and data-privacy counsel licensed in the
> applicable jurisdiction(s) has reviewed and revised it. Bracketed items (`[ ]`) mark points
> requiring counsel's or the business's decision before use.
>
> This is the S0 gate from [`docs/category-strategy.md`](../category-strategy.md) §2.4: *"One real
> counterparty has signed it. No portfolio document is ingested before this exists."* Signing an
> unreviewed AI draft would not satisfy that gate — it would defeat its entire purpose.

---

# PORTFOLIO RECORD AND DATA SERVICES AGREEMENT

This Portfolio Record and Data Services Agreement (this "**Agreement**") is entered into as of
[Effective Date] (the "**Effective Date**"), by and between SecondariesMatch, Inc., a [Delaware]
corporation with its principal place of business at [Address] ("**Company**"), and [Client Legal
Name], a [entity type] organized under the laws of [jurisdiction] with its principal place of
business at [Address] ("**Client**"). Company and Client are each a "**Party**" and together the
"**Parties**."

## Recitals

**WHEREAS**, Client holds one or more limited partnership interests, fund interests, or other
illiquid private-market positions (each, a "**Fund Interest**") described in Client's internal
books and records, including capital account statements, portfolio schedules, limited partnership
agreements, and related materials (collectively, "**Client Materials**");

**WHEREAS**, Company operates a technology platform designed to maintain an institutional-grade
digital record of private-market positions (the "**Position Ledger**") and to provide analytics
with respect to such positions, including transferability status, indicative market pricing
evidence, and standing demand from verified institutional counterparties (collectively, the
"**Services**");

**WHEREAS**, as of the Effective Date, Client is not marketing, offering, or soliciting the sale of
any Fund Interest through Company, and this Agreement does not constitute an engagement of Company
as a broker, dealer, placement agent, or investment adviser with respect to any transaction;

**WHEREAS**, Client desires to submit Client Materials to Company for the purpose of establishing
and maintaining a Position Ledger record with respect to Client's Fund Interests, and Company
desires to provide the Services, in each case subject to the terms and conditions of this
Agreement;

**NOW, THEREFORE**, in consideration of the mutual covenants set forth herein, and for other good
and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the
Parties agree as follows:

---

## 1. Definitions

**1.1 "Aggregated Data"** means data derived from Client Materials or Position Ledger records that
has been de-identified and combined with data from at least [nine (9)] other clients or
counterparties such that it does not identify, and could not reasonably be used to identify,
Client, any Fund Interest, or any underlying position, consistent with the aggregation and
suppression thresholds described in Section 7.

**1.2 "Client Materials"** — as defined in the Recitals, including any update, supplement, or
replacement provided by Client.

**1.3 "Confidential Information"** means all non-public information disclosed by one Party to the
other in connection with this Agreement, including Client Materials, Position Ledger records
derived therefrom, and the terms of this Agreement, but excluding information that (a) is or
becomes publicly available through no breach of this Agreement, (b) was rightfully known to the
receiving Party without restriction prior to disclosure, (c) is rightfully received from a third
party without breach of any confidentiality obligation, or (d) is independently developed without
use of or reference to the disclosing Party's Confidential Information.

**1.4 "Position Ledger"** — as defined in the Recitals.

**1.5 "Position Record"** means the structured record maintained by Company in the Position Ledger
with respect to a given Fund Interest, including the data fields described in Exhibit A.

**1.6 "Services"** — as defined in the Recitals.

**1.7 "Transaction Agreement"** means a separate written agreement, entered into by the Parties (or
by Client and a counterparty introduced through Company's marketplace, as applicable), governing
the marketing, offer, or sale of a Fund Interest. No Transaction Agreement exists as of the
Effective Date, and nothing in this Agreement obligates either Party to enter into one.

---

## 2. Scope of Services; No Brokerage or Advisory Services

**2.1 Services.** Subject to the terms of this Agreement, Company will (a) accept Client Materials
submitted by Client; (b) extract and normalize data from Client Materials into Position Records,
with each data field linked to its source document, page, and passage of origin; (c) apply the
confirmation procedure described in Section 3.3; and (d) make the resulting Position Records,
together with related analytics described in Exhibit A, available to Client through Company's
platform.

**2.2 No Solicitation; No Live Deal.** Client is not, by entering into this Agreement, offering,
marketing, or soliciting the purchase or sale of any Fund Interest, and Company is not undertaking
to find a buyer or seller for any Fund Interest. No Fund Interest will be listed, marketed, or
offered for sale through Company's marketplace unless and until the Parties (or Client and a
prospective counterparty) enter into a separate Transaction Agreement.

**2.3 No Broker-Dealer or Investment Advisory Services.** The Services consist solely of data
processing, record-keeping, and analytics with respect to Client's existing holdings. Company is
not acting, and this Agreement does not appoint Company to act, as a broker, dealer, placement
agent, investment adviser, or fiduciary of any kind with respect to Client or any Fund Interest.
Nothing in this Agreement, and no analytics, pricing evidence, or demand indication provided as
part of the Services, constitutes a recommendation, solicitation, offer, or investment advice.
*[Counsel note: confirm this characterization is sufficient to avoid registration requirements in
each jurisdiction where the Services will be offered, and whether any state or foreign law
nonetheless requires licensure for data/analytics services of this kind.]*

**2.4 No Fee for Record Services.** During the term of this Agreement, and unless otherwise agreed
in writing, Company will not charge Client any fee for the Services described in this Section 2.
*[Business/counsel note: confirm pilot/design-partner fee treatment; a future subscription fee for
ongoing record services is contemplated by the business plan (`docs/category-strategy.md` §2.4,
S8) but is not charged under this Agreement.]*

---

## 3. Submission of Client Materials; Representations

**3.1 Submission.** Client may submit Client Materials to Company from time to time through the
means designated by Company. Client controls the scope and timing of any submission and may
decline to submit any document or category of document.

**3.2 Client Representations.** Client represents and warrants that: (a) Client has all necessary
right, power, and authority to submit the Client Materials to Company and to authorize Company's
use of the Client Materials as contemplated by this Agreement; (b) such submission and use does
not, to Client's knowledge, breach any confidentiality, non-disclosure, or similar obligation owed
by Client to any general partner, fund manager, or other third party, including under any limited
partnership agreement, side letter, or subscription agreement applicable to a Fund Interest, except
to the extent such obligation permits disclosure to a service provider engaged by Client for
portfolio administration, reporting, or analytics purposes, in which capacity Company is engaged
hereunder; and (c) the Client Materials are, to Client's knowledge, true and accurate copies of the
documents they purport to be. *[Counsel note: consider whether representation (b) should instead
require Client to obtain any necessary GP/manager consent before submission, depending on the
confidentiality provisions typically found in the LPAs of Client's target fund population; consider
an indemnity keyed to breach of this representation — see Section 12.]*

**3.3 Confirmation; Named Reviewer.** No data field extracted from Client Materials will be
displayed to Client, used in any analytics, or included in a Position Record marked "confirmed"
unless and until it has been reviewed by a named individual and linked to its source document,
page, and passage of origin. Unconfirmed fields will be clearly marked as such. *(This is a
contractual commitment to the same rule the platform code enforces structurally — see
`platform/src/ledger/positionLedger.ts`, which cannot record a confirmation without a citation
already present.)*

**3.4 Accuracy; No Warranty of Extraction.** Company will use commercially reasonable efforts,
including human review, to accurately extract and normalize data from Client Materials. Client
acknowledges that automated extraction may contain errors and agrees to review confirmed Position
Records for accuracy and to promptly notify Company of any discrepancy.

---

## 4. Confidentiality

**4.1 Obligations.** Each Party will (a) hold the other Party's Confidential Information in
confidence using at least the same degree of care it uses to protect its own confidential
information of similar importance, and in no event less than a reasonable degree of care; (b) not
disclose the other Party's Confidential Information to any third party except as permitted by this
Agreement or required by law; and (c) use the other Party's Confidential Information solely to
perform its obligations and exercise its rights under this Agreement.

**4.2 Permitted Disclosures.** A Party may disclose the other Party's Confidential Information to
its employees, officers, directors, and professional advisors who have a need to know such
information for purposes of this Agreement and who are bound by confidentiality obligations at
least as protective as those set forth herein, and as required by applicable law, regulation, or
valid legal process, provided that, where legally permissible, the disclosing Party gives the other
Party prompt notice of such requirement.

**4.3 Compelled Disclosure.** *[Counsel to insert the firm's standard compelled-disclosure
notice-and-cooperation provision.]*

---

## 5. Security Standards

**5.1** Company will maintain administrative, technical, and physical safeguards designed to
protect the confidentiality, integrity, and availability of Client Materials and Position Records,
including encryption of Client Materials at rest and in transit, role- and deal-scoped access
controls, and a tamper-evident audit record of access to and modification of Position Records.

**5.2** Company will notify Client without undue delay following its discovery of any unauthorized
access to or acquisition of Client Materials or Position Records that compromises their
confidentiality or integrity, and will reasonably cooperate with Client's investigation of any such
incident.

**5.3** *[Counsel note: confirm whether SOC 2 Type II certification, cyber-insurance minimums, or a
specific breach-notification deadline (e.g., 72 hours) should be added as express covenants once
Company's compliance program (`docs/roadmap.md` Phase 0) is further along, and whether this
Agreement should incorporate a separate Data Processing Addendum if any Client Materials constitute
"personal data" under applicable privacy law.]*

---

## 6. Record Retention; Dormant Records; Deletion

**6.1 Dormant Record Status.** Client's Position Records may be maintained by Company on a dormant
basis — retained and periodically refreshed at Client's direction, without any associated live
listing, offer, or transaction — for so long as this Agreement remains in effect.

**6.2 Retention Following Termination.** Upon termination of this Agreement for any reason, Company
will, within [thirty (30)] days, at Client's election, either (a) return all Client Materials and
Position Records in a reasonably usable format, or (b) delete all Client Materials and Position
Records, in each case except that Company may retain (i) Aggregated Data already incorporated into
the shared benchmark corpus as of the effective date of termination, consistent with Section 7, and
(ii) copies required to be retained by applicable law, regulation, or a bona fide document-retention
policy, subject in each case to the continuing confidentiality obligations of Section 4.

**6.3 Deletion on Request.** At any time prior to termination, Client may request deletion of
specific Client Materials or Position Records not associated with an active Transaction Agreement,
and Company will complete such deletion within [thirty (30)] days, subject to the same exceptions
described in Section 6.2.

---

## 7. De-Identified Data; Aggregated Analytics License

**7.1 License Grant.** Client grants to Company a non-exclusive, perpetual, irrevocable, worldwide,
royalty-free license to use, reproduce, and create Aggregated Data from Client Materials and
Position Records, and to use, publish, and license such Aggregated Data, including in benchmark,
pricing, and analytics products offered to third parties, provided that such Aggregated Data does
not identify, and could not reasonably be used to identify, Client, any Fund Interest, or any
underlying position. *(This is the data-rights clause `docs/technical-roadmap.md` §4 (W0) and §9
identify as a Phase 0 blocker — cheap to get right now, expensive to retrofit later.)*

**7.2 Aggregation Threshold.** Company will not publish or license Aggregated Data derived from a
data segment (however defined) unless that segment reflects underlying records from at least
[five (5)] distinct clients or counterparties, and Company will enforce this threshold in the
design of its systems rather than as a matter of policy alone. *(Implemented as a hard-coded
minimum in `platform/src/pricing/benchmark.ts`, not a configurable default.)*

**7.3 Transaction-Derived Data.** If a Fund Interest is later transacted pursuant to a Transaction
Agreement, the license and aggregation treatment of data arising from that transaction (including
realized pricing) will be governed by the applicable Transaction Agreement, which the Parties
acknowledge is expected to include a license substantially consistent with this Section 7.

**7.4 No Re-Identification.** Company will not attempt to re-identify any Aggregated Data, and will
implement re-identification testing prior to publication of any benchmark or analytics product
derived from Aggregated Data, consistent with Company's internal model-risk and data-governance
policies (`docs/technical-roadmap.md` §3).

---

## 8. Intellectual Property

**8.1 Client Materials.** As between the Parties, Client retains all right, title, and interest in
and to the Client Materials and the underlying Fund Interests.

**8.2 Position Records; Platform.** As between the Parties, Company retains all right, title, and
interest in and to the Position Ledger, the Services, Company's software, matching and analytics
methodologies, and any Aggregated Data, subject to Client's rights under Section 8.3.

**8.3 Client's Position Records.** Company grants Client a non-exclusive, royalty-free license to
access, view, and export Client's own confirmed Position Records for Client's internal business
purposes for so long as this Agreement remains in effect and, following termination, to the extent
such records are returned to Client pursuant to Section 6.2.

---

## 9. Term and Termination

**9.1 Term.** This Agreement commences on the Effective Date and continues until terminated as
provided herein.

**9.2 Termination for Convenience.** Either Party may terminate this Agreement for any reason upon
[thirty (30)] days' prior written notice to the other Party.

**9.3 Termination for Cause.** Either Party may terminate this Agreement immediately upon written
notice if the other Party materially breaches this Agreement and fails to cure such breach within
[fifteen (15)] days after written notice describing the breach.

**9.4 Survival.** Sections 1, 4, 6, 7, 8, 10, 11, 12, 13, and 15 survive termination of this
Agreement.

---

## 10. No Warranty

EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE SERVICES ARE PROVIDED "AS IS," AND COMPANY
DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ANY IMPLIED
WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WITHOUT
LIMITING THE FOREGOING, COMPANY DOES NOT WARRANT THAT ANY PRICING EVIDENCE, DEMAND INDICATION, OR
OTHER ANALYTIC OUTPUT PROVIDED AS PART OF THE SERVICES IS ACCURATE, COMPLETE, OR SUITABLE FOR ANY
PARTICULAR PURPOSE, AND ALL SUCH OUTPUT IS PROVIDED FOR INFORMATIONAL PURPOSES ONLY.

---

## 11. Limitation of Liability

EXCEPT FOR A PARTY'S INDEMNIFICATION OBLIGATIONS, BREACH OF SECTION 4 (CONFIDENTIALITY), OR A
PARTY'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, IN NO EVENT WILL EITHER PARTY BE LIABLE FOR ANY
INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, ARISING OUT
OF OR RELATING TO THIS AGREEMENT, AND EACH PARTY'S AGGREGATE LIABILITY ARISING OUT OF OR RELATING
TO THIS AGREEMENT WILL NOT EXCEED [$______]. *[Counsel note: because Section 2.4 contemplates no
fee during the pilot, a fee-based cap would be nominal — use a fixed dollar cap instead, sized to
reflect the sensitivity of the data being handled rather than the (zero) contract value.]*

---

## 12. Indemnification

Client will indemnify, defend, and hold harmless Company from and against any third-party claim,
and resulting losses, arising from (a) Client's breach of Section 3.2 (Client Representations), or
(b) Client Materials infringing or misappropriating any third party's intellectual property or
confidentiality rights, in each case except to the extent arising from Company's breach of this
Agreement.

---

## 13. Governing Law; Dispute Resolution

This Agreement is governed by the laws of the State of [Delaware / New York], without regard to
conflict-of-laws principles. *[Counsel to select forum/arbitration provision consistent with
Company's broader institutional agreements and Phase 0 broker-dealer structure once finalized.]*

---

## 14. Regulatory and Status Disclosures

**14.1** Company is not, as of the Effective Date, registered as a broker-dealer, investment
adviser, or alternative trading system with the U.S. Securities and Exchange Commission, FINRA, or
any other regulator, and does not hold itself out as such under this Agreement. *[Counsel note:
this Section must be revisited once Company's Phase 0 regulatory structure (`docs/roadmap.md` §3,
Phase 0) is finalized, and before any Transaction Agreement is offered to this or any Client.]*

**14.2** Nothing in this Agreement should be construed as legal, tax, accounting, or investment
advice, and each Party has had the opportunity to consult its own advisors.

---

## 15. Miscellaneous

**15.1 Entire Agreement.** This Agreement, including its Exhibits, constitutes the entire agreement
between the Parties with respect to its subject matter and supersedes all prior agreements and
understandings, written or oral.

**15.2 Amendment.** This Agreement may be amended only by a written instrument signed by both
Parties.

**15.3 Assignment.** Neither Party may assign this Agreement without the other Party's prior
written consent, except that Company may assign this Agreement in connection with a merger,
acquisition, or sale of substantially all of its assets, provided the assignee agrees to be bound
by this Agreement.

**15.4 Notices.** *[Counsel to insert the firm's standard notices provision.]*

**15.5 Severability.** If any provision of this Agreement is held unenforceable, the remaining
provisions will remain in full force and effect.

**15.6 No Waiver.** No failure or delay by either Party in exercising any right under this
Agreement will operate as a waiver of that right.

**15.7 Counterparts.** This Agreement may be executed in counterparts, each of which is deemed an
original, and which together constitute one instrument.

---

**IN WITNESS WHEREOF**, the Parties have executed this Agreement as of the Effective Date.

| SECONDARIESMATCH, INC. | [CLIENT LEGAL NAME] |
|---|---|
| By: _________________________ | By: _________________________ |
| Name: | Name: |
| Title: | Title: |
| Date: | Date: |

---

## Exhibit A — Position Record Data Fields

Fund/Manager identity (fund, manager, vehicle) · vintage year · strategy/asset class · geography ·
sector mix · commitment · paid-in capital · distributions · reported NAV · NAV as-of date · unfunded
commitment · currency · transferability state (permitted / consent-required / ROFR / restricted) ·
consent state · ROFR state · restriction expiry · notice period · source document, page, and passage
citation for each field · extraction confidence · confirming reviewer and confirmation date · record
status (draft / confirmed / stale / archived).

*(This exhibit mirrors the `Position` entity in `platform/src/domain/entities.ts` field-for-field —
the contract's data-scope commitment and the code's actual data model are the same document in two
forms, and should be kept in sync as either changes.)*

## Exhibit B — Description of Client Materials

Capital account statements, quarterly and annual fund reports, limited partnership agreements,
side letters, subscription agreements, and other portfolio administration documents provided by
Client from time to time, in each case relating to the Fund Interests covered by this Agreement.
