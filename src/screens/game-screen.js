import { LitElement, html, css } from 'lit-element';
import { wrap, transfer } from 'comlink';

class GameScreen extends LitElement {
  static get properties() {
    return {
      screenWidth: Number,
      screenHeight: Number,
    };
  }

  get gameMapLoaded() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (this.gameMap) {
          clearInterval(interval);
          resolve();
        }
      }, 16);
    });
  }

  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.rotation = {};
  }

  async firstUpdated() {
    const canvas = this.shadowRoot.querySelector('canvas');

    const offscreen = canvas.transferControlToOffscreen();
    const GameMap = wrap(
      new Worker('./src/workers/game-screen.worker.js', {
        type: 'module',
      }),
    );
    this.gameMap = await new GameMap(transfer({ canvas: offscreen }, [offscreen]));
    this.resizeObserver = new ResizeObserver(() => {
      this.gameMap.setSize(window.innerWidth, window.innerHeight);
    });
    this.resizeObserver.observe(this);
  }

  async generateMaps(mapTypes) {
    await Promise.all(mapTypes.map(type => this.gameMap.generateMap({ type })));
  }

  async selectMap(mapIndex, mapType) {
    await this.gameMap.entryMap(mapIndex, mapType);
    this.gameMap.loadMap(mapIndex, mapType);
  }

  startRotation({ x, y }) {
    this.rotation.start = { x, y };
    if (this.rotation?.delta) {
      this.rotation.start.x -= this.rotation.delta.dx;
    }
  }

  rotate(event) {
    const { buttons, x, y } = event;
    if (buttons === 1) {
      event.preventDefault();
      this.rotation.delta = { dx: -(this.rotation.start.x - x) };
      this.gameMap.setRotation(this.rotation.delta);
    }
  }

  render() {
    return html`<canvas
      id="render"
      width=${this.screenWidth}
      height=${this.screenHeight}
      @pointerdown=${this.startRotation}
      @pointermove=${this.rotate}
    ></canvas>`;
  }
}
customElements.define('game-screen', GameScreen);
