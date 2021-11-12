/**
 * @typedef {Object} Stats
 * @property {Number} strength
 * @property {Number} dexterity
 * @property {Number} consitution
 * @property {Number} speed
 * @property {Number} intellect
 * @property {Number} magic
 *
 * @typedef {Object} Skills
 *
 * @typedef {Object} CharacterOptions
 * @property {String} [id]
 * @property {String} name
 * @property {String} color
 * @property {Stats} [stats]
 * @property {Skills} [skills]
 * @property {Position} [position]
 * @property {Map} [effects]
 * @property {Map} [modifiers]
 * @property {Map} [equipment]
 * @property {Number} [direction]
 * @property {Number} [hp]
 * @property {Number} [mana]
 */
import { DIRECTION } from './constants/directions.js';

import { Avatar } from './Avatar.js';
import { get, set, del, createStore } from '../libs/idb-keyval.js';
import { Weapon } from './items/Weapon.js';
import { Body } from './items/Body.js';
import { Hands } from './items/Hands.js';
import { Head } from './items/Head.js';
import { Boots } from './items/Boots.js';

const idbStore = createStore('characters', 'characterStore');

function rebuild(key, value) {
  const type = {
    Weapon: Weapon,
    Body: Body,
    Hands: Hands,
    Head: Head,
    Boots: Boots,
  };
  return new type[key](value);
}
export class Character {
  #saveTimeout = null;
  #name;
  #color;
  #stats;
  #skills;
  #position;
  #effects;
  #modifiers;
  #equipment;
  #direction;
  #hp;
  #mana;
  #initialized = false;
  #created;
  /**
   * creates a Character instance
   * @param {CharacterOptions} options
   */
  constructor({
    id,
    name = '',
    color = { name: 'red', hex: '#ff0000' },
    stats = new Map([
      ['strength', { value: 1, progression: 1 }],
      ['dexterity', { value: 1, progression: 1 }],
      ['constitution', { value: 1, progression: 1 }],
      ['speed', { value: 1, progression: 1 }],
      ['intellect', { value: 1, progression: 1 }],
      ['magic', { value: 1, progression: 1 }],
    ]),
    skills = new Map(),
    position = false,
    effects = new Map(),
    modifiers = new Map(),
    equipment = new Map(),
    direction = DIRECTION.NORTH,
  }) {
    if (id) {
      this.#hydrate(id);
      return this;
    } else id = crypto.randomUUID();
    this.#initialize({
      id,
      name,
      color,
      stats,
      skills,
      position,
      effects,
      modifiers,
      equipment,
      direction,
    });
  }

  get serialized() {
    return {
      id: this.id,
      name: this.name,
      color: this.avatar.serialized,
      stats: this.stats,
      skills: this.skills,
      position: this.position,
      effects: this.effects,
      modifiers: this.modifiers,
      equipment: this.equipment,
      direction: this.direction,
      hp: this.hp,
      mana: this.mana,
      created: this.#created,
    };
  }

  async #hydrate(id) {
    const character = await get(id, idbStore);
    this.#initialize(character);
  }

  #initialize({
    id,
    name,
    color,
    stats,
    skills,
    position,
    effects,
    modifiers,
    equipment,
    direction,
    hp,
    mana,
    created = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.avatar = new Avatar({ color });
    /** @type {Stats} */
    this.stats = stats;
    this.skills = skills;
    this.position = position;
    this.effects = effects;
    this.modifiers = modifiers;
    this.equipment = new Map(
      equipment
        ? Array.from(equipment.entries()).map(([key, value]) => [
            key,
            rebuild(value.itemType, value),
          ])
        : [],
    );
    this.direction = direction;
    this.hp = hp;
    this.mana = mana;
    this.#created = created;
    this.#initialized = true;
  }

  #saveCharacter() {
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(() => {
      if (this.destroyed) return;
      console.log('setting', this.id, this.name);
      set(this.id, this.serialized, idbStore);
    }, 100);
  }

  //#region getters/setters
  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
    this.#saveCharacter();
  }
  get color() {
    return this.#color;
  }
  set color(color) {
    this.#color = color;
    this.#saveCharacter();
  }
  get stats() {
    return this.#stats;
  }
  set stats(stats) {
    this.#stats = stats;
    this.#saveCharacter();
  }
  get skills() {
    return this.#skills;
  }
  set skills(skills) {
    this.#skills = skills;
    this.#saveCharacter();
  }
  get position() {
    return this.#position;
  }
  set position(position) {
    this.#position = position;
    this.#saveCharacter();
  }
  get modifiers() {
    return this.#modifiers;
  }
  set modifiers(modifiers) {
    this.#modifiers = modifiers;
    this.#saveCharacter();
  }
  get effects() {
    return this.#effects;
  }
  set effects(effects) {
    this.#effects = effects;
    this.#saveCharacter();
  }
  get equipment() {
    return this.#equipment;
  }
  set equipment(equipment) {
    this.#equipment = equipment;
    this.#saveCharacter();
  }
  get direction() {
    return this.#direction;
  }
  set direction(direction) {
    this.#direction = direction;
    this.#saveCharacter();
  }
  //#endregion
  get initialized() {
    return new Promise(resolve => {
      setInterval(() => {
        if (this.#initialized) resolve(true);
      }, 10);
    });
  }
  get created() {
    return this.#created || new Date();
  }

  get availableHands() {
    return (
      2 -
      (this.equipment.get('primary hand')?.hands || 0) -
      (this.equipment.get('secondary hand')?.hands || 0)
    );
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
    return this.equipment.get('primary hand')?.range || 1;
  }

  get damage() {
    return [
      (this.equipment.get('primary hand')?.strength || 0) + this.stats.get('strength').value,
      (this.equipment.get('primary hand')?.power || 0) + this.stats.get('dexterity').value,
    ];
  }

  get tile() {
    return this.avatar.mesh.userData.childOf;
  }

  set tile(tile) {
    this.avatar.mesh.userData.childOf = tile;
  }

  get move() {
    return 2 + 0.1 * this.stats.get('dexterity').value + (this.modifiers.move ?? 0);
  }

  /** @type {Number} */
  get maxhp() {
    return (
      this.stats.get('constitution').value * 10 +
      this.stats.get('strength').value * 5 +
      (this.modifiers.hp ?? 0)
    );
  }

  /** @type {Number} */
  get maxmana() {
    return (
      this.stats.get('intellect').value * 10 +
      this.stats.get('magic').value * 5 +
      (this.modifiers.mana ?? 0)
    );
  }

  get passable() {
    const {
      name,
      stats,
      skills,
      position,
      effects,
      modifiers,
      hp,
      mana,
      maxmana,
      maxhp,
      move,
      placed,
    } = this;
    return {
      name,
      stats,
      skills,
      position,
      effects,
      modifiers,
      hp,
      mana,
      maxmana,
      maxhp,
      move,
      placed,
    };
  }

  get hp() {
    return this.#hp === undefined ? this.maxhp : this.#hp;
  }

  set hp(value) {
    this.#hp = value;
    this.#saveCharacter();
  }

  get mana() {
    return this.#mana === undefined ? this.maxmana : this.#mana;
  }

  set mana(value) {
    this.#mana = value;
    this.#saveCharacter();
  }

  get handsFull() {
    return (
      (this.equipment.get('primary hand')?.hands || 0) +
        (this.equipment.get('secondary hand')?.hands || 0) >=
      2
    );
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

  equip(category, item) {
    const removedItem = this.equipment.get(category);
    this.equipment.set(category, item);
    this.#saveCharacter();
    return removedItem;
  }

  unequip(category) {
    const removedItem = this.equipment.get(category);
    this.equipment.delete(category);
    this.#saveCharacter();
    return removedItem;
  }

  degradeWeapon(damage, secondary) {
    if (secondary) return this.equipment.get('secondary')?.degrade(damage / 10);
    return this.equipment.get('primary')?.degrade(damage / 10);
  }

  distributeDamage(damage) {
    damage -= this.equipment.get('body')?.degrade(damage) || 0;
    damage -= this.equipment.get('helm')?.degrade(damage) || 0;
    damage -= this.equipment.get('gloves')?.degrade(damage) || 0;
    damage -= this.equipment.get('boots')?.degrade(damage) || 0;
    this.hp -= damage;
  }
  destroy() {
    this.destroyed = true;
    for (const item of this.equipment.values()) item.destroy();
    del(this.id, idbStore);
  }
}
