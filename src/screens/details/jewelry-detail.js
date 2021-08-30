import { LitElement, html } from 'lit-element';
import { detailStyles } from 'styles/detail.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { gemsTemplate, statTemplate, effectsTemplate } from './common-detail.js';

class JewelryDetail extends LitElement {
  static get styles() {
    return [commonStyles, detailStyles]
  }

  static get properties() {
    return { item: Object };
  }

  render() {
    return html`
    <header>${this.item.name}</header>
    ${statTemplate('Quality', this.item.strength)}
    ${statTemplate('Power', this.item.power)}
    ${gemsTemplate(this.item.gems)}
    ${effectsTemplate(this.item.effects)}
    `
  }
}
customElements.define('jewelry-detail', JewelryDetail);