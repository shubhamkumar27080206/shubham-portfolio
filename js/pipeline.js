/* Animated CI/CD workflow (ECS / EKS). Content comes from PORTFOLIO.cicd in js/data.js */
(() => {
  "use strict";
  const D = window.PORTFOLIO, C = D && D.cicd;
  const root = document.getElementById("pipeline");
  if (!C || !root) return;
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const mmss = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

  const lanes = $("#plLanes"), info = $("#plInfo"), code = $("#plCode"), file = $("#plFile"),
        log = $("#plLog"), statusEl = $("#plStatus"), prog = $("#plProg"), seg = $("#plTarget");
  let target = "ecs", sel = 0, done = 0, running = false, clock = 0, timers = [];

  const stages = () => [...C.ci, ...C.cd[target].stages];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const stop = () => { timers.forEach(clearTimeout); timers = []; running = false; };

  seg.innerHTML = Object.entries(C.cd).map(([k, v], i) =>
    `<button type="button" role="tab" data-t="${k}" aria-selected="${i === 0}">${esc(v.label)}</button>`).join("");

  function renderLanes() {
    const t = C.cd[target];
    const lane = (label, list, off) => `
      <div class="lane">
        <div class="lane-h">${esc(label)}</div>
        <div class="stages">${list.map((s, k) => `
          <button type="button" class="stg" data-i="${off + k}" aria-pressed="false">
            <span class="stg-n">${pad(off + k + 1)}</span>
            <b>${esc(s.title)}</b>
            <small>${esc(s.tools.join(" · "))}</small>
          </button>`).join("")}</div>
      </div>`;
    lanes.innerHTML =
      lane("Continuous Integration · GitHub Actions / Jenkins", C.ci, 0) +
      `<div class="handoff"><span>artifact</span><code>${esc(t.artifact)}</code></div>` +
      lane(`Continuous Delivery · ${t.label}`, t.stages, C.ci.length);
  }

  function renderDetail() {
    const s = stages()[sel];
    info.innerHTML = `
      <span class="pl-step">Stage ${pad(sel + 1)} / ${pad(stages().length)}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.desc)}</p>
      <div class="chips">${s.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>`;
    file.textContent = s.file;
    code.innerHTML = s.code.map((l) => /^\s*#/.test(l) ? `<span class="cm">${esc(l)}</span>` : esc(l)).join("\n");
  }

  function paint() {
    const total = stages().length;
    $$(".stg", lanes).forEach((b) => {
      const i = +b.dataset.i;
      b.classList.toggle("done", i < done);
      b.classList.toggle("feed", i > 0 && i <= done);
      b.classList.toggle("active", running && i === done);
      b.classList.toggle("sel", i === sel);
      b.setAttribute("aria-pressed", String(i === sel));
    });
    prog.style.width = `${(done / total) * 100}%`;
    const state = running ? "running" : done >= total ? "ok" : "idle";
    root.dataset.state = state;
    statusEl.textContent = running ? `Running · stage ${Math.min(done + 1, total)}/${total}`
      : done >= total ? `Succeeded · ${mmss(clock)}` : "Idle";
    renderDetail();
  }

  function addLog(text, cls = "", at = clock) {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.innerHTML = `<time>[${mmss(at)}]</time> ${esc(text)}`;
    log.appendChild(d);
    while (log.children.length > 70) log.firstChild.remove();
    log.scrollTop = log.scrollHeight;
  }

  function step() {
    const all = stages();
    if (done >= all.length) {
      running = false;
      addLog(`Pipeline succeeded · ${C.cd[target].label} · total ${mmss(clock)} (illustrative)`, "ok");
      return paint();
    }
    const s = all[done];
    sel = done; paint();
    addLog(`▸ ${pad(done + 1)} ${s.title}`, "hd");
    s.log.forEach((l, k) => later(() => addLog(l, "", clock + Math.round((s.dur * (k + 1)) / (s.log.length + 1))), 380 * (k + 1)));
    later(() => {
      clock += s.dur; done++;
      addLog(`✔ ${s.title} (${s.dur}s)`, "ok");
      paint();
      later(step, 260);
    }, 380 * (s.log.length + 1) + 260);
  }

  function reset(quiet) {
    stop(); done = 0; sel = 0; clock = 0;
    log.innerHTML = "";
    if (!quiet) addLog("Press “Run pipeline” to watch a release flow from commit to production.", "hd", 0);
    paint();
  }
  function run() {
    reset(true);
    running = true;
    addLog(`$ pipeline start · target: ${C.cd[target].label} · simulated timings`, "hd", 0);
    step();
  }

  /* events */
  lanes.addEventListener("click", (e) => {
    const b = e.target.closest(".stg"); if (!b) return;
    stop(); sel = +b.dataset.i; paint();
  });
  seg.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || b.dataset.t === target) return;
    target = b.dataset.t;
    $$("button", seg).forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderLanes();
    run();
  });
  $("#plRun").addEventListener("click", run);
  $("#plReset").addEventListener("click", () => reset(false));

  /* init */
  renderLanes();
  if (reduce) {
    done = stages().length; clock = stages().reduce((a, s) => a + s.dur, 0);
    paint();
    addLog("Pipeline succeeded (static view, reduced motion).", "ok", clock);
  } else {
    reset(false);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.5 });
      io.observe(lanes);
    }
  }
})();
