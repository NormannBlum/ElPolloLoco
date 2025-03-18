/**
 * Die BottlesStatusBar-Klasse zeigt die Anzahl der gesammelten Flaschen des Spielers an.
 * Sie erbt von der StatusBar-Klasse und nutzt verschiedene Bilder, um den Fortschritt darzustellen.
 */
class BottlesStatusBar extends StatusBar {
  /**
   * Erstellt eine neue Instanz der BottlesStatusBar.
   * Initialisiert die Bilder für die verschiedenen Fortschrittsstufen der gesammelten Flaschen
   * und setzt die Standardposition sowie den Anfangswert auf 0 %.
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
