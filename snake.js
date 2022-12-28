const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOver = document.getElementById('gameOver');
const velocidad = document.getElementById('aumentar')

//game Settings
const tamBoard = 10;
const Speed =1000;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

const controlls = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowLeft: -1,
    ArrowRight: 1
};

//game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));

}

const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if (type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}


const addFood = () => {
    
    score++;
    updateScore();
    createRandomFood();
}

const gameOvers = () => {
    gameOver.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}

const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + controlls[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');

    if (newSquare < 0 || newSquare > tamBoard * tamBoard ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
            boardSquares[row][column] === squareTypes.snakeSquare)) {
        gameOvers();
        
    } else {
        snake.push(newSquare)
        if(boardSquares[row][column]===squareTypes.foodSquare){
            addFood();
        }else{
            const emptySquare=snake.shift();
            drawSquare(emptySquare,'emptySquare');
        }
        drawSnake();  
    }
}
const setDirection = newDirection => {
    direction = newDirection

}

const directionEvent = key => {
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code);
            break;


    }
}

const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

const updateScore = () => {
    scoreBoard.innerText = score;
}

const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);


        })
    })
}

const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(tamBoard), () => new Array(tamBoard).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

const startGame = () => {
    setGame();
    gameOver.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent)
    moveInterval = setInterval(() => moveSnake(), Speed)
}

//aumentar velocidad
const aumentarVelocidad = () => {
    Speed  - 100;
    moveInterval = setInterval(() => moveSnake(), Speed)
    console.log(Speed);
}

velocidad.addEventListener('click',aumentarVelocidad)

startButton.addEventListener('click', startGame);

