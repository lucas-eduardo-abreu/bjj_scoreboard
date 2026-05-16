document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.form-submit').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const modal = document.getElementById('myModal');

    timer.reset();
    player1.reset();
    player2.reset();

    player1.setName(data.get('player1'));
    player2.setName(data.get('player2'));

    timer.stop();
    timer.setMinutes(data.get('timer'));

    const step = parseInt(data.get('point-step') || '2', 10);
    pointValues.normal = step;
    document.querySelectorAll('[data-point-step]').forEach(el => { el.innerHTML = step; });

    modal.style.display = 'none';
  });
});
