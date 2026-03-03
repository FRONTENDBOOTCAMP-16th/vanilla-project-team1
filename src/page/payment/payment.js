import { movieAPI } from '../../apis/apiRequest.js';
import { formatPrices } from '../../utils/commonUtility';
import { storage } from '../../utils/storage.js';
import { loadBookingState, patchBookingState, resetBookingState } from '../../state/movieState.js';
import { renderHeader } from '../../common/header/header.js';

// 초가 로드 및 가드 작업
const state = loadBookingState();
redirectPage(state);

function redirectPage(state) {
  const required = ['movieId', 'timetableId', 'seats', 'price'];
  if (state[required[0]] === null) {
    return (location.href = '/index.html');
  }

  if (state[required[1]] === null) {
    return (location.href = '/src/page/booking/index.html');
  }
  if (!state[required[2]] || state[required[2]].length === 0) {
    return (location.href = '/src/page/seat/index.html');
  }
  return;
}

// 결제 페이지 헤더 영역
const mount = document.getElementById('app-header');

renderHeader(mount, {
  showIcons: true,
  title: '주문/결제',
  onClickGoBackButton: () => {
    location.href = '/src/page/seat/index.html';
  },
});

// 영화 예매 정보 브라우저에 표시
const movie = await movieAPI.get(state.movieId);
const movieImg = movie.postUrl;
const loader = document.querySelector('.loader');

// 브라우저에 렌더링할 영화 이미지 만들기
function movieImgUi() {
  const img = document.createElement('img');
  img.src = movieImg;
  img.className = 'movie-img';
  img.alt = `${movie.title}`;
  return img;
}

// 해당 영화 이미지 Dom에 구현
function renderMovieImg(className, element) {
  const fragment = document.createDocumentFragment();
  const imgContainer = document.querySelector(className);

  fragment.appendChild(element);
  imgContainer.appendChild(fragment);

  // 로딩 아이콘 이미지가 뜨면 사라지기
  hideLoader(loader);
}
renderMovieImg('.img-container', movieImgUi());

// 로더 숨겨주는 함수
function hideLoader(element) {
  element.style.display = 'none';
}

// 결제 완료 후 전체 영역에 로더 넣어주는 함수
function showLoder(elment) {
  const fragment = document.createDocumentFragment();
  const paymentLoadingWrapper = document.createElement('div');
  const paymentLoading = document.createElement('span');
  paymentLoadingWrapper.classList.add('payment-wrapper');
  paymentLoading.classList.add('payment-loading', 'loader');
  attr(paymentLoading, 'role', 'status');
  attr(paymentLoading, 'aria-label', '로딩중');

  fragment.appendChild(paymentLoadingWrapper);
  paymentLoadingWrapper.appendChild(paymentLoading);
  elment.appendChild(fragment);

  addElClassName('main', 'body-blur');
  addElClassName('header', 'body-blur');
  addElClassName('footer', 'body-blur');
}

function addElClassName(element, className) {
  document.querySelector(element).classList.add(className);
}
// 영화 예매 내역 정보
// 예매 정보만 담은 함수
function createMovieInfoUi(movieData) {
  const { movieName, timetableName, theaterName, movieType, seats, timetable } = movieData;
  return `
  <h2 class="movie-title">${movieName}</h2>
  <ul class="js-component movie-info">
            <li><time datetime="${timetableName}"> 상영 시간 ${timetableName}</time></li>
            <li class ="theater-info">${theaterName} 7관, 수퍼LED(일반) - ${movieType}</li>
            <li><strong>인원 ${seats.length}명</strong></li>
            <li><strong>예매 좌석 ${seats} </strong></li>
          </ul>
 
  `;
}

// 담은 정보를 브라우저에 렌더링 해주는 함수
function renderMovieInfo(containerElement, state) {
  const container = document.querySelector(containerElement);
  if (!container) return;

  container.classList.add('info-text-content');
  container.innerHTML = createMovieInfoUi(state);
}
renderMovieInfo('.movie-info-container', state);

// 시용될 변수 이름 목록
const POINT_TAB = document.querySelector('.point-tab');
const POINT_TABS = document.querySelectorAll('.point-tabpanel');
const TAB_PANEL_CONTAINER = document.querySelector('.tabpanel-container');
const POINT_TABPANEL_2 = document.getElementById('panel-2');
const LION_POINT_BUTTON = document.querySelectorAll('.lion-point-button');
const COUPON_LIST = document.querySelector('.coupon-list');
const COUPON_LIST_BUTTON = document.querySelectorAll('.coupon-list button');
const FINAL_PAYMENT = document.querySelector('.final-payment');
const FINAL_PAYMENT_METHODS_BUTTON = document.querySelectorAll('.final-payment-methods button');
const POINT_INPUT_SUBMIT_BUTTON = document.getElementById('point-submit-button');
const CARD_NUMBER_SUBMIT_BUTTON = document.getElementById('card-number-submit-button');
const EARN_POINTS_METHOD_CHECKBOX = document.getElementById('earn-point');
const CHECKBOX_CONTAINER = document.querySelector('.earn-point-etc');
const PRODUCT_PRICE = document.querySelector('.js-component-product-price');
const DISCOUNT_PRICE = document.querySelector('.js-component-discount-price');
const TOTAL_PRICE = document.querySelector('.js-component-total-price');
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

// 해당 요소 토글 형태로 활성화 함수
function activeElAuth(elements, target) {
  const isAlreadyActive = target.classList.contains('active');
  setAllAttr(elements, 'aria-pressed', 'false');
  removeAllActive(elements, 'active');

  if (!isAlreadyActive) {
    setAttr(target, 'aria-pressed', 'true');
    isActive(target);
  }
}

// 속성 유틸리티 함수
function attr(element, attrName, attrValue) {
  if (attrValue === undefined) {
    return getAttr(element, attrName);
  }
  if (attrValue === null) {
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

// 2. 할인 포인트 탭 버튼 클릭 시 화면 전환되는 함수

// 탭 초기화 함수
function resetTabsState(tabs, buttons) {
  removeAllActive(tabs, 'active'); // 모든 버튼 활성화 초기화
  removeAllActive(buttons, 'active');
  setAllAttr(buttons, 'aria-selected', 'false'); // 모든 버튼 접근성 속성 초기화
  setAllAttr(tabs, 'hidden', '');
}

// 활성화 된 탭 속성 제어 함수
function activeTab(tab, activePanel) {
  isActive(tab);
  isActive(activePanel); // 해당되는 타켓에 active 클래스명 추가
  attr(tab, 'aria-selected', 'true');
  attr(tab, 'tabindex', '0'); // 해당되는 타켓에 상태 전환
  attr(activePanel, 'hidden', null); // 해당되는 타켓에 hidden 속성 삭제
}

// url searchParams 사용하여, 해당 탭 패널 id 저장 함수
function setActiveTabUrl(panel) {
  const url = new URL(location.href);
  const panelValue = getAttr(panel, 'aria-controls');

  url.searchParams.set('tab', panelValue);
  history.pushState({}, '', url.toString());
}

// 새로고침 시, 현재 페이지의 url의 활성화 탭을 그대로 읽어오는 함수
function resetTabUrl() {
  const resetUrl = new URL(location.href);
  const panelId = resetUrl.searchParams.get('tab'); //해당 panel 찾기
  const target = document.getElementById(panelId);
  if (!panelId) return;
  const targetValue = getAttr(target, 'aria-labelledby'); //해당 tab 찾기
  const activeTargetPanel = document.getElementById(targetValue);
  activeTab(target, activeTargetPanel);
}
resetTabUrl();

function handleTabClick(e) {
  if (!e.target.closest('.lion-point-button')) return;
  const target = e.target.closest('button'); // 부모요소에서 가장 가까운 버튼 찾기
  const targetValue = getAttr(target, 'aria-controls'); // 해당 속성값 읽기
  const activeTargetPanel = document.getElementById(targetValue);

  resetTabsState(POINT_TABS, LION_POINT_BUTTON);
  activeTab(target, activeTargetPanel);
  setActiveTabUrl(target, targetValue);
}

// 힐인/포인트 방법 버튼 속성 및 스타일링 변환 함수
function handleCouponList(e) {
  if (!e.target.closest('button')) return;
  const target = e.target.closest('button');
  activeElAuth(COUPON_LIST_BUTTON, target);
}

// 최종 결제 수단 클릭 시 버튼 속성 변환 및 결제 수단 상태 변경 함수
//paymentMethod 상태변경
let paymentMethod = null;
function handleFinalPaymentButton(e) {
  const target = e.target.closest('button');
  if (!target) return;
  activeElAuth(FINAL_PAYMENT_METHODS_BUTTON, target);

  paymentMethod = target.classList.contains('active') ? target.dataset.label : null;
}

// 3. 폼 서식 제어 함수들
// 폼 서식 포인트 입력 조건 미충족 시 알림창 나오게 하기
// + 100 단위로 쓸 수 있게 하기

// 패널 1/ 패널 2
function pointInputAuth(e) {
  e.preventDefault();
  if (!e.target) return;
  const form = e.target.closest('form');
  const target = form.querySelector('[data-point]');

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

// 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기

// 패널 1/패널 2 공통 함수
function cardPasswordAuth(e) {
  const form = e.target.closest('form');
  const target = form.querySelector('input[type="password"]');
  if (!target) return;
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
  const passwordValid = cardPasswordAuth(e);
  if (cardValid && passwordValid) {
    alert('적용 가능한 카드번호 입니다.');
  }
}

// 적용 버튼 누르면 입력한 서식이 적용되게 하기
// 패널 1
function validateAllPanel1(e) {
  e.preventDefault();
  const pointValue = document.querySelector('#point-input').value;
  if (!pointInputAuth(e)) return;
  const isValidDiscount = renderDiscountPrice(discountPrice(pointValue));
  if (!isValidDiscount) return;
  if (!cardPasswordAuth(e)) return;
  // 적용된 가격 표시
  renderTotalPrice();
  alert('포인트 할인이 적용되었습니다.');
}

//패널 2
function validateAllPanel2(e) {
  e.preventDefault();
  const currentPointValue = document.getElementById('use-current-point').value;
  if (!cardNumberAuth()) return;
  if (!cardPasswordAuth(e)) return;
  if (!pointInputAuth(e)) return;
  const isValidDiscount = renderDiscountPrice(discountPrice(currentPointValue));
  if (!isValidDiscount) return;
  // 적용된 가격 표시
  renderTotalPrice();
  alert('포인트 할인이 적용되었습니다.');
}

// 최대 적용 버튼 조건 충족 시 알림창 나오게 하기
function maximumPoint(e) {
  const target = e.target.closest('[data-target]');
  if (!target) return;
  e.preventDefault();
  const input = target.parentElement.querySelector('input');

  if (input.value === '' || input.value % 100 !== 0 || input.value === '0') {
    return alert('포인트 최대 적용 실패 ❌');
  }
  // 포인트 초과 여부 검증
  const isValidDiscount = renderDiscountPrice(discountPrice(input.value));
  if (!isValidDiscount) return;

  // 활성화된 패널의 비밀번호 인증 후에 할인 가격 적용
  if (!discountPriceAuth(e)) return;
  alert('포인트 최대 적용 완료 ✅');

  // 총 가격 푸터에 즉시 표시
  renderTotalPrice();
}

// 4. 체크 박스 체크 제어 함수
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

// 5. 금액 계산/표기 로직 함수
// 기본 상품 가격 표시
const productPriceValue = (PRODUCT_PRICE.textContent = formatPrices(state.price)); // 브라우저에 보이는 가격 (문자열)
const productPrice = Number(state.price); //데이터에 보낼 상품 가격

// 할인 티켓 가격 관련 함수
// 할인된 티켓 가격 반환
function discountPrice(value) {
  const discount = Number(value);
  if (isNaN(discount)) return 0;
  return Math.max(0, discount);
}

// 할인된 티켓 가격 DOM 표시
function renderDiscountPrice(value) {
  const discount = discountPrice(value);
  if (discount > productPrice) {
    alert('할인 금액이 결제 금액을 초과하였습니다. 포인트를 다시 적용하세요');
    DISCOUNT_PRICE.textContent = formatPrices(0);
    resetForm();
    return false;
  }
  DISCOUNT_PRICE.textContent = formatPrices(discount);
  return true;
}

// 현재 어떤 패널이 활성화되어 있는지 확인한 후 검증
function discountPriceAuth(e) {
  const isPanel1Active = POINT_TABS[0].classList.contains('active');
  const isPanel2Active = POINT_TABS[1].classList.contains('active');

  if (!isPanel1Active && !isPanel2Active) return;
  if (isPanel1Active) {
    if (!cardPasswordAuth(e)) return false;
    return true;
  }

  if (isPanel2Active) {
    if (!cardNumberAuth()) return false;
    if (!cardPasswordAuth(e)) return false;
    return true;
  }
}

// 총 예매 티켓 가격
// 총 금액 계산용 함수
function totalPriceCal() {
  const discountPriceValue = DISCOUNT_PRICE.textContent;
  if (discountPriceValue === '') {
    return Number(productPriceValue.replace(/,/g, ''));
  } else {
    return (
      Number(productPriceValue.replace(/,/g, '')) - Number(discountPriceValue.replace(/,/g, ''))
    );
  }
}

// 총 금액 DOM에 표시
function renderTotalPrice() {
  const total = totalPriceCal();
  return (TOTAL_PRICE.textContent = `${formatPrices(total)} `);
}
renderTotalPrice();

// 취소 버튼 클릭 시 적용된 할인 금액 초기화 함수
function handlePointReset(e) {
  const target = e.target.closest('button[type="reset"]');
  if (!target) return;

  discountPrice(0);
  totalPriceCal();
  alert('포인트 적용이 해제되었습니다.');
}

// 6. 결제하기 요청 함수
// 스토리지 객체 생성 (이전 페이지에서 받아온 고정적인 데이터 모으기)

const storageData = {
  ...state,
};

async function loadReservation() {
  try {
    if (!storageDataAuth(storageData)) return;
    changeButtonState(PAY_BUTTON, 'true');
    await paymentSucess();
  } catch (e) {
    console.error('에러내용:', e);
    const retryPayment = confirm('결제에 실패하였습니다. 재시도하시겠습니까?');
    if (retryPayment) return;
  } finally {
    changeButtonState(PAY_BUTTON, 'false');
  }
}

// 데이터 검증
function storageDataAuth(data) {
  if (paymentMethod === null) {
    alert('최종 결제 수단을 선택하세요');
    return false;
  }

  data.paymentMethod = paymentMethod;
  data.totalPrice = totalPriceCal();
  storageData.price = Number(productPrice);
  return true;
}
// 버튼 상태 변경
function changeButtonState(element, state) {
  attr(element, 'aria-pressed', state);
}
// 결제처리,상태 리셋,
async function paymentSucess() {
  await patchBookingState(storageData);

  alert(`결제 완료되었습니다.`);
  resetBookingState();
  showLoder(document.body);
  movePage('/index.html');
}

//  페이지 이동
function movePage(page) {
  setTimeout(() => {
    location.href = page;
  }, 500);
}

// 7. 폼 초기화 함수
function resetForm() {
  const target = document.querySelector('.point-tabpanel.active form');
  if (!target) return;
  target.reset();
}

// 🙆‍♀️ 예매 티켓 결제 페이지 내부에 연결된 이벤트 🙆‍♀️
// 할인/포인트 버튼 클릭시 화면 전환 이벤트
POINT_TAB.addEventListener('click', handleTabClick);

// 할인/포인트 방법 버튼 속성 및 스타일링 변환 이벤트
COUPON_LIST.addEventListener('click', handleCouponList);

// 패널 2 조회 버튼 클릭 시, 조건이 충족이면 적용되었다는 알림창이 나오는 이벤트
POINT_TABPANEL_2.addEventListener('click', cardAuth);

// 폼 서식 충족 값 입력 후 적용 버튼 누르면 알림창 나오게 하는 이벤트
// 패널 1
POINT_INPUT_SUBMIT_BUTTON.addEventListener('click', validateAllPanel1);
// 패널 2
CARD_NUMBER_SUBMIT_BUTTON.addEventListener('click', validateAllPanel2);

// 폼 서식 패널 1, 2에서 최대 적용 조건 충족 시 알림 메시지 나오게 하는 이벤트
TAB_PANEL_CONTAINER.addEventListener('click', maximumPoint);

// 취소 버튼을 클릭했을 때 작성한 내용들이 없어지는 이벤트
POINT_TAB.addEventListener('click', handlePointReset);

// 최종 결제 수단 클릭 시 버튼 속성 변환 이벤트
FINAL_PAYMENT.addEventListener('click', handleFinalPaymentButton);

// 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게
EARN_POINTS_METHOD_CHECKBOX.addEventListener('change', checkboxAuth);

// 결제하기 버튼 누르면 객체 형태로 결제 수단 방식과 총 예매 티켓 가격 데이터를 post 함수 body 부분에 넣어주기
PAY_BUTTON.addEventListener('click', loadReservation);
