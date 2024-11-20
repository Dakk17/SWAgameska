<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rpg_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];

$sql = "INSERT INTO characters (name, health) VALUES ('$name', 100)";

if ($conn->query($sql) === TRUE) {
    $characterId = $conn->insert_id;
    echo json_encode(array("character" => array("id" => $characterId, "name" => $name, "health" => 100)));
} else {
    echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
}

$conn->close();
?>