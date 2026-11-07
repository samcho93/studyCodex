# Codex 배우기

OpenAI 의 오픈소스 터미널 코딩 에이전트 **Codex CLI** 를 4주 24일 동안 손으로 익히는 한국어 입문 강좌 사이트입니다.

- **라이브 사이트**: https://samcho93.github.io/studyCodex/
- 하루 30~60분, 각 레슨은 `목표 → 개념(비유·표·코드) → 시각화 → 브라우저 실습 → 내 PC 에서 따라하기 → 체크리스트` 순서로 구성됩니다.
- 터미널 실습은 브라우저 안에서 동작하는 **시뮬레이션**이라 아무것도 설치하지 않아도 됩니다. 진도는 브라우저(localStorage)에 저장됩니다.

## 커리큘럼

| 주차 | 주제 | 내용 |
|---|---|---|
| 1주차 | 기초 | 설치·로그인(ChatGPT 계정/API 키), TUI 기본 조작, AGENTS.md, 샌드박스·승인 정책, GitHub 연결, 첫 빌드 |
| 2주차 | 코딩 워크플로우 | 프롬프트 패턴, 아키텍처 설계, 코드 리뷰(/review, codex review), 문서화, TDD, 리팩토링 |
| 3주차 | 자동화 | config.toml·프로필, MCP 서버, `codex exec`, notify·Slack 알림, GitHub Action·@codex, Codex SDK |
| 4주차 | 고급 시스템 | 스킬·훅, 서브에이전트·병렬 작업, 시스템 통합, 모니터링, 안전한 배포, 캡스톤 |

명령어 모음(`#/cheatsheet`)과 용어 사전(`#/glossary`) 페이지도 있습니다.

## 로컬에서 실행

빌드 과정이 없는 정적 사이트입니다. 저장소 폴더에서 간단한 웹 서버를 띄우세요.

```bash
cd studyCodex
python -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
```

## 파일 구조

```
index.html          진입 페이지
css/style.css       스타일
js/config.js        사이트 설정 (제목, 주차, 터미널 시뮬레이터, 명령어 모음, 용어 사전)
js/data-week1~4.js  레슨 데이터 (Day 1~24)
js/viz.js           시각화 엔진
js/practice.js      실습 엔진 (터미널 시뮬레이터, 퀴즈, 순서 맞추기, 작성 에디터)
js/app.js           라우팅·진도 관리
js/extras.js        명령어 모음·용어 사전 화면
```

## 참고

Codex CLI 는 업데이트가 잦아 명령·옵션·설정 키가 바뀔 수 있습니다. 강좌 내용은 작성 시점의 공식 문서(OpenAI Codex 문서, `openai/codex` 저장소)를 기준으로 했으며, 실제 사용 시에는 `codex --help` 와 최신 공식 문서를 함께 확인하세요.
