import { storage } from '../utils/storage.js';

const KEY = 'movieState';

const DEFAULT_STATE = {
  //재권
  userName: null, //유저이름
  //유영
  movieId: null, //영화 di
  movieName: null, //영화 이름
  timetableName: null, //시간표 이름
  theaterId: null, //극장 id
  theaterName: null, //극장 이름
  movieType: null, //영화 타입(2D, 3D 등)
  //찬미
  seats: [], //선택된 좌석
  price: 0, //인원에 따른 금액
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
