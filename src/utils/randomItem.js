import { oneOf } from './oneOf.js';
import { rollDice } from './rollDice.js';

const bodyNames = ['curiass', 'breastplate', 'chestplate', 'vest', 'chestpiece'];
const bootNames = ['boots', 'shoes', 'greaves', 'footguards'];
const handNames = ['gloves', 'gauntlets', 'bracer', 'vambrace'];
const headNames = ['helm', 'helmet', 'crown', 'hood', 'headguard'];
const swordNames = ['sword', 'longsword', 'broadsword', 'rapier'];
const knifeNames = ['knife', 'dagger', 'stiletto', 'shank', 'sabre'];
const axeNames = ['axe', 'battleaxe', 'waraxe', 'greataxe'];
const polearmNames = ['polearm', 'spear', 'trident', 'lance', 'pike', 'halberd'];
const shortbowNames = ['bow', 'shortbow', 'hornbow', 'saddlebow'];
const longbowNames = ['longbow', 'compositebow'];
const crossbowNames = ['crossbow', 'arbalest'];
const shieldNames = ['shield', 'buckler', 'kite', 'tower', 'pavise', 'scutum'];
const randomItems = [
  randomBody,
  randomBoots,
  randomHands,
  randomHead,
  randomSword,
  randomKnife,
  randomAxe,
  randomPolearm,
  randomShortbow,
  randomLongbow,
  randomCrossbow,
];

function rollStat({ stat = 1, level = 1, maximum = level * 100 }) {
  let dieRoll = rollDice(20);
  while ((dieRoll === 20 || dieRoll + level - stat >= 20) && stat < maximum) {
    stat++;
    dieRoll = rollDice(20);
  }
  return stat;
}

export async function randomBody(level) {
  const { Body } = await import('../items/Body.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = rollStat({ level });
  const strength = rollStat({ level });
  const item = new Body({ power, strength, name: oneOf(bodyNames) });
  return item;
}

export async function randomBoots(level) {
  const { Boots } = await import('../items/Boots.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = rollStat({ level });
  const strength = rollStat({ level });
  const item = new Boots({ power, strength, name: oneOf(bootNames) });
  return item;
}
export async function randomHands(level) {
  const { Hands } = await import('../items/Hands.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = rollStat({ level });
  const strength = rollStat({ level });
  const item = new Hands({ power, strength, name: oneOf(handNames) });
  return item;
}
export async function randomHead(level) {
  const { Head } = await import('../items/Head.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = rollStat({ level });
  const strength = rollStat({ level });
  const item = new Head({ power, strength, name: oneOf(headNames) });
  return item;
}
async function randomWeapon({ level, hands, powerModifier, range, name, subType, category }) {
  const { Weapon } = await import('../items/Weapon.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = Math.ceil(rollStat({ level }) * powerModifier);
  const strength = rollStat({ level });
  const item = new Weapon({ power, strength, hands, range, name, subType, category });
  return item;
}
export async function randomSword(level) {
  return await randomWeapon({
    level,
    hands: 1,
    powerModifier: 1.5,
    range: 1,
    name: oneOf(swordNames),
    category: 'melee',
    subType: 'sword',
  });
}
export async function randomAxe(level) {
  return await randomWeapon({
    level,
    hands: 1,
    powerModifier: 1.5,
    range: 1,
    name: oneOf(axeNames),
    category: 'melee',
    subType: 'axe',
  });
}
export async function randomKnife(level) {
  return await randomWeapon({
    level,
    hands: 1,
    powerModifier: 1,
    range: 1,
    name: oneOf(knifeNames),
    category: 'melee',
    subType: 'knife',
  });
}

export async function randomPolearm(level) {
  return await randomWeapon({
    level,
    hands: 2,
    powerModifier: 2,
    range: 2,
    name: oneOf(polearmNames),
    category: 'melee',
    subType: 'polearm',
  });
}

export async function randomShortbow(level) {
  return await randomWeapon({
    level,
    hands: 2,
    powerModifier: 1,
    range: 4,
    name: oneOf(shortbowNames),
    category: 'ranged',
    subType: 'shortbow',
  });
}
export async function randomLongbow(level) {
  return await randomWeapon({
    level,
    hands: 2,
    powerModifier: 2,
    range: 6,
    name: oneOf(longbowNames),
    category: 'ranged',
    subType: 'longbow',
  });
}
export async function randomCrossbow(level) {
  return await randomWeapon({
    level,
    hands: 2,
    powerModifier: 3,
    range: 3,
    name: oneOf(crossbowNames),
    category: 'ranged',
    subType: 'crossbow',
  });
}
export async function randomItem(level) {
  return oneOf(randomItems)(level);
}
