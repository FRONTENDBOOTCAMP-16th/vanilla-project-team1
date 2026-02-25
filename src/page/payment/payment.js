// 이벤트 연결
// [✅] active 클래스 명 추가
// [✅] 할인/포인트 버튼 클릭시 화면 전환
// [✅] 폼 변환될 때 스타일링
// [✅] 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// [✅] 폼 서식 포인트 입력 및 비밀번호 입력 양식에 맞춰서 제어할 수 있게 버튼 연결
// [✅] 폼 서식에 해당 값 적용하기 (해당 포인트 입력하고 적용 버튼 누르면 푸터 결제 영역에 보이게 하기)
// [✅] 할인 및 포인트 적립 버튼 접근성 속성 변환
// [✅] 버튼 클릭 시 아리아 속성 전환
// [✅] 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게

// 데이터 받아와야 할 것들
// [] 영화 예매 정보(이미지, 상영날짜, 상영관,인원)
// [] 최종 결제 금액(할인율이 적용된)
// -> 최종 결제 금액은 데이터에서 받아오고, 할인율은 할인 및 포인트 섹션의 할인율 데이터와 연결

import { movieAPI } from '../../apis/apiRequest.js';
import { formatPrices } from '../../utils/commonUtility';
import { loadBookingState, patchBookingState, resetBookingState } from '../../state/movieState.js';
import { renderHeader } from '../../common/header/header.js';

// 초가 로드 및 가드 작업
const state = loadBookingState();
const { price, movieId, timetableId, seats, timetable } = state;
loadBookingState();
redirectPage();

function redirectPage() {
  if (movieId === null) {
    location.href = '/src/page/main/index.html';
  } else if (timetableId === null) {
    location.href = '/src/page/booking/index.html';
  } else if (!seats || seats.length === 0) {
    location.href = '/src/page/seat/index.html';
  } else return;
}

// 영화 예매 정보 브라우저에 표시
const movie = await movieAPI.get(movieId);
const movieImg = movie.postUrl;
const loader = document.querySelector('.loader');

// 영화 이미지
function renderMovieImg() {
  const fragment = document.createDocumentFragment();
  const imgContainer = document.querySelector('.img-container');
  const img = document.createElement('img');
  img.src = movieImg;
  img.className = 'movie-img';
  img.alt = '영화 포스터';
  fragment.appendChild(img);
  imgContainer.appendChild(fragment);
  // 로딩 아이콘 이미지가 뜨면 사라지기
  loader.style.display = 'none';
}
renderMovieImg();

// 영화 예매 내역 정보
function renderMovieInfo() {
  const infoTextContent = document.createElement('div');
  const movieInfoContainer = document.querySelector('.movie-ticket-payment-info');
  infoTextContent.className = 'info-text-content';
  infoTextContent.innerHTML = `
  <h2 class="movie-title">${state.movieName}</h2>
  <ul class="js-component movie-info">
            <li><time datetime="2026-02-10T21:15">${state.timetableName}</time></li>
            <li>${state.theaterName} 7관, 수퍼LED(일반) - ${state.movieType}</li>
            <li><strong>인원 ${state.seats.length}명</strong></li>
            <li><strong>예매 좌석 ${state.seats} </strong></li>
          </ul>
 
  `;

  //  <ul class="js-component movie-info">
  //    <li>
  //      <time datetime="${timetable[0].date}">
  //        ${timetable[0].startTime} ~ ${timetable[0].endTime}
  //      </time>
  //    </li>
  //    <li>
  //      ${state.theaterName} ${timetable[0].screenName}, ${timetable[0].format}, ${timetable[1].tags}
  //    </li>
  //    <li>
  //      <strong>인원 ${state.seats.length}명</strong>
  //    </li>
  //  </ul>;
  movieInfoContainer.appendChild(infoTextContent);
}
renderMovieInfo();

// 시용될 변수 이름 목록
const POINT_TAB = document.querySelector('.point-tab');
const POINT_TABS = document.querySelectorAll('.point-tabpanel');
const POINT_TABPANEL_2 = document.getElementById('panel-2');
const CARD_POINT_PASSWORD = document.getElementById('card-point-password');
const CARD_NUMBER_PASSWORD = document.getElementById('card-number-password');
const LION_POINT_BUTTON = document.querySelectorAll('.lion-point-button');
const COUPON_LIST = document.querySelector('.coupon-list');
const COUPON_LIST_BUTTON = document.querySelectorAll('.coupon-list button');
const FINAL_PAYMENT = document.querySelector('.final-payment');
const FINAL_PAYMENT_METHODS_BUTTON = document.querySelectorAll('.final-payment-methods button');
const POINT_INPUT_DATA_BUTTON = document.querySelector('.point-input-container button');
const CURRENT_POINT_INPUT_BUTTON = document.querySelector('.current-point-input button');
const POINT_INPUT_SUBMIT_BUTTON = document.getElementById('point-submit-button');
const CARD_NUMBER_SUBMIT_BUTTON = document.getElementById('card-number-submit-button');
const EARN_POINTS_METHOD_CHECKBOX = document.getElementById('earn-point');
const CHECKBOX_CONTAINER = document.querySelector('.earn-point-etc');
const PRODUCT_PRICE = document.querySelector('.js-component-product-price');
const DISCOUNT_PRICE = document.querySelector('.js-component-discount-price');
const TOTAL_PRICE = document.querySelector('.js-component-total-price');
const FOOTER = document.querySelector('.final-payment-calculation');
const PAY_BUTTON = document.querySelector('.pay-button');

// 1. 요소의 상태 변환 함수들
// 모든 요소의 active 클래스 네임 제거 함수
function removeAllActive(elements, attrValue) {
  for (const item of elements) {
    item.classList.remove(attrValue);
  }
}
// 모든 요소의 속성 설정 함수
function setAllAttr(elements, attrName, attrValue) {
  for (const item of elements) {
    setAttr(item, attrName, attrValue);
  }
}
// 활성화 클래스명 추가 함수
function isActive(element) {
  if (!element) return;
  element.classList.add('active');
}

// 속성 유틸리티 함수
function attr(element, attrName, attrValue) {
  if (attrValue === undefined) {
    return getAttr(element, attrName);
  }
  if (attrName === null) {
    return removeAttr(element, attrName);
  }
  return setAttr(element, attrName, attrValue);
}

function getAttr(element, attrName) {
  const attrValue = element.getAttribute(attrName);
  return attrValue;
}

function setAttr(element, attrName, attrValue) {
  if (!element) return;
  element.setAttribute(attrName, attrValue);
}

function removeAttr(element, attrName) {
  return element.removeAttribute(attrName);
}

// 할인 포인트 버튼 클릭 시 화면 전환되는 함수
function handleTabClick(e) {
  if (!e.target.closest('.lion-point-button')) return;
  removeAllActive(POINT_TABS, 'active'); // 모든 버튼 활성화 초기화
  removeAllActive(LION_POINT_BUTTON, 'active');
  setAllAttr(LION_POINT_BUTTON, 'aria-selected', 'false'); // 모든 버튼 접근성 속성 초기화
  const target = e.target.closest('button'); // 부모요소에서 가장 가까운 버튼 찾기
  const targetValue = getAttr(target, 'aria-controls'); // 해당 속성값 읽기
  const activeTarget = document.getElementById(targetValue);
  isActive(target);
  isActive(activeTarget); // 해당되는 타켓에 active 클래스명 추가
  setAttr(target, 'aria-selected', 'true'); // 해당되는 타켓에 상태 전환
}

// 힐인/포인트 방법 버튼 속성 및 스타일링 변환 함수
function handleCouponList(e) {
  if (!e.target.closest('button')) return;
  const target = e.target.closest('button');
  setAllAttr(COUPON_LIST_BUTTON, 'aria-pressed', 'false');
  removeAllActive(COUPON_LIST_BUTTON, 'active');
  setAttr(target, 'aria-pressed', 'true');
  isActive(target);
}

// 최종 결제 수단 클릭 시 버튼 속성 변환 및 결제 수단 상태 변경 함수
// 결제 방법 변수 선언

//paymentMethod 상태변경
let paymentMethod = null;
function handleFinalPaymentButton(e) {
  const target = e.target.closest('button');
  if (!target) return;
  setAllAttr(FINAL_PAYMENT_METHODS_BUTTON, 'aria-pressed', 'false');
  setAttr(target, 'aria-pressed', 'true');
  removeAllActive(FINAL_PAYMENT_METHODS_BUTTON, 'active');
  isActive(target);
  paymentMethod = target.dataset.label;
}

// 2. 폼 서식 제어 함수들
// 폼 서식 포인트 입력 조건 미충족 시 알림창 나오게 하기
// + 100 단위로 쓸 수 있게 하기
// 패널 1
function pointInputAuth(e) {
  if (!e.target) return;
  const target = document.querySelector('#point-input');
  let value = parseInt(target.value, 10);
  // 조건문 만들기
  // 거짓: 숫자가 아니면 알림창 뜨기
  // 참: 해당 값 표시
  if (isNaN(value) || value % 100 !== 0 || value === 0) {
    alert('100 단위로 포인트를 입력하세요');
    return false;
  }

  return value;
}
// 패널 2
function currentInputAuth(e) {
  if (!e.target) return;
  const target = document.getElementById('use-current-point');
  let value = parseInt(target.value, 10);
  // 조건문 만들기
  // 거짓: 숫자가 아니면 알림창 뜨기
  // 참: 해당 값 표시
  if (isNaN(value) || value % 100 !== 0 || value === 0) {
    alert('포인트를 100 단위로 입력하세요');
    return false;
  }
  return value;
}

// 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// 패널 1
function lionPointCardPasswordAuth() {
  const target = document.querySelector('#card-point-password');
  if (!target) return;
  if (target.value.length < 6 || target.value.length > 8) {
    alert('비밀번호를 6~8자리로 입력하세요');
    return false;
  } else {
    return target.value;
  }
}

//패널 2
function lionPointCardNumberPasswordAuth() {
  const target = document.getElementById('card-number-password');
  if (!target) return false;
  if (target.value.length < 6 || target.value.length > 8) {
    alert('비밀번호를 6~8자리로 입력하세요');
    return false;
  } else {
    return target.value;
  }
}

// 카드 번호로 조회 미충족시, 알림창 나오게 하기
function cardNumberAuth() {
  const target = document.getElementById('number-input');
  if (!target) return false;
  const value = target.value.length;
  if (value < 17) {
    alert('카드번호 16자리를 입력하세요');
    return false;
  }
  return true;
}

// 폼 서식에 해당 값 적용하기
// 조회 버튼 클릭 시, 조건이 충족이면 적용되었다는 알림창 나오게 하기
function cardAuth(e) {
  const target = e.target.closest('#card-details');
  if (!target) return;
  e.preventDefault();
  const cardValid = cardNumberAuth();
  const passwordValid = lionPointCardNumberPasswordAuth();
  if (cardValid && passwordValid) {
    alert('적용 가능한 카드번호 입니다.');
  }
}

// 적용 버튼 누르면 입력한 서식이 적용되게 하기
// 패널 1
function validateAllPanel1(e) {
  e.preventDefault();
  const pointValue = document.querySelector('#point-input').value;
  if (pointInputAuth(e) && lionPointCardPasswordAuth(e)) {
    alert('포인트 할인이 적용되었습니다.');
    // 적용된 가격 표시
    discountPrice(pointValue);
    totalPriceCal();
  }
}

//패널 2
function validateAllPanel2(e) {
  e.preventDefault();
  const currentPointValue = document.getElementById('use-current-point').value;
  if (cardNumberAuth() && lionPointCardNumberPasswordAuth(e) && currentInputAuth(e)) {
    alert('포인트 할인이 적용되었습니다.');
    // 적용된 가격 표시
    discountPrice(currentPointValue);
    totalPriceCal();
  }
}

// 최대 적용 버튼 조건 충족 시 알림창 나오게 하기
function maximumPoint(e) {
  const target = e.target.closest('[data-value="maximum-point"]');
  if (!target) return;
  const input = target.parentElement.querySelector('input');
  e.preventDefault();
  if (input.value === '' || input.value % 100 !== 0 || input.value === '0') {
    return alert('포인트 최대 적용 실패 ❌');
  }
  alert('포인트 최대 적용 완료 ✅');

  // 할인 가격 푸터에  즉시 표시
  discountPrice(input.value);
  // 총 가격 푸터에 즉시 표시
  totalPriceCal();
}

// 3. 체크 박스 체크 제어 함수
function checkboxAuth() {
  const checked = EARN_POINTS_METHOD_CHECKBOX.checked;
  const ALL_EARN_POINTS = CHECKBOX_CONTAINER.querySelectorAll('input[type= "checkbox"]');

  if (!checked) {
    for (const point of ALL_EARN_POINTS) {
      setAttr(point, 'disabled', 'true');
      removeAttr(point, 'checked');
    }
  } else {
    for (const point of ALL_EARN_POINTS) {
      removeAttr(point, 'disabled');
    }
  }
}

// 4. 금액 계산/표기 로직 함수

// 할인된 티켓 가격
function discountPrice(value) {
  if (!isNaN(value)) {
    return (DISCOUNT_PRICE.textContent = Number(value).toLocaleString());
  }
}
// 총 예매 티켓 가격
// 기본 가격 표시
const productPriceValue = (PRODUCT_PRICE.textContent = formatPrices(price));
// 총 가격 변수 선언
let totalPriceValue = null;
function totalPriceCal() {
  const discountPriceValue = DISCOUNT_PRICE.textContent;
  if (discountPriceValue === '') {
    totalPriceValue = Number(productPriceValue.replace(/,/g, ''));
    return (TOTAL_PRICE.textContent = `${formatPrices(totalPriceValue)} `);
  } else {
    totalPriceValue =
      Number(productPriceValue.replace(/,/g, '')) - Number(discountPriceValue.replace(/,/g, ''));
    return (TOTAL_PRICE.textContent = `${formatPrices(totalPriceValue)} `);
  }
}
totalPriceCal();

// 5. 결제하기 요청 함수

// 스토리지 객체 생성 (이전 페이지에서 받아온 고정적인 데이터 모으기)

const storageData = {
  ...state,
};

async function loadReservation() {
  try {
    // 결제 버튼 클릭 시 유효성 검사
    // 비밀번호 입력해야 포인트 적용된 가격 결제 가능
    // 최종 결제 수단 선택해야 결제 가능
    if (CARD_POINT_PASSWORD.value || CARD_NUMBER_PASSWORD.value === '') {
      return alert('포인트 적용 시 비밀번호를 입력하세요');
    }
    if (paymentMethod === null) {
      alert('최종 결제 수단을 선택하세요');
      return;
    }
    storageData.paymentMethod = paymentMethod;
    storageData.totalPrice = totalPriceValue;

    // 상품 금액이 이전 페이지에서 저장되지 않았을 경우
    storageData.price = productPriceValue;
    patchBookingState(storageData);
    console.log(storageData);
    alert(`결제 완료되었습니다.`);
    resetBookingState(storageData);
    location.href = '/src/page/main/index.html';
  } catch (e) {
    console.error('에러내용:', e);
    const retryPayment = confirm('결제에 실패하였습니다. 재시도하시겠습니까?');
    if (retryPayment) return;
  }
}

// 결제 버튼 aria-pressed 속성 변경 함수
function payButtonState(e) {
  const target = e.target.closest('button');
  if (!target) return;
  attr(PAY_BUTTON, 'aria-pressed', 'true');
}

// 🙆‍♀️ 예매 티켓 결제 페이지 내부에 연결된 이벤트 🙆‍♀️
// 할인/포인트 버튼 클릭시 화면 전환 이벤트
POINT_TAB.addEventListener('click', handleTabClick);

// 할인/포인트 방법 버튼 속성 및 스타일링 변환 이벤트
COUPON_LIST.addEventListener('click', handleCouponList);

// 폼 서식 포인트 입력에 연결될 버튼 이벤트
POINT_INPUT_DATA_BUTTON.addEventListener('click', pointInputAuth);
CURRENT_POINT_INPUT_BUTTON.addEventListener('click', currentInputAuth);

// 패널 2 조회 버튼 클릭 시, 조건이 충족이면 적용되었다는 알림창이 나오는 이벤트
POINT_TABPANEL_2.addEventListener('click', cardAuth);

// 폼 서식 충족 값 입력 후 적용 버튼 누르면 알림창 나오게 하는 이벤트
// 패널 1
POINT_INPUT_SUBMIT_BUTTON.addEventListener('click', validateAllPanel1);
// 패널 2
CARD_NUMBER_SUBMIT_BUTTON.addEventListener('click', validateAllPanel2);

// 폼 서식 패널 1, 2에서 최대 적용 조건 충족 시 알림 메시지 나오게 하는 이벤트
POINT_TAB.addEventListener('click', maximumPoint);

// 최종 결제 수단 클릭 시 버튼 속성 변환 이벤트
FINAL_PAYMENT.addEventListener('click', handleFinalPaymentButton);

// 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게
EARN_POINTS_METHOD_CHECKBOX.addEventListener('change', checkboxAuth);

// 결제하기 버튼 누르면 객체 형태로 결제 수단 방식과 총 예매 티켓 가격 데이터를 post 함수 body 부분에 넣어주기
PAY_BUTTON.addEventListener('click', loadReservation);

// 결제 요청 버튼 클릭시 접근 속성 변경
FOOTER.addEventListener('click', payButtonState);
