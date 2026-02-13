//import { reservationAPI } from '../../apis/apiRequest.js';

// 이벤트 연결
// [✅] active 클래스 명 추가
// [✅] 할인/포인트 버튼 클릭시 화면 전환
// [] 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
// [✅] 폼 변환될 때 스타일링
// [] 폼 서식 버튼을 어떻게 구현해야 하는지
// [] 폼 서식에 해당 값 적용하기
// [] 폼 서식 포인트 입력 및 비밀번호 입력 양식에 맞춰서 제어할 수 있게
// [] 버튼 누르면 입력한 서식이 적용되게 하기
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
  removeAllActive(POINT_TABS, 'active');
  const target = e.target.closest('button');
  const targetValue = getAttr(target, 'aria-controls');
  const activeTarget = document.getElementById(targetValue);
  isActive(activeTarget);
  setAllAttr(LION_POINT_BUTTON, 'aria-selected', 'false');
  setAttr(target, 'aria-selected', 'true');
}

// 힐인/포인트 방법 버튼 속성 및 스타일링 변환 함수
function handleCouponList(e) {
  const target = e.target.closest('button');
  setAllAttr(COUPON_LIST_BUTTON, 'aria-selected', 'false');
  setAttr(target, 'aria-selected', 'true');
  removeAllActive(COUPON_LIST_BUTTON, 'active');
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

// 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게

// 할인/포인트 버튼 클릭시 화면 전환 이벤트
POINT_TAB.addEventListener('click', handleTabClick);

// 힐인/포인트 방법 버튼 속성 및 스타일링 변환 이벤트
COUPON_LIST.addEventListener('click', handleCouponList);

// 최종 결제 수단 클릭 시 버튼 속성 변환 이벤트
FINAL_PAYMENT.addEventListener('click', handleFinalPaymentButton);
