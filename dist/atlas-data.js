/* Public-safe Atlas 2.5 content. Runtime claims must be reconciled before edits. */
(function () {
  'use strict';

  window.CognosceneAtlasData = {
    schemaVersion: 1,
    releaseLabel: 'v1.3',
    sourceOfTruth: 'dist/public-feature-status.json',
    nodes: [
      { id: 'onboarding', phaseId: 'onboarding', label: 'Onboarding', kind: 'start', status: 'enhanced' },
      { id: 'protected-sites', phaseId: 'onboarding', label: 'Protected sites', kind: 'process', status: 'enhanced' },
      { id: 'browse', phaseId: 'onboarding', label: 'Selected-site browsing', kind: 'process', status: 'enhanced' },
      { id: 'observer', phaseId: 'observer', label: 'Observer', kind: 'process', status: 'new' },
      { id: 'product-pulse', phaseId: 'observer', label: 'Product Pulse', kind: 'process', status: 'new' },
      { id: 'rationator', phaseId: 'observer', label: 'Rationator', kind: 'process', status: 'new' },
      { id: 'qualifying-checkout', phaseId: 'rationalisation', label: 'Qualifying checkout?', kind: 'decision', status: 'enhanced' },
      { id: 'hold', phaseId: 'rationalisation', label: '24-hour hold', kind: 'state', status: 'enhanced' },
      { id: 'deliberation', phaseId: 'rationalisation', label: 'Deliberation', kind: 'process', status: 'enhanced' },
      { id: 'urgente', phaseId: 'rationalisation', label: 'Urgente', kind: 'process', status: 'enhanced' },
      { id: 'growth', phaseId: 'growth', label: 'Growth', kind: 'process', status: 'tentative' }
    ],
    comparison: {
      onboarding: {
        proofLabel: 'historical',
        before: 'Beta 1.2 used a protected-site list and optional Top Sites tracking.',
        after: 'v1.3 frames setup as consent-led Website Tracking and explicit protected-site selection.',
        changes: ['enhanced']
      },
      observer: {
        proofLabel: 'historical',
        before: 'Beta 1.2 did not expose Observer as a distinct product layer.',
        after: 'v1.3 gives Observer ownership of Product Pulse and Rationator.',
        changes: ['new', 'enhanced']
      },
      rationalisation: {
        proofLabel: 'historical',
        before: 'Beta 1.2 defaulted to a 48-hour hold and limited Urgente to once each month.',
        after: 'Current source defaults to a 24-hour hold; Urgente is an unlimited challenge with a 12-hour brand-scoped checkout pass.',
        changes: ['enhanced']
      },
      growth: {
        proofLabel: 'tentative',
        before: 'Older analytics surfaces are historical context only.',
        after: 'Growth remains tentative; Python is shadow-only and Vision is a future DOM-failure fallback.',
        changes: ['removed', 'tentative']
      }
    }
  };
})();
