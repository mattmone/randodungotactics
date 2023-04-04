/**
 * returns a random object in the array
 * @param {any[]} arr
 * @returns {any}
 */
export function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
