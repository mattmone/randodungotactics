import { wrap } from 'comlink';

const playerWorker = new SharedWorker(new URL('../../workers/player.worker.js', import.meta.url), { type: 'module' });
const Player = wrap(playerWorker.port);

export const UsesPlayer = superclass =>
  class extends superclass {
    constructor(...args) {
      super(...args);
      this.player = {
        initialized: new Promise(async resolve => {
          this.player = await new Player();
          await this.player.initialized;
          resolve();
        }),
      };
    }
  };
