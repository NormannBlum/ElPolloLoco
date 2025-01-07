let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];
let gameRunning = false;

/**
 * Initialisiert das Spiel und zeigt den Startbildschirm an.
 */
function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

/**
 * Startet das Spiel, indem die Welt erstellt und der Startbildschirm ausgeblendet wird.
 */
function startGame() {
  hideStartScreen();
  resetGame();
  world = new World(canvas, keyboard);
  gameRunning = true;
}

/**
 * Startet das Spiel neu, indem es zurückgesetzt und erneut gestartet wird.
 */
function restartGame() {
  resetGame();
  startGame();
}

/**
 * Kehrt zum Hauptmenü zurück, indem das Spiel zurückgesetzt und der Startbildschirm angezeigt wird.
 */
function goToMainMenu() {
  resetGame();
  showStartScreen();
}

/**
 * Setzt das Spiel zurück, entfernt aktive Intervalle und versteckt Endbildschirme.
 */
function resetGame() {
  if (world) {
    world.clearAllIntervals();
  }
  gameRunning = false;
  clearAllIntervals();
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
}

/**
 * Entfernt alle aktiven Intervalle und leert die Liste der Intervalle.
 */
function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

/**
 * Zeigt den Startbildschirm an und versteckt das Canvas-Element.
 */
function showStartScreen() {
  document.getElementById("start-screen").classList.remove("hidden");
  canvas.style.display = "none";
}

/**
 * Versteckt den Startbildschirm und zeigt das Canvas-Element.
 */
function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.add("hidden");
  }
  canvas.style.display = "block";
}

/**
 * Öffnet ein Overlay, indem es sichtbar gemacht wird.
 * @param {string} id - Die ID des zu öffnenden Overlays.
 */
function openOverlay(id) {
  document.getElementById(id).classList.remove('hidden');
}

/**
 * Schließt ein Overlay, indem es versteckt wird.
 * @param {string} id - Die ID des zu schließenden Overlays.
 */
function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = true;
  if (event.code === "ArrowLeft") keyboard.LEFT = true;
  if (event.code === "ArrowUp") keyboard.UP = true;
  if (event.code === "ArrowDown") keyboard.DOWN = true;
  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "KeyD") keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;
  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "KeyD") keyboard.D = false;
});
