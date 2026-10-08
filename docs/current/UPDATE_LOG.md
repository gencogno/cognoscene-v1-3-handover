# Founder update log

This log records durable founder decisions and requested changes. It is private. A log entry is not, by itself, implementation or browser proof.

## Entry template

```text
Date/time (SGT):
Feature:
Founder update:
Requested website effect:
Requested implementation effect:
Evidence supplied:
Needs live-source reconciliation: yes/no
TerraLite outcome:
Public-status effect:
```

## 8 October 2026 — control-plane decision

- **Feature:** Daniella handover / ChatGPT Mobile access
- **Founder update:** GitHub is primarily the private access path for ChatGPT Mobile. The existing Sites host remains the public handover website.
- **Requested website effect:** Add a safe public status view later; avoid a second GitHub Pages deployment.
- **Requested implementation effect:** TerraLite maintains the status record, edits the site, commits GitHub and publishes the existing host.
- **Needs live-source reconciliation:** yes, before any runtime state is labelled verified current.
- **TerraLite outcome:** control-plane files created; public-site wiring remains planned.
- **Public-status effect:** none yet.

## 8 October 2026 — coupled handover rule

- **Feature:** Website and GitHub handover workflow
- **Founder update:** Every website update must update the GitHub handover in the same work batch so ChatGPT Mobile has matching context.
- **Requested website effect:** The public site remains on the existing Sites host; no GitHub Pages migration.
- **Requested implementation effect:** TerraLite commits website source, status records, reconciliation evidence and the update log before publishing the corresponding Sites version.
- **Needs live-source reconciliation:** yes, whenever the update makes a live extension claim.
- **TerraLite outcome:** Coupled-update rule recorded in the repository entrypoint and index.
- **Public-status effect:** none yet.
