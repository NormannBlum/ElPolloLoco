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

  /**
   * Lädt ein Bild in das `img`-Attribut.
   * @param {string} path - Der Pfad zum Bild.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Zeichnet das aktuelle Bild des Objekts auf das Canvas.
   * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Lädt eine Liste von Bildern in den `imagesCache`.
   * @param {string[]} arr - Ein Array von Bildpfaden.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imagesCache[path] = img;
    });
  }

  /**
   * Spielt eine Animation ab, indem Bilder aus der übergebenen Liste zyklisch angezeigt werden.
   * @param {string[]} images - Eine Liste von Bildpfaden für die Animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imagesCache[images[i]];
    this.currentImage++;
  }
}

