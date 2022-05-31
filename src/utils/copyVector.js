import {Vector3} from '../libs/three.module.js';

export const copyVector = (vector) => {
	return new Vector3(...vector.toArray());
};