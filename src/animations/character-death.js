export function deathAnimation() {
  this.avatar.mesh.rotateX(Math.PI / 2);
  this.dead = true;
}
