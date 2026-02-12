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
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
    AVAILABLE,
  ],
];

console.log(seatArr);

const container = document.querySelector('seat-area');

function renderseat(seatArr) {
  const rows = seatArr.langth;
  const cols = seatArr[0].length;
  container.style.setproperty('--cols', string(cols));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; i++) {
      const seatElement = document.createElement('button');
      seatElement.textContent = seatArr[i][j];
      if (seatArr[i][j] === RESERVED) {
        seatElement.style.color = 'lightgray';
      }
      container.appendChild(seatElement);
    }
  }
}
