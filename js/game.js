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
    world.stopAllSounds(); // Sounds stoppen
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

/**
 * Hintergrundmusik für das Spiel.
 * @type {HTMLAudioElement}
 */
let backgroundMusic = new Audio('audio/backgroundsound.mp3');

/**
 * Sammlung von Soundeffekten im Spiel.
 * @type {Object<string, HTMLAudioElement>}
 */
let sounds = {
  throwBottle: new Audio('audio/throw.wav'),
  jump: new Audio('audio/jump.wav'),
  snore: new Audio('audio/snore.wav'),
  hurt: new Audio('audio/characterhurt.wav'),
  dead: new Audio('audio/characterdead.wav'),
  chickenDead: new Audio('audio/chickenhurt.wav'),
  endbossHurt: new Audio('audio/endbosshurt.wav'),
  endbossDead: new Audio('audio/endbossdead.wav')
};

/**
 * Initialisiert die Audiosteuerung, sobald das DOM vollständig geladen ist.
 */
document.addEventListener("DOMContentLoaded", () => {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();

  const muteButton = document.getElementById("mute");
  const muteIcon = document.getElementById("mute-icon");
  let isMuted = false;

  /**
   * Event-Listener für den Stummschalt-Button.
   * Schaltet zwischen "Stumm" und "Laut" und aktualisiert das Symbol entsprechend.
   */
  muteButton.addEventListener("click", () => {
    isMuted = !isMuted;

    if (isMuted) {
      muteIcon.src = "img_pollo_locco/img/10_project_img/mute.svg";
      muteAllSounds();
    } else {
      muteIcon.src = "img_pollo_locco/img/10_project_img/soundon.svg";
      unmuteAllSounds();
    }
  });

  /**
   * Schaltet alle Soundeffekte und die Hintergrundmusik stumm.
   */
  function muteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = true));
    backgroundMusic.muted = true;
  }

  /**
   * Aktiviert alle Soundeffekte und die Hintergrundmusik.
   */
  function unmuteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = false));
    backgroundMusic.muted = false;
  }
});
