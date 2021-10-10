import { expose } from '../../node_modules/comlink/dist/esm/comlink.js';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  Group,
  DirectionalLight,
  AmbientLight,
  Vector2,
  Vector3,
  CanvasTexture,
  Raycaster,
  AnimationMixer,
  VectorKeyframeTrack,
  AnimationClip,
  Clock,
  LoopOnce,
  Quaternion,
  Object3D,
} from '../../node_modules/three/build/three.module.js';

import { makeMap } from '../utils/makeMap.js';
import { createTerrainSide } from '../utils/createTerrainSide.js';
import { rollDice } from '../utils/rollDice.js';
import { oneOf } from '../utils/oneOf.js';
import { Character } from '../character.js';
import { randomCharacter } from '../utils/randomCharacter.js';

const characters = new Array(7)
  .fill(0)
  .map(() =>
    randomCharacter(new Character('', new Mesh(new BoxGeometry(), new MeshStandardMaterial()))),
  );

const enemies = new Array(5)
  .fill(0)
  .map(() =>
    randomCharacter(new Character('', new Mesh(new BoxGeometry(), new MeshStandardMaterial()))),
  );

const positionEquals = (position1, position2) => {
  return position1?.x === position2?.x && position1?.z === position2?.z;
};

function turnSort(participant1, participant2) {
  let sort = 0;
  if (participant1.stats.dexterity < participant2.stats.dexterity) sort = 1;
  if (participant1.stats.dexterity > participant2.stats.dexterity) sort = -1;
  if (participant1.stats.speed < participant2.stats.speed) sort = 1;
  if (participant1.stats.speed > participant2.stats.speed) sort = -1;
  if (participant1.nextMove > participant2.nextMove) sort = 1;
  if (participant1.nextMove < participant2.nextMove) sort = -1;
  return sort;
}
/** Class representing the game map */
class GameMap {
  /**
   * @type {Character[]}
   */
  placedCharacters = new Set();
  /**
   * @type {Group[]}
   */
  maps = [];
  /**
   * @type {Group[]}
   */
  renderedMaps = [];
  /**
   * @type {Group[]}
   */
  entryMaps = [];
  /**
   * @type {Mesh[]}
   */
  animationsObjects = [];

  /**
   * instantiate the GameMap
   * @param {Object} params the game scene
   */
  constructor({ canvas }) {
    /**
     * @type {Canvas}
     */
    this.canvas = canvas;
    this.scene = new Scene();
    this.scene.position.y = -1;
    /**
     * @type {Number}
     */
    this.aspect = canvas.width / canvas.height;
    const d = 70;
    this.camera = new OrthographicCamera(-d * this.aspect, d * this.aspect, d, -d, 1, 1000);

    this.ambientLight = new AmbientLight(0xffffff, 0.8);

    this.directionalLight = new DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, 15, 0);

    this.raycaster = new Raycaster();
    this.mousePosition = new Vector2();

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.focalPoint = new Object3D();
    this.scene.add(this.focalPoint);

    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(canvas.width, canvas.height, false);

    this.render();
    return this;
  }

  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.aspect = width / height;
    const d = 30;

    this.camera.left = -d * this.aspect;
    this.camera.right = d * this.aspect;
    this.camera.top = d;
    this.camera.bottom = -d;
    this.camera.near = 0;
    this.camera.far = 60;
    this.camera.updateProjectionMatrix();
  }

  setRotation({ dx }) {
    this.rotation = { dx: dx / 50 };
  }

  selectableCharacters() {
    return characters.map(({ name, position, avatarImage }) => ({ name, position, avatarImage }));
  }

  generateMap({ type = 'largeRoad', width = 24, height = 12 }) {
    const map = makeMap({ type, width, height });
    this.maps.push(map);
    const mapName = `map-${Math.floor(Math.random() * 100000)}`;
    this.renderMap(map, { characterPlacement: true, mapName });
    this.renderMap(map, { mapName });
    return map;
  }

  async renderMap(map, { characterPlacement, mapName }) {
    const group = new Group();
    let xPosition = -map[0].length / 2;
    let zPosition = -map.length / 2;

    for (let column of map) {
      for (let pixel of column) {
        if (characterPlacement && !pixel.entry) {
          xPosition += 1;
          continue;
        }
        if (pixel.tree) {
          let layers = rollDice(4);
          const textureCanvas = createTerrainSide('stump');
          const texture = new CanvasTexture(textureCanvas);
          const stumpGeometry = new BoxGeometry(0.5, 1, 0.5);
          const stumpMaterial = new MeshStandardMaterial({ map: texture });
          const stumpCube = new Mesh(stumpGeometry, stumpMaterial);
          stumpCube.position.set(xPosition, pixel.elevation + 0.5, zPosition);
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
              const treeMaterial = cubeImages.map(
                canvasTexture => new MeshStandardMaterial({ map: canvasTexture }),
              );
              const treeCube = new Mesh(treeGeometry, treeMaterial);
              treeCube.position.set(
                xPosition,
                pixel.elevation + 0.5 + (treeLayers.length - cubeIndex) * 0.5,
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
          rockCube.position.set(xPosition, pixel.elevation + 0.5, zPosition);
          group.add(rockCube);
        }
        const textureCanvas = createTerrainSide(characterPlacement ? 'entry' : pixel.texture);
        const texture = new CanvasTexture(textureCanvas);

        const boxMaterial = new (
          pixel.texture === 'water' ? MeshBasicMaterial : MeshStandardMaterial
        )({
          map: texture,
        });
        const cube = new Mesh(
          new BoxGeometry(
            1,
            pixel.texture === 'water' ? pixel.elevation : pixel.elevation + 0.5,
            1,
          ),
          boxMaterial,
        );
        cube.position.set(
          xPosition,
          0.5 * (pixel.texture === 'water' ? pixel.elevation - 0.5 : pixel.elevation),
          zPosition,
        );
        cube.userData = { ...pixel };
        group.add(cube);
        xPosition += 1;
      }
      zPosition += 1;
      xPosition = -map[0].length / 2;
    }
    group.name = mapName;
    if (characterPlacement) this.entryMaps.push(group);
    else this.renderedMaps.push(group);
  }

  mouseOver({ x, y }) {
    this.mousePosition.x = (x / this.canvas.width) * 2 - 1;
    this.mousePosition.y = -(y / this.canvas.height) * 2 + 1;
  }

  async mapAvailable(index, entry) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if ((entry ? this.entryMaps : this.renderedMaps)[index]) resolve();
      }, 16);
    });
  }

  async mapSelection() {
    return new Promise(resolve => {
      resolve();
    });
  }

  async entryMap(index, mapType) {
    await this.mapAvailable(index, true);
    this.map = this.entryMaps.splice(index, 1)[0];
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    this.focalPoint.position.y = 0;
    if (mapType === 'mountain') {
      this.camera.zoom = 2;
      this.focalPoint.position.y = -3;
    }
    this.camera.position.set(-24, 24, -24);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.focalPoint.add(this.map);
    return this.mapSelection();
  }

  async loadMap(index, mapType) {
    await this.mapAvailable(index);
    this.map.removeFromParent();
    this.map = this.renderedMaps.splice(index, 1)[0];

    const enemyTiles = this.map.children.filter(tile => tile.userData.enemy);
    enemies.forEach(enemy => {
      const placementTile = oneOf(enemyTiles);
      this.placeCharacter({ character: enemy }, placementTile, true);
    });

    this.map.children.forEach(tile => {
      const characterAtPosition = Array.from(this.placedCharacters).find(character =>
        positionEquals(tile.position, character.position),
      );
      if (!characterAtPosition) return;
      this.placeCharacter({ character: characterAtPosition }, tile);
    });
    this.mapType = mapType;
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    this.focalPoint.y = 0;
    if (this.mapType === 'mountain') {
      this.camera.zoom = 2;
      this.focalPoint.y = -3;
    }
    this.camera.position.set(-24, 24, -24);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.focalPoint.add(this.map);
  }

  async startBattle() {
    this.participants = [...this.placedCharacters, ...enemies].sort(turnSort);
    this.timer = 0;
    this.currentParticipant = this.participants[0];
    this.focus();
    return this.currentParticipant.passable;
  }

  focus(position = this.currentParticipant.position) {
    this.createMoveAnimation({ endPosition: position });
  }

  initiateMove() {}

  endTurn() {
    this.currentParticipant.nextMove =
      this.currentTime + 1 / (0.25 * this.currentParticipant.stats.speed);
    this.participants.sort(turnSort);
    console.log(this.participants);
    this.currentParticipant = this.participants[0];
    this.currentTime = this.currentParticipant.nextMove;
    this.focus();
    return this.currentParticipant.passable;
  }

  createMoveAnimation({ mesh = this.map, startPosition = this.map.position, endPosition }) {
    mesh.userData.mixer = new AnimationMixer(mesh);
    const endPointVector = new Vector3(-endPosition.x, startPosition.y, -endPosition.z);
    const animationTiming = 0.3;
    const track = new VectorKeyframeTrack(
      '.position',
      [0, animationTiming],
      [startPosition.x, startPosition.y, startPosition.z, ...endPointVector.toArray()],
    );
    const animationClip = new AnimationClip(null, -1, [track]);
    const animationAction = mesh.userData.mixer.clipAction(animationClip);
    animationAction.play();
    mesh.userData.clock = new Clock();
    this.animationsObjects.push(mesh);
    mesh.userData.mixer.addEventListener('loop', () => {
      requestAnimationFrame(() => {
        mesh.position.set(...endPointVector.toArray());
      });
      delete mesh.userData.mixer;
      delete mesh.userData.clock;
      this.animationsObjects.splice(this.animationsObjects.indexOf(mesh), 1);
    });
  }

  async mapClick() {
    const { x, y, z } = this.intersectedObject.position;
    const clickPosition = { x, y, z };
    const selectedParticipant = this.participants?.find?.(({ position }) =>
      positionEquals(position, clickPosition),
    )?.passable;
    if (selectedParticipant || this.currentParticipant)
      this.focus((selectedParticipant || this.currentParticipant).position);
    return { clickPosition, selectedParticipant };
  }

  async placeCharacter({ character, characterIndex }, placement = this.intersectedObject, enemy) {
    placement.children.forEach(child => child.removeFromParent());
    if (!character) character = characters[characterIndex];
    character.avatar.childOf = placement;
    character.position = { ...placement.position };
    const characterAtPosition = characters.find(
      char => char !== character && positionEquals(char.position, character.position),
    );
    if (characterAtPosition) characterAtPosition.position = null;
    character.avatar.position.y =
      character.avatar.geometry.parameters.height * 0.5 +
      placement.geometry.parameters.height * 0.5;
    placement.add(character.avatar);
    if (!enemy) this.placedCharacters.add(character);
  }

  render() {
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    const [intersect] = this.raycaster.intersectObjects(this.map?.children || [], true);
    if (intersect) {
      if (this.intersectedObject && this.intersectedObject !== intersect) {
        this.intersectedObject.material.map = this.intersectedObjectMaterial;
      }
      this.intersectedObject = intersect.object.childOf || intersect.object;
      this.intersectedObjectMaterial = this.intersectedObject.material.map;
      this.intersectedObject.material.map = new CanvasTexture(createTerrainSide('highlight'));
    } else if (this.intersectedObject) {
      this.intersectedObject.material.map = this.intersectedObjectMaterial;
      this.intersectedObject = false;
      this.intersectedObjectMaterial = false;
    }
    if (this.focalPoint) this.focalPoint.rotation.y = this.rotation?.dx || 0;
    this.renderer.render(this.scene, this.camera);
    this.animationsObjects.forEach(mesh => {
      if (mesh.userData.clock && mesh.userData.mixer) {
        mesh.userData.mixer.update(mesh.userData.clock.getDelta());
      }
    });
    requestAnimationFrame(time => this.render(time));
  }
}
expose(GameMap);
