//import { reservationAPI } from '../../apis/apiRequest.js';

// 이벤트 연결
// [✅] active 클래스 명 추가
// [✅] 할인/포인트 버튼 클릭시 화면 전환
// [✅] 폼 변환될 때 스타일링
// [✅] 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// [] 폼 서식 포인트 입력 및 비밀번호 입력 양식에 맞춰서 제어할 수 있게 버튼 연결
// [] 폼 서식에 해당 값 적용하기 (해당 포인트 입력하고 적용 버튼 누르면 푸터 결제 영역에 보이게 하기)
// [✅] 할인 및 포인트 적립 버튼 접근성 속성 변환
// [✅] 버튼 클릭 시 아리아 속성 전환
// [] 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게

// 데이터 받아와야 할 것들
// [] 영화 예매 정보(이미지, 상영날짜, 상영관,인원)
// [] 최종 결제 금액(할인율이 적용된)
// -> 최종 결제 금액은 데이터에서 받아오고, 할인율은 할인 및 포인트 섹션의 할인율 데이터와 연결

const POINT_TAB = document.querySelector('.point-tab');
const POINT_TABS = document.querySelectorAll('.point-tabpanel');
const LION_POINT_BUTTON = document.querySelectorAll('.lion-point-button');
const COUPON_LIST = document.querySelector('.coupon-list');
const COUPON_LIST_BUTTON = document.querySelectorAll('.coupon-list button');
const FINAL_PAYMENT = document.querySelector('.final-payment');
const FINAL_PAYMENT_METHODS_BUTTON = document.querySelectorAll('.final-payment-methods button');
const CARD_POINT_PASSWORD_INPUT = document.getElementById('card-point-password');
const CARD_NUMBER_PASSWORD_INPUT = document.getElementById('card-number-password');
const POINT_INPUT_DATA = document.getElementById('point-input');
const CURRENT_POINT_INPUT_DATA = document.getElementById('use-current-point');
const POINT_INPUT_DATA_BUTTON = document.querySelector('.point-input-container button');
const CURRENT_POINT_INPUT_BUTTON = document.querySelector('.current-point-input button');

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
  return element.setAttribute(attrName, attrValue);
}

function removeAttr(element, attrName) {
  return element.removeAttribute(element, attrName);
}

// 할인 포인트 버튼 클릭 시 화면 전환되는 함수
function handleTabClick(e) {
  if (!e.target.closest('button')) return;
  removeAllActive(POINT_TABS, 'active'); // 모든 버튼 활성화 초기화
  setAllAttr(LION_POINT_BUTTON, 'aria-selected', 'false'); // 모든 버튼 접근성 속성 초기화
  const target = e.target.closest('button'); // 부모요소에서 가장 가까운 버튼 찾기
  const targetValue = getAttr(target, 'aria-controls');
  const activeTarget = document.getElementById(targetValue);
  isActive(activeTarget); // 해당되는 타켓에 active 클래스명 추가
  setAttr(target, 'aria-selected', 'true'); // 해당되는 타켓에 상태 전환
}

// 힐인/포인트 방법 버튼 속성 및 스타일링 변환 함수
function handleCouponList(e) {
  if (!e.target.closest('button')) return;
  const target = e.target.closest('button');
  setAllAttr(COUPON_LIST_BUTTON, 'aria-selected', 'false');
  removeAllActive(COUPON_LIST_BUTTON, 'active');
  setAttr(target, 'aria-selected', 'true');
  isActive(target);
}

// 최종 결제 수단 클릭 시 버튼 속성 변환 함수
function handleFinalPaymentButton(e) {
  const target = e.target.closest('button');
  setAllAttr(FINAL_PAYMENT_METHODS_BUTTON, 'aria-pressed', 'false');
  setAttr(target, 'aria-pressed', 'true');
  removeAllActive(FINAL_PAYMENT_METHODS_BUTTON, 'active');
  isActive(target);
}

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
  if (isNaN(value) || value % 100 !== 0) {
    alert('100 단위로 포인트를 입력하세요');
  }
  if (value % 100 === 0) {
    return value;
  }
}
// 패널 2
function currentInputAuth(e) {
  if (!e.target) return;
  const target = document.querySelector('#use-current-point');
  let value = parseInt(target.value, 10);
  // 조건문 만들기
  // 거짓: 숫자가 아니면 알림창 뜨기
  // 참: 해당 값 표시
  if (isNaN(value) || value % 100 !== 0) {
    alert('100 단위로 포인트를 입력하세요');
  }
  if (value % 100 === 0) {
    return value;
  }
}

// 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// 패널 1
function lionPointCardPasswordAuth(e) {
  const target = document.querySelector('#card-point-password');
  if (!e.target) return;
  if (target.value.length < 6 || target.value.length > 8) {
    alert('6~8자리로 입력하세요');
  } else {
    return target.value;
  }
}

//패널 2
function lionPointCardNumberPasswordAuth(e) {
  e.preventDefault();
  if (!e.target) return;
  const target = document.querySelector('#card-number-password');
  if (target.value.length < 6 || target.value.length > 8) {
    alert('6~8자리로 입력하세요');
  } else {
    return target.value;
  }
}

// 폼 서식에 해당 값 적용하기
// 버튼 누르면 입력한 서식이 적용되게 하기

// 예매 티켓 결제 페이지 내부에 연결된 이벤트
// 할인/포인트 버튼 클릭시 화면 전환 이벤트
POINT_TAB.addEventListener('click', handleTabClick);

// 할인/포인트 방법 버튼 속성 및 스타일링 변환 이벤트
COUPON_LIST.addEventListener('click', handleCouponList);

// 폼 서식에 조건에 충족하는 포인트 입력하는 이벤트
POINT_INPUT_DATA.addEventListener('change', pointInputAuth);
CURRENT_POINT_INPUT_DATA.addEventListener('change', currentInputAuth);

// 폼 서식 포인트 입력에 연결될 버튼 이벤트
POINT_INPUT_DATA_BUTTON.addEventListener('click', pointInputAuth);
CURRENT_POINT_INPUT_BUTTON.addEventListener('click', currentInputAuth);

// 폼 서식에 비밀번호 입력시 알림창 나오는 이벤트
// 패널 1
CARD_POINT_PASSWORD_INPUT.addEventListener('change', lionPointCardPasswordAuth);
// 패널 2
CARD_NUMBER_PASSWORD_INPUT.addEventListener('change', lionPointCardNumberPasswordAuth);

// 최종 결제 수단 클릭 시 버튼 속성 변환 이벤트
FINAL_PAYMENT.addEventListener('click', handleFinalPaymentButton);

// 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게
