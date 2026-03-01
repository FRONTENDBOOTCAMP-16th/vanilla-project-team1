import { movieAPI } from '../../apis/apiRequest.js';
import { renderHeader } from '../../common/header/header.js';
import '../../common/header/header.css';
import { loadBookingState, patchBookingState, resetBookingState } from '../../state/movieState.js';

const state = loadBookingState();
console.log(state);

const mount = document.getElementById('app-header');

renderHeader(mount, {
  showIcons: false,
  title: '예매의 정석',
  onClickGoBackButton: () => {
    location.href = '/src/page/booking/index.html';
  },
});

const cardList = document.querySelector('.card-list');
let cards = [];

function scrollCardToCenter(card) {
  const cardListRect = cardList.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const styles = getComputedStyle(cardList);
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const paddingRight = parseFloat(styles.paddingRight) || 0;

  const contentLeft = cardListRect.left + paddingLeft;
  const contentWidth = cardListRect.width - paddingLeft - paddingRight;
  const contentCenter = contentLeft + contentWidth / 2;

  const cardCenter = cardRect.left + cardRect.width / 2;

  const delta = cardCenter - contentCenter;
  cardList.scrollBy({ left: delta, behavior: 'smooth' });
}

function setActive(el) {
  cards.forEach((c) => c.classList.remove('is-focus'));
  el.classList.add('is-focus');
}

const io = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target);
  },
  {
    root: cardList,
    threshold: [0.5, 0.6, 0.7, 0.8],
  }
);

function renderMovieCard(movieList) {
  movieList.forEach((v, index) => {
    const cardEl = document.createElement('li');
    cardEl.className = 'card-item';
    if (index === 0) {
      cardEl.classList.add('is-focus');
    }
    const cardWrapperEl = document.createElement('div');
    cardWrapperEl.className = 'card-button-wrapper';

    const ggimButtonEl = document.createElement('button');
    ggimButtonEl.className = 'ggim-button';
    ggimButtonEl.type = 'button';
    ggimButtonEl.innerHTML = `<span class="sr-only">찜하기</span>
                  <svg
                    stroke="#ff4d6d"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      aria-hidden="true"
                      d="M8.08358 3.50946C7.78572 3.35261 7.47006 3.22982 7.1425 3.1441C6.5255 2.98263 5.88088 2.95651 5.25283 3.06752C4.62479 3.17853 4.02819 3.42404 3.50392 3.78723C2.97966 4.15042 2.54014 4.62269 2.2155 5.17166C1.89086 5.72063 1.68878 6.33332 1.62311 6.96771C1.55745 7.60209 1.62976 8.24318 1.83507 8.847C2.04039 9.45083 2.3893 10.07 3.10109 10.8789C3.81288 11.6877 9.73112 17.4249 9.73112 17.4249C9.73112 17.4249 16.1683 11.5994 16.8726 10.8789C17.5768 10.1584 17.9588 9.45083 18.1641 8.847C18.3695 8.24318 18.4418 7.60209 18.3761 6.96771C18.3104 6.33332 18.1084 5.72063 17.7837 5.17166C17.4591 4.62269 17.0196 4.15042 16.4953 3.78723C15.971 3.42404 15.3744 3.17853 14.7464 3.06752C14.1183 2.95651 13.4737 2.98263 12.8567 3.1441C12.2397 3.30556 11.6649 3.59855 11.1718 4.00297C10.9895 4.15243 10.82 4.3158 10.6646 4.49134L7.44094 8.15367"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                    />
                  </svg>`;

    const posterEl = document.createElement('img');
    posterEl.src = v.postUrl;
    posterEl.alt = `${v.title} 포스터 이미지`;

    const titleWrapperEl = document.createElement('div');
    titleWrapperEl.className = 'card-title-wrapper';
    const titleEl = document.createElement('h2');
    titleEl.textContent = v.title;
    titleWrapperEl.appendChild(titleEl);

    const metaWrapperEl = document.createElement('div');
    metaWrapperEl.className = 'card-movie-meta-wrapper';
    metaWrapperEl.innerHTML = `<span>${v.ratingAge}세</span>
                <span>상영시간 ${v.runtime}분</span>
                <span>좋아요 ${v.likeCount}개</span>`;

    const reservationButtonWrapper = document.createElement('div');
    reservationButtonWrapper.className = 'card-reservation-button-wrapper';
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.className = 'card-reservation-button';
    reservationButton.textContent = '예매하기';
    reservationButton.addEventListener('click', () => {
      resetBookingState();
      patchBookingState({
        userName: '바보',
        movieId: v.id,
      });
      location.href = '/src/page/booking/index.html';
    });
    reservationButtonWrapper.appendChild(reservationButton);

    cardWrapperEl.appendChild(ggimButtonEl);
    cardWrapperEl.appendChild(posterEl);

    cardEl.appendChild(cardWrapperEl);
    cardEl.appendChild(titleWrapperEl);
    cardEl.appendChild(metaWrapperEl);
    cardEl.appendChild(reservationButtonWrapper);
    cardList.appendChild(cardEl);
  });

  cards = Array.from(cardList.querySelectorAll('.card-item'));
  setActive(cards[0]);

  cards.forEach((c) => io.observe(c));

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const card = e.target.closest('.card-item');
      if (!card) return;
      setActive(card);

      requestAnimationFrame(() => scrollCardToCenter(card));
    });
  });
}

async function loadMovies() {
  try {
    const data = await movieAPI.list();
    console.log(data);
    renderMovieCard(data);
  } catch (e) {
    console.error(e);
  }
}

loadMovies();
