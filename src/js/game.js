window.player1 = new Player('player1', 'Atleta 1');
window.player2 = new Player('player2', 'Atleta 2');
window.timer = new Timer();

// ── Penalty consequences (IBJJF rules) ───────────────
function addPointsToPlayer(player, n) {
  player.normal += n;
  player.renderPointElement('total');
}

function checkPenaltyConsequences(playerKey) {
  const penalized = window[playerKey];
  const opponentKey = playerKey === 'player1' ? 'player2' : 'player1';
  const opponent = window[opponentKey];
  const pen = penalized.punishment;

  if (pen === 2) {
    opponent.advantageIncrement();
  } else if (pen === 3) {
    addPointsToPlayer(opponent, 4);
  } else if (pen >= 4) {
    timer.stop();
    showVictory(opponentKey, 'DQ');
  }
}

// ── Victory screen ────────────────────────────────────
function determineWinner() {
  const p1 = window.player1;
  const p2 = window.player2;

  if (p1.total() > p2.total()) return { key: 'player1' };
  if (p2.total() > p1.total()) return { key: 'player2' };
  if (p1.advantage > p2.advantage) return { key: 'player1' };
  if (p2.advantage > p1.advantage) return { key: 'player2' };
  if (p1.punishment < p2.punishment) return { key: 'player1' };
  if (p2.punishment < p1.punishment) return { key: 'player2' };
  return { key: null };
}

function showVictory(winnerKey, reason) {
  const overlay = document.getElementById('victory-overlay');

  overlay.className = 'victory-overlay' + (winnerKey ? ` victory--${winnerKey}` : ' victory--tie');

  document.getElementById('victory-headline').textContent =
    reason === 'DQ' ? 'DESCLASSIFICAÇÃO' : winnerKey ? 'VITÓRIA' : 'EMPATE';

  const nameEl = winnerKey
    ? document.querySelector(`[data-player-name="${winnerKey}"]`)
    : null;
  document.getElementById('victory-name').textContent = nameEl ? nameEl.textContent : '—';

  const reasonMap = {
    DQ:   'por desclassificação',
    time: 'ao fim do tempo regulamentar',
  };
  document.getElementById('victory-reason').textContent = reasonMap[reason] ?? '';

  overlay.hidden = false;
}

// ── Timer end callback ────────────────────────────────
timer.onEnd = () => {
  const result = determineWinner();
  showVictory(result.key, 'time');
};

// ── DOM ───────────────────────────────────────────────
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
      const { player, action } = btn.dataset;
      window[player][action]();
      if (action === 'punishmentIncrement') checkPenaltyConsequences(player);
    });
  });

  document.getElementById('btn-nova-luta').addEventListener('click', () => {
    location.reload();
  });
});
