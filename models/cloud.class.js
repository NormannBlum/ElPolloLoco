/**
 * Die Cloud-Klasse stellt eine bewegliche Wolke im Hintergrund des Spiels dar.
 * Sie erweitert die MovableObject-Klasse und bewegt sich kontinuierlich nach links.
 */
class Cloud extends MovableObject {
  width = 500;
  height = 250;

  IMAGES = [
    "img_pollo_locco/img/5_background/layers/4_clouds/1.png",
    "img_pollo_locco/img/5_background/layers/4_clouds/2.png",
  ];

  /**
   * Erstellt eine Instanz einer Wolke mit zufälligem Bild und Position.
   * @param {number} x - Die x-Position der Wolke.
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
   * Aktiviert die Bewegung der Wolke nach links.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
