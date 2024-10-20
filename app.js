document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    const startButton = document.getElementById('startButton')
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false
    let gameStarted = false 

    startButton.addEventListener('click', startGame)

    function startGame() {
        if (!gameStarted) {
            gameStarted = true
            alert.innerHTML = ''
            position = 0 
            isGameOver = false 
            generateObstacles() 
            startButton.style.display = 'none'
        }
    }

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping && !isGameOver) { 
                jump()
            }
        }
    }

    document.addEventListener('keyup', control)

    function jump() {
        isJumping = true
        let count = 0
        let timerId = setInterval(function () {
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 3
                    count--
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                }, 20)
            }

            position += 20
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles() {
        if (!isGameOver) {
            let randomTime = Math.random() * 4000
            let obstaclePosition = 1000
            const obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePosition + 'px'

            let timerId = setInterval(function () {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                    clearInterval(timerId)
                    alert.innerHTML = 'Game Over!'
                    isGameOver = true
                    // Remover children da grid
                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }
                obstaclePosition -= 10
                obstacle.style.left = obstaclePosition + 'px'
            }, 20)
            setTimeout(generateObstacles, randomTime)
        }
    }
})
