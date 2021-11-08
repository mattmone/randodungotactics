import { html } from 'lit-element';
import { dieDisplay } from 'utils/dieDisplay.js';

export const durabilityTemplate = item =>
  html`
    <div id="durability" class="underlabelled">
      <progress max=${item.maxdurability} value=${item.durability}></progress>
      <span>durability</span>
    </div>
  `;

export const gemsTemplate = gems =>
  !gems?.length
    ? html``
    : html`
        <div class="underlabelled">
          <div class="gem-slots">
            ${gems.map(
              gem => html`
                ${gem.name
                  ? html`<div class="gem" style="--gem-color:${gem.color || 'black'}"></div>`
                  : html`<button class="empty gem"></button>`}
              `,
            )}
          </div>
          <span>gems</span>
        </div>
      `;

export const statTemplate = (left, right) =>
  html`
    <div class="stat">
      <span>${left}</span>
      <span>${right}</span>
    </div>
  `;

export const effectsTemplate = effects =>
  !effects?.length
    ? html``
    : html`
        <header>effects</header>
        ${effects.map(
          effect => html`
            ${statTemplate(
              `${effect.name}${effect.source ? `(${effect.source})` : ''}`,
              dieDisplay(effect.strength, effect.power),
            )}
          `,
        )}
      `;
