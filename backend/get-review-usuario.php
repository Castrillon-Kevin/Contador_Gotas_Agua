<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once "db.php";

// Solo mostrar reseñas visibles
$sql = "SELECT * FROM opiniones WHERE visible = 1";
$result = $conn->query($sql);

$resenas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $resenas[] = $row;
    }
}

echo json_encode($resenas);
?>