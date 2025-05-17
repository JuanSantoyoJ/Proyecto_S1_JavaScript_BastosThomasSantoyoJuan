// JavaScript for user view navigation

document.addEventListener('DOMContentLoaded', function() {
    // Function to show selected section and hide others
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.contenido-usuario section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }
    
    // Add event listeners for navigation
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && !this.classList.contains('exit-link')) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                showSection(sectionId);
            }
        });
    });
    
    // Show equipos section by default when user view is displayed
    document.addEventListener('userViewShown', function() {
        showSection('equipos');
    });
});

// Custom event when user view is shown
function mostrarVistaUsuario() {
    document.getElementById('nuevo-contenido').style.display = 'none';
    document.getElementById('vista-usuario').style.display = 'block';
    
    // Dispatch custom event
    const event = new Event('userViewShown');
    document.dispatchEvent(event);
}