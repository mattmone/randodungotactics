import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';
import { Character } from '../character.js';
import { Crew } from '../services/crew.js';

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
          justify-content: space-between;
        }
        #crew {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          padding: 8px;
          gap: 8px;
          max-height: 100%;
          overflow: auto;
        }
        #recruit {
          justify-content: center;
        }
        h2 {
          font-size: 1rem;
        }
        .crewMember {
          flex-direction: column;
        }
        .crewMember img {
          width: 100%;
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
    this.crew = new Crew();
    this.crew.ready.then(() => {
      Promise.all(this.crew.members.map(member => member.avatar.ready)).then(() => {
        this.requestUpdate();
      });
    });
  }

  selectCrew(member) {
    return async () => {
      await import('./character-content.js');
      this.selectedMember = member;
      this.shadowRoot.getElementById('character-screen').toggleAttribute('open');
    };
  }

  async showRecruits() {
    await import('./recruit-content.js');
    this.shadowRoot.getElementById('recruit-screen').toggleAttribute('open');
  }

  recruit({ detail: newMember }) {
    this.crew.add(newMember);
    this.shadowRoot.getElementById('recruit-screen').toggleAttribute('open');
  }

  screenClosed() {
    this.requestUpdate();
  }

  render() {
    return html`
      <section id="crew">
        ${this.crew.members.map(
          member => html`<button class="crewMember" @click=${this.selectCrew(member)}>
            <img src="${member?.avatar.image}" />
            <h2>${member.name}</h2>
          </button>`,
        )}
      </section>
      <button id="recruit" @click=${this.showRecruits}>RECRUIT</button>
      <side-screen @before-close=${this.screenClosed} id="character-screen">
        <character-content .character=${this.selectedMember}></character-content>
      </side-screen>
      <side-screen @before-close=${this.screenClosed} id="recruit-screen">
        <h1 slot="header" hidden data-show-on-open>Recruits</h1>
        <recruit-content @recruited=${this.recruit}></recruit-content>
      </side-screen>
    `;
  }
}
customElements.define('crew-content', CrewContent);
