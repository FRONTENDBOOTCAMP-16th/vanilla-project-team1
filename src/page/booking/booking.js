import { showtimeAPI } from '../../apis/apiRequest.js';

const container = document.querySelector('.movie-list');

function renderMovieList(movieList) {
  container.innerHTML = '';

  movieList.forEach((v) => {
    console.log(v);
    const article = document.createElement('article');
    article.classList.add('movie-card');

    const poster = document.createElement('img');
    poster.src = v.postUrl;
    poster.alt = v.movieName;
    poster.width = 100;
    poster.height = 150;

    const title = document.createElement('p');
    title.classList.add('movie-title');
    title.textContent = v.movieName;


    const timeList = document.createElement('div');
    timeList.classList.add('showtime-list');

    v.timeTable.forEach((table) => {
      const button = document.createElement('button');
      button.classList.add('show-time');

      button.innerHTML = `
      <span class="hall"><strong>${table.screenName}</strong></span>
              <span class="time"><strong>${table.startTime}</strong>~${table.endTime}</span>
              <span class="seats"><strong>${table.seatCount.available}</strong>/${table.seatCount.total}</span>
              <span class="format">${table.format}</span>
      `;

      timeList.appendChild(button);
    });

    article.appendChild(poster);
    article.appendChild(title);
    article.appendChild(timeList);
    container.appendChild(article);
  });
}

async function loadShowTime() {
  try {
    const data = await showtimeAPI.list();
    // console.log(data);
    renderMovieList(data);
  } catch (e) {
    console.error(e);
  }
}

loadShowTime();





//날짜 선택 활성화

const dateButtons = document.querySelectorAll('.date-container button');

dateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dateButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

