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
  if (!toggle.contains(e.target)) {
    toggle.classList.remove('open');
  } else {
    toggle.classList.toggle('open');
  }
});



/* --------------------------------------------------------------------------------------------- */
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




//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

// Variable global para generar IDs únicos
let comentarioIdCounter = 0;

/**
 * Muestra un comentario en el DOM y devuelve la referencia al elemento creado
 * @param {Object} c - El comentario con propiedades: nom, cognom, message, rating, imagen_path
 * @returns {HTMLElement} - La referencia al elemento DOM del comentario
 */
function mostrarComentario(c) {
  const container = document.getElementById("comentariosContainer");
  const caja = document.createElement('div');
  caja.className = 'comentario-caja';

  // Generar un ID único para este comentario
  const idUnico = `comentario-${comentarioIdCounter++}`;
  caja.setAttribute('data-id', idUnico);
  caja.id = idUnico;

  // Calificación con estrellas
  let calificacion = parseInt(c.rating);
  if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
    calificacion = 0;
  }
  let estrellas = '';
  for (let i = 0; i < calificacion; i++) estrellas += '★';
  for (let i = calificacion; i < 5; i++) estrellas += '☆';

  const imageUrl = c.imagen_path || '';

  caja.innerHTML = `
    <div class="comentario-header">
      <h1 class="comentario-titulo">${c.nom} ${c.cognom}</h1>
    </div>
    <p class="mensaje">${c.message}</p>
    <p class="rating">Rating: ${estrellas}</p>
    ${imageUrl ? `
      <div class="foto-comentario">
        <img src="${imageUrl}" alt="Foto del comentario" style="max-width:200px;">
        <a href="${imageUrl}" download class="descargar-foto">Descargar foto</a>
      </div>
    ` : ''}
    <!-- Aquí cambiamos la clase a 'borrarComentario' para que tenga el mismo estilo -->
    <button class="borrarComentario" 
      data-nom="${c.nom}" 
      data-cognom="${c.cognom}" 
      data-message="${encodeURIComponent(c.message)}" 
      data-rating="${c.rating}" 
      data-image="${c.imagen_path}"
      data-id="${idUnico}">Editar comentario</button>
  `;

  // Evento para editar
  const btnEditar = caja.querySelector('.borrarComentario');
  btnEditar.addEventListener('click', () => {
    abrirFormularioEdicion(c, caja);
  });

  container.appendChild(caja);
  return caja;
}

// Función para actualizar la vista del comentario
function actualizarComentarioElemento(c, elemento) {
  const estrellas = (() => {
    let calificacion = parseInt(c.rating);
    if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
      calificacion = 0;
    }
    let stars = '';
    for (let i = 0; i < calificacion; i++) stars += '★';
    for (let i = calificacion; i < 5; i++) stars += '☆';
    return stars;
  })();

  const imageUrl = c.imagen_path || '';
  const id = elemento.getAttribute('data-id');

  elemento.innerHTML = `
    <div class="comentario-header">
      <h1 class="comentario-titulo">${c.nom} ${c.cognom}</h1>
    </div>
    <p class="mensaje">${c.message}</p>
    <p class="rating">Rating: ${estrellas}</p>
    ${imageUrl ? `
      <div class="foto-comentario">
        <img src="${imageUrl}" alt="Foto del comentario" style="max-width:200px;">
        <a href="${imageUrl}" download class="descargar-foto">Descargar foto</a>
      </div>
    ` : ''}
    <!-- Cambiamos la clase a 'borrarComentario' para mantener el estilo -->
    <button class="borrarComentario" 
      data-nom="${c.nom}" 
      data-cognom="${c.cognom}" 
      data-message="${encodeURIComponent(c.message)}" 
      data-rating="${c.rating}" 
      data-image="${c.imagen_path}"
      data-id="${id}">Editar comentario</button>
  `;

  // Reasignar evento para editar
  const btnEditar = elemento.querySelector('.borrarComentario');
  btnEditar.addEventListener('click', () => {
    abrirFormularioEdicion(c, elemento);
  });
}
 
/**
 * Abre el formulario inline para editar un comentario
 * @param {Object} c - El comentario
 * @param {HTMLElement} elemento - La referencia al elemento DOM del comentario
 */
function abrirFormularioEdicion(c, elemento) {
  // Mostrar formulario inline reemplazando contenido
  elemento.innerHTML = `
    <form class="form-editar">
      <label>Mensaje:</label>
      <textarea name="mensaje" rows="3">${c.message}</textarea>
      <label>Rating:</label>
      <select name="rating">
        <option value="1" ${c.rating == 1 ? 'selected' : ''}>1</option>
        <option value="2" ${c.rating == 2 ? 'selected' : ''}>2</option>
        <option value="3" ${c.rating == 3 ? 'selected' : ''}>3</option>
        <option value="4" ${c.rating == 4 ? 'selected' : ''}>4</option>
        <option value="5" ${c.rating == 5 ? 'selected' : ''}>5</option>
      </select>
      <br>
      <button type="submit">Guardar</button>
      <button type="button" id="cancelar">Cancelar</button>
    </form>
  `;

  const form = elemento.querySelector('.form-editar');
  const cancelarBtn = elemento.querySelector('#cancelar');

  cancelarBtn.addEventListener('click', () => {
    // Restaurar el comentario original
    mostrarComentario(c);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mensajeNuevo = form.mensaje.value.trim();
    const ratingNuevo = form.rating.value;

    // Enviar actualización al PHP
    fetch('editar_comentario.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: c.nom,
        cognom: c.cognom,
        message: mensajeNuevo,
        rating: ratingNuevo
      })
    })
    .then(res => res.json())
    .then(resData => {
      if (resData.success) {
        // Actualizar datos locales
        c.message = mensajeNuevo;
        c.rating = ratingNuevo;
        // Actualizar elemento DOM
        actualizarComentarioElemento(c, elemento);
      } else {
        alert('Error al editar: ' + resData.error);
        // Remostrar el comentario original en caso de error
        actualizarComentarioElemento(c, elemento);
      }
    })
    .catch(err => {
      alert('Error en la petición: ' + err.message);
      actualizarComentarioElemento(c, elemento);
    });
  });
}

// Evento para enviar comentario con foto
const form = document.getElementById("contactForm");
//const divEnviarDato = document.getElementById('enviarDatos');

let divEnviarDato;

document.getElementById("enviarComentario").addEventListener("click", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log('Enviando:', [...formData.entries()]);

  fetch('/Practica_4/Faqs/index.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.success) {
          const nom = form.nom.value || 'Anónimo';
          const cognom = form.cognom.value || '';
          const message = form.message.value || '';
          const rating = form.rating.value || '0';

          // Mostrar en la interfaz
          mostrarComentario({ 
            nom, 
            cognom,
            message, 
            rating, 
            imagen_path: data.rutaImagen 
          });

          // Mostrar imagen subida
          divEnviarDato.innerHTML = '';
          if (data.rutaImagen) {
            const img = document.createElement('img');
            img.src = data.rutaImagen;
            img.alt = 'Imagen subida';
            img.style.maxWidth = '200px';

            const linkDescarga = document.createElement('a');
            linkDescarga.href = data.rutaImagen;
            linkDescarga.download = 'imagen_subida.png';
            linkDescarga.textContent = 'Descargar foto';
            linkDescarga.className = 'descargar-foto';

            divEnviarDato.appendChild(img);
            divEnviarDato.appendChild(linkDescarga);
          } else {
            divEnviarDato.innerHTML = '<p>No se subió ninguna imagen.</p>';
          }

          form.reset();
        } else {
          alert('Error: ' + data.error);
        }
      } catch (e) {
        console.error('Respuesta no es JSON:', text);
        //alert('Respuesta inesperada del servidor.');
      }
    })
    .catch(error => {
      console.error('Error en la petición:', error);
      alert('Error en la conexión.');
    });
});

// Cargar comentarios existentes
function cargarComentarios() {
  fetch('listar_comentarios.php')
    .then(response => {
      if (!response.ok) throw new Error('Respuesta no OK: ' + response.status);
      return response.json();
    })
    .then(comentarios => {
      const container = document.getElementById("comentariosContainer");
      container.innerHTML = '';
      if (comentarios.length === 0) {
        container.innerHTML = '<p>No hay comentarios almacenados.</p>';
      } else {
        comentarios.forEach(c => {
          mostrarComentario(c);
        });
      }
    })
    .catch(error => {
      //alert('Error al obtener los comentarios: ' + error.message);
    });
}

// Ejecutar al cargar
cargarComentarios();
