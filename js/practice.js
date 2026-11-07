/* =========================================================
 * Practice — 실습 엔진
 * type: terminal | quiz | order | editor | permsim
 * ========================================================= */
(function () {
  const { el, esc } = window.Viz;

  /* 출력 마크업: {ok:텍스트} {dim:} {err:} {acc:} {warn:} {tool:} */
  function fmt(text) {
    return esc(text).replace(/\{(ok|dim|err|acc|warn|tool):([^}]*)\}/g, '<span class="$1">$2</span>');
  }

  function frame(spec, typeLabel, isDone) {
    const box = el("div", { class: "practice" });
    const head = el("div", { class: "practice-head" });
    head.innerHTML = `<span class="ptype">${typeLabel}</span><span class="pt">${esc(spec.title || "실습")}</span><span class="pstatus ${isDone ? "done" : ""}">${isDone ? "✓ 완료" : "진행 전"}</span>`;
    const body = el("div", { class: "practice-body" });
    if (spec.intro) body.appendChild(el("p", { class: "practice-intro" }, spec.intro));
    box.append(head, body);
    const status = head.querySelector(".pstatus");
    return {
      box, body,
      setStatus(text, ok) { status.textContent = text; status.classList.toggle("done", !!ok); },
    };
  }

  /* ================= 터미널 시뮬레이터 ================= */
  const CLAUDE_BANNER = [
    "{acc:╭──────────────────────────────────────────────╮}",
    "{acc:│} {warn:✻} Welcome to {ok:Claude Code} (시뮬레이션)            {acc:│}",
    "{acc:│}   /help 로 도움말, /exit 로 종료              {acc:│}",
    "{acc:│}   cwd: ~/my-project                          {acc:│}",
    "{acc:╰──────────────────────────────────────────────╯}",
    "{dim:  Tip: Shift+Tab 으로 Plan 모드 전환, @파일 로 파일 참조}",
  ].join("\n");

  const CLAUDE_SHELL = [
    [/^help$/, () => "사용 가능한 (시뮬레이션) 명령: ls, pwd, cd, cat, node -v, npm -v, git status, claude, claude --version, claude -p \"...\", clear\n{dim:※ 오른쪽 과제 목록을 따라 입력해 보세요.}"],
    [/^claude (-v|--version)$/, () => "2.x.x (Claude Code)"],
    [/^claude doctor$/, () => "{ok:✓} 설치 상태 정상\n{ok:✓} 인증 정보 확인됨\n{ok:✓} 업데이트 채널: latest"],
  ];
  const BASE_SHELL = [
    [/^ls( -la?)?$/, (c, st) => st.files.join("  ")],
    [/^pwd$/, () => "/home/me/my-project"],
    [/^cd\b/, () => "{dim:(시뮬레이션에서는 디렉터리가 고정되어 있습니다)}"],
    [/^whoami$/, () => "me"],
    [/^date$/, () => new Date().toString()],
    [/^node (-v|--version)$/, () => "v22.11.0"],
    [/^npm (-v|--version)$/, () => "10.9.0"],
    [/^git --version$/, () => "git version 2.47.0"],
    [/^git status$/, () => "On branch main\nnothing to commit, working tree clean"],
    [/^git log.*$/, () => "{warn:a1b2c3d} (HEAD -> main) 첫 커밋\n{warn:9f8e7d6} 프로젝트 초기화"],
    [/^cat (.+)$/, (c, st, m) => st.cat[m[1]] || `{err:cat: ${m[1]}: 파일이 없습니다 (시뮬레이션)}`],
    [/^echo (.*)$/, (c, st, m) => m[1].replace(/^["']|["']$/g, "")],
  ];

  const CLAUDE_CMDS = [
    [/^\/help$/, () => "{acc:주요 슬래시 명령}\n  /init         CLAUDE.md 생성\n  /clear        대화 초기화\n  /compact      대화 요약으로 컨텍스트 절약\n  /model        모델 선택\n  /permissions  권한 규칙 보기/편집\n  /mcp          MCP 서버 상태\n  /agents       서브에이전트 관리\n  /hooks        훅 설정\n  /memory       메모리(CLAUDE.md) 편집\n  /cost         토큰 사용량\n  /exit         종료"],
    [/^\/clear$/, () => "{dim:(대화 기록이 초기화되었습니다)}"],
    [/^\/compact.*$/, () => "{dim:⎿ 지금까지의 대화를 요약했습니다. 컨텍스트 사용량 72% → 18%}"],
    [/^\/model.*$/, () => "모델 선택:\n  {ok:❯ Default (권장)}\n    Opus   — 가장 똑똑함, 복잡한 작업\n    Sonnet — 속도와 성능 균형\n    Haiku  — 빠르고 저렴"],
    [/^\/(cost|usage)$/, () => "총 비용(예시): $0.42\n입력 토큰: 48,210  출력 토큰: 6,130\n세션 시간: 12분"],
    [/^\/status$/, () => "버전: 2.x.x\n모델: Default\n작업 디렉터리: ~/my-project\n인증: Claude 계정"],
    [/^\/permissions$/, () => "{acc:Allow}: Bash(npm run test:*), Edit(src/**)\n{warn:Ask}: Bash(git push:*)\n{err:Deny}: Read(./.env)"],
    [/^\/mcp$/, (c, st) => st.mcp.length ? st.mcp.map((m) => `{ok:●} ${m} — connected`).join("\n") : "{dim:등록된 MCP 서버가 없습니다. 'claude mcp add' 로 추가하세요.}"],
    [/^\/agents$/, () => "서브에이전트:\n  {ok:code-reviewer}  (project)\n  {ok:test-runner}    (project)\n  + 새 에이전트 만들기"],
    [/^\/hooks$/, () => "훅 이벤트: PreToolUse · PostToolUse · UserPromptSubmit · Notification · Stop · SubagentStop · SessionStart · PreCompact"],
    [/^\/memory$/, () => "편집할 메모리 파일 선택:\n  ❯ ./CLAUDE.md (프로젝트)\n    ~/.claude/CLAUDE.md (사용자)"],
    [/^\/config$/, () => "설정 패널 (테마, 알림, 편집 모드 등)"],
    [/^\/doctor$/, () => "{ok:✓} 설치 상태 정상"],
    [/^\/resume$/, () => "이전 대화 목록:\n  ❯ 로그인 기능 구현 (어제)\n    README 정리 (3일 전)"],
  ];

  function genericClaude(input) {
    const lines = [];
    const files = (input.match(/@[\w./-]+/g) || []).map((f) => f.slice(1));
    lines.push("{warn:✻} 생각하는 중…");
    if (files.length) files.forEach((f) => lines.push(`{tool:⏺ Read}(${f})\n  {dim:⎿ 파일을 읽었습니다}`));
    else lines.push("{tool:⏺ Search}(관련 파일)\n  {dim:⎿ 3개 파일 발견}");
    if (/만들|추가|구현|수정|고쳐|작성|바꿔|리팩/.test(input)) {
      lines.push("{tool:⏺ Edit}(src/app.js)\n  {dim:⎿ +12 -3 줄 변경 (승인 필요 시 확인 창 표시)}");
      lines.push("{tool:⏺ Bash}(npm test)\n  {dim:⎿ 테스트 8개 통과}");
      lines.push("{ok:⏺} 요청하신 변경을 적용하고 테스트로 확인했습니다.");
    } else {
      lines.push("{ok:⏺} 코드를 살펴본 결과를 정리했습니다. (시뮬레이션 응답 — 실제 Claude 는 프로젝트 내용을 읽고 구체적으로 답합니다)");
    }
    return lines.join("\n");
  }

  /* 사이트별 시뮬레이터 설정 (window.SITE.sim 으로 덮어쓰기) — 기본값은 Claude Code */
  const S = (window.SITE && window.SITE.sim) || {};
  const SIM = {
    name: S.name || "Claude Code",                 // 안쪽 모드(에이전트/셸) 이름
    launchCmd: S.launchCmd || "claude",             // 안내 문구용 실행 명령
    launch: S.launch || /^claude$/,                 // 안쪽 모드로 들어가는 명령
    headless: S.headless || /^claude -p /,          // 일회성 실행 명령 (일반 응답)
    banner: S.banner !== undefined ? S.banner : CLAUDE_BANNER,
    shellCmds: (S.shellCmds || CLAUDE_SHELL).concat(BASE_SHELL),
    agentCmds: S.agentCmds || CLAUDE_CMDS,
    generic: S.generic || genericClaude,
    exit: S.exit || /^(\/exit|exit|\/quit)$/,
    exitMsg: S.exitMsg || "{dim:Claude Code 를 종료했습니다.}",
    bang: S.bang !== undefined ? S.bang : true,      // ! 로 셸 명령 실행 지원
    shellPrompt: S.shellPrompt || "~/my-project $",
    agentPrompt: S.agentPrompt || ">",
    agentPlaceholder: S.agentPlaceholder || "Claude 에게 요청하거나 / 명령 입력…",
    unknownAgent: S.unknownAgent || ((cmd) => cmd.startsWith("/") ? `{err:알 수 없는 명령: ${cmd}} {dim:(/help 로 목록 보기)}` : null),
  };
  const normMode = (m) => (m === "agent" ? "claude" : m);

  function terminal(spec, ctx) {
    const f = frame(spec, "💻 터미널 실습", ctx.isDone);
    const st = {
      mode: normMode(spec.startMode) || "shell",
      files: spec.files || ["package.json", "src/", "README.md"],
      cat: spec.cat || {},
      mcp: [],
      task: 0,
      history: [], hi: 0, busy: false,
    };
    const tasks = spec.tasks.map((t) => Object.assign({}, t, { mode: normMode(t.mode), enter: normMode(t.enter) }));
    const wrap = el("div", { class: "term-wrap" });
    const term = el("div", { class: "terminal" });
    term.innerHTML = `<div class="term-bar"><i></i><i></i><i></i>${esc(spec.window || "Terminal — my-project")}</div>`;
    const out = el("div", { class: "term-out" });
    const inRow = el("div", { class: "term-in" });
    const prompt = el("span", { class: "prompt" });
    const input = el("input", { type: "text", spellcheck: "false", autocomplete: "off", "aria-label": "터미널 입력" });
    inRow.append(prompt, input);
    term.append(out, inRow);
    term.addEventListener("click", () => input.focus());

    const side = el("div", { class: "tasks" });
    side.appendChild(el("h5", {}, "과제 목록"));
    const taskEls = tasks.map((t, i) => {
      const d = el("div", { class: "task" });
      d.innerHTML = `<div class="tt"><b>${i + 1}</b><span>${t.goal}</span></div>`;
      if (t.hint) {
        const hb = el("button", { class: "hint-btn", type: "button" }, "💡 힌트 보기");
        hb.onclick = () => {
          hb.replaceWith(el("div", { class: "hint" }, `입력: <code title="클릭하면 입력창에 넣습니다">${esc(t.hint)}</code>${t.why ? "<br>" + t.why : ""}`));
          const c = d.querySelector(".hint code");
          if (c) c.onclick = () => { input.value = t.hint; input.focus(); };
        };
        d.appendChild(hb);
      }
      side.appendChild(d);
      return d;
    });
    wrap.append(term, side);
    f.body.appendChild(wrap);

    function renderPrompt() {
      if (st.mode === "claude") { prompt.textContent = SIM.agentPrompt; prompt.className = "prompt claude"; input.placeholder = SIM.agentPlaceholder; }
      else { prompt.textContent = SIM.shellPrompt; prompt.className = "prompt"; input.placeholder = "명령어를 입력하고 Enter"; }
    }
    function refreshTasks() {
      taskEls.forEach((d, i) => { d.classList.toggle("done", i < st.task); d.classList.toggle("cur", i === st.task); });
      if (st.task >= tasks.length) f.setStatus("✓ 완료", true);
      else f.setStatus(`과제 ${st.task}/${tasks.length}`, false);
    }
    function line(html, cls) { const d = el("div", { class: "ln " + (cls || "") }, html); out.appendChild(d); out.scrollTop = out.scrollHeight; }
    function print(text, stream) {
      const lines = String(text).split("\n");
      if (!stream) { lines.forEach((l) => line(fmt(l))); return Promise.resolve(); }
      st.busy = true;
      return new Promise((res) => {
        let i = 0;
        const tick = () => {
          if (i >= lines.length) { st.busy = false; res(); return; }
          line(fmt(lines[i++])); setTimeout(tick, 110);
        };
        tick();
      });
    }

    async function run(raw) {
      const cmd = raw.trim().replace(/\s+/g, " ");
      const p = st.mode === "claude" ? `<span class="pc">${esc(SIM.agentPrompt)}</span> ` : `<span class="ps">${esc(SIM.shellPrompt)}</span> `;
      line(p + `<span class="in">${esc(raw)}</span>`);
      if (!cmd) return;
      if (cmd === "clear" || (st.mode === "claude" && cmd === "/clear" && !(tasks[st.task] && tasks[st.task].match.test(cmd)))) { out.innerHTML = ""; if (cmd === "clear") return; }

      const t = tasks[st.task];
      if (t && t.match.test(cmd) && (!t.mode || t.mode === st.mode)) {
        const o = typeof t.out === "function" ? t.out(cmd, st) : t.out;
        if (t.enter) st.mode = t.enter;
        if (t.addMcp) st.mcp.push(t.addMcp);
        if (t.enter === "claude" && !t.noBanner && SIM.banner) await print(SIM.banner);
        if (o) await print(o, st.mode === "claude" || t.stream);
        st.task++;
        refreshTasks(); renderPrompt();
        if (st.task >= tasks.length) {
          line(fmt("{ok:🎉 모든 과제를 완료했습니다! 실제 PC 터미널에서도 똑같이 해 보세요.}"));
          ctx.onDone();
        }
        return;
      }
      if (t && t.mode && t.mode !== st.mode && t.match.test(cmd)) {
        return print(t.mode === "claude" ? `{warn:이 과제는 ${SIM.name} 안에서 입력해야 합니다. 먼저 '${SIM.launchCmd}' 를 실행하세요.}` : `{warn:이 과제는 일반 터미널에서 입력합니다. 먼저 ${SIM.name} 를 빠져나오세요.}`);
      }

      if (st.mode === "shell") {
        if (SIM.launch.test(cmd)) { st.mode = "claude"; renderPrompt(); return SIM.banner ? print(SIM.banner) : undefined; }
        if (SIM.headless && SIM.headless.test(cmd)) return print(SIM.generic(cmd, st), true);
        for (const [re, fn] of SIM.shellCmds) { const m = cmd.match(re); if (m) return print(fn(cmd, st, m)); }
        return print(`{err:명령을 찾을 수 없습니다: ${cmd.split(" ")[0]}}\n{dim:힌트: 오른쪽 과제의 '💡 힌트 보기' 를 눌러 보세요. (help 입력 시 명령 목록)}`);
      } else {
        if (SIM.exit.test(cmd)) { st.mode = "shell"; renderPrompt(); return print(SIM.exitMsg); }
        if (SIM.bang && cmd.startsWith("!")) return print(`{dim:(셸 명령)} ${esc(cmd.slice(1))}\n{dim:⎿ 명령을 실행하고 결과를 대화에 추가했습니다}`);
        for (const [re, fn] of SIM.agentCmds) { const m = cmd.match(re); if (m) return print(fn(cmd, st, m)); }
        const unk = SIM.unknownAgent(cmd, st);
        if (unk) return print(unk);
        return print(SIM.generic(cmd, st), true);
      }
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (st.busy) return;
        const v = input.value; input.value = "";
        if (v.trim()) { st.history.push(v); st.hi = st.history.length; }
        run(v);
      } else if (e.key === "ArrowUp") {
        if (st.hi > 0) { st.hi--; input.value = st.history[st.hi]; e.preventDefault(); }
      } else if (e.key === "ArrowDown") {
        if (st.hi < st.history.length - 1) { st.hi++; input.value = st.history[st.hi]; } else { st.hi = st.history.length; input.value = ""; }
      }
    });

    renderPrompt();
    if (st.mode === "claude" && SIM.banner) print(SIM.banner);
    line(fmt(spec.welcome || "{dim:# 오른쪽 과제를 순서대로 입력해 보세요. 막히면 '💡 힌트 보기'를 누르세요.}"));
    if (ctx.isDone) { st.task = 0; }
    refreshTasks();
    if (ctx.isDone) f.setStatus("✓ 완료 (다시 연습 가능)", true);
    return f.box;
  }

  /* ================= 퀴즈 ================= */
  function quiz(spec, ctx) {
    const f = frame(spec, "📝 퀴즈", ctx.isDone);
    const solved = new Set();
    spec.questions.forEach((q, qi) => {
      const box = el("div", { class: "quiz-q" });
      box.appendChild(el("div", { class: "qq" }, `<span>Q${qi + 1}.</span>${q.q}`));
      const opts = el("div", { class: "opts" });
      const exp = el("div", { class: "explain", style: "display:none" });
      q.options.forEach((o, oi) => {
        const b = el("button", { class: "opt", type: "button" }, o);
        b.onclick = () => {
          if (oi === q.answer) {
            b.classList.add("right");
            opts.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
            exp.className = "explain"; exp.innerHTML = "✅ 정답! " + (q.explain || "");
            solved.add(qi);
            if (solved.size === spec.questions.length) { f.setStatus("✓ 완료", true); ctx.onDone(); }
            else f.setStatus(`${solved.size}/${spec.questions.length} 정답`, false);
          } else {
            b.classList.add("wrong"); b.disabled = true;
            exp.className = "explain no"; exp.innerHTML = "❌ 다시 생각해 보세요. " + (q.wrongHint || "");
          }
          exp.style.display = "block";
        };
        opts.appendChild(b);
      });
      box.append(opts, exp);
      f.body.appendChild(box);
    });
    return f.box;
  }

  /* ================= 순서 맞추기 ================= */
  function order(spec, ctx) {
    const f = frame(spec, "🧩 순서 맞추기", ctx.isDone);
    let items = spec.items.map((t, i) => ({ t, i }));
    // 섞기 (정답과 같지 않도록)
    do { items.sort(() => Math.random() - 0.5); } while (items.every((x, k) => x.i === k) && items.length > 1);
    const list = el("ul", { class: "order-list" });
    const res = el("span", { class: "p-result" });
    let dragIdx = null;
    function draw(mark) {
      list.innerHTML = "";
      items.forEach((it, k) => {
        const li = el("li", { class: "order-item" + (mark ? (it.i === k ? " ok" : " no") : ""), draggable: "true" });
        li.innerHTML = `<span class="oi-n">${k + 1}</span><span>${it.t}</span>`;
        const btns = el("span", { class: "oi-btns" });
        const up = el("button", { type: "button", "aria-label": "위로" }, "▲");
        const dn = el("button", { type: "button", "aria-label": "아래로" }, "▼");
        up.onclick = () => { if (k > 0) { [items[k - 1], items[k]] = [items[k], items[k - 1]]; draw(); } };
        dn.onclick = () => { if (k < items.length - 1) { [items[k + 1], items[k]] = [items[k], items[k + 1]]; draw(); } };
        btns.append(up, dn); li.appendChild(btns);
        li.addEventListener("dragstart", () => { dragIdx = k; li.classList.add("dragging"); });
        li.addEventListener("dragend", () => li.classList.remove("dragging"));
        li.addEventListener("dragover", (e) => e.preventDefault());
        li.addEventListener("drop", (e) => {
          e.preventDefault();
          if (dragIdx === null || dragIdx === k) return;
          const [m] = items.splice(dragIdx, 1); items.splice(k, 0, m); dragIdx = null; draw();
        });
        list.appendChild(li);
      });
    }
    draw();
    const act = el("div", { class: "p-actions" });
    const chk = el("button", { class: "btn small primary", type: "button" }, "정답 확인");
    chk.onclick = () => {
      const ok = items.every((x, k) => x.i === k);
      draw(true);
      res.className = "p-result " + (ok ? "ok" : "no");
      const n = items.filter((x, k) => x.i === k).length;
      res.innerHTML = ok ? "🎉 완벽합니다! " + (spec.explain || "") : `${n}/${items.length}개 위치가 맞았어요. 빨간 항목을 옮겨 보세요.`;
      if (ok) { f.setStatus("✓ 완료", true); ctx.onDone(); }
    };
    act.append(chk, res);
    f.body.append(list, act);
    return f.box;
  }

  /* ================= 코드/문서 작성 에디터 ================= */
  function editor(spec, ctx) {
    const f = frame(spec, spec.label || "✍️ 직접 작성", ctx.isDone);
    const wrap = el("div", { class: "editor-wrap" });
    const left = el("div");
    if (spec.file) left.appendChild(el("div", { class: "code-head", style: "border-radius:10px 10px 0 0;background:var(--code-bg);border:1px solid var(--line);border-bottom:none" }, `<span class="dots"><i></i><i></i><i></i></span>${esc(spec.file)}`));
    const ta = el("textarea", { class: "editor", spellcheck: "false" });
    if (spec.file) ta.style.borderRadius = "0 0 12px 12px";
    ta.value = spec.starter || "";
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") { e.preventDefault(); const p = ta.selectionStart; ta.setRangeText("  ", p, ta.selectionEnd, "end"); check(); }
    });
    left.appendChild(ta);
    const act = el("div", { class: "p-actions" });
    const sol = el("button", { class: "btn small", type: "button" }, "💡 예시 답안 보기");
    const reset = el("button", { class: "btn small", type: "button" }, "↺ 처음 상태로");
    const copy = el("button", { class: "btn small", type: "button" }, "📋 복사");
    sol.onclick = () => { if (confirm("작성 중인 내용이 예시 답안으로 바뀝니다. 계속할까요?")) { ta.value = spec.solution; check(); } };
    reset.onclick = () => { ta.value = spec.starter || ""; check(); };
    copy.onclick = () => window.App && App.copy(ta.value);
    act.append(sol, reset, copy);
    left.appendChild(act);

    const right = el("div");
    const score = el("div", { class: "score-ring" });
    const ul = el("ul", { class: "checks" });
    right.append(score, ul);
    if (spec.tip) right.appendChild(el("div", { class: "callout", style: "margin-top:10px" }, spec.tip));
    wrap.append(left, right);
    f.body.appendChild(wrap);

    let reported = false;
    function check() {
      const v = ta.value;
      let ok = 0;
      ul.innerHTML = "";
      spec.checks.forEach((c) => {
        let pass = false;
        try { pass = c.re ? c.re.test(v) : !!c.fn(v); } catch (e) { pass = false; }
        if (pass) ok++;
        ul.appendChild(el("li", { class: pass ? "ok" : "no" }, `<span class="ci">${pass ? "✓" : "○"}</span><span>${c.label}</span>`));
      });
      score.innerHTML = `<b>${ok}/${spec.checks.length}</b> 조건 충족`;
      if (ok === spec.checks.length) {
        f.setStatus("✓ 완료", true);
        if (!reported) { reported = true; ctx.onDone(); }
      } else f.setStatus(`${ok}/${spec.checks.length}`, ctx.isDone);
    }
    ta.addEventListener("input", check);
    check();
    return f.box;
  }

  /* ================= 권한 규칙 시뮬레이터 ================= */
  function globToRe(g) {
    const s = g.replace(/^\.\//, "").replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*");
    return new RegExp("^" + s + "$");
  }
  function parse(x) {
    const m = x.trim().match(/^(\w+)(?:\((.*)\))?$/);
    return m ? { tool: m[1], arg: m[2] } : null;
  }
  function ruleMatches(rule, call) {
    const r = parse(rule), c = parse(call);
    if (!r || !c || r.tool !== c.tool) return false;
    if (r.arg === undefined || r.arg === "" || r.arg === "*") return true;
    const arg = (c.arg || "").replace(/^\.\//, "");
    if (r.arg.endsWith(":*")) return (c.arg || "").startsWith(r.arg.slice(0, -2));
    if (r.arg.includes("*")) return globToRe(r.arg).test(arg);
    return r.arg.replace(/^\.\//, "") === arg;
  }
  function decide(lists, call) {
    const hit = (k) => lists[k].some((r) => r && ruleMatches(r, call));
    if (hit("deny")) return "deny";
    if (hit("ask")) return "ask";
    if (hit("allow")) return "allow";
    const tool = (parse(call) || {}).tool;
    return ["Read", "Grep", "Glob"].includes(tool) ? "allow" : "ask";
  }
  const LABEL = { allow: "자동 허용", ask: "물어봄", deny: "차단" };

  function permsim(spec, ctx) {
    const f = frame(spec, "🛡️ 권한 시뮬레이터", ctx.isDone);
    const grid = el("div", { class: "perm-grid" });
    const rules = el("div", { class: "perm-rules" });
    const areas = {};
    [["allow", "✅ allow (자동 허용)"], ["ask", "❓ ask (매번 확인)"], ["deny", "⛔ deny (항상 차단)"]].forEach(([k, label]) => {
      const col = el("div", { class: "perm-col" });
      col.appendChild(el("h5", {}, label));
      const ta = el("textarea", { spellcheck: "false", placeholder: "한 줄에 규칙 하나\n예: Bash(npm run test:*)" });
      ta.value = (spec[k] || []).join("\n");
      ta.addEventListener("input", evalAll);
      areas[k] = ta; col.appendChild(ta); rules.appendChild(col);
    });
    const tests = el("div", { class: "perm-tests" });
    tests.appendChild(el("div", { style: "font-size:.85rem;color:var(--text-2);margin-bottom:4px" }, "Claude 가 시도하는 작업 → 결과 (오른쪽 회색 글씨가 목표)"));
    const rows = spec.tests.map((t) => {
      const r = el("div", { class: "perm-test" });
      r.innerHTML = `<span>${esc(t.call)}</span><span class="res"></span><span class="want">목표: ${LABEL[t.want]}</span>`;
      tests.appendChild(r); return r;
    });
    const res = el("div", { class: "p-result", style: "margin-top:10px" });
    tests.appendChild(res);
    grid.append(rules, tests);
    f.body.appendChild(grid);
    f.body.appendChild(el("div", { class: "callout", style: "margin-top:12px" }, "<b>판정 순서:</b> deny → ask → allow 순으로 확인합니다. 어디에도 해당하지 않으면 읽기 작업(Read/Grep/Glob)은 허용, 나머지는 사용자에게 물어봅니다. <code>:*</code> 는 '이 접두어로 시작하는 명령', <code>**</code> 는 '하위 모든 경로'를 뜻합니다."));
    let reported = false;
    function evalAll() {
      const lists = {};
      for (const k in areas) lists[k] = areas[k].value.split("\n").map((x) => x.trim()).filter(Boolean);
      let ok = 0;
      spec.tests.forEach((t, i) => {
        const d = decide(lists, t.call);
        const r = rows[i];
        const rs = r.querySelector(".res");
        rs.className = "res " + d; rs.textContent = LABEL[d];
        r.classList.toggle("match", d === t.want); r.classList.toggle("miss", d !== t.want);
        if (d === t.want) ok++;
      });
      res.className = "p-result " + (ok === spec.tests.length ? "ok" : "");
      res.textContent = ok === spec.tests.length ? "🎉 모든 작업이 목표대로 동작합니다!" : `${ok}/${spec.tests.length}개 목표 달성`;
      if (ok === spec.tests.length) { f.setStatus("✓ 완료", true); if (!reported) { reported = true; ctx.onDone(); } }
      else f.setStatus(`${ok}/${spec.tests.length}`, ctx.isDone);
    }
    evalAll();
    return f.box;
  }

  const TYPES = { terminal, quiz, order, editor, permsim };
  window.Practice = {
    render(spec, ctx) { return (TYPES[spec.type] || quiz)(spec, ctx); },
    fmt,
  };
})();
