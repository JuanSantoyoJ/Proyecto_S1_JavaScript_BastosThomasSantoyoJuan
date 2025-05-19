document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar secciones
    function showSection(sectionId) {
        // Oculta todas las secciones
        document.querySelectorAll('.contenido-usuario section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Muestra la sección seleccionada
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            
            // Actualiza el título en el header (opcional)
            document.querySelector('.welcome-message').textContent = 
                `Modo: ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
        }
    }
    
    // Asigna eventos a los enlaces del dropdown
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Muestra la sección por defecto
    showSection('comenzar-carrera');
}); 
function mostrarVistaUsuario() {
  document.getElementById('nuevo-contenido').style.display = 'none';
  document.getElementById('vista-admin').style.display = 'none';
  document.getElementById('vista-usuario').style.display = 'block';
  document.getElementById('registro-usuario').style.display = 'block';
  document.getElementById('contenido-usuario').style.display = 'none';
}

// URL base de cada API
const API_EQUIPOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos";
const API_PILOTOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/Pilotos";
const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";
const API_CARROS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros";


async function fetchData(url) {
  try {
    const response = await fetch(url); // Hace la solicitud a la URL
    if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
    const data = await response.json(); // Convierte la respuesta a JSON
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}


async function getEquipos() {
  const equipos = await fetchData(API_EQUIPOS);
  console.log("Equipos:", equipos);
  return equipos;
}

async function getPilotos() {
  const pilotos = await fetchData(API_PILOTOS);
  console.log("Pilotos:", pilotos);
  return pilotos;
}


async function getCircuitos() {
  const circuitos = await fetchData(API_CIRCUITOS);
  console.log("Circuitos:", circuitos);
  return circuitos;
}


async function getCarros() {
  const carros = await fetchData(API_CARROS);
  console.log("Carros:", carros);
  return carros;
}


async function cargarTodo() {
  await getEquipos();
  await getPilotos();
  await getCircuitos();
  await getCarros();
}

cargarTodo(); // Llama a todas las funciones al cargar el script
