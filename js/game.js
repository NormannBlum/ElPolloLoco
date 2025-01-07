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
  backgroundMusic.play();
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

/**
 * Überprüft die Bildschirmorientierung und zeigt eine Warnung an, wenn das Gerät im Hochformat ist.
 */
function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  
  // Prüfen, ob das Gerät im Hochformat ist und die Breite < 1200px
  if (window.innerWidth < 1200 && window.innerWidth < window.innerHeight) {
      warning.classList.add("visible"); // Warnung anzeigen
  } else {
      warning.classList.remove("visible"); // Warnung ausblenden
  }
}

// Event-Listener für Änderungen der Fenstergröße und beim Laden der Seite
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

let backgroundMusic = new Audio('audio/background_music.mp3');
let sounds = {
  throwBottle: new Audio('audio/throw_bottle.mp3'),
  jump: new Audio('audio/jump.wav'),
  snore: new Audio('audio/snore.mp3'),
  hurt: new Audio('audio/hurt.mp3'),
  dead: new Audio('audio/dead.mp3'),
  chickenDead: new Audio('audio/chicken_dead.mp3'),
  endbossHurt: new Audio('audio/endboss_hurt.mp3'),
  endbossDead: new Audio('audio/endboss_dead.mp3')
};

document.addEventListener("DOMContentLoaded", () => {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();

  const muteButton = document.getElementById("mute");
  const muteIcon = document.getElementById("mute-icon");
  let isMuted = false;

  muteButton.addEventListener("click", () => {
    isMuted = !isMuted;

    if (isMuted) {
      muteIcon.src = "img_pollo_locco/img/10_project_img/soundon.svg";
      muteAllSounds();
    } else {
      muteIcon.src = "img_pollo_locco/img/10_project_img/mute.svg";
      unmuteAllSounds();
    }
  });

  function muteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = true));
    backgroundMusic.muted = true;
  }

  function unmuteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = false));
    backgroundMusic.muted = false;
  }
});

