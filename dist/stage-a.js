(function () {
  'use strict';

  const panel = document.querySelector('#phase-panel');
  const nodes = Array.from(document.querySelectorAll('[data-phase]'));

  const featureCard = ({ name, badge, badgeClass, copy, sequence, checklist, component, source }) => `
    <details class="detail-card">
      <summary><span class="summary-copy"><strong>${name}</strong><span class="tag ${badgeClass}">${badge}</span></span></summary>
      <div class="detail-body">
        <p>${copy}</p>
        <div class="sequence">${sequence.map(([label, value]) => `<div><b>${label}</b><span>${value}</span></div>`).join('')}</div>
        <div class="checklist">${checklist.map((item) => `<span>${item}</span>`).join('')}</div>
        <p class="source-line"><strong>Production component:</strong> ${component}</p>
        <p class="source-line"><strong>Proof / boundary:</strong> ${source}</p>
      </div>
    </details>`;

  const views = {
    onboarding: {
      title: 'Onboarding', badge: 'Enhanced', badgeClass: 'changed', stage: 'Stage A complete',
      intro: 'The entry point remains consent-led. v1.3 adds Website Tracking as an explicit, optional setup choice; it does not silently protect or continuously inspect browsing.',
      visual: '<div class="mini-flow"><div class="mini-node"><strong>Onboarding</strong><span>Explain the boundary and ask for explicit choices.</span></div><div class="mini-node child"><strong>Website Tracking</strong><span>Optional Top Sites suggestion + explicit site selection.</span></div></div>',
      cards: [
        {
          name: 'Website Tracking', badge: 'New', badgeClass: 'new',
          copy: 'A user-facing setup choice for selecting websites to observe. The current source reads browser Top Sites as a suggestion surface, keeps the checkbox unchecked by default, and records the selected consent state locally.',
          sequence: [
            ['Trigger', 'User opens onboarding.'],
            ['Eligibility / state', 'Top Sites may be read as an optional suggestion; no automatic protection.'],
            ['UI', 'Explain purpose, show optional suggestions, and show explicit site choices.'],
            ['User action', 'Select sites and choose whether device sync is enabled.'],
            ['Write', 'Persist the chosen local onboarding state; sync consent remains an open decision.'],
            ['Next state', 'Continue only after the user makes or skips an explicit choice.'],
            ['Reset / fallback', 'Allow edit/revoke; if Top Sites is unavailable, continue with manual entry.']
          ],
          checklist: ['□ Keep Top Sites optional and unchecked by default.', '□ Make sync consent separate and visible.', '□ Never turn the setup choice into an automatic block.'],
          component: '<code>instructions.html</code> + <code>instructions.js</code> with registry/storage wiring.',
          source: '<span class="tag changed">Verified current</span> Top Sites is read locally and onboarding writes <code>topSitesTracking</code>; sync consent fallback remains an <span class="tag tentative">Open decision</span>. Browser acceptance is <span class="tag tentative">Incomplete</span>.'
        }
      ]
    },
    observer: {
      title: 'Observer', badge: 'New', badgeClass: 'new', stage: 'Stage A complete',
      intro: 'Observer is the v1.3 observation surface. Product Pulse and Rationator are shown together here for product ownership, while the Rationator card calls out its runtime dependency on the active Rationalisation hold.',
      visual: '<div class="mini-flow"><div class="mini-node"><strong>Observer</strong><span>Read the relevant local signal without taking the decision away.</span></div><div class="mini-node child"><strong>Product Pulse</strong><span>Confirmed-cart-growth branch; render and inspect the product signal.</span></div><div class="mini-node child"><strong>Rationator</strong><span>Counter-re-entry loop owned here; depends on an active hold.</span></div></div>',
      cards: [
        {
          name: 'Product Pulse', badge: 'New', badgeClass: 'new',
          copy: 'The confirmed-cart-growth observation branch. It surfaces product context around a cart or checkout signal; it is not a claim that behaviour changes or savings occur.',
          sequence: [
            ['Trigger', 'A supported product/cart signal is available.'],
            ['Eligibility / state', 'Read the current local signal and avoid duplicate rendering.'],
            ['UI', 'Render a small product-context pulse in the extension surface.'],
            ['User action', 'Inspect, dismiss, or continue with the user’s own choice.'],
            ['Write', 'Record only the bounded local event required by the feature contract.'],
            ['Next state', 'Return to the normal page state or continue to the separate decision flow.'],
            ['Reset / fallback', 'Reset on navigation/session boundary; if the DOM signal is missing, do not infer it.']
          ],
          checklist: ['□ Verify the rendered state on supported cart/checkout pages.', '□ Keep copy descriptive, not persuasive or efficacy-claiming.', '□ Fail open when the product signal is absent.'],
          component: '<code>content.js</code> + <code>content.css</code>, with <code>background.js</code> event plumbing.',
          source: '<span class="tag changed">Verified current</span> Product Pulse exists in the current extension source. Render and merchant coverage remain <span class="tag tentative">Incomplete</span> until browser QA is recorded.'
        },
        {
          name: 'Rationator', badge: 'New', badgeClass: 'new',
          copy: 'A counter-re-entry mechanism owned by Observer. It is not a fourth step after Hold: the runtime currently checks for an active Rationalisation hold before the return loop can operate.',
          sequence: [
            ['Trigger', 'The user re-enters a relevant page while a hold is active.'],
            ['Eligibility / state', 'Read the active hold and current local counter/episode state.'],
            ['UI', 'Show the return-loop prompt in the existing extension surface.'],
            ['User action', 'Review, dismiss, or continue; never force a purchase outcome.'],
            ['Write', 'Write the bounded local event/counter needed for the next return check.'],
            ['Next state', 'Stay in the hold loop or return to the normal page state.'],
            ['Reset / fallback', 'Reset at hold expiry or explicit dismissal; fail open if state is missing.']
          ],
          checklist: ['□ Keep product ownership under Observer.', '□ Document the Rationalisation hold dependency in code.', '□ Test expiry, repeat entry, and missing-state paths.'],
          component: '<code>content.js</code> + <code>content.css</code> hold-state helpers only; no independent Observer trigger.',
          source: '<span class="tag changed">Verified current</span> Rationator is present in the extension. Ownership is <span class="tag changed">Accepted</span>; its active-hold dependency is a <span class="tag changed">Verified current</span> runtime constraint.'
        }
      ]
    },
    rationalisation: {
      title: 'Rationalisation', badge: 'Enhanced', badgeClass: 'changed', stage: 'Stage B current',
      intro: 'Rationalisation owns the active checkout hold and the post-hold choice window. Rationator remains under Observer; its active-hold dependency is a runtime boundary, not a change in product ownership.',
      visual: '<div class="mini-flow"><div class="mini-node"><strong>24h hold</strong><span>First qualifying checkout attempt; ordinary browsing and add-to-cart remain available.</span></div><div class="mini-node child"><strong>Deliberation · Ajante</strong><span>Post-hold decision window with safe, explicit cart choices.</span></div><div class="mini-node child"><strong>Urgente</strong><span>Checkout-only typing challenge; unlimited use, 12h pass.</span></div><div class="locked-card"><p><strong>Ownership boundary.</strong> Rationator is displayed under Observer and may operate only while this hold is active.</p><span class="status new">Observer-owned dependency</span></div></div>',
      cards: [
        {
          name: '24-hour checkout hold', badge: 'Enhanced', badgeClass: 'changed',
          copy: 'The first qualifying checkout attempt starts a brand-scoped 24-hour hold. Ordinary browsing and add-to-cart remain available. Checkout-classification uncertainty fails open.',
          sequence: [
            ['Trigger', 'First qualifying checkout, place-order, or wallet-express signal on a protected site.'],
            ['Eligibility / state', 'Read protected-site state, brand identity, existing hold, and checkout passes.'],
            ['UI', 'Show the Rationalising Chamber countdown and a clear user-controlled route.'],
            ['User action', 'Wait, return to ordinary browsing, or choose the separate Urgente challenge.'],
            ['Write', 'Write the brand-scoped start under <code>siteBlockTimestamps</code>.'],
            ['Next state', 'Hold remains active; Rationator may re-enter only from this active state.'],
            ['Reset / fallback', 'Expiry opens Deliberation; reloads and same-brand subdomains restore state; uncertain checkout fails open.']
          ],
          checklist: ['□ Keep the fallback locked to 24 hours.', '□ Do not intercept ordinary browsing or add-to-cart.', '□ Restore by brand across reloads and same-brand subdomains.', '□ Keep QA speed-forward controls outside the exported runtime.'],
          component: '<code>content.js</code>, <code>content.css</code>, <code>cognoscene-mode.js</code>, and protected-site wiring.',
          source: '<span class="tag changed">Verified current</span> <code>BLOCK_DURATION_MS</code> defaults to 24h and hold state is brand-scoped. Static checks exist; cross-merchant browser proof is <span class="tag tentative">Incomplete</span>.'
        },
        {
          name: 'Deliberation · Ajante', badge: 'Enhanced', badgeClass: 'changed',
          copy: 'When the hold expires, a separate 24-hour decision window presents continue/buy, wait, decline, and explicit selected-item removal. Removing items is not checkout approval.',
          sequence: [
            ['Trigger', 'The 24-hour hold expires.'],
            ['Eligibility / state', 'Read brand hold age, decision-window timing, and a settled merchant cart route.'],
            ['UI', 'Show the Decision Window with continue, wait, decline, and edit-specific-items choices.'],
            ['User action', 'Continue/buy, wait, decline without mutation, or select items for verified removal.'],
            ['Write', 'Final choices write <code>decisionOutcomes</code>; verified removals write bounded removal evidence only after visible confirmation.'],
            ['Next state', 'Continue grants the normal checkout pass; wait/decline preserve agency; verified removal refreshes the window.'],
            ['Reset / fallback', 'Ambiguous or unsupported rows go to manual review; unknown cart value stays unknown; no guessed mutation.']
          ],
          checklist: ['□ Keep the decision window at 24 hours.', '□ Only explicit continue/buy grants checkout approval.', '□ Verify selected removals on the merchant cart before recording them.', '□ Do not claim savings, regret reduction, or efficacy.'],
          component: '<code>content.js</code>, <code>decision-checkout-reentry.js</code>, <code>native-cart-edit-state.js</code>, and <code>rationalisation-outcome-copy.js</code>.',
          source: '<span class="tag changed">Verified current</span> Current source separates final outcomes from partial removals and preserves unknown values. Static validation is present; merchant/browser matrix evidence is <span class="tag tentative">Incomplete</span>.'
        },
        {
          name: 'Urgente', badge: 'Enhanced', badgeClass: 'changed',
          copy: 'Urgente is a deliberate typing-challenge alternative at checkout. It is unlimited to use, but each successful completion grants a separate 12-hour, brand-scoped checkout-only pass; it is not a global bypass.',
          sequence: [
            ['Trigger', 'The user chooses Urgente from an active checkout hold.'],
            ['Eligibility / state', 'Read the active hold, brand identity, and existing checkout-only pass.'],
            ['UI', 'Show the current typing challenge with a back route to the hold.'],
            ['User action', 'Type the displayed text and submit, or leave the challenge.'],
            ['Write', 'Persist <code>cognosceneUrgenteCheckoutPassesV1</code> before removing the active hold; usage may be counted without a cap.'],
            ['Next state', 'Checkout is available for 12 hours on that brand; Observer and Product Pulse remain eligible.'],
            ['Reset / fallback', 'Pass expires or Reverso clears it; if persistence fails, keep only the current session and state that limitation.']
          ],
          checklist: ['□ Keep Urgente unlimited, with no punitive streak.', '□ Scope the pass to checkout and the current brand.', '□ Persist before removing the hold.', '□ Never expose QA fast-forward or test controls in the exported component.'],
          component: '<code>content.js</code> Urgente challenge/pass helpers plus existing checkout state wiring.',
          source: '<span class="tag changed">Verified current</span> The runtime uses a 12-hour brand-scoped checkout pass and keeps Urgente separate from Observer bypass state. Static proof is available; live merchant proof is <span class="tag tentative">Incomplete</span>.'
        }
      ]
    },
    growth: {
      title: 'Growth', badge: 'Tentative', badgeClass: 'tentative', stage: 'Future / owner decision',
      intro: 'Growth is intentionally greyed out while Cogno decides its scope. Python is included here as a shadow-only analysis path; it has no live UI, eligibility, blocking, or decision authority.',
      visual: '<div class="locked-card"><p><strong>Placeholder.</strong> No Growth checklist, download, or completion state is available in Stage B.</p><span class="status tentative">Tentative / owner decision pending</span></div>', cards: []
    }
  };

  function render(phase) {
    const view = views[phase] || views.onboarding;
    nodes.forEach((node) => {
      const selected = node.dataset.phase === phase;
      node.classList.toggle('active', selected);
      node.setAttribute('aria-current', selected ? 'step' : 'false');
    });
    const cards = view.cards.length ? `<div class="details-stack">${view.cards.map(featureCard).join('')}</div>` : '';
    const next = phase === 'onboarding' ? 'observer' : phase === 'observer' ? 'rationalisation' : null;
    const previous = phase === 'observer' ? 'onboarding' : phase === 'rationalisation' ? 'observer' : null;
    const nextLabel = next === 'observer' ? 'Next: Observer →' : next === 'rationalisation' ? 'Next: Rationalisation →' : 'Next phase is tentative';
    panel.innerHTML = `<div class="phase-top"><div><p class="eyebrow">Current slice</p><h2>${view.title} <span class="tag ${view.badgeClass}">${view.badge}</span></h2><p>${view.intro}</p></div><span class="phase-mark status ${view.badgeClass}">${view.stage}</span></div><div class="phase-grid"><div class="visual-card"><h3>At-a-glance</h3>${view.visual}</div><div>${cards || '<div class="locked-card"><p>This phase is intentionally quiet. Use the flow to return to an active implementation slice.</p></div>'}</div></div><div class="phase-actions"><button type="button" data-go="${previous || ''}" ${previous ? '' : 'disabled'}>← Back</button><button type="button" data-go="${next || ''}" ${next ? '' : 'disabled'}>${next ? nextLabel : 'Next phase is tentative'}</button></div>`;
    panel.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => button.dataset.go && go(button.dataset.go)));
  }

  function go(phase) {
    if (window.location.hash !== '#' + phase) window.location.hash = phase;
    render(phase);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  nodes.forEach((node) => node.addEventListener('click', () => go(node.dataset.phase)));
  window.addEventListener('hashchange', () => render(window.location.hash.slice(1) || 'onboarding'));
  render(window.location.hash.slice(1) || 'onboarding');
})();
