import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions";
import { IdbBacked } from "../utils/baseClasses/IdbBacked";

export class FloorTile extends IdbBacked {
  /**
   *
   * @param {import("../../types").UUID} id the id of the floorTile
   * @param {TileDetails} tileDetails the details of the floorTile
   */
  constructor(id = crypto.randomUUID(), tileDetails) {
    super(id);
    this.x = tileDetails.x;
    this.z = tileDetails.z;
    this.northWall = tileDetails.northWall;
    this.southWall = tileDetails.southWall;
    this.eastWall = tileDetails.eastWall;
    this.westWall = tileDetails.westWall;
    this.terrain = tileDetails.terrain ?? "rock";
    this.type = tileDetails.type ?? "floor";
    this.exitDirection = tileDetails.exitDirection ?? null;
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
    };
  }

  get key() {
    return `${this.x}|${this.z}`;
  }

  get position() {
    return { x: this.x, z: this.z };
  }

  get hasWall() {
    return this.northWall || this.southWall || this.eastWall || this.westWall;
  }

  get wallDirections() {
    const directions = [];
    if (this.northWall && this.exitDirection !== DIRECTION.NORTH)
      directions.push(DIRECTION.NORTH);
    if (this.southWall && this.exitDirection !== DIRECTION.SOUTH)
      directions.push(DIRECTION.SOUTH);
    if (this.eastWall && this.exitDirection !== DIRECTION.EAST)
      directions.push(DIRECTION.EAST);
    if (this.westWall && this.exitDirection !== DIRECTION.WEST)
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
   * @param {import("../../types").DIRECTION} exitDirection
   */
  makeExit(exitDirection) {
    this.type = "exit";
    this.exitDirection = exitDirection;
  }
}

/**
 * @typedef {import('../../types').TileDetails} TileDetails
 */
