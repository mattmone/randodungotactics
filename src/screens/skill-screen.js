import { LitElement, html, css } from 'https://unpkg.com/lit-dist/dist/lit.js';

class SkillScreen extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position:absolute;
          top:0;
          left:0;
          height:100%;
          width:100%;
          pointer-events:none;
        }
        :host([open]) .screen {
          transform:translate(0);
          pointer-events:all;
        }
        .screen {
          position:absolute;
          background:black;
          top:0;
          left:0;
          height: 100%; 
          width:100%;
          transform:translate(100%);
          transition:transform 0.4s;
          transition-timing-function: cubic-bezier(0, 0.8, 0.9, 1);
          transition-delay: 0.1s;
        }
        #close {
          position:absolute;
          top:8px;
          right:8px;
          border-radius: var(--border-radius);
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }
      `
    ]
  }
    render() {
      return html`<section class='screen'>

        <button id='close' @click=${() => this.removeAttribute('open')}>X</button>
      </section>`
    }
}
customElements.define('skill-screen', SkillScreen);