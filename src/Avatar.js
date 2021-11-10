export class Avatar {
  #color = 'red';
  #placeholder = '';
  #image = '';

  constructor({ color = { name: 'red', value: '#ff0000' }, placeholder = '', image = '' }) {
    this.#color = color;
    this.#image = image;
    this.#placeholder = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:${color.name.replaceAll(
      ' ',
      '',
    )}"/></svg>`;
    import('./services/modelRenderer.js').then(async ({ modelRenderer }) => {
      const { model, image } = await modelRenderer.renderAvatar({ color });
      this.mesh = model;
      this.#image = image;
    });
  }

  get serialized() {
    return this.#color;
  }

  get image() {
    if (this.#image) return this.#image;
    return this.#placeholder;
  }

  get ready() {
    return new Promise(resolve => {
      const avatarInterval = setInterval(() => {
        if (this.#image) {
          resolve();
          clearInterval(avatarInterval);
        }
      }, 25);
    });
  }
}
