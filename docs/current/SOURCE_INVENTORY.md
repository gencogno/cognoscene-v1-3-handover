# Source inventory

This repository is a private handover and evidence record. It is not the canonical Cognoscene extension repository.

## Included

| Path | Content | Purpose |
| --- | --- | --- |
| `dist/` | Static public handover-site source | Existing Sites-hosted developer-facing website |
| `archive/` | Archived-section restoration register | Preserve exact retired website structure without republishing it |
| `docs/current/` | Reconciliation, status, update and proof records | Current Mobile-readable handover state |
| `docs/mobile/` | ChatGPT Mobile reading and update instructions | Prevent false desktop-access or deployment claims |
| `data/` | Internal and safe public status records | One shared status model for GitHub and the future site panel |
| `.openai/hosting.json` | Existing Sites-hosting metadata | Identifies the established hosting project; do not alter without explicit approval |

## Deliberately excluded

| Excluded material | Reason |
| --- | --- |
| Canonical extension runtime source | It remains authoritative only in the live TeraBox workspace until an explicit source-control migration |
| Full `node_modules`, reports and browser artefacts | Not handover material and would create stale, heavy copies |
| QA/test controls, fast-forward paths and internal triggers | Must not become downloadable production dependencies |
| Guided-demo WIP, mockups and Copy Lab material | Not part of production component exports |
| Credentials, service keys, browser data, personal data and raw telemetry | Private/sensitive and outside the handover need |
| Supabase migrations or deployment configuration | No schema or deployment change is authorised by this handover work |

## Evidence-only snapshots

`docs/current/manifest.snapshot.json` is an evidence copy made on 8 October 2026. It proves only the recorded manifest state at that time. It is not a deployable extension manifest and does not replace a fresh read of the canonical source.

## Addition rule

Before adding a file, classify it as one of: public website source, private handover evidence, production-only component packet, or archived provenance. Do not add a file merely because it is convenient for debugging or testing. Every component packet must document its runtime source, dependencies, exclusions, proof label and rollback/fail-open rule.
