const formatted = (strings, ...values) => {
  let result = '';
  let i = 0;
  const numberFormatter = Intl.NumberFormat().format;
  while (i < strings.length) {
    result += strings[i];
    if (i < values.length) {
      result += numberFormatter(values[i]);
    }
    i++;
  }
  return result;
};

/**
 * Display a dice range
 * @param {Number} sides the number of sides on the dice
 * @param {Number} times the number of dice to be rolled
 * @returns {String}
 */
export const dieDisplay = (sides = 2, times = 1) => {
  if (sides === 1) return times;
  times = Math.round(times);
  sides = Math.round(sides);
  return formatted`${times}d${sides} (${times}-${times * sides})`;
};
