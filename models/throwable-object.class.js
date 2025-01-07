class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Erstellt eine Instanz eines werfbaren Objekts (z. B. Flasche).
   * @param {number} x - Die x-Position des Objekts.
   * @param {number} y - Die y-Position des Objekts.
   * @param {number} direction - Die Richtung des Wurfs (-1 für links, 1 für rechts).
   */
  constructor(x, y, direction) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  /**
   * Führt den Wurf des Objekts aus, inklusive Schwerkraft und horizontaler Bewegung.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.x += 10 * this.direction;
    }, 25);

    this.animate();
  }

  /**
   * Startet die Animation des Objekts, indem Rotationsbilder zyklisch abgespielt werden.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 100);
  }
}
