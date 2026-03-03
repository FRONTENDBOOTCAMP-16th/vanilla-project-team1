import { showtimeAPI } from '../../apis/apiRequest.js';
import { regionAPI } from '../../apis/apiRequest.js';
import { loadBookingState, patchBookingState } from '../../state/movieState.js';

const state = loadBookingState();

const storageData = {
  theaterId: 0,
  theaterName: '',
  timetableId: 0,
  timetableName: '',
  movieType: '',
};

//상영 시간 정보 호출

const container = document.querySelector('.movie-list');

function renderMovieList(movieList) {
  container.innerHTML = '';

  movieList.forEach((v) => {
    const article = document.createElement('article');
    article.classList.add('movie-card');

    const movieWrapper = document.createElement('div');
    movieWrapper.classList.add('movie-wrapper');
    const poster = document.createElement('img');
    poster.src = v.postUrl;
    poster.alt = v.movieName;
    poster.width = 100;

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
      button.addEventListener('click', () => {
        const latestState = loadBookingState();

        //영화관 우선 선택
          if (!isTheaterSelected) {
            alert('영화관을 선택해주세요.');
            return;
          }

        //날짜 우선 선택
        const hasSelectedDate = document.querySelector('.date-container button.selected');

        if (!hasSelectedDate) {
          alert('날짜를 선택해주세요.');
          return;
        }

        //상영 시간 선택 활성화
        container.querySelectorAll('.show-time.selected').forEach((b) => b.classList.remove('selected'));
        button.classList.add('selected');
        button.classList.remove('selected');

        patchBookingState({
          movieId: v.id,
          movieName: v.movieName,
          movieType: table.format,

          timeTableName: table.screenName,
          timetableId: table.showtimeId,
          timetableName: `${table.startTime}~${table.endTime}`,
        });

        location.href = '/src/page/seat/index.html';
      });

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
let isTheaterSelected = false;

function renderTheaterList(theaters) {
  isTheaterSelected = false;   
  theaterList.innerHTML = '';

  theaters.forEach((t) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.type = 'button';
    btn.textContent = t.name;
    btn.dataset.theaterId = t.id;

    btn.dataset.theaterName = t.name;
    btn.dataset.theaterId = t.id;
    // storageData.theaterId = t.id;
    // storageData.theaterName = t.name;

    btn.addEventListener('click', () => {
      isTheaterSelected = true;

      patchBookingState({
        theaterId: t.id,
        theaterName: t.name,
      });
    });

    li.appendChild(btn);
    theaterList.appendChild(li);
  });
}

function renderRegionList(regions) {
  regionList.innerHTML = '';

  regions.forEach((r) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.type = 'button';
    btn.textContent = r.name;
    btn.dataset.regionId = r.id;

    btn.addEventListener('click', (e) => {
      isTheaterSelected = false;   

      const currentRegion = regions.find((v) => String(v.id) === String(e.target.dataset.regionId));
      if (!currentRegion) {
        return;
      }
      const theaters = currentRegion.theaters;
      renderTheaterList(theaters);
    });

    li.appendChild(btn);
    regionList.appendChild(li);
  });
}

async function loadRegions() {
  try {
    regionsCache = await regionAPI.list();

    renderRegionList(regionsCache);
  } catch (e) {
    console.error('loadRegions error:', e);
  }
}

loadRegions();

//날짜 선택 활성화

const dateButtons = document.querySelectorAll('.date-container button');

dateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dateButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

//영화관 선택 활성화

const regionButton = document.querySelector('#openRegion');

//페이지 진입 시 바텀 시트 오픈
document.addEventListener('DOMContentLoaded', () => {
  theaterSheet.classList.add('is-open');
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

//영화관 선택 시 바텀 시트 닫힘
theaterList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const theaterName = btn.dataset.theaterName;
  const theaterId = Number(btn.dataset.theaterId);

  // openRegionBtn.textContent = theaterName;
  openRegionBtn.textContent = `${theaterName}`;

  openRegionBtn.classList.add('selected');

  theaterSheet.classList.remove('is-open');

  patchBookingState({
    theaterName,
    theaterId,
  });
});


//지역, 지역 내 영화관 선택 활성화

function selectOnly(containerEl, targetBtn) {
  containerEl.querySelectorAll('button.selected').forEach((b) => b.classList.remove('selected'));
  targetBtn.classList.add('selected');
}

regionList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  selectOnly(regionList, btn);

  const regionId = Number(btn.dataset.regionId);

  const region = regionsCache.find((r) => Number(r.id) === regionId);
  let theaters;

  if (region && region.theaters) {
    theaters = region.theaters;
  } else {
    theaters = [];
  }

  renderTheaterList(theaters);
});

theaterList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  selectOnly(theaterList, btn);

  const theaterName = btn.dataset.theaterName;
  const theaterId = Number(btn.dataset.theaterId);

  openRegionBtn.textContent = theaterName;
  openRegionBtn.classList.add('selected');
  theaterSheet.classList.remove('is-open');

  patchBookingState({ theaterName, theaterId });
});
