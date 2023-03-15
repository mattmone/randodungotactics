import { expect } from '@esm-bundle/chai';
import { Initializable } from './Initializable.js';

const test = new Initializable();

describe('Initializable', () => {
  it('is', async () => {
    expect(test instanceof Initializable).to.be.true;
  });
  it('promises to initialize', async () => {
    expect(test.initialized instanceof Promise).to.be.true;
  });
  it('initializes and is chainable', async () => {
    test.dispatchEvent(new Event('initialize'));
    expect(await test.initialized).to.equal(test);
  })
});