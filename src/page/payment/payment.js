//import { reservationAPI } from '../../apis/apiRequest.js';

// 이벤트 연결
// [✅] active 클래스 명 추가
// [✅] 할인/포인트 버튼 클릭시 화면 전환
// [✅] 폼 변환될 때 스타일링
// [✅] 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// [✅] 폼 서식 포인트 입력 및 비밀번호 입력 양식에 맞춰서 제어할 수 있게 버튼 연결
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
const POINT_TABPANEL_1 = document.getElementById('panel-1');
const POINT_TABPANEL_2 = document.getElementById('panel-2');
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
const CARD_NUMBER_INPUT_CONTAINER = document.querySelector('.card-number-input-container');
const POINT_INPUT_SUBMIT_BUTTON = document.getElementById('point-submit-button');
const POINT_INPUT_RESET_BUTTON = document.getElementById('point-reset-button');
const CARD_NUMBER_SUBMIT_BUTTON = document.getElementById('card-number-submit-button');
const CARD_NUMBER_RESET_BUTTON = document.getElementById('card-number-reset-button');

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
  if (!e.target.closest('.lion-point-button')) return;
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
  const passwordValue = document.querySelector('#card-point-password').value;
  if (pointInputAuth(e) && lionPointCardPasswordAuth(e)) {
    alert('포인트 할인이 적용되었습니다.');
    console.log('적용한 포인트 값:', pointValue, '입력한 비밀번호:', passwordValue);
  }
}

//패널 2
function validateAllPanel2(e) {
  e.preventDefault();
  const numberValue = document.getElementById('number-input').value;
  const cardPasswordValue = document.getElementById('card-number-password').value;
  const currentPointValue = document.getElementById('use-current-point').value;
  if (cardNumberAuth() && lionPointCardNumberPasswordAuth(e) && currentInputAuth(e)) {
    alert('포인트 할인이 적용되었습니다.');
    console.log(
      `카드번호:${numberValue}, 카드비밀번호: ${cardPasswordValue}, 현재 적용한 포인트:${currentPointValue}`
    );
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
  console.log('적용된 최대 포인트:', input.value);
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

// 폼 서식 최대 적용 조건 충족 시 알림 메시지 나오게 하는 이벤트
POINT_TAB.addEventListener('click', maximumPoint);

// 최종 결제 수단 클릭 시 버튼 속성 변환 이벤트
FINAL_PAYMENT.addEventListener('click', handleFinalPaymentButton);

// 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게
