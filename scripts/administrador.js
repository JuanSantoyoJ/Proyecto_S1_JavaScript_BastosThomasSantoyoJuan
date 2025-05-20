document.addEventListener('DOMContentLoaded', function () {
    // URLs de las APIs
    const API_EQUIPOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos";
    const API_PILOTOS = "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/Pilotos";
    const API_CIRCUITOS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos";
    const API_CARROS = "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros";

    // Gestión de secciones de la interfaz de usuario
    function showSection(sectionId) {
        document.querySelectorAll('.contenido-admin section').forEach(section => {
            section.style.display = 'none';
        });

        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // Manejo de enlaces del menú desplegable
    const menuLinks = document.querySelectorAll('.dropdown-content a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Ocultar todas las secciones inicialmente
    function ocultarTodosLosContenidos() {
        document.querySelectorAll('.contenido-admin section').forEach(section => {
            section.style.display = 'none';
        });
    }

    ocultarTodosLosContenidos();
});

