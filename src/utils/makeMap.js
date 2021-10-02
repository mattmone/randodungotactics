import { rollDice } from './rollDice.js';

const dotProduct = (grad, x, y) => grad[0] * x + grad[1] * y;

const mapOptions = {
  largeRoad: {
    gain: 0.65,
    startingAmplitude: 5,
    lacunarity: 2,
    octaves: 8,
  },
  smallRoad: {
    gain: 0.65,
    startingAmplitude: 50,
    lacunarity: 2,
    octaves: 8,
  },
  path: {
    gain: 0.65,
    startingAmplitude: 70,
    lacunarity: 2,
    octaves: 32,
  },
  mountain: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
  plains: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
  desert: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
  forest: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
  river: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
  creek: {
    gain: 0.65,
    startingAmplitude: 10,
    lacunarity: 2,
    octaves: 16,
  },
};

const finishMap = {
  largeRoad: map =>
    buildMap(
      map,
      true,
      0,
      Math.ceil(map.length / 4),
      1,
      map[0].length / 2,
      Math.random() * 3,
      0.02,
      0.02,
      'road',
      'plains',
    ),
  smallRoad: map =>
    buildMap(
      map,
      true,
      0,
      Math.ceil(map.length / 5),
      1,
      map[0].length / 2,
      Math.random() * 3,
      0.06,
      0.06,
      'smallroad',
      'plains',
    ),
  path: map =>
    buildMap(
      map,
      true,
      rollDice(4),
      rollDice(2, 2),
      rollDice(3, 3),
      rollDice(3) - 2 + map[0].length / 2,
      Math.random() * 10,
      0.05,
      0.05,
      'smallroad',
      'plains',
    ),
  mountain: map =>
    buildMap(
      map,
      true,
      rollDice(4),
      rollDice(2, 2),
      rollDice(3, 3),
      rollDice(3) - 2 + map[0].length / 2,
      Math.random() * 30 + 20,
      elevation => (elevation > rollDice(4) + 3 ? 0.08 : 0.05),
      elevation => (elevation > rollDice(4) + 3 ? 0.05 : 0.08),
      'road',
      elevation => (elevation > rollDice(4) + 3 ? 'snow' : 'mountain'),
    ),
  plains: map =>
    buildMap(
      map,
      false,
      rollDice(2),
      rollDice(2, 3),
      rollDice(3, 2),
      rollDice(map[0].length / 2),
      Math.random() * 5,
      0.02,
      0,
      'plains',
      'plains',
    ),
  desert: map =>
    buildMap(
      map,
      false,
      rollDice(2),
      rollDice(2, 2),
      rollDice(3, 2),
      rollDice(map[0].length / 2),
      Math.random() * 0 * (Math.PI / 180),
      0.02,
      0,
      'desert',
      'desert',
    ),
  forest: map => {},
  river: map =>
    buildMap(
      map,
      true,
      rollDice(4),
      rollDice(2, 2),
      rollDice(3, 3),
      map[0].length / 2 + (rollDice(3) - 2),
      Math.random() * 10,
      0.03,
      0.04,
      'water',
      'plains',
    ),
  creek: map =>
    buildMap(
      map,
      true,
      rollDice(4),
      rollDice(2),
      rollDice(3, 3),
      map[0].length / 2 + (rollDice(3) - 2),
      Math.random() * 10,
      0.04,
      0.07,
      'water',
      'plains',
    ),
};

export function makeMap(options = {}) {
  const { width = 24, height = 12, min = 0, max = 10, type = 'largeRoad' } = options;
  const pixels = new Array(width).fill(new Array(height).fill(0));

  const { octaves, gain, lacunarity, startingAmplitude } = mapOptions[type];

  //these two are some complex math to convert between square and simplex space
  const generalSkew = (Math.sqrt(3.0) - 1.0) * 0.5;
  const generalUnskew = (3.0 - Math.sqrt(3.0)) / 6.0;

  //set up the gradient table with 8 equally distributed angles around the unit circle
  const gradients = Array(8).fill(Array(2));
  for (let gradient = 0; gradient < gradients.length; gradient++) {
    gradients[gradient][0] = Math.cos((Math.PI / 4) * gradient);
    gradients[gradient][1] = Math.sin((Math.PI / 4) * gradient);
  }

  //set up the random numbers table
  const permutations = new Array(24).fill(0);

  const map = pixels.map((stripe, stripeIndex) =>
    stripe.map((pixel, pixelIndex) => {
      let amplitude = startingAmplitude;
      let frequency = 1 / height;
      let value = Math.random();

      for (let octave = 0; octave < octaves; octave++) {
        const x = pixelIndex * frequency;
        const y = stripeIndex * frequency;

        // get the bottom-left corner of the simplex in skewed space
        const skewValue = (x + y) * generalSkew;
        const cornerbx = Math.floor(x + skewValue);
        const cornerby = Math.floor(y + skewValue);

        // get the distance from the bottom corner in normal (simplex) space
        const unskewValue = (cornerbx + cornerby) * generalUnskew;
        const disbx = x - cornerbx + unskewValue;
        const disby = y - cornerby + unskewValue;

        //get the middle corner in skewed space
        let cornermx = cornerbx; //upper triangle
        let cornermy = 1 + cornerby;
        if (disbx > disby) {
          cornermx = 1 + cornerbx; //lower triangle
          cornermy = cornerby;
        }

        //get the top corner in skewed space
        const cornertx = 1 + cornerbx;
        const cornerty = 1 + cornerby;

        //get the distance from the other two corners
        const dismx = disbx - (cornermx - cornerbx) + generalUnskew;
        const dismy = disby - (cornermy - cornerby) + generalUnskew;
        const distx = disbx - 1.0 + generalUnskew + generalUnskew;
        const disty = disby - 1.0 + generalUnskew + generalUnskew;

        //get the gradients indices
        const gradb = permutations[(cornerbx + permutations[cornerby & 255]) & 255] & 7;
        const gradm = permutations[(cornermx + permutations[cornermy & 255]) & 255] & 7;
        const gradt = permutations[(cornertx + permutations[cornerty & 255]) & 255] & 7;

        //get the noise from each corner using an attenuation function
        //	first the bottom corner
        let tempdis = 0.5 - disbx * disbx - disby * disby;
        let noiseb = Math.pow(tempdis, 4.0) * dotProduct(gradients[gradb], disbx, disby);

        if (tempdis < 0.0) noiseb = 0.0;

        //	then the middle corner
        tempdis = 0.5 - dismx * dismx - dismy * dismy;
        let noisem = Math.pow(tempdis, 4.0) * dotProduct(gradients[gradm], dismx, dismy);
        if (tempdis < 0.0) noisem = 0.0;

        //	last the top corner
        tempdis = 0.5 - distx * distx - disty * disty;
        let noiset = Math.pow(tempdis, 4.0) * dotProduct(gradients[gradt], distx, disty);
        if (tempdis < 0.0) noiset = 0.0;

        //finally, add it in and adjust for the next layer
        //	notice that no interpolation is needed, just straight summation
        value += (noiseb + noisem + noiset) * amplitude;

        amplitude *= gain;
        frequency *= lacunarity;
      }
      return Math.min(Math.max(min, value), max);
    }),
  );

  improvedErosion(map, 80);

  return finishMap[type](map);
}

function improvedErosion(map, iterations) {
  const talus = 12.0 / map.length;

  //for each iteration...
  for (let iteration = 0; iteration < iterations; ++iteration) {
    //for each pixel...
    for (let x = 1; x < map.length - 1; ++x) {
      for (let y = 1; y < map[x].length - 1; ++y) {
        const currentHeight = map[x][y];
        let maxDifference = -Infinity;
        let lowestX = 0;
        let lowestY = 0;

        for (let i = -1; i < 2; i += 1) {
          for (let j = -1; j < 2; j += 1) {
            const currentDifference = currentHeight - map[x + i][y + j];

            if (currentDifference > maxDifference) {
              maxDifference = currentDifference;

              lowestX = i;
              lowestY = j;
            }
          }
        }

        if (maxDifference > 0.0 && maxDifference <= talus) {
          const newHeight = currentHeight - maxDifference / 2.0;

          map[x][y] = newHeight;
          map[x + lowestX][y + lowestY] = newHeight;
        }
      }
    }
  }
}

function buildMap(
  map,
  averagedPath,
  amplitude,
  pathWidth,
  frequency,
  starting,
  slantAngle,
  rockChance,
  treeChance,
  pathTexture,
  baseTexture,
) {
  const flatMap = map.flat();
  const pixelAverage = flatMap.reduce((acc, value) => acc + value) / flatMap.length;
  const curve = rollDice(2) - 1 ? Math.sin : Math.cos;
  const slantDirection = Math.random() > 0.5;
  const entranceDirection = Math.random() > 0.5;
  return map.map((stripe, stripeIndex) => {
    const slantElevation =
      (slantDirection ? stripeIndex : map.length - stripeIndex) *
      Math.atan(slantAngle * (Math.PI / 180));
    return stripe.map((pixel, pixelIndex) => {
      if (
        pixelIndex >=
          Math.min(
            stripe.length - 2,
            starting + amplitude * curve(stripeIndex / frequency) - pathWidth / 2,
          ) &&
        pixelIndex <
          Math.max(2, starting + amplitude * curve(stripeIndex / frequency) + pathWidth / 2)
      ) {
        const entry =
          pathTexture !== 'water' &&
          ((entranceDirection && stripeIndex <= 3) ||
            (!entranceDirection && stripeIndex >= map.length - 4));
        const enemy =
          pathTexture !== 'water' &&
          ((!entranceDirection && stripeIndex <= 3) ||
            (entranceDirection && stripeIndex >= map.length - 4));
        return {
          elevation: (averagedPath ? pixelAverage : pixel) + slantElevation,
          texture: pathTexture,
          entry,
          enemy,
        };
      }
      const elevation = pixel + slantElevation;
      const tree =
        Math.random() < (typeof treeChance === 'function' ? treeChance(elevation) : treeChance);
      const rock =
        !tree &&
        Math.random() < (typeof rockChance === 'function' ? rockChance(elevation) : rockChance);
      const entry =
        !rock &&
        !tree &&
        ((entranceDirection && stripeIndex <= 3) ||
          (!entranceDirection && stripeIndex >= map.length - 4));
      const enemy =
        !rock &&
        !tree &&
        ((!entranceDirection && stripeIndex <= 3) ||
          (entranceDirection && stripeIndex >= map.length - 4));
      return {
        elevation,
        texture: typeof baseTexture === 'function' ? baseTexture(elevation) : baseTexture,
        rock,
        tree,
        entry,
        enemy,
      };
    });
  });
}
