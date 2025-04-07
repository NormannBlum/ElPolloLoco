let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];
let gameRunning = false;

let backgroundMusic = new Audio("audio/backgroundsound.mp3");

let sounds = {
  walking: new Audio("audio/walking1.mp3"),
  throwBottle: new Audio("audio/throw.wav"),
  jump: new Audio("audio/jump.wav"),
  snore: new Audio("audio/snore.wav"),
  hurt: new Audio("audio/characterhurt.wav"),
  dead: new Audio("audio/characterdead.wav"),
  chickenDead: new Audio("audio/chickenhurt.wav"),
  endbossHurt: new Audio("audio/endbosshurt.wav"),
  endbossDead: new Audio("audio/endbossdead.wav"),
  coinCollect: new Audio("audio/coinCollect.wav"),
  bottleCollect: new Audio("audio/bottleCollect.ogg"),
  bottleBreaks: new Audio("audio/bottleBreaksShort.wav"),
};

/**
 * Initializes the game and displays the start screen.
 */
function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

/**
 * Starts the game by creating the world and hiding the start screen.
 */
function startGame() {
  resetGame();
  hideStartScreen();
  document.querySelector(".mobile-button-container").style.display = "flex";
  world = new World(canvas, keyboard);
  backgroundMusic.play();
  gameRunning = true;
}

/**
 * Resets the game, removes active intervals, and hides end screens.
 */
function resetGame() {
  if (world) {
    world.clearAllIntervals();
    world.stopAllSounds();
    world = null;
  }
  level1 = resetLevel();
  clearAllIntervals();
  gameRunning = false;
  hideEndScreens();
}

/**
 * Removes all active intervals and clears the interval list.
 */
function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

/**
 * Hides all end screens.
 */
function hideEndScreens() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("you-win-screen").classList.add("hidden");
}

/**
 * Returns to the main menu by resetting the game and displaying the start screen.
 */
function goToMainMenu() {
  resetGame();
  showStartScreen();
}

/**
 * Displays the start screen and hides the canvas element.
 */
function showStartScreen() {
  document.getElementById("start-screen").classList.remove("hidden");
  document.querySelector(".mobile-button-container").style.display = "flex";
  canvas.style.display = "none";
}

/**
 * Hides the start screen and displays the canvas element.
 */
function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.add("hidden");
  }
  canvas.style.display = "block";
}

/**
 * Opens an overlay by making it visible.
 * @param {string} id - The ID of the overlay to open.
 */
function openOverlay(id) {
  document.getElementById(id).classList.remove("hidden");
}

/**
 * Closes an overlay by hiding it.
 * @param {string} id - The ID of the overlay to close.
 */
function closeOverlay(id) {
  document.getElementById(id).classList.add("hidden");
}

/**
 * Checks the screen orientation and displays a warning if the device is in portrait mode.
 */
function checkOrientation() {
  const warning = document.getElementById("orientation-warning");

  // Check if the device is in portrait mode and width < 1200px
  if (window.innerWidth < 1200 && window.innerWidth < window.innerHeight) {
    warning.classList.add("visible");
  } else {
    warning.classList.remove("visible");
  }
}

// Event listeners for window resizing and page load
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

/**
 * Initializes audio controls once the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;

  let hasInteracted = false;
  let isMuted = false;

  const muteButton = document.getElementById("mute");
  const muteIcon = document.getElementById("mute-icon");

  if (isMuted) {
    muteAllSounds();
  }

  function startBackgroundMusic() {
    if (!hasInteracted) {
      backgroundMusic
        .play()
        .catch((error) => console.log("Autoplay blocked:", error));
      hasInteracted = true;
    }
  }

  document.addEventListener("click", startBackgroundMusic);
  document.addEventListener("keydown", startBackgroundMusic);

  /**
   * Event listener for the mute button.
   * Toggles between "mute" and "sound on" and updates the icon accordingly.
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

    muteButton.blur();
  });

  /**
   * Mutes all sound effects and background music.
   */
  function muteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = true));
    backgroundMusic.muted = true;
  }

  /**
   * Unmutes all sound effects and background music.
   */
  function unmuteAllSounds() {
    Object.values(sounds).forEach((sound) => (sound.muted = false));
    backgroundMusic.muted = false;
  }
});

/**
 * Handles key press events and sets the corresponding property in the `keyboard` object to `true`.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = true;
  if (event.code === "ArrowLeft") keyboard.LEFT = true;
  if (event.code === "ArrowUp") keyboard.UP = true;
  if (event.code === "ArrowDown") keyboard.DOWN = true;
  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "KeyD") keyboard.D = true;
});

/**
 * Handles key release events and sets the corresponding property in the `keyboard` object to `false`.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;
  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "KeyD") keyboard.D = false;
});
