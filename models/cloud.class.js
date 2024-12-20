class Cloud extends MovableObject {
  width = 500;
  height = 250;

  IMAGES = [
    "img_pollo_locco/img/5_background/layers/4_clouds/1.png",
    "img_pollo_locco/img/5_background/layers/4_clouds/2.png", 
  ];

  constructor(x) {
    super();
    let randomIndex = Math.floor(Math.random() * this.IMAGES.length); // Wähle ein zufälliges Bild
    let randomImage = this.IMAGES[randomIndex];
    this.loadImage(randomImage); // Lade zufälliges Bild
    this.x = x; // Zufällige X-Position
    this.y = 0 + Math.random() * 100; // Zufällige Y-Position
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(); // Bewegung nach links
    }, 1000 / 60); // 60 FPS
  }
}
