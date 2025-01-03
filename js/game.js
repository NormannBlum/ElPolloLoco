let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
  world = new World(canvas, keyboard);
}

function restartGame() {
  location.reload();
}

function goToMainMenu() {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
  if (world) {
    world.clearAllIntervals();
    world = null;
  }
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

