import { oneOf } from './oneOf.js';

class TerrainColor {
  constructor(base) {
    this.base = base;
    this.lighter = this.lighten(this.base);
    this.lightest = this.lighten(this.lighter);
    this.darker = this.darken(this.base);
    this.darkest = this.darken(this.darker);
  }
  get baseColor() {
    return `rgb(${this.base.join(',')})`;
  }
  get lighterColor() {
    return `rgb(${this.lighter.join(',')})`;
  }
  get lightestColor() {
    return `rgb(${this.lightest.join(',')})`;
  }
  get darkerColor() {
    return `rgb(${this.darker.join(',')})`;
  }
  get darkestColor() {
    return `rgb(${this.darkest.join(',')})`;
  }
  get accentColors() {
    return [this.lighterColor, this.lightestColor, this.darkerColor, this.darkestColor];
  }
  lighten(color) {
    return color.map(value => Math.min(255, value + 10));
  }
  darken(color) {
    return color.map(value => Math.max(0, value - 10));
  }
}
const terrain = {
  plains: new TerrainColor([20, 100, 20]),
  road: new TerrainColor([70, 70, 70]),
  smallroad: new TerrainColor([80, 70, 30]),
  desert: new TerrainColor([156, 136, 73]),
  mountain: new TerrainColor([70, 70, 40]),
  snow: new TerrainColor([170, 170, 170]),
  rock: new TerrainColor([40, 40, 40]),
  tree: new TerrainColor([20, 60, 10]),
  stump: new TerrainColor([60, 60, 20]),
  water: new TerrainColor([60, 60, 120]),
  entry: { baseColor: 'rgb(100,100,100)', borderColor: ['rgb(20,20,20)'] },
  highlight: { baseColor: 'rgb(200,200,100)', borderColor: ['rgb(20,20,20)'] },
  move: { baseColor: 'rgb(255,255,255)', borderColor: ['rgb(20,20,20)'] },
};

const createdCanvii = {};

export const createTerrainSide = (type, sideTypes) => {
  if (!createdCanvii[type]) createdCanvii[type] = [];
  if (createdCanvii.length >= 5) return oneOf(createdCanvii[type]);
  const [textureWidth, textureHeight] = [256, 256];
  const canvas = new OffscreenCanvas(textureWidth, textureHeight);
  const context = canvas.getContext('2d');
  const { baseColor, accentColors, borderColor } = terrain[type];
  context.fillStyle = baseColor;
  context.fillRect(0, 0, textureWidth, textureHeight);
  if (borderColor) {
    context.fillStyle = borderColor;
    context.fillRect(0, 0, textureWidth, textureHeight);
    context.fillStyle = baseColor;
    context.fillRect(2, 2, textureWidth - 4, textureHeight - 4);
  }
  if (accentColors) {
    const textureRectangles = Array(75)
      .fill(0)
      .map(() => Math.ceil((Math.random() * textureWidth) / 10) + textureWidth / 20);

    for (let rectangle of textureRectangles) {
      context.save();
      const [x, y] = [
        Math.min(textureWidth - rectangle, Math.max(rectangle, Math.random() * textureWidth)),
        Math.min(textureHeight - rectangle, Math.max(rectangle, Math.random() * textureHeight)),
      ];
      context.translate(x, y);
      context.rotate((Math.random() * 89 * Math.PI) / 180);

      context.fillStyle = accentColors[Math.ceil(Math.random() * accentColors.length)];
      context.fillRect(0, 0, rectangle, rectangle);
      context.restore();
    }
  }
  createdCanvii[type].push(canvas);
  if (sideTypes)
    return {
      ...{
        positiveX: canvas,
        positiveY: canvas,
        positiveZ: canvas,
        negativeX: canvas,
        negativeY: canvas,
        negativeZ: canvas,
      },
      ...Object.fromEntries(
        Object.entries(sideTypes).map(([side, type]) => [side, createTerrainSide(type)]),
      ),
    };
  return canvas;
};
