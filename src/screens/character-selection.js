import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from 'styles/button.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { Activatable } from 'utils/mixins/activatable.js';

class CharacterSelection extends Activatable(LitElement) {
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
    return { characters: Array };
  }

  constructor() {
    super();
    this.characters = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('characters')) {
      console.log('characters set');
      this.characters.forEach((member) => {
        const avatarCanvas = this.shadowRoot.getElementById(member.id);
        const avatarContext = avatarCanvas.getContext("bitmaprenderer");
        this.renderAvatar(avatarContext, () => member.avatar.image);
      });
    }
  }

  renderAvatar(context, imageCallback) {
    requestAnimationFrame(async () => {
      await this.activated;
      context.transferFromImageBitmap(await imageCallback());
      this.renderAvatar(context, imageCallback);
    });
  };

  show() {
    this.toggleAttribute('hidden', false);
    this.toggleAttribute('active', true);
    this.requestUpdate();
  }

  hide() {
    this.toggleAttribute('hidden', true);
    this.toggleAttribute('active', false);
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('selection-cancelled'));
  }

  render() {
    return html` <section>
      <header>Character Selection</header>
      <div id="selection">
        ${this.characters.map(
          (character, index) =>
            html`<button
              ?placed=${character.placed}
              @click=${() =>
                this.dispatchEvent(new CustomEvent('character-selected', { detail: index }))}
            >
              <canvas id=${character.id} src=${character.avatarImage}></canvas>
              <span>${character.name}</span>
            </button>`,
        )}
      </div>
      <button id="cancel" @click=${this.cancel}>Cancel</button>
    </section>`;
  }
}
customElements.define('character-selection', CharacterSelection);
