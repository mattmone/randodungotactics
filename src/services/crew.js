import { Character } from '../character.js';
import { oneOf } from '../utils/oneOf.js';
import { get, set, del } from '../../libs/idb-keyval.js';
import { rollDice } from '../utils/rollDice.js';

const colors = [
  { name: 'White', hex: 0xffffff },
  { name: 'Red', hex: 0xff0000 },
  { name: 'Orange', hex: 0xffa500 },
  { name: 'Yellow', hex: 0xffff00 },
  { name: 'Green', hex: 0x008000 },
  { name: 'Blue', hex: 0x0000ff },
  { name: 'Purple', hex: 0x800080 },
  { name: 'Black', hex: 0x000000 },
  { name: 'Alice Blue', hex: 0xf0f8ff },
  { name: 'Antique White', hex: 0xfaebd7 },
  { name: 'Aqua', hex: 0x00ffff },
  { name: 'Aquamarine', hex: 0x7fffd4 },
  { name: 'Azure', hex: 0xf0ffff },
  { name: 'Beige', hex: 0xf5f5dc },
  { name: 'Bisque', hex: 0xffe4c4 },
  { name: 'Blanched Almond', hex: 0xffebcd },
  { name: 'Blue Violet', hex: 0x8a2be2 },
  { name: 'Brown', hex: 0xa52a2a },
  { name: 'Burly Wood', hex: 0xdeb887 },
  { name: 'Cadet Blue', hex: 0x5f9ea0 },
  { name: 'Chartreuse', hex: 0x7fff00 },
  { name: 'Chocolate', hex: 0xd2691e },
  { name: 'Coral', hex: 0xff7f50 },
  { name: 'Corn Flower Blue', hex: 0x6495ed },
  { name: 'Corn Silk', hex: 0xfff8dc },
  { name: 'Crimson', hex: 0xdc143c },
  { name: 'Cyan', hex: 0x00ffff },
  { name: 'Dark Blue', hex: 0x00008b },
  { name: 'Dark Cyan', hex: 0x008b8b },
  { name: 'Dark Goldenrod', hex: 0xb8860b },
  { name: 'Dark Gray', hex: 0xa9a9a9 },
  { name: 'Dark Green', hex: 0x006400 },
  { name: 'Dark Khaki', hex: 0xbdb76b },
  { name: 'Dark Magenta', hex: 0xbd008b },
  { name: 'Dark Olive Green', hex: 0x556b2f },
  { name: 'Dark Orange', hex: 0xff8c00 },
  { name: 'Dark Orchid', hex: 0x9932cc },
  { name: 'Dark Red', hex: 0x8b0000 },
  { name: 'Dark Salmon', hex: 0xe9967a },
  { name: 'Dark Sea Green', hex: 0x8fbc8f },
  { name: 'Dark Slate Blue', hex: 0x483d8b },
  { name: 'Dark Slate Gray', hex: 0x2f4f4f },
  { name: 'Dark Turquoise', hex: 0x00ced1 },
  { name: 'Dark Violet', hex: 0x9400d3 },
  { name: 'Deep Pink', hex: 0xff1493 },
  { name: 'Deep Sky Blue', hex: 0x00bfff },
  { name: 'Dim Gray', hex: 0x696969 },
  { name: 'Dodger Blue', hex: 0x1e90ff },
  { name: 'Fire Brick', hex: 0xb22222 },
  { name: 'Floral White', hex: 0xfffaf0 },
  { name: 'Forest Green', hex: 0x228b22 },
  { name: 'Fuschia', hex: 0xff00ff },
  { name: 'Gainsboro', hex: 0xdcdcdc },
  { name: 'Ghost White', hex: 0xf8f8ff },
  { name: 'Gold', hex: 0xffd700 },
  { name: 'Goldenrod', hex: 0xdaa520 },
  { name: 'Gray', hex: 0x808080 },
  { name: 'Green Yellow', hex: 0xadff2f },
  { name: 'Honeydew', hex: 0xf0fff0 },
  { name: 'Hot Pink', hex: 0xff69b4 },
  { name: 'Indian Red', hex: 0xcd5c5c },
  { name: 'Indigo', hex: 0x4b0082 },
  { name: 'Ivory', hex: 0xfffff0 },
  { name: 'Khaki', hex: 0xf0e68c },
  { name: 'Lavender', hex: 0xe6e6fa },
  { name: 'Lavender Blush', hex: 0xfff0f5 },
  { name: 'Lemon Chiffon', hex: 0xfffacd },
  { name: 'Light Blue', hex: 0xadd8e6 },
  { name: 'Light Coral', hex: 0xf08080 },
  { name: 'Light Cyan', hex: 0xe0ffff },
  { name: 'Light Goldenrod Yellow', hex: 0xfafad2 },
  { name: 'Light Green', hex: 0x90ee90 },
  { name: 'Light Grey', hex: 0xd3d3d3 },
  { name: 'Light Pink', hex: 0xffb6c1 },
  { name: 'Light Salmon', hex: 0xffa07a },
  { name: 'Light Sea Green', hex: 0x20b2aa },
  { name: 'Light Sky Blue', hex: 0x87cefa },
  { name: 'Light Slate Gray', hex: 0x778899 },
  { name: 'Light Steel Blue', hex: 0xb0c4de },
  { name: 'Light Yellow', hex: 0xffffe0 },
  { name: 'Lime', hex: 0x00ff00 },
  { name: 'Lime Green', hex: 0x32cd32 },
  { name: 'Linen', hex: 0xfaf0e6 },
  { name: 'Magenta', hex: 0xff00ff },
  { name: 'Maroon', hex: 0x800000 },
  { name: 'Medium Aquamarine', hex: 0x66cdaa },
  { name: 'Medium Blue', hex: 0x0000cd },
  { name: 'Medium Orchid', hex: 0xba55d3 },
  { name: 'Medium Purple', hex: 0x9370db },
  { name: 'Medium Sea Green', hex: 0x3cb371 },
  { name: 'Medium Slate Blue', hex: 0x7b68ee },
  { name: 'Medium Spring Green', hex: 0x00fa9a },
  { name: 'Medium Turquoise', hex: 0x48d1cc },
  { name: 'Medium Violet Red', hex: 0xc71585 },
  { name: 'Midnight Blue', hex: 0x191970 },
  { name: 'Mint Cream', hex: 0xf5fffa },
  { name: 'Misty Rose', hex: 0xffe4e1 },
  { name: 'Navajo White', hex: 0xffdead },
  { name: 'Navy', hex: 0x000080 },
  { name: 'Old Lace', hex: 0xfdf5e6 },
  { name: 'Olive', hex: 0x808000 },
  { name: 'Olive Drab', hex: 0x6b8e23 },
  { name: 'Orange Red', hex: 0xff4500 },
  { name: 'Orchid', hex: 0xda70d6 },
  { name: 'Pale Goldenrod', hex: 0xeee8aa },
  { name: 'Pale Green', hex: 0x98fb98 },
  { name: 'Pale Turquoise', hex: 0xafeeee },
  { name: 'Pale Violet Red', hex: 0xdb7093 },
  { name: 'Papaya Whip', hex: 0xffefd5 },
  { name: 'Peach Puff', hex: 0xffdab9 },
  { name: 'Peru', hex: 0xcd853f },
  { name: 'Pink', hex: 0xffc0cb },
  { name: 'Plum', hex: 0xdda0dd },
  { name: 'Powder Blue', hex: 0xb0e0e6 },
  { name: 'Rosy Brown', hex: 0xbc8f8f },
  { name: 'Royal Blue', hex: 0x4169e1 },
  { name: 'Saddle Brown', hex: 0x8b4513 },
  { name: 'Sea Green', hex: 0x2e8b57 },
  { name: 'Sea Shell', hex: 0xfff5ee },
  { name: 'Sienna', hex: 0xa0522d },
  { name: 'Silver', hex: 0xc0c0c0 },
  { name: 'Sky Blue', hex: 0x87ceeb },
  { name: 'Slate Blue', hex: 0x6a5acd },
  { name: 'Slate Gray', hex: 0x708090 },
  { name: 'Snow', hex: 0xfffafa },
  { name: 'Spring Green', hex: 0x00ff7f },
  { name: 'Steel Blue', hex: 0x4682b4 },
  { name: 'Tan', hex: 0xd2b486 },
  { name: 'Teal', hex: 0x008080 },
  { name: 'Thistle', hex: 0xd8bfdb },
  { name: 'Tomato', hex: 0xff6347 },
  { name: 'Turquoise', hex: 0x40e0d0 },
  { name: 'Violet', hex: 0xee82ee },
  { name: 'Wheat', hex: 0xf5deb3 },
  { name: 'White Smoke', hex: 0xf5f5f5 },
  { name: 'Yellow Green', hex: 0x9acd32 },
];

export class Crew {
  /** @type {Character[]} */
  #members = [];
  #saveCrewTimeout = null;
  #ready = false;

  constructor(id = 'player') {
    this.id = id;
    get(`crew/${id}`).then(async crew => {
      if (crew) this.#members = crew.map(member => new Character({ id: member }));
      await Promise.all(this.#members.map(member => member.initialized));
      this.#ready = true;
    });
  }

  get ready() {
    return new Promise(resolve => {
      setInterval(() => {
        if (this.#ready) resolve(this);
      }, 25);
    });
  }

  get members() {
    return this.#members;
  }

  get membersById() {
    return this.#members.map(member => member.id);
  }

  set members(_) {
    throw Error('Crew.members is read-only');
  }

  #saveCrew() {
    clearTimeout(this.#saveCrewTimeout);
    this.#saveCrewTimeout = setTimeout(() => {
      set(`crew/${this.id}`, this.membersById);
    }, 100);
  }

  add(member = {}) {
    const newMember = member instanceof Character ? member : new Character(member);
    this.#members = [...this.members, newMember];
    this.#saveCrew();
    return newMember;
  }

  remove(removedMember, nonDestructive) {
    this.#members = this.members.filter(member => member !== removedMember);
    if (!nonDestructive) removedMember.destroy();
    this.#saveCrew();
  }

  disband() {
    this.#members.forEach(member => member.destroy());
    this.#members = [];
    this.#saveCrew();
  }

  async random({ quantity = 1, level = 1, withEquipment = false }) {
    const distributePoints = (points, possibilities, max = 10, favored) => {
      while (points > 0) {
        const choices = Array.from(points % 2 === 0 && favored ? favored : possibilities.keys());
        const chosen = oneOf(choices);
        const currentLevel = possibilities.get(chosen).level;
        if (currentLevel <= max) {
          possibilities.set(chosen, {
            ...possibilities.get(chosen),
            level: currentLevel + 1,
          });
          points--;
        }
      }
    };
    return Promise.all(
      new Array(quantity).fill(0).map(async () => {
        const characterOptions = {};
        const { names } = await import('../constants/names.js');
        characterOptions.name = oneOf(names);
        characterOptions.color = oneOf(colors);
        characterOptions.stats = new Map([
          ['strength', { level: 1, progression: 0 }],
          [
            'constitution',
            {
              level: 1,
              progression: 0,
            },
          ],
          [
            'dexterity',
            {
              level: 1,
              progression: 0,
            },
          ],
          ['speed', { level: 1, progression: 0 }],
          [
            'intellect',
            {
              level: 1,
              progression: 0,
            },
          ],
          ['magic', { level: 1, progression: 0 }],
        ]);
        const focus = oneOf(['stealth', 'magic', 'melee', 'ranged']);
        const favoredStats = [];
        if (focus === 'stealth') {
          favoredStats.push('speed', 'dexterity', 'intellect');
        } else if (focus === 'magic') {
          favoredStats.push('magic', 'intellect', 'dexterity');
        } else if (focus === 'melee') {
          favoredStats.push('strength', 'constitution', 'dexterity');
        } else if (focus === 'ranged') {
          favoredStats.push('dexterity', 'speed', 'strength');
        }
        const skills = [];
        if (focus === 'stealth') {
          skills.push(
            ['athletics', { level: 0, progression: 0 }],
            ['acrobatics', { level: 0, progression: 0 }],
            ['flanking', { level: 0, progression: 0 }],
            ['defend', { level: 0, progression: 0 }],
            [oneOf(['sword', 'knife', 'crossbow']), { level: 0, progression: 0 }],
          );
        } else if (focus === 'magic') {
          skills.push(
            ['arcana: destruction', { level: 0, progression: 0 }],
            ['arcana: healing', { level: 0, progression: 0 }],
            ['arcana: support', { level: 0, progression: 0 }],
            ['defend', { level: 0, progression: 0 }],
            ['staff', { level: 0, progression: 0 }],
          );
        } else if (focus === 'melee') {
          const weapons = ['sword', 'axe', 'knife', 'polearm', 'unarmed'];
          const weapon1 = oneOf(weapons);
          const weapon2 = oneOf(weapons.filter(weapon => weapon !== weapon1));
          skills.push(
            ['athletics', { level: 0, progression: 0 }],
            ['acrobatics', { level: 0, progression: 0 }],
            ['defend', { level: 0, progression: 0 }],
            [weapon1, { level: 0, progression: 0 }],
            [weapon2, { level: 0, progression: 0 }],
          );
        } else if (focus === 'ranged') {
          const weapons = ['shortbow', 'longbow', 'crossbow'];
          const weapon1 = oneOf(weapons);
          skills.push(
            ['athletics', { level: 0, progression: 0 }],
            ['acrobatics', { level: 0, progression: 0 }],
            ['flanking', { level: 0, progression: 0 }],
            ['defend', { level: 0, progression: 0 }],
            [weapon1, { level: 0, progression: 0 }],
          );
        }

        characterOptions.skills = new Map(skills);
        let statPoints = 4 * 6 * level;
        let skillPoints = 4 * 6 * level;
        distributePoints(statPoints, characterOptions.stats, level * 10, favoredStats);
        distributePoints(skillPoints, characterOptions.skills, level * 10);

        const character = this.add(characterOptions);

        if (!withEquipment) return character;
        const {
          randomHead,
          randomBody,
          randomBoots,
          randomSword,
          randomAxe,
          randomPolearm,
          randomKnife,
          randomShortbow,
          randomLongbow,
          randomCrossbow,
          randomStaff,
          randomHands,
        } = await import('../utils/randomItem.js');
        const possibilities = [];
        if (character.skills.has('sword')) possibilities.push(randomSword);
        if (character.skills.has('axe')) possibilities.push(randomAxe);
        if (character.skills.has('polearm')) possibilities.push(randomPolearm);
        if (character.skills.has('knife')) possibilities.push(randomKnife);
        if (character.skills.has('shortbow')) possibilities.push(randomShortbow);
        if (character.skills.has('longbow')) possibilities.push(randomLongbow);
        if (character.skills.has('crossbow')) possibilities.push(randomCrossbow);
        if (character.skills.has('staff')) possibilities.push(randomStaff);
        if (possibilities.length) character.equip('primary hand', await oneOf(possibilities)());
        if (rollDice(6) >= 3) character.equip('body', await randomBody());
        if (rollDice(6) >= 4) character.equip('head', await randomHead());
        if (rollDice(6) >= 5) character.equip('boots', await randomBoots());
        if (rollDice(6) >= 6) character.equip('hands', await randomHands());
        return character;
      }),
    );
  }
}