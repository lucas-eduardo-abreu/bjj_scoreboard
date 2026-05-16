window.player1 = new Player('player1', 'Atleta 1');
window.player2 = new Player('player2', 'Atleta 2');
window.timer = new Timer();

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('[data-timer-start]');

  startButton.addEventListener('click', () => {
    if (timer.timeInSeconds() <= 0) {
      startButton.classList.add('hide');
      return;
    }

    timer.toggle();
    startButton.textContent = timer.started ? 'Pausar' : 'Continuar';
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      window[btn.dataset.player][btn.dataset.action]();
    });
  });
});
