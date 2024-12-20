class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, direction) {
    super().loadImage(this.IMAGES_ROTATION[0]); // Lade das erste Bild
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.direction = direction; // Speichere die Richtung
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30; // Anfangsgeschwindigkeit nach oben
    this.applyGravity();

    setInterval(() => {
      this.x += 10 * this.direction;
    }, 25);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION); // Wechselt zwischen den Rotationsbildern
    }, 100);
  }
}