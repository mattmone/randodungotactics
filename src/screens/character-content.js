import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';
import { selectorStyles } from '../styles/selector.styles.js';
import { dieDisplay } from '../utils/dieDisplay.js';
import { Inventory } from '../services/Inventory.js';

function statBoxTemplate(stat, value, progress) {
  return html`
    <div class="stat-box">
      <progress class="background" max="100" value=${progress}></progress>
      <span class="overtext">${stat}</span>
      <span class="overtext">${value}</span>
    </div>
  `;
}
class CharacterContent extends LitElement {
  static get styles() {
    return [
      progressStyles,
      buttonStyles,
      selectorStyles,
      commonStyles,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          width: 100%;
          display: grid;
          flex-direction: column;
          padding: 8px;
          gap: 8px;
          grid-template-rows: max-content max-content max-content 1fr max-content;
        }
        input {
          width: 100%;
          border-top: 0px;
          border-right: 0px;
          border-left: 0px;
          border-image: initial;
          background: none;
          border-bottom: 1px solid var(--primary-color);
          color: white;
          font-family: VT323;
          font-size: 24px;
        }
        skills-content,
        stats-content,
        equipment-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-box {
          display: flex;
          position: relative;
          justify-content: space-between;
          padding: 8px 4px;
        }
        .overtext {
          color: white;
          text-shadow: black 0px 0px 4px;
        }
        #status-section {
          height: 128px;
          display: flex;
          justify-content: flex-start;
          gap: 8px;
        }
        #avatar {
          height: 100%;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--primary-color);
          border-radius: var(--border-radius);
        }
        .equipment-slot[equipped] {
          color: var(--accent-color);
          border-color: var(--accent-color);
          justify-content: space-between;
          flex-flow: row-reverse;
        }
        .equipment-slot[equipped] .slot-name {
          font-size: 0.5em;
          align-self: flex-end;
        }
        .item-name {
          text-align: left;
        }
        #status {
          display: flex;
          flex-direction: column;
          color: white;
          justify-content: space-around;
          width: 100%;
        }
        .stat {
          display: flex;
          justify-content: space-between;
        }
        #selection {
          display: flex;
          flex-direction: column;
          flex: 1;
          max-height: 100%;
          overflow: auto;
        }
        #recruit {
          justify-content: center;
        }
      `,
    ];
  }

  static get properties() {
    return {
      character: Object,
      category: String,
      inventory: Object,
      recruits: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.category = 'stats';
    this.equipmentSlots = [
      'primary hand',
      'secondary hand',
      'head',
      'neck',
      'body',
      'hands',
      'boots',
      'ring',
    ];
  }

  updated(changedProperties) {
    if (changedProperties.has('category')) {
      if (this.category === 'equipment') {
        import('./equipment-content.js');
      }
    }
  }

  categorySelect(category) {
    return async () => {
      this.category = category;
    };
  }

  updateName({ target: { value } }) {
    this.character.name = value;
  }

  showEquipment(category) {
    return async () => {
      if (!this.inventory) {
        const { Inventory } = await import('../services/Inventory.js');
        this.inventory = new Inventory();
        await this.inventory.ready;
        await Promise.all([...this.inventory.items.map(item => item.initialized)]);
        this.requestUpdate();
      }
      this.shadowRoot.querySelector('equipment-content').showEquipment(category);
    };
  }

  recruit() {
    this.dispatchEvent(
      new CustomEvent('recruited', { detail: this.character, composed: true, bubbles: true }),
    );
  }

  secondaryHandDisabled(slot) {
    if (slot !== 'secondary hand') return false;
    const primary = this.character.equipment.get('primary hand');
    if (!primary) return true;
    const secondary = this.character.equipment.get('secondary hand');
    if (secondary) return false;
    if (primary && this.character.handsFull) return true;
    return false;
  }

  render() {
    if (!this.character) return html``;
    return html`
      <input type="text" value=${this.character.name || 'name'} @input=${this.updateName} />
      <div id="status-section">
        <img id="avatar" src=${this.character.avatar.image} />
        <div id="status">
          <div class="stat"><span>hp</span><span>${this.character.maxhp}</span></div>
          <div class="stat"><span>mana</span><span>${this.character.maxmana}</span></div>
          <div class="stat">
            <span>damage</span><span>${dieDisplay(...this.character.damage)}</span>
          </div>
          <div class="stat"><span>range</span><span>${this.character.attackRange}</span></div>
        </div>
      </div>
      <div class="selector">
        <button ?selected=${this.category === 'stats'} @click=${this.categorySelect('stats')}>
          Stats
        </button>
        <button ?selected=${this.category === 'skills'} @click=${this.categorySelect('skills')}>
          Skills
        </button>
        <button
          ?selected=${this.category === 'equipment'}
          @click=${this.categorySelect('equipment')}
        >
          Equipment
        </button>
      </div>
      <div id="selection">
        <stats-content ?hidden=${this.category !== 'stats'}>
          ${Array.from(this.character.stats.entries()).map(([stat, { level, progression }]) =>
            statBoxTemplate(stat, level, progression),
          )}]))}
        </stats-content>
        <skills-content ?hidden=${this.category !== 'skills'}>
          ${Array.from(this.character.skills.entries()).map(([skill, { level, progression }]) =>
            statBoxTemplate(skill, level, progression),
          )}
        </skills-content>
        <equipment-content
          .inventory=${this.inventory}
          .character=${this.character}
          ?hidden=${this.category !== 'equipment'}
          @equipment-closing=${() => {
            this.requestUpdate();
          }}
        >
          ${this.equipmentSlots.map(
            slot =>
              html`<button
                class="equipment-slot"
                ?equipped=${this.character.equipment.get(slot)}
                ?disabled=${this.secondaryHandDisabled(slot)}
                @click=${this.showEquipment(slot)}
              >
                <span class="slot-name">${slot}</span>
                <span class="item-name">${this.character.equipment.get(slot)?.name}</span>
              </button> `,
          )}
        </equipment-content>
      </div>
      ${this.recruits && html`<button id="recruit" @click=${this.recruit}>RECRUIT</button>`}
    `;
  }
}
customElements.define('character-content', CharacterContent);
