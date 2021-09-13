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
  CanvasTexture,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeMap } from './mapping.js';
import { createTerrainSide } from './canvasTextures.js';
import { rollDice } from './utils/rollDice.js';
import { oneOf } from './utils/oneOf.js';

const mapTypes = [
  'largeRoad',
  'smallRoad',
  'path',
  'mountain',
  'plains',
  'desert',
  'river',
  'creek',
];
// const mapTypes = ['mountain'];

const raycaster = new Raycaster();
const mouse = new Vector2();
let intersectionObject;
const scene = new Scene();
const aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

const light = new AmbientLight(0xffffff, 0.8);
scene.add(light);

const group = renderMap();
scene.add(group);

const focalPoint = new Vector3(4, 4, 10);
camera.position.set(focalPoint.x + 15, focalPoint.y + 15, focalPoint.z + 15);
camera.lookAt(focalPoint);
camera.updateProjectionMatrix();

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(-30, 30, 30);
directionalLight.target = group;

scene.add(directionalLight);

const renderer = new WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxZoom = 2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.querySelector('button').addEventListener('click', () => {
  const oldMap = scene.getObjectByName('map');
  scene.remove(oldMap);
  const mapGroup = renderMap();
  scene.add(mapGroup);
});
// renderer.domElement.addEventListener('click', event => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObject(scene, true);

//   if (intersects.length) {
//     const [
//       {
//         object: { position },
//       },
//     ] = intersects;
//     const { x, y, z } = position;
//     console.log(x, y, z);
//     let xModifier = 1;
//     let zModifier = 1;
//     if (x < 6) xModifier = -1;
//     if (z < 12) zModifier = -1;
//     camera.position.set(x + 10 * xModifier, y + 10, z + 10 * zModifier);
//     camera.lookAt(position);
//   }
// });

// renderer.domElement.addEventListener('mousemove', event => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObject(scene, true);

//   if (intersects.length) {
//     if (intersects[0].object !== intersectionObject) {
//       if (intersectionObject) {
//         intersectionObject.material.color.set(intersectionObject.priorColor);
//       }
//       intersectionObject = intersects[0].object;
//       intersectionObject.priorColor = JSON.parse(JSON.stringify(intersectionObject.material.color));
//       intersectionObject.material.color.set(intersectionObject.material.color.addScalar(0.5));
//     }
//   } else if (intersectionObject)
//     intersectionObject.material.color.set(intersectionObject.priorColor);
// });

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

function renderMap() {
  const type = oneOf(mapTypes);
  document.querySelector('#mapType').textContent = type;
  const map = makeMap({ type });

  const boxGeometry = new BoxGeometry();
  const group = new Group();
  let xPosition = -map[0].length / 2;
  let zPosition = -map.length / 2;

  for (let column of map) {
    for (let pixel of column) {
      if (pixel.tree) {
        let layers = rollDice(4);
        const textureCanvas = createTerrainSide('stump');
        const texture = new CanvasTexture(textureCanvas);
        const stumpGeometry = new BoxGeometry(0.5, 1, 0.5);
        const stumpMaterial = new MeshStandardMaterial({ map: texture });
        const stumpCube = new Mesh(stumpGeometry, stumpMaterial);
        stumpCube.position.set(xPosition, pixel.elevation + 1, zPosition);
        group.add(stumpCube);
        layers--;
        if (layers) {
          new Array(layers * 2).fill(0).forEach((_, cubeIndex, treeLayers) => {
            const size = cubeIndex / (treeLayers.length + 1) + 0.5;
            const treeGeometry = new BoxGeometry(size, 0.5, size);
            const textureCanvas =
              pixel.texture === 'snow'
                ? createTerrainSide('tree', { positiveZ: 'snow' })
                : createTerrainSide('tree');
            let cubeImages = Array(6).fill(new CanvasTexture(textureCanvas));
            if (textureCanvas.positiveX)
              cubeImages = Object.values(textureCanvas).map(canvas => new CanvasTexture(canvas));
            // console.log(cubeImages);
            const treeMaterial = cubeImages.map(
              canvasTexture => new MeshStandardMaterial({ map: canvasTexture }),
            );
            const treeCube = new Mesh(treeGeometry, treeMaterial);
            treeCube.position.set(
              xPosition,
              pixel.elevation + 1 + (treeLayers.length - cubeIndex) * 0.5,
              zPosition,
            );
            group.add(treeCube);
          });
        }
      }
      if (pixel.rock) {
        const textureCanvas =
          pixel.texture === 'snow'
            ? createTerrainSide('rock', { positiveZ: 'snow' })
            : createTerrainSide('rock');
        let cubeImages = Array(6).fill(new CanvasTexture(textureCanvas));
        if (textureCanvas.positiveX)
          cubeImages = Object.values(textureCanvas).map(canvas => new CanvasTexture(canvas));
        const rockMaterial = cubeImages.map(
          canvasTexture => new MeshStandardMaterial({ map: canvasTexture }),
        );
        const rockGeometry = new BoxGeometry(0.9, 1, 0.9);
        const rockCube = new Mesh(rockGeometry, rockMaterial);
        rockCube.position.set(xPosition, pixel.elevation + 1, zPosition);
        group.add(rockCube);
      }
      const textureCanvas = createTerrainSide(pixel.texture);
      const texture = new CanvasTexture(textureCanvas);
      do {
        const boxMaterial = new MeshStandardMaterial({
          map: texture,
        });
        const cube = new Mesh(boxGeometry, boxMaterial);
        cube.position.set(xPosition, pixel.elevation, zPosition);
        group.add(cube);
        pixel.elevation -= 1;
      } while (pixel.elevation > 0);
      xPosition += 1;
    }
    zPosition += 1;
    xPosition = -map[0].length / 2;
  }
  group.name = 'map';
  return group;
}
