import { Item } from './Item.js';

export class Weapon extends Item {
  /**
   *
   * @param {WeaponParams} weaponParams
   */
  constructor(weaponParams) {
    super(weaponParams);
    /** @type {Number} */
    this.type = 'weapon';
    this.range = weaponParams.range || 1;
    this.hands = weaponParams.hands || 1;
  }
}

/**
 * @typedef {Object} WeaponParamsAugmenation
 * @property {Number} [range=1]
 * @property {Number} [hands=1]
 *
 * @typedef {import('./Item').ItemParams & WeaponParamsAugmenation} WeaponParams
 */
