export const dieDisplay = (sides = 2, times = 1) => {
  if (sides === 1) return times;
  return `${times}d${sides} (${times}-${times * sides})`;
};