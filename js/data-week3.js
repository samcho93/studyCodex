/* 3주차 — 자동화 */
window.WEEK3 = [
  /* ----------------------------------------------------- Day 13 */
  {
    id: 13, week: 3, icon: "🎛️", time: "50분", level: 2,
    title: "config.toml 설정과 프로필",
    subtitle: "~/.codex/config.toml 로 기본 동작을 정하고, 프로필 파일과 -c 옵션으로 상황별 설정을 갈아끼웁니다.",
    goals: ["config.toml 의 위치와 TOML 문법을 안다", "자주 쓰는 설정 키를 직접 작성한다", "프로필 파일과 -c 로 설정을 덧씌운다"],
    analogy: { i: "🚗", t: "자동차의 <b>운전자 프로필 버튼</b>과 같습니다. 버튼 1번은 출퇴근용(편안한 좌석, 에코 모드), 2번은 장거리용(스포츠 모드). config.toml 이 차의 <b>기본 세팅</b>, 프로필이 <b>버튼별 세팅</b>, <code>-c</code> 는 <b>오늘만 잠깐</b> 바꾸는 조절 레버입니다." },
    sections: [
      {
        h: "config.toml 은 어디에?",
        body: `<ul><li><b>개인 설정</b>: <code>~/.codex/config.toml</code> (Codex 홈 = <code>CODEX_HOME</code>, 기본 <code>~/.codex</code>)</li>
        <li><b>프로젝트 설정</b>: <code>.codex/config.toml</code> — 프로젝트 루트부터 현재 폴더까지 읽고, 가까운 파일이 이깁니다. 단, <b>신뢰한 프로젝트에서만</b> 적용됩니다.</li>
        <li><b>한 번만</b>: <code>codex -c 키=값</code> — 그 실행에만 적용 (값은 가능하면 TOML 로 해석)</li></ul>
        <p>TOML 은 <code>키 = 값</code> 과 <code>[표 이름]</code> 으로 이루어진 단순한 형식입니다. 문자열은 따옴표, 배열은 <code>[ ]</code>.</p>`,
      },
      {
        h: "자주 쓰는 설정",
        code: { lang: "toml", file: "~/.codex/config.toml", text: "# 모델 (이름은 /model 목록에 보이는 것을 그대로)\n# model = \"모델-이름\"\nmodel_reasoning_effort = \"medium\"     # 추론 강도\n\n# 권한 기본값 (Day 4)\nsandbox_mode = \"workspace-write\"\napproval_policy = \"on-request\"\n\n[sandbox_workspace_write]\nnetwork_access = false\n\n# AGENTS.md 대체 파일 이름 / 크기 제한 (Day 3)\nproject_doc_fallback_filenames = [\"TEAM_GUIDE.md\"]\n\n# 대화 기록 저장 끄기\n[history]\npersistence = \"none\"\n\n# 명령에 넘길 환경 변수 거르기 — 비밀값 노출 방지\n[shell_environment_policy]\ninherit = \"core\"\nignore_default_excludes = false   # KEY/SECRET/TOKEN 이 들어간 변수 자동 제외" },
        tip: "<b>🔎 지금 적용된 설정은?</b> TUI 에서 <code>/status</code> 로 모델·권한을, <code>/debug-config</code>(지원 버전)로 어떤 설정 파일이 겹쳐졌는지 볼 수 있습니다. 설정 키는 버전마다 추가·변경되므로 공식 Configuration Reference 를 기준으로 하세요.",
      },
      {
        h: "프로필 — 상황별 설정 파일",
        body: "<p>현재 문서 기준으로 프로필은 <b>별도 파일</b>입니다. <code>codex --profile 이름</code> 은 기본 <code>config.toml</code> 을 읽은 뒤 <code>~/.codex/이름.config.toml</code> 을 위에 덧씌웁니다. 프로필 파일 안에는 <b>최상위 키</b>를 그대로 씁니다.</p>",
        code: [
          { lang: "toml", file: "~/.codex/deep-review.config.toml", text: "model_reasoning_effort = \"high\"\nsandbox_mode = \"read-only\"\napproval_policy = \"on-request\"" },
          { lang: "bash", file: "terminal", text: "codex --profile deep-review                       # 꼼꼼한 리뷰용\ncodex exec --profile deep-review \"이 변경 리뷰해 줘\"\ncodex -c model_reasoning_effort=low \"오타만 고쳐 줘\"   # 이번 한 번만" },
        ],
        tip: "<b>📌 버전 메모</b> 예전 자료의 <code>[profiles.이름]</code> 표 형식과 최상위 <code>profile = \"이름\"</code> 은 0.134.0 부터 지원되지 않는다고 문서에 안내되어 있습니다. 옛 설정이 있다면 별도 파일로 옮기세요.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "layers", title: "설정이 겹쳐지는 순서 (아래로 갈수록 우선)",
      desc: "문서 기준 요약입니다. 같은 키가 여러 곳에 있으면 더 아래(구체적인) 쪽이 이깁니다.",
      layers: [
        { i: "🏠", n: "사용자 기본", chips: ["~/.codex/config.toml"], d: "내 모든 작업의 기본값" },
        { i: "🎚️", n: "프로필", chips: ["~/.codex/이름.config.toml", "--profile"], d: "상황별 세팅" },
        { i: "📂", n: "프로젝트", chips: [".codex/config.toml", "신뢰한 프로젝트만"], d: "현재 폴더에 가까운 파일 우선" },
        { i: "⌨️", n: "명령줄", chips: ["-c 키=값", "--sandbox", "-m"], d: "이번 실행에만" },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 TOML 작성", title: "나의 기본 config.toml 만들기",
        intro: "다음을 만족하는 ~/.codex/config.toml 을 작성하세요: 추론 강도 medium, workspace-write + on-request, 네트워크 꺼짐, AGENTS.md 대체 파일 TEAM_GUIDE.md, 비밀 환경 변수 자동 제외.",
        file: "~/.codex/config.toml",
        starter: "# 설정을 작성하세요\n",
        checks: [
          { label: "model_reasoning_effort = \"medium\"", re: /^model_reasoning_effort\s*=\s*"medium"/m },
          { label: "sandbox_mode = \"workspace-write\"", re: /^sandbox_mode\s*=\s*"workspace-write"/m },
          { label: "approval_policy = \"on-request\"", re: /^approval_policy\s*=\s*"on-request"/m },
          { label: "[sandbox_workspace_write] 표에 network_access = false", re: /^\[sandbox_workspace_write\]\s*\n(?:[^\[]*\n)*?\s*network_access\s*=\s*false/m },
          { label: "project_doc_fallback_filenames 에 TEAM_GUIDE.md", re: /^project_doc_fallback_filenames\s*=\s*\[[^\]]*"TEAM_GUIDE\.md"/m },
          { label: "[shell_environment_policy] 에 ignore_default_excludes = false", re: /^\[shell_environment_policy\]\s*\n(?:[^\[]*\n)*?\s*ignore_default_excludes\s*=\s*false/m },
          { label: "최상위 키가 표([..])보다 먼저 나온다", fn: (v) => { const t = v.search(/^\[/m); const k = v.search(/^sandbox_mode/m); return k >= 0 && (t < 0 || k < t); } },
        ],
        solution: "model_reasoning_effort = \"medium\"\nsandbox_mode = \"workspace-write\"\napproval_policy = \"on-request\"\nproject_doc_fallback_filenames = [\"TEAM_GUIDE.md\"]\n\n[sandbox_workspace_write]\nnetwork_access = false\n\n[shell_environment_policy]\ninherit = \"core\"\nignore_default_excludes = false\n",
        tip: "<b>TOML 함정</b> <code>[표]</code> 아래에 쓴 키는 모두 그 표 소속이 됩니다. 최상위 키는 반드시 첫 <code>[표]</code> 보다 위에!",
      },
      {
        type: "terminal", title: "프로필과 -c 로 설정 바꿔 실행하기",
        files: ["package.json", "src/"],
        tasks: [
          { goal: "프로필 파일 내용 확인", hint: "cat ~/.codex/deep-review.config.toml", match: /^cat ~\/\.codex\/deep-review\.config\.toml$/, out: "model_reasoning_effort = \"high\"\nsandbox_mode = \"read-only\"\napproval_policy = \"on-request\"" },
          { goal: "deep-review 프로필로 Codex 실행", hint: "codex --profile deep-review", match: /^codex (--profile|-p) deep-review$/, enter: "agent", out: "{dim:profile: deep-review 적용}" },
          { goal: "적용된 설정 확인", hint: "/status", match: /^\/status$/, mode: "agent", out: "  Model:        기본 모델 (reasoning {ok:high})\n  Permissions:  {ok:read-only} · on-request\n  Profile:      deep-review" },
          { goal: "종료", hint: "/exit", match: /^(\/exit|\/quit|exit)$/, mode: "agent", enter: "shell", out: "" },
          { goal: "이번 한 번만 추론 강도를 low 로 바꿔 실행", hint: "codex -c model_reasoning_effort=low", match: /^codex (-c|--config) model_reasoning_effort="?low"?$/, enter: "agent", out: "{dim:-c 오버라이드 적용: model_reasoning_effort=low}" },
          { goal: "다시 확인", hint: "/status", match: /^\/status$/, mode: "agent", out: "  Model:        기본 모델 (reasoning {ok:low})\n  Permissions:  workspace-write · on-request" },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "# 설정 파일 열기 (없으면 새로 만들기)\ncode ~/.codex/config.toml        # 또는 notepad / vim\n# 프로필 만들기\ncode ~/.codex/deep-review.config.toml\ncodex --profile deep-review\n› /status" },
    },
    mistakes: [
      ["최상위 키를 <code>[표]</code> 아래에 적어서 엉뚱한 표 소속이 됨", "최상위 키는 파일 맨 위에, 표는 그 아래에"],
      ["블로그의 옛 <code>[profiles.x]</code> 예제를 그대로 복사", "현재 문서 기준인 <code>~/.codex/x.config.toml</code> 별도 파일 사용"],
    ],
    checklist: ["config.toml 위치를 안다", "sandbox_mode / approval_policy 를 설정 파일로 정했다", "프로필 파일을 하나 만들어 --profile 로 실행했다", "-c 로 한 번만 설정을 바꿔 보았다"],
  },

  /* ----------------------------------------------------- Day 14 */
  {
    id: 14, week: 3, icon: "🔌", time: "60분", level: 2,
    title: "MCP 서버 연결",
    subtitle: "MCP(Model Context Protocol)로 문서 검색, 브라우저, 디자인 도구, 사내 시스템 등 외부 도구를 Codex 에 연결합니다.",
    goals: ["MCP 가 무엇이고 왜 필요한지 안다", "codex mcp add 로 stdio·HTTP 서버를 추가한다", "config.toml 의 [mcp_servers] 를 직접 작성한다"],
    analogy: { i: "🔌", t: "MCP 는 AI 용 <b>USB-C 포트</b>입니다. 모니터든 충전기든 USB-C 하나로 연결되듯, MCP 규격만 맞추면 문서 검색·브라우저·Figma·DB 같은 도구를 Codex 에 꽂아 쓸 수 있습니다." },
    sections: [
      {
        h: "MCP 로 할 수 있는 것",
        body: `<ul><li>📚 <b>최신 문서 검색</b>(예: Context7): 라이브러리 최신 사용법을 찾아 코딩</li>
        <li>🌐 <b>브라우저 도구</b>(Playwright, Chrome DevTools 등): 페이지를 열고 스크린샷으로 UI 확인</li>
        <li>🎨 <b>디자인</b>(Figma): 시안 정보를 읽어 그대로 구현</li>
        <li>🗄️ <b>사내 시스템</b>: 직접 만든 MCP 서버로 DB·티켓 시스템 조회</li></ul>
        <p>연결 방식은 두 가지: 내 PC 에서 프로그램을 실행하는 <b>stdio</b>, 원격 주소에 접속하는 <b>스트리밍 HTTP</b>.</p>`,
      },
      {
        h: "codex mcp 명령",
        code: { lang: "bash", file: "터미널", text: "# 로컬(stdio) 서버: -- 뒤가 실행할 명령\ncodex mcp add context7 -- npx -y @upstash/context7-mcp\n\n# 환경 변수 전달 (stdio 전용, 여러 번 가능)\ncodex mcp add mydb --env DB_URL=postgres://localhost/dev -- npx my-db-mcp\n\n# 원격(HTTP) 서버\ncodex mcp add figma --url https://mcp.figma.com/mcp\ncodex mcp login figma          # OAuth 로그인이 필요한 서버\n\ncodex mcp list                 # 목록 (--json 가능)\ncodex mcp get context7         # 상세\ncodex mcp remove context7      # 삭제" },
        after: "<p>Codex TUI 안에서는 <code>/mcp</code> 로 연결된 도구 목록을 봅니다(<code>/mcp verbose</code> 로 상세).</p>",
      },
      {
        h: "config.toml 로 직접 관리",
        body: "<p><code>codex mcp add</code> 는 결국 <code>~/.codex/config.toml</code> 의 <code>[mcp_servers.이름]</code> 표를 만듭니다. 팀이 공유하려면 신뢰된 프로젝트의 <code>.codex/config.toml</code> 에 둘 수 있습니다.</p>",
        code: { lang: "toml", file: "~/.codex/config.toml", text: "[mcp_servers.context7]\ncommand = \"npx\"\nargs = [\"-y\", \"@upstash/context7-mcp\"]\n\n[mcp_servers.figma]\nurl = \"https://mcp.figma.com/mcp\"\nbearer_token_env_var = \"FIGMA_OAUTH_TOKEN\"   # 토큰은 환경 변수 '이름'만\n\n[mcp_servers.chrome_devtools]\nurl = \"http://localhost:3000/mcp\"\nenabled_tools = [\"open\", \"screenshot\"]     # 이 도구만 허용\nstartup_timeout_sec = 20                     # 기본 10\ntool_timeout_sec = 45                        # 기본 60\nenabled = true                               # false 면 삭제 없이 끄기" },
        tip: "<b>⚠️ 신뢰할 수 있는 서버만</b> MCP 서버가 돌려주는 내용에 악성 지시(프롬프트 인젝션)가 섞일 수 있습니다. 공식·검증된 서버만 쓰고, <code>enabled_tools</code> 로 필요한 도구만 열고, 토큰은 설정 파일에 직접 쓰지 마세요.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "hub", title: "MCP — Codex 를 중심으로 연결되는 도구들",
      desc: "각 서버를 클릭하면 어떤 방식으로 연결되는지 보여 줍니다.",
      center: "Codex\n(MCP 클라이언트)",
      nodes: [
        { i: "📚", t: "Context7", d: "최신 문서", via: "stdio", x: "<code>npx</code> 로 내 PC 에서 실행. 라이브러리 최신 문서를 검색합니다." },
        { i: "🎨", t: "Figma", d: "디자인 시안", via: "HTTP", x: "원격 HTTP 서버. <code>codex mcp login figma</code> 또는 <code>bearer_token_env_var</code> 로 인증." },
        { i: "🌐", t: "브라우저", d: "UI 확인", via: "stdio/HTTP", x: "페이지 열기·스크린샷. <code>enabled_tools</code> 로 필요한 도구만." },
        { i: "🐙", t: "GitHub", d: "이슈·PR", via: "HTTP", x: "이슈·PR 조회 도구. 쓰기 권한은 최소로." },
        { i: "🗄️", t: "Database", d: "SQL 조회", via: "stdio", x: "<code>--env DB_URL=...</code> 로 접속 정보 전달. 읽기 전용 계정을 권장." },
        { i: "🏢", t: "사내 API", d: "직접 만든 서버", via: "stdio/HTTP", x: "MCP SDK 로 우리 회사 시스템용 서버를 만들 수 있습니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "MCP 서버 연결하기",
        tasks: [
          { goal: "현재 MCP 서버 목록 확인", hint: "codex mcp list", match: /^codex mcp list$/, out: "{dim:No MCP servers configured yet. Try `codex mcp add my-tool -- my-command`.}" },
          { goal: "Context7 서버를 stdio 로 추가 (-- 뒤에 npx 명령)", hint: "codex mcp add context7 -- npx -y @upstash/context7-mcp", match: /^codex mcp add context7 -- npx (-y )?@upstash\/context7-mcp(@latest)?$/, addMcp: "context7", out: "{ok:Added global MCP server 'context7'.}" },
          { goal: "Figma 서버를 HTTP(--url)로 추가", hint: "codex mcp add figma --url https://mcp.figma.com/mcp", match: /^codex mcp add figma --url https?:\/\/\S+$/, addMcp: "figma", out: "{ok:Added global MCP server 'figma'.}\n{warn:이 서버는 OAuth 로그인이 필요할 수 있습니다: codex mcp login figma}" },
          { goal: "Figma OAuth 로그인", hint: "codex mcp login figma", match: /^codex mcp login figma$/, out: "{dim:브라우저에서 인증을 진행합니다… (시뮬레이션)}\n{ok:Successfully logged in to MCP server 'figma'.}" },
          { goal: "Codex 실행", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "연결된 MCP 도구 확인", hint: "/mcp", match: /^\/mcp( verbose)?$/, mode: "agent", out: "{acc:MCP Tools}\n  {ok:•} context7 — resolve-library-id, get-library-docs\n  {ok:•} figma — get_design_context, get_screenshot …" },
          { goal: "MCP 도구를 쓰는 요청 (예: 최신 문서 참고)", hint: "context7 로 최신 React Router 문서를 찾아보고 라우팅 설정을 고쳐줘", match: /(context7|figma|문서|시안)/i, mode: "agent", out: "{tool:• Called} context7.resolve-library-id {dim:(react-router)}\n{tool:• Called} context7.get-library-docs {dim:(routing)}\n{tool:• Edited} src/router.tsx {ok:(+12 -9)}\n{ok:•} 최신 문서의 createBrowserRouter 방식으로 바꿨습니다." },
        ],
      },
      {
        type: "editor", label: "🧩 TOML 작성", title: "[mcp_servers] 직접 작성하기",
        intro: "config.toml 에 context7(stdio: npx -y @upstash/context7-mcp)과 figma(HTTP: https://mcp.figma.com/mcp, 토큰은 환경 변수 FIGMA_OAUTH_TOKEN)를 등록하세요.",
        file: "~/.codex/config.toml",
        starter: "# MCP 서버 설정\n",
        checks: [
          { label: "[mcp_servers.context7] 표가 있다", re: /^\[mcp_servers\.context7\]/m },
          { label: "context7 은 command = \"npx\" 로 실행", re: /\[mcp_servers\.context7\][^\[]*command\s*=\s*"npx"/ },
          { label: "context7 의 args 배열에 @upstash/context7-mcp", re: /\[mcp_servers\.context7\][^\[]*args\s*=\s*\[[^\]]*"@upstash\/context7-mcp/ },
          { label: "[mcp_servers.figma] 에 url = \"https://...\"", re: /\[mcp_servers\.figma\][^\[]*url\s*=\s*"https:\/\/\S+"/ },
          { label: "figma 토큰은 bearer_token_env_var 로 환경 변수 이름만", re: /\[mcp_servers\.figma\][^\[]*bearer_token_env_var\s*=\s*"FIGMA_OAUTH_TOKEN"/ },
          { label: "토큰 값을 직접 적지 않았다", fn: (v) => !/(token|secret|password)\s*=\s*"(?![A-Z_]+")[^"]+"/i.test(v.replace(/bearer_token_env_var\s*=\s*"[A-Z_]+"/g, "")) },
        ],
        solution: "[mcp_servers.context7]\ncommand = \"npx\"\nargs = [\"-y\", \"@upstash/context7-mcp\"]\n\n[mcp_servers.figma]\nurl = \"https://mcp.figma.com/mcp\"\nbearer_token_env_var = \"FIGMA_OAUTH_TOKEN\"\n",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "codex mcp add context7 -- npx -y @upstash/context7-mcp\ncodex mcp list\ncodex\n› /mcp\n› context7 로 express 최신 문서를 찾아서 미들웨어 작성법을 요약해 줘" },
    },
    mistakes: [
      ["출처 모를 MCP 서버 설치", "공식/검증된 서버만, <code>enabled_tools</code> 로 최소 도구만"],
      ["API 토큰을 config.toml 에 평문으로", "<code>bearer_token_env_var</code> 나 <code>--env</code> 로 환경 변수에서 전달"],
    ],
    checklist: ["MCP 를 한 문장으로 설명할 수 있다", "codex mcp add 로 stdio·HTTP 서버를 추가했다", "[mcp_servers.이름] 표를 직접 써 보았다", "/mcp 로 도구 목록을 확인했다"],
  },

  /* ----------------------------------------------------- Day 15 */
  {
    id: 15, week: 3, icon: "🤖", time: "60분", level: 2,
    title: "codex exec — 비대화형 자동화",
    subtitle: "대화창 없이 Codex 를 부품처럼 실행합니다. 파이프 입력, JSON 이벤트, 스키마에 맞춘 결과까지.",
    goals: ["codex exec 의 기본 동작(read-only)을 안다", "--json / -o / --output-schema 로 결과를 받는다", "스크립트·CI 에서 안전하게 실행하는 법을 안다"],
    analogy: { i: "📼", t: "대화형 Codex 가 <b>마주 앉아 일하는 동료</b>라면, <code>codex exec</code> 는 <b>업무 요청서를 넣으면 결과물을 내놓는 창구</b>입니다. 사람이 옆에 없어도 스크립트·cron·CI 가 창구에 요청서를 넣을 수 있죠." },
    sections: [
      {
        h: "기본 사용법",
        body: "<p><code>codex exec \"요청\"</code> 은 한 번 실행하고 종료합니다. 진행 상황은 표준 에러(stderr)로, <b>최종 답만 표준 출력(stdout)</b>으로 나오므로 파이프·리다이렉트에 바로 연결됩니다. 별칭은 <code>codex e</code>.</p>",
        code: { lang: "bash", file: "터미널 / 스크립트", text: "codex exec \"저장소 구조를 요약하고 위험한 영역 5곳을 꼽아 줘\"\n\n# 파이프: 프롬프트는 지시, 파이프로 들어온 내용은 '추가 맥락'\ntail -n 200 app.log | codex exec \"에러 원인을 3줄로 요약해 줘\"\n\n# 프롬프트 전체를 표준 입력으로\ncat prompt.txt | codex exec -\n\n# 결과를 파일로\ncodex exec \"릴리스 노트 초안 작성\" | tee release-notes.md\ncodex exec \"릴리스 노트 초안 작성\" -o release-notes.md   # 마지막 메시지만 저장" },
      },
      {
        h: "권한: 기본은 read-only",
        body: `<ul><li><b>기본 샌드박스는 read-only</b> — 분석·요약은 그대로, 파일 수정이 필요하면 <code>--sandbox workspace-write</code></li>
        <li>git 저장소가 아닌 곳에서는 실행을 거부합니다. 안전한 환경이라면 <code>--skip-git-repo-check</code></li>
        <li>세션 기록을 남기고 싶지 않으면 <code>--ephemeral</code></li>
        <li>이어서 시키기: <code>codex exec resume --last \"찾은 문제를 고쳐 줘\"</code></li>
        <li>CI 인증: 실행 한 번에만 <code>CODEX_API_KEY=... codex exec ...</code> 처럼 전달 (Day 23)</li></ul>`,
        tip: "<b>📌 버전 메모</b> 예전 예제의 <code>codex exec --full-auto</code> 는 현재 문서에서 더 이상 지원하지 않는다고 안내합니다. 대신 <code>--sandbox workspace-write</code> 를 쓰세요.",
        tipType: "warn",
      },
      {
        h: "기계가 읽는 출력: --json 과 --output-schema",
        code: [
          { lang: "bash", file: "JSON Lines 이벤트 스트림", text: "codex exec --json \"TODO 주석 목록 정리\" | jq -c 'select(.type==\"turn.completed\")'\n# 이벤트 종류: thread.started, turn.started, item.*, turn.completed(usage 포함), turn.failed, error" },
          { lang: "json", file: "schema.json", text: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"project_name\": { \"type\": \"string\" },\n    \"programming_languages\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } }\n  },\n  \"required\": [\"project_name\", \"programming_languages\"],\n  \"additionalProperties\": false\n}" },
          { lang: "bash", file: "스키마에 맞춘 최종 응답", text: "codex exec \"이 프로젝트의 메타데이터를 추출해 줘\" \\\n  --output-schema schema.json -o project-metadata.json" },
        ],
      },
    ],
    viz: {
      type: "sequence", title: "스크립트에서 codex exec 가 동작하는 흐름",
      actors: [{ t: "스크립트", i: "📜" }, { t: "codex exec", i: "◎", center: true }, { t: "저장소", i: "📁" }, { t: "출력", i: "📤" }],
      msgs: [
        { from: "스크립트", to: "codex exec", t: "로그 | codex exec \"요약\" --json", x: "프롬프트와 파이프 입력(맥락)을 전달합니다." },
        { from: "codex exec", to: "출력", t: "thread.started / turn.started", x: "<code>--json</code> 이면 이벤트가 한 줄씩 stdout 으로 나갑니다." },
        { from: "codex exec", to: "저장소", t: "파일 읽기 (read-only)", x: "기본 샌드박스는 읽기 전용. 수정하려면 <code>--sandbox workspace-write</code>." },
        { from: "codex exec", to: "출력", t: "item.completed …", x: "명령 실행·메시지 같은 작업 단위가 이벤트로 기록됩니다." },
        { from: "codex exec", to: "출력", t: "turn.completed (usage)", x: "토큰 사용량이 포함됩니다 — 비용 모니터링에 활용 (Day 22)." },
        { from: "출력", to: "스크립트", t: "jq 로 파싱 / -o 파일", x: "스크립트는 결과를 읽어 다음 단계(알림·PR 등)로 넘깁니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "codex exec 체험",
        files: ["app.log", "src/", "package.json", "schema.json"],
        cat: { "app.log": "TypeError: Cannot read properties of undefined (reading 'map')\n    at renderList (src/List.jsx:12)" },
        tasks: [
          { goal: "로그 내용 보기", hint: "cat app.log", match: /^cat app\.log$/, out: "TypeError: Cannot read properties of undefined (reading 'map')\n    at renderList (src/List.jsx:12)" },
          { goal: "파이프로 로그를 넘겨 원인 요약 받기", hint: "cat app.log | codex exec \"원인을 요약해줘\"", match: /^(cat|tail .*) app\.log \| codex exec .+/, stream: true, out: "원인: List.jsx 12번째 줄에서 items 가 아직 로드되지 않아 undefined 인데 .map() 을 호출했습니다.\n해결: items 의 기본값을 [] 로 두거나 (items ?? []).map(...) 을 사용하세요." },
          { goal: "JSONL 이벤트로 결과 받기", hint: "codex exec --json \"TODO 주석 목록 보여줘\"", match: /^codex exec --json .+/, stream: true, out: "{\"type\":\"thread.started\",\"thread_id\":\"0199a2…\"}\n{\"type\":\"turn.started\"}\n{\"type\":\"item.completed\",\"item\":{\"type\":\"command_execution\",\"command\":\"rg TODO\"}}\n{\"type\":\"item.completed\",\"item\":{\"type\":\"agent_message\",\"text\":\"TODO 3개: src/api.js:8, …\"}}\n{\"type\":\"turn.completed\",\"usage\":{\"input_tokens\":8120,\"output_tokens\":240}}\n{dim:→ 실제 필드 구성은 버전에 따라 다를 수 있습니다}" },
          { goal: "스키마에 맞춘 결과를 파일로 받기", hint: "codex exec \"프로젝트 메타데이터 추출해줘\" --output-schema schema.json -o meta.json", match: /^codex exec .+ --output-schema \S+\.json( (-o|--output-last-message) \S+)?$/, stream: true, out: "{dim:(최종 응답을 meta.json 에 저장했습니다)}\n{\"project_name\":\"my-project\",\"programming_languages\":[\"JavaScript\"]}" },
          { goal: "파일 수정이 필요한 작업은 쓰기 샌드박스로", hint: "codex exec --sandbox workspace-write \"List.jsx 의 undefined 버그 고쳐줘\"", match: /^codex exec (--sandbox|-s) workspace-write .+/, stream: true, out: "{tool:• Edited} src/List.jsx {ok:(+1 -1)}\n{tool:• Ran} npm test\n  {dim:└ 8 passed}\n수정 완료: items 기본값을 [] 로 설정했습니다." },
        ],
      },
      {
        type: "editor", label: "🧩 JSON 작성", title: "리뷰 결과용 JSON Schema 만들기",
        intro: "codex exec --output-schema 로 리뷰 결과를 받으려 합니다. findings 배열(각 항목: file 문자열, line 숫자, severity 는 high/medium/low 중 하나)을 가진 스키마를 작성하세요.",
        file: "review-schema.json",
        starter: "{\n  \"type\": \"object\",\n  \"properties\": {\n\n  }\n}",
        checks: [
          { label: "올바른 JSON", fn: (v) => { JSON.parse(v); return true; } },
          { label: "최상위 type 은 object", fn: (v) => JSON.parse(v).type === "object" },
          { label: "findings 는 array", fn: (v) => JSON.parse(v).properties.findings.type === "array" },
          { label: "항목에 file(string), line(integer/number)", fn: (v) => { const p = JSON.parse(v).properties.findings.items.properties; return p.file.type === "string" && /integer|number/.test(p.line.type); } },
          { label: "severity 는 enum [high, medium, low]", fn: (v) => { const e = JSON.parse(v).properties.findings.items.properties.severity.enum; return ["high", "medium", "low"].every((x) => e.includes(x)); } },
          { label: "required 로 findings 를 필수 지정", fn: (v) => (JSON.parse(v).required || []).includes("findings") },
        ],
        solution: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"findings\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"file\": { \"type\": \"string\" },\n          \"line\": { \"type\": \"integer\" },\n          \"severity\": { \"type\": \"string\", \"enum\": [\"high\", \"medium\", \"low\"] },\n          \"message\": { \"type\": \"string\" }\n        },\n        \"required\": [\"file\", \"line\", \"severity\", \"message\"],\n        \"additionalProperties\": false\n      }\n    }\n  },\n  \"required\": [\"findings\"],\n  \"additionalProperties\": false\n}",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "git diff | codex exec \"이 변경으로 커밋 메시지 한 줄 추천해 줘\"\ncodex exec --json \"README 요약\" > events.jsonl\ncodex exec \"메타데이터 추출\" --output-schema schema.json -o meta.json && cat meta.json" },
    },
    mistakes: [
      ["자동화 스크립트에 <code>--yolo</code> 사용", "기본 read-only, 필요할 때만 <code>--sandbox workspace-write</code>"],
      ["사람이 읽는 텍스트 출력을 정규식으로 파싱", "<code>--json</code> 이벤트나 <code>--output-schema</code> 로 구조화된 결과 받기"],
    ],
    checklist: ["codex exec 기본 샌드박스가 read-only 임을 안다", "파이프 입력으로 요약을 받아 보았다", "--json 이벤트 종류를 3개 이상 말할 수 있다", "--output-schema 로 구조화된 결과를 받았다"],
  },

  /* ----------------------------------------------------- Day 16 */
  {
    id: 16, week: 3, icon: "💬", time: "50분", level: 2,
    title: "알림 연동 — notify 와 Slack",
    subtitle: "Codex 가 작업을 마치면 슬랙·데스크톱으로 알림을 받고, 슬랙에서 작업을 요청하는 방법까지 정리합니다.",
    goals: ["notify 설정과 전달되는 JSON 을 이해한다", "Slack Incoming Webhook 으로 완료 알림을 보낸다", "알림 방식(TUI 알림·notify·훅)을 상황에 맞게 고른다"],
    analogy: { i: "📟", t: "식당의 <b>진동벨</b>과 같습니다. 음식(작업)이 준비되면 벨이 울리니 카운터 앞에서 기다릴 필요가 없죠. Codex 가 긴 작업을 하는 동안 다른 일을 하다가, 알림이 오면 확인하면 됩니다." },
    sections: [
      {
        h: "알림 방법 3가지",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>방법</th><th>설정</th><th>용도</th></tr>
        <tr><td><b>① TUI 알림</b></td><td><code>[tui]</code> 의 <code>notifications</code>, <code>notification_method</code>(auto·osc9·bel)</td><td>터미널이 지원하면 데스크톱 알림·벨 소리</td></tr>
        <tr><td><b>② notify</b></td><td><code>notify = [\"python3\", \"notify.py\"]</code></td><td>턴이 끝날 때마다 외부 프로그램 실행 → 슬랙·메일 등 어디로든</td></tr>
        <tr><td><b>③ 훅 (Stop 등)</b></td><td><code>hooks.json</code> / <code>[hooks]</code></td><td>더 세밀한 이벤트 제어 (4주차 Day 19)</td></tr></table></div>`,
      },
      {
        h: "notify — 턴 완료 시 외부 프로그램 실행",
        body: "<p><code>notify</code> 에 지정한 프로그램은 Codex 가 이벤트를 낼 때 <b>JSON 문자열 하나를 마지막 인자</b>로 받습니다. 현재 지원되는 이벤트는 <code>agent-turn-complete</code> 이며, <code>thread-id</code>, <code>turn-id</code>, <code>cwd</code>, <code>input-messages</code>, <code>last-assistant-message</code> 필드가 들어 있습니다.</p>",
        code: [
          { lang: "toml", file: "~/.codex/config.toml", text: "notify = [\"python3\", \"/Users/me/.codex/notify_slack.py\"]\n\n[tui]\nnotification_method = \"auto\"" },
          { lang: "python", file: "~/.codex/notify_slack.py", text: "import json, os, sys, urllib.request\n\nevent = json.loads(sys.argv[-1])            # Codex 가 넘겨 준 JSON\nif event.get(\"type\") != \"agent-turn-complete\":\n    sys.exit(0)\n\nmsg = event.get(\"last-assistant-message\") or \"(메시지 없음)\"\ntext = f\"✅ Codex 작업 완료 ({event.get('cwd')})\\n{msg[:300]}\"\n\nurl = os.environ[\"SLACK_WEBHOOK_URL\"]       # 비밀값은 환경 변수로\nreq = urllib.request.Request(url, data=json.dumps({\"text\": text}).encode(),\n                             headers={\"Content-Type\": \"application/json\"})\nurllib.request.urlopen(req)" },
        ],
        tip: "<b>🔐 Webhook URL = 비밀번호</b> 슬랙 앱 설정의 Incoming Webhooks 에서 받은 URL 은 누구든 우리 채널에 글을 쓸 수 있게 합니다. 코드·설정 파일에 쓰지 말고 <code>SLACK_WEBHOOK_URL</code> 환경 변수로 보관하세요.",
        tipType: "warn",
      },
      {
        h: "슬랙에서 Codex 에게 일 시키기",
        body: `<ul><li><b>공식 슬랙 연동</b>: 조직이 ChatGPT/Codex 슬랙 앱을 설정했다면 슬랙 스레드에서 멘션해 클라우드 작업을 맡길 수 있습니다 (관리자 설정 필요, 이름·기능은 문서 기준으로 확인).</li>
        <li><b>직접 만든 봇</b>: 슬랙 메시지를 받는 작은 서버가 <code>codex exec</code> 를 실행하고 결과를 스레드에 답글로 다는 구조 (개념 예시).</li></ul>`,
        code: { lang: "bash", file: "봇 서버에서 (개념 예시)", text: "# 슬랙 메시지 → 봇 서버 → codex exec(read-only) → 결과를 스레드 답글로\nprintf '%s' \"$SLACK_MESSAGE_TEXT\" | codex exec --ephemeral -o answer.md -\n# 사용자 입력은 신뢰할 수 없으므로 read-only(기본)로만 실행" },
      },
    ],
    viz: {
      type: "sequence", title: "작업 완료 → 슬랙 알림 흐름",
      actors: [{ t: "Codex", i: "◎", center: true }, { t: "notify.py", i: "🐍" }, { t: "Slack", i: "💬" }, { t: "나", i: "📱" }],
      msgs: [
        { from: "Codex", to: "Codex", t: "긴 작업 수행 (테스트 수정 등)", x: "나는 다른 일을 하고 있습니다." },
        { from: "Codex", to: "notify.py", t: "agent-turn-complete JSON", x: "턴이 끝나면 notify 프로그램을 실행하고 JSON 을 인자로 넘깁니다." },
        { from: "notify.py", to: "Slack", t: "POST $SLACK_WEBHOOK_URL", x: "환경 변수의 Webhook URL 로 메시지를 보냅니다." },
        { from: "Slack", to: "나", t: "\"✅ Codex 작업 완료\"", x: "휴대폰·PC 로 알림이 옵니다." },
        { from: "나", to: "Codex", t: "결과 확인 / 다음 지시", x: "돌아와서 결과를 검토합니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🐍 스크립트 작성", title: "notify 스크립트 완성하기",
        intro: "Codex notify 로 실행될 스크립트를 완성하세요: 마지막 인자의 JSON 을 읽고, agent-turn-complete 일 때만, 환경 변수 SLACK_WEBHOOK_URL 로 POST.",
        file: "~/.codex/notify_slack.py",
        starter: "import json, os, sys, urllib.request\n\n",
        checks: [
          { label: "sys.argv 의 마지막 인자를 json.loads 로 읽는다", re: /json\.loads\(\s*sys\.argv\[\s*-1\s*\]\s*\)/ },
          { label: "type 이 agent-turn-complete 인지 확인", re: /["']agent-turn-complete["']/ },
          { label: "last-assistant-message 를 사용", re: /["']last-assistant-message["']/ },
          { label: "Webhook URL 은 환경 변수 SLACK_WEBHOOK_URL 에서", re: /os\.environ(\.get)?\s*[\[(]\s*["']SLACK_WEBHOOK_URL["']/ },
          { label: "Webhook URL 을 직접 적지 않았다", fn: (v) => !/hooks\.slack\.com/.test(v) },
          { label: "urlopen 으로 요청을 보낸다", re: /urlopen\(/ },
        ],
        solution: "import json, os, sys, urllib.request\n\nevent = json.loads(sys.argv[-1])\nif event.get(\"type\") != \"agent-turn-complete\":\n    sys.exit(0)\n\nmsg = event.get(\"last-assistant-message\") or \"(메시지 없음)\"\ntext = \"Codex 작업 완료: \" + msg[:300]\n\nurl = os.environ[\"SLACK_WEBHOOK_URL\"]\nreq = urllib.request.Request(url, data=json.dumps({\"text\": text}).encode(),\n                             headers={\"Content-Type\": \"application/json\"})\nurllib.request.urlopen(req)\n",
        tip: "<b>테스트 팁</b> <code>python3 notify_slack.py '{\"type\":\"agent-turn-complete\",\"last-assistant-message\":\"hi\"}'</code> 로 Codex 없이 먼저 시험해 보세요.",
      },
      {
        type: "quiz", title: "알림 연동 퀴즈",
        questions: [
          { q: "config.toml 의 <code>notify</code> 프로그램이 현재 받는 이벤트 타입은?", options: ["session-start", "agent-turn-complete", "tool-call", "error-only"], answer: 1 },
          { q: "\"#장애 채널의 오늘 메시지를 요약해 줘\" 처럼 슬랙 데이터를 <b>읽으려면</b>?", options: ["notify 설정", "슬랙 MCP 서버 연결 같은 '읽기' 도구", "AGENTS.md 수정", "/compact"], answer: 1, explain: "notify·Webhook 은 보내기 전용입니다. 읽으려면 MCP 같은 도구가 필요합니다." },
          { q: "Slack Webhook URL 을 notify 스크립트에 그대로 적어 커밋하면?", options: ["안전하다", "누구나 우리 채널에 메시지를 보낼 수 있게 된다", "속도가 빨라진다", "슬랙이 자동 차단한다"], answer: 1, explain: "환경 변수나 비밀 저장소로. 노출되면 즉시 재발급." },
        ],
      },
    ],
    real: {
      body: "<p>슬랙 워크스페이스가 있다면 테스트 채널에 Incoming Webhook 을 만들고 아래 순서로 확인하세요.</p>",
      code: { lang: "bash", file: "내 터미널", text: "export SLACK_WEBHOOK_URL=\"(발급받은 URL)\"\npython3 ~/.codex/notify_slack.py '{\"type\":\"agent-turn-complete\",\"last-assistant-message\":\"테스트\"}'\n# 메시지가 오면 config.toml 에 notify = [\"python3\", \"/절대/경로/notify_slack.py\"] 추가\ncodex \"README 오타 찾아줘\"" },
    },
    mistakes: [
      ["Webhook URL 하드코딩 후 git 커밋", "환경 변수 + 노출되면 즉시 재발급"],
      ["슬랙 메시지를 그대로 쓰기 권한 Codex 에 전달", "외부 입력은 read-only 로만 처리 — 프롬프트 인젝션 대비"],
    ],
    checklist: ["notify 가 받는 JSON 필드를 안다", "Webhook URL 을 환경 변수로 다룬다", "notify 스크립트를 수동으로 테스트했다"],
  },

  /* ----------------------------------------------------- Day 17 */
  {
    id: 17, week: 3, icon: "🚢", time: "60분", level: 3,
    title: "CI/CD — GitHub Action 과 @codex",
    subtitle: "openai/codex-action 으로 PR 자동 리뷰를 만들고, GitHub 의 @codex review 와 클라우드 작업까지 연결합니다.",
    goals: ["CI/CD 의 개념을 이해한다", "openai/codex-action 워크플로우를 구성한다", "@codex review 와 Codex Cloud 작업 흐름을 안다"],
    analogy: { i: "🏭", t: "공장의 <b>컨베이어 벨트</b>입니다. 코드를 올리면(push) 벨트를 따라 <b>검사(테스트) → 품질 검수(리뷰) → 포장(빌드) → 출고(배포)</b>가 자동으로 진행됩니다. Codex 는 이 벨트 위의 꼼꼼한 검수원 역할을 합니다." },
    sections: [
      {
        h: "GitHub 에서 Codex 를 쓰는 세 가지 길",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>방법</th><th>설정</th><th>특징</th></tr>
        <tr><td><b>① @codex review</b></td><td>Codex 설정에서 저장소의 Code review 켜기</td><td>PR 댓글로 호출 → Codex 가 GitHub 리뷰를 남김. <b>Automatic reviews</b> 를 켜면 새 PR 마다 자동</td></tr>
        <tr><td><b>② @codex 작업</b></td><td>위와 같은 GitHub 연결</td><td><code>@codex CI 실패 고쳐 줘</code> 처럼 review 외의 요청은 PR 을 맥락으로 <b>클라우드 작업</b> 시작</td></tr>
        <tr><td><b>③ GitHub Action</b></td><td><code>openai/codex-action@v1</code> + API 키 시크릿</td><td>내 워크플로우 안에서 <code>codex exec</code> 실행. 프롬프트·권한을 완전히 통제</td></tr></table></div>
        <p>①·②의 리뷰는 저장소의 AGENTS.md 에 적은 리뷰 지침(Day 9)을 참고합니다.</p>`,
      },
      {
        h: "openai/codex-action 워크플로우",
        body: "<p>문서의 권장 패턴은 <b>Codex 를 실행하는 잡</b>과 <b>PR 에 글을 쓰는 잡</b>을 나누는 것입니다. Codex 잡은 <code>contents: read</code> 만, 쓰기 권한이 있는 잡에는 API 키를 주지 않습니다.</p>",
        code: { lang: "yaml", file: ".github/workflows/codex-review.yml", text: "name: Codex pull request review\non:\n  pull_request:\n    types: [opened, synchronize, reopened]\n\njobs:\n  codex:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n    outputs:\n      final_message: ${{ steps.run_codex.outputs.final-message }}\n    steps:\n      - uses: actions/checkout@v5\n        with:\n          ref: refs/pull/${{ github.event.pull_request.number }}/merge\n          persist-credentials: false\n      - name: Run Codex\n        id: run_codex\n        uses: openai/codex-action@v1\n        with:\n          openai-api-key: ${{ secrets.OPENAI_API_KEY }}\n          prompt-file: .github/codex/prompts/review.md\n          sandbox: read-only\n\n  post_feedback:\n    runs-on: ubuntu-latest\n    needs: codex\n    if: needs.codex.outputs.final_message != ''\n    permissions:\n      pull-requests: write\n    steps:\n      - uses: actions/github-script@v7\n        env:\n          CODEX_FINAL_MESSAGE: ${{ needs.codex.outputs.final_message }}\n        with:\n          script: |\n            await github.rest.issues.createComment({\n              owner: context.repo.owner,\n              repo: context.repo.repo,\n              issue_number: context.payload.pull_request.number,\n              body: process.env.CODEX_FINAL_MESSAGE,\n            });" },
        after: `<p><b>주요 입력값</b>: <code>openai-api-key</code>, <code>prompt</code> 또는 <code>prompt-file</code>(둘 중 하나), <code>output-file</code>, <code>sandbox</code>(read-only / workspace-write / danger-full-access), <code>safety-strategy</code>(기본 drop-sudo), <code>codex-args</code>, <code>model</code>, <code>effort</code>. <b>출력값</b>: <code>final-message</code>.</p>`,
        tip: "<b>🔐 시크릿</b> API 키는 저장소 Settings → Secrets and variables → Actions 에 <code>OPENAI_API_KEY</code> 로 등록하고 <code>${{ secrets.OPENAI_API_KEY }}</code> 로만 참조합니다. 기본적으로 쓰기 권한이 있는 사용자만 액션을 트리거할 수 있습니다.",
        tipType: "warn",
      },
      {
        h: "Codex Cloud 결과를 로컬로",
        code: { lang: "bash", file: "terminal", text: "codex cloud                  # 클라우드 작업 선택 화면\ncodex cloud list --json      # 최근 작업 목록\ncodex apply <TASK_ID>        # 작업 결과 diff 를 내 작업 트리에 적용 (git apply)" },
      },
    ],
    viz: {
      type: "sequence", title: "PR 이 올라가면 일어나는 일",
      actors: [{ t: "개발자", i: "🙋" }, { t: "GitHub", i: "🐙" }, { t: "Actions", i: "⚙️" }, { t: "Codex", i: "◎", center: true }],
      msgs: [
        { from: "개발자", to: "GitHub", t: "git push → PR 생성", x: "PR 이 열리면 <code>pull_request</code> 이벤트가 발생합니다." },
        { from: "GitHub", to: "Actions", t: "워크플로우 시작", x: "조건에 맞는 워크플로우가 실행됩니다." },
        { from: "Actions", to: "Codex", t: "codex-action (read-only)", x: "읽기 권한만 가진 잡에서 시크릿 키로 Codex 실행." },
        { from: "Codex", to: "Actions", t: "final-message", x: "리뷰 결과를 잡 출력으로 넘깁니다." },
        { from: "Actions", to: "GitHub", t: "PR 댓글 작성 (별도 잡)", x: "쓰기 권한 잡은 키 없이 댓글만 답니다." },
        { from: "개발자", to: "GitHub", t: "@codex 수정해 줘", x: "필요하면 댓글로 클라우드 작업을 요청합니다." },
        { from: "GitHub", to: "개발자", t: "사람이 승인 → 머지", x: "최종 머지 결정은 사람이 합니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 YAML 작성", title: "PR 자동 리뷰 워크플로우 완성하기",
        intro: "PR 이 열리거나 업데이트될 때 Codex 가 읽기 전용으로 리뷰하는 잡을 완성하세요.",
        file: ".github/workflows/codex-review.yml",
        starter: "name: Codex PR Review\non:\n  \njobs:\n  codex:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v5\n",
        checks: [
          { label: "pull_request 이벤트에 반응한다", re: /on:\s*\n\s+pull_request:/ },
          { label: "opened 와 synchronize 타입을 지정", re: /types:\s*\[?.*opened.*synchronize|types:\s*\[?.*synchronize.*opened/ },
          { label: "permissions 는 contents: read", re: /permissions:\s*\n\s+contents:\s*read/ },
          { label: "openai/codex-action@v1 을 사용", re: /uses:\s*openai\/codex-action@v1/ },
          { label: "API 키는 secrets 로 참조 (직접 기재 금지)", fn: (v) => /openai-api-key:\s*\$\{\{\s*secrets\.OPENAI_API_KEY\s*\}\}/.test(v) && !/sk-[A-Za-z0-9]/.test(v) },
          { label: "prompt 또는 prompt-file 로 지시 전달", re: /\n\s+(prompt|prompt-file):\s*\S+/ },
          { label: "sandbox: read-only", re: /sandbox:\s*read-only/ },
        ],
        solution: "name: Codex PR Review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  codex:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n    steps:\n      - uses: actions/checkout@v5\n      - uses: openai/codex-action@v1\n        with:\n          openai-api-key: ${{ secrets.OPENAI_API_KEY }}\n          prompt-file: .github/codex/prompts/review.md\n          sandbox: read-only\n          output-file: codex-output.md\n",
      },
      {
        type: "order", title: "안전한 CI 리뷰 파이프라인 순서",
        items: ["개발자가 브랜치에 push 하고 PR 생성", "Actions 가 테스트 실행", "읽기 전용 잡에서 codex-action 으로 리뷰", "별도 쓰기 잡이 final-message 를 PR 댓글로 게시", "개발자가 리뷰 반영 (필요시 @codex 요청)", "사람이 최종 승인 후 머지"],
        explain: "Codex 는 검수원이고, 키를 가진 잡과 쓰기 권한 잡을 분리하는 것이 핵심입니다.",
      },
    ],
    real: {
      code: { lang: "bash", file: "GitHub 저장소에서", text: "mkdir -p .github/workflows .github/codex/prompts\n# review.md 에 리뷰 지시를 적고, 위 YAML 저장\ngh secret set OPENAI_API_KEY        # 값을 입력 프롬프트로 전달\ngit add .github && git commit -m \"ci: Codex PR 리뷰\" && git push\n# 또는 Codex 설정에서 Code review 를 켠 뒤 PR 에 댓글: @codex review" },
    },
    mistakes: [
      ["API 키를 YAML 에 직접 작성", "<code>${{ secrets.OPENAI_API_KEY }}</code> 로만 참조"],
      ["키를 가진 잡에 <code>pull-requests: write</code> 까지 부여", "Codex 잡은 read, 댓글 잡은 키 없이 write — 잡 분리"],
    ],
    checklist: ["@codex review 와 @codex 작업 요청의 차이를 안다", "codex-action 의 주요 입력값을 안다", "시크릿 사용법을 안다", "codex apply 로 클라우드 결과를 가져오는 법을 안다"],
  },

  /* ----------------------------------------------------- Day 18 */
  {
    id: 18, week: 3, icon: "🧬", time: "60분", level: 3,
    title: "SDK 로 시스템 연결",
    subtitle: "Codex SDK(TypeScript·Python)로 Codex 에이전트를 내 프로그램에 넣어 다른 시스템과 연결합니다.",
    goals: ["Codex SDK 가 무엇인지 안다", "startThread() / run() 으로 작업을 실행한다", "스레드를 이어가고 샌드박스를 지정한다"],
    analogy: { i: "🚗", t: "Codex CLI 가 <b>완성차</b>라면, SDK 는 그 <b>엔진</b>입니다. 엔진만 가져와 트럭(사내 업무 봇), 버스(CI 도우미) 등 내가 원하는 차를 만들 수 있습니다." },
    sections: [
      {
        h: "Codex SDK 란?",
        body: "<p>로컬 Codex 에이전트를 <b>코드에서</b> 제어하는 라이브러리입니다. 대화 하나를 <b>스레드(thread)</b>로 다루며, 같은 스레드에 <code>run()</code> 을 반복 호출하면 맥락이 이어집니다. CLI 의 샌드박스·설정 개념이 그대로 옵션이 됩니다.</p>",
        code: { lang: "bash", file: "설치", text: "# TypeScript / JavaScript\nnpm install @openai/codex-sdk\n\n# Python (3.10 이상)\npip install openai-codex\n\n# 인증: 이 PC 의 Codex 로그인(codex login)을 사용하거나 API 키를 환경 변수로" },
      },
      {
        h: "첫 에이전트 (TypeScript)",
        code: { lang: "ts", file: "agent.ts", text: "import { Codex } from \"@openai/codex-sdk\";\n\nconst codex = new Codex();\nconst thread = codex.startThread();\n\nconst plan = await thread.run(\"CI 실패 원인을 진단하고 고칠 계획을 세워 줘\");\nconsole.log(plan.finalResponse);\n\n// 같은 스레드 = 맥락 유지\nconst done = await thread.run(\"계획대로 구현해 줘\");\nconsole.log(done.finalResponse);\n\n// 나중에 이어가기\nconst again = codex.resumeThread(thread.id!, { sandboxMode: \"workspace-write\" });\nawait again.run(\"남은 작업을 마무리해 줘\");" },
        after: "<p><code>run()</code> 은 작업이 끝나면 결과를 돌려주고, <code>finalResponse</code> 에 최종 답이 담깁니다. 스트리밍 이벤트 API 등 세부 옵션은 SDK 문서·타입 정의를 기준으로 확인하세요.</p>",
      },
      {
        h: "같은 에이전트 (Python)",
        code: { lang: "python", file: "agent.py", text: "from openai_codex import Codex, Sandbox\n\nwith Codex() as codex:\n    thread = codex.thread_start(sandbox=Sandbox.workspace_write)\n    thread.run(\"요청한 변경을 적용해 줘\")\n    # 리뷰는 읽기 전용으로\n    review = thread.run(\"diff 만 리뷰해 줘\", sandbox=Sandbox.read_only)\n    print(review.final_response)" },
        tip: "<b>💡 더 깊은 통합</b> IDE·자체 앱처럼 Codex 를 제품 안에 깊게 넣어야 한다면 문서의 <b>App Server</b>(<code>codex app-server</code>, 실험적) 프로토콜도 있습니다. 예전의 <code>codex mcp-server</code> 는 제거되어 app-server 로 안내됩니다.",
      },
    ],
    viz: {
      type: "layers", title: "Codex SDK 로 만든 시스템의 구조",
      layers: [
        { i: "🧑‍💻", n: "내 애플리케이션", chips: ["웹 서버", "슬랙 봇", "배치 작업"], d: "사용자 요청을 받는 곳" },
        { i: "🧬", n: "Codex SDK", chips: ["new Codex()", "startThread()", "run()", "resumeThread()"], d: "스레드 단위 제어" },
        { i: "◎", n: "Codex 에이전트", chips: ["AGENTS.md", "config.toml", "MCP"], d: "CLI 와 같은 엔진·설정" },
        { i: "🛡️", n: "제어", chips: ["sandboxMode", "approval", "rules"], d: "안전장치" },
        { i: "☁️", n: "OpenAI 모델", chips: ["ChatGPT 로그인", "API 키"], d: "판단과 생성" },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 코드 작성", title: "로그 분석 에이전트 만들기",
        intro: "SDK 로 '로그 분석' 스크립트를 완성하세요: Codex import, 스레드 시작(read-only), run 으로 분석 요청, finalResponse 출력.",
        file: "log-agent.ts",
        starter: "import { } from \"@openai/codex-sdk\";\n\nconst codex = \n",
        checks: [
          { label: "@openai/codex-sdk 에서 Codex 를 import", re: /import\s*\{\s*Codex\s*\}\s*from\s*["']@openai\/codex-sdk["']/ },
          { label: "new Codex() 로 생성", re: /new\s+Codex\s*\(/ },
          { label: "startThread 로 스레드 시작", re: /\.startThread\s*\(/ },
          { label: "sandboxMode: \"read-only\" 지정", re: /sandboxMode\s*:\s*["']read-only["']/ },
          { label: "await thread.run(...) 으로 요청", re: /await\s+\w+\.run\s*\(\s*["'`]\S/ },
          { label: "finalResponse 를 출력", re: /console\.log\([^)]*finalResponse/ },
        ],
        solution: "import { Codex } from \"@openai/codex-sdk\";\n\nconst codex = new Codex();\nconst thread = codex.startThread({ sandboxMode: \"read-only\" });\n\nconst result = await thread.run(\"logs/error.log 를 분석해서 원인과 해결책을 알려줘\");\nconsole.log(result.finalResponse);\n",
        tip: "<b>참고</b> 문서 예시에서 <code>sandboxMode</code> 는 <code>resumeThread</code> 옵션으로 나옵니다. <code>startThread</code> 에 같은 옵션을 주는 형태는 SDK 타입 정의로 확인하세요.",
      },
      {
        type: "quiz", title: "SDK 퀴즈",
        questions: [
          { q: "Codex CLI 와 Codex SDK 의 관계는?", options: ["전혀 관계 없다", "같은 Codex 에이전트를 터미널 대신 코드에서 제어하는 것", "SDK 는 채팅 전용", "SDK 는 클라우드에서만 동작"], answer: 1 },
          { q: "같은 맥락에서 \"계획 세워 줘\" → \"구현해 줘\" 를 이어서 시키려면?", options: ["매번 new Codex()", "같은 thread 에 run() 을 다시 호출", "codex exec 를 두 번", "불가능"], answer: 1 },
          { q: "Python SDK 의 패키지 이름은?", options: ["codex-cli", "openai-codex", "openai[codex]", "codex-agent"], answer: 1, explain: "<code>pip install openai-codex</code>, import 는 <code>openai_codex</code>." },
          { q: "외부 사용자 요청을 받는 서비스에 Codex 를 붙일 때 가장 먼저 할 안전 설정은?", options: ["danger-full-access", "필요한 최소 샌드박스(read-only 등) 지정", "승인 끄기", "로그 끄기"], answer: 1, explain: "최소 권한 원칙." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "mkdir my-agent && cd my-agent && git init\nnpm init -y && npm i @openai/codex-sdk tsx\n# 위 agent.ts 저장 (package.json 에 \"type\": \"module\" 추가)\nnpx tsx agent.ts" },
    },
    mistakes: [
      ["서비스용 에이전트에 넓은 샌드박스", "기본 read-only, 쓰기는 꼭 필요한 단계에서만"],
      ["매 요청마다 새 스레드를 만들어 맥락 손실", "이어지는 작업은 같은 스레드 또는 resumeThread 사용"],
    ],
    checklist: ["SDK 를 설치했다", "startThread / run / finalResponse 를 안다", "resumeThread 로 이어가기를 이해했다", "3주차 완주! 🎉"],
  },
];
