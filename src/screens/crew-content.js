import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';
import { Activatable } from '../utils/mixins/activatable.js';
import { UsesPlayer } from '../utils/mixins/usesPlayer.js';

class CrewContent extends UsesPlayer(Activatable(LitElement)) {
  #charactersUpdated = false;

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
        .crewMember {
          flex-direction: column;
        }
        .crewMember canvas {
          width: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      crewMembers: { type: Array },
      selectedMember: { type: Object },
      active: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.crewMembers = [];
    this.initPlayer();
  }

  async initPlayer() {
    await this.player.initialized;
    await this.player.membersInitialized;
    this.shadowRoot.querySelector('character-content').player = this.player;
    await this.updateChatacters(true);
    await this.updateInventory();
    await this.renderCharacterAvatars();

    this.addEventListener('update-crew', this.triggerUpdate.bind(this));
  }

  async triggerUpdate({ detail: done }) {
    console.log('update triggered');
    await this.updateChatacters(true);
    await this.updateInventory();
    this.selectedMember = await this.player.getMemberById(this.selectedMember.id);
    this.requestUpdate();
    done();
  }

  async updateChatacters(skipUpdate) {
    this.crewMembers = await this.player.crewMembers;
    if (!skipUpdate) this.#charactersUpdated = true;
    return this.updateComplete;
  }

  async updateInventory() {
    this.crewInventory = await this.player.inventory;
    return this.updateComplete;
  }

  async renderCharacterAvatars() {
    const renderAvatar = async (context, imageCallback) => {
      if (this.#charactersUpdated) {
        this.#charactersUpdated = false;
        return;
      }
      const image = await imageCallback();
      await this.activated;
      if (!context.canvas.parentElement.parentElement)
        context = this.acquireAvatarContext(context.canvas.id);
      requestAnimationFrame(async () => {
        context.transferFromImageBitmap(image);
        renderAvatar(context, imageCallback);
      });
    };
    this.crewMembers.forEach(({ id }) => {
      const avatarContext = this.acquireAvatarContext(id);
      renderAvatar(avatarContext, () => this.player.memberAvatarImage(id));
    });
  }

  acquireAvatarContext(id) {
    const avatarCanvas = this.shadowRoot.getElementById(id);
    return avatarCanvas.getContext('bitmaprenderer');
  }

  selectCrew(member) {
    return async () => {
      await import('./character-content.js');
      this.selectedMember = member;
      this.toggleAttribute('active', false);
      this.shadowRoot.getElementById('character-screen').toggleAttribute('open');
    };
  }

  async showRecruits() {
    await import('./recruit-content.js');
    this.toggleAttribute('active', false);
    this.shadowRoot.getElementById('recruit-screen').toggleAttribute('open');
  }

  async recruit({ detail: newMember }) {
    await this.player.addMember(newMember);
    await this.updateChatacters();
    await this.renderCharacterAvatars();
    this.toggleAttribute('active', true);
    this.shadowRoot.getElementById('recruit-screen').toggleAttribute('open');
  }

  screenClosed() {
    this.toggleAttribute('active', true);
    this.requestUpdate();
  }

  render() {
    return html`
      <section id="crew">
        ${this.crewMembers.map(
          member => html`<button class="crewMember" @click=${this.selectCrew(member)}>
            <canvas id="${member.id}" width="256" height="256"></canvas>
            <h2>${member.name}</h2>
          </button>`,
        )}
      </section>
      <button id="recruit" @click=${this.showRecruits}>RECRUIT</button>
      <side-screen @before-close=${this.screenClosed} id="character-screen">
        <character-content
          .character=${this.selectedMember}
          .inventory=${this.crewInventory}
        ></character-content>
      </side-screen>
      <side-screen @before-close=${this.screenClosed} id="recruit-screen">
        <h1 slot="header" hidden data-show-on-open>Recruits</h1>
        <recruit-content @recruited=${this.recruit}></recruit-content>
      </side-screen>
    `;
  }
}
customElements.define('crew-content', CrewContent);
