/**
 * The BackgroundObject class represents a movable background object in the game.
 * It extends the MovableObject class and moves along with the game world.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of a background object.
   * @param {string} imagePath - The path to the background object's image.
   * @param {number} x - The x-position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
