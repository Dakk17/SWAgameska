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
    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
        } else {
            alert('Registration failed: ' + data.message);
        }
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
            alert('Login successful!');
            document.getElementById('character-form').style.display = 'block';
            document.getElementById('game-area').style.display = 'block';
            document.getElementById('scoreboard').style.display = 'block';
            loadScoreboard();
        } else {
            alert('Login failed: ' + data.message);
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
            alert('Logout successful!');
            document.getElementById('character-form').style.display = 'none';
            document.getElementById('game-area').style.display = 'none';
            document.getElementById('scoreboard').style.display = 'none';
            document.getElementById('character-info').innerText = '';
            document.getElementById('enemy-info').innerText = '';
            document.getElementById('score-list').innerHTML = '';
        } else {
            alert('Logout failed: ' + data.message);
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
    const characterDamage = Math.floor(Math.random() * 30) + 10;
    const enemyDamage = Math.floor(Math.random() * 30) + 10;

    character.health -= enemyDamage;
    enemy.health -= characterDamage;

    document.getElementById('character-info').innerText = `Character: ${character.name}, Health: ${character.health}`;
    document.getElementById('enemy-info').innerText = `Enemy: ${enemy.name}, Health: ${enemy.health}`;

    if (enemy.health <= 0) {
        alert('You won!');
        updateScore(true);
    } else if (character.health <= 0) {
        alert('You lost!');
        updateScore(false);
    }
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
