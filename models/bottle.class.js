/**
 * The Bottle class represents a collectible or throwable bottle in the game.
 * It extends the DrawableObject class and can either lie on the ground or be thrown.
 */
class Bottle extends DrawableObject {
  IMAGES_BOTTLE = [
    "img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  offset = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
  };

  /**
   * Creates an instance of a bottle with a position and animation.
   * @param {number} x - The x-position of the bottle.
   * @param {number} y - The y-position of the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
    );
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.startAnimation();
  }

  /**
   * Starts the bottle animation.
   * The animation updates every 400 milliseconds.
   *
   * @returns {void}
   */
  startAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 400);
  }
}
