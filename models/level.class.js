class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 3600;

  /**
   * Erstellt eine Instanz eines Levels mit Gegnern, Wolken, Hintergrundobjekten, Flaschen und Münzen.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
