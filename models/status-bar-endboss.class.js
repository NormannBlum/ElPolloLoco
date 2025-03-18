/**
 * Die EndbossStatusBar-Klasse stellt die Gesundheitsanzeige des Endbosses dar.
 * Sie erbt von der StatusBar-Klasse und verwaltet die verschiedenen Bilder,
 * die den Gesundheitsstatus des Endbosses anzeigen.
 */
class EndbossStatusBar extends StatusBar {
  /**
   * Erstellt eine neue Instanz der EndbossStatusBar.
   * Initialisiert die Bilder für die verschiedenen Gesundheitszustände des Endbosses
   * und setzt die Startposition sowie den Anfangswert der Lebensanzeige.
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
