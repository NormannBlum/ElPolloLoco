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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.assignCharacterToEnemies();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  assignCharacterToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

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

  addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervals.push(id);
    return id;
  }

  clearAllIntervals() {
    this.intervals.forEach(clearInterval);
  }

  stopGame(win = false) {
    this.clearAllIntervals();
    this.gameOver = true;
    if (win) {
      this.showYouWinScreen();
    } else {
      this.showGameOverScreen();
    }
  }

  showGameOverScreen() {
    document.getElementById("game-over-screen").classList.remove("hidden");
  }

  showYouWinScreen() {
    document.getElementById("you-win-screen").classList.remove("hidden");
  }

  checkGameOver() {
    if (this.character.isDead()) {
      this.handleCharacterDeath();
    } else if (this.isEndbossDead()) {
      this.handleEndbossDeath();
    }
  }

  handleCharacterDeath() {
    this.gameOver = true; 
    this.character.playAnimation(this.character.IMAGES_DEAD); 
    this.stopGame(false); 
  }

  handleEndbossDeath() {
    this.gameOver = true; 
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss && enemy.isDead()
    );
    if (endboss) {
      endboss.playAnimation(endboss.IMAGES_DEAD); 
    }
    this.stopGame(true); 
  }

  isEndbossDead() {
    return this.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.isDead()
    );
  }

  // Kollisionsprüfung
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkBottleEnemyCollisions();
  }

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  checkBottleEnemyCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.processBottleCollision(bottleIndex, enemy);
        }
      });
    });
  }

  processBottleCollision(bottleIndex, enemy) {
    if (enemy instanceof Endboss) {
      enemy.hit();
      this.updateEndbossStatusBar(enemy);
    } else {
      this.killEnemy(enemy);
    }
    this.throwableObjects.splice(bottleIndex, 1);
  }

  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision();
    } else if (!enemy.isDead) {
      this.handleNormalEnemyCollision(enemy);
    }
  }

  handleEndbossCollision() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  handleNormalEnemyCollision(enemy) {
    if (this.isJumpingOnEnemy(enemy)) {
      this.killEnemy(enemy);
    } else {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  isJumpingOnEnemy(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.y + this.character.height - 10 < enemy.y + enemy.height / 2
    );
  }

  killEnemy(enemy) {
    if (!enemy.isDead) {
      enemy.isDead = true;
      enemy.kill();
      setTimeout(() => {
        const enemyIndex = this.level.enemies.indexOf(enemy);
        if (enemyIndex > -1) {
          this.level.enemies.splice(enemyIndex, 1);
        }
      }, 10000);
    }
  }

  // Sammelobjekte
  checkCollectibles() {
    this.checkBottleCollectibles();
    this.checkCoinCollectibles();
  }

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

  checkCoinCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coins < this.maxCoins) {
        this.coins++;
        this.coinsStatusBar.setPercentage((this.coins / this.maxCoins) * 100);
        this.level.coins.splice(index, 1);
      }
    });
  }

  // Flaschen-Logik
  checkThrowObjects() {
    if (this.isBottleThrowReady()) {
      this.throwBottle();
      this.updateBottleStatus();
    }
  }

  isBottleThrowReady() {
    const currentTime = new Date().getTime();
    return (
      this.keyboard.D &&
      this.bottles > 0 &&
      currentTime - this.lastThrowTime > 300
    );
  }

  throwBottle() {
    this.lastThrowTime = new Date().getTime();
    let direction = this.character.otherDirection ? -1 : 1;
    let bottle = new ThrowableObject(
      this.character.x + 50 * direction,
      this.character.y + 100,
      direction
    );
    bottle.speed = 10 * direction;
    this.throwableObjects.push(bottle);
  }

  updateBottleStatus() {
    this.bottles--;
    this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
  }

  // Endboss-Logik
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

  updateEndbossStatusBar(endboss) {
    const percentage = (endboss.energy / 20) * 100;
    this.endbossStatusBar.setPercentage(percentage);
  }

  // Rendering
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

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  drawDynamicObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
