<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rpg_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM enemies ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $enemy = $result->fetch_assoc();
    echo json_encode(array("enemy" => $enemy));
} else {
    echo json_encode(array("message" => "No enemies found"));
}

$conn->close();
?>