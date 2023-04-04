import { DIRECTION } from "../constants/directions.js";
import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { FloorTile } from "./FloorTile.js";
import { ExitTile } from "./ExitTile.js";

export class Room extends IdbBacked {
  #wall = new Map();
  #wallTiles = new Map();

  /**
   * 
   * @param {string} id the id of the room
   * @param {string} mapid the id of the map the room is on
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
    /** @type {ExitTile[]} */
    this.exitTiles = [];

    this.wall = {
      north: z - length,
      south: z + length,
      east: x + width,
      west: x - width,
    }

    for (let w = -width; w <= width; w++) {
      let northWall = w === -width;
      let southWall = w === width;
      for (let l = -length; l <= length; l++) {
        const westWall = l === -length;
        const eastWall = l === length;
        floorTileCoordinates.push(
          { x: w + x, z: l + z, northWall, southWall, westWall, eastWall }
        );
      }
    }
    floorTileCoordinates.push(entrance.position);
    Promise.all(
      floorTileCoordinates.map(this.generateFloorTile)
    ).then((floorTiles) => {
      this.floorTiles = floorTiles;
      this.dispatchEvent(new Event('initialize'));
    });
  }

  static get serialized() {
    return {
      mapid: true,
      walls: true,
      floorTiles: IdbBacked.Array(FloorTile),
      exitTiles: IdbBacked.Array(ExitTile)
    };
  }

  wall(direction) {
    if(this.#wall.has(direction)) return this.#wall.get(direction)
    let wall;
    if ([DIRECTION.SOUTH, DIRECTION.WEST].includes(direction))
      wall = Math.max(
        ...this.floorTiles.map((floorTile) =>
          direction === DIRECTION.SOUTH ? floorTile.z : floorTile.x
        )
      );
    else
      wall = Math.min(
        ...this.floorTiles.map((floorTile) =>
          direction === DIRECTION.NORTH ? floorTile.z : floorTile.x
        )
      );
    this.#wall.set(direction, wall);
    return wall
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
        ] === this.wall(direction)
    );
    // Cache the computed wall tiles for the given direction
    this.#wallTiles.set(direction, wallTiles);
    return wallTiles;
  }

  get allWalls() {
    return {
      north: this.wall(DIRECTION.NORTH),
      south: this.wall(DIRECTION.SOUTH),
      east: this.wall(DIRECTION.EAST),
      west: this.wall(DIRECTION.WEST),
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

  /**
   * 
   * @param {import("../../types").ExitTileDetails} exitTileDetails 
   */
  async addExit(exitTileDetails) {
    const exitTile = new ExitTile(undefined, exitTileDetails);
    this.exitTiles.push(exitTile);
  }
}

/**
 * @typedef {import('../../types').RoomDetails} RoomDetails
 */