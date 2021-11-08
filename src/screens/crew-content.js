import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';
import { randomCharacter } from '../utils/randomCharacter.js';
import { Character } from '../character.js';

class CrewContent extends LitElement {
  static get styles() {
    return [
      progressStyles,
      buttonStyles,
      commonStyles,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
        #crew {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          padding: 8px;
          gap: 8px;
        }
        h2 {
          font-size: 1rem;
        }
        .crewMember {
          flex-direction: column;
        }
      `,
    ];
  }

  static get properties() {
    return { crew: { type: Array }, selectedMember: { type: Object } };
  }

  constructor() {
    super();
    /** @type {Character[]} */
    this.crew = Array(10)
      .fill(0)
      .map(() => randomCharacter(new Character({ avatarColor: 'red' })));
    Promise.all(this.crew.map(member => member.avatar.ready)).then(() => {
      this.requestUpdate();
    });
  }

  selectCrew(member) {
    return () => {
      import('./character-content.js');
      this.selectedMember = member;
      this.shadowRoot.getElementById('character-screen').toggleAttribute('open');
    };
  }

  render() {
    return html`
      <section id="crew">
        ${this.crew.map(
          member => html`<button class="crewMember" @click=${this.selectCrew(member)}>
            <img src="${member?.avatar.image}" />
            <h2>${member.name}</h2>
          </button>`,
        )}
      </section>
      <side-screen id="character-screen">
        <character-content .character=${this.selectedMember}></character-content>
      </side-screen>
    `;
  }
}
customElements.define('crew-content', CrewContent);
