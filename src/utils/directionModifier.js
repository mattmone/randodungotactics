import { DIRECTION } from "../constants/directions.js";

export function directionModifier(direction) {
  if ([DIRECTION.NORTH, DIRECTION.EAST].includes(direction))
    return -1;
  return 1;
}
