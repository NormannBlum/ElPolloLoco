class StatusBar extends DrawableObject {
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
   * Erstellt eine Instanz der Statusleiste mit Standardposition und voller Anzeige.
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
   * Aktualisiert die angezeigte Prozentzahl in der Statusleiste und wählt das entsprechende Bild.
   * @param {number} percentage - Der neue Prozentwert (0 bis 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imagesCache[path];
  }

  /**
   * Ermittelt den Index des Bildes basierend auf dem aktuellen Prozentwert.
   * @returns {number} - Der Index des Bildes in der `IMAGES`-Liste.
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
