import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from 'styles/button.styles.js';

const mappings = {
  "primary hand": ['weapon'],
  "secondary hand": ['weapon', 'shield'],
  "fingers": ['ring']
}
class EquipmentContent extends LitElement {
  static get styles() {
    return [buttonStyles, css`
    #equipment-locations {
      display:flex;
      flex-direction:column;
      padding: 0 8px;
      gap:8px;
      margin-top:4px;
    }
    button[equipped] {
      color:var(--accent-color);
      border-color: var(--accent-color);
    }
    button[equipped]:after {
      content: ' ';
      position:absolute;
      top:-8px;
      right:-8px;
      height:16px;
      width:16px;
      border-radius:50%;
      border: 1px solid var(--accent-color);
      background: var(--circle-fill);
      pointer-events:none;
    }
    `]
  }

  static get properties() {
    return { 
      itemLocation: String,
      selectedEquipment: Array, 
      detailItem: Object 
    };
  }

  constructor() {
    super();
    this.equipment = {
      "primary hand": {
        name: 'vorpal vampiric burning short sword', 
        category: 'weapon', 
        strength: 3, 
        power: 5, 
        type: 'one-handed',
        damage: 'slash',
        durability:100,
        gems: [
          {
            name: 'fire gem',
            category: 'gem',
            color: 'red',
            strength: 2,
            power: 8
          },
          false,
          false
        ],
        effects: [
          {
            name: 'damage',
            strength: 4,
            power: 1
          },
          {
            name: 'life drain',
            strength: 4,
            power: 5
          },
          {
            name: 'fire',
            strength: 2,
            power: 8,
            source: 'gem'
          }
        ]
      },
      "secondary hand": {
        name: 'shield',
        category: 'armor',
        strength: 2,
        power: 3,
        type: 'shield',
        durability: 40,
        gems: [false, false, false],
        effects: []
      }
    }
    this.items = [
      {
        name: 'long sword',
        category: 'weapon',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'broadsword',
        category: 'weapon',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'knife',
        category: 'weapon',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'dagger',
        category: 'weapon',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'dirk',
        category: 'weapon',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'ring',
        category: 'jewelry',
        type: 'ring',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[],
        effects:[]
      },
      {
        name: 'helm',
        category: 'armor',
        type: 'head',
        strength: Math.ceil(Math.random()*6),
        power: Math.ceil(Math.random()*6),
        durability: 10,
        gems:[false, false, false],
        effects:[
          {
            name: 'fire resistance',
            strength: 2,
            power: 8
          }
        ]
      }
    ];
    this.selectedEquipment = [];
    this.itemLocation = '';
  }

  showEquipment(category) {
    this.itemLocation = mappings[category] || [category];
    this.selectedEquipment = this.equipment[category];
    this.shadowRoot.querySelector('#equipment').toggleAttribute('open');
  }

  showDetail(item) {
    return async () => {
      await import('./detail-content.js');
      this.detailItem = item;
      this.shadowRoot.querySelector('#details').toggleAttribute('open');
    }
  }

  render() {
    return html`<slot></slot>
    <side-screen id='equipment'>
      <div id='equipment-locations'>
        ${this.selectedEquipment ? html`<button equipped @click=${this.showDetail(this.selectedEquipment)}>${this.selectedEquipment.name}</button>` : ''}
        ${this.items.filter(item => this.itemLocation.includes(item.category) || this.itemLocation.includes(item.type)).map(item => html`
          <button @click=${this.showDetail(item)}>${item.name}</button>
        `)}
      </div>
      <side-screen id="details">
        <detail-content .item=${this.detailItem}></detail-content>
      </side-screen>
    </side-screen>`
  }
}
customElements.define('equipment-content', EquipmentContent);