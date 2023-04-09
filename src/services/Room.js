import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions.js";
import { move } from "../utils/move.js";
import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { FloorTile } from "./FloorTile.js";

export class Room extends IdbBacked {
  #wall = new Map();
  #wallTiles = new Map();

  /**
   * 
   * @param {import("../../types.js").UUID} id the id of the room
   * @param {import("../../types.js").UUID} mapid the id of the map the room is on
   * @param {RoomDetails} roomDetails the details of the room
   */
  constructor(
    id = crypto.randomUUID(),
    mapid,
    roomDetails
  ) {
    super(id);
    const { x, z, width, length, entrance } = roomDetails;
    this.mapid = mapid;
    const floorTileCoordinates = [];

    this.#wall.set(DIRECTION.NORTH, z-length);
    this.#wall.set(DIRECTION.SOUTH, z+length);
    this.#wall.set(DIRECTION.EAST, x+width);
    this.#wall.set(DIRECTION.WEST, x-width);

    for (let w = -width; w <= width; w++) {
      const westWall = w === -width;
      const eastWall = w === width;
      for (let l = -length; l <= length; l++) {
        let northWall = l === -length;
        let southWall = l === length;
        floorTileCoordinates.push(
          { x: w + x, z: l + z, northWall, southWall, westWall, eastWall }
        );
      }
    }
    
    Promise.all(
      floorTileCoordinates.map(this.generateFloorTile)
    ).then((floorTiles) => {
      this.floorTiles = floorTiles;
      this.hallway = entrance;
      const entrancePosition = move(entrance.tile.position, entrance.direction)
      const entranceTile = this.floorTiles.find(tile => tile.at(entrancePosition?.x, entrancePosition?.z));
      console.log(entranceTile);
      if(entranceTile) {
        entranceTile.makeEntrance(OPPOSITE_DIRECTION[entrance.direction]);
      }
      this.dispatchEvent(new Event('initialize'));
    });
  }

  static get serialized() {
    return {
      mapid: true,
      walls: true,
      floorTiles: IdbBacked.Array(FloorTile)
    };
  }

  /**
   * get the wall tiles for the given direction
   * @param {import('../../types.js').DIRECTION} direction the direction to get the wall tiles for
   * @returns {FloorTile[]} the wall tiles for the given direction
   */
  wallTiles(direction) {
    // Return the cached wall tiles for the given direction, if they exist
    if (this.#wallTiles.has(direction)) {
      return this.#wallTiles.get(direction);
    }
    // Otherwise, compute the wall tiles for the given direction
    const wallTiles = this.floorTiles.filter(
      (tile) =>
        tile[
          [DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction) ? "z" : "x"
        ] === this.#wall.get(direction)
    );
    // Cache the computed wall tiles for the given direction
    this.#wallTiles.set(direction, wallTiles);
    return wallTiles;
  }

  get allWalls() {
    return {
      north: this.#wall.get(DIRECTION.NORTH),
      south: this.#wall.get(DIRECTION.SOUTH),
      east: this.#wall.get(DIRECTION.EAST),
      west: this.#wall.get(DIRECTION.WEST),
    };
  }

  /**
   * 
   * @param {import("../../types").TileDetails} tileDetails 
   * @returns 
   */
  async generateFloorTile(tileDetails) {
    const floorTile = new FloorTile(undefined, tileDetails);
    return floorTile;
  }
}

/**
 * @typedef {import('../../types').RoomDetails} RoomDetails
 */