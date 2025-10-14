<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "contador_gotas_agua";


$conn = new mysqli($host, $user, $pass, $dbname, 3306);
if ($conn->connect_error) {
    die("Error de conexion;" . $conn->connect_error);
}
?>
