<?php
header('Content-Type: application/json');

$response = [];

// Función para sanitizar y acortar nombres de archivo
function sanitizeFilename($filename) {
    // Convertir a ASCII eliminando caracteres especiales
    $filename = iconv('UTF-8', 'ASCII//TRANSLIT', $filename);
    // Reemplazar espacios y caracteres no permitidos por guiones bajos
    $filename = preg_replace('/\s+/', '_', $filename);
    $filename = preg_replace('/[^A-Za-z0-9_\-\.]/', '', $filename);
    // Limitar la longitud total del nombre a 50 caracteres
    $maxLongitud = 50;
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $nameWithoutExt = basename($filename, '.' . $extension);
    if (strlen($nameWithoutExt) > $maxLongitud) {
        $nameWithoutExt = substr($nameWithoutExt, 0, $maxLongitud);
    }
    // Reconstruir el nombre completo
    return $nameWithoutExt . ($extension ? '.' . $extension : '');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['imagen'])) {
        $file = $_FILES['imagen'];
        $nombreArchivo = basename($file['name']);

        // Sanitizar y acortar el nombre
        $nombreArchivoSeguro = sanitizeFilename($nombreArchivo);

        $uploadDir = 'Faqs/uploads';

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Crear un nombre único para evitar conflictos
        $nombreUnico = uniqid() . '_' . $nombreArchivoSeguro;
        $rutaDestinoRelativa = $uploadDir . '/' . $nombreUnico;

        if (move_uploaded_file($file['tmp_name'], $rutaDestinoRelativa)) {
            // Conexión a la base de datos
            $conn = new mysqli('localhost', 'root', '', 'delibake');
            if ($conn->connect_error) {
                $response = ['success' => false, 'error' => 'Error de conexión a la BD: ' . $conn->connect_error];
                echo json_encode($response);
                exit;
            }

            // Datos del formulario
            $nom = $_POST['nom'] ?? '';
            $email = $_POST['email'] ?? '';
            $cognom = $_POST['cognom'] ?? '';
            $message = $_POST['message'] ?? '';
            $rating = $_POST['rating'] ?? '';

            // Preparar la consulta
            $stmt = $conn->prepare("INSERT INTO USERS (nom, email, cognom, message, rating, imagen_path) VALUES (?, ?, ?, ?, ?, ?)");
            if (!$stmt) {
                $response = ['success' => false, 'error' => 'Error en preparar la consulta: ' . $conn->error];
                echo json_encode($response);
                $conn->close();
                exit;
            }

            $stmt->bind_param("ssssss", $nom, $email, $cognom, $message, $rating, $rutaDestinoRelativa);

            if ($stmt->execute()) {
                // Construir la URL absoluta correcta
                $scheme = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] : 
                          ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http');
                $host = $_SERVER['HTTP_HOST'];
                $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');

                // Corregir ruta si tiene doble 'Reviews/Reviews/'
                if (strpos($rutaDestinoRelativa, 'Faqs/Faqs/') === 0) {
                    $rutaDestinoRelativa = substr($rutaDestinoRelativa, strlen('Faqs/Faqs/'));
                }

                // Construir URL completa
                $urlImagen = $scheme . '://' . $host . $scriptDir . '/' . $rutaDestinoRelativa;

                $response = ['success' => true, 'rutaImagen' => $urlImagen];
            } else {
                $response = ['success' => false, 'error' => 'Error al guardar datos: ' . $stmt->error];
            }

            $stmt->close();
            $conn->close();
        } else {
            $response = ['success' => false, 'error' => 'Error al mover la imagen'];
        }
    } else {
        $response = ['success' => false, 'error' => 'No se ha enviado ninguna imagen'];
    }
} else {
    $response = ['success' => false, 'error' => 'Método no permitido'];
}

echo json_encode($response);
exit;
?>
