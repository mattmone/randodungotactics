import { LitElement, html, css } from 'lit-element';
import { dieDisplay } from 'utils/dieDisplay.js';
import { detailStyles } from 'styles/detail.styles.js';
import { commonStyles } from 'styles/common.styles.js';
import { progressStyles } from 'styles/progress.styles.js';
import { durabilityTemplate, gemsTemplate, statTemplate, effectsTemplate } from './common-detail.js';

class WeaponDetail extends LitElement {
  static get styles() {
    return [progressStyles, commonStyles, detailStyles]
  }

  static get properties() {
    return { item: Object };
  }

  render() {
    return html`
    <header>${this.item.name}</header>
    ${durabilityTemplate(this.item)}
    ${statTemplate(this.item.type, this.item.damage)}
    ${statTemplate('Damage', dieDisplay(this.item.strength, this.item.power))}
    ${gemsTemplate(this.item.gems)}
    ${effectsTemplate(this.item.effects)}
    `
  }
}
customElements.define('weapon-detail', WeaponDetail);