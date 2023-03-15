import { expect } from '@esm-bundle/chai';
import { IdbBacked } from './IdbBacked.js';

class SubProp extends IdbBacked {}

class Test extends IdbBacked {
  static get serialized() {
    return {
      testProp: true,
      arrayIdbBacked: IdbBacked.Array(SubProp),
      setIdbBacked: IdbBacked.Set(SubProp)
    }
  }
}


describe('Initializable', () => {
  it('is', async () => {
    const test = new Test('test1');
    expect(test instanceof IdbBacked).to.be.true;
  });
  it('has not been saved', async () => {
    const test = new Test('test1');
    await test.initialized;
    expect(test.testProp).to.be.undefined;
  });
  it('to accept a prop change', async () => {
    const test = new Test('test1');
    await test.initialized;
    test.testProp = 'test';
    test.arrayIdbBacked = [new SubProp()];
    test.setIdbBacked = new Set([new SubProp()]);
    await test.saved;
    expect(test.testProp).to.equal('test');
  });
  it('to reload with the same prop', async () => {
    const test = new Test('test1');
    await test.initialized;
    expect(test.testProp).to.equal('test');
    expect(test.arrayIdbBacked instanceof Array).to.be.true;
    expect(test.arrayIdbBacked[0] instanceof SubProp).to.be.true;
    expect(test.setIdbBacked instanceof Set).to.be.true;
    expect(Array.from(test.setIdbBacked)[0] instanceof SubProp).to.be.true;
  });
  it('to destroy', async () => {
    const test = new Test('test1');
    await test.initialized;
    test.dispatchEvent(new Event('destroy'));
    await test.deleted;
    expect(test.destroyed).to.be.true;
  });
});