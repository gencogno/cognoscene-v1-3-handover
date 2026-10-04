# Daniella Handover Site Archive

Status: archived from the public site on 2026-10-04; retained for exact restoration.

## Snapshot identity

- Site: Cognoscene · Daniella Handover
- Public URL: https://cognoscene-daniella-handover.cognoscene.chatgpt.site
- Sites project ID: `appgprj_6abf2fc6de8c8191b8b6fea876d8b9f0`
- Published snapshot: version 12
- Source commit: `3571f07043d8062becf2dce034a7fe4682dc611a`
- Exact source files: `dist/index.html` and `dist/handover.js` at that commit
- `dist/index.html` SHA-256: `9EFC44E508A3EB9BF78D075108F578713EF89938F3C183A62DA5659A2ABEF3F7`
- `dist/handover.js` SHA-256: `354DE93894189B8998EA8D74C71F0A72C1276DA833F4EE439195E43D13C836CF`

The original full HTML (including inline CSS) and JavaScript remain in Git history at the source commit above and in the Sites version 12 publication. The hashes identify the exact files. This archive register is outside `dist/`, so the source record is not a public page or downloadable site asset.

## Archived public sections, in original order

1. **Production challenges** (`section[aria-labelledby="challenges-title"]`): expandable `Improve onboarding` and `Improve UI` challenge cards, their source/proof notes, and the unresolved other-challenge placeholder.
2. **Shopper journey** (`section[aria-labelledby="journey-title"]`): legend, before/after comparison, flow shapes, node expansions, plain-text fallbacks, historical gap, removed-feature note, tentative Growth note, and all feature chains.
3. **Selected-feature detail panel** (`section#feature-details`): this follows the journey in the original document and depends on selecting a `data-feature` node. It is archived with the journey, including its generated combined Markdown handoff download.
4. **Shared ownership boundaries** (`details.shared-boundaries`): this was between the feature panel and Visual showcase and remains public; its original content is not part of the archive.
5. **Visual showcase** (`section[aria-labelledby="showcase-title"]`): `Current popup` and `Onboarding` video placeholders.
6. **Brand tokens** (`section[aria-labelledby="brand-title"]`): Paper `#F5F0E8`, Surface `#EBE4D4`, Lime `#C8E88A`, Text `#111111`, Dark `#2D2D2A`, Mid `#4A4F47`, Muted `#8A8A84`, Line `#DDD5C0`, Active `#3B6D11`.

The retained page order is header, release label and title, shared ownership boundaries, and the “Friction, not restriction. The user keeps the decision.” footer.

## Shopper journey structure

### Before · Beta 1.2

- Start: first use.
- Onboarding: six-screen historical preview — welcome; static protected-site preview; 48-hour hold and 24-hour decision-window preview; sample-savings preview; monthly Urgente preview; finish and open popup.
- Protected-site setup: read list; user adds/removes a site; write Chrome sync storage; matching protected domain enters checkout check.
- Checkout interception: protected-site checkout attempt; read site/hold state; write hold and show overlay if absent; historical “Bypass Test” or leave checkout; otherwise 48-hour hold.
- Decision window: after hold, “Buy now” or “Drop it” in a 24-hour window; buy removes the site hold for the session; drop confirms before a cart-clear attempt; expiry starts a new hold at the next checkout check.
- End: buy, drop, or return to hold. Historical source-gap note and a plain-text fallback were included.

### After · Cognoscene v1.3 target, grounded in current v2 source

- Start: first use.
- Onboarding · enhanced: five screens; explicit protected-site choice; optional Top Sites suggestions; completion or safe skip; popup-open fallback.
- Protected-site shopping · enhanced: only user-selected protected domains are eligible; suggestions remain separate.
- Observer + Product Pulse · new: paired browsing-check-in and confirmed cart-growth branch.
- Rationalisation · enhanced: qualifying protected-brand checkout begins a 24-hour hold.
- In-hold branches: Rationator is an optional return loop into the same active hold; Urgente is a separate unlimited-use, brand-scoped checkout-pass branch, shown as a 12-hour pass with founder confirmation noted in the handoff.
- Deliberation · enhanced: after the hold, a separate 24-hour choice window; explicit user choice; no automatic purchase or cart edit; normal checkout-pass duration flagged for founder sign-off.
- Growth: grey, tentative, outside the active flow and not an available component.
- End: the user keeps the decision. A removed-feature note and plain-text fallback were included.

### Feature keys and detail-panel mapping

The selected-node panel was synchronized with these keys: `challenge-onboarding`, `challenge-ui`, `onboarding`, `protected-sites`, `observer-product-pulse`, `rationalisation`, `rationator`, `urgente`, `deliberation`, and `removed`. Each packet supplied its plain-English explanation; design brief; component/source note; owner and boundaries; suggested tests; checklist; Cognoscenti acceptance criteria; fail-open rule; rollback rule; and Claude prompt focus. The `removed` note had no runtime download.

Panel fields appeared in this order: Feature design; Component download; Claude prompt; Daniella checklist; Cognoscenti; Proof and boundaries. The single node download was a generated Markdown brief, not extension runtime code.

## Interaction and visual inventory

- Before and after flow nodes used native disclosure controls; selecting one after-node closed other feature nodes and synchronized the selected-feature panel. Closing the selected node hid the panel.
- “Click to reveal” / “Click to hide” was the flow-node sidebrow. The Cognoscenti gold-standard legend disclosure used “Click to know.”
- New, enhanced, removed, retained, and Cognoscenti states had green, blue, orange, grey, and gold treatments. Flowchart shapes distinguished start/end, action/UI, eligibility/decision, and stored state. The page also included a plain-text flow fallback.
- Completed checklists stored locally under `cognoscene-v1-3-daniella-checklist-v1`; complete nodes became grey and briefly animated. A per-node reset control cleared that node's checklist.
- The v12 JavaScript contains no audio playback implementation. Preserve this fact when restoring; do not imply a reveal sound shipped in the archived site.
- The Brand tokens swatches and the Visual showcase video slots were visible content, not feature interactions.

## Restoration rule

When Cogno asks to restore any archived item, inspect this register and retrieve the exact archived file from the source commit using `git show 3571f07043d8062becf2dce034a7fe4682dc611a:dist/index.html` or `git show 3571f07043d8062becf2dce034a7fe4682dc611a:dist/handover.js`. Reintroduce only the requested section and its required dependencies. Preserve archived wording, order, node relationships, field mapping, colors, storage key and interactions exactly unless Cogno explicitly asks for changes. Do not reset the whole site to the archived commit, because that would remove later work.
