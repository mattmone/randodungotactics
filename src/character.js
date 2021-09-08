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
  Object3D,
  Matrix4,
  Texture,
  Quaternion,
  QuaternionKeyframeTrack,
  AnimationClip,
  AnimationMixer,
} from 'https://cdn.skypack.dev/three';

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

const headBox = new BoxGeometry(4, 3, 3);
const fleshMaterial = new MeshStandardMaterial({ color: 0xdd9988 });
const shirtMaterial = new MeshStandardMaterial({ color: 0x3355aa });
const pantsMaterial = new MeshStandardMaterial({ color: 0x777777 });
const bootMaterial = new MeshStandardMaterial({ color: 0x333333 });
const head = new Mesh(headBox, fleshMaterial);
const upperBodyBox = new BoxGeometry(3, 2.5, 2);
const upperBody = new Mesh(upperBodyBox, shirtMaterial);
upperBody.position.set(0, -2.5, -0.5);
const lowerBodyBox = new BoxGeometry(3, 1, 2);
const lowerBody = new Mesh(lowerBodyBox, pantsMaterial);
lowerBody.position.set(0, -4.25, -0.5);

const legBox = new BoxGeometry(0.5, 1.5, 0.5);
const leftLeg = new Mesh(legBox, pantsMaterial);
leftLeg.position.set(0.75, -5.5, -0.5);
const rightLeg = new Mesh(legBox, pantsMaterial);
rightLeg.position.set(-0.75, -5.5, -0.5);
const footBox = new BoxGeometry(0.5, 0.5, 1);
const leftFoot = new Mesh(footBox, bootMaterial);
leftFoot.position.set(0.75, -6.5, -0.25);
const rightFoot = new Mesh(footBox, bootMaterial);
rightFoot.position.set(-0.75, -6.5, -0.25);

{
  const armBox = new BoxGeometry(0.5, 2, 0.5);
  const handBox = new BoxGeometry(0.5, 0.5, 0.5);

  const leftArm = new Mesh(armBox, shirtMaterial);
  leftArm.position.set(1.8, -3, -0.25);
  const leftHand = new Mesh(handBox, fleshMaterial);
  leftHand.position.set(1.8, -4.25, -0.25);
  const leftLimb = new Group();
  leftLimb.add(leftArm);
  leftLimb.add(leftHand);
  // rotateAboutPoint(leftLimb, new Vector3(-0.5, -2, -0.5), new Vector3(1, 0, 0), Math.PI / 4);

  const rightHand = new Mesh(handBox, fleshMaterial);
  rightHand.position.set(-1.8, -4.25, -0.25);
  const rightArm = new Mesh(armBox, shirtMaterial);
  rightArm.position.set(-1.8, -3, -0.25);
  const rightLimb = new Group();
  rightLimb.add(rightArm);
  rightLimb.add(rightHand);
  // rotateAboutPoint(rightLimb, new Vector3(-0.5, -2, -0.5), new Vector3(1, 0, 0), -Math.PI / 4);

  scene.add(leftLimb);
  scene.add(rightLimb);

  const xAxis = new Vector3(1, 0, 0);

  const qInitial = new Quaternion().setFromAxisAngle(xAxis, Math.PI / 4);
  const qFinal = new Quaternion().setFromAxisAngle(xAxis, -Math.PI / 4);
  const quaternionKF = new QuaternionKeyframeTrack(
    '.quaternion',
    [0, 1, 2],
    [
      qInitial.x,
      qInitial.y,
      qInitial.z,
      qInitial.w,
      qFinal.x,
      qFinal.y,
      qFinal.z,
      qFinal.w,
      qInitial.x,
      qInitial.y,
      qInitial.z,
      qInitial.w,
    ],
  );

  const clip = new AnimationClip('Action', 1, [quaternionKF]);
  window.armMixer = new AnimationMixer(leftLimb);
  const clipAction = window.armMixer.clipAction(clip);
  clipAction.play();
}

scene.add(head);
scene.add(upperBody);
scene.add(lowerBody);
scene.add(leftLeg);
scene.add(rightLeg);
scene.add(leftFoot);
scene.add(rightFoot);

const focalPoint = head;
camera.position.set(
  focalPoint.position.x + 10,
  focalPoint.position.y + 10,
  focalPoint.position.z + 10,
);
camera.lookAt(focalPoint.position);
camera.zoom = 2;
camera.updateProjectionMatrix();

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(-30, 30, 30);
directionalLight.target = focalPoint;

scene.add(directionalLight);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener('click', () => {
  const oldMap = scene.getObjectByName('map');
  scene.remove(oldMap);
  const mapGroup = renderMap();
  scene.add(mapGroup);
});

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
  renderer.render(scene, camera);
  window.armMixer.update();
  requestAnimationFrame(() => animate());
}

animate();

function renderMap() {
  const map = makeMap();
  const boxGeometry = new BoxGeometry();
  const group = new Group();
  let xPosition = 0;
  let zPosition = 0;

  for (let column of map) {
    for (let pixel of column) {
      do {
        const textureCanvas = createTerrainSide(pixel.texture);
        const texture = new CanvasTexture(textureCanvas);
        cubeTexture.needsUpdate = true;
        const boxMaterial = new MeshStandardMaterial({ map: texture });
        const cube = new Mesh(boxGeometry, boxMaterial);
        cube.position.set(xPosition, pixel.elevation, zPosition);
        group.add(cube);
        pixel.elevation -= 1;
      } while (pixel.elevation > 0);
      xPosition += 1;
    }
    zPosition += 1;
    xPosition = 0;
  }
  group.name = 'map';
  return group;
}
