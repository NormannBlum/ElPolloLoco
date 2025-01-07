class Chicken extends MovableObject {
    height = 55;
    width = 70;
    y = 370;
  
    offset = {
      x: 0,
      y: 5,
      width: 0,
      height: 10,
    };
  
    IMAGES_WALKING = [
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
  
    IMAGES_DEAD = [
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];
  
    isDead = false;
  
    /**
     * Erstellt eine Instanz des Hühnchens mit zufälliger Position und Geschwindigkeit.
     */
    constructor() {
      super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 800 + Math.random() * 4000;
      this.speed = 0.15 + Math.random() * 0.5;
  
      this.animate();
    }
  
    /**
     * Aktiviert die Animationen und Bewegung des Hühnchens.
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
     * Setzt das Hühnchen in den Zustand "tot", stoppt seine Bewegung und spielt die Todesanimation ab.
     */
    kill() {
      this.isDead = true;
      this.speed = 0;
      this.playAnimation(this.IMAGES_DEAD);
    }
  }
  