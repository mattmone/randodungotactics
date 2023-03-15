import { expect } from '@esm-bundle/chai';
import { Room } from './Room.js';

describe('Room', () => {
  it('is', async () => {
    const test = new Room('test1', {x: 0, z: 0, terrain: 'rock'});
    expect(test instanceof Room).to.be.true;
  });
  it('has a key', async () => {
    const test = new Room('test2', {x: 1, z: 4, terrain: 'rock'});
    expect(test.key).to.equal(`1|4`)
  });
  it('can be found at', async () => {
    const test = new Room('test3', {x: 2, z: 4, terrain: 'rock'});
    expect(test.at(3,4)).to.be.false;
    expect(test.at(2,4)).to.be.true;
  });
})