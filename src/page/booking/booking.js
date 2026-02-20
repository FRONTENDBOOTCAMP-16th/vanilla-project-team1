import { showtimeAPI } from '../../apis/apiRequest.js';
import { regionAPI } from '../../apis/apiRequest.js';

console.log('regionList:', document.getElementById('regionList'));

//상영 시간 정보 호출

const container = document.querySelector('.movie-list');

function renderMovieList(movieList) {
  container.innerHTML = '';

  movieList.forEach((v) => {
    console.log(v);
    const article = document.createElement('article');
    article.classList.add('movie-card');

    const movieWrapper = document.createElement('div');
    movieWrapper.classList.add('movie-wrapper');
    const poster = document.createElement('img');
    poster.src = v.postUrl;
    poster.alt = v.movieName;
    poster.width = 100;
    // poster.height = 150;

    const title = document.createElement('p');
    title.classList.add('movie-title');
    title.textContent = v.movieName;
    movieWrapper.appendChild(poster);
    movieWrapper.appendChild(title);

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

    article.appendChild(movieWrapper);
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


//지역별 영화관 정보 호출

const regionList = document.getElementById('regionList');
const theaterList = document.getElementById('theaterList');

let regionsCache = [];

function renderRegionList(regions) {
  regionList.innerHTML = '';

  regions.forEach((r) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.type = 'button';
    btn.textContent = r.name;
    btn.dataset.regionId = r.id;

    li.appendChild(btn);
    regionList.appendChild(li);
  });
}

function renderTheaterList(theaters) {
  theaterList.innerHTML = '';

  theaters.forEach((t) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.type = 'button';
    btn.textContent = t.name;
    btn.dataset.theaterId = t.id;

    li.appendChild(btn);
    theaterList.appendChild(li);
  });
}

async function loadRegions() {
  try {
    regionsCache = await regionAPI.list();
    console.log('regionsCache:', regionsCache);

    renderRegionList(regionsCache);

  } catch (e) {
    console.error('loadRegions error:', e);
  }
}



//날짜 선택 활성화

const dateButtons = document.querySelectorAll('.date-container button');

dateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dateButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

//상영시간 선택 활성화

container.addEventListener('click', (e) => {
  const btn = e.target.closest('.show-time');
  if (!btn) return;

  container.querySelectorAll('.show-time.selected').forEach((b) => b.classList.remove('selected'));

  btn.classList.add('selected');
});

//영화관 선택 활성화

const regionButton = document.querySelector('#openRegion');

regionButton.addEventListener('click', () => {
  regionButton.classList.toggle('selected');
});

//바텀 시트 열기 / 닫기
const openRegionBtn = document.getElementById('openRegion');
const theaterSheet = document.getElementById('theaterSheet');
const closeSheetBtn = document.getElementById('closeSheet');

openRegionBtn.addEventListener('click', () => {
  theaterSheet.classList.add('is-open');
});

closeSheetBtn.addEventListener('click', () => {
  theaterSheet.classList.remove('is-open');
});

