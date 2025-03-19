/**
 * Represents a status bar for the player's health or other objects.
 * The status bar changes according to the health level and displays different images.
 *
 * Inherits from `DrawableObject` and dynamically updates the displayed graphic.
 */
class StatusBar extends DrawableObject {
  /**
   * Contains the image paths for different health levels of the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  /**
   * Creates an instance of the status bar with a default position and full display.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed percentage in the status bar and selects the corresponding image.
   * @param {number} percentage - The new percentage value (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imagesCache[path];
  }

  /**
   * Determines the index of the image based on the current percentage value.
   * @returns {number} - The index of the image in the `IMAGES` list.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
