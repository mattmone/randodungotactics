import { DIRECTION } from "../constants/directions.js";
import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { FloorTile } from "./FloorTile.js";
import { ExitTile } from "./ExitTile.js";

export class Room extends IdbBacked {
  constructor(
    id = crypto.randomUUID(),
    mapid,
    { x = 0, z = 0, width, length, entrance }
  ) {
    super(id);
    this.mapid = mapid;
    const floorTileCoordinates = [];

    for (let w = -width; w <= width; w++) {
      for (let l = -length; l <= length; l++) {
        floorTileCoordinates.push(
          { x: w + x, z: l + z }
        );
      }
    }
    floorTileCoordinates.push(entrance.coordinates);
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
    if ([DIRECTION.SOUTH, DIRECTION.WEST].includes(direction))
      return Math.max(
        ...this.floorTiles.map((floorTile) =>
          direction === DIRECTION.SOUTH ? floorTile.z : floorTile.x
        )
      );
    else
      return Math.min(
        ...this.floorTiles.map((floorTile) =>
          direction === DIRECTION.NORTH ? floorTile.z : floorTile.x
        )
      );
  }

  wallTiles(direction) {
    return this.floorTiles.filter(
      (tile) =>
        tile[
          [DIRECTION.NORTH, DIRECTION.SOUTH].includes(direction) ? "z" : "x"
        ] === walls(direction)
    );
  }

  get allWalls() {
    return {
      north: this.wall(DIRECTION.NORTH),
      south: this.wall(DIRECTION.SOUTH),
      east: this.wall(DIRECTION.EAST),
      west: this.wall(DIRECTION.WEST),
    };
  }

  async generateFloorTile(position) {
    const floorTile = new FloorTile(undefined, {x: position.x, z: position.z});
    return floorTile;
  }

  async addExit({x, y, northSouth}) {
    const exitTile = new ExitTile(undefined, {x, z, northSouth});
    this.exitTiles.push(exitTile);
  }
}
