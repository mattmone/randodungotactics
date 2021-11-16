import { Character } from '../character.js';
import { oneOf } from '../utils/oneOf.js';
import { get, set, del } from '../../libs/idb-keyval.js';
import { rollDice } from '../utils/rollDice.js';

const names = [
  'Liam',
  'Olivia',
  'Noah',
  'Emma',
  'Oliver',
  'Ava',
  'Elijah',
  'Charlotte',
  'William',
  'Sophia',
  'James',
  'Amelia',
  'Benjamin',
  'Isabella',
  'Lucas',
  'Mia',
  'Henry',
  'Evelyn',
  'Alexander',
  'Harper',
  'Mason',
  'Camila',
  'Michael',
  'Gianna',
  'Ethan',
  'Abigail',
  'Daniel',
  'Luna',
  'Jacob',
  'Ella',
  'Logan',
  'Elizabeth',
  'Jackson',
  'Sofia',
  'Levi',
  'Emily',
  'Sebastian',
  'Avery',
  'Mateo',
  'Mila',
  'Jack',
  'Scarlett',
  'Owen',
  'Eleanor',
  'Theodore',
  'Madison',
  'Aiden',
  'Layla',
  'Samuel',
  'Penelope',
  'Joseph',
  'Aria',
  'John',
  'Chloe',
  'David',
  'Grace',
  'Wyatt',
  'Ellie',
  'Matthew',
  'Nora',
  'Luke',
  'Hazel',
  'Asher',
  'Zoey',
  'Carter',
  'Riley',
  'Julian',
  'Victoria',
  'Grayson',
  'Lily',
  'Leo',
  'Aurora',
  'Jayden',
  'Violet',
  'Gabriel',
  'Nova',
  'Isaac',
  'Hannah',
  'Lincoln',
  'Emilia',
  'Anthony',
  'Zoe',
  'Hudson',
  'Stella',
  'Dylan',
  'Everly',
  'Ezra',
  'Isla',
  'Thomas',
  'Leah',
  'Charles',
  'Lillian',
  'Christopher',
  'Addison',
  'Jaxon',
  'Willow',
  'Maverick',
  'Lucy',
  'Josiah',
  'Paisley',
];

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
      else this.random({});
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
    console.log('destroying member', removedMember.name);
    if (!nonDestructive) removedMember.destroy();
    this.#saveCrew();
  }

  disband() {
    this.#members.forEach(member => member.destroy());
    this.#members = [];
    this.#saveCrew();
  }

  random({ quantity, level } = { quantity: 1, level: 1 }) {
    for (let i = 0; i < quantity; i++) {
      const characterOptions = {};
      characterOptions.name = oneOf(names);
      characterOptions.color = oneOf(colors);
      characterOptions.stats = new Map([
        ['strength', { value: 1, progression: rollDice(99) }],
        [
          'constitution',
          {
            value: 1,
            progression: rollDice(99),
          },
        ],
        [
          'dexterity',
          {
            value: 1,
            progression: rollDice(99),
          },
        ],
        ['speed', { value: 1, progression: rollDice(99) }],
        [
          'intellect',
          {
            value: 1,
            progression: rollDice(99),
          },
        ],
        ['magic', { value: 1, progression: rollDice(99) }],
      ]);
      let points = 4 * 6 * level;
      const stats = Array.from(characterOptions.stats.keys());
      while (points > 0) {
        const stat = oneOf(stats);
        const statValue = characterOptions.stats.get(stat).value;
        if (statValue <= level * 10) {
          characterOptions.stats.set(stat, {
            ...characterOptions.stats.get(stat),
            value: statValue + 1,
          });
          points--;
        }
      }
      const character = this.add(characterOptions);
      import('../utils/randomItem.js').then(
        async ({
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
          randomHands,
        }) => {
          character.equip(
            'primary hand',
            await oneOf([
              randomSword,
              randomAxe,
              randomPolearm,
              randomKnife,
              randomShortbow,
              randomLongbow,
              randomCrossbow,
            ])(),
          );
          if (rollDice(6) >= 3) character.equip('body', await randomBody());
          if (rollDice(6) >= 4) character.equip('head', await randomHead());
          if (rollDice(6) >= 5) character.equip('boots', await randomBoots());
          if (rollDice(6) >= 6) character.equip('hands', await randomHands());
          console.log(character);
        },
      );
    }
  }
}
