document.getElementById('create-character').addEventListener('click', createCharacter);
document.getElementById('attack').addEventListener('click', attack);

let character = null;
let enemy = null;

function createCharacter() {
    const name = document.getElementById('character-name').value;
    fetch('create_character.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
    })
    .then(response => response.json())
    .then(data => {
        character = data.character;
        document.getElementById('character-info').innerText = `Character: ${character.name}, Health: ${character.health}`;
        loadEnemy();
    })
    .catch(error => console.error('Error:', error));
}

function loadEnemy() {
    fetch('load_enemy.php')
    .then(response => response.json())
    .then(data => {
        enemy = data.enemy;
        document.getElementById('enemy-info').innerText = `Enemy: ${enemy.name}, Health: ${enemy.health}`;
    })
    .catch(error => console.error('Error:', error));
}

function attack() {
    fetch('attack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterId: character.id, enemyId: enemy.id }),
    })
    .then(response => response.json())
    .then(data => {
        character = data.character;
        enemy = data.enemy;
        document.getElementById('character-info').innerText = `Character: ${character.name}, Health: ${character.health}`;
        document.getElementById('enemy-info').innerText = `Enemy: ${enemy.name}, Health: ${enemy.health}`;
        if (enemy.health <= 0) {
            alert('You won!');
            loadScoreboard();
        } else if (character.health <= 0) {
            alert('You lost!');
            loadScoreboard();
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadScoreboard() {
    fetch('load_scoreboard.php')
    .then(response => response.json())
    .then(data => {
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = '';
        data.scores.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.innerText = `${score.name}: ${score.points}`;
            scoreList.appendChild(scoreItem);
        });
    })
    .catch(error => console.error('Error:', error));
}