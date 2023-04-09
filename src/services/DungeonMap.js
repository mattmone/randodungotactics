import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { rollDice } from "../utils/rollDice";
import { DIRECTION, OPPOSITE_DIRECTION, isEastWest, isNorthSouth } from "../constants/directions";
import { move } from "../utils/move.js";
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
    return this.#rooms.flatMap(room => room.floorTiles);
  }

  #checkForNearbyRoom(position, direction) {
    const checkPosition = move(position, direction);
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
      if (exitTile.isExit || this.#checkForNearbyRoom(exitTile, wall.direction))
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
      z: 0
    })
  ) {
    if (
      this.#check(entrance.position, entrance.exitDirection)
    )
      return null;
    const hallway = new FloorTile(undefined, {...move(entrance, entrance.exitDirection), 
      northWall: isEastWest(entrance.exitDirection),
      southWall: isEastWest(entrance.exitDirection),
      eastWall: isNorthSouth(entrance.exitDirection),
      westWall: isNorthSouth(entrance.exitDirection),
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
        direction: entrance.exitDirection
      },
      width,
      length,
    };
    let room = new Room(undefined, this.id, roomDetails);
    await room.initialized;

    if (this.#roomOverlaps(room)) {
      room.dispatchEvent(new Event("destroy"));
      room = new Room(undefined, this.id, {
        ...roomDetails,
        x: hallway.x,
        z: hallway.z,
        width: 0,
        length: 0,
      });
      await room.initialized;
      return room;
    }

    await this.#determineRoomExits(room, OPPOSITE_DIRECTION[entrance.exitDirection], exits);
    this.#rooms.push(room);
    return room;
  }
}
