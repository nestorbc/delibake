<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'delibake');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]));
}

// Selecciona todos los campos necesarios
$result = $conn->query("SELECT nom, email, cognom, message, rating, imagen_path FROM USERSS");

$comentarios = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = [
            'nom' => $row['nom'],
            'email' => $row['email'],
            'cognom' => $row['cognom'],
            'message' => $row['message'],
            'rating' => $row['rating'],
            'imagen_path' => $row['imagen_path']
        ];
    }
}

$conn->close();

echo json_encode($comentarios);
?>
