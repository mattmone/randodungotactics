import { IdbBacked } from "../utils/baseClasses/IdbBacked";

export class FloorTile extends IdbBacked {
  /**
   * 
   * @param {string} id the id of the floorTile
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
    this.terrain = tileDetails.terrain ?? 'rock';
  }

  static get serialized() {
    return {
        x: true,
        z: true,
        northWall: true,
        southWall: true,
        eastWall: true,
        westWall: true,
        terrain: true
    };
  }

  get key() {
    return `${this.x}|${this.z}`;
  }

  get position() {
    return {x: this.x, z: this.z};
  }

  get hasWall() {
    return this.northWall || this.southWall || this.eastWall || this.westWall;
  }

  get northSouthWall() {
    return this.northWall || this.southWall;
  }

  get eastWestWall() {
    return this.eastWall || this.westWall;
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
}

/**
 * @typedef {import('../../types').TileDetails} TileDetails
 */