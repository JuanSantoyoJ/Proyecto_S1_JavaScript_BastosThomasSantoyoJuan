function mostrarOtroContenido() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('nuevo-contenido').style.display = 'block';
}

function mostrarVistaUsuario() {
    document.getElementById('nuevo-contenido').style.display = 'none';
    document.getElementById('vista-usuario').style.display = 'block';
}

function mostrarVistaAdmin() {
    document.getElementById('nuevo-contenido').style.display = 'none';
    document.getElementById('vista-admin').style.display = 'block';
}

function volver() {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('nuevo-contenido').style.display = 'none';
    document.getElementById('vista-usuario').style.display = 'none';
    document.getElementById('vista-admin').style.display = 'none';
    document.getElementById('registro-carrera').style.display = 'none';
}

function mostrarRegistroCarrera() {
    document.getElementById('registro-carrera').style.display = 'block';
}

function cerrarRegistroCarrera() {
    document.getElementById('registro-carrera').style.display = 'none';
}
