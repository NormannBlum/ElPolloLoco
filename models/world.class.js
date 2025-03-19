/**
 * Properties of the game world, including the character, level, and interactions.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinsStatusBar = new CoinsStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  bottles = 0;
  coins = 0;
  maxBottles = 5;
  maxCoins = 10;
  throwableObjects = [];
  lastThrowTime = 0;
  intervals = [];
  gameOver = false;

  /**
   * Constructor of the World class, initializes the canvas, inputs, and game components.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
   * @param {Keyboard} keyboard - Object for managing keyboard inputs.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.assignCharacterToEnemies();
    this.draw();
    this.run();
  }

  /**
   * Links the world to the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Assigns the character to each endboss in the level so they can react to it.
   */
  assignCharacterToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

  /**
   * Main game loop: repeatedly performs collision checks, status updates, etc.
   */
  run() {
    this.addInterval(() => {
      if (this.gameOver) return;
      this.checkCollisions();
      this.checkCollectibles();
      this.checkThrowObjects();
      // this.checkEndbossSpawn();
    }, 10);

    this.addInterval(() => {
      if (this.gameOver) return;
      this.checkGameOver();
    }, 100);
  }

  /**
   * Adds a periodically executed function (interval).
   * @param {Function} fn - The function to execute.
   * @param {number} time - Execution frequency in milliseconds.
   * @returns {number} - The ID of the created interval.
   */
  addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervals.push(id);
    return id;
  }

  /**
   * Stops all active intervals stored in the `intervals` list.
   * This ensures that no running intervals remain.
   */
  clearAllIntervals() {
    this.intervals.forEach(clearInterval);
  }

  /**
   * Ends the game and displays the corresponding end screen.
   * @param {boolean} win - Whether the player has won.
   */
  stopGame(win = false) {
    this.clearAllIntervals();
    this.gameOver = true;
    this.stopAllSounds();
    this.showEndScreen(win);
  }

  /**
   * Stops all sounds and resets them to the beginning.
   * This includes all sounds in the `sounds` object as well as background music.
   */
  stopAllSounds() {
    Object.values(sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  /**
   * Displays the end screen (win or lose).
   * @param {boolean} win - Whether the player has won.
   */
  showEndScreen(win) {
    const gameOverScreen = document.getElementById("game-over-screen");
    const winScreen = document.getElementById("you-win-screen");
    const mobileButtons = document.querySelector(".mobile-button-container");
    if (win) {
      winScreen.classList.remove("hidden");
    } else {
      gameOverScreen.classList.remove("hidden");
    }

    if (mobileButtons) {
      mobileButtons.style.display = "none";
    }
  }

  /**
   * Checks if the game is over based on the character's or endboss's status.
   *
   * - If the character is dead, the death animation plays and the game stops.
   * - If the endboss is defeated, its death animation plays and the game stops.
   *
   * @returns {void}
   */
  checkGameOver() {
    if (this.character.isDead()) {
      this.character.playAnimation(this.character.IMAGES_DEAD);

      setTimeout(() => {
        this.stopGame(false);
      }, 1500);
    } else if (this.isEndbossDead()) {
      const endboss = this.level.enemies.find(
        (enemy) => enemy instanceof Endboss
      );
      if (endboss) {
        endboss.playAnimation(endboss.IMAGES_DEAD);
      }

      setTimeout(() => {
        this.stopGame(true);
      }, 1500);
    }
  }

  /**
   * Checks if the endboss has been defeated.
   * @returns {boolean} - True if the endboss is dead.
   */
  isEndbossDead() {
    return this.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.isDead()
    );
  }

  /**
   * Checks for collisions between the character, enemies, and bottles.
   */
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkBottleEnemyCollisions();
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Checks for collisions between bottles and enemies.
   */
  checkBottleEnemyCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.processBottleCollision(bottleIndex, enemy);
        }
      });
    });
  }

  /**
   * Handles a collision between a bottle and an enemy.
   * @param {number} bottleIndex - Index of the colliding bottle.
   * @param {MovableObject} enemy - The hit enemy.
   */
  processBottleCollision(bottleIndex, enemy) {
    if (enemy instanceof Endboss) {
      enemy.hit();
      this.updateEndbossStatusBar(enemy);
    } else {
      this.killEnemy(enemy);
    }
    this.throwableObjects.splice(bottleIndex, 1);
  }

  /**
   * Handles a collision between the character and an enemy.
   * @param {MovableObject} enemy - The collided enemy.
   */
  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision();
    } else if (!enemy.isDead) {
      this.handleNormalEnemyCollision(enemy);
    }
  }

  /**
   * Handles a collision between the character and the endboss.
   */
  handleEndbossCollision() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Handles a collision between the character and a normal enemy.
   * @param {MovableObject} enemy - The collided enemy.
   */
  handleNormalEnemyCollision(enemy) {
    if (this.isJumpingOnEnemy(enemy)) {
      this.killEnemy(enemy);
    } else {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks if the character is jumping on an enemy.
   * @param {MovableObject} enemy - The enemy.
   * @returns {boolean} - True if the character is jumping on the enemy.
   */
  isJumpingOnEnemy(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.y + this.character.height - 10 < enemy.y + enemy.height / 2
    );
  }

  /**
   * Kills an enemy and removes it from the game world.
   * @param {MovableObject} enemy - The enemy.
   */
  killEnemy(enemy) {
    if (!enemy.isDead) {
      enemy.isDead = true;
      enemy.kill();
      setTimeout(() => {
        const enemyIndex = this.level.enemies.indexOf(enemy);
        if (enemyIndex > -1) {
          this.level.enemies.splice(enemyIndex, 1);
        }
      }, 2000);
    }
  }

  /**
   * Checks for collectible objects (coins, bottles).
   */
  checkCollectibles() {
    this.checkBottleCollectibles();
    this.checkCoinCollectibles();
  }

  /**
   * Checks if bottles can be collected.
   */
  checkBottleCollectibles() {
    this.level.bottles.forEach((bottle, index) => {
      if (
        this.character.isColliding(bottle) &&
        this.bottles < this.maxBottles
      ) {
        this.bottles++;
        this.bottlesStatusBar.setPercentage(
          (this.bottles / this.maxBottles) * 100
        );
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Checks if coins can be collected.
   */
  checkCoinCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coins < this.maxCoins) {
        this.coins++;
        this.coinsStatusBar.setPercentage((this.coins / this.maxCoins) * 100);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks if a bottle should be thrown.
   */
  checkThrowObjects() {
    if (this.isBottleThrowReady()) {
      this.throwBottle();
      this.updateBottleStatus();
    }
  }

  /**
   * Checks if the character is ready to throw a bottle.
   * @returns {boolean} - True if a bottle can be thrown.
   */
  isBottleThrowReady() {
    const currentTime = new Date().getTime();
    return (
      this.keyboard.D &&
      this.bottles > 0 &&
      currentTime - this.lastThrowTime > 500
    );
  }

  /**
   * Creates and throws a bottle in the direction of the character.
   * Plays the sound effect for throwing and adds the bottle to the list of thrown objects.
   * The bottle is positioned based on the character's direction.
   *
   * @returns {void} - The method does not return a value.
   */
  throwBottle() {
    if (this.gameOver) return;
    this.lastThrowTime = new Date().getTime();

    let direction = this.character.otherDirection ? -1 : 1;
    let bottle = new ThrowableObject(
      this.character.x + 50 * direction,
      this.character.y + 170,
      direction,
      this
    );

    sounds.throwBottle.play();
    this.throwableObjects.push(bottle);
  }

  /**
   * Handles the collision of a thrown bottle with an enemy.
   * If the enemy is the endboss, it gets hit and its status bar is updated.
   * If it's a normal enemy, it is eliminated.
   * Also starts the splash animation of the bottle.
   *
   * @param {number} bottleIndex - The index of the colliding bottle in the `throwableObjects` array.
   * @param {MovableObject} enemy - The enemy object that was hit.
   * @returns {void} - The method does not return a value.
   */
  processBottleCollision(bottleIndex, enemy) {
    let bottle = this.throwableObjects[bottleIndex];

    if (!bottle.isSplashing) {
      if (enemy instanceof Endboss) {
        enemy.hit();
        this.updateEndbossStatusBar(enemy);
      } else {
        this.killEnemy(enemy);
      }
      bottle.splashEffect();
    }
  }

  /**
   * Updates the bottle status after a throw.
   * Decreases the number of available bottles and updates the bottle status bar.
   */
  updateBottleStatus() {
    this.bottles--;
    this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
  }

  /**
   * Checks if the endboss should be activated.
   */
  checkEndbossSpawn() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
    if (
      endboss &&
      !endboss.hadFirstContact &&
      this.character.x + 500 > endboss.x
    ) {
      endboss.hadFirstContact = true;
      // endboss.startWalking();
    }
  }

  /**
   * Updates the status bar of the endboss.
   * @param {Endboss} endboss - The endboss.
   */
  updateEndbossStatusBar(endboss) {
    const percentage = (endboss.energy / 20) * 100;
    this.endbossStatusBar.setPercentage(percentage);
  }

  /**
   * Draws the game world.
   */
  draw() {
    if (!this.gameOver) {
      this.clearCanvas();
      this.drawBackground();
      this.drawFixedObjects();
      this.drawDynamicObjects();
    }
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Clears the entire canvas by removing its content.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background of the game world.
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws static objects such as status bars.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  /**
   * Draws dynamic objects such as the character and enemies.
   */
  drawDynamicObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of an object horizontally.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image of an object after flipping.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
