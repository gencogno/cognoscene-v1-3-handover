# ChatGPT Mobile runbook

## Purpose

Use the private GitHub handover repository as the durable context source when Mobile cannot access the desktop extension folder.

## Setup

1. Connect GitHub in ChatGPT Mobile using the `gencogno` account.
2. Grant the ChatGPT GitHub app access to `gencogno/cognoscene-v1-3-handover`.
3. Confirm the repository appears before asking for feature analysis.
4. Start every task by reading the required files in the order below.

## Required reading order

1. `README.md`
2. `HANDOVER_INDEX.md`
3. `docs/current/STATUS.md`
4. `docs/current/CURRENT_RECONCILIATION.md`
5. The requested feature packet or website file

## Mobile rules

- Use repository-relative paths only; Mobile does not have access to the canonical desktop path.
- Quote the proof label beside every material claim.
- Treat `founder-confirmed` as product direction, not runtime proof.
- Do not claim a test, browser check, deployment, merchant path, source diff or current manifest was run unless the repository evidence explicitly says so.
- Do not claim the ability to commit, push or publish. Draft a precise request for TerraLite instead.
- Do not expose internal paths, credentials, personal data or private evidence in public-site copy.

## Founder update intake

When Cogno supplies a new decision, restate it in the structured update format from `MOBILE_PROMPT.md`. TerraLite records it, reconciles source when needed, commits the update and publishes the current host if the public website must change.
