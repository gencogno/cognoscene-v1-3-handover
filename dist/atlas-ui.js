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

  function comparisonNode(node, column, index) {
    const isCurrent = column === 'current';
    const tag = isCurrent ? '<span class="flow-status ' + esc(node.status || 'enhanced') + '">' + esc(node.status || 'enhanced') + '</span>' : '';
    const trigger = isCurrent ? ' data-onboarding-node="' + esc(node.id) + '" aria-expanded="false" aria-controls="onboarding-shelf"' : ' aria-disabled="true"';
    return '<button class="comparison-node ' + esc(node.kind || 'state') + ' ' + esc(node.status || 'historical') + '" type="button"' + trigger + '><span class="comparison-index">' + String(index + 1).padStart(2, '0') + '</span><span class="comparison-copy"><strong>' + esc(node.label) + '</strong><small>' + esc(node.note) + '</small></span>' + tag + '</button>';
  }

  function comparisonColumn(flow, column) {
    const isCurrent = column === 'current';
    const branchLabels = (flow.branches || []).map((branch) => '<span class="flow-branch ' + (branch.fallback ? 'fallback' : '') + '">' + esc(branch.label) + ' → ' + esc(flow.nodes.find((node) => node.id === branch.target).label) + '</span>').join('');
    return '<section class="comparison-column ' + column + '" aria-label="' + esc(flow.label) + ' flowchart"><header><p class="eyebrow">' + esc(flow.proof) + '</p><h5>' + esc(flow.label) + '</h5><p>' + (isCurrent ? 'current implementation flow' : 'historical onboarding flow') + '</p></header><div class="comparison-flow">'
      + flow.nodes.map((node, index) => comparisonNode(node, column, index) + (index < flow.nodes.length - 1 ? '<span class="comparison-connector" aria-hidden="true"></span>' : '')).join('')
      + '</div>' + (branchLabels ? '<div class="flow-branches">' + branchLabels + '</div>' : '') + '</section>';
  }

  function onboardingChallenge() {
    const comparison = atlas.comparison.onboarding;
    const packet = atlas.downloads.onboarding;
    return '<section class="onboarding-challenge v3" aria-label="onboarding comparison">'
      + '<div class="challenge-intro"><div><p class="eyebrow">challenge 01 · onboarding</p><h4>from explainer to explicit setup</h4><p>two separate, source-reconciled flows. the current path keeps site protection voluntary, local and reversible.</p></div><span class="proof-chip">verified current</span></div>'
      + '<div class="journey-key"><span><i class="journey-dot"></i>green = new or enhanced in v1.3</span><span><i class="journey-line"></i>dashed = optional or fallback route</span><span><i class="journey-removed"></i>grey = historical or removed</span></div>'
      + '<div class="comparison-columns">' + comparisonColumn(comparison.beta12, 'historical') + comparisonColumn(comparison.v13, 'current') + '</div>'
      + '<aside class="onboarding-shelf" id="onboarding-shelf" hidden aria-live="polite"><p class="eyebrow">selected v1.3 node</p><h5 data-shelf-title>select a green node</h5><p data-shelf-copy>node details and the onboarding handover packet appear here.</p><div class="shelf-actions"><a class="lime-button" data-shelf-download href="' + esc(packet.file) + '" download hidden>' + esc(packet.label) + '</a><button class="return-current" type="button" data-shelf-close hidden>close details</button></div><p class="packet-note" data-shelf-note hidden></p></aside>'
      + '<div class="delta"><strong>comparison delta</strong><br>' + esc(comparison.delta) + '<div class="change-row">' + comparison.changes.map((item) => '<span class="status ' + esc(item) + '">' + esc(item) + '</span>').join('') + '</div></div>'
      + '<div class="plain-fallback"><strong>plain-text fallback</strong><p>Beta 1.2: start or skip → site-boundary explainer → 48-hour hold → savings explainer → monthly Urgente → complete. v1.3: start or skip → add protected sites → optional local suggestions → explicit protection → 24-hour hold → evidence-bounded record → consent and done.</p></div>'
      + '</section>';
  }

  function genericChallenge(id) {
    const compare = atlas.comparison[id]; const flow = atlas.flows[id];
    return '<section class="generic-challenge"><div class="challenge-intro"><div><p class="eyebrow">phase journey</p><h4>' + esc(flow.label) + '</h4></div><span class="proof-chip ' + esc(compare.proofLabel) + '">' + esc(compare.proofLabel) + '</span></div>'
      + genericFlow(flow)
      + '<div class="delta"><strong>what changed</strong><br>' + esc(compare.delta) + '<div class="change-row">' + compare.changes.map((item) => '<span class="status ' + esc(item) + '">' + esc(item) + '</span>').join('') + '</div></div></section>';
  }

  function challengeMarkup(id) { return id === 'onboarding' ? onboardingChallenge() : genericChallenge(id); }

  function buildMarkup(id) {
    if (id !== 'onboarding') return '<div class="build-card">' + esc(atlas.buildPlaceholders[id]) + '</div>';
    const packet = atlas.downloads.onboarding;
    return '<div class="build-card onboarding-build"><p class="eyebrow">reference packet · ' + esc(packet.status) + '</p><h4>one onboarding download</h4><p>' + esc(packet.note) + '</p><ul>' + packet.contents.map((item) => '<li>' + esc(item) + '</li>').join('') + '</ul><a class="lime-button" href="' + esc(packet.file) + '" download>' + esc(packet.label) + '</a></div>';
  }

  function drawerMarkup() {
    const item = phase(selected); const flow = atlas.flows[selected]; const preview = isPreview(selected); const tabs = ['challenge', 'build'];
    const content = tab === 'challenge' ? challengeMarkup(selected) : buildMarkup(selected);
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
    const shelf = drawer.querySelector('#onboarding-shelf');
    if (!shelf) return;
    const packet = atlas.downloads.onboarding;
    const detailByNode = {
      'v-start': ['start or skip', 'The current setup gives the shopper an intentional start or skip route. Skip writes an onboarding-complete, skipped state.'],
      'v-sites': ['add protected sites', 'Manual entry is the baseline route. The current source blocks progression until at least one site has been added.'],
      'v-discover': ['optional local suggestions', 'Chrome Top Sites are read only after opt-in and filtered locally; suggestions do not activate a site.'],
      'v-protect': ['explicitly protect sites', 'Protection happens only after a site is explicitly added. This packet groups the relevant handover references together.'],
      'v-hold': ['24-hour hold explainer', 'The onboarding screen describes the current 24-hour hold; the cart remains with the shop.'],
      'v-record': ['evidence-bounded record', 'The current screen limits amount display to complete evidence rather than inferred totals.'],
      'v-consent': ['consent and done', 'Completion writes the onboarding and selected-site state. Sync is a current checkbox control.']
    };
    const close = shelf.querySelector('[data-shelf-close]');
    const title = shelf.querySelector('[data-shelf-title]');
    const copy = shelf.querySelector('[data-shelf-copy]');
    const download = shelf.querySelector('[data-shelf-download]');
    const note = shelf.querySelector('[data-shelf-note]');
    const closeShelf = () => {
      drawer.querySelectorAll('[data-onboarding-node]').forEach((node) => { node.setAttribute('aria-expanded', 'false'); node.classList.remove('selected'); });
      shelf.hidden = true;
    };
    close.addEventListener('click', closeShelf);
    drawer.querySelectorAll('[data-onboarding-node]').forEach((button) => {
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') === 'true';
        closeShelf();
        if (open) return;
        const details = detailByNode[button.dataset.onboardingNode];
        button.setAttribute('aria-expanded', 'true'); button.classList.add('selected');
        title.textContent = details[0]; copy.textContent = details[1];
        download.hidden = false; close.hidden = false; note.hidden = false; note.textContent = packet.note;
        shelf.hidden = false;
        shelf.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
