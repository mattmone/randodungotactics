import { expose } from '../../libs/comlink.min.js';
import { Crew } from '../services/crew.js';
import { Inventory } from '../services/Inventory.js';
import { Initializeable } from '../utils/baseClasses/initializable.js';

// start them up immediately on worker instantiation
const _crew = new Crew();
const _inventory = new Inventory();

class PlayerSharedWorker extends Initializeable {
  #crew = _crew;
  #inventory = _inventory;

  constructor() {
    super();
    Promise.all([this.#crew.initialized, this.#inventory.initialized]).then(() => { 
      this._initialized = true; 
    });
  }

  get inventory() {
    return this.#inventory.items.map(item => item.serialized);
  }

  get crewMembers() {
    return this.#crew.members.map(member => member.serialized);
  }

  get membersInitialized() {
		return Promise.all(this.#crew.members.map(async (member) => {
			member.avatar.renderAvatar();
			return member.avatar.initialized;
		}));
	}

  getMemberById(id) {
    return this.#crew.memberById(id).serialized;
  }

  memberAvatarImage(id) {
		return this.#crew.memberById(id).avatar.image;
	}
}

onconnect = function ({ ports: [port] }) {
  expose(PlayerSharedWorker, port);
};
