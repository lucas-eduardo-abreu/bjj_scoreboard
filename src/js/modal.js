document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('myBtn');
  const span = document.querySelector('.close');

  btn.addEventListener('click', () => { modal.classList.add('open'); });
  span.addEventListener('click', () => { modal.classList.remove('open'); });
  window.addEventListener('click', (e) => {
    if (e.target === modal) { modal.classList.remove('open'); }
  });
});
