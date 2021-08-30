import { LitElement, html, css } from 'lit-element';
import { commonStyles } from 'styles/common.styles.js';
import { buttonStyles } from 'styles/button.styles.js';

class DetailContent extends LitElement {
  static get styles() {
    return [commonStyles, buttonStyles, css`
    :host {
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    #image-section {
      height:128px;
      display:grid;
      place-items:center;
    }
    img {
      height:100%;
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
    `]
  }

  static get properties() {
    return { item: {Object} };
  }

  updated() {
    if(!this.item) return;
    import(`./details/${this.item.category}-detail.js`);
  }

  render() {
    if(!this.item) return html``;
    return html`
      <div id='image-section'>
        <img id='item-image'/>
      </div>
      <div id='stats-section'>
        ${this.item.category === 'weapon' ? html`
          <weapon-detail .item=${this.item}></weapon-detail>
        ` : ''}
        ${this.item.category === 'armor' ? html`
          <armor-detail .item=${this.item}></armor-detail>
        ` : ''}
        ${this.item.category === 'jewelry' ? html`
          <jewelry-detail .item=${this.item}></jewelry-detail>
        ` : ''}
        ${this.item.category === 'gem' ? html`
          <gem-detail .item=${this.item}></gem-detail>
        ` : ''}
      </div>
      
    <button id='equip'>equip</button>
    `
  }
}
customElements.define('detail-content', DetailContent);