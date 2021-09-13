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
  Color,
  Quaternion,
  QuaternionKeyframeTrack,
  AnimationClip,
  AnimationMixer,
  Clock,
} from 'three';

export class Character {
  constructor() {
    this.timeScale = 2;
    this.state = 'idle';
  }

  get rotationKeyFrame() {
    const xAxis = new Vector3(1, 0, 0);
    const qInitial = new Quaternion().setFromAxisAngle(xAxis, Math.PI / 4);
    const qFinal = new Quaternion().setFromAxisAngle(xAxis, -Math.PI / 4);
    return new QuaternionKeyframeTrack(
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
  }
  get reverseRotationKeyFrame() {
    const xAxis = new Vector3(1, 0, 0);
    const qInitial = new Quaternion().setFromAxisAngle(xAxis, Math.PI / 4);
    const qFinal = new Quaternion().setFromAxisAngle(xAxis, -Math.PI / 4);
    return new QuaternionKeyframeTrack(
      '.quaternion',
      [0, 1, 2],
      [
        qFinal.x,
        qFinal.y,
        qFinal.z,
        qFinal.w,
        qInitial.x,
        qInitial.y,
        qInitial.z,
        qInitial.w,
        qFinal.x,
        qFinal.y,
        qFinal.z,
        qFinal.w,
      ],
    );
  }

  get state() {
    return this._state;
  }
  set state(state) {
    if (state === 'idle') this.setStateIdle();
    this._state = state;
  }

  get baseSize() {
    return 3;
  }
  get upperBodySize() {
    return {
      width: (this.baseSize * 2) / 3,
      height: (this.baseSize * 2.5) / 3,
      depth: (this.baseSize * 2) / 3,
    };
  }
  get lowerBodySize() {
    return {
      width: this.upperBodySize.width,
      height: this.upperBodySize.height / 2,
      depth: this.upperBodySize.depth,
    };
  }
  get armSize() {
    const size = (this.baseSize * 0.5) / 3;
    return {
      width: size,
      height: this.baseSize,
      depth: size,
    };
  }
  get handSize() {
    const size = this.armSize.width;
    return {
      width: size,
      height: size,
      depth: size,
    };
  }
  get legSize() {
    return {
      width: (this.baseSize * 0.5) / 3,
      height: this.baseSize / 2,
      depth: (this.baseSize * 0.5) / 3,
    };
  }
  get footSize() {
    return {
      width: (this.baseSize * 0.5) / 3,
      height: (this.baseSize * 0.5) / 3,
      depth: this.baseSize / 3,
    };
  }
  get fleshMaterial() {
    if (this._fleshMaterial) return this._fleshMaterial;
    this._fleshMaterial = new MeshStandardMaterial({ color: 0xdd9988 });
    return this._fleshMaterial;
  }
  get head() {
    if (this._head) return this._head;
    const headBox = new BoxGeometry(this.baseSize, this.baseSize, this.baseSize);
    this._head = new Mesh(headBox, this.fleshMaterial);
    return this._head;
  }
  get upperBody() {
    if (this._upperBody) return this._upperBody;
    const upperBodyBox = new BoxGeometry(
      this.upperBodySize.width,
      this.upperBodySize.height,
      this.upperBodySize.depth,
    );
    this._upperBody = new Mesh(upperBodyBox, this.fleshMaterial);
    this._upperBody.position.set(0, -(this.baseSize / 2 + this.baseSize / 4), 0);
    return this._upperBody;
  }
  get lowerBody() {
    if (this._lowerBody) return this._lowerBody;
    const lowerBodyBox = new BoxGeometry(
      this.lowerBodySize.width,
      this.lowerBodySize.height,
      this.lowerBodySize.depth,
    );
    this._lowerBody = new Mesh(lowerBodyBox, this.fleshMaterial);
    this._lowerBody.position.set(
      0,
      -(this.upperBodySize.height / 2 + this.lowerBodySize.height / 2),
      0,
    );
    return this._lowerBody;
  }
  get arm() {
    if (this._arm) return this._arm;
    const armBox = new BoxGeometry(this.armSize.width, this.armSize.height, this.armSize.depth);
    const handBox = new BoxGeometry(this.handSize.width, this.handSize.height, this.handSize.depth);

    this._arm = new Object3D();
    const arm = new Mesh(armBox, this.fleshMaterial);
    arm.position.set(0, -this.armSize.height / 2, 0);
    const hand = new Mesh(handBox, this.fleshMaterial);
    hand.position.set(0, -(this.armSize.height / 2 + this.handSize.height / 2), 0);
    this._arm.add(arm);
    this._arm.add(hand);
    return this._arm;
  }
  get leg() {
    if (this._leg) return this._leg;
    const footBox = new BoxGeometry(this.footSize.width, this.footSize.height, this.footSize.depth);
    const legBox = new BoxGeometry(this.legSize.width, this.legSize.height, this.legSize.depth);
    this._leg = new Object3D();
    this._leg.position.set(0, -this.lowerBodySize.height / 2, 0);
    const leg = new Mesh(legBox, this.fleshMaterial);
    leg.position.set(0, -this.legSize.height / 2, 0);

    const foot = new Mesh(footBox, this.fleshMaterial);
    foot.position.set(
      0,
      -(this.legSize.height / 2 + this.footSize.height / 2),
      this.legSize.width / 2,
    );
    this._leg.add(leg);
    leg.add(foot);
    return this._leg;
  }
  get model() {
    if (this._baseModel) return this._baseModel;
    this.head.add(this.upperBody);
    this.leftArm = this.arm.clone();
    this.leftArm.position.set(
      -(this.upperBodySize.width / 2 + this.armSize.width / 2) * 1.1,
      this.upperBodySize.height / 4,
      0,
    );
    this.rightArm = this.arm.clone();
    this.rightArm.position.set(
      (this.upperBodySize.width / 2 + this.armSize.width / 2) * 1.1,
      this.upperBodySize.height / 4,
      0,
    );
    this.upperBody.add(this.leftArm);
    this.upperBody.add(this.rightArm);
    this.upperBody.add(this.lowerBody);
    this.leftLeg = this.leg.clone();
    this.leftLeg.position.set(
      -(this.lowerBodySize.width / 2 - this.legSize.width / 2),
      -this.lowerBodySize.height / 2,
      0,
    );
    this.rightLeg = this.leg.clone();
    this.rightLeg.position.set(
      this.lowerBodySize.width / 2 - this.legSize.width / 2,
      -this.lowerBodySize.height / 2,
      0,
    );
    this.lowerBody.add(this.leftLeg);
    this.lowerBody.add(this.rightLeg);
    this._baseModel = new Object3D();
    this._baseModel.add(this.head);
    return this._baseModel;
  }

  setStateIdle() {
    if (!this.leftArm) return requestAnimationFrame(() => this.setStateIdle());
    const leftClip = new AnimationClip('leftSwing', -1, [this.rotationKeyFrame]);
    const rightClip = new AnimationClip('rightSwing', -1, [this.reverseRotationKeyFrame]);
    this.mixers = [
      new AnimationMixer(this.leftArm),
      new AnimationMixer(this.rightArm),
      new AnimationMixer(this.leftLeg),
      new AnimationMixer(this.rightLeg),
    ];

    for (let mixer of this.mixers) mixer.timeScale = this.timeScale;
    this.actions = this.mixers.map((mixer, index) =>
      mixer.clipAction(index % 2 ? leftClip : rightClip),
    );
    for (let action of this.actions) action.play();
  }

  update(delta) {
    if (!this.mixers) return;
    for (let mixer of this.mixers) mixer.update(delta);
  }

  setFleshColor(color) {
    this._fleshMaterial.color = new Color(color);
  }
}
