/**
 * The MovableObject class represents a movable object in the game world.
 * It extends the DrawableObject class and adds movement, gravity, and collision detection.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity to the object by updating its y-position and speed.
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
   * Checks if the object is above the ground.
   * @returns {boolean} - True if the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true; // Throwable objects always fall.
    } else {
      return this.y < 180;
    }
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the current object is colliding with another object.
   * @param {MovableObject} mo - The other object.
   * @returns {boolean} - True if the objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.x + this.width - this.offset.width >
        mo.x + mo.offset.x &&
      this.y + this.offset.y + this.height - this.offset.height >
        mo.y + mo.offset.y &&
      this.x + this.offset.x <
        mo.x + mo.offset.x + mo.width - mo.offset.width &&
      this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height
    );
  }

  /**
   * Reduces the object's energy when hit, with a cooldown of 200ms.
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
   * Checks if the object was recently hit.
   * @returns {boolean} - True if the object was hit within the last 1 second.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} - True if the object's energy is 0.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays an animation by cycling through a list of images.
   * @param {string[]} images - A list of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imagesCache[path];
    this.currentImage++;
  }
}
