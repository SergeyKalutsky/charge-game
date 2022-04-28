function setHealthBarColor(health) {
    const element = document.getElementById('health')
    const robot = document.getElementById('robot')
    if (health < 15) {
        element.style.backgroundColor = '#ff1100'
        robot.src = './images/1.png'
    } else if (health < 35) {
        element.style.backgroundColor = '#ff7700'
        robot.src = './images/2.png'
    } else if (health < 50) {
        element.style.backgroundColor = '#ff7700'
        robot.src = './images/3.png'
    } else if (health < 70) {
        element.style.backgroundColor = '#aeff00'
        robot.src = './images/4.png'
    } else if (health < 90) {
        element.style.backgroundColor = '#00ff37'
        robot.src = './images/5.png'
    } else if (health < 100) {
        element.style.backgroundColor = '#f6ff00'
        robot.src = './images/6.png'
    }

}

function addHealth() {
    const element = document.getElementById('health');
    let health = parseInt(element.style.width.replace('%', ''))
    if (health <= 95) {
        health += 5
    } else {
        health = 100
    }
    setHealthBarColor(health)
    element.style.width = `${health}%`
}

function depleteHealth() {
    const element = document.getElementById('health');
    let health = parseInt(element.style.width.replace('%', ''))
    if (health > 0 && health < 100) {
        health -= 1
    }
    element.style.width = `${health}%`
    setHealthBarColor(health)
    setTimeout(depleteHealth, 4000);
}

function sortPlayers() {
    const players = document.getElementById('players')
    const elements = players.children
    const array = [];
    for (var i = elements.length >>> 0; i--;) {
        array[i] = elements[i];
    }
    array.sort(function (a, b) {
        return Number(b.querySelector('.points').textContent) - Number(a.querySelector('.points').textContent);
    });
    players.innerHTML = ''
    i = 0
    for (const element of array) {
        switch (i) {
            case 0:
                element.style.border = '2px solid gold'
                break
            case 1:
                element.querySelector('.points').textContent !== '0' ?
                    element.style.border = '2px solid rgb(192,192,192)' :
                    null
                break
            case 2:
                element.querySelector('.points').textContent !== '0' ?
                    element.style.border = '2px solid rgb(205,127,50)' :
                    null
                break
            default:
                element.style.border = 'none'
                break

        }
        i += 1
        players.appendChild(element)
    }
}

function addPlayerHTML(playerName) {
    const players = document.getElementById('players')
    const li = document.createElement('li')
    let span = document.createElement('span')
    const button = document.createElement('button')
    span.className = 'name'
    span.textContent = playerName
    li.appendChild(span)
    span = document.createElement('span')
    span.className = 'points'
    span.textContent = '0'
    li.appendChild(span)
    button.className = 'increment'
    button.textContent = '+'
    li.appendChild(button)
    button.addEventListener('click', () => {
        const li = button.parentElement
        const points = li.querySelector('.points')
        points.textContent = parseInt(points.textContent) + 1
        addHealth()
        sortPlayers()
    })
    players.appendChild(li)
}

function addPlayer() {
    const input = document.getElementById("player-input");
    input.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (input.value !== '') {
                addPlayerHTML(input.value)
            }
            input.value = ''
        }
    });
}

depleteHealth();
addPlayer();