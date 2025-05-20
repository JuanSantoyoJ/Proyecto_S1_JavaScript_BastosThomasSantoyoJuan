document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos
    const vehiculosSection = document.getElementById('ADMINvehiculos');

    // Función para cargar los datos de vehículos desde la API
    function cargarDatosVehiculos() {
        const API_CARROS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros";

        // Mostrar indicador de carga
        vehiculosSection.innerHTML = '<div class="loading">Cargando información de vehículos...</div>';

        fetch(API_CARROS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(vehiculos => {
                mostrarVehiculos(vehiculos);
            })
            .catch(error => {
                console.error('Error al cargar los vehículos:', error);
                vehiculosSection.innerHTML = `
            <div class="error-message">
              <h3>Error al cargar los vehículos</h3>
              <p>${error.message}</p>
              <button onclick="cargarDatosVehiculos()">Intentar de nuevo</button>
            </div>
          `;
            });
    }

    // Función para mostrar los vehículos en la interfaz
    function mostrarVehiculos(vehiculos) {
        if (vehiculos.length === 0) {
            vehiculosSection.innerHTML = '<div class="no-data">No hay información disponible sobre vehículos.</div>';
            return;
        }

        // Crear el contenido HTML para mostrar los vehículos
        let contenidoHTML = `
        <h2>Vehículos de F1</h2>
        <div class="vehiculos-grid">
      `;

        vehiculos.forEach(vehiculo => {
            contenidoHTML += `
          <div class="vehiculo-card">
            <div class="vehiculo-imagen">
              <img src="${vehiculo.imagen || './img/default-car.jpg'}" alt="${vehiculo.nombre || 'Vehículo F1'}">
            </div>
            <div class="vehiculo-info">
              <h3>${vehiculo.nombre || 'Sin nombre'}</h3>
              <p class="equipo"><strong>Equipo:</strong> ${vehiculo.equipo || 'No especificado'}</p>
              <p class="motor"><strong>Motor:</strong> ${vehiculo.motor || 'No especificado'}</p>
              <p class="temporada"><strong>Temporada:</strong> ${vehiculo.temporada || 'No especificada'}</p>
              <p class="descripcion">${vehiculo.descripcion || 'No hay descripción disponible'}</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-label">Velocidad</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.velocidad || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.velocidad || 0}/100</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Aceleración</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.aceleracion || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.aceleracion || 0}/100</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Manejo</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.manejo || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.manejo || 0}/100</span>
                </div>
              </div>
            </div>
          </div>
        `;
        });

        contenidoHTML += `</div>`;

        // Actualizar el contenido de la sección
        vehiculosSection.innerHTML = contenidoHTML;
    }

    // Agregar un observador para detectar cuando se muestra la sección de vehículos
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target === vehiculosSection &&
                mutation.type === "attributes" &&
                mutation.attributeName === "style" &&
                vehiculosSection.style.display !== "none") {
                // Si la sección de vehículos se hace visible, cargar los datos
                cargarDatosVehiculos();
            }
        });
    });

    // Configurar el observador para vigilar cambios en el atributo style
    observer.observe(vehiculosSection, { attributes: true });

    // También agregar un event listener para el enlace de vehículos en el menú
    const vehiculosLink = document.querySelector('a[href="#vehiculos"]');
    if (vehiculosLink) {
        vehiculosLink.addEventListener('click', function () {
            // Esperar un poco para que el cambio de display tenga efecto
            setTimeout(cargarDatosVehiculos, 100);
        });
    }
}); document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos
    const vehiculosSection = document.getElementById('vehiculos');

    // Función para cargar los datos de vehículos desde la API
    function cargarDatosVehiculos() {
        const API_CARROS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros";

        // Mostrar indicador de carga
        vehiculosSection.innerHTML = '<div class="loading">Cargando información de vehículos...</div>';

        fetch(API_CARROS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(vehiculos => {
                mostrarVehiculos(vehiculos);
            })
            .catch(error => {
                console.error('Error al cargar los vehículos:', error);
                vehiculosSection.innerHTML = `
            <div class="error-message">
              <h3>Error al cargar los vehículos</h3>
              <p>${error.message}</p>
              <button onclick="cargarDatosVehiculos()">Intentar de nuevo</button>
            </div>
          `;
            });
    }

    // Función para mostrar los vehículos en la interfaz
    function mostrarVehiculos(vehiculos) {
        if (vehiculos.length === 0) {
            vehiculosSection.innerHTML = '<div class="no-data">No hay información disponible sobre vehículos.</div>';
            return;
        }

        // Crear el contenido HTML para mostrar los vehículos
        let contenidoHTML = `
        <h2>Vehículos de F1</h2>
        <div class="vehiculos-grid">
      `;

        vehiculos.forEach(vehiculo => {
            contenidoHTML += `
          <div class="vehiculo-card">
            <div class="vehiculo-imagen">
              <img src="${vehiculo.imagen || './img/default-car.jpg'}" alt="${vehiculo.nombre || 'Vehículo F1'}">
            </div>
            <div class="vehiculo-info">
              <h3>${vehiculo.nombre || 'Sin nombre'}</h3>
              <p class="equipo"><strong>Equipo:</strong> ${vehiculo.equipo || 'No especificado'}</p>
              <p class="motor"><strong>Motor:</strong> ${vehiculo.motor || 'No especificado'}</p>
              <p class="temporada"><strong>Temporada:</strong> ${vehiculo.temporada || 'No especificada'}</p>
              <p class="descripcion">${vehiculo.descripcion || 'No hay descripción disponible'}</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-label">Velocidad</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.velocidad || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.velocidad || 0}/100</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Aceleración</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.aceleracion || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.aceleracion || 0}/100</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Manejo</span>
                  <div class="stat-bar">
                    <div class="stat-fill" style="width: ${vehiculo.manejo || 0}%"></div>
                  </div>
                  <span class="stat-value">${vehiculo.manejo || 0}/100</span>
                </div>
              </div>
            </div>
          </div>
        `;
        });

        contenidoHTML += `</div>`;

        // Actualizar el contenido de la sección
        vehiculosSection.innerHTML = contenidoHTML;
    }

    // Agregar un observador para detectar cuando se muestra la sección de vehículos
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target === vehiculosSection &&
                mutation.type === "attributes" &&
                mutation.attributeName === "style" &&
                vehiculosSection.style.display !== "none") {
                // Si la sección de vehículos se hace visible, cargar los datos
                cargarDatosVehiculos();
            }
        });
    });

    // Configurar el observador para vigilar cambios en el atributo style
    observer.observe(vehiculosSection, { attributes: true });

    // También agregar un event listener para el enlace de vehículos en el menú
    const vehiculosLink = document.querySelector('a[href="#ADMINvehiculos"]');
    if (vehiculosLink) {
        vehiculosLink.addEventListener('click', function () {
            // Esperar un poco para que el cambio de display tenga efecto
            setTimeout(cargarDatosVehiculos, 100);
        });
    }
});