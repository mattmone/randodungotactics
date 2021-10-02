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
} from '../../node_modules/three/build/three.module.js';

import { makeMap } from '../utils/makeMap.js';
import { createTerrainSide } from '../utils/createTerrainSide.js';
import { rollDice } from '../utils/rollDice.js';
import { oneOf } from '../utils/oneOf.js';

const characters = [
  {
    name: 'character 1',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0xff0000 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:red"/></svg>',
  },
  {
    name: 'character 2',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x00ff00 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:green"/></svg>',
  },
  {
    name: 'character 3',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x0000ff })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:blue"/></svg>',
  },
  {
    name: 'character 4',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0xffff00 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:yellow"/></svg>',
  },
  {
    name: 'character 5',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0xff00ff })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:purple"/></svg>',
  },
  {
    name: 'character 6',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x00ffff })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:cyan"/></svg>',
  },
];

const enemies = [
  {
    name: 'enemy 1',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x440000 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:rgb(60,0,0)"/></svg>',
  },
  {
    name: 'enemy 2',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x004400 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:rgb(0,60,0)"/></svg>',
  },
  {
    name: 'enemy 3',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x000044 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:rgb(0,0,60)"/></svg>',
  },
  {
    name: 'enemy 4',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x444400 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:rgb(60,60,0)"/></svg>',
  },
  {
    name: 'enemy 5',
    avatar: new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0x440044 })),
    stats: {
      strength: Math.floor(Math.random() * 10),
      dexterity: Math.floor(Math.random() * 10),
      speed: Math.floor(Math.random() * 10),
      magic: Math.floor(Math.random() * 10),
    },
    avatarImage:
      'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" style="fill:rgb(60,0,60)"/></svg>',
  },
];

const positionEquals = (position1, position2) => {
  return position1?.x === position2?.x && position1?.z === position2?.z;
};

class GameMap {
  placedCharacters = [];
  queuedMaps = [];
  maps = [];
  renderedMaps = [];
  entryMaps = [];

  constructor({ canvas }) {
    this.canvas = canvas;
    this.scene = new Scene();
    this.scene.position.y = -1;
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
    if (mapType === 'mountain') {
      this.camera.zoom = 2;
      this.scene.position.y = -3;
    }
    this.camera.position.set(-24, 24, -24);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.scene.add(this.map);
    return this.mapSelection();
  }

  async loadMap(index, mapType) {
    await this.mapAvailable(index);
    this.map.removeFromParent();
    this.map = this.renderedMaps.splice(index, 1)[0];

    const enemyTiles = this.map.children.filter(tile => tile.userData.enemy);
    enemies.forEach(enemy => {
      const placementTile = oneOf(enemyTiles);
      placementTile.add(enemy.avatar);
      enemy.avatar.position.y =
        enemy.avatar.geometry.parameters.height * 0.5 +
        placementTile.geometry.parameters.height * 0.5;
    });

    this.map.children.forEach(tile => {
      const characterAtPosition = this.placedCharacters.find(character =>
        positionEquals(tile.position, character.position),
      );
      if (!characterAtPosition) return;
      this.placeCharacter({ character: characterAtPosition }, tile.position, tile);
    });
    this.mapType = mapType;
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    if (this.mapType === 'mountain') {
      this.camera.zoom = 2;
      this.scene.position.y = -3;
    }
    this.camera.position.set(-24, 24, -24);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.scene.add(this.map);
  }

  async mapClick() {
    const { x, y, z } = this.intersectedObject.position;
    return { x, y, z };
  }

  async placeCharacter(
    { character, characterIndex },
    position,
    placement = this.intersectedObject,
  ) {
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
    this.placedCharacters.push(character);
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
    if (this.map) this.map.rotation.y = this.rotation?.dx || 0;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(time => this.render(time));
  }
}
expose(GameMap);
