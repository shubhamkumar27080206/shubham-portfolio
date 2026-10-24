/* Small AI-agent avatar that walks along the bottom of the page as you scroll. */
(() => {
  "use strict";
  const D = window.PORTFOLIO || {};
  const tips = (D.agent && D.agent.tips) || {};
  const name = (D.agent && D.agent.name) || "Ops-Bot";
  const W = () => (innerWidth < 600 ? 44 : 54);

  const el = document.createElement("div");
  el.className = "agent";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `
    <div class="agent-body" id="agentBody">
      <div class="agent-bubble" id="agentBubble"></div>
      <svg viewBox="0 0 60 84" xmlns="http://www.w3.org/2000/svg">
        <ellipse class="a-shadow" cx="30" cy="81" rx="15" ry="3"/>
        <g class="leg l1"><rect class="a-limb" x="21" y="58" width="8" height="19" rx="4"/><rect class="a-foot" x="18" y="74" width="13" height="6" rx="3"/></g>
        <g class="leg l2"><rect class="a-limb" x="31" y="58" width="8" height="19" rx="4"/><rect class="a-foot" x="29" y="74" width="13" height="6" rx="3"/></g>
        <g class="bob">
          <g class="arm a1"><rect class="a-limb" x="10" y="40" width="7" height="17" rx="3.5"/></g>
          <g class="arm a2"><rect class="a-limb" x="43" y="40" width="7" height="17" rx="3.5"/></g>
          <rect class="a-body" x="17" y="37" width="26" height="23" rx="8"/>
          <rect class="a-chest" x="24" y="44" width="12" height="8" rx="3"/>
          <circle class="a-core" cx="30" cy="48" r="2.4"/>
          <line class="a-stem" x1="30" y1="12" x2="30" y2="5"/>
          <circle class="ant" cx="30" cy="4" r="3"/>
          <rect class="a-head" x="13" y="11" width="34" height="26" rx="10"/>
          <rect class="a-visor" x="18" y="17" width="24" height="13" rx="6"/>
          <g class="eyes"><circle cx="25.5" cy="23.5" r="2.4"/><circle cx="34.5" cy="23.5" r="2.4"/></g>
        </g>
      </svg>
    </div>`;
  const track = document.createElement("div");
  track.className = "agent-track";
  track.setAttribute("aria-hidden", "true");
  document.body.append(track, el);

  const body = el.querySelector("#agentBody"), bubble = el.querySelector("#agentBubble");
  let lastY = scrollY, tick = false, stopT = 0, hideT = 0, x = 8;

  const place = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
    x = 8 + p * Math.max(0, innerWidth - W() - 16);
    body.style.setProperty("--ax", x.toFixed(1) + "px");
    bubble.classList.toggle("r", x > innerWidth * 0.5);
  };
  const say = (text, ms = 3200) => {
    if (!text) return;
    bubble.textContent = text;
    bubble.classList.add("show");
    clearTimeout(hideT);
    hideT = setTimeout(() => bubble.classList.remove("show"), ms);
  };

  addEventListener("scroll", () => {
    const dy = scrollY - lastY; lastY = scrollY;
    if (dy) {
      el.classList.add("walk");
      el.classList.toggle("back", dy < 0);
      clearTimeout(stopT);
      stopT = setTimeout(() => el.classList.remove("walk"), 260);
    }
    if (tick) return; tick = true;
    requestAnimationFrame(() => { place(); tick = false; });
  }, { passive: true });
  addEventListener("resize", place);
  place();

  /* comment on whichever section the reader is in */
  if ("IntersectionObserver" in window) {
    let cur = "", ready = false;
    setTimeout(() => (ready = true), 1500);
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting || e.target.id === cur) return;
      cur = e.target.id;
      if (ready) say(tips[cur]);
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
  }
  setTimeout(() => say(tips.home, 4200), 1400);
})();
