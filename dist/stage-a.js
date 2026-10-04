(function () {
  'use strict';

  const panel = document.querySelector('#phase-panel');
  const nodes = Array.from(document.querySelectorAll('[data-phase]'));

  const featureCard = ({ name, badge, badgeClass, copy, sequence, source, checklist }) => `
    <details class="detail-card">
      <summary><span class="summary-copy"><strong>${name}</strong><span class="tag ${badgeClass}">${badge}</span></span></summary>
      <div class="detail-body">
        <p>${copy}</p>
        <div class="sequence">${sequence.map(([label, value]) => `<div><b>${label}</b><span>${value}</span></div>`).join('')}</div>
        <div class="checklist">${checklist.map((item) => `<span>${item}</span>`).join('')}</div>
        <p class="source-line"><strong>Proof / boundary:</strong> ${source}</p>
      </div>
    </details>`;

  const views = {
    onboarding: {
      title: 'Onboarding', badge: 'Enhanced', badgeClass: 'changed',
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
          source: '<span class="tag changed">Verified current</span> <code>instructions.js</code> reads Top Sites and writes <code>topSitesTracking</code>; current sync fallback is true, so the consent contract is <span class="tag tentative">Open decision</span>. Local-data boundary and no auto-protection are <span class="tag changed">Planned</span>.'
        }
      ]
    },
    observer: {
      title: 'Observer', badge: 'New', badgeClass: 'new',
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
          source: '<span class="tag changed">Verified current</span> Rationator is present in the extension. Ownership is <span class="tag changed">Accepted</span>; its active-hold dependency is a <span class="tag changed">Verified current</span> runtime constraint.'
        }
      ]
    },
    rationalisation: {
      title: 'Rationalisation', badge: 'Later', badgeClass: 'locked',
      intro: 'This phase is visible so the sequence is understandable, but it is not part of Stage A. Its detailed handover and downloads remain locked until the Onboarding and Observer slices are reviewed.',
      visual: '<div class="locked-card"><p><strong>Static preview only.</strong> Hold, Deliberation, and Urgente remain in the next implementation batch. Rationator’s runtime dependency is documented under Observer.</p><span class="status locked">No Stage A edits here</span></div>', cards: []
    },
    growth: {
      title: 'Growth', badge: 'Tentative', badgeClass: 'tentative',
      intro: 'Growth is intentionally greyed out while Cogno decides its scope. Python is included here as a shadow-only analysis path; it has no live UI, eligibility, blocking, or decision authority.',
      visual: '<div class="locked-card"><p><strong>Placeholder.</strong> No Growth checklist, download, or completion state is available in Stage A.</p><span class="status tentative">Tentative / owner decision pending</span></div>', cards: []
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
    const next = phase === 'onboarding' ? 'observer' : null;
    const previous = phase === 'observer' ? 'onboarding' : null;
    panel.innerHTML = `<div class="phase-top"><div><p class="eyebrow">Current slice</p><h2>${view.title} <span class="tag ${view.badgeClass}">${view.badge}</span></h2><p>${view.intro}</p></div><span class="phase-mark status ${view.badgeClass}">Stage A</span></div><div class="phase-grid"><div class="visual-card"><h3>At-a-glance</h3>${view.visual}</div><div>${cards || '<div class="locked-card"><p>This phase is intentionally quiet in Stage A. Use the flow to return to the active slice.</p></div>'}</div></div><div class="phase-actions"><button type="button" data-go="${previous || ''}" ${previous ? '' : 'disabled'}>← Back</button><button type="button" data-go="${next || ''}" ${next ? '' : 'disabled'}>${next ? 'Next: Observer →' : 'Next phase is locked'}</button></div>`;
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
