
// Función que oculta la pantalla de inicio y muestra la pantalla de selección de usuario/admin
function mostrarOtroContenido() {
    document.getElementById('inicio').style.display = 'none';          // Oculta el div con id "inicio"
    document.getElementById('nuevo-contenido').style.display = 'block'; // Muestra el div con id "nuevo-contenido"
}

// Función que oculta la pantalla de selección y muestra la vista de usuario
function mostrarVistaUsuario() {
    document.getElementById('nuevo-contenido').style.display = 'none';  // Oculta la pantalla de selección de usuario
    document.getElementById('vista-usuario').style.display = 'block';   // Muestra la vista de usuario
}

// Función que oculta la pantalla de selección y muestra la vista de administrador
function mostrarVistaAdmin() {
    document.getElementById('nuevo-contenido').style.display = 'none';  // Oculta la pantalla de selección de usuario
    document.getElementById('vista-admin').style.display = 'block';     // Muestra la vista de administrador
}

// Función para volver a la pantalla inicial desde cualquier vista
function volver() {
    document.getElementById('inicio').style.display = 'block';         // Muestra el div de inicio
    document.getElementById('nuevo-contenido').style.display = 'none'; // Oculta la pantalla de selección
    document.getElementById('vista-usuario').style.display = 'none';   // Oculta la vista de usuario
    document.getElementById('vista-admin').style.display = 'none';     // Oculta la vista de administrador
}
