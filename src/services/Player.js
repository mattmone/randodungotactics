import { wrap } from '../../libs/comlink.min.js';
const worker = new SharedWorker('../workers/player.worker.js');
console.log(worker);
export const player = wrap(worker.port, {
  type: 'module',
});
