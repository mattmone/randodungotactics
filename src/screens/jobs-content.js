import { LitElement, html, css } from 'lit';
import { oneOf } from 'utils/oneOf.js';
import { mapTypes } from 'constants/mapTypes.js';
import { buttonStyles } from '../styles/button.styles.js';

class JobsContent extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }

  static get properties() {
    return {
      jobs: Array,
    };
  }

  constructor() {
    super();
    this.jobs = Array(6)
      .fill(0)
      .map(() => oneOf(mapTypes));
    this.loadGameScreen();
  }

  async loadGameScreen() {
    await import('./game-screen.js');
    this.gameScreen = document.querySelector('game-screen');
    await this.gameScreen.gameMapLoaded;

    this.gameScreen.generateMaps(this.jobs);
  }

  selectJob(mapIndex, mapType) {
    return async () => {
      await this.gameScreen.gameMapLoaded;
      this.gameScreen.selectMap(mapIndex, mapType);
      document.querySelector('#opening_screen').toggleAttribute('hidden', true);
      this.gameScreen.toggleAttribute('hidden', false);
      this.dispatchEvent(new CustomEvent('game-start'));
    };
  }

  render() {
    return html`${this.jobs.map(
      (job, jobIndex) => html`<button @click=${this.selectJob(jobIndex, job)}>${job}</button>`,
    )}`;
  }
}
customElements.define('jobs-content', JobsContent);
