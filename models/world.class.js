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
  maxCoins = 8;
  throwableObjects = [];
  lastThrowTime = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollectibles();
      this.checkThrowObjects();
    }, 100); // 200 ok mit bottles? sonst auf 100!
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollectibles() {
    this.checkBottleCollectibles();
    this.checkCoinCollectibles();
  }

  checkBottleCollectibles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.bottles < this.maxBottles) {
        console.log("Flasche eingesammelt");
        this.bottles++;
        this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
        this.level.bottles.splice(index, 1); // Flasche entfernen
      }
    });
  }

  checkCoinCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.coins < this.maxCoins) {
        console.log("Coin eingesammelt");
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
    return this.keyboard.D && this.bottles > 0 && currentTime - this.lastThrowTime > 300;
  }

  throwBottle() {
    this.lastThrowTime = new Date().getTime();
    let direction = this.character.otherDirection ? -1 : 1; // Nach links oder rechts werfen
    let bottle = new ThrowableObject(this.character.x + 50 * direction, this.character.y + 100, direction);
    bottle.speed = 10 * direction; // Geschwindigkeit in Richtung
    this.throwableObjects.push(bottle);
  }

  updateBottleStatus() {
    this.bottles--;
    this.bottlesStatusBar.setPercentage((this.bottles / this.maxBottles) * 100);
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
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx)

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
