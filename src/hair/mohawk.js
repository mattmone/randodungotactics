import { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

const hairBlock = (size, material) => {
  return new Mesh(new BoxGeometry(...size), material);
};
export const getHair = (size, material = new MeshStandardMaterial({ color: 0x333333 })) => {
  const hair = new Object3D();
  const hairThickness = 0.25;
  const topblock = hairBlock([hairThickness, size / 4, size], material);
  topblock.position.y = size / 8;

  hair.position.set(0, size / 2, 0);
  hair.add(topblock);
  return hair;
};
