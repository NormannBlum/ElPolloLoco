/**
 * The Coin class represents a collectible coin in the game.
 * It extends the DrawableObject class and includes animations for rotating coins.
 */
class Coin extends DrawableObject {
  IMAGES_COIN = [
    "img_pollo_locco/img/8_coin/coin_1.png",
    "img_pollo_locco/img/8_coin/coin_2.png",
  ];

  offset = {
    x: 30,
    y: 30,
    width: 60,
    height: 60,
  };

  /**
   * Creates an instance of a coin with position and animation.
   * @param {number} x - The x-position of the coin.
   * @param {number} y - The y-position of the coin.
   */
  constructor(x, y) {
    super().loadImage("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.startAnimation();
  }

  /**
   * Starts the coin animation, switching between different images.
   */
  startAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }
}
