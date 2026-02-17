// import { seatAPI } from '../../apis/apiRequest.js';

// let showtime = [];

// async function loadSeats() {
//   try {
//     const seats = await seatAPI.list();
//     console.log(seats);
//   } catch (e) {
//     console.error(e);
//   }
// }
// loadSeats();
// import { searchForWorkspaceRoot } from 'vite';

// 2차원 배열
// 평면 12열 11행
const AVAILABLE = 1;
const RESERVED = 2;
const SPECIAL = 3;
// const selected = 4;

const seatArr = [
  // A
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // B
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
  ],
  // C
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // D
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // E
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // F
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // G
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
  ],
  // H
  [
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // I
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  // J
  [
    SPECIAL,
    SPECIAL,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    SPECIAL,
    SPECIAL,
  ],
];

console.log(seatArr);
// html에서 클래스.seat-area 선택함
const container = document.querySelector('.seat-area');
// 가로세로 배열의 길이를 정함
function renderSeat(seatArr) {
  const rows = seatArr.length;
  const cols = seatArr[0].length;
  container.style.setProperty('--cols', String(cols));

  // 12행i 11열j 124석 배열 버튼타입으로 연결해서 이중for문 돌리기
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const seatElement = document.createElement('button');
      seatElement.type = 'button';
      // 12 행 (A, B...J) 아스키 코드 A(65) 활용
      const rowLabel = String.fromCodePoint(65 + i);
      // 11 열 (1, 2...12)
      const colLabel = j + 1;
      const seatName = `${rowLabel}${colLabel}`;
      seatElement.textContent = seatName;

      // 조건에 상태,컬러,접근성 추가함
      // 조건 - RESERVED , SPECIAL , AVAILABLE(slse))

      // 예약불가능
      if (seatArr[i][j] === RESERVED) {
        seatElement.classList.add('reserved');
        seatElement.style.color = 'var(--color-muted)'; // 색 다시확인하기
        seatElement.style.backgroundColor = 'var(--color-muted)'; // 색 다시확인하기
        seatElement.disabled = true; // 버튼 비활성화함
        // 상태 : []좌석 선택 불가
        seatElement.setAttribute('aria-label', `${seatName} 좌석 선택 불가`);

        // 예약 가능
      } else if (seatArr[i][j] === SPECIAL) {
        seatElement.classList.add('special');
        seatElement.style.backgroundColor = 'darkgreen'; // 색 다시확인하기
        // 상태 : 장애인석[]선택 가능
        seatElement.setAttribute('aria-label', `장애인석 ${seatName} 선택 가능`);
      } else {
        // 상태 : []일반석 선택 가능
        seatElement.setAttribute('aria-label', `${seatName} 좌석 선택 가능`);
      }

      // 배열 사이 복도
      // left 2열, center 8열, right 2열
      if (j < 2) {
        seatElement.style.gridColumn = j + 1;
      } else if (j >= 2 && j < 10) {
        seatElement.style.gridColumn = j + 2;
      } else {
        seatElement.style.gridColumn = j + 3;
      }
      container.appendChild(seatElement);
    }
  }
}

renderSeat(seatArr);
