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
import {
  DIRECTION,
  OPPOSITE_DIRECTION,
  isNorthSouth,
  isEastWest,
} from "../constants/directions.js";
import { DungeonMap } from "../services/DungeonMap.js";
import { directionModifier } from "../utils/directionModifier.js";
import { get, set } from "idb-keyval";
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

  /** @type {import('../libs/three.module.js').Scene} */
  #scene;
  #camera;
  #renderer;
  #map;
  #aspect;
  #directionalLight;
  #ambientLight;
  #resizeObserver;
  #raycaster = new Raycaster();
  #mousePosition = new Vector2();
  #focalPoint = new Object3D();
  #animationCollection = new AnimationCollection();
  #currentPath = [];
  #highlights = [];

  constructor() {
    super();
    this.#map = new DungeonMap(this.getAttribute("mapId") ?? undefined);
  }

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
    await this.#map.initialized;
    if (!this.hasAttribute("mapId")) {
      set("current-map", this.#map.id);
      const firstRoom = await this.#map.generateRoom(
        rollDice(3, 2),
        rollDice(3, 2),
        rollDice(4)
      );
      await firstRoom.initialized;
      this.#map.exploreRoom(firstRoom.id);
      const renderedRoom = await this.renderRoom(firstRoom);
      this.#scene.add(renderedRoom);

      const entrancePosition = oneOf(firstRoom?.floorTiles).position;
      this.playerCrew.leader.avatar.mesh.position.set(
        entrancePosition.x,
        0,
        entrancePosition.z
      );
      this.#focalPoint.position.set(entrancePosition.x, 0, entrancePosition.z);
      set("focal-point", this.#focalPoint.position.toArray());
      this.playerCrew.leader.avatar.mesh.scale.set(0.04, 0.04, 0.04);
      this.#scene.add(this.playerCrew.leader.avatar.mesh);
    } else {
      const rooms = await Promise.all(
        this.#map.exploredRooms.map((room) => this.renderRoom(room))
      );
      this.#scene.add(...rooms);
      const reloadPosition = await get("focal-point");
      this.playerCrew.leader.avatar.mesh.position.set(...reloadPosition);
      this.#focalPoint.position.set(...reloadPosition);
      this.playerCrew.leader.avatar.mesh.scale.set(0.04, 0.04, 0.04);
      this.#scene.add(this.playerCrew.leader.avatar.mesh);
    }

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
   * @returns {Mesh} the box for the floor piece and associtated content
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
      tile: floorTile
    };
    if (floorTile.hasWall) {
      const walls = this.#generateWalls(floorTile);
      box.add(...Object.values(walls));
    }
    if (floorTile.isExit) {
      const exit = this.#generateExit(floorTile, options);
      box.add(exit);
    }
    return box;
  }

  /**
   *
   * @param {FloorTile} exitTile
   * @param {import('../../types.js').TileDetails|Object} options
   * @returns
   */
  #generateExit(exitTile, options = {}) {
    const textureCanvas = createTerrainSide("entry");
    const texture = new CanvasTexture(textureCanvas);
    const doorMaterial = new MeshBasicMaterial({
      map: texture,
    });
    const door = new Mesh(
      new BoxGeometry(
        exitTile.northSouthExit ? 0.99 : 0.1,
        1,
        exitTile.northSouthExit ? 0.1 : 0.99
      ),
      doorMaterial
    );
    door.position.set(
      exitTile.northSouthExit
        ? 0
        : directionModifier(exitTile.exitDirection) * 0.5,
      1,
      exitTile.northSouthExit
        ? directionModifier(exitTile.exitDirection) * 0.5
        : 0
    );
    door.userData = {
      type: TYPE.INTERACTABLE,
      action: ACTION.OPEN,
      tile: exitTile,
    };
    return door;
  }

  /**
   *
   * @param {FloorTile} wallTile the floor tile of the wall
   * @returns {Wall}
   */
  #generateWalls(wallTile) {
    const textureCanvas = createTerrainSide("mountain");
    const texture = new CanvasTexture(textureCanvas);
    const walls = wallTile.wallDirections.map((direction) => [
      direction,
      this.#generateWall(
        direction,
        new MeshBasicMaterial({
          map: texture,
        })
      ),
    ]);

    return Object.fromEntries(walls);
  }

  #generateWall(direction, material) {
    let wallHeight = 2;
    if ([DIRECTION.SOUTH, DIRECTION.EAST].includes(direction)) {
      material.transparent = true;
      material.opacity = 0.6;
    }
    const wall = new Mesh(
      new BoxGeometry(
        isEastWest(direction) ? 0.1 : 1,
        wallHeight,
        isNorthSouth(direction) ? 0.1 : 1
      ),
      material
    );
    wall.position.set(
      isEastWest(direction) ? directionModifier(direction) * 0.5 : 0,
      -0.5 + wallHeight / 2,
      isNorthSouth(direction) ? directionModifier(direction) * 0.5 : 0
    );

    return wall;
  }

  /**
   * render a room
   * @param {import('../services/Room.js').Room} room
   * @returns {Group} the rooms meshes in a Group
   */
  async renderRoom(room) {
    const group = new Group();
    if (room.hallway) {
      group.add(this.#generateFloorBox(room.hallway));
    }
    room.floorTiles.forEach((floorTile) => {
      group.add(this.#generateFloorBox(floorTile));
    });
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

  highlightMesh(mesh) {
    if (!mesh) return;
    mesh.userData.materialMap = mesh.material.map;
    mesh.material.map = new CanvasTexture(createTerrainSide("highlight"));
    this.#highlights.push(mesh);
  }

  unhighlightMesh(mesh) {
    if (!mesh) {
      this.#highlights.forEach((mesh) => {
        mesh.material.map = mesh.userData.materialMap;
      });
      this.#highlights = [];
      return;
    }
    mesh.material.map = mesh.userData.materialMap;
  }

  pointerMove(event) {
    const { buttons, offsetX: x, offsetY: y } = event;
    this.#mousePosition.x = (x / this.#canvas.width) * 2 - 1;
    this.#mousePosition.y = -(y / this.#canvas.height) * 2 + 1;
    this.highlightIntersection();
  }

  #movePlayerAndFocusPoint(characterEndPosition) {
    return Promise.all([
      this.#animationCollection.createMoveAnimation({
        character: this.playerCrew.leader,
        endPosition: characterEndPosition,
        moreSteps: this.#currentPath.length > 1,
      }),
      this.#animationCollection
        .createMoveAnimation({
          mesh: this.#focalPoint,
          endPosition: characterEndPosition,
          faceEndPoint: false,
        })
        .then(() =>
          this.#scene.children.forEach((mesh) => mesh.updateMatrixWorld())
        ),
    ]);
  }

  async walkItOut() {
    if (this._walking) {
      console.log("already walking");
      return;
    }
    this._walking = true;
    while (this.#currentPath.length > 0) {
      const tile = this.#currentPath.shift();
      if (!tile) break;
      this.highlightMesh(tile.mesh);
      await this.#movePlayerAndFocusPoint(new Vector3(tile.x, 0, tile.z));
      this.unhighlightMesh(tile.mesh);
    }
    this._walking = false;
    console.log("ending the walk");
  }

  #clickHandlers = {
    [ACTION.MOVE]: async (
      endMesh = this.intersectedObject.getObjectById(this.intersectedObject.id)
    ) => {
      if (this.#currentPath.length) this.#currentPath = [this.#currentPath[0]];
      this.#currentPath = [
        ...this.#currentPath,
        ...(await this.#map.findPath(
          this.#currentPath[0] ?? this.playerCrew.leader.avatar?.mesh?.position,
          endMesh.position
        )),
      ];
      this.unhighlightMesh(endMesh);
      this.walkItOut();
    },
    [ACTION.OPEN]: async () => {
      const object = this.intersectedObject.getObjectById(
        this.intersectedObject.id
      );
      const floorMesh = object.parent;
      await this.#clickHandlers[ACTION.MOVE](floorMesh);
      const { mesh } = await this.#animationCollection.createMoveAnimation({
        mesh: object,
        endPointVector: object.position.clone().setY(0),
        faceEndPoint: false,
      });
      floorMesh.userData.type = TYPE.INTERACTABLE;
      mesh.removeFromParent();

      console.log(floorMesh.userData.tile.room)

      const room = await this.#map.exploreRoom(floorMesh.userData.tile.room);
      console.log(room);
      const renderedRoom = await this.renderRoom(room);

      this.#scene.add(renderedRoom);
    },
  };

  /**
   *
   * @param {PointerEvent} event
   * @returns
   */
  async pointerClick(event) {
    if (!this.intersectedObject?.userData?.action) return;
    this.#clickHandlers[this.intersectedObject.userData.action]?.();
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

/**
 * @typedef {import('../services/FloorTile.js').FloorTile} FloorTile
 */
