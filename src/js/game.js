window.player1 = new Player('player1', 'Atleta 1');
window.player2 = new Player('player2', 'Atleta 2');
window.timer = new Timer();

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('[data-timer-start]');
  const configContent = document.querySelector('[data-config-content]');

  startButton.addEventListener('click', () => {
    configContent.classList.add('hide');

    if (timer.timeInSeconds() <= 0) {
      startButton.classList.add('hide');
      return;
    }

    timer.toggle();
    startButton.innerHTML = timer.started ? 'Pausar' : 'Continuar';
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      window[btn.dataset.player][btn.dataset.action]();
    });
  });

  document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const id = e.target.id;
      document.querySelector(`label[for="${id}"] > span`).innerHTML = `${e.target.value} minutos`;
    });
  });
});