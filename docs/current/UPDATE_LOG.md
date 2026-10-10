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

## 8 October 2026 — Atlas 2.5 phase contract

- **Feature:** Journey Atlas replacement
- **Founder update:** Build a sequential, phase-led Atlas with compact Beta 1.2 comparison rather than two large flowcharts.
- **Requested website effect:** Show the current phase, retain completed-phase reference, lock future phases, and reveal the next phase through motion after a reviewed status advance.
- **Requested implementation effect:** Public status data supplies the phase state; browser interactions cannot promote project progress.
- **Needs live-source reconciliation:** yes, before revising any runtime statement or historical comparison.
- **TerraLite outcome:** Public and private phase records, a safe hosted-data mirror, and a validator are staged. SVG rendering remains the next batch.
- **Public-status effect:** none yet; the current visual Atlas is unchanged.

## 10 October 2026 — Atlas 2.5 renderer and reveal

- **Feature:** Journey Atlas replacement
- **Founder update:** Execute the remaining Atlas 2.5 batches as one run.
- **Requested website effect:** Replace the grid of feature cards with a phase-led flowchart; show locked future work and a compact Beta 1.2 comparison for the open phase.
- **TerraLite outcome:** Staged a custom SVG/HTML map, status-driven phase rail, keyboard-accessible available nodes, locked future nodes, reduced-motion treatment, and a compact historical comparison panel. The public mirror is validated by the phase-contract script.
- **Evidence limit:** JavaScript syntax, JSON parsing, mirror equality and whitespace checks passed. The browser sandbox blocks local-file navigation, so desktop/mobile visual proof and public deployment remain incomplete.
- **Public-status effect:** none until visual review and deployment are completed.

## 10 October 2026 — Atlas 2.5 deployed

- **Feature:** Journey Atlas replacement
- **TerraLite outcome:** Deployed the saved Atlas 2.5 source revision through the existing Sites host after the local archive helper failed. The source-only hosted fallback completed successfully.
- **Desktop evidence:** Connected Chrome rendered the deployed HTTPS page with Onboarding as the current phase; Observer, Rationalisation and Growth locked; the SVG map; and the Beta 1.2/v1.3 comparison panel.
- **Evidence limit:** Mobile viewport proof and a future phase-unlock transition remain unverified because the current reviewed status keeps Onboarding active.
- **Public-status effect:** Atlas 2.5 is live.

## 10 October 2026 — Batch 2.75A brand foundation

- **Feature:** Journey Atlas visual foundation
- **Founder update:** Apply Cognoscene’s locked brand ethos across the handover before further Atlas restructuring.
- **TerraLite outcome:** Replaced the generic palette with the canonical cream, surface, lime, ink, muted and active tokens; loaded Be Vietnam Pro; and applied all-lowercase presentation. Semantic green, blue and grey Atlas states remain distinct.
- **Evidence limit:** This batch changes the handover presentation only. It does not change any extension runtime, phase progression rule or live-product claim.
- **Public-status effect:** Pending source publication and browser validation.

## 10 October 2026 — Batches 2.75B–H compact Atlas

- **Feature:** Journey Atlas compact flow and phase drawer
- **Founder update:** Replace the large permanent chart with a phase-led compact spine. Onboarding is framed as an onboarding challenge; future phases remain accessible for preview but cannot be promoted from the browser.
- **TerraLite outcome:** Added the compact phase spine, expandable drawer, per-phase SVG flow, deterministic SVG text wrapping, flow/changes/build tabs, Beta 1.2/v1.3 mini-flow comparisons, explicit delta copy, preview-only future-phase navigation, return-to-current control, touch/press feedback and reduced-motion treatment.
- **Evidence:** Local browser validation confirmed the compact spine, opening/closing the onboarding drawer, the challenge framing, changes tab, Observer preview-only state and return-to-current path. JavaScript syntax, JSON parsing, mirror synchronization and whitespace checks passed.
- **Evidence limit:** This is website evidence only. The onboarding challenge wording is a **planned founder direction**; canonical source currently proves explicit selection and optional local Top Sites suggestions, not the final challenge framing. The compact Atlas was also rendered at 390px mobile width; extension-runtime browser proof remains incomplete.
- **Reconciliation risk:** Canonical `manifest.json` is `1.4.114`; adjacent `package.json` remains `1.4.112`; canonical provenance is unknown because no `.git` metadata is mounted.
- **Public-status effect:** Published as Sites version 19 from GitHub revision `c46d236`; public URL and challenge drawer were browser-validated after deployment.

## 10 October 2026 — Atlas 2.75 v3 onboarding comparison

- **Feature:** Journey Atlas onboarding flow
- **Founder update:** Replace the mixed historic/current map with two separate Beta 1.2 and v1.3 flowcharts; use green for new or enhanced v1.3 states; reintroduce one complete download per relevant current node.
- **TerraLite outcome:** Reconciled both diagrams to the historical Beta 1.2 and current canonical onboarding sources. The public UI now renders independently scannable vertical flows, clean optional/fallback branches, touch/keyboard feedback, a selected-node detail shelf, and a single downloadable onboarding reference packet. The packet is explicitly documentation/reference-only; it does not misrepresent the coupled current runtime as a standalone production component.
- **Evidence:** Canonical manifest is `1.4.117`; JavaScript syntax, ZIP manifest listing, public-status mirror and whitespace checks passed.
- **Evidence limit:** Public browser validation and deployment are pending. The challenge framing remains a founder-directed handover framing; it is not an additional runtime behaviour. No extension test, Chrome storage write, toolbar behaviour, merchant path or live-service behaviour was re-proven in this batch.
- **Public-status effect:** Published as Sites version 22 from source commit `a6c1b53`. Live HTTPS validation confirmed the separate flows, v1.3 node shelf, packet link, and no browser-console warnings or errors. The bare URL may briefly serve a cached earlier revision; the cache-busted URL served this version during validation.
