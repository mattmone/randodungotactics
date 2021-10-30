/**
 * @typedef {Object} Stats
 * @property {Number} strength
 * @property {Number} dexterity
 * @property {Number} consitution
 * @property {Number} speed
 * @property {Number} intellect
 * @property {Number} magic
 */
// import { DIRECTION } from '../constants/directions.js';

export class Character {
  /**
   * creates a Character instance
   * @param {String} name the name of the character
   * @param {Mesh} avatar the character's visual representation in the game
   */
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
    this.avatar.userData.type = 'avatar';
    /** @type {Stats} */
    this.stats = {};
    this.skills = {};
    this.position = false;
    this.effects = {};
    this.modifiers = {};
    this.equipment = {
      weapon: {
        range: 5,
        strength: 2,
        power: 2,
      },
    };
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

  get attackRange() {
    return this.equipment?.primary?.range || 1;
  }

  get damage() {
    return [
      (this.equipment?.primary?.strength || 0) + this.stats.strength,
      (this.equipment?.primary?.power || 0) + this.stats.dexterity,
    ];
  }

  get tile() {
    return this.avatar.userData.childOf;
  }

  set tile(tile) {
    this.avatar.userData.childOf = tile;
  }

  get move() {
    return 2 + 0.1 * this.stats.dexterity + (this.modifiers.move ?? 0);
  }

  /** @type {Number} */
  get maxhp() {
    return this.stats.constitution * 10 + this.stats.strength * 5 + (this.modifiers.hp ?? 0);
  }

  /** @type {Number} */
  get maxmana() {
    return this.stats.intellect * 10 + this.stats.magic * 5 + (this.modifiers.mana ?? 0);
  }

  get passable() {
    const { name, stats, skills, position, effects, modifiers, hp, mana, maxmana, maxhp, move } =
      this;
    return { name, stats, skills, position, effects, modifiers, hp, mana, maxmana, maxhp, move };
  }

  setup() {
    /** @type {Number} */
    this.hp = this.maxhp;
    /** @type {Number} */
    this.mana = this.maxmana;
  }

  async die() {
    const { deathAnimation } = await import('./animations/character-death.js');
    deathAnimation.call(this);
  }

  degradeWeapon(damage, secondary) {
    if (secondary) return this.equipment?.secondary?.degrade(damage / 10);
    return this.equipment?.primary?.degrade(damage / 10);
  }

  distributeDamage(damage) {
    damage -= this.equipment?.body?.degrade(damage) || 0;
    damage -= this.equipment?.helm?.degrade(damage) || 0;
    damage -= this.equipment?.gloves?.degrade(damage) || 0;
    damage -= this.equipment?.boots?.degrade(damage) || 0;
    this.hp -= damage;
  }
}
