import { IdbBacked } from "../utils/baseClasses/IdbBacked.js";
import { FloorTile } from "./FloorTile.js";

export class ExitTile extends FloorTile {
  constructor(id = crypto.randomUUID(), props) {
    super(id, props);
  }
  get isExit() {
    return true;
  }
}
