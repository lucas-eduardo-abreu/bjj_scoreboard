document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');

  document.querySelector('.form-submit').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    timer.reset();
    player1.reset();
    player2.reset();

    const p1name = data.get('player1');
    const p2name = data.get('player2');
    if (p1name) player1.setName(p1name);
    if (p2name) player2.setName(p2name);

    timer.stop();
    timer.setMinutes(data.get('timer'));

    const step = parseInt(data.get('point-step') || '2', 10);
    pointValues.normal = step;
    document.querySelectorAll('[data-point-step]').forEach(el => { el.textContent = step; });

    modal.classList.remove('open');
  });

  document.querySelectorAll('input[type="range"]').forEach(input => {
    const preview = document.querySelector('.timer-preview');
    input.addEventListener('input', (e) => {
      if (preview) preview.textContent = `${e.target.value} min`;
    });
  });
});
