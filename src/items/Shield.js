import { Item } from './Item.js';

export class Shield extends Item {
  get slot() {
    return 'secondary hand';
  }
  get skill() {
    return 'shield';
  }
}
