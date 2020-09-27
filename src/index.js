const app = new App()

const mainPlayArea = document.getElementById('main-play-area')
const header = document.getElementById('header')
let createEnemyShipsInterval
let enemyShipMovement

                // -----User Logic-------

function userShipMovement(e) {
    if (e.key === "ArrowLeft") {
        e.preventDefault()
        moveShipLeft()
    } else if (e.key === "ArrowRight") {
        e.preventDefault()
        moveShipRight()
    } else if (e.key === " ") {
        e.preventDefault()
        fireLaser()
    }
}

function createPlayerShip() {
    const playerShip = document.createElement('div')
    playerShip.style = "left: 630px;"
    playerShip.id = 'player-ship'
    const playerShipImg = document.createElement('img')
    playerShipImg.src = 'images/player-ship.png'
    playerShipImg.id = 'ship-image'
    playerShip.appendChild(playerShipImg)
    return playerShip
}

function moveShipLeft(){
    const userShip = document.getElementById('player-ship')
    let leftPosition = userShip.style.left.replace("px", "");
    let left = parseInt(leftPosition, 10);

    if (left > 10) {
        userShip.style.left = `${left - 20}px`;
    }
}

function moveShipRight() {
    const userShip = document.getElementById('player-ship')
    let leftPosition = userShip.style.left.replace("px", "");
    let left = parseInt(leftPosition, 10);

    if (left < 1210) {
        userShip.style.left = `${left + 20}px`;
    }
}

function fireLaser() {
    let laser = createLaser()
    mainPlayArea.appendChild(laser)
    moveLaser(laser)
}

function createLaser() {
    const userShip = document.getElementById('player-ship')
    let xPosition = parseInt(window.getComputedStyle(userShip).getPropertyValue('bottom'))
    let yPosition = parseInt(window.getComputedStyle(userShip).getPropertyValue('left'))

    let newLaser = document.createElement('img')
    newLaser.src = 'images/laser.png'
    newLaser.className = 'laser'
    newLaser.style.bottom = `${xPosition + 40}px`
    newLaser.style.left = `${yPosition - 30}px`

    return newLaser
}

function moveLaser(laser) {
    const scoreCounter = document.getElementById('score')
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.bottom)
        let enemies = document.querySelectorAll('.active-enemy')
        enemies.forEach(enemy=> {
            if (shootEmDown(laser,enemy)) {
                laser.parentNode.removeChild(laser)
                enemy.src = "images/explosion.png"
                enemy.classList.remove('active-enemy')
                enemy.classList.add('dead-enemy', 'fade-out')
                scoreCounter.innerText = parseInt(scoreCounter.innerText) + 10
            }
        })
        if (xPosition >= 510) {
            laser.remove()
        } else {
            laser.style.bottom = `${xPosition + 10}px`
        }
    }, 10)
}

                    // ----Enemy logic-----


function createEnemyShips() {
    let enemyShips = []
    let i = 0
    while (i < 5){
        let newEnemyShip = document.createElement('img')
        newEnemyShip.src = 'images/enemy-ship.png'
        newEnemyShip.className = 'active-enemy'
        newEnemyShip.style.bottom = '500px'
        newEnemyShip.style.left = `${Math.floor(Math.random() * 1200)}px`
        enemyShips.push(newEnemyShip)
        i++
    }

    return enemyShips
}



function moveEnemyShip(enemyShip) {
    enemyShipMovement = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemyShip).getPropertyValue('bottom'))
        if (xPosition <= 40) {
            if (enemyShip.classList.contains("dead-enemy")) {
                enemyShip.remove()
            } else {
                gameOver()
            }    
          
        } else {
            enemyShip.style.bottom = `${xPosition - 20}px`
        }

    }, 1000)
}




                // -----Shooting logic-----


function shootEmDown(laser, enemy) {
    // debugger
    let laserBottom = parseInt(laser.style.bottom)
    let laserleft = parseInt(laser.style.left)
    let laserTop = laserBottom + 100 

    let enemyLeft = parseInt(enemy.style.left)
    let enemyRight = enemyLeft - 50
    let enemyBottom = parseInt(enemy.style.bottom)

    if (laserTop >= enemyBottom) {
        // debugger
        if ((laserleft <= enemyLeft) && (laserleft >= enemyRight) ) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
   
}


function exitFuncListener() {
    document.getElementById('exit-button').addEventListener('click', (e) => {
        e.preventDefault()
        gameOver()
    })
} 


// -------Starting Game-----

function startGame() {
    document.querySelector('#start-button').style.display = 'none'
    document.getElementById('user-container').style.display = 'none'
    document.getElementById('nickname-container').style.display = 'none'

    
    document.addEventListener("keydown", userShipMovement)
    createScoreCounter()
    createExitButton()
    exitFuncListener()
    let playerShip = createPlayerShip()
    mainPlayArea.append(playerShip)
    createEnemyShipsInterval = setInterval(() => {
        let enemyShips = createEnemyShips()
        enemyShips.map(enemyShip => {
            mainPlayArea.append(enemyShip)
            moveEnemyShip(enemyShip)
        })
    }, 5000)
}

function createScoreCounter(){
    let scoreCounterDiv = document.createElement('div')
    scoreCounterDiv.id = 'score-counter'
    scoreCounterDiv.innerHTML = `<h3><span style="color:SlateGray">${app.user.nickname}'s Score:</span> <span id="score" style="color: red">0</span></h3>`
    header.append(scoreCounterDiv)
}

function createExitButton() {
    let exitButtonDiv = document.createElement('div')
    exitButtonDiv.id = 'exit-container'
    exitButtonDiv.innerHTML = `<button id="exit-button"> Exit Game </button>`
    header.append(exitButtonDiv)
}


                // ------GameOver Logic--------

function gameOver() {
    document.removeEventListener("keydown", userShipMovement)
    let enemies = document.querySelectorAll('.active-enemy')
    enemies.forEach((enemy) => enemy.remove())
    let lasers = document.querySelectorAll(".laser")
    lasers.forEach(laser => laser.remove())
    let playerShip = document.getElementById('player-ship')
    playerShip.remove()
    createGameOverMsg()
    // createUserSearchDiv()

    clearInterval(createEnemyShipsInterval)
    clearInterval(enemyShipMovement)
    saveGame()
    header.remove()
    // renderHighscore()
}

function saveGame() {
    let score = document.getElementById('score').innerText 
    let gamesData = new GamesData
    gamesData.createNewGame(score, app.user.nickname) 
}

// function renderHighscore(){
//     let gamesData = new GamesData
//     document.addEventListener("submit", (e) => {
//         e.preventDefault()
//         let gameOverDiv = document.getElementById('game-over')
//         let highScoreContainer = document.getElementById('high-score-container')
//         if (highScoreContainer && gameOverDiv) {
//             highScoreContainer.remove()
//             gameOverDiv.remove()
//         }
//         let nickName = e.target[0].value.toLowerCase()
//         gamesData.sortByUser(nickName)
//     })
// }

function createGameOverMsg() {
    let score = document.getElementById('score').innerText
    let gameOverDiv = document.createElement('div')
    gameOverDiv.id = "game-over"
    gameOverDiv.innerHTML = `<h2> Game Over!<br>Your score is ${score}!</h2>`
    gameOverDiv.style = 'top: 10px; color: LightBlue;'
    mainPlayArea.append(gameOverDiv)
}




// Search input for sorting the game scores by username

// function createUserSearchDiv() {
//     let searchBarDiv = document.createElement('div')
//     searchBarDiv.innerHTML += `<form id="search-user-form">
//         <input type = "text" id = "search" placeholder = "Search by nickname to checkout your score">
//             <input type="submit" id="search-button" value="Search">
//                 </form>`
//     mainPlayArea.append(searchBarDiv)
// }

