import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from 'styles/button.styles.js';
import { commonStyles } from 'styles/common.styles.js';

class CharacterSelection extends LitElement {
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
        button img {
          max-width: 100%;
          aspect-ratio: 1 / 1;
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

  characters = [];

  show() {
    this.toggleAttribute('hidden', false);
    this.requestUpdate();
  }

  hide() {
    this.toggleAttribute('hidden', true);
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('selection-cancelled'));
  }

  render() {
    return html` <section>
      <header>Character Selection</header>
      <div id="selection">
        ${this.characters.map(
          character =>
            html`<button
              ?positioned=${character.position}
              @click=${() =>
                this.dispatchEvent(new CustomEvent('character-selected', { detail: character }))}
            >
              <img src=${character.avatarImage} />
              <span>${character.name}</span>
              ${character.position && html`<button class="remove">x</button>`}
            </button>`,
        )}
      </div>
      <button id="cancel" @click=${this.cancel}>Cancel</button>
    </section>`;
  }
}
customElements.define('character-selection', CharacterSelection);
