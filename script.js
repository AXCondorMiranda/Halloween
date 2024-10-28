document.getElementById('playlist').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const nombreCancion = document.getElementById('nombre').value;

    // Realizar la solicitud AJAX con Fetch
    fetch('save_song.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'nombre=' + encodeURIComponent(nombreCancion)
    })
    .then(response => response.text())
    .then(data => {
        // Mostrar mensaje de confirmación
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = data;
        mensaje.style.display = 'block';
        
        // Limpiar el campo de texto
        document.getElementById('nombre').value = '';
    })
    .catch(error => console.error('Error:', error));
});
