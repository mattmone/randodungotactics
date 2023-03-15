import { expect } from '@esm-bundle/chai';
import { FloorTile } from './FloorTile.js';

describe('FloorTile', () => {
  it('is', async () => {
    const test = new FloorTile('test1', {x: 0, z: 0, terrain: 'rock'});
    expect(test instanceof FloorTile).to.be.true;
  });
  it('has a key', async () => {
    const test = new FloorTile('test2', {x: 1, z: 4, terrain: 'rock'});
    expect(test.key).to.equal(`1|4`)
  });
  it('can be found at', async () => {
    const test = new FloorTile('test3', {x: 2, z: 4, terrain: 'rock'});
    expect(test.at(3,4)).to.be.false;
    expect(test.at(2,4)).to.be.true;
  });
  it('restores', async () => {
    const test = new FloorTile('test1', {x: 0, z: 0, terrain: 'rock'});
    expect(test.x).to.equal(0)
  });
})