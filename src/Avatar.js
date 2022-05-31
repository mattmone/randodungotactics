export class Avatar {
  #colorOffset = {};
  #placeholder = '';
  #image = '';
  #currentAnimation = 'idle';

  constructor({ colorOffset = {}, placeholder = '', image = '' }) {
    this.#colorOffset = colorOffset;
    this.#image = image;
    this.#placeholder = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:hsl(${colorOffset?.eyes?.h ?? 0 * 360},${colorOffset?.eyes?.s ?? 0 * 100},${colorOffset?.eyes?.l ?? 0 * 100}}"/></svg>`;
    import('./services/modelRenderer.js').then(async ({ modelRenderer }) => {
      const { model, image } = await modelRenderer.renderAvatar({ colorOffset });
      this.mesh = model;
      this.#image = image;
    });
  }

  get serialized() {
    return this.#colorOffset;
  }

  get image() {
    if (this.#image) return this.#image;
    return this.#placeholder;
  }

  get ready() {
    return new Promise(resolve => {
      const avatarInterval = setInterval(() => {
        if (this.#image) {
          resolve();
          clearInterval(avatarInterval);
        }
      }, 25);
    });
  }

  /**
   * swap the avatar's current animation with another named animation
   * @param {string} newAnimation the name of the animation action to play
   * @param {SwapAnimationOptions} options the options for the animation swap
   * @returns {Avatar} this
   */
  swapAnimation(newAnimation, options = {}) {
    if (this.#currentAnimation === newAnimation) return;
    this.mesh.userData.animations.actions[newAnimation].clampWhenFinished = options.clamp;
    this.mesh.userData.animations.actions[newAnimation]
      .reset()
      .setLoop(options.loop)
			.setEffectiveWeight(1)
			.crossFadeFrom(this.mesh.userData.animations.actions[this.#currentAnimation], options.duration ?? 0.4, true)
			.play();
    this.#currentAnimation = newAnimation;
    const finishPromise = new Promise(resolve => {
      this.mesh.userData.animations.mixer.addEventListener(
        "finished",
        (event) => {
          console.log('finished');
          if(options.onFinish) options.onFinish();
          resolve(this);
        },
        { once: true }
      );
    });
    if(!options.await) return this;
    if(options.await === 'finish')
      return finishPromise;
    else return new Promise(async resolve => {
      const {duration} = this.mesh.userData.animations.actions[newAnimation].getClip();
      setTimeout(() => {
        resolve(this);
      }, duration*1000*options.await);
    })
  }
}

/**
 * @typedef {Object} SwapAnimationOptions
 * @property {number} [duration=0.4] the duration of the animation swap crossfade
 * @property {LoopRepeat|LoopOnce} [loop=LoopRepeat] whether the animation should loop LoopOnce or LoopRepeat
 * @property {boolean} [clamp=false] whether the animation should clamp when finished (pause on last frame)
 * @property {number|string} [await] the percentage of the new animation duration to wait before resolving the promise or 'finish' to wait for the end
 * @property {Function} [onFinish] a callback to run when the animation finishes
 */