document.addEventListener('DOMContentLoaded', function() {
  // URLs de las APIs
  const API_EQUIPOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos";
  const API_PILOTOS = "https://682b527ed29df7a95be2f700.mockapi.io/pilotos";
  const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";
  const API_CARROS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros";

  // Función para mostrar secciones
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.contenido-usuario section');
    if (!sections.length) {
      console.error('No se encontraron secciones');
      return;
    }

    sections.forEach(section => {
      section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = 'block';

      if (sectionId === 'vehiculos') {
        mostrarVehiculos();
      }
      // Agrega más condiciones para otras secciones si es necesario
    } else {
      console.error(`Sección no encontrada: ${sectionId}`);
    }
  }

  // Función genérica de fetch
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return null;
    }
  }

  // Configurar eventos
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  if (dropdownLinks.length) {
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
      });
    });
  }

  // Mostrar sección inicial
  showSection('comenzar-carrera');
});
// Función para mostrar vehículos
async function mostrarPilotos(){
  const contenedor = document.getElementById('pilotos');
  contenedor.innerHTML = ''; // Limpiar contenido previo

  const data = await fetchData(API_PILOTOS);
  if (!data) return;

  data.forEach(piloto => {
    const div = document.createElement('div');
    div.classList.add('piloto');
    div.innerHTML = `
      <h3>${piloto.nombre}</h3>
      <p>Equipo: ${piloto.equipo}</p>
      <p>País: ${piloto.pais}</p>
    `;
    contenedor.appendChild(div);
  });
} 