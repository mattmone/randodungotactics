import { DIRECTION } from "../constants/directions.js";

export function surroundingPositions(position) {
  const directionKeys = new Map();
  console.log(position);
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
