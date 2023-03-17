import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { rollDice } from "../utils/rollDice";
import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions";
import { Room } from "./Room.js";
import { FloorTile } from "./FloorTile.js";
import { surroundingPositions } from "../utils/surroundingPositions.js";
import { directionModifier } from "../utils/directionModifier.js";

export class DungeonMap extends IdbBacked {
  /** @type {Array.<Room>} */
  #rooms = []
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
      terrain: true
    }
  }

  get rooms() {
    return this.#rooms;
  }

  #checkForNearbyRoom(position) {
    return Array.from(
      surroundingPositions(position).values()
    ).some((position) => this.floorTiles.some(floorTile => floorTile.at(position)));
  }

  #verifyExitPossibility(direction, room) {

  }

  #check(position, direction) {
    const adjacentPositions = surroundingPositions(position);
    return this.floorTiles.find(floorTile => floorTile.at(adjacentPositions.get(direction)));
  }

  #move(position, direction) {
    if([DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction)) return {x: position.x, z: position.z + directionModifier(direction)};
    return {x: position.x + directionModifier(direction), z: position.z}
  }

  #determineRoomExits(room, entranceDirection) {
    // 1: remove entranceDirection
    const possibleExitDirections = Object.values(DIRECTION).filter(direction => direction !== entranceDirection);
    // 2: check for surrounding rooms and remove any there as possible exits
    const walls = possibleExitDirections.map(direction => ({direction, wall: room.walls(direction)}));
    // 3: choose up to `count` from the remaining exits possibilities
    // 4: create the exits
  }

  #determineRoomFloorTileCoordinates(center, width, length) {
    const floorTileCoordinates = [];
    for (let w = center.x-width; w <= center.x+width; w++) {
      for (let l = -center.z-length; l <= center.z+length; l++) {
        if (this.#checkForNearbyRoom(position, this)) continue;
        floorTileCoordinates.push({ x: w, z: l });
      }
    }
    return floorTileCoordinates;
  }

  #roomOverlaps(room) {
    return this.#rooms.some(exisitingRoom => 
      exisitingRoom.floorTile.some(exisitingFloorTile => 
        room.floorTile.some(floorTile => 
          floorTile.at(exisitingFloorTile.x, exisitingFloorTile.z)
        )
      )
    )
  }

  async generateRoom(
    width = rollDice(3, 2),
    length = rollDice(3, 2),
    exits = rollDice(5)-1,
    entrance = {
      fromDirection: DIRECTION.NORTH,
      coordinates: [{ x: 0, y: 0, z: 0 }]
    }
  ) {
    if (this.#check(entrance.position, OPPOSITE_DIRECTION[fromDirection]))
      return null;
    const roomDetails = {
      x: entrance.position.x + directionModifier(entrance.fromDirection)*width,
      z: entrance.position.z + directionModifier(entrance.fromDirection)*length,
      entrance,
      width,
      length
    };
    let room = new Room(null, this.id, roomDetails);

    if(this.#roomOverlaps(room)) {
      room.dispatchEvent(new Event('destroy'));
      room = new Room(null, this.id, { ...roomDetails, width: 0, length:0 })
    }
  

    const possibleExits = this.#determineRoomExits(room, entrance.fromDirection)
    this.#rooms.push(room);
    return room;
  }
}
