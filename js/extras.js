/* 명령어 모음 & 용어 사전 */
(function () {
  const { el, esc } = window.Viz;

  const SITE = window.SITE || {};
  const CHEATS = SITE.cheats || [
    { g: "🚀 실행 (터미널)", items: [
      ["claude", "대화형 모드 시작", 1], ["claude \"질문\"", "첫 메시지와 함께 시작", 2], ["claude -c", "가장 최근 대화 이어가기", 2], ["claude -r", "이전 대화 골라서 이어가기", 2],
      ["claude -p \"요청\"", "한 번 실행 후 결과만 출력 (헤드리스)", 15], ["claude --permission-mode plan", "Plan 모드로 시작", 4], ["claude --version", "버전 확인", 1], ["claude doctor", "설치 상태 진단", 1],
      ["claude update", "업데이트", 1],
    ] },
    { g: "⚙️ 헤드리스 옵션", items: [
      ["--output-format json", "결과를 JSON 으로 (비용·시간 포함)", 15], ["--output-format stream-json", "진행 메시지를 줄 단위 JSON 스트림으로", 15],
      ["--allowedTools \"Read,Edit\"", "허용할 도구 지정", 15], ["--disallowedTools \"Bash\"", "금지할 도구 지정", 15], ["--max-turns 10", "최대 반복 횟수 제한", 15], ["--model <이름>", "모델 지정", 2],
    ] },
    { g: "/ 슬래시 명령", items: [
      ["/help", "도움말", 2], ["/init", "CLAUDE.md 생성", 3], ["/memory", "메모리 파일 편집", 3], ["/clear", "대화 초기화", 2], ["/compact", "대화 요약으로 컨텍스트 절약", 2],
      ["/model", "모델 변경", 2], ["/cost", "토큰 사용량·비용", 22], ["/permissions", "권한 규칙 보기·편집", 4], ["/hooks", "훅 설정", 13], ["/mcp", "MCP 서버 상태·인증", 14],
      ["/agents", "서브에이전트 관리", 19], ["/review", "코드 리뷰", 9], ["/rewind", "체크포인트로 되감기", 12], ["/resume", "이전 대화 불러오기", 2],
      ["/install-github-app", "GitHub Actions 연동 설정", 17], ["/plugin", "플러그인 관리", 21], ["/config", "설정", 2], ["/status", "계정·버전 상태", 1], ["/exit", "종료", 1],
    ] },
    { g: "⌨️ 단축키 & 기호", items: [
      ["Esc", "진행 중인 작업 중단", 2], ["Esc Esc", "이전 메시지 수정 / 되감기", 12], ["Shift+Tab", "권한 모드 전환 (기본→자동 편집→Plan)", 2], ["Ctrl+C", "입력 취소 / 두 번 누르면 종료", 1],
      ["@파일경로", "파일을 대화에 첨부", 2], ["!명령", "셸 명령 바로 실행", 2], ["↑", "이전 입력 불러오기", 2],
    ] },
    { g: "🔌 MCP 명령", items: [
      ["claude mcp add <이름> -- <명령>", "로컬(stdio) 서버 추가", 14], ["claude mcp add --transport http <이름> <URL>", "원격(HTTP) 서버 추가", 14],
      ["claude mcp add -s project ...", "팀 공유(.mcp.json)로 추가", 14], ["claude mcp list", "서버 목록", 14], ["claude mcp remove <이름>", "서버 삭제", 14],
    ] },
    { g: "📁 주요 파일 위치", items: [
      ["CLAUDE.md", "프로젝트 메모리 (팀 공유)", 3], ["~/.claude/CLAUDE.md", "개인 메모리 (모든 프로젝트)", 3], [".claude/settings.json", "권한·훅·env 팀 설정", 4], [".claude/settings.local.json", "개인 설정 (git 제외)", 4],
      [".claude/commands/*.md", "커스텀 슬래시 명령", 15], [".claude/skills/*/SKILL.md", "스킬", 15], [".claude/agents/*.md", "서브에이전트", 19], [".mcp.json", "팀 공유 MCP 서버", 14], [".github/workflows/*.yml", "GitHub Actions", 17],
    ] },
    { g: "🌿 git worktree", items: [
      ["git worktree add ../폴더 -b 브랜치", "병렬 작업 폴더 만들기", 20], ["git worktree list", "목록", 20], ["git worktree remove ../폴더", "삭제", 20],
    ] },
  ];

  const GLOSS = SITE.glossary || [
    ["에이전트", "Agent", "목표를 받으면 스스로 계획하고 도구를 사용해 실행·검증을 반복하는 AI."],
    ["프롬프트", "Prompt", "AI 에게 주는 요청·지시문. 목표·맥락·제약·완료 기준을 담을수록 좋다."],
    ["컨텍스트", "Context", "AI 가 한 번에 기억하고 참고할 수 있는 대화·파일 내용. 길어지면 /compact, 주제가 바뀌면 /clear."],
    ["토큰", "Token", "AI 가 텍스트를 처리하는 단위. 사용량과 비용의 기준이 된다."],
    ["CLI", "Command Line Interface", "마우스 대신 명령어를 입력해 프로그램을 쓰는 방식. 터미널에서 사용."],
    ["CLAUDE.md", "Memory file", "Claude 가 세션 시작 시 자동으로 읽는 프로젝트 설명서."],
    ["도구", "Tool", "Claude 가 실제 행동에 쓰는 기능. Read, Edit, Bash, Grep, WebFetch 등."],
    ["권한 모드", "Permission mode", "default, acceptEdits, plan, bypassPermissions — 승인 요청 수준을 정한다."],
    ["Plan 모드", "Plan mode", "읽기만 하고 계획을 세우는 모드. 수정 전에 방향을 검토할 때 사용."],
    ["훅", "Hook", "특정 이벤트(도구 실행 전후, 응답 종료 등)에 자동 실행되는 셸 명령. 결정적으로 실행된다."],
    ["MCP", "Model Context Protocol", "AI 와 외부 도구·데이터를 연결하는 표준 규격. AI 용 USB-C."],
    ["MCP 서버", "MCP server", "MCP 규격으로 도구를 제공하는 프로그램 (GitHub, DB, 브라우저 등)."],
    ["슬래시 명령", "Slash command", "/ 로 시작하는 명령. .claude/commands 에 직접 만들 수 있다."],
    ["스킬", "Skill", "특정 작업 매뉴얼·스크립트 묶음. Claude 가 필요할 때 스스로 불러 쓴다."],
    ["서브에이전트", "Subagent", "독립된 컨텍스트와 제한된 도구를 가진 전문 보조 에이전트."],
    ["오케스트레이터", "Orchestrator", "작업을 나눠 여러 에이전트에게 맡기고 결과를 통합하는 지휘 역할."],
    ["헤드리스 모드", "Headless (-p)", "대화창 없이 한 번 실행하고 결과만 출력. 스크립트·CI 용."],
    ["팬아웃", "Fan-out", "여러 작업을 다수의 에이전트 실행으로 퍼뜨려 병렬 처리하는 방식."],
    ["worktree", "git worktree", "같은 저장소를 여러 폴더·브랜치로 동시에 꺼내 쓰는 git 기능."],
    ["CI/CD", "Continuous Integration/Delivery", "코드 변경마다 자동 테스트(CI)와 자동 배포(CD)."],
    ["GitHub Actions", "", "GitHub 의 자동화(워크플로우) 실행 서비스. .github/workflows 에 정의."],
    ["Agent SDK", "Claude Agent SDK", "Claude Code 의 에이전트 엔진을 내 프로그램에서 쓰게 하는 라이브러리."],
    ["TDD", "Test-Driven Development", "테스트를 먼저 쓰고, 통과하도록 구현하고, 정리하는 개발 방식."],
    ["리팩토링", "Refactoring", "동작은 그대로 두고 코드 구조를 개선하는 것."],
    ["ADR", "Architecture Decision Record", "설계 결정과 그 이유를 기록한 짧은 문서."],
    ["프롬프트 인젝션", "Prompt injection", "외부 데이터에 숨겨진 악성 지시로 AI 를 조종하려는 공격."],
    ["OpenTelemetry", "OTel", "지표·로그·추적 데이터를 내보내는 표준. 모니터링 도구와 연동."],
    ["Webhook", "", "이벤트 발생 시 지정된 URL 로 HTTP 요청을 보내는 방식. 슬랙 알림 등에 사용."],
    ["시크릿", "Secret", "API 키·토큰 같은 비밀값. 코드에 쓰지 않고 비밀 저장소·환경 변수로 관리."],
    ["플러그인", "Plugin", "명령·에이전트·스킬·훅·MCP 설정을 묶어 배포하는 단위."],
  ];

  function cheatsheet(app) {
    app.innerHTML = `<div class="crumbs"><a href="#/">로드맵</a> › 명령어 모음</div>
      <h1>⌨️ 명령어 모음</h1><p style="color:var(--text-2)">강좌에서 다룬 명령을 한곳에 모았습니다. 오른쪽 링크로 해당 레슨에 갈 수 있고, 명령을 클릭하면 복사됩니다.</p>`;
    const search = el("input", { class: "ref-search", placeholder: "🔎 명령어나 설명 검색 (예: mcp, 되감기, json)" });
    const box = el("div");
    app.append(search, box);
    function draw(q) {
      box.innerHTML = "";
      q = q.trim().toLowerCase();
      CHEATS.forEach((g) => {
        const items = g.items.filter(([c, d]) => !q || c.toLowerCase().includes(q) || d.toLowerCase().includes(q));
        if (!items.length) return;
        const sec = el("div", { class: "ref-group" });
        sec.appendChild(el("h3", {}, g.g));
        items.forEach(([c, d, day]) => {
          const row = el("div", { class: "ref-row" });
          const code = el("code", { style: "cursor:pointer", title: "클릭하여 복사" }, esc(c));
          code.onclick = () => App.copy(c);
          row.append(el("div", {}, ""), el("div", { class: "rd" }, esc(d)), el("a", { class: "rl", href: `#/day/${day}` }, `Day ${day} →`));
          row.firstChild.appendChild(code);
          sec.appendChild(row);
        });
        box.appendChild(sec);
      });
      if (!box.children.length) box.innerHTML = "<p style='color:var(--text-3)'>검색 결과가 없습니다.</p>";
    }
    search.addEventListener("input", () => draw(search.value));
    draw("");
  }

  function glossary(app) {
    app.innerHTML = `<div class="crumbs"><a href="#/">로드맵</a> › 용어 사전</div>
      <h1>📖 용어 사전</h1><p style="color:var(--text-2)">처음 보는 용어가 나오면 여기서 찾아보세요.</p>`;
    const search = el("input", { class: "ref-search", placeholder: "🔎 용어 검색" });
    const grid = el("div", { class: "gloss" });
    app.append(search, grid);
    function draw(q) {
      q = q.trim().toLowerCase();
      grid.innerHTML = "";
      GLOSS.filter((g) => !q || g.join(" ").toLowerCase().includes(q)).forEach(([k, e, d]) => {
        grid.appendChild(el("div", { class: "gloss-card" }, `<h4>${esc(k)}${e ? `<small>${esc(e)}</small>` : ""}</h4><p>${esc(d)}</p>`));
      });
    }
    search.addEventListener("input", () => draw(search.value));
    draw("");
  }

  window.Extras = { cheatsheet, glossary };
})();
