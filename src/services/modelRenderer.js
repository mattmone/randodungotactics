import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  DirectionalLight,
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  AnimationMixer
} from "../../libs/three.module.js";
import {
  GLTFLoader
} from "../../libs/GLTFLoader.js";

class ModelRenderer {
  #canvas = new OffscreenCanvas(128, 128);
  #scene = new Scene();
  #camera = new OrthographicCamera(-1, 1, 1, -1, 1, 10);
  #renderer = new WebGLRenderer({ antialias: true, canvas: this.#canvas, alpha: true });
  #light = new DirectionalLight(0xffffff, 1);
  #processing = [];

  constructor() {
    this.#camera.position.set(1, 1, 1);
    this.#camera.lookAt(0, 0, 0);
    this.#camera.updateProjectionMatrix();

    this.#light.position.set(2, 2, 2);
    this.#scene.add(this.#light);

    this.#renderer.setClearColor(0x000000, 0);
    this.#renderer.setSize(this.#canvas.width, this.#canvas.height, false);
  }

  async renderAvatar({ color }) {
    const loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    // loader.setDRACOLoader(dracoLoader);

    const {scene: model} = await new Promise((resolve, reject) => {
      loader.load(
        // resource URL
        "../models/character.glb",
        // called when the resource is loaded
        function (gltf) {
          const {animations} = gltf;

          const mixer = new AnimationMixer(gltf.scene);

          const idleAction = mixer.clipAction(animations[0]);
          const walkAction = mixer.clipAction(animations[1]);
          idleAction.enabled = true;
          idleAction.setEffectiveTimeScale(1);
          idleAction.setEffectiveWeight(1);
          walkAction.enabled = true;
          walkAction.setEffectiveTimeScale(1);
          walkAction.setEffectiveWeight(0);
          idleAction.play();
          walkAction.play();

          resolve(gltf)
          console.log(gltf);
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
          console.log("An error happened", error);
        }
      );
    });
    // const model = new Mesh(
    //   new BoxGeometry(0.5, 1, 0.5),
    //   new MeshStandardMaterial({ color: color.hex }),
    // );
    model.userData.type = 'avatar';
    model.scale.set(0.25, 0.25, 0.25);
    return this.render(model);
  }

  async render(model) {
    const processing = [...this.#processing];
    const promise = new Promise(async resolve => {
      await Promise.allSettled(processing);
      this.#scene.add(model);
      this.#renderer.render(this.#scene, this.#camera);
      const imageBlob = await this.#canvas.convertToBlob();
      const image = URL.createObjectURL(imageBlob);
      resolve({ model, image });
      this.#scene.remove(model);
      this.#processing.shift();
    });
    this.#processing.push(promise);
    return promise;
  }
}

export const modelRenderer = new ModelRenderer();
