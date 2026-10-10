# Current reconciliation

**Reconciled:** 10 October 2026, SGT
**Scope:** Atlas 2.75 v3 onboarding comparison and public reference packet
**Proof labels:** `verified current`, `planned`, `historical`, `incomplete`, `unknown`

| Field | Current record |
| --- | --- |
| Product release label | Cognoscene v1.3 — founder-confirmed product label |
| Canonical extension path | `D:\TeraBox\cognoscene\beta versions\cognoscene, b v1.2, v2\v2` |
| Manifest version | `1.4.117` — verified current from `manifest.json` |
| Canonical Git state | `unknown` — the canonical folder has no `.git` metadata; Git status/diff cannot be established |
| Handover repository | `gencogno/cognoscene-v1-3-handover` — private |
| Handover source commit before this batch | `7559fd7` (`Build Batch 2 Journey Atlas`) |
| Public handover host | Existing Sites host; GitHub Pages is not used |
| Tests in this batch | JavaScript syntax, ZIP manifest listing, public-status mirror, and whitespace checks; no extension test was run |
| Browser/merchant proof in this batch | Pending public browser validation; no runtime, merchant or live-service claim is created here |

## Evidence limits

- The GitHub repository initially contains the static handover-site source and archive, not a canonical copy of the extension.
- Earlier v1.3 documents may contain manifest version `1.4.103` or older. Treat those version-specific statements as historical unless refreshed here.
- A founder update can set product direction immediately, but cannot establish that a runtime path, test result or deployment is complete.
- No extension code, manifest version, Supabase schema, or deployment configuration is changed by this website-only batch.

## Change since previous handover snapshot

The public Atlas now reads the safe status mirror and shows two independent onboarding diagrams: historical Beta 1.2 and verified-current v1.3. The v1.3 diagram includes explicit protected-site selection, opt-in local Top Sites suggestions, a 24-hour hold explainer, evidence-bounded record, and consent/done state. The separate downloadable onboarding packet is intentionally reference-only because current onboarding source has not yet been cleanly extracted into a standalone production component.
