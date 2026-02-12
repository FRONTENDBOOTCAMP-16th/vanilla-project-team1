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

// 2차원 배열

// import { searchForWorkspaceRoot } from 'vite';

// 평면 12열 11행
const AVAILABLE = 1;
const RESERVED = 2;
const SPECIAL = 3;
// const selected = 4;

const seatArr = [
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
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
  [
    AVAILABLE,
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
    RESERVED,
  ],
  [
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    SPECIAL,
    SPECIAL,
  ],
];

console.log(seatArr);

const container = document.querySelector('.seat-area');

function renderSeat(seatArr) {
  const rows = seatArr.length;
  const cols = seatArr[0].length;
  container.style.setProperty('--cols', String(cols));

  // 12행i 11열j 이중for문 124석 배열 버튼연결해서 돌리기
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const seatElement = document.createElement('button');

      // 행 (A, B...)
      const rowLabel = String.fromCodePoint(65 + i);
      // 열 (1, 2...)
      const colLabel = j + 1;
      seatElement.textContent = `${rowLabel}${colLabel}`;

      if (seatArr[i][j] === RESERVED) {
        seatElement.classList.add('reserved'); // 클래스 추가해야함
        seatElement.style.color = 'lightgray';
        seatElement.disabled = true;
      } else if (seatArr[i][j] === SPECIAL) {
        seatElement.classList.add('special');
        seatElement.style.backgroundColor = 'green'; // 장애인석 컬러 다시 논의해서 수정해야함
      }

      // 좌석 컨테이너에 추가했음
      container.appendChild(seatElement);
    }
  }
}

renderSeat(seatArr);
