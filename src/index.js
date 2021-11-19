const buttons = Object.fromEntries(
  Array.from(document.querySelectorAll('button')).map(button => [button.id, button]),
);

const commonImports = () => [import('./utils/nextFrame.js'), import('./screens/side-screen.js')];

buttons.crewButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([...commonImports()]);
  await import('./screens/crew-content.js'), await nextFrame();
  document.querySelector('#crew-screen').toggleAttribute('open');
});

buttons.shopButton.addEventListener('click', async () => {
  if (buttons.shopButton.hasAttribute('disabled')) return;
  const [{ nextFrame }] = await Promise.all([...commonImports()]);
  await import('./screens/shop-content.js'), await nextFrame();
  document.querySelector('#shop-screen').toggleAttribute('open');
});

buttons.jobButton.addEventListener('click', async () => {
  if (buttons.jobButton.hasAttribute('disabled')) return;
  const [{ nextFrame }] = await Promise.all([...commonImports()]);
  await import('./screens/jobs-content.js'), await nextFrame();
  document.querySelector('#jobs-screen').toggleAttribute('open');
});

buttons.shopButton.addEventListener(
  'enable-shop',
  () => {
    buttons.shopButton.removeAttribute('disabled');
  },
  { passive: true, once: true },
);
buttons.jobButton.addEventListener(
  'enable-jobs',
  () => {
    buttons.jobButton.removeAttribute('disabled');
  },
  { passive: true, once: true },
);

document.querySelector('#crew-screen').addEventListener('before-close', () => {
  updateCrewCount();
});

updateCrewCount();

function updateCrewCount() {
  import('../libs/idb-keyval.js')
    .then(({ get }) => get('crew/player'))
    .then(playerCrew => {
      if (
        playerCrew?.length &&
        buttons.shopButton.dispatchEvent(new CustomEvent('enable-shop')) &&
        buttons.jobButton.dispatchEvent(new CustomEvent('enable-jobs'))
      )
        document.querySelector('#crewCount').textContent = `(${playerCrew.length})`;
    });
}
