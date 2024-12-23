class CoinsStatusBar extends StatusBar {
    constructor() {
      super();
      this.IMAGES = [
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
      ];
      this.loadImages(this.IMAGES);
      this.setPercentage(0);
      this.x = 10;
      this.y = 40;
    }
  }