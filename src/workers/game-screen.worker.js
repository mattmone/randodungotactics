import { expose } from 'https://cdn.skypack.dev/comlink';
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
} from 'https://cdn.skypack.dev/three';

import { makeMap } from '../utils/makeMap.js';
import { createTerrainSide } from '../utils/createTerrainSide.js';
import { rollDice } from '../utils/rollDice.js';

class GameMap {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.maps = [];
    this.renderedMaps = [];
    this.entryMaps = [];
    this.scene = new Scene();
    this.scene.position.y = -1;
    this.aspect = canvas.width / canvas.height;
    const d = 70;
    this.camera = new OrthographicCamera(-d * this.aspect, d * this.aspect, d, -d, 1, 1000);

    this.ambientLight = new AmbientLight(0xffffff, 0.8);

    this.directionalLight = new DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, 15, 0);

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
    this.camera.near = -50;
    this.camera.far = 50;
    this.camera.updateProjectionMatrix();
  }

  setRotation({ dx }) {
    this.rotation = { dx: dx / 50 };
  }

  generateMap({ type = 'largeRoad', width = 24, height = 12 }) {
    const map = makeMap({ type, width, height });
    this.maps.push(map);
    this.renderMap(map, true);
    this.renderMap(map);
    return map;
  }

  async renderMap(map, characterPlacement) {
    const boxGeometry = new BoxGeometry();
    const group = new Group();
    let xPosition = -map[0].length / 2;
    let zPosition = -map.length / 2;

    for (let column of map) {
      for (let pixel of column) {
        if (characterPlacement && !pixel.entry) continue;
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
        const textureCanvas = createTerrainSide(pixel.entry ? 'entry' : pixel.texture);
        const texture = new CanvasTexture(textureCanvas);

        const boxMaterial = new MeshStandardMaterial({
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
        group.add(cube);
        xPosition += 1;
      }
      zPosition += 1;
      xPosition = -map[0].length / 2;
    }
    group.name = 'map';
    if (characterPlacement) this.entryMaps.push(group);
    else this.renderedMaps.push(group);
  }

  async mapAvailable(index, entry) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if ((entry ? this.entryMaps : this.renderedMaps)[index]) resolve();
      }, 16);
    });
  }

  async mapSelection() {
    return new Promise();
  }

  async entryMap(index, mapType) {
    await this.mapAvailable(index, true);
    this.map = this.entryMaps.splice(index, 1)[0];
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    this.camera.position.set(1, 1, 1);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.scene.add(this.map);
    return this.mapSelection();
  }

  async loadMap(index, mapType) {
    await this.mapAvailable(index);
    this.map = this.renderedMaps.splice(index, 1)[0];
    this.mapType = mapType;
    this.directionalLight.target = this.map;
    this.camera.zoom = 3;
    if (this.mapType === 'mountain') {
      this.camera.zoom = 2;
      this.scene.position.y = -3;
    }
    this.camera.position.set(1, 1, 1);
    this.camera.lookAt(this.map.position);
    this.camera.updateProjectionMatrix();
    this.scene.add(this.map);
  }

  render() {
    // const rotation = (state.delta?.x || 0) / 50;
    if (this.map) this.map.rotation.y = this.rotation?.dx || 0;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(time => this.render(time));
  }
}

expose(GameMap);
