import { LitElement, html, css } from "lit-element";
import { wrap, transfer } from 'comlink';
import { buttonStyles } from "../styles/button.styles.js";
import { commonStyles } from "../styles/common.styles.js";
import { progressStyles } from "styles/progress.styles.js";
import { Activatable} from "../utils/mixins/activatable.js";

class CrewContent extends Activatable(LitElement) {
	static get styles() {
		return [
			progressStyles,
			buttonStyles,
			commonStyles,
			css`
				* {
					box-sizing: border-box;
				}
				:host {
					height: 100%;
					width: 100%;
					display: flex;
					flex-direction: column;
					padding: 8px;
					justify-content: space-between;
				}
				#crew {
					display: grid;
					grid-template-columns: repeat(
						auto-fill,
						minmax(var(--character-selector-width), 1fr)
					);
					padding: 8px;
					gap: 8px;
					max-height: 100%;
					overflow: auto;
				}
				#recruit {
					justify-content: center;
				}
				h2 {
					font-size: 1rem;
				}
				.crewMember {
					flex-direction: column;
				}
				.crewMember canvas {
					width: 100%;
				}
			`,
		];
	}

	static get properties() {
		return { crewMembers: { type: Array }, selectedMember: { type: Object }};
	}

	constructor() {
		super();
		this.crewMembers = [];
		this.initPlayer();
	}

	async initPlayer() {
		this.playerWorker = new SharedWorker('/workers/player.worker.js', {type: 'module'});
		const Player = wrap(this.playerWorker.port);
		this.player = await new Player();
		this.shadowRoot.querySelector('character-content').player = this.player;
		await this.player.initialized;
		await this.player.membersInitialized;
		this.crewMembers = await this.player.crewMembers;
		this.requestUpdate();
		await this.updateComplete;
		const renderAvatar = async (context, imageCallback) => {
			await this.activated;
			requestAnimationFrame(async () => {
				context.transferFromImageBitmap(await imageCallback());
				renderAvatar(context, imageCallback);
			});
		};		
		this.crewMembers.forEach(({id}) => {
			const avatarCanvas = this.shadowRoot.getElementById(id);
			const avatarContext = avatarCanvas.getContext("bitmaprenderer");
			renderAvatar(avatarContext, () => this.player.memberAvatarImage(id));
		});
	}

	selectCrew(member) {
		return async () => {
			await import("./character-content.js");
			this.selectedMember = member;
			this.shadowRoot
				.getElementById("character-screen")
				.toggleAttribute("open");
		};
	}

	async showRecruits() {
		await import("./recruit-content.js");
		this.shadowRoot.getElementById("recruit-screen").toggleAttribute("open");
	}

	recruit({ detail: newMember }) {
		this.player.crew.add(newMember);
		this.shadowRoot.getElementById("recruit-screen").toggleAttribute("open");
	}

	screenClosed() {
		this.requestUpdate();
	}

	render() {
		return html`
			<section id="crew">
			${this.crewMembers.map(
					(member) => html`<button
						class="crewMember"
						@click=${this.selectCrew(member)}
					>
						<canvas id="${member.id}" width="256" height="256"></canvas>
						<h2>${member.name}</h2>
					</button>`
				)}
			</section>
			<button id="recruit" @click=${this.showRecruits}>RECRUIT</button>
			<side-screen @before-close=${this.screenClosed} id="character-screen">
				<character-content
					.character=${this.selectedMember}
				></character-content>
			</side-screen>
			<side-screen @before-close=${this.screenClosed} id="recruit-screen">
				<h1 slot="header" hidden data-show-on-open>Recruits</h1>
				<recruit-content @recruited=${this.recruit}></recruit-content>
			</side-screen>
		`;
	}
}
customElements.define("crew-content", CrewContent);
