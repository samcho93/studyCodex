/* 2주차 — 코딩 워크플로우 */
window.WEEK2 = [
  /* ----------------------------------------------------- Day 7 */
  {
    id: 7, week: 2, icon: "🎯", time: "50분", level: 1,
    title: "프롬프트 패턴",
    subtitle: "Codex 에게 특정 작업을 정확하게 시키는 효과적인 프롬프트의 공식을 익힙니다.",
    goals: ["좋은 프롬프트의 5요소를 안다", "막연한 요청을 구체적인 요청으로 바꾼다", "@ 참조·이미지·조종(Enter) 같은 Codex 기능을 프롬프트에 섞어 쓴다"],
    analogy: { i: "🚕", t: "택시 기사에게 \"좋은 데로 가 주세요\"라고 하면 어디로 갈지 모릅니다. \"강남역 11번 출구, 고속도로 말고 일반 도로로, 7시까지\"라고 해야 원하는 곳에 도착하죠. <b>목적지·조건·기한</b>을 말해 주는 것이 프롬프트의 핵심입니다." },
    sections: [
      {
        h: "좋은 프롬프트의 5요소",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>요소</th><th>질문</th><th>예시</th></tr>
        <tr><td>🎯 <b>목표</b></td><td>무엇을 원하나?</td><td>회원가입 폼에 이메일 검증 추가</td></tr>
        <tr><td>📍 <b>맥락</b></td><td>어디서, 왜?</td><td><code>@src/SignupForm.tsx</code>, 잘못된 이메일로 가입되는 문제</td></tr>
        <tr><td>🚧 <b>제약</b></td><td>지켜야 할 것은?</td><td>새 라이브러리 설치 금지, 기존 스타일 유지</td></tr>
        <tr><td>📐 <b>예시</b></td><td>어떤 모양이어야?</td><td>에러 문구는 '올바른 이메일을 입력하세요'</td></tr>
        <tr><td>✅ <b>완료 기준</b></td><td>어떻게 확인?</td><td>테스트 추가 후 <code>npm test</code> 통과</td></tr></table></div>`,
      },
      {
        h: "실전 프롬프트 패턴 6가지",
        body: `<ol>
        <li><b>탐색 먼저</b>: "먼저 관련 코드를 읽고 어떻게 동작하는지 설명해 줘. 아직 고치지 마."</li>
        <li><b>선택지 요청</b>: "방법 3가지를 장단점과 함께 비교해 줘. 추천도 해 줘."</li>
        <li><b>단계 분할</b>: "1단계만 먼저 해 줘. 확인 후 다음 단계 진행하자."</li>
        <li><b>검증 포함</b>: "수정 후 테스트를 돌려서 통과하는지까지 확인해 줘."</li>
        <li><b>되묻기 허용</b>: "요구사항이 불분명하면 구현 전에 질문해 줘."</li>
        <li><b>최신 정보</b>: 라이브러리 최신 버전 사용법이 필요하면 <code>codex --search</code> 로 실시간 웹 검색을 켭니다.</li></ol>`,
        tip: "<b>🖼️ 이미지도 프롬프트</b> 화면 캡처나 디자인 시안을 입력창에 붙여넣거나 <code>codex -i 시안.png \"이대로 만들어 줘\"</code> 로 첨부하면 Codex 가 보고 작업합니다.",
      },
      {
        h: "Codex 다운 프롬프트 운영법",
        body: `<ul><li><b>조종(steer)</b>: 작업 중 방향이 어긋나면 기다리지 말고 입력 후 <kbd>Enter</kbd> — 현재 작업에 지시가 끼어듭니다.</li>
        <li><b>예약(queue)</b>: 다음에 시킬 일을 미리 입력하고 <kbd>Tab</kbd> — 지금 작업이 끝나면 이어서 처리합니다.</li>
        <li><b>되돌려 고치기</b>: 빈 입력창에서 <kbd>Esc</kbd> 두 번 → 이전 메시지를 고쳐 그 지점부터 다시.</li>
        <li><b>긴 프롬프트</b>: <kbd>Ctrl</kbd>+<kbd>G</kbd> 로 내 편집기에서 작성.</li></ul>`,
        code: { lang: "md", file: "구조화 프롬프트", text: "<goal>\n주문 목록 페이지에 날짜 필터 추가\n</goal>\n\n<context>\n- 파일: @src/pages/Orders.tsx, @src/api/orders.ts\n- API 는 이미 ?from=&to= 파라미터를 지원함\n</context>\n\n<constraints>\n- 날짜 선택은 기존 DatePicker 컴포넌트 사용\n- 새 패키지 설치 금지\n</constraints>\n\n<done>\n- 필터 적용 시 URL 쿼리에 반영\n- Orders.test.tsx 에 테스트 2개 추가, npm test 통과\n</done>" },
      },
    ],
    viz: {
      type: "compare", title: "같은 요청, 다른 결과",
      bad: { h: "막연한 요청", code: "로그인 고쳐줘", note: "무엇이 문제인지, 어느 파일인지, 어떻게 확인할지 모름 → Codex 가 추측해서 엉뚱한 곳을 수정할 수 있음" },
      good: { h: "구체적인 요청", code: "@src/auth/login.ts 에서 비밀번호가 틀려도\n로그인되는 버그가 있어.\n\n- 원인을 먼저 설명하고 수정해 줘\n- 다른 인증 로직은 건드리지 마\n- 틀린 비밀번호 테스트를 추가하고\n  npm test 로 통과 확인해 줘", note: "목표·맥락·제약·완료 기준이 모두 있음 → 한 번에 정확한 결과" },
    },
    practice: [
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "막연한 프롬프트를 고쳐 쓰기",
        intro: "아래의 '검색 기능 만들어줘'를 좋은 프롬프트로 바꿔 보세요. 상황: 블로그 앱(src/pages/PostList.jsx)에 게시글 제목 검색이 필요합니다.",
        file: "prompt.txt",
        starter: "검색 기능 만들어줘",
        checks: [
          { label: "📍 @ 로 관련 파일을 지정했다", re: /@[\w./-]+\.\w+/ },
          { label: "🎯 무엇을 검색하는지 구체적이다 (제목/본문 등)", re: /(제목|본문|태그|작성자)/ },
          { label: "🚧 제약 조건이 있다 (금지/유지/말고 등)", re: /(금지|유지|하지\s*마|말고|건드리지|없이)/ },
          { label: "✅ 완료 기준·검증 방법이 있다 (테스트/확인)", re: /(테스트|test|확인|검증)/i },
          { label: "📐 세부 동작이 있다 (대소문자/빈 결과/실시간 등)", re: /(대소문자|빈\s*결과|결과\s*없|실시간|입력할\s*때|debounce|디바운스)/ },
          { label: "충분히 구체적이다 (80자 이상)", fn: (v) => v.replace(/\s/g, "").length >= 80 },
        ],
        solution: "@src/pages/PostList.jsx 에 게시글 제목 검색 기능을 추가해 줘.\n\n- 상단에 검색창, 입력할 때마다 실시간으로 목록 필터링\n- 대소문자 구분 없이 제목에 포함되면 표시\n- 결과가 없으면 '검색 결과가 없습니다' 표시\n- 새 라이브러리 설치 금지, 기존 스타일 유지\n- PostList.test.jsx 에 검색 테스트를 추가하고 npm test 로 통과 확인",
      },
      {
        type: "quiz", title: "어떤 패턴을 쓸까?",
        questions: [
          { q: "처음 보는 레거시 코드를 수정해야 합니다. 첫 프롬프트로 가장 좋은 것은?", options: ["\"전부 리팩토링해 줘\"", "\"관련 코드를 읽고 동작을 설명해 줘. 아직 수정하지 마\"", "\"빨리 고쳐 줘\"", "\"새로 다시 짜 줘\""], answer: 1, explain: "<b>탐색 먼저</b> 패턴. 이해 없이 수정하면 사이드 이펙트가 생깁니다." },
          { q: "Codex 가 작업 중인데, 끝나면 README 도 고쳐 달라고 <b>미리 예약</b>하려면?", options: ["Esc 후 다시 입력", "입력 후 Tab", "Ctrl+C", "/new"], answer: 1, explain: "작업 중 <kbd>Tab</kbd> 은 다음 차례로 예약, <kbd>Enter</kbd> 는 지금 작업에 끼워 넣기." },
          { q: "결과 품질을 가장 크게 높이는 요소 하나를 고른다면?", options: ["존댓말 사용", "완료 기준(검증 방법) 제시", "이모지 사용", "영어로 쓰기"], answer: 1, explain: "Codex 는 스스로 검증할 수 있을 때 가장 잘 일합니다. 테스트·실행 결과 같은 <b>확인 방법</b>을 주세요." },
          { q: "어제 나온 라이브러리 새 버전의 API 를 써야 합니다. 도움이 되는 옵션은?", options: ["--search", "--yolo", "--skip-git-repo-check", "-a never"], answer: 0, explain: "<code>--search</code> 는 웹 검색을 실시간(live)으로 바꿉니다." },
        ],
      },
    ],
    real: {
      code: { lang: "md", file: "나만의 프롬프트 템플릿 (메모장에 저장해 두기)", text: "[목표] \n[관련 파일] @\n[현재 문제/배경] \n[제약] - 건드리지 말 것: \n[완료 기준] - 테스트: \n먼저 계획을 보여주고, 불분명한 점은 질문해 줘." },
      after: "<p>자주 쓰는 템플릿은 4주차에 <b>스킬</b>로 만들어 <code>$이름</code> 으로 불러 쓰게 됩니다.</p>",
    },
    mistakes: [
      ["한 번에 여러 기능을 뭉뚱그려 요청", "작업을 쪼개서 하나씩, 다음 할 일은 Tab 으로 예약"],
      ["결과가 틀리면 같은 말 반복", "무엇이 틀렸는지 구체적으로(증상·기대값·스크린샷) 알려주기"],
    ],
    checklist: ["5요소(목표·맥락·제약·예시·완료 기준)를 말할 수 있다", "탐색 먼저 패턴을 써 보았다", "작업 중 Enter / Tab 의 차이를 안다", "나만의 프롬프트 템플릿을 만들었다"],
  },

  /* ----------------------------------------------------- Day 8 */
  {
    id: 8, week: 2, icon: "🏛️", time: "50분", level: 2,
    title: "아키텍처 설계",
    subtitle: "코드 품질과 확장성을 위한 구조를 Codex 와 함께 설계하고, 결정을 문서와 AGENTS.md 로 남깁니다.",
    goals: ["계층(레이어) 구조의 개념을 이해한다", "/plan 으로 설계 대안을 비교·결정한다", "설계 결정을 ADR 과 폴더별 AGENTS.md 에 남긴다"],
    analogy: { i: "🏙️", t: "도시 계획처럼, 주거지·상업지·도로를 미리 나눠야 나중에 건물을 더 지어도 엉키지 않습니다. 코드도 <b>화면 / 비즈니스 로직 / 데이터</b>를 나눠 두면 기능을 추가해도 무너지지 않습니다." },
    sections: [
      {
        h: "왜 설계를 먼저?",
        body: "<p>Codex 는 코드를 매우 빠르게 만듭니다. 그래서 <b>방향이 틀리면 틀린 코드도 빠르게 쌓입니다.</b> 설계는 Codex 가 일관된 방향으로 달리게 하는 레일입니다.</p>",
      },
      {
        h: "설계 대화의 4단계",
        body: `<ol><li><b>요구사항 정리</b>: "이 기능의 요구사항을 정리하고 빠진 게 있으면 질문해 줘"</li>
        <li><b>대안 비교</b>: <code>/plan</code> 에서 "구조 대안 2~3개를 장단점·복잡도와 함께 표로 비교해 줘"</li>
        <li><b>결정 문서화</b>: "선택한 안을 docs/plan.md 에 단계별 구현 계획으로 써 줘"</li>
        <li><b>단계별 구현</b>: "plan.md 의 1단계만 구현해 줘"</li></ol>`,
        code: { lang: "md", file: "docs/adr/001-state-management.md (결정 기록 예시)", text: "# ADR 001: 상태 관리 방식\n\n## 상황\n장바구니·로그인 정보를 여러 화면에서 공유해야 함\n\n## 고려한 대안\n1. Context API — 추가 설치 없음, 규모가 커지면 리렌더 문제\n2. Zustand — 가볍고 단순, 팀 학습 비용 낮음\n3. Redux Toolkit — 강력하지만 보일러플레이트 많음\n\n## 결정\nZustand 채택\n\n## 결과\n- src/store/ 에 스토어 파일 배치\n- 서버 데이터는 별도로 React Query 사용" },
        tip: "<b>💡 다이어그램도 맡기기</b> \"현재 구조를 mermaid 다이어그램으로 그려 줘\" 라고 하면 README 에 바로 넣을 수 있는 그림 코드를 만들어 줍니다.",
      },
      {
        h: "설계를 AGENTS.md 에 연결 — 폴더별 규칙",
        body: "<p>결정된 구조 규칙은 AGENTS.md 에 요약해 두면 이후 모든 작업에서 지켜집니다. Codex 는 루트에서 현재 폴더까지의 AGENTS.md 를 합쳐 읽으므로, <b>계층별 세부 규칙은 해당 폴더의 AGENTS.md</b> 에 두면 깔끔합니다.</p>",
        code: [
          { lang: "md", file: "AGENTS.md (루트, 일부)", text: "## 아키텍처 규칙\n- 화면(components)은 api 를 직접 호출하지 않는다 → hooks 를 통해서만\n- 비즈니스 규칙은 src/domain 에만 둔다\n- 설계 결정은 docs/adr/ 를 먼저 읽는다" },
          { lang: "md", file: "src/domain/AGENTS.md", text: "## domain 계층 규칙\n- React, fetch 등 프레임워크·네트워크 코드를 import 하지 않는다\n- 모든 함수는 순수 함수로, 단위 테스트 필수" },
        ],
      },
    ],
    viz: [
      {
        type: "layers", title: "일반적인 웹앱 계층 구조",
        desc: "위 계층은 아래 계층만 사용합니다. 아래에서 위로 거슬러 부르지 않는 것이 핵심 규칙입니다.",
        layers: [
          { i: "🖼️", n: "화면 (UI)", chips: ["components/", "pages/"], d: "보여 주기만 담당" },
          { i: "🪝", n: "연결 (hooks)", chips: ["hooks/", "store/"], d: "화면과 로직을 이어 줌" },
          { i: "🧠", n: "도메인", chips: ["domain/", "AGENTS.md 로 규칙 고정"], d: "비즈니스 규칙 (순수 함수)" },
          { i: "🔌", n: "데이터 접근", chips: ["api/", "db/"], d: "서버·DB 와 통신" },
        ],
      },
      {
        type: "flow", title: "Codex 와 설계하는 흐름",
        steps: [
          { i: "📋", t: "요구사항", d: "질문 허용", x: "\"빠진 요구사항이 있으면 질문해 줘\" — Codex 가 놓친 부분을 짚어 줍니다." },
          { i: "⚖️", t: "대안 비교", d: "/plan", x: "계획 모드에서 2~3개 대안을 표로 비교. 코드는 아직 바뀌지 않습니다." },
          { i: "📝", t: "ADR 작성", d: "docs/adr/", x: "왜 이 결정을 했는지 기록. 나중에 사람도 Codex 도 참고합니다." },
          { i: "📏", t: "규칙 고정", d: "AGENTS.md", x: "핵심 규칙을 루트·폴더별 AGENTS.md 에 요약." },
          { i: "🧱", t: "단계 구현", d: "1단계씩", x: "plan.md 의 단계를 하나씩 구현하고 확인합니다." },
        ],
      },
    ],
    practice: [
      {
        type: "editor", label: "✍️ ADR 작성", title: "설계 결정 기록(ADR) 쓰기",
        intro: "\"이미지 업로드를 어디에 저장할까?\"에 대한 ADR 을 작성하세요. 대안 2개 이상과 결정, 결과를 포함합니다.",
        file: "docs/adr/002-image-storage.md",
        starter: "# ADR 002: \n\n## 상황\n\n",
        checks: [
          { label: "제목에 ADR 번호와 주제가 있다", re: /^#\s*ADR\s*\d+\s*:\s*\S+/m },
          { label: "'상황' 섹션이 있다", re: /^##\s*상황/m },
          { label: "'대안' 섹션에 번호 목록 2개 이상", fn: (v) => /^##\s*.*대안/m.test(v) && (v.match(/^\s*\d+\.\s+\S/gm) || []).length >= 2 },
          { label: "'결정' 섹션이 있다", re: /^##\s*결정\s*\n+\s*\S+/m },
          { label: "'결과' 섹션이 있다", re: /^##\s*결과/m },
          { label: "장단점을 언급했다 (장점/단점/비용/복잡 등)", re: /(장점|단점|비용|복잡|느림|빠름|단순)/ },
        ],
        solution: "# ADR 002: 이미지 업로드 저장소\n\n## 상황\n사용자 프로필 이미지를 업로드해야 하고, 트래픽은 하루 1만 건 미만\n\n## 고려한 대안\n1. 서버 로컬 디스크 — 단순하지만 서버 증설 시 공유가 어려움\n2. S3 같은 객체 스토리지 — 비용이 조금 들지만 확장과 백업이 쉬움\n\n## 결정\n객체 스토리지 사용\n\n## 결과\n- src/api/upload.ts 에 업로드 함수 배치\n- AGENTS.md 에 '이미지 저장은 upload.ts 만 사용' 규칙 추가",
      },
      {
        type: "quiz", title: "설계 퀴즈",
        questions: [
          { q: "코드를 바꾸지 않고 설계 대안만 비교하고 싶을 때 가장 알맞은 것은?", options: ["/plan 으로 계획 모드에서 비교 요청", "--yolo 로 실행", "/compact", "/new 후 바로 구현 요청"], answer: 0 },
          { q: "<code>src/domain/</code> 에서만 지켜야 할 규칙은 어디에 두는 게 좋을까?", options: ["~/.codex/AGENTS.md", "src/domain/AGENTS.md", "README 맨 아래", "config.toml"], answer: 1, explain: "Codex 는 루트→현재 폴더 순으로 AGENTS.md 를 합치므로, 폴더 전용 규칙은 그 폴더에." },
          { q: "ADR 을 남기는 가장 큰 이유는?", options: ["문서 분량 채우기", "왜 그 결정을 했는지 나중에 사람과 에이전트가 이해하도록", "Codex 가 ADR 없이는 동작하지 않아서", "빌드 속도 향상"], answer: 1 },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Codex", text: "› /plan\n› 이 프로젝트에 결제 기능을 넣으려면 구조를 어떻게 잡아야 할까? 대안 3개를 표로 비교해 줘\n› 2번 안으로 결정. docs/adr/001-payment.md 로 기록하고, 핵심 규칙은 AGENTS.md 에 요약해 줘" },
    },
    mistakes: [
      ["설계 없이 기능을 계속 덧붙이기", "큰 기능 전에는 /plan 으로 대안 비교 → ADR 기록"],
      ["모든 규칙을 루트 AGENTS.md 한 파일에 몰아넣기", "폴더 전용 규칙은 해당 폴더 AGENTS.md 로 나누기"],
    ],
    checklist: ["계층 구조의 '아래로만 의존' 규칙을 설명할 수 있다", "/plan 으로 대안 비교를 받아 보았다", "ADR 을 하나 작성했다", "폴더별 AGENTS.md 의 쓰임을 안다"],
  },

  /* ----------------------------------------------------- Day 9 */
  {
    id: 9, week: 2, icon: "🔍", time: "50분", level: 2,
    title: "코드 리뷰",
    subtitle: "/review 와 codex review 로 버그·보안·테스트 누락을 찾고, 작성자와 리뷰어를 분리하는 습관을 들입니다.",
    goals: ["/review 로 작업 트리를 리뷰한다", "codex review 로 브랜치·커밋을 비대화형 리뷰한다", "AGENTS.md 에 리뷰 기준을 적어 둔다"],
    analogy: { i: "📝", t: "글을 쓴 사람이 자기 글의 오타를 잘 못 찾듯, 코드를 짠 '그 대화'는 자기 실수를 놓치기 쉽습니다. <b>새로운 눈(새 세션)</b>으로 다시 읽게 하는 것이 리뷰의 핵심입니다." },
    sections: [
      {
        h: "/review — 대화형 리뷰",
        body: "<p>TUI 에서 <code>/review</code> 를 입력하면 무엇을 리뷰할지 고르는 메뉴가 나옵니다(커밋되지 않은 변경, 기본 브랜치 대비, 특정 커밋, 직접 지시 등 — 버전에 따라 표시가 다를 수 있습니다). Codex 는 동작 변화와 테스트 누락 위주로 <b>우선순위별</b> 문제를 보고합니다. 리뷰는 코드를 고치지 않고 보고만 합니다.</p>",
      },
      {
        h: "codex review — 터미널·스크립트에서",
        body: "<p>대화창 없이 바로 리뷰만 받고 싶다면 <code>codex review</code> 하위 명령을 씁니다.</p>",
        code: { lang: "bash", file: "terminal", text: "codex review --uncommitted                 # 스테이징·미스테이징·새 파일까지\ncodex review --base main                   # main 브랜치 대비 현재 브랜치\ncodex review --commit a1b2c3d              # 특정 커밋이 바꾼 내용\ncodex review \"보안 관점으로만 봐 줘\"        # 직접 지시문 (위 옵션들과는 함께 못 씀)\ngit diff | codex review -                  # 지시문을 표준 입력으로" },
        tip: "<b>💡 작성자 ≠ 리뷰어</b> 코드를 만든 대화에서 바로 리뷰를 시키기보다, 새 세션(<code>/new</code> 또는 <code>codex review</code>)에서 리뷰하면 '내가 쓴 코드' 편향이 줄어듭니다.",
      },
      {
        h: "AGENTS.md 에 리뷰 기준 적기",
        body: "<p>팀의 리뷰 관점을 AGENTS.md 에 <code>## Review guidelines</code> 같은 섹션으로 적어 두면, 로컬 리뷰뿐 아니라 GitHub 의 Codex 코드 리뷰(Day 17)에서도 참고합니다.</p>",
        code: { lang: "md", file: "AGENTS.md (일부)", text: "## Review guidelines\n- 사용자 입력은 반드시 검증한다 (SQL·HTML 인젝션)\n- 로그에 개인정보(이메일·전화번호)를 남기지 않는다\n- 새 API 에는 실패 케이스 테스트가 있어야 한다\n- 사소한 스타일 지적은 하지 않는다" },
      },
    ],
    viz: {
      type: "sequence", title: "작성자 / 리뷰어 분리 패턴",
      actors: [{ t: "나", i: "🙋" }, { t: "작성 세션", i: "✍️" }, { t: "리뷰 세션", i: "🔍", center: true }, { t: "git", i: "🌿" }],
      msgs: [
        { from: "나", to: "작성 세션", t: "기능 구현 요청", x: "평소처럼 구현을 맡깁니다." },
        { from: "작성 세션", to: "git", t: "변경 (커밋 전)", x: "작업 트리에 변경이 쌓입니다." },
        { from: "나", to: "리뷰 세션", t: "codex review --uncommitted", x: "<b>새로운 맥락</b>의 리뷰어가 diff 만 보고 판단합니다." },
        { from: "리뷰 세션", to: "git", t: "diff 읽기 + AGENTS.md 기준", x: "Review guidelines 를 참고해 검토합니다." },
        { from: "리뷰 세션", to: "나", t: "P0/P1 문제 보고", x: "우선순위별 문제와 파일 위치를 받습니다." },
        { from: "나", to: "작성 세션", t: "지적 사항 반영 요청", x: "리뷰 결과를 붙여넣어 수정시킵니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "리뷰 받아 보기",
        tasks: [
          { goal: "변경된 파일 확인", hint: "git status", match: /^git status$/, out: "On branch feature/signup\nChanges not staged for commit:\n  modified:   src/api/user.js\nUntracked files:\n  src/api/user.test.js" },
          { goal: "커밋 안 된 변경을 비대화형으로 리뷰", hint: "codex review --uncommitted", match: /^codex review --uncommitted$/, stream: true, out: "{tool:• Explored}\n  {dim:└ Read src/api/user.js, src/api/user.test.js, AGENTS.md}\n{err:[P1]} src/api/user.js:42 — 이메일을 검증 없이 SQL 문자열에 이어 붙입니다 (인젝션 위험)\n{warn:[P2]} src/api/user.test.js — 중복 이메일 가입 실패 케이스 테스트가 없습니다\n{ok:•} 리뷰 완료: 문제 2건" },
          { goal: "main 브랜치 대비 전체 브랜치 리뷰", hint: "codex review --base main", match: /^codex review --base \S+$/, stream: true, out: "{dim:main...feature/signup 의 커밋 3개를 검토합니다}\n{err:[P1]} 위와 동일한 SQL 인젝션 문제\n{ok:•} 그 외 동작 변화는 의도와 일치합니다" },
          { goal: "Codex 실행 후 수정 요청 준비", hint: "codex", match: /^codex$/, enter: "agent", out: "" },
          { goal: "리뷰 결과를 반영해 달라고 요청", hint: "리뷰에서 나온 SQL 인젝션 문제를 고치고 중복 이메일 테스트를 추가해줘", match: /(고쳐|수정|추가|반영)/, mode: "agent", out: "{tool:• Edited} src/api/user.js {ok:(+3 -1)}  {dim:└ 파라미터 바인딩으로 변경}\n{tool:• Edited} src/api/user.test.js {ok:(+14)}\n{tool:• Ran} npm test\n  {dim:└ Tests: 12 passed}\n{ok:•} 두 가지를 반영했습니다." },
        ],
      },
      {
        type: "quiz", title: "리뷰 퀴즈",
        questions: [
          { q: "특정 커밋 <code>a1b2c3d</code> 가 바꾼 내용만 리뷰하려면?", options: ["codex review --commit a1b2c3d", "codex exec --commit a1b2c3d", "/diff a1b2c3d", "codex review --base a1b2c3d --uncommitted"], answer: 0 },
          { q: "리뷰를 '새 세션'에서 하는 이유는?", options: ["더 저렴해서", "작성한 대화의 맥락·편향 없이 diff 를 객관적으로 보게 하려고", "새 세션만 /review 를 지원해서", "이유 없음"], answer: 1 },
          { q: "팀 리뷰 기준을 Codex 가 항상 참고하게 하려면?", options: ["매번 프롬프트에 복사", "AGENTS.md 에 Review guidelines 섹션 작성", "config.toml 에 review = true", "README 에 적기"], answer: 1 },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "# 아무 파일이나 조금 고친 뒤\ncodex review --uncommitted\n\n# 또는 TUI 에서\ncodex\n› /review" },
    },
    mistakes: [
      ["코드를 짠 같은 대화에서 '잘 짰지?' 라고 묻기", "새 세션이나 <code>codex review</code> 로 분리"],
      ["리뷰 결과를 전부 무조건 반영", "우선순위(P0/P1) 높은 것부터, 오탐은 근거를 들어 반박"],
    ],
    checklist: ["/review 메뉴를 열어 보았다", "codex review --uncommitted / --base 를 써 보았다", "AGENTS.md 에 Review guidelines 를 적었다"],
  },

  /* ----------------------------------------------------- Day 10 */
  {
    id: 10, week: 2, icon: "📚", time: "45분", level: 1,
    title: "문서화",
    subtitle: "README, 주석, API 문서, 변경 기록을 Codex 로 만들고 — 코드가 바뀔 때마다 문서도 따라가게 합니다.",
    goals: ["문서 종류별로 Codex 에게 맡기는 법을 안다", "codex exec 로 문서를 한 번에 생성한다", "git log 로 CHANGELOG 를 자동 작성한다"],
    analogy: { i: "🗺️", t: "문서는 <b>지도</b>입니다. 길(코드)이 바뀌었는데 지도를 안 고치면 모두가 길을 잃죠. Codex 는 길을 직접 걸어 보고 지도를 그려 주는 측량사입니다." },
    sections: [
      {
        h: "무엇을 맡길까?",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>문서</th><th>프롬프트 예</th></tr>
        <tr><td>README</td><td>"새 팀원이 10분 안에 실행할 수 있게 README 를 써 줘. 설치·실행·테스트·폴더 구조 포함"</td></tr>
        <tr><td>코드 주석</td><td>"@src/utils/date.ts 의 공개 함수에 JSDoc 을 달아 줘. 동작은 바꾸지 마"</td></tr>
        <tr><td>API 문서</td><td>"src/routes 의 엔드포인트를 표로 정리해 docs/api.md 로 저장"</td></tr>
        <tr><td>CHANGELOG</td><td>"지난 태그 이후 커밋을 사용자 관점으로 요약"</td></tr></table></div>`,
        tip: "<b>✅ 검증 포인트</b> 문서 작업은 \"<b>동작은 바꾸지 마</b>\"를 꼭 붙이고, 끝나면 <code>/diff</code> 로 코드가 아닌 주석·문서만 바뀌었는지 확인하세요.",
      },
      {
        h: "codex exec 로 문서 생성",
        body: "<p><code>codex exec</code> 는 대화창 없이 한 번 실행하고 끝납니다(3주차에 자세히). 기본 샌드박스가 <b>read-only</b> 이므로, 파일을 써야 한다면 <code>--sandbox workspace-write</code> 를 붙입니다. 결과를 화면으로만 받을 때는 그대로 파이프하면 됩니다.</p>",
        code: { lang: "bash", file: "terminal", text: "# 결과를 파일로 받기 (read-only 로도 가능)\ncodex exec \"이 저장소 구조를 요약한 README 초안을 마크다운으로 출력해 줘\" -o README.draft.md\n\n# Codex 가 직접 파일을 수정하게 하기\ncodex exec --sandbox workspace-write \"src/utils 의 공개 함수에 JSDoc 추가. 동작 변경 금지\"\n\n# git log 를 맥락으로 넘겨 CHANGELOG 작성\ngit log --oneline v1.2.0..HEAD | codex exec \"사용자 관점의 CHANGELOG 로 정리해 줘\" > CHANGELOG.draft.md" },
      },
      {
        h: "문서를 코드와 함께 유지하기",
        body: "<p>AGENTS.md 에 문서 규칙을 적어 두면 Codex 가 코드를 바꿀 때 문서도 같이 고칩니다.</p>",
        code: { lang: "md", file: "AGENTS.md (일부)", text: "## 문서 규칙\n- 공개 함수를 추가·변경하면 JSDoc 도 함께 수정한다\n- API 엔드포인트가 바뀌면 docs/api.md 표를 갱신한다\n- 사용자에게 보이는 변경은 CHANGELOG.md 의 Unreleased 에 추가한다" },
      },
    ],
    viz: {
      type: "flow", title: "코드 → 문서 자동 생성 파이프라인",
      steps: [
        { i: "💻", t: "코드 변경", d: "기능 추가·수정", x: "Codex 또는 사람이 코드를 바꿉니다." },
        { i: "📏", t: "AGENTS.md 규칙", d: "문서도 함께", x: "문서 규칙 덕분에 Codex 가 JSDoc·API 표를 같이 갱신합니다." },
        { i: "🧾", t: "git log", d: "변경 기록", x: "커밋 메시지가 CHANGELOG 의 재료가 됩니다." },
        { i: "🤖", t: "codex exec", d: "요약·정리", x: "<code>git log | codex exec \"...\"</code> 로 사용자 관점 요약을 만듭니다." },
        { i: "👀", t: "사람 검토", d: "/diff 확인", x: "사실과 다른 내용이 없는지 사람이 최종 확인합니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "문서 자동 생성",
        files: ["src/", "package.json", "CHANGELOG.md"],
        tasks: [
          { goal: "최근 커밋 확인", hint: "git log --oneline -5", match: /^git log.*$/, out: "{warn:a1b2c3d} feat: 비밀번호 재설정 메일\n{warn:9f8e7d6} fix: 로그인 실패 시 메시지 누락\n{warn:7c6b5a4} refactor: user 서비스 분리" },
          { goal: "커밋 기록을 파이프로 넘겨 CHANGELOG 초안 만들기", hint: "git log --oneline -5 | codex exec \"사용자 관점의 CHANGELOG 로 정리해줘\"", match: /^git log.* \| codex exec .+/, stream: true, out: "## [Unreleased]\n### 새 기능\n- 비밀번호를 잊었을 때 재설정 메일을 받을 수 있습니다\n### 버그 수정\n- 로그인 실패 시 안내 메시지가 표시됩니다\n{dim:(내부 리팩토링은 사용자 영향이 없어 제외했습니다)}" },
          { goal: "파일을 직접 고치도록 쓰기 샌드박스로 JSDoc 추가", hint: "codex exec --sandbox workspace-write \"src/utils 공개 함수에 JSDoc 추가해줘. 동작 변경 금지\"", match: /^codex exec (--sandbox|-s) workspace-write .+/, stream: true, out: "{tool:• Edited} src/utils/date.js {ok:(+18)}\n{tool:• Edited} src/utils/format.js {ok:(+11)}\n{ok:•} 공개 함수 6개에 JSDoc 을 추가했습니다. 코드 동작은 변경하지 않았습니다." },
          { goal: "주석만 바뀌었는지 확인", hint: "git diff --stat", match: /^git diff( --stat)?$/, out: " src/utils/date.js   | 18 {ok:++++++++++++++++++}\n src/utils/format.js | 11 {ok:+++++++++++}\n 2 files changed, 29 insertions(+)" },
        ],
      },
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "README 작성 요청 프롬프트",
        intro: "새 팀원을 위한 README 를 Codex 에게 요청하는 프롬프트를 써 보세요.",
        file: "prompt.txt",
        starter: "README 써줘",
        checks: [
          { label: "독자(새 팀원/처음 보는 사람 등)를 밝혔다", re: /(새\s*팀원|처음|신입|입문|사용자)/ },
          { label: "설치 방법을 포함하라고 했다", re: /설치/ },
          { label: "실행 방법을 포함하라고 했다", re: /실행/ },
          { label: "테스트 방법을 포함하라고 했다", re: /테스트|test/i },
          { label: "실제 파일(package.json 등)을 근거로 하라고 했다", re: /(@\S+|package\.json|실제|근거|확인)/ },
          { label: "코드는 수정하지 말라고 했다", re: /(코드.*(수정|변경).*(말|금지)|동작.*(변경|바꾸).*(말|금지))/ },
        ],
        solution: "새 팀원이 10분 안에 프로젝트를 실행할 수 있도록 README.md 를 작성해 줘.\n\n- 설치 방법, 실행 방법, 테스트 방법, 폴더 구조를 포함\n- @package.json 의 scripts 를 근거로 실제 명령만 적어 줘\n- 모르는 내용은 추측하지 말고 TODO 로 표시\n- 코드는 수정하지 말 것",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "codex exec \"이 저장소의 README 초안을 마크다운으로 출력해 줘\" -o README.draft.md\ngit log --oneline -20 | codex exec \"CHANGELOG 로 정리\"" },
    },
    mistakes: [
      ["Codex 가 쓴 문서를 검토 없이 커밋", "명령·경로가 실제와 맞는지 직접 실행해 확인"],
      ["문서 작업 중 코드까지 '개선'되는 것을 방치", "\"동작 변경 금지\" 명시 + <code>/diff</code>·<code>git diff --stat</code> 확인"],
    ],
    checklist: ["README·주석·API 문서·CHANGELOG 를 각각 요청해 보았다", "codex exec 기본 샌드박스가 read-only 임을 안다", "git log 를 파이프로 넘겨 요약해 보았다"],
  },

  /* ----------------------------------------------------- Day 11 */
  {
    id: 11, week: 2, icon: "🧪", time: "60분", level: 2,
    title: "테스트 — TDD",
    subtitle: "테스트를 먼저 쓰고, 실패를 확인하고, 통과시키는 TDD 로 Codex 의 결과를 '증명 가능하게' 만듭니다.",
    goals: ["Red → Green → Refactor 순환을 이해한다", "Codex 에게 테스트를 먼저 쓰게 한다", "AGENTS.md 에 테스트 명령과 규칙을 적는다"],
    analogy: { i: "🎯", t: "과녁(테스트)을 먼저 세워 두면 화살(코드)이 맞았는지 바로 알 수 있습니다. 과녁 없이 쏘면 '잘 맞은 것 같아요'라는 말만 남죠. Codex 에게 <b>과녁부터 세우게</b> 하세요." },
    sections: [
      {
        h: "왜 Codex 와 TDD 가 잘 맞을까?",
        body: `<ul><li><b>명확한 목표</b>: 테스트가 곧 완료 기준 — Codex 는 '통과할 때까지' 스스로 반복합니다.</li>
        <li><b>샌드박스 안 실행</b>: 테스트 실행은 작업 폴더 안의 로컬 명령이라 기본 설정에서도 바로 돌아갑니다. (네트워크가 필요한 테스트는 예외)</li>
        <li><b>회귀 방지</b>: 다음 수정 때도 같은 테스트가 지켜 줍니다.</li></ul>`,
      },
      {
        h: "TDD 프롬프트 3단계",
        code: { lang: "md", file: "프롬프트 순서", text: "1) [Red] @src/cart.ts 의 할인 계산에 대한 테스트를 먼저 써 줘.\n   - 10만 원 이상 10% 할인, 쿠폰과 중복 불가, 음수 금액은 에러\n   - 아직 구현은 하지 마. 테스트를 돌려서 실패하는 것까지 보여 줘\n\n2) [Green] 이제 테스트가 통과하도록 최소한으로 구현해 줘.\n   - 테스트 파일은 수정하지 마\n\n3) [Refactor] 테스트가 계속 통과하는 상태로 중복을 정리해 줘" },
        tip: "<b>⚠️ 테스트를 고쳐서 통과시키는 꼼수 주의</b> \"테스트 파일은 수정하지 마\"를 꼭 넣으세요. AGENTS.md 에 적어 두면 더 확실합니다.",
        tipType: "warn",
      },
      {
        h: "AGENTS.md 에 테스트 규칙",
        code: { lang: "md", file: "AGENTS.md (일부)", text: "## 테스트\n- 전체 테스트: npm test\n- 파일 하나만: npx vitest run src/cart.test.ts\n- 기능 추가·버그 수정에는 반드시 테스트를 먼저 추가한다\n- 기존 테스트를 지우거나 skip 하지 않는다\n- 작업을 끝내기 전에 npm test 가 통과해야 한다" },
      },
    ],
    viz: {
      type: "loop", title: "TDD 순환 — Red → Green → Refactor",
      center: "테스트가\n기준",
      steps: [
        { i: "🔴", t: "Red", d: "실패하는 테스트", x: "원하는 동작을 테스트로 먼저 씁니다. 아직 구현이 없으니 <b>실패</b>해야 정상." },
        { i: "🟢", t: "Green", d: "최소 구현", x: "테스트를 통과하는 <b>가장 단순한</b> 코드를 씁니다. 테스트 파일은 손대지 않습니다." },
        { i: "🧹", t: "Refactor", d: "정리", x: "테스트가 통과하는 상태를 유지하며 중복·이름을 정리합니다." },
        { i: "💾", t: "Commit", d: "세이브", x: "한 바퀴 돌 때마다 커밋 — 다음 순환의 안전한 출발점." },
      ],
    },
    practice: [
      {
        type: "order", title: "TDD 순서 맞추기",
        items: ["요구사항을 테스트 케이스로 정리", "Codex 에게 테스트만 작성시키기", "테스트 실행 → 실패 확인 (Red)", "테스트 파일 수정 금지 조건으로 구현 요청", "테스트 통과 확인 (Green)", "통과 상태 유지하며 리팩토링", "커밋"],
        explain: "실패를 먼저 확인해야 테스트가 진짜로 무언가를 검사한다는 것을 알 수 있습니다.",
      },
      {
        type: "terminal", title: "Codex 와 TDD 한 바퀴",
        startMode: "agent",
        tasks: [
          { goal: "[Red] 테스트만 먼저 작성하게 하기 (구현 금지)", hint: "할인 계산 테스트를 먼저 써줘. 10만원 이상 10% 할인. 아직 구현은 하지 마", match: /테스트/, mode: "agent", out: "{tool:• Edited} src/cart.test.ts {ok:(+24)}\n{tool:• Ran} npm test\n  {err:└ ✗ 10만원 이상이면 10% 할인 — discount is not a function}\n  {err:  ✗ 음수 금액은 에러}\n{ok:•} 테스트 2개를 작성했고 예상대로 실패합니다 (Red)." },
          { goal: "[Green] 테스트 수정 금지 조건으로 구현 요청", hint: "테스트 파일은 수정하지 말고 통과하도록 구현해줘", match: /(구현|통과)/, mode: "agent", out: "{tool:• Edited} src/cart.ts {ok:(+9)}\n{tool:• Ran} npm test\n  {ok:└ ✓ 2 passed}\n{ok:•} 테스트 파일은 그대로 두고 구현했습니다 (Green)." },
          { goal: "[Refactor] 통과 상태 유지하며 정리", hint: "테스트가 계속 통과하게 유지하면서 리팩토링해줘", match: /리팩|정리/, mode: "agent", out: "{tool:• Edited} src/cart.ts {ok:(+4 -6)}  {dim:└ 할인율 상수 분리}\n{tool:• Ran} npm test\n  {ok:└ ✓ 2 passed}" },
          { goal: "변경 확인", hint: "/diff", match: /^\/diff$/, mode: "agent", out: "{dim:src/cart.ts, src/cart.test.ts 변경}\n{ok:+const DISCOUNT_RATE = 0.1;}\n{ok:+const DISCOUNT_THRESHOLD = 100000;}" },
          { goal: "커밋", hint: "커밋해줘", match: /커밋|commit/i, mode: "agent", out: "{tool:• Ran} git commit -am \"feat: 10만원 이상 10% 할인\"\n{ok:•} 커밋했습니다." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Codex", text: "› @src/utils 에서 테스트가 없는 함수 하나를 골라 테스트부터 써 줘. 구현은 건드리지 마\n› 테스트를 돌려서 결과 보여 줘\n› (실패하는 경우) 원인을 설명해 줘" },
    },
    mistakes: [
      ["\"테스트도 같이 짜 줘\" — 구현과 테스트를 한 번에", "테스트 먼저 → 실패 확인 → 구현 순서로 나눠 요청"],
      ["실패하는 테스트를 Codex 가 고쳐서 통과", "\"테스트 파일 수정 금지\"를 프롬프트와 AGENTS.md 에 명시"],
    ],
    checklist: ["Red-Green-Refactor 를 설명할 수 있다", "테스트를 먼저 쓰게 하고 실패를 확인했다", "AGENTS.md 에 테스트 명령과 규칙을 적었다"],
  },

  /* ----------------------------------------------------- Day 12 */
  {
    id: 12, week: 2, icon: "🧹", time: "50분", level: 2,
    title: "리팩토링",
    subtitle: "동작은 그대로, 구조는 더 좋게. 테스트와 git 을 안전망으로 Codex 와 단계적으로 코드를 개선합니다.",
    goals: ["리팩토링과 기능 변경을 구분한다", "작은 단계 + 테스트 + 커밋 사이클을 지킨다", "Esc Esc 되돌리기와 git 복구를 구분해 쓴다"],
    analogy: { i: "🏚️", t: "사람이 사는 집을 리모델링할 때는 한 번에 다 부수지 않습니다. <b>방 하나씩</b> 고치고, 매번 <b>수도·전기가 잘 되는지(테스트)</b> 확인하죠. 리팩토링도 한 번에 한 가지씩입니다." },
    sections: [
      {
        h: "리팩토링 프롬프트의 핵심",
        body: `<ul><li><b>범위 한정</b>: "<code>@src/order/</code> 폴더만, 공개 함수 시그니처는 유지"</li>
        <li><b>동작 보존</b>: "동작은 바꾸지 마. 기존 테스트가 모두 통과해야 해"</li>
        <li><b>단계 분할</b>: "1) 중복 제거 2) 이름 개선 3) 함수 분리 — 1단계만 먼저"</li>
        <li><b>먼저 안전망</b>: 테스트가 없다면 "리팩토링 전에 현재 동작을 고정하는 테스트부터 써 줘"</li></ul>`,
      },
      {
        h: "되돌리기 — 무엇으로?",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>상황</th><th>방법</th></tr>
        <tr><td>방금 보낸 요청을 다르게 하고 싶다</td><td>빈 입력창에서 <kbd>Esc</kbd> <kbd>Esc</kbd> → 이전 메시지를 고쳐 그 지점부터 다시 (대화를 되돌림)</td></tr>
        <tr><td>파일 변경을 되돌리고 싶다</td><td><code>git restore 파일</code> / <code>git stash</code> / 커밋 단위면 <code>git revert</code></td></tr>
        <tr><td>큰 실험을 하고 싶다</td><td>브랜치나 worktree 에서 (4주차)</td></tr></table></div>`,
        tip: "<b>⚠️ 대화를 되돌려도 파일은 그대로일 수 있어요</b> 대화 되돌리기는 맥락을 바꾸는 것이고, 이미 수정된 파일을 복구하는 확실한 방법은 <b>git</b> 입니다. 그래서 단계마다 커밋합니다.",
        tipType: "warn",
      },
      {
        h: "리팩토링 전/후 확인 루틴",
        code: { lang: "bash", file: "Codex", text: "› !npm test                      # 시작 전 초록불 확인\n› @src/order/price.js 의 중복 계산을 함수로 추출해 줘. 동작 변경 금지, 1단계만\n› /diff                          # 무엇이 바뀌었나\n› !npm test                      # 여전히 초록불?\n› 커밋해 줘 (refactor: 접두어)" },
      },
    ],
    viz: [
      {
        type: "compare", title: "리팩토링 전 / 후",
        bad: { h: "전: 중복과 매직 넘버", code: "function price(o) {\n  let t = 0;\n  for (const i of o.items) t += i.p * i.q;\n  if (t >= 100000) t = t * 0.9;\n  return t + (t < 30000 ? 3000 : 0);\n}", note: "숫자의 의미가 안 보이고, 할인·배송비 규칙이 한 함수에 섞여 있음" },
        good: { h: "후: 의도가 드러나는 이름", code: "const DISCOUNT_THRESHOLD = 100000;\nconst FREE_SHIPPING_MIN = 30000;\n\nfunction price(order) {\n  const subtotal = sum(order.items);\n  const discounted = applyDiscount(subtotal);\n  return discounted + shippingFee(discounted);\n}", note: "동작은 같고(테스트 통과), 규칙마다 이름이 생겨 수정이 쉬워짐" },
      },
      {
        type: "flow", title: "안전 리팩토링 사이클",
        steps: [
          { i: "🟢", t: "초록불 확인", d: "npm test", x: "시작 전에 테스트가 모두 통과하는지 확인. 없으면 테스트부터." },
          { i: "🔧", t: "한 가지 변경", d: "범위 한정", x: "한 번에 한 종류의 개선만 요청합니다." },
          { i: "👀", t: "/diff", d: "변경 검토", x: "의도하지 않은 동작 변경이 없는지 봅니다." },
          { i: "🧪", t: "다시 테스트", d: "여전히 초록?", x: "실패하면 원인 분석 또는 git 으로 되돌리기." },
          { i: "💾", t: "커밋", d: "refactor:", x: "단계마다 커밋해 언제든 돌아올 수 있게." },
        ],
      },
    ],
    practice: [
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "안전한 리팩토링 요청 쓰기",
        intro: "@src/order/price.js 의 긴 함수를 정리하고 싶습니다. 안전한 리팩토링 프롬프트를 쓰세요.",
        file: "prompt.txt",
        starter: "price.js 정리해줘",
        checks: [
          { label: "@ 로 대상 파일을 지정했다", re: /@src\/order\/price\.js/ },
          { label: "동작을 바꾸지 말라고 했다", re: /동작.*(변경|바꾸).*(말|금지)|동작\s*(유지|보존)/ },
          { label: "테스트 통과를 조건으로 걸었다", re: /테스트.*통과|npm test/ },
          { label: "단계를 나눴다 (1단계/먼저/하나씩)", re: /(1단계|먼저|하나씩|단계별)/ },
          { label: "공개 인터페이스(시그니처/export) 유지를 언급", re: /(시그니처|export|공개\s*함수|인터페이스)/ },
        ],
        solution: "@src/order/price.js 를 리팩토링해 줘.\n\n- 동작은 바꾸지 말 것. 기존 npm test 가 모두 통과해야 함\n- 공개 함수 price() 의 시그니처는 유지\n- 1단계: 매직 넘버를 이름 있는 상수로. 1단계만 먼저 하고 /diff 로 보여 줘\n- 다음 단계(함수 분리)는 내가 확인한 뒤 진행",
      },
      {
        type: "quiz", title: "리팩토링 퀴즈",
        questions: [
          { q: "리팩토링 도중 테스트가 깨졌습니다. 가장 좋은 대응은?", options: ["테스트를 수정해 통과시킨다", "원인을 분석하고, 안 되면 git 으로 마지막 커밋까지 되돌린다", "무시하고 계속한다", "테스트를 삭제한다"], answer: 1 },
          { q: "Codex 가 이미 수정한 파일을 확실히 되돌리는 방법은?", options: ["Esc 한 번", "git restore / git stash", "/compact", "/new"], answer: 1, explain: "대화 되돌리기는 맥락용, 파일 복구는 git 이 확실합니다." },
          { q: "테스트가 하나도 없는 레거시 코드를 리팩토링하려면 먼저?", options: ["바로 리팩토링", "현재 동작을 고정하는 테스트부터 작성", "전부 새로 작성", "주석만 추가"], answer: 1 },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "git switch -c refactor/price\ncodex\n› !npm test\n› (위에서 쓴 리팩토링 프롬프트)\n› /diff\n› !npm test\n› 커밋해 줘" },
    },
    mistakes: [
      ["\"전체를 깔끔하게 리팩토링해 줘\"", "폴더·종류·단계를 한정하고 한 단계씩"],
      ["리팩토링과 기능 추가를 한 번에", "리팩토링 커밋과 기능 커밋을 분리 — 리뷰와 되돌리기가 쉬워짐"],
    ],
    checklist: ["리팩토링 전후로 테스트를 돌렸다", "단계마다 커밋했다", "Esc Esc 와 git restore 의 차이를 안다", "2주차 완주! 🎉"],
  },
];
