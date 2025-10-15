<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require_once "db.php";

// Leer el JSON del cuerpo de la petición
$input = json_decode(file_get_contents("php://input"), true);

$content = trim($input["contenido"] ?? '');
$username = trim($input["usuario"] ?? 'Anónimo');

if (!$content) {
    http_response_code(400);
    echo json_encode(["error" => "El contenido de la reseña es requerido"]);
    exit;
}

$sql = "INSERT INTO opiniones (usuario, contenido) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $content );

if ($stmt->execute()) {
    $last_id = $stmt->insert_id;

    // Obtener la reseña insertada
    $sql = "SELECT * FROM opiniones WHERE id_opinion = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $last_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $review = $result->fetch_assoc();

    http_response_code(201);
    echo json_encode($review);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar la reseña"]);
}
?>