import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions";
import { IdbBacked } from "../utils/baseClasses/IdbBacked";
import { Room } from "./Room.js";

/**
 * @typedef {import('../../types').TileDetails} TileDetails
 * @typedef {import("../../types").DIRECTION} DIRECTION
 * @typedef {import("../../types").UUID} UUID
 */

export class FloorTile extends IdbBacked {
  /**
   *
   * @param {UUID} id the id of the floorTile
   * @param {TileDetails} tileDetails the details of the floorTile
   */
  constructor(id = crypto.randomUUID(), tileDetails) {
    super(id);
    if (!tileDetails) return;
    this.x = tileDetails.x;
    this.z = tileDetails.z;
    this.northWall = tileDetails.northWall ?? false;
    this.southWall = tileDetails.southWall ?? false;
    this.eastWall = tileDetails.eastWall ?? false;
    this.westWall = tileDetails.westWall ?? false;
    this.terrain = tileDetails.terrain ?? "rock";
    this.type = tileDetails.type ?? "floor";
    this.exitDirection = tileDetails.exitDirection ?? null;
    this.entranceDirection = tileDetails.entranceDirection ?? null;
    this.room = tileDetails.room ?? null;
    this.fromRoom = tileDetails.fromRoom ?? null;
    this.toRoom = tileDetails.toRoom ?? null;
  }

  static get serialized() {
    return {
      x: true,
      z: true,
      northWall: true,
      southWall: true,
      eastWall: true,
      westWall: true,
      terrain: true,
      type: true,
      exitDirection: true,
      entranceDirection: true,
      room: IdbBacked.Instance(Room),
      fromRoom: IdbBacked.Instance(Room),
      toRoom: IdbBacked.Instance(Room),
    };
  }

  get threadPassable() {
    return {
      id: this.id,
      terrain: this.terrain,
      x: this.x,
      z: this.z,
      hasWall: this.hasWall,
      isExit: this.isExit,
      wallDirections: this.wallDirections,
      position: this.position,
      northSouthWall: this.northSouthWall,
      eastWestWall: this.eastWestWall,
      isEntrance: this.isEntrance,
      isCorner: this.isCorner,
      exitDirection: this.exitDirection,
      northSouthExit: this.northSouthExit,
      room: this.room.id
    };
  }

  get connectingRoom() {
    return this.fromRoom ?? this.toRoom;
  }

  get key() {
    return `${this.x}|${this.z}`;
  }

  get position() {
    return { x: this.x, z: this.z };
  }

  get hasWall() {
    return this.wallDirections.length;
  }

  get wallDirections() {
    const directions = [];
    if (
      this.northWall &&
      this.exitDirection !== DIRECTION.NORTH &&
      this.entranceDirection !== DIRECTION.NORTH
    )
      directions.push(DIRECTION.NORTH);
    if (
      this.southWall &&
      this.exitDirection !== DIRECTION.SOUTH &&
      this.entranceDirection !== DIRECTION.SOUTH
    )
      directions.push(DIRECTION.SOUTH);
    if (
      this.eastWall &&
      this.exitDirection !== DIRECTION.EAST &&
      this.entranceDirection !== DIRECTION.EAST
    )
      directions.push(DIRECTION.EAST);
    if (
      this.westWall &&
      this.exitDirection !== DIRECTION.WEST &&
      this.entranceDirection !== DIRECTION.WEST
    )
      directions.push(DIRECTION.WEST);
    return directions;
  }

  get northSouthWall() {
    return this.northWall || this.southWall;
  }

  get eastWestWall() {
    return this.eastWall || this.westWall;
  }

  get isCorner() {
    return (
      (this.northWall && this.eastWall) ||
      (this.northWall && this.westWall) ||
      (this.southWall && this.eastWall) ||
      (this.southWall && this.westWall)
    );
  }

  get isExit() {
    return this.type === "exit";
  }

  get isEntrance() {
    return this.type === "entrance";
  }

  get northSouthExit() {
    return this.isExit
      ? [DIRECTION.NORTH, DIRECTION.SOUTH].includes(this.exitDirection)
      : null;
  }

  /**
   * find out if the floorTile is at the given position
   * @param {number} x the x position
   * @param {number} z the z position
   * @returns {boolean} true if the floorTile is at the given position
   */
  at(x, z) {
    return x === this.x && z === this.z;
  }

  /**
   *
   * @param {DIRECTION} exitDirection
   */
  makeExit(exitDirection) {
    this.type = "exit";
    this.exitDirection = exitDirection;
  }

  /**
   *
   * @param {DIRECTION} entranceDirection
   * @param {Room} fromRoom
   */
  makeEntrance(entranceDirection, fromRoom) {
    this.type = "entrance";
    this.entranceDirection = entranceDirection;
    this.fromRoom = fromRoom;
    console.error('entrance', this)
  }
}
