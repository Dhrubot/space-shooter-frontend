// const app = new App()

const userShip = document.getElementById('player-ship')
const mainPlayArea = document.getElementById('main-play-area')
const scoreCounter = document.getElementById('score')


document.addEventListener("keydown", function (e) {
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
});


function moveShipLeft(){
    let leftPosition = userShip.style.left.replace("px", "");
    let left = parseInt(leftPosition, 10);

    if (left > 10) {
        userShip.style.left = `${left - 20}px`;
    }
}

function moveShipRight() {
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
    let xPosition = parseInt(window.getComputedStyle(userShip).getPropertyValue('bottom'))
    let yPosition = parseInt(window.getComputedStyle(userShip).getPropertyValue('left'))

    let newLaser = document.createElement('img')
    newLaser.src = 'images/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.bottom = `${xPosition + 40}px`
    newLaser.style.left = `${yPosition - 30}px`

    return newLaser
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.bottom)
        let enemies = document.querySelectorAll('.active-enemy')
        enemies.forEach(enemy=> {
            if (shootEmDown(laser,enemy)) {
                laser.remove()
                enemy.src = "images/explosion.png"
                enemy.classList.remove('active-enemy')
                enemy.classList.add('dead-enemy')
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

function createEnemyShip() {

        let newEnemyShip = document.createElement('img')
        newEnemyShip.src = 'images/enemy-ship.png'
        newEnemyShip.classList.add('active-enemy')
        newEnemyShip.style.bottom = '545px'
        newEnemyShip.style.left = `${Math.floor(Math.random() * 1200)}px`
        return newEnemyShip

}

document.querySelector('#start-button').addEventListener('click', (e) => {
    e.preventDefault()
    startGame()
})

function startGame() {
    document.querySelector('#start-button').style.display = 'none'
    let ship = createEnemyShip()
    mainPlayArea.appendChild(ship)
    moveEnemyShip(ship)
}

function moveEnemyShip(enemyShip) {
    let enemyShipMovement = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemyShip).getPropertyValue('bottom'))
        if (xPosition <= 40) {
            if (enemyShip.classList.contains('dead-enemy')) {
                enemyShip.remove()
            } else {
                gameOver()
                clearInterval(enemyShipMovement)
            }    
          
        } else {
            enemyShip.style.bottom = `${xPosition - 20}px`
        }

    }, 1000)
}


function gameOver(){
    alert("Game Over!")
}


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