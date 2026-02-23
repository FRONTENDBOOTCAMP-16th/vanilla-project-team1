import { storage } from '../utils/storage.js';

const KEY = 'movieState';

const DEFAULT_STATE = {
  userName: null,
  movieId: null,
  movieName: null,
  timetableId: null,
  timetableName: null,
  theaterId: null,
  theaterName: null,
  seats: [],
  totalPrice: 0,
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
