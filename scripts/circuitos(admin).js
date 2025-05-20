document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos
    const circuitosSection = document.getElementById('ADMINcircuitos');

    // Función para cargar los datos de circuitos desde la API
    function cargarDatosCircuitos() {
        const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";

        // Mostrar indicador de carga
        circuitosSection.innerHTML = '<div class="loading">Cargando información de circuitos...</div>';

        fetch(API_CIRCUITOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(circuitos => {
                mostrarCircuitos(circuitos);
            })
            .catch(error => {
                console.error('Error al cargar los circuitos:', error);
                circuitosSection.innerHTML = `
            <div class="error-message">
              <h3>Error al cargar los circuitos</h3>
              <p>${error.message}</p>
              <button onclick="cargarDatosCircuitos()">Intentar de nuevo</button>
            </div>
          `;
            });
    }

    // Función para mostrar los circuitos en la interfaz
    function mostrarCircuitos(circuitos) {
        if (circuitos.length === 0) {
            circuitosSection.innerHTML = '<div class="no-data">No hay información disponible sobre circuitos.</div>';
            return;
        }

        // Crear el contenido HTML para mostrar los circuitos
        let contenidoHTML = `
        <h2>Circuitos de F1</h2>
        <div class="circuitos-grid">
      `;

        circuitos.forEach(circuito => {
            contenidoHTML += `
          <div class="circuito-card">
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
            </div>
          </div>
        `;
        });

        contenidoHTML += `</div>`;

        // Actualizar el contenido de la sección
        circuitosSection.innerHTML = contenidoHTML;
    }

    // Agregar un observador para detectar cuando se muestra la sección de circuitos
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target === circuitosSection &&
                mutation.type === "attributes" &&
                mutation.attributeName === "style" &&
                circuitosSection.style.display !== "none") {
                // Si la sección de circuitos se hace visible, cargar los datos
                cargarDatosCircuitos();
            }
        });
    });

    // Configurar el observador para vigilar cambios en el atributo style
    observer.observe(circuitosSection, { attributes: true });

    // También agregar un event listener para el enlace de circuitos en el menú
    const circuitosLink = document.querySelector('a[href="#ADMINcircuitos"]');
    if (circuitosLink) {
        circuitosLink.addEventListener('click', function () {
            // Esperar un poco para que el cambio de display tenga efecto
            setTimeout(cargarDatosCircuitos, 100);
        });
    }
});