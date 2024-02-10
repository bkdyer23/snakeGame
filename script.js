// Define HTML elements
const board = document.getElementById("game-board");

//define game variables
let snake = [{x: 10, y: 10}];
// draw game map
function draw() {
    board.innerHTML = '';
    drawSnake();
}

// draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
    });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

draw();