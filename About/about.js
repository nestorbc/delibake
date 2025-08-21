/* abrir/cerrar el menu hamburguesa */
const hamburgerToggle = document.querySelector('.hamburger-toggle');
const hamburgerPanel = document.getElementById('hamburgerPanel');

hamburgerToggle.addEventListener('click', () => {
  hamburgerPanel.style.display =
    hamburgerPanel.style.display === 'block' ? 'none' : 'block';
  searchPanel.style.display = 'none'; // Cierra buscador si estaba abierto
});

// 👇 Nuevo: cerrar si hago click en el panel
hamburgerPanel.addEventListener('click', () => {
  hamburgerPanel.style.display = 'none';
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

/* --------------------------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('button[data-desc]');
  
  // Activar el primer botón por defecto
  if (buttons.length > 0) {
    buttons[0].classList.add('active');
    const firstDescId = buttons[0].getAttribute('data-desc');
    document.getElementById(firstDescId).style.display = 'block';

    // Cambiar icono a ">" en el botón activo
    const iconSpan = buttons[0].querySelector('.icon');
    iconSpan.textContent = '>';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const descId = btn.getAttribute('data-desc');
      const descPara = document.getElementById(descId);

      // Ocultar todas las respuestas
      document.querySelectorAll('.desc').forEach(p => {
        p.style.display = 'none';
      });

      // Mostrar la respuesta correspondiente
      descPara.style.display = 'block';

      // Remover la clase activa de todos los botones y restablecer iconos
      buttons.forEach(b => {
        b.classList.remove('active');
        const icon = b.querySelector('.icon');
        icon.textContent = '<'; // icono por defecto
      });

      // Agregar la clase activa solo al botón clickeado
      btn.classList.add('active');

      // Cambiar el icono del botón clickeado a ">"
      const iconSpan = btn.querySelector('.icon');
      iconSpan.textContent = '>';
    });
  });
});

//----------------------------------------------------------------------------------------------




