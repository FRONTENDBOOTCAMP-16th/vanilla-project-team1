import { regionAPI, showtimeAPI, seatAPI } from '../../apis/apiRequest.js';
<<<<<<< HEAD
import { resetBookingState, loadBookingState, patchBookingState } from '../../state/movieState.js';

const state = loadBookingState();
=======
>>>>>>> feature/booking

let showtime = [];

async function loadRegion() {
  try {
    const region = await regionAPI.list();
<<<<<<< HEAD
    resetBookingState();
    patchBookingState({
      movieId: 1,
      timetableId: null,
      seats: [],
      price: 0,
    });
=======
>>>>>>> feature/booking
  } catch (e) {
    console.error(e);
  }
}

async function loadShowTime() {
  try {
    showtime = await showtimeAPI.list();
  } catch (e) {
    console.error(e);
  }
}

async function loadSeats() {
  try {
    const seats = await seatAPI.list();
    console.log(seats);
  } catch (e) {
    console.error(e);
  }
}

loadRegion();
loadShowTime();
loadSeats();
