# secondariesmatch

The institutional exchange for private-market secondaries — matching verified buyers and sellers
of LP fund interests, GP-led continuation vehicles, direct company stakes, and real assets, with
full audit trail from indication of interest to close.

## Documentation

- [`docs/design-brief.md`](docs/design-brief.md) — landing page and marketplace design brief
  (with a reference prototype at [`prototype/index.html`](prototype/index.html))
- [`docs/roadmap.md`](docs/roadmap.md) — business roadmap: how SecondariesMatch replaces
  bulge-bracket secondaries advisors with a low-cost, high-trust, technology-native venue
- [`docs/technical-roadmap.md`](docs/technical-roadmap.md) — technical/AI roadmap: competitive
  positioning versus the Park Hill / Evercore advisory model, the product and ML workstreams that
  win that position, and the model-risk and human-in-the-loop controls they ship under. Sequenced
  against the business roadmap's Phases 0–4.
- [`.claude/agents/architect.md`](.claude/agents/architect.md) — the `architect` agent, a
  standing strategy function that keeps the roadmap current and stress-tests product/business
  decisions against it

## Platform code

- [`platform/`](platform/) — a tested reference implementation of the Phase 0/1 technical
  substrate from `docs/technical-roadmap.md`: the deal graph and event spine, mandate matching,
  pricing evidence engine, diligence checklist, clause-locked document generation, deterministic
  KYC/verification, and the entitlements + audit ledger. See `platform/README.md` for what's
  implemented, what's intentionally stubbed, and how to run the test suite (`npm test`).
