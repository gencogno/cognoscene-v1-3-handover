# Handover index

## Required reading order

1. [Repository entrypoint](README.md)
2. [Source inventory](docs/current/SOURCE_INVENTORY.md)
3. [Current status](docs/current/STATUS.md)
4. [Current reconciliation](docs/current/CURRENT_RECONCILIATION.md)
5. [Proof ledger](docs/current/proof-ledger.md)
5. The feature packet or implementation request in scope

## Status authority

| Artifact | Purpose | Audience |
| --- | --- | --- |
| `docs/current/STATUS.md` | Human-readable current handover state | Private repo users |
| `docs/current/UPDATE_LOG.md` | Durable founder-update history | Private repo users |
| `data/internal-feature-status.json` | Full structured status record | TerraLite and authorised collaborators |
| `data/public-feature-status.json` | Safe derived status for the public website | Public handover site and Mobile review |
| `docs/current/CURRENT_RECONCILIATION.md` | Live-source evidence boundary | All implementers |

## Feature state

Every feature has one workflow state. It answers: where is this handover work now?

| State | Meaning |
| --- | --- |
| `planned` | Approved work not yet started |
| `in progress` | Active handover work is underway |
| `completed` | The stated handover acceptance checks passed |
| `tentative` | Scope intentionally remains open |
| `blocked` | Cannot proceed without a decision or external evidence |
| `historical` | Retained context; not current implementation work |

## Proof label

Every material claim also has a separate proof label. It answers: what supports this statement?

| Label | Meaning |
| --- | --- |
| `founder-confirmed` | Founder decision recorded; source proof may still be pending |
| `verified current` | Rechecked against current canonical source |
| `planned` | Approved work not yet started |
| `tentative` | Scope intentionally remains open |
| `incomplete` | Known gap, missing proof or unfinished work |
| `historical` | Retained context; not current implementation guidance |

## Update rule

Every founder update is added to the internal log. TerraLite decides whether the update also changes the public status summary, then rechecks current extension source before presenting runtime behaviour as verified. A public website update is published only after the corresponding status/source change is committed.

## Coupled website and GitHub rule

For every website batch, TerraLite must update and commit, in the same GitHub batch:

1. the changed `dist/` website source;
2. `data/public-feature-status.json` when a public status changes;
3. `data/internal-feature-status.json` and `docs/current/STATUS.md` when the private state changes;
4. `docs/current/CURRENT_RECONCILIATION.md` when the batch makes or changes a claim about live extension behaviour; and
5. `docs/current/UPDATE_LOG.md` with the founder decision, outcome and resulting publish revision.

Then TerraLite publishes the existing Sites host and records the deployment result. Do not perform site-only edits, and do not leave GitHub documentation ahead of or behind the published website without marking that divergence explicitly.
