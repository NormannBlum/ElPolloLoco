/**
 * The DrawableObject class represents a drawable object in the game.
 * It contains methods for loading and displaying images on the canvas.
 */
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
   * Loads an image into the `img` attribute.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image of the object onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads a list of images into the `imagesCache`.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imagesCache[path] = img;
    });
  }

  /**
   * Plays an animation by cycling through images from the provided list.
   * @param {string[]} images - A list of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imagesCache[images[i]];
    this.currentImage++;
  }
}
