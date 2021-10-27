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
    randomCharacter(
      new Character('', new Mesh(new BoxGeometry(0.5, 1, 0.5), new MeshStandardMaterial())),
    ),
  );

const enemies = new Array(5)
  .fill(0)
  .map(() =>
    randomCharacter(
      new Character('', new Mesh(new BoxGeometry(0.5, 1, 0.5), new MeshStandardMaterial())),
    ),
  );

const positionEquals = (position1, position2) => {
  return position1?.x === position2?.x && position1?.z === position2?.z;
};

const sameTeam = (char1, char2) => {
  return (
    (characters.includes(char1) && characters.includes(char2)) ||
    (enemies.includes(char1) && enemies.includes(char2))
  );
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

  interactible = [];

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
        const textureCanvas = createTerrainSide(characterPlacement ? 'entry' : pixel.texture);
        const texture = new CanvasTexture(textureCanvas);

        const boxMaterial = new (
          pixel.texture === 'water' ? MeshBasicMaterial : MeshStandardMaterial
        )({
          map: texture,
        });
        const cubeHeight = pixel.texture === 'water' ? pixel.elevation : pixel.elevation + 0.5;
        const cube = new Mesh(new BoxGeometry(1, cubeHeight, 1), boxMaterial);
        cube.position.set(
          xPosition,
          0.5 * (pixel.texture === 'water' ? pixel.elevation - 0.5 : pixel.elevation),
          zPosition,
        );
        cube.userData = { ...pixel };
        const tileExtras = this.renderTileExtras({ ...pixel, cubeHeight });
        if (tileExtras.length) cube.add(...tileExtras);
        if (characterPlacement) cube.userData.type = 'placement';
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

  renderTileExtras({ tree, elevation, texture, rock, cubeHeight }) {
    const meshes = [];
    if (tree) {
      let layers = rollDice(4);
      const textureCanvas = createTerrainSide('stump');
      const texture = new CanvasTexture(textureCanvas);
      const stumpGeometry = new BoxGeometry(0.5, 1, 0.5);
      const stumpMaterial = new MeshStandardMaterial({ map: texture });
      const tree = new Mesh(stumpGeometry, stumpMaterial);
      tree.position.set(0, cubeHeight / 2 + stumpGeometry.parameters.height / 2, 0);
      layers--;
      if (layers) {
        const treeLayers = layers * 2;
        for (let cubeIndex = treeLayers; cubeIndex > 0; cubeIndex--) {
          const size = cubeIndex / (treeLayers + 1) + 0.5;
          const treeGeometry = new BoxGeometry(size, 0.5, size);
          const textureCanvas =
            texture === 'snow'
              ? createTerrainSide('tree', { positiveZ: 'snow' })
              : createTerrainSide('tree');
          let cubeImages = Array(6).fill(new CanvasTexture(textureCanvas));
          if (textureCanvas.positiveX)
            cubeImages = Object.values(textureCanvas).map(canvas => new CanvasTexture(canvas));
          const treeMaterial = cubeImages.map(
            canvasTexture => new MeshStandardMaterial({ map: canvasTexture }),
          );
          const leaves = new Mesh(treeGeometry, treeMaterial);
          leaves.position.set(
            0,
            stumpGeometry.parameters.height / 2 +
              ((treeLayers - cubeIndex) * treeGeometry.parameters.height) / (!cubeIndex ? 2 : 1),
            0,
          );
          tree.add(leaves);
        }
      }
      meshes.push(tree);
    }
    if (rock) {
      const textureCanvas =
        texture === 'snow'
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
      rockCube.position.set(0, cubeHeight / 2 + rockGeometry.parameters.height / 2, 0);
      meshes.push(rockCube);
    }
    return meshes;
  }

  mouseOver({ x, y }) {
    this.mousePosition.x = (x / this.canvas.width) * 2 - 1;
    this.mousePosition.y = -(y / this.canvas.height) * 2 + 1;
    this.determineIntersectionObject();
  }

  async mapClick({ x, y }) {
    this.mousePosition.x = (x / this.canvas.width) * 2 - 1;
    this.mousePosition.y = -(y / this.canvas.height) * 2 + 1;
    this.determineIntersectionObject();
    if (!this.intersectedObject) return;
    const { x: objx, y: objy, z: objz } = this.intersectedObject.position;
    const clickPosition = { x: objx, y: objy, z: objz };
    const selectedParticipant = this.participants?.find?.(({ position }) =>
      positionEquals(position, clickPosition),
    )?.passable;
    // if (selectedParticipant || this.currentParticipant)
    //   this.focus((selectedParticipant || this.currentParticipant).position);
    let endPhase = false,
      damage,
      position;
    if (this.phase === 'move') endPhase = await this.move(clickPosition);
    if (this.phase === 'action' && this.action === 'attack')
      [endPhase, damage, position] = await this.attack(clickPosition);
    return { clickPosition, selectedParticipant, endPhase, damage, position };
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
    this.phase = 'placement';
    await this.mapAvailable(index, true);
    this.map = this.entryMaps.splice(index, 1)[0];
    const maximalChildren = this.map.children.reduce((accumulatedChild, child) => ({
      minX: Math.min(
        !isNaN(accumulatedChild.minX) ? accumulatedChild.minX : accumulatedChild.position.x,
        child.position.x,
      ),
      minZ: Math.min(
        !isNaN(accumulatedChild.minZ) ? accumulatedChild.minZ : accumulatedChild.position.z,
        child.position.z,
      ),
      maxX: Math.max(
        !isNaN(accumulatedChild.maxX) ? accumulatedChild.maxX : accumulatedChild.position.x,
        child.position.x,
      ),
      maxZ: Math.max(
        !isNaN(accumulatedChild.maxZ) ? accumulatedChild.maxZ : accumulatedChild.position.z,
        child.position.z,
      ),
    }));
    const [midX, midZ] = [
      (Math.max(maximalChildren.maxX, maximalChildren.minX) +
        Math.min(maximalChildren.maxX, maximalChildren.minX)) /
        2,
      (Math.max(maximalChildren.maxZ, maximalChildren.minZ) +
        Math.min(maximalChildren.maxZ, maximalChildren.minZ)) /
        2,
    ];
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    if (mapType === 'mountain') {
      this.camera.zoom = 2;
      this.focalPoint.position.y = -3;
    }
    this.camera.position.set(-24, 24, -24);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.focalPoint.add(this.map);
    this.focus({ x: midX, y: 0, z: midZ });
    return this.mapSelection();
  }

  async loadMap(index, mapType) {
    this.phase = 'firstTurn';
    await this.mapAvailable(index);
    await this.focus({ x: 0, y: 0, z: 0 });
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
    this.focalPoint.position.set(0, 0, 0);
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
    this.currentTime = 0;
    this.currentParticipant = this.participants[0];
    this.focus();
    return this.currentParticipant.passable;
  }

  focus(position = this.currentParticipant.tile.position) {
    return this.createMoveAnimation({ endPosition: position });
  }

  initiateMove() {
    this.phase = 'move';
    this.markInteractibles(this.currentParticipant.move, this.phase);
  }

  initiateAttack() {
    this.phase = 'action';
    this.action = 'attack';
    this.markInteractibles(this.currentParticipant.attackRange, this.phase);
  }

  markInteractibles(range, action) {
    this.clearInteractible();
    this.interactible = this.map.children.filter(
      tile =>
        tile.position.distanceTo(this.currentParticipant.tile.position) <= range + 0.2 &&
        !tile.userData.tree &&
        tile.userData.texture !== 'water' &&
        !positionEquals(tile.position, this.currentParticipant.tile.position),
    );
    this.interactible.forEach(tile => {
      const material = new MeshBasicMaterial({
        map: new CanvasTexture(createTerrainSide('interactable')),
      });
      material.opacity = 0.6;
      material.transparent = true;
      const interactTile = new Mesh(new BoxGeometry(1, 0.1, 1), material);
      interactTile.position.y = tile.position.y + 0.25 + (tile.userData.rock ? 1 : 0);
      interactTile.userData.type = action;
      tile.add(interactTile);
    });
  }

  async move(position) {
    const startBlock = this.currentParticipant.tile;
    const endBlock = this.intersectedObject.parent;
    const startPosition = startBlock.position;
    const endPosition = endBlock.position;
    const endPointVector = new Vector3(
      this.currentParticipant.avatar.position.x + (endPosition.x - startPosition.x),
      this.currentParticipant.avatar.position.y +
        (endBlock.userData.elevation - startBlock.userData.elevation) +
        (endBlock.userData?.rock ? 1 : 0) -
        (startBlock.userData?.rock ? 1 : 0),
      this.currentParticipant.avatar.position.z + (endPosition.z - startPosition.z),
    );
    await this.createMoveAnimation({
      mesh: this.currentParticipant.avatar,
      startPosition: this.currentParticipant.avatar.position,
      endPointVector,
    });
    this.currentParticipant.tile = endBlock;
    this.focus();
    this.clearInteractible();
    this.phase = '';
    return 'move';
  }

  async attack(position) {
    const victim = this.participants.find(({ avatar }) =>
      positionEquals(avatar.userData.childOf.position, this.intersectedObject.parent.position),
    );
    if (sameTeam(victim, this.currentParticipant)) console.log('same team');
    const damage = rollDice(...this.currentParticipant.damage);
    victim.hp -= damage;
    if (victim.hp <= 0) victim.die();
    const vector = new Vector3().subVectors(
      victim.avatar.userData.childOf.position,
      this.currentParticipant.avatar.userData.childOf.position,
    );
    vector.x += 0.5;
    vector.y += 2;
    vector.project(this.camera);
    vector.x = ((vector.x + 1) * this.canvas.width) / 2;
    vector.y = (-(vector.y - 1) * this.canvas.height) / 2;

    this.clearInteractible();
    this.phase = '';
    return ['action', damage, { x: vector.x, y: vector.y }];
  }

  clearInteractible() {
    if (!this.interactible) this.interactible = [];
    this.interactible.forEach(tile =>
      tile.children
        .find(actionTile => /action|move/.test(actionTile.userData.type))
        ?.removeFromParent(),
    );
    this.interactible = [];
  }

  endTurn() {
    this.clearInteractible();
    this.currentParticipant.nextMove =
      this.currentTime + 1 / (0.25 * this.currentParticipant.stats.speed);
    this.participants.sort(turnSort);
    this.currentParticipant = this.participants[0];
    this.currentTime = this.currentParticipant.nextMove;
    if (this.currentParticipant.dead) return this.endTurn();
    this.focus();
    return this.currentParticipant.passable;
  }

  createMoveAnimation({
    mesh = this.map,
    startPosition = this.map.position,
    endPosition,
    endPointVector,
  }) {
    return new Promise(resolve => {
      mesh.userData.mixer = new AnimationMixer(mesh);
      if (!endPointVector)
        endPointVector = new Vector3(-endPosition.x, startPosition.y, -endPosition.z);
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
          resolve();
        });
        delete mesh.userData.mixer;
        delete mesh.userData.clock;
        this.animationsObjects.splice(this.animationsObjects.indexOf(mesh), 1);
      });
    });
  }

  async placeCharacter({ character, characterIndex }, placement = this.intersectedObject, enemy) {
    placement.children.forEach(child => child.removeFromParent());
    if (!character) character = characters[characterIndex];
    character.tile = placement;
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

  determineIntersectionObject() {
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.map?.children || [], true);
    const intersect = intersects.find(({ object }) => object?.userData?.type === this.phase);
    if (intersect && intersect?.object?.userData?.type === this.phase) {
      if (this.intersectedObject && this.intersectedObject !== intersect.object) {
        this.intersectedObject.material.map = this.intersectedObject.userData.materialMap;
        this.intersectedObject.material.opacity = this.intersectedObject.userData.opacity;
      }
      if (this.intersectedObject === intersect.object) return;
      this.intersectedObject = intersect.object.userData.childOf || intersect.object;
      this.intersectedObject.userData.materialMap = this.intersectedObject.material.map;
      this.intersectedObject.userData.opacity = this.intersectedObject.material.opacity;
      this.intersectedObject.material.map = new CanvasTexture(createTerrainSide('highlight'));
      this.intersectedObject.material.opacity = 1;
    } else if (this.intersectedObject) {
      this.intersectedObject.material.map = this.intersectedObject.userData.materialMap;
      this.intersectedObject.material.opacity = this.intersectedObject.userData.opacity;
      this.intersectedObject = false;
    }
  }

  render() {
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
