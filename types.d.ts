export type TileDetails = {
  x: number;
  z: number;
  northWall: boolean;
  eastWall: boolean;
  southWall: boolean;
  westWall: boolean;
  terrain: string;
}

export type ExitTileDetails = TileDetails & {
  direction: Direction;
}

export type RoomDetails = {
  x: number;
  z: number;
  width: number;
  length: number;
  terrain: string;
  entrance: EntranceDetails
}

export type EntranceDetails = {
  position: Position;
  direction: Direction;
  fromDirection: Direction;
}

export type Position = {
  x: number;
  z: number;
}

export enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export enum OppositeDirection {
  North = 2,
  East = 3,
  South = 0,
  West = 1,
  2 =  0,
  3 =  1,
  0 =  2,
  1 =  3,
}