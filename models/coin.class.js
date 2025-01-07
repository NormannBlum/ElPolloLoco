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
   * Erstellt eine Instanz einer Münze mit Position und Animation.
   * @param {number} x - Die x-Position der Münze.
   * @param {number} y - Die y-Position der Münze.
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
   * Startet die Animation der Münze, um zwischen verschiedenen Bildern zu wechseln.
   */
  startAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }
}
