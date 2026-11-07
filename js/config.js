/* 사이트 설정 — Codex 배우기 */
(function () {
  const BANNER = [
    "{acc:╭────────────────────────────────────────────────╮}",
    "{acc:│} {ok:>_} OpenAI {ok:Codex} (시뮬레이션)                       {acc:│}",
    "{acc:│}                                                {acc:│}",
    "{acc:│} {dim:model:}     기본 모델        {dim:/model 로 변경}    {acc:│}",
    "{acc:│} {dim:directory:} ~/my-project                       {acc:│}",
    "{acc:│} {dim:sandbox:}   workspace-write · on-request       {acc:│}",
    "{acc:╰────────────────────────────────────────────────╯}",
    "{dim:  Tip: @ 파일 검색 · ! 셸 명령 · / 명령 목록 · Esc 로 중단}",
  ].join("\n");

  const SLASH_LIST = [
    "{acc:슬래시 명령 (일부)}",
    "  /init         AGENTS.md 초안 생성",
    "  /status       세션 설정·토큰 사용량",
    "  /model        모델·추론 강도 선택",
    "  /permissions  승인·샌드박스 수준 변경",
    "  /plan         계획 모드로 전환",
    "  /review       작업 트리 코드 리뷰",
    "  /diff         git diff 보기 (추적 안 된 파일 포함)",
    "  /mention      파일 첨부",
    "  /compact      대화 요약으로 컨텍스트 절약",
    "  /new          새 대화 시작",
    "  /resume       저장된 대화 이어가기",
    "  /mcp          MCP 도구 목록",
    "  /skills       스킬 보기·실행",
    "  /hooks        훅 검토·신뢰",
    "  /subagents    서브에이전트 스레드 전환",
    "  /exit, /quit  종료",
  ].join("\n");

  function genericCodex(input) {
    const lines = [];
    const files = (input.match(/@[\w./-]+/g) || []).map((f) => f.slice(1));
    lines.push("{dim:• Working (2s • Esc to interrupt)}");
    if (files.length) files.forEach((f) => lines.push(`{tool:• Explored}\n  {dim:└ Read ${f}}`));
    else lines.push("{tool:• Explored}\n  {dim:└ Search 관련 파일 · Read 3개 파일}");
    if (/만들|추가|구현|수정|고쳐|작성|바꿔|리팩|생성|fix|add|write/i.test(input)) {
      lines.push("{tool:• Edited} src/app.js {ok:(+12 -3)}");
      lines.push("{tool:• Ran} npm test\n  {dim:└ Tests: 8 passed}");
      lines.push("{dim:─ Worked for 18s ─}");
      lines.push("{ok:•} 요청하신 변경을 적용하고 테스트로 확인했습니다. (시뮬레이션 응답)");
    } else {
      lines.push("{dim:─ Worked for 6s ─}");
      lines.push("{ok:•} 코드를 살펴본 결과를 정리했습니다. (시뮬레이션 응답 — 실제 Codex 는 프로젝트를 읽고 구체적으로 답합니다)");
    }
    return lines.join("\n");
  }

  window.SITE = {
    title: "Codex 배우기",
    tagline: "터미널 코딩 에이전트 <b>OpenAI Codex CLI</b> 를 설치부터 자동화·멀티 에이전트 시스템까지. 하루 30~60분, <b>4주 24일</b> 과정으로 손으로 익힙니다.",
    storageKey: "codex-study-progress-v1",
    weeks: [
      { n: 1, t: "1주차 — 기초", d: "설치·로그인부터 첫 번째 빌드까지, Codex 와 친해지기", c: "var(--w1)", i: "🧭" },
      { n: 2, t: "2주차 — 코딩 워크플로우", d: "프롬프트·설계·리뷰·문서·테스트·리팩토링", c: "var(--w2)", i: "🔍" },
      { n: 3, t: "3주차 — 자동화", d: "config.toml·MCP·codex exec·알림·CI/CD·SDK", c: "var(--w3)", i: "⚡" },
      { n: 4, t: "4주차 — 고급 시스템", d: "스킬·훅·서브에이전트·병렬 작업·운영과 아키텍처", c: "var(--w4)", i: "🚀" },
    ],

    sim: {
      name: "Codex",
      launchCmd: "codex",
      launch: /^codex$/,
      headless: /^codex exec /,
      banner: BANNER,
      shellCmds: [
        [/^help$/, () => "사용 가능한 (시뮬레이션) 명령: ls, pwd, cat, node -v, npm -v, git status, codex, codex --version, codex --help, codex login status, codex mcp list, codex exec \"...\", clear\n{dim:※ 오른쪽 과제 목록을 따라 입력해 보세요.}"],
        [/^codex (-V|--version)$/, () => "codex-cli 0.x.x"],
        [/^codex (-h|--help)$/, () => "Codex CLI\n\nUsage: codex [OPTIONS] [PROMPT]\n       codex <COMMAND>\n\nCommands:\n  exec        비대화형 실행 (별칭: e)\n  review      비대화형 코드 리뷰\n  login       로그인 관리\n  logout      저장된 인증 정보 삭제\n  mcp         MCP 서버 관리\n  resume      이전 대화 이어가기\n  fork        이전 대화를 복제해 새로 시작\n  cloud       Codex Cloud 작업\n  apply       클라우드 작업 diff 를 로컬에 적용\n  completion  셸 자동완성 스크립트\n  sandbox     샌드박스 안에서 명령 실행\n\nOptions:\n  -m, --model <MODEL>\n  -s, --sandbox <read-only|workspace-write|danger-full-access>\n  -a, --ask-for-approval <on-request|never>\n  -c, --config <key=value>\n  -p, --profile <NAME>\n  -i, --image <FILE>\n  -C, --cd <DIR>\n      --search"],
        [/^codex login status$/, () => "{ok:Logged in using ChatGPT}"],
        [/^codex login$/, () => "{dim:브라우저에서 ChatGPT 로그인 페이지를 엽니다… (시뮬레이션)}\n{ok:Successfully logged in}"],
        [/^codex logout$/, () => "{dim:저장된 인증 정보를 삭제했습니다.}"],
        [/^codex mcp list$/, (c, st) => st.mcp.length ? "Name        Command / URL                         Status\n" + st.mcp.map((m) => `${m.padEnd(11)} (설정됨)                               {ok:enabled}`).join("\n") : "{dim:No MCP servers configured yet. Try `codex mcp add my-tool -- my-command`.}"],
        [/^codex update$/, () => "{dim:최신 버전을 확인합니다… 이미 최신입니다 (시뮬레이션)}"],
      ],
      agentCmds: [
        [/^\/$/, () => SLASH_LIST],
        [/^\/help$/, () => "{warn:Codex 에는 /help 명령이 없습니다.} 입력창에 {acc:/} 만 입력하면 명령 목록이 나타납니다.\n\n" + SLASH_LIST],
        [/^\/clear$/, () => "{dim:(화면을 지우고 새 대화를 시작했습니다)}"],
        [/^\/new$/, () => "{dim:(새 대화를 시작했습니다 — 이전 맥락은 비워졌습니다)}"],
        [/^\/compact$/, () => "{dim:• 지금까지의 대화를 요약했습니다. 컨텍스트 사용량 71% → 15%}"],
        [/^\/model.*$/, () => "모델 선택:\n  {ok:› 기본 모델 (권장)}\n    다른 모델들…  {dim:(설치 버전·계정에 따라 목록이 다릅니다)}\n추론 강도(reasoning effort): low · {ok:medium} · high"],
        [/^\/status$/, () => "{acc:>_ OpenAI Codex} (시뮬레이션)\n  Model:        기본 모델 (reasoning medium)\n  Directory:    ~/my-project\n  Permissions:  workspace-write · on-request\n  AGENTS.md:    AGENTS.md\n  Account:      ChatGPT 로그인\n  Token usage:  12.4K total (10.5K input + 1.9K output)\n  Context:      82% left"],
        [/^\/(permissions|approvals)$/, () => "권한 프리셋 선택:\n  {ok:› Auto}       작업 폴더 편집·명령 실행 가능, 그 밖은 승인 요청 (workspace-write + on-request)\n    Read Only  읽기만 가능, 편집·명령 전 승인 요청 (read-only)\n    {err:Full Access}  샌드박스·승인 없음 — 격리 환경에서만!"],
        [/^\/diff$/, () => "{dim:diff --git a/src/app.js b/src/app.js}\n{acc:@@ -10,3 +10,5 @@}\n {dim:  const items = load();}\n{ok:+  if (!items) return [];}\n{ok:+  // 빈 목록 방어}\n {dim:  return items.map(render);}"],
        [/^\/review.*$/, () => "리뷰 대상 선택:\n  {ok:› 커밋되지 않은 변경 리뷰}\n    기본 브랜치 대비 리뷰\n    특정 커밋 리뷰\n    직접 지시문 입력\n{dim:(선택 후 Codex 가 우선순위별로 문제를 보고합니다)}"],
        [/^\/resume$/, () => "저장된 대화:\n  {ok:› 로그인 버그 수정 (어제)}\n    README 정리 (3일 전)"],
        [/^\/mcp.*$/, (c, st) => st.mcp.length ? "{acc:MCP Tools}\n" + st.mcp.map((m) => `  {ok:•} ${m} — 연결됨`).join("\n") : "{dim:설정된 MCP 서버가 없습니다. 터미널에서 'codex mcp add' 로 추가하세요.}"],
        [/^\/mention$/, () => "{dim:파일 검색: (입력하면 후보가 나타납니다)}\n  src/app.js\n  src/api/user.js\n  README.md"],
        [/^\/plan.*$/, () => "{warn:• Plan mode} — 파일을 수정하지 않고 계획만 제안합니다. 계획 확인 후 실행 모드로 전환하세요."],
        [/^\/skills$/, () => "스킬:\n  {ok:$skill-creator}   (system)\n  {ok:$skill-installer} (system)\n  {ok:$release-notes}   (repo: .agents/skills)"],
        [/^\/hooks$/, () => "훅 목록:\n  PostToolUse  ^apply_patch$  → npx prettier --write .   {warn:(검토 필요 — 신뢰하시겠습니까?)}\n  Stop         *              → ./.codex/hooks/notify.sh  {ok:(신뢰됨)}"],
        [/^\/subagents$/, () => "에이전트 스레드:\n  {ok:› main}\n    explorer #1 — 실행 중\n    worker #2  — 완료"],
        [/^\/init$/, () => "{tool:• Explored}\n  {dim:└ Read package.json, README.md · List src/}\n{tool:• Edited} AGENTS.md {ok:(+38)}\n{ok:•} AGENTS.md 초안을 만들었습니다. 내용을 검토해 주세요."],
        [/^\/logout$/, () => "{dim:로그아웃했습니다.}"],
      ],
      generic: genericCodex,
      exitMsg: "{dim:Codex 를 종료했습니다. 다음에 codex resume --last 로 이어서 할 수 있어요.}",
      agentPrompt: "›",
      agentPlaceholder: "Codex 에게 요청하거나 / 명령 입력…",
    },

    cheats: [
      { g: "🚀 실행 (터미널)", items: [
        ["codex", "대화형 TUI 시작", 1], ["codex \"요청\"", "첫 메시지와 함께 시작", 2], ["codex resume --last", "가장 최근 대화 이어가기", 2], ["codex resume", "대화 목록에서 골라 이어가기", 2],
        ["codex fork --last", "최근 대화를 복제해 새로 시작", 2], ["codex -i 화면.png \"설명\"", "이미지 첨부해서 시작", 2], ["codex --search", "실시간 웹 검색 켜기", 7], ["codex --version", "버전 확인", 1],
        ["codex completion zsh", "셸 자동완성 스크립트", 1],
      ] },
      { g: "🔑 설치 · 로그인", items: [
        ["npm install -g @openai/codex", "npm 으로 설치", 1], ["brew install --cask codex", "Homebrew 로 설치", 1], ["curl -fsSL https://chatgpt.com/codex/install.sh | sh", "공식 설치 스크립트 (macOS/Linux)", 1],
        ["codex login", "ChatGPT 계정으로 로그인 (브라우저)", 1], ["codex login --device-auth", "브라우저 없는 환경에서 기기 코드 로그인", 1],
        ["printenv OPENAI_API_KEY | codex login --with-api-key", "API 키로 로그인 (표준 입력)", 1], ["codex login status", "로그인 상태 확인", 1], ["codex logout", "저장된 인증 삭제", 1],
      ] },
      { g: "🛡️ 권한 · 샌드박스", items: [
        ["--sandbox read-only", "읽기 전용 샌드박스", 4], ["--sandbox workspace-write", "작업 폴더 쓰기 허용", 4], ["--sandbox danger-full-access", "샌드박스 없음 (격리 환경 전용)", 23],
        ["--ask-for-approval on-request", "경계 밖 작업은 승인 요청", 4], ["-a never", "승인 요청 없음 (CI 용, read-only 와 함께)", 15], ["--yolo", "승인·샌드박스 모두 끔 — 위험", 4],
        ["codex execpolicy check -- <명령>", "rules 판정 테스트", 4],
      ] },
      { g: "🤖 codex exec (비대화형)", items: [
        ["codex exec \"요청\"", "한 번 실행 후 종료 (기본 read-only)", 15], ["codex exec --json \"...\"", "JSONL 이벤트 스트림 출력", 15], ["codex exec -o result.md \"...\"", "마지막 메시지를 파일로 저장", 15],
        ["codex exec --output-schema schema.json \"...\"", "JSON 스키마에 맞춘 최종 응답", 15], ["cat log | codex exec \"요약해줘\"", "파이프 입력을 맥락으로 전달", 15], ["codex exec resume --last \"...\"", "직전 exec 세션 이어가기", 15],
        ["codex exec --ephemeral \"...\"", "세션 기록을 디스크에 남기지 않음", 22], ["codex exec --skip-git-repo-check \"...\"", "git 저장소 밖에서 실행 허용", 15], ["codex review --base main", "기본 브랜치 대비 비대화형 리뷰", 9],
      ] },
      { g: "/ 슬래시 명령", items: [
        ["/init", "AGENTS.md 초안 생성", 3], ["/status", "설정·토큰 사용량", 1], ["/model", "모델·추론 강도", 2], ["/permissions", "권한 프리셋 변경", 4], ["/plan", "계획 모드", 6],
        ["/review", "코드 리뷰", 9], ["/diff", "변경 내용 보기", 5], ["/mention", "파일 첨부", 2], ["/compact", "대화 요약", 2], ["/new", "새 대화", 2], ["/resume", "대화 이어가기", 2],
        ["/mcp", "MCP 도구 목록", 14], ["/skills", "스킬 보기·실행", 19], ["/hooks", "훅 검토·신뢰", 19], ["/subagents", "서브에이전트 스레드 전환", 20], ["/exit", "종료 (/quit 동일)", 1],
      ] },
      { g: "⌨️ 단축키 & 기호", items: [
        ["@", "파일 검색해서 경로 첨부", 2], ["!명령", "셸 명령 바로 실행", 2], ["$스킬이름", "스킬 직접 호출", 19], ["Esc", "진행 중인 작업 중단", 2], ["Esc Esc (빈 입력창)", "이전 메시지 수정 후 다시 시작", 2],
        ["Enter (작업 중)", "현재 작업에 지시 추가(조종)", 2], ["Tab (작업 중)", "다음 차례에 보낼 메시지 예약", 2], ["Ctrl+G", "외부 편집기로 긴 프롬프트 작성", 2], ["Ctrl+R", "프롬프트 기록 검색", 2], ["Ctrl+C", "종료", 1],
      ] },
      { g: "🔌 MCP 명령", items: [
        ["codex mcp add <이름> -- <명령>", "로컬(stdio) 서버 추가", 14], ["codex mcp add <이름> --url <URL>", "원격(HTTP) 서버 추가", 14], ["codex mcp add <이름> --env K=V -- <명령>", "환경 변수 전달", 14],
        ["codex mcp list", "서버 목록", 14], ["codex mcp get <이름>", "서버 상세", 14], ["codex mcp login <이름>", "OAuth 로그인", 14], ["codex mcp remove <이름>", "서버 삭제", 14],
      ] },
      { g: "☁️ 클라우드 · GitHub", items: [
        ["@codex review", "PR 댓글로 코드 리뷰 요청", 17], ["@codex <작업>", "PR 맥락으로 클라우드 작업 시작", 17], ["codex cloud", "클라우드 작업 선택 화면", 17], ["codex cloud exec --env <ENV_ID> \"...\"", "터미널에서 클라우드 작업 시작", 20],
        ["codex apply <TASK_ID>", "클라우드 결과를 로컬에 적용", 17], ["openai/codex-action@v1", "GitHub Action", 17],
      ] },
      { g: "📁 주요 파일 위치", items: [
        ["~/.codex/config.toml", "개인 설정", 13], ["~/.codex/<이름>.config.toml", "프로필 파일 (--profile 이름)", 13], [".codex/config.toml", "프로젝트 설정 (신뢰된 프로젝트만)", 13], ["AGENTS.md", "프로젝트 지침 (팀 공유)", 3],
        ["~/.codex/AGENTS.md", "개인 전역 지침", 3], ["AGENTS.override.md", "같은 폴더의 AGENTS.md 대신 사용", 3], ["~/.codex/rules/*.rules", "명령 허용/확인/금지 규칙", 4], [".agents/skills/*/SKILL.md", "스킬", 19],
        [".codex/agents/*.toml", "커스텀 서브에이전트", 20], [".codex/hooks.json", "훅 설정", 19], [".github/workflows/*.yml", "GitHub Actions", 17],
      ] },
      { g: "🌿 git worktree", items: [
        ["git worktree add ../폴더 -b 브랜치", "병렬 작업 폴더 만들기", 20], ["git worktree list", "목록", 20], ["git worktree remove ../폴더", "삭제", 20],
      ] },
    ],

    glossary: [
      ["에이전트", "Agent", "목표를 받으면 스스로 계획하고 도구를 사용해 실행·검증을 반복하는 AI."],
      ["Codex CLI", "", "OpenAI 의 오픈소스 터미널 코딩 에이전트. codex 명령으로 실행한다."],
      ["TUI", "Terminal User Interface", "터미널 안에서 동작하는 대화형 화면. codex 를 실행하면 열린다."],
      ["프롬프트", "Prompt", "AI 에게 주는 요청·지시문. 목표·맥락·제약·완료 기준을 담을수록 좋다."],
      ["컨텍스트", "Context", "AI 가 한 번에 기억하고 참고할 수 있는 대화·파일 내용. 길어지면 /compact, 주제가 바뀌면 /new."],
      ["토큰", "Token", "AI 가 텍스트를 처리하는 단위. 사용량과 비용의 기준이 된다. /status 로 확인."],
      ["추론 강도", "Reasoning effort", "모델이 답하기 전에 얼마나 깊이 생각할지 정하는 설정. /model 또는 model_reasoning_effort."],
      ["AGENTS.md", "", "Codex 가 작업 시작 시 자동으로 읽는 프로젝트 지침 파일. 루트부터 현재 폴더까지 합쳐서 읽는다."],
      ["config.toml", "", "Codex 설정 파일. 기본 위치는 ~/.codex/config.toml, TOML 형식."],
      ["TOML", "Tom's Obvious Minimal Language", "key = \"value\" 와 [표] 로 이루어진 설정 파일 형식."],
      ["프로필", "Profile", "~/.codex/<이름>.config.toml 에 둔 설정 묶음. --profile <이름> 으로 덧씌운다."],
      ["샌드박스", "Sandbox", "Codex 가 실행하는 명령이 접근할 수 있는 파일·네트워크 범위를 OS 수준에서 제한하는 울타리."],
      ["승인 정책", "Approval policy", "샌드박스 밖 작업을 할 때 사용자에게 물어볼지 정하는 설정 (on-request, never 등)."],
      ["규칙", "Rules (.rules)", "prefix_rule() 로 특정 명령을 allow / prompt / forbidden 으로 정하는 Starlark 파일."],
      ["MCP", "Model Context Protocol", "AI 와 외부 도구·데이터를 연결하는 표준 규격. AI 용 USB-C."],
      ["MCP 서버", "MCP server", "MCP 규격으로 도구를 제공하는 프로그램 (GitHub, DB, 브라우저 등)."],
      ["슬래시 명령", "Slash command", "/ 로 시작하는 TUI 명령. / 만 입력하면 목록이 나온다."],
      ["스킬", "Skill", "SKILL.md 와 스크립트를 묶은 작업 매뉴얼. $이름 으로 부르거나 Codex 가 설명을 보고 스스로 고른다."],
      ["훅", "Hook", "PreToolUse, Stop 같은 이벤트 때 자동 실행되는 명령. 검토·신뢰한 뒤에만 실행된다."],
      ["서브에이전트", "Subagent", "메인 에이전트가 일을 나눠 맡기는 보조 에이전트. 병렬로 일하고 결과를 합친다."],
      ["비대화형 모드", "codex exec", "대화창 없이 한 번 실행하고 결과만 출력. 스크립트·CI 용."],
      ["JSONL", "JSON Lines", "한 줄에 JSON 객체 하나씩 쓰는 형식. codex exec --json 의 출력 형식."],
      ["JSON Schema", "", "JSON 데이터의 모양(필드·타입)을 정의하는 규격. --output-schema 에 사용."],
      ["Codex Cloud", "", "OpenAI 클라우드의 격리 환경에서 작업을 실행하는 서비스. 여러 작업을 병렬로 돌릴 수 있다."],
      ["Codex SDK", "@openai/codex-sdk", "Codex 에이전트를 내 프로그램에서 쓰게 하는 라이브러리 (TypeScript, Python)."],
      ["worktree", "git worktree", "같은 저장소를 여러 폴더·브랜치로 동시에 꺼내 쓰는 git 기능."],
      ["CI/CD", "Continuous Integration/Delivery", "코드 변경마다 자동 테스트(CI)와 자동 배포(CD)."],
      ["GitHub Actions", "", "GitHub 의 자동화(워크플로우) 실행 서비스. .github/workflows 에 정의."],
      ["TDD", "Test-Driven Development", "테스트를 먼저 쓰고, 통과하도록 구현하고, 정리하는 개발 방식."],
      ["리팩토링", "Refactoring", "동작은 그대로 두고 코드 구조를 개선하는 것."],
      ["ADR", "Architecture Decision Record", "설계 결정과 그 이유를 기록한 짧은 문서."],
      ["프롬프트 인젝션", "Prompt injection", "외부 데이터에 숨겨진 악성 지시로 AI 를 조종하려는 공격."],
      ["OpenTelemetry", "OTel", "지표·로그·추적 데이터를 내보내는 표준. config.toml 의 [otel] 로 설정."],
      ["Webhook", "", "이벤트 발생 시 지정된 URL 로 HTTP 요청을 보내는 방식. 슬랙 알림 등에 사용."],
      ["시크릿", "Secret", "API 키·토큰 같은 비밀값. 코드에 쓰지 않고 비밀 저장소·환경 변수로 관리."],
      ["최소 권한", "Least privilege", "작업에 꼭 필요한 권한만 주는 보안 원칙."],
    ],
  };
})();
