import { LitElement, html, css } from 'https://unpkg.com/lit-dist/dist/lit.js';
import { buttonStyles} from '../styles/button.styles.js';

class EquipmentContent extends LitElement {
  static get styles() {
    return [buttonStyles, css`
    ::slotted(button) {
      justify-content:center;
      text-transform:uppercase;
    }
    `]
  }

  static get properties() {
    return { };
  }

  render() {
    return html`<slot></slot>`
  }
}
customElements.define('equipment-content', EquipmentContent);