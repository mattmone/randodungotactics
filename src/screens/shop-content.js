import { LitElement, html, css } from 'lit';
import { Inventory } from '../services/Inventory.js';
import { buttonStyles } from '../styles/button.styles.js';
import { commonStyles } from '../styles/common.styles.js';
import { selectorStyles } from '../styles/selector.styles.js';
import { dieDisplay } from '../utils/dieDisplay.js';

class ShopContent extends LitElement {
  constructor() {
    super();
    this.category = 'weapons';
    this.inventory = new Inventory('shop');
    this.playerInventory = new Inventory();
    this.playerInventory.initialized.then(() => {
      this.requestUpdate();
    });
    this.selectedItems = [];
    this.inventory.initialized.then(async () => {
      if (!this.inventory.items?.length) await this.inventory.random({ quantity: 100 });
      await Promise.all(this.inventory.items.map(item => item.initialized));
      await Promise.all(
        this.inventory.items.map(async item => {
          if (item.created > new Date().getTime() - 1000 * 60 * 24) return;
          this.inventory.remove(item);
          const [newItem] = await this.inventory.random();
          return newItem.initialized;
        }),
      );
      this.weapons = this.inventory.weapons;
      this.bodies = this.inventory.bodies;
      this.hands = this.inventory.hands;
      this.heads = this.inventory.heads;
      this.boots = this.inventory.boots;
      this.rings = this.inventory.rings;
      this.necklaces = this.inventory.necklaces;
      this.gems = this.inventory.gems;
      this.shields = this.inventory.shields;
      this.selectedItems = this.weapons;
    });
  }
  static get styles() {
    return [
      buttonStyles,
      selectorStyles,
      commonStyles,
      css`
        :host {
          flex: 1;
          display: flex;
        }
        #shop {
          display: flex;
          flex-direction: column-reverse;
          flex: 1 1 0%;
          overflow: auto;
        }
        button {
          justify-content: center;
        }
        #items {
          flex: 1 1 0%;
          display: flex;
          flex-direction: column;
          padding: 0 8px 8px 8px;
          gap: 8px;
          overflow: auto;
        }
        #player-coin {
          position: sticky;
          color: white;
          top: 0px;
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.4);
          z-index: 2;
        }
        .sale-item {
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
          justify-content: space-between;
        }
        .sale-item :nth-child(odd) {
          text-align: left;
        }
        .sale-item :nth-child(even) {
          text-align: right;
        }
        .sale-item :last-child {
          grid-column: 1 / span 2;
          text-align: center;
        }
        .loan-section {
          color: white;
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
        #loan-actions {
          display: flex;
          flex-direction: row;
          gap: 8px;
        }
        #loan-actions button {
          flex: 1;
          justify-content: center;
          align-items: center;
        }
        .top-content {
          display: flex;
          flex: 1;
          flex-direction: column;
        }
      `,
    ];
  }

  static get properties() {
    return {
      category: { type: String, state: true },
      selectedItems: { type: Array, state: true },
      detailItem: { type: Object, state: true },
      loanState: { type: String, state: true },
    };
  }

  categorySelect(category) {
    return () => {
      this.category = category;
      this.selectedItems = this[category];
    };
  }

  itemDetails(item) {
    return async () => {
      await import('./detail-content.js');
      this.detailItem = item;
      this.shadowRoot.getElementById('item-screen').toggleAttribute('open', true);
    };
  }

  notEnoughDungocoin() {
    this.shadowRoot.getElementById('loan-screen').toggleAttribute('open', true);
    this.loanState = 'offer';
  }

  loan() {
    this.playerInventory.addDungocoin(100);
    this.loanState = 'accepted';
  }

  denyLoan() {
    this.loanState = 'declined';
  }

  closeLoan() {
    this.shadowRoot.getElementById('loan-screen').toggleAttribute('open', false);
  }

  async buy() {
    await this.playerInventory.initialized;
    try {
      this.playerInventory.spendDungocoin(this.detailItem.price);
    } catch (error) {
      this.notEnoughDungocoin();
      return;
    }
    this.playerInventory.add(this.detailItem);
    this.inventory.remove(this.detailItem, true);
    this.shadowRoot.getElementById('item-screen').toggleAttribute('open', false);
    this.requestUpdate();
  }

  render() {
    return html` <section id="shop">
        <nav class="selector">
          <button ?selected=${this.category === 'weapons'} @click=${this.categorySelect('weapons')}>
            <span>⚔</span>
          </button>
          <button ?selected=${this.category === 'bodies'} @click=${this.categorySelect('bodies')}>
            <span>🥋</span>
          </button>
          <button ?selected=${this.category === 'hands'} @click=${this.categorySelect('hands')}>
            <span>🧤</span>
          </button>
          <button ?selected=${this.category === 'heads'} @click=${this.categorySelect('heads')}>
            <span>⛑</span>
          </button>
          <button ?selected=${this.category === 'boots'} @click=${this.categorySelect('boots')}>
            <span>🥾</span>
          </button>
          <button ?selected=${this.category === 'rings'} @click=${this.categorySelect('rings')}>
            <span>💍</span>
          </button>
          <button
            ?selected=${this.category === 'necklaces'}
            @click=${this.categorySelect('necklaces')}
          >
            <span>📿</span>
          </button>
          <button ?selected=${this.category === 'gems'} @click=${this.categorySelect('gems')}>
            <span>💎</span>
          </button>
        </nav>
        <div id="items">
          <div id="player-coin" ?hidden=${this.playerInventory?.dungocoin === 'undefined'}>
            ${this.playerInventory?.dungocoin}
          </div>
          ${this.selectedItems.map(
            item => html`
              <button class="sale-item" @click=${this.itemDetails(item)}>
                <span>${item.name}</span>
                <span
                  >${dieDisplay(item.strength, item.power)} damage
                  ${item.itemType === 'armor' ? 'reduction' : ''}</span
                >
                ${item.type === 'armor' ? html`<span>${item.durability} durability</span>` : ''}
                ${item.itemType === 'Weapon'
                  ? html` <span>${item.hands} hands</span>
                      <span>${item.range} range</span>`
                  : ''}
                ${item.effects.size ? html`<span>${item.effects.size} effects</span>` : ''}
                ${item.gemSlots ? html`<span>${item.gemSlots} gem slots</span>` : ''}
                <span>${item.price} dungocoins</span>
              </button>
            `,
          )}
        </div>
      </section>
      <side-screen id="item-screen">
        <detail-content .item=${this.detailItem}>
          <button slot="actions" @click="${this.buy}">Buy</button>
        </detail-content>
      </side-screen>
      <side-screen id="loan-screen">
        <h1 slot="heading">Cashed out</h1>
        <section ?hidden=${this.loanState !== 'offer'} id="loan-offer" class="loan-section">
          <div class="top-content">
            <p>Looks like you don't have any coin friend.</p>
            <p>I can provide great loan rates for adventurers!</p>
            <p>Sign on the dotted line and I'll loan you 100 dungocoin.</p>
          </div>
          <p>Would you like a loan?</p>
          <div id="loan-actions">
            <button @click="${this.loan}">Yes</button>
            <button @click="${this.denyLoan}">No</button>
          </div>
        </section>
        <section ?hidden=${this.loanState !== 'accepted'} id="loan-accept" class="loan-section">
          <div class="top-content">
            <p>Good option friend! Very friendly rates, I must say!</p>
            <p>
              I'll just take your Adventurer's Guild id and have them cut me in on your profits
              until you've paid it all back.
            </p>
          </div>
          <div id="loan-actions"><button @click="${this.closeLoan}">Close</button></div>
        </section>
        <section ?hidden=${this.loanState !== 'declined'} id="loan-decline" class="loan-section">
          <div class="top-content">
            <p>Alright, alright. I suppose you'll make your money without new equipment then.</p>
          </div>
          <div id="loan-actions"><button @click="${this.closeLoan}">Close</button></div>
        </section>
      </side-screen>`;
  }
}
customElements.define('shop-content', ShopContent);
