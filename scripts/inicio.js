// Initialization script for the F1 application

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    console.log('F1 application initialized');

    // Set the initial view
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('nuevo-contenido').style.display = 'none';

    // Add event listeners to buttons
    const userBtn = document.querySelector('.botonUsuario');
    const adminBtn = document.querySelector('.botonAdministrador');

    if (userBtn) {
        userBtn.addEventListener('click', function () {
            console.log('User login selected');
            mostrarVistaUsuario();
        });
    }

    if (adminBtn) {
        adminBtn.addEventListener('click', function () {
            console.log('Admin login selected');
            mostrarVistaAdmin();
        });
    }
});
async function cargarVehiculos() {
    const carros = await getCarros();
    const contenedor = document.getElementById("lista-vehiculos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar

    carros.forEach(carro => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${carro.nombre}</strong> - ${carro.equipo}`;
        contenedor.appendChild(div);
    });
}

async function cargarPilotos() {
    const pilotos = await getPilotos();
    const contenedor = document.getElementById("lista-pilotos");
    contenedor.innerHTML = "";

    pilotos.forEach(piloto => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${piloto.nombre}</strong> - ${piloto.equipo}`;
        contenedor.appendChild(div);
    });
}

async function cargarCircuitos() {
    const circuitos = await getCircuitos();
    const contenedor = document.getElementById("lista-circuitos");
    contenedor.innerHTML = "";

    circuitos.forEach(circuito => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${circuito.nombre}</strong> - ${circuito.ubicacion}`;
        contenedor.appendChild(div);
    });
}
