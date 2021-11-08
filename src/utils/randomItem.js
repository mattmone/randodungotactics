import { oneOf } from './oneOf.js';
import { rollDice } from './rollDice.js';

const bodyNames = ['curiass', 'breastplate', 'chestplate', 'vest', 'chestpiece'];
const bootNames = ['boots', 'shoes', 'greaves', 'footguards'];
const handNames = ['gloves', 'gauntlets', 'bracer', 'vambrace'];
const headNames = ['helm', 'helmet', 'crown', 'hood', 'headguard'];
const oneHandedNames = ['sword', 'longsword', 'dagger', 'dirk', 'knife', 'broadsword', 'axe'];
const twoHandedNames = ['greatsword', 'claymore', 'flamberge', 'pike', 'halbard'];
const rangedNames = ['crossbow', 'shortbow', 'longbow', 'bow', 'sling'];
const randomItems = [
  randomBody,
  randomBoots,
  randomHands,
  randomHead,
  randomOneHanded,
  randomTwoHanded,
  randomRanged,
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
async function randomWeapon(level, hands, powerModifier, range, name) {
  const { Weapon } = await import('../items/Weapon.js');
  // let effects = [];
  // while(rollDice(20) >= 21-level)
  const power = Math.ceil(rollStat({ level }) * powerModifier);
  const strength = rollStat({ level });
  const item = new Weapon({ power, strength, hands, range, name });
  return item;
}
export async function randomOneHanded(level) {
  return await randomWeapon(level, 1, 1, 1, oneOf(oneHandedNames));
}
export async function randomTwoHanded(level) {
  return await randomWeapon(level, 2, 1.5, 1, oneOf(twoHandedNames));
}
export async function randomRanged(level) {
  return await randomWeapon(level, 2, 1, 5, oneOf(rangedNames));
}
export async function randomItem(level) {
  return oneOf(randomItems)(level);
}
