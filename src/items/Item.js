import { rollDice } from '../utils/rollDice.js';
import { get, set, createStore, del } from '../../libs/idb-keyval.js';

const idbStore = createStore('items', 'itemStore');

export class Item {
  _initialized = false;
  #saveTimeout = null;
  #created;
  /**
   *
   * @param {ItemParams} param0
   */
  constructor(itemParamsRaw) {
    const itemParams = { ...itemParamsRaw, ...{ power: 1, strength: 1, effects: new Map() } };
    if (itemParams.id) {
      this.id = itemParams.id;
      this.hydrate(itemParams.id);
      return this;
    } else this.id = crypto.randomUUID();
    this.initialize(itemParams);
  }

  async hydrate(id) {
    const item = await get(id, idbStore);
    this.initialize(item, true);
  }

  initialize({ power, strength, name, effects, created = new Date() }, skipSave) {
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
    this.itemType = this.constructor.name;
    if (!skipSave) this.#saveItem();
    this._initialized = true;
    this.#created = created;
  }

  get initialized() {
    return new Promise(resolve => {
      setInterval(() => {
        if (this._initialized) resolve(true);
      }, 10);
    });
  }

  #saveItem() {
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(() => {
      if (this.destroyed) return;
      set(this.id, this.serialized, idbStore);
    }, 100);
  }

  get serialized() {
    return { ...this, created: this.created };
  }

  get created() {
    return this.#created || new Date();
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
    if (this.durability <= 0) return 0;
    const soak = rollDice(this.power, this.strength) + (this.modifier?.soak || 0);
    this.durability -= soak;
    return soak;
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

  destroy() {
    this.destroyed = true;
    del(this.id, idbStore);
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
