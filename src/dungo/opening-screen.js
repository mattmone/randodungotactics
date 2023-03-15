import {get} from '../libs/idb-keyval.js';

class OpeningScreen extends HTMLElement {
	connectedCallback() {
		get('crew/player').then(value => {
			if(value) this.#enableContinue();
		})
		const newButton = this.querySelector('#new');
		const optionsButton = this.querySelector('#options');
		const aboutButton = this.querySelector('#about');

		newButton.addEventListener('click', () => this.dispatchEvent(new Event('new')));
		optionsButton.addEventListener('click', () => this.dispatchEvent(new Event('options')));
		aboutButton.addEventListener('click', () => this.dispatchEvent(new Event('about')));
	}

	#enableContinue() {
		const continueButton = this.querySelector('#continue');
		continueButton.toggleAttribute('disabled', false);
		continueButton.addEventListener('click', () => {
			this.dispatchEvent(new Event('continue'));
		})
	}
}
customElements.define('opening-screen', OpeningScreen);