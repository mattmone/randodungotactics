import { LitElement, html, css } from 'lit';
import { buttonStyles } from 'styles/button.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { Activatable } from 'utils/mixins/activatable.js';
import { UsesPlayer } from '../utils/mixins/usesPlayer.js';

class CharacterSelection extends UsesPlayer(Activatable(LitElement)) {
  static get styles() {
    return [
      commonStyles,
      buttonStyles,
      css`
        :host(:not([hidden])) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(3px);
          display: grid;
          place-items: center;
          z-index: 10;
        }
        section {
          display: flex;
          flex-direction: column;
          background: #333;
          border: 1px solid green;
          border-radius: 8px;
          width: 70vw;
          padding: 8px;
          gap: 8px;
        }
        @media (orientation: portrait) {
          section {
            width: 100vw;
          }
        }
        header {
          color: white;
          font-size: 24px;
          font-family: VT323;
        }
        #selection {
          display: grid;
          grid-template-columns: repeat(auto-fit, 100px);
          gap: 8px;
        }
        button {
          justify-content: center;
          flex-direction: column;
        }
        button canvas {
          max-width: 100%;
          aspect-ratio: 1 / 1;
        }
        button[placed] {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        #cancel {
          align-self: flex-end;
          padding: 8px 16px;
        }
        .remove {
          position: absolute;
          display: grid;
          place-items: center;
          height: 44px;
          width: 44px;
          top: 0;
          right: 0;
        }
      `,
    ];
  }

  static get properties() {
    return { characters: Array, selectableCharacters: Array };
  }

  constructor() {
    super();
    this.characters = [];
    this.selectableCharacters = [];
  }

  async initPlayer() {
    await this.player.initialized;
    await this.player.membersInitialized;
  }

  async renderAvatar(context, imageCallback) {
    if(!this.selectableCharacters.length) return;
    await this.activated;
    if(!context.canvas.parentElement.parentElement) context = this.acquireAvatarContext(context.canvas.id);
    requestAnimationFrame(async () => {
      context.transferFromImageBitmap(await imageCallback());
      this.renderAvatar(context, imageCallback);
    });
  };

  acquireAvatarContext(id) {
		const avatarCanvas = this.shadowRoot.getElementById(id);
		return avatarCanvas.getContext("bitmaprenderer");
	}

  async show() {
    this.toggleAttribute('hidden', false);
    this.toggleAttribute('active', true);
    await this.initPlayer();
    this.selectableCharacters = await this.player.getMembersById(this.characters);
    await this.updateComplete;
    this.selectableCharacters.forEach(({id}) => {
      const avatarContext = this.acquireAvatarContext(id);
      this.renderAvatar(avatarContext, () => this.player.memberAvatarImage(id));
    });
  }

  hide() {
    this.toggleAttribute('hidden', true);
    this.toggleAttribute('active', false);
    this.selectableCharacters = [];
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('selection-cancelled'));
  }

  selectCharacter(index) {
    return () => {
      this.dispatchEvent(new CustomEvent('character-selected', { detail: index }))
    }
  }

  render() {
    return html` <section>
      <header>Character Selection</header>
      <div id="selection">
        ${this.selectableCharacters.map(
          (character, index) =>
            html`<button
              ?placed=${character.placed}
              @click=${this.selectCharacter(index)}
            >
              <canvas id=${character.id}></canvas>
              <span>${character.name}</span>
            </button>`,
        )}
      </div>
      <button id="cancel" @click=${this.cancel}>Cancel</button>
    </section>`;
  }
}
customElements.define('character-selection', CharacterSelection);
