import { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

const hairBlock = (size, material) => {
  return new Mesh(new BoxGeometry(...size), material);
};
export const getHair = (size, material = new MeshStandardMaterial({ color: 0x333333 })) => {
  const hair = new Object3D();
  const hairThickness = 0.25;
  const topblock = hairBlock([size, hairThickness, size], material);
  topblock.position.y = hairThickness / 2;
  const leftSideBlock = hairBlock([hairThickness, size, size / 2], material);
  leftSideBlock.position.set(-(size + hairThickness) / 2, -size / 2, -size / 4);
  const leftFrontSideBlock = hairBlock([hairThickness, size / 2, size / 2], material);
  leftFrontSideBlock.position.set(0, size / 4, size / 2);
  leftSideBlock.add(leftFrontSideBlock);
  const rightSideBlock = hairBlock([hairThickness, size, size / 2], material);
  rightSideBlock.position.set(size / 2 + hairThickness / 2, -size / 2, -size / 4);
  const rightFrontSideBlock = hairBlock([hairThickness, size / 2, size / 2], material);
  rightFrontSideBlock.position.set(0, size / 4, size / 2);
  rightSideBlock.add(rightFrontSideBlock);
  const backBlock = hairBlock([size, size, hairThickness], material);
  backBlock.position.set(0, -size / 2, -(size / 2 + hairThickness / 2));

  hair.position.set(0, size / 2, 0);
  hair.add(topblock);
  hair.add(leftSideBlock);
  hair.add(rightSideBlock);
  hair.add(backBlock);
  return hair;
};
