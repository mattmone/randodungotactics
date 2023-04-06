import {
  AnimationMixer,
  AnimationClip,
  Clock,
  VectorKeyframeTrack,
  Quaternion,
  Vector3,
} from "../libs/three.module.js";
import { copyVector } from "../utils/copyVector.js";
export class AnimationCollection {
  #animations = new Set();

  get animations() {
    return this.#animations;
  }

  set animations(value) {
    throw new Error("Interact with animations via methods.");
  }

  /**
   * turn the target in the direction
   * @param {import('../libs/three.module.js').Object3D} mesh the mesh to be rotated
   * @param {Vector3} startRef the starting Vector3
   * @param {Vector3} endRef the ending Vector3
   */
  createRotationAnimation(mesh, startRef, endRef) {
    const end = copyVector(endRef);
    const lookTo = end.sub(copyVector(startRef));
    lookTo.y = 0;
    const lookingAt = new Vector3(0, 0, 0);
    mesh.getWorldDirection(lookingAt);
    let angle = lookingAt.angleTo(lookTo);
    const orientation = lookingAt.x * lookTo.z - lookingAt.z * lookTo.x;
    if (orientation > 0) angle = 2 * Math.PI - angle;
    mesh.rotateY(angle);
  }

  createMoveAnimation({
    character,
    mesh = character.avatar.mesh,
    startPosition = mesh?.position ?? character?.avatar?.mesh?.position,
    endPosition,
    endPointVector,
    moreSteps,
    faceEndPoint = true,
  }) {
    return new Promise((resolve) => {
      const temporalAnimation = {
        mixer: new AnimationMixer(mesh),
        clock: new Clock(),
      };
      if (!endPointVector) {
        endPointVector = new Vector3(
          endPosition.x,
          startPosition.y,
          endPosition.z
        );
      }
      const animationTiming = startPosition.distanceTo(endPointVector) / 2;
      const track = new VectorKeyframeTrack(
        ".position",
        [0, animationTiming],
        [
          startPosition.x,
          startPosition.y,
          startPosition.z,
          ...endPointVector.toArray(),
        ]
      );
      const animationClip = new AnimationClip(null, -1, [track]);
      const animationAction = temporalAnimation.mixer.clipAction(animationClip);
      animationAction.play();
      if (!mesh.userData.clock) mesh.userData.clock = new Clock();
      mesh.userData.temporalAnimation = temporalAnimation;
      this.#animations.add(mesh);
      if (mesh.userData.animations?.actions?.walk) {
        if (faceEndPoint)
          this.createRotationAnimation(mesh, startPosition, endPosition);

        const heightDistance =
          Math.max(endPointVector.y, startPosition.y) -
          Math.min(endPointVector.y, startPosition.y);
        if (heightDistance < 0.33) {
          if (character) character.avatar.swapAnimation("walk");
        } else {
          if (character) character.avatar.swapAnimation("jump");
        }
      }
      temporalAnimation.mixer.addEventListener(
        "loop",
        () => {
          requestAnimationFrame(() => {
            mesh.position.set(...endPointVector.toArray());
            resolve({ character, mesh });
          });
          delete mesh.userData.temporalAnimation;
          animationAction.stop();
          temporalAnimation.mixer.uncacheAction(animationClip, mesh);
          if (mesh.userData.animations?.actions?.walk && !moreSteps) {
            if (character) character.avatar.swapAnimation("idle");
          }
          this.#animations.delete(mesh);
        },
        { once: true }
      );
    });
  }
}
