<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombreCancion = $_POST['nombre'];
    
    $archivo = 'playlist.txt';

    file_put_contents($archivo, $nombreCancion . PHP_EOL, FILE_APPEND);

    echo "🎶 Canción guardada con éxito!";
}
?>
