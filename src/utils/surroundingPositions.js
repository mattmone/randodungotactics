import { DIRECTION } from "../constants/directions.js";

/**
 * 
 * @param {import("../../types.js").Position} position 
 * @returns {Map<import("../../types.js").DIRECTION, import("../../types.js").Position>}
 */
export function surroundingPositions(position) {
  const directionKeys = new Map();
  directionKeys.set(
    DIRECTION.NORTH,
    { x: position.x, z: position.z - 1 }
  );
  directionKeys.set(
    DIRECTION.SOUTH,
    { x: position.x, z: position.z + 1 }
  );
  directionKeys.set(
    DIRECTION.EAST,
    { x: position.x - 1, z: position.z }
  );
  directionKeys.set(
    DIRECTION.WEST,
    { x: position.x + 1, z: position.z }
  );
  return directionKeys;
}
