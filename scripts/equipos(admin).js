document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const equiposSection = document.getElementById('ADMINequipos');
    
    // Función para cargar los datos de equipos desde la API
    function cargarDatosEquipos() {
      const API_EQUIPOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos";
      
      // Mostrar indicador de carga
      equiposSection.innerHTML = '<div class="loading">Cargando información de equipos...</div>';
      
      fetch(API_EQUIPOS)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(equipos => {
          mostrarEquipos(equipos);
        })
        .catch(error => {
          console.error('Error al cargar los equipos:', error);
          equiposSection.innerHTML = `
            <div class="error-message">
              <h3>Error al cargar los equipos</h3>
              <p>${error.message}</p>
              <button onclick="cargarDatosEquipos()">Intentar de nuevo</button>
            </div>
          `;
        });
    }
    
    // Función para mostrar los equipos en la interfaz
    function mostrarEquipos(equipos) {
      if (equipos.length === 0) {
        equiposSection.innerHTML = '<div class="no-data">No hay información disponible sobre equipos.</div>';
        return;
      }

      let contenidoHTML = `
        <h2>Equipos de F1</h2>
        <div class="equipos-grid">
      `;

      equipos.forEach(equipo => {
        // Generar HTML para cada piloto del equipo
        let pilotosHTML = '';
        if (equipo.pilotos && equipo.pilotos.length) {
          pilotosHTML = '<div class="equipo-pilotos">';
          equipo.pilotos.forEach(piloto => {
            pilotosHTML += `
              <div class="piloto-item">
                <img src="${piloto.imagen || './img/default-driver.jpg'}" alt="${piloto.nombre || 'Piloto'}">
                <span>${piloto.nombre || 'Piloto'}</span>
                <span class="numero-piloto">${piloto.numero || '00'}</span>
              </div>
            `;
          });
          pilotosHTML += '</div>';
        }
        
        // Color de fondo personalizado del equipo (con fallback a negro)
        const colorFondo = equipo.colorPrincipal || '#000000';
        const colorSecundario = equipo.colorSecundario || '#ffffff';
        
        contenidoHTML += `
          <div class="equipo-card" style="border-top: 5px solid ${colorFondo};" data-id="${equipo.id}">
            <div class="equipo-header" style="background: linear-gradient(to right, ${colorFondo}, ${colorSecundario});">
              <img src="${equipo.logo || './img/default-team.png'}" alt="${equipo.nombre || 'Equipo F1'}" class="equipo-logo">
            </div>
            <div class="equipo-info">
              <h3>${equipo.nombre || 'Sin nombre'}</h3>
              <p class="equipo-pais">
                <span class="pais-bandera">${equipo.bandera || '🏁'}</span>
                <span class="pais-nombre">${equipo.paisOrigen || 'País no especificado'}</span>
              </p>
              <div class="equipo-stats">
                <div class="stat-bloque">
                  <div class="stat-numero">${equipo.campeonatos || '0'}</div>
                  <div class="stat-texto">Campeonatos</div>
                </div>
                <div class="stat-bloque">
                  <div class="stat-numero">${equipo.victorias || '0'}</div>
                  <div class="stat-texto">Victorias</div>
                </div>
                <div class="stat-bloque">
                  <div class="stat-numero">${equipo.podios || '0'}</div>
                  <div class="stat-texto">Podios</div>
                </div>
              </div>
              <div class="equipo-detalles">
                <p><strong>Director:</strong> ${equipo.director || 'No especificado'}</p>
                <p><strong>Motor:</strong> ${equipo.motor || 'No especificado'}</p>
                <p><strong>Sede:</strong> ${equipo.sede || 'No especificada'}</p>
                <p><strong>Año de Fundación:</strong> ${equipo.fundacion || 'No especificado'}</p>
              </div>
              ${pilotosHTML}
              <div class="equipo-descripcion">
                <p>${equipo.descripcion || 'No hay descripción disponible para este equipo.'}</p>
              </div>
              <button class="btn-borrar-equipo" data-id="${equipo.id}">Borrar</button>
            </div>
          </div>
        `;
      });

      contenidoHTML += `</div>`;
      equiposSection.innerHTML = contenidoHTML;

      // Listeners para borrar
      document.querySelectorAll('.btn-borrar-equipo').forEach(btn => {
          btn.addEventListener('click', function() {
              const equipoId = this.getAttribute('data-id');
              borrarEquipo(equipoId);
          });
      });
    }
  
    function borrarEquipo(id) {
        if (!confirm('¿Estás seguro de que deseas borrar este equipo?')) return;
        const API_EQUIPOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos";
        fetch(`${API_EQUIPOS}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('No se pudo borrar el equipo');
            cargarDatosEquipos();
        })
        .catch(error => {
            alert('Error al borrar el equipo: ' + error.message);
        });
    }
  
    // Agregar un observador para detectar cuando se muestra la sección de equipos
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.target === equiposSection && 
            mutation.type === "attributes" && 
            mutation.attributeName === "style" &&
            equiposSection.style.display !== "none") {
          // Si la sección de equipos se hace visible, cargar los datos
          cargarDatosEquipos();
        }
      });
    });
    
    // Configurar el observador para vigilar cambios en el atributo style
    if (equiposSection) {
      observer.observe(equiposSection, { attributes: true });
  
      // También agregar un event listener para el enlace de equipos en el menú
      const equiposLink = document.querySelector('a[href="#ADMINequipos"]');
      if (equiposLink) {
        equiposLink.addEventListener('click', function() {
          // Esperar un poco para que el cambio de display tenga efecto
          setTimeout(cargarDatosEquipos, 100);
        });
      }
    }
  });