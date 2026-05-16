document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('myBtn');
  const span = document.querySelector('.close');

  btn.addEventListener('click', () => { modal.style.display = 'flex'; });
  span.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === modal) { modal.style.display = 'none'; }
  });
});
