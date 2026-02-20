import { movieAPI } from '../../apis/apiRequest.js';

async function loadMovies() {
  try {
    const data = await movieAPI.list();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

loadMovies();

const cardList = document.querySelector('.card-list');
const cards = Array.from(cardList.querySelectorAll('.card-item'));

setActive(cards[0]);

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

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const card = e.target.closest('.card-item');
    if (!card) return;
    setActive(card);

    requestAnimationFrame(() => scrollCardToCenter(card));
  });
});

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

cards.forEach((c) => io.observe(c));
