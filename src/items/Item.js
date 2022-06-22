import { rollDice } from '../utils/rollDice.js';
import { get, set, createStore, del } from '../../libs/idb-keyval.js';
import { Initializeable } from '../utils/baseClasses/initializable.js';

/** @type {IDBObjectStore} */
const idbStore = createStore('items', 'itemStore');

export class Item extends Initializeable {
  /** @type {Timeout} */
  #saveTimeout = null;
  /** @type {Date} */
  #created;
  /**
   *
   * @param {ItemParams} itemParamsRaw
   */
  constructor(itemParamsRaw) {
    super();
    const itemParams = { ...{ power: 1, strength: 1, effects: new Map() }, ...itemParamsRaw };
    if (itemParams.id) {
      this.id = itemParams.id;
      this.hydrate(itemParams.id);
      return this;
    } else this.id = crypto.randomUUID();
    this.initialize(itemParams);
  }

  static async #build(item) {
    const [{ Weapon }, { Body }, { Hands }, { Head }, { Boots }] = await Promise.all([
      import('../items/Weapon.js'),
      import('../items/Body.js'),
      import('../items/Hands.js'),
      import('../items/Head.js'),
      import('../items/Boots.js'),
    ]);
    const type = {
      Weapon: Weapon,
      Body: Body,
      Hands: Hands,
      Head: Head,
      Boots: Boots,
    };
    return new type[item.itemType](item);
  }

  static async retrieve(item = {}) {
    console.log(item);
    return this.#build(await get(item.id ?? item, idbStore));
  }

  /**
   * hydrate the item from the idb
   * @param {string} id the id of the item
   */
  async hydrate(id) {
    const item = await get(id, idbStore);
    this.initialize(item, true);
  }

  initialize(
    {
      power,
      strength,
      name,
      effects = new Map(),
      gemSlots = 0,
      gems = new Map(),
      created = new Date(),
    },
    skipSave,
  ) {
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
    this.gemSlots = gemSlots;
    this.gems = gems;
    if (!skipSave) this.#saveItem();
    this._initialized = true;
    this.#created = created;
  }

  #saveItem() {
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(() => {
      if (this.destroyed) return;
      set(this.id, this.serialized, idbStore);
    }, 100);
  }

  get price() {
    return this.strength + this.power + this.gemSlots;
  }

  get serialized() {
    return { ...this, type: this.type, created: this.created };
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
 * @typedef {Item} Item
 */

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
