# Cognoscene v1.3 handover

This private repository is the versioned handover and evidence record for Cognoscene v1.3. It is designed for Daniella, TerraLite, and ChatGPT Mobile.

It is **not** the canonical extension repository. The live extension remains at:

`D:\TeraBox\cognoscene\beta versions\cognoscene, b v1.2, v2\v2`

## Start here

1. Read [HANDOVER_INDEX.md](HANDOVER_INDEX.md).
2. Read [current status](docs/current/STATUS.md) and the [current reconciliation](docs/current/CURRENT_RECONCILIATION.md).
3. Read the relevant feature packet only after the reconciliation.

## Authority and proof

- Current extension code is runtime evidence; it overrides older documents where they conflict.
- The PRD governs intended product direction.
- A founder update is recorded as `founder-confirmed`; it is not automatically proof that code shipped.
- TerraLite promotes a claim to `verified current` only after source reconciliation.
- The public site receives a safe, derived status summary only. Internal paths, detailed risks and source evidence remain private here.

## Roles

| Role | Responsibility |
| --- | --- |
| Cogno | Product decisions and founder updates |
| TerraLite | Reconciliation, handover/site edits, commits and publishing |
| ChatGPT Mobile | Read, analyse, review and relay structured change requests |
| Daniella | Extension implementation, tests and commits after access is granted |

## Boundaries

- Do not treat this repo as proof of the latest desktop extension without checking the reconciliation record.
- Do not expose secrets, credentials, personal data, browser histories, raw Supabase data or QA/test controls.
- Component packets must exclude QA toggles, fast-forward paths, fixtures, WIP mockups, `node_modules`, reports and debug helpers.
- Python remains shadow-only; Vision remains a DOM-failure fallback with no live UX authority.

## Public website

The public handover website remains hosted through the existing Sites deployment. GitHub Pages is not used. GitHub carries the private record for ChatGPT Mobile; TerraLite publishes website changes to the existing host after the relevant change is committed and checked.
