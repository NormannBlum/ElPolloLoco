class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwableobject should always fall
      return true;
    } else {
      return this.y < 180;
    }
  }

  // character.iscolliding(chicken);
  isColliding(mo) {
    return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
        this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
        this.x + this.offset.x < mo.x + mo.offset.x  + mo.width - mo.offset.width &&
        this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
  }

  // hit() {
  //   this.energy -= 5;
  //   if (this.energy < 0) {
  //     this.energy = 0;
  //   } else {
  //     this.lastHit = new Date().getTime();
  //   }
  // }

  hit() {
    const now = new Date().getTime();
    if (now - this.lastHit > 200) { // Cooldown von 200ms
      this.energy -= 5; // Ziehe Energie ab
      if (this.energy < 0) this.energy = 0; // Verhindere negativen Energiewert
      this.lastHit = now; // Aktualisiere Zeitstempel des letzten Treffers
    }
  }  

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Differnnce in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imagesCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
