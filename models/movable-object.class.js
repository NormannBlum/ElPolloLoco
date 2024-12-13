class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imagesCache = {};
  currentImage = 0; 
  speed = 0.15;
  otherDirection = false;

  // loadImage(img/test.png);
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imagesCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
