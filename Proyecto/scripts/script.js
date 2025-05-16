function mostrarOtroContenido() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('nuevo-contenido').style.display = 'block';
}
function volver() {
    document.getElementById('nuevo-contenido').style.display = 'none';
    document.getElementById('contenido-principal').style.display = 'block';
}