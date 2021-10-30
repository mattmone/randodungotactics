/**
 * returns a random object in the array
 * @param {Object[]} arr
 * @returns {Object}
 */
export function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
