import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#map');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (!canvas.transferControlToOffscreen) {
  canvas.style.display = 'none';
  document.querySelector('#noOffscreenCanvas').style.display = '';
}
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('./src/scene.js', {
  type: 'module',
});

worker.postMessage({ type: 'main', canvas: offscreen }, [offscreen]);

function sendSize() {
  worker.postMessage({
    type: 'size',
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

// const controls = new OrbitControls(camera, canvas);
// controls.maxZoom = 2;
canvas.addEventListener('dragstart', event => {
  event.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
  worker.postMessage({ type: 'dragStart', x: event.x, y: event.y });
});
canvas.addEventListener('drag', event => {
  event.preventDefault();
  worker.postMessage({ type: 'drag', x: event.x, y: event.y });
});
document.addEventListener('dragover', event => {
  event.preventDefault();
});
canvas.addEventListener(
  'mousewheel',
  event => {
    worker.postMessage({ type: 'zoom', delta: -event.deltaY });
  },
  { passive: true },
);

canvas.addEventListener('click', () => {
  worker.postMessage({
    type: 'onClick',
  });
});

document.querySelector('button').addEventListener('click', () => {
  worker.postMessage({
    type: 'newMap',
  });
});

window.addEventListener('resize', sendSize);
sendSize();
