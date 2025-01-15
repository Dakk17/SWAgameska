<?php
require 'logins.php';

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
            $updateCharacterSql = "UPDATE characters SET health = 100 WHERE id = $characterId";
            $conn->query($updateCharacterSql);
            $updateEnemySql = "UPDATE enemies SET health = 100 WHERE id = $enemyId";
            $conn->query($updateEnemySql);
        }
    } else {
        echo json_encode(array("message" => "Character or enemy not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
