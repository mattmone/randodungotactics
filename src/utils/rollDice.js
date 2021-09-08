export function rollDice(sides = 2, times = 1) {
  let total = 0;
  while (times > 0) {
    total += Math.ceil(Math.random() * sides);
    times--;
  }
  if (!total) return 0;
  return total;
}
