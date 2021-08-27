const buttons = Object.fromEntries(Array.from(document.querySelectorAll('button')).map(button => [button.id, button]));

buttons.nameButton.addEventListener('click', async () => {
  await import('./screens/skill-screen.js');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
  document.querySelector('skill-screen').toggleAttribute('open');
    });
  })
})