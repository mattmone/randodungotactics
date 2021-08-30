import { LitElement, html } from 'lit-element';
import { detailStyles } from 'styles/detail.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { statTemplate, effectsTemplate } from './common-detail.js';

class GemDetail extends LitElement {
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
    ${effectsTemplate(this.item.effects)}
    `
  }
}
customElements.define('gem-detail', GemDetail);