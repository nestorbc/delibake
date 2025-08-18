/* abrir el menu hamburguesa */
const hamburgerToggle = document.querySelector('.hamburger-toggle');
const hamburgerPanel = document.getElementById('hamburgerPanel');

hamburgerToggle.addEventListener('click', () => {
  hamburgerPanel.style.display =
    hamburgerPanel.style.display === 'block' ? 'none' : 'block';
  searchPanel.style.display = 'none'; // Cierra buscador si estaba abierto
});

/* --------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------- */

/* Abrir el buscador de la lupa */
const searchIcon = document.querySelector('.search-icon');
const searchPanel = document.getElementById('searchPanel');

searchIcon.addEventListener('click', () => {
  searchPanel.style.display =
    searchPanel.style.display === 'block' ? 'none' : 'block';
  hamburgerPanel.style.display = 'none'; // Cierra menú si estaba abierto
});

/* Cerrar el buscador al hacer clic fuera */
 const toggle = document.getElementById('dropdown-toggle');

  document.addEventListener('click', function (e) {
    // Cierra si haces clic fuera
    if (!toggle.contains(e.target)) {
      toggle.classList.remove('open');
    } else {
      toggle.classList.toggle('open');
    }
  });