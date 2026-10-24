/* Cinematic layer. Pure vanilla JS, no dependencies. Content still comes from js/data.js */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, D = window.PORTFOLIO || {};
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- boot sequence + letterbox reveal ---------- */
  const boot = $("#boot"), bars = $$(".lb");
  const finish = () => { root.classList.remove("booting"); try { sessionStorage.setItem("booted", "1"); } catch (e) {} };
  if (!boot || !root.classList.contains("booting")) { boot && boot.remove(); bars.forEach((b) => b.remove()); finish(); }
  else {
    const log = $("#bootLog"), fill = $("#bootFill"), pct = $("#bootPct");
    const lines = [
      `<span class="hl">$ ssh ops@prod-cluster</span>`,
      `<span class="ok">✔</span> assume-role · AWS Solutions Architect`,
      `<span class="ok">✔</span> terraform init · plan clean, 0 drift`,
      `<span class="ok">✔</span> eks nodes ready · 3/3`,
      `<span class="ok">✔</span> alarms green · slo 99.9%`,
      `<span class="hl">› launching ${D.name || "portfolio"}…</span>`
    ];
    let i = 0, ended = false;
    const end = () => {
      if (ended) return; ended = true;
      fill.style.width = "100%"; pct.textContent = "100%";
      boot.classList.add("done"); finish();
      setTimeout(() => bars.forEach((b) => b.classList.add("open")), 250);
      setTimeout(() => { boot.remove(); bars.forEach((b) => b.remove()); }, 2400);
    };
    const next = () => {
      if (ended) return;
      if (i >= lines.length) return setTimeout(end, 380);
      log.insertAdjacentHTML("beforeend", lines[i++] + "\n");
      const p = Math.round((i / lines.length) * 100);
      fill.style.width = p + "%"; pct.textContent = p + "%";
      setTimeout(next, 330);
    };
    next();
    boot.addEventListener("click", end);
    addEventListener("keydown", end, { once: true });
    setTimeout(end, 4500);
  }

  /* ---------- warp starfield: speed reacts to scroll velocity ---------- */
  let vel = 0, lastY = scrollY;
  const cv = $("#warp");
  if (cv && !reduce) {
    const ctx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
    let w, h, stars = [], rgb = "77,163,255";
    const mk = () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 0.98 + 0.02 });
    const size = () => {
      w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: clamp(Math.floor(w / 6), 80, 240) }, mk);
      rgb = getComputedStyle(root).getPropertyValue("--accent-rgb").trim() || rgb;
    };
    new MutationObserver(size).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    addEventListener("resize", size); size();
    const frame = () => {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      const sp = 0.0018 + Math.min(Math.abs(vel), 60) * 0.00022, tail = 1 + Math.min(Math.abs(vel), 60) * 0.18;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h * 0.45, f = Math.max(w, h) * 0.55;
      for (const s of stars) {
        const pz = s.z + sp * tail * 2.2;
        s.z -= sp;
        if (s.z <= 0.02) { Object.assign(s, mk(), { z: 1 }); continue; }
        const x = cx + (s.x / s.z) * f * 0.5, y = cy + (s.y / s.z) * f * 0.5;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) { Object.assign(s, mk(), { z: 1 }); continue; }
        const px = cx + (s.x / pz) * f * 0.5, py = cy + (s.y / pz) * f * 0.5, a = (1 - s.z) * 0.85;
        ctx.strokeStyle = `rgba(${rgb},${a})`; ctx.lineWidth = (1 - s.z) * 1.8 + 0.3;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      }
    };
    frame();
  }

  /* ---------- scroll: velocity, hero dolly ---------- */
  const hero = $("#home");
  let tick = false;
  const upd = () => {
    const dy = scrollY - lastY; lastY = scrollY;
    vel += (dy - vel) * 0.18;
    root.style.setProperty("--vel", clamp(vel / 6, -4, 4).toFixed(2));
    if (hero) hero.style.setProperty("--hs", clamp(scrollY / (hero.offsetHeight * 0.85), 0, 1).toFixed(3));
  };
  if (!reduce) {
    const loop = () => { upd(); if (Math.abs(vel) < 0.01) vel = 0; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- hero 3D tilt ---------- */
  if (hero && fine && !reduce) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      hero.style.setProperty("--try", (nx * 14).toFixed(2) + "deg");
      hero.style.setProperty("--trx", (-ny * 10).toFixed(2) + "deg");
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { hero.style.setProperty("--try", "0deg"); hero.style.setProperty("--trx", "0deg"); });
  }

  /* ---------- card spotlight ---------- */
  if (fine) {
    addEventListener("pointermove", (e) => {
      const c = e.target.closest && e.target.closest(".card"); if (!c) return;
      let s = c.querySelector(":scope>.spot");
      if (!s) { s = document.createElement("i"); s.className = "spot"; c.prepend(s); }
      const r = c.getBoundingClientRect();
      s.style.setProperty("--sx", e.clientX - r.left + "px"); s.style.setProperty("--sy", e.clientY - r.top + "px");
    }, { passive: true });
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) {
    $$(".btn, .icon-btn.round, .logo").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`;
      });
      b.addEventListener("pointerleave", () => (b.style.transform = ""));
    });
  }

  /* ---------- custom cursor ---------- */
  if (fine && !reduce) {
    const ring = Object.assign(document.createElement("div"), { className: "cur-ring" });
    const dot = Object.assign(document.createElement("div"), { className: "cur-dot" });
    document.body.append(ring, dot);
    let mx = 0, my = 0, rx = 0, ry = 0;
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY; ring.classList.add("on");
      dot.style.transform = `translate(${mx}px,${my}px)`;
      ring.classList.toggle("big", !!(e.target.closest && e.target.closest("a,button,.stg,.tab,input,textarea,.card")));
    }, { passive: true });
    document.addEventListener("pointerleave", () => ring.classList.remove("on"));
    (function follow() { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(follow); })();
  }

  /* ---------- text scramble on section labels ---------- */
  const G = "01#/<>_{}$%";
  const scramble = (el) => {
    const end = el.textContent, t0 = performance.now(), dur = 800;
    const step = (t) => {
      const p = clamp((t - t0) / dur, 0, 1), n = Math.floor(p * end.length);
      el.textContent = end.slice(0, n) + [...end.slice(n)].map((c) => (c === " " ? c : G[Math.floor(Math.random() * G.length)])).join("");
      if (p < 1) requestAnimationFrame(step); else el.textContent = end;
    };
    requestAnimationFrame(step);
  };
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); scramble(e.target); } }), { threshold: 0.8 });
    $$(".idx").forEach((el) => io.observe(el));
  }
})();
