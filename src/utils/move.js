import { DIRECTION } from "../constants/directions.js";
import { directionModifier } from "./directionModifier.js";

/**
 * moves a position in the given direction
 * @param {import("../../types").Position} position 
 * @param {import("../../types").DIRECTION} direction 
 * @returns 
 */
export function move(position, direction) {
  if ([DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction))
    return { x: position.x, z: position.z + directionModifier(direction) };
  return { x: position.x + directionModifier(direction), z: position.z };
}