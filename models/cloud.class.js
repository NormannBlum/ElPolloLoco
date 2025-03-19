/**
 * The Cloud class represents a moving cloud in the game's background.
 * It extends the MovableObject class and continuously moves to the left.
 */
class Cloud extends MovableObject {
  width = 500;
  height = 250;

  IMAGES = [
    "img_pollo_locco/img/5_background/layers/4_clouds/1.png",
    "img_pollo_locco/img/5_background/layers/4_clouds/2.png",
  ];

  /**
   * Creates an instance of a cloud with a random image and position.
   * @param {number} x - The x-position of the cloud.
   */
  constructor(x) {
    super();
    let randomIndex = Math.floor(Math.random() * this.IMAGES.length);
    let randomImage = this.IMAGES[randomIndex];
    this.loadImage(randomImage);
    this.x = x;
    this.y = 0 + Math.random() * 100;
    this.animate();
  }

  /**
   * Activates the movement of the cloud to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
