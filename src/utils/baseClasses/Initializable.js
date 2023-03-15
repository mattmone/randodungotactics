export class Initializable extends EventTarget {
  #initialized = false;

  constructor() {
    super();
    this.addEventListener('initialize', () => {
      this.#initialized = true;
      this.dispatchEvent(new Event('initialized'));
    }, {once: true})
  }

  get initialized() {
    if(this.#initialized) return Promise.resolve(this);
    return new Promise(resolve => {
      this.addEventListener('initialized', () => resolve(this), {once: true});
    });
  }

  get isInitialized() {
    return this.#initialized;
  }
}