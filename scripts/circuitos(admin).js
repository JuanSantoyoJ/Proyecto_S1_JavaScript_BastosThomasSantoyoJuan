// Esperar a que todo el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {

  // Referencia al elemento de la sección de circuitos del administrador
  const circuitosSection = document.getElementById('ADMINcircuitos');

  // Función para cargar los datos de circuitos desde la API
  function cargarDatosCircuitos() {
      // URL de la API Mock de circuitos
      const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";

      // Mostrar un mensaje de carga mientras se obtienen los datos
      circuitosSection.innerHTML = '<div class="loading">Cargando información de circuitos...</div>';

      // Petición fetch para obtener los datos de la API
      fetch(API_CIRCUITOS)
          .then(response => {
              // Verificar si la respuesta es válida
              if (!response.ok) {
                  throw new Error('Error en la respuesta de la API');
              }
              // Convertir la respuesta a formato JSON
              return response.json();
          })
          .then(circuitos => {
              // Mostrar los datos recibidos en la interfaz
              mostrarCircuitos(circuitos);
          })
          .catch(error => {
              // Manejo de errores si la petición falla
              console.error('Error al cargar los circuitos:', error);
              // Mostrar mensaje de error en la interfaz
              circuitosSection.innerHTML = `
                  <div class="error-message">
                    <h3>Error al cargar los circuitos</h3>
                    <p>${error.message}</p>
                    <button onclick="cargarDatosCircuitos()">Intentar de nuevo</button>
                  </div>
              `;
          });
  }

  // Función para mostrar los circuitos obtenidos en la interfaz
  function mostrarCircuitos(circuitos) {
      // Si no hay circuitos, mostrar mensaje indicativo
      if (circuitos.length === 0) {
          circuitosSection.innerHTML = '<div class="no-data">No hay información disponible sobre circuitos.</div>';
          return;
      }

      // Inicializar contenido HTML para mostrar los circuitos
      let contenidoHTML = `
          <h2>Circuitos de F1</h2>
          <div class="circuitos-grid">
      `;

      // Recorrer cada circuito y generar su tarjeta correspondiente
      circuitos.forEach(circuito => {
          contenidoHTML += `
              <div class="circuito-card" data-id="${circuito.id}">
                  <div class="circuito-header">
                      <span class="circuito-gp">${circuito.nombreGP || 'Gran Premio'}</span>
                      <span class="circuito-fecha">${circuito.fecha || 'Fecha no disponible'}</span>
                  </div>
                  <div class="circuito-imagen">
                      <img src="${circuito.imagen || './img/default-circuit.jpg'}" alt="${circuito.nombre || 'Circuito F1'}">
                  </div>
                  <div class="circuito-info">
                      <h3>${circuito.nombre || 'Sin nombre'}</h3>
                      <div class="circuito-ubicacion">
                          <span class="pais-bandera">${circuito.bandera || '🏁'}</span>
                          <span class="pais-nombre">${circuito.pais || 'País no especificado'}</span>
                      </div>
                      <div class="circuito-datos">
                          <div class="dato">
                              <div class="dato-valor">${circuito.longitud || '0'} km</div>
                              <div class="dato-label">Longitud</div>
                          </div>
                          <div class="dato">
                              <div class="dato-valor">${circuito.curvas || '0'}</div>
                              <div class="dato-label">Curvas</div>
                          </div>
                          <div class="dato">
                              <div class="dato-valor">${circuito.vueltas || '0'}</div>
                              <div class="dato-label">Vueltas</div>
                          </div>
                      </div>
                      <div class="circuito-record">
                          <div class="record-title">Vuelta Récord</div>
                          <div class="record-tiempo">${circuito.recordVuelta || 'No disponible'}</div>
                          <div class="record-piloto">${circuito.recordPiloto || 'N/A'} (${circuito.recordAno || 'N/A'})</div>
                      </div>
                      <p class="circuito-descripcion">${circuito.descripcion || 'No hay descripción disponible para este circuito.'}</p>
                      <button class="btn-borrar-circuito" data-id="${circuito.id}">Borrar</button>
                  </div>
              </div>
          `;
      });

      // Cerrar contenedor grid
      contenidoHTML += `</div>`;

      // Insertar todo el contenido generado en la sección de circuitos
      circuitosSection.innerHTML = contenidoHTML;

      // Asignar listeners a todos los botones de borrar
      document.querySelectorAll('.btn-borrar-circuito').forEach(btn => {
          btn.addEventListener('click', function() {
              // Obtener el id del circuito desde el atributo data-id del botón
              const circuitoId = this.getAttribute('data-id');
              // Llamar a la función para borrar el circuito
              borrarCircuito(circuitoId);
          });
      });
  }

  // Función para borrar un circuito por su ID
  function borrarCircuito(id) {
      // Confirmar con el usuario antes de borrar
      if (!confirm('¿Estás seguro de que deseas borrar este circuito?')) return;

      const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";

      // Realizar petición DELETE a la API para eliminar el circuito
      fetch(`${API_CIRCUITOS}/${id}`, {
          method: 'DELETE'
      })
      .then(response => {
          // Verificar si la respuesta es válida
          if (!response.ok) throw new Error('No se pudo borrar el circuito');
          // Recargar los datos actualizados tras borrar
          cargarDatosCircuitos();
      })
      .catch(error => {
          // Mostrar alerta en caso de error
          alert('Error al borrar el circuito: ' + error.message);
      });
  }

  // Crear un observador de cambios en los atributos de la sección circuitos
  const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
          // Detectar si cambió el estilo de display de la sección
          if (mutation.target === circuitosSection &&
              mutation.type === "attributes" &&
              mutation.attributeName === "style" &&
              circuitosSection.style.display !== "none") {
              // Si se hace visible, cargar los datos
              cargarDatosCircuitos();
          }
      });
  });

  // Configurar el observador para vigilar cambios en atributos
  observer.observe(circuitosSection, { attributes: true });

  // Agregar un listener para el enlace de circuitos en el menú de navegación
  const circuitosLink = document.querySelector('a[href="#ADMINcircuitos"]');
  if (circuitosLink) {
      circuitosLink.addEventListener('click', function () {
          // Dar un pequeño retardo para que el display cambie antes de cargar datos
          setTimeout(cargarDatosCircuitos, 100);
      });
  }
});
