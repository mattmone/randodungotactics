import { rollDice } from '../utils/rollDice.js';

export class Item {
  /**
   *
   * @param {ItemParams} param0
   */
  constructor({ power = 1, strength = 1, name, effects = new Map() }) {
    /** @type {String} */
    this.name = name;
    /** @type {Number} */
    this.power = power;
    /** @type {Number} */
    this.strength = strength;
    /** @type {Number} */
    this.durability = this.maxdurability;
    /** @type {Map<String,Effect>} */
    this.effects = effects;
  }

  get serialized() {
    return { ...this };
  }

  get maxdurability() {
    return this.power * this.strength * 10;
  }

  get repairsNeeded() {
    return this.maxdurability - this.durability;
  }

  /**
   * degrade the item by an amount of damage
   * @param {Number} damage the damage to degrade the item by
   * @returns {Number}
   */
  degrade(damage) {
    const soak = rollDice(this.power, this.strength) + (this.modifier?.soak || 0);
    this.durability -= soak;
    return damage - soak;
  }

  /**
   * repair the item by an amount
   * @param {Number} amount the amount of repairs
   * @returns {Number}
   */
  repair(amount = this.repairsNeeded) {
    this.durability += amount;
    return amount;
  }
}

/**
 * @typedef {Object} ItemParams
 * @property {Number} power
 * @property {Number} strength
 * @property {String} name
 * @property {Map<String,Effect>} effects
 */

/**
 * @typedef {Object} Effect
 * @property {String} display
 * @property {Number} power
 * @property {number} strength
 */
