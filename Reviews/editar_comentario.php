<?php
// editar_comentario.php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['nom'], $input['cognom'], $input['message'], $input['rating'])) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

$nom = $input['nom'];
$cognom = $input['cognom'];
$message = $input['message'];
$rating = intval($input['rating']);

$conn = new mysqli('localhost', 'root', '', 'delibake');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
}

// Actualizar el comentario
$stmt = $conn->prepare("UPDATE USER SET message = ?, rating = ? WHERE nom = ? AND cognom = ?");
$stmt->bind_param('siss', $message, $rating, $nom, $cognom);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al actualizar']);
}

$stmt->close();
$conn->close();
?>
