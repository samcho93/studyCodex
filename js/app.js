/* =========================================================
 * App — 라우팅, 진도 관리, 페이지 렌더링
 * ========================================================= */
(function () {
  const { el, esc } = window.Viz;
  const SITE = window.SITE || {};
  const TITLE = SITE.title || "클로드 AI 배우기";
  const WEEKS = SITE.weeks || [
    { n: 1, t: "1주차 — 기초", d: "설치부터 첫 번째 빌드까지, Claude Code 와 친해지기", c: "var(--w1)", i: "🧭" },
    { n: 2, t: "2주차 — 코딩 워크플로우", d: "프롬프트·설계·리뷰·문서·테스트·리팩토링", c: "var(--w2)", i: "🔍" },
    { n: 3, t: "3주차 — 자동화", d: "훅·MCP·헤드리스 실행·슬랙·CI/CD·SDK", c: "var(--w3)", i: "⚡" },
    { n: 4, t: "4주차 — 고급 시스템", d: "서브에이전트·멀티 에이전트·운영과 아키텍처", c: "var(--w4)", i: "🚀" },
  ];
  const LESSONS = [].concat(window.WEEK1 || [], window.WEEK2 || [], window.WEEK3 || [], window.WEEK4 || []);
  const byId = (id) => LESSONS.find((l) => l.id === id);

  /* ---------- 저장소 (실패해도 동작) ---------- */
  const KEY = SITE.storageKey || "claude-study-progress-v1";
  let store = { practice: {}, checks: {}, done: {}, theme: null };
  try { Object.assign(store, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  function lessonDone(l) { return !!store.done[l.id]; }
  function practiceCount(l) {
    const n = (l.practice || []).length;
    const d = (l.practice || []).filter((_, i) => store.practice[`${l.id}-${i}`]).length;
    return { n, d };
  }

  /* ---------- 공통 UI ---------- */
  let toastT;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = el("div", { class: "toast" }); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800);
  }
  function copy(text) {
    const ok = () => toast("📋 복사했습니다");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
    function fallback() {
      const ta = el("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { toast("복사에 실패했습니다"); }
      ta.remove();
    }
  }

  /* 간단한 문법 강조 */
  function highlight(code, lang) {
    let h = esc(code);
    if (lang === "bash" || lang === "shell" || lang === "powershell") {
      h = h.split("\n").map((ln) => {
        if (/^\s*#/.test(ln)) return `<span class="cm">${ln}</span>`;
        return ln.replace(/^(\$ )/, '<span class="pr">$ </span>').replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="st">$1</span>').replace(/(\s)(--?[\w-]+)/g, '$1<span class="nb">$2</span>');
      }).join("\n");
    } else if (lang === "json") {
      h = h.replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="key">$1</span>$2').replace(/(:\s*)(&quot;[^&]*?&quot;)/g, '$1<span class="st">$2</span>').replace(/\b(true|false|null|\d+)\b/g, '<span class="nb">$1</span>');
    } else if (lang === "yaml") {
      h = h.split("\n").map((ln) => /^\s*#/.test(ln) ? `<span class="cm">${ln}</span>` : ln.replace(/^(\s*-?\s*)([\w.-]+)(:)/, '$1<span class="key">$2</span>$3')).join("\n");
    } else if (lang === "md" || lang === "markdown") {
      h = h.split("\n").map((ln) => /^#/.test(ln) ? `<span class="kw">${ln}</span>` : /^---$/.test(ln) ? `<span class="cm">${ln}</span>` : ln.replace(/^(\s*[-*] )/, '<span class="nb">$1</span>')).join("\n");
    } else if (lang === "js" || lang === "ts" || lang === "python" || lang === "py") {
      // 한 번에 토큰화해야 이미 넣은 <span class="..."> 를 다시 건드리지 않음
      h = h.replace(/(\/\/.*$|#.*$)|(&quot;.*?&quot;|`[^`]*`|'[^']*')|\b(import|from|const|let|await|async|for|of|in|function|return|if|else|def|with|as|export|new|print|class)\b/gm,
        (m, c, str, kw) => c ? `<span class="cm">${c}</span>` : str ? `<span class="st">${str}</span>` : `<span class="kw">${kw}</span>`);
    }
    return h;
  }
  function codeBlock(c) {
    const box = el("div", { class: "code" });
    const head = el("div", { class: "code-head" }, `<span class="dots"><i></i><i></i><i></i></span>${esc(c.file || c.lang || "code")}`);
    const btn = el("button", { class: "copy-btn", type: "button" }, "복사");
    btn.onclick = () => copy(c.text.replace(/^\$ /gm, ""));
    head.appendChild(btn);
    box.append(head, el("pre", {}, `<code>${highlight(c.text, c.lang)}</code>`));
    const frag = document.createDocumentFragment();
    frag.appendChild(box);
    if (c.caption) frag.appendChild(el("div", { class: "code-caption" }, c.caption));
    return frag;
  }

  /* ---------- 사이드바 ---------- */
  function renderSidebar(activeId) {
    const sb = document.getElementById("sidebar");
    sb.innerHTML = "";
    const home = el("a", { href: "#/", class: "side-link" + (activeId === "home" ? " active" : "") }, "🗺️ 전체 로드맵");
    sb.appendChild(home);
    sb.appendChild(el("a", { href: "#/cheatsheet", class: "side-link" + (activeId === "cheatsheet" ? " active" : "") }, "⌨️ 명령어 모음"));
    sb.appendChild(el("a", { href: "#/glossary", class: "side-link" + (activeId === "glossary" ? " active" : ""), style: "margin-bottom:12px" }, "📖 용어 사전"));
    WEEKS.forEach((w) => {
      const g = el("div", { class: "side-week" });
      g.appendChild(el("div", { class: "side-week-title" }, `<i style="background:${w.c}"></i>${w.t}`));
      LESSONS.filter((l) => l.week === w.n).forEach((l) => {
        const a = el("a", { href: `#/day/${l.id}`, class: "side-link" + (activeId === l.id ? " active" : "") },
          `<span class="day-no">Day ${String(l.id).padStart(2, "0")}</span><span>${esc(l.title)}</span>${lessonDone(l) ? '<span class="check">✓</span>' : ""}`);
        g.appendChild(a);
      });
      sb.appendChild(g);
    });
  }
  function updateProgress() {
    const d = LESSONS.filter(lessonDone).length;
    document.getElementById("progressPillText").textContent = `${d} / ${LESSONS.length}`;
    document.getElementById("progressPillFill").style.width = (d / LESSONS.length) * 100 + "%";
  }

  /* ---------- 홈 ---------- */
  function renderHome(app) {
    const done = LESSONS.filter(lessonDone).length;
    const next = LESSONS.find((l) => !lessonDone(l)) || LESSONS[0];
    const totalPractice = LESSONS.reduce((a, l) => a + (l.practice || []).length, 0);
    const donePractice = Object.keys(store.practice).length;
    app.innerHTML = `
      <section class="hero">
        <h1>${TITLE}</h1>
        <p>${SITE.tagline || "프롬프팅 기초부터 자율형 개발 시스템 구축까지. 하루 30~60분, <b>4주 24일</b> 과정으로 Claude Code 를 손으로 익힙니다."}</p>
        <div class="hero-cta">
          <a class="btn primary" href="#/day/${next.id}">${done ? "이어서 학습하기" : "로드맵 시작하기"} → Day ${next.id}</a>
          <a class="btn" href="#/cheatsheet">⌨️ 명령어 모음</a>
        </div>
      </section>
      <div class="stats">
        <div class="stat"><b>${done}<small style="font-size:.9rem;color:var(--text-3)"> / ${LESSONS.length}</small></b><span>완료한 레슨</span></div>
        <div class="stat"><b>${donePractice}<small style="font-size:.9rem;color:var(--text-3)"> / ${totalPractice}</small></b><span>완료한 실습</span></div>
        <div class="stat"><b>${Math.round((done / LESSONS.length) * 100)}%</b><span>전체 진도</span></div>
        <div class="stat"><b>Day ${next.id}</b><span>다음 학습: ${esc(next.title)}</span></div>
      </div>
      <div class="how">
        <div class="how-card"><div class="em">📖</div><h4>1. 개념 이해</h4><p>일상 비유와 그림으로 먼저 큰 그림을 잡습니다. 그림은 '다음 ▶' 버튼으로 한 단계씩 움직입니다.</p></div>
        <div class="how-card"><div class="em">💻</div><h4>2. 브라우저 실습</h4><p>터미널 시뮬레이터, 설정 파일 작성기, 퀴즈로 안전하게 연습합니다. 아무것도 설치하지 않아도 됩니다.</p></div>
        <div class="how-card"><div class="em">🛠️</div><h4>3. 내 PC 에서 따라하기</h4><p>코드 블록의 '복사' 버튼으로 명령을 가져가 실제 터미널에서 실행해 보세요.</p></div>
      </div>
      <div id="weeks"></div>`;
    const weeks = app.querySelector("#weeks");
    WEEKS.forEach((w) => {
      const band = el("section", { class: "week-band", style: `--wc:${w.c}` });
      band.innerHTML = `<div class="week-head"><span class="week-badge">${w.i} ${w.t}</span><p>${w.d}</p><span class="week-line"></span></div>`;
      const grid = el("div", { class: "day-grid" });
      LESSONS.filter((l) => l.week === w.n).forEach((l) => {
        const pc = practiceCount(l);
        const a = el("a", { href: `#/day/${l.id}`, class: "day-card" + (lessonDone(l) ? " done" : ""), style: `--wc:${w.c}` });
        a.innerHTML = `<span class="d">Day ${String(l.id).padStart(2, "0")}</span><span class="ic">${l.icon}</span><h4>${esc(l.title)}</h4><p>${esc(l.subtitle)}</p>
          <div class="meta"><span class="tag">⏱ ${l.time}</span><span class="tag">실습 ${pc.d}/${pc.n}</span></div>`;
        grid.appendChild(a);
      });
      band.appendChild(grid);
      weeks.appendChild(band);
    });
    const tip = el("div", { class: "callout", style: "margin-top:30px" }, "<b>📌 이 강좌를 듣는 방법</b> 순서대로 들으면 가장 좋지만, 이미 아는 내용은 건너뛰어도 됩니다. 진도는 이 브라우저에 자동 저장됩니다. 각 레슨의 실습을 모두 끝내면 자동으로 '완료' 표시가 됩니다.");
    app.appendChild(tip);
  }

  /* ---------- 레슨 ---------- */
  function renderLesson(app, l) {
    const w = WEEKS[l.week - 1];
    app.style.setProperty("--wc", w.c);
    const idx = LESSONS.indexOf(l);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    app.innerHTML = "";
    app.appendChild(el("div", { class: "crumbs" }, `<a href="#/">로드맵</a> › ${w.t} › Day ${l.id}`));
    const head = el("header", { class: "lesson-head", style: `--wc:${w.c}` });
    head.innerHTML = `<span class="big-ic">${l.icon}</span><div class="day-label">DAY ${String(l.id).padStart(2, "0")} · ${w.t}</div><h1>${esc(l.title)}</h1><p>${esc(l.subtitle)}</p>
      <div class="lesson-meta"><span class="tag">⏱ ${l.time}</span><span class="tag">난이도 ${"★".repeat(l.level)}${"☆".repeat(3 - l.level)}</span><span class="tag">실습 ${(l.practice || []).length}개</span></div>`;
    app.appendChild(head);

    const toc = el("nav", { class: "toc" });
    const parts = [["goals", "🎯 목표"], ["learn", "📖 개념"], ["viz", "📊 시각화"], ["practice", "💻 실습"], ["real", "🛠️ 내 PC 에서"], ["check", "✅ 체크리스트"]];
    parts.forEach(([id, t]) => toc.appendChild(el("a", { href: "javascript:void 0", onclick: () => document.getElementById("s-" + id)?.scrollIntoView({ behavior: "smooth" }) }, t)));
    app.appendChild(toc);

    let n = 0;
    function block(id, title) {
      const b = el("section", { class: "block", id: "s-" + id });
      b.appendChild(el("h2", { class: "block-title" }, `<span class="num">${++n}</span>${title}`));
      app.appendChild(b);
      return b;
    }

    // 1. 목표 + 비유
    const g = block("goals", "오늘의 목표");
    const goals = el("div", { class: "goals" });
    l.goals.forEach((t, i) => goals.appendChild(el("div", { class: "goal" }, `<b>0${i + 1}</b><span>${t}</span>`)));
    g.appendChild(goals);
    if (l.analogy) g.appendChild(el("div", { class: "analogy" }, `<span class="em">${l.analogy.i || "💡"}</span><div><b>쉽게 비유하면</b><p>${l.analogy.t}</p></div>`));

    // 2. 개념
    const learn = block("learn", "개념 익히기");
    l.sections.forEach((sec) => {
      const c = el("div", { class: "card" });
      c.appendChild(el("h3", {}, sec.h));
      if (sec.body) c.appendChild(el("div", {}, sec.body));
      (sec.code ? [].concat(sec.code) : []).forEach((cd) => c.appendChild(codeBlock(cd)));
      if (sec.after) c.appendChild(el("div", {}, sec.after));
      if (sec.tip) c.appendChild(el("div", { class: "callout " + (sec.tipType || "") }, sec.tip));
      learn.appendChild(c);
    });

    // 3. 시각화
    const v = block("viz", "그림으로 이해하기");
    [].concat(l.viz || []).forEach((spec, i) => { if (i) v.appendChild(el("div", { style: "height:12px" })); v.appendChild(Viz.render(spec)); });

    // 4. 실습
    const p = block("practice", "브라우저에서 실습하기");
    p.appendChild(el("p", { class: "practice-intro", style: "margin-top:-4px" }, "아래 실습은 모두 브라우저 안에서 안전하게 동작합니다. 실습을 모두 끝내면 이 레슨이 '완료'로 표시됩니다."));
    const bar = el("div", { class: "complete-bar" });
    (l.practice || []).forEach((spec, i) => {
      const pid = `${l.id}-${i}`;
      p.appendChild(Practice.render(spec, {
        isDone: !!store.practice[pid],
        onDone() {
          if (!store.practice[pid]) { store.practice[pid] = true; save(); toast("✅ 실습 완료!"); }
          refreshBar();
        },
      }));
    });

    // 5. 실제 PC
    if (l.real) {
      const r = block("real", "내 PC 에서 직접 해 보기");
      const c = el("div", { class: "card" });
      if (l.real.body) c.appendChild(el("div", {}, l.real.body));
      [].concat(l.real.code || []).forEach((cd) => c.appendChild(codeBlock(cd)));
      if (l.real.after) c.appendChild(el("div", {}, l.real.after));
      r.appendChild(c);
    }

    // 6. 흔한 실수 + 체크리스트
    const ch = block("check", "정리 & 체크리스트");
    if (l.mistakes) {
      const m = el("div", { class: "mistakes", style: "margin-bottom:14px" });
      l.mistakes.forEach(([bad, ok]) => m.appendChild(el("div", { class: "mistake" }, `<div class="bad-side"><small>흔한 실수</small>${bad}</div><div class="ok-side"><small>이렇게 하세요</small>${ok}</div>`)));
      ch.appendChild(m);
    }
    const cc = el("div", { class: "card" });
    const ul = el("ul", { class: "checklist" });
    l.checklist.forEach((t, i) => {
      const k = `${l.id}-${i}`;
      const li = el("li");
      const cb = el("input", { type: "checkbox", id: "ck" + k });
      cb.checked = !!store.checks[k];
      cb.onchange = () => { store.checks[k] = cb.checked; save(); };
      li.append(cb, el("label", { for: "ck" + k }, t));
      ul.appendChild(li);
    });
    cc.appendChild(ul);
    ch.appendChild(cc);
    ch.appendChild(bar);

    function refreshBar() {
      const pc = practiceCount(l);
      const all = pc.d === pc.n;
      if (all && !store.done[l.id]) { store.done[l.id] = true; save(); toast(`🎉 Day ${l.id} 완료!`); renderSidebar(l.id); updateProgress(); }
      const isDone = !!store.done[l.id];
      bar.className = "complete-bar" + (isDone ? " done" : "");
      bar.innerHTML = "";
      bar.appendChild(el("div", { class: "msg" }, isDone ? `<b>🎉 Day ${l.id} 완료!</b> 수고하셨습니다. ${next ? "다음 레슨으로 넘어가 볼까요?" : "전체 과정을 마쳤습니다!"}` : `<b>실습 진행도 ${pc.d}/${pc.n}</b> — 모든 실습을 끝내면 자동으로 완료 처리됩니다.`));
      if (!isDone) {
        const b = el("button", { class: "btn small", type: "button" }, "직접 완료 표시");
        b.onclick = () => { store.done[l.id] = true; save(); refreshBar(); renderSidebar(l.id); updateProgress(); };
        bar.appendChild(b);
      } else {
        const b = el("button", { class: "btn small", type: "button" }, "완료 취소");
        b.onclick = () => { delete store.done[l.id]; (l.practice || []).forEach((_, i) => delete store.practice[`${l.id}-${i}`]); save(); renderSidebar(l.id); updateProgress(); route(); };
        bar.appendChild(b);
        if (next) bar.appendChild(el("a", { class: "btn small primary", href: `#/day/${next.id}` }, `Day ${next.id} 시작 →`));
      }
    }
    refreshBar();

    const nav = el("nav", { class: "lesson-nav" });
    if (prev) nav.appendChild(el("a", { class: "btn", href: `#/day/${prev.id}` }, `<span><small>← 이전</small>Day ${prev.id}. ${esc(prev.title)}</span>`));
    if (next) nav.appendChild(el("a", { class: "btn nx", href: `#/day/${next.id}` }, `<span><small>다음 →</small>Day ${next.id}. ${esc(next.title)}</span>`));
    app.appendChild(nav);
  }

  /* ---------- 라우터 ---------- */
  function route() {
    const app = document.getElementById("app");
    const hash = location.hash || "#/";
    document.body.classList.remove("side-open");
    document.querySelectorAll(".topnav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === hash));
    let m;
    if ((m = hash.match(/^#\/day\/(\d+)/)) && byId(+m[1])) {
      const l = byId(+m[1]);
      renderLesson(app, l); renderSidebar(l.id);
      document.title = `Day ${l.id}. ${l.title} — ${TITLE}`;
    } else if (hash === "#/cheatsheet") {
      window.Extras.cheatsheet(app); renderSidebar("cheatsheet"); document.title = `명령어 모음 — ${TITLE}`;
    } else if (hash === "#/glossary") {
      window.Extras.glossary(app); renderSidebar("glossary"); document.title = `용어 사전 — ${TITLE}`;
    } else {
      renderHome(app); renderSidebar("home"); document.title = TITLE;
    }
    window.scrollTo(0, 0);
    updateProgress();
  }

  /* ---------- 테마 ---------- */
  function applyTheme() {
    if (store.theme) document.documentElement.setAttribute("data-theme", store.theme);
    else document.documentElement.removeAttribute("data-theme");
  }
  document.getElementById("themeBtn").onclick = () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    store.theme = cur === "dark" ? "light" : "dark"; save(); applyTheme();
  };
  document.getElementById("menuBtn").onclick = () => document.body.classList.toggle("side-open");
  document.getElementById("scrim").onclick = () => document.body.classList.remove("side-open");

  window.App = { copy, toast, codeBlock, LESSONS, WEEKS };
  applyTheme();
  window.addEventListener("hashchange", route);
  route();
})();
