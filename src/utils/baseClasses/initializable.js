export class Initializeable extends EventTarget {
  #initialized = false;
  set _initialized(value) {
    this.#initialized = value;
    this.dispatchEvent(new CustomEvent('initialized'));
  }
  get initialized() {
    if(this.#initialized) return Promise.resolve(this.#initialized);
    return new Promise(resolve => {
      this.addEventListener('initialized', () => resolve(this.#initialized));
    });
  }
}