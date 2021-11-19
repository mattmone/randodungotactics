import { LitElement, html, css } from 'lit-element';
import { Crew } from '../services/crew.js';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';

class RecruitContent extends LitElement {
  static get styles() {
    return [
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
        #recruits {
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
        .recruit {
          flex-direction: column;
        }
        .recruit img {
          width: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return { recruits: { type: Object }, selectedRecruit: { type: Object } };
  }

  constructor() {
    super();
    this.recruits = new Crew('recruits');
    this.recruits.ready.then(async () => {
      this.recruits.members.forEach(recruit => {
        if (new Date() - recruit.created > 1000) this.recruits.remove(recruit);
      });
      const newRecruits = [];
      while (this.recruits.members.length + newRecruits.length < 5)
        newRecruits.push(this.recruits.random());
      await Promise.all(newRecruits);
      await Promise.all(this.recruits.members.map(recruit => recruit.avatar.ready));
      this.requestUpdate();
    });
  }

  select(member) {
    return async () => {
      await import('./character-content.js');
      this.selectedRecruit = member;
      this.shadowRoot.getElementById('character-screen').toggleAttribute('open');
    };
  }

  recruited({ detail: recruit }) {
    this.recruits.remove(recruit, true);
    this.shadowRoot.getElementById('character-screen').toggleAttribute('open');
    this.requestUpdate();
  }

  render() {
    return html` <section id="recruits">
      ${this.recruits.members.map(
        recruit => html`<button class="recruit" @click=${this.select(recruit)}>
          <img src="${recruit?.avatar.image}" />
          <h2>${recruit.name}</h2>
        </button>`,
      )}
      <side-screen @before-close=${this.screenClosed} id="character-screen">
        <character-content
          ?recruits=${true}
          @recruited=${this.recruited}
          .character=${this.selectedRecruit}
        ></character-content>
      </side-screen>
    </section>`;
  }
}
customElements.define('recruit-content', RecruitContent);
