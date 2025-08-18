<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$nom = $input['nom'];
$message = $input['message'];

/* include 'configDB.php'; */

$conn = new mysqli('localhost', 'root', '', 'delibake');

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error]));
}

// Para evitar problemas con comillas, usar prepared statements
$stmt = $conn->prepare("DELETE FROM USERS WHERE nom = ? AND message = ?");
$stmt->bind_param("ss", $nom, $message);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$conn->close();
?>
