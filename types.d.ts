import { DIRECTIONS } from './constants';
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

export type DIRECTION = typeof DIRECTIONS[keyof typeof DIRECTIONS];