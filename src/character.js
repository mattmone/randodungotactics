import { DIRECTION } from 'constants/directions.js';

export class Character {
  constructor(name) {
    this.name = name;
    this.avatar = {};
    this.stats = {};
    this.skills = {};
    this.position = {};
    this.effects = {};
    this.modifiers = {};
    this.direction = DIRECTION.NORTH;
  }
}
