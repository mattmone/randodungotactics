import { DIRECTION } from "../constants/directions.js";
import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { FloorTile } from "./FloorTile.js";

class generateFloorTileEvent extends Event {
  constructor(floorTile) {
    super('generateFloorTile');
    this.floorTile = floorTile;
  }
}

export class Room extends IdbBacked {
  constructor(id = crypto.randomUUID(), mapid, details) {
    super(id);
    this.mapid = mapid;
    this.floorTiles = Promise.all(floorTileCoordinates.map(this.generateFloorTile)).then(floorTiles => {
      this.dispatchEvent(new Event('room-generated'));
      return floorTiles;
    });
  }

  static get serialized() {
    return {
      mapid: true,
      walls: true,
      floorTiles: IdbBacked.Array(FloorTile)
    }
  }

  wall(direction) {
    if([DIRECTION.SOUTH, DIRECTION.WEST].includes(direction))
      return Math.max(...this.floorTiles.map(floorTile => direction === DIRECTION.SOUTH ? floorTile.z : floorTile.x));
    else
      return Math.min(...this.floorTiles.map(floorTile => direction === DIRECTION.NORTH ? floorTile.z : floorTile.x));
  }

  get allWalls() {
    return {
      north: this.wall(DIRECTION.NORTH),
      south: this.wall(DIRECTION.SOUTH),
      east: this.wall(DIRECTION.EAST),
      west: this.wall(DIRECTION.WEST),
    }
  }

  async generateFloorTile(position) {
    const floorTile = new FloorTile(null, position.x, position.z);
    this.dispatchEvent(new generateFloorTileEvent(floorTile));
    return floorTile;
  }
}