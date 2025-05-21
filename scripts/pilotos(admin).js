document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const pilotosSection = document.getElementById('ADMINpilotos');
    
    // Función para cargar los datos de pilotos desde la API
    function cargarDatosPilotos() {
      const API_PILOTOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/Pilotos";
      
      // Mostrar indicador de carga
      pilotosSection.innerHTML = '<div class="loading">Cargando información de pilotos...</div>';
      
      fetch(API_PILOTOS)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(pilotos => {
          mostrarPilotos(pilotos);
        })
        .catch(error => {
          console.error('Error al cargar los pilotos:', error);
          pilotosSection.innerHTML = `
            <div class="error-message">
              <h3>Error al cargar los pilotos</h3>
              <p>${error.message}</p>
              <button onclick="cargarDatosPilotos()">Intentar de nuevo</button>
            </div>
          `;
        });
    }
    
    // Función para mostrar los pilotos en la interfaz
    function mostrarPilotos(pilotos) {
      if (pilotos.length === 0) {
        pilotosSection.innerHTML = '<div class="no-data">No hay información disponible sobre pilotos.</div>';
        return;
      }

      let contenidoHTML = `
        <h2>Pilotos de F1</h2>
        <div class="pilotos-grid">
      `;

      pilotos.forEach(piloto => {
        contenidoHTML += `
          <div class="piloto-card" data-id="${piloto.id}">
            <div class="piloto-imagen">
              <img src="${piloto.imagen || './img/default-driver.jpg'}" alt="${piloto.nombre || 'Piloto F1'}">
            </div>
            <div class="piloto-info">
              <h3>${piloto.nombre || 'Sin nombre'} ${piloto.apellido || ''}</h3>
              <p class="equipo"><span>Equipo:</span> ${piloto.equipo || 'No especificado'}</p>
              <div class="stats-container">
                <div class="stat-item">
                  <div class="stat-value">${piloto.victorias || '0'}</div>
                  <div class="stat-label">Victorias</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${piloto.podios || '0'}</div>
                  <div class="stat-label">Podios</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${piloto.puntos || '0'}</div>
                  <div class="stat-label">Puntos</div>
                </div>
              </div>
              <div class="piloto-ranking">
                <span class="ranking-label">Posición:</span>
                <span class="ranking-value">${piloto.posicion || 'N/A'}</span>
              </div>
              <button class="btn-borrar-piloto" data-id="${piloto.id}">Borrar</button>
            </div>
          </div>
        `;
      });

      contenidoHTML += `</div>`;
      pilotosSection.innerHTML = contenidoHTML;

      // Agregar listeners a los botones de borrar
      document.querySelectorAll('.btn-borrar-piloto').forEach(btn => {
        btn.addEventListener('click', function() {
          const pilotoId = this.getAttribute('data-id');
          borrarPiloto(pilotoId);
        });
      });
    }
  
    // Función para borrar un piloto
    function borrarPiloto(id) {
      if (!confirm('¿Estás seguro de que deseas borrar este piloto?')) return;
      const API_PILOTOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/Pilotos";
      fetch(`${API_PILOTOS}/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) throw new Error('No se pudo borrar el piloto');
        // Recargar la lista de pilotos
        cargarDatosPilotos();
      })
      .catch(error => {
        alert('Error al borrar el piloto: ' + error.message);
      });
    }
  
    // Agregar un observador para detectar cuando se muestra la sección de pilotos
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.target === pilotosSection && 
            mutation.type === "attributes" && 
            mutation.attributeName === "style" &&
            pilotosSection.style.display !== "none") {
          // Si la sección de pilotos se hace visible, cargar los datos
          cargarDatosPilotos();
        }
      });
    });
    
    // Configurar el observador para vigilar cambios en el atributo style
    observer.observe(pilotosSection, { attributes: true });
  
    // También agregar un event listener para el enlace de pilotos en el menú
    const pilotosLink = document.querySelector('a[href="#ADMINpilotos"]');
    if (pilotosLink) {
      pilotosLink.addEventListener('click', function() {
        // Esperar un poco para que el cambio de display tenga efecto
        setTimeout(cargarDatosPilotos, 100);
      });
    }
  });