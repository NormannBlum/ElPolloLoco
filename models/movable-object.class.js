class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Wendet die Schwerkraft auf das Objekt an, indem die y-Position und Geschwindigkeit aktualisiert werden.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  /**
   * Überprüft, ob sich das Objekt über dem Boden befindet.
   * @returns {boolean} - True, wenn das Objekt über dem Boden ist.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true; // Werfbare Objekte fallen immer.
    } else {
      return this.y < 180;
    }
  }

  /**
   * Überprüft, ob das aktuelle Objekt mit einem anderen Objekt kollidiert.
   * @param {MovableObject} mo - Das andere Objekt.
   * @returns {boolean} - True, wenn die Objekte kollidieren.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
      this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
      this.x + this.offset.x < mo.x + mo.offset.x + mo.width - mo.offset.width &&
      this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height
    );
  }

  /**
   * Reduziert die Energie des Objekts, wenn es getroffen wird, mit einem Cooldown von 200ms.
   */
  hit() {
    const now = new Date().getTime();
    if (now - this.lastHit > 200) {
      this.energy -= 5;
      if (this.energy < 0) this.energy = 0;
      this.lastHit = now;
    }
  }

  /**
   * Überprüft, ob das Objekt kürzlich getroffen wurde.
   * @returns {boolean} - True, wenn das Objekt in den letzten 1 Sekunde getroffen wurde.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Überprüft, ob das Objekt tot ist.
   * @returns {boolean} - True, wenn die Energie des Objekts 0 ist.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Spielt eine Animation ab, indem zwischen einer Liste von Bildern zyklisch gewechselt wird.
   * @param {string[]} images - Eine Liste von Bildpfaden.
   */
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
