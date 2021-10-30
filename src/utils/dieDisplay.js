/**
 * Display a dice range
 * @param {Number} sides the number of sides on the dice
 * @param {Number} times the number of dice to be rolled
 * @returns {String}
 */
export const dieDisplay = (sides = 2, times = 1) => {
  if (sides === 1) return times;
  return `${times}d${sides} (${times}-${times * sides})`;
};
