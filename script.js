document.addEventListener('DOMContentLoaded', cargarPlaylist);

const form = document.getElementById('playlist');
const inputNombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');
const listaCanciones = document.getElementById('lista-canciones');

// Escuchar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir recarga de la página

    const nombreCancion = inputNombre.value.trim();

    if (nombreCancion) {
        guardarCancion(nombreCancion);
        mostrarMensaje('🎶 Canción guardada con éxito!');
        inputNombre.value = ''; // Limpiar el campo de entrada
        cargarPlaylist(); // Actualizar la lista de canciones
    } else {
        mostrarMensaje('⚠️ Por favor, ingresa un nombre válido.');
    }
});

function guardarCancion(cancion) {
    let canciones = JSON.parse(localStorage.getItem('playlist')) || [];
    canciones.push(cancion);
    localStorage.setItem('playlist', JSON.stringify(canciones));
}

function cargarPlaylist() {
    const canciones = JSON.parse(localStorage.getItem('playlist')) || [];
    listaCanciones.innerHTML = ''; // Limpiar la lista

    canciones.forEach((cancion, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${cancion}`;
        listaCanciones.appendChild(li);
    });
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ''), 3000); // Borrar mensaje después de 3 segundos
}
