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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.assignCharacterToEnemies(); // <- Endboss wird hier aktualisiert
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  assignCharacterToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character; // Endboss erhält Referenz auf den Charakter
      }
    });
  }

  assignCharacterToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollectibles();
      this.checkThrowObjects();
      this.checkEndbossSpawn();
    }, 10); // 200 ok mit bottles? sonst auf 100! test 50 für collision
  }

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
      enemy.hit(); // Reduziere Energie des Endbosses
      this.updateEndbossStatusBar(enemy); // Aktualisiere Statusbar
    } else {
      this.killEnemy(enemy); // Normale Feinde sterben sofort
    }
    this.throwableObjects.splice(bottleIndex, 1); // Entferne Flasche
  }

  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision();
    } else if (!enemy.isDead) {
      this.handleNormalEnemyCollision(enemy);
    }
  }

  handleEndbossCollision() {
    this.character.hit(); // Charakter nimmt Schaden
    this.statusBar.setPercentage(this.character.energy);
  }

  handleNormalEnemyCollision(enemy) {
    if (this.isJumpingOnEnemy(enemy)) {
      this.killEnemy(enemy); // Feind stirbt
    } else {
      this.character.hit(); // Charakter wird getroffen
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  isJumpingOnEnemy(enemy) {
    return (
      this.character.speedY < 0 && // Charakter fällt nach unten
      this.character.y + this.character.height - 10 < enemy.y + enemy.height / 2 // Charakter ist oberhalb des Feinds
    );
  }

  killEnemy(enemy) {
    if (!enemy.isDead) {
      // Check dass Chicken noch lebt
      enemy.isDead = true; // Markiere Feind als tot
      enemy.kill(); // Starte die Dead-Animation
      setTimeout(() => {
        const enemyIndex = this.level.enemies.indexOf(enemy);
        if (enemyIndex > -1) {
          this.level.enemies.splice(enemyIndex, 1); // Entferne Feind nach 5 Sekunden
        }
      }, 10000); // Wartezeit für die Dead-Animation - Alternativ 5000?
    }
  }

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
        this.level.bottles.splice(index, 1); // Flasche entfernen
      }
    });
  }

  checkCoinCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coins < this.maxCoins) {
        this.coins++;
        this.coinsStatusBar.setPercentage((this.coins / this.maxCoins) * 100);
        this.level.coins.splice(index, 1); // Coin entfernen
      }
    });
  }

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
    let direction = this.character.otherDirection ? -1 : 1; // Nach links oder rechts werfen
    let bottle = new ThrowableObject(
      this.character.x + 50 * direction,
      this.character.y + 100,
      direction
    );
    bottle.speed = 10 * direction; // Geschwindigkeit in Richtung
    this.throwableObjects.push(bottle);
  }

  updateBottleStatus() {
    this.bottles--;
    this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
  }

  checkEndbossSpawn() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
    if (
      endboss && !endboss.hadFirstContact && this.character.x + 500 > endboss.x
    ) {
      endboss.hadFirstContact = true;
      endboss.startWalking(); // Endboss beginnt zu laufen
    }
  }

  updateEndbossStatusBar(endboss) {
    const percentage = (endboss.energy / 20) * 100; // Berechnung basierend auf maximaler Energie
    this.endbossStatusBar.setPercentage(percentage);
  }

  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawFixedObjects();
    this.drawDynamicObjects();
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
    this.addObjectsToMap(this.level.clouds); // Eigentlich dynamic aber hier gesetzt wegen Überlappung
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
    // mo.drawOffsetFrame(this.ctx)

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
