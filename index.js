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

/* --------------------------------------------------------------------------------------------- */
 /* --------------------------------------------------------------------------------------------- */


/* funcion para buscar elementos en la lista de la lupa (todavia no funciona) */

    const input = document.getElementById('searchInput');
    const items = document.querySelectorAll('.item');

    // Función para quitar acentos y pasar a minúsculas
    function normalize(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    input.addEventListener('input', () => {
        const term = normalize(input.value);
        items.forEach(item => {
            const text = normalize(item.textContent);
            item.style.display = text.includes(term) ? 'block' : 'none';
        });
    });



    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */


    /* Función para cambiar el comentario y autor al hacer clic en los círculos */
    const circles = document.querySelectorAll('.circle');
    const commentText = document.getElementById('comment-text');
    const authorText = document.getElementById('author-text');

    const comments = [
      {
        text: "¡La mejor panadería de la ciudad! Sus croissants son irresistibles y el ambiente es muy acogedor.",
        author: "LAURA GOMEZ"
      },
      {
        text: "Siempre que paso por aquí, no puedo resistirme a comprar sus panes artesanales. ¡Son de excelente calidad!",
        author: "JUAN MARTINEZ"
      },
      {
        text: "Me encanta la variedad de productos y la frescura de cada uno. Recomiendo mucho esta panadería.",
        author: "MARIA LOPEZ"
      }
    ];

    circles.forEach(circle => {
  circle.addEventListener('click', () => {
    const index = parseInt(circle.getAttribute('data-index'));

    // Actualiza el contenido
    commentText.textContent = comments[index].text;
    authorText.textContent = comments[index].author;

    // Activa sólo el círculo clicado
    circles.forEach(c => c.classList.remove('active'));
    circle.classList.add('active');
  });
});




  


