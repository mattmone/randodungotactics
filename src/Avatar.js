export class Avatar {
  constructor({ color }) {
    import('../libs/three.module.js').then(({ Mesh, BoxGeometry, MeshStandardMaterial }) => {
      this.mesh = new Mesh(new BoxGeometry(0.5, 1, 0.5), new MeshStandardMaterial());
      this.mesh.userData.type = 'avatar';
    });
  }

  get ready() {
    return new Promise(resolve => {
      const avatarInterval = setInterval(() => {
        if (this.mesh?.userData?.type === 'avatar') {
          resolve();
          clearInterval(avatarInterval);
        }
      }, 25);
    });
  }
}
