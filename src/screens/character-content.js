import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';

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
          gap: 8px;
        }
        input {
          width: 100%;
          border-top: 0px;
          border-right: 0px;
          border-left: 0px;
          border-image: initial;
          background: none;
          border-bottom: 1px solid var(--primary-color);
          color: var(--primary-color);
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
        #image-section {
          height: 128px;
          display: flex;
          justify-content: center;
        }
        #avatar {
          height: 100%;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--primary-color);
          border-radius: var(--border-radius);
        }
        #selector {
          display: flex;
          flex-direction: row;
          height: max-content;
        }
        #selector button {
          flex: 1;
          justify-content: center;
          text-transform: uppercase;
          border-radius: 0;
        }
        #selector button:first-child {
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }
        #selector button:last-child {
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
        button[selected] {
          background-color: var(--primary-color);
          color: var(--primary-dark);
        }
      `,
    ];
  }

  static get properties() {
    return { character: Object, category: String, items: Array };
  }

  constructor() {
    super();
    this.category = 'stats';
    this.skills = {
      'one-handed': { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      'two-handed': { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      block: { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      sneak: { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      ranged: { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      unarmed: { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
      'dual-wielding': { level: Math.floor(Math.random() * 40), progress: Math.random() * 100 },
    };
    this.equipmentSlots = [
      'primary hand',
      'secondary hand',
      'head',
      'neck',
      'body',
      'hands',
      'feet',
      'fingers',
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

  showEquipment(category) {
    return async () => {
      if (!this.items) {
        const { randomItem } = await import('../utils/randomItem.js');
        this.items = await Promise.all(
          Array(20)
            .fill(0)
            .map(() => randomItem()),
        );
      }
      this.shadowRoot.querySelector('equipment-content').showEquipment(category);
    };
  }

  render() {
    return html`
      <input type="text" value=${this.character.name || 'name'} />
      <div id="image-section">
        <img id="avatar" src=${this.character.avatar.image} />
      </div>
      <div id="selector">
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
      <stats-content ?hidden=${this.category !== 'stats'}>
        ${Object.entries(this.character.stats).map(([stat, { value, progression }]) =>
          statBoxTemplate(stat, value, progression),
        )}]))}
      </stats-content>
      <skills-content ?hidden=${this.category !== 'skills'}>
        ${Object.entries(this.character.skills).map(([skill, { level, progress }]) =>
          statBoxTemplate(skill, level, progress),
        )}
      </skills-content>
      <equipment-content
        .items=${this.items}
        .character=${this.character}
        ?hidden=${this.category !== 'equipment'}
      >
        ${this.equipmentSlots.map(
          slot => html` <button @click=${this.showEquipment(slot)}>${slot}</button> `,
        )}
      </equipment-content>
    `;
  }
}
customElements.define('character-content', CharacterContent);
