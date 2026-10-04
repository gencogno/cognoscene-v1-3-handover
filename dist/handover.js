(() => {
  const explanations = {
    "challenge-onboarding": "A separate production challenge to make first-run setup clear, useful, and consent-led.",
    "challenge-ui": "Improve the current popup experience using popup.css as the design reference; keep QA-only tools out of production.",
    onboarding: "First-run setup explains the pause and lets the user choose protected sites and settings.",
    "protected-sites": "Only domains a person explicitly protects should become eligible for Cognoscene prompts.",
    "observer-product-pulse": "Observer offers optional check-ins after qualifying activity; Product Pulse is its confirmed-cart-growth branch.",
    rationalisation: "A qualifying checkout on a protected brand starts a 24-hour hold while the merchant cart and the user's decision remain theirs.",
    rationator: "During the hold, Rationator offers an optional pause and returns the user to that same active hold.",
    urgente: "Urgente is unlimited-use. A completed typing challenge grants a brand-scoped checkout pass; its current 12-hour duration needs founder confirmation.",
    deliberation: "After the hold, the user gets a separate decision window. No purchase or cart edit happens automatically.",
    removed: "The historical Beta 1.2 sample-savings preview and 48-hour hold are not part of the v1.3 target. The shipped Beta 1.2 artifact remains unverified."
  };

  const componentNotes = {
    onboarding: "Source map only: instructions.html/js are dedicated, but site selection and settings cross into shopping-site-registry.js, background.js and popup.js. No audited runtime ZIP yet.",
    "protected-sites": "Source map only: shopping-site-registry.js, instructions.js, popup.js and background.js share selection, registration and sync. No isolated production ZIP has been verified.",
    "observer-product-pulse": "No runtime ZIP yet: both features share content.js/content.css with Rationalisation and QA branches. Production flags disable QA paths but do not extract them; a reviewed production allow-list is required.",
    rationalisation: "No runtime ZIP yet: checkout logic shares content.js/content.css with Observer and QA. Background, mode, cart and outcome helpers are dependencies; review the production allow-list before packaging.",
    rationator: "No runtime ZIP yet: Rationator lives inside Rationalisation's content.js/content.css flow, not after the hold. Preserve hold ownership and exclude QA paths.",
    urgente: "No runtime ZIP yet: the checkout-only pass spans shared content/background/reset paths. Keep it brand-scoped; do not export QA or a global bypass.",
    deliberation: "No runtime ZIP yet: the flow spans content.js, cart-snapshot.js, native-cart-edit-state.js, rationalisation-outcome-copy.js and background wiring. Review all dependencies and QA paths before packaging.",
    "challenge-onboarding": "Challenge brief only; no runtime ZIP. Its implementation crosses onboarding screens, protected-site registry and shared background/popup state.",
    "challenge-ui": "Challenge brief only; no runtime ZIP. The current palette is #C8E88A. popup.js hides its QA panel in production, but background.js still injects copy-lab.js; flags-off is not proof of code exclusion.",
    removed: "No v1.3 runtime bundle: this is a historical change note, not a downloadable component."
  };

  const featurePackets = {
    "challenge-onboarding": {
      design: "A short first-run journey using the current popup's palette and visual language. Explain before asking; keep protected-site choices, Top Sites suggestions, and optional device sync visibly separate. Do not use the superseded Lime design-document treatment.",
      owner: "Daniella owns the onboarding UI implementation; Cogno approves the final wording and visual direction.",
      files: ["instructions.html", "instructions.js", "shopping-site-registry.js", "background.js", "popup.js"],
      tests: ["No dedicated onboarding test file was found under tests/. Add focused setup, consent, skip/reopen, keyboard, and mobile coverage.", "Run npm test (Playwright) after implementation; not run for this handover."],
      checklist: ["Make protected-site selection an explicit user action; Top Sites remain suggestions only.", "Present device sync as a separate, unchecked opt-in; current source defaults it on.", "Keep skip, back, edit, reopen, and popup-open fallback understandable.", "Validate the real extension wizard with keyboard and narrow-window browser checks."],
      standard: ["A person can explain what will be protected before choosing domains.", "No site is protected merely because it appears in browser history or Top Sites.", "Optional sync is off until the user knowingly opts in.", "Setup can be skipped or revisited without locking the person out of browsing."],
      prompt: "Redesign the first-run onboarding only. Preserve explicit site selection, consent, safe skip/back/reopen, and the current popup palette. Do not add behavioral claims or implicit protection.",
      failure: "If browser storage or Top Sites is unavailable, show no suggestions, do not auto-protect anything, and keep a safe skip path.",
      rollback: "Revert the onboarding UI change only; preserve existing saved protected sites and settings.",
      boundary: "Travel/device sync is prechecked in instructions.html and defaults true in current settings. Explicit-consent behavior is not yet production-proven."
    },
    onboarding: {
      design: "First-run UI must explain the pause before asking for settings, with a clear protected-site picker and separately explained optional choices.",
      owner: "Daniella owns onboarding screens; the background and popup own persisted extension settings.",
      files: ["instructions.html", "instructions.js", "background.js", "popup.js"],
      tests: ["No dedicated onboarding test file was found under tests/. Add one for first install, incomplete setup, consent defaults, skip, and reopen.", "Run npm test (Playwright) and browser-test the unpacked extension; not run for this handover."],
      checklist: ["Verify install and incomplete-setup triggers against onboardingCompleted state.", "Keep site protection separate from Top Sites suggestions.", "Resolve the prechecked device-sync default as an explicit opt-in.", "Test finish, skip, back, reopen, and popup-open failure paths."],
      standard: ["No protected domain is added without an explicit user choice.", "Consent is specific and understandable before state is saved.", "A failed suggestion or popup action never traps the user.", "No efficacy, savings, or regret claim appears in onboarding."],
      prompt: "Improve the current first-run wizard without changing the user's consent or site-selection meaning; treat it as the onboarding behavior node, separate from the UI redesign challenge.",
      failure: "Unavailable APIs produce no suggestion and no implicit protection; the user can safely skip or continue to the popup.",
      rollback: "Revert the onboarding screen commit and retain the user's existing site/settings state.",
      boundary: "Current wizard source exists, but no dedicated onboarding test file was found. The sync checkbox is prechecked/default-true."
    },
    "protected-sites": {
      design: "A simple list of protected domains, with add/remove actions. Top Sites is a separate optional source of suggestions, never an activation shortcut.",
      owner: "Daniella coordinates instructions/popup selection UI with shopping-site-registry.js and background injection eligibility.",
      files: ["shopping-site-registry.js", "instructions.html", "instructions.js", "popup.html", "popup.js", "background.js"],
      tests: ["node --test tests/shopping-site-registry.test.js", "node --test tests/content-injection-guard.test.js", "Browser-check add/remove and sync behavior; not run for this handover."],
      checklist: ["Prove that only explicitly protected domains are eligible.", "Keep recognized Top Sites suggestions separate and approval-only.", "Removing a domain immediately removes its eligibility.", "Test duplicate, malformed, unknown, and unavailable-site cases."],
      standard: ["Unknown or suggested domains never activate silently.", "Adding/removing a domain has a visible, reversible user action.", "If site-list reads fail, the extension does not inject shopping prompts."],
      prompt: "Audit the full protected-site path across setup, popup, registry, sync, and content injection. Keep Top Sites as suggestions requiring approval.",
      failure: "If registry or settings state is missing or invalid, do not infer protection and fail open to ordinary browsing.",
      rollback: "Revert registry/UI changes together; do not clear or rewrite existing protected-site records during rollback.",
      boundary: "The registry tests cover recognized retailers and filtered/de-duplicated suggestions; they do not alone prove every onboarding consent path."
    },
    "observer-product-pulse": {
      design: "Small, optional prompts that leave the merchant page usable. Product Pulse uses the same prompt family as Observer and appears only for confirmed cart growth.",
      owner: "Observer owns the check-in lifecycle; Product Pulse is its cart-growth branch. Python stays shadow-only; Vision may only be considered after DOM evidence fails.",
      files: ["content.js", "content.css", "background.js", "impulse-events.js", "observer-telemetry.js", "shopping-site-registry.js"],
      tests: ["node --test tests/observer-recurrence.test.js", "node --test tests/product-pulse-policy.test.js tests/product-pulse-dom-snapshot.test.js", "Browser-test prompt priority and DOM uncertainty; not run for this handover."],
      checklist: ["Keep check-ins optional, gated by qualifying activity, and protected by the recurrence cooldown.", "Show Product Pulse only after a confirmed increase to at least seven items; preserve its cooldown and prompt priority.", "Keep the DOM snapshot bounded and local; uncertain signals stay quiet.", "Complete the missing fifth-return reason UI; store a reason only when the user supplies it.", "Verify one surface at a time and that dismiss/continue never changes the cart."],
      standard: ["No prompt without a protected domain and a qualifying signal.", "Observer and Pulse never stack over Rationalisation surfaces.", "Product Pulse reflects confirmed cart growth, not page text, product identity, or guesswork.", "Missing/ambiguous DOM evidence fails quietly; shopping remains available.", "The fifth-return path is not complete until its optional reason UI and regression test exist."],
      prompt: "Work only on Observer plus its Product Pulse branch. Preserve the current activity gates, recurrence guard, bounded local DOM fallback, prompt priority, and the missing fifth-return acceptance requirement.",
      failure: "If activity or cart evidence is uncertain, show nothing; if logging fails, do not block the user's page action.",
      rollback: "Revert the Observer/Pulse change as one unit and retain existing local event data; never widen telemetry or bypass consent.",
      boundary: "Focused tests exist but were not run for this handover. The fifth-return UI is incomplete. No Vision runtime module was found in the current extension inventory."
    },
    rationalisation: {
      design: "A clear 24-hour hold surface with the user's next steps visible. Normal browsing and cart edits remain available; the merchant owns the cart.",
      owner: "Rationalisation owns checkout interception and the hold timer. Deliberation and Urgente are distinct user-chosen routes; Observer/Pulse and Growth stay separate.",
      files: ["content.js", "content.css", "background.js", "cognoscene-mode.js", "cart-snapshot.js", "native-cart-edit-state.js", "rationalisation-outcome-copy.js"],
      tests: ["node --test tests/rationalisation-state-cleanup.test.js tests/rationalisation-visual-contract.test.js", "node --test tests/decision-checkout-reentry.test.js tests/decision-final-choice-contract.test.js", "Browser-test supported merchants and checkout fallbacks; not run for this handover."],
      checklist: ["Intercept only a qualifying checkout control on an explicitly protected brand.", "Keep the 24-hour hold brand-scoped and stable across reload/re-entry.", "Unknown control classification or uncertain page state lets checkout proceed.", "Do not remove, clear, or rewrite merchant cart items.", "Test real browser flows; static contract tests are not universal merchant proof."],
      standard: ["A qualifying checkout starts one understandable 24-hour pause.", "Browsing, add-to-cart, and user-directed cart edits remain available.", "Unknown merchant controls fail open.", "The user makes every purchase or cart decision; no outcome claim is made."],
      prompt: "Change the checkout hold only within the Rationalisation boundary. Preserve merchant ownership of the cart, the 24-hour user-facing wait, explicit actions, and fail-open handling for unknown controls.",
      failure: "If checkout classification, hold state, or required storage is uncertain, do not intercept the merchant action.",
      rollback: "Revert the checkout-interception commit to the last tested source; do not reset user holds or cart state as a rollback shortcut.",
      boundary: "Current static tests cover selected contracts; merchant/browser support is not universal proof."
    },
    rationator: {
      design: "An optional, compact pause/return prompt available during the active hold. Its return points back into that same hold; it is not a later stage.",
      owner: "Rationator is a Rationalisation subflow; Rationalisation retains sole ownership of the original hold timer.",
      files: ["content.js", "content.css", "background.js"],
      tests: ["Related: node --test tests/rationalisation-state-cleanup.test.js tests/decision-checkout-reentry.test.js", "No dedicated Rationator test file was found; add hold-reentry and dismiss/reset coverage."],
      checklist: ["Offer it only while the same brand's original hold is active.", "Return to the same hold without restarting, extending, or skipping its timer.", "Keep the route optional, dismissible, and free of stacked prompts.", "Clear per-tab/per-hold return state when the hold ends; add a focused regression test."],
      standard: ["The route behaves as a loop inside Rationalisation, never a post-hold stage.", "Closing it leaves the original hold and user's decision intact.", "Expired or missing hold state means no Rationator prompt."],
      prompt: "Implement Rationator as a return loop inside the active Rationalisation hold. Do not create a separate timer or move it after Deliberation.",
      failure: "If the original hold cannot be confirmed, show no return prompt; return to the ordinary protected-site flow.",
      rollback: "Revert the Rationator change and clear only its stale local return marker through the tested cleanup path; preserve the hold itself.",
      boundary: "Current source has local per-tab/per-hold state; browser re-entry proof and dedicated test coverage are incomplete."
    },
    urgente: {
      design: "An optional typing challenge inside the hold. Successful completion grants a same-brand checkout-only pass; the number of Urgente uses is unlimited.",
      owner: "Urgente is a user-triggered Rationalisation route; it does not own or reset the hold and cannot become a global bypass.",
      files: ["content.js", "background.js", "popup.js", "cognoscene-mode.js"],
      tests: ["Targeted: npm test -- --grep \"unlimited urgente stays available after prior usage\"", "node --test tests/rationalisation-visual-contract.test.js", "Browser-check repeat use and brand scope; not run for this handover."],
      checklist: ["Prove repeat use remains available regardless of the legacy monthly usage counter.", "Keep each successful pass scoped to the same brand and checkout only.", "Confirm whether the current 12-hour pass duration remains the v1.3 target.", "Ensure invalid challenge/pass state never creates a global bypass."],
      standard: ["There is no monthly or lifetime use gate; repeated user-initiated use remains available.", "A pass applies only to the brand and checkout path that earned it.", "The current source grants a 12-hour pass; retain that duration only if Cogno confirms it.", "If challenge or storage fails, the original hold remains in place."],
      prompt: "Keep Urgente unlimited in number of uses while preserving its user-triggered, brand-scoped checkout boundary. Do not interpret the legacy monthly display counter as an eligibility gate.",
      failure: "A failed or invalid pass write grants no checkout bypass; the ordinary hold continues and remains recoverable.",
      rollback: "Revert the Urgente change without resetting or broadening saved passes; test the production build with repeated prior-use state.",
      boundary: "Current E2E coverage says Urgente stays available after prior usage. A monthly counter remains in storage/display; the 12-hour pass duration is current source behavior, not a settled founder decision."
    },
    deliberation: {
      design: "A separate choice surface after the 24-hour hold. Present deliberate, unselected actions; never choose, buy, or alter the merchant cart for the user.",
      owner: "Deliberation owns the post-hold choice. It shares checkout/cart helpers with Rationalisation but does not own Observer, Urgente's pass, or Growth decisions.",
      files: ["content.js", "background.js", "cart-snapshot.js", "native-cart-edit-state.js", "rationalisation-outcome-copy.js"],
      tests: ["node --test tests/decision-final-choice-contract.test.js tests/decision-checkout-reentry.test.js", "node --test tests/rationalisation-outcome-copy.test.js tests/rationalisation-cart-value-display.test.js", "Browser-test explicit choices and expiry cleanup; not run for this handover."],
      checklist: ["Open only after the original 24-hour hold expires; verify the separate decision-window duration.", "Keep buy, drop/leave, wait, and user-directed edit as explicit actions.", "Never click merchant controls or mutate the cart automatically.", "Omit unverified cart totals and ensure logging failure cannot block a choice.", "Confirm normal checkout-pass duration with Cogno."],
      standard: ["The user is the only actor making a final choice or cart edit.", "No unverified amount or savings claim is displayed.", "A failed event write never blocks explicit checkout or leaving.", "Expiry cleans up the episode; a later checkout starts a new hold."],
      prompt: "Work only on the post-hold Deliberation choice and its state cleanup. Keep every action explicit and preserve the merchant cart unless the user edits it directly.",
      failure: "If cart evidence or telemetry is missing, omit the amount/event detail but keep the user's explicit choice available.",
      rollback: "Revert the Deliberation change and use the tested episode-cleanup path; do not synthesize or backfill outcomes.",
      boundary: "Source and focused contract tests exist, but the normal checkout-pass duration remains an open founder decision."
    },
    "challenge-ui": {
      design: "Refine the current popup's hierarchy and controls using popup.css tokens. Use the live popup as the reference, not the superseded Lime design-document variant.",
      owner: "Daniella owns popup implementation and production packaging; Cogno reviews the visual result. QA tooling is not production UI or runtime.",
      files: ["popup.html", "popup.css", "popup.js", "background.js", "manifest.json", "scripts/extension-mode.js", "copy-lab.js"],
      tests: ["node --test tests/extension-mode.test.js", "Audit manifest and background injection list in the packaged production artifact.", "Browser-check popup at desktop/narrow widths; packaging and browser proof are incomplete."],
      checklist: ["Improve the current popup navigation and readability without replacing the established palette.", "Remove QA controls and Copy Lab from the production artifact, not only from the visible popup.", "Add an allow-list/package test; flags-off alone does not prove source exclusion.", "Verify keyboard, responsive layout, and extension-page behavior."],
      standard: ["The popup reads clearly with the existing brand tokens and no obsolete Lime mockup treatment.", "Production contains no QA-only controls or injected Copy Lab runtime.", "A reviewed package manifest/injection allow-list proves what ships.", "Browser and package checks pass before the node is marked complete."],
      prompt: "Improve the current popup, then prove production packaging excludes QA-only files and branches. Keep the live popup palette and do not create a second product shell.",
      failure: "If production exclusion cannot be proved, do not ship that artifact; keep the last known-good package available.",
      rollback: "Restore the last production-tested package and revert the popup/injection allow-list change as one reviewed unit.",
      boundary: "popup.js removes the production QA panel, but background.js still injects copy-lab.js. tests/extension-mode.test.js checks flags, not package/source exclusion."
    }
  };

  const panel = document.getElementById("feature-details");
  const fields = {
    kicker: document.getElementById("feature-kicker"),
    title: document.getElementById("feature-title"),
    change: document.getElementById("feature-change"),
    explanation: document.getElementById("feature-explanation"),
    components: document.getElementById("feature-components"),
    prompt: document.getElementById("feature-prompt"),
    checklist: document.getElementById("feature-checklist"),
    checklistState: document.getElementById("checklist-state"),
    checklistReset: document.getElementById("checklist-reset"),
    cognoscenti: document.getElementById("feature-cognoscenti"),
    proof: document.getElementById("feature-proof"),
    download: document.getElementById("feature-download"),
    downloadNote: document.getElementById("download-note"),
    back: document.getElementById("feature-return")
  };
  const storageKey = "cognoscene-v1-3-daniella-checklist-v1";
  let checklistProgress = {};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) checklistProgress = saved;
  } catch {}
  let selectedNode = null;
  let currentDownloadUrl = null;

  function listInto(target, items) {
    target.replaceChildren();
    (items || []).forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      target.append(li);
    });
  }

  function savedItems(key) {
    return Array.isArray(checklistProgress[key]) ? checklistProgress[key].filter((item) => typeof item === "string") : [];
  }

  function isComplete(key) {
    const items = featurePackets[key]?.checklist || [];
    const saved = new Set(savedItems(key));
    return items.length > 0 && items.every((item) => saved.has(item));
  }

  function markNodeComplete(key, completed) {
    const node = [...document.querySelectorAll("[data-feature]")].find((candidate) => candidate.dataset.feature === key);
    if (!node) return;
    node.classList.toggle("completed", completed);
    const copy = node.querySelector(".flow-copy");
    if (!copy) return;
    let label = copy.querySelector(".completion-label");
    if (completed && !label) {
      label = document.createElement("span");
      label.className = "completion-label";
      label.textContent = "CHECKLIST COMPLETE · LOCAL";
      copy.append(label);
    } else if (!completed && label) {
      label.remove();
    }
  }

  function renderChecklist(key) {
    const packet = featurePackets[key];
    fields.checklist.replaceChildren();
    if (!packet) {
      const li = document.createElement("li");
      li.textContent = "Historical note only; no v1.3 implementation checklist.";
      fields.checklist.append(li);
      fields.checklistState.textContent = "No runtime work is assigned here.";
      fields.checklistReset.hidden = true;
      return;
    }

    const saved = new Set(savedItems(key));
    packet.checklist.forEach((text, index) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const copy = document.createElement("span");
      input.type = "checkbox";
      input.id = `check-${key}-${index}`;
      input.checked = saved.has(text);
      copy.textContent = text;
      label.htmlFor = input.id;
      label.append(input, copy);
      li.append(label);
      fields.checklist.append(li);
      input.addEventListener("change", () => {
        const next = new Set(savedItems(key));
        if (input.checked) next.add(text);
        else next.delete(text);
        checklistProgress[key] = [...next];
        let persisted = true;
        try { localStorage.setItem(storageKey, JSON.stringify(checklistProgress)); }
        catch { persisted = false; }
        markNodeComplete(key, isComplete(key));
        renderChecklistState(key, persisted);
      });
    });
    fields.checklistReset.hidden = packet.checklist.length === 0;
    fields.checklistReset.disabled = saved.size === 0;
    renderChecklistState(key, true);
  }

  function renderChecklistState(key, persisted) {
    const packet = featurePackets[key];
    if (!packet) return;
    const done = new Set(savedItems(key));
    const count = packet.checklist.filter((item) => done.has(item)).length;
    const complete = isComplete(key);
    fields.checklistState.textContent = complete
      ? "Checklist complete here · not production approval."
      : `${count}/${packet.checklist.length} checked · ${persisted ? "saved in this browser" : "not saved by this browser"}.`;
    fields.checklistReset.disabled = count === 0;
  }

  function markdownList(items) {
    return (items && items.length) ? items.map((item) => `- ${item}`).join("\n") : "- None listed.";
  }

  function downloadNodeBrief(key) {
    const packet = featurePackets[key];
    if (currentDownloadUrl) URL.revokeObjectURL(currentDownloadUrl);
    currentDownloadUrl = null;
    if (!packet || key === "removed") {
      fields.download.href = "#";
      fields.download.removeAttribute("download");
      return;
    }
    const proof = selectedNode?.querySelector(".proof-line")?.innerText?.trim()
      || selectedNode?.querySelector(".challenge-proof")?.innerText?.trim()
      || "Source evidence is not attached to this historical node.";
    const title = fields.title.textContent.trim();
    const checklist = packet.checklist.map((item) => `- [ ] ${item}`).join("\n") || "- No implementation checklist.";
    const contents = [
      `# ${title} — Cognoscene v1.3 developer handoff`,
      "",
      `Prepared: ${new Date().toISOString().slice(0, 10)}`,
      "Release comparison: Beta 1.2 → Cognoscene v1.3. Current v2 extension source is evidence only; it does not rename the release target.",
      "",
      "## Feature design",
      packet.design,
      "",
      "## Plain-English explanation",
      explanations[key],
      "",
      "## Owner and boundaries",
      packet.owner,
      packet.boundary,
      "",
      "Shared boundaries: Observer owns check-ins and Product Pulse is its confirmed-growth branch; Rationalisation owns the hold, Rationator is an in-hold loop, Deliberation is the post-hold choice, and Urgente is an unlimited-use checkout route. Growth remains tentative/grey with Cogno. Python is shadow-only. Vision is only a planned DOM-failure fallback; its current runtime contract is unknown.",
      "",
      "## Current proof label",
      proof,
      "Current extension manifest: 1.4.103. The canonical extension folder has no Git metadata. Source was inspected; extension tests were not run for this handoff.",
      "",
      "## Source files to inspect in Daniella's repository",
      markdownList(packet.files),
      "",
      "## Suggested tests (not included and not run here)",
      markdownList(packet.tests),
      "",
      "## Daniella checklist",
      checklist,
      "",
      "## Cognoscenti · gold-standard acceptance",
      markdownList(packet.standard),
      "",
      "## Fail-open rule",
      packet.failure,
      "",
      "## Rollback rule",
      packet.rollback,
      "",
      "## Claude prompt plan",
      "Recommendation, not locked: a short shared guardrails brief plus this node-specific focus is clearer than one all-feature prompt. Pilot on a feature, then decide. Do not give a node-only prompt without the shared user-agency, consent, privacy, and evidence guardrails.",
      packet.prompt,
      "",
      "## Download boundary",
      "This is one combined handoff brief for this node: feature design, source map, tests, checklist, and Cognoscenti. It contains no extension runtime code. Shared content.js/content.css and the current production/QA injection gap mean a runtime ZIP is not yet safe. Daniella should work in the existing Git repository and keep QA/test/WIP files out of the production package.",
      "",
      "Global guardrails: friction, not restriction; preserve user agency and explicit consent; keep extension data within its approved local boundaries; do not claim savings, regret reduction, or behavioral efficacy."
    ].join("\n");
    try {
      const blob = new Blob([contents], { type: "text/markdown;charset=utf-8" });
      currentDownloadUrl = URL.createObjectURL(blob);
      fields.download.href = currentDownloadUrl;
      fields.download.download = `${key}-cognoscene-v1-3-handoff.md`;
    } catch {
      fields.download.hidden = true;
      fields.downloadNote.textContent = "Download unavailable in this browser; the source map remains above.";
    }
  }

  function selectNode(node) {
    const key = node.dataset.feature;
    const explanation = explanations[key];
    if (!explanation) return;
    const packet = featurePackets[key];
    const title = node.querySelector("summary strong")?.textContent?.trim() || "Selected feature";
    const badge = node.querySelector(".change-badge");
    const status = key === "removed" ? "removed" : key.startsWith("challenge-") ? "challenge" : badge?.classList.contains("new") ? "new" : "enhanced";
    const statusLabel = key === "removed" ? "REMOVED" : key.startsWith("challenge-") ? "CHALLENGE" : status.toUpperCase();
    node.id = `feature-flow-${key}`;
    selectedNode = node;
    fields.kicker.textContent = key.startsWith("challenge-") ? "Details for the selected production challenge" : key === "removed" ? "Details for a historical change" : "Details for the selected chart node";
    fields.title.textContent = title;
    fields.change.className = `change-badge ${status}`;
    fields.change.textContent = statusLabel;
    fields.explanation.textContent = packet?.design || explanation;
    fields.components.textContent = componentNotes[key] || "No isolated runtime component is assigned to this node.";
    fields.download.hidden = !packet || key === "removed";
    fields.downloadNote.textContent = packet
      ? "One combined design, source-map, test, checklist, and Cognoscenti brief; no runtime code."
      : "Historical note only; no component download.";
    fields.prompt.textContent = packet
      ? `Draft focus: ${packet.prompt} Shared guardrails + a focused node prompt is a recommendation, not locked; founder decision pending.`
      : "No implementation prompt for a historical change note.";
    listInto(fields.cognoscenti, packet?.standard || ["Historical context only; not part of the v1.3 runtime."]);
    fields.proof.textContent = [
      node.querySelector(".proof-line")?.innerText?.trim() || node.querySelector(".challenge-proof")?.innerText?.trim() || "Historical evidence only; shipped Beta 1.2 runtime is unknown.",
      packet ? `Owner: ${packet.owner}` : "Owner: no v1.3 implementation assigned.",
      packet ? `Fail-open: ${packet.failure}` : "Fail-open: no runtime behavior is introduced by this change note.",
      packet ? `Rollback: ${packet.rollback}` : "Rollback: not applicable; no component is shipped."
    ].join("\n\n");
    downloadNodeBrief(key);
    renderChecklist(key);
    markNodeComplete(key, isComplete(key));
    fields.back.href = `#${node.id}`;
    fields.back.textContent = key.startsWith("challenge-") ? "↑ Return to challenge" : key === "removed" ? "↑ Return to change note" : "↑ Return to its flow";
    panel.hidden = false;
    requestAnimationFrame(() => panel.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function clearSelection(node) {
    if (selectedNode !== node) return;
    selectedNode = null;
    panel.hidden = true;
  }

  document.querySelectorAll("details[data-feature]").forEach((node) => {
    markNodeComplete(node.dataset.feature, isComplete(node.dataset.feature));
    node.addEventListener("toggle", () => {
      if (!node.open) {
        clearSelection(node);
        return;
      }
      document.querySelectorAll("details[data-feature]").forEach((other) => {
        if (other !== node) other.open = false;
      });
      selectNode(node);
    });
  });
  const restoredOpenNode = document.querySelector("details[data-feature][open]");
  if (restoredOpenNode) selectNode(restoredOpenNode);
  fields.back.addEventListener("click", (event) => {
    event.preventDefault();
    if (!selectedNode) return;
    selectedNode.scrollIntoView({ behavior: "smooth", block: "center" });
    selectedNode.querySelector("summary")?.focus({ preventScroll: true });
  });
  fields.checklistReset.addEventListener("click", () => {
    if (!selectedNode) return;
    const key = selectedNode.dataset.feature;
    delete checklistProgress[key];
    try { localStorage.setItem(storageKey, JSON.stringify(checklistProgress)); } catch {}
    markNodeComplete(key, false);
    renderChecklist(key);
  });
})();
