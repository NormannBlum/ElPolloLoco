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
  resetGame();
  hideStartScreen();
  world = new World(canvas, keyboard);
  gameRunning = true;
}

/**
 * Setzt das Spiel zurück, entfernt aktive Intervalle und versteckt Endbildschirme.
 */
function resetGame() {
  if (world) {
    world.clearAllIntervals();
    world = null;
  }
  level1 = resetLevel();
  clearAllIntervals();
  gameRunning = false;
  hideEndScreens();
}

/**
 * Versteckt alle Endbildschirme.
 */
function hideEndScreens() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
}

/**
 * Kehrt zum Hauptmenü zurück, indem das Spiel zurückgesetzt und der Startbildschirm angezeigt wird.
 */
function goToMainMenu() {
  resetGame();
  showStartScreen();
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
  document.getElementById(id).classList.remove("hidden");
}

/**
 * Schließt ein Overlay, indem es versteckt wird.
 * @param {string} id - Die ID des zu schließenden Overlays.
 */
function closeOverlay(id) {
  document.getElementById(id).classList.add("hidden");
}

/**
 * Initialisiert die Stummschaltfunktionalität, wenn das DOM vollständig geladen ist.
 */
document.addEventListener("DOMContentLoaded", () => {
  const muteButton = document.getElementById("mute");
  const muteIcon = document.getElementById("mute-icon");
  let isMuted = false;

  /**
   * Event-Listener für den Klick auf den Stummschalt-Button.
   * Schaltet zwischen "stumm" und "laut" um und aktualisiert das Symbol entsprechend.
   */
  muteButton.addEventListener("click", () => {
    isMuted = !isMuted;

    if (isMuted) {
      muteIcon.src = "img_pollo_locco/img/10_project_img/soundon.svg";
      muteIcon.alt = "Sound On";
      muteAllSounds();
    } else {
      muteIcon.src = "img_pollo_locco/img/10_project_img/mute.svg";
      muteIcon.alt = "Mute";
      unmuteAllSounds();
    }
  });

  function muteAllSounds() {
    document.querySelectorAll("audio").forEach((audio) => (audio.muted = true));
  }

  function unmuteAllSounds() {
    document
      .querySelectorAll("audio")
      .forEach((audio) => (audio.muted = false));
  }
});

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
