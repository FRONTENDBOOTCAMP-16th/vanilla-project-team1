import { seatAPI } from '../../apis/apiRequest.js';
import { patchBookingState, loadBookingState } from '../../state/movieState.js';

//---------------------------------
// 예매 정보 데이터 연결
//---------------------------------
// 데이터 불러오기
const state = loadBookingState();

function renderBookingHeader() {
  if (!state) return;

  // 중단 마크업에 데이터 넣어줌
  const movieNameElement = document.querySelector('.selected-details-wrapper .movie-name');
  const timeElement = document.querySelector('.selected-details-wrapper time');
  const siteElement = document.querySelector('.selected-details-wrapper .site');
  const hallElement = document.querySelector('.selected-details-wrapper .hall');

  if (movieNameElement && timeElement && siteElement && hallElement) {
    const movieName = state.movieName || '영화 제목 정보 없음';
    const date = state.date || '2026.02.13(금)'; // 임시로 날짜 넣어줌
    const theaterName = state.theaterName || '극장 정보 없음';
    const movieType = state.movieType || '';
    const timeTableName = state.date || '';

    // 내 태그에 데이터 붙이기
    movieNameElement.textContent = state.movieName;
    timeElement.textContent = state.date; // 날짜 불러오기 아직 설정안됨
    siteElement.textContent = state.theaterName;
    hallElement.textContent = `${state.timeTableName || ''} ${state.movieType || ''}`;
  }
}
// 데이터 호출 !!
renderBookingHeader();

//---------------------------------
// 좌석 렌더링 데이터 연결
//---------------------------------
async function loadSeats() {
  try {
    const seats = await seatAPI.list();
    if (seats && seats.length > 0) {
      renderSeat(seats[0].seatData);
    }
  } catch (e) {
    // console.error(e);
  }
}
loadSeats();
// import { searchForWorkspaceRoot } from 'vite';

// 좌석 렌더링 주석 처리
// const seatArr = [
//   // A
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // B
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//   ],
//   // C
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // D
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // E
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // F
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // G
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//   ],
//   // H
//   [
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // I
//   [
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//   ],
//   // J
//   [
//     SPECIAL,
//     SPECIAL,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     AVAILABLE,
//     RESERVED,
//     RESERVED,
//     AVAILABLE,
//     SPECIAL,
//     SPECIAL,
//   ],
// ];

//---------------------------------
// 상수, 변수 선언
//---------------------------------
const AVAILABLE = 1;
const RESERVED = 2;
const SPECIAL = 3;

const container = document.querySelector('.seat-area');
const countValue = document.querySelector('.count-value');
const MIN_COUNT = 1;
const MAX_COUNT = 8;
let count = MIN_COUNT;

const seatValueShow = document.querySelector('.info-item .value');
const totalPriceShow = document.querySelector('.total-price strong');

const goPaymentButton = document.querySelector('.go-payment');

//---------------------------------
// 좌석 렌더링 - 가로세로 배열의 길이, 이중 for 문
// (2차원 배열) 12열 11행
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

        // 예약 가능 장애인석[] 선택 가능
      } else if (seatArr[i][j] === SPECIAL) {
        seatElement.classList.add('special');
        seatElement.setAttribute('aria-label', `장애인석 ${seatName} 선택 가능`);
        // 예약 가능 일반석[] 선택 가능
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
        togglePaymentsection();
      });
    }
  }
}
// 좌석 배열 출력 주석처리
// renderSeat(seatArr);

//---------------------------------
// 인원, 좌석 업데이트
//---------------------------------
// 인원 버튼 (최소1 최대8)
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

// 인원수 카운트 업데이트
function updateCount() {
  countValue.textContent = count;
  container.querySelectorAll('.selected').forEach((s) => s.classList.remove('selected'));
  updateSelectedInfo();
  updateTotalPrice();
  togglePaymentsection();
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

//---------------------------------
// 결제 섹션
//---------------------------------
// 숨겨두기 기능 추가 - 활성화 될때 보여주기
function togglePaymentsection() {
  const currentSelected = container.querySelectorAll('.selected').length;
  const paymentsection = document.querySelector('.payment-section');

  console.log('현재선택된 모든좌석:', currentSelected); // 콘솔에 찍어보기
  console.log('인원수:', count);

  if (currentSelected === count) {
    console.log('active 추가됨');
    paymentsection.classList.add('active');
  } else {
    paymentsection.classList.remove('active');
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

// 결제 화면으로 이동(데이터 객체화 연결)
goPaymentButton.addEventListener('click', () => {
  const selectedSeats = Array.from(container.querySelectorAll('.selected')).map(
    (seat) => seat.textContent
  );

  const totalPrice = Number(totalPriceShow.textContent.split(',').join(''));

  patchBookingState({
    ...state,
    seats: selectedSeats,
    price: totalPrice,
  });

  location.href = '/src/page/payment/index.html';
});
