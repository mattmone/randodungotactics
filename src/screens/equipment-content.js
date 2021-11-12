import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from 'styles/button.styles.js';

const mappings = {
  'primary hand': ['weapon'],
  'secondary hand': ['weapon', 'shield'],
  feet: ['boots'],
  fingers: ['ring'],
};
class EquipmentContent extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        #equipment-locations {
          display: flex;
          flex-direction: column;
          padding: 0 8px;
          gap: 8px;
          margin-top: 4px;
          overflow: auto;
        }
        button[equipped] {
          color: var(--accent-color);
          border-color: var(--accent-color);
        }
        button[equipped]:after {
          content: ' ';
          position: absolute;
          top: -8px;
          right: -8px;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          border: 1px solid var(--accent-color);
          background: var(--circle-fill);
          pointer-events: none;
        }
      `,
    ];
  }

  static get properties() {
    return {
      itemLocation: String,
      selectedCatgory: String,
      detailItem: Object,
      inventory: Object,
      character: Object,
    };
  }

  constructor() {
    super();
    this.selectedEquipment = [];
    this.itemLocation = '';
  }

  get equippedEntries() {
    return Array.from(this.character.equipment.entries());
  }

  get equippedItems() {
    return Array.from(this.character.equipment.values());
  }

  showEquipment(category) {
    this.selectedCatgory = category;
    this.itemLocation = mappings[category] || [category];
    this.shadowRoot.querySelector('#equipment').toggleAttribute('open');
  }

  showDetail(item) {
    return async () => {
      await import('./detail-content.js');
      this.detailItem = item;
      this.shadowRoot.querySelector('#details').toggleAttribute('open');
    };
  }

  async equip({ detail: item }) {
    const removedItem = this.character.equip(this.selectedCatgory, item);
    this.inventory.remove(item);
    if (removedItem) this.inventory.add(removedItem);
    this.requestUpdate();
  }

  async unequip() {
    const removedItem = this.character.unequip(this.selectedCatgory);
    if (removedItem) this.inventory.add(removedItem);
    this.requestUpdate();
  }

  #equipmentScreenClosing() {
    this.dispatchEvent(new CustomEvent('equipment-closing'));
  }

  render() {
    return html`<slot></slot>
      <side-screen id="equipment" @before-close=${this.#equipmentScreenClosing}>
        <div id="equipment-locations">
          ${this.equippedEntries
            ?.filter(([location, item]) => location === this.selectedCatgory)
            .map(
              ([location, item]) =>
                html` <button equipped @click=${this.showDetail(item)}>${item.name}</button> `,
            )}
          ${this.inventory?.items
            ?.filter(
              item =>
                this.itemLocation.includes(item.type) || this.itemLocation.includes(item.slot),
            )
            .map(
              item =>
                html`
                  <button
                    ?hidden=${this.selectedCatgory === 'secondary hand' && item.hands >= 2}
                    @click=${this.showDetail(item)}
                  >
                    ${item.name}
                  </button>
                `,
            )}
        </div>
        <side-screen id="details">
          <detail-content
            ?equipped=${this.equippedItems.includes(this.detailItem)}
            @equip-item=${this.equip}
            @unequip-item=${this.unequip}
            .item=${this.detailItem}
          ></detail-content>
        </side-screen>
      </side-screen>`;
  }
}
customElements.define('equipment-content', EquipmentContent);
