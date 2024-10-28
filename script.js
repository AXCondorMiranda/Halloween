const form = document.getElementById('playlist');
const inputNombre = document.getElementById('nombre');
const listaCanciones = document.getElementById('lista-canciones');
const mensaje = document.getElementById('mensaje');

const URL_BACKEND = 'https://camaralegalfortaleza.com/guardar_cancion.php';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreCancion = inputNombre.value.trim();

    if (nombreCancion) {
        try {
            const response = await fetch(URL_BACKEND, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `nombre=${encodeURIComponent(nombreCancion)}`,
            });

            if (response.ok) {
                mostrarMensaje('🎶 Canción guardada con éxito!');
                inputNombre.value = '';
                cargarCanciones();
            } else {
                mostrarMensaje('❌ Error al guardar la canción.');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('❌ No se pudo conectar con el servidor.');
        }
    }
});

async function cargarCanciones() {
    try {
        const response = await fetch('https://camaralegalfortaleza.com/playlist.txt');
        const texto = await response.text();
        const canciones = texto.trim().split('\n');

        listaCanciones.innerHTML = '';
        canciones.forEach((cancion, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${cancion}`;
            listaCanciones.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar canciones:', error);
    }
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ''), 3000);
}

document.addEventListener('DOMContentLoaded', cargarCanciones);
