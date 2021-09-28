import { nextFrame } from './utils/nextFrame.js';

const buttons = Object.fromEntries(
  Array.from(document.querySelectorAll('button')).map(button => [button.id, button]),
);

buttons.nameButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([
    import('./utils/nextFrame.js'),
    import('./screens/side-screen.js'),
    import('./screens/character-content.js'),
  ]);
  await nextFrame();
  document.querySelector('#character-screen').toggleAttribute('open');
});

buttons.jobButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([
    import('./utils/nextFrame.js'),
    import('./screens/side-screen.js'),
    import('./screens/jobs-content.js'),
  ]);
  await nextFrame();
  document.querySelector('#jobs-screen').toggleAttribute('open');
});
