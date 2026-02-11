import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const movieAPI = {
  list: () => instance.get('/movies').then((r) => r.data),
  get: (id) => instance.get(`/movies/${id}`).then((r) => r.data),
};

export const regionAPI = {
  list: () => instance.get('/regions').then((r) => r.data),
  get: (id) => instance.get(`/regions/${id}`).then((r) => r.data),
};

export const showtimeAPI = {
  list: () => instance.get('/showtimes').then((r) => r.data),
  get: (id) => instance.get(`/showtimes/${id}`).then((r) => r.data),
};

export const seatAPI = {
  list: () => instance.get('/seat').then((r) => r.data),
  get: (id) => instance.get(`/seat/${id}`).then((r) => r.data),
};

export const reservationAPI = {
  list: () => instance.get('/reservation').then((r) => r.data),
  get: (id) => instance.get(`/reservation/${id}`).then((r) => r.data),
  create: (data) => instance.post('/reservation', data).then((r) => r.data),
};
