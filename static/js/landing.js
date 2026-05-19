// Scroll-reveal, scenario tabs, and layer-rail interaction for the Theatrum landing page.

(function () {
  // -- Scroll reveal ---------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
        setTimeout(() => entry.target.classList.add('is-in'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    // No IO — just show everything.
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // -- Scenario tabs ---------------------------------------------------------
  const tabsRoot = document.querySelector('[data-scenario-tabs]');
  const kpiStack = document.querySelector('[data-kpi-stack]');
  const sceneBuildings = document.querySelector('[data-scenario-buildings]');

  // KPI values by scenario index (0 = A, 1 = B, 2 = C)
  const KPI = {
    woningen: [
      { val: '1.240', delta: '+27%', down: false },
      { val: '1.580', delta: '+27%', down: false },
      { val: '1.820', delta: '+47%', down: false },
    ],
    groen: [
      { val: '31%', delta: '+4%', down: false },
      { val: '31%', delta: '+4%', down: false },
      { val: '22%', delta: '−9%', down: true },
    ],
    stikstof: [
      { val: '68', delta: '−12%', down: false },
      { val: '68', delta: '−12%', down: false },
      { val: '84', delta: '+18%', down: true },
    ],
  };

  function applyScenario(idx) {
    if (kpiStack) {
      Object.keys(KPI).forEach((key) => {
        const row = kpiStack.querySelector(`[data-kpi="${key}"] .val`);
        if (!row) return;
        const data = KPI[key][idx];
        row.innerHTML = `${data.val}<span class="delta${data.down ? ' is-down' : ''}">${data.delta}</span>`;
      });
    }
    if (sceneBuildings) {
      sceneBuildings.querySelectorAll('.b-base').forEach((el) => {
        el.style.opacity = idx === 0 ? '0.55' : '1';
      });
      sceneBuildings.querySelectorAll('.b-s1').forEach((el) => {
        el.style.display = idx >= 1 ? '' : 'none';
        el.style.opacity = idx === 0 ? '0.55' : '1';
      });
      sceneBuildings.querySelectorAll('.b-s2').forEach((el) => {
        el.style.display = idx >= 2 ? '' : 'none';
      });
    }
  }

  if (tabsRoot) {
    tabsRoot.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        tabsRoot.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyScenario(parseInt(btn.dataset.scenario, 10));
      });
    });
    // Initial state — scenario B
    applyScenario(1);
  }

  // -- Layer rail click ------------------------------------------------------
  const rail = document.querySelector('[data-rail]');
  if (rail) {
    rail.querySelectorAll('.layer-row[data-layer]').forEach((row) => {
      row.addEventListener('click', () => {
        rail.querySelectorAll('.layer-row[data-layer]').forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
      });
    });
  }
})();
