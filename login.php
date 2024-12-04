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

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(array("success" => true, "user" => $user));
        } else {
            echo json_encode(array("success" => false, "message" => "Invalid password"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "User not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
