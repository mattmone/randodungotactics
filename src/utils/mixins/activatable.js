export const Activatable = (superclass) => class extends superclass {
  get activated() {
    if(this.hasAttribute('active')) return Promise.resolve(true);
    return new Promise(resolve => {
      this.addEventListener('activated', () => {
        resolve(true)
      });
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'active') {
      if (this.hasAttribute('active')) {
        this.dispatchEvent(new CustomEvent('activated'));
      } else {
        this.dispatchEvent(new CustomEvent('deactivated'));
      }
    }
  }
  
};