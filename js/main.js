/* Renders the portfolio from window.PORTFOLIO (js/data.js) and adds the interactions. */
(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");

  const svg = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const ICON = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    download: svg('<path d="M12 3v12M7 10l5 5 5-5M5 20h14"/>'),
    in: svg('<path d="M6.5 9.5v8M6.5 6.2v.1M10.5 17.5v-8m0 3.2c0-1.9 1.3-3.2 3-3.2s3 1.2 3 3.4v4.8"/><rect x="3" y="3" width="18" height="18" rx="4"/>'),
    gh: svg('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 8 9 6 9-6"/>'),
    pin: svg('<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    wa: svg('<path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c0 3.5 3 6.500 6.500 6.500l1-1.500-2-1-1 .8c-1-.4-1.800-1.200-2.200-2.200l.8-1-1-2z"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.500 3 14.500 0 18M12 3c-3 3.500-3 14.500 0 18"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>')
  };

  /* ---------- helpers ---------- */
  const monthsSince = (iso) => {
    const s = new Date(iso), n = new Date();
    let m = (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth());
    if (n.getDate() < s.getDate()) m--;
    return Math.max(0, m);
  };
  const toast = (msg) => {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200);
  };
  const reveal = (root = document) => {
    const els = $$(".reveal:not(.in)", root);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
  };
  const addReveal = (el, i = 0) => { el.classList.add("reveal"); el.style.setProperty("--d", `${Math.min(i, 8) * 0.07}s`); return el; };

  /* ---------- static bits ---------- */
  document.title = `${D.name} | ${D.title}`;
  $("#year").textContent = new Date().getFullYear();
  $("#status").textContent = D.status;
  $("#lead").textContent = D.lead;
  $("#pName").textContent = D.name;
  $("#pLoc").textContent = D.location;
  $$("[data-icon]").forEach((n) => (n.outerHTML = ICON[n.dataset.icon] || ""));
  $("#resumeBtn").href = D.resume;
  $("#liBtn").href = D.linkedin;
  const waHref = D.whatsapp ? `https://wa.me/${D.whatsapp}${D.whatsappText ? "?text=" + encodeURIComponent(D.whatsappText) : ""}` : "";
  $("#mailBtn").href = `mailto:${D.email}`;
  if (waHref) $("#waBtn").href = waHref; else $("#waBtn").hidden = true;
  if (D.github) { const g = $("#ghBtn"); g.href = D.github; g.hidden = false; }

  /* ---------- nav ---------- */
  const NAV = [["about", "About"], ["toolkit", "Toolkit"], ["experience", "Experience"], ["cicd", "CI/CD"], ["projects", "Projects"], ["credentials", "Credentials"], ["contact", "Contact"]];
  const links = $("#links");
  links.innerHTML = NAV.map(([id, l]) => `<a href="#${id}" data-id="${id}">${l}</a>`).join("");
  const menu = $("#menu");
  const closeMenu = () => { links.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => { const o = links.classList.toggle("open"); menu.setAttribute("aria-expanded", String(o)); });
  links.addEventListener("click", (e) => e.target.closest("a") && closeMenu());
  addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  const secs = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) $$("a", links).forEach((a) => a.classList.toggle("on", a.dataset.id === e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => spy.observe(s));
  }

  /* ---------- theme ---------- */
  const themeBtn = $("#theme");
  const paintTheme = () => {
    const t = document.documentElement.dataset.theme;
    themeBtn.innerHTML = t === "dark" ? ICON.sun : ICON.moon;
    document.querySelector('meta[name="theme-color"]').content = t === "dark" ? "#060b16" : "#f3f6fb";
  };
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    paintTheme();
  });
  paintTheme();

  /* ---------- scroll: progress + sticky nav ---------- */
  const bar = $("#progress"), nav = $("#nav");
  let tick = false;
  const onScroll = () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      nav.classList.toggle("stuck", scrollY > 24);
      tick = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- cursor glow ---------- */
  const glow = $("#glow");
  addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") { glow.style.setProperty("--mx", e.clientX + "px"); glow.style.setProperty("--my", e.clientY + "px"); } }, { passive: true });

  /* ---------- hero: stats, typing ---------- */
  const months = monthsSince(D.careerStart);
  const yrs = Math.floor(months / 12), mos = months % 12;
  const heroStats = [
    { prefix: "", value: yrs, suffix: "+", label: `Years of experience (${yrs} yrs ${mos} mos)` },
    { prefix: "", value: 99.9, dec: 1, suffix: "%", label: "Uptime for an e-commerce client" },
    { prefix: "", value: 60, suffix: "%+", label: "Less manual provisioning" },
    { prefix: "", value: 6, suffix: "", label: "Cloud & DevOps certifications" }
  ];
  $("#heroStats").innerHTML = heroStats.map((s) => `<div class="stat"><b data-count data-value="${s.value}" data-dec="${s.dec || 0}" data-prefix="${esc(s.prefix)}" data-suffix="${esc(s.suffix)}">${s.prefix}${s.value}${s.suffix}</b><span>${esc(s.label)}</span></div>`).join("");

  const typed = $("#typed");
  if (reduce) typed.textContent = D.roles[0];
  else {
    let i = 0, j = 0, del = false;
    const step = () => {
      const w = D.roles[i];
      typed.textContent = w.slice(0, j);
      if (!del && j === w.length) { del = true; return setTimeout(step, 1700); }
      if (del && j === 0) { del = false; i = (i + 1) % D.roles.length; }
      j += del ? -1 : 1;
      setTimeout(step, del ? 24 : 52);
    };
    step();
  }

  /* ---------- marquee ---------- */
  const mq = D.marquee.map((w) => `<span>${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = mq + mq;

  /* ---------- about ---------- */
  $("#aboutCopy").innerHTML = D.summary.map((p) => `<p>${esc(p)}</p>`).join("") +
    `<div class="chips-row">${["AWS Certified SA – Associate", "99.9% uptime", "Terraform IaC", "EKS / ECS", "CI/CD", "RCA & SRE", "Azure · GCP"].map((c) => `<span class="chip">${c}</span>`).join("")}</div>`;

  const term = $("#term");
  let termDone = false;
  const runTerm = () => {
    if (termDone) return; termDone = true;
    if (reduce) {
      term.innerHTML = D.terminal.map((l) => `<div class="cmd">${esc(l.cmd)}</div><span class="out">${esc(l.out)}</span>`).join("");
      return;
    }
    let li = 0;
    const next = () => {
      if (li >= D.terminal.length) { term.insertAdjacentHTML("beforeend", `<div class="cmd"><span class="cur"></span></div>`); return; }
      const { cmd, out } = D.terminal[li++];
      const row = document.createElement("div"); row.className = "cmd"; term.appendChild(row);
      let k = 0;
      const type = () => {
        row.textContent = cmd.slice(0, ++k);
        if (k < cmd.length) return setTimeout(type, 28);
        const o = document.createElement("span"); o.className = "out"; o.textContent = out; term.appendChild(o);
        setTimeout(next, 420);
      };
      type();
    };
    next();
  };
  if ("IntersectionObserver" in window) {
    const tio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { runTerm(); tio.disconnect(); } }), { threshold: 0.35 });
    tio.observe(term);
  } else runTerm();

  /* ---------- toolkit ---------- */
  const tabs = $("#tabs"), grid = $("#tkGrid"), search = $("#skillSearch");
  const cats = ["All", ...D.skills.map((s) => s.name)];
  let activeTab = "All";
  tabs.innerHTML = cats.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  grid.innerHTML = D.skills.map((s, i) => `
    <article class="card tk-card reveal" data-cat="${esc(s.name)}" style="--d:${Math.min(i, 6) * 0.06}s">
      <h3>${esc(s.name)} <small>${pad(i + 1)}</small></h3>
      <div class="chips">${s.items.map((t) => `<span class="chip" data-t="${esc(t.toLowerCase())}">${esc(t)}</span>`).join("")}</div>
    </article>`).join("") + `<p class="empty" id="tkEmpty" hidden>No tools match that filter.</p>`;

  const filterTools = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    $$(".tk-card", grid).forEach((card) => {
      const inTab = activeTab === "All" || card.dataset.cat === activeTab;
      const chips = $$(".chip", card);
      let matches = 0;
      chips.forEach((c) => {
        const hit = q && c.dataset.t.includes(q);
        c.classList.toggle("hit", !!hit);
        c.classList.toggle("dim", !!q && !hit);
        if (hit) matches++;
      });
      const visible = inTab && (!q || matches > 0);
      card.classList.toggle("gone", !visible);
      if (visible) { shown++; card.classList.add("in"); }
    });
    $("#tkEmpty").hidden = shown > 0;
  };
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab"); if (!b) return;
    activeTab = b.dataset.cat;
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", String(t === b)));
    filterTools();
  });
  search.addEventListener("input", filterTools);

  /* ---------- impact ---------- */
  $("#impactGrid").innerHTML = D.impact.map((m, i) => `
    <article class="card imp reveal" style="--d:${i * 0.08}s">
      <b data-count data-value="${m.value}" data-dec="${m.dec || 0}" data-prefix="${esc(m.prefix)}" data-suffix="${esc(m.suffix)}">${esc(m.prefix)}${m.value}${esc(m.suffix)}</b>
      <strong>${esc(m.label)}</strong>
      <p>${esc(m.detail)}</p>
    </article>`).join("");

  /* ---------- experience ---------- */
  const SHOW = 4;
  $("#timeline").innerHTML = D.experience.map((j, i) => `
    <article class="card job reveal ${j.current ? "current" : ""}" style="--d:${i * 0.1}s">
      <div class="job-top"><h3>${esc(j.role)}</h3><span class="when">${esc(j.period)}</span></div>
      <p class="where"><b>${esc(j.company)}</b> · ${esc(j.place)}</p>
      <ul>${j.bullets.map((b, k) => `<li class="${k >= SHOW ? "extra" : ""}">${esc(b)}</li>`).join("")}</ul>
      ${j.bullets.length > SHOW ? `<button class="more" type="button" aria-expanded="false">Show all ${j.bullets.length} highlights ↓</button>` : ""}
      <div class="chips">${j.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    </article>`).join("");
  $("#timeline").addEventListener("click", (e) => {
    const b = e.target.closest(".more"); if (!b) return;
    const job = b.closest(".job"), open = job.classList.toggle("open");
    b.setAttribute("aria-expanded", String(open));
    b.textContent = open ? "Show less ↑" : `Show all ${$$("li", job).length} highlights ↓`;
  });

  /* ---------- projects ---------- */
  const pg = $("#projGrid");
  pg.innerHTML = D.projects.map((p, i) => `
    <article class="card proj reveal" style="--d:${(i % 2) * 0.1}s">
      <span class="num">${pad(i + 1)} / ${pad(D.projects.length)}</span>
      <h3>${esc(p.title)}</h3>
      <div class="metric"><b>${esc(p.metric)}</b><span>${esc(p.metricLabel)}</span></div>
      <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      <div class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    </article>`).join("");
  if (matchMedia("(hover: hover)").matches && !reduce) {
    $$(".proj", pg).forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--px", x * 100 + "%"); c.style.setProperty("--py", y * 100 + "%");
        c.style.setProperty("--ry", (x - 0.5) * 6 + "deg"); c.style.setProperty("--rx", (0.5 - y) * 6 + "deg");
      });
      c.addEventListener("pointerleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- certs + education ---------- */
  $("#certGrid").innerHTML = D.certifications.map((c, i) => `
    <article class="card cert reveal ${c.featured ? "featured" : ""}" style="--d:${(i % 3) * 0.08}s">
      <div class="badge" aria-hidden="true">${esc(c.short)}</div>
      <div><b>${esc(c.name)}</b><small>${esc(c.issuer)}</small></div>
    </article>`).join("");
  $("#eduGrid").innerHTML = D.education.map((e, i) => `
    <article class="card edu reveal" style="--d:${i * 0.07}s"><span class="yr">${esc(e.period)}</span><b>${esc(e.degree)}</b><span>${esc(e.school)}</span></article>`).join("");

  /* ---------- contact ---------- */
  const SOC = { github: "GitHub", x: "X / Twitter", instagram: "Instagram", youtube: "YouTube", leetcode: "LeetCode", medium: "Medium" };
  const tel = D.phone ? D.phone.replace(/[^\d+]/g, "") : "";
  const items = [
    { icon: "mail", label: "Email", value: D.email, href: `mailto:${D.email}` },
    waHref && { icon: "wa", label: "WhatsApp", value: "+" + D.whatsapp.replace(/^(\d{2})(\d+)/, "$1 $2"), href: waHref, ext: true },
    D.showPhone && D.phone && { icon: "phone", label: "Call", value: D.phone, href: `tel:${tel}` },
    { icon: "in", label: "LinkedIn", value: D.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: D.linkedin, ext: true },
    D.github && { icon: "gh", label: "GitHub", value: D.github.replace(/^https?:\/\/(www\.)?/, ""), href: D.github, ext: true },
    ...Object.entries(D.social || {}).filter(([k, v]) => v && k !== "github").map(([k, v]) => ({ icon: "globe", label: SOC[k] || k, value: v.replace(/^https?:\/\/(www\.)?/, ""), href: v, ext: true })),
    { icon: "pin", label: "Location", value: D.location }
  ].filter(Boolean);

  /* floating contact dock */
  $("#dock").innerHTML = items.filter((it) => it.href).map((it) =>
    `<a class="dk dk-${it.icon}" href="${esc(it.href)}" ${it.ext ? 'target="_blank" rel="noopener"' : ""} aria-label="${esc(it.label)}"><span class="dk-t">${esc(it.label)}</span>${ICON[it.icon]}</a>`).join("");
  $("#contactList").innerHTML = items.map((it, i) => {
    const inner = `${ICON[it.icon]}<span><small>${it.label}</small><b>${esc(it.value)}</b></span>`;
    if (it.copy) return `<li><button class="c-item" type="button" data-copy="${esc(it.copy)}" aria-label="Copy email address">${inner}</button></li>`;
    if (it.href) return `<li><a class="c-item" href="${esc(it.href)}" ${it.ext ? 'target="_blank" rel="noopener"' : ""}>${inner}</a></li>`;
    return `<li><div class="c-item">${inner}</div></li>`;
  }).join("");
  $("#contactList").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); toast("Email copied to clipboard"); }
    catch (err) { location.href = `mailto:${b.dataset.copy}`; }
  });

  const form = $("#form"), note = $("#formNote");
  const KNOWN = { "instagram.com": "Instagram", "l.instagram.com": "Instagram", "linkedin.com": "LinkedIn", "lnkd.in": "LinkedIn", "t.co": "X / Twitter", "github.com": "GitHub", "google.com": "Google", "facebook.com": "Facebook", "wa.me": "WhatsApp" };
  const cameFrom = () => {
    const q = new URLSearchParams(location.search); let host = "";
    try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""; } catch (e) {}
    return q.get("utm_source") || q.get("ref") || KNOWN[host] || host || "Direct";
  };
  let mode = "wa";
  form.addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) mode = b.dataset.mode; });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(form), v = (k) => (f.get(k) || "").toString().trim();
    if (v("company")) return;
    let ok = true;
    $$("input[required],textarea[required]", form).forEach((el) => {
      const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value.trim()));
      el.classList.toggle("invalid", bad); if (bad) ok = false;
    });
    if (!ok) { note.textContent = "Please fill in name, a valid email and a message."; return; }
    const data = { name: v("name"), email: v("email"), phone: v("phone"), message: v("message"), source: cameFrom() };
    const text = `New portfolio enquiry\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\nCame from: ${data.source}\n\n${data.message}`;
    if (mode === "email") {
      note.textContent = "Opening your email app…";
      location.href = `mailto:${D.email}?subject=${encodeURIComponent("Portfolio enquiry from " + data.name)}&body=${encodeURIComponent(text)}`;
      return;
    }
    note.textContent = "Sending…";
    try {
      const r = await fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (r.ok) { note.textContent = "Sent. Shubham got your message on WhatsApp and will reply soon."; form.reset(); return; }
    } catch (err) {}
    note.textContent = "Opening WhatsApp so you can send it…";
    window.open(`https://wa.me/${D.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  /* ---------- counters ---------- */
  const startCount = (n) => {
    const end = +n.dataset.value, dec = +n.dataset.dec || 0, pre = n.dataset.prefix || "", suf = n.dataset.suffix || "";
    if (reduce) { n.textContent = pre + end.toFixed(dec) + suf; return; }
    const t0 = performance.now(), dur = 1500;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      n.textContent = pre + (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { cio.unobserve(e.target); startCount(e.target); } }), { threshold: 0.6 });
    $$("[data-count]").forEach((n) => { n.textContent = (n.dataset.prefix || "") + (+n.dataset.dec ? (0).toFixed(+n.dataset.dec) : "0") + (n.dataset.suffix || ""); cio.observe(n); });
  }

  /* ---------- hero network canvas ---------- */
  (function network() {
    const c = $("#net"); if (!c || reduce) return;
    const ctx = c.getContext("2d"), hero = $("#home");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, pts = [], run = true, mouse = { x: -999, y: -999 };
    let rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "77,163,255";
    new MutationObserver(() => { rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const size = () => {
      const r = hero.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(95, Math.floor((w * h) / 15000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.4 + 0.6 }));
    };
    const frame = () => {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(${rgb},.75)`; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 16900) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / 16900) * 0.28})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
        if (md < 24000) { ctx.strokeStyle = `rgba(${rgb},${(1 - md / 24000) * 0.55})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      requestAnimationFrame(frame);
    };
    hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 150); });
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { const was = run; run = e.isIntersecting; if (run && !was) frame(); }).observe(hero);
    size(); frame();
  })();

  /* ---------- go ---------- */
  reveal();
})();
