/* Public-safe Atlas content. Reconcile runtime claims before changing it. */
(function () {
  'use strict';

  window.CognosceneAtlasData = {
    schemaVersion: 2,
    releaseLabel: 'v1.3',
    sourceOfTruth: 'dist/public-feature-status.json',
    flows: {
      onboarding: {
        label: 'onboarding challenge', proofLabel: 'planned',
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
      onboarding: { proofLabel: 'planned', beforeFlow: ['protected-site list', 'optional top sites'], afterFlow: ['chosen boundary', 'manual or local discovery', 'explicit protection'], delta: 'enhanced: v1.3 connects optional discovery, explicit protection and reversible site scope into one consent-led journey. current source proves explicit selection; challenge framing remains planned.', changes: ['enhanced', 'planned'] },
      observer: { proofLabel: 'historical', beforeFlow: ['browsing', 'no distinct observer layer'], afterFlow: ['observer', 'product pulse', 'rationator return'], delta: 'new: observer becomes a named browsing-time layer. enhanced: product pulse and rationator have explicit ownership boundaries.', changes: ['new', 'enhanced'] },
      rationalisation: { proofLabel: 'historical', beforeFlow: ['48-hour hold', 'monthly urgente bypass'], afterFlow: ['24-hour hold', 'deliberation', 'unlimited urgente challenge'], delta: 'enhanced: a qualifying checkout uses a 24-hour hold; urgente is unlimited and grants a separate 12-hour brand-scoped checkout pass.', changes: ['enhanced'] },
      growth: { proofLabel: 'tentative', beforeFlow: ['historical analytics surfaces'], afterFlow: ['bounded decision history', 'shadow-only python', 'vision fallback'], delta: 'removed/tentative: no active growth packet. python remains shadow-only and vision remains a dom-failure fallback.', changes: ['removed', 'tentative'] }
    },
    buildPlaceholders: {
      onboarding: 'the onboarding component packet will define challenge copy, consent boundaries, protected-site selection and fallback manual entry in batch 4a.',
      observer: 'the observer component packet will define product pulse, rationator and their explicit runtime boundary in batch 4b.',
      rationalisation: 'the rationalisation component packet will define checkout classification, hold, deliberation and urgente in batch 4c.',
      growth: 'growth is intentionally tentative. no active component packet is available until founder scope is unlocked.'
    }
  };
})();
