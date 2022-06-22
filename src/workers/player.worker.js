import { expose } from '../../libs/comlink.min.js';
import { Crew } from '../services/crew.js';
import { Inventory } from '../services/Inventory.js';
import { Initializeable } from '../utils/baseClasses/initializable.js';

// start them up immediately on worker instantiation
const _crew = new Crew();
const _inventory = new Inventory();
_crew.members.forEach(async member => {
  await member.initialized;
  member.avatar.renderAvatar();
});

class PlayerSharedWorker extends Initializeable {
  #crew = _crew;
  #inventory = _inventory;

  constructor() {
    super();
    Promise.all([this.#crew.initialized, this.#inventory.initialized]).then(() => {
      console.log('init player worker');
      this._initialized = true;
    });
  }

  get inventory() {
    return this.#inventory.items.map(item => item.serialized);
  }

  get aliveMemberIds() {
    return this.#crew.members.filter(({ dead }) => !dead).map(({ id }) => id);
  }

  get crewMembers() {
    return new Promise(async resolve => {
      await this.membersInitialized;
      console.log('returning crew members');
      resolve(this.#crew.members.map(member => member.serialized));
    });
  }

  get inventoryInitialized() {
    return Promise.all(this.#inventory.items.map(item => item.initialized));
  }

  get membersInitialized() {
    return Promise.all(
      this.#crew.members.map(async member => {
        member.avatar.renderAvatar();
        return member.avatar.initialized;
      }),
    );
  }

  addMember(member) {
    this.#crew.add(member);
  }

  crewIncludes(id) {
    return this.#crew.members.some(member => member.id === id);
  }

  async equipItem(character, category, _item) {
    const item = await this.#inventory.getItem(_item);
    const removedItem = this.#crew.memberById(character.id).equip(category, item);
    this.#inventory.remove(item, true);
    if (removedItem) this.#inventory.add(removedItem);
    console.log('equip item', character, category, item);
    return true;
  }

  async unequipItem(character, category) {
    const removedItem = this.#crew.memberById(character.id).unequip(category);
    if (removedItem) this.#inventory.add(removedItem);
    return removedItem.serialized;
  }

  getMemberById(id) {
    return this.#crew.memberById(id).serialized;
  }

  getMembersById(ids) {
    return this.#crew.members
      .filter(member => ids.includes(member.id))
      .map(member => member.serialized);
  }

  memberAvatarImage(id) {
    return this.#crew.memberById(id).avatar.image;
  }

  refreshInventory() {
    return this.#inventory.refresh();
  }
}

onconnect = function ({ ports: [port] }) {
  expose(PlayerSharedWorker, port);
};
