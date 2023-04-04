import { DIRECTION, OPPOSITE_DIRECTION } from "../constants/directions.js";
import { FloorTile } from "./FloorTile.js";

export class ExitTile extends FloorTile {
  /**
   * creates the exitTile
   * @param {string} id the id of the exitTile
   * @param {ExitTileDetails} exitTileDetails the details of the exitTile
   */
  constructor(id = crypto.randomUUID(), exitTileDetails) {
    super(id, exitTileDetails);
    this.direction = exitTileDetails.direction;
  }
  get isExit() {
    return true;
  }

  get northSouth() {
    return [DIRECTION.NORTH, DIRECTION.SOUTH].includes(this.direction);
  }

  get fromDirection() {
    return OPPOSITE_DIRECTION[this.direction];
  }
}

/**
 * @typedef {import('../../types').ExitTileDetails} ExitTileDetails
 */