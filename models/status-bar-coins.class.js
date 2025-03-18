/**
 * Die CoinsStatusBar-Klasse zeigt die Anzahl der gesammelten Münzen des Spielers an.
 * Sie erbt von der StatusBar-Klasse und verwendet verschiedene Bilder, um den Fortschritt darzustellen.
 */
class CoinsStatusBar extends StatusBar {
  /**
   * Erstellt eine neue Instanz der CoinsStatusBar.
   * Initialisiert die Bilder für die verschiedenen Münz-Fortschrittsstufen
   * und setzt die Standardposition sowie den Anfangswert auf 0 %.
   */
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
