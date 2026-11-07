/* 1주차 — 기초 */
window.WEEK1 = [
  /* ----------------------------------------------------- Day 1 */
  {
    id: 1, week: 1, icon: "⚙️", time: "30분", level: 1,
    title: "Codex 설치와 로그인",
    subtitle: "Codex CLI 를 설치하고 ChatGPT 계정 또는 API 키로 로그인해, 터미널에서 첫 대화를 시작합니다.",
    goals: ["Codex CLI 가 무엇인지 한 문장으로 설명한다", "운영체제에 맞게 설치하고 버전을 확인한다", "ChatGPT 계정 또는 API 키로 로그인한다"],
    analogy: { i: "🧑‍🔧", t: "웹의 ChatGPT 가 <b>전화로 조언해 주는 전문가</b>라면, Codex CLI 는 <b>내 작업실에 와서 직접 공구를 드는 동료</b>입니다. 파일을 읽고, 코드를 고치고, 명령을 실행합니다. 다만 처음에는 <b>작업실 안(프로젝트 폴더)</b>에서만 움직이고, 밖으로 나가야 할 때는 먼저 물어봅니다." },
    sections: [
      {
        h: "Codex 란?",
        body: `<p><b>Codex CLI</b> 는 OpenAI 가 만든 <b>오픈소스 터미널 코딩 에이전트</b>입니다(GitHub <code>openai/codex</code>). 같은 엔진이 여러 곳에서 쓰입니다.</p>
        <div class="tbl-wrap"><table class="tbl"><tr><th>형태</th><th>어디서</th><th>특징</th></tr>
        <tr><td><b>Codex CLI</b></td><td>터미널</td><td>이 강좌의 주인공. <code>codex</code> 명령으로 실행</td></tr>
        <tr><td>IDE 확장</td><td>VS Code 계열 에디터</td><td>에디터 옆 패널에서 같은 기능 사용</td></tr>
        <tr><td>Codex Cloud</td><td>ChatGPT 웹·앱</td><td>클라우드의 격리 환경에서 작업, 여러 개 병렬 실행</td></tr>
        <tr><td>GitHub · SDK</td><td>PR 댓글, CI, 내 프로그램</td><td><code>@codex review</code>, GitHub Action, <code>@openai/codex-sdk</code> (3주차)</td></tr></table></div>
        <div class="tbl-wrap"><table class="tbl"><tr><th></th><th>웹 채팅</th><th>Codex CLI</th></tr>
        <tr><td>코드 보기</td><td>내가 복사해서 붙여넣기</td><td>프로젝트 파일을 직접 읽음</td></tr>
        <tr><td>코드 수정</td><td>답변을 내가 옮겨 적기</td><td>파일을 직접 수정 (샌드박스 안에서)</td></tr>
        <tr><td>실행/테스트</td><td>내가 실행하고 결과 전달</td><td>명령 실행 → 결과 확인 → 스스로 수정</td></tr></table></div>`,
        tip: "<b>💡 '에이전트'란?</b> 목표를 주면 스스로 계획을 세우고, 도구를 써서 실행하고, 결과를 확인하며 반복하는 AI 를 말합니다.",
      },
      {
        h: "준비물 체크",
        body: `<ul><li><b>운영체제</b>: macOS, Linux, Windows (Windows 는 PowerShell 설치 스크립트 제공, WSL 에서도 사용 가능)</li>
        <li><b>계정</b>: ChatGPT 유료 플랜(Plus·Pro·Business·Edu·Enterprise 등) 계정 — 공식 권장 방식. 또는 OpenAI API 키(사용량 과금)</li>
        <li><b>git</b>: Codex 는 git 저장소 안에서 일하는 것을 기본으로 합니다 (Day 5)</li>
        <li><b>(선택) Node.js</b>: npm 으로 설치할 때만 필요</li></ul>`,
      },
      {
        h: "설치하기 — 하나만 고르세요",
        body: "<p>공식 README 기준 설치 방법입니다. 내 환경에 맞는 <b>하나만</b> 실행하세요.</p>",
        code: [
          { lang: "bash", file: "macOS / Linux — 공식 설치 스크립트", text: "curl -fsSL https://chatgpt.com/codex/install.sh | sh" },
          { lang: "powershell", file: "Windows PowerShell — 공식 설치 스크립트", text: "powershell -ExecutionPolicy ByPass -c \"irm https://chatgpt.com/codex/install.ps1 | iex\"" },
          { lang: "bash", file: "npm (Node.js 필요)", text: "npm install -g @openai/codex" },
          { lang: "bash", file: "Homebrew (macOS)", text: "brew install --cask codex" },
        ],
        tip: "<b>⚠️ 주의</b> npm 설치 시 <code>sudo npm install -g</code> 처럼 관리자 권한을 쓰지 마세요. 권한 오류가 나면 공식 설치 스크립트를 쓰거나 npm 전역 경로를 내 사용자 폴더로 바꾸세요. 업데이트는 같은 설치 명령을 다시 실행(Homebrew 는 <code>brew upgrade --cask codex</code>)하면 됩니다.",
        tipType: "warn",
      },
      {
        h: "로그인 — ChatGPT 계정 또는 API 키",
        body: "<p>프로젝트 폴더에서 <code>codex</code> 를 처음 실행하면 로그인 화면이 나옵니다. <b>Sign in with ChatGPT</b> 를 고르면 브라우저가 열리고 인증이 끝납니다. 따로 로그인만 하고 싶다면 <code>codex login</code> 을 씁니다.</p>",
        code: { lang: "bash", file: "terminal", text: "codex --version                 # 버전 확인\ncodex login                     # ChatGPT 계정 로그인 (브라우저)\ncodex login --device-auth       # 브라우저 없는 서버: 기기 코드 방식\n\n# API 키로 로그인: 키를 '표준 입력'으로 전달 (명령줄 인자에 직접 쓰지 않음)\nprintenv OPENAI_API_KEY | codex login --with-api-key\n\ncodex login status              # 로그인 상태 확인 (로그인돼 있으면 종료 코드 0)\ncodex logout                    # 저장된 인증 삭제" },
        after: "<p>대화를 마치려면 TUI 에서 <code>/exit</code>(또는 <code>/quit</code>)를 입력하거나 <kbd>Ctrl</kbd>+<kbd>C</kbd> 를 누릅니다. 인증 정보는 Codex 홈 폴더(<code>~/.codex</code>)에 저장됩니다.</p>",
        tip: "<b>🔐 API 키는 비밀번호</b> 키를 <code>codex login --with-api-key sk-...</code> 처럼 명령에 직접 쓰면 셸 기록에 남습니다. 문서 방식대로 파이프(<code>|</code>)로 넘기세요.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "flow", title: "설치에서 첫 대화까지",
      desc: "각 단계를 클릭하거나 '다음' 버튼으로 따라가 보세요.",
      steps: [
        { i: "🖥️", t: "터미널 열기", d: "PowerShell / Terminal", x: "Windows 는 <b>PowerShell</b>, macOS 는 <b>터미널</b> 앱을 엽니다." },
        { i: "📦", t: "설치", d: "설치 스크립트 / npm / brew", x: "운영체제에 맞는 설치 명령 <b>하나</b>를 실행합니다." },
        { i: "🔎", t: "확인", d: "codex --version", x: "버전 번호가 나오면 설치 성공." },
        { i: "📁", t: "폴더 이동", d: "cd my-project", x: "Codex 는 <b>현재 폴더</b>를 작업 공간(workspace)으로 삼습니다. 작업할 폴더로 먼저 이동하세요." },
        { i: "🔑", t: "로그인", d: "ChatGPT 또는 API 키", x: "첫 실행 시 <b>Sign in with ChatGPT</b>. API 키는 <code>codex login --with-api-key</code> 로 표준 입력 전달." },
        { i: "💬", t: "첫 대화", d: "자연어로 요청", x: "\"이 프로젝트가 뭐하는 건지 설명해 줘\" 처럼 평소 말투로 요청하면 됩니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "설치부터 첫 실행까지",
        intro: "실제 설치 과정을 흉내 낸 터미널입니다. 오른쪽 과제를 순서대로 입력해 보세요.",
        tasks: [
          { goal: "Node.js 버전 확인하기 (npm 설치 경로를 쓸 경우)", hint: "node -v", match: /^node (-v|--version)$/, out: "v22.11.0\n{ok:✓ npm 으로 설치할 수 있습니다.}" },
          { goal: "npm 으로 Codex CLI 전역 설치하기", hint: "npm install -g @openai/codex", match: /^npm (install|i) (-g|--global) @openai\/codex$/, out: "{dim:⠙ 패키지 다운로드 중...}\nadded 1 package in 4s\n{ok:✓ 설치 완료}", stream: true },
          { goal: "설치된 버전 확인하기", hint: "codex --version", match: /^codex (-V|--version)$/, out: "codex-cli 0.x.x" },
          { goal: "로그인 상태 확인하기 (처음엔 로그인 전)", hint: "codex login status", match: /^codex login status$/, out: "{warn:Not logged in}" },
          { goal: "ChatGPT 계정으로 로그인하기", hint: "codex login", match: /^codex login$/, out: "{dim:브라우저에서 ChatGPT 로그인 페이지를 엽니다… (시뮬레이션)}\n{ok:Successfully logged in}" },
          { goal: "Codex 실행하기", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "세션 설정·계정 상태 확인하기", hint: "/status", match: /^\/status$/, mode: "agent", out: "  Model:        기본 모델 (reasoning medium)\n  Directory:    ~/my-project\n  Permissions:  workspace-write · on-request\n  Account:      ChatGPT 로그인 (Plus)\n  Token usage:  0 total" },
          { goal: "Codex 종료하기", hint: "/exit", match: /^(\/exit|\/quit|exit)$/, mode: "agent", enter: "shell", out: "{dim:세션을 종료했습니다. 다음에 codex resume --last 로 이어서 할 수 있어요.}" },
        ],
      },
      {
        type: "quiz", title: "개념 확인",
        questions: [
          { q: "Codex CLI 가 웹 채팅과 가장 다른 점은?", options: ["더 많은 언어를 지원한다", "프로젝트 파일을 직접 읽고 수정하며 명령을 실행할 수 있다", "무료로만 사용할 수 있다", "인터넷 없이 동작한다"], answer: 1, explain: "Codex 는 파일 읽기·편집·명령 실행 같은 도구를 직접 사용하는 에이전트입니다." },
          { q: "API 키로 로그인하는 문서 권장 방법은?", options: ["codex --key sk-xxxx", "printenv OPENAI_API_KEY | codex login --with-api-key", "config.toml 에 키를 평문으로 적는다", "README 에 키를 적는다"], answer: 1, explain: "<code>--with-api-key</code> 는 표준 입력에서 키를 읽습니다. 셸 기록에 키가 남지 않습니다." },
          { q: "Codex 를 실행하기 전에 먼저 하면 좋은 일은?", options: ["컴퓨터 재부팅", "작업할 프로젝트 폴더로 cd 이동", "브라우저 캐시 삭제", "모든 파일 백업 후 삭제"], answer: 1, explain: "Codex 는 실행한 폴더를 작업 공간으로 삼고, 기본 샌드박스도 그 폴더 기준입니다." },
          { q: "Codex 대화형 화면을 종료하는 명령은?", options: ["/stop", "/exit 또는 /quit", "/bye", "/close"], answer: 1 },
        ],
      },
    ],
    real: {
      body: "<p>이제 실제 PC 에서 해 봅시다. 연습용 폴더를 만들고 git 저장소로 초기화한 뒤 실행하세요.</p>",
      code: { lang: "bash", file: "내 터미널", text: "mkdir codex-study\ncd codex-study\ngit init\ncodex\n# Codex 에게: 안녕! 너는 이 폴더에서 무엇을 할 수 있어?\n# /status 로 모델·권한 상태 확인" },
      after: "<div class='callout ok'><b>✅ 성공 기준</b> Codex 가 답하고, <code>/status</code> 에 현재 폴더와 권한 정보가 보이면 오늘 목표 달성입니다.</div>",
    },
    mistakes: [
      ["홈 폴더(~)나 C:\\ 에서 바로 <code>codex</code> 실행", "프로젝트 폴더로 이동한 다음 실행 — 샌드박스 범위가 명확해집니다"],
      ["API 키를 명령줄 인자나 스크립트에 그대로 기록", "<code>printenv OPENAI_API_KEY | codex login --with-api-key</code> 처럼 표준 입력으로 전달"],
    ],
    checklist: ["codex --version 으로 버전이 표시된다", "codex login status 로 로그인 상태를 확인했다", "연습 폴더에서 첫 질문을 해 보았다", "/exit 로 종료할 수 있다"],
  },

  /* ----------------------------------------------------- Day 2 */
  {
    id: 2, week: 1, icon: "⌨️", time: "40분", level: 1,
    title: "Codex 기본 상호작용",
    subtitle: "대화형 TUI, @ 파일 검색, ! 셸 명령, 이미지 첨부, 슬래시 명령과 꼭 알아야 할 단축키",
    goals: ["에이전트가 일하는 순환 구조를 이해한다", "@ 파일 참조, ! 명령, 이미지 첨부를 사용한다", "Esc·Enter·Tab 으로 작업을 멈추고 조종한다"],
    analogy: { i: "🍳", t: "요리사에게 '김치찌개 만들어 줘'라고 하면 <b>냉장고를 열어 재료를 보고(탐색)</b> → <b>순서를 정하고(계획)</b> → <b>요리하고(실행)</b> → <b>간을 봅니다(검증)</b>. 요리 도중에 \"<b>덜 맵게!</b>\" 하고 끼어들 수도 있죠. Codex 도 일하는 중에 <kbd>Enter</kbd> 로 지시를 덧붙일 수 있습니다." },
    sections: [
      {
        h: "대화하는 법: 그냥 말하세요",
        body: `<p>Codex 입력창(<code>›</code>)에 평소 말투로 요청하면 됩니다. 한국어도 괜찮습니다.</p>
        <ul><li>"이 프로젝트 구조를 설명해 줘"</li><li>"로그인 기능은 어느 파일에 있어?"</li><li>"<code>@src/app.js</code> 의 버그를 찾아 줘" — <code>@</code> 를 누르면 파일 검색 창이 떠서 경로를 넣어 줍니다</li></ul>`,
      },
      {
        h: "입력창의 특수 기호",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>기호</th><th>뜻</th><th>예시</th></tr>
        <tr><td><code>@</code></td><td>작업 공간에서 파일을 검색해 경로 첨부</td><td><code>@package.json 의존성 설명해 줘</code></td></tr>
        <tr><td><code>/</code></td><td>슬래시 명령 — <code>/</code> 만 입력하면 목록이 뜸</td><td><code>/status</code>, <code>/model</code>, <code>/diff</code></td></tr>
        <tr><td><code>!</code></td><td>셸 명령을 바로 실행 (현재 샌드박스·승인 설정 그대로)</td><td><code>!git status</code></td></tr>
        <tr><td><code>$</code></td><td>스킬 직접 호출 (4주차)</td><td><code>$skill-creator</code></td></tr></table></div>
        <p><b>🖼️ 이미지</b>: 화면 캡처를 입력창에 붙여넣거나, 시작할 때 <code>codex -i 화면.png \"이 오류 화면 분석해 줘\"</code> 처럼 첨부합니다.</p>`,
      },
      {
        h: "꼭 알아야 할 단축키",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>키</th><th>기능</th></tr>
        <tr><td><kbd>Esc</kbd></td><td>Codex 가 하던 일을 <b>중단</b> (대화는 유지)</td></tr>
        <tr><td><kbd>Esc</kbd> <kbd>Esc</kbd> (입력창이 비었을 때)</td><td>이전 메시지를 고쳐서 그 지점부터 다시 시작</td></tr>
        <tr><td><kbd>Enter</kbd> (작업 중)</td><td>지금 하는 작업에 <b>지시를 끼워 넣기</b>(조종)</td></tr>
        <tr><td><kbd>Tab</kbd> (작업 중)</td><td>다음 차례에 보낼 메시지를 <b>예약</b>(큐)</td></tr>
        <tr><td><kbd>Ctrl</kbd>+<kbd>G</kbd></td><td>외부 편집기(VISUAL/EDITOR)로 긴 프롬프트 작성</td></tr>
        <tr><td><kbd>Ctrl</kbd>+<kbd>R</kbd> / <kbd>↑</kbd></td><td>이전 프롬프트 검색 / 불러오기</td></tr>
        <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>종료 (<code>/exit</code> 와 같음)</td></tr></table></div>`,
        tip: "<b>💡 버전마다 조금씩 달라요</b> Codex CLI 는 업데이트가 잦습니다. 단축키나 명령이 다르면 <code>/</code> 목록과 화면 하단 안내를 기준으로 하세요.",
      },
      {
        h: "자주 쓰는 슬래시 명령과 실행 옵션",
        body: `<ul><li><code>/status</code> 설정·토큰 사용량 · <code>/model</code> 모델·추론 강도 변경 · <code>/permissions</code> 권한 수준</li>
        <li><code>/new</code> 새 대화(주제가 바뀔 때) · <code>/compact</code> 긴 대화를 요약해 컨텍스트 절약 · <code>/resume</code> 이전 대화</li>
        <li><code>/diff</code> 지금까지 바뀐 내용 보기 · <code>/mention</code> 파일 첨부</li></ul>`,
        code: { lang: "bash", file: "터미널에서 바로 쓰는 실행 방법", text: "codex                          # 대화형 TUI 시작\ncodex \"버그 찾아줘\"              # 첫 메시지와 함께 시작\ncodex resume --last            # 이 폴더의 가장 최근 대화 이어가기\ncodex resume                   # 목록에서 골라 이어가기\ncodex -i ui.png \"레이아웃 문제 찾아줘\"   # 이미지 첨부\ncodex exec \"README 요약해줘\"     # 한 번만 실행하고 종료 (3주차)" },
        tip: "<b>💡 컨텍스트란?</b> Codex 가 한 번에 기억할 수 있는 대화·파일 내용의 양입니다. 주제가 바뀌면 <code>/new</code>, 대화가 길어지면 <code>/compact</code>.",
      },
    ],
    viz: {
      type: "loop", title: "에이전트 루프 — Codex 가 일하는 방식",
      desc: "하나의 요청에 대해 Codex 는 이 순환을 여러 번 돌면서 목표에 도달합니다.",
      center: "Codex\n에이전트",
      steps: [
        { i: "💬", t: "요청 받기", d: "사용자 프롬프트", x: "\"로그인 버그 고쳐 줘\" 같은 <b>목표</b>를 받습니다. 화면에는 <code>• Working (Esc to interrupt)</code> 가 보입니다." },
        { i: "🔎", t: "탐색", d: "Explored · Read · Search", x: "관련 파일을 검색하고 읽어 <b>상황을 파악</b>합니다." },
        { i: "🧠", t: "계획", d: "무엇을 바꿀지 결정", x: "어떤 파일을 어떻게 바꿀지 정합니다. 큰 작업이면 계획 목록을 보여 줍니다." },
        { i: "🛠️", t: "실행", d: "Edited · Ran", x: "파일을 수정하고 명령을 실행합니다. 샌드박스 <b>밖</b>이 필요하면 승인을 요청합니다." },
        { i: "✅", t: "검증", d: "테스트 · 결과 확인", x: "테스트를 돌려 <b>제대로 됐는지</b> 봅니다. 실패하면 다시 탐색으로!" },
      ],
    },
    practice: [
      {
        type: "terminal", title: "Codex 와 대화하기",
        intro: "Codex TUI 안(› 프롬프트)에서 연습합니다.",
        startMode: "agent",
        tasks: [
          { goal: "<code>/</code> 만 입력해 슬래시 명령 목록 보기", hint: "/", match: /^\/$/, mode: "agent", out: "{acc:슬래시 명령 (일부)}\n  /init /status /model /permissions /plan /review /diff /mention /compact /new /resume /mcp /exit\n{dim:@ 파일 검색, ! 셸 명령, $ 스킬}" },
          { goal: "<code>@</code> 로 package.json 을 첨부해 설명 요청하기", hint: "@package.json 이 프로젝트 설명해줘", match: /@package\.json/, mode: "agent", out: "{tool:• Explored}\n  {dim:└ Read package.json}\n{ok:•} 이 프로젝트는 Express 기반 웹 서버입니다.\n  • 실행: npm start\n  • 테스트: npm test (Jest)\n  • 주요 의존성: express, dotenv" },
          { goal: "<code>!</code> 로 git 상태를 바로 확인하기", hint: "!git status", match: /^!\s?git status$/, mode: "agent", out: "{dim:(셸 명령)} git status\nOn branch main\nnothing to commit, working tree clean" },
          { goal: "모델·추론 강도 선택 화면 열기", hint: "/model", match: /^\/model$/, mode: "agent", out: "모델 선택:\n  {ok:› 기본 모델 (권장)}\n    다른 모델들…\n추론 강도: low · {ok:medium} · high" },
          { goal: "대화가 길어졌다고 가정하고 요약하기", hint: "/compact", match: /^\/compact$/, mode: "agent", out: "{dim:• 대화를 요약했습니다. 컨텍스트 사용량 71% → 15%}" },
          { goal: "새 작업을 위해 새 대화 시작하기", hint: "/new", match: /^\/new$/, mode: "agent", out: "{dim:(새 대화를 시작했습니다 — 새 작업은 깨끗한 상태로!)}" },
        ],
      },
      {
        type: "quiz", title: "단축키 퀴즈",
        questions: [
          { q: "Codex 가 엉뚱한 파일을 고치기 시작했습니다. 즉시 멈추려면?", options: ["Ctrl+Z", "Esc", "Tab", "/stop"], answer: 1, explain: "<kbd>Esc</kbd> 는 진행 중인 작업을 멈추고 대화는 유지합니다." },
          { q: "Codex 가 작업하는 도중 \"테스트 파일은 건드리지 마\" 라고 <b>지금 작업에</b> 바로 덧붙이려면?", options: ["작업이 끝날 때까지 기다린다", "입력 후 Enter (현재 작업에 지시 추가)", "Ctrl+C", "/new"], answer: 1, explain: "작업 중 <kbd>Enter</kbd> 는 현재 차례에 지시를 끼워 넣고, <kbd>Tab</kbd> 은 다음 차례로 예약합니다." },
          { q: "어제 이 폴더에서 하던 대화를 이어가려면?", options: ["codex --again", "codex resume --last", "codex restore", "codex -x"], answer: 1, explain: "<code>codex resume</code> 은 목록에서 선택, <code>--last</code> 는 가장 최근 대화." },
          { q: "<code>!npm test</code> 는 무엇을 하나요?", options: ["Codex 에게 테스트를 금지시킨다", "셸에서 npm test 를 바로 실행한다", "npm 을 삭제한다", "테스트 파일을 생성한다"], answer: 1, explain: "<code>!</code> 는 셸 명령을 현재 샌드박스·승인 설정 아래에서 실행합니다." },
        ],
      },
    ],
    real: {
      body: "<p>실제 프로젝트 폴더(아무 코드나 괜찮습니다)에서 아래 순서로 대화해 보세요.</p>",
      code: { lang: "bash", file: "Codex 안에서", text: "› 이 폴더의 파일 구조를 표로 정리해 줘\n› @README.md 를 3줄로 요약해 줘\n› !git log --oneline -5\n› 방금 본 커밋들이 무슨 작업인지 설명해 줘\n› /status\n› /new" },
    },
    mistakes: [
      ["여러 주제를 한 대화에서 계속 이어가기", "주제가 바뀌면 <code>/new</code> — 이전 맥락이 새 작업을 방해하지 않게"],
      ["잘못 가는 걸 보면서도 끝날 때까지 기다리기", "바로 <kbd>Esc</kbd> 로 멈추거나, <kbd>Enter</kbd> 로 방향을 덧붙이기"],
    ],
    checklist: ["@ 로 파일을 첨부해 질문해 보았다", "! 로 셸 명령을 실행해 보았다", "Esc 로 작업을 중단해 보았다", "/ 만 입력해 명령 목록을 확인했다", "/new 와 /compact 의 차이를 설명할 수 있다"],
  },

  /* ----------------------------------------------------- Day 3 */
  {
    id: 3, week: 1, icon: "📁", time: "45분", level: 1,
    title: "프로젝트 구성과 AGENTS.md",
    subtitle: "Codex 가 읽는 파일·폴더 구조를 이해하고, /init 으로 AGENTS.md 를 만들어 '프로젝트 설명서'를 줍니다.",
    goals: ["~/.codex 와 프로젝트 폴더에서 Codex 가 읽는 파일을 안다", "/init 으로 AGENTS.md 를 생성한다", "AGENTS.md 가 합쳐지는 규칙을 이해한다"],
    analogy: { i: "📋", t: "새로 온 동료에게 매번 '우리 팀은 이렇게 일해요'라고 말해 주긴 힘들죠. 그래서 <b>신입 안내서</b>를 책상에 두는데, <b>AGENTS.md 가 바로 그 안내서</b>입니다. Codex 는 작업을 시작할 때 이 파일을 자동으로 읽습니다. 게다가 AGENTS.md 는 Codex 전용이 아니라 여러 코딩 에이전트가 함께 쓰는 <b>공개 형식</b>이라 한 번 써 두면 두루 쓰입니다." },
    sections: [
      {
        h: "Codex 가 읽는 파일들",
        body: `<p><b>개인 영역 — Codex 홈 폴더</b> (<code>~/.codex</code>, 환경 변수 <code>CODEX_HOME</code> 으로 변경 가능)</p>
        <ul><li><code>config.toml</code> — 개인 설정 (모델, 권한, MCP 등. 3주차)</li>
        <li><code>AGENTS.md</code> — 모든 프로젝트에 적용되는 <b>개인</b> 지침</li>
        <li><code>rules/</code> — 명령 허용/금지 규칙 (Day 4)</li>
        <li>로그인 정보·대화 기록(sessions) 등 — <b>git 에 올리면 안 되는</b> 개인 데이터</li></ul>
        <p><b>프로젝트 영역</b></p>
        <ul><li><code>AGENTS.md</code> — 프로젝트 지침. 팀과 공유하므로 git 에 커밋</li>
        <li>하위 폴더의 <code>AGENTS.md</code> / <code>AGENTS.override.md</code> — 그 폴더 전용 규칙</li>
        <li><code>.codex/config.toml</code> — 프로젝트 설정 (프로젝트를 <b>신뢰</b>했을 때만 적용)</li>
        <li><code>.agents/skills/</code> — 스킬 (4주차)</li></ul>`,
      },
      {
        h: "/init — AGENTS.md 자동 생성",
        body: "<p>프로젝트 폴더에서 Codex 를 실행하고 <code>/init</code> 을 입력하면, Codex 가 코드를 훑어보고 빌드·테스트 명령, 구조, 코딩 규칙을 정리한 AGENTS.md 초안을 만들어 줍니다.</p>",
        code: { lang: "bash", file: "Codex", text: "› /init" },
        tip: "<b>💡 초안은 시작일 뿐</b> 생성된 AGENTS.md 를 읽어 보고, 틀린 내용은 고치고 팀 규칙을 추가하세요. 짧고 정확할수록 좋습니다.",
      },
      {
        h: "AGENTS.md 가 합쳐지는 규칙",
        body: `<ol><li><b>전역</b>: <code>~/.codex/AGENTS.override.md</code> 가 있으면 그것을, 없으면 <code>~/.codex/AGENTS.md</code> 를 읽습니다.</li>
        <li><b>프로젝트</b>: 프로젝트 루트(보통 git 루트)에서 <b>현재 폴더까지 내려오며</b> 각 폴더에서 파일을 하나씩 찾습니다. 순서는 <code>AGENTS.override.md</code> → <code>AGENTS.md</code> → 설정한 대체 파일 이름.</li>
        <li><b>합치기</b>: 루트 쪽부터 차례로 이어 붙입니다. 현재 폴더에 <b>가까운 파일이 뒤에</b> 오므로, 겹치는 내용은 가까운 쪽이 우선합니다.</li>
        <li><b>크기 제한</b>: 합친 크기가 <code>project_doc_max_bytes</code>(기본 32KiB)에 닿으면 더 읽지 않습니다.</li></ol>`,
        code: { lang: "md", file: "AGENTS.md", text: "# 프로젝트: 할 일 관리 웹앱\n\n## 명령어\n- 개발 서버: npm run dev\n- 테스트: npm test\n- 린트: npm run lint\n\n## 구조\n- src/components: React 컴포넌트\n- src/api: 서버 통신 함수\n\n## 코딩 규칙\n- TypeScript 사용, any 금지\n- 컴포넌트는 함수형 + 훅\n- 커밋 메시지는 'feat: ' 같은 접두어 사용\n\n## 주의사항\n- .env 파일은 절대 수정하지 말 것\n- 수정 후에는 반드시 npm test 실행" },
        after: "<p>이미 다른 이름(예: <code>TEAM_GUIDE.md</code>)의 안내 문서가 있다면 <code>~/.codex/config.toml</code> 에 <code>project_doc_fallback_filenames = [\"TEAM_GUIDE.md\"]</code> 로 대체 이름을 등록할 수 있습니다.</p>",
        tip: "<b>✍️ 작성 팁</b> '코드를 깔끔하게' 같은 막연한 말보다 '함수는 40줄 이하' 같은 <b>구체적인 규칙</b>과 <b>실제로 돌릴 수 있는 명령</b>이 훨씬 잘 지켜집니다.",
      },
    ],
    viz: [
      {
        type: "tree", title: "Codex 프로젝트 구조",
        desc: "파란색은 Codex 가 특별히 인식하는 파일입니다.",
        items: [
          { n: "my-project/", dir: true },
          { n: "├── AGENTS.md", hl: true, a: "프로젝트 지침 — 팀 공유 (git 커밋)" },
          { n: "├── .codex/", dir: true, a: "프로젝트 Codex 설정 (신뢰된 프로젝트만)" },
          { n: "│   ├── config.toml", hl: true, a: "프로젝트 설정" },
          { n: "│   └── agents/", dir: true, a: "커스텀 서브에이전트 (4주차)" },
          { n: "├── .agents/", dir: true },
          { n: "│   └── skills/", dir: true, a: "스킬 (4주차)" },
          { n: "├── services/", dir: true },
          { n: "│   └── payments/", dir: true },
          { n: "│       └── AGENTS.override.md", hl: true, a: "이 폴더에선 AGENTS.md 대신 사용" },
          { n: "└── package.json" },
          { n: "" },
          { n: "~/.codex/", dir: true, a: "Codex 홈 (개인, git 에 올리지 않음)" },
          { n: "├── config.toml", hl: true, a: "개인 설정" },
          { n: "├── AGENTS.md", hl: true, a: "모든 프로젝트에 적용되는 개인 지침" },
          { n: "└── rules/", dir: true, a: "명령 허용/금지 규칙" },
        ],
      },
      {
        type: "layers", title: "AGENTS.md 가 합쳐지는 순서 (위 → 아래로 이어 붙임)",
        layers: [
          { i: "🙋", n: "전역", chips: ["~/.codex/AGENTS.md"], d: "가장 먼저 — 개인 선호" },
          { i: "👥", n: "프로젝트 루트", chips: ["./AGENTS.md", "git 공유"], d: "팀 전체 규칙" },
          { i: "📂", n: "하위 폴더", chips: ["services/AGENTS.md"], d: "해당 폴더에서 작업할 때 추가" },
          { i: "🎯", n: "현재 폴더", chips: ["AGENTS.override.md"], d: "마지막 — 가장 구체적인 규칙이 우선" },
        ],
      },
    ],
    practice: [
      {
        type: "terminal", title: "/init 으로 AGENTS.md 만들기",
        files: ["package.json", "src/", "README.md", "tests/"],
        cat: { "AGENTS.md": "# my-project\n\n## 명령어\n- 개발: npm run dev\n- 테스트: npm test\n\n## 구조\n- src/: 소스 코드\n- tests/: Jest 테스트\n\n## 코드 스타일\n- ES Modules, 2칸 들여쓰기" },
        tasks: [
          { goal: "현재 폴더 파일 목록 보기", hint: "ls", match: /^ls( -la?)?$/, out: "package.json  src/  README.md  tests/" },
          { goal: "Codex 실행", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "/init 으로 AGENTS.md 생성", hint: "/init", match: /^\/init$/, mode: "agent", out: "{tool:• Explored}\n  {dim:└ Read package.json, README.md · List src/, tests/}\n{tool:• Edited} AGENTS.md {ok:(+38)}\n{ok:•} AGENTS.md 를 만들었습니다. 빌드/테스트 명령, 폴더 구조, 코드 스타일을 정리했어요. 검토해 주세요." },
          { goal: "Codex 종료", hint: "/exit", match: /^(\/exit|\/quit|exit)$/, mode: "agent", enter: "shell", out: "" },
          { goal: "생성된 파일 내용 확인", hint: "cat AGENTS.md", match: /^cat AGENTS\.md$/, out: "# my-project\n\n## 명령어\n- 개발: npm run dev\n- 테스트: npm test\n\n## 구조\n- src/: 소스 코드\n- tests/: Jest 테스트\n\n## 코드 스타일\n- ES Modules, 2칸 들여쓰기" },
        ],
      },
      {
        type: "editor", title: "나만의 AGENTS.md 작성하기",
        intro: "할 일 관리 앱 프로젝트의 AGENTS.md 를 직접 써 보세요. 오른쪽 조건이 실시간으로 체크됩니다.",
        file: "AGENTS.md",
        starter: "# 프로젝트: \n\n## 명령어\n\n",
        checks: [
          { label: "제목(# 프로젝트 이름)이 있다", re: /^#\s+\S+/m },
          { label: "테스트 명령(npm test, pytest 등)이 있다", re: /(npm|pnpm|yarn)\s+(run\s+)?test|pytest|go test|cargo test/ },
          { label: "'구조' 또는 '폴더' 섹션이 있다", re: /^##\s*.*(구조|폴더|디렉)/m },
          { label: "'규칙' 또는 '스타일' 섹션이 있다", re: /^##\s*.*(규칙|스타일|컨벤션)/m },
          { label: "항목(- 로 시작)이 3개 이상", fn: (v) => (v.match(/^\s*-\s+\S/gm) || []).length >= 3 },
          { label: "하지 말아야 할 일(금지/하지 말/절대)이 적혀 있다", re: /(금지|하지\s*말|절대|never|don't)/i },
        ],
        solution: "# 프로젝트: 할 일 관리 앱\n\n## 명령어\n- 개발 서버: npm run dev\n- 테스트: npm test\n- 린트: npm run lint\n\n## 구조\n- src/components: 화면 컴포넌트\n- src/store: 상태 관리\n- tests/: 단위 테스트\n\n## 코딩 규칙\n- TypeScript 사용, any 금지\n- 함수는 40줄 이하로 유지\n- 새 기능에는 반드시 테스트 추가\n\n## 주의사항\n- .env 파일은 절대 수정하지 말 것\n- 수정 후 npm test 를 실행해 통과를 확인할 것",
        tip: "<b>팁</b> 실제 프로젝트에서 그대로 돌릴 수 있는 명령을 쓰는 것이 가장 중요합니다. Codex 는 이 명령으로 스스로 검증합니다.",
      },
    ],
    real: {
      body: "<p>Day 1 에 만든 <code>codex-study</code> 폴더(또는 아무 프로젝트)에서:</p>",
      code: { lang: "bash", file: "Codex", text: "› /init\n› AGENTS.md 에 '답변은 항상 한국어로' 규칙을 추가해 줘\n› /new\n› 이 프로젝트 테스트는 어떻게 돌려?" },
      after: "<p>새 대화에서도 AGENTS.md 내용을 기반으로 답하면 성공입니다. 개인 취향(답변 언어 등)은 프로젝트가 아니라 <code>~/.codex/AGENTS.md</code> 에 두는 것이 좋습니다.</p>",
    },
    mistakes: [
      ["AGENTS.md 에 코드 전체나 긴 문서를 붙여넣기", "핵심 명령·규칙만 짧게. 합친 크기 제한(기본 32KiB)도 있습니다"],
      ["/init 결과를 검토 없이 그대로 사용", "틀린 명령·오래된 정보는 직접 고치고 팀 규칙 추가"],
    ],
    checklist: ["~/.codex 와 프로젝트 AGENTS.md 의 역할을 구분할 수 있다", "/init 을 실행해 보았다", "AGENTS.md 에 명령어·구조·규칙을 적었다", "AGENTS.override.md 가 언제 쓰이는지 안다"],
  },

  /* ----------------------------------------------------- Day 4 */
  {
    id: 4, week: 1, icon: "🛡️", time: "50분", level: 2,
    title: "제어 관리 — 샌드박스와 승인",
    subtitle: "Codex 가 무엇을 마음대로 하고, 무엇을 물어보고, 무엇을 절대 못 하게 할지 정합니다.",
    goals: ["샌드박스 모드 3가지와 승인 정책을 구분한다", "/permissions 와 --sandbox / --ask-for-approval 을 사용한다", "rules 파일로 위험한 명령을 금지한다"],
    analogy: { i: "🏗️", t: "공사장에 <b>안전 펜스(샌드박스)</b>를 치고 <b>현장 감독(승인 정책)</b>을 둔 것과 같습니다. 펜스 안에서는 작업자가 자유롭게 일하지만, 펜스 밖으로 자재를 옮기거나(작업 폴더 밖 수정) 외부 업체를 부르려면(네트워크) 감독의 허락이 필요하죠. 그리고 <b>출입 금지 구역 표지판(rules)</b>은 감독이 허락해도 못 들어가게 막습니다." },
    sections: [
      {
        h: "두 개의 다이얼: 샌드박스 × 승인 정책",
        body: `<p>Codex 의 안전장치는 두 가지를 조합합니다. <b>샌드박스</b>는 운영체제 수준에서 '할 수 있는 범위'를 막는 울타리, <b>승인 정책</b>은 그 울타리를 넘어야 할 때 '물어볼지'를 정합니다.</p>
        <div class="tbl-wrap"><table class="tbl">
        <tr><th>샌드박스 모드</th><th>할 수 있는 것</th><th>언제</th></tr>
        <tr><td><b>read-only</b></td><td>읽기와 읽기 전용 명령. 수정은 승인 필요</td><td>처음 보는 코드 조사, git 저장소가 아닌 폴더</td></tr>
        <tr><td><b>workspace-write</b></td><td>작업 폴더 안 수정·명령 실행. <b>네트워크는 기본 꺼짐</b></td><td>일반 개발 (CLI 기본값)</td></tr>
        <tr><td><b>danger-full-access</b></td><td>제한 없음</td><td>이미 격리된 컨테이너·VM 안에서만</td></tr></table></div>
        <div class="tbl-wrap"><table class="tbl">
        <tr><th>승인 정책</th><th>동작</th></tr>
        <tr><td><b>on-request</b></td><td>샌드박스 경계 밖 작업(작업 폴더 밖 수정, 네트워크 등) 전에 사용자에게 묻는다</td></tr>
        <tr><td><b>never</b></td><td>묻지 않는다 — 경계 밖 작업은 실패로 처리. CI 에서 <code>read-only</code> 와 함께 사용</td></tr></table></div>
        <p>git 저장소에서는 보통 <b>Auto</b> 프리셋(<code>workspace-write</code> + <code>on-request</code>)이 권장됩니다. 대화 중에는 <code>/permissions</code> 로 바꿉니다.</p>`,
        tip: "<b>📌 버전 메모</b> 예전 문서에 보이던 <code>untrusted</code> 승인 값과 <code>--full-auto</code> 옵션은 현재 문서에서 은퇴(지원 중단)로 안내됩니다. 오래된 블로그 예제를 복사할 때 주의하세요.",
      },
      {
        h: "실행할 때 지정하기",
        code: [
          { lang: "bash", file: "terminal", text: "codex --sandbox read-only                       # 조사만\ncodex --sandbox workspace-write --ask-for-approval on-request   # 일반 개발 (Auto 와 같음)\ncodex -s read-only -a never                     # 묻지 않고 읽기만 (자동화용)\n\n# ⛔ 승인과 샌드박스를 모두 끔 — 격리된 환경 밖에서는 절대 금지\ncodex --dangerously-bypass-approvals-and-sandbox   # 별칭: --yolo" },
          { lang: "toml", file: "~/.codex/config.toml — 기본값으로 저장", text: "sandbox_mode = \"workspace-write\"\napproval_policy = \"on-request\"\n\n[sandbox_workspace_write]\nnetwork_access = false   # 필요할 때만 true" },
        ],
        tip: "<b>⛔ 경고</b> <code>--yolo</code> 는 이름 그대로 위험합니다. Codex 가 실수로 <code>rm -rf</code> 를 실행해도 막을 장치가 없습니다. 인터넷과 분리된 컨테이너·VM 이 아닌 곳에서는 쓰지 마세요.",
        tipType: "bad",
      },
      {
        h: "rules — 특정 명령을 허용·확인·금지",
        body: "<p>샌드박스 밖에서 실행하려는 명령에 대해 <b>규칙</b>을 정할 수 있습니다. <code>~/.codex/rules/</code> 폴더의 <code>.rules</code> 파일에 <code>prefix_rule()</code> 을 씁니다(파이썬 비슷한 Starlark 문법). TUI 에서 '항상 허용'을 고르면 <code>~/.codex/rules/default.rules</code> 에 자동으로 추가됩니다.</p>",
        code: { lang: "python", file: "~/.codex/rules/team.rules", text: "# git push 는 매번 확인\nprefix_rule(\n    pattern = [\"git\", \"push\"],\n    decision = \"prompt\",\n    justification = \"원격 저장소 변경은 사람이 확인\",\n)\n\n# rm -rf 는 금지\nprefix_rule(\n    pattern = [\"rm\", \"-rf\"],\n    decision = \"forbidden\",\n    justification = \"파일 삭제는 git 으로 되돌릴 수 있게 git rm 을 사용\",\n    match = [\"rm -rf build\"],\n)\n\n# 테스트 명령은 허용\nprefix_rule(\n    pattern = [\"npm\", [\"test\", \"run\"]],   # 두 번째 자리: test 또는 run\n    decision = \"allow\",\n)" },
        after: `<ul><li><code>decision</code>: <code>allow</code>(기본) · <code>prompt</code>(물어봄) · <code>forbidden</code>(금지)</li>
          <li>여러 규칙이 맞으면 <b>가장 엄격한 것</b>이 이깁니다: forbidden &gt; prompt &gt; allow</li>
          <li><code>match</code> / <code>not_match</code> 는 규칙을 불러올 때 검사하는 '인라인 테스트'</li>
          <li>확인: <code>codex execpolicy check --pretty --rules ~/.codex/rules/team.rules -- git push origin main</code></li></ul>`,
      },
    ],
    viz: {
      type: "flow", title: "Codex 가 명령을 실행하려 할 때",
      steps: [
        { i: "🤖", t: "명령 요청", d: "git push origin main", x: "Codex 가 <code>git push origin main</code> 을 실행하려 합니다." },
        { i: "⛔", t: "rules 확인", d: "forbidden 이면 차단", x: "<code>forbidden</code> 규칙에 맞으면 <b>무조건 거부</b>되고, justification 이 Codex 에게 전달됩니다." },
        { i: "🧱", t: "샌드박스 안?", d: "workspace-write 범위", x: "작업 폴더 안 수정·로컬 명령이면 샌드박스 안에서 바로 실행됩니다. push 는 <b>네트워크</b>가 필요하므로 경계 밖입니다." },
        { i: "❓", t: "승인 정책", d: "on-request → 질문", x: "경계 밖 작업이므로 <code>on-request</code> 정책에 따라 <b>사용자에게 승인</b>을 요청합니다. (<code>never</code> 면 실패 처리)" },
        { i: "✅", t: "실행", d: "승인 시 실행", x: "승인하면 실행합니다. '항상 허용'을 고르면 rules 파일에 규칙이 추가됩니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 rules 작성", title: "팀 명령 규칙 만들기",
        intro: "~/.codex/rules/team.rules 에 ① <code>git push</code> 는 확인(prompt), ② <code>rm -rf</code> 는 금지(forbidden, 이유 포함) 규칙을 작성하세요.",
        file: "~/.codex/rules/team.rules",
        starter: "# 규칙을 작성하세요\n",
        checks: [
          { label: "prefix_rule( 을 2개 이상 사용", fn: (v) => (v.match(/prefix_rule\s*\(/g) || []).length >= 2 },
          { label: "pattern 에 \"git\", \"push\" 가 있다", re: /pattern\s*=\s*\[\s*"git"\s*,\s*"push"/ },
          { label: "decision = \"prompt\" 가 있다", re: /decision\s*=\s*"prompt"/ },
          { label: "pattern 에 \"rm\", \"-rf\" 가 있다", re: /pattern\s*=\s*\[\s*"rm"\s*,\s*"-rf"/ },
          { label: "decision = \"forbidden\" 가 있다", re: /decision\s*=\s*"forbidden"/ },
          { label: "justification 으로 이유를 적었다", re: /justification\s*=\s*"\S/ },
        ],
        solution: "# git push 는 매번 확인\nprefix_rule(\n    pattern = [\"git\", \"push\"],\n    decision = \"prompt\",\n    justification = \"원격 저장소 변경은 사람이 확인\",\n)\n\n# rm -rf 는 금지\nprefix_rule(\n    pattern = [\"rm\", \"-rf\"],\n    decision = \"forbidden\",\n    justification = \"삭제는 git rm 으로 되돌릴 수 있게\",\n)",
        tip: "<b>힌트</b> 여러 규칙이 동시에 맞으면 forbidden &gt; prompt &gt; allow 순으로 엄격한 쪽이 이깁니다.",
      },
      {
        type: "quiz", title: "권한 퀴즈",
        questions: [
          { q: "기본 <code>workspace-write</code> 샌드박스에서 <code>npm install</code> 이 실패했습니다. 가장 그럴듯한 이유는?", options: ["Codex 가 npm 을 모른다", "네트워크 접근이 기본으로 꺼져 있다", "읽기 전용이라서", "AGENTS.md 가 없어서"], answer: 1, explain: "workspace-write 는 네트워크가 기본 꺼짐입니다. 필요하면 승인하거나 <code>[sandbox_workspace_write] network_access = true</code>." },
          { q: "처음 보는 레거시 코드를 '조사만' 시키고 싶다면?", options: ["--sandbox read-only", "--yolo", "--sandbox danger-full-access", "-a never 만 지정"], answer: 0 },
          { q: "같은 명령에 allow 규칙과 forbidden 규칙이 모두 맞으면?", options: ["allow", "forbidden", "prompt", "먼저 쓴 규칙"], answer: 1, explain: "가장 엄격한 결정이 이깁니다." },
          { q: "<code>--dangerously-bypass-approvals-and-sandbox</code>(--yolo)를 써도 되는 곳은?", options: ["회사 노트북", "외부와 격리된 일회용 컨테이너", "운영 서버", "어디든 괜찮다"], answer: 1, explain: "승인과 샌드박스가 모두 꺼지므로 이미 격리된 환경에서만." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "codex --sandbox read-only\n› 이 프로젝트에 로그인 기능을 넣으려면 어떤 파일을 바꿔야 하는지 조사만 해 줘\n› /permissions        # Auto 로 전환\n› /status             # 권한이 바뀐 것 확인" },
      after: "<p>read-only 에서 수정을 요청하면 Codex 가 승인을 요청하는지 확인해 보세요.</p>",
    },
    mistakes: [
      ["승인 창이 귀찮아서 <code>--yolo</code> 를 습관처럼 사용", "<code>/permissions</code> 의 Auto 프리셋 + 자주 쓰는 안전한 명령만 rules 로 allow"],
      ["네트워크를 항상 켜 두기", "필요한 작업에서만 승인하거나 해당 프로필에서만 <code>network_access = true</code>"],
    ],
    checklist: ["샌드박스 모드 3가지를 설명할 수 있다", "on-request 와 never 의 차이를 안다", "rules 의 allow/prompt/forbidden 우선순위를 안다", "/permissions 를 실제로 써 보았다"],
  },

  /* ----------------------------------------------------- Day 5 */
  {
    id: 5, week: 1, icon: "🐙", time: "45분", level: 2,
    title: "GitHub 연결",
    subtitle: "git·GitHub CLI 와 연결해 커밋, 브랜치, PR 까지 Codex 와 함께 처리합니다.",
    goals: ["git 이 Codex 작업의 안전망인 이유를 안다", "gh CLI 로 GitHub 인증을 한다", "Codex 에게 커밋·PR 작성을 맡기고 /diff 로 확인한다"],
    analogy: { i: "💾", t: "git 은 <b>게임의 세이브 포인트</b>입니다. Codex 가 실수해도 저장해 둔 곳으로 돌아갈 수 있죠. GitHub 은 그 세이브 파일을 팀과 공유하는 <b>클라우드 저장소</b>입니다." },
    sections: [
      {
        h: "왜 git 이 Codex 와 궁합이 좋을까?",
        body: `<ul><li><b>안전망</b>: Codex 의 변경이 마음에 안 들면 <code>git restore</code> 로 되돌리기</li>
        <li><b>변경 확인</b>: TUI 의 <code>/diff</code>(추적 안 된 새 파일까지 표시) 또는 <code>git diff</code></li>
        <li><b>기본 전제</b>: Codex 는 git 저장소 안에서 일하는 것을 기본으로 가정합니다. <code>codex exec</code> 는 git 저장소가 아니면 실행을 거부하고 <code>--skip-git-repo-check</code> 를 요구합니다</li>
        <li><b>자동화</b>: Codex 는 diff 를 읽고 <b>커밋 메시지·PR 설명</b>을 잘 써 줍니다</li></ul>`,
      },
      {
        h: "GitHub CLI(gh) 설치와 로그인",
        body: "<p>Codex 는 GitHub 작업(이슈 보기, PR 만들기)에 <code>gh</code> 명령을 사용할 수 있습니다. 설치 후 한 번만 로그인하면 됩니다.</p>",
        code: { lang: "bash", file: "설치", text: "# macOS\nbrew install gh\n# Windows\nwinget install --id GitHub.cli\n# 로그인 (브라우저 인증)\ngh auth login\ngh auth status" },
        tip: "<b>🧱 샌드박스와 네트워크</b> <code>git push</code>, <code>gh pr create</code> 는 네트워크가 필요합니다. 기본 workspace-write 샌드박스에서는 네트워크가 꺼져 있으므로 Codex 가 <b>승인을 요청</b>합니다. 정상 동작이니 명령을 읽고 승인하세요.",
      },
      {
        h: "Codex 에게 git 작업 맡기기",
        code: { lang: "bash", file: "Codex", text: "› 지금까지 변경사항을 확인하고 적절한 커밋 메시지로 커밋해 줘\n› feature/login 브랜치를 만들고 거기서 작업해 줘\n› 이 브랜치로 PR 을 만들어 줘. 설명에는 변경 이유와 테스트 방법을 넣어\n› gh issue view 12 로 이슈를 읽고 해결해 줘\n› /diff" },
        after: "<p>GitHub 저장소를 Codex(클라우드)에 연결하면 PR 댓글에 <code>@codex review</code> 라고 써서 리뷰를 받거나, <code>@codex 테스트 실패 고쳐 줘</code> 처럼 작업을 맡길 수도 있습니다. 3주차(Day 17)에 자세히 다룹니다.</p>",
        tip: "<b>💡 좋은 습관</b> 큰 작업 전에 <code>git commit</code> 으로 세이브 포인트를 만들고, 작업은 별도 브랜치에서 하세요.",
      },
    ],
    viz: {
      type: "sequence", title: "Codex 와 함께하는 커밋·PR 흐름",
      actors: [{ t: "나", i: "🙋" }, { t: "Codex", i: "◎", center: true }, { t: "git", i: "🌿" }, { t: "GitHub", i: "🐙" }],
      msgs: [
        { from: "나", to: "Codex", t: "\"변경사항 커밋하고 PR 만들어 줘\"", x: "자연어로 요청합니다." },
        { from: "Codex", to: "git", t: "git status / git diff", x: "무엇이 바뀌었는지 먼저 <b>확인</b>합니다 (샌드박스 안, 로컬 명령)." },
        { from: "Codex", to: "Codex", t: "변경 분석 → 커밋 메시지 작성", x: "diff 를 읽고 변경 의도를 요약합니다." },
        { from: "Codex", to: "git", t: "git commit", x: "로컬 커밋은 작업 폴더 안의 작업입니다." },
        { from: "Codex", to: "나", t: "git push 실행해도 될까요?", x: "네트워크가 필요하므로 <b>승인</b>을 요청합니다 (rules 로 prompt 지정 시에도)." },
        { from: "Codex", to: "GitHub", t: "git push · gh pr create", x: "승인 후 원격에 올리고 PR 을 만듭니다." },
        { from: "GitHub", to: "나", t: "PR 링크", x: "완성된 PR 주소를 받아 리뷰합니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "GitHub 연결하고 PR 만들기",
        tasks: [
          { goal: "GitHub 로그인 상태 확인", hint: "gh auth status", match: /^gh auth status$/, out: "github.com\n  {ok:✓} Logged in to github.com account me (keyring)\n  - Token scopes: 'repo', 'read:org'" },
          { goal: "새 브랜치 만들기", hint: "git checkout -b feature/hello", match: /^git (checkout -b|switch -c) \S+$/, out: (c) => `Switched to a new branch '${c.split(" ").pop()}'` },
          { goal: "Codex 실행", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "Codex 에게 커밋을 요청", hint: "변경사항 확인하고 커밋해줘", match: /커밋|commit/i, mode: "agent", out: "{tool:• Ran} git status --short\n  {dim:└ M src/hello.js}\n{tool:• Ran} git diff\n{tool:• Ran} git add src/hello.js && git commit -m \"feat: 인사 메시지 함수 추가\"\n  {dim:└ [feature/hello 3f2a1c9] feat: 인사 메시지 함수 추가}\n{ok:•} 커밋했습니다." },
          { goal: "Codex 에게 PR 생성을 요청", hint: "PR 만들어줘", match: /PR|풀\s?리퀘|pull request/i, mode: "agent", out: "{warn:▲ 승인 요청} git push -u origin feature/hello  {dim:(네트워크 필요)}\n  {ok:› Yes, proceed}\n{tool:• Ran} git push -u origin feature/hello\n{tool:• Ran} gh pr create --title \"feat: 인사 메시지 함수 추가\" --body \"...\"\n  {dim:└ https://github.com/me/my-project/pull/7}\n{ok:•} PR #7 을 만들었습니다. 설명에 변경 이유와 테스트 방법을 적었어요." },
          { goal: "이번 세션의 변경 내용 확인", hint: "/diff", match: /^\/diff$/, mode: "agent", out: "{dim:diff --git a/src/hello.js b/src/hello.js}\n{ok:+export function hello(name) {}\n{ok:+  return \"안녕하세요, \" + name + \"님\";}\n{ok:+}}" },
        ],
      },
      {
        type: "order", title: "안전한 작업 순서 맞추기",
        intro: "Codex 와 새 기능을 개발할 때의 권장 순서로 정렬하세요. (드래그 또는 ▲▼ 버튼)",
        items: ["작업 전 현재 상태 커밋 (세이브 포인트)", "새 브랜치 만들기", "Codex 에게 기능 구현 요청", "/diff 로 변경 내용 검토", "테스트 실행 후 커밋", "push 승인하고 PR 생성"],
        explain: "브랜치 + 커밋 습관이 있으면 언제든 되돌릴 수 있습니다.",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "cd codex-study\ngit add . && git commit -m \"init\"\ncodex\n› hello.py 파일을 만들어 인사말을 출력하게 하고, 커밋까지 해 줘\n› !git log --oneline\n› /diff" },
    },
    mistakes: [
      ["main 브랜치에서 바로 큰 작업", "브랜치를 만들고 작업 → 문제 시 브랜치만 버리면 됨"],
      ["push 승인 창을 읽지 않고 바로 승인", "어떤 원격·브랜치로 가는지 확인 후 승인"],
    ],
    checklist: ["gh auth status 가 로그인 상태다", "Codex 에게 커밋 메시지를 쓰게 해 보았다", "push 때 승인을 요청하는 이유(네트워크)를 안다", "/diff 로 변경을 확인했다"],
  },

  /* ----------------------------------------------------- Day 6 */
  {
    id: 6, week: 1, icon: "🏗️", time: "60분", level: 2,
    title: "첫 번째 빌드",
    subtitle: "탐색 → 계획 → 구현 → 검증 → 커밋. 계획 모드로 방향을 정한 뒤 작은 앱을 처음부터 만들어 봅니다.",
    goals: ["탐색-계획-구현-검증-커밋 흐름을 익힌다", "/plan 으로 계획을 먼저 검토한다", "작은 앱을 완성하고 실행·검증한다"],
    analogy: { i: "🏠", t: "집을 지을 때 바로 벽돌부터 쌓지 않습니다. <b>땅을 살펴보고(탐색) → 설계도를 그리고(계획) → 짓고(구현) → 준공 검사(검증)</b>를 하죠. Codex 에게도 '바로 코딩하지 말고 먼저 계획을 보여줘'라고 하면 결과가 훨씬 좋아집니다." },
    sections: [
      {
        h: "다섯 단계 워크플로우",
        body: `<ol><li><b>탐색</b>: "관련 파일을 읽어 봐. 아직 코드는 쓰지 마." (불안하면 <code>--sandbox read-only</code>)</li>
        <li><b>계획</b>: <code>/plan</code> 으로 계획 모드 전환 → 계획 검토·수정</li>
        <li><b>구현</b>: 계획 확정 후 실행 모드로 돌아와 구현 (계획 뒤 <kbd>Shift</kbd>+<kbd>Tab</kbd> 로 실행 전환이 안내되기도 합니다)</li>
        <li><b>검증</b>: 실행·테스트로 직접 확인</li>
        <li><b>커밋</b>: 결과를 확인하고 커밋, 필요하면 PR</li></ol>`,
        tip: "<b>💡 추론 강도</b> 어려운 설계라면 <code>/model</code> 에서 추론 강도(reasoning effort)를 높여 보세요. 대신 시간과 토큰이 더 듭니다.",
      },
      {
        h: "실습 목표: 할 일(To-do) 웹앱",
        body: "<p>HTML 파일 하나로 동작하는 할 일 앱을 만들어 봅니다. 요구사항을 명확히 적어서 전달하는 것이 핵심입니다.</p>",
        code: { lang: "md", file: "요청 프롬프트 예시", text: "할 일 관리 웹앱을 만들고 싶어. 먼저 계획만 세워 줘.\n\n요구사항:\n- index.html 하나로 동작 (외부 라이브러리 없이)\n- 할 일 추가, 완료 체크, 삭제\n- 새로고침해도 유지 (localStorage)\n- 모바일에서도 보기 좋게\n\n완료 기준:\n- 브라우저에서 열어 추가/완료/삭제가 모두 동작" },
      },
      {
        h: "검증까지가 개발이다",
        body: "<p>Codex 가 '완료했습니다'라고 해도 직접 실행해 보세요. 문제가 있으면 <b>증상을 구체적으로</b> 알려 주면 됩니다. 화면 문제라면 스크린샷을 붙여넣는 것이 가장 빠릅니다.</p>",
        code: { lang: "bash", file: "Codex", text: "› 삭제 버튼을 눌러도 새로고침하면 다시 나타나. 원인을 찾아서 고쳐 줘\n› /diff\n› 지금 상태로 커밋해 줘" },
      },
    ],
    viz: {
      type: "flow", title: "탐색 → 계획 → 구현 → 검증 → 커밋",
      steps: [
        { i: "🔎", t: "탐색", d: "읽기만, 코딩 금지", x: "\"관련 파일 읽어 보고 구조를 파악해. <b>아직 코드는 쓰지 마</b>.\"" },
        { i: "📝", t: "계획", d: "/plan", x: "<code>/plan</code> 으로 계획 모드. Codex 가 단계별 계획을 제시하면 <b>검토·수정</b>합니다." },
        { i: "✅", t: "확정", d: "계획 승인", x: "계획이 마음에 들면 실행 모드로 전환. 이제부터 실제 수정이 시작됩니다." },
        { i: "🛠️", t: "구현", d: "작은 단위로", x: "Codex 가 파일을 만들고 수정합니다. 작업 중 <kbd>Enter</kbd> 로 방향을 보정할 수 있습니다." },
        { i: "🧪", t: "검증", d: "실행·테스트", x: "직접 열어 보고, 테스트를 돌립니다. 문제는 증상(또는 스크린샷)과 함께 전달." },
        { i: "💾", t: "커밋", d: "세이브 포인트", x: "\"커밋해 줘\" — 다음 작업의 안전한 출발점이 됩니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "할 일 앱 빌드 시뮬레이션",
        startMode: "agent",
        files: [],
        tasks: [
          { goal: "계획 모드로 전환하기", hint: "/plan", match: /^\/plan$/, mode: "agent", out: "{warn:• Plan mode} — 파일을 수정하지 않고 계획만 제안합니다." },
          { goal: "계획을 요청하세요 (단어 '계획' 포함)", hint: "할 일 관리 웹앱을 만들고 싶어. index.html 하나로, localStorage 사용. 먼저 계획만 세워줘", match: /계획|plan/i, mode: "agent", out: "{ok:•} 계획안\n  1. index.html 생성 — 입력창, 추가 버튼, 목록 영역\n  2. 할 일 데이터: [{id, text, done}] 배열\n  3. 추가/완료 토글/삭제 함수 작성\n  4. 변경 시 localStorage 에 저장, 시작 시 불러오기\n  5. 모바일 대응 CSS\n  6. 브라우저에서 동작 확인\n{acc:이 계획대로 진행할까요? (실행 / 수정 요청)}" },
          { goal: "계획을 한 가지 수정 요청하기 (예: 남은 개수 표시 추가)", hint: "좋아. 남은 할 일 개수 표시도 추가해줘", match: /추가|넣어|포함|수정/, mode: "agent", out: "{ok:•} 계획 수정: 5-1. 상단에 '남은 할 일 N개' 표시 추가\n{acc:수정된 계획으로 진행할까요?}" },
          { goal: "계획 확정하고 구현 시작시키기", hint: "좋아 진행해", match: /진행|승인|시작|좋아|ok|go/i, mode: "agent", out: "{tool:• Edited} index.html {ok:(+128)}\n{tool:• Ran} npx serve .\n  {dim:└ http://localhost:3000}\n{dim:─ Worked for 41s ─}\n{ok:•} 구현을 마쳤습니다. 브라우저에서 확인해 주세요." },
          { goal: "버그를 증상과 함께 보고하기", hint: "삭제한 항목이 새로고침하면 다시 나타나. 원인 찾아서 고쳐줘", match: /새로고침|버그|안\s?돼|다시 나타|고쳐/, mode: "agent", out: "{tool:• Explored}\n  {dim:└ Read index.html}\n{ok:•} 원인: remove() 함수에서 배열은 지우지만 save() 를 호출하지 않았습니다.\n{tool:• Edited} index.html {ok:(+1)}\n{ok:•} 수정했습니다. 다시 확인해 주세요." },
          { goal: "완성본 커밋 요청하기", hint: "커밋해줘", match: /커밋|commit/i, mode: "agent", out: "{tool:• Ran} git add index.html && git commit -m \"feat: 할 일 관리 앱 첫 버전\"\n{ok:•} 커밋 완료! 첫 번째 빌드를 축하합니다 🎉" },
        ],
      },
      {
        type: "order", title: "빌드 워크플로우 순서",
        items: ["관련 파일 읽기 (코드 작성 금지)", "/plan 으로 계획 세우기", "계획 검토 후 수정·확정", "구현", "실행·테스트로 검증", "커밋"],
      },
    ],
    real: {
      body: "<p>위 프롬프트 예시를 그대로 사용해 실제로 할 일 앱을 만들어 보세요. 완성되면 index.html 을 브라우저로 열어 확인합니다.</p>",
      code: { lang: "bash", file: "내 터미널", text: "mkdir todo-app && cd todo-app && git init\ncodex\n› /plan\n› (위 요청 프롬프트 붙여넣기)\n# 계획 확정 후 실행 모드에서 구현 → 브라우저로 확인 → 커밋" },
    },
    mistakes: [
      ["\"할 일 앱 만들어 줘\" 한 줄 요청", "요구사항 + 제약 + 완료 기준을 함께 전달"],
      ["\"완료했습니다\"만 믿고 넘어가기", "직접 실행·테스트로 검증, 문제는 증상과 함께 전달"],
    ],
    checklist: ["/plan 으로 계획을 먼저 받아 보았다", "요구사항과 완료 기준을 적어서 요청했다", "결과를 직접 실행해 확인했다", "1주차 완주! 🎉"],
  },
];
