/**
 * Repräsentiert ein werfbares Objekt (z. B. eine Flasche), das sich in der Luft dreht
 * und bei Kollision eine Splash-Animation auslöst.
 *
 * Erbt von `MovableObject` und enthält sowohl die Rotations- als auch Splash-Animationen.
 */
class ThrowableObject extends MovableObject {
  /**
   * Enthält die Bildpfade für die Rotations-Animation der Flasche.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Enthält die Bildpfade für die Splash-Animation nach Kollision.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Erstellt eine Instanz eines werfbaren Objekts.
   *
   * @param {number} x - Die X-Position des Objekts beim Erstellen.
   * @param {number} y - Die Y-Position des Objekts beim Erstellen.
   * @param {number} direction - Die Wurfrichtung (1 = rechts, -1 = links).
   * @param {Object} world - Die Welt, in der sich das Objekt befindet.
   */
  constructor(x, y, direction, world) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.world = world;
    this.height = 60;
    this.width = 50;
    this.isSplashing = false;
    this.throw();
  }

  /**
   * Startet die Wurfbewegung des Objekts, indem es mit einer Geschwindigkeit nach oben fliegt
   * und sich mit der `applyGravity`-Funktion nach unten bewegt.
   *
   * Bewegt sich in die angegebene `direction` und wird nach 3 Sekunden entfernt, falls es nicht kollidiert.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.animate();

    this.throwInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.x += 15 * this.direction;
      }
    }, 50);

    setTimeout(() => {
      if (!this.isSplashing) {
        this.markedForDeletion = true;
      }
    }, 3000);
  }

  /**
   * Löst die Splash-Animation aus, falls das Objekt eine Kollision hat.
   * Beendet die Wurfbewegung und entfernt das Objekt nach der Animation.
   */
  splashEffect() {
    if (this.isSplashing) return;
    this.isSplashing = true;
    clearInterval(this.throwInterval);

    this.playSplashAnimation(() => {
      this.markedForDeletion = true;
    });
  }

  /**
   * Spielt die Splash-Animation Bild für Bild ab und entfernt das Objekt nach Abschluss.
   *
   * @param {Function} callback - Eine Funktion, die nach der Animation ausgeführt wird (z. B. zum Entfernen des Objekts).
   */
  playSplashAnimation(callback) {
    let i = 0;
    let interval = setInterval(() => {
      if (i >= this.IMAGES_SPLASH.length) {
        clearInterval(interval);
        callback();
      } else {
        this.loadImage(this.IMAGES_SPLASH[i]);
        i++;
      }
    }, 100);
  }

  /**
   * Spielt die Rotationsanimation des Objekts ab, solange es sich in der Luft befindet.
   */
  animate() {
    setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }
}
