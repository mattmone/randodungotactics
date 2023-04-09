import { DIRECTION } from "../constants/directions.js";

/**
 * 
 * @param {DIRECTION} direction 
 * @returns 
 */
export function directionModifier(direction) {
  if ([DIRECTION.NORTH, DIRECTION.WEST].includes(direction))
    return -1;
  return 1;
}
