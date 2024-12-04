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

if (isset($data['characterId']) && isset($data['enemyId'])) {
    $characterId = $data['characterId'];
    $enemyId = $data['enemyId'];

    // Fetch character and enemy data
    $characterSql = "SELECT health FROM characters WHERE id = $characterId";
    $enemySql = "SELECT health FROM enemies WHERE id = $enemyId";
    $characterResult = $conn->query($characterSql);
    $enemyResult = $conn->query($enemySql);

    if ($characterResult->num_rows > 0 && $enemyResult->num_rows > 0) {
        $character = $characterResult->fetch_assoc();
        $enemy = $enemyResult->fetch_assoc();

        if ($character['health'] > 0 && $enemy['health'] > 0) {
            // Calculate damage
            $characterDamage = rand(10, 30);
            $enemyDamage = rand(10, 30);

            // Update health
            $newCharacterHealth = max(0, $character['health'] - $enemyDamage);
            $newEnemyHealth = max(0, $enemy['health'] - $characterDamage);

            // Update character health
            $updateCharacterSql = "UPDATE characters SET health = $newCharacterHealth WHERE id = $characterId";
            $conn->query($updateCharacterSql);

            // Update enemy health
            $updateEnemySql = "UPDATE enemies SET health = $newEnemyHealth WHERE id = $enemyId";
            $conn->query($updateEnemySql);

            echo json_encode(array("characterHealth" => $newCharacterHealth, "enemyHealth" => $newEnemyHealth));
        } else {
            // Reset character health
            $updateCharacterSql = "UPDATE characters SET health = 100 WHERE id = $characterId";
            $conn->query($updateCharacterSql);

            // Load new enemy
            $newEnemySql = "SELECT * FROM enemies ORDER BY RAND() LIMIT 1";
            $newEnemyResult = $conn->query($newEnemySql);
            if ($newEnemyResult->num_rows > 0) {
                $newEnemy = $newEnemyResult->fetch_assoc();
                echo json_encode(array("characterHealth" => 100, "enemyHealth" => $newEnemy['health'], "newEnemy" => $newEnemy));
            } else {
                echo json_encode(array("message" => "No enemies found"));
            }
        }
    } else {
        echo json_encode(array("message" => "Character or enemy not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
