import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight,
} from "../libs/three.module.js";

export const initScene = (canvas, options = {}) => {
  const scene = new Scene();
  scene.position.y = -1;
  /**
   * @type {Number}
   */
  const aspect = canvas.width / canvas.height;
  const d = 70;
  const camera = new OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    -d * 2,
    d * 2
  );

  const ambientLight = new AmbientLight(0xffffff, 0.8);

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(3, 15, 3);

  scene.add(ambientLight);
  scene.add(directionalLight);

  const renderer = new WebGLRenderer({ canvas, alpha: options.alpha });
  renderer.setSize(canvas.width, canvas.height, false);

  return {
    scene,
    camera,
    renderer,
    aspect,
    directionalLight,
    ambientLight,
  };
};
