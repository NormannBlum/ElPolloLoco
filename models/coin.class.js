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

  constructor(x, y) {
    super().loadImage("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN); // Lade alle Bilder der Animation
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.startAnimation(); // Starte die Animation
  }

  startAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN); // Wechsle zwischen den Bildern
    }, 200); // Wechsle alle 200ms
  }
}
