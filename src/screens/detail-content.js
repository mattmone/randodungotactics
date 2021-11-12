import { LitElement, html, css } from 'lit-element';
import { commonStyles } from 'styles/common.styles.js';
import { buttonStyles } from 'styles/button.styles.js';

class DetailContent extends LitElement {
  static get styles() {
    return [
      commonStyles,
      buttonStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        #image-section {
          height: 128px;
          display: grid;
          place-items: center;
        }
        img {
          height: 100%;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--primary-color);
          border-radius: var(--border-radius);
        }
        #stats-section {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        #equip {
          margin: 0 8px 8px 8px;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
        }

        #equip[equipped] {
          border-color:var(--accent-color);
          color:var(--accent-color);
        }]
      `,
    ];
  }

  static get properties() {
    return { item: { type: Object }, equipped: { type: Boolean } };
  }

  updated() {
    if (!this.item) return;
    import(`./details/${this.item.type}-detail.js`);
  }

  equip() {
    if (this.equipped) this.dispatchEvent(new CustomEvent('unequip-item', { detail: this.item }));
    else this.dispatchEvent(new CustomEvent('equip-item', { detail: this.item }));
  }

  render() {
    if (!this.item) return html``;
    return html`
      <div id="image-section">
        <img id="item-image" />
      </div>
      <div id="stats-section">
        ${this.item.type === 'weapon'
          ? html` <weapon-detail .item=${this.item}></weapon-detail> `
          : ''}
        ${this.item.type === 'armor'
          ? html` <armor-detail .item=${this.item}></armor-detail> `
          : ''}
        ${this.item.type === 'jewelry'
          ? html` <jewelry-detail .item=${this.item}></jewelry-detail> `
          : ''}
        ${this.item.type === 'gem' ? html` <gem-detail .item=${this.item}></gem-detail> ` : ''}
      </div>

      <button id="equip" ?equipped=${this.equipped} @click=${this.equip}>
        ${this.equipped ? 'equipped' : 'equip'}
      </button>
    `;
  }
}
customElements.define('detail-content', DetailContent);
