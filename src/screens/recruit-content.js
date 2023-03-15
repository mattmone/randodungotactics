import { LitElement, html, css } from 'lit';
import { Crew } from '../services/Crew.js';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { Activatable} from "../utils/mixins/activatable.js";

class RecruitContent extends Activatable(LitElement) {
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
          grid-template-columns: repeat(auto-fill, minmax(var(--character-selector-width), 1fr));
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
        .recruit canvas {
          width: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return { recruits: { type: Object }, selectedRecruit: { type: Object }, active: { type: Boolean } };
  }

  constructor() {
    super();
    this.recruits = new Crew('recruits');
    this.recruits.initialized.then(async () => {
      this.recruits.members.forEach(recruit => {
        if (new Date() - recruit.created > 1000) this.recruits.remove(recruit);
      });
      const newRecruits = [];
      while (this.recruits.members.length + newRecruits.length < 5)
        newRecruits.push(this.recruits.random());
      await Promise.all(newRecruits);
      await Promise.all(this.recruits.members.map(recruit => {
        recruit.avatar.renderAvatar();
        return recruit.avatar.initialized
      }));
      this.requestUpdate();
      await this.updateComplete;
      const renderAvatar = (context, imageCallback) => {
        requestAnimationFrame(async () => {
          await this.activated;
          context.transferFromImageBitmap(await imageCallback());
          renderAvatar(context, imageCallback);
        });
      };
      this.recruits.members.forEach((member) => {
        const avatarCanvas = this.shadowRoot.getElementById(member.id);
        const avatarContext = avatarCanvas.getContext("bitmaprenderer");
        renderAvatar(avatarContext, () => member.avatar.image);
      });
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
          <canvas id="${recruit.id}" width=${recruit.avatar?.imageSize} height=${recruit.avatar?.imageSize}></canvas>
          <h2>${recruit.name}</h2>
        </button>`,
      )}
      <side-screen @before-close=${this.screenClosed} id="character-screen">
        <character-content
          recruits
          @recruited=${this.recruited}
          .character=${this.selectedRecruit}
        ></character-content>
      </side-screen>
    </section>`;
  }
}
customElements.define('recruit-content', RecruitContent);
