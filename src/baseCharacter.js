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
    return 1;
  }
  get headSize() {
    return {
      width: 10,
      height: 12,
      depth: 10,
    };
  }
  get upperBodySize() {
    return {
      width: (this.baseSize * 2) / 3,
      height: (this.baseSize * 1.5) / 3,
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
  get baseFleshColor() {
    return new Color(0xbb9988);
  }
  get fleshMaterial() {
    if (this._fleshMaterial) return this._fleshMaterial;
    this._fleshMaterial = new MeshStandardMaterial();
    this._fleshMaterial.color = this.baseFleshColor;
    return this._fleshMaterial;
  }
  get darkerFleshMaterial() {
    if (this._darkerFleshMaterial) return this._darkerFleshMaterial;
    this._darkerFleshMaterial = new MeshStandardMaterial({
      color: `#${this.baseFleshColor.offsetHSL(0, 0, -0.1).getHexString()}`,
    });
    return this._darkerFleshMaterial;
  }
  get darkestFleshMaterial() {
    if (this._darkestFleshMaterial) return this._darkestFleshMaterial;
    this._darkestFleshMaterial = new MeshStandardMaterial({
      color: `#${this.baseFleshColor.offsetHSL(0, 0, -0.2).getHexString()}`,
    });
    return this._darkestFleshMaterial;
  }
  get hairMaterial() {
    if (this._hairMaterial) return this._hairMaterial;
    this._hairMaterial = new MeshStandardMaterial({ color: 0x333333 });
    return this._hairMaterial;
  }
  get eyeMaterial() {
    if (this._eyeMaterial) return this._eyeMaterial;
    this._eyeMaterial = new MeshStandardMaterial({ color: 0x333333 });
    return this._eyeMaterial;
  }
  get head() {
    if (this._head) return this._head;
    const facia = new Mesh(new BoxGeometry(10, 7, 10), this.darkerFleshMaterial);
    const cranium = new Mesh(new BoxGeometry(8, 10, 1), this.darkerFleshMaterial);
    cranium.position.set(0, -2.5, -5.5);
    facia.add(cranium);
    const jaw = new Mesh(new BoxGeometry(10, 5, 10), this.fleshMaterial);
    jaw.position.y = -6;
    facia.add(jaw);
    const scalp = new Mesh(new BoxGeometry(8, 2, 8), this.darkerFleshMaterial);
    scalp.position.y = 3.5;
    facia.add(scalp);
    const leftTop = new Mesh(new BoxGeometry(1, 6, 8), this.darkerFleshMaterial);
    leftTop.position.set(5.5, -0.5, 0);
    facia.add(leftTop);
    const rightTop = leftTop.clone();
    rightTop.position.set(-5.5, -0.5, 0);
    facia.add(rightTop);
    const leftBottom = new Mesh(new BoxGeometry(1, 5, 7), this.darkerFleshMaterial);
    leftBottom.position.set(5.5, 0, -0.5);
    jaw.add(leftBottom);
    const rightBottom = leftBottom.clone();
    rightBottom.position.set(-5.5, 0, -0.5);
    jaw.add(rightBottom);
    const outerLeftEar = new Mesh(new BoxGeometry(1, 1, 3), this.darkestFleshMaterial);
    outerLeftEar.position.set(1, -0.5, -0.5);
    const lowerOuterLeftEar = new Mesh(new BoxGeometry(1, 3, 1), this.darkestFleshMaterial);
    lowerOuterLeftEar.position.set(0, -1.5, -1);
    const innerLeftEar = new Mesh(new BoxGeometry(1, 1, 2), this.darkerFleshMaterial);
    innerLeftEar.position.set(0, -1, 0.5);
    const lowerInnerLeftEar = new Mesh(new BoxGeometry(1, 2, 1), this.darkerFleshMaterial);
    lowerInnerLeftEar.position.set(0, -1, -0.5);
    innerLeftEar.add(lowerInnerLeftEar);
    outerLeftEar.add(lowerOuterLeftEar);
    outerLeftEar.add(innerLeftEar);
    leftTop.add(outerLeftEar);
    const outerRightEar = outerLeftEar.clone();
    outerRightEar.position.set(-1, -0.5, -0.5);
    rightTop.add(outerRightEar);

    this._head = facia;
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
  get eye() {
    if (this._eye) return this._eye;
    const size = 2;
    const thickness = 0.01;
    this._eye = new Mesh(
      new BoxGeometry(size, size, thickness),
      new MeshStandardMaterial({ color: 0xffffff }),
    );
    const pupil = new Mesh(new BoxGeometry(size / 2, size / 2, thickness), this.eyeMaterial);
    pupil.position.set(0, -size / 4, thickness);
    this._eye.add(pupil);
    this.eye.position.set(0, -1, 5);
    return this._eye;
  }
  get nose() {
    if (this._nose) return this._nose;
    const size = 2;
    this._nose = new Mesh(new BoxGeometry(size * 2, size, size / 2), this.darkerFleshMaterial);
    this._nose.position.set(0, -3, 5.5);
    this._nose.castShadow = true;
    return this._nose;
  }
  get mouth() {
    if (this._mouth) return this._mouth;
    const width = this.baseSize / 4;
    const size = 0.2;
    const thickness = 0.01;
    this._mouth = new Mesh(
      new BoxGeometry(width, size, thickness),
      new MeshStandardMaterial({ color: 0xaa6655 }),
    );
    this._mouth.position.set(0, -this.baseSize / 4, this.baseSize / 2 + thickness / 2);
    return this._mouth;
  }
  get eyebrow() {
    if (this._eyebrow) return this._eyebrow;
    const width = 3;
    const size = 1;
    const thickness = 1;
    this._eyebrow = new Mesh(new BoxGeometry(width, size, thickness), this.hairMaterial);
    this._eyebrow.position.set(0, 0.5, 5.5);
    return this._eyebrow;
  }
  get model() {
    if (this._baseModel) return this._baseModel;
    this.head.add(this.upperBody);
    this.leftEye = this.eye.clone();
    this.leftEye.position.x = -2;
    this.rightEye = this.eye.clone();
    this.rightEye.position.x = 2;
    this.head.add(this.nose);
    this.head.add(this.mouth);
    this.head.add(this.leftEye);
    this.head.add(this.rightEye);
    this.leftEyebrow = this.eyebrow.clone();
    this.leftEyebrow.position.x = -2.5;
    this.rightEyebrow = this.eyebrow.clone();
    this.rightEyebrow.position.x = 2.5;
    this.head.add(this.leftEyebrow);
    this.head.add(this.rightEyebrow);
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

  setHair(getHair) {
    if (this.currentHair) this.head.remove(this.currentHair);
    if (!getHair) return;
    const hair = getHair(this.baseSize, this.hairMaterial);
    this.head.add(hair);
    this.currentHair = hair;
  }

  update(delta) {
    if (!this.mixers) return;
    for (let mixer of this.mixers) mixer.update(delta);
  }

  setFleshColor(color) {
    this._fleshMaterial.color = new Color(color);
    this._darkerFleshMaterial.color = new Color(color).offsetHSL(0, 0, -0.1);
    this._darkestFleshMaterial.color = new Color(color).offsetHSL(0, 0, -0.2);
  }
  setEyeColor(color) {
    this._eyeMaterial.color = new Color(color);
  }
  setHairColor(color) {
    this._hairMaterial.color = new Color(color);
  }
}
