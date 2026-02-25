import { seatAPI } from '../../apis/apiRequest.js';
import { patchBookingState } from '../../state/movieState.js';

let showtime = [];

async function loadSeats() {
  try {
    const seats = await seatAPI.list();
    console.log(seats);
  } catch (e) {
    console.error(e);
  }
}
loadSeats();
// import { searchForWorkspaceRoot } from 'vite';

//---------------------------------
// 상단 - 좌석 (2차원 배열)
// 평면 12열 11행
//---------------------------------
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

const container = document.querySelector('.seat-area');
const countValue = document.querySelector('.count-value');
const MIN_COUNT = 1;
const MAX_COUNT = 8;
let count = MIN_COUNT;
const PRICE_PER_PERSON = 14000;

const seatValueShow = document.querySelector('.info-item .value');
const totalPriceShow = document.querySelector('.total-price strong');
const goPaymentButton = document.querySelector('.go-payment');

//---------------------------------
// 좌석 렌더링
// 가로세로 배열의 길이, 이중 for 문
//---------------------------------
function renderSeat(seatArr) {
  const rows = seatArr.length;
  const cols = seatArr[0].length;
  container.style.setProperty('--cols', String(cols));

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

      //---------------------------------
      // 좌석 렌더링 초기 스타일
      // 조건 - RESERVED , SPECIAL
      //---------------------------------
      // 예약 불가능
      if (seatArr[i][j] === RESERVED) {
        seatElement.classList.add('reserved');
        seatElement.disabled = true; // 버튼 비활성화함
        seatElement.setAttribute('aria-label', `${seatName} 좌석 선택 불가`);

        // 예약 가능 장애인석[]선택 가능
      } else if (seatArr[i][j] === SPECIAL) {
        seatElement.classList.add('special');
        seatElement.setAttribute('aria-label', `장애인석 ${seatName} 선택 가능`);
        // 예약 가능[]일반석 선택 가능
      } else {
        seatElement.setAttribute('aria-label', `일반석 ${seatName} 좌석 선택 가능`);
      }

      //---------------------------------
      // 배열 사이 복도
      // left 2열, center 8열, right 2열
      //---------------------------------
      if (j < 2) {
        seatElement.style.gridColumn = j + 1;
      } else if (j >= 2 && j < 10) {
        seatElement.style.gridColumn = j + 2;
      } else {
        seatElement.style.gridColumn = j + 3;
      }
      container.appendChild(seatElement);

      //---------------------------------
      // 좌석 상태 클릭 이벤트
      //---------------------------------
      seatElement.addEventListener('click', () => {
        const selectedSeats = container.querySelectorAll('.selected');

        if (seatElement.classList.contains('selected')) {
          seatElement.classList.remove('selected');
        } else {
          if (selectedSeats.length < count) {
            seatElement.classList.add('selected');
          }
        }
        updateSelectedInfo();
        updateTotalPrice();
      });
    }
  }
}
//좌석 배열 출력
renderSeat(seatArr);

//---------------------------------
// 인원 버튼
// 최소,최대인원 설정 0 ~ 8명까지
//---------------------------------
const minusButton = document.querySelector('.minus-btn');
const plusButton = document.querySelector('.plus-btn');

// 인원 감소 버튼 (-)
minusButton.addEventListener('click', () => {
  if (count > MIN_COUNT) {
    count--;
    updateCount();
  } else {
    alert(`인원은 최소 ${MIN_COUNT}명부터 선택 가능합니다.`);
  }
});
// 인원 추가 버튼 (+)
plusButton.addEventListener('click', () => {
  if (count < MAX_COUNT) {
    count++;
    updateCount();
  } else {
    alert(`인원은 최대 ${MAX_COUNT}명까지 선택 가능합니다`);
  }
});

// 카운트 숫자 업데이트
function updateCount() {
  countValue.textContent = count;
  container.querySelectorAll('.selected').forEach((s) => s.classList.remove('selected'));
  updateSelectedInfo();
  updateTotalPrice();
}

// 선택된 좌석 업데이트
function updateSelectedInfo() {
  const selectedSeats = container.querySelectorAll('.selected');
  const seatNames = Array.from(selectedSeats).map((s) => s.textContent);

  if (seatNames.length > 0) {
    seatValueShow.textContent = seatNames.join(', ');
    seatValueShow.style.color = 'var(--color-text)';
  } else {
    seatValueShow.textContent = '좌석을 선택해주세요';
    seatValueShow.style.color = 'var(--color-muted)';
  }
}

// 총 결제금액 업데이트
function updateTotalPrice() {
  const selectedSeats = container.querySelectorAll('.selected');
  let totalPrice = 0;

  selectedSeats.forEach((seat) => {
    if (seat.classList.contains('special')) {
      totalPrice += 4000;
    } else {
      totalPrice += 14000;
    }
  });
  if (totalPriceShow) {
    totalPriceShow.textContent = totalPrice.toLocaleString();
  }
}

// 결제 화면으로 이동
goPaymentButton.addEventListener('click', () => {
  const selectedSeats = Array.from(container.querySelectorAll('.selected')).map(
    (seat) => seat.textContent
  );

  const totalPrice = Number(totalPriceShow.textContent.split(',').join(''));

  patchBookingState({
    seats: selectedSeats,
    price: totalPrice,
  });

  location.href = '/src/page/payment/index.html';
});
