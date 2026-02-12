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

const seatArr = [
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
    AVAILABLE,
    RESERVED,
    RESERVED,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
];

console.log(seatArr);

const container = document.querySelector('.seat-area');

function renderSeat(seatArr) {
  const rows = seatArr.length;
  const cols = seatArr[0].length;
  container.style.setProperty('--cols', String(cols));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const seatElement = document.createElement('button');
      seatElement.textContent = seatArr[i][j];
      if (seatArr[i][j] === RESERVED) {
        seatElement.style.color = 'lightgray';
      }
      container.appendChild(seatElement);
    }
  }
}

renderSeat(seatArr);
