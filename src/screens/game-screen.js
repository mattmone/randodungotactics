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
    // this.gameMap.loadMap(mapIndex, mapType);
  }

  pointerDown({ x, y }) {
    this.rotation.start = { x, y };
    this._pointerDown = new Date();
    if (this.rotation?.delta) {
      this.rotation.start.x -= this.rotation.delta.dx;
    }
  }

  pointerMove(event) {
    const { buttons, x, y } = event;
    this.gameMap.mouseOver({ x, y });
    if (buttons === 1) {
      event.preventDefault();
      const dx = -(this.rotation.start.x - x);
      if (Math.abs(dx) > 10) this._moving = true;
      this.rotation.delta = { dx };
      if (new Date() - this._pointerDown > 100) this.gameMap.setRotation(this.rotation.delta);
    }
  }

  pointerUp() {
    if (new Date() - this._pointerDown > 100) this.nonClick = true;
  }

  async chooseCharacter() {
    return new Promise(async (resolve, reject) => {
      await import('./character-selection.js');
      const characterSelection = this.shadowRoot.querySelector('character-selection');
      const characters = await this.gameMap.selectableCharacters();
      console.log(characters);
      characterSelection.characters = characters;
      characterSelection.show();
      characterSelection.addEventListener('character-selected', ({ detail: character }) => {
        characterSelection.hide();
        resolve(characters.indexOf(character));
      });
      characterSelection.addEventListener('selection-cancelled', () => {
        characterSelection.hide();
        reject();
      });
    });
  }

  async click() {
    if (this.nonClick) return (this.nonClick = false);
    const clickPosition = await this.gameMap.mapClick();
    const character = await this.chooseCharacter();
    this.gameMap.placeCharacter(character, clickPosition);
  }

  render() {
    return html`<canvas
        id="render"
        width=${this.screenWidth}
        height=${this.screenHeight}
        @pointerdown=${this.pointerDown}
        @pointermove=${this.pointerMove}
        @pointerup=${this.pointerUp}
        @click=${this.click}
      ></canvas>
      <character-selection hidden></character-selection>`;
  }
}
customElements.define('game-screen', GameScreen);
