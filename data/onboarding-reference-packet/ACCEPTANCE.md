# Acceptance checks

Run these against the extension after any onboarding extraction or refinement.

1. Start: “get started” opens site setup; “skip for now” completes onboarding as skipped without forcing a site choice.
2. Manual path: an invalid site is rejected; a valid manually added site appears as selected.
3. Guard: continuing from site setup with no selected site is blocked with a clear recovery message.
4. Optional discovery: Top Sites are not read or shown until the person opts in.
5. Consent: a suggested site requires the same explicit add/protect action as a manually entered site.
6. Fallback: disabling or failing optional discovery leaves manual entry usable.
7. Completion: complete onboarding writes the selected-site and onboarding state; restarting is available from the setup bar.
8. Privacy: no claim that local suggestions automatically protect a site; no unsupported efficacy, savings, or regret claims.

Browser proof is still required. Static inspection alone does not prove Chrome permissions, storage writes, or toolbar behaviour.
