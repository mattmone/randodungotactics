import { LitElement, html, css } from 'lit';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { UsesPlayer } from '../utils/mixins/usesPlayer.js';

const mappings = {
  'primary hand': ['weapon'],
  'secondary hand': ['weapon', 'shield'],
  feet: ['boots'],
  fingers: ['ring'],
};
class EquipmentContent extends UsesPlayer(LitElement) {
  get #crewUpdate() {
    return new Promise(resolve => {
      this.dispatchEvent(
        new CustomEvent('update-crew', { bubbles: true, composed: true, detail: resolve }),
      );
    });
  }
  static get styles() {
    return [
      commonStyles,
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
        button[equipped],
        #unequip {
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

        #equip,
        #unequip {
          margin: 0 8px 8px 8px;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
        }
      `,
    ];
  }

  static get properties() {
    return {
      itemLocation: String,
      selectedCatgory: String,
      detailItem: Object,
      character: Object,
      inventory: Object,
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

  get equippedItemIds() {
    return Array.from(this.character.equipment.values()).map(item => item.id);
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

  async equip() {
    await this.player.equipItem(this.character, this.selectedCatgory, this.detailItem);
    await this.#crewUpdate;
    this.requestUpdate();
  }

  async unequip() {
    await this.player.unequipItem(this.character, this.selectedCatgory, this.detailItem);
    await this.#crewUpdate;
    this.requestUpdate();
  }

  #equipmentScreenClosing() {
    this.dispatchEvent(new CustomEvent('equipment-closing'));
  }

  async refreshInventory() {
    await this.player.refreshInventory();
    this.requestUpdate();
  }

  render() {
    return html`<slot></slot>
      <side-screen
        id="equipment"
        @before-open=${this.refreshInventory}
        @before-close=${this.#equipmentScreenClosing}
      >
        <div id="equipment-locations">
          ${this.equippedEntries
            ?.filter(([location, item]) => location === this.selectedCatgory)
            .map(
              ([location, item]) =>
                html` <button equipped @click=${this.showDetail(item)}>${item.name}</button> `,
            )}
          ${this.inventory
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
            ?equipped=${this.equippedItemIds.includes(this.detailItem?.id)}
            .item=${this.detailItem}
          >
            <button
              ?hidden=${this.equippedItemIds.includes(this.detailItem?.id)}
              id="equip"
              slot="actions"
              @click=${this.equip}
            >
              Equip
            </button>
            <button
              ?hidden=${!this.equippedItemIds.includes(this.detailItem?.id)}
              id="unequip"
              slot="actions"
              @click=${this.unequip}
            >
              Unequip
            </button>
          </detail-content>
        </side-screen>
      </side-screen>`;
  }
}
customElements.define('equipment-content', EquipmentContent);
