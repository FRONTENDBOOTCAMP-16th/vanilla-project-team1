import { storage } from '../utils/storage.js';

const KEY = 'movieState';

const DEFAULT_STATE = {
  //재권
  userName: '예매의정석', //유저이름
  //유영
  movieId: 1, //영화 id
  movieName: '왕과사는 남자', //영화 이름
  timetableName: '08:40-10:42', //시간표 이름
  theaterId: 3, //극장 id
  theaterName: '구의이스트폴', //극장 이름
  movieType: '2D', //영화 타입(2D, 3D 등)
  //찬미
  seats: ['A1', 'A2'], //선택된 좌석
  price: 20000, //인원에 따른 금액
  totalPrice: 0,
  //---
  updatedAt: null,
};

export function loadBookingState() {
  return storage.get(KEY, { ...DEFAULT_STATE });
}

export function saveBookingState(nextState) {
  const current = loadBookingState();
  const merged = {
    ...current,
    ...nextState,
    updatedAt: Date.now(),
  };
  storage.set(KEY, merged);
  return merged;
}

export function patchBookingState(partial) {
  return saveBookingState(partial);
}

export function resetBookingState() {
  storage.remove(KEY);
}
