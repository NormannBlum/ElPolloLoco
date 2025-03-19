/**
 * Represents a throwable object (e.g., a bottle) that rotates in the air
 * and triggers a splash animation upon collision.
 *
 * Inherits from `MovableObject` and includes both rotation and splash animations.
 */
class ThrowableObject extends MovableObject {
  /**
   * Contains the image paths for the bottle rotation animation.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Contains the image paths for the splash animation upon collision.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of a throwable object.
   *
   * @param {number} x - The X position of the object when created.
   * @param {number} y - The Y position of the object when created.
   * @param {number} direction - The throw direction (1 = right, -1 = left).
   * @param {Object} world - The world in which the object exists.
   */
  constructor(x, y, direction, world) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.world = world;
    this.height = 60;
    this.width = 50;
    this.isSplashing = false;
    this.throw();
  }

  /**
   * Initiates the throwing motion of the object, making it fly upwards
   * with an initial speed and then fall due to gravity (`applyGravity`).
   *
   * Moves in the given `direction` and is removed after 3 seconds if it doesn't collide.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.animate();

    this.throwInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.x += 15 * this.direction;
      }
    }, 50);

    setTimeout(() => {
      if (!this.isSplashing) {
        this.markedForDeletion = true;
      }
    }, 3000);
  }

  /**
   * Triggers the splash animation when the object collides.
   * Stops the throwing motion and removes the object after the animation.
   */
  splashEffect() {
    if (this.isSplashing) return;
    this.isSplashing = true;
    clearInterval(this.throwInterval);

    this.playSplashAnimation(() => {
      this.markedForDeletion = true;
    });
  }

  /**
   * Plays the splash animation frame by frame and removes the object after completion.
   *
   * @param {Function} callback - A function to execute after the animation finishes (e.g., for removing the object).
   */
  playSplashAnimation(callback) {
    let i = 0;
    let interval = setInterval(() => {
      if (i >= this.IMAGES_SPLASH.length) {
        clearInterval(interval);
        callback();
      } else {
        this.loadImage(this.IMAGES_SPLASH[i]);
        i++;
      }
    }, 100);
  }

  /**
   * Plays the rotation animation while the object is in the air.
   */
  animate() {
    setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }
}
