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

if (isset($data['characterId']) && isset($data['isWin'])) {
    $characterId = $data['characterId'];
    $isWin = $data['isWin'];

    if ($isWin) {
        $sql = "UPDATE characters SET points = points + 10 WHERE id = $characterId";
    } else {
        $sql = "UPDATE characters SET points = points - 5 WHERE id = $characterId";
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Score updated successfully"));
    } else {
        echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
