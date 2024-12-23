class SmallChicken extends MovableObject {
    height = 45; 
    width = 55;  
    y = 380; 
  
    IMAGES_WALKING = [
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    constructor() {
      super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
  
      this.x = 700 + Math.random() * 3800; // Zufällige X-Position
      this.speed = 0.2 + Math.random() * 0.4; // Langsamer, aber zufällige Geschwindigkeit
  
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.moveLeft(); 
      }, 1000 / 60);
  
      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING); 
      }, 200);
    }
  }
  