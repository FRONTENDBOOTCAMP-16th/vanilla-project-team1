# 🎬 Movie Reservation Web (Vanilla JS)

> HTML, CSS, JavaScript로 구현한 영화 예매 웹 프로젝트

🔗 **배포 링크:** [첨부예정]

---

## 📌 프로젝트 소개

- **프로젝트명:** Movie Reservation Site
- **팀명:** 예매의 정석
- **개발 기간:** 2026.02.09 ~ 2026.03.04
- **소개:**  
  바닐라 JavaScript를 기반으로 영화 선택 → 상영시간 선택 → 좌석 선택 → 결제까지  
  실제 예매 흐름을 구현한 웹 애플리케이션입니다.

---

## 🛠 기술 스택

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Tools**

- Git / GitHub
- Jira
- VS Code

---

## 🎯 주요 기능

### 1. 영화 목록 페이지

- 영화 카드 리스트 렌더링
- 영화 선택 후 예매 페이지 이동

### 2. 상영시간 선택 페이지

- 날짜 / 극장 / 시간 선택
- 선택 데이터 상태 저장

### 3. 좌석 선택 페이지

- 좌석 맵 렌더링
- 좌석 선택 / 해제
- 인원 수 및 가격 계산

### 4. 예약 / 결제 페이지

- 선택 정보 요약 표시
- 사용자 정보 입력 및 검증
- 최종 결제 금액 계산

---

## 👨‍👩‍👧‍👦 팀원 소개

| 이름   | 역할                 | GitHub                       |
| ------ | -------------------- | ---------------------------- |
| 조재권 | 영화 목록 페이지     | [https://github.com/jjg2362] |
| 윤유영 | 상영시간 선택 페이지 | [GitHub 링크]                |
| 이찬미 | 좌석 선택 페이지     | [GitHub 링크]                |
| 장예지 | 결제 페이지          | [https://github.com/ruiwaa]                |

---

## 📂 폴더 구조

```bash
likelion-16th-movie-reservation-site/
├── public/              # 정적 파일 (빌드 시 루트로 복사됨, favicon 등)
│   └── favicon.svg
├── src/                 # 소스 코드 (실제 개발 작업 공간)
│   ├── assets/          # JS/CSS에서 import해서 쓰는 이미지, 폰트
│   │   ├── images/
│   │   └── icons/
│   ├── components/      # (선택) 재사용 가능한 UI 조각 (헤더, 카드 등)
│   ├── styles/          # 스타일 시트
│   │   ├── base.css
│   │   ├── theme.css
│   │   └── main.css
│   ├── utils/           # 공통 함수 (날짜 포맷팅, 유효성 검사 등)
│   ├── api/             # API 호출 관련 로직 분리 (API 연동 fetch 함수 모음)
│   └── main.js          # JavaScript 진입점 (Entry Point)
│   └── page
│   │   ├──mainPage/
│   │   │   ├──main.html
│   │   │   ├──mainStyle.css
│   │   │   ├──mainJs.js
│   │   ├──bookingPage/
│   │   ├──seatPage/
│   │   ├──paymentPage/
├── index.html           # 메인 HTML (Vite는 index.html이 루트에 위치)
├── package.json         # 의존성 관리
├── .gitignore           # Git 제외 파일 목록
└── vite.config.js       # Vite 설정 파일
```
