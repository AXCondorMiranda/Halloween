const form = document.getElementById('playlist');
const inputNombre = document.getElementById('nombre');
const listaCanciones = document.getElementById('lista-canciones');
const mensaje = document.getElementById('mensaje');

// URL del backend
const URL_BACKEND = 'https://camaralegalfortaleza.com/guardar_cancion.php';

// Evento para enviar una nueva canción
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir recarga de la página

    const nombreCancion = inputNombre.value.trim();
    if (nombreCancion) {
        try {
            const response = await fetch(URL_BACKEND, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `nombre=${encodeURIComponent(nombreCancion)}`,
            });

            if (response.ok) {
                mostrarMensaje('🎶 Canción guardada con éxito!');
                inputNombre.value = ''; // Limpiar input
                await cargarCanciones(); // Asegurarse de que la lista se actualice
            } else {
                mostrarMensaje('❌ Error al guardar la canción.');
            }
        } catch (error) {
            console.error('Error al enviar canción:', error);
            mostrarMensaje('❌ No se pudo conectar con el servidor.');
        }
    }
});

// Cargar la lista de canciones desde el servidor
async function cargarCanciones() {
    try {
        // Evitar que se cachee la respuesta añadiendo un parámetro único
        const response = await fetch(`${URL_BACKEND}?_=${new Date().getTime()}`);

        if (!response.ok) {
            throw new Error(`Error al obtener canciones: ${response.statusText}`);
        }

        const texto = await response.text(); // Leer como texto
        const canciones = texto ? JSON.parse(texto) : []; // Convertir a JSON si no está vacío

        mostrarCanciones(canciones); // Mostrar canciones en la lista
    } catch (error) {
        console.error('Error al cargar canciones:', error);
        mostrarMensaje('❌ No se pudo conectar con el servidor.');
    }
}

// Mostrar canciones en la lista
function mostrarCanciones(canciones) {
    listaCanciones.innerHTML = ''; // Limpiar lista
    canciones.forEach((cancion, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${cancion}`; // Mostrar la canción con índice
        listaCanciones.appendChild(li);
    });
}

// Mostrar mensaje de estado
function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ''), 3000);
}

// Cargar las canciones al abrir la página
document.addEventListener('DOMContentLoaded', cargarCanciones);
