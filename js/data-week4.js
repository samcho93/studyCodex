/* 4주차 — 고급 시스템 */
window.WEEK4 = [
  /* ----------------------------------------------------- Day 19 */
  {
    id: 19, week: 4, icon: "🧰", time: "60분", level: 3,
    title: "자동화 워크플로우 — 스킬과 훅",
    subtitle: "반복되는 작업을 스킬로 포장하고, 훅으로 매번 반드시 실행될 규칙을 걸고, 큰 작업은 단계로 나눠 스크립트로 돌립니다.",
    goals: ["SKILL.md 로 재사용 가능한 스킬을 만든다", "훅 이벤트와 차단 방식(종료 코드 2)을 이해한다", "큰 작업을 codex exec 단계로 분할한다"],
    analogy: { i: "📼", t: "<b>스킬</b>은 요리사의 <b>레시피 카드</b>입니다. '릴리스 노트 만들기' 카드를 꽂아 두면 필요할 때 꺼내 그대로 따라 하죠. <b>훅</b>은 주방의 <b>자동 소화 장치</b>입니다. 요리사가 깜빡해도 연기가 나면 반드시 작동합니다." },
    sections: [
      {
        h: "① 스킬 — 재사용 가능한 작업 매뉴얼",
        body: `<p>스킬은 <code>SKILL.md</code> 가 들어 있는 폴더입니다(필요하면 <code>scripts/</code>, <code>references/</code>, <code>assets/</code> 도 함께). Codex 가 찾는 위치:</p>
        <ul><li>저장소: 현재 폴더부터 저장소 루트까지의 <code>.agents/skills/</code></li>
        <li>개인: <code>$HOME/.agents/skills/</code> · 관리자: <code>/etc/codex/skills</code> · 내장: <code>skill-creator</code>, <code>skill-installer</code></li></ul>
        <p><b>호출 방법</b>: 직접 — 입력창에 <code>$스킬이름</code> 또는 <code>/skills</code>. 자동 — 작업이 스킬의 <code>description</code> 과 맞으면 Codex 가 스스로 골라 씁니다. 그래서 description 은 '언제 쓰고 언제 쓰지 않는지'를 분명히 적어야 합니다.</p>`,
        code: { lang: "md", file: ".agents/skills/release-notes/SKILL.md", text: "---\nname: release-notes\ndescription: 릴리스 노트를 작성할 때 사용. git 태그 사이의 변경을 사용자 관점으로 요약한다. 커밋 메시지 작성에는 사용하지 않는다.\n---\n\n# 릴리스 노트 작성법\n1. git describe --tags --abbrev=0 으로 직전 태그를 찾는다\n2. git log <직전태그>..HEAD --oneline 으로 변경 목록을 모은다\n3. '새 기능 / 개선 / 버그 수정' 세 분류로 정리한다\n4. 내부 리팩토링은 제외하고, 사용자가 체감하는 변화만 쓴다" },
        tip: "<b>📌 커스텀 프롬프트 → 스킬</b> 예전 자료의 <code>~/.codex/prompts/*.md</code> 커스텀 프롬프트는 문서에서 deprecated 로 안내되며 스킬로 옮기는 것이 권장됩니다. 처음이라면 <code>$skill-creator</code> 에게 \"릴리스 노트 스킬 만들어 줘\"라고 하면 초안을 만들어 줍니다.",
      },
      {
        h: "② 훅 — 반드시 실행되는 규칙",
        body: `<p>훅은 <code>~/.codex/hooks.json</code>, 저장소의 <code>.codex/hooks.json</code>, 또는 config.toml 의 <code>[hooks]</code> 에 적습니다. 구조는 <b>이벤트 → matcher 그룹 → 핸들러</b>.</p>
        <div class="tbl-wrap"><table class="tbl">
        <tr><th>이벤트(일부)</th><th>언제?</th><th>예</th></tr>
        <tr><td><b>PreToolUse</b></td><td>도구 실행 직전</td><td>위험 명령 차단</td></tr>
        <tr><td><b>PostToolUse</b></td><td>도구 실행 직후</td><td>파일 수정 후 포맷터 실행</td></tr>
        <tr><td><b>UserPromptSubmit</b></td><td>프롬프트 전송 시</td><td>비밀값이 섞인 프롬프트 막기</td></tr>
        <tr><td><b>Stop</b></td><td>응답을 마칠 때</td><td>최종 테스트·알림</td></tr>
        <tr><td><b>SessionStart</b></td><td>세션 시작·재개 시</td><td>작업 맥락 불러오기</td></tr></table></div>`,
        code: [
          { lang: "json", file: ".codex/hooks.json", text: "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"python3 .codex/hooks/block_danger.py\",\n            \"statusMessage\": \"위험 명령 검사 중\"\n          }\n        ]\n      }\n    ]\n  }\n}" },
          { lang: "python", file: ".codex/hooks/block_danger.py", text: "import json, sys\n\ndata = json.load(sys.stdin)                      # 훅 입력 JSON\ncmd = json.dumps(data.get(\"tool_input\", {}))     # 필드 구성은 문서로 확인\n\nif \"rm -rf\" in cmd:\n    print(\"정책: rm -rf 는 금지입니다. git rm 을 쓰세요\", file=sys.stderr)\n    sys.exit(2)                                   # 2 = 차단, stderr 가 이유로 전달\nsys.exit(0)                                       # 0 = 통과" },
        ],
        tip: "<b>⚠️ 훅은 신뢰해야 실행됩니다</b> 직접 관리하는 훅은 <code>/hooks</code> 에서 검토·신뢰한 뒤에만 실행되고, 내용이 바뀌면 다시 검토가 필요합니다. 프로젝트 훅은 프로젝트를 신뢰했을 때만 불러옵니다. 남이 만든 훅은 명령을 꼭 읽어 보세요.",
        tipType: "warn",
      },
      {
        h: "③ 작업 분할 — 단계별 codex exec",
        body: "<p>한 번에 큰 일을 시키면 맥락이 넘치고 검증이 어렵습니다. <b>조사(read-only) → 계획 파일 → 단계별 실행 → 검증</b>으로 나눠 스크립트로 돌리면 각 단계를 확인할 수 있습니다.</p>",
        code: { lang: "bash", file: "migrate.sh (개념 예시)", text: "set -e\n# 1) 조사: 읽기 전용으로 대상 목록을 파일로\ncodex exec \"class 컴포넌트 목록을 한 줄에 하나씩 경로만 출력\" -o targets.txt\n\n# 2) 파일마다 작은 단위로 변환 + 테스트\nwhile read -r f; do\n  codex exec --sandbox workspace-write \"$f 를 함수형 컴포넌트로 변환. 동작 변경 금지. 끝나면 npm test\"\n  git add -A && git commit -m \"refactor: $f 함수형 변환\"\ndone < targets.txt" },
      },
    ],
    viz: {
      type: "layers", title: "재사용·자동화 도구 한눈에",
      layers: [
        { i: "📏", n: "AGENTS.md", chips: ["항상 읽힘", "팀 규칙"], d: "모든 작업의 기본 지침" },
        { i: "📘", n: "스킬", chips: [".agents/skills/*/SKILL.md", "$이름", "자동 선택"], d: "특정 작업의 매뉴얼·스크립트" },
        { i: "🪝", n: "훅", chips: ["hooks.json", "PreToolUse", "Stop", "exit 2 차단"], d: "특정 순간에 반드시 실행" },
        { i: "⛔", n: "rules", chips: ["prefix_rule", "forbidden"], d: "명령 단위 허용·금지 (Day 4)" },
        { i: "🤖", n: "codex exec 스크립트", chips: ["단계 분할", "커밋 단위"], d: "사람 없이 순서대로 실행" },
      ],
    },
    practice: [
      {
        type: "editor", label: "✍️ 스킬 작성", title: "PR 설명 작성 스킬 만들기",
        intro: "현재 브랜치의 변경으로 PR 설명을 쓰는 스킬을 만드세요. 언제 쓰는지 분명한 description, 번호 단계 3개 이상, git 명령 사용.",
        file: ".agents/skills/pr-description/SKILL.md",
        starter: "---\nname: \ndescription: \n---\n\n",
        checks: [
          { label: "frontmatter 에 name 이 있다", re: /^---[\s\S]*?\nname:\s*[\w-]+[\s\S]*?---/ },
          { label: "description 이 20자 이상으로 구체적이다", fn: (v) => { const m = v.match(/\ndescription:\s*(.+)/); return !!m && m[1].trim().length >= 20; } },
          { label: "description 에 '사용' 시점이 드러난다", re: /\ndescription:.*(때|사용|use)/i },
          { label: "git diff 또는 git log 로 변경을 읽는다", re: /git (diff|log)/ },
          { label: "단계가 번호 목록 3개 이상", fn: (v) => (v.match(/^\s*\d+\.\s/gm) || []).length >= 3 },
          { label: "출력 형식(제목/요약/테스트 등)을 정했다", re: /(제목|요약|테스트|형식|섹션)/ },
        ],
        solution: "---\nname: pr-description\ndescription: PR 설명을 작성할 때 사용. 현재 브랜치와 main 의 차이를 읽어 변경 이유와 테스트 방법을 정리한다. 커밋 메시지에는 사용하지 않는다.\n---\n\n# PR 설명 작성법\n1. git log main..HEAD --oneline 으로 커밋 목록을 읽는다\n2. git diff main...HEAD --stat 으로 바뀐 파일을 확인한다\n3. 다음 섹션으로 정리한다: 제목 / 변경 요약 / 변경 이유 / 테스트 방법\n4. 추측한 내용은 '확인 필요'로 표시한다",
      },
      {
        type: "quiz", title: "스킬·훅 퀴즈",
        questions: [
          { q: "저장소 공용 스킬을 두는 위치는?", options: ["~/.codex/prompts/", ".agents/skills/이름/SKILL.md", "AGENTS.md 안", ".github/skills/"], answer: 1 },
          { q: "스킬을 직접 호출하는 입력은?", options: ["@이름", "$이름", "!이름", "#이름"], answer: 1, explain: "CLI 에서는 <code>$</code> 로 스킬을 멘션하거나 <code>/skills</code> 를 씁니다." },
          { q: "파일을 수정할 때마다 <b>반드시</b> 포맷터를 돌리고 싶다. 가장 확실한 방법은?", options: ["AGENTS.md 에 부탁", "PostToolUse 훅", "스킬 description", "/compact"], answer: 1, explain: "AGENTS.md·스킬은 Codex 의 판단에 맡기지만 훅은 이벤트마다 실행됩니다." },
          { q: "훅 스크립트가 작업을 차단하는 대표적인 방법은?", options: ["종료 코드 0", "종료 코드 2 + stderr 에 이유", "아무것도 출력 안 함", "파일 삭제"], answer: 1 },
          { q: "새로 추가했거나 내용이 바뀐 (관리되지 않는) 훅은?", options: ["즉시 실행된다", "/hooks 에서 검토·신뢰하기 전까지 건너뛴다", "영원히 무시된다", "Codex 가 자동 삭제한다"], answer: 1 },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Codex", text: "› $skill-creator 릴리스 노트 작성 스킬을 .agents/skills 에 만들어 줘\n› /skills\n› $release-notes v1.2.0 이후 변경으로 릴리스 노트 써 줘\n› /hooks          # 훅 목록 검토·신뢰" },
    },
    mistakes: [
      ["description 을 \"유용한 스킬\" 처럼 막연하게", "언제 쓰고 언제 안 쓰는지, 트리거 단어를 구체적으로"],
      ["오래 걸리는 전체 테스트를 모든 PostToolUse 에", "matcher 로 범위를 좁히거나 Stop 이벤트에 한 번만"],
    ],
    checklist: ["SKILL.md 의 필수 필드(name, description)를 안다", "$이름 으로 스킬을 호출해 보았다", "훅 이벤트 4개 이상을 설명할 수 있다", "큰 작업을 단계별 codex exec 로 나눠 보았다"],
  },

  /* ----------------------------------------------------- Day 20 */
  {
    id: 20, week: 4, icon: "🕸️", time: "60분", level: 3,
    title: "다중 에이전트와 병렬 작업",
    subtitle: "서브에이전트로 일을 나누고, git worktree 와 Codex Cloud 로 여러 작업을 동시에 진행합니다.",
    goals: ["서브에이전트가 언제 유용한지 안다", ".codex/agents/*.toml 로 커스텀 에이전트를 정의한다", "worktree·클라우드로 병렬 작업을 격리한다"],
    analogy: { i: "👨‍🍳", t: "큰 식당 주방에는 <b>총괄 셰프</b>와 <b>파트별 요리사</b>가 있습니다. 총괄 셰프(메인 에이전트)가 주문을 나눠 주면 각 요리사(서브에이전트)가 <b>자기 조리대(별도 맥락)</b>에서 동시에 일하고, 셰프는 완성된 접시만 모아 내보냅니다." },
    sections: [
      {
        h: "서브에이전트 — 한 세션 안에서 나눠 맡기기",
        body: `<p>Codex 는 전문화된 에이전트를 <b>병렬로</b> 띄우고 결과를 하나로 합칠 수 있습니다. 중간 탐색 결과가 메인 대화를 어지럽히지 않는 것이 장점이지만, 각자 모델·도구 작업을 하므로 <b>토큰을 더 씁니다</b>.</p>
        <ul><li>내장 에이전트: <code>default</code>, <code>worker</code>(구현·수정), <code>explorer</code>(읽기 위주 탐색)</li>
        <li>호출: 프롬프트로 직접 — \"보안·테스트·유지보수 관점별로 서브에이전트를 하나씩 띄워 리뷰하고, 셋 다 끝나면 요약해 줘\"</li>
        <li>관리: <code>/subagents</code> 로 활성 에이전트 스레드 전환·확인</li></ul>`,
      },
      {
        h: "커스텀 에이전트 정의",
        body: "<p>에이전트 하나당 TOML 파일 하나. 개인용은 <code>~/.codex/agents/</code>, 프로젝트용은 <code>.codex/agents/</code>. 필수 필드는 <code>name</code>, <code>description</code>, <code>developer_instructions</code>. 샌드박스·승인·MCP 는 부모 세션 설정을 <b>물려받으며</b> 에이전트 파일에서 덮어쓸 수 없습니다.</p>",
        code: [
          { lang: "toml", file: ".codex/agents/security-reviewer.toml", text: "name = \"security_reviewer\"\ndescription = \"변경 사항의 보안 위험(인젝션, 인증 우회, 비밀값 노출)만 검토하는 읽기 전용 리뷰어.\"\nmodel_reasoning_effort = \"high\"\ndeveloper_instructions = \"\"\"\n파일을 수정하지 않는다.\n근거가 되는 파일 경로와 줄 번호를 반드시 인용한다.\n심각도(high/medium/low)별로 정리해 부모 에이전트에게 보고한다.\n\"\"\"" },
          { lang: "toml", file: "~/.codex/config.toml", text: "[agents]\nmax_concurrent_threads_per_session = 4   # 동시에 열 수 있는 서브에이전트 수" },
        ],
      },
      {
        h: "세션 밖 병렬: git worktree 와 Codex Cloud",
        body: "<p>서로 다른 기능을 <b>동시에</b> 개발하려면 작업 폴더 자체를 나눕니다. git worktree 는 같은 저장소를 여러 폴더·브랜치로 꺼내 주므로, 폴더마다 Codex 를 하나씩 띄우면 서로 파일을 덮어쓰지 않습니다.</p>",
        code: { lang: "bash", file: "terminal", text: "git worktree add ../app-login -b feature/login\ngit worktree add ../app-search -b feature/search\n\n# 터미널 1\ncd ../app-login && codex \"로그인 기능 구현\"\n# 터미널 2\ncd ../app-search && codex \"검색 기능 구현\"\n\ngit worktree list\ngit worktree remove ../app-login     # 머지 후 정리\n\n# 클라우드: 같은 환경에서 여러 작업을 동시에 (환경 ID 필요)\ncodex cloud exec --env <ENV_ID> \"검색 결과 페이지네이션 추가\"\ncodex cloud exec --env <ENV_ID> --attempts 3 \"느린 쿼리 최적화\"   # 여러 시도 비교" },
        tip: "<b>💡 데스크톱 앱·최신 CLI</b> Codex 앱은 작업별 worktree 를 자동으로 만들고 정리해 주며, 최근 CLI 문서에는 <code>--worktree</code> 옵션도 보입니다. 버전에 따라 다르니 <code>codex --help</code> 로 확인하세요.",
      },
    ],
    viz: [
      {
        type: "hub", title: "메인 에이전트와 서브에이전트",
        desc: "메인이 일을 나누고, 각 서브에이전트는 자기 맥락에서 일한 뒤 결과만 돌려줍니다.",
        center: "메인\n에이전트",
        nodes: [
          { i: "🔎", t: "explorer", d: "코드 탐색", via: "읽기", x: "관련 코드 경로를 추적하고 근거(파일·심볼)를 모읍니다." },
          { i: "🛡️", t: "security", d: "보안 리뷰", via: "읽기", x: "커스텀 에이전트. 보안 위험만 심각도별로 보고." },
          { i: "🧪", t: "test-gap", d: "테스트 누락", via: "읽기", x: "변경에 비해 빠진 테스트 케이스를 찾습니다." },
          { i: "🛠️", t: "worker", d: "구현·수정", via: "쓰기", x: "메인이 확정한 수정 사항을 구현합니다 (부모 샌드박스 그대로)." },
        ],
      },
      {
        type: "tree", title: "worktree 로 나눈 병렬 작업 폴더",
        items: [
          { n: "~/work/", dir: true },
          { n: "├── app/", dir: true, a: "main — 원래 저장소" },
          { n: "├── app-login/", dir: true, hl: true, a: "feature/login — Codex 세션 A" },
          { n: "└── app-search/", dir: true, hl: true, a: "feature/search — Codex 세션 B" },
        ],
      },
    ],
    practice: [
      {
        type: "terminal", title: "worktree 로 병렬 작업 준비 + 서브에이전트 리뷰",
        tasks: [
          { goal: "로그인 기능용 worktree 만들기", hint: "git worktree add ../app-login -b feature/login", match: /^git worktree add \S+ -b \S+$/, out: (c) => `Preparing worktree (new branch '${c.split(" ").pop()}')\nHEAD is now at a1b2c3d 첫 커밋` },
          { goal: "검색 기능용 worktree 만들기", hint: "git worktree add ../app-search -b feature/search", match: /^git worktree add \S+ -b \S+$/, out: (c) => `Preparing worktree (new branch '${c.split(" ").pop()}')\nHEAD is now at a1b2c3d 첫 커밋` },
          { goal: "worktree 목록 확인", hint: "git worktree list", match: /^git worktree list$/, out: "/home/me/work/app         a1b2c3d [main]\n/home/me/work/app-login   a1b2c3d [feature/login]\n/home/me/work/app-search  a1b2c3d [feature/search]" },
          { goal: "(한 폴더에서) Codex 실행", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "서브에이전트로 관점별 병렬 리뷰 요청", hint: "서브에이전트를 보안, 테스트 누락, 유지보수 관점으로 하나씩 띄워서 리뷰하고 셋 다 끝나면 요약해줘", match: /서브에이전트|subagent|에이전트/i, mode: "agent", out: "{tool:• Spawned} security_reviewer · explorer(test-gap) · explorer(maintainability)\n{dim:  └ 3개 에이전트 병렬 실행 중…}\n{ok:•} 요약\n  {err:high}  src/api/user.js:42 SQL 문자열 결합 (security)\n  {warn:medium} 검색 빈 결과 테스트 없음 (test-gap)\n  {dim:low}   SearchBox 컴포넌트 180줄 — 분리 권장 (maintainability)" },
          { goal: "서브에이전트 스레드 확인", hint: "/subagents", match: /^\/subagents$/, mode: "agent", out: "에이전트 스레드:\n  {ok:› main}\n    security_reviewer — 완료\n    explorer #1 — 완료\n    explorer #2 — 완료" },
        ],
      },
      {
        type: "editor", label: "🧩 TOML 작성", title: "테스트 누락 탐지 에이전트 정의",
        intro: ".codex/agents/test-gap.toml 에 '변경에 비해 빠진 테스트를 찾는 읽기 전용 에이전트'를 정의하세요.",
        file: ".codex/agents/test-gap.toml",
        starter: "name = \"\"\ndescription = \"\"\n",
        checks: [
          { label: "name 이 채워져 있다", re: /^name\s*=\s*"[\w-]+"/m },
          { label: "description 이 15자 이상", fn: (v) => { const m = v.match(/^description\s*=\s*"([^"]*)"/m); return !!m && m[1].length >= 15; } },
          { label: "developer_instructions 가 여러 줄 문자열(\"\"\")로 있다", re: /^developer_instructions\s*=\s*"""[\s\S]+?"""/m },
          { label: "파일을 수정하지 말라는 지시", re: /(수정하지|편집하지|변경하지|읽기\s*전용|do not edit)/i },
          { label: "근거(파일 경로·줄 번호)를 요구", re: /(경로|줄\s*번호|파일명|인용|근거)/ },
          { label: "에이전트 파일에서 sandbox_mode 를 쓰지 않았다 (부모 설정 상속)", fn: (v) => !/^sandbox_mode\s*=/m.test(v) },
        ],
        solution: "name = \"test_gap\"\ndescription = \"변경된 코드에 비해 빠진 테스트 케이스를 찾는 읽기 전용 에이전트.\"\nmodel_reasoning_effort = \"medium\"\ndeveloper_instructions = \"\"\"\n파일을 수정하지 않는다.\n변경된 함수마다 정상·경계·실패 케이스 테스트가 있는지 확인한다.\n빠진 케이스는 파일 경로와 줄 번호를 근거로 목록화해 보고한다.\n\"\"\"\n",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "git worktree add ../exp-a -b exp/a\ncd ../exp-a && codex\n› explorer 서브에이전트 두 개로 프론트엔드와 백엔드의 인증 흐름을 각각 추적하고, 끝나면 비교 표로 정리해 줘\n› /subagents" },
    },
    mistakes: [
      ["같은 폴더에서 Codex 두 개가 동시에 같은 파일 수정", "worktree 로 폴더를 나누거나 서브에이전트는 읽기 작업 위주로"],
      ["작은 작업에도 서브에이전트 여러 개", "토큰이 배로 듭니다 — 넓은 탐색·관점별 리뷰처럼 나눌 가치가 있을 때만"],
    ],
    checklist: ["서브에이전트가 유리한 상황을 설명할 수 있다", "커스텀 에이전트 TOML 의 필수 필드를 안다", "git worktree 로 병렬 작업 폴더를 만들었다", "codex cloud exec 의 쓰임을 안다"],
  },

  /* ----------------------------------------------------- Day 21 */
  {
    id: 21, week: 4, icon: "🧩", time: "50분", level: 3,
    title: "시스템 통합",
    subtitle: "지금까지 배운 조각(AGENTS.md·config·MCP·스킬·훅·exec·Action·SDK)을 하나의 개발 시스템으로 엮습니다.",
    goals: ["각 메커니즘의 역할과 경계를 구분한다", "상황에 맞는 메커니즘을 고른다", "팀 저장소에 Codex 설정을 일관되게 배치한다"],
    analogy: { i: "🏢", t: "회사로 치면 <b>AGENTS.md 는 사내 규정집</b>, <b>config 는 출입·권한 카드</b>, <b>MCP 는 외부 협력사 전화번호부</b>, <b>스킬은 업무 매뉴얼</b>, <b>훅은 보안 게이트</b>, <b>exec·Action·SDK 는 업무를 자동으로 넣어 주는 접수 창구</b>입니다. 각자 맡은 일이 달라야 조직이 굴러갑니다." },
    sections: [
      {
        h: "무엇을 어디에? — 결정표",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>하고 싶은 것</th><th>도구</th><th>위치</th></tr>
        <tr><td>모든 작업에 적용할 팀 규칙</td><td>AGENTS.md</td><td>저장소 루트·폴더별</td></tr>
        <tr><td>권한·모델·기본 동작</td><td>config.toml / 프로필</td><td><code>~/.codex/</code>, <code>.codex/config.toml</code></td></tr>
        <tr><td>명령 단위 허용·금지</td><td>rules</td><td><code>~/.codex/rules/</code>, <code>.codex/rules/</code></td></tr>
        <tr><td>외부 시스템 데이터·도구</td><td>MCP</td><td><code>[mcp_servers.*]</code></td></tr>
        <tr><td>가끔 쓰는 전문 절차</td><td>스킬</td><td><code>.agents/skills/</code></td></tr>
        <tr><td>매번 반드시 실행</td><td>훅</td><td><code>.codex/hooks.json</code></td></tr>
        <tr><td>관점별 병렬 검토</td><td>서브에이전트</td><td><code>.codex/agents/</code></td></tr>
        <tr><td>사람 없이 실행</td><td>codex exec / Action / SDK</td><td>스크립트·CI·내 서비스</td></tr></table></div>`,
      },
      {
        h: "팀 저장소 표준 배치 예",
        code: { lang: "bash", file: "저장소 구조", text: "repo/\n├── AGENTS.md                    # 명령·구조·규칙·Review guidelines\n├── .codex/\n│   ├── config.toml              # 팀 공통 기본값 (신뢰 시 적용)\n│   ├── rules/team.rules         # git push=prompt, rm -rf=forbidden\n│   ├── hooks.json               # 포맷터·위험 명령 차단\n│   └── agents/security-reviewer.toml\n├── .agents/skills/\n│   ├── release-notes/SKILL.md\n│   └── pr-description/SKILL.md\n└── .github/\n    ├── codex/prompts/review.md\n    └── workflows/codex-review.yml" },
        tip: "<b>🔐 신뢰 경계</b> <code>.codex/</code> 의 설정·rules·훅은 사용자가 프로젝트를 <b>신뢰</b>해야 적용됩니다. 저장소를 처음 받은 팀원은 내용을 확인한 뒤 신뢰하도록 안내하세요. 개인 비밀값(인증·API 키)은 저장소가 아닌 각자의 <code>~/.codex</code> 와 환경 변수에.",
        tipType: "warn",
      },
      {
        h: "통합 시나리오: 이슈 → PR",
        body: `<ol><li>개발자가 <code>codex</code> 실행 → AGENTS.md·config·rules 자동 적용</li>
        <li>MCP(이슈 트래커)로 이슈 내용 읽기 → <code>/plan</code></li>
        <li>구현 중 PostToolUse 훅이 포맷터 실행, PreToolUse 훅이 위험 명령 차단</li>
        <li>서브에이전트로 보안·테스트 관점 셀프 리뷰 → <code>$pr-description</code> 스킬로 PR 설명</li>
        <li>CI 의 codex-action 이 읽기 전용 리뷰 → 사람이 머지 → notify 로 완료 알림</li></ol>`,
      },
    ],
    viz: {
      type: "layers", title: "통합 개발 시스템 전체 그림",
      layers: [
        { i: "🙋", n: "입구", chips: ["TUI", "IDE 확장", "@codex (GitHub)", "Slack"], d: "사람이 일을 맡기는 곳" },
        { i: "🤖", n: "자동 입구", chips: ["codex exec", "codex-action", "Codex SDK", "codex cloud"], d: "시스템이 일을 맡기는 곳" },
        { i: "📏", n: "지식", chips: ["AGENTS.md", "스킬", "MCP"], d: "무엇을 알고 어떻게 하는가" },
        { i: "🛡️", n: "통제", chips: ["샌드박스", "승인 정책", "rules", "훅"], d: "무엇을 해도 되는가" },
        { i: "📈", n: "관측", chips: ["/status", "--json usage", "[otel]", "notify"], d: "무슨 일이 있었는가 (Day 22)" },
      ],
    },
    practice: [
      {
        type: "quiz", title: "어떤 메커니즘을 쓸까?",
        questions: [
          { q: "\"이 저장소는 pnpm 을 쓴다\" 를 Codex 가 항상 알게 하려면?", options: ["AGENTS.md", "훅", "MCP", "notify"], answer: 0 },
          { q: "Jira 티켓 내용을 Codex 가 직접 읽게 하려면?", options: ["스킬", "MCP 서버", "rules", "프로필"], answer: 1 },
          { q: "<code>terraform apply</code> 는 어떤 경우에도 실행 금지", options: ["AGENTS.md 에 부탁", "rules 의 forbidden (필요시 PreToolUse 훅 병행)", "스킬", "/compact"], answer: 1, explain: "부탁이 아니라 강제가 필요한 일은 rules·훅으로." },
          { q: "분기마다 한 번 하는 '의존성 감사' 절차", options: ["스킬", "PostToolUse 훅", "config.toml", "AGENTS.md 에 전부 기록"], answer: 0, explain: "가끔 쓰는 전문 절차는 스킬 — AGENTS.md 를 가볍게 유지할 수 있습니다." },
          { q: "사내 백오피스 웹앱에서 버튼을 누르면 Codex 가 리포트를 생성", options: ["Codex SDK", "TUI", "AGENTS.md", "/review"], answer: 0 },
        ],
      },
      {
        type: "order", title: "통합 시나리오 순서 맞추기",
        items: ["codex 실행 — AGENTS.md·config·rules 적용", "MCP 로 이슈 내용 읽기", "/plan 으로 계획 확정", "구현 (훅이 포맷·차단 담당)", "서브에이전트로 셀프 리뷰", "스킬로 PR 설명 작성 후 PR 생성", "CI 의 codex-action 리뷰 → 사람이 머지"],
      },
    ],
    real: {
      code: { lang: "bash", file: "Codex", text: "› 이 저장소에 지금 있는 Codex 관련 설정(AGENTS.md, .codex/, .agents/skills)을 점검하고\n  위 '표준 배치'와 비교해서 빠진 것과 개선점을 표로 정리해 줘. 아직 파일은 만들지 마" },
    },
    mistakes: [
      ["모든 지식을 AGENTS.md 하나에 몰아넣기", "항상 필요한 것만 AGENTS.md, 가끔 쓰는 절차는 스킬로"],
      ["강제가 필요한 규칙을 프롬프트로만 부탁", "rules / 훅 / 샌드박스처럼 결정적으로 동작하는 장치로"],
    ],
    checklist: ["8가지 메커니즘의 역할을 구분할 수 있다", "팀 저장소 표준 배치를 그려 보았다", "신뢰 경계(.codex 는 신뢰 시 적용)를 안다"],
  },

  /* ----------------------------------------------------- Day 22 */
  {
    id: 22, week: 4, icon: "📈", time: "50분", level: 3,
    title: "프로덕션 모니터링",
    subtitle: "토큰 사용량, 세션 기록, OpenTelemetry 로 Codex 가 무엇을 얼마나 했는지 관찰합니다.",
    goals: ["/status 와 --json 의 usage 로 사용량을 본다", "[otel] 로 텔레메트리를 내보내는 법을 안다", "기록에 민감 정보가 남지 않게 설정한다"],
    analogy: { i: "🚘", t: "자동차 <b>계기판</b>과 <b>블랙박스</b>입니다. 계기판(/status, usage)으로 연료(토큰)와 속도를 보고, 블랙박스(세션 기록·텔레메트리)로 사고가 났을 때 무슨 일이 있었는지 되짚습니다. 단, 블랙박스에 승객 대화(프롬프트)까지 녹음할지는 신중히 정해야 합니다." },
    sections: [
      {
        h: "사용량 보기",
        body: `<ul><li><b>대화 중</b>: <code>/status</code> — 모델, 권한, 토큰 사용량, 남은 컨텍스트</li>
        <li><b>자동화</b>: <code>codex exec --json</code> 의 <code>turn.completed</code> 이벤트에 <code>usage</code>(입력·출력 토큰) 포함</li>
        <li><b>계정 단위</b>: ChatGPT 플랜의 사용 한도·API 사용량은 각 대시보드에서 확인</li></ul>`,
        code: { lang: "bash", file: "CI 에서 토큰 사용량 기록", text: "codex exec --json \"린트 에러 원인 요약\" \\\n  | tee events.jsonl \\\n  | jq -c 'select(.type==\"turn.completed\") | .usage' >> usage.log" },
      },
      {
        h: "세션 기록과 로그",
        body: `<ul><li>대화 기록은 Codex 홈(<code>~/.codex</code>) 아래에 저장됩니다 — <code>codex resume</code> 이 이것을 씁니다.</li>
        <li><code>[history] persistence = \"none\"</code> 으로 기록 저장을 끄거나, <code>max_bytes</code> 로 크기를 제한할 수 있습니다.</li>
        <li>CI 처럼 기록이 필요 없는 실행은 <code>codex exec --ephemeral</code>.</li></ul>`,
        tip: "<b>🔐 기록 = 민감 데이터</b> 세션 기록에는 프롬프트와 파일 내용이 들어갈 수 있습니다. <code>~/.codex</code> 를 공유 폴더나 저장소에 두지 마세요.",
        tipType: "warn",
      },
      {
        h: "OpenTelemetry 로 내보내기",
        body: "<p><code>[otel]</code> 은 기본으로 꺼져 있습니다. 켜면 Codex 이벤트를 OTLP(HTTP/gRPC)로 모니터링 시스템(Grafana, Datadog 등의 수집기)에 보냅니다. 관리자는 <code>requirements.toml</code> 로 이 설정을 강제할 수 있습니다.</p>",
        code: { lang: "toml", file: "~/.codex/config.toml", text: "[otel]\nenvironment = \"prod\"        # 기본 \"dev\"\nexporter = \"otlp-http\"      # none(기본: 기록만, 전송 안 함) / otlp-http / otlp-grpc\nlog_user_prompt = false     # 프롬프트 원문은 기본 비공개 — 그대로 두기" },
        after: "<p>수집기 주소·헤더 같은 세부 키는 버전에 따라 다르므로 공식 Configuration Reference 의 <code>[otel]</code> 항목을 확인하세요.</p>",
      },
    ],
    viz: {
      type: "flow", title: "모니터링 파이프라인",
      steps: [
        { i: "◎", t: "Codex 실행", d: "TUI · exec · Action", x: "모든 실행이 관측 대상입니다." },
        { i: "🧾", t: "이벤트", d: "--json / otel", x: "턴·명령·도구 호출·usage 가 이벤트로 남습니다." },
        { i: "📡", t: "수집", d: "OTLP 수집기", x: "<code>exporter = \"otlp-http\"</code> 로 수집기에 전송." },
        { i: "📊", t: "대시보드", d: "토큰·실패율", x: "팀별 토큰 사용량, turn.failed 비율, 긴 작업을 시각화." },
        { i: "🚨", t: "알림", d: "임계치 초과", x: "사용량 급증·실패 급증 시 슬랙 알림 → 원인 분석." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 TOML 작성", title: "운영용 관측 설정",
        intro: "운영 환경용 설정을 작성하세요: [otel] environment=prod, otlp-http 전송, 프롬프트 원문 비기록, [history] 크기 제한(max_bytes).",
        file: "~/.codex/ops.config.toml",
        starter: "[otel]\n",
        checks: [
          { label: "[otel] 표가 있다", re: /^\[otel\]/m },
          { label: "environment = \"prod\"", re: /\[otel\][^\[]*environment\s*=\s*"prod"/ },
          { label: "exporter 는 otlp-http 또는 otlp-grpc", re: /\[otel\][^\[]*exporter\s*=\s*"otlp-(http|grpc)"/ },
          { label: "log_user_prompt = false", re: /\[otel\][^\[]*log_user_prompt\s*=\s*false/ },
          { label: "[history] 에 max_bytes 숫자", re: /^\[history\][^\[]*max_bytes\s*=\s*\d+/m },
        ],
        solution: "[otel]\nenvironment = \"prod\"\nexporter = \"otlp-http\"\nlog_user_prompt = false\n\n[history]\nmax_bytes = 104857600\n",
        tip: "<b>참고</b> 이 파일 이름이면 <code>codex --profile ops</code> 로 운영용 설정을 덧씌울 수 있습니다 (Day 13).",
      },
      {
        type: "terminal", title: "사용량 추적하기",
        startMode: "shell",
        tasks: [
          { goal: "JSON 이벤트로 실행하고 파일에 저장", hint: "codex exec --json \"README 요약해줘\" > events.jsonl", match: /^codex exec --json .+ > \S+\.jsonl$/, out: "{dim:(이벤트를 events.jsonl 에 저장했습니다)}" },
          { goal: "turn.completed 의 usage 만 뽑기", hint: "jq -c 'select(.type==\"turn.completed\") | .usage' events.jsonl", match: /^jq .*turn\.completed.*usage.* events\.jsonl$/, out: "{\"input_tokens\":9120,\"cached_input_tokens\":4096,\"output_tokens\":312}" },
          { goal: "Codex 실행", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "대화형 세션의 사용량 확인", hint: "/status", match: /^\/status$/, mode: "agent", out: "  Token usage:  21.7K total (19.3K input + 2.4K output)\n  Context:      74% left" },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "codex exec --json \"이 저장소의 테스트 명령 찾아줘\" | jq -c 'select(.type==\"turn.completed\")'\ncodex\n› /status" },
    },
    mistakes: [
      ["텔레메트리에 프롬프트 원문까지 전송", "<code>log_user_prompt = false</code> 유지, 필요한 지표만"],
      ["비용을 월말에야 확인", "CI 에서 usage 를 매번 기록하고 임계치 알림"],
    ],
    checklist: ["/status 로 토큰 사용량을 봤다", "--json 의 turn.completed usage 를 추출했다", "[otel] exporter 값을 안다", "기록·텔레메트리의 개인정보 위험을 안다"],
  },

  /* ----------------------------------------------------- Day 23 */
  {
    id: 23, week: 4, icon: "🔒", time: "60분", level: 3,
    title: "시스템 배포 — 격리·최소 권한·비밀 관리",
    subtitle: "Codex 를 CI·서버에서 돌릴 때 사고가 나도 피해가 작도록 격리하고, 권한을 줄이고, 비밀값을 지킵니다.",
    goals: ["격리 환경과 샌드박스의 관계를 이해한다", "CI 에서 키·권한을 분리하는 패턴을 적용한다", "비밀값이 Codex 에 새지 않게 설정한다"],
    analogy: { i: "🧪", t: "위험한 실험은 <b>실험실 안의 흄 후드</b>에서 합니다. 실험실(컨테이너) 자체가 격리되어 있고, 후드(샌드박스)가 한 번 더 막고, 시약장 열쇠(비밀값)는 꼭 필요한 사람에게만 필요한 순간에 줍니다. <b>세 겹의 방어</b>가 핵심입니다." },
    sections: [
      {
        h: "방어 1: 격리",
        body: `<ul><li>CI 러너·컨테이너·VM 처럼 <b>일회용·격리된</b> 환경에서 실행</li>
        <li><code>danger-full-access</code> / <code>--yolo</code> 는 <b>이미 격리된 곳</b>에서만, 그래도 가능하면 피하기</li>
        <li>codex-action 의 <code>safety-strategy</code> 기본값 <code>drop-sudo</code> 는 Codex 실행 전에 sudo 권한을 제거 — 유지하세요</li></ul>`,
      },
      {
        h: "방어 2: 최소 권한",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>작업</th><th>권장 설정</th></tr>
        <tr><td>리뷰·분석</td><td><code>--sandbox read-only</code> + <code>-a never</code></td></tr>
        <tr><td>코드 수정(패치 생성)</td><td><code>--sandbox workspace-write</code>, 네트워크 끔</td></tr>
        <tr><td>PR 생성·댓글</td><td>Codex 없이 별도 잡에서 <code>gh</code> — API 키 없음</td></tr>
        <tr><td>운영 명령(배포 등)</td><td>rules 로 <code>forbidden</code>, 배포는 사람이 승인한 파이프라인만</td></tr></table></div>
        <p>관리자는 <code>requirements.toml</code> 로 허용되는 설정(샌드박스·승인·rules·텔레메트리 등)을 조직 차원에서 강제할 수 있습니다.</p>`,
      },
      {
        h: "방어 3: 비밀 관리",
        code: [
          { lang: "yaml", file: "❌ 피해야 할 패턴 — 잡 전체에 키 노출", text: "jobs:\n  fix:\n    env:\n      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}   # 빌드 스크립트·의존성도 읽을 수 있음\n    steps:\n      - run: npm ci && codex exec --sandbox workspace-write \"...\"" },
          { lang: "yaml", file: "✅ 키는 codex-action 입력으로만, 쓰기 권한 잡과 분리", text: "jobs:\n  generate_fix:\n    permissions:\n      contents: read\n    steps:\n      - uses: actions/checkout@v5\n        with:\n          persist-credentials: false\n      - uses: openai/codex-action@v1\n        with:\n          openai-api-key: ${{ secrets.OPENAI_API_KEY }}\n          sandbox: workspace-write\n          prompt: \"실패한 테스트를 고쳐 줘. 테스트 파일은 수정 금지\"\n      - run: git diff > codex.patch\n      - uses: actions/upload-artifact@v4\n        with:\n          name: codex-patch\n          path: codex.patch\n\n  open_pr:\n    needs: generate_fix\n    permissions:\n      contents: write\n      pull-requests: write\n    steps:\n      - run: echo \"패치를 내려받아 적용 → 브랜치 push → gh pr create (API 키 없음)\"" },
          { lang: "toml", file: "config.toml — 명령 환경에서 비밀 변수 제외", text: "[shell_environment_policy]\ninherit = \"core\"\nignore_default_excludes = false     # 이름에 KEY/SECRET/TOKEN 포함 변수 제외\n\n[shell_environment_policy.filters]\n\"AWS_*\" = \"exclude\"" },
        ],
        tip: "<b>📌 문서 경고</b> 저장소 코드를 실행하는 워크플로우에서 <code>OPENAI_API_KEY</code>·<code>CODEX_API_KEY</code> 를 <b>잡 단위 환경 변수</b>로 두지 말라고 안내합니다. 같은 잡의 빌드 스크립트·의존성 훅이 읽을 수 있기 때문입니다.",
        tipType: "bad",
      },
    ],
    viz: {
      type: "flow", title: "안전한 자동 수정 파이프라인",
      steps: [
        { i: "📦", t: "격리 러너", d: "일회용 VM", x: "CI 러너는 실행이 끝나면 사라집니다." },
        { i: "🔑", t: "키는 한 단계에만", d: "codex-action 입력", x: "API 키는 Codex 단계 입력으로만 전달, 잡 env 금지." },
        { i: "🧱", t: "샌드박스", d: "workspace-write, sudo 제거", x: "작업 폴더만 수정 가능, 네트워크 끔, drop-sudo." },
        { i: "🩹", t: "패치 산출", d: "codex.patch", x: "결과는 패치 파일(아티팩트)로만 밖에 나갑니다." },
        { i: "🔀", t: "PR 잡", d: "키 없음, 쓰기 권한", x: "별도 잡이 패치를 적용해 PR 생성." },
        { i: "👀", t: "사람 승인", d: "리뷰 후 머지", x: "배포는 사람이 승인한 뒤에만." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 TOML 작성", title: "CI 전용 하드닝 프로필",
        intro: "CI 에서 쓸 ~/.codex/ci.config.toml 을 작성하세요: read-only, 승인 never, 기록 저장 안 함, 비밀 변수 제외(+ AWS_* 제외 필터).",
        file: "~/.codex/ci.config.toml",
        starter: "",
        checks: [
          { label: "sandbox_mode = \"read-only\"", re: /^sandbox_mode\s*=\s*"read-only"/m },
          { label: "approval_policy = \"never\"", re: /^approval_policy\s*=\s*"never"/m },
          { label: "[history] persistence = \"none\"", re: /^\[history\][^\[]*persistence\s*=\s*"none"/m },
          { label: "[shell_environment_policy] ignore_default_excludes = false", re: /^\[shell_environment_policy\][^\[]*ignore_default_excludes\s*=\s*false/m },
          { label: "filters 에 \"AWS_*\" = \"exclude\"", re: /^\[shell_environment_policy\.filters\][^\[]*"AWS_\*"\s*=\s*"exclude"/m },
          { label: "danger-full-access 를 쓰지 않았다", fn: (v) => !/danger-full-access/.test(v) },
        ],
        solution: "sandbox_mode = \"read-only\"\napproval_policy = \"never\"\n\n[history]\npersistence = \"none\"\n\n[shell_environment_policy]\ninherit = \"core\"\nignore_default_excludes = false\n\n[shell_environment_policy.filters]\n\"AWS_*\" = \"exclude\"\n",
      },
      {
        type: "order", title: "운영 배포 체크리스트 순서",
        items: ["격리된 일회용 러너 준비", "API 키를 저장소 시크릿에 등록", "Codex 단계에만 키 전달 (잡 env 금지)", "최소 샌드박스로 실행 (read-only 또는 workspace-write)", "결과를 패치·메시지로만 내보내기", "키 없는 별도 잡이 PR·댓글 작성", "사람이 리뷰 후 머지·배포"],
        explain: "키·쓰기 권한·실행을 서로 다른 단계로 떼어 놓는 것이 핵심입니다.",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "# CI 프로필로 로컬에서 미리 시험\ncodex exec --profile ci \"이 저장소의 보안 위험 상위 3개\"\n# 쓰기 시도가 거부되는지 확인\ncodex exec --profile ci \"README 에 한 줄 추가해 줘\"" },
    },
    mistakes: [
      ["CI 잡 전체 env 에 API 키", "codex-action 입력 또는 해당 단계에만, 다른 단계는 키 없이"],
      ["편하다고 CI 에서 <code>--yolo</code>", "read-only + never 기본, 수정은 workspace-write + 패치 분리"],
    ],
    checklist: ["격리·최소 권한·비밀 관리 세 겹 방어를 설명할 수 있다", "키를 가진 잡과 쓰기 권한 잡을 분리했다", "shell_environment_policy 로 비밀 변수를 제외했다"],
  },

  /* ----------------------------------------------------- Day 24 */
  {
    id: 24, week: 4, icon: "🏛️", time: "90분", level: 3,
    title: "시스템 아키텍처 캡스톤",
    subtitle: "CI 실패를 감지해 Codex 가 수정 패치를 만들고, 리뷰를 거쳐 사람이 머지하는 '버그 자동 수정 시스템'을 설계합니다.",
    goals: ["4주간 배운 요소로 하나의 시스템을 설계한다", "각 단계의 권한·검증·관측 지점을 정한다", "운영하며 개선하는 순환을 설계한다"],
    analogy: { i: "🏭", t: "지금까지 공구(Codex 기능)를 하나씩 익혔다면, 오늘은 <b>작은 공장</b>을 설계합니다. 불량품 감지(CI 실패) → 수리 라인(Codex 패치) → 품질 검사(테스트·리뷰) → 출하 승인(사람) → 생산 일지(모니터링). 각 라인에 <b>누가, 어떤 권한으로</b> 일하는지가 설계의 전부입니다." },
    sections: [
      {
        h: "요구사항",
        body: `<ul><li>main 의 CI 가 실패하면 Codex 가 원인을 분석하고 <b>수정 PR</b> 을 연다</li>
        <li>PR 에는 원인·변경·테스트 결과가 설명으로 붙는다</li>
        <li>자동 리뷰를 거치고, <b>머지는 반드시 사람</b>이 한다</li>
        <li>키·쓰기 권한은 분리, 사용량과 성공률을 기록한다</li></ul>`,
      },
      {
        h: "구성 요소 매핑",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>단계</th><th>사용 기능</th><th>권한</th></tr>
        <tr><td>트리거</td><td>GitHub Actions <code>workflow_run</code>(CI 실패 시)</td><td>—</td></tr>
        <tr><td>원인 분석·수정</td><td><code>openai/codex-action@v1</code> + <code>prompt-file</code> + AGENTS.md</td><td>contents: read, workspace-write, drop-sudo</td></tr>
        <tr><td>검증</td><td>같은 잡에서 테스트 실행, 실패 시 중단</td><td>—</td></tr>
        <tr><td>PR 생성</td><td>패치 아티팩트 → 별도 잡 <code>gh pr create</code> (+ <code>$pr-description</code> 형식)</td><td>contents/pull-requests: write, 키 없음</td></tr>
        <tr><td>리뷰</td><td><code>@codex review</code> 자동 리뷰 + 사람 리뷰</td><td>—</td></tr>
        <tr><td>관측</td><td><code>final-message</code>, usage 기록, 슬랙 알림</td><td>—</td></tr></table></div>`,
      },
      {
        h: "수정 지시 프롬프트 파일",
        code: { lang: "md", file: ".github/codex/prompts/autofix.md", text: "# 목표\nmain 브랜치 CI 가 실패했다. 원인을 찾아 최소한으로 수정하라.\n\n# 규칙\n- 테스트 파일은 수정하지 않는다 (테스트가 틀렸다고 판단되면 수정하지 말고 보고)\n- 의존성 추가·버전 변경 금지\n- 수정 후 npm test 를 실행해 통과를 확인한다\n\n# 보고 형식\n## 원인\n## 변경 내용 (파일별)\n## 테스트 결과\n## 확신도 (높음/중간/낮음)와 사람이 확인할 점" },
        tip: "<b>💡 실패도 결과다</b> Codex 가 못 고친 경우에도 '원인 분석 보고'만 이슈에 남기면 사람의 디버깅 시간을 크게 줄여 줍니다.",
      },
    ],
    viz: [
      {
        type: "sequence", title: "버그 자동 수정 시스템 — 전체 흐름",
        actors: [{ t: "CI", i: "⚙️" }, { t: "Fix 잡", i: "◎", center: true }, { t: "PR 잡", i: "🔀" }, { t: "GitHub", i: "🐙" }, { t: "사람", i: "🙋" }],
        msgs: [
          { from: "CI", to: "Fix 잡", t: "workflow_run: 실패", x: "main CI 실패가 트리거입니다." },
          { from: "Fix 잡", to: "Fix 잡", t: "codex-action + autofix.md", x: "읽기 권한·workspace-write 샌드박스에서 원인 분석·수정·테스트." },
          { from: "Fix 잡", to: "PR 잡", t: "codex.patch + final-message", x: "결과는 패치와 메시지로만 전달 (키는 넘기지 않음)." },
          { from: "PR 잡", to: "GitHub", t: "브랜치 push · gh pr create", x: "쓰기 권한은 이 잡에만, API 키 없음." },
          { from: "GitHub", to: "GitHub", t: "@codex review (자동)", x: "AGENTS.md 의 Review guidelines 로 리뷰." },
          { from: "GitHub", to: "사람", t: "슬랙 알림 · 리뷰 요청", x: "사람이 원인·변경·테스트 결과를 확인." },
          { from: "사람", to: "GitHub", t: "승인 후 머지", x: "최종 결정은 사람. 머지 여부는 성공률 지표로 기록." },
        ],
      },
      {
        type: "loop", title: "운영되는 시스템의 개선 순환",
        center: "자동 수정\n시스템",
        steps: [
          { i: "📈", t: "관측", d: "usage · 성공률", x: "토큰 사용량, PR 머지율, 실패 유형을 기록합니다." },
          { i: "🔍", t: "분석", d: "실패 패턴", x: "Codex 가 자주 못 고치는 유형(환경 문제 등)을 찾습니다." },
          { i: "📝", t: "개선", d: "AGENTS.md · 스킬 · 프롬프트", x: "지침·프롬프트·스킬을 고치고, 위험한 패턴은 rules·훅으로." },
          { i: "🧪", t: "검증", d: "과거 실패로 재현", x: "예전 실패 사례에 다시 돌려 개선을 확인합니다." },
        ],
      },
    ],
    practice: [
      {
        type: "order", title: "캡스톤 구축 순서",
        items: ["AGENTS.md 에 테스트 명령·규칙·Review guidelines 정리", "autofix.md 프롬프트 파일 작성", "OPENAI_API_KEY 시크릿 등록", "Fix 잡: codex-action (read 권한, workspace-write) 구성", "PR 잡: 패치 적용·PR 생성 (키 없음) 구성", "Codex Code review 자동 리뷰 켜기", "알림·사용량 기록 연결 후 일부러 CI 를 깨서 시험"],
        explain: "규칙 → 프롬프트 → 비밀 → 실행 → 쓰기 → 리뷰 → 관측 순으로 쌓으면 각 단계를 따로 검증할 수 있습니다.",
      },
      {
        type: "editor", label: "✍️ 설계 문서", title: "자동 수정 시스템 설계서",
        intro: "캡스톤 시스템의 설계서(docs/autofix-design.md)를 작성하세요. 트리거·권한 분리·검증·사람 승인·관측을 모두 담아야 합니다.",
        file: "docs/autofix-design.md",
        starter: "# 버그 자동 수정 시스템 설계\n\n",
        checks: [
          { label: "트리거(workflow_run / CI 실패)를 명시", re: /(workflow_run|CI\s*실패)/ },
          { label: "openai/codex-action 사용", re: /openai\/codex-action/ },
          { label: "샌드박스 모드(read-only / workspace-write) 명시", re: /(read-only|workspace-write)/ },
          { label: "API 키를 가진 단계와 쓰기 권한 단계를 분리", re: /(분리|별도\s*잡|키\s*없)/ },
          { label: "테스트로 검증하는 단계가 있다", re: /(npm test|테스트.*(실행|통과))/ },
          { label: "사람이 머지·승인한다", re: /사람.*(머지|승인)|(머지|승인).*사람/ },
          { label: "관측(사용량/usage/알림/성공률) 항목이 있다", re: /(usage|사용량|알림|성공률|모니터링)/ },
        ],
        solution: "# 버그 자동 수정 시스템 설계\n\n## 트리거\n- main 의 CI 실패 시 workflow_run 이벤트로 시작\n\n## Fix 잡\n- openai/codex-action@v1, prompt-file: .github/codex/prompts/autofix.md\n- permissions: contents: read / sandbox: workspace-write / safety-strategy: drop-sudo\n- 수정 후 npm test 실행, 통과하지 못하면 원인 보고만 남김\n\n## PR 잡\n- Fix 잡과 분리된 별도 잡, API 키 없음\n- codex.patch 를 적용해 브랜치 push 후 gh pr create\n\n## 리뷰와 승인\n- @codex review 자동 리뷰 + 사람 리뷰\n- 머지는 반드시 사람이 승인\n\n## 관측\n- final-message 와 usage 를 기록, 결과를 슬랙 알림\n- 월별 PR 머지 성공률로 프롬프트·AGENTS.md 개선",
      },
    ],
    real: {
      body: "<p>연습용 GitHub 저장소에서 실제로 구축해 보세요. 처음에는 PR 생성 대신 <b>이슈에 분석 보고만 남기는</b> 버전부터 시작하면 안전합니다.</p>",
      code: { lang: "bash", file: "Codex", text: "› docs/autofix-design.md 를 읽고, 이 설계대로 .github/workflows/autofix.yml 초안을 만들어 줘.\n  Fix 잡과 PR 잡을 분리하고, API 키는 codex-action 입력으로만 전달해.\n  완성되면 권한 설정을 표로 요약해 줘\n› /review" },
      after: "<div class='callout ok'><b>🎓 수료!</b> 4주 24일 과정을 마쳤습니다. 이제 Codex 를 '대화 상대'가 아니라 <b>안전하게 통제되는 개발 시스템의 부품</b>으로 설계할 수 있습니다.</div>",
    },
    mistakes: [
      ["Codex 가 만든 PR 을 자동 머지", "자동은 PR 생성까지, 머지는 사람"],
      ["처음부터 완전 자동화", "분석 보고 → 패치 제안 → PR 생성 순으로 신뢰를 쌓으며 확장"],
    ],
    checklist: ["시스템의 각 단계에 권한을 배정했다", "키·쓰기 권한 분리를 설계에 넣었다", "사람 승인 지점을 명시했다", "관측·개선 순환을 설계했다", "4주 과정 완주! 🎉"],
  },
];
