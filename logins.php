<?php
$servername = "localhost";
$username = "hanzliks";
$password = "mojeHeslo";
$dbname = "hanzliks_";

// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "rpg_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
