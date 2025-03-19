/**
 * The SmallChicken class represents a small chicken as an enemy.
 * It moves left at a random speed and can be defeated.
 */
class SmallChicken extends MovableObject {
  height = 45;
  width = 55;
  y = 380;

  offset = {
    x: 5,
    y: 5,
    width: 10,
    height: 5,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  isDead = false;

  /**
   * Creates an instance of a small chicken with a random position and speed.
   */
  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 700 + Math.random() * 3800; // Random starting position
    this.speed = 0.1 + Math.random() * 0.3; // Slow speed

    this.animate();
  }

  /**
   * Activates the movement and animation of the small chicken.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Sets the small chicken to a "dead" state, stops its movement, and plays the death animation.
   */
  kill() {
    this.isDead = true;
    this.speed = 0;
    sounds.chickenDead.play();
    this.playAnimation(this.IMAGES_DEAD);
  }
}
