// import { DIRECTION } from '../constants/directions.js';

export class Character {
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
    this.stats = {};
    this.skills = {};
    this.position = false;
    this.effects = {};
    this.modifiers = {};
    // this.direction = DIRECTION.NORTH;
  }

  /**
   * @param {number} value
   */
  set nextMove(value) {
    this._nextMove = value;
  }

  get nextMove() {
    return this._nextMove || 0;
  }

  get maxhp() {
    return this.stats.constitution * 10 + this.stats.strength * 5;
  }

  get maxmana() {
    return this.stats.intellect * 10 + this.stats.magic * 5;
  }

  get passable() {
    const { name, stats, skills, position, effects, modifiers, hp, mana, maxmana, maxhp } = this;
    return { name, stats, skills, position, effects, modifiers, hp, mana, maxmana, maxhp };
  }

  setup() {
    this.hp = this.maxhp;
    this.mana = this.maxmana;
  }
}
