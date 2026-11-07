/* =========================================================
 * Viz — 학습용 시각화 엔진
 * type: flow | loop | hub | sequence | tree | layers | compare
 * ========================================================= */
(function () {
  const NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs = {}, html) {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function s(tag, attrs = {}, text) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* 단계 넘김 컨트롤 (이전/다음/자동재생) */
  function stepper(container, count, onStep, opts = {}) {
    let cur = -1, timer = null;
    const ctr = el("div", { class: "viz-controls" });
    const prev = el("button", { class: "btn small", type: "button" }, "◀ 이전");
    const next = el("button", { class: "btn small primary", type: "button" }, "다음 ▶");
    const play = el("button", { class: "btn small", type: "button" }, "⟳ 자동 재생");
    const text = el("div", { class: "viz-step-text" }, opts.startText || "▶ <b>다음</b> 버튼을 눌러 단계별로 따라가 보세요. 각 요소를 직접 클릭해도 됩니다.");
    ctr.append(prev, next, play, text);
    container.appendChild(ctr);
    function go(i) {
      cur = Math.max(-1, Math.min(count - 1, i));
      text.innerHTML = onStep(cur) || text.innerHTML;
      prev.disabled = cur <= 0;
      next.textContent = cur >= count - 1 ? "처음부터 ↺" : "다음 ▶";
    }
    prev.onclick = () => { stop(); go(cur - 1); };
    next.onclick = () => { stop(); go(cur >= count - 1 ? 0 : cur + 1); };
    function stop() { if (timer) { clearInterval(timer); timer = null; play.textContent = "⟳ 자동 재생"; } }
    play.onclick = () => {
      if (timer) return stop();
      play.textContent = "■ 정지";
      if (cur >= count - 1) go(-1);
      go(cur + 1);
      timer = setInterval(() => {
        if (!document.body.contains(container)) return stop();
        if (cur >= count - 1) return stop();
        go(cur + 1);
      }, opts.interval || 2200);
    };
    prev.disabled = true;
    return { go: (i) => { stop(); go(i); } };
  }

  function stepHtml(i, item) {
    return `<b>${i + 1}. ${esc(item.t)}</b> — ${item.x || esc(item.d || "")}`;
  }

  /* ---------- flow ---------- */
  function flow(spec, root) {
    const wrap = el("div", { class: "flow" });
    const nodes = [], arrows = [];
    spec.steps.forEach((st, i) => {
      if (i > 0) { const a = el("div", { class: "flow-arrow" }, "➜"); arrows.push(a); wrap.appendChild(a); }
      const n = el("div", { class: "flow-step" }, `<div class="fi">${st.i || "•"}</div><b>${esc(st.t)}</b><span>${esc(st.d || "")}</span>`);
      n.onclick = () => ctl.go(i);
      nodes.push(n); wrap.appendChild(n);
    });
    root.appendChild(wrap);
    const ctl = stepper(root, spec.steps.length, (i) => {
      nodes.forEach((n, k) => n.classList.toggle("on", k <= i));
      arrows.forEach((a, k) => a.classList.toggle("on", k < i));
      if (i >= 0) nodes[i].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      return i < 0 ? null : stepHtml(i, spec.steps[i]);
    });
  }

  /* ---------- loop (순환) ---------- */
  function loop(spec, root) {
    const n = spec.steps.length, W = 640, H = 400, cx = W / 2, cy = H / 2, R = 145;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" });
    const defs = s("defs");
    defs.innerHTML = `<marker id="arrL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>`;
    svg.appendChild(defs);
    const pts = spec.steps.map((_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + R * 1.35 * Math.cos(a), cy + R * Math.sin(a)];
    });
    const edges = [];
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % n];
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
      const c = [mx + (dx / d) * 40, my + (dy / d) * 40];
      const path = s("path", { d: `M${p[0]},${p[1]} Q${c[0]},${c[1]} ${q[0]},${q[1]}`, class: "svg-edge" });
      edges.push(path); svg.appendChild(path);
    });
    const center = s("g", { class: "svg-node center" });
    center.appendChild(s("circle", { cx, cy, r: 62 }));
    const ct = (spec.center || "에이전트").split("\n");
    ct.forEach((line, k) => center.appendChild(s("text", { x: cx, y: cy + 5 + (k - (ct.length - 1) / 2) * 18, "text-anchor": "middle", "font-weight": 700 }, line)));
    svg.appendChild(center);
    const nodes = spec.steps.map((st, i) => {
      const g = s("g", { class: "svg-node", style: "cursor:pointer" });
      const [x, y] = pts[i];
      g.appendChild(s("rect", { x: x - 78, y: y - 28, width: 156, height: 56, rx: 12 }));
      g.appendChild(s("text", { x, y: y - 3, "text-anchor": "middle", "font-weight": 700 }, `${st.i || ""} ${st.t}`));
      g.appendChild(s("text", { x, y: y + 15, "text-anchor": "middle", class: "sub" }, st.d || ""));
      g.addEventListener("click", () => ctl.go(i));
      svg.appendChild(g);
      return g;
    });
    root.appendChild(svg);
    const ctl = stepper(root, n, (i) => {
      nodes.forEach((g, k) => g.classList.toggle("on", k === i));
      edges.forEach((e, k) => e.classList.toggle("on", k === i));
      return i < 0 ? null : stepHtml(i, spec.steps[i]);
    });
  }

  /* ---------- hub (중심 + 연결) ---------- */
  function hub(spec, root) {
    const n = spec.nodes.length, W = 680, H = 420, cx = W / 2, cy = H / 2;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}` });
    const pts = spec.nodes.map((_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + 255 * Math.cos(a), cy + 160 * Math.sin(a)];
    });
    const edges = pts.map((p) => { const e = s("line", { x1: cx, y1: cy, x2: p[0], y2: p[1], class: "svg-edge" }); svg.appendChild(e); return e; });
    const labels = spec.nodes.map((nd, i) => {
      const [x, y] = pts[i];
      const t = s("text", { x: (cx + x) / 2, y: (cy + y) / 2 - 6, "text-anchor": "middle", class: "svg-msg", opacity: 0 }, nd.via || "");
      svg.appendChild(t); return t;
    });
    const center = s("g", { class: "svg-node center" });
    center.appendChild(s("circle", { cx, cy, r: 58 }));
    const ct = (spec.center || "Claude").split("\n");
    ct.forEach((line, k) => center.appendChild(s("text", { x: cx, y: cy + 5 + (k - (ct.length - 1) / 2) * 18, "text-anchor": "middle", "font-weight": 700 }, line)));
    svg.appendChild(center);
    const nodes = spec.nodes.map((nd, i) => {
      const [x, y] = pts[i];
      const g = s("g", { class: "svg-node", style: "cursor:pointer" });
      g.appendChild(s("rect", { x: x - 70, y: y - 26, width: 140, height: 52, rx: 12 }));
      g.appendChild(s("text", { x, y: y - 3, "text-anchor": "middle", "font-weight": 700 }, `${nd.i || ""} ${nd.t}`));
      g.appendChild(s("text", { x, y: y + 14, "text-anchor": "middle", class: "sub" }, nd.d || ""));
      g.addEventListener("click", () => ctl.go(i));
      svg.appendChild(g); return g;
    });
    root.appendChild(svg);
    const ctl = stepper(root, n, (i) => {
      nodes.forEach((g, k) => g.classList.toggle("on", k === i));
      edges.forEach((e, k) => e.classList.toggle("on", k === i));
      labels.forEach((l, k) => l.setAttribute("opacity", k === i ? 1 : 0));
      return i < 0 ? null : stepHtml(i, spec.nodes[i]);
    });
  }

  /* ---------- sequence (액터 간 메시지 흐름) ---------- */
  function sequence(spec, root) {
    const A = spec.actors, M = spec.msgs;
    const colW = Math.max(130, Math.min(170, 680 / A.length));
    const W = colW * A.length + 20, top = 64, rowH = 46, H = top + M.length * rowH + 30;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}` });
    const defs = s("defs");
    defs.innerHTML = `<marker id="arrS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)"/></marker>`;
    svg.appendChild(defs);
    const x = (i) => 10 + colW * i + colW / 2;
    A.forEach((a, i) => {
      svg.appendChild(s("line", { x1: x(i), y1: top - 8, x2: x(i), y2: H - 10, class: "lane-line" }));
      const g = s("g", { class: "svg-node" + (a.center ? " center" : "") });
      g.appendChild(s("rect", { x: x(i) - colW / 2 + 8, y: 8, width: colW - 16, height: 44, rx: 10 }));
      g.appendChild(s("text", { x: x(i), y: 35, "text-anchor": "middle", "font-weight": 700 }, `${a.i || ""} ${a.t}`));
      svg.appendChild(g);
    });
    const idx = (name) => A.findIndex((a) => a.t === name);
    const items = M.map((m, k) => {
      const g = s("g", { opacity: 0.12, style: "transition:opacity .35s" });
      const y = top + 26 + k * rowH;
      const f = idx(m.from), t = idx(m.to);
      if (f === t) {
        const bw = Math.min(W - 20, Math.max(colW - 28, m.t.length * 12 + 24));
        const bx = Math.max(10, Math.min(W - 10 - bw, x(f) - bw / 2));
        g.appendChild(s("rect", { x: bx, y: y - 18, width: bw, height: 28, rx: 8, style: "fill:color-mix(in srgb,var(--accent) 14%,var(--panel-2));stroke:var(--accent)" }));
        g.appendChild(s("text", { x: bx + bw / 2, y: y + 1, "text-anchor": "middle", class: "svg-msg", style: "font-size:12.5px" }, m.t));
      } else {
        g.appendChild(s("line", { x1: x(f), y1: y, x2: x(t) + (t > f ? -4 : 4), y2: y, class: "svg-edge on", "marker-end": "url(#arrS)" }));
        g.appendChild(s("text", { x: (x(f) + x(t)) / 2, y: y - 8, "text-anchor": "middle", class: "svg-msg" }, m.t));
      }
      svg.appendChild(g);
      return g;
    });
    root.appendChild(svg);
    stepper(root, M.length, (i) => {
      items.forEach((g, k) => {
        g.setAttribute("opacity", k < i ? 0.7 : k === i ? 1 : 0.15);
        const line = g.querySelector("line");
        if (line) line.classList.toggle("on", k === i);
      });
      return i < 0 ? null : `<b>${i + 1}. ${esc(M[i].from)} → ${esc(M[i].to)}</b> — ${M[i].x || esc(M[i].t)}`;
    }, { interval: 2000 });
  }

  /* ---------- tree (파일 구조) ---------- */
  function tree(spec, root) {
    const box = el("div", { class: "tree" });
    spec.items.forEach((it) => {
      const row = el("div", { class: "tree-row" });
      row.innerHTML = `<span class="tn ${it.dir ? "dir" : ""} ${it.hl ? "hl" : ""}">${esc(it.n)}</span><span class="ta">${it.a ? "← " + esc(it.a) : ""}</span>`;
      box.appendChild(row);
    });
    root.appendChild(box);
  }

  /* ---------- layers (계층 구조) ---------- */
  function layers(spec, root) {
    const box = el("div", { class: "layers" });
    spec.layers.forEach((l) => {
      const row = el("div", { class: "layer" });
      row.innerHTML = `<div class="ln">${l.i || ""} ${esc(l.n)}</div><div class="lc">${(l.chips || []).map((c) => `<span class="chip">${esc(c)}</span>`).join("")}${l.d ? `<span style="color:var(--text-2);font-size:.85rem">${esc(l.d)}</span>` : ""}</div>`;
      box.appendChild(row);
    });
    root.appendChild(box);
  }

  /* ---------- compare (나쁜 예 vs 좋은 예) ---------- */
  function compare(spec, root) {
    const box = el("div", { class: "compare" });
    box.innerHTML = `
      <div class="cbad"><h4>❌ ${esc(spec.bad.h || "나쁜 예")}</h4><pre>${esc(spec.bad.code)}</pre>${spec.bad.note ? `<div class="cnote">${spec.bad.note}</div>` : ""}</div>
      <div class="cok"><h4>✅ ${esc(spec.good.h || "좋은 예")}</h4><pre>${esc(spec.good.code)}</pre>${spec.good.note ? `<div class="cnote">${spec.good.note}</div>` : ""}</div>`;
    root.appendChild(box);
  }

  const TYPES = { flow, loop, hub, sequence, tree, layers, compare };

  window.Viz = {
    render(spec) {
      const root = el("div", { class: "viz" });
      if (spec.title) root.appendChild(el("div", { class: "viz-title" }, "📊 " + esc(spec.title)));
      if (spec.desc) root.appendChild(el("div", { class: "viz-desc" }, spec.desc));
      (TYPES[spec.type] || flow)(spec, root);
      return root;
    },
    el, esc,
  };
})();
