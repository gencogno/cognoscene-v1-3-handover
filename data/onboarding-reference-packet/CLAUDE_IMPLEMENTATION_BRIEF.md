# Claude implementation brief

You are refining Cognoscene's v1.3 onboarding, a Chrome-extension setup flow. Work only inside the verified onboarding boundary unless a dependency audit proves another file is required.

First inspect the current canonical runtime files:

- `instructions.html`
- `instructions.js`
- `shopping-site-registry.js`

Preserve these non-negotiables:

- friction, not restriction; the person retains the decision;
- manual protected-site entry always works without optional discovery;
- Top Sites suggestions are local, opt-in, filtered, and never automatically activated;
- protection requires an explicit user action;
- skip remains available and does not trap the user;
- do not make savings, regret-reduction, behavioural-efficacy, clinical, or financial claims;
- do not promote Python beyond shadow-only or Vision beyond DOM-failure fallback.

Before changing code, state: affected files, storage/event contracts, fallback behaviour, and browser checks. After changing it, run the acceptance checks in `ACCEPTANCE.md` and report what remains unproven in Chrome.
