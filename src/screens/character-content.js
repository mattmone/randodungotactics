import { LitElement, html, css } from 'lit-element';
import { buttonStyles} from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';

class CharacterContent extends LitElement {
  static get styles() {
    return [progressStyles, buttonStyles, commonStyles, css`
    * {
      box-sizing:border-box;
    }
    :host {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 8px;
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
    skills-content, equipment-content {
      display:flex;
      flex-direction:column;
    }
    skills-content button {
      justify-content: space-between;
    }
    button {
      margin-bottom:8px;
    }
    #skill, #level {
      mix-blend-mode:difference;
    }
    #image-section {
      height:128px;
      display:grid;
      place-items:center;
      margin: 8px 0;
    }
    #avatar {
      height: 100%;
      aspect-ratio: 1 / 1;
      border: 1px solid var(--primary-color);
      border-radius: var(--border-radius);
    }
    #selector {
      display:flex;
      flex-direction:row;
      height:max-content;
    }
    #selector button {
      flex:1;
      justify-content:center;
      text-transform:uppercase;
    }
    #selector button:first-child {
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
    #selector button:last-child {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
    button[selected] {
      background-color:var(--primary-color);
      color:var(--primary-dark);
    }
    `]
  }
  
  static get properties() {
    return { category: String };
  }

  constructor() {
    super();
    this.category = 'skills';
    this.skills = {
      'one-handed': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'two-handed': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'block': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'sneak': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'ranged': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'unarmed': {level: Math.floor(Math.random()*40), progress: Math.random()*100},
      'dual-wielding': {level: Math.floor(Math.random()*40), progress: Math.random()*100}
    };
    this.equipmentSlots = [
      'primary hand',
      'secondary hand',
      'head',
      'neck',
      'body',
      'hands',
      'feet',
      'fingers'
    ]
  }

  updated(changedProperties) {
    if(changedProperties.has('category')) {
      if(this.category === 'equipment') {
        import('./equipment-content.js');

      }
    }
  }
  
  categorySelect(category) {
    return async () => {
      this.category = category;
    }
  }

  showEquipment(category) {
    return async () => {
      // await import('./equipment-content.js');
      this.shadowRoot.querySelector('equipment-content').showEquipment(category);
    }
  }

  render() {
    return html`
    <input type='text' value='name' />
    <div id='image-section'>
      <img id='avatar' />
    </div>
    <div id='selector'>
      <button ?selected=${this.category === 'skills'} @click=${this.categorySelect('skills')}>Skills</button>
      <button ?selected=${this.category === 'equipment'} @click=${this.categorySelect('equipment')}>Equipment</button>
    </div>
    <skills-content ?hidden=${this.category !== 'skills'}>
      ${Object.entries(this.skills).map(([skill, details]) => 
      html`<button>
        <progress class='background' max='100' value='${details.progress}'>${details.progress}%</progress>
        <span id='skill'>${skill}</span>
        <span id='level'>${details.level}</span>
      </button>`
      )}
    </skills-content>
    <equipment-content ?hidden=${this.category !== 'equipment'}>
      ${this.equipmentSlots.map(slot => html`
        <button @click=${this.showEquipment(slot)}>${slot}</button>
      `)}
    </equipment-content>
    `
  }
}
customElements.define('character-content', CharacterContent);