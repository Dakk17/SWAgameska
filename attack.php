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
$characterId = $data['characterId'];
$enemyId = $data['enemyId'];

$characterDamage = rand(10, 30);
$enemyDamage = rand(10, 30);

$conn->query("UPDATE characters SET health = health - $enemyDamage WHERE id = $characterId");
$conn->query("UPDATE enemies SET health = health - $characterDamage WHERE id = $enemyId");

$character = $conn->query("SELECT * FROM characters WHERE id = $characterId")->fetch_assoc();
$enemy = $conn->query("SELECT * FROM enemies WHERE id = $enemyId")->fetch_assoc();

echo json_encode(array("character" => $character, "enemy" => $enemy));

$conn->close();
?>