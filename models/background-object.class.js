class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Erstellt eine Instanz eines Hintergrundobjekts.
   * @param {string} imagePath - Der Pfad zum Bild des Hintergrundobjekts.
   * @param {number} x - Die x-Position des Hintergrundobjekts.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // Setzt die y-Position basierend auf der Höhe des Objekts.
  }
}
