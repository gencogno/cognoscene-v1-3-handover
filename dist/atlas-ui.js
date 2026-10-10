(function () {
  'use strict';

  const spine = document.querySelector('#phase-spine');
  const drawer = document.querySelector('#phase-drawer');
  const summary = document.querySelector('#phase-summary');
  const revision = document.querySelector('#revision');
  const openFlow = document.querySelector('#open-flow');
  const spineHint = document.querySelector('#spine-hint');
  const atlas = window.CognosceneAtlasData;
  let status; let selected; let drawerOpen = false; let tab = 'challenge'; let pressTimer;

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const lower = (value) => String(value).toLowerCase();

  async function load() {
    try {
      const response = await fetch('public-feature-status.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('status unavailable');
      return await response.json();
    } catch {
      return { revisionLabel: 'local atlas fallback', atlas: { currentPhaseId: 'onboarding', phases: [
        { id: 'onboarding', state: 'current', name: 'onboarding' },
        { id: 'observer', state: 'locked', name: 'observer' },
        { id: 'rationalisation', state: 'locked', name: 'rationalisation' },
        { id: 'growth', state: 'tentative', name: 'growth' }
      ] } };
    }
  }

  function phase(id) { return status.atlas.phases.find((item) => item.id === id) || { id, state: 'locked', name: id }; }
  function isBuildable(id) { return ['current', 'completed'].includes(phase(id).state); }
  function isPreview(id) { return !isBuildable(id); }
  function currentId() { return status.atlas.currentPhaseId; }

  function split(value, limit) {
    const words = String(value).split(' '); const lines = []; let line = '';
    words.forEach((word) => {
      const candidate = line ? line + ' ' + word : word;
      if (candidate.length > limit && line) { lines.push(line); line = word; } else { line = candidate; }
    });
    if (line) lines.push(line);
    return lines;
  }

  function tspans(value, y, css, limit) {
    return split(value, limit).map((line, index) => '<tspan class="' + css + '" x="0" dy="' + (index ? 16 : 0) + '" y="' + (index ? '' : y) + '">' + esc(line) + '</tspan>').join('');
  }

  function nodePosition(index, length) { return [104 + index * (800 / Math.max(1, length - 1)), 115]; }

  function svgNode(item, index, length) {
    const point = nodePosition(index, length); const diamond = item.kind === 'decision';
    const body = diamond ? '<polygon class="body" points="0,-52 66,0 0,52 -66,0"/>' : '<rect class="body" x="-78" y="-43" width="156" height="86" rx="14"/>';
    return '<g class="flow-node ' + esc(item.status) + '" transform="translate(' + point[0] + ' ' + point[1] + ')">' + body + '<text>' + tspans(item.label, -7, 'flow-label', 20) + '<tspan class="flow-note" x="0" dy="19">' + esc(item.note) + '</tspan></text></g>';
  }

  function genericFlow(flow) {
    const index = Object.fromEntries(flow.nodes.map((node, position) => [node.id, position]));
    const edges = flow.edges.map(([from, to]) => {
      const a = nodePosition(index[from], flow.nodes.length); const b = nodePosition(index[to], flow.nodes.length);
      return '<path class="flow-edge" d="M ' + (a[0] + 78) + ' ' + a[1] + ' L ' + (b[0] - 78) + ' ' + b[1] + '"/>';
    }).join('');
    return '<div class="flow-wrap"><svg class="phase-flow" viewBox="0 0 1000 230" role="img" aria-label="' + esc(flow.label) + ' flow"><defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#8a8a84"/></marker></defs>' + edges + flow.nodes.map((node, position) => svgNode(node, position, flow.nodes.length)).join('') + '</svg></div><p class="flow-dependency">dependency / fallback: ' + esc(flow.dependency) + '</p>';
  }

  function onboardingChallenge() {
    return '<section class="onboarding-challenge" aria-label="onboarding challenge journey">'
      + '<div class="challenge-intro"><div><p class="eyebrow">challenge 01 · planned</p><h4>define the shopping boundary</h4><p>the shopper chooses what Cognoscene may protect. every route stays voluntary, local and reversible.</p></div><span class="proof-chip planned">planned framing</span></div>'
      + '<div class="journey-key"><span><i class="journey-dot enhanced"></i>enhanced in v1.3</span><span><i class="journey-line"></i>manual entry is the fallback</span></div>'
      + '<div class="onboarding-map">'
      + '<div class="history-card history-boundary"><p>beta 1.2</p><strong>protected-site list</strong><span>the starting point</span></div>'
      + '<div class="challenge-step step-boundary"><button class="challenge-node enhanced" type="button" data-challenge-node="boundary" aria-expanded="false" aria-controls="challenge-detail-boundary"><span class="node-number">01</span><span class="node-copy"><strong>understand the boundary</strong><small>protection is chosen, not assumed</small></span><span class="change-badge">enhanced</span></button><div class="node-detail" id="challenge-detail-boundary" hidden><strong>what changed</strong><p>v1.3 frames the protected-site list as an explicit boundary. Current source proves manual selection; this challenge framing is planned.</p><span class="detail-proof">planned · selection verified current</span></div></div>'
      + '<div class="history-card history-discovery"><p>beta 1.2</p><strong>optional top sites</strong><span>one suggestion surface</span></div>'
      + '<div class="challenge-step step-discovery"><span class="vertical-connector" aria-hidden="true"></span><button class="challenge-node enhanced" type="button" data-challenge-node="discovery" aria-expanded="false" aria-controls="challenge-detail-discovery"><span class="node-number">02</span><span class="node-copy"><strong>choose how to add sites</strong><small>manual entry or optional local suggestions</small></span><span class="change-badge">enhanced</span></button><div class="route-grid"><span class="route-card">manual entry</span><span class="route-card optional">optional local suggestions</span></div><div class="node-detail" id="challenge-detail-discovery" hidden><strong>what changed</strong><p>recognised Chrome Top Sites may be suggested locally after the shopper opts in. A shopper can always add a site manually instead.</p><span class="detail-proof">verified current · no automatic protection</span></div></div>'
      + '<div class="history-card history-protect"><p>beta 1.2</p><strong>list entry</strong><span>no explicit journey shown</span></div>'
      + '<div class="challenge-step step-protect"><span class="vertical-connector" aria-hidden="true"></span><button class="challenge-node enhanced decision" type="button" data-challenge-node="protect" aria-expanded="false" aria-controls="challenge-detail-protect"><span class="node-number">03</span><span class="node-copy"><strong>protect this site?</strong><small>only an explicit protect action enables it</small></span><span class="change-badge">enhanced</span></button><div class="decision-options"><span>no · revise choice</span><span>yes · protect selected site</span></div><div class="node-detail" id="challenge-detail-protect" hidden><strong>what changed</strong><p>suggestion and protection are separate. Nothing becomes protected through discovery alone.</p><span class="detail-proof">verified current · explicit consent</span></div></div>'
      + '<div class="history-card history-browse"><p>beta 1.2</p><strong>protected state</strong><span>limited visible recovery context</span></div>'
      + '<div class="challenge-step step-browse"><span class="vertical-connector" aria-hidden="true"></span><button class="challenge-node enhanced" type="button" data-challenge-node="browse" aria-expanded="false" aria-controls="challenge-detail-browse"><span class="node-number">04</span><span class="node-copy"><strong>selected-site browsing</strong><small>scope stays editable, removable and skippable</small></span><span class="change-badge">enhanced</span></button><div class="node-detail" id="challenge-detail-browse" hidden><strong>what changed</strong><p>the scope remains a user choice: people can remove sites, skip onboarding, or replay it later.</p><span class="detail-proof">verified current · browser proof incomplete</span></div><p class="fallback-line"><span aria-hidden="true">- - -</span> fallback: manual entry remains available if local discovery is unavailable.</p></div>'
      + '</div>'
      + '<div class="plain-fallback"><strong>plain-text flow</strong><p>understand the boundary → choose manual entry or optional local suggestions → explicitly protect a selected site → browse within an editable protected-site boundary. If suggestions are unavailable, manual entry remains available.</p></div>'
      + '</section>';
  }

  function genericChallenge(id) {
    const compare = atlas.comparison[id]; const flow = atlas.flows[id];
    return '<section class="generic-challenge"><div class="challenge-intro"><div><p class="eyebrow">phase journey</p><h4>' + esc(flow.label) + '</h4></div><span class="proof-chip ' + esc(compare.proofLabel) + '">' + esc(compare.proofLabel) + '</span></div>'
      + genericFlow(flow)
      + '<div class="delta"><strong>what changed</strong><br>' + esc(compare.delta) + '<div class="change-row">' + compare.changes.map((item) => '<span class="status ' + esc(item) + '">' + esc(item) + '</span>').join('') + '</div></div></section>';
  }

  function challengeMarkup(id) { return id === 'onboarding' ? onboardingChallenge() : genericChallenge(id); }

  function drawerMarkup() {
    const item = phase(selected); const flow = atlas.flows[selected]; const preview = isPreview(selected); const tabs = ['challenge', 'build'];
    const content = tab === 'challenge' ? challengeMarkup(selected) : '<div class="build-card">' + esc(atlas.buildPlaceholders[selected]) + '</div>';
    const returnButton = preview ? '<p class="preview-note">preview only — this phase cannot be marked complete or promoted here.</p><button class="return-current" type="button" data-return-current>return to current phase</button>' : '';
    return '<div class="drawer-head"><div><p class="eyebrow">' + (preview ? 'preview only' : 'current implementation') + '</p><h3>' + esc(flow.label) + '</h3><p>' + esc(item.summary || '') + '</p></div><div><span class="drawer-proof ' + esc(flow.proofLabel) + '">' + esc(flow.proofLabel) + '</span><button class="drawer-close" type="button" aria-label="close phase drawer" data-close>×</button></div></div><div class="drawer-tabs" role="tablist" aria-label="' + esc(flow.label) + ' details">' + tabs.map((name) => '<button class="drawer-tab" role="tab" type="button" aria-selected="' + (tab === name) + '" data-tab="' + name + '">' + name + '</button>').join('') + '</div><div class="drawer-body">' + content + returnButton + '</div>';
  }

  function bindChallengeNodes() {
    drawer.querySelectorAll('[data-challenge-node]').forEach((button) => {
      const release = () => { button.classList.remove('pressed'); clearTimeout(pressTimer); };
      button.addEventListener('pointerdown', () => { button.classList.add('pressed'); pressTimer = setTimeout(release, 280); });
      button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release);
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        drawer.querySelectorAll('[data-challenge-node]').forEach((node) => {
          const detail = drawer.querySelector('#' + node.getAttribute('aria-controls'));
          node.setAttribute('aria-expanded', 'false'); node.classList.remove('selected'); if (detail) detail.hidden = true;
        });
        if (!isOpen) {
          const detail = drawer.querySelector('#' + button.getAttribute('aria-controls'));
          button.setAttribute('aria-expanded', 'true'); button.classList.add('selected'); if (detail) detail.hidden = false;
        }
      });
    });
  }

  function renderSpine() {
    spine.innerHTML = status.atlas.phases.map((item, index) => {
      const selectedClass = selected === item.id ? ' selected' : ''; const label = item.state === 'locked' ? 'preview only' : item.state;
      return '<button class="phase-stop ' + esc(item.state) + selectedClass + '" type="button" data-phase="' + esc(item.id) + '" aria-current="' + (selected === item.id ? 'step' : 'false') + '" aria-label="' + esc(lower(item.name)) + ', ' + label + '"><span class="phase-dot">' + (item.state === 'completed' ? '✓' : index + 1) + '</span><span class="phase-name">' + esc(lower(item.name)) + '</span><span class="phase-state">' + esc(label) + '</span></button>';
    }).join('');
    spine.querySelectorAll('[data-phase]').forEach((button) => {
      const release = () => { button.classList.remove('pressed'); clearTimeout(pressTimer); };
      button.addEventListener('pointerdown', () => { button.classList.add('pressed'); pressTimer = setTimeout(release, 280); });
      button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release);
      button.addEventListener('click', () => { selected = button.dataset.phase; drawerOpen = true; tab = 'challenge'; render(); });
    });
  }

  function renderDrawer() {
    drawer.hidden = !drawerOpen; openFlow.setAttribute('aria-expanded', String(drawerOpen)); openFlow.textContent = drawerOpen ? 'close phase challenge' : 'open phase challenge';
    if (!drawerOpen) return;
    drawer.innerHTML = drawerMarkup();
    drawer.querySelector('[data-close]').addEventListener('click', () => { drawerOpen = false; renderDrawer(); });
    drawer.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => { tab = button.dataset.tab; renderDrawer(); }));
    const returnButton = drawer.querySelector('[data-return-current]');
    if (returnButton) returnButton.addEventListener('click', () => { selected = currentId(); tab = 'challenge'; render(); });
    bindChallengeNodes();
  }

  function render() {
    const current = phase(currentId()); const selectedPhase = phase(selected);
    summary.textContent = 'current work: ' + lower(current.name) + '. ' + (selected === currentId() ? 'open this phase to continue.' : 'reviewing ' + lower(selectedPhase.name) + '.');
    spineHint.textContent = isPreview(selected) ? 'preview only. github-reviewed status remains the unlock authority.' : 'open this phase to inspect its bounded handover.';
    renderSpine(); renderDrawer();
  }

  (async function init() {
    status = await load(); selected = currentId(); revision.textContent = status.revisionLabel || 'atlas 2.75 v2';
    openFlow.addEventListener('click', () => { drawerOpen = !drawerOpen; renderDrawer(); }); render();
  })();
})();
