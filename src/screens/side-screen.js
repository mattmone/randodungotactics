import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../styles/button.styles.js';

class SideScreen extends LitElement {
  static get properties() {
    return { open: { attribute: true } };
  }
  static get styles() {
    return [
      buttonStyles,
      css`
        :host {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          pointer-events: none;
        }
        :host([open]) .screen {
          transform: translate(0);
          pointer-events: all;
        }
        .screen {
          position: absolute;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(8px);
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          transform: translate(100%);
          transition: transform 0.2s;
          transition-timing-function: cubic-bezier(0, 0.4, 0.2, 1);
          transition-delay: 0.05s;
          display: grid;
          grid-template-rows: 45px calc(100% - 45px);
        }
        ::slotted(*) {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
        #close {
          grid-row: 1;
          margin-top: 8px;
          margin-right: 8px;
          justify-self: flex-end;
          height: 33px;
          width: 33px;
          padding: 0;
          display: grid;
          place-items: center;
          position: static;
        }
      `,
    ];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'open') {
      const screen = this.shadowRoot.querySelector('.screen');
      if (this.hasAttribute('open')) {
        this._triggeredBy = document.activeElement;
        screen.addEventListener(
          'transitionend',
          () => {
            screen.focus();
          },
          { once: true },
        );
      } else {
        screen.addEventListener(
          'transitionend',
          () => {
            this._triggeredBy?.focus();
          },
          { once: true },
        );
      }
    }
  }

  render() {
    return html`<section tabindex="-1" class="screen">
      <slot></slot>
      <button id="close" @click=${() => this.removeAttribute('open')}>&gt;</button>
    </section>`;
  }
}
customElements.define('side-screen', SideScreen);
