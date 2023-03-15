import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  AmbientLight,
  Raycaster,
  Vector2,
  Vector3,
  Object3D,
  Quaternion,
  QuaternionKeyframeTrack,
  AnimationClip,
  AnimationMixer,
  Clock,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Character } from './services/Character.js';

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld = false) {
  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

const raycaster = new Raycaster();
const mouse = new Vector2();
let intersectionObject;
const scene = new Scene();
const aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

const light = new AmbientLight(0xffffff, 0.8);
scene.add(light);

const character = new Character();
const fleshColorPicker = document.querySelector('#fleshColor');
fleshColorPicker.value = `#${character.fleshMaterial.color.getHexString()}`;
fleshColorPicker.addEventListener('change', ({ target: { value } }) => {
  character.setFleshColor(value);
});
const hairColorPicker = document.querySelector('#hairColor');
hairColorPicker.value = `#${character.hairMaterial.color.getHexString()}`;
hairColorPicker.addEventListener('change', ({ target: { value } }) => {
  character.setHairColor(value);
});
const eyeColorPicker = document.querySelector('#eyeColor');
eyeColorPicker.value = `#${character.eyeMaterial.color.getHexString()}`;
eyeColorPicker.addEventListener('change', ({ target: { value } }) => {
  character.setEyeColor(value);
});
document.querySelector('#setHair').addEventListener('click', async () => {
  const hairStyles = ['bald', 'topknot', 'flat', 'mohawk'];
  const chosenHairIndex = hairStyles.indexOf(character.chosenHairStyle || 'bald');
  character.chosenHairStyle = hairStyles[(chosenHairIndex + 1) % hairStyles.length];
  if (character.chosenHairStyle === 'bald') return character.setHair(false);
  const { getHair } = await import(`./hair/${character.chosenHairStyle}.js`);
  character.setHair(getHair);
});

scene.add(character.model);

const focalPoint = character.model;
camera.position.set(
  focalPoint.position.x + 10,
  focalPoint.position.y + 10,
  focalPoint.position.z + 10,
);
camera.lookAt(focalPoint.position);
camera.zoom = 1;
camera.updateProjectionMatrix();

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(-30, 30, 30);
directionalLight.target = focalPoint;
directionalLight.castShadow = true;

scene.add(directionalLight);

const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new Clock();
function animate() {
  renderer.render(scene, camera);
  const delta = 0.75 * clock.getDelta();
  character.update(delta);

  requestAnimationFrame(() => animate());
}

animate();
