import { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

export const getHair = (size, material) => {
  const topknot = new Object3D();
  const blocks = Array(3)
    .fill(0)
    .map((_, index) => {
      const block = new Mesh(
        new BoxGeometry(0.5, 0.5, 0.5),
        index % 2 ? new MeshStandardMaterial({ color: 0xaaaaaa }) : material,
      );
      topknot.add(block);
      block.position.set(0, index * 0.5 + 0.25, 0);
    });
  topknot.position.set(0, size / 2, 0);
  return topknot;
};
