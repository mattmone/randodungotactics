import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from 'styles/button.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { wrap, transfer } from 'comlink';

class GameScreen extends LitElement {
  static get styles() {
    return [
      commonStyles,
      buttonStyles,
      css`
        #commence {
          position: fixed;
          bottom: 1em;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 16px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      screenWidth: Number,
      screenHeight: Number,
      commenceActive: { type: Boolean, state: true },
      commenced: { type: Boolean, state: true },
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
    this.gameMap.entryMap(mapIndex, mapType);
    this.mapIndex = mapIndex;
    this.mapType = mapType;
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
      characterSelection.characters = characters;
      characterSelection.show();
      characterSelection.addEventListener('character-selected', ({ detail: character }) => {
        characterSelection.hide();
        resolve(characters.indexOf(character));
        this.commenceActive = true;
      });
      characterSelection.addEventListener('selection-cancelled', () => {
        characterSelection.hide();
        reject();
      });
    });
  }

  async canvasClick() {
    if (this.nonClick) return (this.nonClick = false);
    const { clickPosition, selectedParticipant } = await this.gameMap.mapClick();
    if (!this.commenced) {
      const characterIndex = await this.chooseCharacter().catch(() => null);
      if (characterIndex !== null) this.gameMap.placeCharacter({ characterIndex });
      return;
    }
  }

  async commence() {
    await this.gameMap.loadMap(this.mapIndex, this.mapType);
    delete this.mapIndex;
    delete this.mapType;
    this.commenced = true;
    this.gameMap.startBattle();
  }

  render() {
    return html`<canvas
        id="render"
        width=${this.screenWidth}
        height=${this.screenHeight}
        @pointerdown=${this.pointerDown}
        @pointermove=${this.pointerMove}
        @pointerup=${this.pointerUp}
        @click=${this.canvasClick}
      ></canvas>
      <character-selection hidden></character-selection>
      <button
        id="commence"
        ?hidden=${this.commenced}
        ?disabled=${!this.commenceActive}
        @click=${this.commence}
      >
        Commence
      </button>`;
  }
}
customElements.define('game-screen', GameScreen);
