# Handover index

## Required reading order

1. [Repository entrypoint](README.md)
2. [Current status](docs/current/STATUS.md)
3. [Current reconciliation](docs/current/CURRENT_RECONCILIATION.md)
4. [Proof ledger](docs/current/proof-ledger.md)
5. The feature packet or implementation request in scope

## Status authority

| Artifact | Purpose | Audience |
| --- | --- | --- |
| `docs/current/STATUS.md` | Human-readable current handover state | Private repo users |
| `docs/current/UPDATE_LOG.md` | Durable founder-update history | Private repo users |
| `data/internal-feature-status.json` | Full structured status record | TerraLite and authorised collaborators |
| `data/public-feature-status.json` | Safe derived status for the public website | Public handover site and Mobile review |
| `docs/current/CURRENT_RECONCILIATION.md` | Live-source evidence boundary | All implementers |

## Status labels

| Label | Meaning |
| --- | --- |
| `founder-confirmed` | Founder decision recorded; source proof may still be pending |
| `verified current` | Rechecked against current canonical source |
| `completed` | The stated handover acceptance checks passed |
| `planned` | Approved work not yet started |
| `tentative` | Scope intentionally remains open |
| `incomplete` | Known gap, missing proof or unfinished work |
| `blocked` | Cannot proceed without a decision or external evidence |
| `historical` | Retained context; not current implementation guidance |

## Update rule

Every founder update is added to the internal log. TerraLite decides whether the update also changes the public status summary, then rechecks current extension source before presenting runtime behaviour as verified. A public website update is published only after the corresponding status/source change is committed.
