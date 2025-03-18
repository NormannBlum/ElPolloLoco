/**
 * Eigenschaften der Spielwelt, einschließlich des Charakters, Levels und Interaktionen.
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
   * Konstruktor der Weltklasse, initialisiert Canvas, Eingaben und Spielkomponenten.
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem das Spiel gezeichnet wird.
   * @param {Keyboard} keyboard - Objekt zur Verwaltung von Tastatureingaben.
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
   * Verknüpft die Welt mit dem Charakter.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Weist jedem Endboss im Level den Charakter zu, sodass sie auf ihn reagieren können.
   */
  assignCharacterToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

  /**
   * Hauptspielschleife: Führt wiederholt Kollisionsprüfungen, Statusupdates usw. aus.
   */
  run() {
    this.addInterval(() => {
      if (this.gameOver) return;
      this.checkCollisions();
      this.checkCollectibles();
      this.checkThrowObjects();
      this.checkEndbossSpawn();
    }, 10);

    this.addInterval(() => {
      if (this.gameOver) return;
      this.checkGameOver();
    }, 100);
  }

  /**
   * Fügt eine periodisch ausgeführte Funktion (Intervall) hinzu.
   * @param {Function} fn - Die auszuführende Funktion.
   * @param {number} time - Die Ausführungsfrequenz in Millisekunden.
   * @returns {number} - Die ID des erstellten Intervalls.
   */
  addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervals.push(id);
    return id;
  }

  /**
   * Beendet alle aktiven Intervalle, die in der `intervals`-Liste gespeichert sind.
   * Dies wird verwendet, um sicherzustellen, dass keine laufenden Intervalle mehr existieren.
   */
  clearAllIntervals() {
    this.intervals.forEach(clearInterval);
  }

  /**
   * Beendet das Spiel und zeigt den entsprechenden Endbildschirm.
   * @param {boolean} win - Ob der Spieler gewonnen hat.
   */
  stopGame(win = false) {
    this.clearAllIntervals();
    this.gameOver = true;
    this.stopAllSounds();
    this.showEndScreen(win);
  }

  /**
   * Stoppt alle Sounds und setzt sie auf den Anfang zurück.
   * Dies beinhaltet alle Sounds im `sounds`-Objekt sowie die Hintergrundmusik.
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
   * Zeigt den Endbildschirm (Sieg oder Niederlage).
   * @param {boolean} win - Ob der Spieler gewonnen hat.
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
   * Überprüft, ob das Spiel vorbei ist, basierend auf dem Status des Charakters oder des Endbosses.
   *
   * - Falls der Charakter tot ist, wird die Todesanimation abgespielt und das Spiel gestoppt.
   * - Falls der Endboss besiegt wurde, wird seine Todesanimation abgespielt und das Spiel gestoppt.
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
   * Überprüft, ob der Endboss besiegt wurde.
   * @returns {boolean} - True, wenn der Endboss tot ist.
   */
  isEndbossDead() {
    return this.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.isDead()
    );
  }

  /**
   * Prüft auf Kollisionen zwischen Charakter, Gegnern und Flaschen.
   */
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkBottleEnemyCollisions();
  }

  /**
   * Prüft auf Kollisionen zwischen Charakter und Gegnern.
   */
  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * Prüft auf Kollisionen zwischen Flaschen und Gegnern.
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
   * Behandelt eine Kollision zwischen einer Flasche und einem Gegner.
   * @param {number} bottleIndex - Index der kollidierenden Flasche.
   * @param {MovableObject} enemy - Der getroffene Gegner.
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
   * Behandelt eine Kollision zwischen dem Charakter und einem Gegner.
   * @param {MovableObject} enemy - Der kollidierte Gegner.
   */
  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision();
    } else if (!enemy.isDead) {
      this.handleNormalEnemyCollision(enemy);
    }
  }

  /**
   * Behandelt eine Kollision zwischen dem Charakter und dem Endboss.
   */
  handleEndbossCollision() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Behandelt eine Kollision zwischen dem Charakter und einem normalen Gegner.
   * @param {MovableObject} enemy - Der kollidierte Gegner.
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
   * Prüft, ob der Charakter auf einen Gegner springt.
   * @param {MovableObject} enemy - Der Gegner.
   * @returns {boolean} - True, wenn der Charakter auf den Gegner springt.
   */
  isJumpingOnEnemy(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.y + this.character.height - 10 < enemy.y + enemy.height / 2
    );
  }

  /**
   * Tötet einen Gegner und entfernt diesen aus der Spielwelt.
   * @param {MovableObject} enemy - Der Gegner.
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
   * Prüft sammelbare Objekte (Münzen, Flaschen).
   */
  checkCollectibles() {
    this.checkBottleCollectibles();
    this.checkCoinCollectibles();
  }

  /**
   * Prüft ob Flaschen eingesammelt werden können.
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
   * Prüft ob Münzen eingesammelt werden können.
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
   * Prüft ob eine Flasche geworfen werden soll.
   */
  checkThrowObjects() {
    if (this.isBottleThrowReady()) {
      this.throwBottle();
      this.updateBottleStatus();
    }
  }

  /**
   * Prüft ob der Charakter bereit ist, eine Flasche zu werfen.
   * @returns {boolean} - True, wenn eine Flasche geworfen werden kann.
   */
  isBottleThrowReady() {
    const currentTime = new Date().getTime();
    return (
      this.keyboard.D &&
      this.bottles > 0 &&
      currentTime - this.lastThrowTime > 500
    );
  }

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

  processBottleCollision(bottleIndex, enemy) {
    let bottle = this.throwableObjects[bottleIndex];

    if (!bottle.isSplashing) {
      if (enemy instanceof Endboss) {
        enemy.hit();
        this.updateEndbossStatusBar(enemy);
      } else {
        this.killEnemy(enemy);
      }

      console.log("🔥 Flasche trifft Gegner → Splash-Effekt startet!");
      bottle.splashEffect();
    }
  }

  /**
   * Aktualisiert den Flaschenstatus nach einem Wurf.
   * Verringert die Anzahl der verfügbaren Flaschen und aktualisiert den Anzeigestatus der Flaschenleiste.
   */
  updateBottleStatus() {
    this.bottles--;
    this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
  }

  /**
   * Prüft, ob der Endboss aktiviert werden soll.
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
      endboss.startWalking();
    }
  }

  /**
   * Aktualisiert die Statusleiste des Endbosses.
   * @param {Endboss} endboss - Der Endboss.
   */
  updateEndbossStatusBar(endboss) {
    const percentage = (endboss.energy / 20) * 100;
    this.endbossStatusBar.setPercentage(percentage);
  }

  /**
   * Zeichnet die Spielwelt.
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
   * Löscht den gesamten Inhalt des Canvas, indem ein rechteckiger Bereich über die gesamte Canvas-Breite und -Höhe gelöscht wird.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Zeichnet den Hintergrund der Spielwelt.
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Zeichnet statische Objekte wie die Statusleisten.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  /**
   * Zeichnet dynamische Objekte wie den Charakter und Gegner.
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
   * Fügt mehrere Objekte zur Karte hinzu.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Fügt ein einzelnes Objekt zur Karte hinzu.
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
   * Spiegelt das Bild eines Objekts horizontal.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Stellt das Bild eines Objekts nach einer Spiegelung wieder her.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
