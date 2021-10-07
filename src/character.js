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

  get passable() {
    const { name, stats, skills, position, effects, modifiers } = this;
    return { name, stats, skills, position, effects, modifiers };
  }
}
