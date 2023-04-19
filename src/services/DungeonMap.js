import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { rollDice } from "../utils/rollDice";
import {
  DIRECTION,
  OPPOSITE_DIRECTION,
  isEastWest,
  isNorthSouth,
} from "../constants/directions";
import { move } from "../utils/move.js";
import { Room } from "./Room.js";
import { FloorTile } from "./FloorTile.js";
import { surroundingPositions } from "../utils/surroundingPositions.js";
import { directionModifier } from "../utils/directionModifier.js";
import { oneOf } from "../utils/oneOf.js";

/**
 * @typedef {import("../../types.js").Position} Position
 * @typedef {import("../../types.js").DIRECTION} DIRECTION
 */

export class DungeonMap extends IdbBacked {
  /** @type {Array.<Room>} */
  #rooms = [];
  constructor(id = crypto.randomUUID(), terrain = "rock") {
    super(id);
    this.id = id;
    this.terrain = terrain;
  }

  static get serialized() {
    return {
      rooms: IdbBacked.Array(Room),
      terrain: true,
    };
  }

  get rooms() {
    return this.#rooms;
  }

  get floorTiles() {
    return this.#rooms.flatMap((room) => room.floorTiles);
  }

  /**
   *
   * @param {Position} position
   * @param {DIRECTION} direction
   * @returns
   */
  #checkForNearbyRoom(position, direction) {
    const checkPosition = move(position, direction);
    return Boolean(this.#check(checkPosition, direction));
  }

  /**
   *
   * @param {Position} position
   * @param {DIRECTION} direction
   * @returns {FloorTile|undefined}
   */
  #check(position = { x: 0, z: 0 }, direction) {
    const adjacentPositions = surroundingPositions(position);
    /** @type {Position} */
    const { x, z } = adjacentPositions.get(direction) ?? position;

    return this.floorTiles.find((floorTile) => floorTile.at(x, z));
  }

  /**
   * determine the room exits
   * @param {Room} room the room to determine possible exits fore
   * @param {import('../../types.js').DIRECTION} entranceDirection the direction the room is entered from
   * @param {number} count the total possible exits
   */
  async #determineRoomExits(room, entranceDirection, count) {
    let possibleExitDirections = Object.values(DIRECTION).filter(
      (direction) => direction !== entranceDirection
    );
    const walls = possibleExitDirections.map((direction) => ({
      direction,
      wallTiles: room.wallTiles(direction),
    }));

    let iterations = 10;
    while (count > 0 && iterations > 0) {
      iterations--;
      const wall = oneOf(walls);
      const exitTile = oneOf(wall.wallTiles);
      if (
        exitTile?.isExit ||
        this.#checkForNearbyRoom(exitTile, wall.direction)
      )
        continue;
      exitTile.makeExit(wall.direction);
      walls.splice(walls.indexOf(wall), 1);
      count--;
    }
  }

  /**
   * check if a room overlaps with any other room
   * @param {Room} room the room to check for overlap
   * @returns {boolean} true if the room overlaps with any other room
   */
  #roomOverlaps(room) {
    return this.#rooms.some((exisitingRoom) =>
      exisitingRoom.floorTiles.some((exisitingFloorTile) =>
        room.floorTiles.some((floorTile) =>
          floorTile.at(exisitingFloorTile.x, exisitingFloorTile.z)
        )
      )
    );
  }

  /**
   * Generate room based on given parameters
   * @param {number} width - number of tiles in the room, in the x direction
   * @param length - number of tiles in the room, in the z direction
   * @param exits - number of exits from the room
   * @param {FloorTile} entrance - entrance point to the room
   * @return {Promise<Room|null>} - the room that was generated
   */

  async generateRoom(
    width = rollDice(3, 2),
    length = rollDice(3, 2),
    exits = rollDice(5) - 1,
    entrance = new FloorTile(undefined, {
      x: 0,
      z: 0,
    })
  ) {
    const hallway = new FloorTile(undefined, {
      ...move(entrance, entrance.exitDirection),
      northWall: isEastWest(entrance.exitDirection),
      southWall: isEastWest(entrance.exitDirection),
      eastWall: isNorthSouth(entrance.exitDirection),
      westWall: isNorthSouth(entrance.exitDirection),
      fromRoom: entrance.room,
    });
    const roomDetails = {
      x:
        hallway.x +
        (entrance.northSouthExit
          ? 0
          : directionModifier(entrance.exitDirection) * (width + 1)),
      z:
        hallway.z +
        (entrance.northSouthExit
          ? directionModifier(entrance.exitDirection) * (length + 1)
          : 0),
      entrance: {
        tile: hallway,
        direction: entrance.exitDirection,
      },
      width,
      length,
      path: entrance.room?.path
    };
    let room = new Room(undefined, this.id, roomDetails);
    await room.initialized;
    hallway.toRoom = room;
    entrance.toRoom = room;

    if (this.#roomOverlaps(room)) {
      room.dispatchEvent(new Event("destroy"));
      roomDetails.x = hallway.x;
      roomDetails.z = hallway.z;
      roomDetails.width = 0;
      roomDetails.length = 0;
      room = new Room(undefined, this.id, roomDetails);
      await room.initialized;
      return room;
    }

    await this.#determineRoomExits(
      room,
      OPPOSITE_DIRECTION[entrance.exitDirection],
      exits
    );
    this.#rooms.push(room);
    return room;
  }

  /**
   * 
   * @param {Vector3} position the position of the tile to find
   * @returns {FloorTile|undefined}
   */
  #getTileAtPosition(position) {
    return this.floorTiles.find((tile) => tile.at(position.x, position.z));
  }

  /**
   *
   * @param {Vector3} startTilePosition the tile position to start from
   * @param {Vector3} endTilePosition the tile position to end at
   * @returns {Promise<Array.<FloorTile>>}
   */
  async findPath(startTilePosition, endTilePosition) {
    const startTile = this.#getTileAtPosition(startTilePosition);
    const endTile = this.#getTileAtPosition(endTilePosition);
    if(!startTile) throw new Error(`no tile found at start position, ${startTilePosition}`)
    if(!endTile) throw new Error(`no tile found at start position, ${endTilePosition}`)
    const startRoom = startTile.room;
    const endRoom = endTile.room;
    if (startRoom === endRoom) {
      return startRoom.findPath(startTile, endTile);
    }
    const firstIntersection = startRoom.path.findLast(room => endRoom.path.includes(room));
    const startPathReversed = startRoom.path.slice(startRoom.path.indexOf(firstIntersection)).reverse();
    const roomPath = Array.from(new Set([...startPathReversed, ...endRoom.path.slice(endRoom.path.indexOf(firstIntersection))]));
    const path = [];
    let currentTile = startTile;
    do {
      const currentRoom = roomPath.shift();
      const nextRoom = roomPath[0];
      const currentRoomExit = currentRoom.exploredExitTiles.find(tile => [tile.toRoom, tile.fromRoom].includes(nextRoom));
      const nextRoomEntrance = nextRoom?.exploredExitTiles?.find?.(tile => [tile.toRoom, tile.fromRoom].includes(currentRoom));
      const roomPathTiles = await currentRoom.findPath(currentTile, currentRoomExit ?? endTile);
      currentTile = nextRoomEntrance;
      path.push(...roomPathTiles, nextRoomEntrance);
    } while(roomPath.length > 0);
    return [...path, endTile].filter(Boolean);
  }
}

/**
 * @typedef {import('../../types.js').Vector3} Vector3
 */