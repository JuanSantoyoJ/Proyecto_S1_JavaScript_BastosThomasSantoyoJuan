// Initialization script for the F1 application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    console.log('F1 application initialized');
    
    // Set the initial view
    document.getElementById('inicio').style.display = 'block';  
    document.getElementById('nuevo-contenido').style.display = 'none';
    
    // Add event listeners to buttons
    const userBtn = document.querySelector('.botonUsuario');
    const adminBtn = document.querySelector('.botonAdministrador');
    
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            console.log('User login selected');
            mostrarVistaUsuario();
        });
    }
    
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            console.log('Admin login selected');
            mostrarVistaAdmin();
        });
    }
});