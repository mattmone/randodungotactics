import { LitElement, html, css } from 'lit';
import { commonStyles } from 'styles/common.styles.js';
import { buttonStyles } from 'styles/button.styles.js';
import { progressStyles } from 'styles/progress.styles.js';

class CurrentTurn extends LitElement {
  static get styles() {
    return [
      commonStyles,
      buttonStyles,
      progressStyles,
      css`
        :host {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50vw;
          border: 1px solid var(--primary-color);
          border-radius: var(--border-radius);
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        @media (orientation: portrait) {
          :host {
            width: 100vw;
          }
        }
        #current-turn {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
        }
        header {
          color: white;
          text-align: center;
        }
        #actions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
        }
        .progress-container {
          margin: 0 16px;
        }
        #hp progress[value]::-webkit-progress-value {
          background-color: red;
        }
        #mana progress[value]::-webkit-progress-value {
          background-color: blue;
        }
        .innerlabelled {
          display: grid;
          color: white;
          mix-blend-mode: difference;
        }
        .innerlabelled * {
          grid-column: 1 / 1;
          grid-row: 1 / 1;
        }
        .innerlabelled span {
          padding: 0 8px;
        }
        button {
          aspect-ratio: 3 / 1;
          justify-content: center;
          min-height: 44px;
        }
      `,
    ];
  }

  static get properties() {
    return { currentParticipant: Object, moved: Boolean, acted: Boolean };
  }

  move() {
    this.dispatchEvent(new CustomEvent('start-move'));
  }

  skills() {}

  spells() {}

  attack() {
    this.dispatchEvent(new CustomEvent('player-attack'));
  }
  defend() {}

  wait() {
    this.dispatchEvent(new CustomEvent('wait-turn'));
  }

  render() {
    return html`
      <section id="current-turn" tabindex="-1">
        <header>${this.currentParticipant.name}</header>
        <div id="hp" class="progress-container innerlabelled">
          <progress
            max=${this.currentParticipant.maxhp}
            value=${this.currentParticipant.hp}
          ></progress>
          <span>hp</span>
        </div>
        <div id="mana" class="progress-container innerlabelled">
          <progress
            max=${this.currentParticipant.maxmana}
            value=${this.currentParticipant.mana}
          ></progress>
          <span>mana</span>
        </div>
        <div id="actions">
          <button @click=${this.move} ?disabled=${this.moved}>Move</button>
          <button @click=${this.attack} ?disabled=${this.acted}>Attack</button>
          <button @click=${this.defend} ?disabled=${this.acted}>Defend</button>
          <button @click=${this.skills} ?disabled=${this.acted}>Skills</button>
          <button @click=${this.spells} ?disabled=${this.acted}>Spells</button>
          <button @click=${this.wait}>Wait</button>
        </div>
      </section>
    `;
  }
}
customElements.define('current-turn', CurrentTurn);
