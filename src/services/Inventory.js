import { get, set } from "idb-keyval";
import { Item } from "../items/Item.js";
import { Initializable } from "../utils/baseClasses/Initializable.js";

export class Inventory extends Initializable {
  #items = [];
  #saveTimeout = null;
  #dungocoin = 0;

  constructor(id = "player") {
    super();
    this.id = id;
    this.refresh();
  }

  refresh() {
    return get(`inventory/${this.id}`).then(async (storage) => {
      if (storage?.items)
        this.#items = await Promise.all(
          storage.items.map((item) => this.getItem(item))
        );
      if (storage?.dungocoin) this.#dungocoin = storage.dungocoin;
      await Promise.all(this.#items.map((item) => item.initialized));
      this._initialized = true;
      return true;
    });
  }

  #saveInventory() {
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(() => {
      set(`inventory/${this.id}`, this.storage);
    }, 100);
  }

  // #region getters and setters
  get dungocoin() {
    return this.#dungocoin;
  }
  get storage() {
    return {
      items: this.#items.map((item) => ({
        id: item.id,
        itemType: item.itemType,
      })),
      dungocoin: this.#dungocoin,
    };
  }
  get items() {
    return this.#items;
  }
  set items(items) {
    this.#items = items;
  }
  get weapons() {
    return this.#items
      .filter((item) => item.itemType === "Weapon")
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .sort((a, b) => {
        if (a.subType < b.subType) return -1;
        if (a.subType > b.subType) return 1;
        return 0;
      });
  }
  get swords() {
    return this.#items.filter((item) => item.subType === "Sword");
  }
  get axes() {
    return this.#items.filter((item) => item.subType === "Axe");
  }
  get knives() {
    return this.#items.filter((item) => item.subType === "Knife");
  }
  get polearms() {
    return this.#items.filter((item) => item.subType === "Polearm");
  }
  get crossbows() {
    return this.#items.filter((item) => item.subType === "Crossbow");
  }
  get shortbows() {
    return this.#items.filter((item) => item.subType === "Shortbow");
  }
  get longbows() {
    return this.#items.filter((item) => item.subType === "Longbow");
  }
  get bodies() {
    return this.#items.filter((item) => item.itemType === "Body");
  }
  get heads() {
    return this.#items.filter((item) => item.itemType === "Head");
  }
  get hands() {
    return this.#items.filter((item) => item.itemType === "Hands");
  }
  get boots() {
    return this.#items.filter((item) => item.itemType === "Boots");
  }
  get shields() {
    return this.#items.filter((item) => item.subType === "Shield");
  }
  get rings() {
    return this.#items.filter((item) => item.subType === "Ring");
  }
  get gems() {
    return this.#items.filter((item) => item.itemType === "Gem");
  }
  get necklaces() {
    return this.#items.filter((item) => item.itemType === "Necklace");
  }
  // #endregion
  addDungocoin(amount) {
    this.#dungocoin += amount;
    this.#saveInventory();
  }

  getItem(item) {
    return Item.retrieve(item.id ?? item);
  }

  spendDungocoin(amount) {
    if (this.#dungocoin < amount) throw new Error("Not enough dungocoin");
    this.#dungocoin -= amount;
    this.#saveInventory();
    return this.#dungocoin;
  }

  add(item) {
    this.#items = [
      ...this.#items,
      item instanceof Item ? item : this.getItem(item),
    ];
    this.#saveInventory();
  }

  remove(removedItem, skipDestroy) {
    this.#items = this.#items.filter((item) => item.id !== removedItem.id);
    if (!skipDestroy) removedItem.destroy();
    this.#saveInventory();
  }

  async random({ quantity, level } = { quantity: 1, level: 1 }) {
    const { randomItem } = await import("../utils/randomItem.js");
    const items = await Promise.all(
      Array(quantity)
        .fill(0)
        .map(() => randomItem(level))
    );
    items.forEach((item) => this.add(item));
    return items;
  }
}
