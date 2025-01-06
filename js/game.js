let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];
let gameRunning = false;

function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

function startGame() {
  hideStartScreen();
  resetGame();
  world = new World(canvas, keyboard);
  gameRunning = true;
}

function restartGame() {
  resetGame();
  startGame();
}

function goToMainMenu() {
  resetGame();
  showStartScreen();
}

function resetGame() {
  if (world) {
    world.clearAllIntervals();
  }
  gameRunning = false;
  clearAllIntervals();
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
}

function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

function showStartScreen() {
  document.getElementById("start-screen").classList.remove("hidden");
  canvas.style.display = "none";
}

function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.add("hidden");
  }
  canvas.style.display = "block";
}


window.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (event.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (event.code == "ArrowUp") {
    keyboard.UP = true;
  }

  if (event.code == "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (event.code == "Space") {
    keyboard.SPACE = true;
  }

  if (event.code == "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (event.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (event.code == "ArrowUp") {
    keyboard.UP = false;
  }

  if (event.code == "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (event.code == "Space") {
    keyboard.SPACE = false;
  }

  if (event.code == "KeyD") {
    keyboard.D = false;
  }
});

function openOverlay(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
}

