import { LitElement, html, css } from "lit";
import {
  BoxGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  Group,
  Vector2,
  Vector3,
  CanvasTexture,
  Raycaster,
  AnimationMixer,
  VectorKeyframeTrack,
  QuaternionKeyframeTrack,
  AnimationClip,
  Clock,
  Object3D,
  Quaternion,
  LoopOnce,
  InterpolateSmooth,
  Color,
} from "../libs/three.module.js";

import { initScene } from "../utils/initScene.js";
import { createTerrainSide } from "../utils/createTerrainSide.js";
import { nextFrame } from "../utils/nextFrame.js";
import { AnimationCollection } from "../services/AnimationCollection.js";
import { oneOf } from "../utils/oneOf.js";
import { copyVector } from "../utils/copyVector.js";
import { rollDice } from "../utils/rollDice.js";
import { DIRECTION, OPPOSITE_DIRECTION } from '../constants/directions.js';
import { DungeonMap } from "../services/DungeonMap.js";
import { directionModifier } from "../utils/directionModifier.js";
const ACTION = {
  MOVE: "move",
  OPEN: "open",
};

const TYPE = {
  INTERACTABLE: "interactable",
};

const OPPOSING_EXITS = {
  NORTH: "south",
  SOUTH: "north",
  EAST: "west",
  WEST: "east",
};

class GameScreen extends LitElement {
  #canvas;
  #scene;
  #camera;
  #renderer;
  #map = new DungeonMap();
  #aspect;
  #directionalLight;
  #ambientLight;
  #resizeObserver;
  #raycaster = new Raycaster();
  #mousePosition = new Vector2();
  #focalPoint = new Object3D();
  #animationCollection = new AnimationCollection();

  static get styles() {
    return [
      css`
        :host([interacting]) {
          cursor: pointer;
        }
        canvas {
          height: 100%;
          width: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      playerCrew: {},
    };
  }

  async firstUpdated() {
    this.#canvas = this.shadowRoot.querySelector("canvas");
    await this.#sizeCanvas();
    ({
      scene: this.#scene,
      camera: this.#camera,
      renderer: this.#renderer,
      aspect: this.#aspect,
      directionalLight: this.#directionalLight,
      ambientLight: this.#ambientLight,
    } = initScene(this.#canvas));
    const firstRoom = await this.#map.generateRoom(rollDice(3, 2), rollDice(3, 2), 1);
    await firstRoom.initialized;
    const renderedRoom = await this.renderRoom(firstRoom);
    this.#scene.add(renderedRoom);

    this.playerCrew.leader.avatar.mesh.position.set(0, 0, 0);
    this.playerCrew.leader.avatar.mesh.scale.set(0.05, 0.05, 0.05);
    this.#scene.add(this.playerCrew.leader.avatar.mesh);
    this.#focalPoint.add(this.#camera);
    this.#scene.add(this.#focalPoint);

    this.#camera.position.set(10, 10, 10);
    this.#camera.zoom = 8;
    this.#camera.lookAt(this.#focalPoint.position);
    this.#camera.updateProjectionMatrix();

    this.renderCanvas();

    this.#resizeObserver = new ResizeObserver(async () => {
      await this.#sizeCanvas();
      this.#camera.updateProjectionMatrix();
    });
    this.#resizeObserver.observe(this.#canvas);
  }

  /**
   * create a floor box
   * @param {import('../services/FloorTile.js').FloorTile} floorTile
   * @param {import('../../types').FloorTileOptions} options
   * @returns {Group} the box for the floor piece and associtated content
   */
  #generateFloorBox(floorTile, options = {}) {
    const textureCanvas = createTerrainSide(floorTile.terrain);
    const texture = new CanvasTexture(textureCanvas);

    const boxMaterial = new MeshBasicMaterial({
      map: texture,
    });
    const box = new Mesh(new BoxGeometry(1, 1, 1), boxMaterial);
    box.position.set(floorTile.x, -0.5, floorTile.z);
    box.userData = {
      type: options.type ?? TYPE.INTERACTABLE,
      action: options.action ?? ACTION.MOVE,
    };
    if(floorTile.hasWall) {
      const textureCanvas = createTerrainSide("rock");
    const texture = new CanvasTexture(textureCanvas);
      const wallMaterial = new MeshBasicMaterial({
        map: texture,
      });
      const wall = new Mesh(new BoxGeometry(floorTile.northSouthWall ? 0.1 : 1, 1, floorTile.eastWestWall ? 0.1 : 1), wallMaterial);
      wall.position.set(directionModifier( ) 0, 0.5, -0.5);
      box.add(wall);
    }
    return box;
  }

  /**
   * 
   * @param {import('../services/ExitTile.js').ExitTile} exitTile 
   * @param {FloorTileOptions} options 
   * @returns 
   */
  #generateExit(exitTile, options = {}) {
    const floorBox = this.#generateFloorBox(exitTile, {
      type: false,
      action: ACTION.MOVE,
    });
    const textureCanvas = createTerrainSide("rock");
    const texture = new CanvasTexture(textureCanvas);

    const doorMaterial = new MeshBasicMaterial({
      map: texture,
    });
    const door = new Mesh(
      new BoxGeometry(exitTile.northSouth ? 0.99 : 0.25, 1, exitTile.northSouth ? 0.25 : 0.99),
      doorMaterial
    );
    door.position.set(0, 1, 0);
    door.userData = {
      type: TYPE.INTERACTABLE,
      action: ACTION.OPEN,
      tile: exitTile
    };
    floorBox.add(door);
    return floorBox;
  }

  /**
   * render a room
   * @param {import('../services/Room.js').Room} room
   * @returns {Group} the rooms meshes in a Group
   */
  async renderRoom(room) {
    const group = new Group();
    room.floorTiles.forEach((floorTile) => {
      group.add(this.#generateFloorBox(floorTile));
    });
    room.exitTiles.forEach((exitTile) => {
      group.add(this.#generateExit(exitTile))
    })
    group.userData.room = room;
    return group;
  }

  async #sizeCanvas() {
    await nextFrame();
    const { width, height } = this.getBoundingClientRect();
    this.#canvas.width = Math.floor(width);
    this.#canvas.height = Math.floor(height);
    await nextFrame();
  }

  highlightIntersection() {
    this.#raycaster.setFromCamera(this.#mousePosition, this.#camera);
    const intersects = this.#raycaster.intersectObjects(
      this.#scene?.children || [],
      true
    );
    const intersect = intersects.find(
      ({ object }) => object?.userData?.type === TYPE.INTERACTABLE
    );
    if (intersect && intersect?.object?.userData?.type === TYPE.INTERACTABLE) {
      if (
        this.intersectedObject &&
        this.intersectedObject !== intersect.object
      ) {
        this.intersectedObject.material.map =
          this.intersectedObject.userData.materialMap;
        this.intersectedObject.material.opacity =
          this.intersectedObject.userData.opacity;
      }
      if (this.intersectedObject === intersect.object) return;
      this.intersectedObject =
        intersect.object.userData.childOf || intersect.object;
      this.intersectedObject.userData.materialMap =
        this.intersectedObject.material.map;
      this.intersectedObject.userData.opacity =
        this.intersectedObject.material.opacity;
      this.intersectedObject.material.map = new CanvasTexture(
        createTerrainSide("highlight")
      );
      this.intersectedObject.material.opacity = 1;
      this.toggleAttribute("interacting", true);
    } else if (this.intersectedObject) {
      this.intersectedObject.material.map =
        this.intersectedObject.userData.materialMap;
      this.intersectedObject.material.opacity =
        this.intersectedObject.userData.opacity;
      this.intersectedObject = false;
      this.toggleAttribute("interacting", false);
    }
  }

  pointerMove(event) {
    const { buttons, offsetX: x, offsetY: y } = event;
    this.#mousePosition.x = (x / this.#canvas.width) * 2 - 1;
    this.#mousePosition.y = -(y / this.#canvas.height) * 2 + 1;
    this.highlightIntersection();
  }

  async pointerClick(event) {
    if (this.intersectedObject.userData.action === ACTION.MOVE) {
      const characterEndPosition = copyVector(
        this.intersectedObject.position
      ).add(copyVector(this.intersectedObject.parent.position));
      this.#animationCollection.createMoveAnimation({
        character: this.playerCrew.leader,
        endPosition: characterEndPosition,
      });
      this.#animationCollection
        .createMoveAnimation({
          mesh: this.#focalPoint,
          endPosition: characterEndPosition,
          faceEndPoint: false,
        })
        .then(() =>
          this.#scene.children.forEach((mesh) => mesh.updateMatrixWorld())
        );
    } else if (this.intersectedObject.userData.action === ACTION.OPEN) {
      
      const { mesh } = await this.#animationCollection.createMoveAnimation({
        mesh: this.intersectedObject,
        endPointVector: new Vector3(0, 0, 0),
        faceEndPoint: false,
      });
      mesh.parent.userData.type = TYPE.INTERACTABLE;
      console.log(mesh.parent.userData);
      mesh.removeFromParent();
      const roomWidth = rollDice(3, 2);
      const roomLength = rollDice(3, 2);
      
      const room = await this.#map.generateRoom(roomWidth, roomLength, rollDice(3), mesh.userData.tile);
      const renderedRoom = await this.renderRoom(room);

      this.#scene.add(renderedRoom);
    }
  }

  renderCanvas() {
    // if (this.#focalPoint) this.#focalPoint.rotation.y = this.rotation?.dx || 0;
    this.#renderer.render(this.#scene, this.#camera);
    this.#animationCollection.animations.forEach((mesh) => {
      ["animations", "temporalAnimation"].forEach((animation) => {
        if (mesh.userData?.[animation]) {
          mesh.userData[animation].mixer.update(
            mesh.userData[animation].clock.getDelta()
          );
        }
      });
    });
    requestAnimationFrame((time) => this.renderCanvas(time));
  }

  render() {
    return html`<canvas
      @pointermove=${this.pointerMove}
      @click=${this.pointerClick}
    ></canvas>`;
  }
}

customElements.define("game-screen", GameScreen);
