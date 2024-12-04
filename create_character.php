<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rpg_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($_SESSION['user_id'])) {
    $name = $data['name'];
    $userId = $_SESSION['user_id'];

    $sql = "INSERT INTO characters (name, health, userId) VALUES ('$name', 100, $userId)";

    if ($conn->query($sql) === TRUE) {
        $characterId = $conn->insert_id;
        echo json_encode(array("character" => array("id" => $characterId, "name" => $name, "health" => 100)));
    } else {
        echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
