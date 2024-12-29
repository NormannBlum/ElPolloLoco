class DrawableObject {
  img;
  imagesCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  // loadImage(img/test.png);
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // drawFrame(ctx) {
  //   if (this instanceof Character) {
  //     ctx.beginPath();
  //     // ctx.lineWidth = "5";
  //     // ctx.strokeStyle = "blue";
  //     ctx.rect(this.x, this.y, this.width, this.height);
  //     // ctx.stroke();
  //   }
  // }

  drawOffsetFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.x,
        this.y + this.offset.y,
        this.width - this.offset.width,
        this.height - this.offset.height
      );
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imagesCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imagesCache[images[i]];
    this.currentImage++;
  }
}
