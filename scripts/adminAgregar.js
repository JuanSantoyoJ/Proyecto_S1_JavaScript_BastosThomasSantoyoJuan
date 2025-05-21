document.addEventListener('DOMContentLoaded', function() {
  // Botones del dropdown
  document.querySelectorAll('.btn-agregar-dropdown').forEach(btn => {
    btn.onclick = () => abrirModal(btn.dataset.tipo);
  });

  // Modal y formulario
  const modal = document.getElementById('modalAgregar');
  const cerrarModal = document.getElementById('cerrarModalAgregar');
  const modalTitulo = document.getElementById('modalTitulo');
  const form = document.getElementById('formAgregar');

  // Campos por tipo
  const campos = {
    vehiculo: [
      {name: 'nombre', label: 'Nombre', type: 'text', required: true},
      {name: 'equipo', label: 'Equipo', type: 'text', required: true},
      {name: 'motor', label: 'Motor', type: 'text', required: true},
      {name: 'temporada', label: 'Temporada', type: 'text', required: true},
      {name: 'velocidad', label: 'Velocidad (0-100)', type: 'number', required: true},
      {name: 'aceleracion', label: 'Aceleración (0-100)', type: 'number', required: true},
      {name: 'manejo', label: 'Manejo (0-100)', type: 'number', required: true},
      {name: 'imagen', label: 'URL Imagen', type: 'text', required: false},
      {name: 'descripcion', label: 'Descripción', type: 'textarea', required: false}
    ],
    piloto: [
      {name: 'nombre', label: 'Nombre', type: 'text', required: true},
      {name: 'apellido', label: 'Apellido', type: 'text', required: true},
      {name: 'equipo', label: 'Equipo', type: 'text', required: true},
      {name: 'victorias', label: 'Victorias', type: 'number', required: true},
      {name: 'podios', label: 'Podios', type: 'number', required: true},
      {name: 'puntos', label: 'Puntos', type: 'number', required: true},
      {name: 'posicion', label: 'Posición', type: 'number', required: true},
      {name: 'imagen', label: 'URL Imagen', type: 'text', required: false}
    ],
    equipo: [
      {name: 'nombre', label: 'Nombre', type: 'text', required: true},
      {name: 'paisOrigen', label: 'País de Origen', type: 'text', required: true},
      {name: 'bandera', label: 'Emoji Bandera', type: 'text', required: false},
      {name: 'campeonatos', label: 'Campeonatos', type: 'number', required: true},
      {name: 'victorias', label: 'Victorias', type: 'number', required: true},
      {name: 'podios', label: 'Podios', type: 'number', required: true},
      {name: 'director', label: 'Director', type: 'text', required: false},
      {name: 'motor', label: 'Motor', type: 'text', required: false},
      {name: 'sede', label: 'Sede', type: 'text', required: false},
      {name: 'fundacion', label: 'Año de Fundación', type: 'number', required: false},
      {name: 'colorPrincipal', label: 'Color Principal (hex)', type: 'text', required: false},
      {name: 'colorSecundario', label: 'Color Secundario (hex)', type: 'text', required: false},
      {name: 'logo', label: 'URL Logo', type: 'text', required: false},
      {name: 'descripcion', label: 'Descripción', type: 'textarea', required: false}
    ],
    circuito: [
      {name: 'nombreGP', label: 'Nombre GP', type: 'text', required: true},
      {name: 'nombre', label: 'Nombre Circuito', type: 'text', required: true},
      {name: 'pais', label: 'País', type: 'text', required: true},
      {name: 'bandera', label: 'Emoji Bandera', type: 'text', required: false},
      {name: 'fecha', label: 'Fecha', type: 'text', required: true},
      {name: 'longitud', label: 'Longitud (km)', type: 'number', required: true},
      {name: 'curvas', label: 'Curvas', type: 'number', required: true},
      {name: 'vueltas', label: 'Vueltas', type: 'number', required: true},
      {name: 'recordVuelta', label: 'Vuelta Récord', type: 'text', required: false},
      {name: 'recordPiloto', label: 'Piloto Récord', type: 'text', required: false},
      {name: 'recordAno', label: 'Año Récord', type: 'number', required: false},
      {name: 'imagen', label: 'URL Imagen', type: 'text', required: false},
      {name: 'descripcion', label: 'Descripción', type: 'textarea', required: false}
    ]
  };

  // API endpoints
  const apis = {
    vehiculo: "https://682b1d94ab2b5004cb3921b5.mockapi.io/carros",
    piloto: "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/Pilotos",
    equipo: "https://6818a2da5a4b07b9d1d017b8.mockapi.io/prueba/equipos",
    circuito: "https://682b1d94ab2b5004cb3921b5.mockapi.io/circuitos"
  };

  // Abrir modal y renderizar formulario
  function abrirModal(tipo) {
    modalTitulo.textContent = `Agregar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    form.innerHTML = '';
    campos[tipo].forEach(campo => {
      form.innerHTML += `
        <label>${campo.label}${campo.required ? ' *' : ''}</label>
        ${campo.type === 'textarea'
          ? `<textarea name="${campo.name}" ${campo.required ? 'required' : ''}></textarea>`
          : `<input type="${campo.type}" name="${campo.name}" ${campo.required ? 'required' : ''} />`
        }
      `;
    });
    form.innerHTML += `<button type="submit">Guardar</button>`;
    modal.style.display = 'flex';

    // Guardar en la API al enviar
    form.onsubmit = function(e) {
      e.preventDefault();
      const data = {};
      campos[tipo].forEach(campo => {
        data[campo.name] = form.elements[campo.name].value;
      });
      fetch(apis[tipo], {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo guardar');
        modal.style.display = 'none';
        // Recargar la sección correspondiente si tienes funciones globales
        if (window.cargarDatosVehiculos) window.cargarDatosVehiculos();
        if (window.cargarDatosPilotos) window.cargarDatosPilotos();
        if (window.cargarDatosEquipos) window.cargarDatosEquipos();
        if (window.cargarDatosCircuitos) window.cargarDatosCircuitos();
      })
      .catch(err => alert('Error: ' + err.message));
    };
  }

  // Cerrar modal
  cerrarModal.onclick = () => modal.style.display = 'none';
  window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
});