import { regionAPI, showtimeAPI, seatAPI } from '../../apis/apiRequest.js';

let showtime = [];

async function loadRegion() {
  try {
    const region = await regionAPI.list();
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
