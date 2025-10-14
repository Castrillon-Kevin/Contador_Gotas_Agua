<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once "db.php";

//mostrar todas las reseñas, tanto visibles como no visibles
$sql = "SELECT * FROM opiniones";

$result = $conn->query($sql);

$resenas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $resenas[] = $row;
    }
}

echo json_encode($resenas);
?>