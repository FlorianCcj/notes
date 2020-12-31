const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const socket = io('http://localhost:3000/');
const debug = 3;
console.log('test');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);


function newGame() {
  if (debug > 2) { console.log('index.js - newGame()'); }
  socket.emit('newGame');
  init();
}

function joinGame() {
  if (debug > 2) { console.log('index.js - joinGame()'); }
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
}

let canvas, ctx;
let playerNumber;
let gameActive = false;

function init() {
  if (debug > 2) { console.log('index.js - init()'); }
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = canvas.height = 600;

  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener('keydown', keydown);
  gameActive = true;
}

function keydown(e) {
  if (debug > 2) { console.log('index.js - keydown()'); }
  socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
  if (debug > 2) { console.log('index.js - paintGame()'); }
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const food = state.food;
  const gridsize = state.gridsize;
  const size = canvas.width / gridsize;

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.players[0], size, SNAKE_COLOUR);
  paintPlayer(state.players[1], size, 'red');
}

function paintPlayer(playerState, size, colour) {
  if (debug > 2) { console.log('index.js - paintPlayer()'); }
  const snake = playerState.snake;

  ctx.fillStyle = colour;
  for (let cell of snake) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

function handleInit(number) {
  if (debug > 2) { console.log('index.js - handleInit()'); }
  playerNumber = number;
}

function handleGameState(gameState) {
  if (debug > 2) { console.log('index.js - handleGameState()'); }
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(data) {
  if (debug > 2) { console.log('index.js - handleGameOver()'); }
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

  if (data.winner === playerNumber) {
    alert('You Win!');
  } else {
    alert('You Lose :(');
  }
}

function handleGameCode(gameCode) {
  if (debug > 2) { console.log('index.js - handleGameCode()'); }
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
  if (debug > 2) { console.log('index.js - handleUnknownCode()'); }
  reset();
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  if (debug > 2) { console.log('index.js - handleTooManyPlayers()'); }
  reset();
  alert('This game is already in progress');
}

function reset() {
  if (debug > 2) { console.log('index.js - reset()'); }
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
