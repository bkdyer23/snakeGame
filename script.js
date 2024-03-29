// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

//define game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// draw game map
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updatScore();
}

// draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
    });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

// Set the position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// draw food
function drawFood() {
    if(gameStarted)
    {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

//generate food
function generateFood() {
    const x = Math.floor(Math.random()*gridSize) + 1;
    const y = Math.floor(Math.random()*gridSize) + 1;
    return {x, y};
}

// Moving the snake
function move(){
    const head = { ...snake[0]};
    switch (direction) 
    {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }
    snake.unshift(head);
    

    if (head.x !== food.x || head.y !== food.y)
    {
        snake.pop();
    }
    else{
        food = generateFood();
        clearInterval(gameInterval);
        increaseSpeed();
        gameInterval = setInterval(()=> {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }
}

// Start game function
function startGame() {
    gameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
        }, gameSpeedDelay);
}

// keypress event listener
function handleKeyPress(event) {
    if((!gameStarted && event.code === 'Space') || 
        (!gameStarted && event.key === ' ')
    )
    {
        startGame();
    }

    switch (event.key)
    {
        case 'ArrowUp':
            if(direction !== 'down')
            {
                direction = 'up';
            }
            
            break;
        case 'ArrowDown':
            if(direction !== 'up')
            {
                direction = 'down';
            }
                break;
        case 'ArrowLeft':
            if(direction !== 'right')
            {
                direction = 'left';
            }
                break;
        case 'ArrowRight':
            if(direction !== 'left')
            {
                direction = 'right';
            }
                break;
        default:
            break;
    }
}

//increase game speed
function increaseSpeed() {
    if(gameSpeedDelay > 150) 
    {
        gameSpeedDelay -= 5;
    }
    else if(gameSpeedDelay > 100)
    {
        gameSpeedDelay -= 3;
    }
    else if(gameSpeedDelay > 50)
    {
        gameSpeedDelay -= 2;
    }
    else if(gameSpeedDelay > 25)
    {
        gameSpeedDelay -= 1;
    }
    console.log(gameSpeedDelay);
}

//check for collision
function checkCollision() {
    const head = snake[0];
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize)
    {
        resetGame();
    } 

    for (let i = 1; i < snake.length; i++)
    {
        if (head.x === snake[i].x && head.y === snake[i].y)
        {
            resetGame();
        }
    }
}

//reset game function
function resetGame() {
    updateHighScore();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    gameSpeedDelay = 200;
    stopGame();
}

//update score
function updatScore() {
    const currentScore = snake.length-1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

//stop game
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

//update high score
function updateHighScore() {
    const currentScore = snake.length-1;
    if(currentScore > highScore) 
    {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
        highScoreText.style.display = 'block';
    }
}

document.addEventListener('keydown', handleKeyPress);
