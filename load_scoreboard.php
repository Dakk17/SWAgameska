<?php
session_start();
require 'logins.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId'])) {
    $userId = $data['userId'];

    $sql = "SELECT name, points FROM characters WHERE userId = $userId ORDER BY points DESC";
    $result = $conn->query($sql);

    $scores = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }
    }

    echo json_encode(array("scores" => $scores));
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
