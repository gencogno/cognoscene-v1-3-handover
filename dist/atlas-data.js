/* Public-safe Atlas content. Reconcile runtime claims before changing it. */
(function () {
  'use strict';

  window.CognosceneAtlasData = {
    schemaVersion: 3,
    releaseLabel: 'v1.3',
    sourceOfTruth: 'dist/public-feature-status.json',
    flows: {
      onboarding: {
        label: 'onboarding challenge', proofLabel: 'verified current',
        nodes: [
          { id: 'challenge', label: 'understand the boundary', note: 'chosen and reversible', status: 'enhanced' },
          { id: 'discovery', label: 'choose how to add sites', note: 'manual or local suggestions', status: 'enhanced' },
          { id: 'protect', label: 'explicitly protect a site', note: 'nothing activates itself', status: 'enhanced', kind: 'decision' },
          { id: 'browse', label: 'selected-site browsing', note: 'scope stays editable', status: 'enhanced' }
        ], edges: [['challenge', 'discovery'], ['discovery', 'protect'], ['protect', 'browse']],
        dependency: 'manual entry remains available if optional discovery is unavailable.'
      },
      observer: {
        label: 'observer', proofLabel: 'planned',
        nodes: [
          { id: 'observe', label: 'observer', note: 'local browsing signal', status: 'new' },
          { id: 'pulse', label: 'product pulse', note: 'cart-growth branch', status: 'new' },
          { id: 'return', label: 'return to browsing', note: 'no checkout hold', status: 'enhanced' },
          { id: 'rationator', label: 'rationator', note: 'counter re-entry', status: 'new' }
        ], edges: [['observe', 'pulse'], ['pulse', 'return'], ['rationator', 'observe']],
        dependency: 'rationator is observer-owned but requires an active rationalisation hold.'
      },
      rationalisation: {
        label: 'rationalisation', proofLabel: 'planned',
        nodes: [
          { id: 'checkout', label: 'qualifying checkout?', note: 'uncertain signals fail open', status: 'enhanced', kind: 'decision' },
          { id: 'hold', label: '24-hour hold', note: 'ordinary browsing remains open', status: 'enhanced' },
          { id: 'deliberation', label: 'deliberation', note: 'user decides', status: 'enhanced' },
          { id: 'urgente', label: 'urgente', note: 'unlimited typing challenge', status: 'enhanced' },
          { id: 'pass', label: '12-hour checkout pass', note: 'brand-scoped only', status: 'enhanced' }
        ], edges: [['checkout', 'hold'], ['hold', 'deliberation'], ['hold', 'urgente'], ['urgente', 'pass']],
        dependency: 'a pass is checkout-only, brand-scoped and expires after 12 hours.'
      },
      growth: {
        label: 'growth', proofLabel: 'tentative',
        nodes: [
          { id: 'history', label: 'factual decision history', note: 'bounded outcomes only', status: 'tentative' },
          { id: 'python', label: 'python', note: 'shadow-only', status: 'tentative' },
          { id: 'vision', label: 'vision', note: 'dom-failure fallback', status: 'tentative' }
        ], edges: [['history', 'python'], ['vision', 'history']],
        dependency: 'no live model authority and no inferred financial or behavioural outcome.'
      }
    },
    comparison: {
      onboarding: {
        proofLabel: 'verified current',
        beta12: {
          label: 'beta 1.2',
          proof: 'historical',
          nodes: [
            { id: 'b-start', label: 'start or skip', note: 'two entry choices', kind: 'decision' },
            { id: 'b-boundary', label: 'site-boundary explainer', note: 'illustrative list; no selection in setup' },
            { id: 'b-hold', label: '48-hour hold explainer', note: 'checkout pause model' },
            { id: 'b-savings', label: 'savings explainer', note: 'historical claim surface' },
            { id: 'b-urgente', label: 'monthly urgente explainer', note: 'one-per-month model' },
            { id: 'b-done', label: 'complete', note: 'onboarding flag written' }
          ],
          edges: [['b-start', 'b-boundary'], ['b-boundary', 'b-hold'], ['b-hold', 'b-savings'], ['b-savings', 'b-urgente'], ['b-urgente', 'b-done']],
          branches: [{ from: 'b-start', label: 'skip', target: 'b-done' }]
        },
        v13: {
          label: 'v1.3 current',
          proof: 'verified current',
          nodes: [
            { id: 'v-start', label: 'start or skip', note: 'setup remains optional', kind: 'decision', status: 'enhanced' },
            { id: 'v-sites', label: 'add protected sites', note: 'one site required to continue', status: 'enhanced' },
            { id: 'v-discover', label: 'optional local suggestions', note: 'Chrome Top Sites; opt-in only', kind: 'decision', status: 'new' },
            { id: 'v-protect', label: 'explicitly protect sites', note: 'nothing activates automatically', status: 'enhanced' },
            { id: 'v-hold', label: '24-hour hold explainer', note: 'cart remains with the shop', status: 'enhanced' },
            { id: 'v-record', label: 'evidence-bounded record', note: 'amount only with complete evidence', status: 'enhanced' },
            { id: 'v-consent', label: 'consent and done', note: 'sync control; completion written', status: 'enhanced' }
          ],
          edges: [['v-start', 'v-sites'], ['v-sites', 'v-discover'], ['v-discover', 'v-protect'], ['v-protect', 'v-hold'], ['v-hold', 'v-record'], ['v-record', 'v-consent']],
          branches: [
            { from: 'v-start', label: 'skip', target: 'v-consent' },
            { from: 'v-discover', label: 'no / unavailable', target: 'v-protect', fallback: true }
          ]
        },
        delta: 'enhanced: v1.3 turns the historical onboarding explainer into explicit site selection, opt-in local suggestions, and a 24-hour setup sequence. Historical savings and monthly Urgente walkthroughs are no longer onboarding steps.',
        changes: ['enhanced', 'new', 'removed']
      },
      observer: { proofLabel: 'historical', beforeFlow: ['browsing', 'no distinct observer layer'], afterFlow: ['observer', 'product pulse', 'rationator return'], delta: 'new: observer becomes a named browsing-time layer. enhanced: product pulse and rationator have explicit ownership boundaries.', changes: ['new', 'enhanced'] },
      rationalisation: { proofLabel: 'historical', beforeFlow: ['48-hour hold', 'monthly urgente bypass'], afterFlow: ['24-hour hold', 'deliberation', 'unlimited urgente challenge'], delta: 'enhanced: a qualifying checkout uses a 24-hour hold; urgente is unlimited and grants a separate 12-hour brand-scoped checkout pass.', changes: ['enhanced'] },
      growth: { proofLabel: 'tentative', beforeFlow: ['historical analytics surfaces'], afterFlow: ['bounded decision history', 'shadow-only python', 'vision fallback'], delta: 'removed/tentative: no active growth packet. python remains shadow-only and vision remains a dom-failure fallback.', changes: ['removed', 'tentative'] }
    },
    buildPlaceholders: {
      onboarding: 'the onboarding component packet will define challenge copy, consent boundaries, protected-site selection and fallback manual entry in batch 4a.',
      observer: 'the observer component packet will define product pulse, rationator and their explicit runtime boundary in batch 4b.',
      rationalisation: 'the rationalisation component packet will define checkout classification, hold, deliberation and urgente in batch 4c.',
      growth: 'growth is intentionally tentative. no active component packet is available until founder scope is unlocked.'
    },
    downloads: {
      onboarding: {
        file: 'downloads/onboarding/onboarding-reference-packet.zip',
        label: 'download onboarding reference packet',
        status: 'incomplete',
        contents: ['source boundary and dependency map', 'acceptance checks', 'Claude implementation brief', 'reference-only extraction notes'],
        note: 'This is a reference packet, not a production component extractor. The current onboarding runtime remains coupled to its extension context; demo and QA-only assets are excluded.'
      }
    }
  };
})();
