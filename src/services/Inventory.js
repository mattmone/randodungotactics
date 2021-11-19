import { get, set } from '../../libs/idb-keyval.js';
import { Item } from '../items/Item.js';

export class Inventory {
  #items = [];
  #readyTimeout = null;
  #ready = false;
  #saveTimeout = null;
  #dungocoin = 0;

  constructor(id = 'player') {
    this.id = id;
    get(`inventory/${id}`).then(async storage => {
      if (storage.items)
        this.#items = await Promise.all(storage.items.map(item => this.#build(item)));
      if (storage.dungocoin) this.#dungocoin = storage.dungocoin;
      await Promise.all(this.#items.map(item => item.initialized));
      this.#ready = true;
    });
  }

  #saveInventory() {
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(() => {
      set(`inventory/${this.id}`, this.storage);
    }, 100);
  }

  async #build(item) {
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

  // #region getters and setters
  get ready() {
    return new Promise(resolve => {
      this.#readyTimeout = setInterval(() => {
        if (this.#ready) {
          clearInterval(this.#readyTimeout);
          resolve(true);
        }
      });
    });
  }
  get dungocoin() {
    return this.#dungocoin;
  }
  get storage() {
    return {
      items: this.#items.map(item => ({ id: item.id, itemType: item.itemType })),
      dungocoin: this.#dungocoin,
    };
  }
  get items() {
    return this.#items;
  }
  set items(items) {
    this.#items = items;
  }
  // #endregion
  addDungocoin(amount) {
    this.#dungocoin += amount;
    this.#saveInventory();
  }

  spendDungocoin(amount) {
    if (this.#dungocoin < amount) throw new Error('Not enough dungocoin');
    this.#dungocoin -= amount;
    this.#saveInventory();
    return this.#dungocoin;
  }

  add(item) {
    this.#items = [...this.#items, item instanceof Item ? item : this.#build(item)];
    this.#saveInventory();
  }

  remove(removedItem) {
    this.#items = this.#items.filter(item => item !== removedItem);
    removedItem.destroy();
    this.#saveInventory();
  }

  async random({ quantity = 1, level = 1 }) {
    const { randomItem } = await import('../utils/randomItem.js');
    const items = await Promise.all(
      Array(quantity)
        .fill(0)
        .map(() => randomItem(level)),
    );
    items.forEach(item => this.add(item));
    return items;
  }
}
