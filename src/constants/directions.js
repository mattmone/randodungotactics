export const DIRECTION = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

export const OPPOSITE_DIRECTION = {
  NORTH: DIRECTION.SOUTH,
  EAST: DIRECTION.WEST,
  SOUTH: DIRECTION.NORTH,
  WEST: DIRECTION.EAST,
  2: 0,
  3: 1,
  0: 2,
  1: 3,
};

export function isNorthSouth(direction) {
  return [DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction);
}

export function isEastWest(direction) {
  return [DIRECTION.EAST, DIRECTION.WEST].includes(direction);
}
