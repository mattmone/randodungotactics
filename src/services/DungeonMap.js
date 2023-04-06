import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { rollDice } from "../utils/rollDice";
import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions";
import { Room } from "./Room.js";
import { FloorTile } from "./FloorTile.js";
import { surroundingPositions } from "../utils/surroundingPositions.js";
import { directionModifier } from "../utils/directionModifier.js";
import { oneOf } from "../utils/oneOf.js";

export class DungeonMap extends IdbBacked {
  /** @type {Array.<Room>} */
  #rooms = [];
  constructor(id = crypto.randomUUID(), terrain = "rock") {
    super(id);
    this.id = id;
    this.terrain = terrain;
    /** @type {Array.<FloorTile>} */
    this.floorTiles = [];
  }

  static get serialized() {
    return {
      floorTiles: IdbBacked.Array(FloorTile),
      rooms: IdbBacked.Array(Room),
      terrain: true,
    };
  }

  get rooms() {
    return this.#rooms;
  }

  #checkForNearbyRoom(position, direction) {
    const checkPosition = this.#move(position, direction);
    return Array.from(surroundingPositions(checkPosition).values()).some(
      (position) =>
        this.floorTiles.some((floorTile) => floorTile.at(checkPosition))
    );
  }

  #verifyExitPossibility(direction, room) {}

  #check(position = { x: 0, z: 0 }, direction) {
    const adjacentPositions = surroundingPositions(position);
    return this.floorTiles.find((floorTile) =>
      floorTile.at(adjacentPositions.get(direction))
    );
  }

  #move(position, direction) {
    if ([DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction))
      return { x: position.x, z: position.z + directionModifier(direction) };
    return { x: position.x + directionModifier(direction), z: position.z };
  }

  /**
   * determine the room exits
   * @param {Room} room the room to determine possible exits fore
   * @param {import('../../types.js').DIRECTION} entranceDirection the direction the room is entered from
   * @param {number} count the total possible exits
   */
  async #determineRoomExits(room, entranceDirection, count) {
    // 1: remove entranceDirection
    const possibleExitDirections = Object.values(DIRECTION).filter(
      (direction) => direction !== entranceDirection
    );
    // 2: check for surrounding rooms and remove any there as possible exits
    const walls = possibleExitDirections.map((direction) => ({
      direction,
      wallTiles: room.wallTiles(direction),
    }));
    console.log(walls);
    // 3: choose up to `count` from the remaining exits possibilities
    let iterations = 10;

    while (count > 0 && iterations > 0) {
      iterations--;
      const wall = oneOf(walls);
      const exitTile = oneOf(wall.wallTiles);
      if (exitTile.isExit || this.#checkForNearbyRoom(exitTile, wall.direction))
        continue;
      exitTile.makeExit(wall.direction);
      console.log(exitTile, "exit");
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
   * @param entrance - entrance point to the room
   * @return {Promise<Room|null>} - the room that was generated
   */

  async generateRoom(
    width = rollDice(3, 2),
    length = rollDice(3, 2),
    exits = rollDice(5) - 1,
    entrance = {
      northSouth: true,
      fromDirection: DIRECTION.NORTH,
      position: { x: 0, z: 0 },
    }
  ) {
    if (
      this.#check(entrance.position, OPPOSITE_DIRECTION[entrance.fromDirection])
    )
      return null;
    const roomDetails = {
      x:
        entrance.position.x +
        (entrance.northSouth
          ? 0
          : directionModifier(entrance.direction) * (width + 1)),
      z:
        entrance.position.z +
        (entrance.northSouth
          ? directionModifier(entrance.direction) * (length + 1)
          : 0),
      entrance,
      width,
      length,
    };
    let room = new Room(undefined, this.id, roomDetails);
    await room.initialized;

    if (this.#roomOverlaps(room)) {
      room.dispatchEvent(new Event("destroy"));
      room = new Room(undefined, this.id, {
        ...roomDetails,
        x: entrance.position.x,
        z: entrance.position.z,
        width: 0,
        length: 0,
      });
      await room.initialized;
      return room;
    }

    await this.#determineRoomExits(room, entrance.fromDirection, exits);
    this.#rooms.push(room);
    return room;
  }
}
