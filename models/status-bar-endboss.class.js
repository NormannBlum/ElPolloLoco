/**
 * The EndbossStatusBar class represents the health display of the end boss.
 * It inherits from the StatusBar class and manages the different images
 * that indicate the end boss's health status.
 */
class EndbossStatusBar extends StatusBar {
  /**
   * Creates a new instance of the EndbossStatusBar.
   * Initializes the images for different health levels of the end boss
   * and sets the starting position as well as the initial health value.
   */
  constructor() {
    super();
    this.IMAGES = [
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
      "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    ];

    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 510;
    this.y = 10;
  }
}
