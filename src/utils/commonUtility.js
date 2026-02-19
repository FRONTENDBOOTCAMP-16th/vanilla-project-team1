export function formatPrices(number = 20000) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
