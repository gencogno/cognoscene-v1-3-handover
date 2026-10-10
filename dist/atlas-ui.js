(function () {
  'use strict';
  const spine = document.querySelector('#phase-spine');
  const drawer = document.querySelector('#phase-drawer');
  const summary = document.querySelector('#phase-summary');
  const revision = document.querySelector('#revision');
  const openFlow = document.querySelector('#open-flow');
  const spineHint = document.querySelector('#spine-hint');
  const atlas = window.CognosceneAtlasData;
  let status; let selected; let drawerOpen = false; let tab = 'flow'; let pressTimer;

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const lower = (v) => String(v).toLowerCase();
  async function load() {
    try { const response = await fetch('public-feature-status.json', { cache:'no-store' }); if (!response.ok) throw new Error(); return await response.json(); }
    catch { return { revisionLabel:'local atlas fallback', atlas:{ currentPhaseId:'onboarding', phases:[{id:'onboarding',state:'current',name:'onboarding'},{id:'observer',state:'locked',name:'observer'},{id:'rationalisation',state:'locked',name:'rationalisation'},{id:'growth',state:'tentative',name:'growth'}] } }; }
  }
  function phase(id) { return status.atlas.phases.find((item) => item.id === id) || { id, state:'locked', name:id }; }
  function isBuildable(id) { return ['current', 'completed'].includes(phase(id).state); }
  function isPreview(id) { return !isBuildable(id); }
  function currentId() { return status.atlas.currentPhaseId; }
  function nodePosition(index, length) { return [104 + index * (800 / Math.max(1, length - 1)), 115]; }
  function split(value, limit) { const words = String(value).split(' '); const lines = []; let line = ''; words.forEach((word) => { const candidate = line ? line + ' ' + word : word; if (candidate.length > limit && line) { lines.push(line); line = word; } else line = candidate; }); if (line) lines.push(line); return lines; }
  function tspans(value, y, css, limit) { return split(value, limit).map((line, index) => '<tspan class="'+css+'" x="0" dy="'+(index ? 16 : 0)+'" y="'+(index ? '' : y)+'">'+esc(line)+'</tspan>').join(''); }
  function svgNode(item, index, length) {
    const point = nodePosition(index, length); const diamond = item.kind === 'decision';
    const body = diamond ? '<polygon class="body" points="0,-52 66,0 0,52 -66,0"/>' : '<rect class="body" x="-78" y="-43" width="156" height="86" rx="14"/>';
    return '<g class="flow-node '+esc(item.status)+'" transform="translate('+point[0]+' '+point[1]+')">'+body+'<text>'+tspans(item.label, -7, 'flow-label', 20)+'<tspan class="flow-note" x="0" dy="19">'+esc(item.note)+'</tspan></text></g>';
  }
  function flowSvg(flow) {
    const index = Object.fromEntries(flow.nodes.map((node, i) => [node.id, i]));
    const edges = flow.edges.map(([from, to]) => { const a = nodePosition(index[from], flow.nodes.length); const b = nodePosition(index[to], flow.nodes.length); return '<path class="flow-edge" d="M '+(a[0]+78)+' '+a[1]+' L '+(b[0]-78)+' '+b[1]+'"/>'; }).join('');
    const dependency = '<path class="flow-edge dependency" d="M 115 197 L 860 197"/>';
    return '<div class="flow-wrap"><svg class="phase-flow" viewBox="0 0 1000 230" role="img" aria-label="'+esc(flow.label)+' flow"><defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#8a8a84"/></marker></defs>'+edges+dependency+flow.nodes.map((node, i) => svgNode(node, i, flow.nodes.length)).join('')+'</svg></div><p class="flow-dependency">dependency / fallback: '+esc(flow.dependency)+'</p>';
  }
  function changesMarkup(id) {
    const compare = atlas.comparison[id];
    return '<div class="compare-grid"><article class="mini-flow"><h4>beta 1.2</h4><ol>'+compare.beforeFlow.map((item) => '<li>'+esc(item)+'</li>').join('')+'</ol></article><span class="compare-arrow" aria-hidden="true">→</span><article class="mini-flow"><h4>v1.3</h4><ol>'+compare.afterFlow.map((item) => '<li>'+esc(item)+'</li>').join('')+'</ol></article></div><div class="delta"><strong>what changed</strong><br>'+esc(compare.delta)+'<div class="change-row">'+compare.changes.map((item) => '<span class="status '+esc(item)+'">'+esc(item)+'</span>').join('')+'</div></div>';
  }
  function drawerMarkup() {
    const item = phase(selected); const flow = atlas.flows[selected]; const preview = isPreview(selected); const tabs = ['flow', 'changes', 'build'];
    const content = tab === 'flow' ? flowSvg(flow) : tab === 'changes' ? changesMarkup(selected) : '<div class="build-card">'+esc(atlas.buildPlaceholders[selected])+'</div>';
    const returnButton = preview ? '<p class="preview-note">preview only — this phase cannot be marked complete or promoted here.</p><button class="return-current" type="button" data-return-current>return to current phase</button>' : '';
    return '<div class="drawer-head"><div><p class="eyebrow">'+(preview ? 'preview only' : 'current implementation')+'</p><h3>'+esc(flow.label)+'</h3><p>'+esc(item.summary || '')+'</p></div><div><span class="drawer-proof '+esc(flow.proofLabel)+'">'+esc(flow.proofLabel)+'</span><button class="drawer-close" type="button" aria-label="close phase drawer" data-close>×</button></div></div><div class="drawer-tabs" role="tablist" aria-label="'+esc(flow.label)+' details">'+tabs.map((name) => '<button class="drawer-tab" role="tab" type="button" aria-selected="'+(tab === name)+'" data-tab="'+name+'">'+name+'</button>').join('')+'</div><div class="drawer-body">'+content+returnButton+'</div>';
  }
  function renderSpine() {
    spine.innerHTML = status.atlas.phases.map((item, index) => {
      const selectedClass = selected === item.id ? ' selected' : ''; const label = item.state === 'locked' ? 'preview only' : item.state;
      return '<button class="phase-stop '+esc(item.state)+selectedClass+'" type="button" data-phase="'+esc(item.id)+'" aria-current="'+(selected === item.id ? 'step' : 'false')+'" aria-label="'+esc(lower(item.name))+', '+label+'"><span class="phase-dot">'+(item.state === 'completed' ? '✓' : index + 1)+'</span><span class="phase-name">'+esc(lower(item.name))+'</span><span class="phase-state">'+esc(label)+'</span></button>';
    }).join('');
    spine.querySelectorAll('[data-phase]').forEach((button) => {
      const release = () => { button.classList.remove('pressed'); clearTimeout(pressTimer); };
      button.addEventListener('pointerdown', () => { button.classList.add('pressed'); pressTimer = setTimeout(release, 280); });
      button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release);
      button.addEventListener('click', () => { selected = button.dataset.phase; drawerOpen = true; tab = 'flow'; render(); });
    });
  }
  function renderDrawer() {
    drawer.hidden = !drawerOpen; openFlow.setAttribute('aria-expanded', String(drawerOpen)); openFlow.textContent = drawerOpen ? 'close phase flow' : 'open phase flow';
    if (!drawerOpen) return;
    drawer.innerHTML = drawerMarkup();
    drawer.querySelector('[data-close]').addEventListener('click', () => { drawerOpen = false; renderDrawer(); });
    drawer.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => { tab = button.dataset.tab; renderDrawer(); }));
    const returnButton = drawer.querySelector('[data-return-current]'); if (returnButton) returnButton.addEventListener('click', () => { selected = currentId(); tab = 'flow'; render(); });
  }
  function render() {
    const current = phase(currentId()); const selectedPhase = phase(selected);
    summary.textContent = 'current work: '+lower(current.name)+'. '+(selected === currentId() ? 'open this phase to continue.' : 'reviewing '+lower(selectedPhase.name)+'.');
    spineHint.textContent = isPreview(selected) ? 'preview only. github-reviewed status remains the unlock authority.' : 'open this phase to inspect its bounded handover.';
    renderSpine(); renderDrawer();
  }
  (async function init() {
    status = await load(); selected = currentId(); revision.textContent = status.revisionLabel || 'atlas 2.75 phase contract';
    openFlow.addEventListener('click', () => { drawerOpen = !drawerOpen; renderDrawer(); }); render();
  })();
})();
