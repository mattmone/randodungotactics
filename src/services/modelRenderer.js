import {
  AnimationMixer,
  Clock,
  Object3D
} from "../../libs/three.module.js";
import {
  GLTFLoader
} from "../../libs/GLTFLoader.js";
// import {
//   DRACOLoader
// } from "../../libs/DRACOLoader.js";
import { initScene } from "../../utils/initScene.js";

class ModelRenderer {
  #canvas = new OffscreenCanvas(256, 256);
  #scene;
  #camera;
  #renderer;
  #processing = [];

  constructor() {
    ({
      scene: this.#scene,
      camera: this.#camera,
      renderer: this.#renderer,
    } = initScene(this.#canvas, {alpha: true}));
    this.#camera.updateProjectionMatrix();
  }

  /**
   * 
   * @param {Object} AvatarRenderParams
   * @param {import("../character.js").AvatarColorOffset} AvatarRenderParams.colorOffset 
   * @returns 
   */
  async renderAvatar({ colorOffset = {} }) {
    const loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/libs/draco/gltf/");
    // loader.setDRACOLoader(dracoLoader);

    const {scene: model} = await new Promise((resolve, reject) => {
      loader.load(
        // resource URL
        "../models/vox-character.glb",
        // called when the resource is loaded
        function (gltf) {
          gltf.scene.traverse( ( object ) => {

            if ( object.isMesh ) {
              Object.keys(colorOffset).forEach(key => {
                if(object.material.name.includes(key) || key === 'hands' && object.material.name.includes('ring')) {
                  const { h, s, l } = colorOffset[key]
                  if(colorOffset[key].set) object.material.color.setHSL(h,s,l);
                  else object.material.color.offsetHSL(h,s,l);
                }
              });
            }
          
          } );

          const {animations} = gltf;

          const mixer = new AnimationMixer(gltf.scene);

          
          const actions = Object.fromEntries(animations.map(animationClip => {
            return [animationClip.name, mixer.clipAction(animationClip)]
          }));
          
          Object.values(actions).forEach(action => {
            action.enabled = true;
            action.setEffectiveTimeScale(1);
            action.setEffectiveWeight(0);
            action.play();
          });
          actions.idle.setEffectiveWeight(1);
          gltf.scene.userData.animationsMixer = {
            mixer,
            actions,
            clock: new Clock()
          };

          resolve(gltf)
          // gltf.animations; // Array<THREE.AnimationClip>
          // gltf.scene; // THREE.Group
          // gltf.scenes; // Array<THREE.Group>
          // gltf.cameras; // Array<THREE.Camera>
          // gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          reject(error);
          console.log("An error happened", error);
        }
      );
    });
    
    // const model = new Mesh(
    //   new BoxGeometry(0.5, 1, 0.5),
    //   new MeshStandardMaterial({ color: color.hex }),
    // );
    model.userData.type = 'avatar';
    const scale = 0.03;
    model.scale.set(scale, scale, scale);
    return this.render(model);
  }

  async render(model) {
    const processing = [...this.#processing];
    const promise = new Promise(async resolve => {
      await Promise.allSettled(processing);
      model.position.y = -60;
      const scale = 4;
      const priorScale = model.scale.toArray();
      const priorPosition = model.position.toArray();
      model.scale.set(scale,scale,scale);
      this.#scene.add(model);
      this.#renderer.render(this.#scene, this.#camera);
      const imageBlob = await this.#canvas.convertToBlob();
      const image = URL.createObjectURL(imageBlob);
      resolve({ model, image });
      this.#scene.remove(model);
      model.scale.set(...priorScale);
      model.position.set(...priorPosition);
      this.#processing.shift();
    });
    this.#processing.push(promise);
    return promise;
  }
}

export const modelRenderer = new ModelRenderer();
