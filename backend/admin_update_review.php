<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once "db.php";

$id = $_POST['id_opinion'];
$content = $_POST['contenido'];
$visible = $_POST['visible'];

$sql = "UPDATE opiniones SET contenido = ?, visible = ? WHERE id_opinion = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $content, $visible, $id);

$response = [];

if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = $conn->error;
}

echo json_encode($response);