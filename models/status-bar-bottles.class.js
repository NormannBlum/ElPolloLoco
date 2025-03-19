/**
 * The BottlesStatusBar class displays the number of bottles collected by the player.
 * It inherits from the StatusBar class and uses different images to represent progress.
 */
class BottlesStatusBar extends StatusBar {
  /**
   * Creates a new instance of the BottlesStatusBar.
   * Initializes the images for different progress levels of collected bottles
   * and sets the default position as well as the starting value to 0%.
   */
  constructor() {
    super();
    this.IMAGES = [
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 10;
    this.y = 80;
  }
}
