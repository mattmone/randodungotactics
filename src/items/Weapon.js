import { Item } from './Item.js';

export class Weapon extends Item {
  initialize(weaponParams, skipSave) {
    this.range = weaponParams.range || 1;
    this.hands = weaponParams.hands || 1;
    this.subType = weaponParams.subType || 'sword';
    this.category = weaponParams.category || 'melee';
    super.initialize(weaponParams, skipSave);
  }

  get type() {
    return 'weapon';
  }

  get skill() {
    return this.subType;
  }
}

/**
 * @typedef {Object} WeaponParamsAugmenation
 * @property {Number} [range=1]
 * @property {Number} [hands=1]
 *
 * @typedef {import('./Item').ItemParams & WeaponParamsAugmenation} WeaponParams
 */
