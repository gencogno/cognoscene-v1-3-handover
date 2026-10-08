# Current reconciliation

**Reconciled:** 8 October 2026, SGT
**Scope:** GitHub handover-control-plane setup only
**Proof labels:** `verified current`, `planned`, `historical`, `incomplete`, `unknown`

| Field | Current record |
| --- | --- |
| Product release label | Cognoscene v1.3 — founder-confirmed product label |
| Canonical extension path | `D:\TeraBox\cognoscene\beta versions\cognoscene, b v1.2, v2\v2` |
| Manifest version | `1.4.112` — verified current from `manifest.json` |
| Canonical Git state | `unknown` — the canonical folder has no `.git` metadata; Git status/diff cannot be established |
| Handover repository | `gencogno/cognoscene-v1-3-handover` — private |
| Handover source commit before this batch | `7559fd7` (`Build Batch 2 Journey Atlas`) |
| Public handover host | Existing Sites host; GitHub Pages is not used |
| Tests in this batch | None run; this is documentation/control-plane work only |
| Browser/merchant proof in this batch | None; no runtime, merchant or live-service claim is created here |

## Evidence limits

- The GitHub repository initially contains the static handover-site source and archive, not a canonical copy of the extension.
- Earlier v1.3 documents may contain manifest version `1.4.103` or older. Treat those version-specific statements as historical unless refreshed here.
- A founder update can set product direction immediately, but cannot establish that a runtime path, test result or deployment is complete.
- No extension code, manifest version, Supabase schema, deployment configuration or public-site UI is changed by this control-plane setup.

## Change since previous handover snapshot

This repository now has a private status-control-plane structure for Mobile-readable handover state. The public website is not yet wired to read `data/public-feature-status.json`; that wiring is a later website batch.
