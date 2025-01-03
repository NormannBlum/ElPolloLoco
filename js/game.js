let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

// Logik für den Startbildschirm
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const muteButton = document.getElementById("mute-fullscreen");

// startButton.addEventListener("click", () => {
//   startScreen.style.display = "none";
//   startGame();
// });

// muteButton.addEventListener("click", () => {
//   isMuted = !isMuted;
//   muteButton.innerText = isMuted ? "Lautstärke an" : "Stumm/Vollbild";
//   toggleMute();
// });

// document.getElementById('start-button').addEventListener('click', () => {
//   document.getElementById('start-screen').style.display = 'none';
// });

function startGame() {
  world = new World(canvas, keyboard);
  console.log("Spiel gestartet!");
}

function toggleMute() {
  console.log(isMuted ? "Stumm geschaltet" : "Lautstärke an");
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

function restartGame() {
  location.reload(); // Seite neu laden
}

function quitGame() {
  alert("Thank you for playing!"); // Zeige eine Nachricht oder beende das Spiel
}
