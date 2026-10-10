# Cognoscene onboarding reference packet

Status: incomplete reference packet, prepared for Daniella's implementation review.

This packet maps the current v1.3 onboarding runtime. It is deliberately not a drop-in production component: `instructions.html` and `instructions.js` are coupled to Chrome extension storage, messaging, and the full onboarding document.

## Included boundaries

- Manual protected-site entry is the baseline path.
- Chrome Top Sites suggestions are optional, local, and require an explicit opt-in.
- A suggested site does not become protected without an explicit add action.
- The user may skip onboarding; the current code writes an explicit skipped state.
- The current next action requires at least one selected site.

## Current runtime source references

- `instructions.html` — five-screen onboarding document and UI controls.
- `instructions.js` — selected-site state, consent settings, Chrome storage writes, and page transitions.
- `shopping-site-registry.js` — recognised-shopping-site filtering boundary for optional suggestions.

Do not copy preview, demo, mockup, test, or QA-only assets into a production component without a separate audit.
