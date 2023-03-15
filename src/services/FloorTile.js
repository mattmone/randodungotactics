import { IdbBacked } from "../utils/baseClasses/IdbBacked";

export class FloorTile extends IdbBacked {
  constructor(id = crypto.randomUUID(), {x, z, terrain = 'rock'}) {
    super(id);
    this.x = x;
    this.z = z;
    this.terrain = terrain;
  }

  static get serialized() {
    return {
        x: true,
        z: true,
        terrain: true
    };
  }

  get key() {
    return `${this.x}|${this.z}`;
  }

  at(x, z) {
    return x === this.x && z === this.z;
  }
}
