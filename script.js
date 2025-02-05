document.getElementById('register').addEventListener('click', registerUser);
document.getElementById('login').addEventListener('click', loginUser);
document.getElementById('logout').addEventListener('click', logoutUser);
document.getElementById('create-character').addEventListener('click', createCharacter);
document.getElementById('attack').addEventListener('click', attack);

let currentUser = null;
let character = null;
let enemy = null;

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("Username:", username);
    console.log("Password:", password);

    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.text())
    .then(text => {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error('Invalid JSON:', text);
            throw error;
        }
    })
    
    .then(data => {
        console.log("Response data:", data);
        showMessage(data.message);
    })
    .catch(error => console.error('Error:', error));
}


function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            showMessage('Login successful!');
            document.getElementById('character-form').style.display = 'block';
            document.getElementById('game-area').style.display = 'block';
            document.getElementById('scoreboard').style.display = 'block';
            loadScoreboard();
        } else {
            showMessage(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function logoutUser() {
    fetch('logout.php', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = null;
            showMessage('Logout successful!');
            document.getElementById('character-form').style.display = 'none';
            document.getElementById('game-area').style.display = 'none';
            document.getElementById('scoreboard').style.display = 'none';
            document.getElementById('character-info').innerText = '';
            document.getElementById('enemy-info').innerText = '';
            document.getElementById('score-list').innerHTML = '';
        } else {
            showMessage(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function createCharacter() {
    const name = document.getElementById('character-name').value;
    fetch('create_character.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, userId: currentUser.id }),
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
        character.health = data.characterHealth;
        enemy.health = data.enemyHealth;

        document.getElementById('character-info').innerText = `Character: ${character.name}, Health: ${character.health}`;
        document.getElementById('enemy-info').innerText = `Enemy: ${enemy.name}, Health: ${enemy.health}`;

        if (enemy.health <= 0) {
            alert('You won!');
            updateScore(true);
            resetBattle();
        } else if (character.health <= 0) {
            alert('You lost!');
            updateScore(false);
            resetBattle();
        }
    })
    .catch(error => console.error('Error:', error));
}

function resetBattle() {
    character.health = 100;
    document.getElementById('character-info').innerText = `Character: ${character.name}, Health: ${character.health}`;

    loadEnemy();
}



function updateScore(isWin) {
    fetch('update_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterId: character.id, isWin: isWin }),
    })
    .then(response => response.json())
    .then(data => {
        loadScoreboard();
    })
    .catch(error => console.error('Error:', error));
}

function loadScoreboard() {
    fetch('load_scoreboard.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
    })
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

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageElement.classList.add('show');
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}
