const buttons = Object.fromEntries(
  Array.from(document.querySelectorAll('button')).map(button => [button.id, button]),
);

const commonImports = () => [import('./utils/nextFrame.js'), import('./screens/side-screen.js')];

buttons.crewButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([
    ...commonImports(),
    import('./screens/crew-content.js'),
  ]);
  await nextFrame();
  document.querySelector('#crew-screen').toggleAttribute('open');
});

buttons.shopButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([
    ...commonImports(),
    import('./screens/shop-content.js'),
  ]);
  await nextFrame();
  document.querySelector('#shop-screen').toggleAttribute('open');
});

buttons.jobButton.addEventListener('click', async () => {
  const [{ nextFrame }] = await Promise.all([
    ...commonImports(),
    import('./screens/jobs-content.js'),
  ]);
  await nextFrame();
  document.querySelector('#jobs-screen').toggleAttribute('open');
});
