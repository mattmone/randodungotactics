import { expose } from '../../libs/comlink.min.js';
import { Crew } from '../services/crew.js';
import { Inventory } from '../services/Inventory.js';

class PlayerSharedWorker {
  crew = new Crew();
  inventory = new Inventory();
}

onconnect = function ({ ports: [port] }) {
  expose(PlayerSharedWorker, port);
};
