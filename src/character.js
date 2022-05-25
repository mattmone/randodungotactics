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
 * @typedef {Object} AvatarColorOffset
 * @property {HSLColor} [eyes] the color of the eyes
 * @property {HSLColor} [pupils] the color of the eyes
 * @property {HSLColor} [eyebrows] the color of the eyebrows
 * @property {HSLColor} [body] the color offset of the body
 * @property {HSLColor} [boots] the color offset of the body
 * @property {HSLColor} [hands] the color offset of the body
 * @property {HSLColor} [hair] the color offset of the hair
 *
 * @typedef {Object} HSLColor
 * @property {Boolean} [set] whether the color is set(true) or offset(falsey)
 * @property {Number} h between 0 and 1
 * @property {Number} s between 0 and 1
 * @property {Number} l between 0 and 1
 * 
 * @typedef {Object} CharacterOptions
 * @property {String} [id]
 * @property {String} name
 * @property {AvatarColorOffset} colorOffset
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

import { skillModifier } from './utils/skillModifier.js';
import { statModifier } from './utils/statModifier.js';

const idbStore = createStore('characters', 'characterStore');

function rebuild(key, value) {
  const type = {
    Weapon: Weapon,
    Body: Body,
    Hands: Hands,
    Head: Head,
    Boots: Boots,
  };
  console.log(key, value);
  return new type[key](value);
}
export class Character {
  #saveTimeout = null;
  #name;
  #colorOffset;
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
    colorOffset = {},
    stats = new Map([
      ['strength', { level: 1, progression: 1 }],
      ['dexterity', { level: 1, progression: 1 }],
      ['constitution', { level: 1, progression: 1 }],
      ['speed', { level: 1, progression: 1 }],
      ['intellect', { level: 1, progression: 1 }],
      ['magic', { level: 1, progression: 1 }],
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
      colorOffset,
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
      colorOffset: this.avatar.serialized,
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
    colorOffset,
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
    this.avatar = new Avatar({ colorOffset });
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
      set(this.id, this.serialized, idbStore);
    }, 50);
  }

  //#region getters/setters
  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
    this.#saveCharacter();
  }
  get colorOffset() {
    return this.#colorOffset;
  }
  set colorOffset(colorOffset) {
    this.#colorOffset = colorOffset;
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

  get primaryAttack() {
    return this.equipment.get('primary hand')?.category || 'melee';
  }

  get damage() {
    const primary = this.equipment.get('primary hand') ?? {
      subType: 'unarmed',
      skill: 'unarmed',
      hands: 1,
      range: 1,
      category: 'melee',
      strength: Math.round(this.stats.get('strength').level / 2),
      power: Math.round(this.stats.get('dexterity').level / 2),
    };
    const skill = this.skills.get(primary.skill)?.level || 0;
    return [
      Math.max(1, Math.round(primary.strength * statModifier(this.stats.get('strength').level))),
      Math.max(1, Math.round(primary.power * skillModifier(skill))),
    ];
  }

  get tile() {
    return this.avatar.mesh.userData.childOf;
  }

  set tile(tile) {
    this.avatar.mesh.userData.childOf = tile;
  }

  get move() {
    return Math.max(
      2,
      2 * statModifier(this.stats.get('dexterity').level) + (this.modifiers.get('move') ?? 0),
    );
  }

  /** @type {Number} */
  get maxhp() {
    return (
      this.stats.get('constitution').level * 10 +
      this.stats.get('strength').level * 5 +
      (this.modifiers.hp ?? 0)
    );
  }

  /** @type {Number} */
  get maxmana() {
    return (
      this.stats.get('intellect').level * 10 +
      this.stats.get('magic').level * 5 +
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
  //#endregion

  setup() {
    /** @type {Number} */
    this.hp = this.maxhp;
    /** @type {Number} */
    this.mana = this.maxmana;
  }

  async die() {
    console.log('died');
    return;
  }

  progressSkill(skillUsed) {
    let characterSkill = this.skills.get(skillUsed);
    if (!characterSkill)
      characterSkill = {
        level: 1,
        progression: 0,
      };
    else characterSkill.progression += Math.max(50 - characterSkill.level * 2, 1);
    if (characterSkill.progression >= 100) {
      characterSkill.progression = 0;
      characterSkill.level++;
    }
    this.skills.set(skillUsed, characterSkill);
    this.#saveCharacter();
  }

  progressStat(statUsed) {
    let characterStat = this.stats.get(statUsed);
    characterStat.progression += Math.max(10 - characterStat.level, 1);
    if (characterStat.progression >= 100) {
      characterStat.progression = 0;
      characterStat.level++;
    }
    this.stats.set(statUsed, characterStat);
    this.#saveCharacter();
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
