import { DIRECTIONS } from './constants';
import { FloorTile } from './dist/services/FloorTile';
import {Vector3} from './src/libs/three.module.js';

export type Vector3 = Vector3;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type TileDetails = {
  x: number;
  z: number;
  northWall?: boolean;
  eastWall?: boolean;
  southWall?: boolean;
  westWall?: boolean;
  terrain?: string;
  type?: string;
  exitDirection?: Direction|null;
  entranceDirection?: Direction|null;
}

export type RoomDetails = {
  x: number;
  z: number;
  width: number;
  length: number;
  terrain?: string;
  entrance?: {
    tile: FloorTile
    direction: DIRECTION
  }
}

export type Position = {
  x: number;
  z: number;
}

export type DIRECTION = typeof DIRECTIONS[keyof typeof DIRECTIONS];