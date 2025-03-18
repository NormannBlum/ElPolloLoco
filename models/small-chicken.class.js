/**
 * Die SmallChicken-Klasse stellt ein kleines Huhn als Gegner dar.
 * Es bewegt sich mit einer zufälligen Geschwindigkeit nach links und kann besiegt werden.
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
   * Erstellt eine Instanz eines kleinen Huhns mit zufälliger Position und Geschwindigkeit.
   */
  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 700 + Math.random() * 3800; // Zufällige Startposition
    this.speed = 0.1 + Math.random() * 0.3; // Langsame Geschwindigkeit

    this.animate();
  }

  /**
   * Aktiviert die Bewegung und Animation des kleinen Huhns.
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
   * Setzt das kleine Huhn in den Zustand "tot", stoppt die Bewegung und spielt die Todesanimation ab.
   */
  kill() {
    this.isDead = true;
    this.speed = 0;
    sounds.chickenDead.play();
    this.playAnimation(this.IMAGES_DEAD);
  }
}
